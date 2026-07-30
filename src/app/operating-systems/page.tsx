import React from 'react';
import { Metadata } from 'next';
import OperatingSystemsClient from './OperatingSystemsClient';

export const metadata: Metadata = {
  title: 'Business Operating Systems Portfolio | DigiXPro',
  description: 'Production systems, marketplace operating architectures, and enterprise platforms engineered by DigiXPro.',
  alternates: {
    canonical: 'https://digixpro.in/operating-systems',
  },
  openGraph: {
    title: 'Business Operating Systems Portfolio | DigiXPro',
    description: 'Production systems, marketplace operating architectures, and enterprise platforms engineered by DigiXPro.',
    url: 'https://digixpro.in/operating-systems',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'DigiXPro Operating Systems Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Operating Systems Portfolio | DigiXPro',
    description: 'Production systems, marketplace operating architectures, and enterprise platforms engineered by DigiXPro.',
    images: ['/twitter-image.png'],
  },
};

export default function OperatingSystemsPage() {
  return <OperatingSystemsClient />;
}