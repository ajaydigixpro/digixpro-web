import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { GuidedTourEngine } from '../../tour-matrix';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 22: HUMAN-LEVEL CONVERSATION HARDENING
//
// This phase audited the deployed conversation flow against realistic,
// naturally-worded visitor turns (not intent labels) and found 10 narrow,
// reproducible gaps - each fixed with the smallest existing-authority
// extension (a wider regex, a wider position-independent detector, or reuse
// of the existing future_<key>/collected_context state), never a new
// reasoning authority. See the Phase 22 report for the full audit,
// including the items DEFERRED because fixing them would require a new
// authority (a "pending question" tracker) or had no reproducible failure.

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

function runConversation(router: LocalSemanticRouter, tourEngine: GuidedTourEngine, sid: string, turns: string[]) {
  let last: ReturnType<typeof say> | undefined;
  for (const t of turns) last = say(router, tourEngine, sid, t);
  return last!;
}

// =============================================================================
// PART 3: correction/negation natural-variant hardening (bug fixes)
// =============================================================================

describe('Phase 22 Part 3: correction variants not previously recognized', () => {
  test('"Wait, I have a site." registers the correction, not a stale new-website label', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-c1';
    say(router, tourEngine, sid, 'I need a new website.');
    const corrected = say(router, tourEngine, sid, 'Wait, I have a site.');
    assert.equal(corrected.session.existing_website, true);
    assert.equal(corrected.session.primary_intent, undefined);
    const r = say(router, tourEngine, sid, 'What would you do?');
    assert.notEqual(r.result.candidate_intent, 'INTENT-02-WEB');
  });

  test('"Sorry, I meant I already have one." registers the correction', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-c2';
    say(router, tourEngine, sid, 'I need a new website.');
    const corrected = say(router, tourEngine, sid, 'Sorry, I meant I already have one.');
    assert.equal(corrected.session.existing_website, true);
  });

  test('regression: the original correction phrasings still work unchanged', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p22-t-c3a', 'I need a new website.');
    const a = say(router, tourEngine, 'p22-t-c3a', 'Actually I already have one.');
    assert.equal(a.session.existing_website, true);
    const router2 = newRouter();
    say(router2, tourEngine, 'p22-t-c3b', 'I need a new website.');
    const b = say(router2, tourEngine, 'p22-t-c3b', 'No, I already have a website.');
    assert.equal(b.session.existing_website, true);
  });
});

// =============================================================================
// PART 4: ellipsis / contextual follow-ups (bug fixes)
// =============================================================================

describe('Phase 22 Part 4: bare platform follow-ups and WHY-shaped fragments', () => {
  test('"and Shopify?" after an active rebuild-vs-improve decision resolves as a platform objection, not generic clarify', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-e1';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'and Shopify?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('"what about WordPress?" resolves as a platform objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-e3';
    say(router, tourEngine, sid, 'We already have a website.');
    const r = say(router, tourEngine, sid, 'what about WordPress?');
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('"why that?" is recognized as WHY (bare, no apostrophe)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-e7';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'why that?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
  });

  test('"what do you mean?" right after a recommendation re-explains it (WHY-shaped), not a generic value-prop misfire', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-e8';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    say(router, tourEngine, sid, 'What would you do?');
    const r = say(router, tourEngine, sid, 'what do you mean?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.doesNotMatch(r.text, /independent web engineering, technical seo/i);
  });

  test('"okay, but why?" is recognized as WHY', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-e9';
    say(router, tourEngine, sid, 'We already have a website.');
    say(router, tourEngine, sid, 'The current platform is completely limiting us.');
    const r = say(router, tourEngine, sid, 'okay, but why?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
  });
});

// =============================================================================
// PART 6: conversational repair (bug fixes)
// =============================================================================

describe('Phase 22 Part 6: bare retraction resolves an unambiguous single pending requirement', () => {
  test('"Forget that." right after deferring the ONLY pending requirement supersedes it', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-r1';
    say(router, tourEngine, sid, 'Maybe ecommerce later.');
    const r = say(router, tourEngine, sid, 'Forget that.');
    assert.equal(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
    assert.equal(r.session.collected_context?.future_ecommerce, 'superseded');
  });

  test('"Ignore that." behaves the same as "Forget that."', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-r2';
    say(router, tourEngine, sid, 'Maybe ecommerce later.');
    const r = say(router, tourEngine, sid, 'Ignore that.');
    assert.equal(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });

  test('a bare retraction with NO pending requirement falls through unchanged (no false supersession)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-r-noop';
    say(router, tourEngine, sid, 'We already have a website.');
    const r = say(router, tourEngine, sid, 'Never mind.');
    assert.notEqual(r.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });

  test('"No, you\'re misunderstanding me." is recognized as correction recovery', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-r7';
    say(router, tourEngine, sid, 'I need a new website.');
    const r = say(router, tourEngine, sid, "No, you're misunderstanding me.");
    assert.equal(r.result.candidate_intent, 'INTENT-CORRECTION-RECOVERY');
  });
});

// =============================================================================
// PART 9: objection natural phrasing (bug fixes)
// =============================================================================

describe('Phase 22 Part 9: objection phrasing gaps', () => {
  test('"Why can\'t Shopify do this?" is recognized as the platform objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-o1', "Why can't Shopify do this?");
    assert.equal(r.result.candidate_intent, 'INTENT-PLATFORM-OBJECTION');
  });

  test('"Isn\'t a freelancer enough?" is recognized as the freelancer objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-o2', "Isn't a freelancer enough?");
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });

  test('"Why do I need an audit?" is recognized as the audit-overkill objection', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-o3', 'Why do I need an audit?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
  });

  test('"This sounds like overkill." is recognized (not just "seems like")', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-o4', 'This sounds like overkill.');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION');
  });

  test('"Can\'t I just fix the website myself?" is recognized as the DIY objection, not misrouted to a new-website request', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-o5', "Can't I just fix the website myself?");
    assert.notEqual(r.result.candidate_intent, 'INTENT-02-WEB-NEW');
    assert.equal(r.result.candidate_intent, 'INTENT-SKEPTICISM-WHY-DIGIXPRO');
  });
});

// =============================================================================
// PART 11: evidence request phrasing (bug fixes)
// =============================================================================

describe('Phase 22 Part 11: evidence request phrasing gaps', () => {
  test('"Show me something relevant." routes through the existing context-aware evidence filter', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-v1';
    say(router, tourEngine, sid, 'We already have a website.');
    const r = say(router, tourEngine, sid, 'Show me something relevant.');
    assert.equal(r.result.candidate_family, 'FAM-07');
  });

  test('"Do you have an example?" routes to the evidence filter', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-v2', 'Do you have an example?');
    assert.equal(r.result.candidate_family, 'FAM-07');
  });

  test('"Have you done this before?" routes to the evidence filter', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-v4', 'Have you done this before?');
    assert.equal(r.result.candidate_family, 'FAM-07');
  });
});

// =============================================================================
// PART 12: typo tolerance (bug fixes)
// =============================================================================

describe('Phase 22 Part 12: common typo tolerance in Tier-0', () => {
  test('"webiste" still matches the new-website Tier-0 rule', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-y1', 'I need a new webiste.');
    assert.equal(r.result.candidate_intent, 'INTENT-02-WEB-NEW');
  });

  test('"trafffic" still registers the traffic-confirmed fact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-t-y5';
    say(router, tourEngine, sid, 'We already have a website.');
    const r = say(router, tourEngine, sid, 'Our trafffic is fine.');
    assert.equal(r.session.collected_context?.traffic, 'plenty');
  });

  test('"prcing" still resolves to the pricing intent', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-y4', 'Can you tell me the prcing?');
    assert.equal(r.result.candidate_intent, 'INTENT-05-PRICE');
  });

  test('regression: correctly-spelled input is unaffected by the typo table', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const r = say(router, tourEngine, 'p22-t-y-regress', 'I need a new website.');
    assert.equal(r.result.candidate_intent, 'INTENT-02-WEB-NEW');
  });
});

// =============================================================================
// PART 2: compact natural-conversation set (12 realistic sequences)
// =============================================================================

describe('Phase 22 Part 2: natural conversation sequences', () => {
  test('1. Existing website correction mid-conversation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-1';
    say(router, tourEngine, sid, 'hi, I need a new website');
    const r = say(router, tourEngine, sid, 'wait, actually I already have one');
    assert.equal(r.session.existing_website, true);
  });

  test('2. Traffic vs enquiries distinction', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-2';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'traffic is okay');
    const r = say(router, tourEngine, sid, "enquiries aren't");
    assert.equal(r.result.candidate_intent, 'INTENT-SEO-CONVERSION-INSIGHT');
  });

  test('3. Ecommerce deferred then superseded', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-3';
    say(router, tourEngine, sid, 'maybe ecommerce later');
    const r = say(router, tourEngine, sid, 'actually forget ecommerce');
    assert.equal(r.session.collected_context?.future_ecommerce, 'superseded');
  });

  test('4. Ecommerce reactivated later via topic switch', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-4';
    say(router, tourEngine, sid, 'maybe ecommerce later');
    say(router, tourEngine, sid, 'forget ecommerce');
    const r = say(router, tourEngine, sid, "let's focus on ecommerce now");
    assert.equal(r.session.industry, 'ecommerce');
  });

  test('5. Recommendation -> WHY stays coherent', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-5';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'the current platform is completely limiting us');
    say(router, tourEngine, sid, 'what would you do?');
    const r = say(router, tourEngine, sid, 'why?');
    assert.match(r.text, /rebuild/i);
  });

  test('6. Recommendation -> unrelated interruption -> WHY still explains the recommendation (not a generic default)', () => {
    // PHASE 22 BUG FOUND VIA THIS EXACT SCENARIO (over real HTTP): an
    // irrelevant aside the router doesn't recognize resolves to
    // INTENT-CONTEXTUAL-CLARIFY, which resolveWhyTarget's bounded lookback
    // (workingMemory.ts) did not treat as skippable - so "why?" silently
    // fell through to the generic INTENT-06-AUDIT-WHY default instead of
    // reusing the just-established INTENT-REBUILD-VS-IMPROVE reasoning.
    // Fixed by adding INTENT-CONTEXTUAL-CLARIFY to WHY_INTERRUPTION_INTENTS.
    // Assert the actual resolved intent, not just a loose text match - the
    // wrong (generic audit) response also happens to contain the word
    // "rebuild" in passing, which let the original weaker assertion here
    // pass even while the underlying bug was live.
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-6';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'the current platform is completely limiting us');
    say(router, tourEngine, sid, 'what would you do?');
    say(router, tourEngine, sid, 'by the way we are based in Mumbai');
    const why = say(router, tourEngine, sid, 'why?');
    assert.equal(why.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
    assert.match(why.text, /lean toward a rebuild/i);
    assert.doesNotMatch(why.text, /audit first is essential/i);
  });

  test('7. "do you still stand by that?" resolves correctly', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-7';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'the current platform is completely limiting us');
    const r = say(router, tourEngine, sid, 'do you still stand by that?');
    assert.equal(r.result.candidate_intent, 'INTENT-WHY-CONTEXTUAL');
  });

  test('8. Objection -> recommendation', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-8';
    say(router, tourEngine, sid, "isn't a freelancer enough?");
    const r = say(router, tourEngine, sid, 'okay, so what would you do?');
    assert.ok(r.result.candidate_intent);
  });

  test('9. Objection -> "okay, but what would you do?"', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-9';
    say(router, tourEngine, sid, 'why do I need an audit?');
    const r = say(router, tourEngine, sid, 'okay, but what would you do?');
    assert.ok(r.result.candidate_intent);
  });

  test('10. Pricing interruption during another decision does not destroy it', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-10';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'traffic is fine');
    say(router, tourEngine, sid, "but enquiries aren't great");
    say(router, tourEngine, sid, 'how much does this cost?');
    const r = say(router, tourEngine, sid, 'okay, back to the website - what would you do?');
    assert.match(r.text, /conversion path/i);
  });

  test('11. Timeline interruption does not become the recommendation itself', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-11';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'the current platform is completely limiting us');
    say(router, tourEngine, sid, 'what about timeline?');
    const r = say(router, tourEngine, sid, 'and what would you do?');
    assert.equal(r.result.candidate_intent, 'INTENT-REBUILD-VS-IMPROVE');
  });

  test('12. Topic switch and return to previous topic', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-conv-12';
    say(router, tourEngine, sid, 'we already have a website');
    say(router, tourEngine, sid, 'traffic is fine');
    say(router, tourEngine, sid, 'how much does this cost?');
    const r = say(router, tourEngine, sid, 'okay, back to the website - what would you do?');
    assert.equal(r.result.candidate_intent, 'INTENT-06-AUDIT-OBJECTION-RECOMMENDATION');
  });
});

// =============================================================================
// SAFETY: acceptance invariants spot-checked directly
// =============================================================================

describe('Phase 22: acceptance invariant spot checks', () => {
  test('invariant 3: ambiguous "maybe" does not become a false fact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-inv-3';
    say(router, tourEngine, sid, 'I need a new website.');
    const r = say(router, tourEngine, sid, 'maybe');
    assert.equal(r.session.existing_website, undefined);
  });

  test('invariant 4: "not sure" does not become a false negative fact', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-inv-4';
    say(router, tourEngine, sid, 'We already have a website.');
    const r = say(router, tourEngine, sid, 'not sure');
    assert.equal(r.session.existing_website, true);
  });

  test('invariant 15: inferences are never presented as visitor-stated facts (enquiry_health not claimed unless recorded)', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    const sid = 'p22-inv-15';
    say(router, tourEngine, sid, "I don't think I need an audit.");
    const r = say(router, tourEngine, sid, 'What would you do?');
    assert.doesNotMatch(r.text, /enquiries weak/i);
  });

  test('invariant 26: session isolation - a bare retraction fix in one session never leaks into another', () => {
    const router = newRouter();
    const tourEngine = new GuidedTourEngine();
    say(router, tourEngine, 'p22-inv-26-a', 'Maybe ecommerce later.');
    const other = say(router, tourEngine, 'p22-inv-26-b', 'Forget that.');
    assert.notEqual(other.result.candidate_intent, 'INTENT-REQUIREMENT-SUPERSEDED');
  });
});
