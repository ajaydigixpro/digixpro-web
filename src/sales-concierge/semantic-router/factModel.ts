import { VisitorSessionState } from './types';
import { FactKey, readFact } from './informationGap';
import { isConversionBottleneckProfile } from './workingMemory';

// PHASE 18 PART 10: FACT / ASSUMPTION / INFERENCE SEPARATION
//
// informationGap.ts's readFact() already distinguishes known/unknown/
// declined; this module adds the missing SOURCE dimension on top, without
// changing how or where facts are stored. Every FactKey the engine reads is
// either directly visitor-stated (FACT) or system-derived from other facts
// (INFERENCE) - never both, and never silently promoted from one to the
// other. This is metadata over the EXISTING collected_context/session
// fields, not a parallel store.

export type FactSource = 'FACT' | 'INFERENCE' | 'UNKNOWN';

export interface FactEntry {
  key: FactKey | 'conversion_bottleneck';
  value: unknown;
  source: FactSource;
  status: 'ACTIVE' | 'UNKNOWN';
}

// Every FactKey informationGap.ts reads is directly visitor-stated (traffic,
// existing site, product count, etc.) or read from a visitor's own explicit
// correction (diagnostic_uncertainty). None of the 8 registered fact keys
// are themselves derived - so the source is FACT whenever known. The one
// INFERENCE this system currently derives is conversion_bottleneck (below),
// which is NOT a FactKey - it is a system judgment built FROM facts, kept
// deliberately distinct so it can never be reported as something the
// visitor said.
const DIRECT_FACT_KEYS: FactKey[] = [
  'traffic_health',
  'enquiry_health',
  'existing_website',
  'technical_constraint',
  'problem_clarity',
  'product_count',
  'marketplace_requirement',
  'project_scope'
];

/** Lists every currently-known fact for a session, tagged with its source - never an inference reported as a fact. */
export function listActiveFacts(session: VisitorSessionState | undefined): FactEntry[] {
  const entries: FactEntry[] = [];
  for (const key of DIRECT_FACT_KEYS) {
    const read = readFact(session, key);
    entries.push({
      key,
      value: read.known ? read.value : undefined,
      source: 'FACT',
      status: read.known ? 'ACTIVE' : 'UNKNOWN'
    });
  }

  // The one system-derived judgment currently in the engine - explicitly
  // tagged INFERENCE, never conflated with a visitor-stated fact (Part 10's
  // core requirement: "never allow an inference to silently become a fact").
  entries.push({
    key: 'conversion_bottleneck',
    value: isConversionBottleneckProfile(session),
    source: 'INFERENCE',
    status: isConversionBottleneckProfile(session) ? 'ACTIVE' : 'UNKNOWN'
  });

  return entries;
}

/** True only for a fact whose source is a direct visitor statement - never true for an inference, even a confident one. */
export function isExplicitFact(session: VisitorSessionState | undefined, key: FactKey): boolean {
  return readFact(session, key).known;
}
