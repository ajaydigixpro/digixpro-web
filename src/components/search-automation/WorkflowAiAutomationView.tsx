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
  Workflow,
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

export const workflowAiFaqs = [
  {
    question: "What business processes can be automated using custom workflow automation?",
    answer: "Workflow automation streamlines repetitive operational tasks including inbound lead routing, CRM data synchronization, customer onboarding notifications, invoice generation, and cross-system data transfers. Connecting software applications via secure API webhooks eliminates manual copy-paste effort, reduces human error, and speeds up internal task execution. To evaluate indicative automation pricing frameworks, explore the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "What is the difference between n8n / Zapier and custom API automation?",
    answer: "n8n and Zapier provide visual workflow canvases that rapidly connect standard SaaS applications through pre-built API nodes. In contrast, custom API automation requires writing dedicated integration scripts to handle proprietary database schemas, complex data transformations, and high-volume data streams. Low-code automation minimizes initial setup friction for standard business workflows, whereas custom scripts cater to strict enterprise security standards and non-standard internal software environments."
  },
  {
    question: "Zapier vs Make — which is right for your business?",
    answer: "Choosing between Zapier and Make depends on workflow complexity, team technical expertise, and task execution volume. Zapier excels for non-technical teams seeking rapid point-to-point connections across standard SaaS applications with minimal setup friction. Make (formerly Integromat) provides a visual canvas with advanced data transformation controls, complex multi-branch routing, and lower high-volume execution pricing. However, both SaaS platforms charge ongoing per-task fees and process data on shared third-party cloud servers. For businesses requiring strict data privacy, zero task execution caps, and full infrastructure control, self-hosted n8n and custom API webhooks offer superior long-term ownership."
  },
  {
    question: "Will workflow automation replace our existing software systems or work alongside them?",
    answer: "Automated workflows operate directly alongside your current software tools, linking separate SaaS platforms, CRMs, and internal databases into a unified operational network. API webhooks pass data smoothly between applications like HubSpot, Slack, Google Workspace, and SQL backends without replacing existing software investments. Connecting your software stack eliminates manual file exports and data silos, creating seamless end-to-end operational processes."
  },
  {
    question: "How do you ensure data security and compliance when connecting business systems?",
    answer: "We maintain data security by enforcing encrypted OAuth2 authentication, TLS 1.3 transit encryption, restricted API access tokens, and isolated server execution environments. Workflows process data payloads securely without storing sensitive customer information permanently on intermediary integration servers. Rate-limiting and error logging protocols prevent unauthorized system access and protect data integrity during high-volume API transfers."
  },
  {
    question: "How long does a typical workflow automation implementation take?",
    answer: "Deploying an operational automation system generally takes 2 to 5 weeks from initial process mapping to live production release. Standard multi-app lead routing integrations are often operational within 10 business days. Complex enterprise projects featuring custom database mapping, multi-stage conditional branching, and legacy software connectors follow a structured 4-week development roadmap, including extensive sandbox testing to ensure complete data accuracy."
  },
  {
    question: "How do you handle error monitoring and system failures in automated workflows?",
    answer: "Our integration architecture incorporates automated retry loops, dead-letter queue storage, and real-time alert notifications sent to Slack or email upon system exceptions. If an external SaaS platform experiences temporary API downtime, fallback scripts hold failed payloads securely and retry execution once connectivity recovers. Detailed execution logging allows engineers to diagnose and resolve third-party API changes rapidly, avoiding data loss during platform service outages."
  },
  {
    question: "Can custom AI models or LLMs be integrated into daily business workflows?",
    answer: "We embed advanced LLMs (such as OpenAI GPT-4 or Anthropic Claude) directly into automated business workflows via API endpoints to handle complex cognitive tasks. Custom AI nodes analyze incoming customer emails, summarize lengthy PDF uploads, categorize support tickets, and draft tailored response copy automatically. Intelligent automation processes unstructured text instantly, delivering smart assistance within Slack or CRM interfaces to accelerate team decision-making."
  },
  {
    question: "What ongoing support and maintenance are required after automation workflows are deployed?",
    answer: "Automated workflows require periodic maintenance to adapt to third-party SaaS API schema changes, security patch releases, and expanding operational requirements. Our ongoing maintenance retainers supply continuous API execution monitoring, script adjustments, security updates, and workflow expansion credits. Proactive maintenance ensures your automated system adapts smoothly whenever third-party software vendors modify API endpoints, guaranteeing unbroken operational continuity across connected systems."
  }
];

export default function WorkflowAiAutomationView() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const tocSections = [
    { id: 'what-is-workflow-ai-automation-engineering', text: 'What Is Workflow & AI Automation Engineering?' },
    { id: 'who-needs-workflow-ai-automation-services', text: 'Who Needs Workflow & AI Automation Services' },
    { id: 'digixpros-workflow-ai-automation-process', text: "DigiXPro's Automation Engineering Process" },
    { id: 'whats-included-in-workflow-ai-automation-scope', text: "What's Included in Automation Scope" },
    { id: 'custom-n8n-api-automation-vs-off-the-shelf-saas-vs-manual-operations', text: 'Custom n8n & API Automation vs Off-the-Shelf SaaS vs Manual Work' },
    { id: 'evidence-automation-engineering-in-action', text: 'Evidence: Automation Engineering in Action' },
    { id: 'where-digixpro-delivers-workflow-ai-automation', text: 'Where DigiXPro Delivers Automation Systems' },
    { id: 'frequently-asked-questions-automation', text: 'Frequently Asked Questions About Automation' },
  ];

  const currentUrl = 'https://www.digixpro.in/search-automation/workflow-ai-automation';

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Workflow & AI Automation Engineering Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Workflow Automation & AI Integration Engineering",
    "description": "Enterprise workflow automation, custom n8n pipelines, and AI agent integration. Connecting CRM, ERP, and communication platforms to eliminate manual data entry and operational latency.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Workflow Automation Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Self-Hosted n8n & API Pipelines",
            "description": "Resilient webhook orchestration, custom API integrations, automated retry policies, and zero per-task SaaS tax."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Agent & LLM Routing",
            "description": "Context-aware LLM agents for lead triage, automated proposal drafting, and natural language knowledge querying."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cross-Platform Data Synchronization",
            "description": "Bi-directional syncing between CRM, Google Sheets, ERP databases, and messaging channels."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monitoring & Exception Telemetry",
            "description": "Dead-letter queues, real-time Slack/WhatsApp failure alerts, and immutable execution logging."
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
          { name: 'Workflow & AI Automation', url: currentUrl },
        ]}
      />
      <FAQSchema items={workflowAiFaqs} />

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
                Workflow &amp; AI Automation Services for Growing Businesses
              </h1>

              {/* QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Workflow &amp; AI automation engineering connects your software applications, APIs, databases, and AI models into deterministic, self-hosted n8n pipelines—eliminating manual copy-paste labor, speeding up operational response times, and reducing departmental friction.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Operational teams frequently waste hundreds of hours manually transferring lead records, copying data between spreadsheets, and forwarding client emails across software tools.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;Can repetitive operational work across our business actually be automated cleanly?&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">CANONICAL #17</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Workflow &amp; AI Automation Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PRIMARY PLATFORM
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Self-Hosted n8n &amp; Webhook Architecture
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      INTEGRATION PROTOCOLS
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      REST APIs &middot; Webhooks &middot; JSON Data Pipelines
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      AI CONNECTORS
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      OpenAI GPT-4 &middot; Gemini &middot; Claude Integration
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Security &amp; Encryption</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">OAuth2 &middot; TLS 1.3 &middot; Secrets Store</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Error Resilience</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Retry Loops &middot; Alert Queues</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Delivery Model</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Implementation + Support</span>
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
      <section id="what-is-workflow-ai-automation-engineering" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
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
                What Is Workflow &amp; AI Automation Engineering?
              </h2>
              <div className="space-y-4 text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Workflow &amp; AI automation engineering is the discipline of connecting separate software tools, internal databases, cloud platforms, and generative AI models into unified operational pipelines. Rather than forcing employees to manually copy-paste customer information between forms, spreadsheets, CRMs, and messaging apps, automated workflows execute data transfers instantly behind the scenes.
                </p>
                <p>
                  At DigiXPro, we build workflow automation systems using self-hosted, enterprise-grade tools like n8n combined with direct HTTP API webhooks and custom Node.js/Python scripts. This ensures your operational data flows deterministically without per-task subscription fees or third-party vendor lock-in.
                </p>
                <p>
                  By integrating generative AI APIs (such as Google Gemini or OpenAI GPT-4) into structured workflows, we enable business systems to read unstructured customer emails, parse incoming PDF invoices, synthesize meeting summaries, and route high-priority lead requests with human-level intelligence and machine speed.
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
                      Self-Hosted n8n Workflow Pipelines
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Deploy resilient automation pipelines on isolated cloud infrastructure, granting full data ownership and zero per-execution pricing limits.
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Direct HTTP API Webhook Integration
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Connect web forms, CRMs, email gateways, and payment processors with sub-second event triggers and robust payload verification.
                    </p>
                  </div>
                </div>

                <div className="pb-2 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Cognitive AI Model Connectors
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Embed LLM endpoints to parse unstructured text, categorize support tickets, and extract key entities automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TARGET FIT & AUDIENCE (EDITORIAL 3-COLUMN) */}
      <section id="who-needs-workflow-ai-automation-services" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                02 — audience
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Operational Scenarios Demanding Workflow &amp; AI Automation
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Workflow automation delivers high ROI for organizations facing manual operational bottlenecks, high lead volume, or fragmented software stacks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                01 // B2B SERVICE COMPANIES
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Scaling Operations Without Hiring Overhead
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Growing B2B service firms where team members spend hours re-entering client lead details between web forms, email, spreadsheets, and CRMs.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Instant lead notification feeds</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>CRM contact creation webhooks</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Automated meeting calendar links</li>
              </ul>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                02 // E-COMMERCE &amp; RETAIL
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Multi-Channel Order &amp; Inventory Sync
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Retailers requiring automated inventory state updates, order fulfillment alerts, customer tracking webhooks, and supplier catalog synchronization.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Single-copy inventory locking</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Automated shipping status triggers</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Supplier webhook integrations</li>
              </ul>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                03 // PROFESSIONAL SERVICES &amp; AGENCIES
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Client Onboarding &amp; Document Parsing
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Consultancies, legal practices, and agencies processing high volumes of incoming client documents, intake forms, and invoice approvals.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>AI-driven PDF &amp; form extraction</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Automated client onboarding folders</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2"></span>Executive reporting feeds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROCESS & METHODOLOGY (SCHEMATIC SEQUENCE - 4 STEPS) */}
      <section id="digixpros-workflow-ai-automation-process" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                03 — methodology
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              DigiXPro&apos;s Workflow &amp; AI Automation Process
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We follow a rigorous 4-phase integration methodology to map, build, secure, and deploy production automation pipelines.
            </p>
          </div>

          {/* Connected Schematic Container */}
          <div className="p-8 md:p-12 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Process Audit &amp; API Mapping
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Analyze manual workflows, document software API endpoints, define data payload schemas, and evaluate security access requirements.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Pipeline Architecture &amp; Build
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Construct self-hosted n8n workflow nodes, configure HTTP webhooks, map CRM fields, and integrate AI model endpoints in sandbox environments.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Security, Exception &amp; Retry Logic
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Embed TLS transit encryption, OAuth2 token rotation, automated retry loops, and dead-letter exception queues for system resilience.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono font-bold text-sm flex items-center justify-center shadow-md mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-black dark:text-white font-plex-sans">
                  Production Deployment &amp; Monitoring
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Release automation to production servers, establish real-time Slack/email error alerts, and maintain ongoing API health checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FULL SERVICE SCOPE (2x2 MATRIX CELLS) */}
      <section id="whats-included-in-workflow-ai-automation-scope" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                04 — scope
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              What&apos;s Included in Workflow &amp; AI Automation Scope
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our engineering scope delivers production-ready automation infrastructure tailored to your exact operational requirements.
            </p>
          </div>

          {/* 2x2 Matrix Container */}
          <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x grid md:grid-cols-2 bg-white dark:bg-neutral-900">
            {/* Cell 01 */}
            <div className="p-8 border-b md:border-b-0 border-neutral-200 dark:border-neutral-800">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                AUTOMATION SCOPE // 01 — n8n &amp; API PIPELINES
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                Self-Hosted n8n &amp; Webhook Architecture
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Self-hosted n8n instance setup on secure cloud VPS</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Custom HTTP webhook endpoints for real-time form capture</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>REST API authentication &amp; token rotation workflows</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Data transformation &amp; payload formatting scripts</li>
              </ul>
            </div>

            {/* Cell 02 */}
            <div className="p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                AUTOMATION SCOPE // 02 — AI &amp; DOCUMENT PROCESSING
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                AI Model &amp; Document Parsing Integration
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Google Gemini &amp; OpenAI GPT-4 API endpoint integration</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Automated parsing of unstructured PDF invoices &amp; emails</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Deterministic tag substitution for zero link hallucination</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Automated content summarization &amp; ticket categorization</li>
              </ul>
            </div>

            {/* Cell 03 */}
            <div className="p-8 border-t border-neutral-300 dark:border-neutral-700">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                AUTOMATION SCOPE // 03 — DATABASE &amp; CRM SYNC
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                CRM &amp; Operational Database Synchronization
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>HubSpot, Salesforce, Zoho, and Notion database sync</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Single-copy inventory lock &amp; order status webhooks</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Automated customer onboarding sequence triggers</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Instant sales team Slack &amp; email alert notifications</li>
              </ul>
            </div>

            {/* Cell 04 */}
            <div className="p-8 border-t border-neutral-300 dark:border-neutral-700">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-3">
                AUTOMATION SCOPE // 04 — SECURITY &amp; MONITORING
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-plex-sans">
                Error Resilience &amp; Security Engineering
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>TLS 1.3 transit encryption &amp; OAuth2 authentication</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Automated retry loops &amp; dead-letter exception queues</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Real-time system downtime alerts via Slack/email</li>
                <li className="flex items-start"><span className="text-[#16a34a] font-bold mr-2">—</span>Complete API execution logging &amp; payload auditing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ARCHITECTURE COMPARISON (FULL-WIDTH SPEC TABLE) */}
      <section id="custom-n8n-api-automation-vs-off-the-shelf-saas-vs-manual-operations" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                05 — decision
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Custom n8n &amp; API Automation vs Off-the-Shelf SaaS vs Manual Operations
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Choose the automation architecture based on operational scale, data security, execution cost, and long-term reliability.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Factor</th>
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-[#16a34a] w-1/3 border-l-2 border-[#16a34a]">DigiXPro Custom n8n &amp; API Automation</th>
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/4">Off-the-Shelf SaaS (Zapier/Make)</th>
                  <th className="p-4 md:p-5 text-xs font-plex-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/6">Manual Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Execution Cost Model</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    Flat self-hosted infrastructure. Zero per-task execution fees regardless of volume.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    High monthly pricing tiers based on task volume; costs scale rapidly with execution count.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    High internal salary cost spent on non-billable administrative copy-paste tasks.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Data Privacy &amp; Control</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    100% data ownership inside isolated cloud VPS; payloads never stored on third-party cloud servers.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Data payloads pass through third-party SaaS servers, creating compliance risks.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Data stored loosely across personal email inboxes, local spreadsheets, and messaging chats.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Custom Code &amp; AI Integration</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    Full Node.js/Python script execution, custom HTTP webhooks, and deterministic AI tag parsing.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Restricted to pre-built app nodes; limited custom code execution and complex branching.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Zero AI capability; reliant entirely on manual human processing speed.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 font-bold text-black dark:text-white align-top">Error Resilience &amp; Alerts</td>
                  <td className="p-4 md:p-5 text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top border-l-2 border-[#16a34a] bg-emerald-50/20 dark:bg-emerald-950/20">
                    Automated retry loops, dead-letter storage queues, and real-time Slack exception notifications.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    Basic email error logs; zaps pause silently upon API failure without automatic fallback queues.
                  </td>
                  <td className="p-4 md:p-5 text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">
                    High human error rate; tasks missed silently without error tracking or alert logs.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: EVIDENCE & CASE FILES (VERIFIED PROOF) */}
      <section id="evidence-automation-engineering-in-action" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                06 — proof
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Evidence: Automation Engineering in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore real-world production proof of our workflow and automation engineering across client platforms and our own internal architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case File Card 1: DigiXPro Platform Engine */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-neutral-900 text-white p-4 font-plex-mono text-xs flex justify-between items-center border-b border-neutral-800">
                  <span className="text-[#16a34a] font-bold">CASE FILE 01 // PLATFORM AUTOMATION</span>
                  <span className="text-neutral-400 text-[10px]">DIGIXPRO ARCHITECTURE</span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-black dark:text-white font-plex-sans">
                    DigiXPro Platform Lead &amp; AI Concierge Engine
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Living proof of our own commercial automation engineering: Multilingual 24/7 AI Assist concierge, multi-model automated publishing pipelines, and n8n webhook lead capture infrastructure.
                  </p>
                  
                  <div className="space-y-2 border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-xs font-plex-mono">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Pipeline Architecture:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">Decoupled Next.js + n8n + Notion DB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">AI Concierge Model:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">Gemini 2.5 Flash + Deterministic Parser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Operational Result:</span>
                      <span className="font-bold text-[#16a34a]">100% Autonomous Lead Triage</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/evidence/digixpro"
                  className="inline-flex items-center text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
                >
                  View Case Study Proof <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Case File Card 2: BuySecondhandBook Commerce Engine */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-neutral-900 text-white p-4 font-plex-mono text-xs flex justify-between items-center border-b border-neutral-800">
                  <span className="text-[#16a34a] font-bold">CASE FILE 02 // COMMERCE AUTOMATION</span>
                  <span className="text-neutral-400 text-[10px]">BUYSECONDHANDBOOK</span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-black dark:text-white font-plex-sans">
                    BuySecondHandBook Marketplace Engine
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Custom PHP 8.4 circular commerce engine featuring automated single-copy inventory state updates, order webhook synchronization, and automated cart session locking.
                  </p>
                  
                  <div className="space-y-2 border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-xs font-plex-mono">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Core Stack:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">Custom PHP 8.4 Engine + MySQL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Automation Focus:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-200">Inventory Lock &amp; Order Webhooks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Performance Result:</span>
                      <span className="font-bold text-[#16a34a]">99/100 Desktop Core Web Vitals</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/evidence/buy-secondhand-book"
                  className="inline-flex items-center text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
                >
                  View Case Study Proof <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LOCAL DELIVERY & GLOBAL REACH (2-COLUMN) */}
      <section id="where-digixpro-delivers-workflow-ai-automation" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <div className="mb-3">
                <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                  07 — local delivery
                </span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-6 font-plex-sans">
                Where DigiXPro Delivers Workflow &amp; AI Automation
              </h2>
              <div className="space-y-4 text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Search research demonstrates that workflow and AI automation engineering is inherently location-independent, operating via secure cloud API deployments and remote infrastructure management.
                </p>
                <p>
                  We engineer, deploy, and maintain custom n8n automation pipelines for growing businesses, enterprise teams, and digital brands across regional technology hubs in India and global commercial markets.
                </p>
              </div>
            </div>

            {/* Right Column: Spec Panel with unified coverage list */}
            <div className="lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider">
                    DELIVERY MATRIX // COVERAGE &amp; REACH
                  </span>
                </div>

                <div className="space-y-4 text-xs font-plex-mono">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="text-neutral-400 dark:text-neutral-500 uppercase text-[10px] mb-0.5">DEPLOYMENT ARCHITECTURE</div>
                    <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm font-sans">Cloud VPS &amp; Remote API Execution</div>
                  </div>

                  <div className="py-2 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-400 dark:text-neutral-500 uppercase text-[10px] block mb-1">GLOBAL &amp; REGIONAL COVERAGE</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed block font-sans">
                      {SERVED_CITIES} &middot; {GLOBAL_TARGET_MARKETS}
                    </span>
                  </div>

                  <div className="py-2">
                    <span className="text-neutral-400 dark:text-neutral-500 uppercase text-[10px] block mb-1">OPERATION &amp; MAINTENANCE</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-200 text-xs block font-sans">
                      24/7 Automated System Monitoring &amp; API Exception Alerts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section id="frequently-asked-questions-automation" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                08 — questions
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Frequently Asked Questions About Automation
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Clear operational answers regarding workflow automation, n8n deployment, security standards, and implementation timelines.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {workflowAiFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-black dark:text-white focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                      {faq.question}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0 font-plex-mono text-sm text-neutral-600 dark:text-neutral-400">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div className={`px-6 pb-6 pt-0 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-14 ${isOpen ? 'block' : 'hidden'}`}>
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
            <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight font-plex-sans">
              Ready to eliminate manual copy-paste tasks and automate operational workflows?
            </div>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto font-plex-sans">
              Book a 30-minute growth systems call to evaluate your workflow automation roadmap, API integration requirements, and security standards.
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

      <DeferredStickyMobileCTA />
    </div>
  );
}
