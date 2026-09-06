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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const businessSystemsFaqs = [
  {
    question: "How much does business process consulting cost?",
    answer: "Business process consulting costs typically range from fifteen thousand to sixty thousand dollars globally, or twelve lakh to forty-five lakh rupees in India, depending on operational scope, departmental complexity, and system integration depth. Traditional management consultancies often charge open-ended hourly fees that encourage protracted analysis without delivering executable operational frameworks. DigiXPro delivers process architecture through structured diagnostic audits and milestone-based engagements with fixed commercial boundaries. Detailed scope tiers and investment schedules are documented in the [DigiXPro Investment Guide](/pricing) to help leadership forecast process advisory expenditure with complete transparency."
  },
  {
    question: "How long does business process mapping take?",
    answer: "Business process mapping typically takes two to four weeks for a targeted operational department, or six to eight weeks for a comprehensive cross-functional enterprise assessment. The diagnostic phase begins with in-depth stakeholder interviews and shadowing to capture actual daily workflows rather than idealized procedures. During weeks two and three, consultants document departmental handoffs, unearth undocumented tribal-knowledge steps, and identify operational bottlenecks. The final weeks focus on validating workflow blueprints with frontline teams and executive sponsors, ensuring the resulting process documentation reflects operational reality before architecture improvements begin."
  },
  {
    question: "How do you know if a business needs process architecture help?",
    answer: "A business needs process architecture help when daily operations depend entirely on key individuals rather than documented systems, causing work to stall whenever specific employees take leave. Common operational symptoms include customer orders or client deliverables getting delayed during handoffs between sales, operations, and finance teams. If managers spend excessive time mediating cross-departmental confusion, manually checking spreadsheets for data discrepancies, or resolving recurring operational errors, the issue is structural. Introducing professional process architecture replaces chaotic personal workarounds with repeatable, scalable workflows that support business growth."
  },
  {
    question: "What does a business process audit include?",
    answer: "A business process audit includes an end-to-end diagnostic evaluation of how work, data, and decisions flow across commercial departments. The audit catalogues every active software application, identifies shadow IT workarounds, and uncovers undocumented operational procedures maintained through personal habit. Key deliverables include comprehensive current-state workflow diagrams, a departmental handoff friction matrix, and an analysis of duplicate data entry points. Additionally, the audit provides leadership with an objective risk assessment highlighting single points of failure, compliance vulnerabilities, and a prioritized roadmap for architectural remediation."
  },
  {
    question: "What are the signs a business's systems and processes need redesign?",
    answer: "The clearest signs that a business's systems and processes need redesign include ballooning administrative overhead, declining customer responsiveness, and frequent internal disputes over task ownership. When organizations scale without redesigning initial workflows, employees create improvised spreadsheets and informal messaging groups to bridge operational gaps. This creates severe data fragmentation, where leadership cannot access reliable performance metrics without manual reconciliation. If hiring additional staff increases operational friction rather than throughput, the underlying process architecture has failed and requires structural re-engineering."
  },
  {
    question: "How is business process architecture different from process automation?",
    answer: "Business process architecture defines the fundamental logic, role accountabilities, and handoff rules governing how an organization operates, whereas process automation uses software to execute specific repetitive steps within that architecture. Automating a broken, disorganized workflow merely accelerates the generation of errors and amplifies organizational chaos. Process architecture rationalizes workflows, removes unnecessary approvals, and standardizes data formats before any code is deployed. Once processes are architecturally sound, teams can implement targeted [workflow & AI automation](/search-automation/workflow-ai-automation) solutions to eliminate manual routine tasks safely."
  },
  {
    question: "What does business process mapping actually involve?",
    answer: "Business process mapping involves visually diagramming every step, decision gate, input, and output required to complete a specific commercial objective from initiation to fulfillment. Consultants observe actual operational work, review communication trails, and interview stakeholders across all participating departments to understand informal practices. Each workflow step is mapped using standardized notation, capturing responsible roles, software tools utilized, and typical cycle times. The outcome is not merely a diagram, but an actionable blueprint revealing hidden redundancies, manual bottlenecks, and handoff vulnerabilities across the organization."
  },
  {
    question: "When should a business hire a business process consultant?",
    answer: "A business should hire a business process consultant when preparing for significant headcount expansion, integrating new enterprise software, or experiencing post-merger operational friction. Bringing in an external consultant provides objective judgment unburdened by internal company politics or historical habits. Organizations also benefit from process consulting when operational throughput plateaus despite increasing customer demand, or when executive leadership lacks visibility into daily team execution. Engaging a consultant before purchasing major software platforms ensures technical investments are architected around proven, streamlined operating practices."
  }
];

export const h2TocSections = [
  { text: "What Is Business Systems & Process Architecture?", id: "what-is-business-systems-process-architecture" },
  { text: "Who Needs Business Systems & Process Architecture", id: "who-needs-business-systems-process-architecture" },
  { text: "DigiXPro's Systems & Process Architecture Process", id: "digixpros-systems-process-architecture-process" },
  { text: "What's Included in Systems & Process Architecture", id: "whats-included-in-systems-process-architecture" },
  { text: "Ad-Hoc Fixes vs Process Mapping vs Full Architecture", id: "ad-hoc-fixes-vs-process-mapping-vs-full-architecture" },
  { text: "Evidence: Business Systems & Process Architecture in Action", id: "evidence-business-systems-process-architecture-in-action" },
  { text: "Where DigiXPro Delivers Systems & Process Architecture", id: "where-digixpro-delivers-systems-process-architecture" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function BusinessSystemsProcessArchitectureView() {
  const currentUrl = "https://www.digixpro.in/advisory/business-systems-process-architecture";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = businessSystemsFaqs.length > 0 && businessSystemsFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      businessSystemsFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Business Systems & Process Architecture Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Business Systems & Process Architecture",
    "description": "Independent business process consulting and systems architecture advisory. Align operating workflows, eliminate spreadsheet silos, and engineer coherent business process architecture.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "Mumbai", "Pune", "Bangalore", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Systems & Process Architecture Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Process & Systems Audit",
            "description": "Comprehensive current-state workflow diagrams, shadow spreadsheet discovery, and departmental bottleneck analysis."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow & Process Architecture",
            "description": "Target-state operating blueprint, departmental handoff contracts, and standardized operational procedures."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Systems Integration Design",
            "description": "Single source of truth data models, inter-system sync schemas, and downstream automation readiness frameworks."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Implementation Roadmap",
            "description": "Milestone-sequenced rollout schedule, cross-team throughput KPIs, and living documentation handover."
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
          { name: 'Business Systems & Process Architecture Services', url: currentUrl },
        ]}
      />
      <FAQSchema items={businessSystemsFaqs} />

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
                Business Systems &amp; Process Architecture Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Business systems and process architecture services design how an organization&apos;s workflows, software tools, and operational handoffs function as one coherent operating structure. Distinct from standalone IT consulting, broad digital transformation, or simple process mapping exercises, this architecture eliminates tribal-knowledge bottlenecks, establishing standardized operational consistency across expanding commercial teams.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Business systems and process architecture advisory designs the fundamental operating blueprints of scaling companies. We evaluate operational reality, eliminate informal spreadsheet workarounds, and align cross-departmental handoffs into one unified business process architecture.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Disconnected departments, spreadsheet silos, and chaotic manual handoffs indicate that our scaling friction is a systems and process problem, not merely a software problem.&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">PROCESS &amp; SYSTEMS OS</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Process Architecture Advisory
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ADVISORY MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      100 Percent Independent Operational Architecture
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      FOCUS AREA
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Business Process Consulting, Handoffs &amp; Systems Alignment
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ENGAGEMENT
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Diagnostic Process Audit &amp; Milestone Architecture
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
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Living Process Blueprint &amp; Cross-Team Handoff Schema</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Execution</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Workflow Standardization &amp; Operational Governance</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need process architecture guidance?</span>
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
              <h2 id="what-is-business-systems-process-architecture" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans leading-tight">
                What Is Business Systems &amp; Process Architecture?
              </h2>
              <div className="space-y-4 text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-plex-sans">
                <p>
                  Business systems and process architecture designs the foundational structure of how work, data, and decisions flow across an organization. When businesses scale, operational teams frequently patch localized bottlenecks with disconnected software subscriptions, creating fragmented communication handoffs and spreadsheet silos.
                </p>
                <p>
                  Our business process architecture practice replaces reactive problem-patching with systematic operational design. We analyze cross-departmental inputs and outputs, eliminating single points of failure and establishing explicit role ownership. By aligning daily operational workflows with underlying business systems architecture, we build resilient operating foundations that empower growing companies to scale revenue without requiring proportional administrative headcount.
                </p>
              </div>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Workflow &amp; Process Design</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    End-to-end operational mapping, input-output boundaries, and departmental handoff governance.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Systems Integration Architecture</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Single source of truth data models connecting CRM, ERP, and internal operating tools.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Operational Consistency Across Teams</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Decoupling organizational execution from undocumented employee habits and tribal knowledge.
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
            <h2 id="who-needs-business-systems-process-architecture" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Organizational Bottlenecks Solved by Business Systems &amp; Process Architecture
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Strategic operating guidance for growing enterprises, multi-departmental companies, and organizations outgrowing informal workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Whose Processes Rely on Individual Tribal Knowledge
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                When core operational execution depends entirely on undocumented habits stored inside the minds of key employees, daily delivery stalls whenever individuals take leave. Engaging an experienced business systems consultant structures tribal workarounds into explicit, documented operational procedures that any qualified team member can execute reliably.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Growing Companies Whose Workflows Never Evolved Past Early Headcount
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Early-stage startups function on informal communication and ad-hoc task delegation. As headcount expands past twenty employees, informal practices collapse into missed deadlines and customer delivery friction. Working with an objective business process consultant redesigns handoffs, clarifies accountability boundaries, and introduces structured operating rhythm.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Organizations Operating on Disconnected, Siloed Software Platforms
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                When sales, operations, and finance teams manage work in separate spreadsheets and un-synced software applications, employees waste hours manually re-entering data. We architect unified data schemas and cross-system information flows, eliminating duplicate effort and giving leadership dependable real-time performance visibility.
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
            <h2 id="digixpros-systems-process-architecture-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s Systems &amp; Process Architecture Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our disciplined 4-phase methodology maps real operational workflows, removes handoff friction, and engineers sustainable systems architecture.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Process &amp; systems audit</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Honest mapping of how work actually happens today across all departments, including undocumented tribal-knowledge steps, shadow IT tools, and manual workarounds.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Architecture design</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  A target workflow and systems model that removes single points of failure, eliminates redundant management approvals, and establishes explicit departmental handoffs.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Implementation roadmap</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Sequenced, incremental workflow changes prioritized by operational leverage, ensuring daily customer fulfillment and commercial operations remain completely undisrupted.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Validation &amp; handover</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Changes tested against real production workloads and fully documented into living operational manuals so internal leadership maintains complete ongoing ownership.
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
            <h2 id="whats-included-in-systems-process-architecture" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in Systems &amp; Process Architecture
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Comprehensive advisory scope delivering diagnostic process audits, handoff matrices, data schemas, and implementation governance.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                PROCESS &amp; SYSTEMS AUDIT // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Process &amp; Systems Audit
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Discovery of undocumented operational workflows, shadow spreadsheets, and departmental handoff friction points across core commercial functions.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                WORKFLOW &amp; PROCESS ARCHITECTURE // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Workflow &amp; Process Architecture
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Target-state operating blueprint, departmental handoff contracts, and standardized operational procedures that decouple execution from tribal knowledge.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                SYSTEMS INTEGRATION DESIGN // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Systems Integration Design
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Unified single-source-of-truth data schemas, inter-system synchronization architectures, and downstream workflow automation readiness.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                IMPLEMENTATION ROADMAP // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Implementation Roadmap
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Milestone-sequenced rollout schedules, cross-team performance metrics, and structured business process audit tiers ([see investment guide](/pricing)).
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
            <h2 id="ad-hoc-fixes-vs-process-mapping-vs-full-architecture" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Ad-Hoc Fixes vs Process Mapping Alone vs Full Systems &amp; Process Architecture
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Diagnose whether operational friction stems from isolated tooling gaps or systemic cross-functional misalignment.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Comparing operational scope, root cause resolution, fix longevity, and long-term cost impact.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Full Architecture (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Process Mapping Alone</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Ad-Hoc Fixes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Scope</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Holistic operating design connecting workflows, systems, and teams into one unified structure.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Visual diagrams documenting existing workflows without changing underlying system behaviors.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Localized patches addressing isolated complaints with additional software or manual steps.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Addresses Root Cause</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Resolves systemic failure points, undocumented handoffs, and software data disconnects.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Illustrates the operational problem visually but provides no architectural remedy.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Treats surface symptoms while leaving underlying workflow dysfunction and silos intact.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Longevity of Fix</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Scalable operational structure designed for continuous commercial growth and team expansion.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Becomes obsolete shelf-ware unless continuously updated by internal administrators.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Breaks down as soon as transaction volume or departmental team size increases.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost Over Time</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Predictable milestone investment delivering lasting efficiency and lower operational overhead.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Moderate upfront cost delivering static charts with minimal ongoing commercial return.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">High recurring waste through duplicate data re-entry and administrative headcount bloat.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best For</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Scaling enterprises needing resilient, predictable commercial execution across departments.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Basic compliance audits requiring static documentation of current workflow states.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Minor one-off glitches in non-critical peripheral tasks with minimal business impact.</td>
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
            <h2 id="evidence-business-systems-process-architecture-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Business Systems &amp; Process Architecture in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspect verified case studies demonstrating structured role-based workflow handoffs, editorial process pipelines, and multi-vendor operational coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto mb-10 text-left">
            {/* Card 1: DigiXPro Platform Operations */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // OPERATIONAL WORKFLOW DISCIPLINE
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    DigiXPro Platform Operations
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Architected strict role-based operational handoffs between founder diagnostic scoping, system architectural verification, and execution delivery, eliminating unstructured communication overhead and ad-hoc task leakage.
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

            {/* Card 2: Muktibodh Editorial Pipeline */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // EDITORIAL PROCESS ARCHITECTURE
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    Muktibodh Editorial Pipeline
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Redesigned multi-format publishing operations into a structured four-stage editorial process—author intake, editorial review, semantic typesetting, and multi-channel publication—replacing fragmented email and chat document handoffs.
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

            {/* Card 3: ScanCentreNearMe Coordination */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 03 // MULTI-VENDOR PROCESS COORDINATION
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">
                    ScanCentreNearMe Coordination
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Architected cross-stakeholder operational workflows connecting patient appointment booking, diagnostic center slot confirmations, and verified medical reporting uploads across independent multi-city healthcare laboratories.
                  </p>
                </div>
                <Link 
                  href="/evidence/scan-centre" 
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
              <h2 id="where-digixpro-delivers-systems-process-architecture" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers Systems &amp; Process Architecture
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-plex-sans">
                From our engineering headquarters in Delhi NCR, DigiXPro provides business systems and process architecture consulting across Noida, Gurgaon, Delhi, Mumbai, and commercial centers throughout India. Whether your organization seeks an experienced business systems consultant in Noida to structure departmental handoffs, or requires comprehensive process architecture advisory across Delhi NCR and major commercial hubs, we provide objective operational blueprints.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For multi-location commercial organizations and international enterprises, our systems advisory practices deliver remote workflow mapping, cross-team data alignment, and virtual operating workshops. {GLOBAL_DELIVERY_SENTENCE}
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
                    Our process architecture advisory practices are headquartered in Noida, operating across the Delhi National Capital Region with distributed client engagements globally.
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
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need process architecture guidance?</span>
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
                Clear answers to common questions regarding business process consulting, systems architecture, and workflow handoffs.
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
              {businessSystemsFaqs.map((faq, idx) => {
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
              OPERATIONAL DISCOVERY
            </span>
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
              Ready to replace spreadsheet silos and tribal handoffs with structured systems?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a diagnostic technical architecture audit to evaluate your operational workflows, departmental boundaries, and systems scalability.
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
