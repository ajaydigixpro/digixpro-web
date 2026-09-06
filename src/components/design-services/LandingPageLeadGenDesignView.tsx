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
  Layout, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Target, 
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

export const landingPageLeadGenFaqs = [
  {
    question: "How much does landing page design cost?",
    answer: "Landing page design services at DigiXPro are offered as transparent milestone-based projects or campaign sprints. Total investment depends on copy scope, form complexity, and webhook integrations. View our [landing page design pricing](/pricing) for detailed tier breakdowns."
  },
  {
    question: "How long does it take to build a landing page?",
    answer: "A dedicated landing page design project typically takes 1 to 2 weeks from initial conversion goal definition to production launch. Simple campaign pages with standard form integrations can be deployed in as little as 5 to 7 business days."
  },
  {
    question: "What factors affect landing page development cost?",
    answer: "Landing page development cost is driven by design customization, copywriting requirements, custom interactive components, and lead routing complexity. Integrating multi-step lead qualification forms, custom API webhooks, or CRM database sync adds engineering scope compared to basic single-step forms."
  },
  {
    question: "How is a landing page's conversion rate measured and improved?",
    answer: "A landing page's conversion rate is measured by calculating the percentage of unique campaign visitors who complete the primary lead form or call booking action. It is improved through A/B testing headlines, streamlining form fields, accelerating mobile load speed, and reinforcing trust signals."
  },
  {
    question: "How is a lead-capture form designed into a landing page?",
    answer: "A lead-capture form is designed into a landing page by placing it above or near the fold with prominent visual hierarchy. Form fields are limited to essential qualifier questions to minimize friction, backed by instant field validation, clear error messages, and sub-second webhook dispatch."
  },
  {
    question: "Should a landing page be built on WordPress or custom code?",
    answer: "For paid ad campaigns where sub-second speed and conversion rates matter most, custom code using Next.js or React outperforms WordPress. Decoupled custom landing pages eliminate heavy plugin bloat, prevent security vulnerabilities, and load significantly faster on mobile networks."
  },
  {
    question: "Does landing page design need to be different for mobile traffic?",
    answer: "Yes, over 60% of paid ad campaign traffic arrives via mobile devices. Mobile landing page design requires sticky CTA buttons, simplified form inputs, thumb-friendly tap targets, and sub-second Core Web Vitals page load speed to prevent mobile bounce rate."
  },
  {
    question: "What makes a PPC campaign landing page different from a regular page?",
    answer: "A PPC campaign landing page is engineered specifically to match the intent of a paid search or social ad keyword. Unlike a regular website page with navigation links and multiple topics, a PPC landing page removes all external menu links to keep visitor focus 100% on the single conversion goal."
  }
];

export default function LandingPageLeadGenDesignView() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const tocSections = [
    { id: 'what-is-landing-page-lead-generation-design', text: 'What Is Landing Page & Lead Generation Design?' },
    { id: 'who-needs-a-dedicated-landing-page', text: 'Who Needs a Dedicated Landing Page' },
    { id: 'digixpros-landing-page-design-process', text: "DigiXPro's Landing Page Design Process" },
    { id: 'whats-included-in-landing-page-design', text: "What's Included in Landing Page Design" },
    { id: 'landing-page-vs-full-website-vs-homepage-section', text: 'Landing Page vs Full Website vs Homepage Section' },
    { id: 'evidence-landing-page-design-in-action', text: 'Evidence: Landing Page Design in Action' },
    { id: 'where-digixpro-delivers-landing-page-design', text: 'Where DigiXPro Delivers Landing Page Design' },
    { id: 'frequently-asked-questions-about-landing-page-design', text: 'Frequently Asked Questions About Landing Page Design' },
  ];

  const currentUrl = 'https://www.digixpro.in/design-services/landing-page-lead-generation';

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Landing Page & Lead Generation Design Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Landing Page Design & Conversion Rate Optimization",
    "description": "High-converting landing page design and lead generation architecture. Engineered for paid ad campaigns (Google Ads, Meta, LinkedIn) with zero navigation leaks, sub-second speed, and direct CRM webhooks.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Landing Page Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Campaign-Specific UI/UX Design",
            "description": "Custom high-conversion layout matching ad creative scent, distraction-free reading flow, and responsive mobile optimization."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Friction-Free Form & Lead Flow",
            "description": "Single and multi-step lead capture forms, instant field validation, and dynamic UTM parameter pass-through."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sub-Second Loading Performance",
            "description": "Static generation, pre-compressed assets, zero bloated script trackers, ensuring maximum Google Ads Quality Score."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Real-Time CRM & Webhook Sync",
            "description": "Instant dispatch to Notion, HubSpot, WhatsApp, and email with zero lead dropoff or manual export requirements."
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
          { name: 'Design & Web Engineering', url: 'https://www.digixpro.in/design-services' },
          { name: 'Landing Page & Lead Generation Design', url: currentUrl },
        ]}
      />
      <FAQSchema items={landingPageLeadGenFaqs} />

      {/* ZONE 1: HERO & TOC SECTION (CANONICAL PAGE 1 LAYOUT STRUCTURE) */}
      <section className="bg-white dark:bg-[#0A0A0A] pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/design-services"
            className="inline-flex items-center text-xs font-plex-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Design &amp; Web Engineering Hub
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
                Landing Page &amp; Lead Generation Design Services
              </h1>

              {/* GEO QUICK SUMMARY / TL;DR BLOCK */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
                <div className="text-[11px] font-plex-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  QUICK SUMMARY / TL;DR
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  Conversion-focused landing page design creates dedicated, single-offer web experiences engineered specifically to turn paid traffic into qualified sales inquiries. Unlike full corporate website builds or backend CRM automation, a dedicated landing page design service eliminates navigational distractions, optimizes mobile page speed, and incorporates built-in lead capture forms designed for high-intent conversion.
                </p>
              </div>

              {/* DEFINITION & SITUATION */}
              <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
                <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  A dedicated landing page is a purpose-built, single-page web asset designed around one specific conversion action—such as submitting an audit request, scheduling a demo, or downloading a resource. Professional landing page design eliminates competing navigation links and delivers sub-second mobile page load speed so campaign traffic converts into measurable business leads.
                </p>
                <div className="text-xs font-plex-mono font-semibold text-[#16a34a]">
                  Buyer Situation: &ldquo;We are spending money on paid ad campaigns, but landing visitors on our main website homepage yields low conversion rates.&rdquo;
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
                  <span className="font-plex-mono text-[11px] text-neutral-400">CANONICAL #10</span>
                </div>
                
                <h3 className="text-base font-bold text-black dark:text-white mb-5 font-plex-sans">
                  Landing Page Design Deliverables
                </h3>

                <div className="space-y-4">
                  {/* Visually Primary Rows */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      COMMERCIAL MODEL
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Fixed Scope or Campaign Sprints
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      PAGE TYPE
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      Single-Purpose Campaign Landing Page
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border-l-4 border-[#16a34a]">
                    <div className="font-plex-mono text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">
                      CONVERSION TARGET
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      High-Intent Form Submission &amp; Call Booking
                    </div>
                  </div>

                  {/* Visually Secondary / Muted Rows */}
                  <div className="pt-2 space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Build Architecture</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Decoupled Next.js / Static Engine</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Form Integration</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Direct API Webhooks (n8n, CRM)</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 py-1">
                      <span className="font-plex-mono text-[11px] text-neutral-500">Speed &amp; Mobile</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">Sub-Second Mobile Core Web Vitals</span>
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
      <section id="what-is-landing-page-lead-generation-design" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
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
                What Is Landing Page &amp; Lead Generation Design?
              </h2>
              <div className="space-y-4 text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Landing page design is the engineering of a single, standalone web page built specifically to convert traffic from a targeted campaign into qualified business leads. Unlike a full corporate website designed for broad exploration, professional landing page design services remove top navigation bars, footer link clusters, and competing calls-to-action to keep 100% of visitor attention focused on a single conversion objective.
                </p>
                <p>
                  High-converting landing page design combines direct-response copywriting, mobile-first responsive layouts, fast page rendering, and conversion-focused form UX. Whether capturing paid search ad traffic, social media campaign leads, or promotional email traffic, a dedicated landing page provides a friction-free pathway from initial click to lead submission.
                </p>
                <p>
                  As an experienced landing page design company, DigiXPro builds custom landing pages using clean Next.js/React code structure, ensuring sub-second Core Web Vitals speed and seamless webhook form integration with your existing CRM and sales infrastructure.
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
                      Single Conversion Goal Focus
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Removing navigation menus and external links to guide 100% of visitor focus toward one conversion action.
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Fast-Loading, Distraction-Free Layout
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Engineering sub-second mobile page load speed so campaign traffic converts immediately without drop-off.
                    </p>
                  </div>
                </div>

                <div className="pb-2 flex items-start">
                  <span className="font-plex-mono text-3xl font-extrabold text-neutral-300 dark:text-neutral-700 mr-5 shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white mb-1 font-plex-sans">
                      Built-In Lead-Capture Form Design
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Designing conversion-focused form fields with clear error handling and instant webhook dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TARGET FIT & AUDIENCE (EDITORIAL 3-COLUMN) */}
      <section id="who-needs-a-dedicated-landing-page" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                02 — audience
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Campaign Profiles Requiring Dedicated Landing Page Engineering
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Dedicated landing pages are essential whenever advertising spend, promotional offers, or campaign traffic require a single focused conversion goal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                01 // PPC &amp; PAID ADVERTISERS
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Businesses Running Paid Ad Campaigns
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Companies spending capital on Google Ads, LinkedIn Ads, or Meta Ads that require a specialized landing page agency to convert high-intent ad clicks into qualified leads.
              </p>
              <div className="text-[11px] font-plex-mono text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Key Trigger: Low conversion rates when directing paid campaign traffic to a general homepage.
              </div>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                02 // SPECIALIZED OFFER LAUNCHES
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Companies Launching Webinars, Audits, or Lead Magnets
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Organizations promoting a specific service audit, downloadable whitepaper, or event that needs a purpose-built conversion page separate from main site navigation.
              </p>
              <div className="text-[11px] font-plex-mono text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Key Trigger: Launching a time-sensitive or offer-specific marketing campaign.
              </div>
            </div>

            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-6">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                03 // HIGH-FRICTION HOMEPAGES
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-plex-sans">
                Teams Whose Main Website Tries to Do Too Much
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Brands experiencing low conversion rates because campaign traffic lands on multi-purpose homepages containing competing links and generic copy. Hiring a skilled landing page designer isolates campaign intent.
              </p>
              <div className="text-[11px] font-plex-mono text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                Key Trigger: Visitors bouncing from complex homepages before finding the primary call-to-action.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROCESS & METHODOLOGY (4-STEP NUMBERS ONLY) */}
      <section id="digixpros-landing-page-design-process" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                03 — methodology
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              DigiXPro&apos;s Landing Page Design Process
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A structured 4-step engineering sequence for creating high-converting, mobile-fast landing pages aligned with your campaign goals.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                01
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Goal &amp; Audience Definition
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Defining the single conversion action this landing page must drive before any layout design or code engineering begins.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                02
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Copy &amp; Structure Design
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Crafting direct value headlines, trust elements, and form placement arranged specifically around that single conversion target.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                03
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Build &amp; Form Integration
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Engineering a mobile-first, sub-second Next.js page with lead-capture forms directly wired to API webhooks and CRM routing.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative shadow-sm">
              <span className="font-plex-mono text-4xl font-extrabold text-[#16a34a]/30 block mb-4">
                04
              </span>
              <h3 className="text-base font-bold text-black dark:text-white mb-2 font-plex-sans">
                Launch &amp; Performance Readiness
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Deploying the page to production ready to receive campaign traffic, with analytical event tracking configured from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INCLUDED MATRIX (2x2 HAIRLINE MATRIX) */}
      <section id="whats-included-in-landing-page-design" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                04 — scope
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              What&apos;s Included in Landing Page Design
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Complete technical and UX deliverables included in DigiXPro&apos;s landing page design services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                01 // COPY &amp; LAYOUT DESIGN
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Conversion-Focused Copywriting &amp; Wireframes
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Conversion-focused headline, value proposition, and section hierarchy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Strategic placement of trust badges, client logos, and testimonial blocks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Clear visual cues directing eye flow toward primary lead forms</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                02 // MOBILE-FIRST BUILD
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Sub-Second Code Engineering
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Sub-second mobile page load performance for instant campaign entry</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Clean, decoupled Next.js or React code free of heavy CMS plugin bloat</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Full dark mode support and responsive layout alignment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                03 // LEAD-CAPTURE FORM DESIGN
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Form UX &amp; Webhook Routing
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Custom form UX with real-time field validation and inline error states</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Direct webhook plumbing connecting form entries to n8n and CRM systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Automated confirmation messaging and redirect workflow setup</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                04 // CAMPAIGN-READY TRACKING SETUP
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-plex-sans">
                Analytics &amp; Scope Transparency
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Conversion event tracking configuration for ad platforms and analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Clean URL parameters structure for UTM campaign tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                  <span>Transparent [landing page design cost](/pricing) tiers and milestone scope options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON TABLE (FULL-WIDTH SPEC TABLE) */}
      <section id="landing-page-vs-full-website-vs-homepage-section" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                05 — comparison
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Landing Page vs Full Website vs Homepage Section
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Select your landing page framework according to campaign specificity and conversion funnel depth.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-neutral-200 dark:border-neutral-800 text-xs">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-900 font-plex-mono border-b border-neutral-200 dark:border-neutral-800">
                  <th className="p-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/5">CRITERIA</th>
                  <th className="p-4 font-bold text-[#16a34a] bg-emerald-50/60 dark:bg-emerald-950/40 w-1/3 border-x border-emerald-200 dark:border-emerald-800">
                    DEDICATED LANDING PAGE
                  </th>
                  <th className="p-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/4">FULL WEBSITE</th>
                  <th className="p-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/4">HOMEPAGE SECTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-sans">
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Primary Focus</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Single campaign goal or lead capture action
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Complete brand authority &amp; multi-service catalog</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Broad company introduction &amp; navigational portal</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Build Speed</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Rapid 1-2 week sprint deployment
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Multi-week architectural engineering scope</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Integrated during initial website build</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Best For</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Paid PPC campaigns, ad traffic, specific offers
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Organic search authority, company presence, deep SEO</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">General organic visitors exploring company overview</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Conversion Clarity</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Maximum conversion focus (zero menu distractions)
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Balanced across multiple buyer journeys and navigation</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">General directional prompts to inner site pages</td>
                </tr>
                <tr>
                  <td className="p-4 font-plex-mono font-bold text-neutral-500">Ownership Fit</td>
                  <td className="p-4 text-neutral-900 dark:text-neutral-100 font-bold bg-emerald-50/30 dark:bg-emerald-950/20 border-x border-emerald-200/60 dark:border-emerald-800/60">
                    Ideal for marketing teams running active paid campaigns
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Essential for core B2B corporate digital footprint</td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">Standard component of main corporate homepage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROOF & CASE STUDIES (HONEST SELF-EXAMPLE CARD) */}
      <section id="evidence-landing-page-design-in-action" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                06 — evidence
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Evidence: Landing Page Design in Action
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspecting DigiXPro&apos;s own high-intent lead-capture page engineering as an honest self-example.
            </p>
          </div>

          <div className="max-w-3xl">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider">
                  LIVE LEAD CAPTURE PAGE // DIGIXPRO AUDIT INTAKE
                </span>
                <span className="font-plex-mono text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-[#16a34a] px-2.5 py-1 rounded font-bold">
                  VERIFIED CAPABILITY
                </span>
              </div>

              <h3 className="text-xl font-bold text-black dark:text-white mb-3 font-plex-sans">
                DigiXPro Technical Architecture Audit Intake Page
              </h3>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Engineering a single-purpose, high-intent lead capture page for DigiXPro&apos;s own technical audit requests, built with sub-second mobile load speed, clean form UX, and instant n8n webhook dispatch.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-plex-mono border-t border-neutral-100 dark:border-neutral-800 pt-5">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <div className="text-neutral-400 uppercase text-[10px] mb-1">CONVERSION FOCUS</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">Single-Goal Audit Intake Form UX</div>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <div className="text-neutral-400 uppercase text-[10px] mb-1">DATA DISPATCH</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">Sub-Second API Webhook Routing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LOCATION & DELIVERY (UNIFIED PANEL, NO FAKE TIERS) */}
      <section id="where-digixpro-delivers-landing-page-design" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-7 mb-10 lg:mb-0">
              <div className="mb-3">
                <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                  07 — delivery
                </span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-6 font-plex-sans">
                Where DigiXPro Delivers Landing Page Design
              </h2>
              <p className="text-[16px] md:text-[18px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                DigiXPro delivers landing page design services and lead generation design globally, with core web engineering teams based in Noida, Delhi NCR, India.
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

      {/* SECTION 8: FAQ (8 CONFIRMED DATA-BACKED QUESTIONS) */}
      <section id="frequently-asked-questions-about-landing-page-design" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="mb-3">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-widest">
                08 — faq
              </span>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-black dark:text-white leading-tight mb-4 font-plex-sans">
              Frequently Asked Questions About Landing Page Design
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Technical and commercial answers regarding landing page development, form integration, and campaign conversion performance.
            </p>
          </div>

          <div className="max-w-3xl space-y-4">
            {landingPageLeadGenFaqs.map((faq, index) => (
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
