import React from 'react';
import { Metadata } from 'next';
import BuySecondhandBookClient from './BuySecondhandBookClient';

export const metadata: Metadata = {
  title: 'Buy Secondhand Book Commerce OS Evidence | DigiXPro',
  description: 'Production evidence for Buy Secondhand Book circular commerce platform and operating system.',
  alternates: {
    canonical: 'https://digixpro.in/evidence/buy-secondhand-book',
  },
  openGraph: {
    title: 'Buy Secondhand Book Commerce OS Evidence | DigiXPro',
    description: 'Production evidence for Buy Secondhand Book circular commerce platform and operating system.',
    url: 'https://digixpro.in/evidence/buy-secondhand-book',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Buy Secondhand Book Commerce OS Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Secondhand Book Commerce OS Evidence | DigiXPro',
    description: 'Production evidence for Buy Secondhand Book circular commerce platform.',
    images: ['/twitter-image.png'],
  },
};

export default function BuySecondhandBookEvidence() {
  return <BuySecondhandBookClient />;
}