import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { EligibleFeedImage, ApprovedAudioTrack, ReelMetadata } from './types';

const FFMPEG_PATH = 'C:/Users/shukl/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-full_build/bin/ffmpeg.exe';
const FFPROBE_PATH = 'C:/Users/shukl/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-full_build/bin/ffprobe.exe';

export interface ComposeReelParams {
  slideImagePaths: string[];
  eligibleFeedImages: EligibleFeedImage[];
  audioTrack: ApprovedAudioTrack;
  outputMp4Path: string;
  secondsPerSlide?: number;
  transitionDuration?: number;
  fps?: number;
}

export function buildFfmpegReel(params: ComposeReelParams): ReelMetadata {
  const {
    slideImagePaths,
    eligibleFeedImages,
    audioTrack,
    outputMp4Path,
    secondsPerSlide = 2.5,
    transitionDuration = 0.4,
    fps = 30,
  } = params;

  fs.mkdirSync(path.dirname(outputMp4Path), { recursive: true });

  const numSlides = slideImagePaths.length;
  const totalDurationSeconds = numSlides * secondsPerSlide - (numSlides - 1) * transitionDuration;

  console.log('[FFmpegEngine] Composing ' + numSlides + ' slides into ' + totalDurationSeconds + 's MP4 video...');

  let inputArgs = '';
  slideImagePaths.forEach((p) => {
    inputArgs += '-loop 1 -t ' + secondsPerSlide + ' -i "' + p + '" ';
  });

  inputArgs += '-i "' + audioTrack.file_path + '" ';

  let filterGraph = '';
  for (let i = 0; i < numSlides; i++) {
    filterGraph += '[' + i + ':v]scale=1080:1920,setsar=1,fps=' + fps + ',format=yuv420p[v' + i + ']; ';
  }

  let lastStream = 'v0';
  let offset = secondsPerSlide - transitionDuration;
  for (let i = 1; i < numSlides; i++) {
    const nextStream = 'v' + i;
    const outStream = 'x' + i;
    filterGraph += '[' + lastStream + '][' + nextStream + ']xfade=transition=fade:duration=' + transitionDuration + ':offset=' + offset.toFixed(2) + '[' + outStream + ']; ';
    lastStream = outStream;
    offset += secondsPerSlide - transitionDuration;
  }

  const fadeOutStart = (totalDurationSeconds - 1.0).toFixed(2);
  const audioFilter = '[' + numSlides + ':a]atrim=0:' + totalDurationSeconds.toFixed(2) + ',volume=0.45,afade=t=in:st=0:d=0.5,afade=t=out:st=' + fadeOutStart + ':d=1.0[aout]';
  filterGraph += audioFilter;

  const ffmpegCmd = '"' + FFMPEG_PATH + '" -y ' + inputArgs + '-filter_complex "' + filterGraph + '" -map "[' + lastStream + ']" -map "[aout]" -c:v libx264 -pix_fmt yuv420p -preset medium -crf 20 -c:a aac -b:a 192k -movflags +faststart "' + outputMp4Path + '"';

  console.log('[FFmpegEngine] Executing FFmpeg rendering command...');
  execSync(ffmpegCmd, { stdio: 'pipe' });

  const stat = fs.statSync(outputMp4Path);
  console.log('[FFmpegEngine] Successfully compiled MP4: ' + outputMp4Path + ' (' + stat.size + ' bytes)');

  return {
    reel_id: 'digixpro_weekly_reel_' + Date.now(),
    week_identifier: '2026-W36',
    created_at: new Date().toISOString(),
    dimensions: {
      width: 1080,
      height: 1920,
      aspect_ratio: '9:16',
    },
    duration_seconds: parseFloat(totalDurationSeconds.toFixed(2)),
    fps,
    video_codec: 'h264',
    audio_codec: 'aac',
    selected_images: eligibleFeedImages,
    selected_audio: audioTrack,
    background_family_variant: 'radial_focus_vertical_extension',
    reel_caption_status: 'PENDING',
    output_mp4_path: outputMp4Path,
    mp4_size_bytes: stat.size,
  };
}

export function probeMediaFile(filePath: string): any {
  const cmd = '"' + FFPROBE_PATH + '" -v quiet -print_format json -show_format -show_streams "' + filePath + '"';
  const output = execSync(cmd, { encoding: 'utf-8' });
  return JSON.parse(output);
}
