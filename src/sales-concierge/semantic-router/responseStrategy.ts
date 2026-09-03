import { VisitorSessionState } from './types';
import { DecisionKey } from './informationGap';
import { getLastIntent, identifyActiveDecisionSource, isConversionBottleneckProfile } from './workingMemory';
import { ObjectionKey, OBJECTION_TRADEOFFS } from './recommendationEngine';

// PHASE 18 PART 7/8: RESPONSE STRATEGY
//
// This module is the single authority for the THREE conversational
// functions named in the Phase 18 brief as the clearest architectural
// weakness (Part 4/5/6): a recommendation request, a "why?", and an
// objection. It decides WHICH intent/decision governs the reply; it does
// NOT generate prose itself (Part 8's boundary) - text still comes from
// tour-matrix.ts's stepDefs/dynamic overrides (now sourced from
// recommendationEngine.ts's buildRecommendation() for the decision-bearing
// cases), and destinations still come from GuidedTourEngine's existing
// evidence/audit/consultation action selection.
//
// Every branch below that existed BEFORE this phase is preserved verbatim
// (same condition, same intent, same order) - see the inline comments
// marking which branches are new. This is integration, not a rewrite: the
// ~150 other precedence.ts rules unrelated to these three functions are
// untouched.

export interface StrategyResolution {
  family: string;
  intent: string;
  reason: string;
  recordFlags?: Record<string, string>;
}

/**
 * PART 4: unifies the "what would you do?" family. Two NEW branches (marked
 * below) let an ESTABLISHED decision (REBUILD_VS_IMPROVE, AUDIT_VS_SELF_SERVICE)
 * answer directly through the SAME intent a direct question about that
 * decision would use - previously this mega-rule only recognized topic
 * LABELS (primary_intent === 'SEO'/'WEB'/'AUTO'/'CTO'), never the registered
 * decision registry, so an established rebuild-vs-improve or audit-vs-self-
 * service picture had no way to answer this question directly.
 */
export function resolveRecommendationRequest(session: VisitorSessionState | undefined): StrategyResolution {
  // PRESERVED (Phase 13): must not force Audit after an explicit objection.
  if (getLastIntent(session) === 'INTENT-06-AUDIT-OBJECTION') {
    return {
      family: 'FAM-06',
      intent: 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION',
      reason: 'Direct Recommendation Despite Audit Objection.',
      recordFlags: { direct_recommendation_reason: 'objection' }
    };
  }
  // PHASE 21 (Part 5 failure mode #1, Case F): the decision registry check
  // now runs BEFORE the general conversion-bottleneck heuristic. Found via
  // this phase's own real-conversation testing: once a conversion-bottleneck
  // profile was established (traffic + existing site), it PERMANENTLY won
  // "what would you do?" even after a strictly more recent, more specific
  // fact (technical_constraint) resolved a DIFFERENT decision
  // (REBUILD_VS_IMPROVE) - so confirming a structural constraint and then
  // asking "what would you do?" silently reverted to the older conversion-
  // bottleneck answer instead of the just-established rebuild recommendation.
  // A decision the visitor has actually engaged (an intent in the registry
  // fired for it) is more specific and more recent than the general
  // heuristic below, so it takes precedence - same principle Phase 14's own
  // comment already states ("the most recently established diagnostic
  // picture outranks an old topic label"), applied one level deeper.
  const activeDecision = identifyActiveDecisionSource(session, { skipFollowUpDecisions: true })?.decision;
  if (activeDecision === 'REBUILD_VS_IMPROVE') {
    return {
      family: 'FAM-06',
      intent: 'INTENT-REBUILD-VS-IMPROVE',
      reason: 'Recommendation Request (Unified): Rebuild vs Improve.',
      recordFlags: { recommendation_request_variant: String(pickResponseVariant(session, 'REBUILD_VS_IMPROVE')) }
    };
  }
  if (activeDecision === 'AUDIT_VS_SELF_SERVICE') {
    return {
      family: 'FAM-06',
      intent: 'INTENT-AUDIT-REASONING',
      reason: 'Recommendation Request (Unified): Audit vs Self-Service.',
      recordFlags: { recommendation_request_variant: String(pickResponseVariant(session, 'AUDIT_VS_SELF_SERVICE')) }
    };
  }

  // PRESERVED (Phase 14): an established conversion-bottleneck profile outranks a stale topic label.
  if (isConversionBottleneckProfile(session)) {
    return {
      family: 'FAM-06',
      intent: 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION',
      reason: 'Direct Recommendation From Established Conversion-Bottleneck Profile.',
      recordFlags: { direct_recommendation_reason: 'conversion_bottleneck' }
    };
  }

  // PRESERVED (pre-Phase-18): topic-label fallback chain, unchanged order.
  if (session?.primary_intent === 'SEO' && session?.collected_context?.traffic !== 'plenty') {
    return { family: 'FAM-03', intent: 'INTENT-01-SEO-NOTRAFFIC', reason: 'Search Visibility & Indexation Diagnosis.' };
  }
  if (session?.collected_context?.traffic === 'none') {
    return { family: 'FAM-03', intent: 'INTENT-01-SEO-NOTRAFFIC', reason: 'Search Visibility & Indexation Diagnosis.' };
  }
  if (session?.primary_intent === 'WEB') {
    return { family: 'FAM-02', intent: 'INTENT-02-WEB', reason: 'Capability: Web Engineering.' };
  }
  if (session?.primary_intent === 'AUTO') {
    return { family: 'FAM-03', intent: 'INTENT-03-AUTO-CRM', reason: 'Workflow Bottleneck: CRM Automation.' };
  }
  if (session?.primary_intent === 'CTO') {
    return { family: 'FAM-04', intent: 'INTENT-04-CTO', reason: 'Capability: Technology Advisory.' };
  }
  return { family: 'FAM-06', intent: 'INTENT-06-AUDIT-INTAKE', reason: 'Direct Senior Consultant Recommendation.', recordFlags: { direct_recommendation_reason: 'default' } };
}

/**
 * PART 16: "what would change your mind?" - a genuinely new capability
 * (no prior rule answered this at all). Derives the answer from
 * Recommendation.whatWouldChange (recommendationEngine.ts) for whichever
 * decision is active, rather than a hardcoded per-decision response.
 */
export function resolveWhatWouldChangeMind(session: VisitorSessionState | undefined): StrategyResolution {
  const activeDecision = identifyActiveDecisionSource(session, { skipFollowUpDecisions: true })?.decision;
  if (activeDecision) {
    return {
      family: 'FAM-06',
      intent: 'INTENT-WHAT-WOULD-CHANGE-MIND',
      reason: `What Would Change The Recommendation: ${activeDecision}.`,
      recordFlags: { what_would_change_decision: activeDecision }
    };
  }
  return {
    family: 'FAM-06',
    intent: 'INTENT-WHAT-WOULD-CHANGE-MIND',
    reason: 'What Would Change The Recommendation: No Active Decision Yet.',
    recordFlags: {}
  };
}

/**
 * PART 6: unifies the objection/skepticism family (freelancer, Shopify/
 * WordPress, audit-overkill, and the NEW DIY case) onto the SAME
 * OBJECTION_TRADEOFFS registry (recommendationEngine.ts) instead of three
 * independently-triggered stepDef lookups with no shared structure. Reuses
 * the existing, already-honest stepDef text for each target (tour-matrix.ts);
 * records the active decision (if any) so the response can bridge to it.
 */
export function resolveObjection(objectionKey: ObjectionKey, session: VisitorSessionState | undefined): StrategyResolution {
  const tradeoff = OBJECTION_TRADEOFFS[objectionKey];
  const activeDecision = identifyActiveDecisionSource(session, { skipFollowUpDecisions: true })?.decision;
  const flags: Record<string, string> = { objection_key: objectionKey };
  if (activeDecision) flags.objection_active_decision = activeDecision;
  return {
    family: tradeoff.intentId === 'INTENT-06-AUDIT-OBJECTION' ? 'FAM-06' : tradeoff.intentId === 'INTENT-PLATFORM-OBJECTION' ? 'FAM-02' : 'FAM-12',
    intent: tradeoff.intentId,
    reason: `Objection (Unified): ${objectionKey}.`,
    recordFlags: flags
  };
}

// =============================================================================
// PHASE 18 PART 23: RESPONSE DIVERSITY WITHOUT RANDOMNESS
//
// A small deterministic counter (the SAME collected_context pattern every
// prior phase already used - no new persistence mechanism), scoped to a
// single decision, so repeated recommendation requests about the SAME
// decision get progressively different framing (direct -> synthesis ->
// reasoning -> evidence/action) instead of mechanically repeating identical
// text. The underlying recommendation (Recommendation.option) never
// changes because of this - only how it is introduced.
// =============================================================================

export function pickResponseVariant(session: VisitorSessionState | undefined, decision: DecisionKey): number {
  const key = `recommendation_request_count_${decision}`;
  const current = Number(session?.collected_context?.[key] || '0');
  const next = current + 1;
  if (session) session.collected_context = { ...session.collected_context, [key]: String(next) };
  return (next - 1) % 4;
}
