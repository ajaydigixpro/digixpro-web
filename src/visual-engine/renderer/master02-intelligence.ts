import fs from 'fs';
import path from 'path';
import { Master02Payload } from './types';
import { EMBEDDED_MASTER02_SVGS } from './embedded-master02-assets';

// ============================================================================
// 1. LIGHT PALETTES (LP-01 to LP-04)
// ============================================================================

export interface PaletteDefinition {
  id: 'LP-01' | 'LP-02' | 'LP-03' | 'LP-04';
  name: string;
  primary: string;
  secondary: string;
  gradientStops: [string, string];
  tintGradientStops: [string, string];
  accentLight: string;
}

export const LIGHT_PALETTES: PaletteDefinition[] = [
  {
    id: 'LP-01',
    name: 'Mint Soft',
    primary: '#007A55',
    secondary: '#10B981',
    gradientStops: ['#007A55', '#10B981'],
    tintGradientStops: ['#34D399', '#059669'],
    accentLight: '#6EE7B7',
  },
  {
    id: 'LP-02',
    name: 'Airy Teal',
    primary: '#0F766E',
    secondary: '#5EEAD4',
    gradientStops: ['#0F766E', '#5EEAD4'],
    tintGradientStops: ['#2DD4BF', '#0F766E'],
    accentLight: '#99F6E4',
  },
  {
    id: 'LP-03',
    name: 'Sage Mist',
    primary: '#065F46',
    secondary: '#A7F3D0',
    gradientStops: ['#065F46', '#A7F3D0'],
    tintGradientStops: ['#6EE7B7', '#065F46'],
    accentLight: '#D1FAE5',
  },
  {
    id: 'LP-04',
    name: 'Platinum Whisper',
    primary: '#007A55',
    secondary: '#94A3B8',
    gradientStops: ['#007A55', '#F1F5F9'],
    tintGradientStops: ['#94A3B8', '#007A55'],
    accentLight: '#E2E8F0',
  },
];

export function rotatePalette(
  history: string[] = [],
  forcedId?: string | null
): { selected: PaletteDefinition; updatedHistory: string[]; score: number } {
  if (forcedId) {
    const forced = LIGHT_PALETTES.find((p) => p.id === forcedId);
    if (forced) {
      const updated = [forced.id, ...history.filter((id) => id !== forced.id)].slice(0, 8);
      return { selected: forced, updatedHistory: updated, score: 1.0 };
    }
  }

  const recentWindow = history.slice(0, 4);
  const scored = LIGHT_PALETTES.map((p) => {
    const usageCount = recentWindow.filter((id) => id === p.id).length;
    const penalty = Number((0.15 * usageCount).toFixed(4));
    const score = Number((1.0 - penalty).toFixed(4));
    return { palette: p, score, usageCount };
  });

  // Sort by score descending, tie-break by ID
  scored.sort((a, b) => b.score - a.score || a.palette.id.localeCompare(b.palette.id));
  const winner = scored[0];
  const updatedHistory = [winner.palette.id, ...history.filter((id) => id !== winner.palette.id)].slice(0, 8);

  return { selected: winner.palette, updatedHistory, score: winner.score };
}

// ============================================================================
// 2. FOOTER-PRESENCE ROTATION
// ============================================================================

export type FooterPresenceState = 'FOOTER_PRESENT' | 'FOOTER_SUPPRESSED';

export function rotateFooter(
  history: string[] = [],
  forcedState?: string | null
): { selected: FooterPresenceState; updatedHistory: string[]; score: number } {
  if (forcedState) {
    const norm = forcedState.toLowerCase();
    if (norm === 'present' || norm === 'footer_present' || norm === 'true') {
      const updated = ['FOOTER_PRESENT', ...history.filter((s) => s !== 'FOOTER_PRESENT')].slice(0, 8);
      return { selected: 'FOOTER_PRESENT', updatedHistory: updated, score: 1.0 };
    }
    if (norm === 'suppressed' || norm === 'footer_suppressed' || norm === 'false' || norm === 'none') {
      const updated = ['FOOTER_SUPPRESSED', ...history.filter((s) => s !== 'FOOTER_SUPPRESSED')].slice(0, 8);
      return { selected: 'FOOTER_SUPPRESSED', updatedHistory: updated, score: 0.95 };
    }
  }

  const candidates: { state: FooterPresenceState; baseScore: number }[] = [
    { state: 'FOOTER_PRESENT', baseScore: 1.0 },
    { state: 'FOOTER_SUPPRESSED', baseScore: 0.95 },
  ];

  const recentWindow = history.slice(0, 5);
  const scored = candidates.map((c) => {
    const usageCount = recentWindow.filter((s) => s === c.state).length;
    const penalty = Number((0.15 * usageCount).toFixed(4));
    const score = Number((c.baseScore - penalty).toFixed(4));
    return { state: c.state, score, usageCount };
  });

  scored.sort((a, b) => b.score - a.score || a.state.localeCompare(b.state));
  const winner = scored[0];
  const updatedHistory = [winner.state, ...history.filter((s) => s !== winner.state)].slice(0, 8);

  return { selected: winner.state, updatedHistory, score: winner.score };
}

// ============================================================================
// 3. ASSET SELECTION ENGINE v4 FOR MASTER_02
// ============================================================================

export interface CandidateAsset {
  id: string;
  name: string;
  baseQuality: number;
  aspectRatio: number;
  forbiddenVariants?: string[];
  preferredVariants?: string[];
}

const MASTER02_CANDIDATE_POOL: CandidateAsset[] = [
  { id: 'BB-01', name: 'Flow Foundation', baseQuality: 0.94, aspectRatio: 690 / 210, preferredVariants: ['v1', 'v4'] },
  { id: 'BB-02', name: 'Ascending Structure', baseQuality: 0.92, aspectRatio: 680 / 230, preferredVariants: ['v1', 'v3', 'v4'] },
  { id: 'BB-03', name: 'Converging Streams', baseQuality: 0.90, aspectRatio: 680 / 220, forbiddenVariants: ['v3'], preferredVariants: ['v1'] },
  { id: 'MC-01', name: 'Horizontal Transformation', baseQuality: 0.88, aspectRatio: 900 / 300, preferredVariants: ['v1', 'v2', 'v4'] },
];

export interface SlotGeometry {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function getSlotGeometryForVariant(variant: string = 'v1'): SlotGeometry {
  switch (variant) {
    case 'v3':
      return { left: 120, top: 885, width: 840, height: 107 };
    case 'v4':
      return { left: 120, top: 845, width: 840, height: 147 };
    case 'v2':
    case 'v1':
    default:
      return { left: 140, top: 800, width: 800, height: 160 };
  }
}

export function evaluateMaster02ContentState(payload: Master02Payload): {
  isOverloaded: boolean;
  occupiedFraction: number;
  reason: string;
} {
  const pHeadLen = payload.problem_headline?.length || 0;
  const pSubLen = payload.problem_supporting_text?.length || 0;
  const sHeadLen = payload.solution_headline?.length || 0;
  const sSubLen = payload.solution_supporting_text?.length || 0;

  const totalChars = pHeadLen + pSubLen + sHeadLen + sSubLen;

  // Overloaded threshold: extreme text occupies >75% canvas height
  if (totalChars > 340 || (pHeadLen > 95 && sHeadLen > 95)) {
    return {
      isOverloaded: true,
      occupiedFraction: 0.78,
      reason: `High text density (${totalChars} chars): container expansion leaves inadequate clearance for injected visual asset.`,
    };
  }

  const occupiedFraction = totalChars > 220 ? 0.48 : 0.28;
  return {
    isOverloaded: false,
    occupiedFraction,
    reason: 'Balanced text volume: slot maintains safe margins and clearance.',
  };
}

export function selectAndPlaceAssetV4(
  payload: Master02Payload,
  history: string[] = [],
  forcedAssetId?: string | null
): {
  assetId: string | null;
  bounds: { left: number; top: number; width: number; height: number; opacity: number } | null;
  occupancyRatio: number;
  updatedHistory: string[];
  decisionReason: string;
} {
  const variant = payload.variant || 'v1';
  const contentState = evaluateMaster02ContentState(payload);

  if (contentState.isOverloaded && !forcedAssetId) {
    return {
      assetId: null,
      bounds: null,
      occupancyRatio: 0,
      updatedHistory: history,
      decisionReason: `SUPPRESS: ${contentState.reason} Base template complete without injection.`,
    };
  }

  const slot = getSlotGeometryForVariant(variant);

  // Eligible pool: filter forbidden variants
  const eligible = MASTER02_CANDIDATE_POOL.filter((c) => {
    if (c.forbiddenVariants?.includes(variant)) return false;
    return true;
  });

  let winner: CandidateAsset;
  if (forcedAssetId) {
    const forced = MASTER02_CANDIDATE_POOL.find((c) => c.id === forcedAssetId);
    winner = forced || eligible[0];
  } else {
    // 0.08 Near-tied pool
    const topQuality = eligible[0].baseQuality;
    const nearTied = eligible.filter((c) => topQuality - c.baseQuality <= 0.08);

    const lastUsed = history.length > 0 ? history[0] : null;
    const rotationPool = nearTied.filter((c) => c.id !== lastUsed);
    const candidatePool = rotationPool.length > 0 ? rotationPool : nearTied;

    // Sort by least recently used in history, tie-break by baseQuality
    candidatePool.sort((a, b) => {
      const idxA = history.indexOf(a.id);
      const idxB = history.indexOf(b.id);
      const priorityA = idxA === -1 ? 999 : idxA;
      const priorityB = idxB === -1 ? 999 : idxB;
      if (priorityA !== priorityB) return priorityB - priorityA;
      return b.baseQuality - a.baseQuality || a.id.localeCompare(b.id);
    });

    winner = candidatePool[0];
  }

  // Whitespace occupancy dimensioning (35% - 70% fill of slot height)
  const gapH = slot.height;
  const minFillH = Math.max(38, Math.floor(gapH * 0.35));
  const maxFillH = Math.min(Math.floor(gapH * 0.65), gapH - 24);
  let targetH = Math.min(maxFillH, Math.max(minFillH, variant === 'v3' ? 62 : variant === 'v4' ? 88 : 96));
  let targetW = Math.round(targetH * winner.aspectRatio);

  if (targetW > slot.width) {
    targetW = slot.width;
    targetH = Math.round(targetW / winner.aspectRatio);
  }

  const placedX = Math.round(slot.left + (slot.width - targetW) / 2);
  const placedY = Math.round(slot.top + (slot.height - targetH) / 2);

  // Hard margin discipline: clamp within [80, 1000] canvas safe margins
  const clampedX = Math.max(80, Math.min(1000 - targetW, placedX));

  const bounds = {
    left: clampedX,
    top: placedY,
    width: targetW,
    height: targetH,
    opacity: variant === 'v4' ? 0.90 : 0.88,
  };

  const updatedHistory = [winner.id, ...history.filter((id) => id !== winner.id)].slice(0, 8);

  return {
    assetId: winner.id,
    bounds,
    occupancyRatio: Number((targetH / gapH).toFixed(3)),
    updatedHistory,
    decisionReason: `INJECT: Selected ${winner.id} (${winner.name}) in 0.08 quality pool. Whitespace occupancy: ${Math.round((targetH / gapH) * 100)}% (${targetH}px in ${gapH}px cavity).`,
  };
}

// ============================================================================
// 4. PALETTE TINTING OF SVG
// ============================================================================

export function applyPaletteToSvg(svgContent: string, palette: PaletteDefinition): string {
  let out = svgContent;

  // Replace primary greens with palette primary
  out = out.replace(/#007A55/gi, palette.primary);
  out = out.replace(/#0F766E/gi, palette.primary);

  // Replace secondary greens with palette secondary
  out = out.replace(/#10B981/gi, palette.secondary);
  out = out.replace(/#5EEAD4/gi, palette.secondary);

  // Replace gradient stops
  out = out.replace(/#34D399/gi, palette.tintGradientStops[0]);
  out = out.replace(/#059669/gi, palette.tintGradientStops[1]);
  out = out.replace(/#065F46/gi, palette.primary);
  out = out.replace(/#064E3B/gi, palette.primary);

  return out;
}

export function getTintedAssetDataUri(assetId: string, palette: PaletteDefinition): string {
  const rawSvg = EMBEDDED_MASTER02_SVGS[assetId] || EMBEDDED_MASTER02_SVGS['BB-01'];
  const tintedSvg = applyPaletteToSvg(rawSvg, palette);
  return `data:image/svg+xml;base64,${Buffer.from(tintedSvg).toString('base64')}`;
}

// ============================================================================
// 5. MULTI-TIER REAL PERSISTENT STORAGE
// ============================================================================

export interface Master02RotationState {
  assetHistory: string[];
  paletteHistory: string[];
  footerHistory: string[];
  lastRotatedAt: string;
}

const DEFAULT_ROTATION_STATE: Master02RotationState = {
  assetHistory: ['BB-01'],
  paletteHistory: ['LP-01'],
  footerHistory: ['FOOTER_PRESENT'],
  lastRotatedAt: new Date().toISOString(),
};

const EDGE_CACHE_STATE_URL = 'https://www.digixpro.in/__cf_storage/master02-rotation-v4.json';
const LOCAL_STORAGE_FILE_PATH = path.resolve(process.cwd(), 'src/visual-engine/lab/rotation-state-prod.json');

export async function getPersistentRotationState(
  context: any
): Promise<{ state: Master02RotationState; storage: 'kv' | 'edge_cache' | 'file' }> {
  // 1. Cloudflare KV binding check
  if (context?.env?.ROTATION_KV) {
    try {
      const val = await context.env.ROTATION_KV.get('master02_rotation_state', 'json');
      if (val) return { state: val, storage: 'kv' };
    } catch {}
  }

  // 2. Cloudflare Edge Cache API check
  try {
    const cache = (caches as any)?.default;
    if (cache) {
      const cacheKey = new Request(EDGE_CACHE_STATE_URL, { method: 'GET' });
      const match = await cache.match(cacheKey);
      if (match) {
        const json = await match.json();
        return { state: json, storage: 'edge_cache' };
      }
    }
  } catch {}

  // 3. Local JSON file fallback (Node / testing environment)
  try {
    let p = LOCAL_STORAGE_FILE_PATH;
    if (!fs.existsSync(p)) {
      const alt = path.resolve(process.cwd(), 'digixpro-web/src/visual-engine/lab/rotation-state-prod.json');
      if (fs.existsSync(alt)) p = alt;
    }
    if (fs.existsSync(p)) {
      const json = JSON.parse(fs.readFileSync(p, 'utf8'));
      return { state: json, storage: 'file' };
    }
  } catch {}

  return { state: { ...DEFAULT_ROTATION_STATE }, storage: 'edge_cache' };
}

export async function savePersistentRotationState(
  context: any,
  state: Master02RotationState
): Promise<'kv' | 'edge_cache' | 'file'> {
  state.lastRotatedAt = new Date().toISOString();
  let savedStorage: 'kv' | 'edge_cache' | 'file' = 'edge_cache';

  // 1. Save to Cloudflare KV if bound
  if (context?.env?.ROTATION_KV) {
    try {
      await context.env.ROTATION_KV.put('master02_rotation_state', JSON.stringify(state));
      savedStorage = 'kv';
    } catch {}
  }

  // 2. Save to Cloudflare Edge Cache API
  try {
    const cache = (caches as any)?.default;
    if (cache) {
      const cacheKey = new Request(EDGE_CACHE_STATE_URL, { method: 'GET' });
      const res = new Response(JSON.stringify(state), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=31536000',
        },
      });
      if (context?.waitUntil) {
        context.waitUntil(cache.put(cacheKey, res));
      } else {
        await cache.put(cacheKey, res);
      }
      if (savedStorage !== 'kv') savedStorage = 'edge_cache';
    }
  } catch {}

  // 3. Save to Local JSON file if in Node environment
  try {
    let p = LOCAL_STORAGE_FILE_PATH;
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, JSON.stringify(state, null, 2), 'utf8');
    if (savedStorage !== 'kv' && !(caches as any)?.default) savedStorage = 'file';
  } catch {}

  return savedStorage;
}

// ============================================================================
// 6. MAIN RESOLUTION PIPELINE
// ============================================================================

export interface Master02IntelligenceResult {
  injectedAssetId: string | null;
  injectedAssetDataUri?: string;
  injectedAssetBounds?: { left: number; top: number; width: number; height: number; opacity: number };
  palette: PaletteDefinition;
  showFooter: boolean;
  rotationState: Master02RotationState;
  storageMechanism: 'kv' | 'edge_cache' | 'file';
  decisionReason: string;
}

export async function resolveMaster02Intelligence(
  context: any,
  payload: Master02Payload,
  searchParams?: URLSearchParams
): Promise<Master02IntelligenceResult> {
  const forcedPalette = searchParams?.get('palette') || null;
  const forcedFooter = searchParams?.get('footer') || null;
  const forcedAsset = searchParams?.get('asset') || null;

  // Retrieve current persistent rotation state
  const { state: currentState, storage } = await getPersistentRotationState(context);

  // 1. Rotate Palette (LP-01 to LP-04)
  const paletteResult = rotatePalette(currentState.paletteHistory, forcedPalette);

  // 2. Rotate Footer Presence (FOOTER_PRESENT vs FOOTER_SUPPRESSED)
  const footerResult = rotateFooter(currentState.footerHistory, forcedFooter);

  // 3. Select Asset & Placement (v4 Intelligence)
  const assetResult = selectAndPlaceAssetV4(payload, currentState.assetHistory, forcedAsset);

  let injectedAssetDataUri: string | undefined;
  if (assetResult.assetId) {
    injectedAssetDataUri = getTintedAssetDataUri(assetResult.assetId, paletteResult.selected);
  }

  // Update persistent state
  const updatedState: Master02RotationState = {
    assetHistory: assetResult.updatedHistory,
    paletteHistory: paletteResult.updatedHistory,
    footerHistory: footerResult.updatedHistory,
    lastRotatedAt: new Date().toISOString(),
  };

  const actualStorage = await savePersistentRotationState(context, updatedState);

  return {
    injectedAssetId: assetResult.assetId,
    injectedAssetDataUri,
    injectedAssetBounds: assetResult.bounds || undefined,
    palette: paletteResult.selected,
    showFooter: footerResult.selected === 'FOOTER_PRESENT',
    rotationState: updatedState,
    storageMechanism: actualStorage,
    decisionReason: assetResult.decisionReason,
  };
}
