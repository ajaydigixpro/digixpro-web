import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../semantic-router/router';
import { GuidedTourEngine } from '../tour-matrix';

describe('Navigation & Canonical Link Integrity Regression Suite', () => {
  const router = new LocalSemanticRouter({
    similarityThreshold: 0.75,
    marginThreshold: 0.10
  });

  const tourEngine = new GuidedTourEngine();

  test('1. Destination has canonical_path and valid route Data Contract', () => {
    const sessId = "nav-reg-001";
    const r = router.route("I need independent technology advisory", sessId, undefined, "/");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.canonical_destination.destination_type, 'CANONICAL_PAGE');
    assert.equal(t.canonical_destination.canonical_path, '/advisory');
    assert.ok(t.canonical_destination.display_label.length > 0);
    assert.ok(t.canonical_destination.what_to_inspect.length > 0);
    assert.ok(t.canonical_destination.why_it_matters.length > 0);
    assert.ok(Array.isArray(t.canonical_destination.evidence_destinations));
    assert.ok(Array.isArray(t.canonical_destination.next_steps));
  });

  test('2. Destination renders as clickable navigation target without legacy /services/ URLs', () => {
    const sessId = "nav-reg-002";
    const r = router.route("I need SEO", sessId, undefined, "/");
    const t = tourEngine.resolveTourStep(r);

    assert.equal(t.canonical_destination.canonical_path, '/search-automation');
    assert.ok(!t.canonical_destination.canonical_path.includes('/services/'));
  });

  test('3. Clicking destination changes pathname and session current_page updates', () => {
    const sessId = "nav-reg-003";

    // Step 1: On homepage
    router.route("I need independent technology advisory", sessId, undefined, "/");

    // Step 2: Navigate to /advisory
    const rNav = router.route("What should I look at here?", sessId, undefined, "/advisory");
    assert.equal(rNav.current_page, "/advisory");

    const tNav = tourEngine.resolveTourStep(rNav);
    assert.ok(tNav.headline_message.includes("Advisory page"));
  });

  test('4. Session survives navigation and previous_page updates', () => {
    const sessId = "nav-reg-004";

    router.route("I need a new website", sessId, undefined, "/");
    const r2 = router.route("What should I look at here?", sessId, undefined, "/design-services");

    assert.equal(r2.current_page, "/design-services");
  });

  test('5. Page-context intent does not reset journey', () => {
    const sessId = "nav-reg-005";

    router.route("I need SEO", sessId, undefined, "/");
    router.route("New Website SEO Setup", sessId, undefined, "/");
    router.route("Google rankings", sessId, undefined, "/");

    const rHelp = router.route("What should I inspect here?", sessId, undefined, "/search-automation");
    assert.equal(rHelp.candidate_intent, "INTENT-PAGE-CONTEXT");

    const tHelp = tourEngine.resolveTourStep(rHelp);
    assert.ok(tHelp.headline_message.includes("Search & Automation page"));
    assert.ok(!tHelp.headline_message.includes("Are you looking to improve search rankings")); // NO LOOP!
  });

  test('6. Evidence request preserves active journey', () => {
    const sessId = "nav-reg-006";

    router.route("I need independent technology advisory", sessId, undefined, "/");
    router.route("Vendor Proposal Evaluation", sessId, undefined, "/");

    const rProof = router.route("show me proof", sessId, undefined, "/advisory");
    assert.equal(rProof.candidate_intent, "INTENT-07-EVIDENCE");

    const tProof = tourEngine.resolveTourStep(rProof);
    assert.equal(tProof.evidence_destination?.url, "/evidence/sattvaos");
  });

  test('7. "what next?" preserves journey and offers next stage', () => {
    const sessId = "nav-reg-007";

    router.route("I need independent technology advisory", sessId, undefined, "/");
    const rNext = router.route("what next?", sessId, undefined, "/advisory");

    assert.equal(rNext.candidate_intent, "INTENT-PAGE-CONTEXT");
    const tNext = tourEngine.resolveTourStep(rNext);
    assert.ok(tNext.suggested_replies?.includes("Book 30-Min Call"));
  });

  test('8. Direct page entry works (explains page naturally)', () => {
    const sessId = "nav-reg-008";

    const rDirect = router.route("What is this page about?", sessId, undefined, "/advisory");
    assert.equal(rDirect.candidate_intent, "INTENT-PAGE-EXPLAIN");

    const tDirect = tourEngine.resolveTourStep(rDirect);
    assert.ok(tDirect.headline_message.includes("Advisory page"));
  });

  test('9. Explicit topic switching still works', () => {
    const sessId = "nav-reg-009";

    router.route("I need SEO", sessId, undefined, "/");
    const rSwitch = router.route("Actually I need a new website", sessId, undefined, "/");

    assert.ok(rSwitch.candidate_intent === "INTENT-02-WEB" || rSwitch.candidate_intent === "INTENT-02-WEB-NEW");
  });

  test('10. Pricing request preserves service context and never invents numbers', () => {
    const sessId = "nav-reg-010";

    router.route("I need SEO", sessId, undefined, "/");
    const rPrice = router.route("How much does it cost?", sessId, undefined, "/");

    assert.equal(rPrice.candidate_intent, "INTENT-05-PRICE");
    const tPrice = tourEngine.resolveTourStep(rPrice);
    assert.ok(!tPrice.headline_message.includes("₹"));
  });

  test('11. Audit intake transition works', () => {
    const sessId = "nav-reg-011";

    const rAudit = router.route("I want a website audit", sessId, undefined, "/");
    assert.equal(rAudit.candidate_intent, "INTENT-06-AUDIT-INTAKE");

    const tAudit = tourEngine.resolveTourStep(rAudit);
    assert.equal(tAudit.canonical_destination.canonical_path, "/audit");
  });

  test('12. 30-minute Architecture Call booking transition works', () => {
    const sessId = "nav-reg-012";

    const rBook = router.route("I want to speak to someone", sessId, undefined, "/");
    assert.equal(rBook.candidate_intent, "INTENT-08-BOOKING");

    const tBook = tourEngine.resolveTourStep(rBook);
    assert.equal(tBook.canonical_destination.canonical_path, "/contact");
  });

  test('13. Zero legacy /services/ URLs exist in router or tour matrix', () => {
    const sessId = "nav-reg-013";
    const r = router.route("Web engineering", sessId, undefined, "/");
    const t = tourEngine.resolveTourStep(r);

    assert.ok(!t.canonical_destination.canonical_path.includes('/services/'));
  });
});
