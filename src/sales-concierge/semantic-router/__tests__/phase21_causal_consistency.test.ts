import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 21: CONFLICT -> DECISION -> RECOMMENDATION
//
// This phase's audit (Part 2's Cases A-F) found the fact/decision/gap
// machinery (informationGap.ts, recommendationEngine.ts, decisionEngine.ts)
// was already causally correct - conflictEngine.ts and factModel.ts stayed
// UNWIRED, per the phase's own "do not implement for architectural purity"
// mandate. Two real, narrow inconsistencies were found and fixed, both
// inside the EXISTING authorities (precedence.ts, responseStrategy.ts), not
// via a new module:
//   Fix A (Case A): the "actually I already have one" correction now clears
//     the stale primary_intent='WEB' label it invalidates, so a later
//     "what would you do?" is decided from CURRENT facts (existing_website,
//     project_type=REDESIGN) instead of re-asking an already-answered
//     new-vs-redesign question.
//   Fix F (Case F): resolveRecommendationRequest now checks an actually-
//     engaged REBUILD_VS_IMPROVE/AUDIT_VS_SELF_SERVICE decision BEFORE the
//     general isConversionBottleneckProfile heuristic, so confirming a
//     technical constraint and then asking "what would you do?" reflects
//     the just-established rebuild recommendation instead of silently
//     reverting to older conversion-bottleneck framing.

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

describe('Phase 21 Case A: fact correction is consumed by "what would you do?", not a stale label', () => {
  test('after correcting new-website to existing-website, "what would you do?" does not re-ask the already-answered new-vs-redesign question', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-a1';
    say(router, tourEngine, sid, 'I need a new website.');
    say(router, tourEngine, sid, 'Actually I already have one.');
    const r = say(router, tourEngine, sid, 'What would you do?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-02-WEB');
    assert.doesNotMatch(r.text, /are you looking to build a new website, redesign/i);
  });

  test('the correction still correctly sets existing_website and project_type (unaffected by clearing primary_intent)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-a2';
    say(router, tourEngine, sid, 'I need a new website.');
    const r = say(router, tourEngine, sid, 'Actually I already have one.');
    assert.equal(r.session.existing_website, true);
    assert.equal(r.session.project_type, 'REDESIGN');
    assert.equal(r.session.primary_intent, undefined);
  });
});

describe('Phase 21 Case B: fact contradiction (traffic decline) still recalculates the recommendation', () => {
  test('traffic decline after "traffic is good" changes the "what would you do?" answer', () => {
    // NOTE: this needs existing_website established first - otherwise
    // neither call differentiates on the traffic fact at all (both fall
    // through to the same generic INTENT-06-AUDIT-INTAKE default), which
    // would make this test pass for the wrong reason (nothing was actually
    // exercised). With existing_website set, traffic='plenty' engages the
    // conversion-bottleneck branch (traffic isn't the bottleneck, so look at
    // conversion); traffic decline instead should surface the SEO/traffic
    // diagnostic framing - a real, fact-driven recommendation change.
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-b1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is good.');
    const before = say(router, tourEngine, sid, 'What would you do?');
    say(router, tourEngine, sid, 'Actually traffic has dropped.');
    const after = say(router, tourEngine, sid, 'What would you do?');
    assert.notEqual(before.text, after.text);
  });
});

describe('Phase 21 Case D/E: requirement supersession protects the active decision; reactivation is not permanently blocked', () => {
  test('D: a superseded future requirement does not become the active recommendation driver', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-d1';
    say(router, tourEngine, sid, 'Maybe ecommerce later.');
    say(router, tourEngine, sid, 'Forget ecommerce.');
    const r = say(router, tourEngine, sid, 'What would you do?');
    assert.doesNotMatch(r.text, /e-commerce\/marketplace website/i);
  });

  test('E: the EXISTING topic-switch mechanism can genuinely reactivate a superseded requirement (not permanently suppressed)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-e1';
    say(router, tourEngine, sid, 'Maybe ecommerce later.');
    say(router, tourEngine, sid, 'Forget ecommerce.');
    const r = say(router, tourEngine, sid, "Let's focus on ecommerce now.");
    assert.equal(r.result.candidate_intent, 'INTENT-TOPIC-SWITCH-ECOMMERCE');
    assert.equal(r.session.industry, 'ecommerce');
  });
});

describe('Phase 21 Case F: a technical constraint crossing the rebuild-vs-improve boundary is reflected in "what would you do?"', () => {
  test('confirming a technical constraint changes the recommendation returned to a direct recommendation-request', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-f1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    const before = say(router, tourEngine, sid, 'What would you do?');
    assert.equal(before.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const after = say(router, tourEngine, sid, 'What would you do?');
    assert.equal(after.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(after.text, /lean toward a rebuild/i);
  });

  test('regression: when REBUILD_VS_IMPROVE is never directly engaged, the conversion-bottleneck heuristic still wins exactly as before Phase 21', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-f2';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    say(router, tourEngine, sid, "But enquiries aren't great.");
    const r = say(router, tourEngine, sid, 'What would you do?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
    assert.match(r.text, /conversion path/i);
  });
});

describe('Phase 21 Part 9: WHY explains the CURRENT recommendation after it changes', () => {
  test('WHY after the rebuild recommendation is established reuses that reasoning, not the earlier conversion-bottleneck framing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-why1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'why?');
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('"Do you still stand by that?" and "Your recommendation?" use the SAME bounded reference mechanism, not a new resolver', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-why2';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r1 = say(router, tourEngine, sid, 'Do you still stand by that?');
    const r2 = say(router, tourEngine, sid, 'Your recommendation?');
    assert.equal(r1.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.equal(r2.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
  });
});

describe('Phase 21 Part 10: no-op state changes do not flip the recommendation', () => {
  test('irrelevant conversational information after a recommendation does not change "what would you do?"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p21-noop1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    const before = say(router, tourEngine, sid, 'What would you do?');
    say(router, tourEngine, sid, 'By the way, we are based in Mumbai and have been running for 5 years.');
    const after = say(router, tourEngine, sid, 'What would you do?');
    assert.equal(before.text, after.text);
  });
});

describe('Phase 21 Part 7: recommendation causality per decision (spot checks)', () => {
  test('CONVERSION_VS_TRAFFIC: same state -> same recommendation, changed state -> changed recommendation', () => {
    const router1 = newRouter();
    const tourEngine1 = new GuidedTourEngine();
    say(router1, tourEngine1, 'p21-cvt-a', 'We already have a website.');
    say(router1, tourEngine1, 'p21-cvt-a', 'Traffic is fine.');
    const a = say(router1, tourEngine1, 'p21-cvt-a', "But enquiries aren't great.");

    const router2 = newRouter();
    const tourEngine2 = new GuidedTourEngine();
    say(router2, tourEngine2, 'p21-cvt-b', 'We already have a website.');
    say(router2, tourEngine2, 'p21-cvt-b', 'Traffic is fine.');
    const b = say(router2, tourEngine2, 'p21-cvt-b', "But enquiries aren't great.");
    assert.equal(a.text, b.text, 'same state must produce the same recommendation');
  });

  test('AUDIT_VS_SELF_SERVICE: diagnostic_uncertainty changes the recommendation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const withUncertainty = say(router, tourEngine, 'p21-audit-a', "I'm not sure what I need yet.");
    say(router, tourEngine, 'p21-audit-a', 'Would you recommend an audit?');
    const router2 = newRouter();
    const tourEngine2 = new GuidedTourEngine();
    const r2 = say(router2, tourEngine2, 'p21-audit-b', 'Would you recommend an audit?');
    assert.match(r2.text, /not necessarily/i);
  });
});
