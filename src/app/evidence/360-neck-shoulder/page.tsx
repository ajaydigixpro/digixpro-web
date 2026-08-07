import React from 'react';
import { Metadata } from 'next';
import NeckShoulderClient from './NeckShoulderClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';

export const metadata: Metadata = {
  title: '360 Neck & Shoulder Care Case Study',
  description: 'Specialised healthcare web design, visual identity, and patient acquisition engine for 360 Neck & Shoulder clinic in Noida — 360neckshoulder.com.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/360-neck-shoulder',
  },
  openGraph: {
    title: '360 Neck & Shoulder Care Case Study | DigiXPro Evidence',
    description: 'Bespoke healthcare web architecture, mobile UI/UX, and local search trust optimization for specialist physiotherapy care.',
    url: 'https://www.digixpro.in/evidence/360-neck-shoulder',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '360 Neck & Shoulder Care Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '360 Neck & Shoulder Care Case Study | DigiXPro Evidence',
    description: 'Bespoke healthcare web architecture and local search trust optimization.',
    images: ['/twitter-image.png'],
  },
};

export default function NeckShoulderEvidence() {
  return (
    <>
      <NeckShoulderClient />
      <StickyMobileCTA />
    </>
  );
}
