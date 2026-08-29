import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../semantic-router/router';
import { GuidedTourEngine } from '../tour-matrix';

describe('Sales Concierge API & Frontend Integration Boundary Tests', () => {
  const router = new LocalSemanticRouter({
    similarityThreshold: 0.75,
    marginThreshold: 0.10
  });

  const tourEngine = new GuidedTourEngine();

  test('1. Initial Greeting Journey: "hello" -> Returns welcome message and suggested replies', () => {
    const r = router.route("hello", "sess-api-001");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-10-GREETING");
    assert.ok(t.headline_message.includes("DigiXPro Concierge"));
    assert.ok(t.suggested_replies && t.suggested_replies.length > 0);
  });

  test('2. SEO Journey: "I need SEO for my existing website" -> Returns /search-automation & DigiXPro evidence (Table 1B)', () => {
    const r = router.route("I need SEO for my existing website", "sess-api-002");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-01-SEO");
    assert.equal(t.canonical_destination.canonical_path, "/search-automation");
    assert.equal(t.evidence_destination?.url, "/evidence/digixpro");
  });

  test('3. Website Journey: "We need a custom website redesign" -> Returns /design-services & BuySecondHandBook evidence (Table 1B)', () => {
    const r = router.route("We need a custom website redesign", "sess-api-003");
    const t = tourEngine.resolveTourStep(r);

    assert.ok(t.intent_id === "INTENT-02-WEB" || t.intent_id === "INTENT-02-WEB-REDESIGN");
    assert.equal(t.canonical_destination.canonical_path, "/design-services");
  });

  test('4. Automation Journey: "n8n automation for lead capture" -> Returns /search-automation & DigiXPro evidence (Table 1B)', () => {
    const r = router.route("n8n automation for lead capture", "sess-api-004");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-03-AUTO");
    assert.equal(t.canonical_destination.canonical_path, "/search-automation");
  });

  test('5. Advisory Journey: "Need fractional CTO for vendor evaluation" -> Returns /advisory & DigiXPro profile (Table 1B)', () => {
    const r = router.route("Need fractional CTO for vendor evaluation", "sess-api-005");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-04-CTO");
    assert.equal(t.canonical_destination.canonical_path, "/advisory");
  });

  test('6. Pricing Request: "aapki fee kitni hai" -> Returns /how-we-work + Audit Intake (No invented price list)', () => {
    const r = router.route("aapki fee kitni hai", "sess-api-006");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-05-PRICE");
    assert.equal(t.canonical_destination.canonical_path, "/how-we-work");
    assert.ok(!t.headline_message.includes("₹"));
  });

  test('7. Audit Request: "website audit karwana hai" -> Returns /audit', () => {
    const r = router.route("website audit karwana hai", "sess-api-007");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-06-AUDIT-INTAKE");
    assert.equal(t.canonical_destination.canonical_path, "/audit");
  });

  test('8. Evidence Request: "show case studies and portfolio" -> Returns /evidence', () => {
    const r = router.route("show case studies and portfolio", "sess-api-008");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-07-EVIDENCE");
    assert.equal(t.canonical_destination.canonical_path, "/evidence");
  });

  test('9. Booking Request: "book 30 min call" -> Returns /contact', () => {
    const r = router.route("book 30 min call", "sess-api-009");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-08-BOOKING");
    assert.equal(t.canonical_destination.canonical_path, "/contact");
  });

  test('10. Suggested Reply Click Simulation: Clicking "Existing Website SEO Audit" routes to INTENT-01-SEO', () => {
    const r = router.route("Existing Website SEO Audit", "sess-api-010");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.intent_id, "INTENT-01-SEO-EXISTING");
    assert.equal(t.canonical_destination.canonical_path, "/search-automation");
  });

  test('11. Session ID Preservation: Consecutive turns maintain same session_id', () => {
    const sessId = "sess-api-011";
    const r1 = router.route("hello", sessId);
    const r2 = router.route("I need SEO", sessId);

    assert.equal(r1.session_id, sessId);
    assert.equal(r2.session_id, sessId);
  });
});
