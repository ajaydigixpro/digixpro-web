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
  | 'font';

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
  asset_type: AssetType;
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
  approved_by?: string | null;
  approved_at?: string | null;
  notes?: string;
}

export interface Master01Payload {
  template_id: 'master_01_insight';
  insight_headline: string;
  supporting_text: string;
  category_badge_text?: string;
  background_id?: string;
}

export interface Master02Payload {
  template_id: 'master_02_problem_solution';
  problem_headline: string;
  problem_supporting_text: string;
  solution_headline: string;
  solution_supporting_text: string;
  category_badge_text?: string;
  background_id?: string;
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
}

export type TemplatePayload =
  | Master01Payload
  | Master02Payload
  | Master03Payload
  | Master05Payload
  | Master07Payload
  | Master08Payload
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
