import React from 'react';
import { Metadata } from 'next';
import MuktibodhClient from './MuktibodhClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';

export const metadata: Metadata = {
  title: 'Muktibodh Digital Publishing & Knowledge OS Evidence',
  description: 'Production evidence for Muktibodh digital publishing, archiving, and structured knowledge platform architecture.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/muktibodh',
  },
  openGraph: {
    title: 'Muktibodh Digital Publishing & Knowledge OS Evidence | DigiXPro',
    description: 'Production evidence for Muktibodh digital publishing, archiving, and structured knowledge platform architecture.',
    url: 'https://www.digixpro.in/evidence/muktibodh',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Muktibodh Publishing OS Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muktibodh Digital Publishing & Knowledge OS Evidence | DigiXPro',
    description: 'Production evidence for Muktibodh digital publishing platform architecture.',
    images: ['/twitter-image.png'],
  },
};

export default function MuktibodhEvidence() {
  return (
    <>
      <MuktibodhClient />
      <StickyMobileCTA />
    </>
  );
}