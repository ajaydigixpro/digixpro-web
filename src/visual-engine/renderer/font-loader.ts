import fs from 'fs';
import path from 'path';

export interface FontConfig {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 600 | 700;
  style: 'normal' | 'italic';
}

let cachedFonts: FontConfig[] | null = null;

export function loadProductionFonts(): FontConfig[] {
  if (cachedFonts) {
    return cachedFonts;
  }

  const fontDir = path.resolve(process.cwd(), 'src/visual-engine/fonts');
  const resolvedDir = fs.existsSync(fontDir)
    ? fontDir
    : path.resolve(process.cwd(), 'digixpro-web/src/visual-engine/fonts');

  const regularPath = path.join(resolvedDir, 'Poppins-Regular.ttf');
  const mediumPath = path.join(resolvedDir, 'Poppins-Medium.ttf');
  const semiBoldPath = path.join(resolvedDir, 'Poppins-SemiBold.ttf');
  const boldPath = path.join(resolvedDir, 'Poppins-Bold.ttf');
  const italicPath = path.join(resolvedDir, 'Poppins-Italic.ttf');

  if (!fs.existsSync(regularPath)) {
    throw new Error(`[FontLoader] Required font missing: ${regularPath}`);
  }

  cachedFonts = [
    {
      name: 'Poppins',
      data: fs.readFileSync(regularPath),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Poppins',
      data: fs.readFileSync(mediumPath),
      weight: 500,
      style: 'normal',
    },
    {
      name: 'Poppins',
      data: fs.readFileSync(semiBoldPath),
      weight: 600,
      style: 'normal',
    },
    {
      name: 'Poppins',
      data: fs.readFileSync(boldPath),
      weight: 700,
      style: 'normal',
    },
    {
      name: 'Poppins',
      data: fs.readFileSync(italicPath),
      weight: 400,
      style: 'italic',
    },
  ];

  return cachedFonts;
}
