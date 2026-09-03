// PHASE 9 RESTORATION: deterministic lexical/fuzzy prototype data for the existing
// Layer 2/3 fallback matcher in router.ts (see lexicalOverlapScore in provider.ts).
//
// Source of truth: docs/sales-concierge/intent-packs/
//   DigiXPro-Sales-Concierge-Frozen-Intent-Pack-Registry-v1.0.json
// (registry_version v1.0, status "FROZEN", approved_by "Founder"). Each entry below is
// derived directly from that document's `positive_signals` field for the corresponding
// intent_id - no invented phrasing, no new intent, no embedding model.
//
// Historically router.ts accepted a VectorPrototype[] via loadPrototypes(), but nothing
// in the production endpoint ever called it - this fallback layer scored everything at
// 0 and always fell through to clarification. This file reconnects that existing,
// already-tested layer with real, previously-approved data instead of leaving it dead.
//
// Deliberately EXCLUDED from this restoration (see Phase 9 report for rationale):
//   - INTENT-09-OBJECTION: an earlier phase this project explicitly decided not to port
//     n8n's old objection-handling regex logic into this repository's router; adding a
//     fuzzy prototype for it here would reintroduce the same behavior through a
//     different door. Left unmatched -> falls through to clarification, as it does today.
//   - INTENT-11-MULTI: its "positive_signals" in the frozen registry are compound
//     multi-keyword conditions ("seo AND website AND pricing"), not natural single
//     phrases - not safe input for single-phrase lexical scoring without inventing new
//     matching logic.
//
// Every intent_id/family_id used below already has a defined response in tour-matrix.ts
// (verified by direct grep before this file was written) - this only feeds the existing
// scoring layer, it does not add any new intent or response.

import { tokenize } from './provider';
import { VectorPrototype } from './types';

interface FrozenSignalGroup {
  intent_id: string;
  family_id: string;
  phase2_flow_id: string;
  signals: string[];
}

// One row per frozen intent; `signals` is that intent's `positive_signals` field
// (comma-separated in the source document) split into individual phrases.
const FROZEN_SIGNAL_GROUPS: FrozenSignalGroup[] = [
  {
    intent_id: 'INTENT-01-SEO', family_id: 'FAM-01', phase2_flow_id: 'FLOW-06',
    signals: ['seo', 'technical seo', 'local seo', 'google visibility', 'ai search', 'geo', 'aio', 'indexing', 'schema', 'organic traffic']
  },
  {
    intent_id: 'INTENT-02-WEB', family_id: 'FAM-02', phase2_flow_id: 'FLOW-06',
    signals: ['redesign', 'rebuild', 'new website', 'custom website', 'website banani', 'website banwani', 'wordpress website']
  },
  {
    intent_id: 'INTENT-03-AUTO', family_id: 'FAM-03', phase2_flow_id: 'FLOW-06',
    signals: ['automation', 'n8n', 'crm', 'workflow', 'api integration', 'lead automation', 'process automation', 'webhook']
  },
  {
    intent_id: 'INTENT-04-CTO', family_id: 'FAM-04', phase2_flow_id: 'FLOW-06',
    signals: ['advisory', 'fractional cto', 'tech stack', 'due diligence', 'consulting', 'roadmap', 'vendor evaluation']
  },
  {
    intent_id: 'INTENT-05-PRICE', family_id: 'FAM-05', phase2_flow_id: 'FLOW-06',
    signals: ['aapki fee kitni hai', 'pricing kitni hai', 'how much cost', 'retainer per month', 'rates']
  },
  {
    intent_id: 'INTENT-06-AUDIT-INTAKE', family_id: 'FAM-06', phase2_flow_id: 'FLOW-04',
    signals: ['audit karwana hai', 'check my site', 'website speed audit', 'technical audit', 'systems review']
  },
  {
    intent_id: 'INTENT-06-AUDIT-INFO', family_id: 'FAM-06', phase2_flow_id: 'FLOW-02',
    signals: ['audit kya hota hai', 'what is included in audit', 'why run an audit']
  },
  {
    intent_id: 'INTENT-07-EVIDENCE', family_id: 'FAM-07', phase2_flow_id: 'FLOW-03',
    signals: ['work', 'portfolio', 'evidence', 'case study', 'design work', 'examples', 'sample', 'projects', 'proof']
  },
  {
    intent_id: 'INTENT-08-BOOKING', family_id: 'FAM-08', phase2_flow_id: 'FLOW-05',
    signals: ['book call', 'schedule call', '30 min consultation', 'meeting', 'book time with founder']
  },
  {
    intent_id: 'INTENT-08-HANDOFF', family_id: 'FAM-08', phase2_flow_id: 'FLOW-05',
    signals: ['speak to someone', 'talk to human', 'human agent', 'contact person', 'founder contact']
  },
  {
    intent_id: 'INTENT-10-GREETING', family_id: 'FAM-10', phase2_flow_id: 'FLOW-01',
    signals: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening']
  },
  {
    intent_id: 'INTENT-12-VALUEPROP', family_id: 'FAM-12', phase2_flow_id: 'FLOW-02',
    signals: ['services', 'what services', 'what do you do', 'it consulting services', 'business automation agency']
  }
];

function buildPrototypes(): VectorPrototype[] {
  const prototypes: VectorPrototype[] = [];
  for (const group of FROZEN_SIGNAL_GROUPS) {
    group.signals.forEach((signal, index) => {
      const normalized = signal.trim().toLowerCase();
      prototypes.push({
        prototype_id: `FROZEN-${group.intent_id}-${index + 1}`,
        original_text: signal,
        normalized_text: normalized,
        family_id: group.family_id,
        intent_id: group.intent_id,
        phase2_flow_id: group.phase2_flow_id,
        evidence_type: 'FROZEN_INTENT_PACK_REGISTRY_V1.0',
        real_vs_synthetic: 'real',
        language: /[a-z]/i.test(normalized) && /\b(hai|kya|kitni|karwana)\b/i.test(normalized) ? 'hinglish' : 'en',
        wordSet: tokenize(normalized)
      });
    });
  }
  return prototypes;
}

export const FROZEN_PROTOTYPES: VectorPrototype[] = buildPrototypes();
