import Script from "next/script";
import React from "react";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.digixpro.in/#organization",
    "name": "DigiXPro Digital Solution",
    "alternateName": "DigiXPro",
    "description": "Independent Technology Architecture Advisory. We design business operating systems before you spend money on software.",
    "url": "https://www.digixpro.in",
    "foundingDate": "2018",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.digixpro.in/logo-1024.png",
      "width": 1024,
      "height": 1024
    },
    "image": "https://www.digixpro.in/opengraph-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "email": "consult@digixpro.in",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "consult@digixpro.in",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/digixpro/",
      "https://www.facebook.com/digixprodigitalsolution"
    ],
    "founder": {
      "@id": "https://www.digixpro.in/#founder"
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