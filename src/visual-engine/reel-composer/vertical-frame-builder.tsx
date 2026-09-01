import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { loadProductionFonts } from '../renderer/font-loader';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';

export async function composeVerticalReelSlide(
  feedImageBase64DataUri: string,
  slideIndex: number,
  totalSlides: number,
  topicTitle: string
): Promise<Buffer> {
  const fonts = loadProductionFonts();

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(circle at 50% 30%, #ffffff 0%, #f8fafc 55%, #eef2f6 100%)',
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <line x1="80" y1="200" x2="1000" y2="200" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="80" y1="1720" x2="1000" y2="1720" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="540" cy="960" r="580" stroke="#009E73" strokeWidth="1" strokeOpacity="0.08" />
        <circle cx="540" cy="960" r="720" stroke="#009E73" strokeWidth="1" strokeOpacity="0.04" />
      </svg>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 110,
          left: 80,
          right: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <BrandLogo theme="dark" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CategoryBadge text="WEEKLY RECAP" />
          <div
            style={{
              display: 'flex',
              marginLeft: 14,
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: 20,
              color: '#007953',
              letterSpacing: '1px',
            }}
          >
            {`${slideIndex + 1} / ${totalSlides}`}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 380,
          left: 40,
          width: 1000,
          height: 1000,
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
          border: '2px solid #e2e8f0',
        }}
      >
        <img
          src={feedImageBase64DataUri}
          alt="Feed Post"
          style={{
            width: 1000,
            height: 1000,
            objectFit: 'contain',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 1440,
          left: 80,
          width: 920,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 32,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.25,
            maxWidth: 880,
          }}
        >
          {topicTitle}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 14,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 20,
            color: '#007953',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          DIGIXPRO ARCHITECTURE INTELLIGENCE
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 1080,
          height: 90,
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 22,
            color: '#ffffff',
            letterSpacing: '3px',
          }}
        >
          DigiXPro.in
        </div>
      </div>
    </div>
  );

  const svg = await satori(element as any, {
    width: 1080,
    height: 1920,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1080 },
    shapeRendering: 2,
    textRendering: 2,
    imageRendering: 0,
  });

  return resvg.render().asPng();
}
