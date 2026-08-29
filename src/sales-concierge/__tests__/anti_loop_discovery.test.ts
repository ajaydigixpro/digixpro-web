import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../semantic-router/router';
import { GuidedTourEngine } from '../tour-matrix';

describe('Anti-Loop Discovery & Session State Preservation Tests', () => {
  const router = new LocalSemanticRouter({
    similarityThreshold: 0.75,
    marginThreshold: 0.10
  });

  const tourEngine = new GuidedTourEngine();

  test('Sequence 1: Multi-turn "Not Sure — Help Me Decide" Discovery Progression', () => {
    const sessId = "anti-loop-sess-001";

    const r1 = router.route("I am evaluating a custom website design, website redesign, or SEO-ready web engineering project.", sessId);
    assert.equal(r1.candidate_intent, "INTENT-02-WEB");
    const t1 = tourEngine.resolveTourStep(r1);
    assert.ok(t1.targeted_question?.includes("build a new website"));

    const r2 = router.route("Build a new website", sessId);
    assert.equal(r2.candidate_intent, "INTENT-02-WEB-NEW");

    const r3 = router.route("Not Sure — Help Me Decide", sessId);
    assert.equal(r3.candidate_intent, "INTENT-02-WEB-PURPOSE");

    const r4 = router.route("Generate more enquiries", sessId);
    assert.equal(r4.candidate_intent, "INTENT-02-WEB-PRESENCE");

    const r5 = router.route("Starting from scratch", sessId);
    assert.equal(r5.candidate_intent, "INTENT-02-WEB-RECOMMEND");
    const t5 = tourEngine.resolveTourStep(r5);
    assert.equal(t5.canonical_destination.canonical_path, "/design-services");
  });

  test('Sequence 2: Direct "I need a new website" -> "Business / Corporate Website" -> "Generate more enquiries" -> "Starting from scratch"', () => {
    const sessId = "anti-loop-sess-002";

    const r1 = router.route("I need a new website", sessId);
    assert.ok(r1.candidate_intent === "INTENT-02-WEB" || r1.candidate_intent === "INTENT-02-WEB-NEW");

    const r2 = router.route("Business / Corporate Website", sessId);
    assert.equal(r2.candidate_intent, "INTENT-02-WEB-PURPOSE");

    const r3 = router.route("Generate more enquiries", sessId);
    assert.equal(r3.candidate_intent, "INTENT-02-WEB-PRESENCE");

    const r4 = router.route("Starting from scratch", sessId);
    assert.equal(r4.candidate_intent, "INTENT-02-WEB-RECOMMEND");
    const t4 = tourEngine.resolveTourStep(r4);
    assert.equal(t4.canonical_destination.canonical_path, "/design-services");
  });

  test('Sequence 3: "I need SEO" Isolation (Does not bleed into Web Discovery)', () => {
    const sessId = "anti-loop-sess-003";

    const r1 = router.route("I need SEO for my existing website", sessId);
    assert.equal(r1.candidate_intent, "INTENT-01-SEO");
    const t1 = tourEngine.resolveTourStep(r1);
    assert.equal(t1.canonical_destination.canonical_path, "/search-automation");

    const r2 = router.route("Existing Website SEO Audit", sessId);
    assert.equal(r2.candidate_intent, "INTENT-01-SEO-EXISTING");
  });

  test('Sequence 4: "I need a website redesign" Isolation (Does not repeat Turn 1 questions)', () => {
    const sessId = "anti-loop-sess-004";

    const r1 = router.route("I need to redesign my existing website", sessId);
    assert.equal(r1.candidate_intent, "INTENT-02-WEB-REDESIGN");
    const t1 = tourEngine.resolveTourStep(r1);

    assert.ok(!t1.headline_message.includes("closely related"));
    assert.ok(t1.headline_message.includes("website redesign"));
  });

  test('Sequence 5: Navigation Click "Explore Design Services" Preserves State & Avoids Discovery Restart', () => {
    const sessId = "anti-loop-sess-005";

    router.route("I need a new website", sessId);

    const rNav = router.route("Explore Design Services", sessId);
    assert.equal(rNav.candidate_intent, "INTENT-02-NAV-DESIGN");

    const tNav = tourEngine.resolveTourStep(rNav);
    assert.ok(tNav.headline_message.includes("Navigating to Design Services"));
    assert.equal(tNav.canonical_destination.canonical_path, "/design-services");
  });
});
