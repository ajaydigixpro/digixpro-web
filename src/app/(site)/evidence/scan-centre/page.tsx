import React from 'react';
import { Metadata } from 'next';
import ScanCentreClient from './ScanCentreClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'ScanCentreNearMe Marketplace Architecture Evidence',
  description: 'Production evidence for ScanCentreNearMe diagnostic marketplace platform, booking workflow, and inventory management.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/scan-centre',
  },
  openGraph: {
    title: 'ScanCentreNearMe Marketplace Architecture Evidence | DigiXPro',
    description: 'Production evidence for ScanCentreNearMe diagnostic marketplace platform, booking workflow, and inventory management.',
    url: 'https://www.digixpro.in/evidence/scan-centre',
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

const faqs = [
  {
    question: "What is smart framework leverage in marketplace engineering?",
    answer: "Smart framework leverage involves utilizing existing open-source or commercial foundation frameworks for commodity software requirements (auth, session management, database migrations) while reserving engineering budgets exclusively for proprietary business workflows."
  },
  {
    question: "How do multi-vendor marketplaces handle data privacy between competing vendors?",
    answer: "Role-Based Access Control (RBAC) and row-level database tenancy isolation ensure diagnostic centers only access their own patient appointments, reporting uploads, and revenue metrics."
  }
];

export default function ScanCentreEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'ScanCentreNearMe', url: 'https://www.digixpro.in/evidence/scan-centre' },
        ]}
      />
      <FAQSchema items={faqs} />
      <ScanCentreClient />
      <StickyMobileCTA />
    </>
  );
}