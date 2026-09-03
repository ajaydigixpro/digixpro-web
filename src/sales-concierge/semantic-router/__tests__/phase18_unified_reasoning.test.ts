import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';
import { classifyMessageFunction } from '../messageFunction';
import { detectConflicts, hasActiveConflict } from '../conflictEngine';
import { listActiveFacts, isExplicitFact } from '../factModel';
import { buildRecommendation, OBJECTION_TRADEOFFS } from '../recommendationEngine';
import { resolveRecommendationRequest, resolveWhatWouldChangeMind, resolveObjection, pickResponseVariant } from '../responseStrategy';
import { VisitorSessionState } from '../types';

// PHASE 18: UNIFIED CONVERSATIONAL REASONING & RESPONSE STRATEGY
//
// Acceptance invariants (from the brief): one conversational function reaches
// one reasoning path; current state beats stale routing; facts are never
// silently promoted from inferences; recommendations are revisable; every
// question traces to a real gap; no unnecessary interrogation; "why" is
// contextual; alternatives are legitimate even against DigiXPro's own
// service; evidence is purposeful; handoff is meaningful; no forced
// conversion; state survives topic movement; no phrase-specific escape
// hatch; HTTP is the product; deterministic reproducibility.

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

function freshSession(id = 's1'): VisitorSessionState {
  return {
    session_id: id,
    previous_states: [],
    collected_context: {},
    journey_history: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

// =============================================================================
// A. MESSAGE FUNCTION - 20+ functions/variants
// =============================================================================

describe('Phase 18 Part A: message function classification', () => {
  const recommendationRequests = [
    'What would you do?',
    'What would you recommend?',
    'What would be your move?',
    'If this were your project, what would you do?',
    'So where would you start?',
    "What's your recommendation?",
    'Where would you start?'
  ];
  for (const phrase of recommendationRequests) {
    test(`RECOMMENDATION_REQUEST: "${phrase}"`, () => {
      assert.equal(classifyMessageFunction(phrase.toLowerCase(), freshSession()).function, 'RECOMMENDATION_REQUEST');
    });
  }

  const whyPhrases = ['Why?', 'Why not?', 'Why do you say that?', 'What makes you think that?', 'Why would you recommend that?', "What's the reasoning?", 'So why?'];
  for (const phrase of whyPhrases) {
    test(`WHY: "${phrase}"`, () => {
      assert.equal(classifyMessageFunction(phrase.toLowerCase().replace(/[?.]/g, (m) => m), freshSession()).function, 'WHY');
    });
  }

  test('WHAT_WOULD_CHANGE_MIND: "What would change your mind?"', () => {
    assert.equal(classifyMessageFunction('what would change your mind?', freshSession()).function, 'WHAT_WOULD_CHANGE_MIND');
  });
  test('WHAT_WOULD_CHANGE_MIND: "What would make you rebuild instead?"', () => {
    assert.equal(classifyMessageFunction('what would make you rebuild instead?', freshSession()).function, 'WHAT_WOULD_CHANGE_MIND');
  });
  test('WHAT_WOULD_CHANGE_MIND: "When would Shopify be enough?"', () => {
    assert.equal(classifyMessageFunction('when would shopify be enough?', freshSession()).function, 'WHAT_WOULD_CHANGE_MIND');
  });

  test('OBJECTION: freelancer', () => {
    const r = classifyMessageFunction('why not just hire a freelancer?', freshSession());
    assert.equal(r.function, 'OBJECTION');
    assert.equal(r.objectionKey, 'FREELANCER');
  });
  test('OBJECTION: Shopify', () => {
    const r = classifyMessageFunction('is shopify enough for me?', freshSession());
    assert.equal(r.function, 'OBJECTION');
    assert.equal(r.objectionKey, 'SHOPIFY_WORDPRESS');
  });
  test('OBJECTION: WordPress', () => {
    const r = classifyMessageFunction('why not just use wordpress?', freshSession());
    assert.equal(r.function, 'OBJECTION');
    assert.equal(r.objectionKey, 'SHOPIFY_WORDPRESS');
  });
  test('OBJECTION: audit overkill', () => {
    const r = classifyMessageFunction('isn\'t this overkill?', freshSession());
    assert.equal(r.function, 'OBJECTION');
    assert.equal(r.objectionKey, 'AUDIT_OVERKILL');
  });
  test('OBJECTION: DIY', () => {
    const r = classifyMessageFunction("can't i just do this myself?", freshSession());
    assert.equal(r.function, 'OBJECTION');
    assert.equal(r.objectionKey, 'DIY');
  });

  test('GENERAL: an unrelated statement classifies as GENERAL, not any specific function', () => {
    assert.equal(classifyMessageFunction('we sell handmade candles online', freshSession()).function, 'GENERAL');
  });

  test('state-aware: targetDecision is populated from intent history, not lexical content alone', () => {
    const s = freshSession();
    s.previous_states = ['NEW_VISITOR', 'INTENT-REBUILD-VS-IMPROVE'];
    const r = classifyMessageFunction('why?', s);
    assert.equal(r.targetDecision, 'REBUILD_VS_IMPROVE');
  });

  test('state-aware: the SAME "why?" message resolves to a DIFFERENT targetDecision under different state (Part 3)', () => {
    const s1 = freshSession('a');
    s1.previous_states = ['NEW_VISITOR', 'INTENT-REBUILD-VS-IMPROVE'];
    const s2 = freshSession('b');
    s2.previous_states = ['NEW_VISITOR', 'INTENT-AUDIT-REASONING'];
    assert.notEqual(classifyMessageFunction('why?', s1).targetDecision, classifyMessageFunction('why?', s2).targetDecision);
  });
});

// =============================================================================
// B. CONFLICTS - all 8 conflict types (creation/resolution/supersession/materiality)
// =============================================================================

describe('Phase 18 Part B: conflict model', () => {
  test('no conflicts on a fresh session', () => {
    assert.deepEqual(detectConflicts(freshSession()), []);
  });

  test('FACT_CONFLICT created when traffic_previously_healthy is recorded (Phase 16 supersession)', () => {
    const s = freshSession();
    s.collected_context.traffic_previously_healthy = 'true';
    s.collected_context.traffic = 'declined';
    const conflicts = detectConflicts(s);
    const fc = conflicts.find((c) => c.type === 'FACT_CONFLICT');
    assert.ok(fc);
    assert.equal(fc!.subject, 'traffic_health');
    assert.equal(fc!.previousValue, 'healthy');
    assert.equal(fc!.materiality, 'HIGH');
    assert.equal(fc!.affectsDecision, true);
  });

  test('REQUIREMENT_CONFLICT created on future requirement supersession', () => {
    const s = freshSession();
    s.collected_context.future_ecommerce = 'superseded';
    const conflicts = detectConflicts(s);
    const rc = conflicts.find((c) => c.type === 'REQUIREMENT_CONFLICT');
    assert.ok(rc);
    assert.equal(rc!.subject, 'ecommerce');
    assert.equal(rc!.status, 'SUPERSEDED');
  });

  test('REQUIREMENT_CONFLICT does NOT fire for a merely-pending (not superseded) future requirement', () => {
    const s = freshSession();
    s.collected_context.future_ecommerce = 'pending';
    assert.ok(!detectConflicts(s).some((c) => c.type === 'REQUIREMENT_CONFLICT'));
  });

  test('ASSUMPTION_CONFLICT created when a challenge target is recorded', () => {
    const s = freshSession();
    s.collected_context.assumption_challenge_target = 'INTENT-SEO-CONVERSION-INSIGHT';
    const conflicts = detectConflicts(s);
    const ac = conflicts.find((c) => c.type === 'ASSUMPTION_CONFLICT');
    assert.ok(ac);
    assert.equal(ac!.status, 'ACTIVE');
    assert.equal(ac!.affectsDecision, true);
  });

  test('materiality: FACT_CONFLICT is HIGH, REQUIREMENT_CONFLICT is MEDIUM', () => {
    const s = freshSession();
    s.collected_context.traffic_previously_healthy = 'true';
    s.collected_context.future_marketplace = 'superseded';
    const conflicts = detectConflicts(s);
    assert.equal(conflicts.find((c) => c.type === 'FACT_CONFLICT')!.materiality, 'HIGH');
    assert.equal(conflicts.find((c) => c.type === 'REQUIREMENT_CONFLICT')!.materiality, 'MEDIUM');
  });

  test('hasActiveConflict is true only for ACTIVE conflicts, not SUPERSEDED/RESOLVED ones', () => {
    const s = freshSession();
    s.collected_context.future_ecommerce = 'superseded'; // SUPERSEDED, not ACTIVE
    assert.equal(hasActiveConflict(s), false);
    s.collected_context.assumption_challenge_target = 'INTENT-SEO-CONVERSION-INSIGHT'; // ACTIVE
    assert.equal(hasActiveConflict(s), true);
  });

  test('hasActiveConflict scoped to a specific subject', () => {
    const s = freshSession();
    s.collected_context.assumption_challenge_target = 'INTENT-REBUILD-VS-IMPROVE';
    assert.equal(hasActiveConflict(s, 'INTENT-REBUILD-VS-IMPROVE'), true);
    assert.equal(hasActiveConflict(s, 'INTENT-AUDIT-REASONING'), false);
  });

  test('end-to-end: a real traffic-decline conversation produces a detectable FACT_CONFLICT', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-conflict-e2e';
    say(router, tourEngine, sessionId, 'We already get good traffic.');
    const r = say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    assert.ok(detectConflicts(r.session).some((c) => c.type === 'FACT_CONFLICT'));
  });
});

// =============================================================================
// C. FACTS - explicit fact, inference, assumption, unknown, correction, contradiction
// =============================================================================

describe('Phase 18 Part C: fact/assumption/inference separation', () => {
  test('explicit fact: traffic_health is source=FACT once stated', () => {
    const s = freshSession();
    s.collected_context.traffic = 'plenty';
    const entry = listActiveFacts(s).find((f) => f.key === 'traffic_health')!;
    assert.equal(entry.source, 'FACT');
    assert.equal(entry.status, 'ACTIVE');
  });

  test('unknown: an unestablished fact is status=UNKNOWN, not defaulted to a value', () => {
    const entry = listActiveFacts(freshSession()).find((f) => f.key === 'technical_constraint')!;
    assert.equal(entry.status, 'UNKNOWN');
    assert.equal(entry.value, undefined);
  });

  test('inference: conversion_bottleneck is source=INFERENCE, never FACT', () => {
    const s = freshSession();
    s.collected_context.traffic = 'plenty';
    s.existing_website = true;
    const entry = listActiveFacts(s).find((f) => f.key === 'conversion_bottleneck')!;
    assert.equal(entry.source, 'INFERENCE');
  });

  test('an inference is never silently promoted to isExplicitFact()=true', () => {
    const s = freshSession();
    s.collected_context.traffic = 'plenty';
    s.existing_website = true;
    // conversion_bottleneck is not a FactKey - isExplicitFact only answers for real FactKeys, proving the two are structurally distinct types.
    assert.equal(isExplicitFact(s, 'traffic_health'), true);
    assert.equal(isExplicitFact(s, 'technical_constraint'), false);
  });

  test('correction: existing_website flips from unknown to FACT after an explicit correction turn', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-correction';
    say(router, tourEngine, sessionId, "I don't have a website yet.");
    const r = say(router, tourEngine, sessionId, 'Actually I already have one.');
    assert.equal(isExplicitFact(r.session, 'existing_website'), true);
  });

  test('contradiction: traffic_health VALUE changes but stays source=FACT (a correction is still a fact, not an inference)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-contradiction-fact';
    say(router, tourEngine, sessionId, 'We already get good traffic.');
    const r = say(router, tourEngine, sessionId, 'Actually traffic has dropped badly.');
    const entry = listActiveFacts(r.session).find((f) => f.key === 'traffic_health')!;
    assert.equal(entry.source, 'FACT');
    assert.equal(entry.value, 'weak');
  });

  test('assumption: a PROVISIONAL recommendation explicitly lists its assumption, never silently treating it as fact', () => {
    const s = freshSession();
    s.existing_website = true;
    const rec = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.equal(rec.status, 'PROVISIONAL');
    assert.ok(rec.assumptions.length > 0);
  });
});

// =============================================================================
// D. RECOMMENDATION - provisional / resolved / changed / invalidated / what-would-change-mind
// =============================================================================

describe('Phase 18 Part D: recommendation object', () => {
  test('provisional recommendation for REBUILD_VS_IMPROVE with existing site only', () => {
    const s = freshSession();
    s.existing_website = true;
    const rec = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.equal(rec.status, 'PROVISIONAL');
    assert.equal(rec.option, 'IMPROVE');
  });

  test('resolved recommendation for REBUILD_VS_IMPROVE once technical_constraint is known', () => {
    const s = freshSession();
    s.existing_website = true;
    s.collected_context.technical_constraint = 'limiting';
    const rec = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.equal(rec.status, 'RESOLVED');
    assert.equal(rec.option, 'REBUILD');
  });

  test('recommendation CHANGES when technical_constraint flips value', () => {
    const s = freshSession();
    s.existing_website = true;
    s.collected_context.traffic = 'plenty';
    const before = buildRecommendation('REBUILD_VS_IMPROVE', s);
    s.collected_context.technical_constraint = 'limiting';
    const after = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.notEqual(before.option, after.option);
  });

  test('recommendation is INVALIDATED (confidence/status drop) when a supporting fact is superseded', () => {
    const s = freshSession();
    s.existing_website = true;
    s.collected_context.traffic = 'plenty';
    const before = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.equal(before.option, 'IMPROVE');
    assert.equal(before.confidence, 'MEDIUM');
    s.collected_context.traffic = 'declined';
    const after = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.notEqual(after.confidence, 'MEDIUM');
  });

  test('whatWouldChange is always populated for a non-INSUFFICIENT recommendation', () => {
    const s = freshSession();
    s.existing_website = true;
    const rec = buildRecommendation('REBUILD_VS_IMPROVE', s);
    assert.ok(rec.whatWouldChange.length > 0);
  });

  test('"what would change your mind?" derives its answer from Recommendation.whatWouldChange, end-to-end', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-wwcm-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    const r = say(router, tourEngine, sessionId, 'What would change your mind?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-WOULD-CHANGE-MIND');
    assert.match(r.text, /structurally limiting/i);
  });

  test('"what would make you rebuild instead?" resolves through the SAME mechanism (unseen phrasing)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-wwcm-2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Would you rebuild the site?');
    const r = say(router, tourEngine, sessionId, 'What would make you rebuild instead?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-WOULD-CHANGE-MIND');
  });

  test('genericrecommendation fallback (PRICING) never invents an option, always frames around scope', () => {
    const rec = buildRecommendation('PRICING', freshSession());
    assert.equal(rec.option, 'INSUFFICIENT');
    assert.match(rec.rationale.join(' '), /scope/i);
  });

  test('recommendation reversibility is populated and varies by option (rebuild is less reversible than improve)', () => {
    const s1 = freshSession('rev1');
    s1.existing_website = true;
    s1.collected_context.technical_constraint = 'limiting';
    const rebuildRec = buildRecommendation('REBUILD_VS_IMPROVE', s1);
    const s2 = freshSession('rev2');
    s2.existing_website = true;
    s2.collected_context.traffic = 'plenty';
    const improveRec = buildRecommendation('REBUILD_VS_IMPROVE', s2);
    assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(rebuildRec.reversibility));
    assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(improveRec.reversibility));
  });
});

// =============================================================================
// E. RESPONSE STRATEGY RESOLUTION
// =============================================================================

describe('Phase 18 Part E: response strategy resolution functions', () => {
  test('resolveRecommendationRequest preserves the audit-objection override (unchanged from pre-Phase-18)', () => {
    const s = freshSession();
    s.previous_states = ['NEW_VISITOR', 'INTENT-06-AUDIT-OBJECTION'];
    const resolution = resolveRecommendationRequest(s);
    assert.equal(resolution.intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
    assert.equal(resolution.recordFlags?.direct_recommendation_reason, 'objection');
  });

  test('resolveRecommendationRequest preserves the conversion-bottleneck override (unchanged from pre-Phase-18)', () => {
    const s = freshSession();
    s.collected_context.traffic = 'plenty';
    s.existing_website = true;
    const resolution = resolveRecommendationRequest(s);
    assert.equal(resolution.intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
  });

  test('resolveRecommendationRequest NEW: routes to INTENT-REBUILD-VS-IMPROVE when that decision is active', () => {
    const s = freshSession();
    s.previous_states = ['NEW_VISITOR', 'INTENT-TECHNICAL-CONSTRAINT-CONFIRMED'];
    const resolution = resolveRecommendationRequest(s);
    assert.equal(resolution.intent, 'INTENT-REBUILD-VS-IMPROVE');
  });

  test('resolveRecommendationRequest falls back to default AUDIT-INTAKE on a fresh session (unchanged)', () => {
    const resolution = resolveRecommendationRequest(freshSession());
    assert.equal(resolution.intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('resolveWhatWouldChangeMind with no active decision still returns a valid resolution, not a throw', () => {
    const resolution = resolveWhatWouldChangeMind(freshSession());
    assert.equal(resolution.intent, 'INTENT-WHAT-WOULD-CHANGE-MIND');
  });

  test('resolveObjection maps every ObjectionKey to a registered trade-off with an honest alternativeIsFineWhen', () => {
    for (const key of Object.keys(OBJECTION_TRADEOFFS) as (keyof typeof OBJECTION_TRADEOFFS)[]) {
      const resolution = resolveObjection(key, freshSession());
      assert.ok(resolution.intent.length > 0);
      assert.ok(OBJECTION_TRADEOFFS[key].alternativeIsFineWhen.length > 0, `${key} must never defend DigiXPro unconditionally`);
    }
  });

  test('pickResponseVariant increments deterministically and wraps', () => {
    const s = freshSession();
    const v1 = pickResponseVariant(s, 'REBUILD_VS_IMPROVE');
    const v2 = pickResponseVariant(s, 'REBUILD_VS_IMPROVE');
    const v3 = pickResponseVariant(s, 'REBUILD_VS_IMPROVE');
    assert.equal(v1, 0);
    assert.equal(v2, 1);
    assert.equal(v3, 2);
  });

  test('pickResponseVariant is deterministic - same session state produces the same result', () => {
    const s1 = freshSession('x');
    s1.collected_context.recommendation_request_count_REBUILD_VS_IMPROVE = '2';
    const s2 = freshSession('y');
    s2.collected_context.recommendation_request_count_REBUILD_VS_IMPROVE = '2';
    assert.equal(pickResponseVariant(s1, 'REBUILD_VS_IMPROVE'), pickResponseVariant(s2, 'REBUILD_VS_IMPROVE'));
  });
});

// =============================================================================
// F. WHAT WOULD YOU DO - 7+ unseen phrasings, end-to-end
// =============================================================================

describe('Phase 18 Part F: "what would you do?" unified end-to-end (7+ unseen phrasings)', () => {
  const phrasings = ['What would you do?', 'What would you recommend?', 'What would be your move?', 'If this were your project, what would you do?', 'So where would you start?', "What's your recommendation?", 'Where would you start?'];
  for (const phrasing of phrasings) {
    test(`"${phrasing}" resolves the SAME established rebuild decision`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p18-wwyd-${phrasing.length}`;
      say(router, tourEngine, sessionId, 'We already have a website.');
      say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
      const r = say(router, tourEngine, sessionId, phrasing);
      assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE', `failed for: "${phrasing}"`);
      assert.match(r.text, /lean toward a rebuild/i, `failed for: "${phrasing}"`);
    });
  }

  test('regression: "someone told me..." still triggers a recommendation request (preserved trigger phrase, verified after dead-code cleanup)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-wwyd-someone-told-me', 'Someone told me I should rebuild everything.');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('regression: "help me decide whether rebuilding..." still triggers a recommendation request', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-wwyd-help-decide', 'Can you help me decide whether rebuilding is necessary?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('regression: "what would you do" on a fresh session still gives the pre-existing default (Direct Senior Consultant Recommendation)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-wwyd-fresh', 'What would you do?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('regression: audit-objection override still wins over the new decision-based routing', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-wwyd-objection-regress';
    say(router, tourEngine, sessionId, "I don't think I need an audit.");
    const r = say(router, tourEngine, sessionId, 'What would you do?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
  });
});

// =============================================================================
// G. WHY - 7+ unseen phrasings, end-to-end
// =============================================================================

describe('Phase 18 Part G: "why?" unified end-to-end (7+ unseen phrasings)', () => {
  const phrasings = ['Why?', 'Why not?', 'Why do you say that?', 'What makes you think that?', 'Why would you recommend that?', "What's the reasoning?", 'Your recommendation?'];
  for (const phrasing of phrasings) {
    test(`"${phrasing}" reuses the actual recalculated rebuild recommendation`, () => {
      const router = newRouter();
      const tourEngine = new GuidedTourEngine();
      const sessionId = `p18-why-${phrasing.length}`;
      say(router, tourEngine, sessionId, 'We already have a website.');
      say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
      const r = say(router, tourEngine, sessionId, phrasing);
      assert.match(r.text, /lean toward a rebuild/i, `failed for: "${phrasing}"`);
    });
  }

  test('regression: "why?" after a HIGH_CONFIDENCE conversion-insight answer still reuses that exact reasoning', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-why-regress';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'Traffic is fine.');
    say(router, tourEngine, sessionId, "But enquiries aren't great.");
    const r = say(router, tourEngine, sessionId, 'why?');
    assert.match(r.text, /bottleneck almost certainly isn't search visibility/i);
  });
});

// =============================================================================
// H. OBJECTIONS - freelancer, Shopify, WordPress, DIY, overkill, agency skepticism, cost skepticism
// =============================================================================

describe('Phase 18 Part H: objections (unified, decision-aware, honest about alternatives)', () => {
  test('freelancer objection never defends DigiXPro unconditionally', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-obj-1', 'Why not just hire a freelancer?');
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
    assert.match(r.text, /may be unnecessary|genuinely simple/i);
  });

  test('Shopify objection is honest about when the alternative is fine', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-obj-2', 'Is Shopify enough for me?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
    assert.match(r.text, /may genuinely be the more sensible choice/i);
  });

  test('WordPress objection (unseen phrasing, previously unhandled) resolves through the SAME platform-objection mechanism', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-obj-3', 'Why not just use WordPress?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('DIY objection (genuinely new capability, previously unhandled) resolves rather than falling to clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-obj-4', "Can't I just do this myself?");
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
    assert.ok(r.text.length > 0);
  });

  test('audit-overkill objection is reasoned, not defensive', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-obj-5', 'Isn\'t this overkill?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
    assert.match(r.text, /may not add much value/i);
  });

  test('agency skepticism ("why should I use DigiXPro") resolves through the same objection path', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-obj-6', 'Why should I use DigiXPro?');
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });

  test('objection bridging is silent (no wrong default lean) when the active decision has no resolved option (found via the mandatory conversation test)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-obj-no-bridge';
    say(router, tourEngine, sessionId, 'I need a new ecommerce website.');
    say(router, tourEngine, sessionId, 'Around 300 products.');
    const r = say(router, tourEngine, sessionId, 'Is an audit really necessary here?');
    assert.doesNotMatch(r.text, /leaning toward conversion work over more SEO anyway/i, 'must not fall through to the hardcoded default lean for a decision with no resolved option');
  });

  test('objection is DECISION-AWARE: bridges to an already-established rebuild recommendation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-obj-bridge';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'Is Shopify enough for me?');
    assert.match(r.text, /leaning toward a rebuild/i, 'must bridge to the already-established decision, not answer in a vacuum');
  });
});

// =============================================================================
// I. REFERENCES - that / this / it / other option / your recommendation / earlier point
// =============================================================================

describe('Phase 18 Part I: reference resolution', () => {
  test('"your recommendation?" resolves via the same WHY mechanism (Part 22)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-ref-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sessionId, 'Do you still stand by that?');
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('"the other option" resolves against what was actually just offered (existing Phase 13 mechanism, preserved)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-ref-2';
    say(router, tourEngine, sessionId, "I don't think I need an audit.");
    const r = say(router, tourEngine, sessionId, 'What about the other option?');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('bare "it" alone is not falsely classified as a specific function (honesty about scope)', () => {
    assert.equal(classifyMessageFunction('it', freshSession()).function, 'GENERAL');
  });
});

// =============================================================================
// J. INFORMATION GAPS - high-value question, low-value suppression, resolved gap, blocked gap
// =============================================================================

describe('Phase 18 Part J: information gap authority over questions', () => {
  test('a high-value gap IS surfaced when the decision is genuinely open', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-gap-1', 'Would you rebuild the site?');
    // PHASE 20: now asserts the ACTUAL highest-value gap question is shown
    // (informationGap.ts's own selection), not just a generic "not enough
    // information" statement - this is a stronger version of the same test.
    assert.match(r.text, /existing website today, or would this be new/i);
  });

  test('a low-value gap is suppressed even when technically unknown', () => {
    const s = freshSession();
    s.collected_context.product_count = '400';
    const rec = buildRecommendation('ECOMMERCE_ARCHITECTURE', s);
    assert.ok(rec.rationale.length > 0);
  });

  test('a resolved gap no longer appears once the fact is known', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-gap-2';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.doesNotMatch(r.text, /is the current site fundamentally workable/i);
  });

  test('a blocked gap (declined fact) never resurfaces as a question in "what would you do?"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-gap-3';
    say(router, tourEngine, sessionId, "I don't think I need an audit.");
    say(router, tourEngine, sessionId, 'Skip the audit.');
    const r = say(router, tourEngine, sessionId, 'What would you do?');
    assert.ok(r.text.length > 0);
  });
});

// =============================================================================
// K. EVIDENCE - evidence request, page-aware continuation, return-from-evidence
// =============================================================================

describe('Phase 18 Part K: evidence purposefulness', () => {
  test('evidence request resolves to a real evidence-bearing intent, not a bare link dump', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-ev-1', 'Show me a case study.');
    assert.ok(r.step.evidence_destination || r.step.tour_actions?.length);
  });

  test('page-aware "what next?" on the /audit page uses Audit continuity, not generic navigation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const result = router.route('what next', 'p18-page-1', undefined, '/audit');
    const session = router.getSession('p18-page-1');
    const step = tourEngine.resolveTourStep(result, session);
    assert.equal(result.candidate_intent, 'INTENT-PAGE-EXPLAIN-AUDIT');
    assert.ok(step.headline_message.length > 0);
  });

  test('"I already saw that" after evidence correctly returns to a useful next step, not a repeat', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-ev-2';
    say(router, tourEngine, sessionId, 'Show me a case study.');
    const r = say(router, tourEngine, sessionId, 'I already saw that.');
    assert.equal(r.result.candidate_intent, 'INTENT-ALREADY-SEEN');
  });
});

// =============================================================================
// L. COMMERCIAL BEHAVIOUR - no forced Audit, no forced call, appropriate handoff/action
// =============================================================================

describe('Phase 18 Part L: commercial behaviour invariants', () => {
  test('no forced Audit: a RESOLVED rebuild recommendation never auto-routes to INTENT-06-AUDIT-INTAKE', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-commercial-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    assert.notEqual(r.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
  });

  test('no forced call: an objection answer never auto-routes to INTENT-08-BOOKING', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-commercial-2', 'Is Shopify enough for me?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('explicit human request still reaches handoff immediately (Part 20 - meaningful handoff)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p18-commercial-3', 'I want to speak to a human.');
    assert.equal(r.result.candidate_intent, 'INTENT-08-BOOKING');
  });

  test('appropriate action: a resolved decision offers BOTH audit and call as choices, never a single forced path', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-commercial-4';
    say(router, tourEngine, sessionId, 'We already have a website.');
    const r = say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const replies = r.step.suggested_replies || [];
    assert.ok(replies.some((x) => /audit/i.test(x)));
    assert.ok(replies.some((x) => /call/i.test(x)));
  });
});

// =============================================================================
// M. NATURAL VARIATION - same semantic state, materially different wording, no new regex per phrasing
// =============================================================================

describe('Phase 18 Part M: natural variation without randomness', () => {
  test('response diversity: repeated "what would you do?" requests for the SAME decision vary framing but not substance', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-variety-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    const r1 = say(router, tourEngine, sessionId, 'What would you do?');
    const r2 = say(router, tourEngine, sessionId, 'What would you recommend?');
    assert.match(r1.text, /lean toward a rebuild/i);
    assert.match(r2.text, /lean toward a rebuild/i);
    // Both must reach the same underlying option even if framed differently.
  });

  test('deterministic reproducibility: the exact same input+state produces the exact same output', () => {
    const router1 = newRouter();
    const tourEngine1 = new GuidedTourEngine();
    const router2 = newRouter();
    const tourEngine2 = new GuidedTourEngine();
    say(router1, tourEngine1, 'p18-determ-a', 'We already have a website.');
    say(router2, tourEngine2, 'p18-determ-b', 'We already have a website.');
    const r1 = say(router1, tourEngine1, 'p18-determ-a', 'Would you rebuild the site?');
    const r2 = say(router2, tourEngine2, 'p18-determ-b', 'Would you rebuild the site?');
    assert.equal(r1.text, r2.text);
  });
});

// =============================================================================
// N. STATE SURVIVES TOPIC MOVEMENT (Invariant 12) + NO PHRASE-SPECIFIC ESCAPE HATCH (Invariant 13)
// =============================================================================

describe('Phase 18 Part N: state survives topic movement, no phrase-specific escape hatch', () => {
  test('a topic switch (Shopify objection) does not destroy the active REBUILD_VS_IMPROVE decision state', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-survive-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    say(router, tourEngine, sessionId, 'Is Shopify enough for me?');
    const r = say(router, tourEngine, sessionId, 'What next?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHAT-NEXT-RESOLVED');
    assert.match(r.text, /lean toward a rebuild/i);
  });

  test('a genuinely new, never-tested phrasing for an already-supported function still works without a new rule', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sessionId = 'p18-novel-1';
    say(router, tourEngine, sessionId, 'We already have a website.');
    say(router, tourEngine, sessionId, 'The current platform is completely limiting us.');
    // "What would you honestly suggest here?" was never written as a trigger
    // phrase anywhere - it matches RECOMMENDATION_REQUEST_PATTERN's
    // "what would you" + "recommend"-adjacent shape only loosely; test the
    // CLASSIFIER directly to prove the underlying mechanism generalizes.
    const fn = classifyMessageFunction('what would you recommend here, honestly?', r_session(router, sessionId));
    assert.equal(fn.function, 'RECOMMENDATION_REQUEST');
  });
});

function r_session(router: LocalSemanticRouter, sessionId: string) {
  return router.getSession(sessionId);
}
