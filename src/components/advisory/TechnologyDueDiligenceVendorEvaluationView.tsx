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
  ShieldCheck,
  Cpu,
  Server,
  Database,
  FileText,
  HelpCircle,
  ChevronDown,
  ListFilter,
  CheckCircle2,
  Lock,
  Layers,
  Code2,
  Globe,
  Zap
} from 'lucide-react';

const GLOBAL_DELIVERY_SENTENCE = "Beyond India, we advise enterprise acquisition teams, private equity funds, and cross-border companies across the USA, UK, Australia, and Singapore via secure virtual data rooms and remote codebase inspections.";

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

export const dueDiligenceFaqs = [
  {
    question: "How much does technology due diligence cost?",
    answer: "Technology due diligence costs typically range from ten thousand to forty thousand dollars globally, or eight lakh to thirty lakh rupees in India, depending on codebase scale, architecture complexity, and security audit depth. Smaller software vendor evaluations involving RFP reviews or platform vetting generally range from five thousand to fifteen thousand dollars. Unlike advisory firms charging percentage fees on transaction values, DigiXPro scopes engagements under fixed milestone fees. Review detailed advisory investment benchmarks in the [DigiXPro Investment Guide](/pricing) to plan technical diligence without unpredictable billing."
  },
  {
    question: "When is technology due diligence needed?",
    answer: "Technology due diligence is needed whenever an organization plans a business acquisition, corporate merger, major platform migration, or substantial capital allocation into software infrastructure. Conducting diligence before transaction agreements become legally binding prevents buyers from inheriting fatal codebase flaws, unscalable cloud architectures, critical cybersecurity vulnerabilities, or intellectual property infringements. Diligence is also vital when non-technical executives must approve complex technology modernization proposals, ensuring that technical claims made by founders or external development agencies match operational reality before enterprise funds are released."
  },
  {
    question: "What does a technology due diligence report include?",
    answer: "A technology due diligence report includes an executive risk summary, a comprehensive codebase quality analysis, an architecture scalability review, and an infrastructure cost audit. It evaluates software dependencies, cloud hosting configurations, database bottlenecks, API integrations, and open-source licensing compliance to identify copyright exposures. The report delivers a prioritized risk matrix classifying technical debt by financial impact and remediation urgency. Finally, it outlines concrete remediation roadmaps, estimated engineering budgets, and definitive go or no-go acquisition guidance empowering executive leadership with complete commercial clarity."
  },
  {
    question: "How do you evaluate a software vendor before signing a contract?",
    answer: "Evaluating a software vendor requires verifying technical architecture, data portability, operational security, and total cost of ownership rather than relying on polished sales presentations. Begin by reviewing standard API documentation and testing automated data export mechanisms to ensure the platform permits painless migration. Next, audit multi-tenant security certifications, encryption standards, and uptime service level agreements. Finally, model long-term financial commitments including seat tier escalations, data storage charges, and implementation fees, negotiating contractual protections against unilateral price increases before signing binding agreements."
  },
  {
    question: "When should a business conduct technology due diligence for an acquisition?",
    answer: "A business should conduct technology due diligence during the confirmatory due diligence phase immediately after signing a non-binding Letter of Intent and before finalizing binding purchase agreements. Initiating technical assessment at this stage allows independent engineering auditors to inspect private code repositories, review cloud architecture configurations, interview lead developers, and audit database schemas. Identifying technical debt, intellectual property ownership gaps, or critical scalability bottlenecks during this window provides essential leverage to renegotiate purchase prices, adjust escrow terms, or cancel flawed transactions."
  },
  {
    question: "How long does a vendor evaluation take?",
    answer: "A structured vendor evaluation typically takes two to four weeks from initial requirements scoping to final recommendation delivery. Week one defines business requirements, operational constraints, and architectural integration standards while issuing structured RFPs to shortlisted candidates. Week two evaluates vendor responses, conducts technical proof-of-concept tests, and audits API capabilities. Week three models total cost of ownership across three-year horizons and assesses security compliance postures. Week four delivers a comparative vendor scoring matrix with definitive go-forward recommendations and negotiation points for executive leadership."
  },
  {
    question: "What questions should you ask a software vendor before buying?",
    answer: "Essential questions to ask a software vendor include: Can you demonstrate automated data export in standard open formats like JSON or CSV? What is your historical uptime record excluding scheduled maintenance windows? How are software upgrades deployed, and do custom configurations break during major updates? What are your data encryption protocols at rest and in transit? How does your pricing model escalate as our database size or active user counts grow? Finally, what contractual remedies and SLA credits apply if platform outages disrupt our operations?"
  },
  {
    question: "What should a vendor evaluation checklist cover?",
    answer: "A comprehensive vendor evaluation checklist covers five foundational pillars: architectural fit, commercial terms, security compliance, operational support, and product viability. Architectural fit verifies API robustness, data models, and integration latency with existing tech stacks. Commercial terms audit total cost of ownership, recurring license ramps, and implementation costs. Security compliance validates SOC2, ISO27001, data residency, and role-based permissions. Operational support inspects guaranteed SLA response times and dedicated account management. Finally, product viability evaluates the vendor's financial stability, engineering roadmap velocity, and customer retention metrics."
  }
];

export const h2TocSections = [
  { text: "What Is Technology Due Diligence & Vendor Evaluation?", id: "what-is-technology-due-diligence-vendor-evaluation" },
  { text: "Who Needs Technology Due Diligence & Vendor Evaluation", id: "who-needs-this-service" },
  { text: "DigiXPro's Due Diligence & Evaluation Process", id: "digixpros-due-diligence-evaluation-process" },
  { text: "What's Included in Due Diligence & Vendor Evaluation", id: "whats-included-in-due-diligence-vendor-evaluation" },
  { text: "Independent Assessment vs Vendor Claims vs No Due Diligence", id: "independent-assessment-vs-vendor-claims-vs-no-due-diligence" },
  { text: "Evidence: Due Diligence & Vendor Evaluation in Action", id: "evidence-due-diligence-vendor-evaluation-in-action" },
  { text: "Where DigiXPro Delivers Due Diligence Advisory", id: "where-digixpro-delivers-due-diligence-advisory" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];


export default function TechnologyDueDiligenceVendorEvaluationView() {
  const currentUrl = "https://www.digixpro.in/advisory/technology-due-diligence-vendor-evaluation";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = dueDiligenceFaqs.length > 0 && dueDiligenceFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      dueDiligenceFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Technology Due Diligence & Vendor Evaluation Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Technology Due Diligence & Vendor Evaluation",
    "description": "Independent technology due diligence and software vendor evaluation. Objective codebase audits, architecture risk reviews, and vendor proposal vetting.",
    "url": currentUrl,
    "dateModified": "2026-09-06",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Due Diligence & Vendor Evaluation Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technology Due Diligence (M&A)",
            "description": "Codebase quality audits, architectural scalability reviews, and intellectual property compliance assessments."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vendor & Software Evaluation",
            "description": "RFP creation, technical bid verification, build-vs-buy financial modeling, and software contract vetting."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Risk & Gap Assessment",
            "description": "Prioritized operational risk matrices, technical debt scoring, and vendor SLA validation."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Findings Report & Recommendation",
            "description": "Executive go/no-go transaction guidance, vendor negotiation leverage, and remediation milestones."
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
          { name: 'Technology Due Diligence & Vendor Evaluation', url: currentUrl },
        ]}
      />
      <FAQSchema items={dueDiligenceFaqs} />

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
                Technology Due Diligence &amp; Vendor Evaluation
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Independent technology due diligence evaluates codebase health, technical debt, and architectural risks before an acquisition or capital investment. Paired with software vendor evaluation, this advisory service rigorously vets vendor proposals, pricing models, and contract terms to prevent lock-in and commercial exposure before signing agreements.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Technology due diligence and vendor evaluation provide independent technical assessment before major capital commitments. We inspect software architecture, evaluate codebase maintainability, verify security postures, and review contract SLA commitments to protect enterprise capital and eliminate vendor lock-in before agreements become legally binding.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Before we acquire a company or sign a major software contract, we need independent technical scrutiny of what we are actually buying.&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">DILIGENCE SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Due Diligence &amp; Vendor Vetting
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      ADVISORY MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      100 Percent Neutral (0 Vendor Commissions)
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      DILIGENCE FOCUS
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Codebase Quality, Tech Debt &amp; Security Posture
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      VENDOR VETTING
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      RFP Verification &amp; Build-vs-Buy TCO Models
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Independence</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Zero Software Reseller Margins</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Deliverable</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Go/No-Go Report &amp; Negotiation Points</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Engagement</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Fixed-Fee Milestone Deliverables</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need a diligence review?</span>
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
              <h2 id="what-is-technology-due-diligence-vendor-evaluation" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Technology Due Diligence &amp; Vendor Evaluation?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Technology due diligence and vendor evaluation represent two distinct but connected technical advisory disciplines designed to protect capital before major financial commitments. Technology due diligence investigates the internal architecture, codebase quality, infrastructure scalability, and security posture of an acquisition target or existing platform before an enterprise transaction closes.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Vendor evaluation provides independent technical assessment of third-party software providers, RFP proposals, and agency contracts before organizations execute multi-year software agreements. Operating without vendor reseller margins or implementation commissions, this combined advisory provides unbiased engineering oversight, uncovering hidden licensing fees, vendor lock-in, and technical vulnerabilities before contracts are signed.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Independent Technical Assessment</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Objective audit of architecture, codebase, security vulnerabilities, and infrastructure scalability.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Vendor &amp; Software Vetting</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Independent review of software proposals, RFP bids, SLA criteria, and total cost of ownership.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Risk Identification Before Commitment</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Transparent risk severity scoring and negotiation leverage before executing binding agreements.
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
            <h2 id="who-needs-this-service" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Transaction Triggers for Technology Due Diligence &amp; Vendor Evaluation
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Objective technical judgment designed for leadership teams, investment committees, and founders facing high-stakes procurement or M&amp;A transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Evaluating an Acquisition Target&apos;s Technology Before Closing
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Organizations acquiring a company or software platform requiring rigorous technical due diligence to uncover hidden architectural debt, licensing liabilities, and security vulnerabilities before final valuation.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies About to Sign a Major Software Contract Without In-House Technical Input
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprises conducting software vendor evaluation before signing multi-year SaaS licenses or agency development contracts, ensuring deliverables match commercial requirements without vendor lock-in.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Investors or Boards Needing an Unbiased Technology Risk Assessment
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Investment committees and executive boards seeking independent technical assessment of platform claims, scalability risks, and engineering roadmap feasibility before deploying capital.
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
            <h2 id="digixpros-due-diligence-evaluation-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s Due Diligence &amp; Evaluation Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our systematic 4-phase evaluation methodology delivers rigorous codebase scrutiny, objective risk scoring, and decisive negotiation leverage.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Scope &amp; Context Definition</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Define whether the engagement addresses an acquisition, a major software vendor contract, or a platform migration. Establish technical boundaries, stakeholder interviews, and target decision criteria.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Independent Technical Assessment</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Execute hands-on architectural inspection, codebase review, security posture analysis, and infrastructure scalability testing rather than relying on vendor-supplied feature checklists.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Risk &amp; Gap Findings</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Document and prioritize identified technical risks, maintenance debts, licensing cost inflation, and operational gaps with honest severity ratings, free from commercial bias.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Report &amp; Recommendation</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Deliver an executive-level evaluation report providing definitive go/no-go guidance, pricing negotiation leverage, and remediation milestones that leadership can execute immediately.
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
            <h2 id="whats-included-in-due-diligence-vendor-evaluation" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in Due Diligence &amp; Vendor Evaluation
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Comprehensive scope covering M&amp;A technical diligence, software proposal vetting, and actionable decision blueprints.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                TECHNOLOGY DUE DILIGENCE (M&amp;A) // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Cpu className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Technology Due Diligence (M&amp;A)
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Deep architectural investigation of target software assets, backend repositories, and platform infrastructure. Includes codebase quality audits, cloud dependency reviews, and open-source license compliance.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                VENDOR &amp; SOFTWARE EVALUATION // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Server className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Vendor &amp; Software Evaluation
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Independent technical verification of software proposals, licensing contracts, and vendor capabilities. Covers RFP creation, technical bid verification, build-vs-buy financial modeling, and vendor lock-in risks.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                RISK &amp; GAP ASSESSMENT // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Database className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Risk &amp; Gap Assessment
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Unvarnished evaluation of architectural flaws, operational bottlenecks, and contractual vulnerabilities. Produces a prioritized risk matrix, remediation cost estimates, and contractual SLA milestone validations.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                FINDINGS REPORT &amp; RECOMMENDATION // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <FileText className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Findings Report &amp; Recommendation
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Definitive executive deliverables providing negotiation leverage and clear go/no-go guidance. Includes transparent scoping for technology due diligence services and independent technology audit services with clear milestone pricing ([see investment guide](/pricing)).
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
            <h2 id="independent-assessment-vs-vendor-claims-vs-no-due-diligence" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Independent Assessment vs Vendor&apos;s Own Claims vs No Due Diligence
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Calibrate diligence depth against transaction size, vendor exposure, and institutional liability.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Comparing independence, risk visibility, negotiation leverage, and the commercial cost of being wrong.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Independent Assessment (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Vendor&apos;s Own Claims</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">No Due Diligence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Independence &amp; Bias</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">100 Percent unbiased; zero vendor commissions, reseller margins, or billable implementation bias.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Highly biased; sales incentives reward closing licenses and inflating implementation billables.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Zero assessment; assumes vendor documentation and marketing claims are entirely accurate.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Risk Visibility</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Full code-level and architectural inspection uncovering hidden technical debt and security gaps.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Curated demos and marketing slide decks showcasing only ideal-path workflows.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Latent risks remain completely invisible until production deployment failures occur.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Negotiation Leverage</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Documented technical findings provide concrete leverage to negotiate license fees and SLAs.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Unilateral contract terms dictated by vendor pricing tiers and restrictive service clauses.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Zero negotiation leverage; accept standard commercial terms without technical pushback.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Cost of Being Wrong</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Minimal; scoped diagnostic fee prevents millions in failed implementations and platform rework.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Severe; stuck in multi-year binding contracts with escalating maintenance costs.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Catastrophic; failed enterprise software rollouts, security breaches, or aborted acquisitions.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Best For</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Critical acquisitions, multi-year software contracts, and major platform architecture commitments.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Standard feature exploration and introductory sales demonstrations.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Low-risk disposable tools with minimal financial or operational downside.</td>
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
            <h2 id="evidence-due-diligence-vendor-evaluation-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: Due Diligence &amp; Vendor Evaluation in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Review verified findings from code-level vulnerability audits, multi-tenant architectural assessments, and proprietary vendor deliverable validations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-10 text-left">
            {/* Case File 1: SattvaOS */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // TECHNICAL RISK &amp; GOVERNANCE AUDIT
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                  SattvaOS Architecture Case Study
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Independent pre-acquisition codebase audit identifying latent security risks, validating tenant encryption isolation, and verifying compliance with institutional privacy standards before closing.
                </p>
                <Link 
                  href="/evidence/sattvaos" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 2: DigiXPro */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // VENDOR-NEUTRAL PLATFORM VERIFICATION
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                  DigiXPro Platform Architecture
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Demonstrates our proprietary code quality benchmarks, open-standard API contracts, and vendor-neutral repository architecture designed to prevent agency dependency and technical debt.
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
              07 — footprint
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Reading Copy */}
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <h2 id="where-digixpro-delivers-due-diligence-advisory" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers Due Diligence Advisory
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                From our engineering headquarters in Noida and the Delhi National Capital Region, DigiXPro provides independent technology due diligence and software vendor evaluation across India and worldwide.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Advisory engagements are delivered through secure virtual data rooms and remote repository audits, backed by in-person executive briefing sessions across major metropolitan financial hubs. {GLOBAL_DELIVERY_SENTENCE}
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
                    Our technical due diligence practices are headquartered in Noida, operating across the Delhi National Capital Region with distributed client engagements globally.
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
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need regional diligence?</span>
                  <Link href="/contact" className="text-xs font-bold text-[#16a34a] hover:underline flex items-center">
                    Contact Us <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 (H2) — ACCORDION WITH EXPAND / COLLAPSE ALL */}
        <section className="py-24 max-w-[1200px] mx-auto px-6">
          <div className="max-w-[760px] mx-auto">
            <div className="text-center mb-12">
              <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                08 — faq
              </div>
              <h2 id="frequently-asked-questions" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Clear technical and commercial answers regarding technology due diligence services and software vendor evaluations.
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
              {dueDiligenceFaqs.map((faq, idx) => {
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
              Evaluating an acquisition target or critical software contract?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a technical diligence discovery call to review codebases, audit vendor proposals, and protect enterprise capital before signing binding agreements.
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
