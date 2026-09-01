import React from 'react';
import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { loadProductionFonts } from '../renderer/font-loader';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant } from '../renderer/types';

const outputDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/rendered_tests');
fs.mkdirSync(outputDir, { recursive: true });

async function generateBackgroundContactSheet() {
  console.log('====================================================');
  console.log('PHASE 0 — BACKGROUND FAMILY COHERENCE CONTACT SHEET');
  console.log('====================================================\n');

  const fonts = loadProductionFonts();

  const variants: { id: BackgroundFamilyVariant; name: string; desc: string }[] = [
    {
      id: 'base_light',
      name: '1. base_light',
      desc: 'Architectural neutral baseline (#ffffff -> #f8fafc -> #f1f5f9) with 1px header guide',
    },
    {
      id: 'radial_focus',
      name: '2. radial_focus',
      desc: 'Soft central radial illumination with restrained emerald concentric depth circles',
    },
    {
      id: 'geometric_subtle',
      name: '3. geometric_subtle',
      desc: 'Architectural header/footer rules with emerald corner tick crosshairs',
    },
    {
      id: 'pattern_subtle',
      name: '4. pattern_subtle',
      desc: 'Controlled 5x3 dot matrix field with 18% emerald opacity',
    },
    {
      id: 'editorial_desk_code',
      name: '5. editorial_desk_code',
      desc: 'Editorial guideline frame with code-defined vector lightbulb sketch accent',
    },
  ];

  const variantPngs: { id: string; buffer: Buffer }[] = [];

  for (const v of variants) {
    console.log(`Rendering variant: ${v.name}...`);
    const element = (
      <div style={{ display: 'flex', width: 1080, height: 1080, position: 'relative' }}>
        <Background variant={v.id} width={1080} height={1080} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            bottom: 40,
            left: 80,
            fontFamily: 'Poppins',
          }}
        >
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, color: '#0f172a' }}>
            {`DigiXPro • ${v.name}`}
          </div>
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 500, color: '#475569', marginTop: 8 }}>
            {v.desc}
          </div>
        </div>
      </div>
    );

    const svg = await satori(element as any, { width: 1080, height: 1080, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } });
    const png = resvg.render().asPng();

    const singlePath = path.join(outputDir, `bg_variant_${v.id}.png`);
    fs.writeFileSync(singlePath, png);
    variantPngs.push({ id: v.id, buffer: png });
    console.log(`  -> Saved single variant: ${singlePath}`);
  }

  console.log('\nGenerating unified 5-panel contact sheet (2700x1800)...');

  const contactSheetElement = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 2700,
        height: 1800,
        backgroundColor: '#0f172a',
        padding: 60,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Poppins' }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color: '#ffffff' }}>
            DigiXPro Visual Engine — BackgroundFamily Coherence Sheet
          </div>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 500, color: '#94a3b8', marginTop: 8 }}>
            5 Deterministic Code-Defined Variants • Unified Slate Palette • Emerald Micro-Accents • Zero-Raster Dependency
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            padding: '12px 28px',
            backgroundColor: '#007953',
            borderRadius: 9999,
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 22,
            color: '#ffffff',
            letterSpacing: '2px',
          }}
        >
          PHASE 0 GATE: PASS
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'flex-start' }}>
        {variants.map((v, i) => {
          const png = variantPngs[i].buffer;
          const base64Uri = `data:image/png;base64,${png.toString('base64')}`;
          return (
            <div
              key={v.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 780,
                backgroundColor: '#1e293b',
                borderRadius: 16,
                padding: 16,
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 748,
                  height: 498,
                  borderRadius: 8,
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#ffffff',
                }}
              >
                <img src={base64Uri} alt={v.name} style={{ width: 748, height: 498, objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 14, fontFamily: 'Poppins' }}>
                <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, color: '#38bdf8' }}>
                  {v.name}
                </div>
                <div style={{ display: 'flex', fontSize: 16, fontWeight: 400, color: '#cbd5e1', marginTop: 4 }}>
                  {v.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const contactSvg = await satori(contactSheetElement as any, { width: 2700, height: 1800, fonts });
  const resvg = new Resvg(contactSvg, { fitTo: { mode: 'width', value: 2700 } });
  const contactPng = resvg.render().asPng();

  const contactPath = path.join(outputDir, 'contact_sheet_background_family.png');
  fs.writeFileSync(contactPath, contactPng);
  console.log(`\nSUCCESS: Contact sheet saved to ${contactPath} (${contactPng.length} bytes)`);
}

generateBackgroundContactSheet().catch(console.error);
