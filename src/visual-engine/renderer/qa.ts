import { QAResult, TemplatePayload, AssetRecord } from './types';

export function validatePayload(payload: TemplatePayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!payload.template_id) {
    errors.push('Missing template_id in payload.');
    return { valid: false, errors };
  }

  if (payload.template_id === 'master_01_insight') {
    const p = payload as any;
    if (!p.insight_headline?.trim()) errors.push('master_01_insight requires insight_headline.');
    if (!p.supporting_text?.trim()) errors.push('master_01_insight requires supporting_text.');
  }

  if (payload.template_id === 'master_02_problem_solution') {
    const p = payload as any;
    if (!p.problem_headline?.trim()) errors.push('master_02_problem_solution requires problem_headline.');
    if (!p.problem_supporting_text?.trim()) errors.push('master_02_problem_solution requires problem_supporting_text.');
    if (!p.solution_headline?.trim()) errors.push('master_02_problem_solution requires solution_headline.');
    if (!p.solution_supporting_text?.trim()) errors.push('master_02_problem_solution requires solution_supporting_text.');
  }

  if (payload.template_id === 'master_03_framework') {
    const p = payload as any;
    if (!p.framework_headline?.trim()) errors.push('master_03_framework requires framework_headline.');
    if (!p.framework_step_1?.trim()) errors.push('master_03_framework requires framework_step_1.');
    if (!p.framework_description_1?.trim()) errors.push('master_03_framework requires framework_description_1.');
    if (!p.framework_step_2?.trim()) errors.push('master_03_framework requires framework_step_2.');
    if (!p.framework_description_2?.trim()) errors.push('master_03_framework requires framework_description_2.');
    if (!p.framework_step_3?.trim()) errors.push('master_03_framework requires framework_step_3.');
    if (!p.framework_description_3?.trim()) errors.push('master_03_framework requires framework_description_3.');
    if (!p.framework_summary?.trim()) errors.push('master_03_framework requires framework_summary.');
  }

  if (payload.template_id === 'master_05_data_signal') {
    const p = payload as any;
    if (!p.data_headline?.trim()) errors.push('master_05_data_signal requires data_headline.');
    if (!p.metric?.trim()) errors.push('master_05_data_signal requires metric.');
    if (!p.metric_label?.trim()) errors.push('master_05_data_signal requires metric_label.');
    if (!p.short_context?.trim()) errors.push('master_05_data_signal requires short_context.');
  }

  if (payload.template_id === 'master_07_comparison') {
    const p = payload as any;
    if (!p.comparison_headline?.trim()) errors.push('master_07_comparison requires comparison_headline.');
    if (!p.before_point_1?.trim()) errors.push('master_07_comparison requires before_point_1.');
    if (!p.after_point_1?.trim()) errors.push('master_07_comparison requires after_point_1.');
    if (!p.before_point_2?.trim()) errors.push('master_07_comparison requires before_point_2.');
    if (!p.after_point_2?.trim()) errors.push('master_07_comparison requires after_point_2.');
    if (!p.before_point_3?.trim()) errors.push('master_07_comparison requires before_point_3.');
    if (!p.after_point_3?.trim()) errors.push('master_07_comparison requires after_point_3.');
    if (!p.comparison_summary?.trim()) errors.push('master_07_comparison requires comparison_summary.');
  }

  if (payload.template_id === 'master_08_announcement') {
    const p = payload as any;
    if (!p.announcement_headline?.trim()) errors.push('master_08_announcement requires announcement_headline.');
    if (!p.announcement_message?.trim()) errors.push('master_08_announcement requires announcement_message.');
  }

  if (payload.template_id === 'master_10_testimonial') {
    const p = payload as any;
    if (!p.client_name?.trim()) errors.push('master_10_testimonial requires client_name.');
    if (!p.company_role?.trim()) errors.push('master_10_testimonial requires company_role.');
    if (!p.quote?.trim()) errors.push('master_10_testimonial requires quote.');

    const hasPhoto = Boolean(p.client_photo_id);
    const hasLogo = Boolean(p.client_logo_id);
    if (hasPhoto && hasLogo) {
      errors.push('master_10_testimonial POLICY ERROR: Exactly ONE of client_photo_id OR client_logo_id is allowed. Both were provided.');
    }
    if (!hasPhoto && !hasLogo) {
      errors.push('master_10_testimonial POLICY ERROR: Exactly ONE of client_photo_id OR client_logo_id is required. Neither was provided.');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function performQualityCheck(
  payload: TemplatePayload,
  bgRecord: AssetRecord,
  svgString: string,
  pngBuffer: Buffer,
  durationMs: number
): QAResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (bgRecord.background_source === 'prototype_unresolved') {
    warnings.push('Background is marked prototype_unresolved.');
  }

  if (!svgString.includes('width="1080"') || !svgString.includes('height="1080"')) {
    errors.push('SVG dimensions do not match 1080x1080 contract.');
  }

  if (pngBuffer.length < 100 || pngBuffer[0] !== 0x89 || pngBuffer[1] !== 0x50) {
    errors.push('Rendered PNG buffer is corrupt or invalid.');
  }

  return {
    passed: errors.length === 0,
    template_id: payload.template_id,
    width: 1080,
    height: 1080,
    background_info: {
      background_id: bgRecord.asset_id,
      source_type: bgRecord.background_source || 'code',
      is_code_defined: bgRecord.background_source === 'code',
      provenance: bgRecord.provenance || 'Code-defined DigiXPro background system',
    },
    errors,
    warnings,
    telemetry: {
      render_time_ms: durationMs,
      svg_size_bytes: Buffer.byteLength(svgString, 'utf8'),
      png_size_bytes: pngBuffer.length,
      headline_length: 0,
      supporting_text_length: 0,
    },
  };
}
