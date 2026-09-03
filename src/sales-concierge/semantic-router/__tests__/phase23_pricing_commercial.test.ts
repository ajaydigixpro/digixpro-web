import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 23: COMMERCIAL INTELLIGENCE, PRICING & INTERNATIONAL CURRENCY
//
// Audit found NO /pricing route, NO currency-selector/conversion
// infrastructure (INR/USD numbers exist only as hardcoded strings in
// AuditClient.tsx's FAQ block; GBP/AUD/SGD appear only as declarative
// metadata - schema.org currenciesAccepted, canonicalRegistry.ts's
// primaryMarkets - with ZERO actual displayed prices anywhere), and THREE
// independent numeric pricing sources (canonicalRegistry.ts's
// pricingReference strings, AuditClient.tsx's AUDIT_FAQS, and an external
// n8n-computed per-lead range) with no single canonical authority. Per
// Part 17's "STOP and report the authority conflict before inventing a new
// pricing mechanism" and the complexity gate, none of that was built or
// consolidated this phase - see the Phase 23 report.
//
// What WAS fixed, all as small extensions to the EXISTING deterministic
// PRICE/PRICE-NEGOTIATION/OBJECTION classification (never a new pricing
// authority, never a number invented): a broad set of natural pricing
// phrasings that fell through to the generic fuzzy fallback (or, in two
// cases, misrouted to a completely unrelated topic/case-study), an
// adversarial price-ceiling request pre-empted by the legacy Contextual
// Follow-up Query Guard, two commercial-objection phrasings not recognized
// by the existing FREELANCER/DIY objection patterns, and an audit-cost
// question answered with the generic scope-based text instead of the true,
// already-established fact (used consistently elsewhere on the site) that
// the diagnostic Audit itself is complimentary.

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
  return { result, session, text };
}

// =============================================================================
// PART 4: natural pricing-question phrasing gaps (bug fixes)
// =============================================================================

describe('Phase 23 Part 4: pricing questions not previously recognized', () => {
  const cases: [string, string][] = [
    ['"What would you charge for this?"', 'What would you charge for this?'],
    ['"Can you give me a fixed price?"', 'Can you give me a fixed price?'],
    ['"Why is it so expensive?"', 'Why is it so expensive?'],
    ['"What does the price include?"', 'What does the price include?'],
    ['"Does that include maintenance?"', 'Does that include maintenance?'],
    ['"Can I get an exact quote?"', 'Can I get an exact quote?']
  ];
  for (const [label, msg] of cases) {
    test(`${label} resolves to INTENT-05-PRICE, never invents a number`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const r = say(router, tourEngine, `p23-t-${msg.length}`, msg);
      assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
      assert.doesNotMatch(r.text, /₹[\d,]/);
    });
  }

  test('"How much for SEO?" is recognized as a pricing question, not pure topic discovery', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-seo', 'How much for SEO?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('"How much for automation?" is recognized as a pricing question', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-auto', 'How much for automation?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('"How much for an ecommerce website?" is recognized as pricing AND reuses the existing ecommerce-aware framing (not a random case study)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-ecom', 'How much for an ecommerce website?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.match(r.text, /e-commerce\/marketplace website/i);
  });
});

// =============================================================================
// PART 5/6: context-aware pricing + price interruption safety (regression-proving)
// =============================================================================

describe('Phase 23 Part 5/6: pricing preserves decision context and survives interruption', () => {
  test('price question after a rebuild recommendation references the rebuild-vs-improve decision', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p23-t-ctx1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'How much would the rebuild you recommended cost?');
    assert.match(r.text, /rebuild or an improve/i);
  });

  test('a price interruption does not destroy an established conversion-bottleneck decision', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p23-t-int1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'Traffic is fine.');
    say(router, tourEngine, sid, "But enquiries aren't great.");
    say(router, tourEngine, sid, 'What about price?');
    const r = say(router, tourEngine, sid, 'Okay, so what would you do?');
    assert.match(r.text, /conversion path/i);
  });

  test('price -> unrelated interruption -> price again gives the same stable answer (no stale topic leak)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p23-t-int2';
    say(router, tourEngine, sid, 'We already have a website.');
    const before = say(router, tourEngine, sid, 'What about price?');
    say(router, tourEngine, sid, 'By the way we are based in Mumbai.');
    const after = say(router, tourEngine, sid, 'What about price?');
    assert.equal(before.text, after.text);
  });
});

// =============================================================================
// PART 9: pricing safety adversarial (bug fixes + regression)
// =============================================================================

describe('Phase 23 Part 9: adversarial pricing pressure is safely declined, never fabricated', () => {
  test('"Just give me a number." does not invent a price', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-adv1', 'Just give me a number.');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹[\d,]/);
  });

  test('"What is the exact price?" does not invent an exact price', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-adv4', 'What is the exact price?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(r.text, /₹[\d,]/);
  });

  test('"Can you do it for ₹50,000?" is recognized as a negotiation attempt, never accepted as a counter-offer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-adv7', 'Can you do it for ₹50,000?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE-NEGOTIATION');
    assert.doesNotMatch(r.text, /sure|yes,? (we|i) can/i);
  });

  test('"Give me a discount." is recognized, no discount is ever invented', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-adv8', 'Give me a discount.');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE-NEGOTIATION');
    assert.doesNotMatch(r.text, /%|percent/i);
  });

  test('"Can you guarantee it won\'t exceed 2 lakh?" is recognized as pricing negotiation, not an unrelated IT-vendor misfire', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-adv6', "Can you guarantee it won't exceed 2 lakh?");
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE-NEGOTIATION');
    assert.doesNotMatch(r.text, /vendor lock-in/i);
  });

  test('regression: "can you guarantee" in its ORIGINAL (non-price) sense still reaches the Contextual Follow-up Query Guard', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p23-t-guard-regress';
    say(router, tourEngine, sid, 'We already have a website.');
    const r = say(router, tourEngine, sid, 'Can you guarantee this will work?');
    assert.equal(r.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
    assert.match(r.text, /vendor lock-in/i);
  });
});

// =============================================================================
// PART 10: commercial objections (bug fixes)
// =============================================================================

describe('Phase 23 Part 10: commercial objection phrasing gaps', () => {
  test('"A freelancer is cheaper." is recognized as the freelancer objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-obj2', 'A freelancer is cheaper.');
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });

  test('"I can do this myself." is recognized as the DIY objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-obj3', 'I can do this myself.');
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });

  test('"Why should I pay for this?" is recognized as a pricing/value question', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-obj4', 'Why should I pay for this?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('regression: Shopify/audit objections remain under the unified objection authority (no duplicate authority introduced)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const a = say(router, tourEngine, 'p23-t-obj5', "Can't I just use Shopify?");
    assert.equal(a.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
    const b = say(router, tourEngine, 'p23-t-obj7', 'Do I really need an audit?');
    assert.equal(b.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
  });
});

// =============================================================================
// PART 12: audit + pricing truthfulness (bug fix)
// =============================================================================

describe('Phase 23 Part 12: audit cost question is answered truthfully', () => {
  test('"How much will the audit cost?" states the Audit is complimentary, not a generic scope-based non-answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-audp1', 'How much will the audit cost?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INFO');
    assert.match(r.text, /complimentary|free/i);
  });

  test('regression: a general pricing question (not about the audit) still gets the scope-based answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-audp-regress', 'How much does a website cost?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });
});

// =============================================================================
// PART 13: pricing + timeline (regression-proving, no cross-invention)
// =============================================================================

describe('Phase 23 Part 13: pricing and timeline stay connected to decision state without inventing each other', () => {
  test('"What would the rebuild cost and how long would it take?" ties both to the active decision, invents neither', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p23-t-pt3';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'What would the rebuild cost and how long would it take?');
    assert.doesNotMatch(r.text, /₹[\d,]/);
    assert.doesNotMatch(r.text, /\d+\s*(weeks|months|days)\b/i);
  });
});

// =============================================================================
// SAFETY: no invented pricing anywhere in the default/generic PRICE path
// =============================================================================

describe('Phase 23: pricing authority safety spot checks', () => {
  test('the default PRICE response never states a concrete number', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p23-t-safety1', 'How much does a website cost?');
    assert.doesNotMatch(r.text, /₹[\d,]|\$\d/);
  });

  test('session isolation: setting industry=ecommerce for one session via the new pricing rule does not leak to another', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p23-t-iso-a', 'How much for an ecommerce website?');
    const b = say(router, tourEngine, 'p23-t-iso-b', 'How much does a website cost?');
    assert.notEqual(b.session.industry, 'ecommerce');
  });
});
