import React from "react";
import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProfessionalServiceSchema from "@/components/seo/ProfessionalServiceSchema";

export const metadata: Metadata = {
  title: "Investment Guide — Digital Services Pricing in India | DigiXPro",
  description:
    "DigiXPro Investment Guide — Indicative pricing for custom website development, technical SEO, AI automation, and technology advisory in India. Exact quotes follow an audit.",
  keywords: [
    "digixpro pricing",
    "website development cost india",
    "seo pricing india",
    "ai automation cost",
    "technology advisory investment",
    "digital services pricing in india"
  ],
  alternates: {
    canonical: "https://www.digixpro.in/pricing",
  },
  openGraph: {
    title: "Investment Guide — Digital Services Pricing in India | DigiXPro",
    description:
      "Indicative investment ranges for website development, SEO, AI automation, and technology advisory in India — in INR, USD, GBP, AUD, or SGD.",
    url: "https://www.digixpro.in/pricing",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DigiXPro — Pricing & Investment Guide",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Guide — Digital Services Pricing in India | DigiXPro",
    description:
      "Indicative investment ranges for website development, SEO, AI automation, and technology advisory in India — in INR, USD, GBP, AUD, or SGD.",
    images: ["/twitter-image.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.digixpro.in" },
          { name: "Pricing", url: "https://www.digixpro.in/pricing" },
        ]}
      />
      {/* PHASE 26 (technical SEO): reuses the EXISTING ProfessionalServiceSchema
          component (already used on the homepage, advisory, and
          search-automation service pages) - its currenciesAccepted field is
          directly relevant here, and no new structured-data type is
          introduced. */}
      <ProfessionalServiceSchema />
      <PricingClient />
    </div>
  );
}
