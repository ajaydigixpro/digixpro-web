import fs from 'fs';
import path from 'path';
import { AssetRecord, TemplateId } from './types';

export class AssetResolver {
  private registry: Record<string, AssetRecord>;
  private allowlist: Record<string, any>;
  private baseDir: string;

  constructor() {
    const registryJsonPath = path.resolve(__dirname, '../registry/asset-registry.json');
    const allowlistJsonPath = path.resolve(__dirname, '../registry/template-allowlist.json');

    const rawRegistry = fs.readFileSync(registryJsonPath, 'utf8');
    this.registry = JSON.parse(rawRegistry);

    const rawAllowlist = fs.readFileSync(allowlistJsonPath, 'utf8');
    this.allowlist = JSON.parse(rawAllowlist);

    this.baseDir = process.cwd();
  }

  public resolveAsset(
    templateId: TemplateId,
    assetId: string,
    expectedType?: string,
    allowPrototypeBackground: boolean = false
  ): { record: AssetRecord; absolutePath?: string; base64DataUri?: string } {
    const record = this.registry[assetId];
    if (!record) {
      throw new Error(`[AssetResolver] Asset not found in registry: ${assetId}`);
    }

    if (record.file_path && (record.file_path.includes('reference/') || record.file_path.includes('canva_masters/'))) {
      throw new Error(
        `[AssetResolver] SECURITY VIOLATION: Reference file '${record.file_path}' cannot be resolved for production rendering.`
      );
    }

    if (record.asset_type === 'background') {
      if (record.background_source === 'prototype_unresolved' && !allowPrototypeBackground) {
        throw new Error(
          `[AssetResolver] POLICY REJECTION: Background '${assetId}' is marked 'prototype_unresolved' and cannot enter production.`
        );
      }
    }

    if (!record.approved && !allowPrototypeBackground) {
      throw new Error(`[AssetResolver] Asset '${assetId}' is not approved for production use.`);
    }

    const templateRules = this.allowlist[templateId];
    if (!templateRules) {
      throw new Error(`[AssetResolver] Template '${templateId}' is not in the allowlist.`);
    }

    if (expectedType && record.asset_type !== expectedType) {
      throw new Error(
        `[AssetResolver] Asset type mismatch for '${assetId}'. Expected: ${expectedType}, Found: ${record.asset_type}`
      );
    }

    if (!templateRules.allowed_asset_types.includes(record.asset_type)) {
      throw new Error(
        `[AssetResolver] Asset type '${record.asset_type}' is not allowed in template '${templateId}'.`
      );
    }

    if (record.asset_type === 'background') {
      if (!templateRules.allowed_background_ids.includes(assetId) && !allowPrototypeBackground) {
        throw new Error(
          `[AssetResolver] Background '${assetId}' is not allowed for template '${templateId}'.`
        );
      }
    }

    if (record.background_source === 'code' || !record.file_path) {
      return { record };
    }

    let absolutePath = path.resolve(this.baseDir, record.file_path);
    if (!fs.existsSync(absolutePath)) {
      const fallbackPath = path.resolve(this.baseDir, 'digixpro-web', record.file_path);
      if (fs.existsSync(fallbackPath)) {
        absolutePath = fallbackPath;
      } else {
        throw new Error(`[AssetResolver] Physical file missing for asset '${assetId}': ${absolutePath}`);
      }
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const ext = path.extname(absolutePath).toLowerCase().replace('.', '');
    const mimeType = ext === 'svg' ? 'image/svg+xml' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    const base64DataUri = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;

    return {
      record,
      absolutePath,
      base64DataUri,
    };
  }

  public resolveDefaultBackground(templateId: TemplateId): { record: AssetRecord; base64DataUri?: string } {
    const defaultBgId = 'bg_insight_code_clean';
    return this.resolveAsset(templateId, defaultBgId, 'background');
  }

  /**
   * Deterministic zone-based asset resolver implementing the DigiXPro selection hierarchy:
   * Template -> Visual Zone -> Primary Category -> Content Type -> Semantic -> Recent-use suppression -> Deterministic Rotation
   */
  public resolveZoneAsset(
    templateId: TemplateId,
    zoneCategory: 'bottom_zone' | 'side_column' | 'footer',
    options?: {
      contentType?: string;
      semanticFamily?: string;
      recentAssetIds?: string[];
      rotationIndex?: number;
    }
  ): { record: AssetRecord; absolutePath?: string; base64DataUri?: string } | null {
    const templateRules = this.allowlist[templateId];
    if (!templateRules || !templateRules.allowed_asset_types.includes(zoneCategory)) {
      return null;
    }

    // Deduplicate registry by asset_id (to ignore alias copies)
    const seenIds = new Set<string>();
    const activeEntries: AssetRecord[] = [];

    for (const r of Object.values(this.registry)) {
      if (seenIds.has(r.asset_id)) continue;
      seenIds.add(r.asset_id);

      // Must be approved and active
      if (!r.approved || r.status !== 'active') continue;

      // Must match category strictly
      if (r.asset_type !== zoneCategory && r.primary_category !== zoneCategory) continue;

      // Must allow this template (if template restrictions exist)
      if (r.allowed_templates && r.allowed_templates.length > 0 && !r.allowed_templates.includes(templateId)) {
        continue;
      }

      activeEntries.push(r);
    }

    if (activeEntries.length === 0) return null;

    // Filter by content type compatibility if specified
    let eligible = activeEntries;
    if (options?.contentType) {
      const ctMatches = eligible.filter(
        r => r.compatible_content_types && r.compatible_content_types.includes(options.contentType!)
      );
      if (ctMatches.length > 0) eligible = ctMatches;
    }

    // Filter by semantic family compatibility if specified
    if (options?.semanticFamily) {
      const semMatches = eligible.filter(r => {
        if (Array.isArray(r.semantic_family)) {
          return r.semantic_family.includes(options.semanticFamily!);
        }
        return r.semantic_family === options.semanticFamily;
      });
      if (semMatches.length > 0) eligible = semMatches;
    }

    // Recent-use suppression
    if (options?.recentAssetIds && options.recentAssetIds.length > 0) {
      const nonRecent = eligible.filter(r => !options.recentAssetIds!.includes(r.asset_id));
      if (nonRecent.length > 0) {
        eligible = nonRecent;
      }
    }

    // Deterministic selection / rotation
    eligible.sort((a, b) => a.asset_id.localeCompare(b.asset_id));
    const rotation = options?.rotationIndex ?? 0;
    const idx = Math.abs(rotation) % eligible.length;
    const selected = eligible[idx];

    if (!selected) return null;

    return this.resolveAsset(templateId, selected.asset_id, zoneCategory);
  }

  public getActiveAssetsByCategory(category: 'bottom_zone' | 'side_column' | 'footer'): AssetRecord[] {
    const seen = new Set<string>();
    const res: AssetRecord[] = [];
    for (const r of Object.values(this.registry)) {
      if (r.approved && r.status === 'active' && (r.asset_type === category || r.primary_category === category)) {
        if (!seen.has(r.asset_id)) {
          seen.add(r.asset_id);
          res.push(r);
        }
      }
    }
    return res.sort((a, b) => a.asset_id.localeCompare(b.asset_id));
  }

  public getQuarantinedAssets(): AssetRecord[] {
    const seen = new Set<string>();
    const res: AssetRecord[] = [];
    for (const r of Object.values(this.registry)) {
      if (r.status === 'quarantined' || (!r.approved && r.reason)) {
        if (!seen.has(r.asset_id)) {
          seen.add(r.asset_id);
          res.push(r);
        }
      }
    }
    return res.sort((a, b) => a.asset_id.localeCompare(b.asset_id));
  }
}
