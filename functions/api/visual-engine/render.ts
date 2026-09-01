import React from 'react';
import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';

// Master 01 Insight Template JSX
function Master01Insight({ headline, supportingText, category }: { headline: string; supportingText: string; category: string }) {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 1080,
        height: 1080,
        position: 'relative',
        backgroundColor: '#f8fafc',
        backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #f1f5f9 100%)',
      }
    },
    // Background Vector Guide & Editorial Lightbulb
    React.createElement('svg', {
      width: 1080,
      height: 1080,
      viewBox: '0 0 1080 1080',
      fill: 'none',
      style: { position: 'absolute', top: 0, left: 0 }
    },
      React.createElement('line', { x1: 80, y1: 150, x2: 1000, y2: 150, stroke: '#e2e8f0', strokeWidth: 1.2, strokeOpacity: 0.9 }),
      React.createElement('g', { transform: 'translate(930, 145) scale(0.55)', stroke: '#64748b', strokeWidth: 4.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' },
        React.createElement('path', { d: 'M 50 15 C 32 15 20 28 20 45 C 20 58 30 68 35 78 L 35 90 L 65 90 L 65 78 C 70 68 80 58 80 45 C 80 28 68 15 50 15 Z' }),
        React.createElement('path', { d: 'M 38 98 L 62 98' }),
        React.createElement('path', { d: 'M 42 106 L 58 106' }),
        React.createElement('path', { d: 'M 50 5 L 50 0' }),
        React.createElement('path', { d: 'M 22 18 L 16 12' }),
        React.createElement('path', { d: 'M 78 18 L 84 12' }),
        React.createElement('path', { d: 'M 10 45 L 3 45' }),
        React.createElement('path', { d: 'M 90 45 L 97 45' })
      ),
      React.createElement('line', { x1: 80, y1: 950, x2: 1000, y2: 950, stroke: '#e2e8f0', strokeWidth: 1, strokeOpacity: 0.5 })
    ),
    // Header (Brand Logo & Category Badge)
    React.createElement('div', {
      style: {
        display: 'flex',
        position: 'absolute',
        top: 75,
        left: 80,
        right: 80,
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
        React.createElement('svg', { width: 44, height: 44, viewBox: '0 0 100 100', fill: 'none', style: { marginRight: 12 } },
          React.createElement('circle', { cx: 50, cy: 50, r: 42, stroke: '#009E73', strokeWidth: 6 }),
          React.createElement('circle', { cx: 35, cy: 50, r: 22, stroke: '#22c55e', strokeWidth: 5 }),
          React.createElement('circle', { cx: 65, cy: 50, r: 22, stroke: '#22c55e', strokeWidth: 5 }),
          React.createElement('circle', { cx: 50, cy: 50, r: 8, fill: '#009E73' })
        ),
        React.createElement('div', { style: { display: 'flex', fontFamily: 'Poppins', fontWeight: 700, fontSize: 38, color: '#000000', letterSpacing: '-0.5px' } },
          'DigiXPro',
          React.createElement('span', { style: { color: '#009E73' } }, '.')
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          backgroundColor: '#007953',
          color: '#ffffff',
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '2px',
          padding: '6px 16px',
          borderRadius: 4,
          textTransform: 'uppercase'
        }
      }, category)
    ),
    // Center Body (Headline + Supporting Text)
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 240,
        left: 100,
        width: 880,
        height: 620,
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: headline.length > 50 ? 40 : headline.length > 30 ? 44 : 48,
          color: '#000000',
          lineHeight: 1.2,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          maxWidth: 840,
          marginBottom: 36
        }
      }, headline),
      React.createElement('div', {
        style: {
          display: 'flex',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontStyle: 'italic',
          fontSize: 24,
          color: '#0f172a',
          lineHeight: 1.4,
          textAlign: 'center',
          maxWidth: 780,
        }
      }, supportingText)
    ),
    // Footer
    React.createElement('div', {
      style: {
        display: 'flex',
        position: 'absolute',
        bottom: 45,
        left: 80,
        right: 80,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 20,
        color: '#64748b',
        letterSpacing: '1.5px'
      }
    }, 'DigiXPro.in')
  );
}

let wasmInitialized = false;

async function ensureWasmInitialized() {
  if (!wasmInitialized) {
    try {
      const wasmRes = await fetch('https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm');
      await initWasm(wasmRes);
      wasmInitialized = true;
    } catch (e) {
      console.error('WASM Init Error:', e);
    }
  }
}

export const onRequestGet = async (context: any) => {
  try {
    const url = new URL(context.request.url);
    const headline = url.searchParams.get('insight_headline') || url.searchParams.get('headline') || 'System Architecture and Engineering Intelligence';
    const supportingText = url.searchParams.get('supporting_text') || 'Purpose-built architecture eliminates operational friction and scales effortlessly.';
    const category = (url.searchParams.get('category_badge_text') || url.searchParams.get('category') || 'ENGINEERING').toUpperCase();

    // 1. Ensure WASM is initialized
    await ensureWasmInitialized();

    // 2. Fetch Poppins Font
    const origin = url.origin;
    const fontRes = await fetch(origin + '/fonts/Poppins-Bold.ttf');
    const fontData = await fontRes.arrayBuffer();

    // 3. Render JSX to SVG via Satori
    const element = Master01Insight({ headline, supportingText, category });
    const svg = await satori(element, {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          weight: 700,
          style: 'normal'
        }
      ]
    });

    // 4. Convert SVG to PNG via resvg-wasm
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1080 },
      background: '#ffffff'
    });
    const pngBuffer = resvg.render().asPng();

    return new Response(pngBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': pngBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
