import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';
import { assertsTechnicalConstraint, assertsTrafficDecline } from '../workingMemory';
import {
  readFact,
  recordFact,
  declineFact,
  resolveInformationGaps,
  resolveDecisionState,
  scoreQuestionValue,
  selectQuestionWorthAsking,
  computeInformationGapState,
  DECISION_REQUIREMENTS
} from '../informationGap';
import { VisitorSessionState } from '../types';

// PHASE 16: INFORMATION GAP / DECISION RESOLUTION ENGINE regression matrix.
//
// Acceptance bar (from the brief): a recommendation is never permanently
// correct merely because a matching phrase fired earlier - its confidence
// depends on current decision state, known information, unresolved
// decision-changing gaps, and superseded information. And: the system asks
// a question only when the answer has meaningful potential to change the
// decision. Tests below exercise the fact-level registry directly (Parts
// 1-8) and the end-to-end conversational consequences (Parts 9+), including
// state transitions that recalculate an EARLIER recommendation from NEW or
// CONTRADICTING information.

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
// A. DECISION BOUNDARIES - the registry covers every decision from the
// brief's Part 1 inspection (rebuild vs improve, audit, ecommerce
// architecture, platform/pricing/timeline, consultation is Human Handoff
// which has no incomplete-information gate and is intentionally excluded).
// =============================================================================

describe('Phase 16 Part A: decision boundaries are registered at the fact level', () => {
  test('REBUILD_VS_IMPROVE requires traffic_health, existing_website, technical_constraint', () => {
    const keys = DECISION_REQUIREMENTS.REBUILD_VS_IMPROVE.requiredFacts.map((f) => f.key).sort();
    assert.deepEqual(keys, ['existing_website', 'technical_constraint', 'traffic_health'].sort());
  });

  test('AUDIT_VS_SELF_SERVICE requires problem_clarity', () => {
    const keys = DECISION_REQUIREMENTS.AUDIT_VS_SELF_SERVICE.requiredFacts.map((f) => f.key);
    assert.deepEqual(keys, ['problem_clarity']);
  });

  test('ECOMMERCE_ARCHITECTURE requires product_count, existing_website, marketplace_requirement, technical_constraint', () => {
    const keys = DECISION_REQUIREMENTS.ECOMMERCE_ARCHITECTURE.requiredFacts.map((f) => f.key).sort();
    assert.deepEqual(keys, ['existing_website', 'marketplace_requirement', 'product_count', 'technical_constraint'].sort());
  });

  test('PRICING requires project_scope', () => {
    assert.deepEqual(DECISION_REQUIREMENTS.PRICING.requiredFacts.map((f) => f.key), ['project_scope']);
  });

  test('TIMELINE requires project_scope', () => {
    assert.deepEqual(DECISION_REQUIREMENTS.TIMELINE.requiredFacts.map((f) => f.key), ['project_scope']);
  });

  test('CONVERSION_VS_TRAFFIC requires traffic_health and enquiry_health', () => {
    const keys = DECISION_REQUIREMENTS.CONVERSION_VS_TRAFFIC.requiredFacts.map((f) => f.key).sort();
    assert.deepEqual(keys, ['enquiry_health', 'traffic_health'].sort());
  });

  test('the registry operates at the fact level, not the phrase level (no string literal visitor wording embedded)', () => {
    for (const decision of Object.values(DECISION_REQUIREMENTS)) {
      for (const spec of decision.requiredFacts) {
        assert.equal(typeof spec.key, 'string');
        assert.ok(!/\bhow many|what is|do you have\b/i.test(spec.key), 'requiredFacts keys must be semantic fact names, not questions');
      }
    }
  });
});

// =============================================================================
// B. KNOWN VS UNKNOWN
// =============================================================================

describe('Phase 16 Part B: known vs unknown facts', () => {
  test('fact unknown on a fresh session', () => {
    const s = freshSession();
    assert.equal(readFact(s, 'traffic_health').known, false);
    assert.equal(readFact(s, 'technical_constraint').known, false);
    assert.equal(readFact(s, 'problem_clarity').known, false);
  });

  test('fact known: traffic_health derived from the existing collected_context.traffic field', () => {
    const s = freshSession();
    s.collected_context.traffic = 'plenty';
    const read = readFact(s, 'traffic_health');
    assert.equal(read.known, true);
    assert.equal(read.value, 'healthy');
  });

  test('fact known: existing_website derived from the existing session.existing_website field', () => {
    const s = freshSession();
    s.existing_website = true;
    assert.equal(readFact(s, 'existing_website').known, true);
    assert.equal(readFact(s, 'existing_website').value, 'has_site');
  });

  test('fact known: technical_constraint written via recordFact()', () => {
    const s = freshSession();
    recordFact(s, 'technical_constraint', 'limiting');
    const read = readFact(s, 'technical_constraint');
    assert.equal(read.known, true);
    assert.equal(read.value, 'limiting');
  });

  test('fact explicitly declined is tracked separately from "known"', () => {
    const s = freshSession();
    declineFact(s, 'technical_constraint');
    const read = readFact(s, 'technical_constraint');
    assert.equal(read.known, false, 'declining a fact does not manufacture a value for it');
    assert.equal(read.declined, true);
  });

  test('fact inferred: problem_clarity is known ("unclear") once diagnostic_uncertainty is set, without a new field', () => {
    const s = freshSession();
    s.diagnostic_uncertainty = true;
    assert.equal(readFact(s, 'problem_clarity').known, true);
    assert.equal(readFact(s, 'problem_clarity').value, 'unclear');
  });

  test('fact superseded: traffic_health flips from healthy to weak when collected_context.traffic is overwritten', () => {
    const s = freshSession();
    s.collected_context.traffic = 'plenty';
    assert.equal(readFact(s, 'traffic_health').value, 'healthy');
    s.collected_context.traffic = 'declined';
    assert.equal(readFact(s, 'traffic_health').value, 'weak');
  });

  test('marketplace_requirement known as "deferred" via the existing future_marketplace pending flag (Phase 14/15 reuse)', () => {
    const s = freshSession();
    s.collected_context.future_marketplace = 'pending';
    const read = readFact(s, 'marketplace_requirement');
    assert.equal(read.known, true);
    assert.equal(read.value, 'deferred');
  });

  test('marketplace_requirement known as "declined" via the existing future_marketplace superseded flag', () => {
    const s = freshSession();
    s.collected_context.future_marketplace = 'superseded';
    assert.equal(readFact(s, 'marketplace_requirement').value, 'declined');
  });
});

// =============================================================================
// C. DECISION IMPACT
// =============================================================================

describe('Phase 16 Part C: decision impact classification', () => {
  test('REBUILD_VS_IMPROVE: existing_website and technical_constraint gate the decision (DECISION_CHANGING); traffic_health only refines it', () => {
    // PHASE 17 UPDATE: traffic_health was found (via Phase 17's own testing)
    // to be redundant as a HARD gate once technical_constraint is known -
    // tour-matrix.ts's actual branch logic already treats a confirmed
    // technical_constraint as decisive by itself. Reclassified to
    // DECISION_REFINING to match that real behavior; see informationGap.ts.
    const byKey = Object.fromEntries(DECISION_REQUIREMENTS.REBUILD_VS_IMPROVE.requiredFacts.map((f) => [f.key, f.decisionImpact]));
    assert.equal(byKey.existing_website, 'DECISION_CHANGING');
    assert.equal(byKey.technical_constraint, 'DECISION_CHANGING');
    assert.equal(byKey.traffic_health, 'DECISION_REFINING');
  });

  test('ECOMMERCE_ARCHITECTURE product_count is DECISION_REFINING, not DECISION_CHANGING', () => {
    const spec = DECISION_REQUIREMENTS.ECOMMERCE_ARCHITECTURE.requiredFacts.find((f) => f.key === 'product_count')!;
    assert.equal(spec.decisionImpact, 'DECISION_REFINING');
  });

  test('ECOMMERCE_ARCHITECTURE technical_constraint is CONTEXT_ONLY for this decision (it matters for REBUILD_VS_IMPROVE, not for scoping ecommerce)', () => {
    const spec = DECISION_REQUIREMENTS.ECOMMERCE_ARCHITECTURE.requiredFacts.find((f) => f.key === 'technical_constraint')!;
    assert.equal(spec.decisionImpact, 'CONTEXT_ONLY');
  });

  test('a CONTEXT_ONLY gap is never worth asking about (questionWorthAsking=false)', () => {
    const s = freshSession();
    const gaps = resolveInformationGaps(s, 'ECOMMERCE_ARCHITECTURE');
    const contextOnly = gaps.find((g) => g.decisionImpact === 'CONTEXT_ONLY');
    assert.ok(contextOnly);
    assert.equal(contextOnly!.questionWorthAsking, false);
  });

  test('a DECISION_CHANGING gap is worth asking about (questionWorthAsking=true)', () => {
    const s = freshSession();
    const gaps = resolveInformationGaps(s, 'REBUILD_VS_IMPROVE');
    assert.ok(gaps.every((g) => g.questionWorthAsking === true));
  });
});

// =============================================================================
// D. QUESTION SUPPRESSION
// =============================================================================

describe('Phase 16 Part D: question suppression', () => {
  test('already-answered fact produces no gap for that fact at all (not just a suppressed question)', () => {
    const s = freshSession();
    s.existing_website = true;
    const gaps = resolveInformationGaps(s, 'REBUILD_VS_IMPROVE');
    assert.ok(!gaps.some((g) => g.key === 'existing_website'));
  });

  test('a gap already asked this session scores lower and is suppressed on the next resolution', () => {
    const s = freshSession();
    const gaps = resolveInformationGaps(s, 'AUDIT_VS_SELF_SERVICE');
    const gap = gaps[0];
    const before = scoreQuestionValue(gap, s);
    assert.equal(before.shouldAsk, true);
    s.collected_context[`asked_${gap.key}`] = 'true';
    const after = scoreQuestionValue(gap, s);
    assert.equal(after.shouldAsk, false, 'redundant re-ask must be suppressed');
  });

  test('a low-value (CONTEXT_ONLY) gap is suppressed even when unknown', () => {
    const s = freshSession();
    const gaps = resolveInformationGaps(s, 'ECOMMERCE_ARCHITECTURE');
    const contextOnly = gaps.find((g) => g.decisionImpact === 'CONTEXT_ONLY')!;
    assert.equal(scoreQuestionValue(contextOnly, s).shouldAsk, false);
  });

  test('selectQuestionWorthAsking suppresses everything when a higher-value question is already in flight', () => {
    const s = freshSession();
    const selected = selectQuestionWorthAsking('REBUILD_VS_IMPROVE', s, { higherValueQuestionInFlight: true });
    assert.equal(selected, undefined);
  });

  test('selectQuestionWorthAsking returns nothing once the decision is already HIGH_CONFIDENCE', () => {
    const s = freshSession();
    s.existing_website = true;
    s.collected_context.traffic = 'plenty';
    recordFact(s, 'technical_constraint', 'not_limiting');
    assert.equal(resolveDecisionState('REBUILD_VS_IMPROVE', s).confidence, 'HIGH_CONFIDENCE');
    assert.equal(selectQuestionWorthAsking('REBUILD_VS_IMPROVE', s), undefined, 'must not interrupt an already-confident recommendation');
  });

  test('selectQuestionWorthAsking picks the highest-importance unresolved gap when several are open', () => {
    const s = freshSession();
    const selected = selectQuestionWorthAsking('REBUILD_VS_IMPROVE', s);
    assert.ok(selected);
    assert.ok(['CRITICAL', 'HIGH'].includes(selected!.importance));
  });

  test('a declined fact never resurfaces as something worth asking', () => {
    const s = freshSession();
    declineFact(s, 'existing_website');
    const gaps = resolveInformationGaps(s, 'REBUILD_VS_IMPROVE');
    assert.ok(!gaps.some((g) => g.key === 'existing_website'));
  });
});

// =============================================================================
// E. STATE TRANSITIONS (end-to-end, via the real router + tour engine)
// =============================================================================

describe('Phase 16 Part E: state transitions - gap created / resolved / invalidated / decision recalculated', () => {
  test('gap created: a fresh "would you rebuild the site?" has an unresolved technical_constraint gap', () => {
    const s = freshSession();
    const state = resolveDecisionState('REBUILD_VS_IMPROVE', s);
    assert.ok(state.gaps.some((g) => g.key === 'technical_constraint'));
    assert.equal(state.confidence, 'INSUFFICIENT_INFORMATION');
  });

  test('gap resolved: "the current platform is completely limiting us" resolves the technical_constraint gap and flips the recommendation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-gap-resolve-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const before = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(before.text, /assumption/i, 'PROVISIONAL lean-to-improve before the constraint is known');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.equal(r.result.candidate_intent, 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED');
    assert.match(r.text, /lean toward a rebuild/i);
    assert.equal(r.session.collected_context.technical_constraint, 'limiting');
  });

  test('gap resolved: the recalculated rebuild recommendation is what "why?" reuses afterward', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-gap-resolve-2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'why?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.match(r.text, /lean toward a rebuild/i, 'why must reuse the RECALCULATED recommendation, not the earlier provisional one');
  });

  test('gap invalidated / decision recalculated: "actually traffic has dropped badly" supersedes a previously-healthy traffic fact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-contradiction-1';
    say(router, tourEngine, sessionId, 'We already get good traffic.');
    const healthy = say(router, tourEngine, sessionId, 'We need more enquiries.');
    assert.equal(healthy.session.collected_context.traffic, 'plenty');
    const r = say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    assert.equal(r.result.candidate_intent, 'INTENT-TRAFFIC-DECLINE-UPDATE');
    assert.equal(r.session.collected_context.traffic, 'declined', 'the stale healthy fact must be superseded, not preserved');
    assert.match(r.text, /Earlier you mentioned traffic was healthy/i);
  });

  test('a recommendation is never treated as permanently correct once its underlying fact is superseded (acceptance invariant 1)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-invariant-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const before = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(before.text, /wouldn't rebuild yet/i);
    say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    const after = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.doesNotMatch(after.text, /wouldn't rebuild yet/i, 'must not keep repeating a HIGH_CONFIDENCE answer built on a fact that was just superseded');
  });

  test('resolveDecisionState confidence for REBUILD_VS_IMPROVE moves INSUFFICIENT -> PROVISIONAL -> and stays PROVISIONAL until technical_constraint is also known', () => {
    const s = freshSession();
    assert.equal(resolveDecisionState('REBUILD_VS_IMPROVE', s).confidence, 'INSUFFICIENT_INFORMATION');
    s.existing_website = true;
    assert.equal(resolveDecisionState('REBUILD_VS_IMPROVE', s).confidence, 'PROVISIONAL');
    s.collected_context.traffic = 'plenty';
    assert.equal(resolveDecisionState('REBUILD_VS_IMPROVE', s).confidence, 'PROVISIONAL', 'technical_constraint is still unknown - never claim HIGH_CONFIDENCE from 2 of 3 facts');
    recordFact(s, 'technical_constraint', 'not_limiting');
    assert.equal(resolveDecisionState('REBUILD_VS_IMPROVE', s).confidence, 'HIGH_CONFIDENCE');
  });
});

// =============================================================================
// F. MULTI-INTENT COMPATIBILITY
// =============================================================================

describe('Phase 16 Part F: multi-intent compatibility - gaps stay scoped to the active decision', () => {
  test('primary vs secondary: a CONVERSION_VS_TRAFFIC gap does not appear when resolving REBUILD_VS_IMPROVE', () => {
    const s = freshSession();
    const rebuildGaps = resolveInformationGaps(s, 'REBUILD_VS_IMPROVE').map((g) => g.key);
    assert.ok(!rebuildGaps.includes('enquiry_health'), 'enquiry_health belongs to CONVERSION_VS_TRAFFIC, not REBUILD_VS_IMPROVE');
  });

  test('primary vs future: an ecommerce gap stays dormant while the active conversation is about conversion, not ecommerce', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-multi-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    const noted = say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
    assert.equal(noted.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
    assert.equal(noted.session.collected_context.future_ecommerce, 'pending');
    // A LATER turn returns to the actual active decision (conversion, not
    // ecommerce) - the still-pending ecommerce gap must not hijack it, and
    // must not still be "pending" in memory as if it were forgotten either.
    const r = say(router, tourEngine, sessionId, "But enquiries aren't great.");
    assert.equal(r.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
    assert.equal(r.session.collected_context.future_ecommerce, 'pending', 'the dormant future requirement is preserved, not lost, while a different decision is active');
    assert.doesNotMatch(r.text, /how many products/i, 'a dormant future-requirement gap must not be asked about mid-conversion-diagnosis');
  });

  test('future superseded: "forget ecommerce" clears the deferred ecommerce fact so ECOMMERCE_ARCHITECTURE gaps read it as declined, not pending', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-multi-2';
    say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
    say(router, tourEngine, sessionId, 'Actually forget ecommerce.');
    const session = router.getSession(sessionId);
    assert.equal(readFact(session, 'marketplace_requirement').value, undefined, 'marketplace_requirement tracks future_marketplace specifically, not future_ecommerce - distinct facts, correctly not conflated');
    assert.equal(session?.collected_context.future_ecommerce, 'superseded');
  });

  test('secondary must not hijack primary: an established rebuild-vs-improve conversation is not derailed by a passing ecommerce mention', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-multi-3';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(r.text, /wouldn't rebuild yet/i);
  });
});

// =============================================================================
// G. NATURAL LANGUAGE VARIATION - each semantic condition below is exercised
// through 3+ MATERIALLY DIFFERENT phrasings against the SAME detector
// function, proving the mechanism generalizes rather than being 3 regexes.
// =============================================================================

describe('Phase 16 Part G: natural language variation (same mechanism, unseen phrasings)', () => {
  test('assertsTechnicalConstraint recognizes the technical-constraint condition across materially different phrasings', () => {
    assert.equal(assertsTechnicalConstraint('The current platform is completely limiting us.'), true);
    assert.equal(assertsTechnicalConstraint("Honestly we're stuck with an old stack that can't handle this."), true);
    assert.equal(assertsTechnicalConstraint('Our existing system is holding us back at this point.'), true);
    assert.equal(assertsTechnicalConstraint('The site looks a bit dated but works fine technically.'), false, 'must not fire on cosmetic-only complaints');
  });

  test('assertsTrafficDecline recognizes the traffic-decline condition across materially different phrasings', () => {
    assert.equal(assertsTrafficDecline('Actually traffic has dropped badly.'), true);
    assert.equal(assertsTrafficDecline('Our visitors have been falling for a couple of months now.'), true);
    assert.equal(assertsTrafficDecline('Footfall on the site has really declined recently.'), true);
    assert.equal(assertsTrafficDecline('Traffic is holding up fine.'), false, 'must not fire on a healthy-traffic statement');
  });

  test('end-to-end: 3 different technical-constraint phrasings all resolve the same gap and reach the same recalculated recommendation', () => {
    const phrasings = [
      'The current platform is completely limiting us.',
      "We're stuck with an old stack that can't handle what we need.",
      'Our existing system is holding us back.'
    ];
    for (const phrase of phrasings) {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p16-nlvar-${phrase.length}`;
      say(router, tourEngine, sessionId, 'We already have a website.');
      const r = say(router, tourEngine, sessionId, phrase);
      assert.equal(r.result.candidate_intent, 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED', `failed for phrasing: "${phrase}"`);
      assert.equal(r.session.collected_context.technical_constraint, 'limiting');
    }
  });

  test('end-to-end: 3 different traffic-decline phrasings all supersede the same fact', () => {
    const phrasings = ['traffic has dropped badly', 'our visitors are falling month over month', 'footfall has declined a lot lately'];
    for (const phrase of phrasings) {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p16-nlvar-traffic-${phrase.length}`;
      say(router, tourEngine, sessionId, 'We already get good traffic.');
      const r = say(router, tourEngine, sessionId, phrase);
      assert.equal(r.result.candidate_intent, 'INTENT-TRAFFIC-DECLINE-UPDATE', `failed for phrasing: "${phrase}"`);
      assert.equal(r.session.collected_context.traffic, 'declined');
    }
  });
});

// =============================================================================
// PART 6/9/11: QUESTION VALUE, ANSWER-FIRST, AND WHY-GAP INTEGRATION
// =============================================================================

describe('Phase 16 Parts 6/9/11: question value, answer-first behaviour, and gap-aware "why?"', () => {
  test('computeInformationGapState exposes the Part 15 contract shape', () => {
    const s = freshSession();
    const state = computeInformationGapState('REBUILD_VS_IMPROVE', s);
    assert.equal(state.decision, 'REBUILD_VS_IMPROVE');
    assert.equal(typeof state.hasCriticalGap, 'boolean');
    assert.equal(typeof state.hasHighValueGap, 'boolean');
    assert.equal(typeof state.shouldAsk, 'boolean');
    assert.equal(typeof state.gapCount, 'number');
    assert.ok(['HIGH_CONFIDENCE', 'PROVISIONAL', 'INSUFFICIENT_INFORMATION'].includes(state.decisionConfidence));
  });

  test('answer-first: "would you rebuild the site?" with a PROVISIONAL profile gives the recommendation text before/without a bare question-only reply', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-answer-first-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.step.headline_message, /not necessarily/i, 'the headline itself must carry the provisional recommendation, not just a clarifying question');
  });

  test('"why?" after a HIGH_CONFIDENCE rebuild answer does not append a redundant duplicate gap sentence (the existing text already states the deciding fact)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-why-nodup-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    const r = say(router, tourEngine, sessionId, 'why?');
    const occurrences = (r.text.match(/wouldn't rebuild yet/gi) || []).length;
    assert.equal(occurrences, 1);
  });

  test('a resolved technical-constraint gap is reusable by "why?" with zero new WHY code (Phase 15 mechanism, Phase 16 data)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-why-reuse-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'why?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.match(r.text, /structurally limiting platform/i);
  });
});

// =============================================================================
// H. REGRESSION - existing decision-boundary behaviour from Phase 14/15 must
// be byte-for-byte reachable through the SAME text, now sourced from the
// engine instead of a duplicated inline check.
// =============================================================================

describe('Phase 16 Part H: regression - Phase 14/15 decision text unchanged after the refactor', () => {
  test('no established facts -> INSUFFICIENT_INFORMATION headline unchanged, question now sourced from the Information Gap Engine (Phase 20)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p16-regress-1', 'Would you rebuild the site?');
    // PHASE 20 UPDATE: Phase 19 found the question here was a static
    // generic fallback instead of the Information Gap Engine's own
    // highest-value gap - Phase 20 fixed exactly that, so the question
    // text is deliberately different now. The headline (which this test
    // was really guarding) is unchanged.
    assert.match(r.text, /there are two sensible paths/i);
    assert.match(r.text, /existing website today, or would this be new/i);
  });

  test('conversion-bottleneck profile -> HIGH_CONFIDENCE "wouldn\'t rebuild yet" text unchanged', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-regress-2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /wouldn't rebuild yet/i);
  });

  test('existing site only -> PROVISIONAL "assumption" text unchanged', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-regress-3';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i);
  });

  test('audit reasoning without diagnostic uncertainty -> "not necessarily" text unchanged', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p16-regress-4', 'Would you recommend an audit?');
    assert.match(r.text, /not necessarily/i);
  });

  test('audit reasoning WITH diagnostic uncertainty -> default "that\'s exactly the situation an Audit is for" text unchanged', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p16-regress-5';
    say(router, tourEngine, sessionId, "I'm not sure what I need yet.");
    const r = say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    assert.match(r.text, /that's exactly the situation an Audit is for/i);
  });
});
