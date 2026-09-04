import React from "react";
import { Metadata } from "next";
import AuditClient from "@/components/audit/AuditClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: "Website Audit Services, SEO & Performance Health Diagnosis",
  description:
    "Independent website audit services evaluating technical SEO, page load speeds, UX conversion bottlenecks, and underlying platform security risks.",
  keywords: [
    "website audit",
    "website audit services",
    "website audit for SEO",
    "website audit report",
    "website audit checklist",
    "SEO website audit",
    "website performance audit",
    "website health",
    "technical SEO",
    "conversion issues",
    "search visibility",
    "business diagnosis"
  ],
  alternates: {
    canonical: "https://www.digixpro.in/audit",
  },
  openGraph: {
    title: "Website Audit Services, SEO & Performance Health Diagnosis | DigiXPro",
    description:
      "Independent website audit services evaluating technical SEO, page load speeds, UX conversion bottlenecks, and underlying platform security risks.",
    url: "https://www.digixpro.in/audit",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DigiXPro — Website Audit Services & Health Diagnosis",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Audit Services, SEO & Performance Health Diagnosis | DigiXPro",
    description:
      "Independent website audit services evaluating technical SEO, page load speeds, UX conversion bottlenecks, and underlying platform security risks.",
    images: ["/twitter-image.png"],
  },
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.digixpro.in" },
          { name: "Website Audit", url: "https://www.digixpro.in/audit" },
        ]}
      />
      <AuditClient />
    </div>
  );
}
