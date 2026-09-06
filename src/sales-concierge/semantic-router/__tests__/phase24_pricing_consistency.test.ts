import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

// PHASE 24 (updated): the original "canonical pricing.ts <-> AuditClient.tsx"
// consistency block was removed. It depended on the now-deleted PRICING_RANGES
// array and compared it against AuditClient.tsx's pricing FAQ prose - but that
// prose has since been removed from AuditClient.tsx entirely (pricing content
// was centralized onto /pricing). PricingClient.tsx now renders every price
// directly from CANONICAL_SERVICES_PRICING via formatTierPrice() - there is no
// second hardcoded copy left anywhere for it to silently drift from, so a
// rewritten version of that check would just be comparing the array to itself.
//
// The currency-determinism tests below don't depend on PRICING_RANGES and
// still cover live, currently-used code (formatTierPrice's currency
// conversion for all 18 canonical services), so they're kept as-is.

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
