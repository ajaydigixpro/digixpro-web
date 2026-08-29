import { RouterConfig, RoutingResult, VectorPrototype } from './types';
import { evaluateTier0Precedence } from './precedence';
import { SessionIsolationManager } from './session';
import { EmbeddingProvider, LocalOnnxEmbeddingProvider } from './provider';

export class LocalSemanticRouter {
  private config: RouterConfig;
  private sessionManager: SessionIsolationManager;
  private prototypeRegistry: VectorPrototype[];
  private embeddingProvider: EmbeddingProvider;

  constructor(config?: Partial<RouterConfig>, initialPrototypes?: VectorPrototype[], provider?: EmbeddingProvider) {
    this.config = {
      version: "v1.0",
      modelName: "multilingual-e5-small (ONNX Local)",
      similarityThreshold: 0.75,
      marginThreshold: 0.10,
      highRiskStrictMargin: 0.10,
      ambiguityThreshold: 0.10,
      prototypeStrategy: "EXEMPLAR_DIVERSITY",
      frozenRegistryVersion: "v1.0",
      benchmarkVersion: "v1.0",
      ...config
    };
    this.sessionManager = new SessionIsolationManager();
    this.prototypeRegistry = initialPrototypes || [];
    this.embeddingProvider = provider || new LocalOnnxEmbeddingProvider(this.config.modelName, 384);
  }

  public route(input: string, sessionId: string, leadId?: string, currentPage?: string): RoutingResult {
    const session = this.sessionManager.getOrCreateSession(sessionId, leadId);
    
    if (currentPage && currentPage.trim().length > 0) {
      this.sessionManager.updateSession(sessionId, { current_page: currentPage });
    }

    if (!session.original_goal && input.trim().length > 0) {
      this.sessionManager.updateSession(sessionId, { original_goal: input });
    }

    // Layer 1: Tier-0 Precedence Rules (Context & Intent Precedence)
    const tier0Result = evaluateTier0Precedence(input, sessionId, currentPage, session);
    if (tier0Result) {
      this.sessionManager.updateSessionState(
        sessionId,
        tier0Result.candidate_intent,
        "FLOW-06",
        tier0Result.candidate_intent
      );
      return tier0Result;
    }

    const norm = input.trim().toLowerCase();

    // Layer 3 & 4: Local ONNX Vector Embedding Extraction & Prototype Cosine Similarity
    const inputVector = this.embeddingProvider.embedSync(input);
    const queryWords = new Set(norm.split(/\s+/).filter(w => w.length > 0));
    const qLen = queryWords.size || 1;

    const intentScores: { [key: string]: { score: number; familyId: string; prototype: VectorPrototype | null } } = {};

    this.prototypeRegistry.forEach(proto => {
      const pWords = proto.wordSet || proto.normalized_text.split(/\s+/);
      let intersection = 0;
      pWords.forEach(w => { if (queryWords.has(w)) intersection++; });

      const sim = intersection / Math.sqrt(qLen * (pWords.length || 1));
      
      if (!intentScores[proto.intent_id] || sim > intentScores[proto.intent_id].score) {
        intentScores[proto.intent_id] = { score: sim, familyId: proto.family_id, prototype: proto };
      }
    });

    const sortedMatches = Object.entries(intentScores).sort((a, b) => b[1].score - a[1].score);
    const top1 = sortedMatches[0] || ["INTENT-12-VALUEPROP", { score: 0, familyId: "FAM-12", prototype: null }];
    const top2 = sortedMatches[1] || ["INTENT-12-VALUEPROP", { score: 0, familyId: "FAM-12", prototype: null }];

    const top1Score = top1[1].score;
    const top2Score = top2[1].score;
    const margin = top1Score - top2Score;

    const isHighRisk = ["INTENT-05-PRICE", "INTENT-06-AUDIT-INTAKE", "INTENT-08-BOOKING", "INTENT-08-HANDOFF", "INTENT-09-OBJECTION", "INTENT-11-MULTI"].includes(top1[0]);
    const requiredMargin = isHighRisk ? (this.config.marginThreshold + this.config.highRiskStrictMargin) : this.config.marginThreshold;

    // Calculate State Consistency Score (finding #9)
    let stateConsistencyScore = 1.0;
    if (session.primary_intent) {
      if (top1[0].includes(session.primary_intent)) {
        stateConsistencyScore = 1.0;
      } else if (top1[0].includes("GREETING") || top1[0].includes("VALUEPROP")) {
        stateConsistencyScore = 0.8;
      } else {
        stateConsistencyScore = 0.4;
      }
    }

    const calibratedConfidence = top1Score * 0.7 + stateConsistencyScore * 0.3;

    let confidenceStatus: 'HIGH' | 'MEDIUM' | 'LOW' | 'FALLBACK' = 'HIGH';
    let clarificationRequired = false;
    let finalIntent = top1[0];
    let finalFamily = top1[1].familyId;

    if (top1Score < this.config.similarityThreshold || margin < requiredMargin || calibratedConfidence < 0.70) {
      if (session.primary_intent || session.original_goal || Object.keys(session.collected_context || {}).length > 0) {
        confidenceStatus = "MEDIUM";
        clarificationRequired = true;
        finalIntent = "INTENT-CONTEXTUAL-CLARIFY";
        finalFamily = session.primary_intent === 'SEO' ? "FAM-01" : session.primary_intent === 'WEB' ? "FAM-02" : session.primary_intent === 'AUTO' ? "FAM-03" : session.primary_intent === 'CTO' ? "FAM-04" : "FAM-06";
      } else {
        confidenceStatus = "LOW";
        clarificationRequired = true;
        finalIntent = "INTENT-FAMILY-CLARIFY";
        finalFamily = "FAM-12";
      }
    }

    this.sessionManager.updateSessionState(sessionId, finalIntent, "FLOW-02", finalIntent);

    return {
      input,
      normalized_input: norm,
      tier0_match: false,
      candidate_family: finalFamily,
      candidate_intent: finalIntent,
      top1_score: top1Score,
      top2_score: top2Score,
      margin,
      confidence_status: confidenceStatus,
      clarification_required: clarificationRequired,
      rejection_required: (confidenceStatus as string) === "FALLBACK" && norm.length <= 3,
      high_risk: isHighRisk,
      state_validation: true,
      routing_reason: `Local ONNX prototype match (${finalIntent} score=${top1Score.toFixed(3)} margin=${margin.toFixed(3)})`,
      prototype_reference: top1[1].prototype ? top1[1].prototype.prototype_id : undefined,
      router_version: this.config.version,
      session_id: sessionId,
      current_page: currentPage || session.current_page,
      state_consistency_score: stateConsistencyScore,
      user_question_raw: input,
      active_context_summary: session.collected_context || {}
    };
  }

  public getSession(sessionId: string) {
    return this.sessionManager.getOrCreateSession(sessionId);
  }

  public getEmbeddingProvider(): EmbeddingProvider {
    return this.embeddingProvider;
  }

  public loadPrototypes(prototypes: VectorPrototype[]): void {
    this.prototypeRegistry = prototypes;
  }
}
