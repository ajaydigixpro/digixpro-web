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
  MapPin,
  Building2,
  Layers,
  ShieldCheck,
  CheckCircle2,
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

export const localSeoFaqs = [
  {
    question: "How much does local SEO cost in India?",
    answer: "Local SEO cost in India typically ranges based on target location scope, multi-branch management needs, Google Business Profile optimization, and local competition. Professional local search engineering packages or monthly retainers cover profile setup, NAP citation synchronization, localized landing page architecture, and structured schema implementation. To review transparent local search investment packages and baseline pricing benchmarks, visit the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "What is Google Business Profile (GBP) optimization?",
    answer: "Google Business Profile (GBP) optimization is the process of completing, verifying, and structuring a local business profile to maximize visibility in Google Maps and local 3-Pack search results. This includes configuring primary and secondary business categories, specifying precise service areas, adding high-resolution photo assets, publishing regular business updates, and embedding structured LocalBusiness JSON-LD schema on the associated website to establish strong local search signals."
  },
  {
    question: "How is Google Business Profile ranking determined?",
    answer: "Google Business Profile rankings are determined by three primary local search algorithm factors: relevance, distance (proximity), and prominence. Relevance measures how accurately a business profile matches a user's search query, distance calculates geographical proximity to the searcher, and prominence evaluates review volume, ratings, NAP citation consistency, and external web authority. Optimizing categories, service areas, and local schema signals reinforces these three core ranking pillars."
  },
  {
    question: "How can I check my Google Business Profile ranking?",
    answer: "Checking your Google Business Profile ranking requires inspecting local map pack positions across specific geographic target areas. Standard search queries from a fixed desktop IP can skew results based on physical location; localized search tools or manual geo-targeted browser checks provide an accurate view of Local 3-Pack rankings. To evaluate your current profile status and map visibility, request a quick check via the [DigiXPro Technical Audit](/audit)."
  },
  {
    question: "How to rank higher on Google Maps?",
    answer: "To rank higher on Google Maps, businesses must optimize their Google Business Profile, maintain exact Name, Address, and Phone (NAP) consistency across external local directories, and gather steady customer reviews. Key technical steps include selecting accurate primary categories, adding detailed service offerings, embedding LocalBusiness JSON-LD schema on landing pages, and publishing weekly profile posts to signal active business operations to Google's local search algorithms."
  },
  {
    question: "How to improve local SEO rankings?",
    answer: "Improving local SEO rankings requires a synchronized combination of Google Business Profile management, on-page localized content, directory citation cleanup, and review generation. Websites must build dedicated location pages for primary service areas, embed geo-targeted keywords within H1 headings and meta descriptions, ensure sub-second mobile loading performance, and clean up conflicting directory listings to build geographic trust with search engine crawlers."
  },
  {
    question: "Does local SEO actually work?",
    answer: "Yes, local SEO actively drives high-intent customer inquiries, phone calls, and foot traffic for physical clinics, retail locations, and regional service providers. Over 80% of local mobile searches result in offline visits or direct inquiries within 24 hours. By positioning a business within the top Google Maps Local 3-Pack, local SEO captures prospective clients at the exact moment they search for immediate nearby solutions without requiring continuous paid ad spend."
  },
  {
    question: "How to get more Google Maps reviews?",
    answer: "Getting more Google Maps reviews requires establishing a structured, automated post-service review capture process. Service businesses should send direct review request links via SMS or WhatsApp immediately following a positive customer interaction, display physical QR codes at reception desks, and systematically follow up with clients. Responding promptly to all incoming reviews—both positive and negative—signals active management to both prospective clients and Google's ranking algorithms."
  },
  {
    question: "Local SEO vs (general) SEO — what's the difference?",
    answer: "Local SEO optimizes web presence for geographically specific \"near me\" searches and Google Maps 3-Pack listings, targeting nearby customers who require local service providers. General organic SEO targets national or global keywords on standard search result pages without map integration. Local SEO prioritizes Google Business Profiles, NAP citation synchronization, and local review signals. To understand broad technical search engine optimization for non-geographical queries, explore our dedicated [SEO & Search Visibility](/search-automation/seo-search-visibility) service page."
  }
];

export default function LocalSeoLeadVisibilityView() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const tocSections = [
    { id: 'what-is-local-seo-local-lead-visibility', text: 'What Is Local SEO & Local Lead Visibility?' },
    { id: 'who-needs-local-seo-local-lead-visibility', text: 'Who Needs Local SEO & Local Lead Visibility' },
    { id: 'digixpros-local-seo-process', text: "DigiXPro's Local SEO Process" },
    { id: 'whats-included-in-local-seo-engineering', text: "What's Included in Local SEO Engineering" },
    { id: 'local-seo-vs-local-google-ads-vs-diy-google-business-profile', text: 'Local SEO vs Local Google Ads vs DIY GBP' },
    { id: 'evidence-local-visibility-in-action', text: 'Evidence: Local Visibility in Action' },
    { id: 'where-digixpro-delivers-local-seo', text: 'Where DigiXPro Delivers Local SEO' },
    { id: 'frequently-asked-questions-local-seo', text: 'Frequently Asked Questions About Local SEO' },
  ];

  const currentUrl = 'https://www.digixpro.in/search-automation/local-seo-lead-visibility';

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Local SEO & Local Lead Visibility Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Local SEO & Google Maps Optimization",
    "description": "Enterprise local SEO engineering and Google Maps 3-Pack optimization for service businesses. Dominating localized search queries, citation fidelity, and high-intent buyer calls.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Local SEO Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Google Business Profile Optimization",
            "description": "Complete profile auditing, category optimization, geocoded photo assets, and weekly review response workflows."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local Citation Synchronization",
            "description": "Multi-directory NAP (Name, Address, Phone) consistency audits, automated duplicate removal, and localized link authority."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hyper-Local Landing Pages",
            "description": "City and neighborhood landing page engineering with localized schema graphs and geo-targeted service content."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local Review & Conversion Engine",
            "description": "Reputation acquisition frameworks, direct SMS review requests, and high-intent call tracking."
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
          { name: 'Search, AI & Automation', url: 'https://www.digixpro.in/search-automation' },
          { name: 'Local SEO & Local Lead Visibility', url: currentUrl },
        ]}
      />
      <FAQSchema items={localSeoFaqs} />

      {/* ZONE 1: HERO & TOC SECTION (CANONICAL PAGE 1/2 LAYOUT STRUCTURE) */}
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
            {/* LEFT COLUMN: Hero copy, GEO summary, Buttons */}
            <div className="lg:col-span-7">
              <h1 className="hero-lcp-heading text-[38px] md:text-[54px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white font-plex-sans">
                Local SEO Services for Noida, Delhi NCR &amp; Beyond
              </h1>

              {/* QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Local SEO engineering optimizes Google Business Profiles, NAP citation consistency, localized schema markup, and proximity ranking signals to position physical and multi-location businesses at the top of Google Maps Local 3-Pack and regional search results.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Local search optimization is the technical engineering of business web assets and map profiles to capture high-intent nearby prospective clients. Unlike broad national campaigns, local SEO focuses on proximity search intent, Google Maps 3-Pack ranking, and directory NAP synchronization.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;How do local clinics, retail locations, and regional service providers capture nearby customers actively searching on Google Maps?&rdquo;
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
                    SPEC SHEET // LOCAL SEO DISCIPLINE
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">ENGINEERING SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Local SEO Engineering Scope
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      GOOGLE BUSINESS PROFILE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Google Business Profile &amp; Local 3-Pack Optimization
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      CITATION &amp; NAP CONSISTENCY
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Directory Citation &amp; NAP Consistency Sync
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      LOCAL SCHEMA MARKUP
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      LocalBusiness &amp; MedicalBusiness JSON-LD Plumbing
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Target Platforms</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Google Maps, Local Search &amp; GBP</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Signal Strategy</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Geo-Targeted Content &amp; Review Pathways</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Reporting Standard</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Verified Maps &amp; Organic Lead Data</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need a local audit?</span>
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
              <h2 id="what-is-local-seo-local-lead-visibility" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Local SEO &amp; Local Lead Visibility?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Local SEO is a specialized search engine optimization discipline focused on positioning physical clinics, retail stores, and service area businesses in Google Maps Local 3-Pack results and localized search listings. Unlike national organic search campaigns that compete across broad geographical regions, local SEO optimizes for high-intent proximity queries—such as prospective clients searching for nearby providers at their exact moment of need. Engaging a dedicated <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">local SEO company</Link> ensures your physical locations capture qualified walk-ins, phone calls, and appointment bookings.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Achieving dominant local visibility requires configuring verified Google Business Profiles, synchronizing Name, Address, and Phone (NAP) citations across directory ecosystems, and implementing LocalBusiness JSON-LD schema markup. Professional <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">local SEO services India</Link> build defensible local trust signals, connecting location data, authentic customer reviews, and geo-targeted service pages to establish top map rankings and continuous local lead volume.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Google Maps &amp; Local Pack Visibility</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Dominating 3-Pack map rankings for high-intent &ldquo;near me&rdquo; and city-specific commercial searches.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Google Business Profile Optimization</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Configuring primary categories, service areas, photos, posts, and Q&amp;A features for maximum local trust.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Proximity &amp; Review Signals</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Building NAP citation consistency, localized schema markup, and structured customer review capture processes.
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
            <h2 id="who-needs-local-seo-local-lead-visibility" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              High-Intent Local Search Profiles Requiring Local SEO
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Whether evaluating an ongoing search strategy or looking to hire <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO services near me</Link>, local lead visibility engineering is designed for physical practices and service providers seeking predictable local customer acquisition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Single-Location Service Businesses Losing Customers
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Local clinics, law practices, diagnostic centers, and repair firms losing nearby prospective clients to competitors who dominate the Google Maps 3-Pack.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Multi-Location Enterprises Needing Branch Consistency
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Regional brands and multi-branch networks requiring synchronized Google Business Profiles, unified NAP listings, and localized landing pages across all locations.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Relying on &ldquo;Near Me&rdquo; Search Volume
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Service area businesses and emergency service providers dependent on instant mobile phone calls, direct directions, and high-intent walk-in appointments.
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
            <h2 id="digixpros-local-seo-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s Local SEO Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our systematic 4-phase local SEO process replaces speculative marketing with structured Google Business Profile management, technical schema plumbing, and ongoing local signal optimization.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Local Audit &amp; GBP Assessment</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We review your current Google Business Profile configuration, map pack positions, NAP directory consistency, and primary competitor coverage.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Profile &amp; Listing Optimization</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We correct primary categories, update operational service areas, publish structured profile posts, and populate verified business assets.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">On-Page &amp; Technical Local Signals</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We engineer localized service landing pages, inject LocalBusiness JSON-LD schema markup, and synchronize NAP details sitewide.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Reviews, Citations &amp; Ongoing Tracking</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We deploy customer review request workflows, submit listings to authoritative local directories, and track real map pack rankings over time.
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
            <h2 id="whats-included-in-local-seo-engineering" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in Local SEO Engineering
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Explore transparent investment benchmarks in the DigiXPro Investment Guide to evaluate milestone scopes or review custom <Link href="/pricing" className="text-[#16a34a] font-semibold hover:underline">local SEO packages India</Link>.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                GOOGLE BUSINESS PROFILE // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <MapPin className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Google Business Profile Optimization
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Audit and optimization of primary and secondary business categories</li>
                <li>- Weekly profile updates, post publishing, and Q&amp;A configuration</li>
                <li>- Photo asset management and geotagged image updates</li>
              </ul>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                LOCAL ON-PAGE &amp; SCHEMA // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Local On-Page &amp; Schema Engineering
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Geo-targeted service landing page architecture and copy</li>
                <li>- LocalBusiness and MedicalBusiness JSON-LD schema injection</li>
                <li>- Sub-second mobile performance and Core Web Vitals optimization</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                CITATIONS &amp; NAP // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Building2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Citations &amp; NAP Synchronization
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Directory audit across major data aggregators and local sites</li>
                <li>- Name, Address, and Phone (NAP) discrepancy cleanup</li>
                <li>- High-authority local citation building and ecosystem sync</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                REVIEWS &amp; REPUTATION // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <ShieldCheck className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Reviews &amp; Local Reputation Signals
              </h4>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
                <li>- Structured post-service review capture process and QR flows</li>
                <li>- Review monitoring and consultative response guidelines</li>
                <li>- Ongoing Google Maps Local 3-Pack rank tracking and reporting</li>
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
            <h2 id="local-seo-vs-local-google-ads-vs-diy-google-business-profile" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Local SEO vs Local Google Ads vs DIY Google Business Profile
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Partnering with a specialized local SEO company provides the citation accuracy, map pack optimization, and local trust signals required for sustainable local growth.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Choose the right approach based on cost predictability, how long results last, and how much control you keep.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/4 border-l-2 border-[#16a34a]">Local SEO (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Local Google Ads</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">DIY Google Business Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost over time</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Fixed monthly retainer or setup fee with compounding organic lead equity.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Continuous cost-per-click spend; lead flow stops immediately when budget ends.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Free initial setup, but high opportunity cost from uncaptured local market share.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Time to first results</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">30 to 60 days for initial map movement; steady compounding over 3–6 months.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Immediate ad placement within 24–48 hours of campaign approval.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Unpredictable; profile may sit unranked indefinitely without proper optimization.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Longevity after stopping</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Long-lasting organic map authority and established citation equity.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Zero longevity; traffic and lead volume terminate instantly when spend stops.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Minimal long-term value; susceptible to competitive listing displacement.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Control &amp; ownership</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">100% ownership of optimized web assets, schemas, and citation accounts.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Dependent on ad auction dynamics and fluctuating cost-per-click rates.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Full ownership but limited technical control over complex local schema signals.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best for</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Clinics and service businesses building long-term, non-paid local lead channels.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Short-term promotions or immediate seasonal campaign lead bursts.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Micro-businesses with zero budget testing basic local online presence.</td>
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
            <h2 id="evidence-local-visibility-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Local Visibility in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspect real-world evidence of local search trust architecture, Google Maps 3-Pack positioning, and patient lead acquisition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-10 text-left">
            {/* Case File 1: Dr Aggarwal Physio Centre */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // HEALTHCARE LOCAL SEO
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-28px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    Dr Aggarwal Physio Centre
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Zero-to-one local search trust architecture across 2 Noida clinic locations: Top 3 rank for core local physiotherapy queries, MedicalBusiness JSON-LD schemas, and 10x organic inquiry growth.
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

            {/* Case File 2: 360 Neck & Shoulder Care */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // SPECIALIST CLINIC LOCAL SEARCH
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-28px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    360 Neck &amp; Shoulder Care
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Decoupled specialist clinic web architecture for cervical spine care (360neckshoulder.com): 10+ keywords #1 on Bing, Page 3-4 Google organic rankings within months, and direct patient intake.
                  </p>
                </div>
                <Link 
                  href="/evidence/360-neck-shoulder" 
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
        {/* SECTION 7 (H2) — DELIVERY BOUNDARIES WITH UNIFIED CITY COVERAGE */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              07 — delivery
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Reading Copy */}
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <h2 id="where-digixpro-delivers-local-seo" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers Local SEO
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                DigiXPro provides specialized local search engineering and Google Business Profile optimization for growing practices and service enterprises throughout the National Capital Region. As a dedicated <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company in Noida</Link> and <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company in Delhi NCR</Link>, we help local clinics, professional firms, and multi-branch businesses achieve dominant map pack positioning. Whether you require a specialized <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company in Gurgaon</Link> or the <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">best SEO company in Noida</Link>, our engineering-first methodology builds defensible local search authority.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                DigiXPro supports regional service providers and commercial enterprises across major Indian hubs. Businesses seeking authoritative <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO services Delhi</Link> or a trusted <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company Delhi</Link> leverage our local schema and citation frameworks to dominate regional search results. We deliver targeted local lead visibility for organizations seeking a leading <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company in Mumbai</Link>, <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">Mumbai SEO agency</Link>, <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company in Pune</Link>, or an authoritative <Link href="/search-automation/local-seo-lead-visibility" className="text-[#16a34a] font-semibold hover:underline">SEO company in Bangalore</Link>, establishing nationwide geographic search trust without fragmenting domain authority across separate city subdomains.
              </p>
            </div>

            {/* Right Column: Spec-Panel Component (No Corner Brackets) */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-7 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="font-plex-mono text-xs font-bold uppercase tracking-wider text-[#16a34a]">
                    DELIVERY BOUNDARIES
                  </span>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                    INDIAN HUBS &bull; GLOBAL
                  </span>
                </div>
                
                <div className="space-y-4 font-plex-mono text-xs">
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">
                      Local coverage
                    </span>
                    <span className="text-black dark:text-white font-semibold text-xs font-sans">
                      {SERVED_CITIES}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-400 dark:text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">
                      Global reach
                    </span>
                    <span className="text-black dark:text-white font-semibold text-xs font-sans">
                      {GLOBAL_TARGET_MARKETS}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 (H2) — FAQ ACCORDION (CLOSED BY DEFAULT) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-center mb-16">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              08 — questions
            </div>
            <h2 id="frequently-asked-questions-local-seo" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Frequently Asked Questions About Local SEO
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Clear technical answers regarding Google Business Profiles, Local 3-Pack map rankings, citation building, and localized search visibility.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {localSeoFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base md:text-lg font-bold text-black dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#16a34a] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                    {renderTextWithLinks(faq.answer)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CONVERSION SECTION (DARK BLOCK, IBM PLEX SANS) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
            <span className="font-plex-mono text-[11px] font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
              COMMERCIAL DISCOVERY
            </span>
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight font-plex-sans">
              Ready to dominate Google Maps and local search results in your area?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto font-plex-sans">
              Connect with our local search engineers for a 30-minute technical review of your Google Business Profile and local search footprint.
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

      <DeferredStickyMobileCTA />
    </div>
  );
}
