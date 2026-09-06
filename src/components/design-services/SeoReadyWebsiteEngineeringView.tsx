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
  ChevronDown,
  Search,
  ShieldCheck
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

export const seoReadyWebsiteFaqs = [
  {
    question: "How much does an SEO-friendly website cost?",
    answer: "Bespoke investment for an SEO-friendly custom website varies based on architectural scope, component hierarchy, technical routing complexity, and metadata schema depth. While generic template-based sites carry lower upfront stickers, retrofitting missing indexation plumbing, canonical graphs, and Core Web Vitals performance post-launch introduces substantial secondary remediation fees and search equity disruption. A custom engineering engagement delivers an autonomous search asset with built-in structured data and verified crawlability from day one. Transparent engagement tiers, milestone deliverables, and scoping benchmarks are detailed in the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "Does website design affect SEO ranking?",
    answer: "Yes, website design directly impacts search engine rankings through information architecture, visual hierarchy, Core Web Vitals performance, and mobile usability. Search engine crawlers evaluate page layout to determine content prominence, prioritizing clear semantic heading orders over decorative elements. Cluttered designs with heavy JavaScript animations, delayed text rendering, and intrusive layout shifts trigger poor user experience signals that suppress organic search visibility. Clean design engineering ensures both human visitors and search crawlers navigate content effortlessly."
  },
  {
    question: "What makes a website technically SEO-ready?",
    answer: "A technically SEO-ready website features semantic HTML5 document hierarchy, automated JSON-LD structured data schemas, canonical URL enforcement, clean XML sitemaps, optimized robots.txt directives, and sub-second mobile page speeds. Every page must be crawlable without relying on client-side JavaScript execution, ensuring search engine bots index critical commercial content on initial traversal. Furthermore, responsive media sizing prevents Cumulative Layout Shift (CLS), while secure SSL encryption and clean server response headers protect site integrity."
  },
  {
    question: "Does site speed affect SEO?",
    answer: "Site speed is a confirmed Google search ranking factor enforced through Core Web Vitals benchmarks. Pages that take longer than 2.5 seconds to render their primary content (Largest Contentful Paint) suffer ranking penalties on mobile search results. Beyond direct algorithm scoring, slow loading speeds increase visitor bounce rates, signaling to search engines that the page fails user intent. Engineering websites with static generation, compressed WebP imagery, and minimal script bloat guarantees the sub-second response times required for top-tier rankings."
  },
  {
    question: "Do I need schema markup on my website?",
    answer: "Yes, schema markup is essential for modern search visibility and artificial intelligence citation indexing. Embedding JSON-LD structured data provides search engines with unambiguous, machine-readable definitions of your organization, commercial services, author credentials, and frequently asked questions. Without structured schemas, search crawlers must infer context purely from raw text, missing rich search result opportunities like FAQ accordions, breadcrumb trails, and direct answers in generative search engines such as Google Gemini and Perplexity."
  },
  {
    question: "How is an SEO-ready website different from a regular website?",
    answer: "An SEO-ready website is engineered from line one with technical search indexability, structured data schemas, and Core Web Vitals speed built into the core codebase, whereas a regular website is typically designed purely for visual presentation without regard for crawler comprehension. While our [custom business website design services](/design-services/custom-business-website-design) provide full brand positioning and bespoke frontend layouts, SEO-ready website engineering specifically prioritizes strict canonical routing, schema injection, and technical crawlability to ensure organic discoverability from launch day."
  },
  {
    question: "Can a website be made SEO-friendly after it is built?",
    answer: "A website can technically be retrofitted for SEO after launch, but doing so is significantly more expensive, disruptive, and technically constrained than engineering it correctly from the beginning. Retrofitting often requires rewriting page template code, repairing broken URL paths with hundreds of redirects, re-architecting database queries to fix slow server response times, and restructuring heading tags across every live page. In severe cases involving rigid CMS themes or heavy page builders, achieving sub-second speed requires abandoning the platform and rebuilding entirely."
  },
  {
    question: "Should SEO be built into website development from the start?",
    answer: "SEO should always be integrated directly into website development from the very first phase of technical planning. Establishing URL taxonomy, information architecture, metadata schemas, and Core Web Vitals standards during development ensures that search crawlers index every page without friction upon public release. Planning search requirements upfront eliminates the duplicate engineering costs, ranking disruptions, and technical debt that inevitably accompany post-launch remediation efforts, providing a stable foundation for compounding organic search growth."
  }
];

export const h2TocSections = [
  { text: "What Is SEO-Ready Website Engineering?", id: "what-is-seo-ready-website-engineering" },
  { text: "Who Needs This Service", id: "who-needs-this-service" },
  { text: "DigiXPro's SEO-Ready Engineering Process", id: "digixpros-seo-ready-engineering-process" },
  { text: "What's Included", id: "whats-included" },
  { text: "Built-In SEO Engineering vs Retrofitted SEO vs No SEO Consideration", id: "builtin-seo-engineering-vs-retrofitted-seo-vs-no-seo-consideration" },
  { text: "Evidence: SEO-Ready Website Engineering in Action", id: "evidence-seo-ready-website-engineering-in-action" },
  { text: "Where DigiXPro Delivers This Service", id: "where-digixpro-delivers-this-service" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function SeoReadyWebsiteEngineeringView() {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [isAllOpen, setIsAllOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      const allOpenNow = seoReadyWebsiteFaqs.every((_, i) => !!next[i]);
      setIsAllOpen(allOpenNow);
      return next;
    });
  };

  const toggleAllFaqs = () => {
    const nextState = !isAllOpen;
    setIsAllOpen(nextState);
    const updated: Record<number, boolean> = {};
    seoReadyWebsiteFaqs.forEach((_, i) => {
      updated[i] = nextState;
    });
    setOpenFaqs(updated);
  };

  const currentUrl = 'https://www.digixpro.in/design-services/seo-ready-website-engineering';

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO-Ready Website Engineering",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "SEO Website Engineering & Technical Codebase SEO",
    "description": "SEO-ready website engineering embeds structured data schemas, crawlable information architecture, and sub-second Core Web Vitals speed directly into codebase construction.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO-Ready Web Engineering Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical Architecture",
            "description": "Semantic HTML5 hierarchy, deterministic canonical URL routing, dynamic XML sitemaps, and robots.txt directives."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automated Structured Data",
            "description": "Automated JSON-LD schemas for Organization, Service, and FAQPage compiled directly at build time."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Engineering",
            "description": "Sub-second mobile Core Web Vitals speed, 0ms Total Blocking Time, and zero Cumulative Layout Shift."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legacy SEO Preservation",
            "description": "Build-time 301 redirect mapping, taxonomy normalization, and search authority protection."
          },
          "position": 4
        }
      ]
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200 ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaObj) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Website Design & Engineering', url: 'https://www.digixpro.in/design-services' },
          { name: 'SEO-Ready Website Engineering', url: currentUrl },
        ]}
      />
      <FAQSchema items={seoReadyWebsiteFaqs} />

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
                SEO-Ready Website Engineering
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  SEO-ready website engineering embeds structured schemas, crawlable hierarchy, and Core Web Vitals speed directly into codebase construction from day one. Rather than patching plugins post-launch, this discipline delivers native search indexability, ensuring search crawlers discover, understand, and rank commercial web applications without post-deployment refactoring.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  SEO-ready website engineering is the systematic integration of search indexability, semantic HTML5 structure, automated JSON-LD schemas, and sub-second Core Web Vitals directly into web application codebases before public deployment. This rigorous approach to SEO website design ensures that search engine crawlers can discover, interpret, and rank commercial web pages from day one without requiring costly technical refactoring after launch.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;I need a new website with search engine indexability and performance engineered into the codebase from day one, not patched on later.&rdquo;
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
                  SEO-Ready Web Engineering Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PRIMARY ARCHITECTURE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Built-In Technical SEO &amp; Heading Hierarchy
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      STRUCTURED DATA ENGINE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Automated JSON-LD Structured Data Schemas
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
                      <span className="font-plex-mono text-[11px] text-neutral-500">Frontend Stack</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Decoupled Next.js / Static HTML</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Search Readiness</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Day-One Clean Indexation</span>
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
              <h2 id="what-is-seo-ready-website-engineering" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is SEO-Ready Website Engineering?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Most websites struggle in search because traditional web builds treat SEO as a cosmetic layer added after launch, resulting in unindexed JavaScript, slow server response times, and broken schemas. In contrast, disciplined SEO website engineering establishes search crawler accessibility and algorithmic comprehension as core architectural constraints before writing frontend code.
              </p>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                A genuine SEO-ready website is never an aesthetic skin overlaid with third-party plugins. It is a purpose-built Next.js or PHP codebase where semantic HTML5 hierarchies establish unambiguous topical structure, canonical routing rules prevent duplicate content dilution, and automated JSON-LD graphs identify business entities directly in build-time static HTML.
              </p>
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
                      Schema &amp; structured data built in
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Automated JSON-LD schemas for Organization, Service, and FAQ entities compiled directly at build time without runtime plugin overhead.
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Crawlable architecture from day one
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Strict semantic HTML5 hierarchy, deterministic canonical URLs, and pristine XML sitemaps ensuring frictionless search bot traversal.
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Core Web Vitals engineered, not patched
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Decoupled static generation and optimized asset pipelines guaranteeing sub-second Largest Contentful Paint and zero layout shifts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 (H2) — EDITORIAL 3-COLUMN LAYOUT (NO CARD BOXES, THIN TOP RULES ONLY) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              02 — audience
            </span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 id="who-needs-this-service" className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4 scroll-mt-24 font-plex-sans">
              Commercial Scenarios Requiring SEO-Ready Website Engineering
            </h2>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Engineered specifically for leadership and technical teams who cannot afford post-launch search visibility remediation or traffic loss.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                CRITICAL SCENARIO
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Businesses Burned by Uncrawlable Visual Designs
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Organizations that invested heavily in beautiful agency websites only to discover Google could barely crawl client-side JavaScript or parse broken heading hierarchies. Modern SEO website design services replace fragile design systems with search-compliant semantic infrastructure.
              </p>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                FOUNDATIONAL BUILD
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Companies Planning a New Site from Scratch
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Founders and marketing directors commissioning a new digital flagship who recognize that partnering with a specialized SEO website design company from inception prevents paying twice—once to build the site, and again to remediate indexing failures post-launch.
              </p>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                ARCHITECTURE DECISION
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Teams Evaluating CMS &amp; Platform Options
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Engineering and product teams weighing WordPress, Shopify, headless CMS architectures, or bespoke Next.js builds who require transparent technical clarity on how platform rendering decisions impact crawl budget, indexing speed, and long-term organic ranking potential.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ZONE 3: EXECUTION & PROOF (SECTION 3, 4, 5, 6) */}
      <div className="bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800">
        {/* SECTION 3 (H2) — CONNECTED SCHEMATIC PROCESS FLOW (NUMBERING 01-04 STAYS HERE ONLY) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              03 — process
            </span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 id="digixpros-seo-ready-engineering-process" className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4 scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s SEO-Ready Engineering Process
            </h2>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A four-stage engineering sequence ensuring search indexability, structured data schemas, and Core Web Vitals speed are validated before deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="border-l-2 md:border-l-0 md:border-t-2 border-[#16a34a] pl-4 md:pl-0 md:pt-4">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] block mb-1">01</span>
              <h3 className="text-sm font-bold text-black dark:text-white mb-1 font-plex-sans">SEO Architecture Planning</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                URL structure, information hierarchy, and crawl paths planned before a single page is built.
              </p>
            </div>

            <div className="border-l-2 md:border-l-0 md:border-t-2 border-[#16a34a] pl-4 md:pl-0 md:pt-4">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] block mb-1">02</span>
              <h3 className="text-sm font-bold text-black dark:text-white mb-1 font-plex-sans">Technical Build with Schema</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                JSON-LD structured data and semantic HTML engineered into the codebase itself.
              </p>
            </div>

            <div className="border-l-2 md:border-l-0 md:border-t-2 border-[#16a34a] pl-4 md:pl-0 md:pt-4">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] block mb-1">03</span>
              <h3 className="text-sm font-bold text-black dark:text-white mb-1 font-plex-sans">Performance Engineering</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Core Web Vitals treated as a build requirement, not a post-launch fix.
              </p>
            </div>

            <div className="border-l-2 md:border-l-0 md:border-t-2 border-[#16a34a] pl-4 md:pl-0 md:pt-4">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] block mb-1">04</span>
              <h3 className="text-sm font-bold text-black dark:text-white mb-1 font-plex-sans">Pre-Launch Technical Verification</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Crawlability, indexability, and schema validated before the site goes live, not after.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 (H2) — 2X2 MATRIX CELLS (HAIRLINE-DIVIDED, NO CARDS) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              04 — deliverables
            </span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 id="whats-included" className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4 scroll-mt-24 font-plex-sans">
              What&apos;s Included
            </h2>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every deliverable is written directly into your production repository with full source code ownership. Review complete commercial tiers in our <Link href="/pricing" className="text-[#16a34a] font-semibold hover:underline">investment guide</Link>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="p-8 space-y-3">
              <div className="flex items-center text-xs font-mono font-bold text-[#16a34a]">
                <Code2 className="w-4 h-4 mr-2" /> ARCHITECTURE FOUNDATION
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white font-plex-sans">SEO-First Architecture Planning</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Foundational route mapping and taxonomies engineered to maximize crawl efficiency during SEO friendly website development.
              </p>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-disc pl-4">
                <li>Deterministic canonical URL taxonomies and parent-child routing logic</li>
                <li>Strict semantic HTML5 heading tree enforcement from H1 through H4</li>
                <li>Clean robots.txt directives and automated XML sitemap indexation</li>
              </ul>
            </div>

            <div className="p-8 space-y-3">
              <div className="flex items-center text-xs font-mono font-bold text-[#16a34a]">
                <Layers className="w-4 h-4 mr-2" /> STRUCTURED SCHEMAS
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white font-plex-sans">Schema &amp; Structured Data Implementation</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Machine-readable JSON-LD entities embedded directly into Next.js components for comprehensive website technical SEO.
              </p>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-disc pl-4">
                <li>Automated Organization, Service, WebSite, and FAQPage schemas</li>
                <li>Optimized OpenGraph and Twitter card social metadata compilation</li>
                <li>Machine-readable llms.txt structure for artificial intelligence search citations</li>
              </ul>
            </div>

            <div className="p-8 space-y-3 border-t md:border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center text-xs font-mono font-bold text-[#16a34a]">
                <Zap className="w-4 h-4 mr-2" /> SPEED STANDARDS
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white font-plex-sans">Core Web Vitals Engineering</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Frontend performance compiled at build time to pass all mobile search user experience thresholds natively.
              </p>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-disc pl-4">
                <li>Sub-second Largest Contentful Paint with static HTML rendering</li>
                <li>Zero Cumulative Layout Shift via explicit dimension reserving</li>
                <li>Minimal Interaction to Next Paint with zero blocking script execution</li>
              </ul>
            </div>

            <div className="p-8 space-y-3 border-t md:border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center text-xs font-mono font-bold text-[#16a34a]">
                <ShieldCheck className="w-4 h-4 mr-2" /> PRE-LAUNCH AUDIT
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white font-plex-sans">Pre-Launch Technical Verification</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Rigorous testing suite applied before DNS switchover to guarantee flawless search crawler pickup.
              </p>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-disc pl-4">
                <li>Pre-deployment search crawler simulation with zero 4xx or 5xx errors</li>
                <li>Google Rich Results validation across all structured data entities</li>
                <li>Legacy 301 URL redirect verification ensuring zero broken backlink equity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5 (H2) — SPEC-SHEET TABLE WITH THIN GREEN LEFT-BORDER */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              05 — comparison
            </span>
          </div>

          <div className="max-w-3xl mb-8">
            <h2 id="builtin-seo-engineering-vs-retrofitted-seo-vs-no-seo-consideration" className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4 scroll-mt-24 font-plex-sans">
              Built-In SEO Engineering vs Retrofitted SEO vs No SEO Consideration
            </h2>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Weigh the predictable single-build cost of native SEO engineering against the cumulative expense of post-launch remediation.
            </p>
          </div>

          <div className="overflow-x-auto border-l-2 border-[#16a34a] pl-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono uppercase">
                  <th className="py-3 pr-6">Evaluation Factor</th>
                  <th className="py-3 pr-6 text-[#16a34a]">Built-In (DigiXPro)</th>
                  <th className="py-3 pr-6">Retrofitted SEO</th>
                  <th className="py-3">No SEO Consideration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                <tr>
                  <td className="py-3.5 pr-6 font-semibold text-black dark:text-white">Cost to implement</td>
                  <td className="py-3.5 pr-6 text-[#16a34a] font-medium">Predictable single build investment with zero duplicate engineering fees</td>
                  <td className="py-3.5 pr-6 text-neutral-600 dark:text-neutral-400">Initial build fee plus substantial secondary costs in technical remediation and refactoring</td>
                  <td className="py-3.5 text-neutral-500">Initial build fee only, but ongoing revenue loss from suppressed search visibility</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-6 font-semibold text-black dark:text-white">Crawlability from day one</td>
                  <td className="py-3.5 pr-6 text-[#16a34a] font-medium">Immediate indexation across all routes via clean semantic HTML5 and sitemaps</td>
                  <td className="py-3.5 pr-6 text-neutral-600 dark:text-neutral-400">Weeks or months of delayed indexing and crawler confusion while fixing errors</td>
                  <td className="py-3.5 text-neutral-500">Orphaned routes, uncrawled JavaScript, and severe indexation gaps</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-6 font-semibold text-black dark:text-white">Rework risk later</td>
                  <td className="py-3.5 pr-6 text-[#16a34a] font-medium">Zero structural rework required; codebase built on stable modern standards</td>
                  <td className="py-3.5 pr-6 text-neutral-600 dark:text-neutral-400">High risk of breaking existing templates, URL structures, or backend logic</td>
                  <td className="py-3.5 text-neutral-500">Inevitably requires complete platform rewrite when organic traffic fails to materialize</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-6 font-semibold text-black dark:text-white">Core Web Vitals baseline</td>
                  <td className="py-3.5 pr-6 text-[#16a34a] font-medium">Engineered for sub-second mobile LCP and 0.000 CLS natively</td>
                  <td className="py-3.5 pr-6 text-neutral-600 dark:text-neutral-400">Severely constrained by bloated CMS themes and conflicting plugins</td>
                  <td className="py-3.5 text-neutral-500">Failing scores on mobile search signals, triggering algorithmic ranking penalties</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-6 font-semibold text-black dark:text-white">Best for</td>
                  <td className="py-3.5 pr-6 text-[#16a34a] font-medium">Growing brands that prioritize compounding organic traffic as a primary revenue channel</td>
                  <td className="py-3.5 pr-6 text-neutral-600 dark:text-neutral-400">Legacy websites locked into existing CMS platforms with viable traffic to salvage</td>
                  <td className="py-3.5 text-neutral-500">Temporary internal portals or throwaway campaign microsites with zero search intent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6 (H2) — EVIDENCE CASE FILES (REAL COPY, CASE TAB, UNDERLINED TEXT LINK) */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              06 — evidence
            </span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 id="evidence-seo-ready-website-engineering-in-action" className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4 scroll-mt-24 font-plex-sans">
              Evidence: SEO-Ready Website Engineering in Action
            </h2>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Documented production outcomes demonstrating build-time technical SEO architecture, legacy URL preservation, and sub-second performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <span className="font-plex-mono text-[10px] uppercase tracking-wider text-[#16a34a] font-bold block mb-2">
                CASE FILE 01 // BUILD-TIME SCHEMA & CORE WEB VITALS
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                BuySecondhandBook Commerce Architecture
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Engineered build-time JSON-LD schemas and 0ms Total Blocking Time directly into a custom PHP rendering engine, guaranteeing instant crawler indexation without plugins.
              </p>
              <Link href="/evidence/buy-secondhand-book" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center">
                View Bookstore Case Study <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <span className="font-plex-mono text-[10px] uppercase tracking-wider text-[#16a34a] font-bold block mb-2">
                CASE FILE 02 // NATIVE CODEBASE SEO
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                DigiXPro Platform Architecture
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Engineered pre-compiled Next.js static exports containing zero-runtime JSON-LD graphs, automated llms.txt endpoints, and semantic header structures optimized for search crawlers.
              </p>
              <Link href="/evidence/digixpro" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center">
                View Platform Case Study <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
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
      <div className="bg-white dark:bg-[#0A0A0A]">
        {/* SECTION 7 (H2) — DELIVERY BOUNDARIES WITH UNIFIED CITY COVERAGE */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              07 — regional delivery
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <h2 id="where-digixpro-delivers-this-service" className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4 scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers This Service
              </h2>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                From our engineering headquarters in Noida / Delhi NCR, DigiXPro engineers SEO-ready website architectures for businesses across India and international markets.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Because search crawlability standards, semantic HTML5 hierarchies, and automated JSON-LD schemas are enforced directly in repository code, our technical SEO engineering operates seamlessly across remote client engagements with complete codebase transparency.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <div className="font-plex-mono text-[11px] font-bold text-[#16a34a] uppercase tracking-wider mb-1">
                    PRIMARY METRO COVERAGE (INDIA)
                  </div>
                  <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {SERVED_CITIES}
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <div className="font-plex-mono text-[11px] font-bold text-[#16a34a] uppercase tracking-wider mb-1">
                    INTERNATIONAL MARKETS SERVED
                  </div>
                  <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {GLOBAL_TARGET_MARKETS}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                  DELIVERY MODEL
                </span>
                <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                  Remote Engineering &amp; Global Compliance
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {GLOBAL_DELIVERY_SENTENCE} All codebases are engineered with semantic HTML5 standards, automated JSON-LD schemas, and verified Core Web Vitals compliance.
                </p>
                <Link 
                  href="/contact"
                  className="text-xs font-bold text-white bg-black dark:bg-white dark:text-black px-6 py-3.5 rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors text-center block"
                >
                  Schedule Architecture Review &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 (H2) — FAQ ACCORDION (NARROW CONTAINER ~820px, CLOSED BY DEFAULT) */}
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
                Clear technical and architectural answers regarding SEO-ready website engineering.
              </p>
              
              <button
                type="button"
                onClick={toggleAllFaqs}
                className="inline-flex items-center text-xs font-plex-mono font-bold text-[#16a34a] hover:underline bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-4 py-2 rounded-xl transition-colors"
              >
                {isAllOpen ? 'Collapse All FAQs' : 'Expand All FAQs'}
              </button>
            </div>

            <div className="divide-y divide-neutral-200 dark:border-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
              {seoReadyWebsiteFaqs.map((faq, idx) => {
                const faqId = `faq-${slugify(faq.question)}`;
                const isOpen = !!openFaqs[idx];
                return (
                  <div key={idx} className="py-5 transition-colors">
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
              Ready to engineer an SEO-ready website built for long-term growth?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book an architecture discovery session to discuss your search target markets, technical SEO requirements, and web engineering plan.
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
