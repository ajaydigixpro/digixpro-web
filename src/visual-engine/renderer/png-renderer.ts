import { Resvg } from '@resvg/resvg-js';
import { TemplatePayload, RenderOptions, RenderOutput } from './types';
import { renderTemplateToSvg } from './satori-renderer';
import { performQualityCheck } from './qa';

export async function renderTemplateToPng(
  payload: TemplatePayload,
  options?: RenderOptions
): Promise<RenderOutput> {
  const startTime = Date.now();

  const width = options?.width || 1080;
  const height = options?.height || 1080;

  // 1. Render JSX to SVG via Satori
  const { svg, bgRecord } = await renderTemplateToSvg(payload, options);

  // 2. Convert SVG to PNG via resvg-js (Rust backend)
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
    background: '#ffffff',
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const durationMs = Date.now() - startTime;

  // 3. QA Engine Quality Check
  const qa = performQualityCheck(payload, bgRecord, svg, pngBuffer, durationMs);

  return {
    svg,
    png: pngBuffer,
    qa,
  };
}
