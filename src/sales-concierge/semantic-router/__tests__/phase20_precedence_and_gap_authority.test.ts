import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 20: ONE CONVERSATIONAL DECISION AUTHORITY
//
// Focused regression tests for the two bounded fixes Phase 19's audit
// identified and Phase 20 implemented:
//   Finding 1: the unified OBJECTION authority (messageFunction.ts ->
//     responseStrategy.ts::resolveObjection) now runs BEFORE the legacy
//     Contextual Follow-up Query Guard in precedence.ts, so a genuine
//     objection can no longer be silently pre-empted by the Guard's
//     blanket phrase match - fixed by REORDERING, not by excluding phrases.
//   Finding 2: INTENT-REBUILD-VS-IMPROVE's INSUFFICIENT branch now asks
//     the Information Gap Engine's own highest-value question
//     (informationGap.ts's computeInformationGapState/topGap) instead of a
//     static generic fallback - mirroring the existing PRICE/TIMELINE
//     pattern in tour-matrix.ts, with no new question registry.

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

describe('Phase 20 Finding 1: OBJECTION authority wins over the legacy Contextual Guard', () => {
  test('A. "Would Shopify be enough?" (turn 1) now resolves to INTENT-PLATFORM-OBJECTION', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-a', 'Would Shopify be enough?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('B. "Why would I need custom?" now resolves to INTENT-PLATFORM-OBJECTION', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-b', 'Why would I need custom?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('C. "Is Shopify enough for me?" remains correct (was already unified before Phase 20)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-c', 'Is Shopify enough for me?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  describe('D. at least 3 legitimate non-objection Contextual Guard cases remain unchanged', () => {
    test('D1. "How do I know the website itself is the problem?" (after context) -> INTENT-CONTEXTUAL-CLARIFY', () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = 'p20-d1';
      say(router, tourEngine, sessionId, 'We already have a website.');
      const r = say(router, tourEngine, sessionId, 'How do I know the website itself is the problem?');
      assert.equal(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
    });

    test('D2. "Can you check before I spend money?" (after context) -> INTENT-CONTEXTUAL-CLARIFY', () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = 'p20-d2';
      say(router, tourEngine, sessionId, 'We already have a website.');
      const r = say(router, tourEngine, sessionId, 'Can you check before I spend money on this?');
      assert.equal(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
    });

    test('D3. "Should I spend money on SEO?" (after context) -> INTENT-CONTEXTUAL-CLARIFY', () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = 'p20-d3';
      say(router, tourEngine, sessionId, 'We already have a website.');
      const r = say(router, tourEngine, sessionId, 'Should I spend money on SEO right now?');
      assert.equal(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
    });

    test('D4. "What would you need from us?" (after context) -> INTENT-CONTEXTUAL-CLARIFY', () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = 'p20-d4';
      say(router, tourEngine, sessionId, 'We already have a website.');
      const r = say(router, tourEngine, sessionId, 'What would you need from us to get started?');
      assert.equal(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
    });
  });

  test('E. Same objection after an established conversation still reaches the unified objection authority', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-e';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'Would Shopify be enough?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('F. An objection after an active decision still respects/bridges to the current decision state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-f';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'Would Shopify be enough?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
    assert.match(r.text, /leaning toward a rebuild/i, 'must bridge to the already-established REBUILD_VS_IMPROVE decision, not answer in a vacuum');
  });

  test('Scenario 3 (required): "Hello" then "Would Shopify be enough?" -> INTENT-PLATFORM-OBJECTION (proves the original_goal-gate hazard is closed)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-scenario3';
    say(router, tourEngine, sessionId, 'Hello');
    const r = say(router, tourEngine, sessionId, 'Would Shopify be enough?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('unseen phrasing: a materially different objection phrasing is still caught (not a fix limited to the exact 2 audited phrases)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-unseen';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'Do you build with Shopify?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });
});

describe('Phase 20 Finding 2: Information Gap Engine is the question authority for INTENT-REBUILD-VS-IMPROVE INSUFFICIENT', () => {
  test('1. Fresh insufficient REBUILD_VS_IMPROVE state selects the actual highest-value existing gap', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-gap-1', 'Would you rebuild the site?');
    assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(r.step.targeted_question || '', /existing website today, or would this be new/i);
  });

  test('2. The returned question equals the Information Gap Engine\'s own selected question, verbatim', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-gap-2', 'Would you rebuild the site?');
    // informationGap.ts's REBUILD_VS_IMPROVE.existing_website.questionText
    assert.equal(r.step.targeted_question, 'Do you have an existing website today, or would this be new?');
  });

  test('3. If state changes and another gap becomes highest-value, the returned question changes accordingly', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-gap-3';
    const before = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(before.step.targeted_question || '', /existing website today/i);
    // Answering existing_website leaves technical_constraint as the next highest-value gap.
    say(router, tourEngine, sessionId, 'We already have a website.');
    const after = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.doesNotMatch(after.text, /existing website today, or would this be new/i, 'must not re-ask an already-answered gap');
  });

  test('4. No duplicate question is introduced - the question comes from ONE source (informationGap.ts), not a second hardcoded copy', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-gap-4', 'Would you rebuild the site?');
    const occurrences = (r.text.match(/existing website today/gi) || []).length;
    assert.equal(occurrences, 1);
  });

  test('5. Once enough information exists, the system stops asking and returns the recommendation/action', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-gap-5';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.equal(r.result.candidate_intent, 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED');
    assert.doesNotMatch(r.text, /existing website today, or would this be new/i);
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('Scenario 7 (required): answering the gap question changes the next turn rather than repeating the same question', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-scenario7';
    const t1 = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(t1.text, /existing website today, or would this be new/i);
    say(router, tourEngine, sessionId, 'We already have a website.');
    const t3 = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.doesNotMatch(t3.text, /existing website today, or would this be new/i, 'must not repeat the same question once answered');
    assert.match(t3.text, /assumption/i, 'must move to the next state (PROVISIONAL lean-to-improve), not repeat itself');
  });

  test('regression: PRICE/TIMELINE contextual gap-question behaviour is unaffected by this change', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-price-regress';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'And what about price?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
  });

  test('regression: AUDIT_VS_SELF_SERVICE INSUFFICIENT/default text is unaffected (only REBUILD_VS_IMPROVE was in scope)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-audit-regress', 'Would you recommend an audit?');
    assert.equal(r.result.candidate_intent, 'INTENT-AUDIT-REASONING');
    assert.match(r.text, /not necessarily/i);
  });
});

describe('Phase 20: regression invariants', () => {
  test('future/deferred ecommerce cannot resurrect itself (invariant 11)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-inv-11';
    say(router, tourEngine, sessionId, 'We might want ecommerce down the line.');
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.doesNotMatch(r.text, /e-commerce\/marketplace website/i);
  });

  test('existing website correction remains valid (invariant 12)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-inv-12';
    say(router, tourEngine, sessionId, "I don't have a website yet.");
    const r = say(router, tourEngine, sessionId, 'Actually I already have one.');
    assert.equal(r.session.existing_website, true);
  });

  test('WHY lookback remains valid (invariant 14)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-inv-14';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    say(router, tourEngine, sessionId, 'And what about price?');
    const r = say(router, tourEngine, sessionId, 'why?');
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('WHAT NEXT remains decision-aware (invariant 15)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p20-inv-15';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED');
  });

  test('no forced Audit or Architecture Call from the reordered objection path (invariants 8/9)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p20-inv-89', 'Would Shopify be enough?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.notEqual(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('session isolation remains intact across the reordered rule (invariant 18)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p20-iso-a', 'Would Shopify be enough?');
    const b = say(router, tourEngine, 'p20-iso-b', 'What next?');
    assert.equal(b.result.candidate_intent, 'INTENT-02-NAV-DESIGN');
  });
});
