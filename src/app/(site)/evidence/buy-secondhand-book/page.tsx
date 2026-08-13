import React from 'react';
import { Metadata } from 'next';
import BuySecondhandBookClient from './BuySecondhandBookClient';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ArticleSchema from '@/components/seo/ArticleSchema';

export const metadata: Metadata = {
  title: 'Buy Secondhand Book Case Study',
  description: 'Production evidence for BuySecondHandBook: Delhi heritage bookstore migrated from WordPress to custom PHP 8.4 commerce engine. Zero data loss, 12,272 URL redirects, 99 Desktop PageSpeed, and Smart Bulk Upload.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/buy-secondhand-book',
  },
  openGraph: {
    title: 'Buy Secondhand Book Case Study | DigiXPro Evidence',
    description: 'Delhi heritage bookstore migrated from legacy WordPress to custom PHP 8.4 single-copy commerce engine. Zero data loss, 12,272 URL redirects, 99 Desktop PageSpeed, and Smart Bulk Upload.',
    url: 'https://www.digixpro.in/evidence/buy-secondhand-book',
    type: 'article',
    images: [
      {
        url: '/evidence/buy-secondhand-book/Homepage.png',
        width: 1200,
        height: 630,
        alt: 'Buy Secondhand Book Commerce Engine Case Study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Secondhand Book Case Study | DigiXPro Evidence',
    description: 'Custom PHP 8.4 commerce engine migration for Delhi heritage bookstore. 12,272 redirects, 99 PageSpeed, Smart Bulk Upload.',
    images: ['/evidence/buy-secondhand-book/Homepage.png'],
  },
};

export default function BuySecondhandBookEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'Buy Secondhand Book', url: 'https://www.digixpro.in/evidence/buy-secondhand-book' },
        ]}
      />
      <ArticleSchema
        title="Buy Secondhand Book: Custom PHP 8.4 Commerce Engine Migration Case Study"
        description="Full platform migration of an 8-year client from legacy WordPress to a purpose-built PHP 8.4 circular commerce engine with zero data loss, 12,272 301 redirects, 99/100 PageSpeed, and Smart Bulk Upload."
        url="https://www.digixpro.in/evidence/buy-secondhand-book"
        publishedAt="2026-08-01"
        updatedAt="2026-08-13"
        imageUrl="https://www.digixpro.in/evidence/buy-secondhand-book/Homepage.png"
      />
      <BuySecondhandBookClient />
      <StickyMobileCTA />
    </>
  );
}