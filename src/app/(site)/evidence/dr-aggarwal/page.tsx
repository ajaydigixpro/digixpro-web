import React from 'react';
import { Metadata } from 'next';
import DrAggarwalClient from './DrAggarwalClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';

export const metadata: Metadata = {
  title: 'Dr Aggarwal Physio Centre Case Study',
  description: 'Zero-to-One digital footprint and patient acquisition system for Dr Aggarwal Physio Centre — a physiotherapy clinic network operating two locations in Noida, including the specialist 360 Neck & Shoulder clinic.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/dr-aggarwal',
  },
  openGraph: {
    title: 'Dr Aggarwal Physio Centre Case Study | DigiXPro Evidence',
    description: 'Zero-to-One digital footprint and patient acquisition system across two Noida clinic locations: draggarwalphysio.com and 360neckshoulder.com.',
    url: 'https://www.digixpro.in/evidence/dr-aggarwal',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Dr Aggarwal Physio Centre Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Aggarwal Physio Centre Case Study | DigiXPro Evidence',
    description: 'Zero-to-One digital footprint across two clinic locations in Noida. Top 3 rank for physiotherapy keywords.',
    images: ['/twitter-image.png'],
  },
};

export default function DrAggarwalEvidence() {
  return (
    <>
      <DrAggarwalClient />
      <StickyMobileCTA />
    </>
  );
}