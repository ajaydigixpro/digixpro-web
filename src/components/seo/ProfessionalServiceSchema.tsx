import Script from 'next/script';
import React from 'react';

export default function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://digixpro.in/#advisory",
    "name": "DigiXPro",
    "url": "https://digixpro.in",
    "description": "Independent Technology Architecture & Business Operating Systems Advisory.",
    "serviceType": "Technology Architecture Advisory",
    "areaServed": "IN",
    "provider": {
      "@id": "https://digixpro.in/#organization"
    }
  };

  return <Script id="prof-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}