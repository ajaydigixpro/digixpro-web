import React from 'react';
import { Metadata } from 'next';
import ScanCentreClient from './ScanCentreClient';

export const metadata: Metadata = {
  title: 'ScanCentreNearMe Marketplace Architecture Evidence | DigiXPro',
  description: 'Production evidence for ScanCentreNearMe diagnostic marketplace platform, booking workflow, and inventory management.',
  alternates: {
    canonical: 'https://digixpro.in/evidence/scan-centre',
  },
  openGraph: {
    title: 'ScanCentreNearMe Marketplace Architecture Evidence | DigiXPro',
    description: 'Production evidence for ScanCentreNearMe diagnostic marketplace platform, booking workflow, and inventory management.',
    url: 'https://digixpro.in/evidence/scan-centre',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'ScanCentreNearMe Marketplace Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScanCentreNearMe Marketplace Architecture Evidence | DigiXPro',
    description: 'Production evidence for ScanCentreNearMe diagnostic marketplace platform.',
    images: ['/twitter-image.png'],
  },
};

export default function ScanCentreEvidence() {
  return <ScanCentreClient />;
}