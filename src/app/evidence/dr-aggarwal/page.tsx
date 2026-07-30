import React from 'react';
import { Metadata } from 'next';
import DrAggarwalClient from './DrAggarwalClient';

export const metadata: Metadata = {
  title: 'Dr Aggarwal Physio Centre Case Study',
  description: 'Zero-to-One digital footprint and patient acquisition system for a leading physiotherapy clinic network in Greater Noida.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/dr-aggarwal',
  },
  openGraph: {
    title: 'Dr Aggarwal Physio Centre Case Study | DigiXPro Evidence',
    description: 'Zero-to-One digital footprint and patient acquisition system for a leading physiotherapy clinic network in Greater Noida.',
    url: 'https://www.digixpro.in/evidence/dr-aggarwal',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Dr Aggarwal Physio Centre Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Aggarwal Physio Centre Case Study | DigiXPro Evidence',
    description: 'Zero-to-One digital footprint and patient acquisition system for a leading physiotherapy clinic network in Greater Noida.',
    images: ['/twitter-image.png'],
  },
};

export default function DrAggarwalEvidence() {
  return <DrAggarwalClient />;
}