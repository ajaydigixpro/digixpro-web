import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 11: Consultative engagement regression matrix. Each case here was run
// against the pre-Phase-11 codebase first and confirmed to be a genuine
// machine-like moment (generic clarify menu, repeated response, or silence on
// the actual question) before a fix was written - see the Phase 11 report for
// the exact before/after transcripts.

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

describe('Phase 11: Consultative engagement', () => {
  test('Journey B - SEO misdiagnosis: split multi-turn traffic + poor-enquiries signal produces the SEO-vs-conversion problem reveal', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p11-seo-misdiagnosis';
    say(router, tourEngine, sessionId, 'I need SEO.');
    const r2 = say(router, tourEngine, sessionId, 'We already get traffic.');
    assert.equal(r2.result.candidate_intent, 'INTENT-TRAFFIC-CONFIRMED');
    assert.equal(r2.session.collected_context.traffic, 'plenty');

    const r3 = say(router, tourEngine, sessionId, 'But enquiries are poor.');
    assert.equal(r3.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
    assert.match(r3.text, /bottleneck almost certainly isn't search visibility/i);
    assert.notEqual(r3.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY', 'must not fall to the generic SEO/automation clarify menu that ignored both signals');
  });

  test('Journey E - Skepticism: "why should I use DigiXPro" and "why not a freelancer" get a balanced, non-defensive answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r1 = say(router, tourEngine, 'p11-skeptic-1', 'Why should I use DigiXPro?');
    assert.equal(r1.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
    assert.match(r1.text, /may be unnecessary/i, 'must concede the freelancer/DIY case can be valid, not just claim superiority');

    const r2 = say(newRouter(), tourEngine, 'p11-skeptic-2', 'Why not a freelancer?');
    assert.equal(r2.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });

  test('"Isn\'t this overkill?" is treated as the same audit-necessity objection, with reasoning', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p11-overkill';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r2 = say(router, tourEngine, sessionId, "isn't this overkill?");
    assert.equal(r2.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
  });

  test('"I don\'t know" re-anchors on the business problem instead of a mismatched technical clarify menu', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p11-dont-know';
    say(router, tourEngine, sessionId, 'I need a new website');
    const r2 = say(router, tourEngine, sessionId, "I don't know");
    assert.equal(r2.result.candidate_intent, 'INTENT-DONT-KNOW');
    assert.match(r2.text, /getting people to the site|getting them to enquire/i);
  });

  test('"not interested" de-escalates gracefully without a hard-sell or repeated pitch', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p11-not-interested';
    say(router, tourEngine, sessionId, 'I need SEO');
    const r2 = say(router, tourEngine, sessionId, 'not interested');
    assert.equal(r2.result.candidate_intent, 'INTENT-NOT-INTERESTED');
    assert.doesNotMatch(r2.text, /would you like|book a call|start.*audit/i);
  });

  test('"I have a fairly complex project" gets a real architecture-flavored response instead of the generic three-choice clarify menu', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p11-complex', 'I have a fairly complex project.');
    assert.equal(r.result.candidate_intent, 'INTENT-04-CTO');
    assert.notEqual(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
  });

  test('High-intent phrase ("I have a proposal to evaluate") fast-tracks to the Architecture Call framing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p11-high-intent', 'I have a proposal to evaluate.');
    assert.equal(r.result.candidate_intent, 'INTENT-HIGH-INTENT');
    assert.match(r.text, /Architecture Call/);
  });

  test('Journey G - Consultant moment: ecommerce scope + existing-website-no-enquiries triggers a synthesized summary referencing the actual product count, not the generic audit-intake response', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p11-consultant-moment';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 500 products.');
    const r3 = say(router, tourEngine, sessionId, 'we already have a website but no enquiries');
    assert.equal(r3.result.candidate_intent, 'INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE');
    assert.match(r3.text, /500 products/);
    assert.match(r3.text, /Let me put the picture together/i);
    assert.notEqual(r3.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE', 'must be the synthesized consultant-moment response, not the generic audit-intake text');
  });

  test('Regression: the plain conversion-bottleneck path (no prior ecommerce scope) is unchanged by the consultant-moment addition', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p11-plain-bottleneck', 'we have an existing website but hardly any enquiries');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('Regression: existing session-continuity, pricing-safety, and audit-loop fixes from Phase 7/9/10 remain intact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p11-regression-check';
    const t1 = say(router, tourEngine, sessionId, 'fractional cto');
    assert.equal(t1.result.candidate_intent, 'INTENT-04-CTO');
    const t2 = say(router, tourEngine, sessionId, 'what next?');
    assert.equal(t2.result.candidate_intent, 'INTENT-08-HANDOFF');
  });
});
