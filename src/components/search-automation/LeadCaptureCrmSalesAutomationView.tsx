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

export const crmSalesFaqs = [
  {
    question: "What business benefits does CRM automation deliver?",
    answer: "CRM automation eliminates manual lead handling by instantly routing inbound web inquiries to assigned sales team members, triggering immediate WhatsApp auto-responders, and logging structured contact data. Establishing zero-latency lead intake prevents lost prospects, accelerates speed-to-contact, and maintains complete pipeline visibility. To review indicative investment models, view the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "What lead capture & CRM automation tools do you work with?",
    answer: "We engineer custom lead routing pipelines connecting modern CRMs and messaging channels including HubSpot, Zoho CRM, Salesforce, Pipedrive, WhatsApp Business API, Slack, Google Sheets, and custom SQL databases. Using self-hosted n8n workflows and secure REST API webhooks, we ensure seamless data synchronization across your existing software stack without recurring per-task platform fees."
  },
  {
    question: "How long does a lead capture & CRM automation setup take?",
    answer: "A complete lead capture and CRM pipeline deployment typically takes 2 to 4 weeks. Initial form webhooks, CRM schema configuration, and instant WhatsApp notification setups are frequently operational within 10 business days. Multi-tier lead scoring, complex round-robin assignment rules, and custom multi-touch follow-up sequences are delivered within a 3-week implementation phase including thorough sandbox verification."
  },
  {
    question: "Can automated CRM pipelines handle lead scoring and routing?",
    answer: "Yes. Inbound inquiries are automatically scored and categorized based on company size, job title, budget parameters, geographic location, and specific service selection. Qualified high-intent leads are routed instantly to senior account executives, while regional or service-specific queries are directed automatically to assigned departmental representatives."
  },
  {
    question: "How do you prevent lost leads or dropped inquiries?",
    answer: "Our pipeline architecture utilizes fault-tolerant webhook listeners, automated retry handlers, and dead-letter queue storage. If your primary CRM platform experiences temporary API downtime or network latency, inbound lead payloads are held securely in buffer storage and retried automatically once service is restored, ensuring zero inquiry loss."
  },
  {
    question: "Will automated sales pipelines integrate with our existing website forms and WhatsApp?",
    answer: "Yes. Custom API webhooks connect directly to your current website forms, landing page builders (Elementor, Webflow, React/Next.js forms), and official WhatsApp Business API endpoints. Lead details captured online trigger immediate WhatsApp alert notifications to assigned reps and instant auto-reply messages to prospective clients."
  },
  {
    question: "How does automated follow-up improve lead conversion rates?",
    answer: "Responding to inbound prospects within minutes significantly increases initial contact rates and sales engagement compared to traditional delayed responses. Automated drip sequences, instant meeting scheduling links, and automated follow-up reminders ensure consistent prospect communication without placing manual administrative burdens on your sales team."
  }
];

/*
 * FLAGGED QUESTION 8 — NOT YET ADDED TO PUBLIC FAQ ARRAY (PENDING FOUNDER REVIEW)
 * --------------------------------------------------------------------------------
 * Question: "How do you decide which CRM automation to implement first?"
 * Draft Answer: "We prioritize automation initiatives based on revenue impact and operational friction. During initial technical discovery, we analyze lead response latency, inquiry drop-off points, and sales team administrative overhead. High-intent lead routing and instant WhatsApp alerts are typically deployed in Phase 1 to capture immediate buyer demand, followed by lead scoring models and automated multi-touch follow-up sequences in subsequent development iterations."
 */

export const h2TocSections = [
  { text: "What Is Lead Capture, CRM & Sales Automation?", id: "what-is-lead-capture-crm-sales-automation" },
  { text: "Who Needs Lead Capture & CRM Automation", id: "who-needs-lead-capture-crm-automation" },
  { text: "DigiXPro's CRM & Sales Automation Process", id: "digixpros-crm-sales-automation-process" },
  { text: "What's Included in CRM & Sales Automation Scope", id: "whats-included-in-crm-sales-automation-scope" },
  { text: "Manual Follow-Up vs Basic CRM vs Automated CRM Pipeline", id: "manual-follow-up-vs-basic-crm-vs-automated-crm-pipeline" },
  { text: "Evidence: CRM & Sales Automation in Action", id: "evidence-crm-sales-automation-in-action" },
  { text: "Where DigiXPro Delivers CRM & Sales Automation", id: "where-digixpro-delivers-crm-sales-automation" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function LeadCaptureCrmSalesAutomationView() {
  const currentUrl = "https://www.digixpro.in/search-automation/lead-capture-crm-sales-automation";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isAllOpen = crmSalesFaqs.length > 0 && crmSalesFaqs.every((_, i) => !!openFaqs[i]);

  const toggleAllFaqs = () => {
    if (isAllOpen) {
      setOpenFaqs({});
    } else {
      const allOpen: Record<number, boolean> = {};
      crmSalesFaqs.forEach((_, i) => {
        allOpen[i] = true;
      });
      setOpenFaqs(allOpen);
    }
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Lead Capture, CRM & Sales Automation Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Lead Capture & CRM Sales Automation",
    "description": "Lead capture system engineering, CRM automation, instant lead routing, sales pipeline tracking, and automated lead follow-up workflows.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "CRM & Sales Automation Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Setup & Data Migration",
            "description": "Custom CRM object configuration, property mapping, historical database import, and contact deduplication."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lead Capture & Instant Dispatch",
            "description": "Form webhooks, WhatsApp API integration, round-robin rep allocation, and instant Slack/WhatsApp alerts."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lead Scoring & Qualification",
            "description": "Rule-based intent scoring, firmographic tagging, and priority rep escalation."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automated Follow-Up & SLA Tracking",
            "description": "Multi-touch auto-responder sequences, meeting booking links, and dead-letter queue retry handlers."
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
          { name: 'Search, AI & Automation', url: 'https://www.digixpro.in/search-automation' },
          { name: 'Lead Capture, CRM & Sales Automation', url: currentUrl },
        ]}
      />
      <FAQSchema items={crmSalesFaqs} />

      {/* ZONE 1: HERO & TOC SECTION */}
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
                Lead Capture, CRM &amp; Sales Automation Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Lead capture, CRM &amp; sales automation engineering connects website forms, landing pages, and messaging channels directly to your CRM and sales notifications. Implementing instant webhooks, automated lead scoring, and instant WhatsApp alerts eliminates manual inbox entry and prevents dropped sales leads.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Growing sales teams and clinical practices routinely lose high-intent prospects because inbound inquiries sit unassigned in inbox folders for hours or days. Custom lead routing pipelines connect your forms, CRM database, and rep communication channels for sub-second lead intake.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Question: &ldquo;Can website leads automatically trigger WhatsApp notifications, rep assignments, and CRM pipeline updates?&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">CANONICAL #18</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  CRM &amp; Sales Automation Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      COMMERCIAL MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Implementation + Ongoing Support
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PRIMARY CRMs
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      HubSpot &middot; Zoho &middot; Salesforce &middot; Custom SQL
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      LEAD ROUTING SPEED
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Sub-Second Webhook Dispatch to WhatsApp &amp; Slack
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Workflow Engine</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Self-Hosted n8n &amp; API Webhooks</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Scoring Engine</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Intent &amp; Firmographic Rules</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">SLA Protection</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Dead-Letter Retry Handlers</span>
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
              <h2 id="what-is-lead-capture-crm-sales-automation" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Lead Capture, CRM &amp; Sales Automation?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Lead capture, CRM &amp; sales automation engineering represents the technical architecture that captures prospect inquiries across digital touchpoints and processes them instantly into structured CRM pipeline records without manual administrative effort.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                When prospective clients complete a consultation form, request a diagnostic booking, or message via WhatsApp, custom event webhooks parse the incoming payload, enrich contact attributes, assign account owners based on defined sales territory rules, and trigger real-time notification alerts to sales representatives.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                By linking website forms, sales automation software, and CRM databases, organizations replace fragmented spreadsheet lists and manual inbox checking with deterministic, zero-latency lead intake workflows.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows (Aligned with H2 Top Edge) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Response Speed Optimization</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Instant webhooks dispatch lead payloads in sub-second time, replacing manual inbox monitoring with real-time alert notifications.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Multi-Channel Intake</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Unified lead capture across custom web forms, landing pages, click-to-WhatsApp links, and social advertising channels.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Data Integrity &amp; Sync</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Structured CRM record creation with automated field validation and deduplication to ensure clean customer database maintenance.
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
            <h2 id="who-needs-lead-capture-crm-automation" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Who Needs Lead Capture &amp; CRM Automation
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Sales automation systems benefit organizations experiencing high inquiry volume, multi-rep sales coverage, or delayed prospect follow-up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                High-Volume Inbound Service Businesses
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Healthcare clinics, diagnostic centres, legal practices, and regional service providers requiring instant appointment intake and reception desk alerts.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Multi-Step B2B Sales Organizations
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                B2B companies requiring lead scoring, company enrichment, territory-based account assignment, and structured multi-touch follow-up workflows.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Suffering Lead Drop-Off
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Organizations experiencing response delays over 2 hours, where unassigned leads slip through email inbox cracks and convert with competitors.
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
            <h2 id="digixpros-crm-sales-automation-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s CRM &amp; Sales Automation Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our structured 4-phase implementation methodology combines lead routing discovery with custom webhook automation to eliminate manual data entry and optimize lead conversion speed.
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
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Pipeline &amp; Data Audit</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Mapping lead entry channels, CRM object structures, sales rep notification paths, and existing manual handoff friction points across your sales pipeline.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    02
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 02</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">CRM Setup &amp; Data Migration</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Configuring custom lead fields, pipeline stages, rep permission roles, and cleanly migrating historical contact records without data duplication.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    03
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 03</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Lead Capture &amp; Scoring Automation</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Connecting webhooks, landing page forms, and scoring rules to route high-intent prospects instantly to designated account owners.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] bg-white dark:bg-neutral-900 font-plex-mono font-bold text-[#16a34a] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    04
                  </div>
                  <span className="font-plex-mono text-[10px] text-neutral-400 uppercase tracking-wider">PHASE 04</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-plex-sans">Follow-Up Automation &amp; Monitoring</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Building automated WhatsApp/email drip sequences, instant alert notifications, and exception retry queue handlers before live deployment.
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
            <h2 id="whats-included-in-crm-sales-automation-scope" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in CRM &amp; Sales Automation Scope
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Every CRM &amp; sales automation engineering project delivers complete, end-to-end capabilities designed for instant lead routing, automated qualification, and reliable data synchronization.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                CRM SETUP // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> CRM Architecture &amp; Data Plumbing
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Configuring custom CRM objects, properties, deal pipelines, role-based rep permission hierarchies, and historical contact record deduplication across HubSpot, Zoho, or Salesforce.
              </p>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                LEAD INTAKE // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Instant Lead Capture &amp; Dispatch
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Connecting website form webhooks, landing pages, and WhatsApp Business API click-to-chat intake endpoints with automated round-robin sales rep allocation and instant Slack/WhatsApp alerts.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                QUALIFICATION // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Lead Scoring &amp; Account Qualification
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Evaluating prospect intent, budget parameters, company size, and geographic territory before prioritizing and routing leads to designated senior account executives.
              </p>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                FOLLOW-UP // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Automated Follow-Up &amp; SLA Tracking
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Building multi-touch email/WhatsApp auto-responder sequences, meeting booking links (Cal.com, Calendly), dead-letter queue retry handlers, and pipeline execution dashboards.
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
            <h2 id="manual-follow-up-vs-basic-crm-vs-automated-crm-pipeline" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Manual Follow-Up vs Basic CRM vs Automated CRM Pipeline
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Evaluating response latency, data entry effort, lead qualification rules, and SLA error protection across different lead handling approaches.
            </p>
            <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
              Select the intake pipeline model based on response speed targets, lead volume, and sales team capacity.
            </p>
          </div>

          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">Automated CRM Pipeline (DigiXPro)</th>
                  <th className="p-5 md:p-6 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/3">Manual Inbox / Basic CRM Setup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Response Speed</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Instant (&lt; 1 sec webhook dispatch to WhatsApp &amp; rep channels).</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">2 to 24 hours depending on manual inbox checking and rep availability.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Data Entry Effort</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Zero manual entry; 100% automated CRM record creation and property logging.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Manual copy-paste into spreadsheets or basic CRM contact fields.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">Lead Qualification</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Automated intent scoring, firmographic tagging, and priority rep assignment.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">None; all inquiries handled equally regardless of buyer intent or value.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-5 md:p-6 text-xs font-bold text-black dark:text-white align-top">SLA &amp; Error Protection</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a]">Dead-letter queue storage and automated retry handlers prevent lost inquiries.</td>
                  <td className="p-5 md:p-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">High risk of lost emails, unassigned leads, and dropped prospect inquiries.</td>
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
            <h2 id="evidence-crm-sales-automation-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Evidence: CRM &amp; Sales Automation in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Examine live deployments of real-time lead webhook routing, multi-location WhatsApp triage, and automated customer qualification engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[1100px] mx-auto mb-10 text-left">
            {/* Case File 1: DigiXPro Platform */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 01 // PLATFORM LEAD ENGINE
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-32px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    DigiXPro Platform Lead Engine
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Engineered zero-latency event webhook pipeline connecting custom Next.js consultation forms directly to real-time WhatsApp alert notifications and CRM lead record generation.
                  </p>
                </div>
                <Link 
                  href="/evidence/digixpro" 
                  className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>

            {/* Case File 2: 360 Neck & Shoulder Care */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 02 // CLINIC PATIENT INTAKE
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-32px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    360 Neck &amp; Shoulder Care
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Specialised clinic web design, visual identity architecture, and direct patient intake system with instant click-to-WhatsApp scheduling for a niche cervical and shoulder physiotherapy clinic in Noida.
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

            {/* Case File 3: BuySecondhandBook */}
            <div>
              <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
                CASE FILE 03 // E-COMMERCE LIST BUILDING
              </div>
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm h-[calc(100%-32px)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                    BuySecondhandBook
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Implemented automated customer list-building, mailing list synchronization, and transactional post-purchase email workflows for growing re-commerce platform.
                  </p>
                </div>
                <Link 
                  href="/evidence/buy-secondhand-book" 
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
              <h2 id="where-digixpro-delivers-crm-sales-automation" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                Where DigiXPro Delivers CRM &amp; Sales Automation
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                DigiXPro delivers engineered sales automation systems for growing businesses across Delhi NCR (serving clients in Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, and regional technology hubs across India) as well as global growth markets.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether establishing instant lead capture for a local clinical practice or configuring complex CRM pipeline routing for international SaaS clients, {GLOBAL_DELIVERY_SENTENCE} Our engineering team implements deterministic n8n workflows and API webhooks designed for zero-latency lead handling.
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
                  Schedule Strategy Discovery &rarr;
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
                Clear technical and commercial answers regarding lead capture webhooks, WhatsApp API integration, and CRM workflow setup.
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
              {crmSalesFaqs.map((faq, idx) => {
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

                    {/* Pre-rendered Answer Text */}
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
              Ready to automate your lead intake &amp; sales pipeline?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a strategy discovery session to discuss your lead routing bottlenecks, CRM integration requirements, and WhatsApp sales automation setup.
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
