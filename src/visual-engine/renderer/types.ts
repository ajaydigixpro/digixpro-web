export type TemplateId =
  | 'master_01_insight'
  | 'master_02_problem_solution'
  | 'master_03_framework'
  | 'master_04_architecture'
  | 'master_05_data_signal'
  | 'master_06_case_study'
  | 'master_07_comparison'
  | 'master_08_announcement'
  | 'master_09_occasion'
  | 'master_10_testimonial';

export type AssetType =
  | 'brand_logo'
  | 'partner_logo'
  | 'client_logo'
  | 'client_photo'
  | 'icon'
  | 'background'
  | 'font'
  | 'bottom_zone'
  | 'side_column'
  | 'footer'
  | 'motif'
  | 'central_focal'
  | 'micro_element'
  | 'corner_accent'
  | 'mid_canvas';

export type BackgroundSource = 'code' | 'approved_asset' | 'prototype_unresolved';

export type BackgroundFamilyVariant =
  | 'base_light'
  | 'radial_focus'
  | 'geometric_subtle'
  | 'pattern_subtle'
  | 'editorial_desk_code'
  | 'signal_subtle'
  | 'announcement_subtle';

export interface AssetRecord {
  asset_id: string;
  asset_name?: string;
  asset_type: AssetType;
  primary_category?: string;
  semantic_family?: string[] | string;
  orientation?: 'wide' | 'vertical' | 'square' | 'compact' | 'corner' | string;
  size_class?: 'S' | 'M' | 'L' | 'W' | 'T' | string;
  role?: string;
  visual_weight?: 'light' | 'light_medium' | 'medium' | 'medium_strong' | 'strong' | 'hero' | string;
  density?: 'low' | 'medium' | 'high' | string;
  preferred_zone?: string;
  best_for?: string[] | string;
  compatible_content_types?: string[];
  allowed_templates?: string[];
  approved_palette?: string[];
  background_source?: BackgroundSource;
  provenance?: string;
  file_path?: string;
  width_px?: number;
  height_px?: number;
  aspect_ratio?: number;
  transparent?: boolean;
  theme?: string;
  keywords?: string[];
  approved: boolean;
  status?: 'active' | 'quarantined' | 'rejected' | string;
  approved_by?: string | null;
  approved_at?: string | null;
  notes?: string;
  reason?: string;
  superseded_by?: string;
  compatible_zones?: string[];
  composition_role?: string;
  nature?: string;
}

export interface Master01Payload {
  template_id: 'master_01_insight';
  insight_headline: string;
  supporting_text: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
  reference_note?: string;
}

export interface Master02Payload {
  template_id: 'master_02_problem_solution';
  problem_headline: string;
  problem_supporting_text: string;
  solution_headline: string;
  solution_supporting_text: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
  reference_note?: string;
}

export interface Master03Payload {
  template_id: 'master_03_framework';
  framework_headline: string;
  framework_summary: string;
  framework_step_1: string;
  framework_description_1: string;
  framework_step_2: string;
  framework_description_2: string;
  framework_step_3: string;
  framework_description_3: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master04Payload {
  template_id: 'master_04_architecture';
  architecture_headline: string;
  architecture_step_1: string;
  architecture_detail_1: string;
  architecture_step_2: string;
  architecture_detail_2: string;
  architecture_step_3: string;
  architecture_detail_3: string;
  architecture_step_4: string;
  architecture_detail_4: string;
  architecture_summary: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master05Payload {
  template_id: 'master_05_data_signal';
  data_headline: string;
  metric: string;
  metric_label: string;
  short_context: string;
  source_period_context?: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master06Payload {
  template_id: 'master_06_case_study';
  case_study_headline: string;
  client_project_type: string;
  short_challenge: string;
  what_digixpro_changed: string;
  verified_result_outcome: string;
  case_study_summary: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master07Payload {
  template_id: 'master_07_comparison';
  comparison_headline: string;
  client_project_type?: string;
  before_heading?: string;
  after_heading?: string;
  before_point_1: string;
  after_point_1: string;
  before_point_2: string;
  after_point_2: string;
  before_point_3: string;
  after_point_3: string;
  comparison_summary: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master08Payload {
  template_id: 'master_08_announcement';
  announcement_headline: string;
  announcement_subtitle?: string;
  announcement_message: string;
  announcement_supporting_detail?: string;
  announcement_date_context?: string;
  partner_logo_id?: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master09Payload {
  template_id: 'master_09_occasion';
  occasion_name: string;
  greeting_headline: string;
  relevant_message: string;
  line_message: string;
  date_context?: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export interface Master10Payload {
  template_id: 'master_10_testimonial';
  client_name: string;
  company_role: string;
  quote: string;
  optional_context?: string;
  client_photo_id?: string;
  client_logo_id?: string;
  category_badge_text?: string;
  background_id?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export type TemplatePayload =
  | Master01Payload
  | Master02Payload
  | Master03Payload
  | Master04Payload
  | Master05Payload
  | Master06Payload
  | Master07Payload
  | Master08Payload
  | Master09Payload
  | Master10Payload
  | { template_id: TemplateId; [key: string]: any };

export interface RenderOptions {
  width?: number;
  height?: number;
  debug?: boolean;
  allowPrototypeBackground?: boolean;
}

export interface QAResult {
  passed: boolean;
  template_id: TemplateId;
  width: number;
  height: number;
  background_info: {
    background_id: string;
    source_type: BackgroundSource;
    is_code_defined: boolean;
    provenance: string;
  };
  errors: string[];
  warnings: string[];
  telemetry: {
    render_time_ms: number;
    svg_size_bytes: number;
    png_size_bytes: number;
    headline_length: number;
    supporting_text_length: number;
  };
}

export interface RenderOutput {
  svg: string;
  png: Buffer;
  qa: QAResult;
}
