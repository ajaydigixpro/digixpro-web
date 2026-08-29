import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalOnnxEmbeddingProvider } from '../provider';
import { LocalSemanticRouter } from '../router';

describe('LocalOnnxEmbeddingProvider Runtime Integration Tests', () => {
  test('LocalOnnxEmbeddingProvider returns valid 384-dimensional normalized vector', () => {
    const provider = new LocalOnnxEmbeddingProvider("multilingual-e5-small", 384);
    const vector = provider.embedSync("local seo audit karwana hai");

    assert.equal(vector.length, 384);
    assert.equal(typeof vector[0], 'number');
    assert.equal(Number.isNaN(vector[0]), false);

    // Verify L2 unit normalization (sum of squares == 1.0)
    let sumSq = 0;
    vector.forEach(v => { sumSq += v * v; });
    assert.ok(Math.abs(sumSq - 1.0) < 0.001);
  });

  test('LocalOnnxEmbeddingProvider is deterministic for identical inputs', () => {
    const provider = new LocalOnnxEmbeddingProvider();
    const vec1 = provider.embedSync("website design cost");
    const vec2 = provider.embedSync("website design cost");

    assert.deepEqual(vec1, vec2);
  });

  test('LocalSemanticRouter consumes LocalOnnxEmbeddingProvider correctly', () => {
    const provider = new LocalOnnxEmbeddingProvider();
    const router = new LocalSemanticRouter({}, [], provider);

    assert.equal(router.getEmbeddingProvider().getModelName(), "multilingual-e5-small");
    assert.equal(router.getEmbeddingProvider().getDimension(), 384);
    assert.equal(router.getEmbeddingProvider().isReady(), true);
  });
});
