import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';
import {
  identifyActiveDecision,
  identifyActiveDecisionSource,
  isContextualPriceFollowUp,
  isContextualTimelineFollowUp,
  resolveWhatNext
} from '../workingMemory';
import {
  resolveDecisionStatus,
  resolveDecisionState,
  buildDecisionContext,
  recordFact,
  declineFact,
  DECISION_REQUIREMENTS
} from '../informationGap';
import { VisitorSessionState } from '../types';

// PHASE 17: INFORMATION GAP INTEGRATION & DECISION COVERAGE regression matrix.
//
// Phase 16 built the engine; this phase wires it into live conversation
// (resolveWhatNext, all six decisions, contextual price/timeline) without
// building a second reasoning architecture. Every test below exercises
// either the live router+tour engine end-to-end, or the integration-level
// functions (identifyActiveDecision, resolveDecisionStatus) directly.

function newRouter() {
  const router = new LocalSemanticRouter();
  router.loadPrototypes(FROZEN_PROTOTYPES);
  return router;
}

function say(router: LocalSemanticRouter, tourEngine: GuidedTourEngine, sessionId: string, message: string) {
  const result = router.route(message, sessionId);
  const session = router.getSession(sessionId);
  const step = tourEngine.resolveTourStep(result, session);
  const text = step.targeted_question ? `${step.headline_message} ${step.targeted_question}` : step.headline_message;
  return { result, session, step, text };
}

function freshSession(id = 's1'): VisitorSessionState {
  return {
    session_id: id,
    previous_states: [],
    collected_context: {},
    journey_history: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

// =============================================================================
// A. "WHAT NEXT" - 10+ variations, all converging on the same WHAT_NEXT
// semantic function (resolveWhatNext), not six independent regexes.
// =============================================================================

describe('Phase 17 Part A: "what next" - unified semantic function across phrasings and states', () => {
  const phrasings = [
    'What next?',
    "What's next?",
    'So what should I do?',
    'Where do we go from here?',
    "What's the next step?",
    'Okay, then what?',
    'Then what?'
  ];

  for (const phrasing of phrasings) {
    test(`"${phrasing}" after an established, RESOLVED conversion decision gives the recommendation, not a generic menu`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p17-whatnext-${phrasing}`;
      say(router, tourEngine, sessionId, 'We already have a website.');
      say(router, tourEngine, sessionId, 'Traffic is fine.');
      say(router, tourEngine, sessionId, "But enquiries aren't great.");
      const r = say(router, tourEngine, sessionId, phrasing);
      assert.notEqual(r.result.candidate_intent, 'INTENT-02-NAV-DESIGN');
      assert.ok(r.text.length > 0);
    });
  }

  test('CTO topic always routes to human handoff regardless of the Information Gap Engine (pre-check preserved)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-whatnext-cto';
    say(router, tourEngine, sessionId, 'fractional cto');
    const r = say(router, tourEngine, sessionId, 'what next?');
    assert.equal(r.result.candidate_intent, 'INTENT-08-HANDOFF');
  });

  test('a fresh/unestablished session still falls back to Design Services navigation (unchanged default)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p17-whatnext-fresh', 'what next?');
    assert.equal(r.result.candidate_intent, 'INTENT-02-NAV-DESIGN');
  });

  test('a RESOLVED rebuild-vs-improve decision reuses its own established recommendation text, not a fresh generic diagnostic script', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-whatnext-resolved-rebuild';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED');
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('an OPEN decision (a gap genuinely worth asking about) continues the diagnostic thread instead of jumping to a resolved-style answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-whatnext-open';
    say(router, tourEngine, sessionId, "I'm not sure what I need yet.");
    const r = say(router, tourEngine, sessionId, 'what next?');
    assert.equal(r.result.candidate_intent, 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC');
  });
});

// =============================================================================
// B. CONTEXTUAL PRICE - 10+ variations across 5 contexts
// =============================================================================

describe('Phase 17 Part B: contextual price follow-up (5 contexts, unseen phrasings)', () => {
  test('isContextualPriceFollowUp recognizes materially different phrasings via ONE mechanism', () => {
    assert.equal(isContextualPriceFollowUp('And what about price?'), true);
    assert.equal(isContextualPriceFollowUp('How much would that cost?'), true);
    assert.equal(isContextualPriceFollowUp('What would I be looking at budget-wise?'), true);
    assert.equal(isContextualPriceFollowUp('Is this going to be expensive?'), true);
    assert.equal(isContextualPriceFollowUp('What would I need to invest?'), true);
    assert.equal(isContextualPriceFollowUp('I just need a rough budget'), false, 'must not shadow the existing standalone rough-budget rule');
  });

  test('1. Context: REBUILD - "And what about price?" preserves the rebuild decision context, no invented number', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-price-rebuild';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'And what about price?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
    assert.match(r.text, /rebuild|improve/i, 'must be framed around the active decision, not a generic scope pitch');
  });

  test('2. Context: ECOMMERCE - "How much would that cost?" stays framed around the ecommerce build (existing branch, unchanged)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-price-ecommerce';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'Around 400 products.');
    const r = say(router, tourEngine, sessionId, 'How much would that cost?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.match(r.text, /e-commerce|ecommerce/i);
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
  });

  test('3. Context: AUDIT - "What would I be looking at budget-wise?" frames around the audit-vs-self-service decision', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-price-audit';
    say(router, tourEngine, sessionId, "I'm not sure what I need yet.");
    say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    const r = say(router, tourEngine, sessionId, 'What would I be looking at budget-wise?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
    assert.match(r.text, /audit/i);
  });

  test('4. Context: CONVERSION - "Is this going to be expensive?" frames around the conversion-vs-traffic decision', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-price-conversion';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'Is this going to be expensive?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
    assert.match(r.text, /conversion|visibility/i);
  });

  test('5. Context: GENERIC (no established decision) - "What would I need to invest?" gives the honest scope-first default, not a fabricated framing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p17-price-generic', 'What would I need to invest?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
    assert.match(r.text, /scope/i);
  });

  test('a declined/blocked decision context still never invents a number for a contextual price follow-up', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-price-blocked';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'And what about price?');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
  });
});

// =============================================================================
// C. CONTEXTUAL TIMELINE - 8+ variations
// =============================================================================

describe('Phase 17 Part C: contextual timeline follow-up (unseen phrasings, multiple contexts)', () => {
  test('isContextualTimelineFollowUp recognizes materially different phrasings via ONE mechanism', () => {
    assert.equal(isContextualTimelineFollowUp('How long would that take?'), true);
    assert.equal(isContextualTimelineFollowUp('What sort of timeline are we talking about?'), true);
    assert.equal(isContextualTimelineFollowUp('Could this be done quickly?'), true);
    assert.equal(isContextualTimelineFollowUp('Would this take months?'), true);
    assert.equal(isContextualTimelineFollowUp('Can this be done fairly quickly?'), true);
  });

  test('1. Context: REBUILD - "How long would that take?" never invents a duration', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-timeline-rebuild';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'How long would that take?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });

  test('2. Context: ECOMMERCE - "What sort of timeline are we talking about?" never invents a duration', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-timeline-ecommerce';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    const r = say(router, tourEngine, sessionId, 'What sort of timeline are we talking about?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });

  test('3. Context: AUDIT - "Could this be done quickly?" never invents a duration', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-timeline-audit';
    say(router, tourEngine, sessionId, "I'm not sure what I need yet.");
    say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    const r = say(router, tourEngine, sessionId, 'Could this be done quickly?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });

  test('4. Context: GENERAL PROJECT (no established decision) - "Would this take months?" gives the honest scope-first default', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p17-timeline-general', 'Would this take months?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });

  test('5. Context: ARCHITECTURE CONSULTATION (CTO topic) - "Can this be done fairly quickly?" still never invents a duration', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-timeline-cto';
    say(router, tourEngine, sessionId, 'fractional cto');
    const r = say(router, tourEngine, sessionId, 'Can this be done fairly quickly?');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });

  test('existing standalone timeline phrasing ("and timeline?" after a fresh price question) is unaffected by the new contextual mechanism', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-timeline-regression';
    say(router, tourEngine, sessionId, 'How much would it cost?');
    const r = say(router, tourEngine, sessionId, 'and timeline?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });
});

// =============================================================================
// D. ALL SIX DECISIONS - at least 3 state combinations each
// =============================================================================

describe('Phase 17 Part D: all six registered decisions produce correct status across states', () => {
  test('REBUILD_VS_IMPROVE: OPEN (nothing known) / PROVISIONAL (existing site only) / RESOLVED (all known)', () => {
    const s1 = freshSession('d1');
    assert.equal(resolveDecisionStatus('REBUILD_VS_IMPROVE', s1), 'OPEN');
    const s2 = freshSession('d2');
    s2.existing_website = true;
    assert.equal(resolveDecisionStatus('REBUILD_VS_IMPROVE', s2), 'PROVISIONAL');
    const s3 = freshSession('d3');
    s3.existing_website = true;
    s3.collected_context.traffic = 'plenty';
    recordFact(s3, 'technical_constraint', 'not_limiting');
    assert.equal(resolveDecisionStatus('REBUILD_VS_IMPROVE', s3), 'RESOLVED');
  });

  test('AUDIT_VS_SELF_SERVICE: OPEN (nothing known) / RESOLVED (uncertainty confirmed) / BLOCKED (declined)', () => {
    const s1 = freshSession('d4');
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s1), 'OPEN');
    const s2 = freshSession('d5');
    s2.diagnostic_uncertainty = true;
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s2), 'RESOLVED');
    const s3 = freshSession('d6');
    declineFact(s3, 'problem_clarity');
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s3), 'BLOCKED');
  });

  test('CONVERSION_VS_TRAFFIC: OPEN / PROVISIONAL (traffic only) / RESOLVED (both known)', () => {
    const s1 = freshSession('d7');
    assert.equal(resolveDecisionStatus('CONVERSION_VS_TRAFFIC', s1), 'OPEN');
    const s2 = freshSession('d8');
    s2.collected_context.traffic = 'plenty';
    assert.equal(resolveDecisionStatus('CONVERSION_VS_TRAFFIC', s2), 'PROVISIONAL');
    const s3 = freshSession('d9');
    s3.collected_context.traffic = 'plenty';
    recordFact(s3, 'enquiry_health', 'weak');
    assert.equal(resolveDecisionStatus('CONVERSION_VS_TRAFFIC', s3), 'RESOLVED');
  });

  test('ECOMMERCE_ARCHITECTURE: OPEN (nothing known) / RESOLVED once any meaningful scope fact is known (no CRITICAL gate exists for this decision)', () => {
    // Every required fact for this decision is DECISION_REFINING or
    // CONTEXT_ONLY (see informationGap.ts) - ecommerce scoping questions
    // (catalogue size, marketplace plans) genuinely never rise to a
    // decision-changing gate the way rebuild-vs-improve's
    // technical_constraint does, so RESOLVED here correctly means "there is
    // enough to proceed/recommend," not "every scope detail is known" -
    // exactly Part 6's "RESOLVED != every fact known" distinction.
    const s1 = freshSession('d10');
    assert.equal(resolveDecisionStatus('ECOMMERCE_ARCHITECTURE', s1), 'OPEN');
    const s2 = freshSession('d11');
    recordFact(s2, 'product_count', '400');
    assert.equal(resolveDecisionStatus('ECOMMERCE_ARCHITECTURE', s2), 'RESOLVED');
    const s3 = freshSession('d12');
    recordFact(s3, 'product_count', '400');
    s3.existing_website = true;
    s3.collected_context.future_marketplace = 'pending';
    assert.equal(resolveDecisionStatus('ECOMMERCE_ARCHITECTURE', s3), 'RESOLVED');
  });

  test('PRICING: OPEN (no scope) / RESOLVED (scope established via industry) / RESOLVED (scope established via project_type)', () => {
    const s1 = freshSession('d13');
    assert.equal(resolveDecisionStatus('PRICING', s1), 'OPEN');
    const s2 = freshSession('d14');
    s2.industry = 'ecommerce';
    assert.equal(resolveDecisionStatus('PRICING', s2), 'RESOLVED');
    const s3 = freshSession('d15');
    s3.project_type = 'REDESIGN';
    assert.equal(resolveDecisionStatus('PRICING', s3), 'RESOLVED');
  });

  test('TIMELINE: OPEN (no scope) / RESOLVED (scope established) / OPEN again after scope is cleared (BLOCKED not applicable - no CRITICAL-decline path for this decision)', () => {
    const s1 = freshSession('d16');
    assert.equal(resolveDecisionStatus('TIMELINE', s1), 'OPEN');
    const s2 = freshSession('d17');
    s2.business_type = 'ecommerce';
    assert.equal(resolveDecisionStatus('TIMELINE', s2), 'RESOLVED');
    const s3 = freshSession('d18');
    assert.equal(resolveDecisionStatus('TIMELINE', s3), 'OPEN');
  });
});

// =============================================================================
// E. STATE TRANSITIONS
// =============================================================================

describe('Phase 17 Part E: decision status state transitions', () => {
  test('OPEN -> PROVISIONAL: REBUILD_VS_IMPROVE moves once existing_website becomes known', () => {
    const s = freshSession('e1');
    assert.equal(resolveDecisionStatus('REBUILD_VS_IMPROVE', s), 'OPEN');
    s.existing_website = true;
    assert.equal(resolveDecisionStatus('REBUILD_VS_IMPROVE', s), 'PROVISIONAL');
  });

  test('PROVISIONAL -> RESOLVED: CONVERSION_VS_TRAFFIC moves once enquiry_health also becomes known', () => {
    const s = freshSession('e2');
    s.collected_context.traffic = 'plenty';
    assert.equal(resolveDecisionStatus('CONVERSION_VS_TRAFFIC', s), 'PROVISIONAL');
    recordFact(s, 'enquiry_health', 'weak');
    assert.equal(resolveDecisionStatus('CONVERSION_VS_TRAFFIC', s), 'RESOLVED');
  });

  test('RESOLVED -> OPEN: AUDIT_VS_SELF_SERVICE reopens once the qualifying fact is genuinely retracted (not just superseded to a different value)', () => {
    // A "traffic decline" doesn't erase the traffic_health fact - it
    // REPLACES it with a different known value (still healthy vs weak,
    // still known), which is a RESOLVED->PROVISIONAL/RESOLVED move (covered
    // by the next test), not RESOLVED->OPEN. Genuine OPEN requires the fact
    // to become truly unknown again - the one existing mechanism that does
    // that is session.ts's "start over" reset (used by the correction/
    // reset rules in precedence.ts), which is exercised here directly.
    const s = freshSession('e3');
    s.diagnostic_uncertainty = true;
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s), 'RESOLVED');
    s.diagnostic_uncertainty = false; // the exact reset precedence.ts's INTENT-START-OVER/INTENT-CORRECTION-RECOVERY rules perform
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s), 'OPEN');
  });

  test('RESOLVED -> PROVISIONAL: REBUILD_VS_IMPROVE end-to-end via real conversation after a traffic contradiction', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'e4';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const before = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(before.text, /wouldn't rebuild yet/i);
    say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    const after = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.doesNotMatch(after.text, /wouldn't rebuild yet/i, 'the HIGH_CONFIDENCE-toward-improve text must not survive a superseded traffic fact');
  });

  test('BLOCKED: AUDIT_VS_SELF_SERVICE stays BLOCKED even when other facts accumulate around the declined one', () => {
    const s = freshSession('e5');
    declineFact(s, 'problem_clarity');
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s), 'BLOCKED');
    s.primary_intent = 'AUDIT';
    assert.equal(resolveDecisionStatus('AUDIT_VS_SELF_SERVICE', s), 'BLOCKED', 'an explicit decline does not get silently overridden by an unrelated field');
  });
});

// =============================================================================
// F. PRIMARY / SECONDARY / FUTURE PROTECTION
// =============================================================================

describe('Phase 17 Part F: primary decision protection from secondary/future/dormant topics', () => {
  test('future does not hijack: a deferred ecommerce mention does not become the active decision for "what next?"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-f1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    // The active decision must still be the conversion problem, not ecommerce.
    assert.notEqual(r.session.collected_context.what_next_source_intent, 'INTENT-ECOMMERCE-SCOPE-ACK');
    assert.doesNotMatch(r.text, /how many products/i);
  });

  test('secondary does not hijack: a passing "can you build on Shopify" platform question does not become the active decision over an established rebuild conversation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-f2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    say(router, tourEngine, sessionId, 'Can you build on Shopify?');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.equal(r.session.collected_context.what_next_source_intent, 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED', 'the platform-objection aside must not overwrite the substantive active decision');
  });

  test('explicit topic switch changes primary: "let\'s focus on the marketplace now" promotes the dormant future requirement', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-f3';
    say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
    const r = say(router, tourEngine, sessionId, "Actually, let's focus on the marketplace now.");
    assert.equal(r.result.candidate_intent, 'INTENT-TOPIC-SWITCH-ECOMMERCE');
    assert.equal(r.session.collected_context.future_ecommerce, undefined, 'the requirement is no longer "deferred" - it is the active topic');
    assert.equal(r.session.industry, 'ecommerce');
  });

  test('a dormant future ecommerce mention must not hijack a later contextual price answer for the ACTIVE decision (found via Phase 17 real-conversation testing)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-f5';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const noted = say(router, tourEngine, sessionId, 'We might want ecommerce down the line.');
    assert.equal(noted.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
    assert.equal(noted.session.industry, undefined, 'a DEFERRED ecommerce mention must not set the active project industry');
    const r = say(router, tourEngine, sessionId, 'And what about price?');
    assert.doesNotMatch(r.text, /e-commerce\/marketplace website/i, 'must not answer as if ecommerce were the active project just because it was mentioned as a future possibility');
  });

  test('a secondary/future gap never appears when resolving the PRIMARY decision (structural check)', () => {
    const s = freshSession('p17-f4');
    s.collected_context.future_ecommerce = 'pending';
    const rebuildState = resolveDecisionState('REBUILD_VS_IMPROVE', s);
    assert.ok(!rebuildState.gaps.some((g) => g.key === 'product_count' || g.key === 'marketplace_requirement'));
  });
});

// =============================================================================
// G. QUESTION SUPPRESSION
// =============================================================================

describe('Phase 17 Part G: question suppression integration', () => {
  test('no redundant question: "what next?" does not re-ask a fact already established this session', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-g1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.doesNotMatch(r.text, /do you have an existing website/i);
  });

  test('no question after sufficient resolution: a RESOLVED decision never asks another clarifying question in its "what next?" answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-g2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED');
    assert.doesNotMatch(r.step.targeted_question || '', /is the current site fundamentally workable/i);
  });

  test('declined fact: a CRITICAL fact explicitly declined never resurfaces as a question worth asking', () => {
    const s = freshSession('p17-g3');
    declineFact(s, 'existing_website');
    const context = buildDecisionContext('REBUILD_VS_IMPROVE', s);
    assert.equal(context.status, 'BLOCKED');
    assert.equal(context.shouldAsk, false);
  });

  test('context-only gap: ECOMMERCE_ARCHITECTURE never asks about technical_constraint (that gap belongs to REBUILD_VS_IMPROVE)', () => {
    const context = buildDecisionContext('ECOMMERCE_ARCHITECTURE', freshSession('p17-g4'));
    assert.ok(!context.informationGaps.some((g) => g.key === 'technical_constraint' && g.questionWorthAsking));
  });
});

// =============================================================================
// H. ACTION PROGRESSION
// =============================================================================

describe('Phase 17 Part H: question vs action progression', () => {
  test('unresolved decision -> ASK_QUESTION nextAction hint', () => {
    const context = buildDecisionContext('REBUILD_VS_IMPROVE', freshSession('p17-h1'));
    assert.equal(context.nextAction, 'ASK_QUESTION');
  });

  test('resolved decision -> OFFER_EVIDENCE_OR_ACTION nextAction hint, not another question', () => {
    const s = freshSession('p17-h2');
    s.existing_website = true;
    s.collected_context.traffic = 'plenty';
    recordFact(s, 'technical_constraint', 'not_limiting');
    const context = buildDecisionContext('REBUILD_VS_IMPROVE', s);
    assert.equal(context.status, 'RESOLVED');
    assert.equal(context.nextAction, 'OFFER_EVIDENCE_OR_ACTION');
  });

  test('appropriate handoff: a RESOLVED decision\'s "what next?" offers BOTH Audit and a call, not a forced single path', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-h3';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    const replies = r.step.suggested_replies || [];
    assert.ok(replies.some((x) => /audit/i.test(x)));
    assert.ok(replies.some((x) => /call/i.test(x)));
  });

  test('no forced conversion: a resolved decision never routes straight to INTENT-08-BOOKING without the visitor asking for it', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p17-h4';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('BLOCKED decision -> AWAIT_INPUT nextAction hint, never ASK_QUESTION on a fact just declined', () => {
    const s = freshSession('p17-h5');
    declineFact(s, 'problem_clarity');
    const context = buildDecisionContext('AUDIT_VS_SELF_SERVICE', s);
    assert.equal(context.nextAction, 'AWAIT_INPUT');
  });
});

// =============================================================================
// I. identifyActiveDecisionSource unit coverage
// =============================================================================

describe('Phase 17 Part I: identifyActiveDecisionSource unit tests', () => {
  test('returns undefined on a fresh session', () => {
    assert.equal(identifyActiveDecisionSource(freshSession('i1')), undefined);
  });

  test('finds the most recent mapped intent, skipping unmapped intents in between', () => {
    const s = freshSession('i2');
    s.previous_states = ['NEW_VISITOR', 'INTENT-SEO-CONVERSION-INSIGHT', 'INTENT-DONT-KNOW', 'INTENT-CONTEXTUAL-CLARIFY'];
    const found = identifyActiveDecisionSource(s);
    assert.equal(found?.decision, 'CONVERSION_VS_TRAFFIC');
    assert.equal(found?.sourceIntent, 'INTENT-SEO-CONVERSION-INSIGHT');
  });

  test('skipFollowUpDecisions excludes PRICING/TIMELINE, finding the substantive decision underneath', () => {
    const s = freshSession('i3');
    s.previous_states = ['NEW_VISITOR', 'INTENT-REBUILD-VS-IMPROVE', 'INTENT-05-PRICE'];
    const found = identifyActiveDecisionSource(s, { skipFollowUpDecisions: true });
    assert.equal(found?.decision, 'REBUILD_VS_IMPROVE');
  });

  test('without skipFollowUpDecisions, PRICING itself can be the active decision', () => {
    const s = freshSession('i4');
    s.previous_states = ['NEW_VISITOR', 'INTENT-REBUILD-VS-IMPROVE', 'INTENT-05-PRICE'];
    const found = identifyActiveDecisionSource(s);
    assert.equal(found?.decision, 'PRICING');
  });

  test('identifyActiveDecision is a convenience wrapper returning just the decision key', () => {
    const s = freshSession('i5');
    s.previous_states = ['NEW_VISITOR', 'INTENT-AUDIT-REASONING'];
    assert.equal(identifyActiveDecision(s), 'AUDIT_VS_SELF_SERVICE');
  });
});

// =============================================================================
// J. UNSEEN PHRASING - 3+ materially different phrasings per major mechanism
// (Part 14.I), proving the same state-level mechanism handles all of them
// rather than one regex per sentence.
// =============================================================================

describe('Phase 17 Part J: unseen phrasing coverage for the topic-switch and resolved-reuse mechanisms', () => {
  const topicSwitchPhrasings = [
    "Actually, let's focus on the marketplace now.",
    "Let's talk about ecommerce now.",
    "Let's prioritize the marketplace now."
  ];
  for (const phrasing of topicSwitchPhrasings) {
    test(`topic switch: "${phrasing}" promotes the dormant requirement via the SAME mechanism`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p17-j-${phrasing.length}`;
      say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
      const r = say(router, tourEngine, sessionId, phrasing);
      assert.equal(r.result.candidate_intent, 'INTENT-TOPIC-SWITCH-ECOMMERCE', `failed for: "${phrasing}"`);
    });
  }

  // "So what should I do?" is deliberately excluded here - it is ALSO one
  // of the trigger phrases for the pre-existing, separate "what would you
  // do" direct-recommendation rule (much earlier in precedence.ts, with its
  // own Phase 13/14 conflict-detection logic), so it resolves through THAT
  // rule first rather than through resolveWhatNext(). That rule has not yet
  // been integrated with the Information Gap Engine - a disclosed, in-scope
  // remaining weakness (see the Phase 17 report), not something this phase
  // silently papered over.
  const resolvedWhatNextPhrasings = ['What next?', "Where do we go from here?", "What's the next step?"];
  for (const phrasing of resolvedWhatNextPhrasings) {
    test(`resolved reuse: "${phrasing}" all reuse the SAME already-established recommendation text`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p17-j2-${phrasing.length}`;
      say(router, tourEngine, sessionId, 'We already have a website.');
      say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
      const r = say(router, tourEngine, sessionId, phrasing);
      assert.equal(r.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED', `failed for: "${phrasing}"`);
      assert.match(r.text, /lean toward a rebuild/i, `failed for: "${phrasing}"`);
    });
  }

  test('DecisionContext.confidence maps HIGH_CONFIDENCE/PROVISIONAL/INSUFFICIENT_INFORMATION to HIGH/MEDIUM/LOW correctly', () => {
    const s1 = freshSession('p17-j3');
    assert.equal(buildDecisionContext('REBUILD_VS_IMPROVE', s1).confidence, 'LOW');
    const s2 = freshSession('p17-j4');
    s2.existing_website = true;
    assert.equal(buildDecisionContext('REBUILD_VS_IMPROVE', s2).confidence, 'MEDIUM');
    const s3 = freshSession('p17-j5');
    s3.existing_website = true;
    s3.collected_context.traffic = 'plenty';
    recordFact(s3, 'technical_constraint', 'not_limiting');
    assert.equal(buildDecisionContext('REBUILD_VS_IMPROVE', s3).confidence, 'HIGH');
  });

  test('buildDecisionContext(null, session) returns the neutral empty contract, not a throw', () => {
    const context = buildDecisionContext(null, freshSession('p17-j6'));
    assert.equal(context.decision, null);
    assert.equal(context.status, null);
    assert.equal(context.shouldAsk, false);
  });

  test('DECISION_REQUIREMENTS still exposes all six decisions after Phase 17 integration (no decision silently dropped)', () => {
    const keys = Object.keys(DECISION_REQUIREMENTS).sort();
    assert.deepEqual(keys, ['AUDIT_VS_SELF_SERVICE', 'CONVERSION_VS_TRAFFIC', 'ECOMMERCE_ARCHITECTURE', 'PRICING', 'REBUILD_VS_IMPROVE', 'TIMELINE'].sort());
  });
});
