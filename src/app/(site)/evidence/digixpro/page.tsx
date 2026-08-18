import React from 'react';
import { Metadata } from 'next';
import DigiXProClient from './DigiXProClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';

export const metadata: Metadata = {
  title: 'DigiXPro Architecture Evidence | Autonomous Production Systems',
  description: 'Technical architecture breakdown of DigiXPro self-architecture: multilingual 24/7 AI Assist concierge, multi-model automated publishing pipelines, and compounding engineering IP.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/digixpro',
  },
  openGraph: {
    title: 'DigiXPro Architecture Evidence | Autonomous Production Systems',
    description: 'Technical architecture breakdown of DigiXPro self-architecture: multilingual 24/7 AI Assist concierge, multi-model automated publishing pipelines, and compounding engineering IP.',
    url: 'https://www.digixpro.in/evidence/digixpro',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'DigiXPro Architecture Evidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiXPro Architecture Evidence | Autonomous Production Systems',
    description: 'Technical architecture breakdown of DigiXPro self-architecture: multilingual AI concierge and multi-model publishing pipeline.',
    images: ['/twitter-image.png'],
  },
};

export default function DigiXProArchitecture() {
  return (
    <>
      <DigiXProClient />
      <StickyMobileCTA />
    </>
  );
}
