'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { ibmPlexSans, ibmPlexMono } from '@/lib/fonts';
import { SERVED_CITIES } from '@/data/servedCities';
import { GLOBAL_TARGET_MARKETS, LOCAL_COVERAGE_MARKETS, GLOBAL_DELIVERY_SENTENCE } from '@/data/globalMarkets';
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

export const seoSearchVisibilityFaqs = [
  {
    question: "Does DigiXPro guarantee SEO results?",
    answer: "No legitimate SEO provider can guarantee specific rankings or top Google positions because search engine algorithms are proprietary, dynamic, and continuously evolving. At DigiXPro, we do not make false ranking guarantees. As a professional SEO company, we stand behind process quality, technical execution standards, clean semantic architecture, automated JSON-LD schema injection, and transparent Google Search Console reporting to drive sustainable organic growth."
  },
  {
    question: "How to choose the right SEO company?",
    answer: "To choose the right SEO company, evaluate their technical capabilities, code quality, case study evidence, and reporting transparency rather than accepting vague ranking promises. Inspect whether they write clean code or rely on heavy CMS plugins. Review our verified [client case study evidence](/evidence) to see real-world project outcomes, or learn more about our engineering standards on the [DigiXPro Founder page](/founder)."
  },
  {
    question: "What does an SEO audit cost?",
    answer: "An SEO audit cost depends on site scale, total page count, technical complexity, and indexation status. A comprehensive audit includes technical crawl analysis, Core Web Vitals benchmarks, schema validation, and competitor search demand mapping. To review transparent audit pricing and scope options, request a [Technical Architecture Audit](/audit)."
  },
  {
    question: "How much does SEO cost in India?",
    answer: "SEO cost in India varies based on project scope, competitive keyword difficulty, content requirements, and ongoing technical maintenance. Professional monthly retainers or fixed milestone projects reflect the depth of technical engineering, JSON-LD schema plumbing, and search demand strategy involved. To review transparent investment packages and SEO packages India benchmarks, visit the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "How long does SEO take to show results?",
    answer: "SEO typically takes 3 to 6 months to demonstrate significant organic traffic and lead growth. Initial technical fixes—such as resolving crawl blocks, optimizing sitemaps, and improving mobile Core Web Vitals—can yield indexation improvements within weeks. However, building competitive topic authority and ranking for high-intent commercial keywords requires consistent content optimization and technical refinement over time."
  },
  {
    question: "What's included in an SEO package or retainer?",
    answer: "An SEO retainer or engineering scope includes technical crawl monitoring, automated JSON-LD schema maintenance, search demand research, content optimization, Core Web Vitals tuning, and Google Search Console performance tracking. Every engagement delivers production-ready technical improvements designed to maximize search visibility and organic lead conversion."
  },
  {
    question: "SEO vs PPC — which is right for your business?",
    answer: "SEO and PPC serve complementary roles in a digital acquisition strategy. PPC provides immediate paid traffic but stops generating leads the moment ad spend halts. SEO builds a long-term, high-margin asset that continues capturing organic search demand over time without ongoing cost-per-click fees. Unsure which acquisition channel fits your budget? Request a [Technical Architecture Audit](/audit)."
  },
  {
    question: "Is SEO worth it for a small business?",
    answer: "Yes, SEO is highly cost-effective for small businesses because it targets buyers actively searching for your specific products or services. Unlike disruptive display ads, organic search visibility captures high-intent prospects at the precise moment they seek a solution. Establishing a clean, search-optimized web foundation ensures small businesses can compete effectively against larger competitors."
  },
  {
    question: "Why is SEO so expensive?",
    answer: "SEO requires ongoing expertise spanning software engineering, search demand analytics, content strategy, and technical optimization. Low-cost SEO providers often use automated spam tactics or cheap link schemes that risk Google penalties and site suppression. Investing in professional SEO services delivers clean code architecture, sustainable organic traffic, and long-term brand authority."
  }
];

export const h2TocSections = [
  { text: "What Is SEO & Search Visibility Engineering?", id: "what-is-seo-search-visibility-engineering" },
  { text: "Who Needs Search Visibility Engineering", id: "who-needs-search-visibility-engineering" },
  { text: "DigiXPro's SEO & Search Visibility Process", id: "digixpros-seo-search-visibility-process" },
  { text: "What's Included in SEO & Search Visibility Engineering", id: "whats-included-in-seo-search-visibility-engineering" },
  { text: "In-House SEO vs Freelancer vs Agency", id: "in-house-seo-vs-freelancer-vs-agency" },
  { text: "Evidence: SEO & Search Visibility in Action", id: "evidence-seo-search-visibility-in-action" },
  { text: "Where DigiXPro Delivers SEO Engineering", id: "where-digixpro-delivers-seo-engineering" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function SeoSearchVisibilityView() {
  const currentUrl = "https://www.digixpro.in/search-automation/seo-search-visibility";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = seoSearchVisibilityFaqs.length > 0 && seoSearchVisibilityFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      seoSearchVisibilityFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO & Search Visibility Services for Growing Businesses",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "SEO & Search Visibility Engineering",
    "description": "Bespoke SEO services India and search visibility engineering for growing enterprises. Technical crawlability, search demand intelligence, and AI search optimization.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO & Search Visibility Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical SEO Foundation",
            "description": "Pre-rendered static HTML5, automated JSON-LD schemas, dynamic XML sitemaps, and sub-second Core Web Vitals optimization."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Search Demand & Content Strategy",
            "description": "Commercial keyword intent mapping, topic cluster architecture, and conversion-focused on-page optimization."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Authority & Entity Signals",
            "description": "Structured brand entity markup, internal link distribution, and canonical digital footprint alignment."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Search (GEO) Visibility",
            "description": "Entity definition markup and structured text pre-rendering optimized for AI search engines and ChatGPT citations."
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
          { name: 'Search, AI & Automation', url: 'https://www.digixpro.in/search-automation' },
          { name: 'SEO & Search Visibility Services for Growing Businesses', url: currentUrl },
        ]}
      />
      <FAQSchema items={seoSearchVisibilityFaqs} />

      {/* ZONE 1: HERO & TOC SECTION */}
      <section className="bg-white dark:bg-[#0A0A0A] pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/search-automation"
            className="inline-flex items-center text-xs font-plex-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Search, AI &amp; Automation Hub
          </Link>

          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — definition
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start mb-12">
            {/* LEFT COLUMN: Hero copy, Buttons */}
            <div className="lg:col-span-7">
              {/* EXACT H1 TAG */}
              <h1 className="hero-lcp-heading text-[38px] md:text-[54px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white font-plex-sans">
                SEO &amp; Search Visibility Services for Growing Businesses
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Search visibility engineering replaces generic keyword stuffing with clean technical crawlability, structured entity schemas, and search demand intelligence. Designed for scaling enterprises, this service optimizes digital assets for both traditional search engines and AI search platforms.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  SEO &amp; search visibility engineering is the technical optimization of business web applications to capture organic commercial intent across Google, Bing, and AI search systems. Unlike superficial agency retainers that rely on automated backlink spam, professional SEO services India engineer clean semantic HTML5, automated JSON-LD structured data schemas, fast server-rendered performance, and high-authority content architecture.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Our website isn&apos;t showing up in Google search for commercial keywords, and competitors are capturing our organic lead pipeline.&rdquo;
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
                    SPEC SHEET // SEO DISCIPLINE
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">ENGINEERING SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Technical Search Visibility Scope
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      TECHNICAL FOUNDATION
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Pre-rendered Static HTML &amp; JSON-LD Schema
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      DEMAND INTELLIGENCE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Ubersuggest-Backed Keyword Intent Strategy
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      INDEXATION SPEED
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Sub-Second Core Web Vitals &amp; IndexNow
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Search Engines</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Google, Bing, Perplexity, ChatGPT</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Content Strategy</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Topic Clusters &amp; Native Assets</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Reporting Standard</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">GSC &amp; GA4 Verified Conversion Data</span>
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
              <h2 id="what-is-seo-search-visibility-engineering" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is SEO &amp; Search Visibility Engineering?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Growing B2B enterprises fail to capture organic leads when their websites suffer from technical indexation blocks, slow mobile load speeds, missing structured data, and unoptimized content. Organic search visibility is an ongoing engineering discipline combining technical site infrastructure, search demand intelligence, and authoritative content architecture rather than a one-time task.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Partnering with a reliable SEO company ensures your digital assets are structured to rank for commercial search intent. By optimizing pre-compiled static HTML, implementing rich JSON-LD schemas, and establishing clear topic authority, modern SEO services build long-term commercial assets that generate qualified lead pipelines.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Technical Crawlability</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Pre-rendered static HTML5, clean URL structures, automated XML sitemaps, and Core Web Vitals optimization.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Search Demand Intelligence</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Commercial keyword mapping based on real search volume and buyer intent data to drive qualified lead traffic.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">AI Search (GEO) Visibility</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Structured entity markup and authority signals optimized for AI search engines like ChatGPT, Claude, and Perplexity.
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
            <h2 id="who-needs-search-visibility-engineering" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              When Organic Search Demands Search Visibility Engineering
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Whether you choose to hire SEO expert guidance or upgrade an existing web presence, search visibility engineering is designed for organizations requiring predictable organic lead growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Scaling B2B Companies Losing Organic Leads
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Organizations offering high-value technical services or specialized solutions that are losing potential prospective clients to competitors with stronger search visibility.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Stuck Beyond Page 1 of Google
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Firms with high-quality products or commercial services that remain invisible in search engine results due to technical indexation errors or weak keyword mapping.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies Preparing for AI Search &amp; GEO
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprise brands seeking to maintain search authority as AI Overviews and conversational search platforms transform online buyer discovery.
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
            <h2 id="digixpros-seo-search-visibility-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s SEO &amp; Search Visibility Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our systematic 4-phase search visibility process replaces guesswork with data-driven technical execution and continuous performance refinement.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Audit &amp; Demand Intelligence</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Real search-demand and technical audit of the current site to identify indexation blockers, crawl errors, and high-intent commercial keywords.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Content &amp; Technical Strategy</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Topic and keyword strategy grounded in search data, paired with technical architecture enhancements for sub-second page performance.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Implementation &amp; Distribution</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  On-page optimization, JSON-LD schema injection, and structured content deployment with native distribution across target search channels.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Performance &amp; Refinement</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Regular Google Search Console and GA4 data analysis to refresh decaying content and capture emerging keyword opportunities.
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
            <h2 id="whats-included-in-seo-search-visibility-engineering" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in SEO &amp; Search Visibility Engineering
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              To evaluate milestone scopes or review custom <Link href="/pricing" className="text-[#16a34a] font-semibold hover:underline">SEO packages India</Link>, explore our transparent investment benchmarks in the DigiXPro Investment Guide.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                TECHNICAL FOUNDATION // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Technical SEO Foundation
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Automated JSON-LD schema injection (Service, FAQPage, Breadcrumb)</li>
                <li>- Dynamic XML sitemaps and IndexNow protocol configuration</li>
                <li>- Sub-second mobile Core Web Vitals performance tuning</li>
              </ul>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                DEMAND &amp; CONTENT // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Search Demand &amp; Content Strategy
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Buyer-intent keyword research mapped to commercial routes</li>
                <li>- Topic cluster architecture and semantic heading structure</li>
                <li>- On-page optimization for title tags, meta descriptions, and URLs</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                AUTHORITY &amp; ENTITY // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Authority &amp; Entity Signals
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Structured Organization and Author schemas for brand authority</li>
                <li>- Internal linking architecture to distribute page equity</li>
                <li>- Digital footprint alignment across canonical profiles</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                AI SEARCH &amp; GEO // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> AI Search (GEO) Visibility
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Direct conversational AI search query optimization</li>
                <li>- Pre-rendered text nodes in static HTML DOM for AI crawlers</li>
                <li>- Entity definition blocks designed for AI Overview citations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5 (H2) — SPEC-SHEET TABLE WITH THIN GREEN LEFT-BORDER */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              05 — decision
            </div>
            <h2 id="in-house-seo-vs-freelancer-vs-agency" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              In-House SEO vs Freelancer vs Agency
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Partnering with a specialized SEO agency provides the technical depth and execution consistency required to achieve sustainable search growth.
            </p>
            {/* Supplementary Framing Sentence */}
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Choose the execution model based on cost predictability, technical depth, consistency, and long-term accountability.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Agency (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/3">In-House Team / Freelancer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost Predictability</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Fixed milestone or retainer pricing with zero hidden payroll overhead.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Variable monthly salary, benefits overhead, or unpredictable freelancer hourly rates.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Technical Depth</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Full engineering team spanning frontend, JSON-LD schema, server rendering, and analytics.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Limited to single-person skill sets or basic plugin-level SEO knowledge.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Consistency</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Systematic sprint cadence for content refreshes, technical monitoring, and schema updates.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Often interrupted by internal fire-fighting or freelancer availability gaps.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Time to Results</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Rapid technical audit and immediate build-time SEO deployment.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Slower ramp-up time due to hiring bottlenecks or solo execution bandwidth.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Accountability &amp; Reporting</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Verified GSC and GA4 organic traffic data tied directly to lead conversions.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Self-reported rankings or basic keyword reports without conversion tracking.</td>
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
            <h2 id="evidence-seo-search-visibility-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: SEO &amp; Search Visibility in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Review production evidence of programmatic taxonomy indexing, zero-equity-loss catalog migrations, and automated search discovery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto mb-10 text-left">
            {/* Case File 1: BuySecondhandBook */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // E-COMMERCE MIGRATION
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-28px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    BuySecondhandBook
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Programmatic taxonomy indexing and faceted category architecture scaling organic search visibility across 12,000+ long-tail book titles without index bloat or crawl budget waste.
                  </p>
                </div>
                <Link 
                  href="/evidence/buy-secondhand-book" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 2: DigiXPro Web Platform */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // LIVE PLATFORM EVIDENCE
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-28px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    DigiXPro Web Platform
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Enterprise technical SEO infrastructure powering indexation pipelines across fifty-plus commercial pages via automated IndexNow API pings, dynamic XML sitemaps, and deep semantic breadcrumbs.
                  </p>
                </div>
                <Link 
                  href="/evidence/digixpro" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 3: Dr Aggarwal Physio Centre */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 03 // HEALTHCARE LOCAL SEO
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-28px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    Dr Aggarwal Physio Centre
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Engineered high-intent medical topic clusters and structured MedicalBusiness schema markup, securing top organic search visibility for competitive clinical rehabilitation keywords and sustained patient inquiries.
                  </p>
                </div>
                <Link 
                  href="/evidence/dr-aggarwal" 
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
        {/* SECTION 7 (H2) — DELIVERY BOUNDARIES (LIGHT GEOGRAPHIC DELIVERY, NO LOCAL-SEO KEYWORD STUFFING) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              07 — delivery
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Reading Copy */}
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <h2 id="where-digixpro-delivers-seo-engineering" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers SEO Engineering
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Based in Delhi NCR (Noida), DigiXPro delivers technical SEO and search visibility engineering to growing B2B enterprises across regional technology hubs.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether your company operates locally in NCR or serves markets across India and globally, {GLOBAL_DELIVERY_SENTENCE} Our engineering team provides the technical foundation needed to compete in national and international search results.
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
                    Global &amp; Regional Engineering Reach
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/60">
                      <div className="font-plex-mono text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        Local Base
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

        {/* SECTION 8 (H2) — FAQ ACCORDION (NARROW CONTAINER ~820px, CLOSED BY DEFAULT, ALL 9 ITEMS) */}
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
                Clear technical and commercial answers regarding SEO services, technical requirements, pricing structures, and expected timelines.
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
              {seoSearchVisibilityFaqs.map((faq, idx) => {
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
              Ready to build an SEO &amp; search visibility foundation engineered for growth?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book an architecture discovery session to discuss your current search bottlenecks, keyword opportunities, and technical SEO requirements.
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
