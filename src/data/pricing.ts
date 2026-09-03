/**
 * CANONICAL PUBLIC PRICING DATA — Phase 24
 *
 * Authority resolution (see Phase 24 report Part "Canonical authority
 * selected"): canonicalRegistry.ts's `pricingReference` field is declared
 * per-service but has ZERO consumers anywhere in the codebase (verified via
 * exhaustive grep for `.pricingReference` — no page, component, or the
 * Sales Concierge ever reads it). It is dead data, never publicly
 * displayed. AuditClient.tsx's `AUDIT_FAQS` block is the ONLY source that
 * is actually live, public, and visitor-facing (rendered on /audit today).
 * Per the founder-input hierarchy (explicit approved doc > current public
 * implementation > derived/unused values), AuditClient.tsx's numbers are
 * therefore the unambiguous canonical public pricing authority — this file
 * mirrors those EXACT figures (nothing invented, nothing recomputed) into a
 * single, structured, reusable source so /pricing and any future consumer
 * read from one place instead of duplicating hardcoded numbers.
 *
 * INR is canonical. USD figures are the ALREADY-APPROVED, already-public
 * values from AuditClient.tsx, reused verbatim — never recomputed from a
 * rate. GBP/AUD/SGD have no existing public figures anywhere (verified in
 * Phase 23) and are computed deterministically from INR via the fixed,
 * non-live reference rates below (see FIXED_REFERENCE_RATES_INR) — this is
 * the same "quote a round approximate figure" approach already used for the
 * existing USD numbers (which imply a ~₹85/USD rate), extended to three
 * more currencies, not a new kind of estimate.
 *
 * A regression test (phase24_pricing_consistency.test.ts) mechanically
 * parses AuditClient.tsx's FAQ text and cross-checks every number here
 * against it, so any future drift between the two is caught automatically
 * rather than trusted to manual sync.
 */

export const CANONICAL_PRICING_SOURCE =
  'AuditClient.tsx — "Pricing & Investment FAQ" (live, public, pre-existing content on /audit)';

export type PricingCluster = 'advisory' | 'design-build' | 'search-ai-automation' | 'other';
export type PricingUnit = 'one-time' | 'per-month' | 'per-hour' | 'per-project' | 'starting-from';

export interface PricingRange {
  id: string;
  /** The canonical service name this maps to, where one exists (canonicalRegistry.ts). */
  service: string | null;
  cluster: PricingCluster;
  label: string;
  unit: PricingUnit;
  inrMin: number;
  /** null = no published ceiling ("starting around X", "scoped case by case"). */
  inrMax: number | null;
  /** Reused VERBATIM from the existing public FAQ text — never recomputed. */
  usdMin: number;
  usdMax: number | null;
}

export const PRICING_RANGES: PricingRange[] = [
  {
    id: 'branding',
    service: null, // not one of the 18 canonical services — pre-existing FAQ content, see Phase 23/24 reports
    cluster: 'design-build',
    label: 'Branding package (logo, color system, typography, usage guidelines)',
    unit: 'one-time',
    inrMin: 115_000,
    inrMax: 750_000,
    usdMin: 1_350,
    usdMax: 8_800
  },
  {
    id: 'seo-focused',
    service: 'SEO & Search Visibility',
    cluster: 'search-ai-automation',
    label: 'SEO — focused local / single-service program',
    unit: 'per-month',
    inrMin: 25_000,
    inrMax: 60_000,
    usdMin: 300,
    usdMax: 700
  },
  {
    id: 'seo-competitive',
    service: 'SEO & Search Visibility',
    cluster: 'search-ai-automation',
    label: 'SEO — competitive, multi-location, or content-heavy program',
    unit: 'per-month',
    inrMin: 60_000,
    inrMax: 125_000,
    usdMin: 700,
    usdMax: 1_500
  },
  {
    id: 'it-consulting-hourly',
    service: 'IT Consulting & Technology Strategy',
    cluster: 'advisory',
    label: 'IT consulting — hourly',
    unit: 'per-hour',
    inrMin: 3_500,
    inrMax: 6_500,
    usdMin: 40,
    usdMax: 75
  },
  {
    id: 'it-consulting-project',
    service: 'IT Consulting & Technology Strategy',
    cluster: 'advisory',
    label: 'IT consulting — defined project (technology audit, architecture review)',
    unit: 'per-project',
    inrMin: 190_000,
    inrMax: 1_400_000,
    usdMin: 2_200,
    usdMax: 16_500
  },
  {
    id: 'ai-automation',
    service: 'Workflow & AI Automation',
    cluster: 'search-ai-automation',
    label: 'AI / workflow automation (lead systems, custom integrations, AI chatbot)',
    unit: 'starting-from',
    inrMin: 75_000,
    inrMax: 1_700_000,
    usdMin: 900,
    usdMax: 20_000
  },
  {
    id: 'social-media-management',
    service: 'Social Media Management & Content Systems',
    cluster: 'search-ai-automation',
    label: 'AI-driven social media management',
    unit: 'per-month',
    inrMin: 50_000,
    inrMax: 290_000,
    usdMin: 600,
    usdMax: 3_400
  },
  {
    id: 'website-standard',
    service: 'Small Business & Service Business Websites',
    cluster: 'design-build',
    label: 'Standard business website',
    unit: 'one-time',
    inrMin: 90_000,
    inrMax: 230_000,
    usdMin: 1_050,
    usdMax: 2_700
  },
  {
    id: 'website-custom',
    service: 'Custom Business Website Design & Development',
    cluster: 'design-build',
    label: 'Custom platform with advanced functionality',
    unit: 'one-time',
    inrMin: 300_000,
    inrMax: 1_150_000,
    usdMin: 3_500,
    usdMax: 13_500
  },
  {
    id: 'process-automation',
    service: 'Workflow & AI Automation',
    cluster: 'search-ai-automation',
    label: 'Business process automation (case-by-case scope)',
    unit: 'starting-from',
    inrMin: 150_000,
    inrMax: null,
    usdMin: 1_800,
    usdMax: null
  }
];

/**
 * Fixed, non-live reference rates (INR per 1 unit of foreign currency) used
 * ONLY to compute GBP/AUD/SGD display values from the canonical INR
 * figures above. Deliberately round, approximate, and NOT a live/real-time
 * FX lookup (Absolute Rule: no live FX API, no dynamic exchange-rate
 * calculation) — for indicative display only, same spirit as the existing
 * USD figures (which already imply a ~₹85/USD rate). Review periodically;
 * this is a fixed table, not a formula that calls out anywhere.
 */
export const FIXED_REFERENCE_RATES_INR: Record<'GBP' | 'AUD' | 'SGD', number> = {
  GBP: 105,
  AUD: 55,
  SGD: 62
};

export type DisplayCurrency = 'INR' | 'USD' | 'GBP' | 'AUD' | 'SGD';

export const CURRENCY_SYMBOLS: Record<DisplayCurrency, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  AUD: 'A$',
  SGD: 'S$'
};

/** Rounds a computed foreign-currency amount to a clean display step. */
function roundForDisplay(amount: number): number {
  const step = amount >= 10_000 ? 500 : amount >= 1_000 ? 50 : 10;
  return Math.round(amount / step) * step;
}

/** Deterministically converts a canonical INR amount to GBP/AUD/SGD for display. Never called for INR/USD. */
export function convertInrToForeign(amountInr: number, currency: 'GBP' | 'AUD' | 'SGD'): number {
  const rate = FIXED_REFERENCE_RATES_INR[currency];
  return roundForDisplay(amountInr / rate);
}

/** Formats a plain number with comma grouping (Indian lakh grouping for INR, standard grouping otherwise). */
function formatNumber(amount: number, currency: DisplayCurrency): string {
  if (currency === 'INR') {
    if (amount >= 100_000) {
      const lakh = amount / 100_000;
      const rounded = Math.round(lakh * 100) / 100;
      return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2).replace(/0$/, '')} lakh`;
    }
    return amount.toLocaleString('en-IN');
  }
  return amount.toLocaleString('en-US');
}

/** Returns the display amount (as a number) for a given range/bound/currency, deterministically derived from the canonical INR value. */
export function getDisplayAmount(inrAmount: number, usdAmount: number, currency: DisplayCurrency): number {
  if (currency === 'INR') return inrAmount;
  if (currency === 'USD') return usdAmount; // reused verbatim, never recomputed
  return convertInrToForeign(inrAmount, currency);
}

/** Formats one bound (min or max) of a range in the requested display currency, e.g. "₹1.15 lakh" / "$1,350" / "£1,100". */
export function formatBound(inrAmount: number, usdAmount: number, currency: DisplayCurrency): string {
  const amount = getDisplayAmount(inrAmount, usdAmount, currency);
  return `${CURRENCY_SYMBOLS[currency]}${formatNumber(amount, currency)}`;
}

/** Formats a full range ("₹90,000–₹2.3 lakh" or "$1,050–$2,700") in the requested currency, honoring an open-ended (null max) range. */
export function formatRange(range: PricingRange, currency: DisplayCurrency): string {
  const min = formatBound(range.inrMin, range.usdMin, currency);
  if (range.inrMax === null || range.usdMax === null) {
    return `Starting around ${min}`;
  }
  const max = formatBound(range.inrMax, range.usdMax, currency);
  return `${min} – ${max}`;
}

export const UNIT_SUFFIX: Record<PricingUnit, string> = {
  'one-time': '',
  'per-month': ' / month',
  'per-hour': ' / hour',
  'per-project': ' / project',
  'starting-from': ''
};
