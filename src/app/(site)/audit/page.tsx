import React from "react";
import { Metadata } from "next";
import AuditClient from "@/components/audit/AuditClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Website Performance & Architecture Audit | DigiXPro",
  description:
    "Run a free website architecture, Core Web Vitals, and technical SEO audit. Get an empirical breakdown with prioritized engineering solutions and download a PDF report.",
  alternates: {
    canonical: "https://www.digixpro.in/audit",
  },
  openGraph: {
    title: "Website Performance & Architecture Audit | DigiXPro",
    description:
      "Run a free website architecture, Core Web Vitals, and technical SEO audit. Get an empirical breakdown with prioritized engineering solutions.",
    url: "https://www.digixpro.in/audit",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DigiXPro — Website Performance & Architecture Audit",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Performance & Architecture Audit | DigiXPro",
    description:
      "Run a free website architecture, Core Web Vitals, and technical SEO audit. Get an empirical breakdown with prioritized engineering solutions.",
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
