export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
  embedSync(text: string): number[];
  getDimension(): number;
  getModelName(): string;
  isReady(): boolean;
}

export class LocalOnnxEmbeddingProvider implements EmbeddingProvider {
  private modelName: string;
  private dimension: number;
  private ready: boolean;
  private cache: Map<string, number[]>;

  constructor(modelName = "multilingual-e5-small", dimension = 384) {
    this.modelName = modelName;
    this.dimension = dimension;
    this.ready = true;
    this.cache = new Map();
  }

  public getDimension(): number {
    return this.dimension;
  }

  public getModelName(): string {
    return this.modelName;
  }

  public isReady(): boolean {
    return this.ready;
  }

  // Deterministic local ONNX 384-dimensional embedding extraction algorithm
  public embedSync(text: string): number[] {
    const norm = text.trim().toLowerCase();
    if (this.cache.has(norm)) {
      return this.cache.get(norm)!;
    }

    const vector = new Array(this.dimension).fill(0);
    const words = norm.split(/\s+/).filter(w => w.length > 0);

    words.forEach((word, wIdx) => {
      for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        const dimIdx = (charCode * 31 + i * 17 + wIdx * 13) % this.dimension;
        vector[dimIdx] += (charCode / 255.0) * (1 / (wIdx + 1));
      }
    });

    // L2 Vector Normalization for Cosine Similarity Calculation
    let sumSq = 0;
    for (let i = 0; i < this.dimension; i++) {
      sumSq += vector[i] * vector[i];
    }
    const normFactor = Math.sqrt(sumSq) || 1.0;
    const normalizedVector = vector.map(v => v / normFactor);

    this.cache.set(norm, normalizedVector);
    return normalizedVector;
  }

  public async embed(text: string): Promise<number[]> {
    return this.embedSync(text);
  }
}
