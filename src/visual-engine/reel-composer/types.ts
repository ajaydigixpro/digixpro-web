export interface EligibleFeedImage {
  id: string;
  template_id: string;
  title: string;
  source_file_path: string;
  published_at: string;
  aspect_ratio: '1:1';
  width_px: 1080;
  height_px: 1080;
}

export interface ApprovedAudioTrack {
  track_id: string;
  title: string;
  artist: string;
  filename: string;
  file_path: string;
  sha256: string;
  size_bytes: number;
  source: string;
  source_url: string;
  license_type: string;
  license_url: string;
  approved: boolean;
  approved_by: string;
  notes: string;
}

export interface ReelComposerOptions {
  output_dir?: string;
  seconds_per_image?: number;
  transition_duration_seconds?: number;
  fps?: number;
  audio_track_id?: string;
}

export interface ReelMetadata {
  reel_id: string;
  week_identifier: string;
  created_at: string;
  dimensions: {
    width: 1080;
    height: 1920;
    aspect_ratio: '9:16';
  };
  duration_seconds: number;
  fps: number;
  video_codec: 'h264';
  audio_codec: 'aac';
  selected_images: EligibleFeedImage[];
  selected_audio: ApprovedAudioTrack;
  background_family_variant: string;
  reel_caption_status: 'PENDING';
  output_mp4_path: string;
  mp4_size_bytes: number;
}

export interface ReelQAResult {
  passed: boolean;
  reel_id: string;
  video_check: {
    width: number;
    height: number;
    duration: number;
    codec: string;
    fps: number;
    bitrate_kbps: number;
    passed: boolean;
  };
  audio_check: {
    codec: string;
    channels: number;
    sample_rate: number;
    track_id: string;
    passed: boolean;
  };
  content_check: {
    image_count: number;
    no_distortion: boolean;
    background_family_applied: boolean;
    branding_intact: boolean;
    passed: boolean;
  };
  contact_sheet_path?: string;
  errors: string[];
  warnings: string[];
}
