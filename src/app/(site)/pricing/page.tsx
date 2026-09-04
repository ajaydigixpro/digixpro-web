import React from "react";
import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProfessionalServiceSchema from "@/components/seo/ProfessionalServiceSchema";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: "Investment Guide — Digital Services Pricing in India",
  description:
    "DigiXPro Investment Guide — Indicative website development cost India, SEO pricing India, fractional CTO cost, and fractional CTO hourly rate.",
  keywords: [
    "digixpro pricing",
    "website development cost India",
    "SEO pricing India",
    "fractional CTO cost",
    "fractional CTO hourly rate",
    "digital services pricing in India"
  ],
  alternates: {
    canonical: "https://www.digixpro.in/pricing",
  },
  openGraph: {
    title: "Investment Guide — Digital Services Pricing in India | DigiXPro",
    description:
      "Indicative investment ranges for website development cost India, SEO pricing India, fractional CTO cost, and fractional CTO hourly rate in INR, USD, GBP, AUD, or SGD.",
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
      "Indicative investment ranges for website development cost India, SEO pricing India, fractional CTO cost, and fractional CTO hourly rate in INR, USD, GBP, AUD, or SGD.",
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
      <ProfessionalServiceSchema />
      <PricingClient />
    </div>
  );
}
