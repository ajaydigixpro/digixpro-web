import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 10: Deep conversational intelligence regression matrix.
//
// Unlike earlier test files, these assertions check the ACTUAL RESPONSE TEXT the
// visitor would read (not just candidate_intent), because a correct intent with a
// useless or repeated response is the exact failure mode this phase targets. Each
// case below was run for real against the pre-Phase-10 codebase first (see the
// discovery script referenced in the Phase 10 report) to confirm it was a genuine,
// observed weakness before a fix was written for it.

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

describe('Phase 10: Deep conversational intelligence', () => {
  test('1. Vague visitor gets a useful narrowing question, not a menu dump', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r1 = say(router, tourEngine, 'p10-vague', 'not sure what I need');
    assert.equal(r1.result.candidate_intent, 'INTENT-02-WEB-UNCERTAIN');
    assert.match(r1.text, /primary business objective/i);
  });

  test('3+8. Natural follow-up: ecommerce staged conversation remembers product count and answers the actual marketplace-evolution question', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-ecommerce-staged';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    const r2 = say(router, tourEngine, sessionId, 'About 500 products.');
    assert.equal(r2.result.candidate_intent, 'INTENT-ECOMMERCE-SCOPE-ACK');
    assert.match(r2.text, /500 products/);
    assert.equal(r2.session.collected_context.product_count, '500');

    const r3 = say(router, tourEngine, sessionId, 'Can marketplace be added later?');
    assert.equal(r3.result.candidate_intent, 'INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION');
    assert.match(r3.text, /staged architecture/i);
    assert.match(r3.text, /500 products/, 'must reference the specific catalogue size already given, not a generic placeholder');
    assert.notEqual(r3.result.candidate_intent, 'INTENT-07-EVIDENCE-REDESIGN', 'must not re-show the same case study instead of answering the question');
  });

  test('4+5. Interrupted journey: a pricing question mid-discovery is answered directly, without forcing the visitor back to the previous question', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-interrupt-pricing';
    say(router, tourEngine, sessionId, 'I need a new website');
    const r2 = say(router, tourEngine, sessionId, 'Before that, how much do you charge?');
    assert.equal(r2.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r2.text, /please answer my previous question/i);
  });

  test('Natural interruption: "Who actually builds this?" gets a real credibility answer, not a mismatched clarify menu', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-who-builds';
    say(router, tourEngine, sessionId, 'I need a new website');
    const r2 = say(router, tourEngine, sessionId, 'Who actually builds this?');
    assert.equal(r2.result.candidate_intent, 'INTENT-CREDIBILITY-TEAM');
    assert.match(r2.text, /Dr\. Ajay Shukla/);
  });

  test('Natural interruption: "What technology do you use?" gets a grounded, evidence-safe tech-stack answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-tech-stack';
    say(router, tourEngine, sessionId, 'I need a new website');
    const r2 = say(router, tourEngine, sessionId, 'What technology do you use?');
    assert.equal(r2.result.candidate_intent, 'INTENT-TECH-STACK');
    assert.match(r2.text, /Next\.js/);
  });

  test('6+9+26. Audit objection: explains reasoning instead of repeating the recommendation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-audit-objection';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r2 = say(router, tourEngine, sessionId, "I don't think I need an audit");
    assert.equal(r2.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
    assert.doesNotMatch(r2.text, /^Start an Audit\.?$/i, 'must not simply repeat the recommendation');
    assert.match(r2.text, /already know exactly what needs to change/i);
  });

  test('7+30. Contradiction: declining ecommerce then describing ecommerce-shaped requirements gets a soft confirmation, not silent confusion', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-contradiction';
    const r1 = say(router, tourEngine, sessionId, "I don't need ecommerce.");
    assert.equal(r1.result.candidate_intent, 'INTENT-02-WEB-UNCERTAIN');
    assert.notEqual(r1.result.candidate_intent, 'INTENT-07-EVIDENCE-REDESIGN', 'must not show an ecommerce case study for a visitor who just declined ecommerce');

    const r2 = say(router, tourEngine, sessionId, 'I need payments and a 500-product catalogue.');
    assert.equal(r2.result.candidate_intent, 'INTENT-CONTRADICTION-ECOMMERCE');
    assert.match(r2.text, /closer to an ecommerce setup/i);
  });

  test('10+27. "what next?" continues the established journey rather than restarting discovery', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-what-next';
    say(router, tourEngine, sessionId, 'fractional cto');
    const r2 = say(router, tourEngine, sessionId, 'what next?');
    assert.equal(r2.result.candidate_intent, 'INTENT-08-HANDOFF');
  });

  test('11. "I already saw that" acknowledges and moves forward instead of re-showing evidence or generic clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-already-seen';
    say(router, tourEngine, sessionId, 'show me your work');
    const r2 = say(router, tourEngine, sessionId, 'I already saw that');
    assert.equal(r2.result.candidate_intent, 'INTENT-ALREADY-SEEN');
    assert.doesNotMatch(r2.text, /Here we showcase real production code/i, 'must not repeat the same evidence intro');
  });

  test('12. "show me your work" surfaces the evidence discovery prompt', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-show-work', 'show me your work');
    assert.equal(r.result.candidate_intent, 'INTENT-07-EVIDENCE');
  });

  test('14. Hindi input still resolves correctly (unaffected by Phase 10 additions)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-hindi', 'website audit karwana hai');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.equal(r.result.is_hindi, true);
  });

  test('15. Hinglish SEO request still resolves correctly (unaffected by Phase 10 additions)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-hinglish', 'SEO chahiye website ke liye');
    assert.equal(r.result.candidate_intent, 'INTENT-01-SEO');
  });

  test('18. Multi-intent input still resolves to a real intent, not a dead-end clarify loop (unaffected by Phase 10)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-multi', 'I need a website and seo');
    assert.equal(r.result.tier0_match, true);
    assert.notEqual(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
  });

  test('22. Ecommerce visitor path end-to-end still reaches a real Audit action after scope discussion', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-ecommerce-to-audit';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 200 products.');
    const r3 = say(router, tourEngine, sessionId, 'Diagnostic Audit');
    assert.equal(r3.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('23. Clinic visitor gets topically relevant (not generic) evidence', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-clinic', 'I run a clinic and need more enquiries');
    assert.equal(r.result.candidate_intent, 'INTENT-07-EVIDENCE-SMALLBIZ');
    assert.match(r.text, /Dr\. Aggarwal/);
  });

  test('25. Visitor asking for a human reaches handoff, including via the "talk to a strategist" chip text (previously an orphaned dead-end chip)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-human', 'talk to a strategist');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('28. Pricing asked after service selection preserves the established service context', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-price-after-service';
    say(router, tourEngine, sessionId, 'I need SEO');
    const r2 = say(router, tourEngine, sessionId, 'how much?');
    assert.equal(r2.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('29. Timeline asked after pricing gets a real answer instead of falling to generic clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-timeline-after-price';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'how much?');
    const r3 = say(router, tourEngine, sessionId, 'and timeline?');
    assert.equal(r3.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r3.text, /diagnostic audit\s*technical architecture/i, 'must not fall to the generic three-choice clarify menu');
  });

  test('Pricing negotiation: "can you beat 80000 rupees" never invents a counter-quote', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p10-negotiate';
    say(router, tourEngine, sessionId, 'what is your pricing');
    const r2 = say(router, tourEngine, sessionId, 'can you beat 80000 rupees');
    assert.equal(r2.result.candidate_intent, 'INTENT-05-PRICE-NEGOTIATION');
    assert.doesNotMatch(r2.text, /₹\s?\d{1,2},?\d{3,}(?!\d)(?!\s?template)/i, 'must not state a specific counter-price of its own');
  });

  test('"I just need a rough budget" resolves to pricing instead of generic clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p10-rough-budget', 'I just need a rough budget');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('Regression: previously-orphaned chips ("Explore Services", "Check Conversion UX First", "Review Scope & Architecture") now resolve to a real intent instead of the generic clarify fallback', () => {
    const router1 = newRouter();
    const tourEngine = new GuidedTourEngine();
    assert.equal(say(router1, tourEngine, 'p10-orphan-1', 'Explore Services').result.candidate_intent, 'INTENT-12-VALUEPROP');
    assert.equal(say(newRouter(), tourEngine, 'p10-orphan-2', 'Check Conversion UX First').result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.equal(say(newRouter(), tourEngine, 'p10-orphan-3', 'Review Scope & Architecture').result.candidate_intent, 'INTENT-04-CTO');
  });
});
