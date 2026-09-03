import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 12: Conversational cognition regression matrix - reference resolution,
// correction recovery, and user-control signals. Each case was confirmed as a
// genuine bug against pre-Phase-12 code before being fixed (see the Phase 12
// report for exact before/after transcripts).

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

describe('Phase 12: Conversational cognition', () => {
  test('Reference resolution: bare "why?" means "why audit" in audit context (unchanged)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-why-audit';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r2 = say(router, tourEngine, sessionId, 'why?');
    assert.equal(r2.result.candidate_intent, 'INTENT-06-AUDIT-WHY');
  });

  test('Reference resolution: bare "why?" means "why does pricing work this way" in pricing context, not the unrelated audit explanation (the discovered bug)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-why-price';
    say(router, tourEngine, sessionId, 'what is your pricing');
    const r2 = say(router, tourEngine, sessionId, 'why?');
    assert.equal(r2.result.candidate_intent, 'INTENT-05-PRICE-WHY');
    assert.doesNotMatch(r2.text, /audit first is essential/i, 'must not answer an audit question that was never asked');
  });

  test('Reference resolution: "what about timeline?" after a pricing turn resolves through the PRICE context track, not the fully generic DEFAULT menu', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-price-timeline-ref';
    say(router, tourEngine, sessionId, 'what is your pricing');
    const r2 = say(router, tourEngine, sessionId, 'what about timeline?');
    assert.match(r2.text, /scope/i);
    assert.doesNotMatch(r2.text, /Diagnostic Audit[\s\S]*Technical Architecture[\s\S]*Talk to an Engineer/i, 'must not be the fully generic three-choice fallback');
  });

  test('Reference resolution: "why does that matter?" after "show me your work" resolves through the EVIDENCE context track', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-evidence-why';
    say(router, tourEngine, sessionId, 'show me your work');
    const r2 = say(router, tourEngine, sessionId, 'why does that matter?');
    assert.match(r2.text, /comparable problem was actually solved/i);
  });

  test('Correction recovery: "that\'s not what I meant" is acknowledged and recovers instead of continuing against the wrong assumption', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-correction';
    say(router, tourEngine, sessionId, 'I need a new website');
    const r2 = say(router, tourEngine, sessionId, "No, that's not what I meant. I want to improve the existing site.");
    assert.equal(r2.result.candidate_intent, 'INTENT-CORRECTION-RECOVERY');
    assert.equal(r2.session.primary_intent, undefined, 'the stale primary_intent must be cleared, not carried forward');
  });

  test('User control: "start over" resets session topic/entity state within the same session_id and returns a fresh discovery prompt', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-start-over';
    say(router, tourEngine, sessionId, 'I need SEO');
    const r2 = say(router, tourEngine, sessionId, 'start over');
    assert.equal(r2.result.candidate_intent, 'INTENT-START-OVER');
    assert.equal(r2.session.primary_intent, undefined);
    assert.deepEqual(r2.session.collected_context, {});
  });

  test('Platform-choice objection: "Can you build on Shopify?" gets a direct, grounded answer instead of the generic clarify menu', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p12-shopify', 'Can you build on Shopify?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
    assert.match(r.text, /Next\.js/);
  });

  test('Assumption check: "Shopify is enough for me, right?" gets the same honest, direct answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p12-shopify-assumption', 'Shopify is enough for me, right?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('Regression: existing CTO -> "what next?" handoff is unaffected by the bare-"why?" context-awareness change', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-regression-cto';
    say(router, tourEngine, sessionId, 'fractional cto');
    const r2 = say(router, tourEngine, sessionId, 'what next?');
    assert.equal(r2.result.candidate_intent, 'INTENT-08-HANDOFF');
  });

  test('Regression: Phase 10/11 ecommerce and consultant-synthesis paths remain intact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p12-regression-ecommerce';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 500 products.');
    const r3 = say(router, tourEngine, sessionId, 'we already have a website but no enquiries');
    assert.equal(r3.result.candidate_intent, 'INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE');
  });
});
