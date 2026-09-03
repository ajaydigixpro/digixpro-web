import { VisitorSessionState } from './types';

// PHASE 16: INFORMATION GAP / DECISION RESOLUTION ENGINE
//
// Built after inspecting every existing situation where the system already
// makes (or attempts to make) a recommendation from incomplete information -
// see the Phase 16 report for the full decision-boundary table. That
// inspection found the reasoning pattern already existed informally in
// tour-matrix.ts (INTENT-REBUILD-VS-IMPROVE and INTENT-AUDIT-REASONING both
// hand-branch on "do we know enough yet, and what would change the answer"),
// but as inline boolean checks duplicated per-intent rather than a single
// mechanism other decisions could reuse. This module extracts that pattern
// into a fact-level (not phrase-level) registry so:
//   1. the SAME resolveDecisionState() now backs both existing decisions
//      (tour-matrix.ts calls it instead of recomputing conversionBottleneck
//      inline - see the Phase 16 diff), and
//   2. a decision never explicitly wired before (PRICING, ECOMMERCE_ARCHITECTURE,
//      CONVERSION_VS_TRAFFIC) gets the same confidence-tiering and gap
//      derivation for free by being added to DECISION_REQUIREMENTS below.
//
// Deliberately reuses the SAME session fields every prior phase already
// reads/writes (collected_context, existing_website, diagnostic_uncertainty,
// primary_intent) - this is a read/derive layer, not a parallel memory
// system. The only new persisted state is a small number of new
// collected_context keys (enquiry_health, technical_constraint,
// declined_<factKey>) that follow the exact pattern already established by
// `traffic`, `product_count` and `declined_ecommerce` in Phases 10-12.

export type DecisionKey =
  | 'REBUILD_VS_IMPROVE'
  | 'AUDIT_VS_SELF_SERVICE'
  | 'CONVERSION_VS_TRAFFIC'
  | 'ECOMMERCE_ARCHITECTURE'
  | 'PRICING'
  | 'TIMELINE';

export type FactKey =
  | 'traffic_health'
  | 'enquiry_health'
  | 'existing_website'
  | 'technical_constraint'
  | 'problem_clarity'
  | 'product_count'
  | 'marketplace_requirement'
  | 'project_scope';

export type Importance = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type DecisionImpact = 'DECISION_CHANGING' | 'DECISION_REFINING' | 'CONTEXT_ONLY';
export type ConfidenceTier = 'HIGH_CONFIDENCE' | 'PROVISIONAL' | 'INSUFFICIENT_INFORMATION';

/**
 * A single missing (or known) fact relevant to one decision. Deliberately
 * separates what we know / don't know / why it matters / whether it could
 * change the recommendation, per the Phase 16 brief - these are four
 * genuinely different questions and collapsing them loses information a
 * caller (a "why?" answer, a question-value score, a report) needs kept apart.
 */
export interface InformationGap {
  key: FactKey;
  decision: DecisionKey;
  missingFact: string;
  importance: Importance;
  decisionImpact: DecisionImpact;
  currentKnownState: unknown;
  whyItMatters: string;
  possibleResolution: string[];
  questionWorthAsking: boolean;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  /** The question worth asking IF this gap is selected (Part 8: gap != question) - not necessarily what gets asked verbatim, but the raw candidate. */
  questionText: string;
}

interface RequiredFactSpec {
  key: FactKey;
  importance: Importance;
  decisionImpact: DecisionImpact;
  whyItMatters: string;
  possibleResolution: string[];
  /** The question text worth asking IF this gap is selected (Part 8: gap != question). */
  questionText: string;
}

export interface DecisionRequirement {
  decision: DecisionKey;
  requiredFacts: RequiredFactSpec[];
}

// =============================================================================
// PART 3: INFORMATION GAP REGISTRY - operates at the fact/semantic level, not
// the phrase level. Adding a new required fact to a decision here changes gap
// derivation for every caller automatically; it never encodes visitor wording.
// =============================================================================

export const DECISION_REQUIREMENTS: Record<DecisionKey, DecisionRequirement> = {
  REBUILD_VS_IMPROVE: {
    decision: 'REBUILD_VS_IMPROVE',
    requiredFacts: [
      {
        // PHASE 17: found via this phase's own testing that marking this
        // DECISION_CHANGING made the engine want to ask about traffic even
        // after technical_constraint was already confirmed - inconsistent
        // with tour-matrix.ts's own branch logic (Phase 14/16), which
        // treats a confirmed technical_constraint as decisive BY ITSELF,
        // using traffic only as a fallback heuristic when technical_
        // constraint is still unknown. DECISION_REFINING here matches that
        // actual business rule: it sharpens confidence/framing, it does not
        // gate whether the decision can be considered resolved.
        key: 'traffic_health',
        importance: 'HIGH',
        decisionImpact: 'DECISION_REFINING',
        whyItMatters: 'Healthy traffic with weak enquiries points at conversion, not the platform - useful context for HOW to frame the recommendation, but technical_constraint alone already answers rebuild-vs-improve once it is known.',
        possibleResolution: ['visitor states traffic is healthy/weak', 'Audit measures it directly'],
        questionText: 'Is traffic to the current site healthy, or is that part of the problem too?'
      },
      {
        key: 'existing_website',
        importance: 'CRITICAL',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'There is nothing to "rebuild vs improve" without an existing site to weigh against a fresh build.',
        possibleResolution: ['visitor confirms an existing site'],
        questionText: 'Do you have an existing website today, or would this be new?'
      },
      {
        key: 'technical_constraint',
        importance: 'CRITICAL',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'This is the actual deciding fact: a structurally limiting platform justifies a rebuild; a technically sound one does not, regardless of how the site looks or performs today.',
        possibleResolution: ['visitor states the platform is/isn\'t technically limiting', 'Audit inspects the current architecture'],
        questionText: 'Is the current site fundamentally workable, or are there technical limitations you\'re already fighting?'
      }
    ]
  },
  AUDIT_VS_SELF_SERVICE: {
    decision: 'AUDIT_VS_SELF_SERVICE',
    requiredFacts: [
      {
        key: 'problem_clarity',
        importance: 'CRITICAL',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'An Audit earns its cost only when the root cause is genuinely uncertain - if the problem is already clear, the honest advice is to skip straight to scoping it.',
        possibleResolution: ['visitor states whether the problem is already clear'],
        questionText: 'Is the actual problem already clear to you, or still an open question?'
      }
    ]
  },
  CONVERSION_VS_TRAFFIC: {
    decision: 'CONVERSION_VS_TRAFFIC',
    requiredFacts: [
      {
        key: 'traffic_health',
        importance: 'CRITICAL',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'Whether the visibility problem is traffic (need SEO) or conversion (need audit/UX) determines which service is actually relevant - recommending SEO to a site with plenty of traffic wastes budget.',
        possibleResolution: ['visitor states current traffic level'],
        questionText: 'Is your current site getting reasonable traffic, or is visibility itself the problem?'
      },
      {
        key: 'enquiry_health',
        importance: 'HIGH',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'Healthy traffic combined with weak enquiries is the specific signature of a conversion bottleneck rather than a visibility one.',
        possibleResolution: ['visitor states whether enquiries/leads are healthy or weak'],
        questionText: 'Once people land on the site, are they actually enquiring, or is that where things drop off?'
      }
    ]
  },
  ECOMMERCE_ARCHITECTURE: {
    decision: 'ECOMMERCE_ARCHITECTURE',
    requiredFacts: [
      {
        key: 'product_count',
        importance: 'HIGH',
        decisionImpact: 'DECISION_REFINING',
        whyItMatters: 'Catalogue size changes implementation complexity (payment/vendor integrations, structure) but not whether ecommerce is the right call at all.',
        possibleResolution: ['visitor states approximate product count'],
        questionText: 'Roughly how many products are we talking about?'
      },
      {
        key: 'existing_website',
        importance: 'MEDIUM',
        decisionImpact: 'DECISION_REFINING',
        whyItMatters: 'Whether this is a new build or an addition to an existing site changes scope, not the ecommerce recommendation itself.',
        possibleResolution: ['visitor confirms an existing site'],
        questionText: 'Would this ecommerce build be new, or added to an existing site?'
      },
      {
        key: 'marketplace_requirement',
        importance: 'MEDIUM',
        decisionImpact: 'DECISION_REFINING',
        whyItMatters: 'A future multi-seller marketplace requirement changes how the catalogue/vendor structure should be staged now, even if it is not being built immediately.',
        possibleResolution: ['visitor confirms or defers a marketplace requirement'],
        questionText: 'Is a multi-seller marketplace something you need now, or a possible later step?'
      },
      {
        key: 'technical_constraint',
        importance: 'LOW',
        decisionImpact: 'CONTEXT_ONLY',
        whyItMatters: 'Platform constraints matter for a rebuild decision, not for whether/how to plan an ecommerce catalogue.',
        possibleResolution: ['Audit inspects platform constraints if relevant'],
        questionText: 'Are there platform constraints we should know about?'
      }
    ]
  },
  PRICING: {
    decision: 'PRICING',
    requiredFacts: [
      {
        key: 'project_scope',
        importance: 'CRITICAL',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'Investment is scope-based, not fixed-package - without knowing the scope, any number given would be invented rather than grounded.',
        possibleResolution: ['visitor describes the project (industry, catalogue size, features)', 'Audit establishes exact scope'],
        questionText: 'What best describes the project - a redesign, a new build, or something ecommerce/automation-specific?'
      }
    ]
  },
  TIMELINE: {
    decision: 'TIMELINE',
    requiredFacts: [
      {
        key: 'project_scope',
        importance: 'CRITICAL',
        decisionImpact: 'DECISION_CHANGING',
        whyItMatters: 'Turnaround depends entirely on scope - the same "how long" question has a different honest answer for a landing page versus a multi-vendor marketplace.',
        possibleResolution: ['visitor describes the project', 'Audit/scoping call establishes exact timeline'],
        questionText: 'What best describes the project, so the timeline reflects actual scope rather than a guess?'
      }
    ]
  }
};

// =============================================================================
// PART 4 (support): reading known facts from EXISTING session state. Unknown
// stays unknown - nothing here invents a fact that was never established.
// =============================================================================

// Only these facts are simple "bag" entries with no other existing session
// field to derive from (mirrors `traffic`/`product_count`'s existing plain-key
// convention). The rest (traffic_health, existing_website, problem_clarity,
// marketplace_requirement, project_scope) are DERIVED read-only from fields
// other phases already own (session.existing_website, diagnostic_uncertainty,
// future_marketplace, industry/business_type) - recordFact() does not write
// those, since writing them directly would create a second, divergent copy
// of a fact another module is already the source of truth for.
const WRITABLE_FACT_KEYS: Partial<Record<FactKey, string>> = {
  enquiry_health: 'enquiry_health',
  technical_constraint: 'technical_constraint',
  product_count: 'product_count'
};

function declinedStorageKey(key: FactKey): string {
  return `declined_${key}`;
}

export interface FactReadResult {
  known: boolean;
  value: unknown;
  declined: boolean;
}

export function readFact(session: VisitorSessionState | undefined, key: FactKey): FactReadResult {
  const declined = session?.collected_context?.[declinedStorageKey(key)] === 'true';

  switch (key) {
    case 'traffic_health': {
      const t = session?.collected_context?.traffic;
      if (t === 'plenty') return { known: true, value: 'healthy', declined };
      if (t === 'none' || t === 'declined') return { known: true, value: 'weak', declined };
      return { known: false, value: undefined, declined };
    }
    case 'enquiry_health': {
      const e = session?.collected_context?.enquiry_health;
      if (e) return { known: true, value: e, declined };
      return { known: false, value: undefined, declined };
    }
    case 'existing_website': {
      if (session?.existing_website === true) return { known: true, value: 'has_site', declined };
      if (session?.project_type === 'NEW_WEBSITE') return { known: true, value: 'no_site', declined };
      return { known: false, value: undefined, declined };
    }
    case 'technical_constraint': {
      const tc = session?.collected_context?.technical_constraint;
      if (tc) return { known: true, value: tc, declined };
      return { known: false, value: undefined, declined };
    }
    case 'problem_clarity': {
      // diagnostic_uncertainty is only ever explicitly set (true when
      // uncertainty is confirmed, false on correction/start-over) - see
      // workingMemory.ts's comment on the same field. There is no reliable
      // "confirmed clear" signal elsewhere, so only the unclear case counts
      // as known; absence is treated as unknown, not as "clear".
      if (session?.diagnostic_uncertainty === true) return { known: true, value: 'unclear', declined };
      return { known: false, value: undefined, declined };
    }
    case 'product_count': {
      const pc = session?.collected_context?.product_count;
      if (pc) return { known: true, value: pc, declined };
      return { known: false, value: undefined, declined };
    }
    case 'marketplace_requirement': {
      const pending = session?.collected_context?.future_marketplace;
      if (pending === 'pending') return { known: true, value: 'deferred', declined };
      if (pending === 'superseded') return { known: true, value: 'declined', declined };
      return { known: false, value: undefined, declined };
    }
    case 'project_scope': {
      if (session?.industry || session?.business_type || session?.project_type) {
        return { known: true, value: session.industry || session.business_type || session.project_type, declined };
      }
      return { known: false, value: undefined, declined };
    }
    default:
      return { known: false, value: undefined, declined };
  }
}

/** Generic fact writer for the "simple bag" facts (see WRITABLE_FACT_KEYS) - the same collected_context pattern every prior phase already used for `traffic`/`product_count`. No-op for derived facts owned elsewhere. */
export function recordFact(session: VisitorSessionState | undefined, key: FactKey, value: string): void {
  if (!session) return;
  const storageKey = WRITABLE_FACT_KEYS[key];
  if (!storageKey) return;
  session.collected_context = { ...session.collected_context, [storageKey]: value };
}

/** Records that the visitor explicitly declined to give this fact (mirrors the existing `declined_ecommerce` pattern). */
export function declineFact(session: VisitorSessionState | undefined, key: FactKey): void {
  if (!session) return;
  session.collected_context = { ...session.collected_context, [declinedStorageKey(key)]: 'true' };
}

// =============================================================================
// PART 4: DERIVE GAPS FROM STATE
// =============================================================================

export function resolveInformationGaps(session: VisitorSessionState | undefined, decision: DecisionKey): InformationGap[] {
  const requirement = DECISION_REQUIREMENTS[decision];
  if (!requirement) return [];

  const gaps: InformationGap[] = [];
  for (const spec of requirement.requiredFacts) {
    const read = readFact(session, spec.key);
    if (read.known) continue; // known facts are not gaps
    if (read.declined) continue; // explicitly declined - do not keep surfacing (Part 7.2)

    gaps.push({
      key: spec.key,
      decision,
      missingFact: spec.key,
      importance: spec.importance,
      decisionImpact: spec.decisionImpact,
      currentKnownState: undefined,
      whyItMatters: spec.whyItMatters,
      possibleResolution: spec.possibleResolution,
      questionWorthAsking: spec.decisionImpact !== 'CONTEXT_ONLY',
      confidence: 'HIGH',
      questionText: spec.questionText
    });
  }
  return gaps;
}

// =============================================================================
// PART 5/6: DECISION STATE (confidence tier derived from gaps, not hardcoded
// per-intent) + QUESTION VALUE
// =============================================================================

export interface DecisionState {
  decision: DecisionKey;
  confidence: ConfidenceTier;
  knownFacts: Partial<Record<FactKey, unknown>>;
  gaps: InformationGap[];
  criticalGaps: InformationGap[];
  canProceed: boolean;
}

/**
 * Confidence tiering, generalized from the pattern that was previously
 * hand-written per-intent in tour-matrix.ts (see INTENT-REBUILD-VS-IMPROVE's
 * original conversionBottleneck check): HIGH_CONFIDENCE when every
 * DECISION_CHANGING fact is known, PROVISIONAL when some but not all are
 * known (and at least one CRITICAL fact remains missing), INSUFFICIENT
 * when the decision-changing facts are largely unknown.
 */
export function resolveDecisionState(decision: DecisionKey, session: VisitorSessionState | undefined): DecisionState {
  const requirement = DECISION_REQUIREMENTS[decision];
  const gaps = resolveInformationGaps(session, decision);
  const decisionChangingGaps = gaps.filter((g) => g.decisionImpact === 'DECISION_CHANGING');
  const criticalGaps = gaps.filter((g) => g.importance === 'CRITICAL');

  const knownFacts: Partial<Record<FactKey, unknown>> = {};
  let knownDecisionChangingCount = 0;
  let totalDecisionChangingCount = 0;
  if (requirement) {
    for (const spec of requirement.requiredFacts) {
      const read = readFact(session, spec.key);
      if (read.known) knownFacts[spec.key] = read.value;
      if (spec.decisionImpact === 'DECISION_CHANGING') {
        totalDecisionChangingCount++;
        if (read.known) knownDecisionChangingCount++;
      }
    }
  }

  let confidence: ConfidenceTier;
  if (totalDecisionChangingCount > 0) {
    if (decisionChangingGaps.length === 0) {
      confidence = 'HIGH_CONFIDENCE';
    } else if (knownDecisionChangingCount > 0) {
      confidence = 'PROVISIONAL';
    } else {
      confidence = 'INSUFFICIENT_INFORMATION';
    }
  } else {
    // A decision with no gating (DECISION_CHANGING) fact at all - e.g.
    // ECOMMERCE_ARCHITECTURE, which is inherently open-ended scope
    // refinement rather than a binary gate - is never claimed as fully
    // resolved; it is PROVISIONAL as soon as anything relevant is known,
    // per the Phase 16 brief's own worked example (Part 4).
    confidence = Object.keys(knownFacts).length > 0 ? 'PROVISIONAL' : 'INSUFFICIENT_INFORMATION';
  }

  return {
    decision,
    confidence,
    knownFacts,
    gaps,
    criticalGaps,
    canProceed: confidence !== 'INSUFFICIENT_INFORMATION' || criticalGaps.length === 0
  };
}

const IMPORTANCE_WEIGHT: Record<Importance, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
const IMPACT_WEIGHT: Record<DecisionImpact, number> = { DECISION_CHANGING: 3, DECISION_REFINING: 1, CONTEXT_ONLY: 0 };

export interface QuestionValueResult {
  shouldAsk: boolean;
  priority: Importance;
  score: number;
}

/**
 * PART 6: a small bounded deterministic score - no false mathematical
 * precision, just enough ordering to decide whether a gap is worth
 * interrupting the conversation for. Redundancy (already asked this exact
 * gap recently) and irrelevance (CONTEXT_ONLY) both push the score down;
 * neither is a special case, both fall out of the same formula.
 */
export function scoreQuestionValue(gap: InformationGap, session: VisitorSessionState | undefined): QuestionValueResult {
  let score = IMPORTANCE_WEIGHT[gap.importance] + IMPACT_WEIGHT[gap.decisionImpact];

  const alreadyAskedFlag = session?.collected_context?.[`asked_${gap.key}`];
  if (alreadyAskedFlag === 'true') score -= 4; // Part 7.1/7.4: don't re-ask what was just asked

  if (gap.decisionImpact === 'CONTEXT_ONLY') score -= 3; // Part 7.6: wouldn't change the recommendation

  const shouldAsk = gap.questionWorthAsking && score >= 5;
  return { shouldAsk, priority: gap.importance, score };
}

/** Marks a gap's question as asked this turn, so the same gap is not re-asked next turn (Part 7.1/7.4). */
export function markGapAsked(session: VisitorSessionState | undefined, key: FactKey): void {
  if (!session) return;
  session.collected_context = { ...session.collected_context, [`asked_${key}`]: 'true' };
}

// =============================================================================
// PART 7: QUESTION SUPPRESSION - selects at most one highest-value gap worth
// asking, or none, applying every suppression condition from the brief.
// =============================================================================

export function selectQuestionWorthAsking(
  decision: DecisionKey,
  session: VisitorSessionState | undefined,
  opts?: { higherValueQuestionInFlight?: boolean }
): InformationGap | undefined {
  // PHASE 17: a decision that is BLOCKED (a CRITICAL fact was explicitly
  // declined) must not keep drilling into its OTHER facts - the honest
  // response is to stop asking about this decision at all, not substitute
  // a different question from the same decision (found via this phase's
  // own testing: a declined existing_website still surfaced a
  // technical_constraint question, which reads as ignoring the decline).
  if (hasBlockingDecline(decision, session)) return undefined;

  const state = resolveDecisionState(decision, session);

  // Part 7.6: the recommendation can already proceed with confidence - do
  // not interrupt to ask about a refining/context-only fact.
  if (state.confidence === 'HIGH_CONFIDENCE') return undefined;

  // Part 7.5: the visitor is clearly asking something else right now -
  // never let a background gap hijack a higher-value in-flight question.
  if (opts?.higherValueQuestionInFlight) return undefined;

  let best: InformationGap | undefined;
  let bestScore = -Infinity;
  for (const gap of state.gaps) {
    const scored = scoreQuestionValue(gap, session);
    if (!scored.shouldAsk) continue;
    if (scored.score > bestScore) {
      bestScore = scored.score;
      best = gap;
    }
  }
  return best;
}

// =============================================================================
// PART 15: the structured contract a future response-strategy stage can
// consume, without this phase having to build that stage itself.
// =============================================================================

export interface InformationGapState {
  decision: DecisionKey;
  hasCriticalGap: boolean;
  hasHighValueGap: boolean;
  shouldAsk: boolean;
  topGap?: InformationGap;
  gapCount: number;
  decisionConfidence: ConfidenceTier;
  recommendationCanProceed: boolean;
}

export function computeInformationGapState(decision: DecisionKey, session: VisitorSessionState | undefined): InformationGapState {
  const state = resolveDecisionState(decision, session);
  const topGap = selectQuestionWorthAsking(decision, session);
  return {
    decision,
    hasCriticalGap: state.criticalGaps.length > 0,
    hasHighValueGap: state.gaps.some((g) => g.importance === 'CRITICAL' || g.importance === 'HIGH'),
    shouldAsk: Boolean(topGap),
    topGap,
    gapCount: state.gaps.length,
    decisionConfidence: state.confidence,
    recommendationCanProceed: state.canProceed
  };
}

// =============================================================================
// PHASE 17 PART 6: DECISION COMPLETION STATUS
//
// Deliberately NOT the same axis as ConfidenceTier (see the brief: "Do not
// confuse RESOLVED with HIGH_CONFIDENCE"). Confidence answers "how sure is
// the recommendation"; status answers "is there anything left worth asking
// before acting on it". A PROVISIONAL-confidence recommendation can still be
// RESOLVED (nothing further is worth interrupting the conversation to ask),
// which is exactly the REBUILD_VS_IMPROVE "improve, on the stated
// assumption" case from Phase 14/16.
// =============================================================================

export type DecisionStatus = 'OPEN' | 'PROVISIONAL' | 'RESOLVED' | 'BLOCKED';

/** True when a CRITICAL fact for this decision was explicitly declined and never resolved another way. */
function hasBlockingDecline(decision: DecisionKey, session: VisitorSessionState | undefined): boolean {
  const requirement = DECISION_REQUIREMENTS[decision];
  if (!requirement) return false;
  return requirement.requiredFacts.some((spec) => {
    if (spec.importance !== 'CRITICAL') return false;
    const read = readFact(session, spec.key);
    return read.declined && !read.known;
  });
}

export function resolveDecisionStatus(decision: DecisionKey, session: VisitorSessionState | undefined): DecisionStatus {
  if (hasBlockingDecline(decision, session)) return 'BLOCKED';

  const state = resolveDecisionState(decision, session);
  const topGap = selectQuestionWorthAsking(decision, session);

  if (!topGap) {
    // Nothing left worth asking. If literally nothing relevant is known
    // either (e.g. every required fact is low-value/CONTEXT_ONLY and still
    // unknown), there still isn't a basis for a recommendation - that's
    // OPEN, not RESOLVED, even though there is no good question to close it.
    return state.confidence === 'INSUFFICIENT_INFORMATION' ? 'OPEN' : 'RESOLVED';
  }

  return state.confidence === 'INSUFFICIENT_INFORMATION' ? 'OPEN' : 'PROVISIONAL';
}

// =============================================================================
// PHASE 17 PART 13: RESPONSE CONTRACT - what a downstream response-strategy
// stage should be able to read instead of inferring decision state from
// which intent_id happened to fire. Adapted to the existing architecture:
// `nextAction` is ADVISORY only (a hint), never a forcing instruction -
// tour-matrix.ts's existing evidenceAction/auditAction/consultationAction
// selection remains the sole authority on which action card is actually
// shown (Part 12: "never force an Audit or Architecture Call").
// =============================================================================

export type NextActionHint = 'ASK_QUESTION' | 'GIVE_RECOMMENDATION' | 'OFFER_EVIDENCE_OR_ACTION' | 'AWAIT_INPUT';

export interface DecisionContext {
  decision: DecisionKey | null;
  status: DecisionStatus | null;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW' | null;
  informationGaps: InformationGap[];
  topGap: InformationGap | null;
  shouldAsk: boolean;
  nextAction: NextActionHint | null;
}

/** Human-readable label for a decision, reused across price/timeline follow-up text so the same phrase isn't hand-authored per decision. */
export const DECISION_LABELS: Record<DecisionKey, string> = {
  REBUILD_VS_IMPROVE: 'whether this is a rebuild or an improve',
  AUDIT_VS_SELF_SERVICE: 'whether an Audit is actually needed here',
  CONVERSION_VS_TRAFFIC: 'whether this is a conversion problem or a visibility one',
  ECOMMERCE_ARCHITECTURE: 'the ecommerce scope',
  PRICING: 'the project scope',
  TIMELINE: 'the project scope'
};

export function buildDecisionContext(decision: DecisionKey | null, session: VisitorSessionState | undefined): DecisionContext {
  if (!decision) {
    return { decision: null, status: null, confidence: null, informationGaps: [], topGap: null, shouldAsk: false, nextAction: null };
  }
  const state = resolveDecisionState(decision, session);
  const status = resolveDecisionStatus(decision, session);
  const topGap = selectQuestionWorthAsking(decision, session) || null;

  let nextAction: NextActionHint;
  if (status === 'BLOCKED') nextAction = 'AWAIT_INPUT';
  else if (topGap) nextAction = 'ASK_QUESTION';
  else if (status === 'RESOLVED') nextAction = 'OFFER_EVIDENCE_OR_ACTION';
  else nextAction = 'GIVE_RECOMMENDATION';

  return {
    decision,
    status,
    confidence: state.confidence === 'HIGH_CONFIDENCE' ? 'HIGH' : state.confidence === 'PROVISIONAL' ? 'MEDIUM' : 'LOW',
    informationGaps: state.gaps,
    topGap,
    shouldAsk: Boolean(topGap),
    nextAction
  };
}
