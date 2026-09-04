import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { 
  ArrowRight, 
  Globe, 
  RefreshCw, 
  Briefcase, 
  Zap, 
  Network, 
  Search, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Code2, 
  Database, 
  Users, 
  UserCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Custom Website Design Services & High-Speed Engineering',
  description: "Custom web design and engineering services. We build high-speed Next.js websites optimized for search visibility, conversion performance, and authority.",
  keywords: [
    'custom website design',
    'business website design',
    'website design services',
    'custom web development',
    'small business website design',
    'website redesign',
    'website redesign service',
    'small business website redesign',
    'website redesign SEO',
    'SEO website redesign',
    'landing page design',
    'landing page design service',
    'website conversion optimization',
    'website conversion optimization services',
    'website design SEO',
    'SEO website design',
    'SEO-friendly website design'
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/design-services',
  },
  openGraph: {
    title: 'Custom Website Design Services & High-Speed Engineering | DigiXPro',
    description: "Custom web design and engineering services. We build high-speed Next.js websites optimized for search visibility, conversion performance, and authority.",
    url: 'https://www.digixpro.in/design-services',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Website Design & Web Engineering Services',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Website Design Services & High-Speed Engineering | DigiXPro',
    description: "Custom web design and engineering services. We build high-speed Next.js websites optimized for search visibility, conversion performance, and authority.",
    images: ['/twitter-image.png'],
  },
};

export default function DesignServicesPage() {
  const faqItems = [
    {
      question: "Do I need a custom website, or can a template work for my business?",
      answer: "Templates often come bloated with unused scripts, slow load speeds, and rigid design structures that limit conversion and technical SEO. A custom web application engineered in Next.js and React provides fast rendering, 100% Core Web Vitals performance, immune security, and complete flexibility to model your exact business operating workflows and lead capture pathways."
    },
    {
      question: "Will redesigning my website hurt my existing Google search rankings?",
      answer: "Not if technical SEO is built into the redesign architecture. We perform detailed URL mapping, implement 301 redirects, preserve canonical integrity, and maintain semantic HTML5 structure during the rebuild. This prevents keyword drops and ensures your new website launches with clean indexability and improved search performance."
    },
    {
      question: "What should a service business website include to generate qualified enquiries?",
      answer: "A high-converting service business website requires clear message-to-market positioning, prominent call-to-actions, transparent delivery blueprints, proof of execution, friction-free lead capture forms, and direct webhook routing into your CRM or team communications."
    },
    {
      question: "Do I need a complete website redesign, or just a landing page for my offer?",
      answer: "If your goal is testing a specific marketing campaign, paid offer, or service launch, a dedicated landing page designed around visitor intent and direct conversion is ideal. If your broader business website suffers from poor Core Web Vitals, confusing navigation, or outdated positioning, a comprehensive web redesign is recommended."
    },
    {
      question: "Why is my website getting visitors but not enough enquiries?",
      answer: "High traffic with low enquiries indicates a conversion architecture problem. We analyze your website's value proposition clarity, mobile user experience, visual hierarchy, form friction, and call-to-action placement to turn existing traffic into booked discovery calls."
    },
    {
      question: "Is technical SEO included during website development, or is it an extra service?",
      answer: "Technical SEO is engineered into our web applications from day one. Every website we build includes automated JSON-LD structured data schemas, canonical tagging, clean semantic HTML5 hierarchy, dynamic XML sitemaps, and optimized page speed architecture without requiring additional plugins."
    },
    {
      question: "How do custom Next.js websites connect with our existing CRM or software stack?",
      answer: "We build direct API webhooks connecting web forms with your CRM, Notion lead board, WhatsApp notifications, or n8n workflow automation pipelines. Lead data flows instantly to your team without manual copy-paste errors or reliance on fragile third-party WordPress plugins."
    },
    {
      question: "How long does a custom business website engineering project take?",
      answer: "Engagements typically span 3 to 8 weeks depending on component scope, content migration requirements, and custom API integration complexity. Every project follows a clear 4-phase sequence: Discovery & Diagnosis → UX Architecture → Next.js Engineering → SEO & Webhook Release."
    },
    {
      question: "Can DigiXPro work with our existing brand guidelines and design assets?",
      answer: "Yes. We ingest your existing brand guidelines, color palettes, vector logos, and design tokens, translating them into a modern, accessible TailwindCSS UI design system engineered for enterprise brand authority."
    },
    {
      question: "How do we get started with a website design or redesign project?",
      answer: "The first step is a 30-minute architecture call. We discuss your current website bottlenecks, business goals, search visibility requirements, and conversion targets to determine whether custom development, an SEO-safe redesign, or landing page optimization is the right strategic fit."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Website Design & Engineering', url: 'https://www.digixpro.in/design-services' },
        ]}
      />
      <FAQSchema items={faqItems} />

      {/* ==========================================
          SECTION 1 — HERO (COMMERCIAL ACQUISITION HUB)
      ========================================== */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
              ACQUISITION ARCHITECTURE &bull; WEB ENGINEERING &bull; CONVERSION UX
            </span>
          </div>
          
          <h1 className="hero-lcp-heading text-[42px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8 text-black dark:text-white">
            Website Design &amp; Web Engineering Services.
          </h1>
          
          <div className="border-l-4 border-[#16a34a] pl-4 md:pl-6 mb-8 md:mb-10">
            <p className="text-[18px] md:text-[22px] font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed mb-3">
              We design and build high-performance business websites, redesign legacy web applications, and engineer conversion pathways that drive search visibility and qualified B2B lead generation.
            </p>
            <p className="text-[15px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
              From custom Next.js engineering and SEO-safe rebuilds to landing page conversion architecture, every line of code is structured around your operational reality and business growth targets.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] md:text-[16px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
            >
              Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a 
              href="#commercial-services" 
              className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] md:text-[15px] rounded-xl hover:border-black dark:hover:border-white transition-colors min-h-[52px]"
            >
              Explore 6 Commercial Services
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 — SITUATION RECOGNITION (OPERATING REALITY CHECK)
      ========================================== */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              Operating Reality Check
            </div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
              What Website Situation Fits Your Business?
            </h2>
            <p className="text-[17px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every website initiative starts from a specific business reality. Identify your current situation below to select the right engineering approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                situation: "I need a new business website.",
                desc: "Launching a new business or enterprise entity requiring a modern, high-performance web platform built from scratch.",
                icon: <Globe className="w-5 h-5 text-[#16a34a]" />
              },
              {
                situation: "I already have a website, but it isn't working properly.",
                desc: "Suffering from slow load speeds, legacy CMS bloat, poor mobile responsiveness, or weak Core Web Vitals metrics.",
                icon: <RefreshCw className="w-5 h-5 text-[#16a34a]" />
              },
              {
                situation: "I need a website designed around how my business actually gets enquiries.",
                desc: "Service enterprise requiring clear service packaging, lead capture UX, and search indexability for target markets.",
                icon: <Briefcase className="w-5 h-5 text-[#16a34a]" />
              },
              {
                situation: "I need a specific offer or campaign to generate enquiries.",
                desc: "Launching a paid media campaign or promotional offer requiring a dedicated, high-converting landing page.",
                icon: <Zap className="w-5 h-5 text-[#16a34a]" />
              },
              {
                situation: "My website gets visitors, but it doesn't generate enough enquiries.",
                desc: "Experiencing high traffic bounce rates, unclear message hierarchy, or friction points in your online lead forms.",
                icon: <MessageSquare className="w-5 h-5 text-[#16a34a]" />
              },
              {
                situation: "I need a website that doesn't sacrifice search visibility.",
                desc: "Requiring technical SEO architecture, canonical preservation, and structured JSON-LD schemas built directly into the codebase.",
                icon: <Search className="w-5 h-5 text-[#16a34a]" />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm hover:border-[#16a34a]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-black dark:text-white mb-1.5">{item.situation}</h3>
                  <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3 — APPROVED SIX-SERVICE COMMERCIAL ARCHITECTURE (3x2 GRID)
      ========================================== */}
      <section id="commercial-services" className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            Commercial Capability Layers
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold mb-4 leading-tight text-black dark:text-white">
            Website Design &amp; Engineering Solutions
          </h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Six specialized web engineering capabilities structured to solve your exact business situation.
          </p>
        </div>

        {/* 3-COLUMN x 2-ROW PREMIUM CARD GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARD 01 — CUSTOM BUSINESS WEBSITE DESIGN & DEVELOPMENT */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all shadow-md group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  01 &bull; NEW WEBSITE
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase">Situation 01</span>
              </div>

              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 italic mb-2">
                &ldquo;I need a new business website.&rdquo;
              </div>

              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                Custom Business Website Design &amp; Development
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Bespoke web applications built on modern Next.js and React architecture. Engineered for visual authority, fast performance, search indexability, and B2B lead capture.
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  "Custom Next.js & React Architecture",
                  "100% Core Web Vitals Performance",
                  "Built-in Technical SEO Plumbing",
                  "Lead Capture & Webhook UX"
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/design-services/custom-business-website-design" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
            >
              Plan Your Custom Website <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* CARD 02 — WEBSITE REDESIGN & SEO-SAFE REBUILD */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all shadow-md group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  02 &bull; WEBSITE REDESIGN
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase">Situation 02</span>
              </div>

              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 italic mb-2">
                &ldquo;I already have a website, but it isn&apos;t working properly.&rdquo;
              </div>

              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                Website Redesign &amp; SEO-Safe Rebuild
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Modernize legacy WordPress or CMS platforms without risking existing Google rankings. Preserves canonical integrity, fixes Core Web Vitals bottlenecks, and eliminates plugin vulnerabilities.
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  "SEO-Safe Content & Ranking Migration",
                  "Performance & Codebase Rebuild",
                  "301 Mapping & Canonical Integrity",
                  "Modern Component Stack Conversion"
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/design-services/website-redesign" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
            >
              Review Your Existing Website <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* CARD 03 — SMALL BUSINESS & SERVICE BUSINESS WEBSITES */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all shadow-md group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  03 &bull; SERVICE BUSINESS
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase">Situation 03</span>
              </div>

              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 italic mb-2">
                &ldquo;I need a website designed around how my business actually gets enquiries.&rdquo;
              </div>

              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                Small Business &amp; Service Business Websites
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Purpose-built web platforms for service enterprises. Structured around lead capture pathways, service-business UX, search visibility, and real customer acquisition.
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  "Service-Business Intent Mapping",
                  "High-Converting Enquiry Architecture",
                  "Local & Global Search Infrastructure",
                  "Direct CRM & WhatsApp Integration"
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/design-services/small-business-websites" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
            >
              Discuss Your Business Website <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* CARD 04 — LANDING PAGE & LEAD GENERATION DESIGN */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all shadow-md group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  04 &bull; LANDING PAGES
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase">Situation 04</span>
              </div>

              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 italic mb-2">
                &ldquo;I need a specific offer or campaign to generate enquiries.&rdquo;
              </div>

              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                Landing Page &amp; Lead Generation Design
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                High-converting landing pages engineered for offer clarity, visitor intent alignment, friction-free lead capture forms, and automated CRM webhook routing.
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  "Offer Clarity & Copy Strategy",
                  "Campaign Message Alignment",
                  "Friction-Free Qualification Forms",
                  "Automated n8n/CRM Webhooks"
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/design-services/landing-page-lead-generation" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
            >
              Plan Your Lead-Generation Page <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* CARD 05 — WEBSITE UX & CONVERSION OPTIMIZATION */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all shadow-md group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  05 &bull; CONVERSION OPTIMIZATION
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase">Situation 05</span>
              </div>

              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 italic mb-2">
                &ldquo;My website gets visitors, but it doesn&apos;t generate enough enquiries.&rdquo;
              </div>

              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                Website UX &amp; Conversion Optimization
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Diagnose user drop-off, eliminate conversion friction, and rebuild message hierarchy. Connects directly with your commercial pipeline to turn traffic into qualified calls.
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  "Conversion Drop-Off Diagnostics",
                  "Value Proposition & Message UX",
                  "Call-to-Action Placement Review",
                  "Lead Handoff Pathway Optimization"
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/design-services/website-conversion-optimization" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
            >
              Diagnose Conversion Problems <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* CARD 06 — SEO-READY WEBSITE ENGINEERING */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all shadow-md group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  06 &bull; SEO ENGINEERING
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase">Situation 06</span>
              </div>

              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 italic mb-2">
                &ldquo;I need a website that doesn&apos;t sacrifice search visibility.&rdquo;
              </div>

              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                SEO-Ready Website Engineering
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Technical search architecture engineered into the codebase from line one. Automated JSON-LD schemas, clean HTML5 hierarchy, and machine-readable AI search (GEO) compatibility.
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  "Built-in Technical SEO Hierarchy",
                  "Automated JSON-LD Structured Data",
                  "Semantic HTML5 Clean Markup",
                  "AI Search (GEO & LLM) Plumbing"
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/design-services/seo-ready-website-engineering" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
            >
              Plan an SEO-Ready Website <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 4 — ENGINEERING APPROACH & WORKFLOW
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            ENGINEERING PIPELINE
          </div>
          <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
            How DigiXPro Engineers Business Websites
          </h2>
          <p className="text-[17px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A structured engineering methodology connecting business diagnosis to production deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "PHASE 01",
              title: "Business & Intent Diagnosis",
              desc: "We analyze your operating reality, key services, buyer intent, and target market requirements before writing any code."
            },
            {
              step: "PHASE 02",
              title: "System & UX Architecture",
              desc: "We design component hierarchies, message flow, responsive layouts, and conversion pathways tailored to your brand."
            },
            {
              step: "PHASE 03",
              title: "Next.js Codebase Engineering",
              desc: "We write clean, decoupled React and TailwindCSS code targeting 100% Core Web Vitals and zero script bloat."
            },
            {
              step: "PHASE 04",
              title: "SEO & Webhook Release",
              desc: "We inject structured data schemas, configure 301 redirects, test API webhooks, and release to global production."
            }
          ].map((phase, idx) => (
            <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-wider block mb-2">{phase.step}</span>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{phase.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 5 — WHAT YOU RECEIVE (TANGIBLE DELIVERABLES)
      ========================================== */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              TANGIBLE OUTPUTS
            </div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
              What Your Business Receives
            </h2>
            <p className="text-[17px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Production web assets and technical systems delivered with full codebase ownership.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Custom Next.js & React Web Application", icon: <Code2 className="w-5 h-5 text-[#16a34a]" />, desc: "Clean codebase built without bloated CMS plugins." },
              { title: "TailwindCSS Accessible UI Design System", icon: <Layers className="w-5 h-5 text-[#16a34a]" />, desc: "Responsive, accessible component library." },
              { title: "Built-In Technical SEO & Schema Plumbing", icon: <Search className="w-5 h-5 text-[#16a34a]" />, desc: "Automated JSON-LD, sitemaps, and canonical tags." },
              { title: "Automated CRM & Webhook Lead Routing", icon: <Zap className="w-5 h-5 text-[#16a34a]" />, desc: "Direct n8n/API lead handoffs to email or WhatsApp." },
              { title: "100% Core Web Vitals & Instant Speed", icon: <Cpu className="w-5 h-5 text-[#16a34a]" />, desc: "Optimized LCP, CLS, and fast page load times." },
              { title: "Machine-Readable AI Search (GEO) Plumbing", icon: <Sparkles className="w-5 h-5 text-[#16a34a]" />, desc: "LLM-ready structured context for AI engines." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 hover:border-[#16a34a]/40 transition-colors shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-neutral-800 dark:text-neutral-200">{item.title}</h3>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-11">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6 — SEO & SEARCH VISIBILITY PROTECTION
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              SEARCH ARCHITECTURE
            </div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white leading-tight">
              Search Visibility Built Into Code, Not Bolted On Later
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              Traditional web agencies design first and attempt to fix SEO afterwards. DigiXPro builds search architecture directly into the web application during codebase engineering.
            </p>
            <div className="space-y-4">
              {[
                { title: "SEO-Safe Redesign & Migration", desc: "Detailed 301 mapping and canonical tag management to protect existing Google rankings and domain authority." },
                { title: "Automated JSON-LD Structured Data", desc: "Machine-readable schemas for Organization, ProfessionalService, WebSite, and FAQPage generated automatically." },
                { title: "Semantic HTML5 Code Structure", desc: "Proper h1-h6 heading hierarchy, accessible landmark roles, and clean DOM trees optimized for search crawlers." }
              ].map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white">{point.title}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 text-[#16a34a] mr-2" /> Technical SEO Blueprint
            </h3>
            <ul className="space-y-3 font-mono text-xs text-neutral-600 dark:text-neutral-300">
              <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                <span>Core Web Vitals Benchmark</span>
                <span className="text-[#16a34a] font-bold">100 / 100</span>
              </li>
              <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                <span>Structured Data Format</span>
                <span className="text-[#16a34a] font-bold">JSON-LD</span>
              </li>
              <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                <span>Canonical URL Management</span>
                <span className="text-[#16a34a] font-bold">Automated</span>
              </li>
              <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                <span>AI Search (GEO) Context</span>
                <span className="text-[#16a34a] font-bold">llms.txt + Schema</span>
              </li>
              <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                <span>Third-Party Plugin Dependency</span>
                <span className="text-[#16a34a] font-bold">0 Plugins</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7 — CONVERSION ARCHITECTURE & LEAD HANDLING
      ========================================== */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              CONVERSION PIPELINE
            </div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold mb-4 text-black dark:text-white">
              Turning Website Visitors Into Qualified Enquiries
            </h2>
            <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Design and code are optimized to guide prospective clients to a single, high-value commercial action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-xs font-mono text-[#16a34a] font-bold mb-3">01 &bull; OFFER CLARITY</div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3">Message-to-Market Alignment</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Clear value propositions that state what your business solves immediately, eliminating visitor confusion within the first 5 seconds.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-xs font-mono text-[#16a34a] font-bold mb-3">02 &bull; LOW-FRICTION FORMS</div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3">Friction-Free Qualification</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Clean, accessible inquiry forms that collect essential buyer context without overwhelming prospective clients with redundant fields.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-xs font-mono text-[#16a34a] font-bold mb-3">03 &bull; AUTOMATED ROUTING</div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3">Direct Webhook Handoff</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Inquiries pass directly through secure API webhooks into your team CRM or notification channels for immediate follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8 — PRODUCTION EVIDENCE / PROOF
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            LIVE PROOF
          </div>
          <h2 className="text-[32px] md:text-[46px] font-extrabold mb-6 text-black dark:text-white">
            We Build What We Advise
          </h2>
          <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
            The DigiXPro platform itself is built on the exact web engineering architecture we deliver for clients: decoupled Next.js static output, 100% Core Web Vitals performance, automated JSON-LD schemas, and production n8n webhook lead routing.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
            <Link href="/evidence/digixpro" className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group">
              <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">CASE STUDY &bull; SYSTEM PROOF</div>
              <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors">DigiXPro Platform Architecture &rarr;</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Decoupled Next.js static site, automated schema generation, and n8n webhook routing.</p>
            </Link>

            <Link href="/evidence/360-neck-shoulder" className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group">
              <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">CASE STUDY &bull; SERVICE HEALTHCARE</div>
              <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors">360 Neck &amp; Shoulder Diagnostic System &rarr;</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Healthcare discovery architecture, local search visibility, and structured patient enquiry flows.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9 — PINPOINT BUYER FAQS (CATEGORIZED)
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              BUYER QUESTIONS &amp; OBJECTIONS
            </div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Clear answers to common questions about custom web development, redesigns, technical SEO, and conversion architecture.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-[17px] md:text-[19px] font-bold text-black dark:text-white mb-3 flex items-start">
                  <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                  {item.question}
                </h3>
                <p className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 10 — FINAL CONVERSION CTA
      ========================================== */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
          <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
            COMMERCIAL DISCOVERY
          </span>
          <h2 className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
            Have a Business Website Problem You Need to Solve?
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you need a new custom website, an SEO-safe redesign, or conversion path optimization, let&apos;s discuss your operating reality on a 30-minute architecture call.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#16a34a] text-white font-bold text-[15px] rounded-xl hover:bg-[#15803d] transition-colors shadow-md min-h-[52px]"
            >
              Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            {/* PHASE 25 (Part 5/6 funnel gap): no canonical service page
                linked to /pricing anywhere on the site before this. */}
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
            >
              View Investment Guide
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
            >
              Explore Advisory Services
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <DeferredStickyMobileCTA />
    </div>
  );
}
