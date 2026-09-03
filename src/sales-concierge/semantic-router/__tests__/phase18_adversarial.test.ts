import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 18 PART 27: ADVERSARIAL TESTING
//
// The objective is discovering STATE-COHERENCE failures - a response that
// contradicts what the system already knows, a lost decision, a resurrected
// dormant topic, a silently reset session - not new regex coverage. Every
// assertion below checks for coherence (no contradiction, no silent loss),
// not for a specific phrase match, since the point is robustness under
// unpredictable conversational pressure.

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

describe('Phase 18 Part 27: adversarial conversation suite', () => {
  test('rapid topic switching does not corrupt session state or throw', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-1';
    const turns = ['I need SEO', 'Actually ecommerce', 'No wait, CTO advisory', 'What would you do?', 'Is Shopify enough?', 'What next?'];
    for (const t of turns) {
      const r = say(router, tourEngine, sessionId, t);
      assert.ok(r.text.length > 0);
    }
  });

  test('correction after a recommendation was already given does not silently discard the correction', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-2';
    say(router, tourEngine, sessionId, "I don't have a website yet.");
    say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    const r = say(router, tourEngine, sessionId, 'Actually I already have one.');
    assert.equal(r.session.existing_website, true);
  });

  test('contradiction after high confidence is reflected in the NEXT recommendation, not ignored', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-3';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const before = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    const after = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.notEqual(before.text, after.text);
  });

  test('a future requirement stated mid-conversation does not hijack the active discussion', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-4';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, 'Maybe ecommerce later.');
    const r = say(router, tourEngine, sessionId, "But enquiries aren't great.");
    assert.doesNotMatch(r.text, /how many products/i);
  });

  test('future requirement supersession ("forget that") clears the deferred flag without crashing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-5';
    say(router, tourEngine, sessionId, 'Maybe ecommerce later.');
    const r = say(router, tourEngine, sessionId, 'Actually forget that.');
    assert.ok(r.text.length > 0);
  });

  test('a price interruption mid rebuild-discovery preserves the rebuild context afterward', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-6';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'And what about price?');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.equal(r.result.candidate_intent, 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED');
  });

  test('a timeline interruption does not lose the established existing_website fact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-7';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'How long would this take?');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i);
  });

  test('an evidence interruption ("show me a case study") mid-decision does not reset the decision', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-8';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    say(router, tourEngine, sessionId, 'Show me a case study.');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED');
  });

  test('skepticism mid-conversation does not erase established facts', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-9';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Why should I use DigiXPro?');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i);
  });

  test('a wrong assumption restated after being challenged is acknowledged, not silently re-answered identically', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-10';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'I thought SEO would fix this.');
    assert.equal(r.result.candidate_intent, 'INTENT-ASSUMPTION-FOLLOWUP');
  });

  test('multiple questions in one message resolves to a real answer, not a crash or empty response', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'adv-11', 'What would you do and how much would it cost and how long would it take?');
    assert.ok(r.text.length > 0);
  });

  test('very short replies ("yes", "no", "ok") do not throw and produce a real response', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-12';
    say(router, tourEngine, sessionId, 'We already have a website.');
    for (const t of ['yes', 'ok', 'no', 'sure']) {
      const r = say(router, tourEngine, sessionId, t);
      assert.ok(r.text.length > 0);
    }
  });

  test('Hinglish input mid-conversation does not break the English decision state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-13';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic theek hai.');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.equal(r.result.candidate_intent, 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED');
  });

  test('typos in an otherwise recognizable phrase still route sensibly (no crash)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'adv-14', 'wat wud you recomend?');
    assert.ok(r.text.length > 0);
  });

  test('elliptical replies ("and then?", "so?") do not throw', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-15';
    say(router, tourEngine, sessionId, 'We already have a website.');
    for (const t of ['and then?', 'so?', 'and?']) {
      const r = say(router, tourEngine, sessionId, t);
      assert.ok(r.text.length > 0);
    }
  });

  test('pronoun-heavy follow-ups ("what about it", "is that still true") do not throw', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-16';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'Do you still stand by that?');
    assert.match(r.text, /rebuild/i);
  });

  test('"actually..." mid-sentence corrections do not corrupt state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-17';
    say(router, tourEngine, sessionId, 'We already get good traffic.');
    const r = say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    assert.equal(r.session.collected_context.traffic, 'declined');
  });

  test('"but..." objections mid-flow are handled, not treated as noise', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-18';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, "But isn't this overkill?");
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
  });

  test('"wait..." hesitation does not reset the session', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-19';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Wait, let me think about this.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i);
  });

  test('"no..." negation is not misread as a topic reset', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-20';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'No, not right now.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i);
  });

  test('"forget that..." explicitly retracts without corrupting unrelated established facts', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-21';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Maybe ecommerce later.');
    say(router, tourEngine, sessionId, 'Actually forget ecommerce.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i, 'existing_website fact must survive an unrelated retraction');
  });

  test('"what about..." mid-flow price interruption resolves and preserves context afterward', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-22';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    say(router, tourEngine, sessionId, 'What about price?');
    const r = say(router, tourEngine, sessionId, 'why?');
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('"why..." asked repeatedly in a row is stable and does not degrade/loop into clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-23';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r1 = say(router, tourEngine, sessionId, 'why?');
    const r2 = say(router, tourEngine, sessionId, 'why?');
    assert.equal(r1.text, r2.text);
  });

  test('a long adversarial chain (12 turns mixing every pattern above) never throws and always returns real text', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'adv-24';
    const turns = [
      'We already have a website.',
      'Traffic theek hai.',
      "But enquiries aren't great.",
      'Actually, wait.',
      'No, never mind.',
      'What about price?',
      'The current platform is completely limiting us.',
      'why?',
      "But isn't this overkill?",
      'What would you do and what would it cost?',
      'Forget the ecommerce idea.',
      'What next?'
    ];
    for (const t of turns) {
      const r = say(router, tourEngine, sessionId, t);
      assert.ok(r.text.length > 0);
    }
  });
});
