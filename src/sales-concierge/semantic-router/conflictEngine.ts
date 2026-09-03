import { VisitorSessionState } from './types';

// PHASE 18 PART 9: GENERAL CONFLICT ENGINE
//
// Phases 16/17 already detect and resolve specific conflicts inline (traffic
// contradiction in precedence.ts, requirement supersession in
// decisionEngine.ts, assumption challenge in workingMemory.ts) - each of
// those mechanisms is REUSED here, not rebuilt. This module's job is only to
// give those already-happening events a single, structured, inspectable
// shape, so a caller (WHY, response strategy, a future report) can ask
// "what conflicts are currently active?" instead of re-deriving the answer
// from raw collected_context keys each time.

export type ConflictType =
  | 'GOAL_CONFLICT'
  | 'REQUIREMENT_CONFLICT'
  | 'ASSUMPTION_CONFLICT'
  | 'SCOPE_CONFLICT'
  | 'CONSTRAINT_CONFLICT'
  | 'TIMELINE_CONFLICT'
  | 'PREFERENCE_CONFLICT'
  | 'FACT_CONFLICT';

export interface Conflict {
  type: ConflictType;
  subject: string;
  previousValue: unknown;
  currentValue: unknown;
  status: 'ACTIVE' | 'RESOLVED' | 'SUPERSEDED';
  materiality: 'HIGH' | 'MEDIUM' | 'LOW';
  affectsDecision: boolean;
}

/**
 * Reads the SAME session fields every prior phase's supersession logic
 * already writes (Phase 16's traffic_previously_healthy, Phase 14/17's
 * future_<key> pending/superseded, Phase 15's assumption_challenge_target)
 * and surfaces them as a structured, typed list. No new persisted state.
 */
export function detectConflicts(session: VisitorSessionState | undefined): Conflict[] {
  if (!session) return [];
  const conflicts: Conflict[] = [];

  // FACT_CONFLICT: a previously-healthy traffic fact was superseded by a
  // decline statement (precedence.ts's INTENT-TRAFFIC-DECLINE-UPDATE rule).
  if (session.collected_context?.traffic_previously_healthy === 'true') {
    conflicts.push({
      type: 'FACT_CONFLICT',
      subject: 'traffic_health',
      previousValue: 'healthy',
      currentValue: session.collected_context?.traffic === 'declined' ? 'weak' : session.collected_context?.traffic,
      status: 'RESOLVED', // the fact itself is already updated - the conflict was resolved by the update, not left dangling
      materiality: 'HIGH',
      affectsDecision: true
    });
  }

  // REQUIREMENT_CONFLICT: a future requirement was explicitly superseded
  // (decisionEngine.ts's detectSupersessionStatement / supersedeFutureRequirement).
  for (const [key, value] of Object.entries(session.collected_context || {})) {
    if (key.startsWith('future_') && value === 'superseded') {
      conflicts.push({
        type: 'REQUIREMENT_CONFLICT',
        subject: key.replace('future_', ''),
        previousValue: 'pending',
        currentValue: 'superseded',
        status: 'SUPERSEDED',
        materiality: 'MEDIUM',
        affectsDecision: false
      });
    }
  }

  // ASSUMPTION_CONFLICT: the visitor restated an assumption that was
  // already challenged (workingMemory.ts's resolveRecentChallenge, recorded
  // by precedence.ts's assumption-follow-up rule).
  if (session.collected_context?.assumption_challenge_target) {
    conflicts.push({
      type: 'ASSUMPTION_CONFLICT',
      subject: session.collected_context.assumption_challenge_target,
      previousValue: 'visitor assumption',
      currentValue: 'challenged by established evidence',
      status: 'ACTIVE',
      materiality: 'HIGH',
      affectsDecision: true
    });
  }

  return conflicts;
}

/** Whether any currently-active (not resolved/superseded) conflict affects the given decision's reasoning. */
export function hasActiveConflict(session: VisitorSessionState | undefined, subject?: string): boolean {
  return detectConflicts(session).some((c) => c.status === 'ACTIVE' && c.affectsDecision && (!subject || c.subject === subject));
}
