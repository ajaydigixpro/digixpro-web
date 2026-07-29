import Script from 'next/script';
import React from 'react';

export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://digixpro.in/#website",
    "name": "DigiXPro",
    "url": "https://digixpro.in"
  };

  return <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}