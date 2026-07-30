import Script from 'next/script';
import React from 'react';

export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.digixpro.in/#website",
    "name": "DigiXPro",
    "url": "https://www.digixpro.in",
    "description": "Independent Technology Architecture Advisory — business operating systems designed before you spend money on software.",
    "inLanguage": "en-IN",
    "publisher": {
      "@id": "https://www.digixpro.in/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.digixpro.in/knowledge?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}