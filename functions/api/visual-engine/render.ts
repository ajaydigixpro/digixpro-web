import React from 'react';
import { ImageResponse } from 'workers-og';
import { Master01Insight } from '../../../src/visual-engine/templates/master_01_insight';
import { Master01Payload } from '../../../src/visual-engine/renderer/types';

// In-isolate font cache to avoid redundant subrequests
let cachedBold: ArrayBuffer | null = null;
let cachedSemiBold: ArrayBuffer | null = null;

async function getFonts(origin: string) {
  if (!cachedBold) {
    const res = await fetch(`${origin}/fonts/Poppins-Bold.ttf`);
    if (!res.ok) {
      throw new Error(`Failed to load font from ${origin}/fonts/Poppins-Bold.ttf (status ${res.status})`);
    }
    cachedBold = await res.arrayBuffer();
  }

  if (!cachedSemiBold) {
    const res = await fetch(`${origin}/fonts/Poppins-SemiBold.ttf`);
    if (!res.ok) {
      // Fallback to Bold if SemiBold is unreachable
      cachedSemiBold = cachedBold;
    } else {
      cachedSemiBold = await res.arrayBuffer();
    }
  }

  return [
    {
      name: 'Poppins',
      data: cachedBold,
      weight: 700 as const,
      style: 'normal' as const
    },
    {
      name: 'Poppins',
      data: cachedSemiBold,
      weight: 600 as const,
      style: 'normal' as const
    }
  ];
}

export const onRequestGet = async (context: any) => {
  try {
    const url = new URL(context.request.url);

    const headline =
      url.searchParams.get('insight_headline') ||
      url.searchParams.get('headline') ||
      'System Architecture and Engineering Intelligence';
    const supportingText =
      url.searchParams.get('supporting_text') ||
      'Purpose-built architecture eliminates operational friction and scales effortlessly.';
    const category = (
      url.searchParams.get('category_badge_text') ||
      url.searchParams.get('category') ||
      'INSIGHT'
    ).toUpperCase();

    // 1. Fetch & Cache Required Poppins Weights
    const origin = url.origin;
    const fonts = await getFonts(origin);

    // 2. Build Canonical Master01 Payload
    const data: Master01Payload = {
      template_id: 'master_01_insight',
      insight_headline: headline,
      supporting_text: supportingText,
      category_badge_text: category
    };

    // 3. Render Canonical Master01Insight Template
    const element = React.createElement(Master01Insight, {
      data,
      backgroundVariant: 'editorial_desk_code'
    });

    return new ImageResponse(element, {
      width: 1080,
      height: 1080,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*'
      },
      fonts
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

