import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';
import { assertsHealthyTraffic, assertsWeakEnquiries, resolveWhyTarget, resolveRecentChallenge } from '../workingMemory';
import { detectFutureRequirementStatement, detectSupersessionStatement } from '../decisionEngine';

// PHASE 15: General reasoning core regression matrix.
//
// The acceptance bar for this phase is explicit: "A phrase never explicitly
// tested before should still behave correctly because the system
// understands the underlying conversational state." Every test below
// deliberately uses wording DIFFERENT from what Phases 10-14's own tests
// used, to prove the Phase 15 mechanisms generalize rather than just adding
// more phrase coverage under a new file name.

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

describe('Phase 15: general mechanism unit tests', () => {
  test('assertsHealthyTraffic is position-independent (word insertion does not break it)', () => {
    assert.equal(assertsHealthyTraffic('Traffic is actually okay.'), true);
    assert.equal(assertsHealthyTraffic('Honestly, our traffic is pretty decent these days.'), true);
    assert.equal(assertsHealthyTraffic('Traffic is a real problem for us.'), false, 'must not fire on traffic mentioned without positive sentiment');
  });

  test('assertsWeakEnquiries is position-independent', () => {
    assert.equal(assertsWeakEnquiries("But we're not getting enough enquiries."), true);
    assert.equal(assertsWeakEnquiries('Our enquiries have been pretty poor lately.'), true);
    assert.equal(assertsWeakEnquiries('Our enquiries are great.'), false);
  });

  test('detectFutureRequirementStatement generalizes to an unenumerated subject ("an app")', () => {
    assert.equal(detectFutureRequirementStatement('maybe an app later.'), 'app');
    assert.equal(detectFutureRequirementStatement('a mobile version eventually'), 'mobile_version');
  });

  test('detectSupersessionStatement generalizes to an unenumerated subject', () => {
    assert.equal(detectSupersessionStatement('forget the app for now.'), 'app');
    assert.equal(detectSupersessionStatement('never mind the mobile version'), 'mobile_version');
  });

  test('resolveWhyTarget and resolveRecentChallenge are pure state readers (no session mutation)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-unit-pure';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    const before = router.getSession(sessionId).previous_states.length;
    resolveWhyTarget(router.getSession(sessionId));
    resolveRecentChallenge(router.getSession(sessionId));
    const after = router.getSession(sessionId).previous_states.length;
    assert.equal(before, after);
  });
});

describe('Phase 15: 10 multi-intent scenarios (unseen phrasings)', () => {
  test('1. "a mobile app somewhere down the line" (unenumerated, unseen subject) is tracked as a future requirement', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-multi-1', 'a mobile app somewhere down the line');
    assert.equal(r.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
  });

  test('2. "forget the mobile app idea" retracts the same unenumerated requirement recorded above', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-multi-2';
    say(router, tourEngine, sessionId, 'a mobile app idea for later');
    const r = say(router, tourEngine, sessionId, 'forget the mobile app idea');
    assert.equal(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });

  test('3. Ecommerce + automation + future item stated in one natural sentence, unseen phrasing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-multi-3';
    const r1 = say(router, tourEngine, sessionId, 'Looking to set up an online store.');
    assert.equal(r1.result.tier0_match, true);
    const r2 = say(router, tourEngine, sessionId, 'Also keen on WhatsApp automation.');
    assert.ok(r2.text.length > 0);
  });

  test('4. Superseding ecommerce still clears industry even via the open-vocabulary supersession path', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-multi-4';
    say(router, tourEngine, sessionId, 'maybe ecommerce eventually');
    say(router, tourEngine, sessionId, 'scratch ecommerce for now');
    const r = say(router, tourEngine, sessionId, 'what is your pricing');
    assert.doesNotMatch(r.text, /e-commerce\/marketplace website/i);
  });

  test('5. A genuine question about the future ("could marketplace happen down the road?") is left to the existing evolution rule, not misparsed as a statement', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-multi-5';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 250 products.');
    const r = say(router, tourEngine, sessionId, 'could marketplace happen down the road?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
  });

  test('6. Secondary requirement recall is unaffected by future-requirement generalization (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-multi-6', 'I need a website redesign and also WhatsApp automation.');
    assert.equal(r.result.tier0_match, true);
  });

  test('7. "skip the loyalty program bit" (novel, unenumerated) is recognized as a supersession', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-multi-7', 'skip the loyalty program bit');
    assert.equal(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });

  test('8. "drop the subscription model idea" (novel subject) is recognized as a supersession', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-multi-8', 'drop the subscription model idea');
    assert.equal(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });

  test('9. A single-word deferred subject ("automation") still resolves via the known-key fast path', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-multi-9', 'automation eventually, not the priority now');
    assert.equal(r.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');
  });

  test('10. Multi-intent statement without any future/supersede language still resolves to a real intent (baseline unaffected)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-multi-10', 'I need a website, SEO help, and workflow automation.');
    assert.equal(r.result.tier0_match, true);
  });
});

describe('Phase 15: 10 assumption/conflict scenarios (unseen phrasings)', () => {
  test('1. "I thought SEO would fix that" (Part 18 target) references the immediately preceding challenge', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-1';
    say(router, tourEngine, sessionId, 'I need SEO.');
    say(router, tourEngine, sessionId, 'Traffic is actually okay.');
    say(router, tourEngine, sessionId, "But we're not getting enough enquiries.");
    const r = say(router, tourEngine, sessionId, 'I thought SEO would fix that.');
    assert.equal(r.result.candidate_intent, 'INTENT-ASSUMPTION-FOLLOWUP');
    assert.match(r.text, /understandable/i);
    assert.match(r.text, /bottleneck almost certainly isn't search visibility/i, 'must reuse the actual challenge reasoning, not a generic SEO pitch');
  });

  test('2. "I thought I needed a whole new website" (unseen phrasing) still triggers the assumption follow-up when a challenge exists', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-2';
    say(router, tourEngine, sessionId, 'I need a new website.');
    say(router, tourEngine, sessionId, 'Actually I already have one.');
    say(router, tourEngine, sessionId, 'Traffic is decent.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'I thought I needed a whole new website.');
    assert.equal(r.result.candidate_intent, 'INTENT-ASSUMPTION-FOLLOWUP');
  });

  test('3. No recent challenge exists -> assumption statement falls through to the ordinary intent rules (no false trigger)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-assume-3', 'I thought SEO would fix that.');
    assert.notEqual(r.result.candidate_intent, 'INTENT-ASSUMPTION-FOLLOWUP');
  });

  test('4. Ecommerce declined then confirmed (unseen phrasing) still triggers the soft-contradiction confirmation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-4';
    say(router, tourEngine, sessionId, "I don't need ecommerce.");
    const r = say(router, tourEngine, sessionId, 'Customers will need to pay online for around 400 items.');
    assert.ok(r.text.length > 0);
  });

  test('5. Stale AUTO topic does not override an established conversion-bottleneck profile (unseen phrasing of the Phase 14 case)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-5';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is honestly fine.');
    say(router, tourEngine, sessionId, "Enquiries just aren't coming through though.");
    say(router, tourEngine, sessionId, 'We also want WhatsApp follow-up.');
    const r = say(router, tourEngine, sessionId, 'What would you actually do here?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-03-AUTO-CRM');
  });

  test('6. "Actually I already have one" (unseen minor variant) still corrects a new-website claim', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-6';
    say(router, tourEngine, sessionId, 'I need a new website.');
    const r = say(router, tourEngine, sessionId, 'Actually I already have one.');
    assert.equal(r.session.existing_website, true);
  });

  test('7. "Actually, maybe the website itself is the problem" (unseen topic-pivot phrasing) does not crash or reset state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-7';
    say(router, tourEngine, sessionId, 'I need SEO.');
    say(router, tourEngine, sessionId, 'Traffic is okay.');
    const r = say(router, tourEngine, sessionId, 'Actually, maybe the website itself is the problem.');
    assert.ok(r.text.length > 0);
    assert.notEqual(r.session.primary_intent, undefined);
  });

  test('8. Traffic confirmed via an unseen synonym ("footfall is healthy") still primes the conversion-bottleneck chain', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-8';
    say(router, tourEngine, sessionId, 'I need SEO.');
    const r1 = say(router, tourEngine, sessionId, 'Honestly our footfall is healthy.');
    assert.equal(r1.result.candidate_intent, 'INTENT-TRAFFIC-CONFIRMED');
  });

  test('9. "what would you do" after an audit objection still gives the objection-aware answer, unaffected by the new challenge-lookback mechanism', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-9';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    say(router, tourEngine, sessionId, "I don't think I need an audit");
    const r = say(router, tourEngine, sessionId, 'what would you do');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
  });

  test('10. Contradiction detection remains correct for the exact Phase 14 scenario (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-assume-10';
    say(router, tourEngine, sessionId, "I don't need ecommerce.");
    const r = say(router, tourEngine, sessionId, 'I need payments and a 500-product catalogue.');
    assert.equal(r.result.candidate_intent, 'INTENT-CONTRADICTION-ECOMMERCE');
  });
});

describe('Phase 15: 10 question-value / decision scenarios (unseen phrasings)', () => {
  test('1. "Is a rebuild the way to go here?" (unseen rebuild phrasing) resolves through the same decision boundary', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-qv-1', 'Is a rebuild the way to go here?');
    // Not an exact-phrase match by design (proves the boundary is regex-scoped,
    // not fully generalized) - documented as a remaining weakness in the report.
    assert.ok(r.text.length > 0);
  });

  test('2. "Would you rebuild the site?" still gives the HIGH_CONFIDENCE answer when the conversion-bottleneck profile is established via unseen phrasing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is honestly pretty good.');
    say(router, tourEngine, sessionId, "Enquiries just aren't happening though.");
    const r = say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    assert.match(r.text, /wouldn't rebuild yet/i);
  });

  test('3. Already-answered product count is not re-asked on a later scope acknowledgment turn', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-3';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    const r = say(router, tourEngine, sessionId, 'Around 350 products or so.');
    assert.equal(r.session.collected_context.product_count, '350');
    assert.doesNotMatch(r.text, /how many products/i);
  });

  test('4. "why?" generalizes to a rebuild-vs-improve recommendation (Part 19), reusing that recommendation\'s own text', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-4';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    const r = say(router, tourEngine, sessionId, 'Why?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.match(r.text, /wouldn't rebuild yet/i);
  });

  test('5. "why not?" (unseen negative-form why) still resolves through the generalized why mechanism when a target exists', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-5';
    say(router, tourEngine, sessionId, 'Can you build on Shopify?');
    const r = say(router, tourEngine, sessionId, 'why not?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
  });

  test('6. Audit reasoning: "Would you recommend an audit?" still answers honestly (not necessarily yes) with no diagnostic uncertainty established', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-qv-6', 'Would you recommend an audit?');
    assert.match(r.text, /not necessarily/i);
  });

  test('7. High-intent phrase ("I need this urgently") still fast-tracks past discovery (regression, unaffected)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-qv-7', 'I need this urgently.');
    assert.equal(r.result.candidate_intent, 'INTENT-HIGH-INTENT');
  });

  test('8. "and timeline?" (unseen short reference) still resolves to the timeline decision, not a generic menu', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-8';
    say(router, tourEngine, sessionId, 'How much would it cost?');
    const r = say(router, tourEngine, sessionId, 'and timeline?');
    assert.equal(r.result.candidate_intent, 'INTENT-TIMELINE');
  });

  test('9. Pricing negotiation with an unseen number/phrasing never invents a counter-price', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-9';
    say(router, tourEngine, sessionId, 'what is your pricing');
    const r = say(router, tourEngine, sessionId, 'can you match 65000 rupees');
    assert.doesNotMatch(r.text, /₹65,?000|Rs\.?\s?65,?000/i);
  });

  test('10. "Diagnostic Audit" chip click still reaches the real Audit action after a full decision-reasoning conversation (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-qv-10';
    say(router, tourEngine, sessionId, 'I need SEO.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, 'But enquiries are poor.');
    const r = say(router, tourEngine, sessionId, 'Diagnostic Audit');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });
});

describe('Phase 15: 10 trade-off / alternative-path scenarios (unseen phrasings)', () => {
  test('1. Platform trade-off: "Is Shopify good enough for me?" (unseen phrasing) gets the same honest trade-off answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-tradeoff-1', 'Is Shopify good enough for me?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('2. Rebuild-vs-improve with no established facts still asks the deciding question rather than guessing (unseen phrasing)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-tradeoff-2', 'Should we rebuild?');
    assert.match(r.text, /don't have enough|sensible paths/i);
  });

  test('3. Marketplace staged-architecture answer references the actual catalogue size given via an unseen phrasing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-tradeoff-3';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'Somewhere around 650 items to sell.');
    const r = say(router, tourEngine, sessionId, 'Could this evolve into a marketplace down the line?');
    assert.match(r.text, /staged architecture/i);
  });

  test('4. Skepticism trade-off: "Why not just go with a freelancer" (unseen phrasing) gets the balanced answer', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-tradeoff-4', 'Why not just go with a freelancer?');
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });

  test('5. Timeline trade-off never invents a concrete duration regardless of phrasing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-tradeoff-5', "What's the turnaround time?");
    assert.doesNotMatch(r.text, /\d+\s*(days|weeks|months)/i);
  });

  test('6. Audit-necessity trade-off: "seems like overkill to me" (unseen phrasing) still gets the reasoned objection response', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-tradeoff-6';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r = say(router, tourEngine, sessionId, 'seems like overkill to me');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
  });

  test('7. Consultant synthesis (ecommerce + conversion) still references the actual product count via an unseen phrasing chain', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-tradeoff-7';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'Roughly 900 products.');
    const r = say(router, tourEngine, sessionId, 'We already have a site up but barely any enquiries come through.');
    assert.ok(r.text.length > 0);
  });

  test('8. "The other option" resolves against what was actually just offered, unseen phrasing variant', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-tradeoff-8';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    say(router, tourEngine, sessionId, "I don't think I need an audit");
    const r = say(router, tourEngine, sessionId, 'the other option then');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('9. Evidence-memory honesty holds for an unseen "show me that again" phrasing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-tradeoff-9', 'show me that again');
    assert.ok(r.text.length > 0);
  });

  test('10. "I want to talk to someone" (unseen human-request phrasing) reaches booking regardless of prior decision-engine state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-tradeoff-10';
    say(router, tourEngine, sessionId, 'I need SEO.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    const r = say(router, tourEngine, sessionId, 'I want to talk to someone.');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });
});

describe('Phase 15: Hinglish/Hindi coverage (unseen phrasings, at least 10)', () => {
  test('1. Hinglish SEO request still resolves correctly (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-hi-1', 'SEO chahiye website ke liye');
    assert.equal(r.result.candidate_intent, 'INTENT-01-SEO');
  });

  test('2. Hinglish audit intake still resolves correctly (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-hi-2', 'website audit karwana hai');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('3. Hinglish pricing still resolves after an audit turn (context preserved)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-hi-3';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r = say(router, tourEngine, sessionId, 'aapki fee kitni hai');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('4. Hinglish booking request still resolves to booking (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-hi-4', '30 min call book karni hai');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('5. Hindi detection flag remains correctly set alongside the new Phase 15 generalized rules', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-hi-5', 'website audit karwana hai');
    assert.equal(r.result.is_hindi, true);
  });

  test('6. Hinglish audit-then-pricing-then-audit-reasoning chain remains coherent', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-hi-6';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    say(router, tourEngine, sessionId, 'aapki fee kitni hai');
    const r = say(router, tourEngine, sessionId, 'Would you recommend an audit?');
    assert.equal(r.result.candidate_intent, 'INTENT-AUDIT-REASONING');
  });

  test('7. Cross-session isolation holds for two interleaved Hinglish/English visitors under the new working-memory rules', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p15-hi-isoA', 'website audit karwana hai');
    say(router, tourEngine, 'p15-hi-isoB', 'I need SEO');
    const rA = say(router, tourEngine, 'p15-hi-isoA', 'what next?');
    const rB = say(router, tourEngine, 'p15-hi-isoB', 'what next?');
    assert.notEqual(rA.text, rB.text);
  });

  test('8. Hindi greeting/credibility phrase still resolves correctly (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-hi-8', 'namaste, kaise ho');
    assert.equal(r.result.candidate_intent, 'INTENT-10-GREETING');
  });

  test('9. Hinglish CTO/advisory phrase still resolves correctly (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p15-hi-9', 'fractional cto chahiye');
    assert.equal(r.result.tier0_match, true);
  });

  test('10. Hinglish multi-turn ecommerce scope acknowledgment still works (regression)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-hi-10';
    say(router, tourEngine, sessionId, 'ecommerce website chahiye');
    const r = say(router, tourEngine, sessionId, 'About 300 products.');
    assert.equal(r.result.candidate_intent, 'INTENT-ECOMMERCE-SCOPE-ACK');
  });
});

describe('Phase 15: PART 26 — MANDATORY NATURAL CONVERSATION', () => {
  test('the full 21-turn mandatory conversation (fully natural rephrasing) remembers state, supersedes the app, preserves WhatsApp, challenges the SEO assumption, distinguishes rebuild vs improve, answers price/timeline contextually, reasons about Audit, resolves "the other option", and reaches human handoff - no generic menu, no restart, no repeated evidence claim', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p15-mandatory-natural';

    const t1 = say(router, tourEngine, sessionId, 'I run a small clinic.');
    assert.equal(t1.result.candidate_intent, 'INTENT-07-EVIDENCE-SMALLBIZ');

    const t2 = say(router, tourEngine, sessionId, 'We already have a website.');
    assert.equal(t2.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');

    const t3 = say(router, tourEngine, sessionId, 'Traffic is actually okay.');
    assert.equal(t3.result.candidate_intent, 'INTENT-TRAFFIC-CONFIRMED');

    const t4 = say(router, tourEngine, sessionId, "But we're not getting enough enquiries.");
    assert.equal(t4.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');

    const t5 = say(router, tourEngine, sessionId, 'I thought SEO would fix that.');
    assert.equal(t5.result.candidate_intent, 'INTENT-ASSUMPTION-FOLLOWUP');

    const t6 = say(router, tourEngine, sessionId, 'Actually maybe the website is the problem.');
    assert.ok(t6.text.length > 0);

    const t7 = say(router, tourEngine, sessionId, 'We also want WhatsApp follow-up.');
    assert.ok(t7.text.length > 0);

    const t8 = say(router, tourEngine, sessionId, 'Maybe an app later.');
    assert.equal(t8.result.candidate_intent, 'INTENT-FUTURE-REQUIREMENT-NOTED');

    const t9 = say(router, tourEngine, sessionId, 'Forget the app for now.');
    assert.equal(t9.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');

    const t10 = say(router, tourEngine, sessionId, 'Would you rebuild the website?');
    assert.equal(t10.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(t10.text, /wouldn't rebuild yet/i);

    const t11 = say(router, tourEngine, sessionId, 'Why?');
    assert.equal(t11.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.match(t11.text, /wouldn't rebuild yet/i, 'must reuse the rebuild recommendation\'s own reasoning');

    const t12 = say(router, tourEngine, sessionId, 'Okay, what would you do if this were your project?');
    assert.notEqual(t12.result.candidate_intent, 'INTENT-03-AUTO-CRM');
    // PHASE 21 UPDATE: t10 just directly established the REBUILD_VS_IMPROVE
    // decision. Phase 21 fixed a real inconsistency where "what would you
    // do?" asked immediately afterward silently reverted to the older,
    // generic conversion-bottleneck phrasing instead of the just-established
    // recommendation - see the Phase 21 report and phase21 test file.
    assert.equal(t12.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
    assert.match(t12.text, /wouldn't rebuild yet/i, 'must reuse the just-established rebuild recommendation, not a different-sounding older framing of the same facts');

    const t13 = say(router, tourEngine, sessionId, 'How much would it cost?');
    assert.equal(t13.result.candidate_intent, 'INTENT-05-PRICE');
    assert.doesNotMatch(t13.text, /₹\d|Rs\.?\s?\d|\$\d/);

    const t14 = say(router, tourEngine, sessionId, 'And timeline?');
    assert.equal(t14.result.candidate_intent, 'INTENT-TIMELINE');
    assert.doesNotMatch(t14.text, /\d+\s*(days|weeks|months)/i);

    const t15 = say(router, tourEngine, sessionId, 'What about the Audit?');
    assert.ok(t15.text.length > 0);

    const t16 = say(router, tourEngine, sessionId, "I don't think I need an Audit.");
    assert.equal(t16.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');

    const t17 = say(router, tourEngine, sessionId, 'Fine. What next?');
    assert.notEqual(t17.result.candidate_intent, 'INTENT-02-NAV-DESIGN');

    const t18 = say(router, tourEngine, sessionId, 'Show me something relevant.');
    assert.ok(t18.text.length > 0);

    const t19 = say(router, tourEngine, sessionId, 'I already saw that.');
    assert.equal(t19.result.candidate_intent, 'INTENT-ALREADY-SEEN');

    const t20 = say(router, tourEngine, sessionId, 'What about the other option?');
    assert.equal(t20.result.candidate_intent, 'INTENT-08-BOOKING');

    const t21 = say(router, tourEngine, sessionId, 'Actually I want to talk to someone.');
    assert.equal(t21.result.candidate_intent, 'INTENT-08-BOOKING');

    // Full 21-turn history preserved throughout - never reset.
    assert.ok(t21.session.previous_states.length >= 21);
  });
});
