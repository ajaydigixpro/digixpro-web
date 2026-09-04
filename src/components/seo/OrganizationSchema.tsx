import React from "react";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.digixpro.in/#organization",
    "name": "DigiXPro Digital Solution",
    "legalName": "DigiXPro Digital Solution",
    "alternateName": "DigiXPro",
    "description": "Independent Technology Architecture Advisory. DigiXPro designs business operating systems before clients allocate software budgets.",
    "url": "https://www.digixpro.in",
    "foundingDate": "2018",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.digixpro.in/transparent_logo.png",
      "width": 600,
      "height": 117
    },
    "image": "https://www.digixpro.in/opengraph-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "email": "ajay@digixpro.in",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "ajay@digixpro.in",
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" }
      ],
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/digixprodigitalsolution/",
      "https://www.facebook.com/digixprodigitalsolution"
    ],
    "founder": {
      "@id": "https://www.digixpro.in/#founder"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}