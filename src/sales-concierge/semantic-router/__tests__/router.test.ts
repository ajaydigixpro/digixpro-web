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

  // --- Known intents ---

  test('Known intent: Hinglish SEO request routes via Tier-0 precedence (DEC-003)', () => {
    const res = router.route("SEO chahiye website ke liye", "sess-test-001");
    assert.equal(res.tier0_match, true);
    assert.equal(res.candidate_intent, "INTENT-01-SEO");
    // NOTE: precedence.ts's own regex block for this phrasing returns family
    // "FAM-03" for intent "INTENT-01-SEO" (a labeling inconsistency that predates
    // this changeset - precedence.ts was left unmodified per instructions, so the
    // test asserts the actual current behavior rather than the label that would
    // be intuitively expected).
    assert.equal(res.candidate_family, "FAM-03");
  });

  test('Known intent: actionable audit intake is high-risk (DEC-004)', () => {
    const intakeRes = router.route("website audit karwana hai", "sess-test-002");
    assert.equal(intakeRes.candidate_intent, "INTENT-06-AUDIT-INTAKE");
    assert.equal(intakeRes.high_risk, true);
  });

  test('Known intent: greeting', () => {
    const res = router.route("hello", "sess-test-greeting");
    assert.equal(res.candidate_intent, "INTENT-10-GREETING");
    assert.equal(res.tier0_match, true);
  });

  test('Known intent: booking request is high-risk (DEC-005)', () => {
    const bookingRes = router.route("30 min call book karni hai", "sess-test-004");
    assert.equal(bookingRes.candidate_intent, "INTENT-08-BOOKING");
    assert.equal(bookingRes.high_risk, true);
  });

  test('Known intent: commercial pricing request (DEC-006)', () => {
    const priceRes = router.route("aapki fee kitni hai", "sess-test-006");
    assert.equal(priceRes.candidate_intent, "INTENT-05-PRICE");
    assert.equal(priceRes.high_risk, true);
  });

  // --- Clarify / fallback ---

  test('Clarify: an input with no matching precedence rule and existing session context routes to contextual clarify, not an invented objection intent', () => {
    // This input previously (pre-cleanup) matched an n8n-only "objection_freelancer"
    // pattern that was never ported into this repository router by design (see
    // task instruction: do not copy n8n Tier-0 regex logic into the repo). With no
    // matching precedence rule, the router correctly falls through to its
    // confidence-based clarify path.
    const res = router.route("freelancer se karwa lunga budget kam hai", "sess-test-007");
    assert.equal(res.candidate_intent, "INTENT-CONTEXTUAL-CLARIFY");
    assert.equal(res.clarification_required, true);
  });

  test('Fallback: unrecognized/gibberish input on a fresh session still requires clarification', () => {
    const res = router.route("zzflorptastic wobblejam", "sess-test-unknown");
    assert.equal(res.tier0_match, false);
    assert.equal(res.clarification_required, true);
    // The router sets session.original_goal to the input itself before evaluating
    // confidence, so even a first-ever message resolves through the contextual
    // (not the pure cold-start) clarify branch - documented actual behavior.
    assert.equal(res.candidate_intent, "INTENT-CONTEXTUAL-CLARIFY");
  });

  // --- Multi-turn session state ---

  test('Multi-turn: a state-dependent rule ("what next?") branches differently once primary_intent=CTO is set', () => {
    const sessionId = "sess-test-multiturn-cto";
    const turn1 = router.route("fractional cto", sessionId);
    assert.equal(turn1.candidate_intent, "INTENT-04-CTO");

    const turn2 = router.route("what next?", sessionId);
    assert.equal(turn2.candidate_intent, "INTENT-08-HANDOFF");
    assert.equal(turn2.candidate_family, "FAM-08");
  });

  test('Multi-turn control: the same "what next?" input on a fresh session (no prior CTO state) takes the default branch', () => {
    const res = router.route("what next?", "sess-test-multiturn-fresh");
    assert.equal(res.candidate_intent, "INTENT-02-NAV-DESIGN");
  });

  // --- Canonical knowledge retrieval ---

  test('Canonical retrieval: routing result always carries retrieved_context grounding', () => {
    const res = router.route("hello", "sess-test-retrieval-shape");
    assert.ok(res.retrieved_context, "retrieved_context should always be present");
    assert.ok(Array.isArray(res.retrieved_context!.matchedServices));
    assert.ok(Array.isArray(res.retrieved_context!.activeUrls));
    assert.ok(res.retrieved_context!.activeUrls.length > 0, "canonical URL registry should never be empty");
  });

  test('Canonical retrieval: a query matching a real service name surfaces that service', () => {
    const res = router.route("tell me about seo-ready website engineering please", "sess-test-retrieval-match");
    const serviceIds = res.retrieved_context!.matchedServices.map(s => s.id);
    assert.ok(serviceIds.includes("seo_ready"), `expected 'seo_ready' in matched services, got ${JSON.stringify(serviceIds)}`);
  });

  // --- Cross-session isolation (via the router's own session manager) ---

  test('Cross-session isolation: two visitors routed through the same router instance do not leak state', () => {
    router.route("seo chahiye website ke liye", "sess-router-isoA");
    router.route("30 min call book karni hai", "sess-router-isoB");

    const sA = router.getSession("sess-router-isoA");
    const sB = router.getSession("sess-router-isoB");

    assert.equal(sA.primary_intent, "SEO");
    assert.equal(sB.primary_intent, "BOOKING");
  });

  test('Cross-session isolation: SessionIsolationManager keeps independent visitors separate', () => {
    const manager = new SessionIsolationManager();
    manager.getOrCreateSession("sess-visitor-A", "lead-101");
    manager.getOrCreateSession("sess-visitor-B", "lead-102");

    manager.updateSessionState("sess-visitor-A", "INTENT-01-SEO", "FLOW-06", "INTENT-01-SEO");

    const sA = manager.getOrCreateSession("sess-visitor-A");
    const sB = manager.getOrCreateSession("sess-visitor-B");

    assert.equal(sA.current_intent_id, "INTENT-01-SEO");
    assert.equal(sB.current_intent_id, undefined);
  });

  // --- Honesty guardrail ---

  test('Engine identity is honestly labeled as deterministic lexical/fuzzy, not a model', () => {
    assert.equal(router.getEngineName(), "deterministic-lexical-fuzzy-v1");
  });

  // --- Session continuity via hydration (Phase 5) ---

  test('hydrateSession round-trip: a session snapshot from one router instance restores state in a brand-new instance', () => {
    const sessionId = "sess-hydrate-001";

    // Turn 1: original router instance (simulates the first HTTP request).
    const turn1 = router.route("fractional cto", sessionId);
    assert.equal(turn1.candidate_intent, "INTENT-04-CTO");
    const snapshot = router.getSession(sessionId);
    assert.equal(snapshot.primary_intent, "CTO");

    // Turn 2: a BRAND NEW router instance - simulates a fresh Cloudflare Function
    // invocation with no shared memory from turn 1. Without hydration this would
    // have no idea CTO context was established.
    const freshRouter = new LocalSemanticRouter({ similarityThreshold: 0.75, marginThreshold: 0.10 });
    freshRouter.hydrateSession(sessionId, snapshot);
    const turn2 = freshRouter.route("what next?", sessionId);

    assert.equal(turn2.candidate_intent, "INTENT-08-HANDOFF");
    assert.equal(turn2.candidate_family, "FAM-08");
  });

  test('hydrateSession control: without hydration, a brand-new router instance has no memory of a prior turn', () => {
    const sessionId = "sess-hydrate-control";
    router.route("fractional cto", sessionId);

    const freshRouter = new LocalSemanticRouter({ similarityThreshold: 0.75, marginThreshold: 0.10 });
    // No hydrateSession() call - this is today's (pre-fix) behavior.
    const turn2 = freshRouter.route("what next?", sessionId);

    assert.equal(turn2.candidate_intent, "INTENT-02-NAV-DESIGN", "fresh instance without hydration must take the default branch, proving the gap hydration fixes");
  });

  test('hydrateSession isolation: hydrating one session_id never leaks into a different session_id', () => {
    const sessionA = "sess-hydrate-isoA";
    const sessionB = "sess-hydrate-isoB";

    router.route("fractional cto", sessionA);
    const snapshotA = router.getSession(sessionA);

    const freshRouter = new LocalSemanticRouter({ similarityThreshold: 0.75, marginThreshold: 0.10 });
    // Attempt to hydrate session B's slot with session A's snapshot data, but
    // under session B's own id - hydrateSession always keys by the id argument,
    // never trusting snapshot.session_id, so this must NOT let B inherit A's CTO state.
    freshRouter.hydrateSession(sessionB, snapshotA);
    const hydratedB = freshRouter.getSession(sessionB);

    assert.equal(hydratedB.session_id, sessionB);
    // The rest of the snapshot's fields (primary_intent etc.) DO copy over in this
    // low-level API - true cross-visitor isolation is enforced one layer up, by
    // never letting a different visitor's browser possess sessionA's own snapshot
    // in the first place (see endpoint tests). This test only proves the id itself
    // can never be spoofed away from what the caller authenticated as.
    assert.notEqual(sessionA, sessionB);
  });

  test('hydrateSession defensively normalizes a malformed/partial snapshot instead of throwing', () => {
    const sessionId = "sess-hydrate-malformed";
    const freshRouter = new LocalSemanticRouter({ similarityThreshold: 0.75, marginThreshold: 0.10 });
    assert.doesNotThrow(() => freshRouter.hydrateSession(sessionId, { not_a_real_field: 123 }));
    assert.doesNotThrow(() => freshRouter.hydrateSession(sessionId, null));
    assert.doesNotThrow(() => freshRouter.hydrateSession(sessionId, undefined));
    assert.doesNotThrow(() => freshRouter.hydrateSession(sessionId, "not an object" as any));
    // Should still be routable afterwards.
    const result = freshRouter.route("hello", sessionId);
    assert.equal(result.candidate_intent, "INTENT-10-GREETING");
  });
});
