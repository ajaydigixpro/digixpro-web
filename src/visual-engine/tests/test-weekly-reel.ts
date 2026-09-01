import path from 'path';
import fs from 'fs';
import { discoverEligibleFeedImages } from '../reel-composer/feed-collector';
import { getApprovedAudioTrack } from '../reel-composer/audio-selector';
import { composeVerticalReelSlide } from '../reel-composer/vertical-frame-builder';
import { buildFfmpegReel } from '../reel-composer/ffmpeg-engine';
import { runReelQA } from '../reel-composer/reel-qa';

async function executeWeeklyReel() {
  console.log('====================================================');
  console.log('DIGIXPRO WEEKLY REEL COMPOSER — EXECUTION & QA');
  console.log('====================================================\n');

  const outputBaseDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/weekly_reel');
  const slidesDir = path.join(outputBaseDir, 'vertical_slides');
  const qaFramesDir = path.join(outputBaseDir, 'qa_frames');
  const finalMp4Path = path.join(outputBaseDir, 'digixpro_weekly_reel_2026_w36.mp4');

  fs.mkdirSync(slidesDir, { recursive: true });
  fs.mkdirSync(qaFramesDir, { recursive: true });

  // STEP 1 & 2: DISCOVER & SELECT ELIGIBLE FEED IMAGES
  console.log('--- Step 1 & 2: Discover & Select Eligible Feed Images ---');
  const selectedImages = discoverEligibleFeedImages();
  console.log(`Discovered ${selectedImages.length} eligible Feed images (Chronological Order):`);
  selectedImages.forEach((img, idx) => {
    console.log(` [Slide ${idx + 1}] ID: ${img.id} | Template: ${img.template_id} | Published: ${img.published_at} | Title: "${img.title}"`);
  });

  // STEP 3 & 4: BUILD VERTICAL 1080x1920 BACKGROUND FAMILY SLIDES
  console.log('\n--- Step 3 & 4: Build Vertical 1080x1920 BackgroundFamily Slides ---');
  const slidePngPaths: string[] = [];

  for (let i = 0; i < selectedImages.length; i++) {
    const img = selectedImages[i];
    const imageBuf = fs.readFileSync(img.source_file_path);
    const base64DataUri = `data:image/png;base64,${imageBuf.toString('base64')}`;

    console.log(`Composing Slide ${i + 1} / ${selectedImages.length} (${img.template_id})...`);
    const verticalPngBuf = await composeVerticalReelSlide(
      base64DataUri,
      i,
      selectedImages.length,
      img.title
    );

    const slidePath = path.join(slidesDir, `slide_${i + 1}_${img.template_id}.png`);
    fs.writeFileSync(slidePath, verticalPngBuf);
    slidePngPaths.push(slidePath);
    console.log(` -> Saved vertical 1080x1920 slide: ${slidePath} (${verticalPngBuf.length} bytes)`);
  }

  // STEP 5: SELECT APPROVED AUDIO TRACK
  console.log('\n--- Step 5: Select Approved Audio Track ---');
  const audioTrack = getApprovedAudioTrack('audio_pixabay_sitar_instrumental_583288');
  console.log(`Selected Audio Track:`);
  console.log(` - Track ID: ${audioTrack.track_id}`);
  console.log(` - Title: "${audioTrack.title}" by ${audioTrack.artist}`);
  console.log(` - Source: ${audioTrack.source} (${audioTrack.license_type})`);
  console.log(` - File: ${audioTrack.file_path} (${audioTrack.size_bytes} bytes)`);
  console.log(` - SHA256: ${audioTrack.sha256}`);
  console.log(` - Approval Status: APPROVED by ${audioTrack.approved_by}`);

  // STEP 6 & 7: COMPOSE VIDEO USING FFMPEG
  console.log('\n--- Step 6 & 7: Compose MP4 Reel via FFmpeg ---');
  const reelMetadata = buildFfmpegReel({
    slideImagePaths: slidePngPaths,
    eligibleFeedImages: selectedImages,
    audioTrack,
    outputMp4Path: finalMp4Path,
    secondsPerSlide: 2.6,
    transitionDuration: 0.4,
    fps: 30,
  });

  console.log('\nReel Metadata:');
  console.log(JSON.stringify(reelMetadata, null, 2));

  // STEP 8: RUN TECHNICAL & VISUAL QA
  console.log('\n--- Step 8: Execute Technical & Visual QA ---');
  const qaResult = runReelQA(reelMetadata, qaFramesDir);
  console.log('QA Result:');
  console.log(JSON.stringify(qaResult, null, 2));

  console.log('\n====================================================');
  console.log(`WEEKLY REEL QA PASSED: ${qaResult.passed ? 'YES (100% PASS)' : 'FAILED'}`);
  console.log('====================================================\n');
}

executeWeeklyReel().catch(console.error);
