import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../index';

function makeContext(init: {
  method?: string;
  body?: string;
  contentType?: string | null;
}) {
  const headers: Record<string, string> = {};
  if (init.contentType !== null) {
    headers['content-type'] = init.contentType ?? 'application/json';
  }
  const request = new Request('https://digixpro.in/api/sales-concierge', {
    method: init.method ?? 'POST',
    headers,
    body: init.body
  });
  return { request };
}

async function readJson(res: Response): Promise<any> {
  return JSON.parse(await res.text());
}

describe('Sales Concierge routing endpoint - functions/api/sales-concierge/index.ts (serves /api/sales-concierge)', () => {
  test('valid request returns a deterministic routing result with retrieved_context', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-endpoint-001' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 200);
    const body = await readJson(res);
    assert.equal(body.success, true);
    assert.equal(body.result.candidate_intent, 'INTENT-10-GREETING');
    assert.ok(body.result.retrieved_context, 'response should include retrieved_context');
    assert.ok(Array.isArray(body.result.retrieved_context.activeUrls));
  });

  test('response shape matches what SalesConcierge.tsx actually requires (data.success && data.text, plus data.tour_step)', async () => {
    // SalesConcierge.tsx: `if (data.success && data.text) { ... tourStep = data.tour_step ... }`
    // If either field is missing, the frontend silently falls back to a generic
    // error message regardless of what the router actually determined.
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-endpoint-shape-001' }) });
    const res = await onRequest(ctx);
    const body = await readJson(res);

    assert.equal(typeof body.text, 'string', 'data.text must be a non-empty string for the frontend to render a reply');
    assert.ok(body.text.length > 0);
    assert.equal(body.session_id, 'sess-endpoint-shape-001');

    assert.ok(body.tour_step, 'data.tour_step must be present');
    assert.equal(typeof body.tour_step.headline_message, 'string');
    assert.ok(body.tour_step.canonical_destination, 'tour_step.canonical_destination is required by TourStepInfo');
    assert.ok(Array.isArray(body.tour_step.tour_actions), 'tour_step.tour_actions is required by TourStepInfo');
  });

  test('current_page is optional and accepted when provided', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-endpoint-002', current_page: '/audit' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 200);
    const body = await readJson(res);
    assert.equal(body.result.current_page, '/audit');
  });

  test('rejects non-POST methods with 405 and no internal detail', async () => {
    const ctx = makeContext({ method: 'GET', body: undefined });
    const res = await onRequest(ctx);
    assert.equal(res.status, 405);
    const body = await readJson(res);
    assert.equal(body.success, false);
    assert.equal('stack' in body, false);
  });

  test('rejects a non-JSON content-type', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hi', session_id: 's1' }), contentType: 'text/plain' });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects an empty body', async () => {
    const ctx = makeContext({ body: '' });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects malformed JSON without leaking parser internals', async () => {
    const ctx = makeContext({ body: '{not valid json' });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
    const body = await readJson(res);
    assert.equal(body.success, false);
    assert.ok(!body.error.toLowerCase().includes('syntaxerror'), 'should not leak raw parser error text');
  });

  test('rejects a JSON body that is an array, not an object', async () => {
    const ctx = makeContext({ body: JSON.stringify(['not', 'an', 'object']) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects missing message field', async () => {
    const ctx = makeContext({ body: JSON.stringify({ session_id: 'sess-endpoint-003' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects empty/whitespace-only message', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: '   ', session_id: 'sess-endpoint-004' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects an oversized message', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'a'.repeat(3000), session_id: 'sess-endpoint-005' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 413);
  });

  test('rejects an oversized request body outright', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'a'.repeat(9000), session_id: 'sess-endpoint-006' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 413);
  });

  test('rejects missing session_id field', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects empty/whitespace-only session_id', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: '   ' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects a non-string session_id', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 12345 }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('rejects a non-string current_page', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-endpoint-007', current_page: 42 }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('session isolation: two different session_ids in separate requests never leak state into each other', async () => {
    const ctxA = makeContext({ body: JSON.stringify({ message: 'fractional cto', session_id: 'sess-endpoint-isoA' }) });
    const resA = await onRequest(ctxA);
    const bodyA = await readJson(resA);
    assert.equal(bodyA.result.candidate_intent, 'INTENT-04-CTO');

    const ctxB = makeContext({ body: JSON.stringify({ message: 'what next?', session_id: 'sess-endpoint-isoB' }) });
    const resB = await onRequest(ctxB);
    const bodyB = await readJson(resB);
    // sess-endpoint-isoB has no prior CTO state (each request gets a fresh router
    // instance in this phase), so it must take the default branch, not the
    // CTO-specific handoff branch that sess-endpoint-isoA's topic might suggest.
    assert.equal(bodyB.result.candidate_intent, 'INTENT-02-NAV-DESIGN');
  });

  test('error responses never include a stack trace field', async () => {
    const ctx = makeContext({ body: '{bad' });
    const res = await onRequest(ctx);
    const body = await readJson(res);
    assert.equal('stack' in body, false);
    assert.equal('trace' in body, false);
  });

  // --- Session continuity (Phase 5) ---

  test('rejects a non-object session_state (e.g. an array or string)', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-state-bad', session_state: ['not', 'an', 'object'] }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 400);
  });

  test('accepts a request with no session_state at all (first-ever turn)', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-state-none' }) });
    const res = await onRequest(ctx);
    assert.equal(res.status, 200);
    const body = await readJson(res);
    assert.ok(body.session_state, 'a fresh session_state must still be returned for the caller to store');
    assert.equal(body.session_state.session_id, 'sess-state-none');
  });

  test('real multi-turn round trip: turn 2 receives turn 1 context via the session_state the endpoint itself returned', async () => {
    // Turn 1: establishes CTO context. Exactly mirrors what a real browser does:
    // no session_state sent yet (first message of a new conversation).
    const ctx1 = makeContext({ body: JSON.stringify({ message: 'fractional cto', session_id: 'sess-multiturn-endpoint' }) });
    const res1 = await onRequest(ctx1);
    const body1 = await readJson(res1);
    assert.equal(body1.result.candidate_intent, 'INTENT-04-CTO');
    assert.equal(body1.session_state.primary_intent, 'CTO');

    // Turn 2: the browser resends the session_state it received from turn 1,
    // exactly as SalesConcierge.tsx now does via getStoredSessionState().
    const ctx2 = makeContext({ body: JSON.stringify({
      message: 'what next?',
      session_id: 'sess-multiturn-endpoint',
      session_state: body1.session_state
    }) });
    const res2 = await onRequest(ctx2);
    const body2 = await readJson(res2);

    assert.equal(body2.result.candidate_intent, 'INTENT-08-HANDOFF', 'turn 2 must reflect turn 1\'s CTO context, not the default branch');
    assert.equal(body2.result.candidate_family, 'FAM-08');
    assert.equal(typeof body2.text, 'string');
    assert.ok(body2.text.length > 0);
  });

  test('topic-switch multi-turn: SEO context established, then an unrelated web question correctly switches topic rather than getting stuck', async () => {
    const ctx1 = makeContext({ body: JSON.stringify({ message: 'I need SEO help', session_id: 'sess-topicswitch-endpoint' }) });
    const res1 = await onRequest(ctx1);
    const body1 = await readJson(res1);
    assert.equal(body1.result.candidate_intent, 'INTENT-01-SEO');

    const ctx2 = makeContext({ body: JSON.stringify({
      message: 'actually, I need a website.',
      session_id: 'sess-topicswitch-endpoint',
      session_state: body1.session_state
    }) });
    const res2 = await onRequest(ctx2);
    const body2 = await readJson(res2);

    assert.equal(body2.result.candidate_intent, 'INTENT-02-WEB');
    assert.equal(typeof body2.text, 'string');
    assert.ok(body2.text.length > 0);
  });

  test('cross-session isolation with session_state: sending session A\'s state under session B\'s id never lets B inherit A\'s context', async () => {
    const ctxA = makeContext({ body: JSON.stringify({ message: 'fractional cto', session_id: 'sess-endpoint-hydrate-isoA' }) });
    const resA = await onRequest(ctxA);
    const bodyA = await readJson(resA);
    assert.equal(bodyA.result.candidate_intent, 'INTENT-04-CTO');

    // Buggy/malicious client: sends A's session_state but under B's own session_id.
    const ctxB = makeContext({ body: JSON.stringify({
      message: 'what next?',
      session_id: 'sess-endpoint-hydrate-isoB',
      session_state: bodyA.session_state
    }) });
    const resB = await onRequest(ctxB);
    const bodyB = await readJson(resB);

    assert.equal(bodyB.session_state.session_id, 'sess-endpoint-hydrate-isoB', 'the server-validated session_id must always win, never the snapshot\'s own id');
  });

  test('session_state field never contains secrets, credentials, or unrelated internal server data', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'hello', session_id: 'sess-state-safety' }) });
    const res = await onRequest(ctx);
    const body = await readJson(res);
    const serialized = JSON.stringify(body.session_state).toLowerCase();
    for (const forbidden of ['token', 'secret', 'password', 'api_key', 'apikey', 'credential']) {
      assert.ok(!serialized.includes(forbidden), `session_state must not contain "${forbidden}"`);
    }
  });

  // --- Phase 7: e-commerce pricing misroute & Diagnostic Audit loop fixes (full endpoint round trip) ---

  test('Phase 7: real multi-turn round trip - new website -> ecommerce -> pricing question acknowledges the e-commerce context and reaches the Audit action, not a clarify loop', async () => {
    const sessionId = 'sess-p7-endpoint-flow';

    const r1 = await onRequest(makeContext({ body: JSON.stringify({ message: 'Build a new website', session_id: sessionId }) }));
    const b1 = await readJson(r1);

    const r2 = await onRequest(makeContext({ body: JSON.stringify({ message: 'E-commerce / Marketplace', session_id: sessionId, session_state: b1.session_state }) }));
    const b2 = await readJson(r2);
    assert.equal(b2.result.candidate_intent, 'INTENT-07-EVIDENCE-REDESIGN');

    const r3 = await onRequest(makeContext({ body: JSON.stringify({ message: 'Can you tell me price?', session_id: sessionId, session_state: b2.session_state }) }));
    const b3 = await readJson(r3);
    assert.equal(b3.result.candidate_intent, 'INTENT-05-PRICE');
    assert.ok(b3.text.toLowerCase().includes('e-commerce'), 'pricing response must explicitly acknowledge the e-commerce project context');
    assert.equal(b3.tour_step.audit_recommendation.url, '/audit');

    const r4 = await onRequest(makeContext({ body: JSON.stringify({ message: 'Diagnostic Audit', session_id: sessionId, session_state: b3.session_state }) }));
    const b4 = await readJson(r4);
    assert.equal(b4.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.notEqual(b4.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY', 'must not loop back into the generic three-choice clarify menu');
    assert.equal(b4.tour_step.audit_recommendation.url, '/audit');

    const r5 = await onRequest(makeContext({ body: JSON.stringify({ message: 'I have already seen the case study. I want to know the budget.', session_id: sessionId, session_state: b4.session_state }) }));
    const b5 = await readJson(r5);
    assert.equal(b5.result.candidate_intent, 'INTENT-05-PRICE');
    assert.notEqual(b5.result.candidate_intent, 'INTENT-07-EVIDENCE-REDESIGN', 'must not revert to the case-study recommendation after the visitor explicitly moved on');
  });

  // --- Phase 9: restored fuzzy-fallback prototypes reachable through the real endpoint ---

  test('Phase 9: a paraphrase not covered by any Tier-0 rule ("google visibility") now gets a real, on-topic response instead of a generic clarify fallback', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'google visibility', session_id: 'sess-p9-endpoint-seo' }) });
    const res = await onRequest(ctx);
    const body = await readJson(res);
    assert.equal(res.status, 200);
    assert.equal(body.result.candidate_intent, 'INTENT-01-SEO');
    assert.equal(body.result.tier0_match, false, 'must be resolved by the restored fuzzy layer, not a Tier-0 regex');
    assert.equal(typeof body.text, 'string');
    assert.ok(body.text.length > 0);
  });

  // --- Diagnostic Audit CTA contract: the exact data the frontend needs to render a real /audit link ---

  test('the "Diagnostic Audit" chip produces a real START_AUDIT tour_action with url "/audit" - the frontend contract the reported navigation bug depends on', async () => {
    const ctx = makeContext({ body: JSON.stringify({ message: 'Diagnostic Audit', session_id: 'sess-audit-cta-contract' }) });
    const res = await onRequest(ctx);
    const body = await readJson(res);
    assert.equal(res.status, 200);
    assert.equal(body.result.candidate_intent, 'INTENT-06-AUDIT-INTAKE');
    assert.notEqual(body.result.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY', 'must not loop back into the generic clarify menu instead of producing a navigable action');
    const startAudit = (body.tour_step.tour_actions || []).find((a: any) => a.action_type === 'START_AUDIT');
    assert.ok(startAudit, 'tour_actions must contain a START_AUDIT entry');
    assert.equal(startAudit.url, '/audit');
  });
});
