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
  Layers, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Zap, 
  ChevronDown, 
  ListFilter,
  Users,
  FileText,
  Clock,
  Sparkles
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

export const socialMediaManagementFaqs = [
  {
    question: "How much does social media management cost per month?",
    answer: "Social media management pricing per month depends on target publishing frequency, channel count, graphic design scope, and custom content creation requirements. Engaging a dedicated social media management company typically ranges from fixed monthly retainers for small business core packages to comprehensive multi-channel enterprise systems. Unlike hourly freelancer rates or full-time internal hires with heavy overhead, structured monthly agency packages deliver full editorial strategy, visual asset creation, and scheduled publishing with clear cost predictability. Consult our [Investment Guide](/pricing) for detailed package specifications and service tier breakdowns."
  },
  {
    question: "What's included in a social media management package?",
    answer: "A comprehensive social media management package includes end-to-end content pipeline execution: monthly editorial calendar planning, topic research, platform-native copywriting, custom graphic design, scheduling, and monthly engagement analytics. Rather than simple text updates, our service packages deliver structured content systems—including LinkedIn text posts, branded carousel slides, visual quote cards, and short promotional graphics tailored for each social network. Every package incorporates an executive approval step before publishing to ensure complete brand control."
  },
  {
    question: "Does social media management include content creation, or just posting?",
    answer: "Professional social media management includes complete end-to-end content creation alongside multi-channel scheduling and publishing. Our team researches industry topics, writes tailored captions, designs custom branded visual assets, and formats content specifically for each social platform's algorithm. Simply posting existing company links without custom visual assets yields poor feed stopping power; combining creative content production with disciplined publishing ensures your social channels build genuine authority."
  },
  {
    question: "How often should a business post on social media?",
    answer: "A business should post on social media with consistent quality rather than overwhelming feeds with low-value content. For B2B companies, publishing 3 to 4 high-quality posts per week on LinkedIn and Facebook maintains steady audience engagement and algorithm indexability. Maintaining a predictable, high-authority posting rhythm builds stronger audience trust and profile conversion than sporadic daily posting bursts followed by weeks of inactivity."
  },
  {
    question: "How long does it take to see results from social media marketing?",
    answer: "Organic social media marketing delivers compounding brand authority and profile visibility within 60 to 90 days of consistent publishing. Initial improvements in profile impressions, post engagement, and visual consistency appear within the first 30 days. Sustained lead inquiries and referral traffic grow over 3 to 6 months as target decision-makers repeatedly encounter your structured industry insights across their feeds."
  },
  {
    question: "How does pricing compare between an agency, a freelancer, and an in-house hire?",
    answer: "Pricing across social media execution models reflects total output capability and internal operational overhead. Hiring a full-time in-house social media manager requires substantial fixed salary, benefits, and design tool subscriptions. Freelancers offer lower monthly fees but often lack comprehensive graphic design expertise or reliable delivery guardrails. A managed content system agency provides a full team—strategist, copywriter, graphic designer—for a predictable monthly retainer cost without management burden."
  },
  {
    question: "Does DigiXPro offer packages specifically for small businesses?",
    answer: "Yes, DigiXPro provides specialized social media management for small business requirements designed around core platform visibility and lead capture goals. Our small business packages focus on establishing consistent weekly posting, professional branded graphic templates, and targeted audience engagement across primary channels like LinkedIn and Facebook without requiring large enterprise marketing budgets."
  }
];

export const h2TocSections = [
  { text: "What Is Social Media Management & Content Systems?", id: "what-is-social-media-management-content-systems" },
  { text: "Who Needs Social Media Management & Content Systems", id: "who-needs-social-media-management-content-systems" },
  { text: "DigiXPro's Social Media Content Process", id: "digixpros-social-media-content-process" },
  { text: "What's Included in Social Media Management", id: "whats-included-in-social-media-management" },
  { text: "In-House vs Freelancer vs Managed Content System", id: "in-house-vs-freelancer-vs-managed-content-system" },
  { text: "Evidence: Social Media Content Systems in Action", id: "evidence-social-media-content-systems-in-action" },
  { text: "Where DigiXPro Delivers Social Media Management", id: "where-digixpro-delivers-social-media-management" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function SocialMediaManagementView() {
  const currentUrl = "https://www.digixpro.in/search-automation/social-media-management-content-systems";

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Social Media Management & Content Systems",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Social Media Management & Content Systems",
    "description": "Structured social media management, content pipeline strategy, AI-assisted drafting, human editorial review, graphic design, and multi-channel publishing.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Media Management Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Strategy & Calendar",
            "description": "Monthly topic research, editorial calendar planning, case study highlights, and service CTAs."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Platform-Native Content Creation",
            "description": "AI-assisted topic drafting, human copy refinement, and custom visual graphic design."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Scheduling & Publishing",
            "description": "Pre-approval workflows, multi-channel scheduling, and automated delivery across LinkedIn, Facebook, and Instagram."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Review & Refinement",
            "description": "Monthly engagement tracking, profile click metrics, and content strategy optimization."
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
          { name: 'Search & Automation', url: 'https://www.digixpro.in/search-automation' },
          { name: 'Social Media Management & Content Systems', url: currentUrl },
        ]}
      />
      <FAQSchema items={socialMediaManagementFaqs} />

      {/* ZONE 1: HERO & TOC SECTION */}
      <section className="bg-white dark:bg-[#0A0A0A] pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/search-automation"
            className="inline-flex items-center text-xs font-plex-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Search &amp; Automation Hub
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
                Social Media Management &amp; Content Systems
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Social media management &amp; content systems establish a recurring publishing engine for growing businesses. Operating as a structured social media management company, this service replaces sporadic posting with automated content calendars, platform-native formatting, editorial human review, and consistent multi-channel distribution.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  Position your brand consistently across social channels. We operate a structured content pipeline: Strategy &rarr; Topic Research &rarr; AI-Assisted Copy &rarr; Human Review &rarr; Visual Design &rarr; Multi-Channel Publishing. As a dedicated social media management agency, we ensure your business maintains executive presence without internal team workload.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;We know our business needs consistent social media presence, but our internal team lacks time to create content.&rdquo;
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

            {/* RIGHT COLUMN: Engineering Spec Panel */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm sticky top-28">
                <div className="flex items-center justify-between gap-3 mb-5 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <span className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a]">
                    SPEC SHEET // DELIVERABLES
                  </span>
                  <span className="font-plex-mono text-[11px] text-neutral-400">CONTENT PIPELINE SCOPE</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Social Content System Deliverables
                </h3>

                <div className="space-y-4">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      EDITORIAL STRATEGY
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Monthly Topic Calendar &amp; Case Study Atomization
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      EDITORIAL DISCIPLINE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      AI-Assisted Drafting + Mandatory Human Review
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      VISUAL ASSETS
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Custom Branded Graphics, Carousels &amp; Social Cards
                    </div>
                  </div>

                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Distribution Channels</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">LinkedIn, Facebook, Instagram</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Approval Workflow</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Pre-Publishing Review Gate</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Reporting Cadence</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Monthly Engagement Analytics</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-plex-mono text-[11px] text-neutral-500">Need content pipeline advice?</span>
                  <Link href="/audit" className="text-xs font-bold text-[#16a34a] hover:underline flex items-center">
                    Request Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE OF CONTENTS BLOCK */}
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
        {/* SECTION 1 (H2) — LEDGER ROWS RIGHT COLUMN */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — definition
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Left Column: Heading & Body */}
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <h2 id="what-is-social-media-management-content-systems" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
                What Is Social Media Management &amp; Content Systems?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Businesses struggle to maintain consistent social media presence when daily operations displace content creation. As an established social media management agency, DigiXPro builds structured content pipelines that turn raw company expertise into scheduled, platform-native posts across LinkedIn, Facebook, and Instagram without consuming internal team bandwidth.
              </p>
              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Operating as a specialized social media management company, our approach replaces last-minute scrambling with a disciplined recurring calendar. From initial topic research and AI-assisted drafting to graphic design and mandatory human review, our social media marketing services ensure every published asset reinforces brand authority and drives organic engagement.
              </p>
            </div>

            {/* Right Column: Ledger-Style Feature Rows */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">01</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Recurring Content Calendar</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Structured monthly topic research mapping industry themes, case study breakdowns, and high-intent buyer calls-to-action.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">02</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Per-Platform Native Adaptation</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Re-formatting core insights into platform-native formats: LinkedIn carousels, text posts, quote cards, and Meta graphics.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-3xl font-bold text-neutral-300 dark:text-neutral-700 w-12 shrink-0">03</span>
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">Consistent Publishing Cadence</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Disciplined multi-channel publishing schedules managed through automated workflows with human pre-publishing approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 (H2) — EDITORIAL 3-COLUMN LAYOUT */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              02 — audience
            </div>
            <h2 id="who-needs-social-media-management-content-systems" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Who Needs Social Media Management &amp; Content Systems
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our structured content pipeline services are engineered specifically for growing organizations that require steady social media visibility without draining internal leadership time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Inconsistent Social Presence
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Businesses posting sporadically or going silent for weeks despite having an established audience, causing brand decay and lost touchpoints.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                No Content Engine
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Companies needing a repeatable content engine instead of scrambling for post ideas every week or interrupting executives for last-minute inputs.
              </p>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <h3 className="text-base font-bold text-black dark:text-white mb-3 font-plex-sans">
                Multi-Channel Complexity
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Brands managing multiple social channels (LinkedIn, Facebook, Instagram) without a unified social media management for small business framework.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ZONE 3: PROCESS & INCLUSIONS (SECTION 3 & SECTION 4) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        {/* SECTION 3 (H2) — PROCESS STEPS WITH NUMBERED NODES */}
        <div className="mb-20">
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              03 — process
            </div>
            <h2 id="digixpros-social-media-content-process" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              DigiXPro&apos;s Social Media Content Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A systematic 4-step content pipeline transforming core business insights into multi-channel social assets.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Content Strategy &amp; Calendar
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Recurring content occasions, industry themes, and conversion goals planned and finalized upfront, eliminating day-to-day guesswork.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Platform-Native Adaptation
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                One core idea adapted specifically for each platform&apos;s format and audience—carousels for LinkedIn, visual posts for Meta—never copy-pasted.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Approval &amp; Scheduling
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Content draft and custom graphic assets reviewed and approved before anything goes live, then scheduled reliably across channels.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-plex-mono font-bold text-sm text-[#16a34a] mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Publishing &amp; Review
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Automated publishing executed reliably while engagement analytics are evaluated monthly to continuously refine future content cycles.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 (H2) — WHAT'S INCLUDED (2x2 HAIRLINE MATRIX) */}
        <div>
          <div className="max-w-[760px] mx-auto text-left mb-12">
            <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              04 — deliverables
            </div>
            <h2 id="whats-included-in-social-media-management" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
              What&apos;s Included in Social Media Management
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Comprehensive social media content creation services designed to maintain authority across all active brand channels.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                STRATEGY &amp; CALENDAR // 01
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Calendar className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Content Strategy &amp; Calendar
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Monthly topic research &amp; editorial theme mapping</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Case study highlights &amp; service CTA integration</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Transparent social media management pricing structures (view <Link href="/pricing" className="text-[#16a34a] hover:underline font-semibold">Pricing</Link>)</li>
              </ul>
            </div>

            <div className="p-8">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                CREATIVE CREATION // 02
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Sparkles className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Platform-Native Content Creation
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> AI-assisted drafting &amp; human editorial refinement</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Custom graphic design, carousel decks &amp; social cards</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Professional copy aligned with corporate brand voice</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                PUBLISHING WORKFLOW // 03
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Clock className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Scheduling &amp; Publishing
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Executive pre-publishing review &amp; approval gate</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Multi-channel automated scheduling &amp; publishing</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Platform-optimal posting times &amp; hashtag strategy</li>
              </ul>
            </div>

            <div className="p-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                ANALYTICS &amp; REFINEMENT // 04
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center font-plex-sans">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2.5 shrink-0" /> Performance Review &amp; Refinement
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Monthly profile impression &amp; engagement metrics</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Top-performing content format evaluation</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 mt-0.5 shrink-0" /> Continuous editorial refinement for future cycles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 4: COMPARISON TABLE (SECTION 5) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto text-left mb-12">
          <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            05 — decision
          </div>
          <h2 id="in-house-vs-freelancer-vs-managed-content-system" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
            In-House vs Freelancer vs Managed Content System
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            Evaluating the operational differences, output consistency, and resource demands across different social content models.
          </p>
          <p className="text-xs font-plex-mono text-[#16a34a] font-semibold uppercase tracking-wider">
            Determine publishing architecture by weighing internal bandwidth against cross-channel content frequency requirements.
          </p>
        </div>

        <div className="overflow-x-auto max-w-[1200px] mx-auto">
          <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/80 font-plex-mono text-xs text-neutral-500">
                <th className="p-4 font-bold uppercase tracking-wider w-1/4">Evaluation Metric</th>
                <th className="p-4 font-bold uppercase tracking-wider w-1/4">In-House Staff</th>
                <th className="p-4 font-bold uppercase tracking-wider w-1/4">Freelancer</th>
                <th className="p-4 font-bold uppercase tracking-wider text-[#16a34a] bg-emerald-50/50 dark:bg-emerald-950/40 border-l-2 border-[#16a34a] w-1/4">
                  Managed System (DigiXPro)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Consistency</td>
                <td className="p-4">Dependent on internal workload and priorities</td>
                <td className="p-4">Variable, subject to freelancer capacity</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Disciplined, guaranteed monthly calendar
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Platform-specific quality</td>
                <td className="p-4">Limited by single individual skill set</td>
                <td className="p-4">Varies widely based on specific experience</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  High; copy, visual, and format specialists
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Time cost internally</td>
                <td className="p-4">High ongoing management and supervision</td>
                <td className="p-4">Moderate overhead for direction and fixes</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Minimal; 1–2 hours monthly for approvals
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Content planning</td>
                <td className="p-4">Often reactive, day-to-day drafting</td>
                <td className="p-4">Ad-hoc post creation without strategy</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Structured 30-day advance editorial pipeline
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black dark:text-white font-plex-sans">Best for</td>
                <td className="p-4">Large enterprises with full marketing departments</td>
                <td className="p-4">One-off campaigns or simple graphic needs</td>
                <td className="p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border-l-2 border-[#16a34a] font-medium text-neutral-900 dark:text-neutral-100">
                  Growing businesses needing consistent authority
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ZONE 5: EVIDENCE (SECTION 6) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto text-center mb-12">
          <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            06 — proof
          </div>
          <h2 id="evidence-social-media-content-systems-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
            Evidence: Social Media Content Systems in Action
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We operate the exact content system architecture we deliver to our clients. Inspect real-world evidence of structured multi-channel publishing and editorial workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-10 text-left">
          {/* Case File 1: DigiXPro Internal Content System */}
          <div>
            <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
              CASE FILE 01 // PRODUCTION SYSTEM EVIDENCE
            </div>
            <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
              <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                DigiXPro Content System
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Production evidence: DigiXPro&apos;s internal social content pipeline executing monthly topic research, AI-assisted drafting, mandatory human editorial approval, custom visual design, and scheduled multi-channel publishing.
              </p>
              <Link 
                href="/evidence/digixpro" 
                className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
              >
                View case study &rarr;
              </Link>
            </div>
          </div>

          {/* Case File 2: Multi-Channel Client Deployment */}
          <div>
            <div className="inline-block bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-plex-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider rounded-t-xl">
              CASE FILE 02 // MULTI-CHANNEL DEPLOYMENT
            </div>
            <div className="p-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-3xl rounded-tr-3xl shadow-sm">
              <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-plex-sans">
                Multi-Channel Content System
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Client content system deployment: Multi-channel editorial calendar mapping, platform-native adaptation for LinkedIn and Instagram, graphic asset creation, and direct approval workflows driving consistent brand visibility.
              </p>
              <Link 
                href="/evidence" 
                className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center"
              >
                View evidence &rarr;
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

      {/* ZONE 6: LOCATION (SECTION 7) */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mb-3">
          <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            07 — coverage
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Left Column: Heading & Body */}
          <div className="lg:col-span-7 mb-10 lg:mb-0">
            <h2 id="where-digixpro-delivers-social-media-management" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24 font-plex-sans">
              Where DigiXPro Delivers Social Media Management
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              DigiXPro operates as an established social media management agency in Delhi, serving growing enterprises across Delhi NCR including social media marketing services in Noida, Gurgaon, Ghaziabad, and Faridabad.
            </p>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              In addition to regional clients across India, our structured social media content systems power brand authority for international service companies in the USA, UK, Australia, and Singapore.
            </p>
          </div>

          {/* Right Column: Spec Panel with SERVED_CITIES & GLOBAL_TARGET_MARKETS */}
          <div className="lg:col-span-5">
            <div className="p-7 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm">
              <div className="font-plex-mono text-[11px] font-bold uppercase tracking-widest text-[#16a34a] mb-3">
                GEOGRAPHIC COVERAGE // MARKETS
              </div>
              <h3 className="text-base font-bold text-black dark:text-white mb-4 font-plex-sans">
                Served Markets &amp; Target Regions
              </h3>
              
              <div className="space-y-4 text-xs font-plex-mono">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border-l-4 border-[#16a34a]">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">REGIONAL MARKETS</div>
                  <div className="text-neutral-800 dark:text-neutral-200 font-semibold">{SERVED_CITIES}</div>
                </div>

                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border-l-4 border-[#16a34a]">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">GLOBAL MARKETS</div>
                  <div className="text-neutral-800 dark:text-neutral-200 font-semibold">{GLOBAL_TARGET_MARKETS}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 7: FAQS (SECTION 8) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto text-left mb-12">
          <div className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            08 — questions
          </div>
          <h2 id="frequently-asked-questions" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24 font-plex-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Clear answers regarding social media management, content pipelines, pricing structures, and editorial execution.
          </p>
        </div>

        <div className="max-w-[840px] mx-auto space-y-4">
          {socialMediaManagementFaqs.map((faq, idx) => {
            const isOpen = !!openFaqs[idx];
            return (
              <div 
                key={idx}
                className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/50 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-black dark:text-white hover:text-[#16a34a] dark:hover:text-[#16a34a] transition-colors font-plex-sans text-base"
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isOpen ? 'transform rotate-180 text-[#16a34a]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60 font-sans">
                    {renderTextWithLinks(faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ZONE 8: FINAL CTA */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
          <span className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
            COMMERCIAL DISCOVERY
          </span>
          <h2 className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight font-plex-sans">
            Ready to establish a consistent, authoritative social media presence?
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Book an architecture discovery session to discuss your content bottlenecks, target audience channels, and social media management requirements.
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
