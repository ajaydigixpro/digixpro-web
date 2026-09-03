import { VisitorSessionState } from './types';

// PHASE 14/15: DECISION INTELLIGENCE ENGINE
//
// Small, reusable, deterministic mechanisms layered on top of workingMemory.ts
// and the existing collected_context bag - not a parallel state system. Every
// function here reads/writes the SAME session fields Phases 10-13 already use
// (collected_context, primary_intent, industry, business_type), so a fix made
// here is immediately visible to every existing rule that already reads them.
//
// PHASE 15 CHANGE: the original Phase 14 version restricted future/superseded
// requirements to a closed 5-word list (ecommerce/marketplace/automation/
// seo/cto). Real-conversation testing found this breaks on any other noun
// ("an app later", "a mobile version eventually") - exactly the kind of
// brittleness Phase 15 exists to remove. The functions below now extract an
// OPEN, free-text subject via structural pattern (the phrase between the
// trigger word and "later"/"eventually"/etc.), so a requirement type never
// explicitly enumerated still gets tracked/superseded correctly. The five
// known service words remain recognized first (for exact backward
// compatibility with existing pricing/industry side effects), then any other
// short noun phrase is accepted generically.

const KNOWN_REQUIREMENT_KEYS = ['ecommerce', 'marketplace', 'automation', 'seo', 'cto'] as const;
export type KnownRequirementKey = (typeof KNOWN_REQUIREMENT_KEYS)[number];

/** Normalizes a free-text requirement phrase into a stable, reusable key. */
function normalizeRequirementKey(phrase: string): string {
  return phrase
    .trim()
    .toLowerCase()
    .replace(/^(an?|the)\s+/, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 40);
}

function futureFlagKey(key: string): string {
  return `future_${key}`;
}

// Words too generic to stand alone as a requirement subject - prevents
// "for now" or "right now" being misparsed as a requirement called "now".
const STOP_SUBJECTS = new Set(['it', 'that', 'this', 'now', 'later', 'them', 'those', 'maybe', 'perhaps', 'possibly']);

/**
 * Detects a STATEMENT (not a question) that defers a requirement to later -
 * "and maybe ecommerce later", "an app eventually", "a mobile version down
 * the line" - and returns a normalized key for whatever requirement it
 * refers to, open-vocabulary (not restricted to a fixed list). Returns null
 * if the message isn't this shape. A real QUESTION about the future ("can
 * marketplace be added later?") is deliberately left to the existing
 * Phase 10 INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION rule.
 */
export function detectFutureRequirementStatement(norm: string): string | null {
  if (/\?\s*$/.test(norm.trim())) return null; // a question, not a statement

  // Known service words first, for exact backward compatibility with the
  // ecommerce/marketplace industry side-effects other rules already depend on.
  if (/\b(later|eventually|down the (line|road)|maybe .* later|in future|not (right )?now|for now)\b/i.test(norm)) {
    for (const key of KNOWN_REQUIREMENT_KEYS) {
      if (new RegExp(`\\b${key}\\b`, 'i').test(norm)) return key;
    }
  }

  // Open-vocabulary structural capture: "maybe (a|an|the)? <1-4 words> later"
  // or "<1-4 words> later/eventually/down the line" - the SAME mechanism
  // that already worked for the known words, just without the closed list.
  const patterns = [
    /\bmaybe (?:an?|the)?\s*([a-z][a-z\s]{1,30}?)\s+(?:later|eventually)\b/i,
    /\b(?:and |also )?(?:an?|the)?\s*([a-z][a-z\s]{1,30}?)\s+(?:later|eventually|down the line|down the road)\b/i
  ];
  for (const pattern of patterns) {
    const match = norm.match(pattern);
    if (match) {
      const subject = match[1].trim();
      const words = subject.split(/\s+/);
      if (words.length > 0 && words.length <= 4 && !STOP_SUBJECTS.has(words[words.length - 1])) {
        return normalizeRequirementKey(subject);
      }
    }
  }
  return null;
}

/**
 * Records a requirement as deferred to later, without committing to it now.
 * PHASE 17: also undoes the industry/business_type side effect the generic
 * ecommerce/marketplace keyword rule in precedence.ts sets unconditionally
 * whenever those words appear ANYWHERE in the message - including a
 * deferred mention like "and maybe ecommerce later". Without this, a
 * dormant future requirement silently became the active project context for
 * every later pricing/timeline/recommendation response (found via Phase
 * 17's own real-conversation testing - the exact "future ≠ current, must
 * not hijack" violation Part 2.B/Part 8 exist to prevent), even though the
 * routing layer correctly identified it as deferred.
 */
export function recordFutureRequirement(session: VisitorSessionState | undefined, key: string): void {
  if (!session) return;
  session.collected_context = { ...session.collected_context, [futureFlagKey(key)]: 'pending' };
  if (key === 'ecommerce' || key === 'marketplace') {
    if (session.industry === 'ecommerce') session.industry = undefined;
    if (session.business_type === 'ecommerce') session.business_type = undefined;
  }
}

/**
 * Detects an explicit retraction of a previously-mentioned requirement -
 * "actually forget ecommerce", "never mind the marketplace", "forget the
 * app for now" - open-vocabulary, matching whatever subject follows the
 * retraction verb rather than a fixed list.
 */
export function detectSupersessionStatement(norm: string): string | null {
  const match = norm.match(/\b(?:forget|never mind|nevermind|skip|drop|scratch|ignore)\s+(?:about\s+)?(?:the\s+|an?\s+)?([a-z][a-z\s]{1,30}?)(?:\s+(?:for now|now|please))?\s*$/i)
    || norm.match(/\b(?:forget|never mind|nevermind|skip|drop|scratch|ignore)\s+(?:about\s+)?(?:the\s+|an?\s+)?([a-z][a-z\s]{1,30}?)\b/i);
  if (!match) return null;
  const subject = match[1].trim();
  const words = subject.split(/\s+/);
  if (words.length === 0 || words.length > 4) return null;
  if (STOP_SUBJECTS.has(words[words.length - 1])) return null;
  return normalizeRequirementKey(subject);
}

/** Marks a previously-recorded future requirement as superseded (not deleted - see Phase 13 recency guidance). */
export function supersedeFutureRequirement(session: VisitorSessionState | undefined, key: string): void {
  if (!session) return;
  session.collected_context = { ...session.collected_context, [futureFlagKey(key)]: 'superseded' };
  // Clear the entity fields a matching keyword rule elsewhere may have set,
  // so a later turn (e.g. a pricing question) does not keep treating the
  // superseded requirement as the active project type - the concrete bug
  // Phase 14 found: "forget ecommerce" left session.industry='ecommerce' in
  // place, so the next pricing answer still talked about "your new
  // e-commerce/marketplace website".
  if (key === 'ecommerce' || key === 'marketplace') {
    if (session?.industry === 'ecommerce') session.industry = undefined;
    if (session?.business_type === 'ecommerce') session.business_type = undefined;
  }
}

// PHASE 22 (Part 6 hardening): "Forget that." / "Ignore that." / "Never
// mind." with NO named subject - detectSupersessionStatement correctly
// returns null for these (STOP_SUBJECTS filters bare pronouns to avoid
// misreading "that" as a requirement literally called "that"), but a bare
// retraction immediately after a SINGLE just-deferred requirement is
// genuinely unambiguous ("Maybe ecommerce later." -> "Forget that." can
// only mean the ecommerce deferral). This reuses the SAME future_<key>
// state detectSupersessionStatement already reads/writes - no new tracked
// field - so it only resolves when exactly one requirement is pending,
// never guesses among several.
const BARE_RETRACTION_PATTERN = /^(forget (that|it)|ignore (that|it)|never ?mind( that| it)?)\.?$/i;

export function isBareRetractionStatement(norm: string): boolean {
  return BARE_RETRACTION_PATTERN.test(norm.trim());
}

/** The single pending future requirement key, if there's exactly one - the unambiguous case a bare "forget that" can resolve against. */
export function resolveSolePendingRequirement(session: VisitorSessionState | undefined): string | null {
  const entries = Object.entries(session?.collected_context || {}).filter(([k, v]) => k.startsWith('future_') && v === 'pending');
  if (entries.length !== 1) return null;
  return entries[0][0].replace(/^future_/, '');
}

export function isFutureRequirementPending(session: VisitorSessionState | undefined, key: string): boolean {
  return session?.collected_context?.[futureFlagKey(key)] === 'pending';
}

export function isFutureRequirementSuperseded(session: VisitorSessionState | undefined, key: string): boolean {
  return session?.collected_context?.[futureFlagKey(key)] === 'superseded';
}
