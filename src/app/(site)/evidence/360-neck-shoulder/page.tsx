import React from 'react';
import { Metadata } from 'next';
import NeckShoulderClient from './NeckShoulderClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: '360 Neck & Shoulder Care Case Study',
  description: 'Specialised healthcare web design, visual identity, and patient acquisition engine for 360 Neck & Shoulder clinic in Noida — 360neckshoulder.com.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/360-neck-shoulder',
  },
  openGraph: {
    title: '360 Neck & Shoulder Care Case Study | DigiXPro',
    description: 'Bespoke healthcare web architecture, mobile UI/UX, and local search trust optimization for specialist physiotherapy care.',
    url: 'https://www.digixpro.in/evidence/360-neck-shoulder',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '360 Neck & Shoulder Care Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '360 Neck & Shoulder Care Case Study | DigiXPro',
    description: 'Bespoke healthcare web architecture and local search trust optimization.',
    images: ['/twitter-image.png'],
  },
};

const faqs = [
  {
    question: "Why separate specialist clinic branding from general practice websites?",
    answer: "Specialist clinic branding signals focused expertise to acute sufferers, establishing higher perceived clinical value than generic multi-specialty marketing."
  }
];

export default function NeckShoulderEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: '360 Neck & Shoulder Care', url: 'https://www.digixpro.in/evidence/360-neck-shoulder' },
        ]}
      />
      <FAQSchema items={faqs} />
      <NeckShoulderClient />
      <StickyMobileCTA />
    </>
  );
}
