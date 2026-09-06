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

const GLOBAL_DELIVERY_SENTENCE = "Beyond India, we advise executive teams and growing commercial organizations across the USA, UK, Australia, and Singapore via remote diagnostic workflows and virtual strategy sessions.";

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

export const digitalTransformationFaqs = [
  {
    question: "How much does digital transformation consulting cost?",
    answer: "Digital transformation consulting costs typically range from twenty thousand to eighty thousand dollars globally, or fifteen lakh to sixty lakh rupees in India, depending on organizational size, operational complexity, and engagement duration. Unlike traditional management consultancies that bill open-ended time-and-materials rates with armies of junior analysts, DigiXPro structures digital transformation advisory into focused diagnostic milestones and fixed-fee quarterly governance retainers. Review detailed advisory investment frameworks and milestone tiers in the [DigiXPro Investment Guide](/pricing) to plan strategic transformation budgets with complete financial predictability."
  },
  {
    question: "How long does a digital transformation take?",
    answer: "A comprehensive digital transformation typically requires twelve to twenty-four months to execute fully, but must deliver tangible operational improvements within the first ninety days. The diagnostic assessment and strategic roadmap development take two to four weeks. High-priority operational quick wins—such as automating critical customer inquiries or eliminating duplicate software tools—are implemented within months one through three. Broader core workflow modernizations, legacy system migrations, and organizational change management unfold across subsequent quarters, ensuring that business continuity and customer delivery remain uninterrupted throughout the entire process."
  },
  {
    question: "How do you know if a business needs digital transformation?",
    answer: "A business needs digital transformation when manual workarounds, spreadsheet dependencies, and disconnected software systems stifle growth and degrade customer satisfaction. Common warning signs include employees manually re-entering data across different applications, customer service requests falling through communication cracks, and leadership lacking real-time visibility into operational performance. If competitors deliver faster turnarounds or superior digital experiences despite having fewer resources, the underlying issue is rarely inadequate effort—it indicates that legacy operational models have become an organizational bottleneck requiring structural, end-to-end commercial modernization."
  },
  {
    question: "How is digital transformation different from IT modernization?",
    answer: "Digital transformation fundamentally re-engineers how an organization operates, engages customers, and generates revenue, whereas IT modernization specifically updates the technical infrastructure supporting those operations. IT modernization focuses on upgrading servers, migrating databases to the cloud, or refactoring legacy codebases—as detailed in our [IT Consulting & Technology Strategy](/advisory/it-consulting-technology-strategy) services. Digital transformation encompasses business process redesign, change management, and operating model evolution. Technology is merely an enabler; the primary goal of transformation is creating a responsive, commercially resilient organization adapted to digital markets."
  },
  {
    question: "What does a digital transformation roadmap include?",
    answer: "A digital transformation roadmap includes an executive summary of strategic objectives, a current-state maturity diagnostic, a target operating model architecture, and a sequenced initiative timeline. It organizes transformation activities into distinct workstreams—including customer experience, operational automation, data governance, and employee enablement. Each workstream defines concrete deliverables, assigned resource ownership, technology dependencies, and estimated financial budgets. Crucially, the roadmap establishes quantifiable success metrics and governance checkpoints at thirty, sixty, and ninety days to ensure execution momentum remains disciplined, measurable, and accountable."
  },
  {
    question: "Why do digital transformation projects fail?",
    answer: "Digital transformation projects primarily fail due to treating organizational transformation as a software purchasing exercise rather than a business operating change. When leadership invests in enterprise platforms without addressing employee adoption, workflow redesign, or change resistance, team members revert to familiar manual spreadsheets. Additional failure causes include vague commercial objectives, lack of executive sponsorship, and attempting massive all-at-once migrations rather than iterative, value-delivering phases. Successful transformation demands structured change management, disciplined governance, and continuous alignment between technology systems and operational reality."
  },
  {
    question: "How do you measure digital transformation success?",
    answer: "Measuring digital transformation success requires tracking concrete commercial and operational metrics rather than tracking software deployment milestones alone. Key indicators include operational cycle times, such as time required to fulfill an order or onboard a new client, employee adoption rates across new platforms, customer retention rates, and reduced administrative error rates. Financially, success is measured through lower cost-to-serve ratios, eliminated legacy licensing fees, and accelerated top-line revenue growth. Defining baseline measurements before transformation begins ensures leadership can objectively verify return on investment across every phase."
  }
];

export const h2TocSections = [
  { text: "What Is Digital Transformation Consulting?", id: "what-is-digital-transformation-consulting" },
  { text: "Who Needs Digital Transformation Consulting", id: "who-needs-digital-transformation-consulting" },
  { text: "DigiXPro's Digital Transformation Process", id: "digixpros-digital-transformation-process" },
  { text: "What's Included in Digital Transformation Consulting", id: "whats-included-in-digital-transformation-consulting" },
  { text: "Digital Transformation vs IT Consulting vs Internal", id: "digital-transformation-vs-it-consulting-vs-internal" },
  { text: "Evidence: Digital Transformation Consulting in Action", id: "evidence-digital-transformation-consulting-in-action" },
  { text: "Where DigiXPro Delivers Digital Transformation Consulting", id: "where-digixpro-delivers-digital-transformation-consulting" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];


export default function DigitalTransformationConsultingView() {
  const currentUrl = "https://www.digixpro.in/advisory/digital-transformation-consulting";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = digitalTransformationFaqs.length > 0 && digitalTransformationFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      digitalTransformationFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Transformation Consulting Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Digital Transformation Consulting",
    "description": "Independent digital transformation consulting services. Align business operating models, eliminate manual workflows, and build executable transformation roadmaps.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Transformation Consulting Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Current-State Assessment",
            "description": "Operational workflow and bottleneck diagnostic, team readiness review, and customer touchpoint friction analysis."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transformation Strategy & Roadmap",
            "description": "Target-state operating model definition, phased initiative sequencing, and build-vs-buy architectural decision frameworks."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Change Management Guidance",
            "description": "Cross-functional stakeholder alignment frameworks, operational incentive design, and internal training roadmaps."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Execution & Measurement Support",
            "description": "Ongoing advisory governance, quantifiable operational efficiency tracking, and milestone checkpoints."
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
          { name: 'Digital Transformation Consulting Services', url: currentUrl },
        ]}
      />
      <FAQSchema items={digitalTransformationFaqs} />

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
                Digital Transformation Consulting Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Digital transformation consulting services evaluate operational bottlenecks, customer touchpoints, and legacy workflows to structure coherent business modernization programmes. Rather than merely purchasing new software tools, this strategic advisory aligns leadership, organizational culture, and scalable digital architectures into an executable roadmap delivering measurable commercial value.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Digital transformation consulting addresses fundamental business-level change rather than isolated technology upgrades. We evaluate operating models, map cross-functional workflows, and design phased transformation architectures that empower organizations to modernize legacy systems, eliminate manual drag, and scale profitably in digital markets.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Our business has outgrown its legacy processes and disconnected software, and we need an executable transformation roadmap rather than ad-hoc digital initiatives.&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">TRANSFORMATION SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Digital Transformation Advisory
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ADVISORY MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      100 Percent Independent Operating Model Design
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      FOCUS AREA
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Business Strategy, Process Redesign &amp; Change Alignment
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ENGAGEMENT
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Phased Diagnostic Milestones &amp; Quarterly Governance
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Vendor Stance</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Zero Software Markups or Resale Commissions</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Deliverable</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Executable Transformation Roadmap &amp; Governance Plan</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Execution</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Cross-Functional Advisory &amp; Milestone Measurement</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need transformation guidance?</span>
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
              <h2 id="what-is-digital-transformation-consulting" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Digital Transformation Consulting?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Digital transformation consulting addresses fundamental business-level change rather than isolated technology upgrades. While technical modernization focuses on replacing legacy software systems or configuring servers, genuine transformation restructures how an organization creates, delivers, and captures commercial value across shifting markets.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Merely digitizing existing paper-based or manual processes often locks organizations into inefficient operational habits. As an independent digital transformation consulting company, DigiXPro evaluates the complete operating model—aligning business goals, customer journeys, team incentives, and data workflows before selecting modern technical architectures. This strategic clarity ensures digital investments generate measurable operational momentum rather than fragmented software bloat.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Business-Level Strategy Assessment</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Objective evaluation of market positioning, operating models, and organizational bottlenecks.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Executable Transformation Roadmap</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Phased, realistic implementation sequencing tied directly to commercial milestones.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Change Management Alignment</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Structural governance aligning leadership, cross-functional teams, and operational incentives.
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
            <h2 id="who-needs-digital-transformation-consulting" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Who Needs Digital Transformation Consulting
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Strategic operating guidance for growing enterprises, legacy service businesses, and leadership teams navigating digital scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Whose Systems Haven&apos;t Kept Pace with Market Evolution
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Traditional organizations experiencing operational drag, customer friction, or margin erosion because legacy workflows and disconnected databases fail to match customer expectations.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies That Adopted Disconnected Tools Without an Overall Strategy
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprises that purchased multiple SaaS subscriptions and point solutions piecemeal, creating departmental data silos without establishing a unified operating model.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Growing Businesses Needing Structured Roadmaps Rather Than Ad-Hoc Initiatives
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Companies pursuing digital transformation for small business and scaling enterprises requiring phased, governed execution milestones rather than uncoordinated, risky technology bets.
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
            <h2 id="digixpros-digital-transformation-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s Digital Transformation Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our systematic 4-phase transformation methodology delivers clear operational diagnostics, phased roadmaps, and disciplined execution governance.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Current-State &amp; Readiness Assessment</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  An honest diagnostic evaluation of where the business actually stands across operations, team capability, and customer touchpoints—bypassing superficial maturity checklist models.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Strategy &amp; Prioritization</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Define targeted transformation initiatives prioritized strictly by commercial return on investment and operational feasibility, rather than chasing generic technology trends.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Roadmap &amp; Executable Plan</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Construct a detailed milestone blueprint detailing concrete workstreams, designated ownership, resource requirements, and risk mitigation checkpoints that teams can execute.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Execution Support &amp; Measurement</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Provide active advisory governance and progress tracking against defined operational key performance indicators, dynamically adjusting execution based on real results.
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
            <h2 id="whats-included-in-digital-transformation-consulting" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in Digital Transformation Consulting
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Comprehensive advisory scope covering current-state diagnostics, target-state blueprints, change governance, and execution oversight.
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
                Operational workflow and bottleneck diagnostic, team readiness review, and customer touchpoint friction analysis.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                STRATEGY &amp; ROADMAP // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Transformation Strategy &amp; Roadmap
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Target-state operating model definition, phased initiative sequencing, and build-vs-buy architectural decision frameworks. For long-term systems planning, explore our dedicated <Link href="/advisory/technology-roadmaps-architecture" className="text-[#16a34a] font-semibold hover:underline">technology roadmaps &amp; architecture</Link> advisory.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                CHANGE MANAGEMENT GUIDANCE // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Change Management Guidance
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Cross-functional stakeholder alignment frameworks, operational incentive design, and internal training roadmaps.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                EXECUTION &amp; MEASUREMENT // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Execution &amp; Measurement Support
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Ongoing advisory governance, quantifiable operational efficiency tracking, and scoped digital transformation advisory engagement tiers ([see investment guide](/pricing)).
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
            <h2 id="digital-transformation-vs-it-consulting-vs-internal" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Digital Transformation Consulting vs IT Consulting vs Doing It Internally
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Choose the right approach based on whether the challenge is a specific IT decision or a broader business change.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Comparing scope of change, strategic depth, execution timeframes, and organizational capability requirements.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Digital Transformation Consulting (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">IT Consulting</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Doing It Internally</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Scope of Change</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Comprehensive business-level operating model transformation across people, processes, and systems.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">System-specific architecture reviews, tech stack selection, and software infrastructure audits.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Ad-hoc incremental adjustments constrained by daily operational firefighting and habit.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Strategic vs Technical Focus</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Business strategy first, translating commercial growth goals into actionable technology requirements.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Technology-led focus on codebase health, infrastructure scalability, and vendor vetting.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Operational maintenance focus prioritizing immediate administrative convenience over strategy.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Time Horizon</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Multi-quarter strategic transformation sequenced through governed 90-day execution milestones.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Scoped 2-to-4 week diagnostic sprints delivering definitive architecture blueprints.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Unstructured, open-ended timelines frequently delayed by shifting internal priorities.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Internal Capability Needed</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Executive sponsor commitment; independent advisors structure the strategy and guide execution.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Technical leadership to receive and implement architectural recommendations.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Requires dedicated internal transformation expertise, which most scaling firms lack.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best For</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Businesses outgrowing legacy operating models needing fundamental commercial modernization.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Organizations facing a specific software platform choice, codebase debt, or vendor RFP.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Routine software maintenance, minor feature tweaks, and internal user onboarding.</td>
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
            <h2 id="evidence-digital-transformation-consulting-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Digital Transformation Consulting in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We practice exact operational transformation principles we deliver to our clients. Inspect real-world case studies of clinical practice digitization, decoupled specialty branding, and autonomous operating models.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-10 text-left">
            {/* Case File 1: Dr Aggarwal */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // CLINICAL PRACTICE DIGITIZATION
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                  Dr Aggarwal Physio Centre Case Study
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Digitized offline multi-location clinic operations into an integrated patient intake engine, connecting digital triage and consultation booking directly into reception desk workflows without administrative headcount growth.
                </p>
                <Link 
                  href="/evidence/dr-aggarwal" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 2: DigiXPro */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // AUTONOMOUS OPERATING SYSTEMS
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                  DigiXPro Platform Architecture
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Transforming traditional manual engineering consultancy workflows into an autonomous operational architecture with deterministic AI assistance, automated publishing, and programmatic lead capture.
                </p>
                <Link 
                  href="/evidence/digixpro" 
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
              <h2 id="where-digixpro-delivers-digital-transformation-consulting" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers Digital Transformation Consulting
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                From our corporate headquarters in Noida and Delhi NCR, DigiXPro guides enterprises through end-to-end digital transformation consulting across major metropolitan centers in India. Whether your organization seeks an experienced digital transformation consultant in Noida, Delhi, or Gurgaon to modernize departmental operations, or requires nationwide advisory across Pune, Bangalore, and Mumbai, we provide structured transformation roadmaps.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For geographically distributed enterprises, our transformation practices deliver remote process mapping, cloud migration governance, and executive change management support. {GLOBAL_DELIVERY_SENTENCE}
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
                    Our digital transformation advisory practices are headquartered in Noida, operating across the Delhi National Capital Region with distributed client engagements globally.
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
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need regional guidance?</span>
                  <Link href="/contact" className="text-xs font-bold text-[#16a34a] hover:underline flex items-center">
                    Contact Us <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 (H2) — ACCORDION WITH EXPAND / COLLAPSE ALL */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[760px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                08 — faq
              </div>
              <h2 id="frequently-asked-questions" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Clear technical and strategic answers regarding digital transformation consulting services and organizational modernization.
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

            <div className="divide-y divide-neutral-200 dark:border-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
              {digitalTransformationFaqs.map((faq, idx) => {
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
              Ready to structure a digital transformation roadmap for your business?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book an architecture discovery session to evaluate your operating model, diagnose workflow friction, and align your digital initiatives with commercial growth.
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
