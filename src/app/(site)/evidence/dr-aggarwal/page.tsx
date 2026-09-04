import React from 'react';
import { Metadata } from 'next';
import DrAggarwalClient from './DrAggarwalClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Dr Aggarwal Physio Centre Case Study',
  description: 'Case study for Dr Aggarwal Physio Centre: patient acquisition engine and digital footprint for a 2-location physiotherapy clinic network in Noida.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/dr-aggarwal',
  },
  openGraph: {
    title: 'Dr Aggarwal Physio Centre Case Study | DigiXPro',
    description: 'Zero-to-One digital footprint and patient acquisition system across two Noida clinic locations: draggarwalphysio.com and 360neckshoulder.com.',
    url: 'https://www.digixpro.in/evidence/dr-aggarwal',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Dr Aggarwal Physio Centre Case Study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Aggarwal Physio Centre Case Study | DigiXPro',
    description: 'Zero-to-One digital footprint across two clinic locations in Noida. Top 3 rank for physiotherapy keywords.',
    images: ['/twitter-image.png'],
  },
};

const faqs = [
  {
    question: "How long does it take for a local clinic website to show up in local Google searches?",
    answer: "Local Google Maps 3-Pack signals typically index within 4 to 8 weeks following proper Google Business Profile verification, structured address schema implementation, and local citation building."
  },
  {
    question: "What schema markup should healthcare websites use?",
    answer: "Healthcare practice websites require MedicalBusiness, Physician, LocalBusiness, and FAQPage JSON-LD schemas mapped directly to verified clinic locations and practitioner credentials."
  },
  {
    question: "Why is word-of-mouth no longer enough for healthcare practice growth?",
    answer: "While word-of-mouth builds initial trust, 80%+ of prospective patients search online to read reviews, check doctor credentials, and inspect clinic locations before booking their first appointment."
  }
];

export default function DrAggarwalEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'Dr Aggarwal Physio Centre', url: 'https://www.digixpro.in/evidence/dr-aggarwal' },
        ]}
      />
      <FAQSchema items={faqs} />
      <DrAggarwalClient />
      <StickyMobileCTA />
    </>
  );
}