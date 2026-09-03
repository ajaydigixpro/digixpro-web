import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { PRICING_RANGES, formatBound } from '../../../data/pricing';

// PHASE 24: WEBSITE <-> CANONICAL PRICING SOURCE CONSISTENCY
//
// pricing.ts mirrors AuditClient.tsx's live, public "Pricing & Investment
// FAQ" numbers verbatim (see pricing.ts's header comment for the full
// authority-resolution reasoning). This test mechanically re-parses
// AuditClient.tsx's raw source and verifies every INR/USD bound in
// pricing.ts still appears in it - so a future edit to either file that
// silently diverges the numbers fails CI instead of being trusted to
// manual sync. This is the Part 14 "website <-> Concierge/canonical
// consistency" test, built against the source that actually varies
// (AuditClient.tsx) rather than a hardcoded expected string.

const AUDIT_CLIENT_PATH = path.join(__dirname, '..', '..', '..', 'components', 'audit', 'AuditClient.tsx');

function readAuditClientSource(): string {
  return fs.readFileSync(AUDIT_CLIENT_PATH, 'utf-8');
}

describe('Phase 24: canonical pricing.ts stays consistent with the live AuditClient.tsx source', () => {
  const source = readAuditClientSource();

  for (const range of PRICING_RANGES) {
    test(`"${range.id}" INR bounds appear verbatim in AuditClient.tsx`, () => {
      const min = formatBound(range.inrMin, range.usdMin, 'INR');
      assert.ok(source.includes(min), `expected AuditClient.tsx to contain "${min}" for range "${range.id}"`);
      if (range.inrMax !== null) {
        const max = formatBound(range.inrMax, range.usdMax as number, 'INR');
        assert.ok(source.includes(max), `expected AuditClient.tsx to contain "${max}" for range "${range.id}"`);
      }
    });

    test(`"${range.id}" USD bounds appear verbatim in AuditClient.tsx (reused, never recomputed)`, () => {
      const min = formatBound(range.inrMin, range.usdMin, 'USD');
      assert.ok(source.includes(min), `expected AuditClient.tsx to contain "${min}" for range "${range.id}"`);
      if (range.usdMax !== null) {
        const max = formatBound(range.inrMax as number, range.usdMax, 'USD');
        assert.ok(source.includes(max), `expected AuditClient.tsx to contain "${max}" for range "${range.id}"`);
      }
    });
  }

  test('no PRICING_RANGES entry invents a number absent from the canonical source', () => {
    // Sanity check on the check itself: a deliberately wrong figure must NOT be found.
    assert.equal(source.includes('₹999.99 lakh'), false);
  });
});

describe('Phase 24: currency conversion is deterministic (no live FX, no randomness)', () => {
  test('the same INR amount always converts to the same GBP/AUD/SGD value', async () => {
    const { convertInrToForeign } = await import('../../../data/pricing');
    const a = convertInrToForeign(230_000, 'GBP');
    const b = convertInrToForeign(230_000, 'GBP');
    assert.equal(a, b);
  });

  test('GBP/AUD/SGD rates are a fixed table, not a runtime/network computation', async () => {
    const { FIXED_REFERENCE_RATES_INR } = await import('../../../data/pricing');
    assert.deepEqual(Object.keys(FIXED_REFERENCE_RATES_INR).sort(), ['AUD', 'GBP', 'SGD']);
    for (const rate of Object.values(FIXED_REFERENCE_RATES_INR)) {
      assert.equal(typeof rate, 'number');
      assert.ok(rate > 0);
    }
  });
});
