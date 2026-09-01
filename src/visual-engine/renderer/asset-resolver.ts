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
}
