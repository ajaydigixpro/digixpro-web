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
  RefreshCw,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Globe,
  ChevronDown,
  ListFilter
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

export const websiteRedesignFaqs = [
  {
    question: "How much does a website redesign typically cost?",
    answer: "A website redesign typically costs based on total page count, visual customization requirements, database complexity, and SEO migration scope. Rebuilding an existing website requires auditing legacy URLs, mapping 301 redirects, transferring metadata, and modernizing frontend code architecture. To explore transparent pricing tiers and project scope options, review the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "What factors affect a website redesign's cost breakdown?",
    answer: "Key factors driving a website redesign cost breakdown include site scale (number of template layouts and subpages), content migration requirements, custom UI/UX design depth, third-party API integrations, and SEO redirect planning. Complex platforms transitioning off bloated monolithic CMS environments into modern React/Next.js or custom PHP engines require dedicated database migration and schema validation, which shapes the overall investment scope."
  },
  {
    question: "How to redesign a website without losing SEO rankings?",
    answer: "To redesign a website without losing SEO rankings, a structured SEO migration protocol must be executed alongside codebase development. First, audit all existing indexed URLs, top-performing landing pages, and keyword rankings using Search Console data. Next, establish a strict 1-to-1 301 URL redirect map ensuring legacy page URLs route seamlessly to new equivalents without 404 errors. Retain critical H1 heading structures, meta descriptions, and JSON-LD schema markup during content migration. Finally, deploy the new build with verified server redirects and conduct post-launch crawl audits to confirm search engines process the updated architecture without indexation drops."
  },
  {
    question: "What should be included in a website redesign checklist?",
    answer: "A comprehensive website redesign checklist spans five core phases: pre-launch SEO audit, UI/UX wireframing, frontend development, URL redirect mapping, and post-launch verification. Essential technical checks include auditing legacy URLs, mapping 301 redirects, testing mobile responsive viewports across breakpoints, validating HTML5 semantic structure, checking sub-second Core Web Vitals page speed, confirming SSL certificate encryption, and submitting updated XML sitemaps to Google Search Console upon launch."
  },
  {
    question: "How long does a website redesign take?",
    answer: "A professional website redesign generally takes 3 to 6 weeks from initial technical audit to live production launch. Standard corporate website rebuilds featuring 10 to 20 template pages are typically completed within 3 to 4 weeks. Larger enterprise platforms or e-commerce migrations requiring extensive custom database engineering, multi-language routing, and comprehensive 301 URL redirect testing follow a 5 to 6 week development roadmap to ensure zero search ranking loss."
  },
  {
    question: "Does a website redesign include migration, and what does that cost?",
    answer: "Yes, professional website redesign services include full content and SEO migration as a standard core deliverable. Migration covers exporting legacy database records, transferring media assets, preserving metadata tags, and implementing server-level 301 URL redirects. Migration complexity depends on database size and legacy URL structures. To evaluate detailed migration scope options and investment benchmarks, consult the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "Does DigiXPro redesign WordPress websites specifically?",
    answer: "Yes, DigiXPro specializes in wordpress website redesign services, replacing slow, plugin-heavy WordPress installations with modern, decoupled Next.js/React codebases or custom PHP engines. Rebuilding legacy WordPress sites eliminates vulnerability risks from unpatched plugins, speeds up page load performance to 100% Core Web Vitals scores, and preserves established organic search rankings through precise 301 redirect mapping."
  }
];

export default function WebsiteRedesignView() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const tocSections = [
    { id: 'what-is-website-redesign-seo-safe-rebuild', text: 'What Is a Website Redesign & SEO-Safe Rebuild?' },
    { id: 'who-needs-website-redesign-services', text: 'Who Needs a Website Redesign' },
    { id: 'digixpros-seo-safe-redesign-process', text: "DigiXPro's SEO-Safe Redesign Process" },
    { id: 'whats-included-in-website-redesign', text: "What's Included in a Website Redesign" },
    { id: 'seo-safe-redesign-vs-rebuild-from-scratch-vs-do-nothing', text: 'Redesign vs Rebuild from Scratch vs Do Nothing' },
    { id: 'evidence-seo-safe-redesign-in-action', text: 'Evidence: SEO-Safe Redesign in Action' },
    { id: 'where-digixpro-delivers-website-redesign', text: 'Where DigiXPro Delivers Website Redesign' },
    { id: 'frequently-asked-questions-redesign', text: 'Frequently Asked Questions About Website Redesign' },
  ];

  const currentUrl = 'https://www.digixpro.in/design-services/website-redesign';

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Redesign & SEO-Safe Rebuild Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Website Redesign & Migration SEO",
    "description": "Enterprise website redesign and SEO-safe rebuild engineering. Modernize front-end UI/UX while preserving search ranking equity, backlink authority, and organic traffic.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Website Redesign Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design Modernization",
            "description": "Complete UI/UX overhaul with modern brand aesthetics, responsive design systems, and conversion-optimized components."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Equity Preservation",
            "description": "Comprehensive URL mapping, 301 redirect architecture, and preservation of meta structures and on-page topical authority."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Engineering",
            "description": "Core Web Vitals optimization, server-side caching, and sub-second load times."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conversion Architecture",
            "description": "Streamlined user flows, lead capture touchpoints, and friction-free inquiry pathways."
          },
          "position": 4
        }
      ]
    }
  };

  return (
    <div className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} selection:bg-[#16a34a]/20 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 min-h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaObj) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Design & Web Engineering', url: 'https://www.digixpro.in/design-services' },
          { name: 'Website Redesign & SEO-Safe Rebuild', url: currentUrl },
        ]}
      />
      <FAQSchema items={websiteRedesignFaqs} />

      {/* ZONE 1: HERO & TOC SECTION (CANONICAL PAGE 1/2 LAYOUT STRUCTURE) */}
      <section className="bg-white dark:bg-[#0A0A0A] pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/design-services"
            className="inline-flex items-center text-xs font-plex-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Design &amp; Web Engineering Hub
          </Link>

          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — definition
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start mb-12">
            {/* LEFT COLUMN: Hero copy, GEO summary, Buttons */}
            <div className="lg:col-span-7">
              <h1 className="hero-lcp-heading text-[38px] md:text-[54px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white font-plex-sans">
                Website Redesign &amp; SEO-Safe Rebuild Services
              </h1>

              {/* QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Website redesign and SEO-safe rebuild engineering modernizes an existing website&apos;s visual presentation and code architecture while systematically preserving accumulated organic search rankings, backlink equity, and URL structures through precise 301 redirect mapping.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Rebuilding an established website carries significant technical risk: an unmanaged redesign can wipe out years of organic search rankings, break existing incoming links, and destroy search traffic overnight.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;How do we redesign our website without losing our existing search rankings and Google traffic?&rdquo;
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

            {/* RIGHT COLUMN: Engineering Spec Panel (Page 1 Locked Layout) */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm sticky top-28">
                <div className="flex items-center justify-between gap-3 mb-5 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <span className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a]">
                    SPEC SHEET // DELIVERABLES
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">CANONICAL #08</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Website Redesign Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      CORE OBJECTIVE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Preserve Search Rankings &amp; Link Equity
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      MIGRATION STRATEGY
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      301 Redirect Mapping &amp; Schema Transfer
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      TARGET ARCHITECTURE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Decoupled Next.js / React or Custom PHP Engine
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Performance Target</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Sub-Second Core Web Vitals</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Deployment Model</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Zero-Downtime Migration</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Post-Launch</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Post-Launch Ranking Verification</span>
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
                {tocSections.map((sec, idx) => (
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

      {/* SECTION 1: DEFINITION & CORE VALUE (2-COLUMN) */}
      <section id="what-is-website-redesign-seo-safe-rebuild" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <div className="mb-3">
                <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                  01 — definition
                </span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-6 font-plex-sans">
                What Is a Website Redesign &amp; SEO-Safe Rebuild?
              </h2>
              <div className="space-y-4 text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  A website redesign and SEO-safe rebuild is the engineering process of overhauling an existing website&apos;s visual design, user experience, and technical code architecture while deliberately protecting its established search engine authority. Unlike building a brand-new website from scratch, redesigning an existing web property requires auditing historical URL structures, incoming backlink profiles, and keyword rankings to safeguard established search visibility and preserve accumulated link equity.
                </p>
                <p>
                  Professional website redesign services focus on eliminating legacy technical debt—such as bloated CMS plugins, slow loading speeds, broken mobile viewports, and outdated design systems—while mapping older URLs to new, high-performance page routes using server-level 301 redirects.
                </p>
                <p>
                  As an experienced website redesign agency, DigiXPro ensures that your brand refresh enhances conversion rates and visual authority without triggering search indexing drops, broken external links, or ranking penalties.
                </p>
              </div>
            </div>

            {/* Right Column: Ledger-style feature rows */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      URL &amp; 301 Redirect Preservation
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Mapping legacy page URLs to new architecture routes with 1-to-1 permanent redirects, preventing 404 errors and saving backlink equity.
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Ranking-Safe Migration Engineering
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Transferring established title tags, H1 heading hierarchies, meta descriptions, and JSON-LD schema markup seamlessly into new code.
                    </p>
                  </div>
                </div>

                <div className="pb-2 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Modern Architecture Upgrade
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Replacing bloated CMS templates with clean Next.js/React or custom PHP engines for sub-second Core Web Vitals page speed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TARGET FIT & AUDIENCE (EDITORIAL 3-COLUMN) */}
      <section id="who-needs-website-redesign-services" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                02 — audience
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              When an Existing Platform Requires a Full Website Redesign
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A website rebuild is essential when an existing site hinders sales conversions, suffers from technical debt, or risks losing organic search authority.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                01 // OUTDATED BRAND &amp; CREDIBILITY
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Sites Losing Visitor Trust &amp; Conversions
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Businesses operating websites with outdated visual layouts, non-responsive mobile viewports, or poor brand positioning that fails to convert incoming traffic.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Modern design system &amp; UX layout</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Mobile-first responsive viewports</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>High-conversion B2B lead capture</li>
              </ul>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                02 // CMS &amp; PLUGIN BLOAT
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Legacy WordPress Sites Suffering Slow Speeds
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Organizations utilizing wordpress website redesign services to migrate away from plugin bloat, security exploits, and sluggish loading performance.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Decoupled Next.js or custom PHP rebuild</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Zero third-party plugin bloat</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>100% Core Web Vitals performance</li>
              </ul>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                03 // ORGANIC TRAFFIC PROTECT
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Established Sites That Can&apos;t Risk Ranking Loss
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Companies with valuable organic search rankings and incoming backlink equity that require strict technical migration protocols during a rebuild.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>1-to-1 301 URL redirect mapping</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Metadata &amp; schema data transfer</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Post-launch Search Console audit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROCESS & METHODOLOGY (SCHEMATIC SEQUENCE - 4 STEPS) */}
      <section id="digixpros-seo-safe-redesign-process" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                03 — methodology
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              DigiXPro&apos;s SEO-Safe Redesign Process
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We execute a structured 4-phase technical redesign methodology designed to protect organic search traffic and deliver a modern web application.
            </p>
          </div>

          {/* Connected Schematic Container */}
          <div className="p-8 md:p-12 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Audit &amp; Ranking Baseline
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Document current indexed URLs, top-performing landing pages, keyword rankings, and backlink profiles before writing code.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Redesign &amp; URL Mapping
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Construct modern UI/UX design components and plan a comprehensive old-to-new 301 URL redirect map upfront.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Migration &amp; 301 Redirects
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Deploy new codebase with tested, verified 301 redirects, preserving meta titles, headings, and JSON-LD schema data.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Post-Launch Verification
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Monitor Google Search Console indexation, verify 301 header responses, and confirm organic search rankings remain stable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FULL SERVICE SCOPE (2x2 MATRIX CELLS) */}
      <section id="whats-included-in-website-redesign" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                04 — scope
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              What&apos;s Included in a Website Redesign
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our website redesign scope combines visual brand modernization, technical codebase rebuilding, and comprehensive SEO migration.
            </p>
          </div>

          {/* 2x2 Matrix Container */}
          <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x grid md:grid-cols-2 bg-white dark:bg-neutral-900">
            {/* Cell 01 */}
            <div className="p-8 border-b md:border-b-0 border-neutral-200 dark:border-neutral-800">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                REDESIGN SCOPE // 01 — UX &amp; VISUAL REFRESH
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                Design System &amp; Brand Modernization
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Bespoke UI/UX design tokens &amp; accessible color palette</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Mobile-first responsive viewports for smartphones &amp; tablets</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Clear visual typography hierarchy &amp; micro-interactions</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>High-converting B2B lead capture form architecture</li>
              </ul>
            </div>

            {/* Cell 02 */}
            <div className="p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                REDESIGN SCOPE // 02 — TECHNICAL REBUILD
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                Clean Code Architecture &amp; Performance
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Decoupled Next.js/React or custom PHP engine build</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Sub-second load times &amp; 100% Core Web Vitals benchmarks</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Zero third-party plugin bloat or security vulnerabilities</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Transparent website redesign cost options in our <Link href="/pricing" className="text-[#16a34a] font-semibold hover:underline">Investment Guide</Link></li>
              </ul>
            </div>

            {/* Cell 03 */}
            <div className="p-8 border-t border-neutral-300 dark:border-neutral-700">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                REDESIGN SCOPE // 03 — REDIRECTS &amp; MIGRATION
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                SEO Migration &amp; 301 Redirect Mapping
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Complete 1-to-1 old-to-new 301 URL redirect map</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Preservation of established meta titles &amp; H1 headings</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Automated JSON-LD structured data schema transfer</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>XML sitemap update &amp; search engine resubmission</li>
              </ul>
            </div>

            {/* Cell 04 */}
            <div className="p-8 border-t border-neutral-300 dark:border-neutral-700">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                REDESIGN SCOPE // 04 — MONITORING &amp; AUDITING
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                Post-Launch Audit &amp; Indexation Tracking
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Google Search Console crawl error &amp; 404 monitoring</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Organic keyword ranking stability tracking</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Server redirect response code header validation</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Rapid post-launch indexation troubleshooting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ARCHITECTURE COMPARISON (FULL-WIDTH SPEC TABLE) */}
      <section id="seo-safe-redesign-vs-rebuild-from-scratch-vs-do-nothing" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                05 — decision
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              SEO-Safe Redesign vs Rebuild from Scratch vs Do Nothing
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Choose the right approach based on ranking risk, investment cost, and how outdated the current site really is.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Factor</th>
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">DigiXPro SEO-Safe Redesign</th>
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Unplanned Rebuild from Scratch</th>
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/6">Do Nothing / Patch Site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">SEO &amp; Ranking Risk</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    Zero risk. Strict 301 URL redirect mapping, metadata preservation, and schema transfer.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    High risk. Unmapped URLs trigger 404 errors, causing organic traffic and ranking collapse.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Gradual ranking decay due to poor Core Web Vitals and outdated user experience.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Investment Cost Efficiency</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    High ROI. Retains accumulated domain authority while upgrading visual brand and code.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Double cost. Rebuilding without migration forces expensive recovery campaigns to regain lost traffic.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Wasteful ongoing spend patching plugin conflicts without fixing underlying architecture.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Implementation Timeline</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    3 to 6 weeks structured roadmap including redirect mapping and sandbox testing.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    4 to 8 weeks, often delayed by emergency post-launch fix requests when rankings break.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Immediate, but requires continuous recurring developer effort to patch site crashes.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Best Suited For</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    Established businesses with existing organic search traffic needing a modern, high-performing web presence.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Sites with zero search traffic or brand value where complete historical wipe is acceptable.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Temporary band-aid when budget prevents executing a proper technical rebuild.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: EVIDENCE & CASE FILES (VERIFIED PROOF) */}
      <section id="evidence-seo-safe-redesign-in-action" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                06 — proof
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Evidence: SEO-Safe Redesign in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore real-world production proof of URL redirect mapping, zero SEO reset migration, and legacy platform rebuilding across client builds and our own web platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case File Card 1: DigiXPro Platform Engine */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-neutral-900 text-white p-4 font-plex-mono text-xs flex justify-between items-center border-b border-neutral-800">
                  <span className="text-[#16a34a] font-bold">CASE FILE 01 // URL MIGRATION</span>
                  <span className="text-neutral-400 text-[10px]">DIGIXPRO ARCHITECTURE</span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-black dark:text-white font-plex-sans">
                    DigiXPro Platform Legacy Redirect Engine
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Production proof of SEO-safe URL preservation. During platform upgrades, legacy URLs like <code className="text-[#16a34a] bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-plex-mono">/services/website-design-services</code> and <code className="text-[#16a34a] bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-plex-mono">/services/ai-automation-agency</code> were mapped to clean routes (<code className="text-[#16a34a] bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-plex-mono">/design-services</code> and <code className="text-[#16a34a] bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-plex-mono">/search-automation/workflow-ai-automation</code>) with permanent 301 redirects, preserving accumulated search engine authority.
                  </p>
                  
                  <div className="space-y-2 border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-plex-mono">Redirect Method:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">Server-Level Permanent 301 Map</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-plex-mono">Link Equity Safeguard:</span>
                      <span className="font-bold text-[#16a34a]">Designed to Preserve Backlink Equity</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/evidence/digixpro"
                  className="inline-flex items-center text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
                >
                  View Case Study Proof <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Case File Card 2: BuySecondhandBook Commerce Engine */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-neutral-900 text-white p-4 font-plex-mono text-xs flex justify-between items-center border-b border-neutral-800">
                  <span className="text-[#16a34a] font-bold">CASE FILE 02 // PLATFORM REDESIGN</span>
                  <span className="text-neutral-400 text-[10px]">BUYSECONDHANDBOOK</span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-black dark:text-white font-plex-sans">
                    BuySecondHandBook Marketplace Engine
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Full legacy WordPress to custom PHP 8.4 engine migration. Re-engineered an eight-year heritage Delhi bookseller platform with zero data loss, zero SEO reset, 301 URL redirect mapping for product routes, and 99/100 Desktop PageSpeed performance.
                  </p>
                  
                  <div className="space-y-2 border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-plex-mono">Migration Type:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">WordPress → Custom PHP 8.4 Engine</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-plex-mono">Accumulated Equity:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">8+ Years Preserved (2018 – Present)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-plex-mono">SEO Migration Outcome:</span>
                      <span className="font-bold text-[#16a34a]">Zero Search Indexation Drop</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/evidence/buy-secondhand-book"
                  className="inline-flex items-center text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
                >
                  View Case Study Proof <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LOCAL DELIVERY & GLOBAL REACH (2-COLUMN) */}
      <section id="where-digixpro-delivers-website-redesign" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <div className="mb-3">
                <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                  07 — local delivery
                </span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-6 font-plex-sans">
                Where DigiXPro Delivers Website Redesign
              </h2>
              <div className="space-y-4 text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  As an established website redesign company in Delhi and Noida, DigiXPro delivers SEO-safe website rebuilds for corporate clients, regional enterprises, and growing businesses across Delhi NCR and major commercial centers.
                </p>
                <p>
                  We also extend specialized website redesign services Mumbai and across regional technology hubs, backing local consultation with remote cloud deployment infrastructure for B2B brands in the USA, UK, Australia, and Singapore.
                </p>
              </div>
            </div>

            {/* Right Column: Spec Panel with equal-weight delivery matrix */}
            <div className="lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider">
                    DELIVERY MATRIX // COVERAGE &amp; REACH
                  </span>
                </div>

                <div className="space-y-4 text-xs font-plex-mono">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="text-neutral-400 dark:text-neutral-500 uppercase text-[10px] mb-0.5">DEPLOYMENT ARCHITECTURE</div>
                    <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm font-sans">Remote Cloud VPS &amp; Local Onboarding</div>
                  </div>

                  <div className="py-2 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-400 dark:text-neutral-500 uppercase text-[10px] block mb-1">LOCAL &amp; REGIONAL DELIVERY</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed block font-sans">
                      {SERVED_CITIES}
                    </span>
                  </div>

                  <div className="py-2">
                    <span className="text-neutral-400 dark:text-neutral-500 uppercase text-[10px] block mb-1">GLOBAL REACH</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed block font-sans">
                      {GLOBAL_TARGET_MARKETS}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section id="frequently-asked-questions-redesign" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                08 — questions
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Frequently Asked Questions About Website Redesign
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Clear technical answers regarding website redesign cost, SEO ranking preservation, redirect mapping, and timelines.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {websiteRedesignFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-black dark:text-white focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                      {faq.question}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0 font-plex-mono text-sm text-neutral-600 dark:text-neutral-400">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div className={`px-6 pb-6 pt-0 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-14 ${isOpen ? 'block' : 'hidden'}`}>
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
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight font-plex-sans">
              Ready to redesign your website without risking search rankings or traffic?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto font-plex-sans">
              Book a 30-minute web engineering call to evaluate your site redesign roadmap, 301 URL redirect map, and technical migration plan.
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
