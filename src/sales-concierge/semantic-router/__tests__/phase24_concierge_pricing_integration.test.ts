import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 24: CONCIERGE <-> CANONICAL /pricing INTEGRATION
//
// The Concierge still never states a number itself (unchanged, deliberate
// safety carried over from Phase 23) - what changed is that every
// PRICE-family intent's canonical_url now points at /pricing (backed by
// src/data/pricing.ts, the resolved canonical authority) instead of
// /how-we-work, so a pricing question consistently routes to the same
// source /pricing displays rather than a page that doesn't discuss
// investment at all. Part 8's required test list, run directly.

function newRouter() {
  const router = new LocalSemanticRouter();
  router.loadPrototypes(FROZEN_PROTOTYPES);
  return router;
}
function say(router: LocalSemanticRouter, tourEngine: GuidedTourEngine, sid: string, msg: string) {
  const result = router.route(msg, sid);
  const session = router.getSession(sid);
  const step = tourEngine.resolveTourStep(result, session);
  const text = step.targeted_question ? `${step.headline_message} ${step.targeted_question}` : step.headline_message;
  return { result, session, step, text };
}

describe('Phase 24 Part 8: Concierge pricing questions route to canonical /pricing, never invent a number', () => {
  const questions = [
    'How much does a website cost?',
    'What about price?',
    'How much for SEO?',
    'How much for automation?',
    'How much for ecommerce?',
    'Can you give me an exact quote?'
  ];
  for (const q of questions) {
    test(`"${q}" -> canonical destination is /pricing, no invented number`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const r = say(router, tourEngine, `p24-q-${q.length}-${q.slice(0, 4)}`, q);
      assert.equal(r.step.canonical_destination.canonical_path, '/pricing');
      assert.doesNotMatch(r.text, /₹[\d,]/);
      assert.doesNotMatch(r.text, /\$\d/);
    });
  }

  test('"How much would the rebuild you recommended cost?" stays tied to the active decision AND routes to /pricing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p24-rebuild-price';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'How much would the rebuild you recommended cost?');
    assert.match(r.text, /rebuild or an improve/i);
    assert.equal(r.step.canonical_destination.canonical_path, '/pricing');
  });

  test('"What currency do you use?" does not invent a false claim and does not crash', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p24-currency-q', 'What currency do you use?');
    assert.doesNotMatch(r.text, /₹[\d,]|\$\d/);
  });

  test('"I\'m in the US — how much?" does not invent a US-specific price', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p24-us-price';
    say(router, tourEngine, sid, "I'm based in the US.");
    const r = say(router, tourEngine, sid, 'How much does a website cost?');
    assert.doesNotMatch(r.text, /₹[\d,]|\$\d/);
    assert.equal(r.step.canonical_destination.canonical_path, '/pricing');
  });

  test('"I\'m in the UK — how much?" does not invent a UK-specific price', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p24-uk-price';
    say(router, tourEngine, sid, "I'm in London.");
    const r = say(router, tourEngine, sid, 'How much does a website cost?');
    assert.doesNotMatch(r.text, /£[\d,]|\$\d/);
    assert.equal(r.step.canonical_destination.canonical_path, '/pricing');
  });

  test('no forced Audit and no forced Call: pricing responses offer a choice, not a mandate', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p24-no-force', 'How much does a website cost?');
    assert.ok(Array.isArray(r.step.suggested_replies) && r.step.suggested_replies.length > 1);
  });
});

describe('Phase 24 Part 9: pricing interruption preserves decision state', () => {
  test('existing website + weak enquiries + conversion recommendation -> price -> "what would you do?" still reflects the conversion recommendation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p24-interrupt';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    say(router, tourEngine, sid, "But enquiries aren't great.");
    say(router, tourEngine, sid, 'What about price?');
    const r = say(router, tourEngine, sid, 'Okay, what would you do?');
    assert.match(r.text, /conversion path/i);
  });
});

describe('Phase 24 Part 10: Audit pricing consistency', () => {
  test('"How much will the audit cost?" states the Audit is complimentary (unchanged from Phase 23, re-verified)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p24-audit-cost', 'How much will the audit cost?');
    assert.match(r.text, /complimentary|free/i);
  });

  test('no PRICE-family response claims the Audit itself costs money', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p24-audit-cost-2', 'Does the audit cost anything?');
    assert.doesNotMatch(r.text, /audit (costs|will cost|is) ₹/i);
  });
});

describe('Phase 24 Part 11: quotation safety (re-verified, unchanged from Phase 23)', () => {
  const adversarial = [
    'Give me an exact quote.',
    'Just give me a number.',
    "Can you guarantee it won't exceed ₹2 lakh?",
    'Can you do it for ₹50,000?',
    'Give me a discount.'
  ];
  for (const msg of adversarial) {
    test(`"${msg}" never fabricates an exact number, discount, or ceiling`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const r = say(router, tourEngine, `p24-adv-${msg.length}`, msg);
      assert.doesNotMatch(r.text, /\byes,? (we|i) (can|will)\b/i);
      assert.doesNotMatch(r.text, /\d+% (off|discount)/i);
    });
  }
});

describe('Phase 24: existing authorities remain intact (regression spot checks)', () => {
  test('Phase 20/21/22/23: objection authority still unified, no duplicate', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p24-regress-obj', "Can't I just use Shopify?");
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('Phase 21: no self-referential decision loop on repeated "what would you do?"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p24-regress-loop';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    const first = say(router, tourEngine, sid, 'What would you do?');
    const second = say(router, tourEngine, sid, 'What would you do?');
    assert.equal(first.text, second.text);
  });

  test('session isolation: /pricing routing in one session does not leak into another', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p24-iso-a', 'How much does a website cost?');
    const b = say(router, tourEngine, 'p24-iso-b', 'We already have a website.');
    assert.notEqual(b.step.canonical_destination.canonical_path, '/pricing');
  });
});
