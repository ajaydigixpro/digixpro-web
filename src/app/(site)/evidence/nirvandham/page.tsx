import React from 'react';
import { Metadata } from 'next';
import NirvandhamClient from './NirvandhamClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Nirvandham Platform Architecture Evidence',
  description: 'Production evidence and case study for Nirvandham digital platform, community OS, custom Web Application, and business workflow infrastructure.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/nirvandham',
  },
  openGraph: {
    title: 'Nirvandham Platform Architecture Evidence | DigiXPro',
    description: 'Production evidence for Nirvandham digital platform, community OS, and workflow infrastructure.',
    url: 'https://www.digixpro.in/evidence/nirvandham',
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

const faqs = [
  {
    question: "What is a digital institution platform?",
    answer: "A digital institution platform unifies publishing, digital libraries, member accounts, multilingual search, and governed AI retrieval into a single integrated digital ecosystem."
  }
];

export default function NirvandhamEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'Nirvandham', url: 'https://www.digixpro.in/evidence/nirvandham' },
        ]}
      />
      <FAQSchema items={faqs} />
      <NirvandhamClient />
      <StickyMobileCTA />
    </>
  );
}