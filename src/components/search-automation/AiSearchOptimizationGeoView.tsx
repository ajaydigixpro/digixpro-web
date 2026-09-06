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
  Cpu, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Bot, 
  Zap, 
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

export const aiSearchOptimizationGeoFaqs = [
  {
    question: "What's the difference between GEO and SEO?",
    answer: "Traditional Search Engine Optimization (SEO) focuses on ranking web pages in organic search engine results pages (SERPs) like Google to drive click-through traffic. Generative Engine Optimization (GEO) focuses on optimizing content and entity signals so Large Language Models (LLMs) and AI answer engines—such as ChatGPT, Perplexity, and Google AI Overviews—cite your business as an authoritative source directly within synthesized answers."
  },
  {
    question: "How is GEO different from SEO and AEO?",
    answer: "SEO targets traditional search algorithms to rank blue links in search results. Answer Engine Optimization (AEO) focuses on securing position-zero featured snippets and voice search answers through direct Q&A formatting. Generative Engine Optimization (GEO) builds upon both by structuring deep contextual entity graphs, factual content blocks, and AI crawler access rules specifically for conversational LLM systems that generate multi-source synthesized responses."
  },
  {
    question: "How is content optimized for AI search engines?",
    answer: "Content is optimized for AI search engines by structuring information into clear, factual answer blocks, using direct semantic headings, and embedding comprehensive JSON-LD entity schema markup. Ensuring AI crawlers can access pages without blockages via robots.txt and llms.txt, while maintaining high domain authority and consistent digital entity mentions, enables LLMs to accurately parse and cite your brand."
  },
  {
    question: "How can a business get cited by ChatGPT or AI Overviews?",
    answer: "A business gets cited by ChatGPT or AI Overviews when AI crawlers can reliably access its content, recognize its established entity authority, and extract direct factual answers matching user prompt intent. Implementing native llms.txt files, maintaining consistent brand entity signals across Wikidata and industry databases, and structuring content with precise schema graph markup significantly increases LLM citation probability."
  },
  {
    question: "How much does GEO/AI search optimization cost?",
    answer: "AI search optimization and GEO services at DigiXPro are delivered as milestone-based engineering projects or ongoing technical advisory retainers. Investment varies based on site scope, entity complexity, and content volume. View our [transparent pricing benchmarks](/pricing) for detailed service tiers and scope breakdowns."
  },
  {
    question: "How is AI search visibility measured?",
    answer: "AI search visibility is monitored by empirically tracking brand citation frequency across target prompt queries on ChatGPT, Perplexity, Claude, and Google AI Overviews over time. Unlike traditional SEO with fixed rank-tracking tools, GEO monitoring evaluates entity citation presence, source link inclusion, and response accuracy across simulated buyer prompt categories."
  },
  {
    question: "Does schema markup help with AI search visibility?",
    answer: "Yes, structured JSON-LD schema markup is critical for AI search visibility. Schema graphs explicitly define entity relationships, corporate identity, service scopes, and authorship in a machine-readable format that LLMs digest far more reliably than unstructured body copy alone, reinforcing brand authority in AI synthesis."
  },
  {
    question: "Is GEO worth it for a small business?",
    answer: "Yes, GEO is valuable for small and growing B2B businesses targeting high-intent buyers who increasingly use AI assistants like ChatGPT and Perplexity to research vendor options. Establishing structured entity signals early ensures your business is cited alongside larger competitors as conversational AI search adoption expands."
  },
  {
    question: "Does DigiXPro offer ChatGPT-specific SEO services?",
    answer: "Yes, DigiXPro provides specialized AI search optimization services tailored for ChatGPT Search, OpenAI GPT crawlers, Perplexity AI, and Google AI Overviews. Our engineering team configures technical AI crawler access rules, llms.txt routing files, and entity schema graphs specifically to maximize citation authority in ChatGPT responses."
  }
];

export default function AiSearchOptimizationGeoView() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const tocSections = [
    { id: 'what-is-generative-engine-optimization-geo', text: 'What Is Generative Engine Optimization (GEO)?' },
    { id: 'who-needs-ai-search-optimization-geo', text: 'Who Needs AI Search Optimization & GEO' },
    { id: 'digixpros-geo-ai-search-process', text: "DigiXPro's GEO & AI Search Process" },
    { id: 'whats-included-in-ai-search-optimization-geo-scope', text: "What's Included in AI Search Optimization & GEO Scope" },
    { id: 'traditional-seo-vs-geo-vs-aeo', text: 'Traditional SEO vs GEO vs AEO' },
    { id: 'evidence-ai-search-visibility-in-action', text: 'Evidence: AI Search Visibility in Action' },
    { id: 'where-digixpro-delivers-ai-search-optimization', text: 'Where DigiXPro Delivers AI Search Optimization' },
    { id: 'frequently-asked-questions-about-ai-search-optimization-geo', text: 'Frequently Asked Questions About AI Search Optimization & GEO' },
  ];

  const currentUrl = 'https://www.digixpro.in/search-automation/ai-search-optimization-geo';

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Search Optimization & Generative Engine Optimization (GEO)",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Generative Engine Optimization (GEO) & AI Search Engineering",
    "description": "Technical Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). Engineering your web presence for authoritative citation in ChatGPT, Perplexity, Claude, and Google AI Overviews.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "GEO Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Entity & Knowledge Graph Architecture",
            "description": "Deep JSON-LD schema networks anchoring your brand, executives, and services into authoritative Wikidata and knowledge graphs."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "llms.txt & AI Crawler Engineering",
            "description": "Configuring robot directives, markdown summaries, and llms.txt endpoints for clean ingestion by OpenAI, Anthropic, and Perplexity bots."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direct Answer Information Extraction",
            "description": "Structuring content with definitive Q&A syntax, numeric facts, and contextual tables optimized for synthetic answer citation."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Citation Share of Voice Monitoring",
            "description": "Tracking brand mention frequency, sentiment, and accuracy across major commercial LLM conversational engines."
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
          { name: 'AI Search Optimization & GEO', url: currentUrl },
        ]}
      />
      <FAQSchema items={aiSearchOptimizationGeoFaqs} />

      {/* ZONE 1: HERO & TOC SECTION (CANONICAL PAGE 1 LAYOUT STRUCTURE) */}
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
              {/* EXACT H1 TAG (1 ONLY ON PAGE) */}
              <h1 className="hero-lcp-heading text-[38px] md:text-[54px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white font-plex-sans">
                AI Search Optimization &amp; Generative Engine Optimization (GEO) Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Generative Engine Optimization (GEO) and AI search optimization services structure website content, entity knowledge graphs, and crawler permissions so Large Language Models cite your business directly in conversational AI search results. Unlike traditional SEO targeting blue links on Google, GEO ensures brand visibility across ChatGPT, Perplexity, Claude, and Google AI Overviews.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Generative engine optimization services engineer technical entity signals, factual answer blocks, and AI crawler access rules to secure direct brand citations in generative AI search engines.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Our business ranks well on Google, but when prospective clients ask ChatGPT or Perplexity for vendor recommendations, competitors are cited instead.&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">CANONICAL #14</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  AI Search &amp; GEO Engineering Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      COMMERCIAL MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Project Scope or Retainer Advisory
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PRIMARY ARCHITECTURE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      JSON-LD Entity Schemas &amp; llms.txt Routing
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      TARGET PLATFORMS
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      ChatGPT &middot; Perplexity &middot; Claude &middot; AI Overviews
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Crawler Accessibility</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">AI Bot Policy &amp; Robots.txt Directives</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Content Structuring</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Direct Answer Blocks &amp; Semantic Hierarchies</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Entity Alignment</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Wikidata &amp; Digital Footprint Consistency</span>
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
      <section id="what-is-generative-engine-optimization-geo" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
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
                What Is Generative Engine Optimization (GEO)?
              </h2>
              <div className="space-y-4 text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Generative Engine Optimization (GEO) is the discipline of structuring digital content, technical entity relationships, and web accessibility so Large Language Models (LLMs) and conversational AI engines cite your business as an authoritative answer source. Unlike traditional search engine optimization, which focuses on ranking URLs in traditional blue-link search engine result pages, generative engine optimization services optimize for the retrieval mechanisms used by ChatGPT, Perplexity AI, Claude, and Google AI Overviews.
                </p>
                <p>
                  As search discovery shifts toward conversational AI assistants, answer engine optimization requires structuring information into clear, verifiable factual blocks backed by JSON-LD entity schema graphs. AI crawlers evaluate domain authority, semantic clarity, and digital footprint consistency across knowledge bases to determine which brands to recommend when prospective buyers query LLMs.
                </p>
                <p>
                  By aligning your technical web application architecture with AI crawler permissions and machine-readable schema markup, DigiXPro ensures your brand achieves sustained visibility across both traditional search engines and next-generation AI discovery platforms.
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
                      AI-Citation-Ready Content Structure
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Formatting copy into direct, authoritative factual blocks that Large Language Models easily extract and cite in prompt responses.
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Entity &amp; Schema Signals
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Deploying structured JSON-LD entity graphs that establish brand identity and service relationships across digital knowledge bases.
                    </p>
                  </div>
                </div>

                <div className="pb-2 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      AI Crawler Accessibility
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Configuring server headers, robots.txt, and llms.txt files so AI search crawlers can parse and index web assets without restriction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TARGET FIT & AUDIENCE (EDITORIAL 3-COLUMN) */}
      <section id="who-needs-ai-search-optimization-geo" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                02 — audience
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Organizations Ready for AI Search Optimization &amp; GEO
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              AI search optimization is critical for B2B enterprises, growing brands, and professional service providers seeking visibility where modern buyers conduct vendor research.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                01 // BRANDS INVISIBLE IN CHATGPT &amp; PERPLEXITY
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Ranking on Google But Absent from AI Answers
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Companies with established organic Google rankings that fail to appear when prospective clients query ChatGPT, Claude, or Perplexity for vendor recommendations.
              </p>
              <div className="text-[11px] font-plex-mono text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Key Trigger: Competitors cited in AI prompts despite weaker organic Google rankings.
              </div>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                02 // EARLY-MOVER ENTERPRISES
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies Securing Market Share in AI Discovery
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                B2B enterprises seeking early-mover market share as buyer search behavior shifts from traditional engine result pages to generative AI search optimization services.
              </p>
              <div className="text-[11px] font-plex-mono text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Key Trigger: Future-proofing search pipeline against shifting buyer discovery habits.
              </div>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                03 // MULTI-PLATFORM ENTITIES
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Brands Needing Consistent Digital Entity Signals
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Organizations with fragmented brand mentions requiring structured entity alignment across Wikidata, knowledge graphs, and digital channels for reliable AEO services.
              </p>
              <div className="text-[11px] font-plex-mono text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Key Trigger: Ambiguous brand identity causing LLMs to hallucinate or misattribute services.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROCESS & METHODOLOGY (4-STEP NUMBERS ONLY) */}
      <section id="digixpros-geo-ai-search-process" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                03 — methodology
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              DigiXPro&apos;s GEO &amp; AI Search Process
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A systematic engineering methodology designed to establish machine-readable entity authority and secure direct brand citations in generative AI systems.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                01
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                AI-Crawl &amp; Entity Audit
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Assessing current AI-crawler accessibility (robots.txt, HTTP headers, structured data) and auditing brand entity consistency across digital knowledge bases.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                02
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Content &amp; Schema Restructuring
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Reorganizing digital content into citation-ready, factual answer formats backed by deep JSON-LD entity schema graphs.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                03
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                AI Accessibility Implementation
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Deploying llms.txt routing, optimizing AI crawler directives, and eliminating technical barriers preventing AI systems from parsing content.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                04
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Visibility Monitoring
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Tracking brand citation appearance across LLM engines over time and refining entity signals based on empirical AI search behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INCLUDED MATRIX (2x2 HAIRLINE MATRIX) */}
      <section id="whats-included-in-ai-search-optimization-geo-scope" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                04 — scope
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              What&apos;s Included in AI Search Optimization &amp; GEO Scope
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Comprehensive technical deliverables for engineering generative AI search visibility, machine readability, and LLM entity authority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                01 // CONTENT &amp; SCHEMA STRUCTURING
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Citation-Ready Architecture
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Direct-answer content formatting engineered for LLM ingestion and retrieval</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>JSON-LD entity graph deployment linking brand, services, and key personnel</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Semantic heading hierarchies optimized for answer engine optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                02 // ENTITY &amp; AUTHORITY SIGNALS
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Machine Knowledge Alignment
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Digital footprint alignment across knowledge bases and industry directories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Brand entity reconciliation to eliminate ambiguity in AI knowledge models</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Citation source optimization targeting platforms referenced by LLMs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                03 // AI CRAWLER ACCESSIBILITY
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Bot Policy &amp; llms.txt Routing
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Tailored robots.txt and server header configuration for AI search crawlers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Native llms.txt file creation guiding AI bots to high-priority content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Core Web Vitals and clean render validation for headless AI user agents</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                04 // CITATION MONITORING
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Empirical LLM Tracking
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Empirical tracking of brand citations across ChatGPT, Perplexity, and AI Overviews</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Gap analysis identifying competitor entity dominance in target prompt queries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Iterative GEO services refinement based on active LLM retrieval patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON TABLE (FULL-WIDTH SPEC TABLE) */}
      <section id="traditional-seo-vs-geo-vs-aeo" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                05 — comparison
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Traditional SEO vs GEO vs AEO
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Understand how these three visibility disciplines work together rather than replace one another.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-neutral-200 dark:border-neutral-800 text-xs">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-900 font-plex-mono border-b border-neutral-200 dark:border-neutral-800">
                  <th className="p-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/5">CRITERIA</th>
                  <th className="p-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/4">TRADITIONAL SEO</th>
                  <th className="p-4 font-bold text-[#16a34a] bg-emerald-50/60 dark:bg-emerald-950/40 w-1/3 border-x border-emerald-200 dark:border-emerald-800">
                    GENERATIVE ENGINE OPTIMIZATION (GEO)
                  </th>
                  <th className="p-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/4">ANSWER ENGINE OPTIMIZATION (AEO)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-sans">
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Primary Target</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Search engine ranking algorithms (Google, Bing)</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Large Language Models &amp; Generative AI (ChatGPT, Perplexity)
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Direct answer engines &amp; voice assistants (Siri, Alexa, Featured Snippets)</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Primary Channels</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Google Search, Bing Web Results</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    ChatGPT Search, Perplexity AI, Claude, Google AI Overviews
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Featured Snippets, Voice Search, Knowledge Panels</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Content Format</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Long-form keyword-optimized articles &amp; landing pages</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Factual, structured answer blocks with clear entity context
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Concise Q&amp;A blocks and direct snippet answers</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Overlap with Others</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Provides foundational crawlability and domain authority for GEO/AEO</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Builds upon SEO domain authority while leveraging AEO schema structure
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Utilizes SEO technical infrastructure with GEO entity definitions</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Best For</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Capturing traditional high-volume organic search traffic</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Winning recommendations in generative AI conversational queries
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Capturing position-zero quick answers and voice queries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROOF & CASE STUDIES (HONEST REAL WORK CARD) */}
      <section id="evidence-ai-search-visibility-in-action" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                06 — evidence
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Evidence: AI Search Visibility in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspecting DigiXPro&apos;s technical infrastructure for native AI crawler access, llms.txt routing, and machine-readable JSON-LD schema graphs.
            </p>
          </div>

          <div className="max-w-3xl">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider">
                  TECHNICAL INFRASTRUCTURE EVIDENCE // LIVE SYSTEM
                </span>
                <span className="font-plex-mono text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-[#16a34a] px-2.5 py-1 rounded font-bold">
                  VERIFIED CAPABILITY
                </span>
              </div>

              <h3 className="text-xl font-bold text-black dark:text-white mb-3 font-plex-sans">
                DigiXPro Technical AI Accessibility &amp; Entity Infrastructure
              </h3>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Engineering native llms.txt routing files, automated JSON-LD entity graph schemas, and AI crawler access policies across digital web properties to ensure seamless ingestion by LLM answer engines.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-plex-mono border-t border-neutral-100 dark:border-neutral-800 pt-5">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <div className="text-neutral-400 uppercase text-[10px] mb-1">AI ROUTING FILE</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">Native llms.txt Directive Support</div>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <div className="text-neutral-400 uppercase text-[10px] mb-1">ENTITY SCHEMA</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">Structured JSON-LD Graph Injection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LOCATION & DELIVERY (UNIFIED PANEL, NO FAKE TIERS) */}
      <section id="where-digixpro-delivers-ai-search-optimization" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <div className="mb-3">
                <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                  07 — delivery
                </span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-6 font-plex-sans">
                Where DigiXPro Delivers AI Search Optimization
              </h2>
              <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                DigiXPro delivers AI search optimization and generative engine optimization services globally, backed by technical engineering teams based in Noida, Delhi NCR, India.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-plex-mono">
                Delivery Scope: Regional B2B Hubs &middot; National Enterprises &middot; Global Technology Firms
              </p>
            </div>

            {/* Right Panel: Shared Constants List */}
            <div className="lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm">
                <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  DELIVERY MARKETS &amp; REGIONS
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="font-plex-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                      INDIA &amp; REGIONAL HUBS
                    </div>
                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {SERVED_CITIES}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="font-plex-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                      INTERNATIONAL MARKETS
                    </div>
                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {GLOBAL_TARGET_MARKETS}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ (9 APPROVED QUESTIONS) */}
      <section id="frequently-asked-questions-about-ai-search-optimization-geo" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                08 — faq
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Frequently Asked Questions About AI Search Optimization &amp; GEO
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Technical answers regarding Generative Engine Optimization (GEO), Large Language Model citations, and AI search visibility.
            </p>
          </div>

          <div className="max-w-3xl space-y-4">
            {aiSearchOptimizationGeoFaqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-black dark:text-white hover:text-[#16a34a] dark:hover:text-[#16a34a] transition-colors"
                >
                  <span className="text-base font-plex-sans">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180 text-[#16a34a]' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 pt-4">
                    {renderTextWithLinks(faq.answer)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION (Page 1 Locked Copy & 2-Button Row) */}
      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-widest block mb-3">
              GET STARTED
            </span>
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-6 font-plex-sans leading-tight">
              Ready to Upgrade Your Web Engineering &amp; AI Visibility?
            </h2>
            <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed">
              Book a technical consultation with our engineering team to review your site architecture, search performance, and AI discovery strategy.
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
                className="inline-flex items-center justify-center px-8 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-white hover:text-white transition-colors min-h-[52px]"
              >
                Book a 30-Min Architecture Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeferredStickyMobileCTA />
    </div>
  );
}
