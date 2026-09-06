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

const GLOBAL_DELIVERY_SENTENCE = "Beyond India, we provide remote fractional CTO and virtual technology leadership for companies across the USA, UK, Australia, and Singapore via structured sprint steering and virtual executive standups.";

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

export const fractionalCtoFaqs = [
  {
    question: "How much does a fractional CTO cost?",
    answer: "A fractional CTO typically costs between twenty thousand and sixty thousand rupees per month for early-stage companies, while larger enterprises requiring deeper weekly engineering oversight invest on custom advisory retainers. Investment is structured as a predictable monthly advisory fee rather than volatile hourly billing, scaling with the number of weekly hours, executive meeting frequency, and code audit volume. This arrangement delivers high-level technical judgment at a fraction of the cost of a full-time executive salary and equity package. Review indicative retainer tiers in our [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "Fractional CTO vs full-time CTO — which is right for my business?",
    answer: "A fractional CTO is right for businesses that need senior technology judgment, architecture oversight, and vendor accountability without the financial overhead or equity dilution of a full-time executive. If your company employs fewer than fifteen developers, relies on external development agencies, or requires strategic guidance for ten to fifteen hours per week, a fractional engagement provides optimal efficiency. Conversely, mature enterprises managing large internal engineering teams with twenty or more engineers generally require a dedicated full-time executive on-site to handle day-to-day administrative personnel management."
  },
  {
    question: "How many hours does a fractional CTO typically work?",
    answer: "A fractional CTO typically works between five and twenty hours per week, depending on your organization's stage and immediate technical complexity. Common engagement formats range from a light advisory rhythm of four to six hours weekly for sprint oversight and board meetings, to an intensive fifteen to twenty hours weekly during active platform refactoring or vendor migrations. The allocation is agreed upon upfront during scoping, ensuring that leadership bandwidth concentrates directly on high-leverage architectural decisions, code reviews, and strategic planning rather than routine administrative tasks."
  },
  {
    question: "When should a startup hire a fractional CTO?",
    answer: "A startup should hire a fractional CTO when non-technical founders must evaluate complex architectural proposals, hire initial developers, or prevent expensive contractor mistakes. Bringing in senior technical leadership prior to writing production code ensures your foundational data schemas, cloud hosting choices, and API architectures are engineered to scale seamlessly. Engaging a fractional leader before committing substantial venture capital or signing vendor contracts protects early equity, establishes objective code-quality standards, and provides immediate credibility with investors during technical due diligence reviews."
  },
  {
    question: "Can a fractional CTO become full-time later?",
    answer: "Yes, transitioning a fractional CTO into a full-time role is a natural path when organizational growth warrants full-time executive bandwidth. Alternatively, the fractional leader can establish the permanent role profile, evaluate qualified candidates, lead technical interviews, and manage a seamless leadership handover to your permanent hire. Because the fractional CTO has already architected system standards, documented repository guidelines, and aligned engineering sprint rhythms, incoming full-time executives can step into a clean, disciplined environment with minimal onboarding downtime or operational disruption."
  },
  {
    question: "What does a fractional CTO actually do day to day?",
    answer: "Day to day, a fractional CTO reviews pull requests, participates in sprint planning standups, audits software vendor deliverables, and advises the CEO on strategic technical investments. They establish engineering code standards, inspect cloud hosting infrastructure to eliminate unnecessary recurring costs, and ensure database security protocols comply with industry best practices. Additionally, they translate complex engineering realities into clear commercial terms for non-technical stakeholders, evaluate prospective technology hires, and lead architecture reviews before development teams commit capital to major software features."
  },
  {
    question: "How do you evaluate a fractional CTO before hiring one?",
    answer: "You should evaluate a fractional CTO by examining their hands-on architecture experience, verified client case study evidence, ability to translate technical concepts for business executives, and past vendor management track record. An effective fractional leader must possess both high-level strategic vision and deep codebase auditing skills, demonstrating how they have successfully prevented technical debt in prior engagements. Request concrete examples of how they evaluated software trade-offs, managed external agencies, and protected intellectual property rather than relying on abstract resume credentials or buzzwords."
  },
  {
    question: "What does a fractional CTO agreement typically cover?",
    answer: "A fractional CTO agreement covers the defined scope of technical authority, weekly availability cadences, intellectual property assignment, confidentiality covenants, and monthly advisory retainer terms. It details specific responsibilities—such as vendor contract oversight, code quality governance, architecture blueprint sign-offs, and emergency incident availability. Importantly, clear agreements delineate between executive strategic leadership and hands-on developer implementation, ensuring the fractional CTO focuses on high-value governance, technical debt prevention, and engineering accountability rather than functioning as an expensive peripheral software programmer."
  }
];

export const h2TocSections = [
  { text: "What Is Fractional CTO & Technology Leadership?", id: "what-is-fractional-cto-technology-leadership" },
  { text: "Who Needs a Fractional CTO", id: "who-needs-a-fractional-cto" },
  { text: "How DigiXPro's Fractional CTO Engagement Works", id: "how-digixpros-fractional-cto-engagement-works" },
  { text: "What's Included in Fractional CTO Services", id: "whats-included-in-fractional-cto-services" },
  { text: "Fractional CTO vs Full-Time CTO vs No Technology Leadership", id: "fractional-cto-vs-full-time-cto-vs-no-technology-leadership" },
  { text: "Evidence: Fractional CTO & Technology Leadership in Action", id: "evidence-fractional-cto-technology-leadership-in-action" },
  { text: "Where DigiXPro Delivers This Service", id: "where-digixpro-delivers-this-service" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function FractionalCtoTechnologyLeadershipView() {
  const currentUrl = "https://www.digixpro.in/advisory/fractional-cto-technology-leadership";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = fractionalCtoFaqs.length > 0 && fractionalCtoFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      fractionalCtoFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Fractional CTO & Technology Leadership Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Fractional CTO & Executive Technology Leadership",
    "description": "Senior fractional CTO and virtual CTO services for growing companies. Ongoing executive technology leadership, architecture decisions, and vendor oversight.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "Mumbai", "Pune", "Bangalore", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fractional CTO Leadership Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technology Decision Ownership",
            "description": "Architecture blueprint approvals, build-vs-buy evaluations, tech stack selections, and technical risk insulation."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Team & Vendor Oversight",
            "description": "Pull-request code auditing, developer productivity benchmarks, agency SLA enforcement, and sprint milestone sign-offs."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Strategic & Roadmap Input",
            "description": "Board-level technical representation, capital allocation modeling, multi-quarter planning, and executive decision logs."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Flexible Engagement Model",
            "description": "Retainer tiers based on required leadership cadence, enabling leadership to hire a fractional CTO with clear fractional CTO cost visibility."
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
          { name: 'Fractional CTO & Technology Leadership', url: currentUrl },
        ]}
      />
      <FAQSchema items={fractionalCtoFaqs} />

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
                Fractional CTO &amp; Technology Leadership
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Fractional CTO and virtual CTO services provide ongoing, part-time executive technology leadership for growing businesses without full-time executive overhead. Distinct from one-time technology roadmap deliverables or standalone IT consulting audits, this active role owns continuous architectural decisions, governs engineering agencies, and steers long-term technical direction.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Senior fractional technology leadership bridges the gap between commercial ambitions and software development reality. We provide experienced technical direction, review pull requests, evaluate vendor contracts, and participate in executive board reviews on a predictable monthly retainer.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;We need senior technology judgment to guide our developers and evaluate vendor proposals, but our current stage does not yet justify hiring a full-time CTO.&rdquo;
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
                  Fractional CTO Leadership Scope
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      LEADERSHIP MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Retainer-Based Executive Technology Leadership
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      DECISION OWNERSHIP
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Architecture Standards, Code Reviews &amp; Vendor Oversight
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      OPERATIONAL CADENCE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Weekly Sprint Steering &amp; Strategic Executive Availability
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Vendor Governance</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Contract Specifications &amp; Milestone Acceptance</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Risk Mitigation</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Codebase Auditing &amp; Security Policy Guardrails</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Executive Transition</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Full-Time CTO Role Scoping &amp; Team Handover</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need leadership evaluation?</span>
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
              <h2 id="what-is-fractional-cto-technology-leadership" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
                What Is Fractional CTO &amp; Technology Leadership?
              </h2>
              <div className="space-y-4 text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-plex-sans">
                <p>
                  Fractional CTO and virtual CTO services provide high-growth companies with seasoned technical direction on an ongoing, retainer-based leadership cadence. While <Link href="/advisory/it-consulting-technology-strategy" className="text-[#16a34a] font-semibold hover:underline">IT consulting</Link> delivers objective diagnostic assessments and a <Link href="/advisory/technology-roadmaps-architecture" className="text-[#16a34a] font-semibold hover:underline">technology roadmap</Link> produces a sequenced planning blueprint, a fractional CTO service embeds active executive decision-making directly into your weekly business operations.
                </p>
                <p>
                  This ongoing leadership engagement bridges the gap between commercial strategy and engineering execution. Rather than offering detached recommendations from the sidelines, an experienced fractional CTO takes direct ownership of architectural integrity, establishes rigorous code-review standards, evaluates contractor proposals, and holds development teams accountable—delivering executive-level judgment at a fraction of a full-time hire&apos;s expense.
                </p>
              </div>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Ongoing Technology Leadership</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Continuous executive steering, sprint reviews, and technical ownership embedded within leadership.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Fraction of a Full-Time Hire&apos;s Cost</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Predictable monthly advisory retainer delivering executive seniority without full-time salary or equity overhead.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Available as Decisions Actually Arise</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Flexible weekly availability to evaluate vendor contracts, audit pull requests, and address technical hurdles.
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
            <h2 id="who-needs-a-fractional-cto" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              Who Needs a Fractional CTO
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-plex-sans">
              Fractional technology leadership is engineered for companies navigating critical software decisions that demand seasoned engineering governance without full-time executive payroll.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Startups Needing Senior Technology Leadership Before They Can Justify a Full-Time CTO
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Early-stage companies that require an experienced fractional CTO for startups to validate product architecture, establish engineering standards, and protect equity before scaling development payroll.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Growing Businesses Making Technology Decisions Without Anyone Senior Enough to Own Them
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Companies where non-technical founders or operations managers struggle to evaluate conflicting developer proposals, assess code quality, or manage external software agencies.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies Between CTOs Needing Continuity During an Executive Transition
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Established organizations navigating the departure of a technical leader that need steady interim guidance to maintain sprint momentum and structure the hiring criteria for their next executive.
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
            <h2 id="how-digixpros-fractional-cto-engagement-works" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              How DigiXPro&apos;s Fractional CTO Engagement Works
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-plex-sans">
              A structured 4-step governance model designed to integrate senior technical leadership seamlessly into your commercial rhythm.
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
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Scope &amp; Cadence Agreement</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    We establish exact weekly time commitments, key decision domains, communication channels, and milestone objectives upfront to ensure total operational clarity.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    02
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Onboarding &amp; Context</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Deep technical discovery examining current software repositories, infrastructure costs, vendor agreements, and development workflows to understand operational reality.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    03
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Ongoing Leadership &amp; Decisions</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Active participation in leadership standups, weekly architecture code reviews, contractor deliverable audits, and direct ownership of technical direction.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white font-plex-mono font-bold flex items-center justify-center mb-4 text-sm shadow-sm">
                    04
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">Review &amp; Evolution</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Quarterly calibration of leadership bandwidth as company operations expand, including structuring the hiring roadmap and interviewing for a full-time successor.
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
            <h2 id="whats-included-in-fractional-cto-services" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              What&apos;s Included in Fractional CTO Services
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-plex-sans">
              Concrete technical oversight, engineering governance, and executive leadership deliverables included in our fractional engagements.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                DECISION OWNERSHIP // 01
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Technology Decision Ownership
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Architecture blueprint approvals, build-versus-buy trade-off evaluations, core tech stack selections, and technical risk insulation.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                TEAM &amp; VENDOR OVERSIGHT // 02
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Team &amp; Vendor Oversight
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Pull-request code auditing, developer productivity benchmarks, agency SLA enforcement, and sprint milestone sign-offs.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                STRATEGIC &amp; ROADMAP INPUT // 03
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Strategic &amp; Roadmap Input
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Board-level technical representation, capital allocation modeling, multi-quarter planning, and executive decision logs.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                FLEXIBLE ENGAGEMENT MODEL // 04
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Flexible Engagement Model
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Retainer tiers based on required leadership cadence, enabling leadership to hire a fractional CTO with clear fractional CTO cost visibility in our [Investment Guide](/pricing).
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
            <h2 id="fractional-cto-vs-full-time-cto-vs-no-technology-leadership" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
              Fractional CTO vs Full-Time CTO vs No Technology Leadership
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 font-plex-sans">
              Choose the right approach based on how many technology decisions need ongoing ownership and what the business can afford right now.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Fractional CTO (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/5">Full-Time Executive CTO</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/5">No Technology Leadership</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Predictable monthly advisory retainer; zero equity, health benefits, or severance overhead.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Significant executive salary, bonus structure, benefits, and substantial equity dilution.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Zero upfront executive cost, but high hidden expenses in failed software and vendor rework.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Availability</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Dedicated weekly leadership blocks and flexible on-demand access for critical decisions.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Forty plus hours per week full-time on-site or remote executive presence.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Unstructured; ad-hoc developer opinions without senior accountability.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Decision Ownership</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Senior executive actively owns architecture choices, vendor contracts, and release standards.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Full end-to-end executive ownership across all internal engineering operations.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Delegated downward to junior developers or external agencies with competing incentives.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Commitment Level</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Flexible month-to-month or quarterly advisory terms scaling with business milestones.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Multi-year permanent executive employment contract with complex exit terms.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">None; reactive management dealing with technical fires as they occur.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best For</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Growing companies needing high-level technical judgment without full-time executive overhead.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Mature enterprises with large internal engineering departments exceeding twenty-five developers.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Early exploratory micro-projects with zero commercial transaction volume.</td>
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
            <h2 id="evidence-fractional-cto-technology-leadership-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Fractional CTO &amp; Technology Leadership in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-plex-sans">
              Inspect real-world case studies demonstrating ongoing technical direction, software quality governance, and executive leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-10 text-left">
            {/* Card 1: DigiXPro Technical Leadership */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // TECHNICAL LEADERSHIP &amp; RELEASE GOVERNANCE
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    DigiXPro Technical Leadership
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Provided ongoing technical stewardship across continuous platform releases, establishing strict pull-request review gates and production standards that eliminated external agency dependency.
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

            {/* Card 2: SattvaOS Technical Governance */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // ONGOING TECHNICAL GOVERNANCE &amp; STEERAGE
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    SattvaOS Technical Governance
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Delivered executive technical direction across iterative development cycles, governing policy interceptor specifications and conducting code audits to maintain institutional data security across tenant cohorts.
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
                From our engineering base in Noida and Delhi NCR, DigiXPro provides fractional CTO and virtual technology leadership across Delhi, Gurgaon, Mumbai, Bangalore, and growing business hubs nationwide. As an executive advisory discipline, fractional technology leadership is ideally suited for remote engagement, seamlessly embedding into your engineering standups and executive slack channels regardless of physical headquarters.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For international enterprises and venture-backed organizations, our fractional technical leaders conduct remote architecture code audits, weekly sprint planning, and quarterly technical board evaluations. {GLOBAL_DELIVERY_SENTENCE}
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
                    Our executive technology advisors operate from Noida across the National Capital Region and provide remote fractional CTO leadership internationally.
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
                  Direct answers to common executive questions regarding fractional CTO leadership, retainer models, and developer governance.
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
              {fractionalCtoFaqs.map((faq, index) => {
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
              EXECUTIVE LEADERSHIP
            </span>
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
              Ready to bring senior technical judgment into your business?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a diagnostic technical architecture audit to evaluate existing code quality, identify vendor risks, and explore fractional CTO leadership options.
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
