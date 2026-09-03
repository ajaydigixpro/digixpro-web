import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';
import {
  detectFutureRequirementStatement,
  detectSupersessionStatement,
  recordFutureRequirement,
  supersedeFutureRequirement,
  isFutureRequirementPending,
  isFutureRequirementSuperseded
} from '../decisionEngine';
import type { VisitorSessionState } from '../types';

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

function fakeSession(overrides: Partial<VisitorSessionState> = {}): VisitorSessionState {
  return {
    session_id: 'fake',
    previous_states: ['NEW_VISITOR'],
    collected_context: {},
    journey_history: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides
  };
}

describe('Phase 14: decisionEngine.ts unit tests (multi-intent future/supersede mechanism)', () => {
  test('detectFutureRequirementStatement recognizes "and maybe X later" for a known requirement key', () => {
    assert.equal(detectFutureRequirementStatement('and maybe ecommerce later'), 'ecommerce');
    assert.equal(detectFutureRequirementStatement('marketplace eventually'), 'marketplace');
    assert.equal(detectFutureRequirementStatement('automation down the line'), 'automation');
  });

  test('detectFutureRequirementStatement returns null for a real question (handled by the existing Phase 10 rule instead)', () => {
    assert.equal(detectFutureRequirementStatement('can marketplace be added later?'), null);
  });

  test('detectFutureRequirementStatement returns null when no known requirement key is present', () => {
    assert.equal(detectFutureRequirementStatement('maybe later'), null);
  });

  test('detectSupersessionStatement recognizes "actually forget X"', () => {
    assert.equal(detectSupersessionStatement('actually forget ecommerce for now'), 'ecommerce');
    assert.equal(detectSupersessionStatement('never mind the marketplace'), 'marketplace');
    assert.equal(detectSupersessionStatement('skip automation'), 'automation');
  });

  test('record -> supersede lifecycle clears industry/business_type set by an unrelated keyword match', () => {
    const session = fakeSession({ industry: 'ecommerce', business_type: 'ecommerce' });
    recordFutureRequirement(session, 'ecommerce');
    assert.equal(isFutureRequirementPending(session, 'ecommerce'), true);
    supersedeFutureRequirement(session, 'ecommerce');
    assert.equal(isFutureRequirementSuperseded(session, 'ecommerce'), true);
    assert.equal(session.industry, undefined);
    assert.equal(session.business_type, undefined);
  });
});

describe('Phase 14: Part V — 5 multi-intent scenarios', () => {
  test('1. Primary + secondary + future requirements are all captured, not just the last keyword', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-multi-1';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    const r2 = say(router, tourEngine, sessionId, 'About 500 products.');
    assert.equal(r2.session.collected_context.product_count, '500');
    const r3 = say(router, tourEngine, sessionId, 'I also want WhatsApp automation.');
    assert.equal(r3.result.tier0_match, true);
    const r4 = say(router, tourEngine, sessionId, 'And maybe marketplace later.');
    assert.equal(r4.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
  });

  test('2. "What about marketplace?" after a future-requirement mention resolves through the existing staged-architecture rule', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-multi-2';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 300 products.');
    say(router, tourEngine, sessionId, 'Marketplace maybe later.');
    const r = say(router, tourEngine, sessionId, 'Can marketplace be added later?');
    assert.equal(r.result.candidate_intent, 'INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION');
  });

  test('3. A future requirement retracted mid-conversation is marked superseded, not silently dropped or re-triggered', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-multi-3';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'And maybe marketplace later.');
    const r = say(router, tourEngine, sessionId, 'Actually forget marketplace for now.');
    assert.equal(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });

  test('4. Superseding ecommerce clears the industry-based pricing personalization so a later price question is not misattributed', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-multi-4';
    say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
    say(router, tourEngine, sessionId, 'Actually forget ecommerce for now.');
    const r = say(router, tourEngine, sessionId, 'what is your pricing');
    assert.doesNotMatch(r.text, /e-commerce\/marketplace website/i, 'must not describe a superseded ecommerce project when quoting scope-dependence');
  });

  test('5. A secondary requirement (automation) mentioned alongside a primary one still resolves to a real, on-topic intent', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-multi-5', 'I need a website redesign and also WhatsApp automation.');
    assert.equal(r.result.tier0_match, true);
  });
});

describe('Phase 14: Part V — 5 assumption/reality conflict scenarios', () => {
  test('1. "I thought SEO would fix it" after a conversion-bottleneck reveal still resolves to a real intent (assumption stated, not silently erased)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-assume-1';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'We already get traffic.');
    say(router, tourEngine, sessionId, 'But enquiries are poor.');
    const r = say(router, tourEngine, sessionId, 'I thought SEO would fix it.');
    assert.equal(r.result.tier0_match, true);
  });

  test('2. Declined ecommerce, then ecommerce-shaped requirements, triggers the soft-contradiction confirmation (Phase 10/11, unaffected by Phase 14)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-assume-2';
    say(router, tourEngine, sessionId, "I don't need ecommerce.");
    const r = say(router, tourEngine, sessionId, 'I need payments and a 500-product catalogue.');
    assert.equal(r.result.candidate_intent, 'INTENT-CONTRADICTION-ECOMMERCE');
  });

  test('3. "Traffic is okay" then "But enquiries aren\'t" (elliptical negation) still connects the two facts', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-assume-3';
    say(router, tourEngine, sessionId, 'I need a new website.');
    say(router, tourEngine, sessionId, 'Traffic is okay.');
    const r = say(router, tourEngine, sessionId, "But enquiries aren't.");
    assert.equal(r.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
  });

  test('4. A stale primary_intent (AUTO, from several turns earlier) does not override an established conversion-bottleneck profile when asked "what would you do"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-assume-4';
    say(router, tourEngine, sessionId, 'I need a new website.');
    say(router, tourEngine, sessionId, 'Actually I already have one.');
    say(router, tourEngine, sessionId, 'Traffic is okay.');
    say(router, tourEngine, sessionId, "But enquiries aren't.");
    say(router, tourEngine, sessionId, 'I also want WhatsApp automation.');
    const r = say(router, tourEngine, sessionId, 'what would you do if this were your project?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-03-AUTO-CRM', 'must not answer about CRM sync when the actual established picture is a conversion bottleneck');
    assert.match(r.text, /conversion path/i);
  });

  test('5. "Actually I already have one" corrects an established new-website claim rather than falling to generic clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-assume-5';
    say(router, tourEngine, sessionId, 'I need a new website.');
    const r = say(router, tourEngine, sessionId, 'Actually I already have one.');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.equal(r.session.existing_website, true);
  });
});

describe('Phase 14: Part V — 5 rebuild-vs-improve scenarios', () => {
  test('1. Conversion-bottleneck profile -> HIGH_CONFIDENCE "I wouldn\'t rebuild yet"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-rebuild-1';
    say(router, tourEngine, sessionId, 'I need a new website.');
    say(router, tourEngine, sessionId, 'Actually I already have one.');
    say(router, tourEngine, sessionId, 'Traffic is okay.');
    say(router, tourEngine, sessionId, 'But enquiries are poor.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(r.text, /wouldn't rebuild yet/i);
  });

  test('2. The recommendation states what would change it (reversibility)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-rebuild-2';
    say(router, tourEngine, sessionId, 'I need a new website.');
    say(router, tourEngine, sessionId, 'Actually I already have one.');
    say(router, tourEngine, sessionId, 'Traffic is okay.');
    say(router, tourEngine, sessionId, 'But enquiries are poor.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /would change this recommendation/i);
  });

  test('3. Existing site, no confirmed conversion bottleneck -> PROVISIONAL lean to improve with stated assumption', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-rebuild-3';
    say(router, tourEngine, sessionId, 'I need a new website.');
    say(router, tourEngine, sessionId, 'Actually I already have one.');
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /assumption/i);
  });

  test('4. No established facts at all -> INSUFFICIENT_INFORMATION, asks for the deciding fact rather than guessing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-rebuild-4', 'Would you rebuild the site?');
    assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    // PHASE 20 UPDATE: the question itself now comes from the Information
    // Gap Engine's own highest-value gap (informationGap.ts) instead of a
    // static generic fallback - Phase 19 found this inconsistency and
    // Phase 20 fixed it. The headline still honestly states there isn't
    // enough to decide; the question is now specific instead of generic.
    assert.match(r.text, /there are two sensible paths|don't have enough/i, 'still honestly states the decision is unresolved');
    assert.match(r.text, /existing website today, or would this be new/i, 'the question must be the Information Gap Engine\'s own highest-value gap, not a generic fallback');
  });

  test('5. "Is a rebuild necessary" (paraphrase) resolves through the same decision-boundary rule', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-rebuild-5', 'Is a rebuild necessary?');
    assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
  });
});

describe('Phase 14: Part V — 5 SEO-vs-conversion scenarios', () => {
  test('1. Traffic confirmed + poor enquiries -> problem reveal, not generic clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-seo-1';
    say(router, tourEngine, sessionId, 'I need SEO.');
    say(router, tourEngine, sessionId, 'We already get traffic.');
    const r = say(router, tourEngine, sessionId, 'But enquiries are poor.');
    assert.equal(r.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
  });

  test('2. No traffic confirmed -> the NOTRAFFIC path remains correct (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-seo-2';
    say(router, tourEngine, sessionId, 'I need SEO');
    const r = say(router, tourEngine, sessionId, 'what would you do');
    assert.equal(r.result.candidate_intent, 'INTENT-01-SEO-NOTRAFFIC');
  });

  test('3. Traffic confirmed -> NOTRAFFIC never fires even when primary_intent is still SEO (conflict detection)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-seo-3';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    const r = say(router, tourEngine, sessionId, 'what would you do');
    assert.notEqual(r.result.candidate_intent, 'INTENT-01-SEO-NOTRAFFIC');
  });

  test('4. "we get a decent amount of visitors" (Phase 12 synonym) still feeds the same conversion-insight chain', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-seo-4';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'we get a decent amount of visitors');
    const r = say(router, tourEngine, sessionId, 'but enquiries are poor');
    assert.equal(r.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
  });

  test('5. Audit reasoning after the conversion-bottleneck profile correctly recommends the Audit with reasoning', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-seo-5';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, 'But enquiries are poor.');
    const r = say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    assert.equal(r.result.candidate_intent, 'INTENT-AUDIT-REASONING');
    assert.match(r.text, /that's exactly the situation an Audit is for/i);
  });
});

describe('Phase 14: Part V — 5 Audit-vs-Call-vs-self-service scenarios', () => {
  test('1. Diagnostic uncertainty confirmed -> Audit recommended with reasoning', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-audit-1';
    say(router, tourEngine, sessionId, "I'm not sure what I need yet.");
    const r = say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    assert.equal(r.result.candidate_intent, 'INTENT-AUDIT-REASONING');
  });

  test('2. No diagnostic uncertainty established -> Audit is NOT pushed reflexively', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-audit-2', 'Would you recommend an audit?');
    assert.equal(r.result.candidate_intent, 'INTENT-AUDIT-REASONING');
    assert.match(r.text, /not necessarily/i);
  });

  test('3. Explicit human/architecture-call request still routes to booking regardless of Phase 14 changes (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-audit-3', "I'd rather speak to someone.");
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('4. Audit objection followed by "what would you do" still gives the objection-aware recommendation, not the generic conversion-bottleneck opener', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-audit-4';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    say(router, tourEngine, sessionId, "I don't think I need an audit");
    const r = say(router, tourEngine, sessionId, 'what would you do');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
    assert.match(r.text, /since you'd rather skip the audit/i);
  });

  test('5. High-intent phrase fast-tracks past self-service discovery (regression, Phase 11)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-audit-5', 'I have a proposal to evaluate.');
    assert.equal(r.result.candidate_intent, 'INTENT-HIGH-INTENT');
  });
});

describe('Phase 14: Part V — 5 trade-off / scope scenarios', () => {
  test('1. Ecommerce scope acknowledgment does not invent a price or fabricate a number', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-tradeoff-1';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    const r = say(router, tourEngine, sessionId, 'About 1000 products.');
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/, 'must never state a concrete price');
  });

  test('2. Marketplace-evolution answer explains staged architecture rather than fabricating a cost/timeline trade-off number', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-tradeoff-2';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 500 products.');
    const r = say(router, tourEngine, sessionId, 'Can marketplace be added later?');
    assert.match(r.text, /staged architecture/i);
    assert.doesNotMatch(r.text, /₹\d|Rs\.?\s?\d|\$\d/);
  });

  test('3. Pricing negotiation explains the scope trade-off without inventing a counter-number', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-tradeoff-3';
    say(router, tourEngine, sessionId, 'what is your pricing');
    const r = say(router, tourEngine, sessionId, 'can you beat 100000 rupees');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE-NEGOTIATION');
  });

  test('4. Timeline question explains the scope-dependency trade-off without inventing a duration', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-tradeoff-4', 'and timeline?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i, 'must never state a concrete duration');
  });

  test('5. Platform-choice objection (Shopify) honestly concedes the simple-case trade-off rather than only pitching custom engineering', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p14-tradeoff-5', 'Can you build on Shopify?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
    assert.match(r.text, /more sensible choice/i);
  });
});

describe('Phase 14: PART X — MANDATORY CONVERSATION', () => {
  test('the full 14-turn mandatory conversation remembers evolving state, supersedes ecommerce, challenges the SEO assumption, distinguishes rebuild vs improve, answers price honestly, reasons about Audit, and never resets or repeats itself', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p14-mandatory-conversation';

    const t1 = say(router, tourEngine, sessionId, 'I need a new website.');
    assert.equal(t1.result.candidate_intent, 'INTENT-02-WEB-NEW');

    const t2 = say(router, tourEngine, sessionId, 'Actually I already have one.');
    assert.equal(t2.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.equal(t2.session.existing_website, true);

    const t3 = say(router, tourEngine, sessionId, 'Traffic is okay.');
    assert.equal(t3.result.candidate_intent, 'INTENT-TRAFFIC-CONFIRMED');

    const t4 = say(router, tourEngine, sessionId, "But enquiries aren't.");
    assert.equal(t4.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
    assert.match(t4.text, /bottleneck almost certainly isn't search visibility/i, 'must challenge the SEO assumption');

    const t5 = say(router, tourEngine, sessionId, 'I thought SEO would fix it.');
    assert.ok(t5.text.length > 0);

    const t6 = say(router, tourEngine, sessionId, 'I also want WhatsApp automation.');
    assert.ok(t6.text.length > 0);

    const t7 = say(router, tourEngine, sessionId, 'And maybe ecommerce later.');
    assert.equal(t7.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
    assert.notEqual(t7.result.candidate_intent, 'INTENT-07-EVIDENCE-REDESIGN', 'must not show the ecommerce case study for a deferred requirement');

    const t8 = say(router, tourEngine, sessionId, 'Actually forget ecommerce for now.');
    assert.equal(t8.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');

    const t9 = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.equal(t9.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(t9.text, /wouldn't rebuild yet/i);

    const t10 = say(router, tourEngine, sessionId, 'Why?');
    assert.ok(t10.text.length > 0);

    const t11 = say(router, tourEngine, sessionId, 'What would you do if this were your project?');
    assert.notEqual(t11.result.candidate_intent, 'INTENT-03-AUTO-CRM', 'must not answer from the stale WhatsApp/automation topic');
    // PHASE 21 UPDATE: t9 just directly established the REBUILD_VS_IMPROVE
    // decision ("would you rebuild the site?" -> "I wouldn't rebuild yet").
    // Phase 21 found and fixed a real inconsistency: "what would you do?"
    // asked right after used to silently revert to the older, generic
    // conversion-bottleneck phrasing instead of reusing the decision that
    // was JUST established - this test now asserts the CORRECTED, more
    // internally-consistent behavior (same decision, same text, not two
    // different-sounding answers to the same underlying question back to
    // back). See the Phase 21 report.
    assert.equal(t11.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(t11.text, /wouldn't rebuild yet/i, 'must reuse the JUST-ESTABLISHED rebuild recommendation, not a different-sounding older framing of the same facts');

    const t12 = say(router, tourEngine, sessionId, 'How much would it cost?');
    assert.equal(t12.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(t12.text, /e-commerce\/marketplace website/i, 'must not price a superseded ecommerce requirement');
    assert.doesNotMatch(t12.text, /₹\d|Rs\.?\s?\d|\$\d/, 'must never invent a concrete price');

    const t13 = say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    assert.equal(t13.result.candidate_intent, 'INTENT-AUDIT-REASONING');

    const t14 = say(router, tourEngine, sessionId, 'What next?');
    assert.notEqual(t14.result.candidate_intent, 'INTENT-02-NAV-DESIGN', 'must not fall back to the generic navigation menu');

    // Full history preserved throughout - 14 real turns, never reset.
    assert.ok(t14.session.previous_states.length >= 14);
  });
});
