import Script from "next/script";
import React from "react";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://digixpro.in/#organization",
    "name": "DigiXPro Digital Solution",
    "alternateName": "DigiXPro",
    "url": "https://digixpro.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digixpro.in/logo-1024.png"
    }
  };

  return (
    <Script
      id="org-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}