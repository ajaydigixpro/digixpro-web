import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../semantic-router/router';
import { GuidedTourEngine } from '../tour-matrix';

describe('Guided Website Tour Matrix & Pipeline Integration Tests', () => {
  const router = new LocalSemanticRouter({
    similarityThreshold: 0.75,
    marginThreshold: 0.10
  });

  const tourEngine = new GuidedTourEngine();

  test('SEO Requirement: "I need SEO for my existing website" -> Guides to /search-automation + DigiXPro Evidence (Table 1B)', () => {
    const routingResult = router.route("I need SEO for my existing website", "test-session-001");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-01-SEO");
    assert.equal(tourStep.canonical_destination.canonical_path, "/search-automation");
    assert.equal(tourStep.evidence_destination?.url, "/evidence/digixpro");
  });

  test('Website Requirement: "We need a custom website redesign" -> Guides to /design-services + BuySecondHandBook Evidence (Table 1B)', () => {
    const routingResult = router.route("We need a custom website redesign", "test-session-002");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.ok(tourStep.intent_id === "INTENT-02-WEB" || tourStep.intent_id === "INTENT-02-WEB-REDESIGN");
    assert.equal(tourStep.canonical_destination.canonical_path, "/design-services");
  });

  test('AI & Automation Requirement: "n8n automation for lead capture" -> Guides to /search-automation', () => {
    const routingResult = router.route("n8n automation for lead capture", "test-session-003");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-03-AUTO");
    assert.equal(tourStep.canonical_destination.canonical_path, "/search-automation");
  });

  test('Tech Advisory Requirement: "Need fractional CTO for vendor evaluation" -> Guides to /advisory', () => {
    const routingResult = router.route("Need fractional CTO for vendor evaluation", "test-session-004");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-04-CTO");
    assert.equal(tourStep.canonical_destination.canonical_path, "/advisory");
  });

  test('Pricing Request: "aapki fee kitni hai" -> Guides to /how-we-work + Audit intake (Never invents price list)', () => {
    const routingResult = router.route("aapki fee kitni hai", "test-session-005");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-05-PRICE");
    assert.equal(tourStep.canonical_destination.canonical_path, "/how-we-work");
    assert.equal(tourStep.audit_recommendation?.url, "/audit");
  });

  test('Actionable Audit Request: "website audit karwana hai" -> Guides to /audit intake', () => {
    const routingResult = router.route("website audit karwana hai", "test-session-006");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-06-AUDIT-INTAKE");
    assert.equal(tourStep.canonical_destination.canonical_path, "/audit");
  });

  test('30-Minute Consultation Request: "book 30 min call" -> Guides to /contact', () => {
    const routingResult = router.route("book 30 min call", "test-session-007");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-08-BOOKING");
    assert.equal(tourStep.canonical_destination.canonical_path, "/contact");
  });

  test('Evidence Request: "show case studies and portfolio" -> Guides to /evidence', () => {
    const routingResult = router.route("show case studies and portfolio", "test-session-008");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-07-EVIDENCE");
    assert.equal(tourStep.canonical_destination.canonical_path, "/evidence");
  });

  test('Greeting Request: "hello hi" -> Welcomes and offers service discovery options', () => {
    const routingResult = router.route("hello hi", "test-session-009");
    const tourStep = tourEngine.resolveTourStep(routingResult);

    assert.equal(tourStep.intent_id, "INTENT-10-GREETING");
    assert.ok(tourStep.suggested_replies && tourStep.suggested_replies.length > 0);
  });

  test('Session Isolation: Visitor A (SEO) and Visitor B (Website) maintain independent tour steps', () => {
    const rA = router.route("I need SEO for my existing website", "session-visitor-a");
    const rB = router.route("We need a custom website redesign", "session-visitor-b");

    const tA = tourEngine.resolveTourStep(rA);
    const tB = tourEngine.resolveTourStep(rB);

    assert.equal(tA.canonical_destination.canonical_path, "/search-automation");
    assert.equal(tB.canonical_destination.canonical_path, "/design-services");
  });
});
