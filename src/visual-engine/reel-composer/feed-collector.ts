import path from 'path';
import fs from 'fs';
import { EligibleFeedImage } from './types';

export function discoverEligibleFeedImages(): EligibleFeedImage[] {
  const scratchTestsDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/rendered_tests');
  
  const candidates: EligibleFeedImage[] = [
    {
      id: 'feed_m01_insight_canonical',
      template_id: 'master_01_insight',
      title: 'Decoupling Monoliths for High Throughput',
      source_file_path: path.join(scratchTestsDir, 'case_a_short_en.png'),
      published_at: '2026-08-28T09:00:00.000Z',
      aspect_ratio: '1:1',
      width_px: 1080,
      height_px: 1080,
    },
    {
      id: 'feed_m02_problem_solution_canonical',
      template_id: 'master_02_problem_solution',
      title: 'Eliminating Cloud Inefficiency with Satori Pipelines',
      source_file_path: path.join(scratchTestsDir, 'batch_1', 'm02_canonical.png'),
      published_at: '2026-08-29T09:00:00.000Z',
      aspect_ratio: '1:1',
      width_px: 1080,
      height_px: 1080,
    },
    {
      id: 'feed_m03_framework_canonical',
      template_id: 'master_03_framework',
      title: 'DigiXPro 3-Stage Content Engine Framework',
      source_file_path: path.join(scratchTestsDir, 'batch_1', 'm03_canonical.png'),
      published_at: '2026-08-30T09:00:00.000Z',
      aspect_ratio: '1:1',
      width_px: 1080,
      height_px: 1080,
    },
    {
      id: 'feed_m05_data_signal_canonical',
      template_id: 'master_05_data_signal',
      title: '87% Faster System Throughput Benchmark',
      source_file_path: path.join(scratchTestsDir, 'batch_2', 'm05_canonical.png'),
      published_at: '2026-08-31T09:00:00.000Z',
      aspect_ratio: '1:1',
      width_px: 1080,
      height_px: 1080,
    },
    {
      id: 'feed_m07_comparison_canonical',
      template_id: 'master_07_comparison',
      title: 'Generic SaaS vs Custom Operating System Architecture',
      source_file_path: path.join(scratchTestsDir, 'batch_1', 'm07_canonical.png'),
      published_at: '2026-09-01T09:00:00.000Z',
      aspect_ratio: '1:1',
      width_px: 1080,
      height_px: 1080,
    },
  ];

  const valid = candidates.filter((img) => fs.existsSync(img.source_file_path));

  if (valid.length < 4) {
    throw new Error('Insufficient eligible images for Weekly Reel. Found: ' + valid.length);
  }

  valid.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
  return valid.slice(0, 5);
}
