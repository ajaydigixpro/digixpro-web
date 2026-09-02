import { RouterConfig, RoutingResult, VectorPrototype, RetrievedContext } from './types';
import { evaluateTier0Precedence } from './precedence';
import { SessionIsolationManager } from './session';
import { lexicalOverlapScore, tokenize } from './provider';
import { retrieveRelevantContext } from '../../data/canonicalRegistry';

export class LocalSemanticRouter {
  private config: RouterConfig;
  private sessionManager: SessionIsolationManager;
  private prototypeRegistry: VectorPrototype[];

  constructor(config?: Partial<RouterConfig>, initialPrototypes?: VectorPrototype[]) {
    this.config = {
      version: "v1.0",
      // Honest engine identifier - deterministic lexical/fuzzy routing, NOT an ML model.
      engineName: "deterministic-lexical-fuzzy-v1",
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
  }

  public route(input: string, sessionId: string, leadId?: string, currentPage?: string): RoutingResult {
    const session = this.sessionManager.getOrCreateSession(sessionId, leadId);

    if (currentPage && currentPage.trim().length > 0) {
      this.sessionManager.updateSession(sessionId, { current_page: currentPage });
    }

    if (!session.original_goal && input.trim().length > 0) {
      this.sessionManager.updateSession(sessionId, { original_goal: input });
    }

    // Canonical knowledge grounding - deterministic keyword/slug matching against
    // canonicalRegistry, not an embedding lookup. Attached to every result so
    // downstream response generation always has service/evidence/URL grounding.
    const retrievedContext = this.retrieveContext(input, currentPage);

    // Layer 1: Tier-0 Precedence Rules (Context & Intent Precedence)
    const tier0Result = evaluateTier0Precedence(input, sessionId, currentPage, session);
    if (tier0Result) {
      this.sessionManager.updateSessionState(
        sessionId,
        tier0Result.candidate_intent,
        "FLOW-06",
        tier0Result.candidate_intent
      );
      return { ...tier0Result, retrieved_context: retrievedContext };
    }

    const norm = input.trim().toLowerCase();

    // Layer 2/3: Deterministic lexical/fuzzy token-overlap scoring against known
    // prototype phrases. No embedding model, no vector inference - see provider.ts.
    const queryWords = new Set(tokenize(input));
    const qLen = queryWords.size || 1;

    const intentScores: { [key: string]: { score: number; familyId: string; prototype: VectorPrototype | null } } = {};

    this.prototypeRegistry.forEach(proto => {
      const pWords = proto.wordSet || proto.normalized_text.split(/\s+/);
      const sim = lexicalOverlapScore(queryWords, pWords);

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
      routing_reason: `Deterministic lexical/fuzzy prototype match (${finalIntent} score=${top1Score.toFixed(3)} margin=${margin.toFixed(3)})`,
      prototype_reference: top1[1].prototype ? top1[1].prototype.prototype_id : undefined,
      router_version: this.config.version,
      session_id: sessionId,
      current_page: currentPage || session.current_page,
      state_consistency_score: stateConsistencyScore,
      user_question_raw: input,
      active_context_summary: session.collected_context || {},
      retrieved_context: retrievedContext
    };
  }

  private retrieveContext(input: string, currentPage?: string): RetrievedContext {
    return retrieveRelevantContext(input, currentPage) as RetrievedContext;
  }

  public getSession(sessionId: string) {
    return this.sessionManager.getOrCreateSession(sessionId);
  }

  /**
   * Seed this router's (per-request) session manager with a previously-returned
   * session snapshot before calling route(), so multi-turn context survives
   * across separate stateless HTTP requests without any server-side storage.
   * Must be called before route() for the same sessionId.
   */
  public hydrateSession(sessionId: string, snapshot: unknown): void {
    this.sessionManager.hydrateSession(sessionId, snapshot as any);
  }

  public getEngineName(): string {
    return this.config.engineName;
  }

  public loadPrototypes(prototypes: VectorPrototype[]): void {
    this.prototypeRegistry = prototypes;
  }
}
