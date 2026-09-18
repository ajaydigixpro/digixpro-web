import React from 'react';
import fs from 'fs';
import path from 'path';

export interface TriangleMotifProps {
  color?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

// Canonical physical SVG asset path
const ASSET_RELATIVE_PATH = 'src/visual-engine/assets/icons/digixpro_triangle_motif.svg';

let cachedSvgContent: string | null = null;

function getRawSvg(): string {
  if (cachedSvgContent) return cachedSvgContent;

  const candidatePaths = [
    path.resolve(process.cwd(), ASSET_RELATIVE_PATH),
    path.resolve(__dirname, '../assets/icons/digixpro_triangle_motif.svg'),
    path.resolve(process.cwd(), 'digixpro-web', ASSET_RELATIVE_PATH),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      cachedSvgContent = fs.readFileSync(p, 'utf8');
      return cachedSvgContent;
    }
  }

  throw new Error(`[TriangleMotif] SVG asset not found in candidate paths: ${candidatePaths.join(', ')}`);
}

/**
 * Reusable SVG Asset Component for DigiXPro Triangle Motif
 * Loads the physical SVG asset from disk and enables dynamic recoloring and distortion-free resizing.
 */
export const TriangleMotif: React.FC<TriangleMotifProps> = ({
  color = '#6EE7B7',
  width = 120,
  height = 81,
  style,
}) => {
  const rawSvg = getRawSvg();

  // Recolor the SVG asset independently from the rest of the template
  const recoloredSvg = rawSvg
    .replace(/fill="#[0-9a-fA-F]+"/g, `fill="${color}"`)
    .replace(/style="[^"]*fill:[^;"]+;?/g, (m) => m.replace(/fill:[^;"]+;?/, `fill:${color};`));

  const base64Uri = `data:image/svg+xml;base64,${Buffer.from(recoloredSvg).toString('base64')}`;

  return (
    <img
      src={base64Uri}
      alt="DigiXPro Triangle Motif"
      width={width}
      height={height}
      style={{
        width,
        height,
        objectFit: 'contain',
        ...style,
      }}
    />
  );
};
