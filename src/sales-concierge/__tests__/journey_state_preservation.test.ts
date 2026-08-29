import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../semantic-router/router';
import { GuidedTourEngine } from '../tour-matrix';

describe('Journey State Preservation & Context Protection Tests', () => {
  const router = new LocalSemanticRouter({
    similarityThreshold: 0.75,
    marginThreshold: 0.10
  });

  const tourEngine = new GuidedTourEngine();

  test('1. Mandatory Test A: Exact SEO New Website Setup + Page Help Sequence (No Reset / No Mismatch)', () => {
    const sessId = "journey-seo-exact-001";

    // Turn 1: Greeting
    const r1 = router.route("hi", sessId);
    assert.equal(r1.candidate_intent, "INTENT-10-GREETING");

    // Turn 2: Select "SEO & AI Search Growth"
    const r2 = router.route("SEO & AI Search Growth", sessId);
    assert.equal(r2.candidate_intent, "INTENT-01-SEO");
    const t2 = tourEngine.resolveTourStep(r2);
    assert.ok(t2.targeted_question?.includes("building a new web platform"));

    // Turn 3: Select "New Website SEO Setup" -> MUST NOT claim existing website!
    const r3 = router.route("New Website SEO Setup", sessId);
    assert.equal(r3.candidate_intent, "INTENT-01-SEO-NEW");
    const t3 = tourEngine.resolveTourStep(r3);
    assert.ok(t3.headline_message.includes("For a new website platform"));
    assert.ok(!t3.headline_message.includes("For an existing website"));
    assert.deepEqual(t3.suggested_replies, ["Google rankings", "AI Search (GEO) visibility", "Local Google Business Profile", "Technical SEO Architecture"]);

    // Turn 4: Select "Google rankings" -> MUST NOT repeat Turn 2 entry question!
    const r4 = router.route("Google rankings", sessId);
    assert.equal(r4.candidate_intent, "INTENT-01-SEO-RECOMMEND");
    const t4 = tourEngine.resolveTourStep(r4);
    assert.equal(t4.canonical_destination.canonical_path, "/search-automation");
    assert.ok(!t4.headline_message.includes("Are you looking to improve search rankings")); // NO LOOP!

    // Turn 5: Type "Explore Page kya karu yahan?" -> MUST give contextual guidance for Search & Automation!
    const r5 = router.route("Explore Page kya karu yahan?", sessId, undefined, "/search-automation");
    assert.equal(r5.candidate_intent, "INTENT-PAGE-CONTEXT");
    const t5 = tourEngine.resolveTourStep(r5);
    assert.ok(t5.headline_message.includes("Search & Automation page"));
    assert.ok(t5.headline_message.includes("exploring search visibility"));
    assert.ok(!t5.headline_message.includes("Are you looking to improve search rankings")); // NO RESET!
  });

  test('2. Mandatory Test B: Exact Tech Advisory Journey Progression', () => {
    const sessId = "journey-cto-001";

    const r1 = router.route("I need independent technology advisory, vendor evaluation, or fractional CTO leadership before committing budget to a platform.", sessId);
    assert.equal(r1.candidate_intent, "INTENT-04-CTO");

    const r2 = router.route("Vendor Proposal Evaluation", sessId);
    assert.equal(r2.candidate_intent, "INTENT-04-CTO-STAGE");
    const t2 = tourEngine.resolveTourStep(r2);
    assert.ok(t2.headline_message.includes("evaluating a vendor proposal"));
    assert.ok(!t2.headline_message.includes("Which core service area"));

    const r3 = router.route("Technical quality & architecture", sessId);
    assert.equal(r3.candidate_intent, "INTENT-04-CTO-PRIORITY");

    const r4 = router.route("Before signing the vendor", sessId);
    assert.equal(r4.candidate_intent, "INTENT-04-CTO-RECOMMEND");
    const t4 = tourEngine.resolveTourStep(r4);
    assert.equal(t4.canonical_destination.canonical_path, "/advisory");
  });

  test('3. Mandatory Test C: Web Engineering Progression (No Repeated Questions)', () => {
    const sessId = "journey-web-002";

    const r1 = router.route("Build a new website", sessId);
    assert.equal(r1.candidate_intent, "INTENT-02-WEB-NEW");

    const r2 = router.route("Business / Corporate Website", sessId);
    assert.equal(r2.candidate_intent, "INTENT-02-WEB-PURPOSE");

    const r3 = router.route("Generate more enquiries", sessId);
    assert.equal(r3.candidate_intent, "INTENT-02-WEB-PRESENCE");

    const r4 = router.route("Starting from scratch", sessId);
    assert.equal(r4.candidate_intent, "INTENT-02-WEB-RECOMMEND");
  });

  test('4. Mandatory Test D: Automation Progression (No Question Loops)', () => {
    const sessId = "journey-auto-004";

    const r1 = router.route("I need workflow automation", sessId);
    assert.equal(r1.candidate_intent, "INTENT-03-AUTO");

    const r2 = router.route("Lead Capture & CRM Sync", sessId);
    assert.equal(r2.candidate_intent, "INTENT-03-AUTO-CRM");

    const r3 = router.route("HubSpot / Salesforce", sessId);
    assert.equal(r3.candidate_intent, "INTENT-03-AUTO-RECOMMEND");
    const t3 = tourEngine.resolveTourStep(r3);
    assert.equal(t3.canonical_destination.canonical_path, "/search-automation");
  });

  test('5. Mandatory Test E: Evidence Filter Isolation (Stays in Evidence Journey)', () => {
    const sessId = "journey-evidence-005";

    const r1 = router.route("Show me your work", sessId);
    assert.equal(r1.candidate_intent, "INTENT-07-EVIDENCE");

    const r2 = router.route("SEO & Traffic Growth Case Studies", sessId);
    assert.equal(r2.candidate_intent, "INTENT-07-EVIDENCE-SEO");
    const t2 = tourEngine.resolveTourStep(r2);
    assert.equal(t2.canonical_destination.canonical_path, "/evidence/digixpro");
  });

  test('6. Mandatory Test F: Explicit Topic Switch Mechanism', () => {
    const sessId = "journey-switch-007";

    const r1 = router.route("I need SEO", sessId);
    assert.equal(r1.candidate_intent, "INTENT-01-SEO");

    const r2 = router.route("Actually, I need a new website.", sessId);
    assert.equal(r2.candidate_intent, "INTENT-02-WEB");

    const r3 = router.route("Business / Corporate Website", sessId);
    assert.equal(r3.candidate_intent, "INTENT-02-WEB-PURPOSE");
  });
});
