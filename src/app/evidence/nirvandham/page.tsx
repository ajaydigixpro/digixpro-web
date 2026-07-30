import React from 'react';
import { Metadata } from 'next';
import NirvandhamClient from './NirvandhamClient';

export const metadata: Metadata = {
  title: 'Nirvandham Platform Architecture Evidence | DigiXPro',
  description: 'Production evidence for Nirvandham digital platform, community OS, and workflow infrastructure.',
  alternates: {
    canonical: 'https://digixpro.in/evidence/nirvandham',
  },
  openGraph: {
    title: 'Nirvandham Platform Architecture Evidence | DigiXPro',
    description: 'Production evidence for Nirvandham digital platform, community OS, and workflow infrastructure.',
    url: 'https://digixpro.in/evidence/nirvandham',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Nirvandham Platform Architecture Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nirvandham Platform Architecture Evidence | DigiXPro',
    description: 'Production evidence for Nirvandham digital platform and workflow infrastructure.',
    images: ['/twitter-image.png'],
  },
};

export default function NirvandhamEvidence() {
  return <NirvandhamClient />;
}