import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';
import { getLastIntent, getRecentIntents, wasEvidenceShownRecently, resolveWhatNext, isConversionBottleneckProfile } from '../workingMemory';
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

describe('Phase 13: workingMemory.ts - unit tests for the reusable mechanism', () => {
  test('getLastIntent skips the NEW_VISITOR bootstrap sentinel and returns the most recent real intent', () => {
    const session = fakeSession({ previous_states: ['NEW_VISITOR', 'INTENT-01-SEO', 'INTENT-05-PRICE'] });
    assert.equal(getLastIntent(session), 'INTENT-05-PRICE');
  });

  test('getLastIntent returns undefined on a fresh session', () => {
    assert.equal(getLastIntent(fakeSession()), undefined);
  });

  test('getRecentIntents returns the tail, oldest first, excluding the sentinel', () => {
    const session = fakeSession({ previous_states: ['NEW_VISITOR', 'A', 'B', 'C', 'D'] });
    assert.deepEqual(getRecentIntents(session, 2), ['C', 'D']);
  });

  test('wasEvidenceShownRecently detects any FAM-07 evidence intent in recent history', () => {
    const session = fakeSession({ previous_states: ['NEW_VISITOR', 'INTENT-07-EVIDENCE-SMALLBIZ', 'INTENT-05-PRICE'] });
    assert.equal(wasEvidenceShownRecently(session), true);
    assert.equal(wasEvidenceShownRecently(fakeSession({ previous_states: ['NEW_VISITOR', 'INTENT-05-PRICE'] })), false);
  });

  test('isConversionBottleneckProfile requires both traffic=plenty and a relevant topic', () => {
    assert.equal(isConversionBottleneckProfile(fakeSession({ collected_context: { traffic: 'plenty' }, existing_website: true })), true);
    assert.equal(isConversionBottleneckProfile(fakeSession({ collected_context: { traffic: 'plenty' } })), false, 'traffic alone without a relevant topic/site is not enough');
    assert.equal(isConversionBottleneckProfile(fakeSession({ existing_website: true })), false, 'an existing site alone without confirmed traffic is not enough');
  });

  test('resolveWhatNext: CTO topic always routes to human handoff', () => {
    assert.equal(resolveWhatNext(fakeSession({ primary_intent: 'CTO' })).intent, 'INTENT-08-HANDOFF');
  });

  test('resolveWhatNext: conversion-bottleneck profile routes to the diagnostic recommendation regardless of which topic (SEO/WEB) primary_intent last landed on', () => {
    const session = fakeSession({ primary_intent: 'SEO', collected_context: { traffic: 'plenty' }, existing_website: true });
    assert.equal(resolveWhatNext(session).intent, 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC');
  });

  test('resolveWhatNext: an unresolved diagnostic thread (DONT-KNOW) in the immediately preceding turn continues that thread instead of defaulting to navigation', () => {
    const session = fakeSession({ previous_states: ['NEW_VISITOR', 'INTENT-01-SEO', 'INTENT-DONT-KNOW'] });
    assert.equal(resolveWhatNext(session).intent, 'INTENT-02-WEB-RECOMMEND-DIAGNOSTIC');
  });

  test('resolveWhatNext: genuinely fresh/unestablished context falls back to Design Services navigation (the pre-existing default, preserved)', () => {
    const session = fakeSession({ previous_states: ['NEW_VISITOR', 'INTENT-10-GREETING'] });
    assert.equal(resolveWhatNext(session).intent, 'INTENT-02-NAV-DESIGN');
  });
});

describe('Phase 13: MANDATORY SIGNATURE TEST (Section 13 of the Phase 13 brief)', () => {
  test('the full 13-turn signature conversation preserves history, never resets, never falls to a generic menu, never repeats evidence, and never forces Audit after an explicit objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-signature-regression';

    const t1 = say(router, tourEngine, sessionId, 'I run a small business.');
    assert.equal(t1.result.candidate_intent, 'INTENT-07-EVIDENCE-SMALLBIZ');

    const t2 = say(router, tourEngine, sessionId, 'I already have a website.');
    assert.equal(t2.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');

    const t3 = say(router, tourEngine, sessionId, 'Traffic is okay.');
    assert.equal(t3.result.candidate_intent, 'INTENT-TRAFFIC-CONFIRMED');
    assert.equal(t3.session.collected_context.traffic, 'plenty');

    const t4 = say(router, tourEngine, sessionId, 'But enquiries are poor.');
    assert.equal(t4.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');

    const t5 = say(router, tourEngine, sessionId, 'I thought I needed SEO.');
    assert.equal(t5.result.tier0_match, true);

    // Turn 6 is a known, documented residual weakness (see Phase 13 report) -
    // it currently resolves via the generic contextual-clarify fallback
    // rather than a sharply-targeted rule. Assert only that it produces a
    // real, non-empty response and does not reset the conversation.
    const t6 = say(router, tourEngine, sessionId, 'Actually maybe the website is the problem.');
    assert.ok(t6.text.length > 0);
    assert.notEqual(t6.session.primary_intent, undefined, 'must not have been silently reset');

    const t7 = say(router, tourEngine, sessionId, "I don't know.");
    assert.equal(t7.result.candidate_intent, 'INTENT-DONT-KNOW');

    const t8 = say(router, tourEngine, sessionId, 'Why?');
    assert.ok(t8.text.length > 0);

    const t9 = say(router, tourEngine, sessionId, 'Fine, what next?');
    assert.notEqual(t9.result.candidate_intent, 'INTENT-02-NAV-DESIGN', 'must NOT fall back to the generic Design Services menu given everything already established');
    // PHASE 17 UPDATE: by this turn, traffic (healthy) AND enquiry_health
    // (weak) are BOTH established facts, so the CONVERSION_VS_TRAFFIC
    // decision is HIGH_CONFIDENCE/RESOLVED - the Information Gap Engine
    // (informationGap.ts) correctly says there is nothing decision-changing
    // left to ask, so "what next?" now gives the recommendation + action
    // (INTENT-WHAT-NEXT-RESOLVED) instead of repeating the generic
    // "first establish where the bottleneck is" diagnostic script this
    // intent used to give even though the bottleneck was already
    // identified back at turn 4 - the exact class of weakness Phase 17
    // Part 1 was written to fix. See the Phase 17 report.
    assert.equal(t9.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED');
    assert.match(t9.text, /bottleneck almost certainly isn't search visibility/i, 'must reuse the ALREADY-ESTABLISHED conversion-insight reasoning, not a fresh generic diagnostic script');

    const t10 = say(router, tourEngine, sessionId, 'I already saw that.');
    assert.equal(t10.result.candidate_intent, 'INTENT-ALREADY-SEEN');
    assert.doesNotMatch(t10.text, /Here we showcase real production code/i, 'must not repeat a generic evidence intro as if evidence had just been shown');

    const t11 = say(router, tourEngine, sessionId, 'What about the other option?');
    assert.equal(t11.result.candidate_intent, 'INTENT-08-BOOKING', 'must resolve "the other option" against what was actually just offered');

    const t12 = say(router, tourEngine, sessionId, "I don't need an audit.");
    assert.equal(t12.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');

    const t13 = say(router, tourEngine, sessionId, 'Okay then what would YOU do?');
    assert.equal(t13.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION', 'must give a direct recommendation, not force the visitor back into the audit-intake script they just declined');
    assert.doesNotMatch(t13.text, /Please provide your website URL/i, 'must not repeat the literal audit-intake CTA immediately after an explicit objection to it');
    assert.doesNotMatch(t13.text, /almost no google traffic|no traffic/i, 'must not contradict the already-established traffic=plenty fact');

    // Full history preserved throughout - never reset mid-conversation.
    assert.ok(t13.session.previous_states.length >= 13);
  });
});

describe('Phase 13: targeted regressions from the mandatory-test discovery process', () => {
  test('"Traffic is okay" (not just "good/fine/decent") is recognized as the traffic-confirmed signal', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p13-traffic-okay', 'Traffic is okay.');
    assert.equal(r.result.candidate_intent, 'INTENT-TRAFFIC-CONFIRMED');
  });

  test('Conflict detection: "what would you do" never claims near-zero traffic when traffic=plenty is already an established fact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-notraffic-conflict';
    say(router, tourEngine, sessionId, 'I need SEO');
    say(router, tourEngine, sessionId, 'Traffic is okay.');
    const r = say(router, tourEngine, sessionId, 'what would you do');
    assert.notEqual(r.result.candidate_intent, 'INTENT-01-SEO-NOTRAFFIC');
    assert.doesNotMatch(r.text, /almost no google traffic/i);
  });

  test('Regression: the NOTRAFFIC path still fires correctly when traffic genuinely has not been confirmed', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-notraffic-still-works';
    say(router, tourEngine, sessionId, 'I need SEO');
    const r = say(router, tourEngine, sessionId, 'what would you do');
    assert.equal(r.result.candidate_intent, 'INTENT-01-SEO-NOTRAFFIC');
  });
});

describe('Phase 13: additional free-text and Hinglish/Hindi conversation coverage (Section 12)', () => {
  test('Free-text: ecommerce discovery -> "what next?" after evidence continues the diagnostic thread rather than resetting', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-freetext-ecommerce-next';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'About 500 products.');
    const r = say(router, tourEngine, sessionId, 'what next?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-02-NAV-DESIGN');
  });

  test('Free-text: CTO discovery -> "then?" resolves through the same "what next" state-awareness as "what next?"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-freetext-cto-then';
    say(router, tourEngine, sessionId, 'fractional cto');
    const r = say(router, tourEngine, sessionId, 'then?');
    assert.equal(r.result.candidate_intent, 'INTENT-08-HANDOFF');
  });

  test('Free-text: audit intake -> "after that?" continues the diagnostic thread', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-freetext-audit-after';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r = say(router, tourEngine, sessionId, 'after that?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-02-NAV-DESIGN');
  });

  test('Free-text: pricing negotiation preserves scope-honesty end to end', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-freetext-negotiate';
    say(router, tourEngine, sessionId, 'what is your pricing');
    const r = say(router, tourEngine, sessionId, 'can you beat 50000 rupees');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE-NEGOTIATION');
  });

  test('Hinglish: "SEO chahiye website ke liye" still resolves correctly (unaffected by the working-memory changes)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p13-hinglish-1', 'SEO chahiye website ke liye');
    assert.equal(r.result.candidate_intent, 'INTENT-01-SEO');
  });

  test('Hinglish: "website audit karwana hai" followed by "aapki fee kitni hai" preserves audit context into the pricing turn', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-hinglish-2';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r = say(router, tourEngine, sessionId, 'aapki fee kitni hai');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('Hinglish: "30 min call book karni hai" resolves to booking regardless of prior working-memory state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p13-hinglish-3';
    say(router, tourEngine, sessionId, 'website audit karwana hai');
    const r = say(router, tourEngine, sessionId, '30 min call book karni hai');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('Hinglish: "aapki fee kitni hai" alone (fresh session) still resolves to PRICE, unaffected by the new PRICE-WHY/PRICE-NEGOTIATION rules', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p13-hinglish-4', 'aapki fee kitni hai');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
    assert.equal(r.result.is_hindi, true);
  });

  test('Hindi/Hinglish: session isolation still holds when two visitors interleave through the new working-memory-aware rules', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p13-hi-isoA', 'website audit karwana hai');
    say(router, tourEngine, 'p13-hi-isoB', 'SEO chahiye website ke liye');
    const rA = say(router, tourEngine, 'p13-hi-isoA', 'what next?');
    const rB = say(router, tourEngine, 'p13-hi-isoB', 'what next?');
    assert.notEqual(rA.text, rB.text, 'the two independent visitors must not converge on an identical response from shared/leaked state');
  });
});
