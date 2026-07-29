import Script from 'next/script';
import React from 'react';

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://digixpro.in/#founder",
    "name": "Dr. Ajay Shukla",
    "alternateName": [
      "Dr. Ajay Shukla (Vidya Vachaspati)",
      "डॉ. अजय शुक्ल (विद्या वाचस्पति)",
      "डॉ. अजय शुक्ल"
    ],
    "jobTitle": "Founder & Technology Architect",
    "url": "https://digixpro.in/founder",
    "worksFor": {
      "@id": "https://digixpro.in/#organization"
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