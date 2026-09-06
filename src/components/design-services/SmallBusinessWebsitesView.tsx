'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { ibmPlexSans, ibmPlexMono } from '@/lib/fonts';
import { GLOBAL_TARGET_MARKETS, LOCAL_COVERAGE_MARKETS, GLOBAL_DELIVERY_SENTENCE } from '@/data/globalMarkets';
import { SERVED_CITIES } from '@/data/servedCities';
import { 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Code2,
  Layers,
  Zap,
  Globe,
  ListFilter,
  ChevronDown
} from 'lucide-react';

function renderTextWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [, linkText, url] = match;
    parts.push(
      <Link key={match.index} href={url} className="text-[#16a34a] font-semibold hover:underline">
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const smallBusinessWebsitesFaqs = [
  {
    question: "How much does a small business website cost?",
    answer: "Small business website pricing varies dramatically across the market, ranging from cheap five-thousand-rupee freelancer templates to seventy-thousand-rupee commercial platforms. Cheap template setups often carry hidden costs in plugin subscriptions, frequent security patches, slow mobile performance, and eventual total rebuilds. At DigiXPro, we deliver complete bespoke web systems engineered for performance, clean code ownership, and direct lead generation starting from transparent, fixed-scope milestones. We provide itemized pricing with zero monthly builder subscriptions or hidden hosting lock-in fees. To review full investment tiers, milestone timelines, and scope specifications, view our comprehensive [Investment & Pricing Guide](/pricing)."
  },
  {
    question: "Why shouldn't I just build my own website on Wix, Squarespace, or a cheap WordPress template?",
    answer: "While DIY builders like Wix or Squarespace appear cost-effective initially, they trap service businesses in perpetual platform rent while delivering heavy, slow-loading JavaScript that degrades Google Core Web Vitals. Furthermore, DIY platforms restrict custom schema implementation and make exporting your codebase impossible. Cheap WordPress templates present equal risks through unmaintained third-party plugins that create severe security vulnerabilities and break during updates. DigiXPro builds bespoke web applications in modern Next.js and TypeScript. You receive sub-second page load times, precision LocalBusiness schema, automated lead routing, and complete code ownership without recurring software licensing fees."
  },
  {
    question: "How long does it take to design and launch a service business website?",
    answer: "A typical bespoke service business web project takes between two and four weeks from architectural kickoff to production launch. Essential service architectures with up to five key service pages generally deploy within fourteen to twenty-one business days. More expansive commercial platforms—requiring multi-location pages, interactive intake qualification funnels, and complex CRM webhook integrations—typically take four to six weeks. Because we work with fixed milestones and clear scope specifications, we avoid the open-ended timeline bloat common among traditional web agencies. You receive a structured delivery schedule with guaranteed milestone completion dates."
  },
  {
    question: "Will my service business website rank on Google for local searches?",
    answer: "Yes. We engineer every service website with technical SEO and local discoverability built directly into the foundational codebase. This includes semantic HTML5 structure, automated XML sitemaps, localized breadcrumb schemas, and precision LocalBusiness and MedicalBusiness JSON-LD schemas that help Google understand your physical service areas. In addition, our sub-second page speeds ensure your site easily passes Google Core Web Vitals benchmarks. When combined with a verified Google Business Profile, this technical foundation creates the necessary search equity for your practice or company to rank prominently in local Google Maps 3-Pack and organic search results."
  },
  {
    question: "Do I own the website and source code completely?",
    answer: "Yes. With DigiXPro, you retain one hundred percent legal ownership of your design assets, content, and application source code. Unlike proprietary SaaS builders where your website ceases to exist if you cancel your monthly platform subscription, our codebases are completely portable. We build on modern, open-source technology standards including Next.js, React, and Tailwind CSS. Upon project completion, we hand over full repository access and deployment documentation. You can host your application on high-performance global edge networks like Vercel, Cloudflare, or AWS with minimal infrastructure expense and complete operational independence."
  },
  {
    question: "Can you integrate appointment booking, WhatsApp messaging, and CRM leads?",
    answer: "Yes. Direct lead conversion is a core architectural pillar of our service business builds. We engineer friction-free inquiry forms that trigger instant webhook dispatches to your customer relationship management platform, whether you utilize HubSpot, Zoho, Google Sheets, or custom internal pipelines. For mobile visitors seeking immediate answers, we configure direct click-to-WhatsApp and click-to-call routing with built-in analytics event tracking. This ensures you never miss a high-intent inbound prospect while capturing granular attribution data on which service pages and search queries generate your highest-value commercial inquiries."
  }
];

/*
 * ============================================================================
 * FLAGGED DRAFT FAQ 7 (NOT YET ADDED - AWAITING FOUNDER CONFIRMATION):
 * Question: "What ongoing maintenance or retainer support is required after launch?"
 * Draft Answer: "Because our custom Next.js architectures are decoupled and statically pre-rendered, they do not require constant security patching, database defragmentation, or vulnerability updates like legacy CMS setups. We provide optional managed support retainers covering continuous conversion optimization, localized content publishing, and analytics tracking reviews."
 * Status: NOT YET ADDED TO ACTIVE FAQ LIST (PRESERVED FOR FUTURE EXPANSION)
 * ============================================================================
 */

export const h2TocSections = [
  { text: "What Is Service Business Website Design?", id: "what-is-service-business-website-design" },
  { text: "Who Small & Service Business Website Design Is For", id: "who-small-service-business-website-design-is-for" },
  { text: "Our 4-Step Small Business Web Engineering Methodology", id: "our-4-step-small-business-web-engineering-methodology" },
  { text: "What's Included in Service Business Website Development", id: "whats-included-in-service-business-website-development" },
  { text: "Bespoke Service Engineering vs Generic DIY Builders vs Cheap Templates", id: "bespoke-service-engineering-vs-generic-diy-builders-vs-cheap-templates" },
  { text: "Evidence: Service Business Web Engineering in Action", id: "evidence-service-business-web-engineering-in-action" },
  { text: "Custom Website Design Company Serving Delhi NCR", id: "custom-website-design-company-serving-delhi-ncr" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function SmallBusinessWebsitesView() {
  const currentUrl = "https://www.digixpro.in/design-services/small-business-service-business-websites";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = smallBusinessWebsitesFaqs.length > 0 && smallBusinessWebsitesFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      smallBusinessWebsitesFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Small Business & Service Business Website Design",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Small Business Website Design & Engineering",
    "description": "Bespoke small business website design and service business web engineering. High-converting Next.js architectures with local search schemas and direct lead capture.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Business Web Development Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design Scope",
            "description": "Accessible service UI/UX tokens, high-converting mobile wireframes, transparent service packaging, and frictionless booking UX."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Development Scope",
            "description": "Decoupled Next.js architecture, zero monthly platform fees, sub-second mobile page speed, and complete code ownership."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Integrations",
            "description": "Direct API webhooks connecting inquiry forms to WhatsApp, CRM platforms, Google Sheets, and phone consultation routing."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO-Readiness",
            "description": "Automated LocalBusiness and Service JSON-LD structured data schemas, local catchment sitemaps, and top Core Web Vitals speed."
          },
          "position": 4
        }
      ]
    }
  };

  return (
    <div className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200 scroll-smooth`}>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaObj) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Website Design & Engineering', url: 'https://www.digixpro.in/design-services' },
          { name: 'Small Business & Service Business Website Design', url: currentUrl },
        ]}
      />
      <FAQSchema items={smallBusinessWebsitesFaqs} />

      {/* ZONE 1: HERO & TOC SECTION */}
      <section className="bg-white dark:bg-[#0A0A0A] pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/design-services"
            className="inline-flex items-center text-xs font-plex-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Website Design &amp; Engineering Hub
          </Link>

          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — definition
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start mb-12">
            {/* LEFT COLUMN: Hero copy, Buttons */}
            <div className="lg:col-span-7">
              {/* EXACT H1 TAG (1 ONLY ON PAGE) */}
              <h1 className="hero-lcp-heading text-[38px] md:text-[54px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white font-plex-sans">
                Small Business &amp; Service Business Website Design
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Bespoke small business website design delivers high-converting, lightweight web applications engineered specifically for medical clinics, local trade contractors, and professional service firms. This architecture eliminates fragile DIY builder lock-in with clean Next.js code, sub-second Core Web Vitals speed, automated local search indexability, and direct WhatsApp and CRM appointment capture.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Small business and service business website design is the engineering of purpose-built, high-converting digital platforms for service providers, clinics, consultancies, and commercial trade businesses. Unlike slow, plugin-dependent DIY template builders, professional service business website engineering builds clean, bespoke codebases optimized for rapid local discovery, mobile appointment conversions, and direct CRM lead capture.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;I need a website designed around how my business actually gets enquiries.&rdquo;
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/audit" 
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
                >
                  Request a Technical Architecture Audit <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] rounded-xl hover:border-black dark:hover:border-white transition-colors min-h-[52px]"
                >
                  Book a 30-Min Architecture Call
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Engineering Spec Panel (Clean 1px Border, NO Corner Brackets, Aligned with H1) */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm sticky top-28">
                <div className="flex items-center justify-between gap-3 mb-5 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <span className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a]">
                    SPEC SHEET // DELIVERABLES
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">ENGINEERING SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Custom Web Engineering Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PRIMARY ARCHITECTURE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Decoupled Next.js / React or Custom PHP Engine
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      CODE OWNERSHIP
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      100 Percent Repository IP &amp; Source Code Ownership
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      SPEED TARGET
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Sub-Second Mobile Core Web Vitals Optimization
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Lead Plumbing</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Direct API Webhooks (n8n, CRM)</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Search Indexability</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Automated JSON-LD Schema</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Security Posture</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Zero Plugin Exploits</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need a scope review?</span>
                  <Link href="/audit" className="text-xs font-bold text-[#16a34a] hover:underline flex items-center">
                    Request Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE OF CONTENTS BLOCK (DOTTED-LEADER INDEX STYLE, 2 COLUMNS, "On this page") */}
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <div className="font-plex-mono text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4 flex items-center">
                <ListFilter className="w-4 h-4 mr-2" /> On this page
              </div>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-3.5">
                {h2TocSections.map((sec, idx) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-baseline justify-between group text-xs text-neutral-700 dark:text-neutral-300 hover:text-[#16a34a] dark:hover:text-[#16a34a] font-medium transition-colors"
                  >
                    <span className="truncate pr-2">{sec.text}</span>
                    <span className="flex-1 mx-2 border-b border-dotted border-neutral-300 dark:border-neutral-700 relative -top-1" />
                    <span className="font-plex-mono text-neutral-400 dark:text-neutral-500 text-[11px] shrink-0">
                      0{idx + 1}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 2: CORE EXPLANATION (SECTION 1 & SECTION 2) */}
      <div className="bg-neutral-50/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800">
        {/* SECTION 1 (H2) — LEDGER ROWS RIGHT COLUMN, EYEBROW ABOVE GRID */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — definition
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Heading & Body */}
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <h2 id="what-is-service-business-website-design" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Service Business Website Design?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Most small service businesses fall into the DIY builder trap. Off-the-shelf site builders and bloated WordPress themes promise simplicity but deliver sluggish load speeds, continuous monthly plugin subscriptions, and fragile architectures that break during updates. Because these platforms generate heavy code bloat, search engines struggle to index them cleanly, leaving local service businesses invisible to high-intent buyers in their primary catchment areas.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                DigiXPro engineers high-performance small business website design architectures that operate as permanent commercial assets. We build clean-coded, decoupled web applications that load in under 800 milliseconds, capture local search presence via structured schema markup, and channel inbound inquiries straight into verified CRM workflows. You retain complete code ownership without recurring platform fees.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Zero Monthly Platform Rent</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    100 Percent client-owned codebase with no mandatory monthly software subscriptions or vendor lock-in fees.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Sub-800ms Mobile Performance</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Lightweight decoupled assets load instantly on mobile networks, preventing prospective clients from bouncing.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Automated Lead Dispatch</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Inquiries flow directly to your WhatsApp, mobile phone, and CRM pipeline without manual administrative entry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 (H2) — EDITORIAL 3-COLUMN LAYOUT (NO CARD BOXES, THIN TOP RULES ONLY) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              02 — audience
            </div>
            <h2 id="who-small-service-business-website-design-is-for" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Who Small &amp; Service Business Website Design Is For
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Purpose-built website engineering designed for ambitious local practices, specialized service firms, and trades that need dependable commercial enquiry flow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Local Healthcare Practices &amp; Consultancies
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Medical clinics, physical therapy centres, law firms, and consulting practices that need to build trust, present verified credentials, and convert search inquiries into confirmed appointments.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Specialized Trade &amp; Field Service Companies
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Commercial contractors, engineering specialists, HVAC services, and premium home service businesses where rapid mobile quote requests and emergency contact routing drive commercial revenue.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Boutique Agencies &amp; Solo Practitioners
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Growing design studios, financial advisors, and specialized agencies that have outgrown restrictive website builders and require a high-authority digital presence reflecting true market positioning.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ZONE 3: EXECUTION & PROOF (SECTION 3, 4, 5, 6) */}
      <div className="bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800">
        {/* SECTION 3 (H2) — CONNECTED SCHEMATIC PROCESS FLOW (NUMBERING 01-04 STAYS HERE ONLY) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              03 — methodology
            </div>
            <h2 id="our-4-step-small-business-web-engineering-methodology" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Our 4-Step Small Business Web Engineering Methodology
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our systematic 4-phase service website engineering process combines customer journey mapping with modern Next.js development to launch high-converting business platforms.
            </p>
          </div>

          {/* Connected Schematic Container with Low-Opacity Subtle Dot Grid */}
          <div className="bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    01
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 01</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Service Intent Mapping &amp; Local Taxonomy</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We map your specific commercial services against high-intent search queries in your primary target locations. By establishing structured service hierarchies, we ensure prospective buyers find precise solutions instantly.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Mobile-First Conversion UX &amp; Flow Architecture</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Service buyers visit on mobile devices while seeking immediate solutions. We eliminate unnecessary visual distractions, designing clean wireframes with prominent click-to-call, WhatsApp booking, and frictionless inquiry forms.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Clean-Code Development &amp; Core Web Vitals Tuning</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We engineer your platform using modern Next.js and TypeScript, completely bypassing plugin-heavy CMS ecosystems. We optimize assets to achieve sub-second load times and top-tier Core Web Vitals metrics.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Lead Routing, Schema Integration &amp; Launch</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Before deployment, we configure LocalBusiness JSON-LD schemas, verify Google Search Console indexing pathways, and connect form endpoints directly to your sales pipeline and mobile notifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 (H2) — 2X2 MATRIX CELLS (HAIRLINE-DIVIDED, NO CARDS) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              04 — scope
            </div>
            <h2 id="whats-included-in-service-business-website-development" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in Service Business Website Development
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Every small business website engineering engagement provides complete, turnkey digital infrastructure engineered for local discovery, trust authority, and automated inquiry handoff.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                DESIGN SCOPE // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Service UX Architecture
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Accessible UI design tokens, mobile-first appointment funnels, transparent service packaging, touch-optimized navigation bars, and conversion-focused credential layouts.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                DEVELOPMENT SCOPE // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Clean Code Engineering
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Decoupled Next.js and React frontend, semantic HTML5 structure, sub-second load times, zero vulnerable CMS plugins, and 100 percent source code ownership.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                INTEGRATIONS // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Lead Capture Plumbing
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Direct API webhook endpoints routing form inquiries to WhatsApp notifications, CRM pipelines, Google Sheets, or email without fragile third-party mailer plugins.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                SEO-READINESS // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Local Search Schemas
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Automated LocalBusiness, Service, and Breadcrumb JSON-LD schemas, XML sitemaps, open graph metadata, and top-tier Google Core Web Vitals performance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 (H2) — SPEC-SHEET TABLE WITH THIN GREEN LEFT-BORDER */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              05 — decision
            </div>
            <h2 id="bespoke-service-engineering-vs-generic-diy-builders-vs-cheap-templates" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Bespoke Service Engineering vs Generic DIY Builders vs Cheap Templates
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Comparing code ownership, mobile speed performance, local search visibility, and lead routing resilience across different website solutions.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Choose the architecture based on control, performance, ownership, and long-term flexibility.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Custom Service Engine (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/3">DIY Builders (Wix / Squarespace)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Code Ownership &amp; Portability</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">100 Percent client-owned codebase; exportable and hostable anywhere.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Zero code ownership; permanently locked into proprietary hosting and monthly rent.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Mobile Page Speed (LCP)</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Sub-800ms loading speeds guaranteed with top-tier Core Web Vitals.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Typically 3 to 6 seconds due to heavy monolithic script runtimes.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Local Search Schema</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Precision LocalBusiness and Service JSON-LD schemas baked into code.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Generic automated metadata with strict limits on nested schema data.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Lead Capture &amp; Routing</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Direct API webhooks into WhatsApp, CRM pipelines, and email instantly.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Basic email dispatches or expensive locked-in premium tier subscriptions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6 (H2) — EVIDENCE CASE FILES (REAL COPY, CASE TAB, UNDERLINED TEXT LINK) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6">
          <div className="max-w-[760px] mx-auto text-center mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              06 — proof
            </div>
            <h2 id="evidence-service-business-web-engineering-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Service Business Web Engineering in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspect production deployments of lightweight medical portals, multi-location diagnostic booking funnels, and low-CapEx business architectures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-10 text-left">
            {/* Case File 1: Dr Aggarwal Physio Centre */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // HEALTHCARE LOCAL SEARCH
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                  Dr Aggarwal Physio Centre
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Cost-efficient decoupled clinic portal engineered with direct WhatsApp consultation routing, providing a growing community medical practice with 99.9% uptime and zero maintenance overhead.
                </p>
                <Link 
                  href="/evidence/dr-aggarwal" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 2: ScanCentreNearMe */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // DIAGNOSTIC MARKETPLACE
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                  ScanCentreNearMe
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Architectural leverage enabled a multi-city healthcare diagnostic aggregator to deploy in six to eight weeks, saving eighty percent in commodity infrastructure capital expenditure.
                </p>
                <Link 
                  href="/evidence/scan-centre" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/evidence" 
              className="text-xs font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-xl hover:border-black dark:hover:border-white transition-colors inline-flex items-center"
            >
              Browse All Production Evidence &rarr;
            </Link>
          </div>
        </section>
      </div>

      {/* ZONE 4: REGIONAL, FAQ & CTA (SECTION 7, SECTION 8, FINAL CTA) */}
      <div className="bg-neutral-50/60 dark:bg-neutral-900/40">
        {/* SECTION 7 (H2) — CLEAN SPEC PANEL (NO CORNER BRACKETS, ALIGNED WITH H2) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              07 — local delivery
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Reading Copy */}
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <h2 id="custom-website-design-company-serving-delhi-ncr" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Custom Website Design Company Serving Delhi NCR
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                As a specialized custom website design company based in Delhi NCR (serving clients across Delhi, Noida, Gurgaon, and nearby regional hubs), DigiXPro combines local strategic accessibility with world-class software engineering standards.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether you are searching for a high-performance custom website design agency near me in Delhi NCR or looking to upgrade an existing enterprise web platform, {GLOBAL_DELIVERY_SENTENCE} Our technical web engineering team delivers bespoke Next.js solutions designed to dominate organic search and capture qualified lead pipelines.
              </p>
            </div>

            {/* Right Column: Spec Panel (Clean 1px Border, NO Corner Brackets, Aligned with H2) */}
            <div className="lg:col-span-5">
              <div className="p-7 md:p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-700 shadow-sm flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <span className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider">
                      SPEC SHEET // DELIVERY
                    </span>
                    <span className="font-plex-mono text-[11px] text-neutral-400">BOUNDARIES</span>
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                    Serving Delhi NCR &amp; Global Enterprise Clients
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/60">
                      <div className="font-plex-mono text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        Local Coverage
                      </div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {SERVED_CITIES}
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/50">
                      <div className="font-plex-mono text-[11px] font-bold text-[#16a34a] uppercase tracking-wider mb-1">
                        Global reach
                      </div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {GLOBAL_TARGET_MARKETS}
                      </div>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/contact"
                  className="text-xs font-bold text-white bg-black dark:bg-white dark:text-black px-6 py-3.5 rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors text-center block"
                >
                  Schedule Regional &amp; Global Review &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 (H2) — FAQ ACCORDION (NARROW CONTAINER ~820px, CLOSED BY DEFAULT, ALL 6 ITEMS) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[820px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                08 — questions
              </div>
              <h2 id="frequently-asked-questions" className="text-[32px] md:text-[44px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Clear technical and commercial answers regarding small business and service business website design.
              </p>
              
              {/* Expand all / Collapse all toggle button */}
              <button
                type="button"
                onClick={toggleAllFaqs}
                className="inline-flex items-center text-xs font-plex-mono font-bold text-[#16a34a] hover:underline bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-4 py-2 rounded-xl transition-colors"
              >
                {isAllOpen ? 'Collapse All FAQs' : 'Expand All FAQs'}
              </button>
            </div>

            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
              {smallBusinessWebsitesFaqs.map((faq, idx) => {
                const faqId = `faq-${slugify(faq.question)}`;
                const isOpen = !!openFaqs[idx];
                return (
                  <div 
                    key={idx} 
                    className="py-5 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left flex items-start justify-between gap-4 focus:outline-none group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <h3 id={faqId} className="text-[16px] md:text-[18px] font-bold text-black dark:text-white flex items-start scroll-mt-24 leading-snug font-plex-sans">
                        <HelpCircle className="w-4 h-4 text-[#16a34a] mr-3 shrink-0 mt-1" />
                        {faq.question}
                      </h3>
                      <span className={`text-neutral-400 group-hover:text-[#16a34a] shrink-0 text-xl font-bold transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#16a34a]' : ''}`}>
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </button>

                    {/* Pre-rendered Answer Text (CSS display toggle via hidden/block preserves static DOM for SSG / SEO) */}
                    <div className={`text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-7 pt-3 ${isOpen ? 'block' : 'hidden'}`}>
                      {renderTextWithLinks(faq.answer)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CONVERSION SECTION (DARK BLOCK, IBM PLEX SANS) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
            <span className="font-plex-mono text-[11px] font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
              COMMERCIAL DISCOVERY
            </span>
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
              Ready to build a service business website engineered for inquiries?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book an architecture discovery session to discuss your service bottlenecks, local search intent, and technical web engineering requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#16a34a] text-white font-bold text-[15px] rounded-xl hover:bg-[#15803d] transition-colors shadow-md min-h-[52px]"
              >
                Request a Technical Architecture Audit <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
              >
                Book a 30-Min Architecture Call
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Mobile CTA */}
      <DeferredStickyMobileCTA />
    </div>
  );
}
