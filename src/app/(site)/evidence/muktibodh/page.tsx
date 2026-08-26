import React from 'react';
import { Metadata } from 'next';
import MuktibodhClient from './MuktibodhClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';

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

const faqs = [
  {
    question: "What is dual-mode digital reading UX?",
    answer: "Dual-mode reading allows readers to toggle seamlessly between a clean, responsive web article view (for fast mobile reading) and an interactive flipbook view (for page-by-page publication reading)."
  }
];

export default function MuktibodhEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'Muktibodh', url: 'https://www.digixpro.in/evidence/muktibodh' },
        ]}
      />
      <FAQSchema items={faqs} />
      <MuktibodhClient />
      <StickyMobileCTA />
    </>
  );
}