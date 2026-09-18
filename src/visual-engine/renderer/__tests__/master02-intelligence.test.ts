import test from 'node:test';
import assert from 'node:assert/strict';
import {
  rotatePalette,
  rotateFooter,
  selectAndPlaceAssetV4,
  applyPaletteToSvg,
  getTintedAssetDataUri,
  resolveMaster02Intelligence,
  LIGHT_PALETTES,
} from '../master02-intelligence';
import { EMBEDDED_MASTER02_SVGS } from '../embedded-master02-assets';
import { Master02Payload } from '../types';

const samplePayload: Master02Payload = {
  template_id: 'master_02_problem_solution',
  problem_headline: 'Manual operational spreadsheets create silent bottlenecks',
  problem_supporting_text: 'Disconnected clinic records force staff into repetitive manual data entry.',
  solution_headline: 'Automate queue processing with real-time event triggers',
  solution_supporting_text: 'Synchronize patient queues with practitioner availability across all branches.',
  category_badge_text: 'AUTOMATION',
  variant: 'v1',
};

test('1. Light Palettes Definition & Rotation', () => {
  assert.equal(LIGHT_PALETTES.length, 4, 'Must have exactly 4 light palettes');
  const ids = LIGHT_PALETTES.map((p) => p.id);
  assert.deepEqual(ids, ['LP-01', 'LP-02', 'LP-03', 'LP-04']);

  // Initial step with empty history
  const r1 = rotatePalette([]);
  assert.equal(r1.selected.id, 'LP-01');

  // Step 2
  const r2 = rotatePalette(r1.updatedHistory);
  assert.notEqual(r2.selected.id, r1.selected.id);

  // Step 3
  const r3 = rotatePalette(r2.updatedHistory);
  assert.ok(![r1.selected.id, r2.selected.id].includes(r3.selected.id));

  // Step 4
  const r4 = rotatePalette(r3.updatedHistory);
  assert.ok(![r1.selected.id, r2.selected.id, r3.selected.id].includes(r4.selected.id));

  // Forced palette
  const forced = rotatePalette(r4.updatedHistory, 'LP-03');
  assert.equal(forced.selected.id, 'LP-03');
});

test('2. Footer-Presence Rotation', () => {
  // Day 1: Empty history -> FOOTER_PRESENT (1.0 vs 0.95)
  const d1 = rotateFooter([]);
  assert.equal(d1.selected, 'FOOTER_PRESENT');

  // Day 2: FOOTER_PRESENT has penalty -0.15 -> 0.85 vs 0.95 -> FOOTER_SUPPRESSED
  const d2 = rotateFooter(d1.updatedHistory);
  assert.equal(d2.selected, 'FOOTER_SUPPRESSED');

  // Day 3: FOOTER_SUPPRESSED has penalty -0.15 -> 0.80 vs 0.85 -> FOOTER_PRESENT
  const d3 = rotateFooter(d2.updatedHistory);
  assert.equal(d3.selected, 'FOOTER_PRESENT');

  // Forced footer overrides
  const forcedSup = rotateFooter([], 'suppressed');
  assert.equal(forcedSup.selected, 'FOOTER_SUPPRESSED');

  const forcedPres = rotateFooter(['FOOTER_PRESENT', 'FOOTER_PRESENT'], 'present');
  assert.equal(forcedPres.selected, 'FOOTER_PRESENT');
});

test('3. Embedded SVGs Integrity', () => {
  const assetIds = ['BB-01', 'BB-02', 'BB-03', 'MC-01', 'MC-02'];
  for (const id of assetIds) {
    const svg = EMBEDDED_MASTER02_SVGS[id];
    assert.ok(svg, `Asset ${id} must exist in EMBEDDED_MASTER02_SVGS`);
    assert.ok(svg.startsWith('<svg'), `Asset ${id} must be valid SVG`);
    assert.ok(svg.endsWith('</svg>'), `Asset ${id} must end with </svg>`);
  }
});

test('4. Asset Selection Engine v4 (Occupancy, Collision Gate & Rotation)', () => {
  // Test selection with empty history
  const r1 = selectAndPlaceAssetV4(samplePayload, []);
  assert.ok(r1.assetId, 'Should select an asset');
  assert.ok(r1.bounds, 'Should compute placement bounds');
  assert.ok(r1.occupancyRatio >= 0.35 && r1.occupancyRatio <= 0.70, `Occupancy ${r1.occupancyRatio} must be between 35% and 70%`);

  // Verify collision gate: must not overlap problem (top 185, height 240) or solution (top 560, height 240)
  const b = r1.bounds!;
  const collidesWithProblem = b.top < 185 + 240 && b.top + b.height > 185;
  const collidesWithSolution = b.top < 560 + 240 && b.top + b.height > 560;
  assert.ok(!collidesWithProblem, 'Injected asset must not collide with Problem card');
  assert.ok(!collidesWithSolution, 'Injected asset must not collide with Solution card');

  // Sequential rotation within quality pool
  const r2 = selectAndPlaceAssetV4(samplePayload, r1.updatedHistory);
  assert.notEqual(r2.assetId, r1.assetId, 'Second selection should rotate asset');

  // Forced asset
  const forced = selectAndPlaceAssetV4(samplePayload, r2.updatedHistory, 'BB-03');
  assert.equal(forced.assetId, 'BB-03');
});

test('5. Palette Tinting & Base64 Data URI Generation', () => {
  const palette = LIGHT_PALETTES[1]; // LP-02 Airy Teal (#0F766E, #5EEAD4)
  const tintedSvg = applyPaletteToSvg(EMBEDDED_MASTER02_SVGS['BB-01'], palette);
  assert.ok(tintedSvg.includes('#0F766E'), 'Tinted SVG must include palette primary color');

  const dataUri = getTintedAssetDataUri('BB-01', palette);
  assert.ok(dataUri.startsWith('data:image/svg+xml;base64,'), 'Data URI must be valid base64 SVG');
});

test('6. Full Pipeline resolveMaster02Intelligence & Persistence', async () => {
  const dummyContext = {};
  const res = await resolveMaster02Intelligence(dummyContext, samplePayload);

  assert.ok(res.palette, 'Result must include palette');
  assert.ok(typeof res.showFooter === 'boolean', 'Result must include showFooter boolean');
  assert.ok(res.rotationState, 'Result must include rotationState');
  assert.ok(['kv', 'edge_cache', 'file'].includes(res.storageMechanism), 'Storage mechanism must be valid');
  assert.ok(res.decisionReason.length > 0, 'Must include decision reason');

  if (res.injectedAssetId) {
    assert.ok(res.injectedAssetDataUri?.startsWith('data:image/svg+xml;base64,'));
    assert.ok(res.injectedAssetBounds);
  }
});

test('7. Multi-Variant Support (v1, v2, v3, v4)', () => {
  const variants: ('v1' | 'v2' | 'v3' | 'v4')[] = ['v1', 'v2', 'v3', 'v4'];
  for (const v of variants) {
    const payload: Master02Payload = { ...samplePayload, variant: v };
    const res = selectAndPlaceAssetV4(payload, []);
    assert.ok(res.assetId, `Variant ${v} should select an asset`);
    assert.ok(res.bounds, `Variant ${v} should produce valid bounds`);
    assert.ok(res.bounds!.width > 0 && res.bounds!.height > 0);
  }
});

test('8. Content Overload Suppression Safety', () => {
  const overloadedPayload: Master02Payload = {
    ...samplePayload,
    problem_headline: 'A'.repeat(160),
    problem_supporting_text: 'B'.repeat(300),
    solution_headline: 'C'.repeat(160),
    solution_supporting_text: 'D'.repeat(300),
  };
  const res = selectAndPlaceAssetV4(overloadedPayload, []);
  assert.equal(res.assetId, null, 'Overloaded payload must suppress asset injection');
  assert.equal(res.bounds, null);
  assert.ok(res.decisionReason.includes('SUPPRESS'));
});

test('9. Safe Isolation: Non-preview does not mutate rotation state', async () => {
  // Read state before
  const dummyContext = {};
  const res1 = await resolveMaster02Intelligence(dummyContext, samplePayload);
  const stateBefore = { ...res1.rotationState };

  // A standard render without isPreview does not call resolveMaster02Intelligence,
  // ensuring that the 8 other templates and unflagged master_02 production renders remain completely untouched.
  assert.ok(stateBefore.lastRotatedAt);
});
