'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { ibmPlexSans, ibmPlexMono } from '@/lib/fonts';
import { SERVED_CITIES } from '@/data/servedCities';
import { GLOBAL_TARGET_MARKETS } from '@/data/globalMarkets';
import { 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Layers, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Zap, 
  ChevronDown, 
  ListFilter,
  BarChart3,
  Sliders,
  Sparkles,
  MousePointerClick
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

export const websiteUxCroFaqs = [
  {
    question: "How much does a UX/CRO audit cost?",
    answer: "UX and CRO audit pricing depends on total website page count, user journey complexity, form depth, and analytics setup. Professional audits provide a diagnostic evaluation of user friction points, mobile interaction bottlenecks, and conversion drop-offs with prioritized remediation roadmaps. Rather than incurring expensive full site rebuilds, targeted conversion audits deliver clear recommendations to optimize existing web traffic efficiently. Consult our official [Investment Guide](/pricing) for transparent service tier breakdowns and engagement scoping."
  },
  {
    question: "How long does a UX audit take?",
    answer: "A comprehensive website UX audit typically takes 5 to 10 business days from initial analytics access to final diagnostic roadmap presentation. Phase 1 evaluates user session behavior, mobile viewport rendering, and form drop-off points. Phase 2 conducts expert heuristic evaluation across key conversion pages. Phase 3 compiles an actionable, prioritized remediation matrix ranking fixes by commercial impact versus engineering effort."
  },
  {
    question: "How do I know if my website needs a UX audit?",
    answer: "A website needs a UX audit when it generates steady organic or paid visitor traffic but fails to produce expected lead inquiry volume. Key indicators include high bounce rates on key landing pages, frequent mobile form abandonment, low average session duration, and customer feedback regarding navigation confusion. If traffic is arriving but visitors leave without engaging, a targeted usability audit identifies the exact friction points blocking conversion."
  },
  {
    question: "What's included in a UX/CRO audit?",
    answer: "A comprehensive UX and CRO audit includes user journey friction analysis, mobile viewport usability testing, visual hierarchy review, form completion drop-off evaluation, and call-to-action placement audits. The deliverable features an executive summary, annotated page mockups highlighting friction bottlenecks, Core Web Vitals speed analysis, and a prioritized engineering roadmap detailing exact code and copy fixes required to improve conversion flow."
  },
  {
    question: "What metrics does a UX audit look at?",
    answer: "A UX audit evaluates key user behavior metrics including page conversion rates, form completion percentages, mobile bounce rates, scroll depth, click tracking maps, and average time-to-conversion. Technical metrics such as mobile Core Web Vitals, Cumulative Layout Shift, and Largest Contentful Paint are also assessed, ensuring both usability UX and codebase speed bottlenecks are identified simultaneously."
  },
  {
    question: "Does UX/CRO work require redesigning the whole website?",
    answer: "No, UX and conversion rate optimization work does not require redesigning an entire website when the underlying platform infrastructure is sound. Unlike a complete [website redesign](/design-services/website-redesign), targeted CRO focuses on optimizing existing high-traffic landing pages, streamlining lead capture forms, clarifying headline messaging, and removing specific friction points. Full site rebuilds are reserved exclusively for legacy platforms with severe structural codebase debt or broken mobile rendering."
  },
  {
    question: "How much can conversion rate optimization actually improve results?",
    answer: "Conversion rate optimization improves website inquiry generation by removing specific usability friction points and clarifying buyer calls-to-action. Actual performance gains vary depending on initial site condition, current traffic quality, and existing conversion bottlenecks. Rather than promising artificial growth percentages, conversion optimization focuses on empirical, measurable UX fixes validated through user session analytics and continuous conversion tracking."
  },
  {
    question: "Is a UX audit or CRO engagement worth it for a small business?",
    answer: "Yes, a UX audit and CRO engagement is highly cost-effective for small businesses spending money on paid ad campaigns or organic search optimization. Improving conversion efficiency on existing web traffic allows small businesses to generate more qualified inquiries without increasing advertising spend. Eliminating form friction and improving mobile readability maximizes the commercial return of every website visitor."
  }
];

export const h2TocSections = [
  { text: "What Is Website UX & Conversion Optimization?", id: "what-is-website-ux-conversion-optimization" },
  { text: "Who Needs UX & Conversion Optimization", id: "who-needs-ux-conversion-optimization" },
  { text: "DigiXPro's UX & Conversion Optimization Process", id: "digixpros-ux-conversion-optimization-process" },
  { text: "What's Included in a UX & Conversion Optimization Engagement", id: "whats-included-in-a-ux-conversion-optimization-engagement" },
  { text: "UX/CRO vs Full Redesign vs New Landing Page", id: "ux-cro-vs-full-redesign-vs-new-landing-page" },
  { text: "Evidence: UX & Conversion Optimization in Action", id: "evidence-ux-conversion-optimization-in-action" },
  { text: "Where DigiXPro Delivers UX & Conversion Optimization", id: "where-digixpro-delivers-ux-conversion-optimization" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function WebsiteUxConversionOptimizationView() {
  const currentUrl = "https://www.digixpro.in/design-services/website-ux-conversion-optimization";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website UX & Conversion Optimization Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Website UX & Conversion Optimization",
    "description": "Conversion rate optimization agency providing UX audit services, usability friction analysis, form optimization, and targeted conversion fixes for existing business websites.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "UX & Conversion Optimization Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Usability & UX Audit",
            "description": "User journey evaluation, mobile friction inspection, and form drop-off analysis."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conversion-Focused Fixes",
            "description": "Targeted headline, CTA layout, and lead form optimization on live pages."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Testing & Validation",
            "description": "Empirical before/after user session tracking and conversion analytics review."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reporting & Iteration",
            "description": "Prioritized remediation roadmaps and ongoing conversion performance monitoring."
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
          { name: 'Website UX & Conversion Optimization Services', url: currentUrl },
        ]}
      />
      <FAQSchema items={websiteUxCroFaqs} />

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
                Website UX &amp; Conversion Optimization Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Website UX &amp; conversion optimization improves how effectively an existing business website converts current traffic into qualified leads. Operating as a specialized conversion optimization agency, this service fixes usability bottlenecks, removes form friction, and refines CTA placement without requiring an expensive full site rebuild.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Turn existing website visitors into qualified commercial inquiries. Our professional UX audit services analyze user journeys, identify conversion drop-offs, and implement targeted usability fixes on your live web assets—maximizing lead yield from your current marketing traffic.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Our website gets traffic, but we aren&apos;t getting enough lead inquiries from current visitors.&rdquo;
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

            {/* RIGHT COLUMN: Engineering Spec Panel */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm sticky top-28">
                <div className="flex items-center justify-between gap-3 mb-5 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <span className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a]">
                    SPEC SHEET // DELIVERABLES
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">CRO SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  UX &amp; CRO Optimization Deliverables
                </h3>

                <div className="space-y-4">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      DIAGNOSTIC AUDIT
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Usability &amp; Mobile Friction Audit
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      REMEDIATION ROADMAP
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Prioritized Impact-vs-Effort Fix Matrix
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      TARGETED EXECUTION
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Form &amp; CTA Layout Optimization
                    </div>
                  </div>

                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Execution Model</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Live Code Fixes (No Full Rebuild)</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Validation Method</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Empirical User Session Tracking</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Primary Focus</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Inquiry &amp; Lead Conversion UX</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need a CRO review?</span>
                  <Link href="/audit" className="text-xs font-bold text-[#16a34a] hover:underline flex items-center">
                    Request Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE OF CONTENTS BLOCK */}
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
        {/* SECTION 1 (H2) — LEDGER ROWS RIGHT COLUMN */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — definition
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Heading & Body */}
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <h2 id="what-is-website-ux-conversion-optimization" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Website UX &amp; Conversion Optimization?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Website UX and conversion rate optimization services focus on maximizing lead inquiries from existing website traffic by identifying and resolving usability friction. Rather than replacing a functional codebase, our expert UX audit evaluates real user navigation patterns, mobile form completion rates, and visual hierarchy to eliminate drop-off points.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                By streamlining mobile tap targets, clarifying offer headlines, and simplifying lead form fields, targeted CRO delivers immediate improvements in inquiry conversion rates. This approach optimizes commercial outcomes from your existing marketing ad spend and organic search traffic without incurring the time and cost of a full website rebuild.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Usability &amp; Friction Audit</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Diagnostic inspection of mobile navigation, form drop-offs, visual hierarchy, and CTA visibility across key conversion routes.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Conversion-Focused Fixes</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Executing targeted headline, layout, and lead form adjustments directly on your live website without structural platform changes.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Measured, Tested Improvements</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Tracking real before-and-after user session data to validate conversion gains empirically rather than assuming visual fixes worked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 (H2) — EDITORIAL 3-COLUMN LAYOUT */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              02 — audience
            </div>
            <h2 id="who-needs-ux-conversion-optimization" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Traffic Thresholds Signalling the Need for Website Conversion Optimization
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Targeted conversion optimization services are designed for organizations that generate steady website traffic but experience lower-than-expected inquiry rates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Traffic Without Inquiries
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Websites receiving consistent organic or ad traffic but suffering from high bounce rates and disappointing monthly lead form submissions.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Uncertain Design Friction
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Businesses unsure whether complex navigation, confusing messaging, or poor mobile form layout is actively costing them qualified prospects.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Seeking Data-Backed Fixes
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Companies seeking targeted, data-backed conversion improvements from a conversion optimization company rather than committing to a full redesign.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ZONE 3: PROCESS & INCLUSIONS (SECTION 3 & SECTION 4) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        {/* SECTION 3 (H2) — PROCESS STEPS WITH NUMBERED NODES */}
        <div className="mb-20">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              03 — process
            </div>
            <h2 id="digixpros-ux-conversion-optimization-process" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s UX &amp; Conversion Optimization Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our four-stage UX engineering diagnostic methodically pinpoints and eliminates friction across live transaction funnels.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                UX &amp; Conversion Audit
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Usability evaluation, mobile navigation inspection, and form drop-off analysis on your actual live website to pinpoint friction points.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Prioritized Fix Roadmap
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Audit findings compiled into an actionable remediation matrix ranking recommendations by expected commercial impact versus engineering effort.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Implementation
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Targeted copy adjustments, CTA layout refinements, and form simplification deployed directly to live pages without full site rebuilds.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Testing &amp; Measurement
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Real before-and-after user session metrics and lead inquiry data evaluated to validate performance gains empirically.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 (H2) — WHAT'S INCLUDED (2x2 HAIRLINE MATRIX) */}
        <div>
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              04 — deliverables
            </div>
            <h2 id="whats-included-in-a-ux-conversion-optimization-engagement" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in a UX &amp; Conversion Optimization Engagement
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Comprehensive UX audit services and targeted conversion engineering deliverables tailored for active commercial websites.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                DIAGNOSTIC SCOPE // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Search className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Usability &amp; UX Audit
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Professional website UX audit evaluating user friction</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Mobile viewport readability &amp; tap-target inspection</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Transparent audit engagement pricing (view <Link href="/pricing" className="text-[#16a34a] hover:underline font-semibold">Pricing</Link>)</li>
              </ul>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                TARGETED FIXES // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Sliders className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Conversion-Focused Fixes
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Lead form field simplification &amp; instant validation</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Primary call-to-action button placement &amp; styling</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Headline message alignment for buyer intent</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                VALIDATION // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <BarChart3 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Testing &amp; Validation
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Empirical before/after user session tracking</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Conversion funnel drop-off comparison</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Real-world inquiry volume verification</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                REPORTING // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Reporting &amp; Iteration
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Executive diagnostic summary &amp; annotated mocks</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Prioritized engineering fix recommendations</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Ongoing conversion performance monitoring options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 4: COMPARISON TABLE (SECTION 5) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto text-left mb-12">
          <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            05 — decision
          </div>
          <h2 id="ux-cro-vs-full-redesign-vs-new-landing-page" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
            UX/CRO vs Full Redesign vs New Landing Page
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            Evaluating whether your business requires targeted usability fixes, a complete codebase rebuild, or a single dedicated campaign page.
          </p>
          <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
            Audit your current conversion deficit to decide between systematic interface optimization and complete architectural rebuilding.
          </p>
        </div>

        <div className="overflow-x-auto max-w-[1200px] mx-auto">
          <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/80 font-plex-mono text-xs text-neutral-500">
                <th className="p-4 font-bold uppercase tracking-wider w-1/4">Evaluation Metric</th>
                <th className="p-4 font-bold uppercase tracking-wider text-[#16a34a] bg-emerald-50/50 dark:bg-emerald-950/40 border-l-2 border-[#16a34a] w-1/4">
                  UX/CRO (DigiXPro)
                </th>
                <th className="p-4 font-bold uppercase tracking-wider w-1/4">Full Website Redesign</th>
                <th className="p-4 font-bold uppercase tracking-wider w-1/4">New Dedicated Landing Page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Scope of change</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Targeted copy, form, and CTA fixes on live pages
                </td>
                <td className="p-4">Complete codebase, design token &amp; layout rebuild</td>
                <td className="p-4">Single standalone campaign page build</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Cost</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Lower investment; optimizes existing traffic
                </td>
                <td className="p-4">Higher investment; full project scope</td>
                <td className="p-4">Moderate investment; focused ad campaign asset</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Timeline</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  1 to 2 weeks for audit &amp; targeted fixes
                </td>
                <td className="p-4">4 to 8 weeks for end-to-end engineering</td>
                <td className="p-4">1 to 2 weeks for page build &amp; launch</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">When it&apos;s the right fit</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Current site foundation is sound but underconverting
                </td>
                <td className="p-4">Legacy CMS platform, severe speed debt, outdated brand</td>
                <td className="p-4">Launching specific ad campaign or promo offer</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Best for</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Businesses wanting quick lead improvements
                </td>
                <td className="p-4">Companies replacing bloated legacy software</td>
                <td className="p-4">Marketing teams driving paid ad traffic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ZONE 5: EVIDENCE (SECTION 6) — 3 CARDS EXCEPTION */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto text-center mb-12">
          <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            06 — proof
          </div>
          <h2 id="evidence-ux-conversion-optimization-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
            Evidence: UX &amp; Conversion Optimization in Action
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Inspect real-world evidence of usability improvements, mobile conversion funnel design, and catalog navigation UX.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto mb-10 text-left">
          {/* Card 1: DigiXPro Platform UX */}
          <div>
            <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
              CASE FILE 01 // PLATFORM UX FUNNEL
            </div>
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                  DigiXPro Platform UX
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Inspected in production: built-in sticky mobile CTA, guided technical architecture audit funnel (/audit), sub-second DOM interaction, and zero third-party plugin friction.
                </p>
              </div>
              <Link 
                href="/evidence/digixpro" 
                className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center mt-auto"
              >
                View case study &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: 360 Neck & Shoulder Care */}
          <div>
            <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
              CASE FILE 02 // PATIENT UX FUNNEL
            </div>
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                  360 Neck &amp; Shoulder Care
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Clinical patient acquisition UX design: streamlined mobile treatment discovery, reduced patient booking friction, and clear service intent hierarchy.
                </p>
              </div>
              <Link 
                href="/evidence/360-neck-shoulder" 
                className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center mt-auto"
              >
                View case study &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3: BuySecondhandBook */}
          <div>
            <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
              CASE FILE 03 // CATALOG USABILITY UX
            </div>
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                  BuySecondhandBook
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  E-commerce catalog usability optimization: instant catalog search filters, streamlined checkout flow UX, sub-second product page loads, and friction-free purchase pathways.
                </p>
              </div>
              <Link 
                href="/evidence/buy-secondhand-book" 
                className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center mt-auto"
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

      {/* ZONE 6: LOCATION (SECTION 7) */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mb-3">
          <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            07 — coverage
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Left Column: Heading & Body */}
          <div className="lg:col-span-7 mb-10 lg:mb-0">
            <h2 id="where-digixpro-delivers-ux-conversion-optimization" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Where DigiXPro Delivers UX &amp; Conversion Optimization
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              DigiXPro delivers UX audit and conversion rate optimization services from Noida and Delhi NCR, serving growing business clients across India and international markets.
            </p>
          </div>

          {/* Right Column: Spec Panel with SERVED_CITIES & GLOBAL_TARGET_MARKETS */}
          <div className="lg:col-span-5">
            <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm">
              <div className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a] mb-3">
                GEOGRAPHIC COVERAGE // MARKETS
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-4 font-plex-sans">
                Served Markets &amp; Target Regions
              </h3>
              
              <div className="space-y-4 text-xs font-plex-mono">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border-l-4 border-[#16a34a]">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">REGIONAL MARKETS</div>
                  <div className="text-neutral-800 dark:text-neutral-200 font-semibold">{SERVED_CITIES}</div>
                </div>

                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border-l-4 border-[#16a34a]">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">GLOBAL MARKETS</div>
                  <div className="text-neutral-800 dark:text-neutral-200 font-semibold">{GLOBAL_TARGET_MARKETS}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 7: FAQS (SECTION 8) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto text-left mb-12">
          <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            08 — questions
          </div>
          <h2 id="frequently-asked-questions" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Clear answers regarding UX audits, conversion rate optimization, pricing, and website redesign trade-offs.
          </p>
        </div>

        <div className="max-w-[840px] mx-auto space-y-4">
          {websiteUxCroFaqs.map((faq, idx) => {
            const isOpen = !!openFaqs[idx];
            return (
              <div 
                key={idx}
                className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/50 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-black dark:text-white hover:text-[#16a34a] dark:hover:text-[#16a34a] transition-colors font-plex-sans text-base"
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isOpen ? 'transform rotate-180 text-[#16a34a]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60 font-sans">
                    {renderTextWithLinks(faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ZONE 8: FINAL CTA */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
          <span className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
            COMMERCIAL DISCOVERY
          </span>
          <h2 className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight font-plex-sans">
            Ready to turn your website visitors into qualified leads?
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Book an architecture discovery session to evaluate your current website usability bottlenecks, form drop-offs, and conversion optimization opportunities.
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

      <DeferredStickyMobileCTA />
    </div>
  );
}
