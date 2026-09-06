'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ibmPlexSans, ibmPlexMono } from '@/lib/fonts';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import { SERVED_CITIES } from '@/data/servedCities';
import { GLOBAL_TARGET_MARKETS } from '@/data/globalMarkets';
import {
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  ListFilter,
  Layers,
  Code2,
  Globe,
  Zap
} from 'lucide-react';

const GLOBAL_DELIVERY_SENTENCE = "Beyond India, we advise executive leadership teams across the USA, UK, Australia, and Singapore via remote diagnostic auditing and structured virtual architecture workshops.";

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

export const technologyRoadmapsFaqs = [
  {
    question: "How much does a technology roadmap cost?",
    answer: "Technology roadmap consulting engagements typically range from fifteen thousand to forty thousand rupees for focused growth businesses, while expansive multi-system enterprise architectures scale with integration scope. Total advisory investment is determined by existing architectural complexity, the number of legacy software platforms evaluated, and the depth of data dependency analysis required. Rather than paying ongoing monthly software retainers for unsequenced feature requests, investing in a structured roadmap provides predictable milestone budgets and eliminates premature engineering rework. Review detailed advisory tiers and milestone structures in our [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "How long does it take to build a technology roadmap?",
    answer: "Building a comprehensive technology roadmap typically takes two to four weeks from initial discovery kickoff to final executive presentation. The first week focuses on technical discovery, auditing existing software assets, identifying codebase debt, and reviewing business growth projections. The second and third weeks analyze technical dependencies, evaluate build-versus-buy trade-offs, and design target-state architecture models. The final week synthesizes findings into sequenced milestone phases, establishing actionable acceptance gates for executive review and operational sign-off."
  },
  {
    question: "What does a technology roadmap deliverable actually look like?",
    answer: "A technology roadmap deliverable consists of a target-state architecture blueprint, a sequenced multi-quarter implementation timeline, and a technical dependency matrix. Rather than an abstract slide deck, clients receive concrete documentation detailing integration boundaries, database schema transitions, cloud infrastructure requirements, and vendor evaluation criteria. It also includes an executive decision log and milestone acceptance protocols, providing technical and non-technical stakeholders with a shared operational reference point for future engineering investments."
  },
  {
    question: "How often should a technology roadmap be updated?",
    answer: "A technology roadmap should be formally reviewed and calibrated on a quarterly cadence. While multi-year architectural goals provide directional stability, short-term engineering realities, commercial priorities, and vendor capabilities shift continuously. Conducting quarterly calibration sessions ensures that completed initiatives are verified against performance metrics, emerging technical debt is addressed promptly, and upcoming implementation milestones are adjusted before engineering teams commit substantial capital and development capacity to outdated project specifications."
  },
  {
    question: "How is a technology roadmap different from a digital transformation strategy?",
    answer: "A technology roadmap focuses specifically on the sequencing, architecture, and technical dependencies of software and infrastructure systems over time. In contrast, a [digital transformation strategy](/advisory/digital-transformation-consulting) encompasses broader organizational restructuring—including operational operating models, customer journey redesign, employee incentives, and cultural change management. While digital transformation determines how a business evolves its commercial delivery model, a technology roadmap defines the exact technical blueprint and execution path required to power that evolution."
  },
  {
    question: "Does a business need a technology roadmap before hiring developers?",
    answer: "Establishing a technology roadmap before hiring developers prevents expensive architectural missteps and misallocated engineering salaries. Without a clear target-state architecture and defined technical dependencies, newly hired developers frequently build isolated features based on personal preferences rather than long-term system coherence. A structured roadmap clarifies the required tech stack, establishes clean API boundaries, and defines explicit milestone deliverables, enabling leadership to recruit appropriate engineering talent and manage developer productivity with complete confidence."
  },
  {
    question: "How do you create a technology roadmap for a business?",
    answer: "Creating a technology roadmap involves a disciplined four-stage engineering methodology. First, we conduct a current-state diagnostic, cataloging existing software applications, data models, and operational friction points. Second, we align with executive leadership to establish eighteen to twenty-four month commercial objectives. Third, we architect a target-state technical blueprint and map prerequisite dependencies between systems. Finally, we organize initiatives into sequenced delivery phases—separating high-impact quick wins from foundational core platform modernizations—with clear milestone governance."
  },
  {
    question: "Is a technology roadmap a one-time document, or does it need ongoing updates?",
    answer: "A technology roadmap is a living operational instrument that requires continuous governance rather than a one-time document that gathers dust on a corporate drive. Market conditions change, software vendors deprecate APIs, and internal commercial milestones evolve as companies scale. Maintaining an active roadmap through regular quarterly reviews ensures that engineering resources remain directed toward current commercial goals, emerging security vulnerabilities are addressed systematically, and technological debt is prevented before it compounds."
  }
];

export const h2TocSections = [
  { text: "What Is a Technology Roadmap & Architecture Plan?", id: "what-is-a-technology-roadmap-architecture-plan" },
  { text: "Who Needs a Technology Roadmap", id: "who-needs-a-technology-roadmap" },
  { text: "DigiXPro's Roadmap & Architecture Process", id: "digixpros-roadmap-architecture-process" },
  { text: "What's Included in Technology Roadmap Services", id: "whats-included-in-technology-roadmap-services" },
  { text: "Roadmap vs No Plan vs Reactive Decision-Making", id: "roadmap-vs-no-plan-vs-reactive-decision-making" },
  { text: "Evidence: Technology Roadmaps & Architecture in Action", id: "evidence-technology-roadmaps-architecture-in-action" },
  { text: "Where DigiXPro Delivers This Service", id: "where-digixpro-delivers-this-service" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];


export default function TechnologyRoadmapsArchitectureView() {
  const currentUrl = "https://www.digixpro.in/advisory/technology-roadmaps-architecture";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = technologyRoadmapsFaqs.length > 0 && technologyRoadmapsFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      technologyRoadmapsFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Technology Roadmaps & Architecture Consulting Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Enterprise Architecture & Technology Roadmap Consulting",
    "description": "Independent enterprise architecture consulting and technology roadmap advisory. Sequence technical decisions, eliminate architectural rework, and align software investments.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "Mumbai", "Pune", "Bangalore", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Roadmaps & Architecture Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Current-State & Goals Review",
            "description": "Comprehensive infrastructure audit, codebase technical debt evaluation, and commercial growth dependency analysis."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roadmap Sequencing",
            "description": "Phased implementation scheduling, technical dependency matrices, and milestone delivery criteria."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Architecture Decisions",
            "description": "Target-state data schema blueprints, API integration standards, and build-vs-buy architectural trade-off evaluations."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Living Plan & Review Cadence",
            "description": "Quarterly architecture calibration protocols, engineering hiring guidance, and living technical governance frameworks."
          },
          "position": 4
        }
      ]
    }
  };

  return (
    <div className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-20 transition-colors duration-200`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaObj) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Technology Advisory Hub', url: 'https://www.digixpro.in/advisory' },
          { name: 'Technology Roadmaps & Architecture Consulting', url: currentUrl },
        ]}
      />
      <FAQSchema items={technologyRoadmapsFaqs} />

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
                Technology Roadmaps &amp; Architecture Consulting
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  A technology roadmap sequences an organization&apos;s architectural decisions, platform modernizations, and software investments against commercial milestones over a twelve to twenty-four month horizon. Typically formulated alongside broader enterprise architecture consulting, this living plan clarifies technical dependencies, prevents premature software spending, and provides disciplined execution direction for leadership.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Technology roadmap and architecture consulting connects long-term business strategy with structured engineering execution. We evaluate current systems, design target-state blueprints, map prerequisite dependencies, and sequence technical initiatives into actionable multi-quarter phases.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;We know our software systems need to evolve to support growth, but we need an objective roadmap to sequence what gets built or upgraded first.&rdquo;
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
                  Roadmap &amp; Architecture Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PLANNING HORIZON
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      12 to 24-Month Phased Architecture Roadmap
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      CORE ARTIFACT
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Technical Dependency Matrix &amp; Decision Log
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      GOVERNANCE CADENCE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Quarterly Target-State Review &amp; Living Architecture Handover
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Dependency Audits</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Pre-Development Data &amp; API Validation</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Risk Scoring</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Technical Debt &amp; Vendor Lock-In Insulation</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Execution Support</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Objective Engineering Milestone Criteria</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need an architecture review?</span>
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
              <h2 id="what-is-a-technology-roadmap-architecture-plan" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
                What Is a Technology Roadmap &amp; Architecture Plan?
              </h2>
              <div className="space-y-4 text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-plex-sans">
                <p>
                  A technology roadmap is a sequenced, prioritized strategic blueprint that connects business objectives with technical execution across multi-quarter horizons. Rather than treating software upgrades as isolated purchases, independent technology roadmap consulting establishes which platforms, database schemas, and integration pipelines must be stabilized before introducing subsequent application layers.
                </p>
                <p>
                  Through dedicated technology architecture consulting, organizations evaluate current-state technical debt and define an explicit target-state architecture. This approach transforms the roadmap from a static presentation slide into a living governance framework—ensuring engineering teams resolve fundamental dependencies first, prevent costly architectural rework, and align ongoing technology investments with commercial reality.
                </p>
              </div>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Sequenced Technology Decisions</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Engineering choices ordered by real technical dependencies and business impact, not urgency alone.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Architecture Aligned to Business Goals</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Target-state system blueprints ensuring software investments directly advance commercial milestones.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">A Living Plan, Not a Shelved Document</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Dynamic quarterly governance cadence adapting implementation phases as commercial requirements shift.
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
            <h2 id="who-needs-a-technology-roadmap" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              Who Needs a Technology Roadmap
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-plex-sans">
              Technology roadmap consulting is designed for leadership teams seeking disciplined architectural sequencing, preventing uncoordinated software purchases before scaling operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Making Technology Decisions Reactively, One Purchase at a Time
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Organizations that acquire SaaS tools or patch systems in response to immediate operational fires, requiring professional IT roadmap consulting to untangle technical sprawl.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies About to Scale Who Need to Know What Technology Decisions Come Next
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Growing companies preparing for substantial operational expansion that require a structured technology strategy roadmap to sequence infrastructure investments ahead of user demand.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Teams That Already Have a Roadmap but Haven&apos;t Updated It in Years
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprises with static planning slides drafted years ago that no longer reflect modern decoupled cloud architecture, current security posture, or shifting commercial realities.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ZONE 3: HOW IT WORKS & DELIVERABLES (SECTION 3, SECTION 4, SECTION 5, SECTION 6) */}
      <div className="bg-white dark:bg-[#0A0A0A]">
        {/* SECTION 3 (H2) — CONNECTED PROCESS STEPS (NUMBERED CIRCULAR NODES) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-16">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              03 — process
            </div>
            <h2 id="digixpros-roadmap-architecture-process" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              DigiXPro&apos;s Roadmap &amp; Architecture Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-plex-sans">
              An architectural sequencing methodology ordering technology investments by operational dependency, commercial impact, and governance resilience.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    01
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Current-State &amp; Goals Review</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Comprehensive audit of existing software applications, technical debt, and team operational workflows evaluated against commercial targets.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    02
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Sequencing &amp; Prioritization</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Engineering decisions ordered by strict prerequisite dependencies and financial value, separating immediate quick wins from core platform refactors.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    03
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Architecture Decisions</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Core technical direction choices—data schemas, integration boundaries, and build-vs-buy models—made explicit rather than left implicit.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    04
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Living Roadmap Handover</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Delivery of a dynamic governance artifact, quarterly review rhythm, and clear milestone acceptance criteria so the plan evolves alongside the company.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 (H2) — 2x2 HAIRLINE GRID MATRIX */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-16">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              04 — deliverables
            </div>
            <h2 id="whats-included-in-technology-roadmap-services" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              What&apos;s Included in Technology Roadmap Services
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-plex-sans">
              Concrete architectural assets, dependency frameworks, and governance protocols included in our technology roadmap services.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                CURRENT-STATE &amp; GOALS REVIEW // 01
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Current-State &amp; Goals Review
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Infrastructure asset audit, codebase technical debt evaluation, software license cost modeling, and executive commercial milestone workshops.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                ROADMAP SEQUENCING // 02
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Roadmap Sequencing
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Phased multi-quarter scheduling, prerequisite technical dependency mapping, milestone acceptance gates, and critical-path identification.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                ARCHITECTURE DECISIONS // 03
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Architecture Decisions
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Target-state data schema blueprints, API integration standards, cloud topology models, and build-versus-buy trade-off evaluations.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                LIVING PLAN &amp; REVIEW CADENCE // 04
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Living Plan &amp; Review Cadence
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Quarterly architecture calibration protocols, engineering hiring guidance, and transparent advisory tiers documented in our [Investment Guide](/pricing).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 (H2) — COMPARISON SPEC-TABLE */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              05 — decision
            </div>
            <h2 id="roadmap-vs-no-plan-vs-reactive-decision-making" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              Roadmap vs No Plan vs Reactive Decision-Making
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 font-plex-sans">
              Choose the right approach based on how many technology decisions are coming and how connected they are.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Technology Roadmap (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/5">No Plan (Ad-Hoc Builds)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/5">Reactive Decision-Making</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Decision Consistency</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Decoupled target architecture where every tool purchase fits a planned schema.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Arbitrary developer preferences with no long-term design coherence.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Immediate department-level software purchases leading to tool sprawl.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost Over Time</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Predictable phased milestone budgeting preventing costly emergency refactors.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Unchecked technical debt requiring extensive retroactive code rewrites.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Ballooning SaaS subscription overhead with duplicate platform features.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Risk of Rework</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Minimal; foundational dependencies are stabilized before downstream apps launch.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Extreme; applications frequently fail because prerequisite data models were omitted.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">High; point-to-point integrations break whenever vendor APIs update.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Team Alignment</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Engineering, leadership, and product teams work toward identical quarterly milestones.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Disconnected technical priorities between executives and individual contributors.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Department silos creating competing data definitions and conflicting priorities.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best For</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Scaling companies navigating technical complexity or preparing for rapid expansion.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Short-term disposable proof-of-concept prototypes with no scaling intentions.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Single-function small businesses with zero custom integration requirements.</td>
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
            <h2 id="evidence-technology-roadmaps-architecture-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Technology Roadmaps &amp; Architecture in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-plex-sans">
              Inspect verified production case studies demonstrating disciplined platform sequencing, infrastructure architecture decisions, and multi-tenant scaling.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto mb-10 text-left">
            {/* Card 1: DigiXPro Platform Roadmap */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // PLATFORM ROADMAP SEQUENCING
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    DigiXPro Platform Roadmap
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Sequenced our multi-year platform evolution—stabilizing decoupled static rendering and webhook pipelines before deploying automated validation engines, eliminating architectural rework across 50+ commercial production routes.
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

            {/* Card 2: SattvaOS Architecture Decisions */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // GOVERNED AI INFRASTRUCTURE
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    SattvaOS Architecture Decisions
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Architected foundational governance and cryptographic identity barriers before exposing model endpoints, ensuring multi-tenant data boundaries were stabilized prior to enterprise-level application provisioning.
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

            {/* Card 3: aatma.guru Multi-Tenant Architecture */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 03 // MULTI-TENANT ARCHITECTURE
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    aatma.guru Multi-Tenant Architecture
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Sequenced workspace provisioning architecture, establishing human verification gates and schema isolation before scaling automated subdomain deployments live in production, supporting real onboarded usage.
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
              <h2 id="where-digixpro-delivers-this-service" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers This Service
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-plex-sans">
                From our engineering headquarters in Noida and Delhi NCR, DigiXPro provides technology roadmap and architecture consulting to companies across Delhi, Gurgaon, Mumbai, Bangalore, and metropolitan commercial hubs nationwide.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For distributed and global commercial enterprises, our technology architecture advisors conduct remote discovery audits, technical dependency mapping sessions, and virtual target-state workshops. {GLOBAL_DELIVERY_SENTENCE}
              </p>
            </div>

            {/* Right Column: Spec Panel (Clean 1px Border, NO Corner Brackets, Aligned with H2) */}
            <div className="lg:col-span-5">
              <div className="p-7 md:p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-700 shadow-sm flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <span className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a]">
                      DELIVERY COVERAGE
                    </span>
                    <span className="font-plex-mono text-[11px] text-neutral-400">NCR + GLOBAL</span>
                  </div>

                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                    Headquartered in Delhi NCR, Delivering Globally
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Our architecture advisory practices operate from Noida across the National Capital Region and provide remote roadmap sequencing internationally.
                  </p>

                  <div className="space-y-4">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                      <div className="text-xs font-bold text-black dark:text-white mb-1">
                        Primary Indian Metropolitan Coverage
                      </div>
                      <div className="font-plex-mono text-xs text-neutral-600 dark:text-neutral-400">
                        {SERVED_CITIES}
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                      <div className="text-xs font-bold text-black dark:text-white mb-1">
                        International Financial &amp; Tech Hubs
                      </div>
                      <div className="font-plex-mono text-xs text-neutral-600 dark:text-neutral-400">
                        {GLOBAL_TARGET_MARKETS}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need nationwide delivery?</span>
                  <Link href="/contact" className="text-xs font-bold text-[#16a34a] hover:underline flex items-center">
                    Speak With an Advisor <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 (H2) — ACCORDION FAQS */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              08 — faq
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 id="frequently-asked-questions" className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 mt-2 font-plex-sans">
                  Direct answers to common executive questions regarding technology roadmaps, dependency sequencing, and architecture governance.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleAllFaqs}
                className="text-xs font-plex-mono font-bold text-[#16a34a] hover:underline shrink-0 text-left md:text-right"
              >
                {isAllOpen ? 'Collapse All FAQs' : 'Expand All FAQs'}
              </button>
            </div>
          </div>

          <div className="max-w-[760px] mx-auto">
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
              {technologyRoadmapsFaqs.map((faq, index) => {
                const isOpen = !!openFaqs[index];
                return (
                  <div key={index} className="py-5">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-start justify-between gap-4 text-left group"
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors flex items-start font-plex-sans">
                        <HelpCircle className="w-4 h-4 text-[#16a34a] mr-3 shrink-0 mt-1" />
                        <span>{faq.question}</span>
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
              ARCHITECTURE DISCOVERY
            </span>
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
              Ready to sequence your technology decisions into an executable roadmap?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a diagnostic technical architecture audit to evaluate existing software dependencies, resolve technical debt, and sequence multi-year target blueprints.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center px-7 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-[15px] rounded-xl transition-colors shadow-md min-h-[52px]"
              >
                Request a Technical Architecture Audit <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-700 text-white font-bold text-[14px] rounded-xl hover:border-white transition-colors min-h-[52px]"
              >
                Book a 30-Min Architecture Call
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
