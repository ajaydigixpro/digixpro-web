import { VisitorSessionState } from './types';
import type { DecisionKey } from './informationGap';
import { resolveDecisionStatus, selectQuestionWorthAsking } from './informationGap';

// PHASE 13: CONVERSATIONAL WORKING MEMORY
//
// This module exists so that reference resolution ("why?", "what next?",
// "the other option") and state-aware decisions are driven by ONE reusable
// mechanism that reads existing session memory, instead of being scattered
// as ad hoc regexes each hardcoded to their own answer (the pattern used in
// Phases 10-12, which is exactly what this phase was asked to stop doing).
//
// Deliberately built on EXISTING session fields rather than new ones:
//   - session.previous_states already accumulates every resolved intent_id
//     in order (see session.ts's updateSessionState), so it already IS a
//     working intent-history log - "last recommendation" is just its most
//     recent non-bootstrap entry, not a new field.
//   - session.collected_context (a free-form string bag) already carries
//     entity-style facts (traffic, product_count, declined_ecommerce) from
//     Phases 10-12 and is reused here rather than adding a typed field for
//     every concept in the brief.
// No new persisted fields were added to VisitorSessionState for this phase;
// everything below is a pure read/derive layer over what already exists.

const NEW_VISITOR_SENTINEL = 'NEW_VISITOR';

/** The most recently resolved real intent_id, or undefined on a fresh session. */
export function getLastIntent(session?: VisitorSessionState): string | undefined {
  if (!session || !Array.isArray(session.previous_states)) return undefined;
  for (let i = session.previous_states.length - 1; i >= 0; i--) {
    const entry = session.previous_states[i];
    if (entry && entry !== NEW_VISITOR_SENTINEL) return entry;
  }
  return undefined;
}

/** Up to the last `n` real intent_ids, oldest first. */
export function getRecentIntents(session?: VisitorSessionState, n = 6): string[] {
  if (!session || !Array.isArray(session.previous_states)) return [];
  return session.previous_states.filter((s) => s && s !== NEW_VISITOR_SENTINEL).slice(-n);
}

/** Whether any evidence/case-study intent has been shown recently (evidence memory). */
export function wasEvidenceShownRecently(session?: VisitorSessionState, n = 6): boolean {
  return getRecentIntents(session, n).some((i) => i.startsWith('INTENT-07-EVIDENCE'));
}

/** Whether an Audit-related intent has been discussed recently. */
export function wasAuditDiscussedRecently(session?: VisitorSessionState, n = 8): boolean {
  return getRecentIntents(session, n).some((i) => i.startsWith('INTENT-06-AUDIT'));
}

/**
 * Whether the accumulated facts point to a conversion bottleneck rather than
 * a traffic/visibility problem: traffic is known to be fine AND there's an
 * existing site or an established WEB/SEO/AUDIT topic. Used both to pick the
 * right "why"/"what next" answer and to prevent the NOTRAFFIC message from
 * contradicting an already-stated fact (see the precedence.ts fix in this
 * same phase).
 */
export function isConversionBottleneckProfile(session?: VisitorSessionState): boolean {
  if (!session) return false;
  const trafficOk = session.collected_context?.traffic === 'plenty';
  const topicRelevant =
    session.existing_website ||
    session.primary_intent === 'AUDIT' ||
    session.primary_intent === 'SEO' ||
    session.primary_intent === 'WEB';
  return Boolean(trafficOk && topicRelevant);
}

// PHASE 15: position-independent sentiment detectors, replacing brittle
// adjacent-phrase regexes ("traffic is (good|fine|okay)") that broke on any
// natural rewording ("Traffic is actually okay." - the inserted "actually"
// defeated the old regex). These check for subject-word presence AND
// sentiment-word presence ANYWHERE in the message, so a phrasing never
// explicitly tested still resolves correctly. Used as an OR alongside the
// existing structural regexes in precedence.ts (which still catch purely
// factual statements like "we already get traffic" with no sentiment word),
// not a replacement - both are needed for full coverage without regressions.

export function assertsHealthyTraffic(norm: string): boolean {
  const subject = /\b(traffic|visitors|footfall)\b/i.test(norm);
  const positive = /\b(good|fine|okay|ok|decent|alright|reasonable|plenty|healthy|solid|great)\b/i.test(norm);
  return subject && positive;
}

export function assertsWeakEnquiries(norm: string): boolean {
  // PHASE 17: widened to also match the verb form ("people don't enquire",
  // discovered via this phase's real-conversation testing to be a gap - the
  // noun forms alone missed a genuinely common phrasing).
  const subject = /\b(enquir(y|ies|e|es)|leads|conversions?)\b/i.test(norm);
  const negative = /\b(poor|weak|low|bad|lacking|hardly|barely|few|not|isn't|aren't|don't|doesn't)\b/i.test(norm);
  return subject && negative;
}

/** "Is Shopify good enough for me?" / "Would Shopify be enough?" - subject + sufficiency word, position-independent. */
export function questionsShopifySufficiency(norm: string): boolean {
  const subject = /\bshopify\b/i.test(norm);
  const sufficiency = /\b(enough|sufficient|good enough|fine|okay|work)\b/i.test(norm);
  return subject && sufficiency;
}

/** "Why not just go with a freelancer?" / "why choose a freelancer instead" - "why" + "freelancer", position-independent. */
export function questionsFreelancerAlternative(norm: string): boolean {
  const why = /\bwhy\b/i.test(norm);
  const freelancer = /\bfreelanc(er|e)\b/i.test(norm);
  return why && freelancer;
}

/** "Isn't a freelancer enough?" / "wouldn't a freelancer do?" - same sufficiency shape as questionsShopifySufficiency, subject + sufficiency word. */
export function questionsFreelancerSufficiency(norm: string): boolean {
  const freelancer = /\bfreelanc(er|e)\b/i.test(norm);
  const sufficiency = /\b(enough|sufficient|good enough|fine|okay|work|do)\b/i.test(norm);
  return freelancer && sufficiency;
}

// PHASE 22 (Part 4 hardening): "and Shopify?" / "what about Shopify?" /
// "what about WordPress?" are bare follow-up fragments naming a specific
// platform - the same shape as isContextualPriceFollowUp/isContextualTimelineFollowUp
// just below (follow-up shape + subject word), so a visitor naming a
// platform mid-conversation is treated as asking about that platform
// instead of falling through to the generic fuzzy fallback. Answering the
// platform question (via the existing SHOPIFY_WORDPRESS objection
// tradeoff) is a reasonable default regardless of what came immediately
// before, since the message itself names the platform.
export function isBarePlatformFollowUp(norm: string): boolean {
  const platform = /\b(shopify|wordpress)\b/i.test(norm);
  const followUpShape = /\b(and|what about)\b/i.test(norm);
  return platform && followUpShape;
}

// PHASE 16: two more position-independent detectors, same technique as
// assertsHealthyTraffic/assertsWeakEnquiries above - subject word + attribute
// word, ANDed, position-independent. These feed the Information Gap Engine's
// technical_constraint and traffic_health facts (informationGap.ts) rather
// than answering a fixed sentence themselves.

/** "The current platform is completely limiting us" / "we're stuck with the old stack" - resolves the REBUILD_VS_IMPROVE technical_constraint gap. */
export function assertsTechnicalConstraint(norm: string): boolean {
  const subject = /\b(platform|current site|existing site|stack|system|architecture|codebase|cms|technical)\b/i.test(norm);
  const limiting = /\b(limiting|constrain(ed|ing|t|ts)?|can'?t (support|handle|scale)|cannot (support|handle|scale)|stuck with|holding (us|me|it) back|too old|outdated|won'?t scale|blocking us)\b/i.test(norm);
  return subject && limiting;
}

/** "Actually traffic has dropped badly" / "visitors are down this month" - a contradiction of a previously-recorded traffic_health='healthy' fact. */
export function assertsTrafficDecline(norm: string): boolean {
  const subject = /\b(traffic|visitors|footfall)\b/i.test(norm);
  const decline = /\b(dropped|drop(ping)?|fell|falling|declined|declining|down|gone down|tanked|crashed|plummet(ed|ing)?|worse|slipping|disappeared|dried up)\b/i.test(norm);
  return subject && decline;
}

// PHASE 15: unified "why?" resolution. Rather than a hardcoded PRICE-vs-
// default-AUDIT dispatch (Phase 12), any intent whose own response IS a
// recommendation/insight/challenge is eligible: "why?" reuses THAT intent's
// own explanation (see the tour-matrix.ts dynamic override), so adding a new
// recommendation-bearing intent automatically gains "why?" support with zero
// new code here - the generalization Phase 15 requires.
export const WHY_EXPLAINABLE_INTENTS = new Set([
  'INTENT-REBUILD-VS-IMPROVE',
  'INTENT-SEO-CONVERSION-INSIGHT',
  'INTENT-AUDIT-REASONING',
  'INTENT-TRAFFIC-CONFIRMED',
  'INTENT-PLATFORM-OBJECTION',
  'INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE',
  'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION',
  'INTENT-06-AUDIT-OBJECTION',
  'INTENT-SKEPTICISM-WHY-DIGIXPRO',
  'INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION',
  // PHASE 16: a resolved-gap recommendation is exactly as "why"-explainable
  // as any other recommendation-bearing intent - added to the allowlist, not
  // a new WHY code path (see informationGap.ts).
  'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED'
]);

// PHASE 18 PART 5/22 (found via adversarial testing): a PURE price/timeline
// follow-up ("And what about price?") is a mere interruption, not a genuine
// topic change - a bare "why?" immediately afterward still means "why [the
// recommendation before that interruption]", not "why is price like this".
// Transparently skipped during lookback below; any OTHER intervening intent
// still stops the lookback exactly as before (a real topic change legitimately
// blocks reusing an older, now-superseded recommendation).
// Also includes WHY-CONTEXTUAL/ASSUMPTION-FOLLOWUP themselves (found via
// adversarial testing: asking "why?" twice in a row previously broke,
// because the first "why?"'s own intent_id became the new "last intent" and
// wasn't itself in WHY_EXPLAINABLE_INTENTS) - these are transparent, not a
// genuine topic change, so lookback passes through them to the ORIGINAL
// source they themselves reused.
// PHASE 22 (Part 1/8 hardening): INTENT-CONTEXTUAL-CLARIFY added - found via
// this phase's own HTTP conversation testing. A genuinely irrelevant aside
// ("by the way, we're based in Mumbai") that the router doesn't recognize
// resolves to this generic fallback intent, which was NOT in the
// interruption-skip set - so resolveWhyTarget's bounded lookback hit it,
// found it neither explainable nor skippable, and gave up (returning
// undefined) even though the REAL target (e.g. INTENT-REBUILD-VS-IMPROVE)
// was one turn further back. A bare "why?" then fell through to a generic
// default explanation, silently dropping the just-established
// recommendation's actual reasoning. Same skip philosophy as PRICE/TIMELINE
// above: an intent that carries no recommendation/explanation of its own is
// a non-event for WHY continuity, not a topic change.
const WHY_INTERRUPTION_INTENTS = new Set([
  'INTENT-05-PRICE',
  'INTENT-05-PRICE-WHY',
  'INTENT-05-PRICE-NEGOTIATION',
  'INTENT-TIMELINE',
  'INTENT-WHY-CONTEXTUAL',
  'INTENT-ASSUMPTION-FOLLOWUP',
  'INTENT-CONTEXTUAL-CLARIFY'
]);

/**
 * Returns the intent whose own reasoning a bare "why?" should reuse, or
 * undefined if no recent turn (skipping pure interruptions) was a
 * recommendation/insight (in which case the caller falls back to the
 * existing PRICE/default-AUDIT dispatch).
 */
export function resolveWhyTarget(session?: VisitorSessionState): string | undefined {
  const recent = getRecentIntents(session, 4);
  for (let i = recent.length - 1; i >= 0; i--) {
    const intent = recent[i];
    if (WHY_EXPLAINABLE_INTENTS.has(intent)) return intent;
    if (!WHY_INTERRUPTION_INTENTS.has(intent)) return undefined;
  }
  return undefined;
}

// PHASE 15: assumption follow-up (Part 18). "I thought SEO would fix it" is
// the visitor restating an earlier assumption AFTER it was just challenged.
// The correct response reuses THAT challenge's own reasoning rather than a
// plain re-pitch of the assumed service - the same "reuse an existing
// intent's own text" mechanism as resolveWhyTarget, just searched over
// recent turns instead of only the immediately preceding one, since a
// visitor doesn't always restate the assumption on the very next turn.
export const CHALLENGE_INTENTS = new Set([
  'INTENT-SEO-CONVERSION-INSIGHT',
  'INTENT-REBUILD-VS-IMPROVE',
  'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION',
  'INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE'
]);

/** Finds the most recent challenge/insight intent within the last few turns, if any. */
export function resolveRecentChallenge(session?: VisitorSessionState, lookback = 4): string | undefined {
  const recent = getRecentIntents(session, lookback);
  for (let i = recent.length - 1; i >= 0; i--) {
    if (CHALLENGE_INTENTS.has(recent[i])) return recent[i];
  }
  return undefined;
}

// PHASE 17 PART 1/9: maps the intent that actually established a decision to
// which of the Phase-16 registered decisions it belongs to - a fact-level
// lookup, not a phrase-level one. "What next?", "what's next?", "so what
// should I do?", "where do we go from here?" etc. all reach this SAME
// mechanism because they're normalized to one semantic function first (see
// the single regex in precedence.ts that calls resolveWhatNext()) - the
// variety of wording never needs six copies of this map.
const INTENT_TO_DECISION: Partial<Record<string, DecisionKey>> = {
  'INTENT-REBUILD-VS-IMPROVE': 'REBUILD_VS_IMPROVE',
  'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED': 'REBUILD_VS_IMPROVE',
  'INTENT-AUDIT-REASONING': 'AUDIT_VS_SELF_SERVICE',
  'INTENT-06-AUDIT-OBJECTION': 'AUDIT_VS_SELF_SERVICE',
  // PHASE 21 (Part 10 no-op-protection fix): NOT mapped, unlike its sibling
  // intents above. This intent is the shared OUTPUT of three different
  // resolveRecommendationRequest branches (audit-objection override,
  // conversion-bottleneck heuristic, and the plain default fallback - see
  // direct_recommendation_reason). Mapping it here made it self-referential:
  // once emitted by the conversion-bottleneck branch, a LATER "what would
  // you do?" would misread that same prior answer as "AUDIT_VS_SELF_SERVICE
  // was actively engaged" and flip to different framing with no underlying
  // fact change - a real, reproduced no-op violation. INTENT-AUDIT-REASONING
  // and INTENT-06-AUDIT-OBJECTION remain mapped: both are genuine, single-
  // purpose engagement signals (a direct audit question / an explicit
  // objection), not an overloaded multi-reason response intent.
  'INTENT-SEO-CONVERSION-INSIGHT': 'CONVERSION_VS_TRAFFIC',
  'INTENT-TRAFFIC-CONFIRMED': 'CONVERSION_VS_TRAFFIC',
  'INTENT-TRAFFIC-DECLINE-UPDATE': 'CONVERSION_VS_TRAFFIC',
  'INTENT-01-SEO-NOTRAFFIC': 'CONVERSION_VS_TRAFFIC',
  'INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE': 'ECOMMERCE_ARCHITECTURE',
  'INTENT-ECOMMERCE-SCOPE-ACK': 'ECOMMERCE_ARCHITECTURE',
  'INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION': 'ECOMMERCE_ARCHITECTURE',
  'INTENT-05-PRICE': 'PRICING',
  'INTENT-05-PRICE-NEGOTIATION': 'PRICING',
  'INTENT-05-PRICE-WHY': 'PRICING',
  'INTENT-TIMELINE': 'TIMELINE'
};

export interface ActiveDecisionSource {
  decision: DecisionKey;
  sourceIntent: string;
}

/**
 * Finds the most recent turn that established one of the 6 registered
 * decisions, and which decision it was - the general mechanism Part 1
 * requires instead of a per-fact if-chain. `skipFollowUpDecisions` excludes
 * PRICING/TIMELINE themselves, for callers that want the SUBSTANTIVE
 * decision a price/timeline follow-up question should attach to (Part 3/4),
 * not the follow-up turn itself.
 */
export function identifyActiveDecisionSource(
  session?: VisitorSessionState,
  opts?: { skipFollowUpDecisions?: boolean }
): ActiveDecisionSource | undefined {
  const recent = getRecentIntents(session, 10);
  for (let i = recent.length - 1; i >= 0; i--) {
    const mapped = INTENT_TO_DECISION[recent[i]];
    if (!mapped) continue;
    if (opts?.skipFollowUpDecisions && (mapped === 'PRICING' || mapped === 'TIMELINE')) continue;
    return { decision: mapped, sourceIntent: recent[i] };
  }
  return undefined;
}

export function identifyActiveDecision(session?: VisitorSessionState, opts?: { skipFollowUpDecisions?: boolean }): DecisionKey | undefined {
  return identifyActiveDecisionSource(session, opts)?.decision;
}

// PHASE 17 PARTS 3/4/10/11: position-independent, structural detectors for a
// SHORT contextual follow-up ("And what about price?", "How much would that
// cost?", "What sort of timeline are we talking about?") - deliberately
// narrower than the existing generic PRICE/TIMELINE regexes (which already
// handle standalone requests like "I just need a rough budget" correctly),
// so this only widens coverage for phrasings those rules don't already
// catch, rather than re-deciding phrasings that already work.
export function isContextualPriceFollowUp(norm: string): boolean {
  const priceTopic = /\b(price|pricing|cost|costs|budget|expensive|invest|investment)\b/i.test(norm);
  const followUpShape =
    /\b(and (the |what about )?|what about|how much (would|will|does)|what would (that|this|it) cost|what would i (be looking at|need to (invest|spend|pay))|is (this|that|it) going to be|would (this|that|it) be)\b/i.test(
      norm
    );
  return priceTopic && followUpShape;
}

export function isContextualTimelineFollowUp(norm: string): boolean {
  const timeTopic = /\b(timeline|how long|quickly|fast|months|weeks|turnaround|timeframe|time frame)\b/i.test(norm);
  const followUpShape =
    /\b(and (the |what about )?|what about|what sort of|how (long|quickly)|could (this|that|it) be done|would (this|that|it) take|can (this|that|it) be done)\b/i.test(norm);
  return timeTopic && followUpShape;
}

export interface NextStepDecision {
  family: string;
  intent: string;
  /** Which decision (if any) this answer was derived from - set only when the Phase-17 engine-driven branch was used. */
  sourceDecision?: DecisionKey;
  sourceIntent?: string;
}

/**
 * State-aware "what next?" resolution (Phase 13's original fix; Phase 17
 * replaces the middle of this with the Information Gap Engine). Priority
 * order, per the Phase 17 brief:
 *   1. active decision-changing gap (still OPEN/PROVISIONAL with something
 *      worth asking) -> continue the diagnostic thread
 *   2. the decision is RESOLVED (nothing left worth asking) -> the honest
 *      "what next" is the recommendation + an appropriate action, not
 *      another question
 *   3. no registered decision is active -> the pre-existing fallback chain
 *      (diagnostic_uncertainty / stale-thread continuation / evidence memory
 *      / default navigation), unchanged from Phase 13.
 * Deliberately does NOT hardcode "if technical_constraint => X" - it reads
 * whichever decision identifyActiveDecisionSource finds and asks the SAME
 * resolveDecisionStatus()/selectQuestionWorthAsking() functions Phase 16
 * already built for every other consumer.
 */
export function resolveWhatNext(session?: VisitorSessionState): NextStepDecision {
  if (session?.primary_intent === 'CTO') {
    return { family: 'FAM-08', intent: 'INTENT-08-HANDOFF' };
  }
  if (session?.primary_intent === 'AUTO' || session?.multi_service_intents?.includes('SEO')) {
    return { family: 'FAM-03', intent: 'INTENT-03-AUTO-NAV' };
  }

  const activeSource = identifyActiveDecisionSource(session);
  if (activeSource) {
    const status = resolveDecisionStatus(activeSource.decision, session);
    const topGap = selectQuestionWorthAsking(activeSource.decision, session);
    if (topGap) {
      // A decision-changing gap remains worth asking about - continuing the
      // existing diagnostic thread IS the honest "what next", not a fresh menu.
      return { family: 'FAM-06', intent: 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC', sourceDecision: activeSource.decision, sourceIntent: activeSource.sourceIntent };
    }
    if (status === 'RESOLVED') {
      // Nothing left worth asking - the next contribution is the
      // recommendation + an appropriate action (Part 5/12), not another
      // question. tour-matrix.ts's INTENT-WHAT-NEXT-RESOLVED reuses
      // activeSource.sourceIntent's own already-shown text rather than a
      // fresh generic diagnostic script.
      return { family: 'FAM-06', intent: 'INTENT-WHAT-NEXT-RESOLVED', sourceDecision: activeSource.decision, sourceIntent: activeSource.sourceIntent };
    }
    // BLOCKED or PROVISIONAL-with-no-single-gap-scoring-high-enough - fall
    // through to the pre-existing chain below rather than inventing a
    // dedicated branch for a case the original mechanism already covers.
  }

  if (session?.diagnostic_uncertainty || session?.primary_intent === 'AUDIT' || isConversionBottleneckProfile(session)) {
    return { family: 'FAM-06', intent: 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC' };
  }

  // The turn immediately before this one was itself an unresolved
  // diagnostic/discovery thread - continue it rather than jumping to an
  // unrelated navigation destination just because no sharper rule matched.
  const lastIntent = getLastIntent(session);
  if (lastIntent && /^(INTENT-DONT-KNOW|INTENT-06-AUDIT|INTENT-CONTEXTUAL-CLARIFY|INTENT-ALREADY-SEEN|INTENT-SEO-CONVERSION-INSIGHT|INTENT-CONSULTANT-SYNTHESIS)/.test(lastIntent)) {
    return { family: 'FAM-06', intent: 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC' };
  }

  if (wasEvidenceShownRecently(session)) {
    return { family: 'FAM-06', intent: 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC' };
  }

  return { family: 'FAM-02', intent: 'INTENT-02-NAV-DESIGN' };
}
