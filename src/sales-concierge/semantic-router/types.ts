export interface RouterConfig {
  version: string;
  /** Honest, non-ML identifier for the routing engine in use. Never a model name. */
  engineName: string;
  similarityThreshold: number; // 0.75
  marginThreshold: number; // 0.10
  highRiskStrictMargin: number; // 0.10
  ambiguityThreshold: number; // 0.10
  prototypeStrategy: string; // "EXEMPLAR_DIVERSITY"
  frozenRegistryVersion: string; // "v1.0"
  benchmarkVersion: string; // "v1.0"
}

export interface VectorPrototype {
  prototype_id: string;
  original_text: string;
  normalized_text: string;
  family_id: string;
  intent_id: string;
  phase2_flow_id: string;
  evidence_type: string;
  real_vs_synthetic: string;
  language: string;
  wordSet: string[];
}

export interface RoutingResult {
  input: string;
  normalized_input: string;
  tier0_match: boolean;
  candidate_family: string;
  candidate_intent: string;
  top1_score: number;
  top2_score: number;
  margin: number;
  confidence_status: 'HIGH' | 'MEDIUM' | 'LOW' | 'FALLBACK';
  clarification_required: boolean;
  rejection_required: boolean;
  high_risk: boolean;
  state_validation: boolean;
  routing_reason: string;
  prototype_reference?: string;
  router_version: string;
  session_id: string;
  current_page?: string;
  is_hindi?: boolean;
  detected_language?: 'en' | 'hi' | 'hinglish';
  state_consistency_score?: number;
  user_question_raw?: string;
  active_context_summary?: Record<string, any>;
  /** Canonical knowledge grounding retrieved from canonicalRegistry.retrieveRelevantContext(). */
  retrieved_context?: RetrievedContext;
}

export interface RetrievedContext {
  company: { name: string; [key: string]: any };
  matchedServices: Array<{ id: string; name: string; canonicalUrl: string; [key: string]: any }>;
  matchedEvidence: Array<{ id: string; name: string; canonicalUrl: string; [key: string]: any }>;
  matchedArticles: Array<{ id: string; title: string; canonicalUrl: string; [key: string]: any }>;
  activeUrls: Array<{ id: string; title: string; url: string; [key: string]: any }>;
}

export interface VisitorSessionState {
  session_id: string;
  lead_id?: string;
  original_goal?: string;
  current_intent?: string;
  current_flow_id?: string;
  current_intent_id?: string;
  previous_states: string[];
  primary_intent?: 'WEB' | 'SEO' | 'AUTO' | 'CTO' | 'PRICE' | 'AUDIT' | 'EVIDENCE' | 'BOOKING';
  current_journey?: string;
  discovery_stage?: string;
  current_question_id?: string;
  current_page?: string;
  previous_page?: string;
  recommended_next_step?: string;
  project_type?: 'NEW_WEBSITE' | 'REDESIGN' | 'SEO_IMPROVEMENT';
  business_type?: string;
  business_objective?: string;
  commercial_sensitivity?: string;
  existing_website?: boolean;
  diagnostic_uncertainty?: boolean;
  industry?: string;
  last_intent?: string;
  last_response?: string;
  last_action?: string;
  multi_service_intents?: string[];
  collected_context: Record<string, string>;
  journey_history: string[];
  created_at: string;
  updated_at: string;
}
