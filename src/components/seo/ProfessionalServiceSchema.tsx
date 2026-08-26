import Script from 'next/script';
import React from 'react';

export default function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.digixpro.in/#advisory",
    "name": "DigiXPro",
    "url": "https://www.digixpro.in",
    "description": "Independent Technology Architecture & Business Operating Systems Advisory for growing businesses and founders.",
    "serviceType": "Technology Architecture Advisory",
    "currenciesAccepted": "USD, GBP, AUD, SGD, INR",
    "paymentAccepted": "Bank Transfer, Wire Transfer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "email": "consult@digixpro.in",
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "Singapore" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Advisory Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Infrastructure & Governance Advisory",
            "description": "Architecting secure, role-based AI execution layers integrated with proprietary data."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketplace & Platform Architecture",
            "description": "Designing scalable multi-vendor operating systems with decoupled inventory and order management."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business & Workflow Automation",
            "description": "Replacing fragmented manual processes with a centralized business operating system."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise Tech Audit & Rescue",
            "description": "Independent technical due-diligence, architecture analysis, and rescue strategy."
          }
        }
      ]
    },
    "provider": {
      "@id": "https://www.digixpro.in/#organization"
    }
  };

  return <Script id="prof-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}