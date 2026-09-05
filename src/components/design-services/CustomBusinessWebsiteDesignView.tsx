import React from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck,
  Code2,
  Layers,
  Zap,
  Globe,
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const customBusinessWebsiteFaqs = [
  {
    question: "What is custom website design and how does it differ from template websites?",
    answer: "Custom website design is the engineering of bespoke web applications tailored directly to a company's brand identity, operational workflows, and conversion requirements rather than forcing content into pre-packaged themes. Off-the-shelf templates rely on monolithic CMS platforms like WordPress, which ship with bloated CSS, unoptimized JavaScript, unused third-party plugins, and rigid layout boundaries that restrict brand authority. In contrast, our custom business website design services build clean Next.js and React codebases optimized for 100% Core Web Vitals speed, zero plugin vulnerability risk, and complete architectural scalability. To compare detailed investment tiers for custom builds versus template migrations, review the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "What does a professional custom website development service include?",
    answer: "A professional custom website development service includes comprehensive technical discovery, accessible UI design system engineering, decoupled frontend development, automated JSON-LD structured data integration, and direct API lead capture plumbing. Rather than delivering simple graphic mocks, our engineering team constructs modular Tailwind CSS component libraries paired with server-rendered Next.js pages. We also implement custom webhook routes connecting web forms to your internal CRM, Notion boards, or automated workflow engines without relying on vulnerable third-party plugins. For a breakdown of phase deliverables and scoping options, consult the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "Custom website vs WordPress: Which architecture is right for my business?",
    answer: "Decoupled custom website architecture is right for businesses that prioritize sub-second page performance, immune security, and long-term brand authority over quick template deployment. Traditional WordPress sites suffer from plugin bloat, frequent database exploits, slow mobile rendering, and high maintenance overhead. Modern Next.js custom applications eliminate database query latency by serving pre-compiled static HTML pages and optimized React components across global CDN edge nodes. While generic WordPress setups suit basic low-traffic blogs, growing businesses require decoupled Next.js web applications to convert search visitors into qualified lead pipelines. Explore detailed feature comparisons and delivery schedules in the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "How much does a custom business website cost?",
    answer: "Custom business website development pricing depends directly on total page scope, bespoke UI component complexity, interactive workflow logic, and custom API integration requirements. Unlike low-cost template installations, custom web engineering provides a long-term digital asset engineered for conversion, zero security vulnerabilities, and sub-second page performance. Engagements are structured as fixed-scope milestones covering architecture discovery, UI design tokens, Next.js codebase construction, technical SEO integration, and webhook lead routing. To review standard engagement tiers, scoping benchmarks, and commercial payment terms, view the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "How long does a custom web development project take?",
    answer: "A custom business website engineering project typically takes 4 to 8 weeks from initial discovery to live production launch depending on technical scope and content readiness. Phase 1 (Weeks 1–2) focuses on architecture discovery, user intent mapping, and structural wireframing. Phase 2 (Weeks 3–4) establishes visual design system tokens and responsive Tailwind CSS layout components. Phase 3 (Weeks 5–7) executes decoupled Next.js codebase engineering, schema injection, and webhook API routes. Phase 4 (Week 8) conducts Core Web Vitals optimization and production release. Detailed timeline breakdowns for every development stage are detailed in the [DigiXPro Investment Guide](/pricing)."
  },
  {
    question: "Will search indexability be built into our custom business website?",
    answer: "Yes, comprehensive technical search indexability is engineered directly into the custom codebase from day one rather than treated as a post-launch add-on. Every custom Next.js website includes automated JSON-LD structured data schemas, canonical tag management, dynamic XML sitemaps, clean semantic HTML5 heading structures, and OpenGraph metadata configuration. Server-side rendering in Next.js serves pre-rendered HTML to search engine crawlers, eliminating indexing delays associated with client-side JavaScript applications. Furthermore, our performance architecture guarantees 100% Core Web Vitals scores across mobile viewports, providing an immediate ranking advantage in Google search results."
  },
  {
    question: "Can our custom Next.js website connect with our existing CRM or software stack?",
    answer: "Yes, custom Next.js web applications seamlessly connect with CRMs, Notion databases, email marketing platforms, and n8n workflow engines via direct API webhooks. Instead of relying on insecure third-party plugins that degrade page performance, we construct idempotent API webhook endpoints that transmit lead form data instantly upon submission. This eliminates manual copy-paste data entry and guarantees zero lead loss between web forms and sales pipelines. Review our [verified client evidence](/evidence) to see real-world API integration blueprints, or learn more about our [founder-led technical strategy](/founder) for enterprise software integration."
  },
  {
    question: "What is the difference between frontend visual design and codebase engineering?",
    answer: "Frontend visual design focuses on brand aesthetics, color palettes, typography hierarchy, user interface layouts, and visual asset production to create an engaging brand identity. Codebase engineering translates visual designs into production-ready software using React components, Tailwind CSS styling, optimized JavaScript assets, server-side rendering logic, and secure API endpoints. While visual design ensures your website looks professional, codebase engineering guarantees that your website loads in under one second, remains secure against cyber threats, ranks effectively on search engines, and converts visitors into leads. Unsure which fits your business? A quick [Technical Architecture Audit](/audit) clarifies this."
  },
  {
    question: "How does a custom Next.js website achieve fast mobile Core Web Vitals page speed?",
    answer: "Custom Next.js web applications achieve sub-second mobile page loads through server-side rendering, automatic code splitting, optimized image loading, and decoupled architecture. Next.js compiles static HTML at build time, eliminating backend database execution delays when users visit your site. Furthermore, React Server Components isolate heavy dependencies on the server, serving minimal JavaScript bundles to mobile browsers. This architecture eliminates layout shift, reduces interaction latency, and guarantees 100% Core Web Vitals scores across all mobile cellular networks. Unsure which fits your business? A quick [Technical Architecture Audit](/audit) clarifies this."
  },
  {
    question: "Do we get 100% source code ownership of our custom business website?",
    answer: "Yes, you retain complete 100% source code ownership, design asset IP, and repository access upon completion of your custom business website project. We deliver full production source code via GitHub repositories along with modern deployment configurations for Vercel, Cloudflare, or your preferred cloud infrastructure. There are zero mandatory monthly maintenance lock-ins, proprietary framework licensing fees, or hidden platform host restrictions. Your team retains total control to host, modify, extend, or transfer your custom web application as your business scales. Unsure which fits your business? A quick [Technical Architecture Audit](/audit) clarifies this."
  }
];

export const h2TocSections = [
  { text: "What Is Custom Business Website Design?", id: "what-is-custom-business-website-design" },
  { text: "Who Custom Website Design Services Are For", id: "who-custom-website-design-services-are-for" },
  { text: "DigiXPro's Website Design & Development Process", id: "digixpros-website-design-development-process" },
  { text: "What's Included in Custom Website Development", id: "whats-included-in-custom-website-development" },
  { text: "Custom Website vs Template vs Platform", id: "custom-website-vs-template-vs-platform" },
  { text: "Evidence: Custom Business Website Design in Action", id: "evidence-custom-business-website-design-in-action" },
  { text: "Custom Website Design Company Serving Delhi NCR", id: "custom-website-design-company-serving-delhi-ncr" },
  { text: "Frequently Asked Questions", id: "frequently-asked-questions" }
];

export default function CustomBusinessWebsiteDesignView() {
  const currentUrl = "https://www.digixpro.in/design-services/custom-business-website-design";

  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Website Design Services for Small & Growing Businesses",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": "Custom Website Design & Development",
    "description": "Bespoke custom website design services and React/Next.js codebase engineering for small business website design requirements. 100% Core Web Vitals & lead capture.",
    "url": currentUrl,
    "dateModified": "2026-09-05",
    "areaServed": ["Delhi NCR", "Delhi", "Noida", "Gurgaon", "US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Custom Website Development Scope",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design Scope",
            "description": "Accessible UI/UX design tokens, Tailwind CSS component library, responsive viewports, and enterprise visual authority."
          },
          "position": 1
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Development Scope",
            "description": "Decoupled Next.js static & server rendering, React Server Components, zero third-party plugin bloat, sub-second speed."
          },
          "position": 2
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Integrations",
            "description": "Direct API webhooks connecting lead capture forms to CRM platforms (Notion, HubSpot, WhatsApp, n8n automation)."
          },
          "position": 3
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO-Readiness",
            "description": "Automated JSON-LD structured data schemas, canonical tag management, semantic HTML5, 100% Core Web Vitals optimization."
          },
          "position": 4
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200 scroll-smooth">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaObj) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Website Design & Engineering', url: 'https://www.digixpro.in/design-services' },
          { name: 'Custom Website Design Services for Small & Growing Businesses', url: currentUrl },
        ]}
      />
      <FAQSchema items={customBusinessWebsiteFaqs} />

      {/* HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <Link 
            href="/design-services"
            className="inline-flex items-center text-xs font-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Website Design &amp; Engineering Hub
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              SERVICE 01
            </span>
            <span className="text-xs font-mono text-neutral-500 font-bold uppercase">Commercial Acquisition Layer</span>
            <span className="text-xs font-mono text-neutral-400 font-medium">Last updated: September 2026</span>
          </div>

          {/* EXACT H1 TAG (1 ONLY ON PAGE) */}
          <h1 className="hero-lcp-heading text-[38px] md:text-[58px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white">
            Custom Website Design Services for Small &amp; Growing Businesses
          </h1>

          {/* GEO QUICK SUMMARY / TL;DR BLOCK (C3) */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#16a34a] p-5 rounded-r-2xl mb-8">
            <div className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2">
              QUICK SUMMARY / TL;DR
            </div>
            <p className="text-[15px] md:text-[17px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
              Custom business website design services engineer bespoke Next.js and React web applications tailored for small and growing B2B enterprises. This service replaces slow, plugin-heavy template platforms with decoupled frontend architecture, 100% Core Web Vitals speed, automated search indexability, and direct API lead capture webhooks.
            </p>
          </div>

          {/* DEFINITION & SITUATION */}
          <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8">
            <p className="text-[17px] md:text-[20px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Custom business website design is the engineering of bespoke web applications tailored directly to a company&apos;s brand authority, operational workflows, and commercial lead capture targets. Unlike rigid pre-made templates, professional custom website design services build decoupled frontend architecture using React and Next.js, ensuring 100% Core Web Vitals page speed, immune site security, and native search indexability for small business website design requirements.
            </p>
            <div className="text-xs font-mono font-semibold text-[#16a34a]">
              Buyer Situation: &ldquo;I need a new business website engineered for speed, authority, and lead capture.&rdquo;
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
            <img 
              src="/opengraph-image.png" 
              alt="Custom website design services for small business website design showcase" 
              className="w-full h-auto object-cover max-h-[360px]"
            />
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
      </section>

      {/* SECTION 1 (H2) */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              DEFINITIVE ARCHITECTURE
            </div>
            <h2 id="what-is-custom-business-website-design" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24">
              What Is Custom Business Website Design?
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              Custom business website design represents a fundamental paradigm shift away from generic template sites toward bespoke, code-level web application engineering. Modern custom web design creates unique frontend architectures tailored specifically to your company&apos;s operational requirements, buyer journeys, and visual brand identity.
            </p>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              While legacy website builds rely on bloated monolithic CMS platforms like WordPress—which suffer from plugin vulnerability exploits, heavy database execution latencies, and rigid layout boundaries—our custom web development services utilize decoupled Next.js static site generation and server-side rendering. This guarantees sub-second page performance, immune security, automated JSON-LD search schema injection, and friction-free lead capture pipelines.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4 text-[#16a34a]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-black dark:text-white mb-2">Sub-Second Performance</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Decoupled React Server Components compile static HTML at build time for sub-second Core Web Vitals scores across mobile networks.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4 text-[#16a34a]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-black dark:text-white mb-2">Immune Security</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Zero database vulnerabilities or third-party plugin exploit vectors. Decoupled architecture protects critical enterprise web assets.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4 text-[#16a34a]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-black dark:text-white mb-2">Automated API Webhooks</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Direct API webhook integration streams form submissions instantly into your CRM, Notion, WhatsApp, or n8n workflow engines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS BLOCK (PHASE B — PLACED IMMEDIATELY AFTER SECTION 1) */}
      <section className="max-w-[1200px] mx-auto px-6 py-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          {/* Mobile Accordion Details / Summary */}
          <details className="group bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm md:hidden" open>
            <summary className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[#16a34a] cursor-pointer select-none">
              <span className="flex items-center">
                <ListFilter className="w-4 h-4 mr-2" /> On This Page — Table of Contents
              </span>
              <span className="text-neutral-400 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 grid gap-2 text-xs">
              {h2TocSections.map((sec, idx) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-[#16a34a] dark:hover:text-[#16a34a] font-medium transition-colors py-1 flex items-center"
                >
                  <span className="font-mono text-[#16a34a] mr-2">0{idx + 1}.</span> {sec.text}
                </a>
              ))}
            </div>
          </details>

          {/* Desktop Direct View */}
          <div className="hidden md:block bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center font-mono text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4">
              <ListFilter className="w-4 h-4 mr-2" /> Table of Contents — On This Page
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {h2TocSections.map((sec, idx) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-[#16a34a] dark:hover:text-[#16a34a] font-medium transition-colors p-2 rounded-lg hover:bg-white dark:hover:bg-neutral-800 flex items-center border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                >
                  <span className="font-mono font-bold text-[#16a34a] mr-2">0{idx + 1}.</span> {sec.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 (H2) */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            TARGET FIT &amp; AUDIENCE
          </div>
          <h2 id="who-custom-website-design-services-are-for" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24">
            Who Custom Website Design Services Are For
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
            Professional small business website design services are specifically engineered for ambitious, growing organizations that have outgrown rigid off-the-shelf templates and require enterprise-grade visual distinction.
          </p>

          <div className="space-y-4">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-4 shrink-0 mt-1" />
              <div>
                <h3 className="text-base font-bold text-black dark:text-white mb-1">Scaling B2B Companies &amp; Specialized Agencies</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Organizations offering complex technical services or enterprise solutions that need clear messaging, high authority signals, and structured conversion pathways.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-4 shrink-0 mt-1" />
              <div>
                <h3 className="text-base font-bold text-black dark:text-white mb-1">Businesses Escaping Monolithic WordPress Bloat</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Companies frustrated by slow mobile load speeds, frequent plugin breakage, poor security, and low Google Lighthouse performance scores.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-4 shrink-0 mt-1" />
              <div>
                <h3 className="text-base font-bold text-black dark:text-white mb-1">High-Intent Service Providers Requiring Custom Workflow Logic</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Firms that require tailored lead intake logic, dynamic pricing calculators, automated webhook routing, and multi-channel CRM integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 (H2) */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              METHODOLOGY &amp; EXECUTION
            </div>
            <h2 id="digixpros-website-design-development-process" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24">
              DigiXPro&apos;s Website Design &amp; Development Process
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-10">
              Our systematic 4-phase custom website development process combines rigorous architecture discovery with modern Next.js engineering to deliver high-converting web applications on time and within budget.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="text-xs font-mono font-bold text-[#16a34a] mb-2">PHASE 01</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">Discovery &amp; Intent Boundary Mapping</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We audit existing page analytics, identify buyer pain points, map commercial keyword intent, and establish technical architecture requirements for your custom business website build.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="text-xs font-mono font-bold text-[#16a34a] mb-2">PHASE 02</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">UX Architecture &amp; Accessible Design System</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Our UI team constructs high-fidelity wireframes, visual page layouts, typography hierarchies, and accessible Tailwind CSS design tokens engineered for mobile responsiveness.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="text-xs font-mono font-bold text-[#16a34a] mb-2">PHASE 03</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">Decoupled Next.js Codebase Engineering</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We write clean, modular Next.js and React frontend code with server components, optimized asset bundles, dynamic route parameters, and strict TypeScript type validation.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="text-xs font-mono font-bold text-[#16a34a] mb-2">PHASE 04</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">Technical SEO &amp; Webhook Release</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We inject JSON-LD structured data schemas, canonical tag rules, OpenGraph meta tags, API webhook lead routing, and conduct end-to-end Core Web Vitals performance verification before production release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 (H2) — CRITICAL: H4s ARE ONLY IN THIS SECTION */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            FULL SERVICE SCOPE
          </div>
          <h2 id="whats-included-in-custom-website-development" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24">
            What&apos;s Included in Custom Website Development
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-10">
            Every custom website development service project delivers complete, end-to-end digital capabilities designed for visual distinction, high search indexability, and automated sales pipeline handoff.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center">
                <Layers className="w-5 h-5 text-[#16a34a] mr-2" /> Design Scope
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Bespoke user interface architecture, custom Tailwind CSS styling tokens, accessible typography hierarchy, brand-aligned visual assets, interactive micro-interactions, and fully responsive multi-breakpoint device layouts.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center">
                <Code2 className="w-5 h-5 text-[#16a34a] mr-2" /> Development Scope
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Decoupled Next.js static generation and React Server Components build architecture, clean TypeScript codebase, zero third-party plugin bloat, sub-second load times, and complete source code ownership.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center">
                <Globe className="w-5 h-5 text-[#16a34a] mr-2" /> Integrations
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Direct API webhook endpoints routing lead form submissions to Notion databases, HubSpot CRM, WhatsApp notifications, or n8n workflow engines without third-party database plugins.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 text-[#16a34a] mr-2" /> SEO-Readiness
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Automated JSON-LD structured data schemas (Service, FAQPage, Breadcrumb), canonical tag controls, dynamic XML sitemaps, semantic HTML5 structure, and 100% Core Web Vitals optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 (H2) */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl mb-12">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              ARCHITECTURE COMPARISON
            </div>
            <h2 id="custom-website-vs-template-vs-platform" className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24">
              Custom Website vs Template vs Platform
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Evaluating the architectural differences, security posture, page speed performance, and lead conversion capabilities across different web build approaches.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                  <th className="p-4 md:p-5 text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Vector</th>
                  <th className="p-4 md:p-5 text-xs font-mono font-bold uppercase text-[#16a34a] w-1/3">Custom Next.js Application (DigiXPro)</th>
                  <th className="p-4 md:p-5 text-xs font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-1/3">WordPress / Monolithic Templates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 text-xs font-bold text-black dark:text-white align-top">Mobile Core Web Vitals</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top bg-emerald-50/30 dark:bg-emerald-950/20">Guaranteed 100/100 performance; sub-second mobile rendering.</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Typically 35-65 due to plugin bloat and render-blocking scripts.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 text-xs font-bold text-black dark:text-white align-top">Security &amp; Immunity</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top bg-emerald-50/30 dark:bg-emerald-950/20">Decoupled static output; immune to SQL injection and plugin exploits.</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">High risk of automated plugin vulnerabilities and malware injections.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 text-xs font-bold text-black dark:text-white align-top">Technical SEO &amp; Schema</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top bg-emerald-50/30 dark:bg-emerald-950/20">Automated JSON-LD schemas baked into build pipeline natively.</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Requires multiple SEO plugins that conflict and add database overhead.</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4 md:p-5 text-xs font-bold text-black dark:text-white align-top">Lead Capture Plumbing</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top bg-emerald-50/30 dark:bg-emerald-950/20">Direct API webhooks into CRM, Notion, WhatsApp, n8n workflows.</td>
                  <td className="p-4 md:p-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">Form data stored in SQL database or passed via unreliable plugin mailers.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6 (H2) — PHASE A LOGO BUG FIX SCOPED HERE */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            VERIFIED SYSTEM PROOF
          </div>
          <h2 id="evidence-custom-business-website-design-in-action" className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24">
            Evidence: Custom Business Website Design in Action
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            We practice exact engineering principles we recommend to our clients. The DigiXPro web platform is built on decoupled Next.js static architecture, automated JSON-LD schemas, 100% Core Web Vitals speed, and direct n8n API lead routing.
          </p>

          {/* EVIDENCE BLOCK CONTAINER — FIXED PLAIN TEXT WORDMARK & RESTORED TOP PADDING */}
          <div className="p-8 md:p-10 pt-8 md:pt-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl mx-auto text-left shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-2xl font-extrabold font-sans tracking-tight text-black dark:text-white">
                DigiXPro
              </span>
              <span className="text-xs font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                LIVE PLATFORM EVIDENCE
              </span>
            </div>
            <h3 className="text-lg font-bold text-black dark:text-white mb-2">DigiXPro Decoupled Web Platform Case Study</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Inspect how DigiXPro achieves sub-second page performance, zero third-party plugin bloat, and automated search engine indexability across 50+ commercial routes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/evidence/digixpro" className="text-xs font-bold text-white bg-[#16a34a] px-5 py-3 rounded-xl hover:bg-[#15803d] transition-colors inline-flex items-center">
                View Platform Case Study <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
              <Link href="/evidence" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 px-5 py-3 rounded-xl hover:border-black dark:hover:border-white transition-colors inline-flex items-center">
                Browse All Evidence
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 (H2) — LOCAL KEYWORDS (Delhi NCR, Delhi, Noida, Gurgaon, near me) */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              REGIONAL PRESENCE &amp; GLOBAL DELIVERY
            </div>
            <h2 id="custom-website-design-company-serving-delhi-ncr" className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white scroll-mt-24">
              Custom Website Design Company Serving Delhi NCR
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              As a specialized custom website design company based in Delhi NCR (serving clients across Delhi, Noida, Gurgaon, and nearby regional hubs), DigiXPro combines local strategic accessibility with world-class software engineering standards.
            </p>
            <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Whether you are searching for a high-performance custom website design agency near me in Delhi NCR or looking to upgrade an existing enterprise web platform globally across the US, UK, Australia, or Singapore, our technical web engineering team delivers bespoke Next.js solutions designed to dominate organic search and capture qualified lead pipelines.
            </p>

            <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-black dark:text-white">Serving Delhi NCR &amp; Global Enterprise Clients</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Delhi • Noida • Gurgaon • Delhi NCR • Global Remote</p>
              </div>
              <Link 
                href="/contact"
                className="text-xs font-bold text-white bg-black dark:bg-white dark:text-black px-5 py-3 rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
              >
                Schedule Regional Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 (H2) — FREQUENTLY ASKED QUESTIONS (10 H3 QUESTIONS WITH SLUG IDs) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              BUYER QUESTIONS &amp; OBJECTIONS
            </div>
            <h2 id="frequently-asked-questions" className="text-[32px] md:text-[44px] font-extrabold mb-4 text-black dark:text-white scroll-mt-24">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Clear technical and commercial answers regarding custom website design services for small and growing businesses.
            </p>
          </div>

          <div className="space-y-6">
            {customBusinessWebsiteFaqs.map((faq, idx) => {
              const faqId = `faq-${slugify(faq.question)}`;
              return (
                <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                  <h3 id={faqId} className="text-[17px] md:text-[19px] font-bold text-black dark:text-white mb-3 flex items-start scroll-mt-24">
                    <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <div className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                    {renderTextWithLinks(faq.answer)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CONVERSION SECTION */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
          <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
            COMMERCIAL DISCOVERY
          </span>
          <div className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
            Ready to build a custom business website engineered for growth?
          </div>
          <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Book an architecture discovery session to discuss your business bottlenecks, target audience intent, and technical web engineering requirements.
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
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
            >
              View Investment Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <DeferredStickyMobileCTA />
    </div>
  );
}
