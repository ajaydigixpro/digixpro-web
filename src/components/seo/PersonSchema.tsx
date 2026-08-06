import Script from 'next/script';
import React from 'react';

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.digixpro.in/#founder",
    "name": "Dr. Ajay Shukla (डॉ. अजय शुक्ल — विद्या वाचस्पति)",
    "alternateName": [
      "Dr. Ajay Shukla (Vidya Vachaspati)",
      "डॉ. अजय शुक्ल (विद्या वाचस्पति)",
      "डॉ. अजय शुक्ल"
    ],
    "jobTitle": "Founder & Technology Architect",
    "description": "Helping founders make technology decisions they won't have to rebuild six months later. Designing business operating systems before expensive technology decisions are made.",
    "url": "https://www.digixpro.in/founder",
    "image": "https://www.digixpro.in/founder-portrait.png",
    "sameAs": [
      "https://www.linkedin.com/in/ajay-shukla-digixpro/",
      "https://www.nirvandham.in/tatv/ajay"
    ],
    "knowsAbout": [
      "Technology Architecture",
      "Business Operating Systems",
      "AI Infrastructure Design",
      "Workflow Automation",
      "ERP and CRM Strategy",
      "Digital Transformation",
      "Marketplace Platform Design",
      "Startup Operations",
      "Graphic Design",
      "Website Design",
      "Brand Identity Systems",
      "Editorial & Magazine Design"
    ],
    "worksFor": {
      "@id": "https://www.digixpro.in/#organization"
    }
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}