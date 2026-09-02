import { VisitorSessionState } from './types';

export class SessionIsolationManager {
  private sessions: Map<string, VisitorSessionState> = new Map();

  public getOrCreateSession(sessionId: string, leadId?: string): VisitorSessionState {
    if (!sessionId || sessionId.trim().length === 0) {
      throw new Error("CRITICAL SECURITY ERROR: Session ID is required for session isolation!");
    }

    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        session_id: sessionId,
        lead_id: leadId,
        previous_states: ["NEW_VISITOR"],
        discovery_stage: "INITIAL",
        collected_context: {},
        journey_history: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.sessions.set(sessionId, session);
    }
    return session;
  }

  public updateSession(
    sessionId: string,
    updates: Partial<VisitorSessionState>
  ): VisitorSessionState {
    const session = this.getOrCreateSession(sessionId);
    
    if (updates.primary_intent && updates.primary_intent !== session.primary_intent) {
      if (session.primary_intent) {
        session.journey_history.push(session.primary_intent);
      }
      session.primary_intent = updates.primary_intent;
    }

    if (updates.original_goal && !session.original_goal) {
      session.original_goal = updates.original_goal;
    }

    if (updates.current_journey) session.current_journey = updates.current_journey;
    if (updates.discovery_stage) session.discovery_stage = updates.discovery_stage;
    if (updates.current_question_id) session.current_question_id = updates.current_question_id;
    if (updates.project_type) session.project_type = updates.project_type;
    if (updates.current_flow_id) session.current_flow_id = updates.current_flow_id;
    if (updates.current_intent_id) session.current_intent_id = updates.current_intent_id;
    if (updates.recommended_next_step) session.recommended_next_step = updates.recommended_next_step;
    if (updates.business_type) session.business_type = updates.business_type;
    if (updates.business_objective) session.business_objective = updates.business_objective;
    if (updates.commercial_sensitivity) session.commercial_sensitivity = updates.commercial_sensitivity;
    if (updates.existing_website !== undefined) session.existing_website = updates.existing_website;
    if (updates.diagnostic_uncertainty !== undefined) session.diagnostic_uncertainty = updates.diagnostic_uncertainty;
    if (updates.last_intent) session.last_intent = updates.last_intent;
    if (updates.last_response) session.last_response = updates.last_response;
    if (updates.last_action) session.last_action = updates.last_action;
    if (updates.multi_service_intents) session.multi_service_intents = updates.multi_service_intents;

    if (updates.current_page && updates.current_page !== session.current_page) {
      session.previous_page = session.current_page;
      session.current_page = updates.current_page;
    }

    if (updates.collected_context) {
      session.collected_context = {
        ...session.collected_context,
        ...updates.collected_context
      };
    }

    session.updated_at = new Date().toISOString();
    return session;
  }

  public updateSessionState(
    sessionId: string,
    newState: string,
    flowId?: string,
    intentId?: string
  ): void {
    const session = this.getOrCreateSession(sessionId);
    session.previous_states.push(newState);
    if (flowId) session.current_flow_id = flowId;
    if (intentId) session.current_intent_id = intentId;
    session.updated_at = new Date().toISOString();
  }

  public clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  /**
   * Seed this manager with a previously-returned session snapshot (round-tripped
   * by the caller, e.g. from browser localStorage) so a stateless per-request
   * environment can continue a multi-turn conversation. The snapshot's own
   * `session_id` is never trusted - the caller-provided `sessionId` is always
   * authoritative, so a client can never use this to inherit a DIFFERENT
   * session's state under its own session_id (isolation guarantee preserved).
   * Malformed/partial snapshots are defensively normalized rather than trusted.
   */
  public hydrateSession(sessionId: string, snapshot: Partial<VisitorSessionState> | null | undefined): VisitorSessionState {
    if (!sessionId || sessionId.trim().length === 0) {
      throw new Error("CRITICAL SECURITY ERROR: Session ID is required for session isolation!");
    }

    const safeSnapshot: Partial<VisitorSessionState> =
      (snapshot && typeof snapshot === 'object' && !Array.isArray(snapshot)) ? snapshot : {};

    const hydrated: VisitorSessionState = {
      ...safeSnapshot,
      session_id: sessionId,
      previous_states: Array.isArray(safeSnapshot.previous_states) ? safeSnapshot.previous_states : ["NEW_VISITOR"],
      collected_context: (safeSnapshot.collected_context && typeof safeSnapshot.collected_context === 'object')
        ? safeSnapshot.collected_context
        : {},
      journey_history: Array.isArray(safeSnapshot.journey_history) ? safeSnapshot.journey_history : [],
      created_at: typeof safeSnapshot.created_at === 'string' ? safeSnapshot.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.sessions.set(sessionId, hydrated);
    return hydrated;
  }

  public getActiveSessionCount(): number {
    return this.sessions.size;
  }
}
