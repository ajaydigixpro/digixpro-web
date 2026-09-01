import React from 'react';
import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { loadProductionFonts } from '../renderer/font-loader';
import { LogoFit } from '../components/LogoFit';
import { AssetResolver } from '../renderer/asset-resolver';

const outputDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/rendered_tests');
fs.mkdirSync(outputDir, { recursive: true });

async function runLogoFitTests() {
  console.log('====================================================');
  console.log('PHASE 13 / PHASE 8 — LOGOFIT COMPONENT VERIFICATION');
  console.log('====================================================\n');

  const resolver = new AssetResolver();
  const fonts = loadProductionFonts();

  const drAggarwal = resolver.resolveAsset('master_08_announcement', 'dr_aggarwal_logo', 'partner_logo');
  const scanCentre = resolver.resolveAsset('master_08_announcement', 'scan_centre_logo', 'partner_logo');
  const brandLogo = resolver.resolveAsset('master_01_insight', 'brand_logo_digixpro', 'brand_logo');

  const testConfigs = [
    {
      id: 'logofit_dr_aggarwal',
      name: 'Dr. Aggarwal PhysioCentre Logo (1920x912, Alpha)',
      src: drAggarwal.base64DataUri,
      w: drAggarwal.record.width_px || 1920,
      h: drAggarwal.record.height_px || 912,
      maxW: 400,
      maxH: 180,
    },
    {
      id: 'logofit_scan_centre',
      name: '360 Neck Shoulder Centre Logo (1920x1080)',
      src: scanCentre.base64DataUri,
      w: scanCentre.record.width_px || 1920,
      h: scanCentre.record.height_px || 1080,
      maxW: 400,
      maxH: 180,
    },
    {
      id: 'logofit_brand_digixpro',
      name: 'DigiXPro Brand Logo (1026x308)',
      src: brandLogo.base64DataUri,
      w: brandLogo.record.width_px || 1026,
      h: brandLogo.record.height_px || 308,
      maxW: 400,
      maxH: 180,
    },
    {
      id: 'logofit_omitted_null',
      name: 'Omission Test (Null / No Logo Provided)',
      src: null,
      w: 1920,
      h: 1080,
      maxW: 400,
      maxH: 180,
    },
  ];

  for (const tc of testConfigs) {
    console.log(`[LOGOFIT TEST] Running ${tc.name}...`);

    const element = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 600,
          height: 400,
          backgroundColor: '#0f172a',
          padding: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 20,
            color: '#34d399',
            marginBottom: 20,
          }}
        >
          {tc.name}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: tc.maxW,
            height: tc.maxH,
            border: '2px dashed rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 8,
          }}
        >
          <LogoFit
            imageSrc={tc.src}
            naturalWidth={tc.w}
            naturalHeight={tc.h}
            maxWidth={tc.maxW}
            maxHeight={tc.maxH}
          />
        </div>
      </div>
    );

    const svg = await satori(element as any, {
      width: 600,
      height: 400,
      fonts,
    });

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 600 },
      background: '#0f172a',
    });

    const png = resvg.render().asPng();
    const outPath = path.join(outputDir, `${tc.id}.png`);
    fs.writeFileSync(outPath, png);

    console.log(`  -> Rendered: 600x400 PNG (${png.length} bytes)`);
    console.log(`  -> Saved: ${outPath}`);
    console.log('----------------------------------------------------');
  }

  console.log('\nLogoFit verification tests completed successfully!');
}

runLogoFitTests().catch(console.error);
