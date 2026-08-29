import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../semantic-router/router';
import { GuidedTourEngine } from '../tour-matrix';

describe('Multi-Topic Web Engineering & Multi-Turn Dialogue Tests', () => {
  const router = new LocalSemanticRouter({
    similarityThreshold: 0.75,
    marginThreshold: 0.10
  });

  const tourEngine = new GuidedTourEngine();

  test('Turn 1: "I am evaluating a custom website design, website redesign, or SEO-ready web engineering project." -> INTENT-02-WEB', () => {
    const query = "I am evaluating a custom website design, website redesign, or SEO-ready web engineering project.";
    const routeRes = router.route(query, "multi-turn-sess-001");

    assert.equal(routeRes.candidate_intent, "INTENT-02-WEB");
    const tourRes = tourEngine.resolveTourStep(routeRes);

    assert.ok(tourRes.headline_message.includes("closely related"));
    assert.ok(tourRes.targeted_question?.includes("build a new website"));
    assert.deepEqual(tourRes.suggested_replies, ["Build a new website", "Redesign my existing website", "Improve SEO / AI Search"]);
    assert.equal(tourRes.tour_actions.length, 0); // Pure conversational clarification
  });

  test('Turn 2: "Build a new website" -> INTENT-02-WEB-NEW', () => {
    const routeRes = router.route("Build a new website", "multi-turn-sess-001");
    assert.equal(routeRes.candidate_intent, "INTENT-02-WEB-NEW");

    const tourRes = tourEngine.resolveTourStep(routeRes);
    assert.ok(tourRes.headline_message.includes("Excellent. Let's start with the new website requirement."));
    assert.equal(tourRes.targeted_question, "What are you looking to build?");
    assert.deepEqual(tourRes.suggested_replies, [
      "Business / Corporate Website",
      "E-commerce / Marketplace",
      "Something More Complex",
      "Not Sure — Help Me Decide"
    ]);
  });

  test('Turn 3: "Business / Corporate Website" -> INTENT-02-WEB-PURPOSE', () => {
    const routeRes = router.route("Business / Corporate Website", "multi-turn-sess-001");
    assert.equal(routeRes.candidate_intent, "INTENT-02-WEB-PURPOSE");

    const tourRes = tourEngine.resolveTourStep(routeRes);
    assert.ok(tourRes.headline_message.includes("narrow it down together"));
    assert.ok(tourRes.targeted_question?.includes("primary business objective"));
    assert.equal(tourRes.tour_actions.length, 0);
  });
});
