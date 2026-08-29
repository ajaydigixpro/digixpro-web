import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { SessionIsolationManager } from '../session';

describe('LocalSemanticRouter Prototype Integration & Safety Tests', () => {
  let router: LocalSemanticRouter;

  beforeEach(() => {
    router = new LocalSemanticRouter({
      similarityThreshold: 0.75,
      marginThreshold: 0.10
    });
  });

  test('Tier-0 Precedence: SEO takes priority over generic website wording (DEC-003)', () => {
    const res = router.route("SEO chahiye website ke liye", "sess-test-001");
    assert.equal(res.tier0_match, true);
    assert.equal(res.candidate_intent, "INTENT-01-SEO");
    assert.equal(res.candidate_family, "FAM-01");
  });

  test('Tier-0 Precedence: Actionable Audit Intake vs Informational Audit FAQ (DEC-004)', () => {
    const intakeRes = router.route("website audit karwana hai", "sess-test-002");
    assert.equal(intakeRes.candidate_intent, "INTENT-06-AUDIT-INTAKE");
    assert.equal(intakeRes.high_risk, true);

    const infoRes = router.route("website audit kya hota hai?", "sess-test-003");
    assert.equal(infoRes.candidate_intent, "INTENT-06-AUDIT-INFO");
    assert.equal(infoRes.high_risk, false);
  });

  test('Tier-0 Precedence: Discovery Consultation Booking vs Live Handoff (DEC-005)', () => {
    const bookingRes = router.route("30 min call book karni hai", "sess-test-004");
    assert.equal(bookingRes.candidate_intent, "INTENT-08-BOOKING");

    const handoffRes = router.route("mujhe kisi se baat karni hai", "sess-test-005");
    assert.equal(handoffRes.candidate_intent, "INTENT-08-HANDOFF");
  });

  test('Tier-0 Precedence: Commercial Pricing vs Budget Objection (DEC-006)', () => {
    const priceRes = router.route("aapki fee kitni hai", "sess-test-006");
    assert.equal(priceRes.candidate_intent, "INTENT-05-PRICE");

    const objectionRes = router.route("freelancer se karwa lunga budget kam hai", "sess-test-007");
    assert.equal(objectionRes.candidate_intent, "INTENT-09-OBJECTION");
  });

  test('Session Isolation: Visitor A and Visitor B sessions remain 100% isolated', () => {
    const manager = new SessionIsolationManager();
    manager.getOrCreateSession("sess-visitor-A", "lead-101");
    manager.getOrCreateSession("sess-visitor-B", "lead-102");

    manager.updateSessionState("sess-visitor-A", "INTENT-01-SEO", "FLOW-06", "INTENT-01-SEO");
    
    const sA = manager.getOrCreateSession("sess-visitor-A");
    const sB = manager.getOrCreateSession("sess-visitor-B");

    assert.equal(sA.current_intent_id, "INTENT-01-SEO");
    assert.equal(sB.current_intent_id, undefined);
  });
});
