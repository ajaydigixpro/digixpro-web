// Cloudflare Pages Function. File-based routing: functions/api/sales-concierge/index.ts
// serves the production path /api/sales-concierge - the exact URL SalesConcierge.tsx
// already calls (API_ENDPOINT = "/api/sales-concierge"). This lives outside the Next.js
// static export (out/) entirely; Cloudflare Pages deploys everything under functions/
// as Workers alongside the static build, independent of `next.config.ts`'s
// `output: "export"`. See functions/api/visual-engine/render.ts for the proven-working
// precedent of this same deployment mechanism.
import { LocalSemanticRouter } from '../../../src/sales-concierge/semantic-router/router';
import { GuidedTourEngine } from '../../../src/sales-concierge/tour-matrix';
import { FROZEN_PROTOTYPES } from '../../../src/sales-concierge/semantic-router/prototypes';

// Hard limits - defensive against abusive/malformed payloads before they ever
// reach the router. Deliberately conservative for a chat-message endpoint.
// Bumped from 8KB to accommodate the round-tripped session_state snapshot
// (Phase 5) - still small, since VisitorSessionState is plain short fields.
const MAX_BODY_BYTES = 16 * 1024; // 16KB
const MAX_MESSAGE_LENGTH = 2000;
const MAX_SESSION_ID_LENGTH = 200;
const MAX_CURRENT_PAGE_LENGTH = 500;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function errorResponse(status: number, message: string): Response {
  // Deliberately safe: fixed, non-leaking message only. No stack traces, no
  // internal error detail, no credentials or environment information.
  return jsonResponse({ success: false, error: message }, status);
}

async function handlePost(context: any): Promise<Response> {
  try {
    const request: Request = context.request;

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return errorResponse(400, 'Content-Type must be application/json.');
    }

    const rawBody = await request.text();
    if (rawBody.length === 0) {
      return errorResponse(400, 'Request body is required.');
    }
    if (rawBody.length > MAX_BODY_BYTES) {
      return errorResponse(413, 'Request body too large.');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return errorResponse(400, 'Malformed JSON body.');
    }

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return errorResponse(400, 'Request body must be a JSON object.');
    }

    const { message, session_id, current_page, session_state } = parsed;

    if (typeof message !== 'string' || message.trim().length === 0) {
      return errorResponse(400, 'Field "message" is required and must be a non-empty string.');
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return errorResponse(413, `Field "message" exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.`);
    }

    if (typeof session_id !== 'string' || session_id.trim().length === 0) {
      return errorResponse(400, 'Field "session_id" is required and must be a non-empty string.');
    }
    if (session_id.length > MAX_SESSION_ID_LENGTH) {
      return errorResponse(400, 'Field "session_id" exceeds maximum allowed length.');
    }

    let currentPage: string | undefined;
    if (current_page !== undefined && current_page !== null) {
      if (typeof current_page !== 'string') {
        return errorResponse(400, 'Field "current_page", if provided, must be a string.');
      }
      if (current_page.length > MAX_CURRENT_PAGE_LENGTH) {
        return errorResponse(400, 'Field "current_page" exceeds maximum allowed length.');
      }
      currentPage = current_page;
    }

    // session_state (Phase 5): an optional round-tripped snapshot of this SAME
    // session_id's prior VisitorSessionState, as returned by a previous call to
    // this endpoint and stored client-side (browser localStorage). This is how
    // multi-turn continuity is achieved WITHOUT any server-side session store -
    // no KV, no Durable Objects, no database. Only accepted as a plain object;
    // anything else is ignored rather than rejected, so a missing/corrupt
    // snapshot degrades to a fresh session instead of failing the request.
    let sessionStateSnapshot: unknown;
    if (session_state !== undefined && session_state !== null) {
      if (typeof session_state !== 'object' || Array.isArray(session_state)) {
        return errorResponse(400, 'Field "session_state", if provided, must be a JSON object.');
      }
      sessionStateSnapshot = session_state;
    }

    // A fresh router (and therefore a fresh in-memory session map) is created per
    // request, matching how this Function actually runs. If a session_state
    // snapshot was supplied, it is hydrated into THIS router instance under the
    // caller's own session_id BEFORE routing - hydrateSession() always keys by
    // the validated session_id above, never by anything inside the snapshot, so
    // one visitor can never inherit another visitor's session state.
    const router = new LocalSemanticRouter();
    // PHASE 9 RESTORATION: reconnects the existing (previously dead) deterministic
    // lexical/fuzzy fallback layer with founder-approved historical intent data. Only
    // used when Tier-0 precedence.ts finds no match - see prototypes.ts for provenance
    // and exclusions.
    router.loadPrototypes(FROZEN_PROTOTYPES);
    if (sessionStateSnapshot !== undefined) {
      router.hydrateSession(session_id, sessionStateSnapshot);
    }
    const result = router.route(message, session_id, undefined, currentPage);
    const session = router.getSession(session_id);

    // The existing frontend (SalesConcierge.tsx) expects a natural-language
    // "text" reply and a "tour_step" object shaped like GuidedTourResponse - it
    // does not render the raw RoutingResult. GuidedTourEngine is the existing,
    // already-tested response/guided-tour layer (src/sales-concierge/tour-matrix.ts)
    // that produces exactly that shape from deterministic, pre-authored content -
    // no model, no generation. This mirrors what the (non-deployable, static-export-
    // incompatible) legacy src/app/api/sales-concierge/route.ts already did.
    const tourEngine = new GuidedTourEngine();
    const tourStep = tourEngine.resolveTourStep(result, session);

    const text = tourStep.targeted_question
      ? `${tourStep.headline_message}\n\n${tourStep.targeted_question}`
      : tourStep.headline_message;

    return jsonResponse({
      success: true,
      text,
      session_id,
      result,
      tour_step: tourStep,
      // Returned so the caller can store and resend it on the next turn
      // (Phase 5 round-trip). Contains only conversational routing state
      // (intent/context/journey fields) - no secrets, no credentials, no
      // server-internal data.
      session_state: session
    }, 200);
  } catch {
    // Never leak internal error detail (message, stack, env) to the client.
    return errorResponse(500, 'Internal error while routing the request.');
  }
}

export const onRequest = async (context: any) => {
  const method: string = context.request.method;
  if (method === 'POST') return handlePost(context);
  return errorResponse(405, 'Method not allowed. Use POST.');
};
