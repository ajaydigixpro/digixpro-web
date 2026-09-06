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

export const itConsultingFaqs = [
  {
    question: "How much does IT consulting cost?",
    answer: "IT consulting fees depend on engagement scope, organizational complexity, and whether advisory is structured as a focused diagnostic audit or an ongoing strategic retainer. A targeted architectural assessment typically involves a fixed-fee milestone, while multi-month strategic advisory engagements operate on structured monthly retainers. Unlike agencies that disguise software markups inside vague consulting estimates, transparent advisory firms provide itemized scopes with defined deliverables. To compare detailed investment tiers, milestone timelines, and engagement models for strategic advisory services, review the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "How much do IT consultants charge per hour?",
    answer: "Hourly rates for senior IT consultants and technology strategists typically range from one hundred to three hundred dollars per hour globally, or eight thousand to twenty-five thousand rupees per hour in India, depending on specialized technical expertise and domain complexity. However, hourly billing frequently creates misaligned incentives, rewarding slow analysis rather than decisive outcomes. For strategic architecture and technology direction, fixed-fee diagnostic milestones or structured monthly advisory retainers provide far greater transparency and predictability. Review structured advisory tiers in the [DigiXPro Investment Guide](/pricing) rather than open-ended timesheet invoices."
  },
  {
    question: "When should a business hire an IT consultant?",
    answer: "A business should hire an independent IT consultant whenever facing a critical technology decision that exceeds internal technical expertise or carries significant commercial risk. Common triggers include outgrowing legacy software systems, planning substantial enterprise platform investments, experiencing recurring infrastructure bottlenecks, or preparing to evaluate complex technical proposals from external software vendors. Engaging an independent advisor before signing long-term development contracts or purchasing proprietary software licenses prevents expensive misallocations, eliminates redundant tools, and ensures technical investments directly serve business operational objectives."
  },
  {
    question: "IT consultant vs in-house IT team — which is better?",
    answer: "Neither model replaces the other because they fulfill fundamentally different organizational roles. In-house IT teams specialize in internal operational continuity, user account administration, workstation support, and day-to-day infrastructure maintenance. Conversely, external IT consultants provide specialized, vendor-neutral architectural judgment, broad exposure across diverse industry tech stacks, and objective decision support unburdened by internal corporate politics. Growing organizations achieve the best results by combining an internal IT team focused on daily operations with an independent advisor brought in for major architectural decisions, system evaluations, and technology roadmaps."
  },
  {
    question: "What does an IT consulting engagement typically include?",
    answer: "A comprehensive IT consulting engagement includes a thorough discovery audit of current software systems, infrastructure dependencies, data hygiene, and team workflows. The consultant identifies technical debt, assesses security vulnerabilities, and evaluates recurring SaaS licensing costs. Deliverables typically include an executive findings report, a prioritized risk matrix, objective architectural recommendations comparing available options with their respective trade-offs, and an actionable technology roadmap. The engagement concludes with structured decision support to help executive leadership select the optimal technical path with complete operational confidence."
  },
  {
    question: "How long does an IT strategy engagement take?",
    answer: "A focused IT strategy engagement typically takes between two and four weeks to complete from initial discovery kickoff to final roadmap presentation. Week one focuses on technical discovery, reviewing current architecture documentation, auditing existing software assets, and conducting stakeholder interviews. Week two analyzes technical debt, models total cost of ownership, and formulates vendor-neutral options. Weeks three and four synthesize findings into a comprehensive architectural blueprint, review trade-offs with leadership, and establish concrete milestone sequencing. Expansive multi-division enterprise assessments may extend to six weeks based on organizational complexity."
  },
  {
    question: "How do you choose the right IT consulting firm?",
    answer: "To choose the right IT consulting firm, verify their independence, technical pedigree, and commercial incentives before signing an advisory agreement. Ensure the firm does not accept software vendor referral commissions, reseller kickbacks, or exclusive agency partnerships that compromise objective judgment. Evaluate whether senior practitioners with genuine engineering backgrounds lead the evaluation rather than junior account managers. Request documented architecture case studies and verify that deliverables consist of concrete, vendor-neutral blueprints rather than generic slide presentations designed solely to pitch expensive development services."
  },
  {
    question: "Does DigiXPro implement its own recommendations, or only advise?",
    answer: "DigiXPro provides both independent advisory and optional hands-on implementation, but maintains a strict operational boundary between the two. During an advisory engagement, recommendations remain entirely vendor-neutral, providing objective options whether your internal engineering team, an external development agency, or DigiXPro executes the work. If leadership subsequently selects DigiXPro for technical implementation, the project transitions into a structured execution scope governed by agreed milestone deliverables and strict technical acceptance criteria. You remain completely free to implement advisory blueprints with any vendor of your choice."
  }
];

export const h2TocSections = [
  { text: "What Is IT Consulting & Technology Strategy?", id: "what-is-it-consulting-technology-strategy" },
  { text: "Who Needs IT Consulting & Technology Strategy Advisory", id: "who-needs-it-consulting-technology-strategy-advisory" },
  { text: "DigiXPro's IT Consulting Process", id: "digixpros-it-consulting-process" },
  { text: "What's Included in IT Consulting & Technology Strategy Advisory", id: "whats-included-in-it-consulting-technology-strategy-advisory" },
  { text: "IT Consultant vs In-House IT Team vs No Strategy", id: "it-consultant-vs-in-house-it-team-vs-no-strategy" },
  { text: "Evidence: IT Consulting & Technology Strategy in Action", id: "evidence-it-consulting-technology-strategy-in-action" },
  { text: "Where DigiXPro Delivers IT Consulting", id: "where-digixpro-delivers-it-consulting" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function ItConsultingTechnologyStrategyView() {
  const currentUrl = "https://www.digixpro.in/advisory/it-consulting-technology-strategy";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = itConsultingFaqs.length > 0 && itConsultingFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      itConsultingFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "IT Consulting & Technology Strategy Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "IT Consulting & Technology Strategy",
    "description": "Independent IT consulting services and technology strategy advisory. Objective architecture audits, technical debt evaluations, and vendor-neutral roadmaps.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Consulting & Technology Strategy Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Current-State Assessment",
            "description": "Comprehensive infrastructure audit, software dependency analysis, technical debt risk scoring, and operational bottleneck identification."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technology Strategy & Options",
            "description": "Independent options formulation with real technical and commercial trade-offs, target architecture models, and prioritization."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decision Support & Roadmaps",
            "description": "Actionable executive technology roadmaps, total cost of ownership models, and clear decision frameworks."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Implementation Advisory",
            "description": "Vendor-neutral technical oversight, architecture governance, and milestone quality assurance checkpoints."
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
          { name: 'Technology Advisory Hub', url: 'https://www.digixpro.in/advisory' },
          { name: 'IT Consulting & Technology Strategy Services', url: currentUrl },
        ]}
      />
      <FAQSchema items={itConsultingFaqs} />

      {/* ZONE 1: HERO & TOC SECTION */}
      <section className="bg-white dark:bg-[#0A0A0A] pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/advisory"
            className="inline-flex items-center text-xs font-plex-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Technology Advisory Hub
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
                IT Consulting &amp; Technology Strategy Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  IT consulting and technology strategy provides independent, vendor-neutral advisory to evaluate digital infrastructure, audit software dependencies, and align technology decisions with commercial business goals. This service delivers unbiased architectural roadmaps and capital expenditure guidance, operating completely independent from hands-on development or vendor sales incentives.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  IT consulting and technology strategy is the independent evaluation of technical systems, architectural trade-offs, and software investments to prevent costly development missteps. Unlike technology vendors or agency sales representatives selling pre-packaged platforms, an independent IT consulting firm analyzes existing infrastructure objectively, identifying software bloat, assessing technical debt, and structuring scalable technology roadmaps.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Before we invest in another software platform or agency contract, we need independent clarity on what our business actually requires.&rdquo;
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
                    SPEC SHEET // ADVISORY
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">STRATEGY SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  IT Consulting &amp; Strategy Scope
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ADVISORY MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      100 Percent Vendor-Neutral Architecture Review
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      DECISION FOCUS
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Unbiased System Evaluation &amp; Tech Debt Audit
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ENGAGEMENT TYPE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Diagnostic Retainer or Milestone Roadmap
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Vendor Stance</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Zero Commissions or Software Resale</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Deliverable</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Written Architecture Blueprint &amp; Options</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Execution Handoff</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Independent Implementation Oversight</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need an advisory review?</span>
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
              <h2 id="what-is-it-consulting-technology-strategy" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is IT Consulting &amp; Technology Strategy?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Choosing the wrong software platform or agency partner creates compounding technical debt and wasted capital. Professional IT consulting services deliver unbiased executive evaluation before major investments occur. Rather than selling proprietary software licenses or promoting billable development hours, an independent IT consulting company evaluates current systems objectively, identifying hidden dependencies and architectural bottlenecks.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Technology strategy ensures engineering decisions directly support commercial objectives. While DigiXPro delivers custom web engineering and automation across separate implementation tracks, this advisory service provides pure architectural guidance. We evaluate operational trade-offs, audit software risk, and deliver independent roadmaps that empower leadership to make confident technology decisions.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Vendor-Neutral Advisory</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Unbiased evaluation free from software vendor commissions, agency markups, or proprietary sales incentives.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Technology Strategy Alignment</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Direct alignment of software architecture, data pipelines, and infrastructure with commercial growth goals.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Independent Decision Support</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Objective trade-off analyses giving executive leadership complete certainty before major capital commitments.
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
            <h2 id="who-needs-it-consulting-technology-strategy-advisory" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Who Needs IT Consulting &amp; Technology Strategy Advisory
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Objective technical judgment designed for executives navigating high-stakes software decisions and architectural crossroads.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Making Major Decisions Without In-House Tech Leadership
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Organizations preparing to modernize core infrastructure or invest in enterprise platforms without internal senior engineering expertise to evaluate technical viability.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies Requiring Independent Advice Before Vendor Commitments
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprises seeking objective IT strategy consulting to audit agency proposals, verify architectural claims, and avoid vendor lock-in before signing long-term contracts.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Growing Businesses Needing Strategy Aligned with Commercial Goals
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Scaling firms utilizing IT advisory services to eliminate software subscription bloat, dismantle departmental silos, and establish coherent technology priorities.
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
            <h2 id="digixpros-it-consulting-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s IT Consulting Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our systematic 4-phase advisory methodology delivers objective technical evaluation, actionable option models, and definitive strategic direction.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Current-State Assessment</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  An honest diagnostic evaluation of existing technology systems, infrastructure dependencies, data flows, and technical debt across your operational environment.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Strategy &amp; Options Formulation</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Independent, vendor-neutral options laid out with real technical and commercial trade-offs, rather than pre-decided vendor recommendations.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Decision Support &amp; Roadmap Blueprint</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Clear, structured recommendations backed by architectural rationale and milestone sequencing, ready for executive leadership to act upon immediately.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Implementation Guidance &amp; Oversight</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Advisory support and technical guardrail verification during execution, whether your internal team, DigiXPro, or an external third-party vendor implements the plan.
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
            <h2 id="whats-included-in-it-consulting-technology-strategy-advisory" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in IT Consulting &amp; Technology Strategy Advisory
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Every strategic IT consulting engagement provides rigorous architectural evaluation and tangible decision assets designed for executive clarity.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                CURRENT-STATE ASSESSMENT // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Current-State Assessment
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Comprehensive infrastructure audit, software dependency analysis, technical debt risk scoring, and operational bottleneck identification.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                STRATEGY &amp; ROADMAP // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Technology Strategy &amp; Roadmap
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Target-state architecture design, phased engineering milestone sequencing, data flow frameworks, and executive prioritization guidelines. Explore dedicated <Link href="/advisory/technology-roadmaps-architecture" className="text-[#16a34a] font-semibold hover:underline">technology roadmaps &amp; architecture</Link> planning.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                VENDOR-NEUTRAL RECOMMENDATIONS // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Vendor-Neutral Recommendations
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Objective platform trade-off evaluations, total cost of ownership analysis, RFP technical criteria, and guidance from an experienced IT strategy consultant. Explore engagement structures in our [Investment Guide](/pricing).
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                IMPLEMENTATION ADVISORY // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Implementation Advisory
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Architecture governance, milestone acceptance criteria review, vendor delivery oversight, and engineering quality assurance checkpoints.
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
            <h2 id="it-consultant-vs-in-house-it-team-vs-no-strategy" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              IT Consultant vs In-House IT Team vs No Strategy
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Comparing independence, cost models, breadth of expertise, and decision velocity across different technology management approaches.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Choose the right approach based on the size of the decision and whether unbiased, independent judgment is needed.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Independent IT Consulting (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/3">In-House IT Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Independence &amp; Bias</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">100 Percent unbiased; zero vendor commissions, reseller margins, or billable implementation bias.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Often invested in existing internal tools or familiar legacy skill sets.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost &amp; Commitment</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Scoped diagnostic retainers or fixed milestones; zero permanent executive payroll overhead.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Full-time senior executive salaries, benefits, and long-term hiring commitments.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Expertise Breadth</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Broad multi-industry architectural exposure across modern cloud, web, and data systems.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Deep knowledge of current internal systems, but often isolated from broader industry shifts.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Speed of Decision</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Focused 2 to 4 week diagnostic sprints delivering structured, actionable blueprints.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Slower consensus-building cycles competing with day-to-day operational maintenance.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best For</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Critical technology decisions, architecture modernization, and strategic vendor evaluations.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Day-to-day technical operations, user administration, and ongoing system maintenance.</td>
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
            <h2 id="evidence-it-consulting-technology-strategy-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: IT Consulting &amp; Technology Strategy in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We practice exact architectural principles we recommend to our clients. Inspect real-world case studies of strategic technology evaluations, governed systems architecture, and decoupled platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto mb-10 text-left">
            {/* Case File 1: SattvaOS */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // GOVERNED AI ARCHITECTURE
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    SattvaOS Architecture Case Study
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Strategic advisory roadmap designing multi-tenant software boundaries, zero-trust cryptographic isolation, and data governance frameworks for mission-critical enterprise systems.
                  </p>
                </div>
                <Link 
                  href="/evidence/sattvaos" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center mt-auto"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 2: aatma.guru */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // MULTI-TENANT ONBOARDING OS
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    aatma.guru Platform Architecture
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Executive advisory formulating real-time event streaming patterns, dual-mode content delivery, and scalable database sharding for an enterprise wellness intelligence ecosystem.
                  </p>
                </div>
                <Link 
                  href="/evidence/aatma-guru" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center mt-auto"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 3: Muktibodh */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 03 // DIGITAL PUBLISHING ENGINE
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    Muktibodh Publishing Architecture
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Strategic technology advisory replacing fragmented PDF distribution with a structured knowledge engine, introducing dual-mode web reading and interactive flipbook architecture for digital publishing.
                  </p>
                </div>
                <Link 
                  href="/evidence/muktibodh" 
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
              <h2 id="where-digixpro-delivers-it-consulting" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers IT Consulting
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                As an independent IT consulting company based in Delhi NCR, DigiXPro provides strategic technology advisory across Noida, Gurgaon, Delhi, and growing commercial hubs nationwide. Whether your organization is searching for an experienced IT consultant in Noida for on-site architectural reviews or seeking an IT consulting company near me in Delhi NCR to evaluate enterprise software investments, we deliver objective technical judgment.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For distributed organizations across the country, our IT consulting services India practice delivers remote architecture audits, cloud migration strategies, and vendor-neutral guidance backed by world-class software engineering discipline. {GLOBAL_DELIVERY_SENTENCE}
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

        {/* SECTION 8 (H2) — FAQ ACCORDION (NARROW CONTAINER ~820px, CLOSED BY DEFAULT, ALL 8 ITEMS) */}
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
                Clear technical and commercial answers regarding IT consulting services and technology strategy advisory.
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
              {itConsultingFaqs.map((faq, idx) => {
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
              Ready to evaluate your technology strategy with independent clarity?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book an architecture discovery session to discuss your business bottlenecks, technical debt, and independent IT consulting requirements.
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
