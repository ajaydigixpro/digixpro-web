"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Cpu,
  Terminal,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Info,
  Sparkles,
  ExternalLink,
  Scale,
  Code2,
  Database,
  Globe2,
  Workflow,
  Search,
  Lock,
  Compass,
  FileCheck,
  Server,
  Zap,
  Clock,
  Briefcase
} from "lucide-react";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import TableOfContents, { type TocItem } from "@/components/ui/TableOfContents";
import FAQSchema from "@/components/seo/FAQSchema";
import { ibmPlexSans, ibmPlexMono } from "@/lib/fonts";
import {
  CANONICAL_SERVICES_PRICING,
  formatTierPrice,
  formatBound,
  formatHourlyReferenceForCluster,
  FIXED_REFERENCE_RATES_INR,
  CURRENCY_SYMBOLS,
  type DisplayCurrency,
  type PricingCluster,
  type PricingTierName,
  type CanonicalServicePricing
} from "@/data/pricing";

const CURRENCIES: { code: DisplayCurrency; label: string; symbol: string }[] = [
  { code: "INR", label: "INR (Canonical)", symbol: "₹" },
  { code: "USD", label: "USD", symbol: "$" },
  { code: "GBP", label: "GBP", symbol: "£" },
  { code: "AUD", label: "AUD", symbol: "A$" },
  { code: "SGD", label: "SGD", symbol: "S$" }
];

const TOC_LINKS: TocItem[] = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "cluster-design-build", number: "02", label: "Design & Build" },
  { id: "cluster-search-automation", number: "03", label: "Search, AI & Automation" },
  { id: "cluster-advisory", number: "04", label: "Advisory & Leadership" },
  { id: "which-path", number: "05", label: "Which Path Fits You" },
  { id: "faqs", number: "06", label: "Investment FAQs" },
  { id: "quote-cta", number: "07", label: "Get an Exact Quote" }
];

interface InvestmentFaq {
  category: "commercial" | "design-build" | "search-ai" | "advisory";
  categoryLabel: string;
  question: string;
  answer: string;
  anchorId: string;
}

const INVESTMENT_FAQS: InvestmentFaq[] = [
  // Sub-Cluster A: Commercial Terms, Contracts & Code Ownership
  {
    category: "commercial",
    categoryLabel: "Commercial Terms & Contracts",
    anchorId: "faq-commercial-milestones",
    question: "How does DigiXPro structure milestone payments and commercial billing?",
    answer:
      "All fixed-scope web engineering and automation projects operate on milestone-based delivery with structured diagnostic sign-offs and zero unapproved billing spikes. Milestones are formally tied to transparent staging acceptance before production cutover. Ongoing SEO, GEO, and fractional leadership services operate on monthly retainers billed at the beginning of each 30-day performance period. We do not bill by arbitrary hourly estimates or pad invoices."
  },
  {
    category: "commercial",
    categoryLabel: "Commercial Terms & Contracts",
    anchorId: "faq-source-code-ownership",
    question: "Do clients own 100% of the source code and infrastructure after launch?",
    answer:
      "Yes. DigiXPro operates on complete architectural ownership. Every line of custom Next.js frontend code, backend API webhooks, schema configurations, and n8n workflow JSON is transferred directly to your organization's GitHub repository and deployed to your own cloud infrastructure (Vercel, Supabase, Cloudflare, or self-hosted VPS). There are zero proprietary software lock-ins, recurring platform licensing fees, or exit penalties."
  },
  {
    category: "commercial",
    categoryLabel: "Commercial Terms & Contracts",
    anchorId: "faq-supported-currencies",
    question: "What currencies are supported for international client invoicing?",
    answer:
      "DigiXPro invoices in INR (canonical base currency) for domestic Indian organizations, as well as USD ($), GBP (£), AUD (A$), and SGD (S$) for international clients. Foreign currency conversions on this guide use fixed reference benchmarks (no live FX markups). Invoices can be settled via direct bank wire (NEFT/RTGS/SWIFT), corporate credit card, or international payment gateways."
  },
  {
    category: "commercial",
    categoryLabel: "Commercial Terms & Contracts",
    anchorId: "faq-scope-changes",
    question: "What happens if project requirements expand or change mid-build?",
    answer:
      "If you wish to introduce new features, additional third-party integrations, or extra page templates during an active build, we evaluate the addition through an explicit scope adjustment memo. We provide a transparent, fixed-fee quote for the new milestone before writing code. Existing milestones and agreed timelines proceed uninterrupted."
  },
  {
    category: "commercial",
    categoryLabel: "Commercial Terms & Contracts",
    anchorId: "faq-hidden-fees",
    question: "Are there any hidden recurring platform fees or mandatory maintenance charges?",
    answer:
      "No. Because we engineer custom decoupled Next.js web applications rather than bloated WordPress templates, there are no mandatory monthly plugin subscriptions, theme renewal charges, or security patch retainer dependencies. Routine cloud hosting on modern edge platforms (such as Vercel or Cloudflare) typically costs $0 to $20/month, paid directly by you to the cloud provider."
  },

  // Sub-Cluster B: Design & Build Pricing, Scope & Architecture
  {
    category: "design-build",
    categoryLabel: "Design & Build Services",
    anchorId: "faq-nextjs-vs-wordpress",
    question: "Why does custom Next.js engineering cost more upfront than template WordPress sites?",
    answer:
      "Template WordPress sites appear inexpensive initially because they assemble pre-made themes and dozens of third-party plugins. However, they incur compounding technical debt: sluggish mobile page speed (failing Core Web Vitals), recurring security vulnerabilities, and unpredictable plugin updates that break layouts. Custom Next.js web applications compile clean, static code served directly from edge CDNs—delivering sub-second load times, impenetrable security, and significantly higher lead conversion rates that compound over years."
  },
  {
    category: "design-build",
    categoryLabel: "Design & Build Services",
    anchorId: "faq-tier-placement-factors",
    question: "What factors determine whether a website build falls into Basic, Standard, or Premium?",
    answer:
      "Investment is determined by three core engineering drivers: page volume (a 5-page service site vs. 50+ programmatic landing pages), data persistence complexity (stateless informational layouts vs. relational PostgreSQL databases with authentication and user dashboards), and integration depth (basic lead forms vs. bi-directional CRM pipelines, WhatsApp Business API triggers, and automated payment gateways)."
  },
  {
    category: "design-build",
    categoryLabel: "Design & Build Services",
    anchorId: "faq-zero-rank-loss-redesign",
    question: "How do you ensure zero loss of organic search traffic during a website redesign?",
    answer:
      "Our website redesign protocol enforces a strict zero-rank-loss architecture. Before deprecating any legacy pages, we crawl and benchmark the entire URL taxonomy, map a 1:1 permanent 301 redirect map for every legacy URL, transfer all schema and metadata structures, and run real-time Google Search Console telemetry for 48 hours post-cutover to verify that search indexation and backlink equity remain completely intact."
  },
  {
    category: "design-build",
    categoryLabel: "Design & Build Services",
    anchorId: "faq-typical-delivery-timeline",
    question: "How long does a typical custom website build or redesign take from kickoff to launch?",
    answer:
      "A standard 5-to-12 page business website (Basic to Standard tier) typically completes in 3 to 6 weeks. More complex web applications with custom user portals, interactive calculators, and deep database integrations (Premium tier) require 6 to 12 weeks. Every project is governed by weekly staging demonstrations and documented milestone sign-offs."
  },
  {
    category: "design-build",
    categoryLabel: "Design & Build Services",
    anchorId: "faq-figma-design-prototypes",
    question: "Do you provide design prototypes in Figma before building the code?",
    answer:
      "Yes. Every design and build project begins with comprehensive wireframing and interactive UI design tokens established in Figma. We review the layout, typography, messaging hierarchy, and mobile responsive states with your team before engineering the production Next.js codebase."
  },

  // Sub-Cluster C: Search, SEO, GEO & AI Automation Retainers
  {
    category: "search-ai",
    categoryLabel: "Search, AI & Automation",
    anchorId: "faq-seo-vs-geo",
    question: "What is the difference between standard SEO and AI Search Optimization (GEO)?",
    answer:
      "Standard SEO optimizes web architecture and content for traditional search engine algorithms like Google, focusing on keyword rankings, backlinks, and Map Pack positioning. Generative Engine Optimization (GEO) structures machine-readable entity graphs, llms.txt endpoints, and cited factual data so conversational AI models (ChatGPT, Claude, Perplexity, Gemini) cite your business as the authoritative recommendation when users ask for service providers."
  },
  {
    category: "search-ai",
    categoryLabel: "Search, AI & Automation",
    anchorId: "faq-ranking-guarantees",
    question: "Do you guarantee #1 rankings on Google search?",
    answer:
      "No ethical, professional SEO practitioner guarantees #1 rankings, as Google's search algorithms are proprietary and evolve continuously. What DigiXPro guarantees is 100% technical SEO compliance, 95+ Core Web Vitals performance, semantic JSON-LD entity graph integration, and authoritative, fact-dense content engineering that consistently outperforms competitor pages over time."
  },
  {
    category: "search-ai",
    categoryLabel: "Search, AI & Automation",
    anchorId: "faq-time-to-results",
    question: "How soon can we expect measurable business results from SEO and Local SEO campaigns?",
    answer:
      "Local SEO optimizations (Google Business Profile and local citation cleanup) typically yield initial Map Pack visibility and call volume improvements within 30 to 60 days. Organic search campaigns for competitive commercial keywords generally demonstrate significant ranking momentum and organic enquiry growth within 3 to 6 months of continuous technical publishing."
  },
  {
    category: "search-ai",
    categoryLabel: "Search, AI & Automation",
    anchorId: "faq-n8n-vs-zapier",
    question: "How do self-hosted n8n workflow automations save money compared to Zapier or Make?",
    answer:
      "Zapier and Make charge per-task fees that escalate rapidly as your lead volume and data syncs grow, easily exceeding $200 to $1,000/month. DigiXPro engineers and deploys self-hosted n8n automation instances directly on your cloud infrastructure. You pay zero per-task fees, retain complete ownership of your data workflows, and execute millions of webhook automations without recurring SaaS markups."
  },
  {
    category: "search-ai",
    categoryLabel: "Search, AI & Automation",
    anchorId: "faq-crm-lead-roi",
    question: "What is the typical return on investment (ROI) for lead capture and CRM automation?",
    answer:
      "Studies consistently prove that responding to an inbound website lead within 5 minutes increases conversion rates by up to 391% compared to a 30-minute delay. By engineering instant form-to-WhatsApp notifications and automated round-robin CRM assignment, our lead capture automations eliminate lead leakage, directly multiplying sales velocity from your existing marketing spend."
  },

  // Sub-Cluster D: Advisory, Due Diligence & Fractional CTO Engagements
  {
    category: "advisory",
    categoryLabel: "Advisory & Leadership",
    anchorId: "faq-independent-advisory-model",
    question: "How does an Independent Advisory Retainer differ from hiring an IT consulting agency?",
    answer:
      "Traditional IT agencies sell consulting as a loss-leader to pitch proprietary software licenses, offshore developer hours, or ongoing maintenance contracts. DigiXPro operates on 100% independent advisory led directly by Dr. Ajay Shukla. We accept zero vendor commissions, zero software reseller markups, and zero referral kickbacks. Our sole objective is protecting your capital and architecting the leanest, most effective technical solution."
  },
  {
    category: "advisory",
    categoryLabel: "Advisory & Leadership",
    anchorId: "faq-due-diligence-scope",
    question: "What does a Technology Due Diligence or Vendor Evaluation engagement cover?",
    answer:
      "Our vendor evaluation service conducts an unbiased line-by-line inspection of third-party software proposals, RFP responses, and agency contracts. We expose inflated developer hour estimates, unnecessary software dependencies, hidden maintenance lock-ins, and vague deliverable milestones. We arm founders and CEOs with fair-market price benchmarks and technical negotiation leverage."
  },
  {
    category: "advisory",
    categoryLabel: "Advisory & Leadership",
    anchorId: "faq-fractional-cto-cadence",
    question: "How does a Fractional CTO engagement work on a weekly basis?",
    answer:
      "A Fractional CTO engagement provides senior technical leadership on a structured monthly retainer. Depending on the engagement scope (Basic advisory, Standard defined project, or Premium executive retainer), Dr. Ajay Shukla dedicates 8 to 40+ hours per month to lead weekly technical steering meetings, review critical codebase pull requests, direct architecture decisions, grade candidate technical interviews, and represent your technology roadmap during board or investor meetings."
  },
  {
    category: "advisory",
    categoryLabel: "Advisory & Leadership",
    anchorId: "faq-standalone-diagnostic",
    question: "Can we engage DigiXPro for a short architecture diagnostic before committing to a larger build?",
    answer:
      "Yes. Many clients begin with our Systems Architecture Review or Diagnostic Audit (indicative Basic diagnostic sessions starting at ₹25,000 to ₹60,000). We inspect your existing software systems, benchmark performance bottlenecks, and produce a standalone Architectural Blueprint and execution roadmap that you can implement internally or tender to third-party developers."
  },
  {
    category: "advisory",
    categoryLabel: "Advisory & Leadership",
    anchorId: "faq-focused-advisory-sessions",
    question: "Can focused advisory diagnostic sessions be booked for specific technical dilemmas?",
    answer:
      "Yes. For focused technology evaluations, architectural dilemma resolution, or urgent vendor due diligence, we offer structured diagnostic sessions (indicative ₹25,000 to ₹60,000). Every session produces an actionable architectural blueprint with concrete recommendations, rather than billing open-ended, arbitrary hourly meters."
  }
];


export default function PricingClient() {
  const [currency, setCurrency] = useState<DisplayCurrency>("INR");
  const [activeCluster, setActiveCluster] = useState<PricingCluster | "all">("all");
  const [selectedTiers, setSelectedTiers] = useState<Record<string, PricingTierName>>({});
  const [activeFaqCategory, setActiveFaqCategory] = useState<"all" | "commercial" | "design-build" | "search-ai" | "advisory">("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getActiveTier = (serviceId: string): PricingTierName => {
    return selectedTiers[serviceId] || "Standard";
  };

  const handleTierChange = (serviceId: string, tier: PricingTierName) => {
    setSelectedTiers((prev) => ({ ...prev, [serviceId]: tier }));
  };

  const designBuildServices = CANONICAL_SERVICES_PRICING.filter((s) => s.cluster === "design-build");
  const searchAutomationServices = CANONICAL_SERVICES_PRICING.filter((s) => s.cluster === "search-ai-automation");
  const advisoryServices = CANONICAL_SERVICES_PRICING.filter((s) => s.cluster === "advisory");

  const filteredFaqs = activeFaqCategory === "all"
    ? INVESTMENT_FAQS
    : INVESTMENT_FAQS.filter((f) => f.category === activeFaqCategory);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderServiceBlock = (service: CanonicalServicePricing, globalIndex: number, clusterIndex: number) => {
    const activeTierName = getActiveTier(service.id);
    const activeTierData = service.tiers[activeTierName];
    const tierKeys: PricingTierName[] = ["Premium", "Standard", "Basic"];
    const globalIndexString = globalIndex < 10 ? `0${globalIndex}` : `${globalIndex}`;
    const hourlyRate = formatHourlyReferenceForCluster(service.cluster, currency);
    const clusterEyebrow =
      service.cluster === "design-build"
        ? `Design & Build · Service ${clusterIndex} of 6`
        : service.cluster === "search-ai-automation"
        ? `Search, AI & Automation · Service ${clusterIndex} of 6`
        : `Advisory · Service ${clusterIndex} of 6`;

    return (
      <article
        key={service.id}
        id={`service-${service.slug}`}
        className="border-t border-b border-neutral-200 dark:border-neutral-800 py-12 md:py-16 my-8 md:my-12 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header: Service Index, Cluster, and Commercial Model */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider">
                {clusterEyebrow}
              </span>
            </div>
            <span className="font-plex-mono text-[11px] px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-medium">
              {service.commercialModel}
            </span>
          </div>

          {/* Large Service Heading with Index Number */}
          <h3 className="font-plex-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-4 group">
            <Link
              href={service.canonicalUrl}
              className="hover:text-[#16a34a] transition-colors inline-flex items-center gap-3"
            >
              <span>{globalIndexString} — {service.name}</span>
              <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity text-[#16a34a] shrink-0" aria-hidden="true" />
            </Link>
          </h3>

          {/* Two-Column Structured Service Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6 items-start">
            {/* Left Column: Summary, Ideal For, Spec Link */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
                  {service.summary}
                </p>

                <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2.5 mb-6">
                  <Briefcase className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">
                    <strong className="text-neutral-950 dark:text-white font-semibold">Ideal for:</strong> {service.idealFor}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <Link
                  href={service.canonicalUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-plex-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#16a34a] dark:hover:text-[#16a34a] transition-colors"
                >
                  <span>Read full service methodology &amp; FAQs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#16a34a]" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3-Tier Switcher Tabs, Price, Deliverables, CTA */}
            <div className="lg:col-span-7 bg-white dark:bg-[#121212] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8">
              {/* 3-Tier Switcher Tabs: Premium -> Standard -> Basic */}
              <div className="mb-6">
                <div className="text-xs font-plex-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                  Select Scope Tier:
                </div>
                <div
                  className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700"
                  role="tablist"
                  aria-label={`${service.name} tiers`}
                >
                  {tierKeys.map((tierName) => {
                    const isSelected = activeTierName === tierName;
                    const isStandard = tierName === "Standard";
                    return (
                      <button
                        key={tierName}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleTierChange(service.id, tierName)}
                        className={`py-2.5 px-3 text-center rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] flex items-center justify-center relative ${
                          isSelected
                            ? "bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white shadow-xs border border-neutral-200/80 dark:border-neutral-700"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>{tierName}</span>
                          {isStandard && (
                            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-plex-mono bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20 font-bold uppercase tracking-tight">
                              Recommended
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Always-Visible Secondary Ad-Hoc Rate Strip with Expandable Guidance */}
                <details className="group mt-3 pt-2.5 border-t border-dashed border-neutral-200/80 dark:border-neutral-700/60">
                  <summary className="cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-1.5 px-3 rounded-lg bg-neutral-50 hover:bg-neutral-100/80 dark:bg-neutral-900/60 dark:hover:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-800 transition-colors">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-plex-mono text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                          Ad-Hoc / Non-Standard Scope:
                        </span>
                        <span className="font-plex-mono text-xs font-bold text-[#16a34a]">
                          {hourlyRate.fullDisplay}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-plex-mono text-[10px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 shrink-0">
                        <span>Scope guidance</span>
                        <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </summary>
                  <div className="mt-2.5 p-3 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 font-normal">
                    <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                      Standard tiers cover ~90% of commercial engagements with predictable milestone delivery. For specialized troubleshooting, legacy system audits, or non-standard requirements that fall outside defined scopes, senior consulting is available at the applicable reference rate for this service category under direct oversight by Dr. Ajay Shukla.
                    </p>
                  </div>
                </details>
              </div>

              {/* Price Display */}
              <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="text-xs font-plex-mono text-neutral-500 dark:text-neutral-400 mb-1">
                  {activeTierName} Tier · {activeTierData.tagline}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-1">
                  <span className="font-plex-mono text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
                    {formatTierPrice(activeTierData, currency)}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-plex-mono">
                    <Clock className="w-3.5 h-3.5 text-[#16a34a]" aria-hidden="true" />
                    <span>Typical delivery cadence: {activeTierData.typicalTimeline}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans italic">
                    Typical delivery depends on final scope and project dependencies.
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="py-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="text-xs font-plex-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 font-semibold">
                  Included Deliverables ({activeTierName}):
                </div>
                <ul className="space-y-2.5">
                  {activeTierData.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scope Drivers */}
              <div className="py-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="text-xs font-plex-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 font-semibold">
                  Key Scope Drivers:
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                  {activeTierData.scopeDrivers.join(" · ")}
                </p>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href={`/audit?service=${service.slug}&tier=${activeTierName.toLowerCase()}`}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <span>Scope {service.name} ({activeTierName})</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.name)}&tier=${activeTierName}`}
                  className="text-xs font-plex-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Discuss this scope →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 selection:bg-[#16a34a]/20 selection:text-[#16a34a]`}>
      {/* FAQ Schema */}
      <FAQSchema items={INVESTMENT_FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO */}
      {/* ========================================================================= */}
      <header id="overview" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#16a34a]/10 border border-[#16a34a]/20 text-[#16a34a] font-plex-mono text-xs uppercase tracking-wider font-semibold mb-6">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Transparent Commercial Architecture · DigiXPro Investment Guide</span>
            </div>

            {/* H1 */}
            <h1 className="hero-lcp-heading font-plex-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.15] mb-6">
              DigiXPro Investment Guide — Digital Services Pricing in India
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-8">
              Clear, transparent investment parameters for business owners, CTOs, and founders. We publish exact indicative brackets across our 18 canonical services—eliminating arbitrary hourly estimates, hidden platform markups, and sales call ambushes.
            </p>

            {/* Elevated Core Positioning: Senior Engineering at Mid-Market Investment Parameters (Fix 2) */}
            <div className="p-5 sm:p-6 rounded-xl border-2 border-[#16a34a]/30 bg-gradient-to-br from-[#16a34a]/5 via-white to-transparent dark:from-[#16a34a]/10 dark:via-[#121212] dark:to-transparent mb-8 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/25 flex items-center justify-center text-[#16a34a] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-plex-mono text-xs uppercase tracking-wider text-[#16a34a] font-bold mb-1">
                    Founder Commercial Model
                  </div>
                  <h2 className="font-plex-sans text-lg sm:text-xl font-bold text-neutral-950 dark:text-white mb-2">
                    Senior Engineering Access at Mid-Market Investment Parameters
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                    Where traditional agencies bill ₹1.5L–₹3L for account management layers and outsourced junior developers, DigiXPro delivers principal-led Next.js systems and custom automation pipelines at transparent, mid-market rates.
                  </p>
                </div>
              </div>
            </div>

            {/* Currency Switcher Bar */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-plex-sans font-semibold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
                    <span>Select Display Currency</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Canonical rates in INR. Foreign currencies use fixed reference standards (USD, GBP, AUD, SGD).
                  </p>
                </div>
                <div
                  className="inline-flex flex-wrap items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-1"
                  role="group"
                  aria-label="Select display currency"
                >
                  {CURRENCIES.map((c) => {
                    const isSelected = currency === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setCurrency(c.code)}
                        aria-pressed={isSelected}
                        className={`font-plex-mono text-xs font-semibold px-3 py-1.5 rounded transition-all min-h-[36px] ${
                          isSelected
                            ? "bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white shadow-sm border border-neutral-200 dark:border-neutral-700"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        {c.symbol} {c.code}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Value Proposition Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
                <div className="font-plex-mono text-xs text-[#16a34a] font-semibold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Fixed Milestones</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Milestone-based delivery with structured sign-offs. 0 billing surprises.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
                <div className="font-plex-mono text-xs text-[#16a34a] font-semibold mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>100% Code Ownership</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Transferred to your GitHub. Zero vendor lock-in or licensing fees.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
                <div className="font-plex-mono text-xs text-[#16a34a] font-semibold mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Senior Engineering</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Direct oversight by Dr. Ajay Shukla. Zero junior hand-offs.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
                <div className="font-plex-mono text-xs text-[#16a34a] font-semibold mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Self-Built Stack</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Next.js edge + open n8n pipelines. 0 agency middleman bloat.
                </p>
              </div>
            </div>

            {/* Reusable Dotted-Leader Table of Contents Block */}
            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <TableOfContents items={TOC_LINKS} variant="block" title="On this page" />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 2: REUSED STICKY TABLE OF CONTENTS NAVIGATION (WITH SCROLL SPY) */}
      {/* ========================================================================= */}
      <TableOfContents items={TOC_LINKS} variant="sticky" title="On this page" />

      {/* Scope Levels Clarification Callout (Phase 2) */}
      <div className="bg-neutral-50/80 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          <Info className="w-4 h-4 text-[#16a34a] shrink-0" aria-hidden="true" />
          <span>
            Basic, Standard and Premium are scope levels — not fixed bundles across every service. Your investment depends on the specific service, complexity, and scope required.
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW DIGIXPRO PRICING WORKS */}
      {/* ========================================================================= */}
      <section id="how-pricing-works" className="py-16 md:py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="font-plex-mono text-xs uppercase tracking-wider text-[#16a34a] font-semibold mb-2">
              01 · Commercial Mechanics & Engineering Philosophy
            </div>
            <h2 className="font-plex-sans text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
              How DigiXPro Pricing Works — The Commercial Mechanics
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We structure engagements with clear, predictable boundaries. By eliminating arbitrary hourly guesswork, speculative markups, and middle-management overhead, we align engineering incentives directly with production outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="w-10 h-10 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <FileCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                1. Upfront Transparency
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We reject the industry practice of withholding prices to force high-pressure sales calls. Publishing transparent brackets allows founders to evaluate commercial feasibility before investing time in technical discovery.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="w-10 h-10 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Scale className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                2. Fixed Scopes vs. Retainers
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Builds and automations are quoted on fixed milestone deliverables with structured diagnostic sign-offs and predictable milestone scopes. Ongoing SEO, GEO, and fractional CTO advisory operate on 30-day retainers without predatory long-term lock-ins.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="w-10 h-10 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Server className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                3. Self-Built Infrastructure
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We run on our own custom Next.js static edge architecture and open n8n automation pipelines. We do not pass third-party SaaS reseller margins, bloated account manager salaries, or plugin fees to our clients.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="w-10 h-10 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Lock className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                4. Client-Owned Deployments
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Your software lives in your repositories and deploys to your own cloud infrastructure (Vercel, Supabase, Cloudflare, AWS). You maintain complete intellectual property rights, database access, and zero exit penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: WHAT CHANGES THE INVESTMENT? (SCOPE DRIVERS & CATALOGUE REALITY) */}
      {/* ========================================================================= */}
      <section id="scope-drivers" className="py-16 md:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="font-plex-mono text-xs uppercase tracking-wider text-[#16a34a] font-semibold mb-2">
              02 · Engineering Variables &amp; Scope Determinants
            </div>
            <h2 className="font-plex-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
              What Changes the Investment? — 7 Technical Scope Drivers
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Every software quote at DigiXPro is calculated from explicit architectural requirements. Here are the seven primary technical factors that determine whether an engagement sits within Basic, Standard, or Premium parameters.
            </p>
          </div>

          {/* Catalogue-Scale Real-World Example Callout (Phase 9) */}
          <div className="p-4 sm:p-5 rounded-xl border border-[#16a34a]/30 bg-[#16a34a]/5 dark:bg-[#16a34a]/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm flex items-start gap-3 mb-10">
            <Info className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong className="text-neutral-950 dark:text-white font-semibold">Scope reality:</strong> A 10-product catalogue and a 5,000-product catalogue are not the same website project — catalogue size, integrations, migration complexity, and operational workflows can materially change the investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
              <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Layers className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                1. Page Count & Layout Volume
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                A 5-page service business site requires less layout scaffolding than a 50-page enterprise platform with localized branch landing pages, categorized case study directories, and dynamic content taxonomy.
              </p>
              <div className="text-[11px] font-plex-mono text-[#16a34a] border-t border-neutral-200 dark:border-neutral-800 pt-2">
                Basic: 3–5 pages · Standard: 8–15 pages · Premium: 20–100+ pages
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
              <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                2. Interactive UI & Custom State
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Standard static informational cards require minimal client-side state, whereas interactive cost calculators, real-time diagnostic filters, multi-step booking funnels, and canvas visualizations demand custom React logic.
              </p>
              <div className="text-[11px] font-plex-mono text-[#16a34a] border-t border-neutral-200 dark:border-neutral-800 pt-2">
                Basic: Static forms · Standard: Interactive funnels · Premium: Complex calculators
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
              <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Workflow className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                3. API Integrations & Webhooks
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Connecting an enquiry form to standard email is straightforward. Engineering bi-directional CRM syncing (HubSpot, Zoho), WhatsApp Business API notifications, payment gateway routing, and n8n webhook pipelines requires hardened exception handling.
              </p>
              <div className="text-[11px] font-plex-mono text-[#16a34a] border-t border-neutral-200 dark:border-neutral-800 pt-2">
                Basic: Webhook alert · Standard: CRM sync · Premium: Multi-channel event bus
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
              <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Database className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                4. Database Complexity & Auth
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Stateless web pages compile statically to CDNs. Adding relational PostgreSQL schemas (Supabase), user authentication, role-based access control (RBAC), and private customer portals introduces backend persistence and security governance.
              </p>
              <div className="text-[11px] font-plex-mono text-[#16a34a] border-t border-neutral-200 dark:border-neutral-800 pt-2">
                Basic: Stateless SSG · Standard: Managed Supabase · Premium: Multi-tenant RBAC
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
              <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Search className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                5. Legacy Migration & 301 Redirects
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Deploying a greenfield domain carries zero legacy risk. Rebuilding an established domain with 10 years of backlink equity requires exhaustive URL taxonomy crawl audits, 1:1 permanent 301 mapping, and schema reconciliation to avoid traffic drops.
              </p>
              <div className="text-[11px] font-plex-mono text-[#16a34a] border-t border-neutral-200 dark:border-neutral-800 pt-2">
                Basic: &lt;50 URLs · Standard: Up to 250 URLs · Premium: 1,000+ complex URLs
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
              <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] mb-4">
                <Globe2 className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-2">
                6. Traffic Scale & Edge Caching
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Serving 5,000 monthly visits operates within standard edge thresholds. Handling 500,000+ monthly visits requires advanced incremental static regeneration (ISR), edge micro-caching, distributed rate-limiting, and DDOS mitigation.
              </p>
              <div className="text-[11px] font-plex-mono text-[#16a34a] border-t border-neutral-200 dark:border-neutral-800 pt-2">
                Basic: Standard CDN · Standard: Regional edge ISR · Premium: Global multi-region failover
              </div>
            </div>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] md:col-span-2 lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-plex-sans font-semibold text-base text-neutral-950 dark:text-white mb-1">
                      7. Security Hardening & Regulatory Governance
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-4xl">
                      Healthcare practices, financial institutions, and corporate enterprises require strict Content Security Policy (CSP) headers, data residency guarantees, HIPAA or GDPR compliant data ingestion pipelines, and automated penetration testing before production deployment.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 font-plex-mono text-xs text-[#16a34a] bg-[#16a34a]/10 px-3 py-1.5 rounded-lg border border-[#16a34a]/20">
                  Custom Scoped per Compliance Mandate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 01: CLUSTER 1 — WEBSITE DESIGN & ENGINEERING */}
      {/* ========================================================================= */}
      <section id="cluster-design-build" className="py-16 md:py-24 bg-neutral-50/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              01 — design &amp; build
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold mb-4 text-black dark:text-white tracking-tight font-plex-sans scroll-mt-24">
            Website Design &amp; Engineering
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl mb-6">
            Production-grade web applications, high-converting landing funnels, and SEO-first digital platforms engineered with 100% source code ownership.
          </p>

          {/* Production Evidence Strip for Cluster 1 */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" aria-hidden="true" />
              <span className="font-plex-mono font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Verified Production Evidence
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 font-plex-mono">
                (Design &amp; Build)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/evidence/buy-secondhand-book" className="font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] transition-colors inline-flex items-center gap-1">
                <span>BuySecondhandBook</span>
                <ArrowRight className="w-3 h-3 text-[#16a34a]" />
              </Link>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <Link href="/evidence/digixpro" className="font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] transition-colors inline-flex items-center gap-1">
                <span>DigiXPro Platform</span>
                <ArrowRight className="w-3 h-3 text-[#16a34a]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Services 01 to 06 */}
        {designBuildServices.map((service, idx) => renderServiceBlock(service, idx + 1, idx + 1))}
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 02: CLUSTER 2 — SEARCH, AI & AUTOMATION SYSTEMS */}
      {/* ========================================================================= */}
      <section id="cluster-search-automation" className="py-16 md:py-24 bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              02 — search, ai &amp; automation
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold mb-4 text-black dark:text-white tracking-tight font-plex-sans scroll-mt-24">
            Search, AI &amp; Automation Systems
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl mb-6">
            Scalable organic search visibility, localized lead engines, and self-hosted n8n AI workflow automations with zero per-task SaaS fees.
          </p>

          {/* Production Evidence Strip for Cluster 2 */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" aria-hidden="true" />
              <span className="font-plex-mono font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Verified Production Evidence
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 font-plex-mono">
                (Search, AI &amp; Automation)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/evidence/360-neck-shoulder" className="font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] transition-colors inline-flex items-center gap-1">
                <span>360 Neck &amp; Shoulder</span>
                <ArrowRight className="w-3 h-3 text-[#16a34a]" />
              </Link>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <Link href="/evidence/sattvaos" className="font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] transition-colors inline-flex items-center gap-1">
                <span>SattvaOS</span>
                <ArrowRight className="w-3 h-3 text-[#16a34a]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Services 07 to 12 */}
        {searchAutomationServices.map((service, idx) => renderServiceBlock(service, idx + 7, idx + 1))}
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 03: CLUSTER 3 — TECHNOLOGY ADVISORY & LEADERSHIP */}
      {/* ========================================================================= */}
      <section id="cluster-advisory" className="py-16 md:py-24 bg-neutral-50/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              03 — advisory &amp; leadership
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold mb-4 text-black dark:text-white tracking-tight font-plex-sans scroll-mt-24">
            Technology Advisory &amp; Leadership
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl mb-6">
            Independent architecture direction, vendor contract due diligence, and fractional CTO oversight led directly by Dr. Ajay Shukla.
          </p>

          {/* Production Evidence Strip for Cluster 3 */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" aria-hidden="true" />
              <span className="font-plex-mono font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Verified Production Evidence
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 font-plex-mono">
                (Advisory &amp; Leadership)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/evidence/dr-aggarwal" className="font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] transition-colors inline-flex items-center gap-1">
                <span>Dr. Aggarwal Clinic</span>
                <ArrowRight className="w-3 h-3 text-[#16a34a]" />
              </Link>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <Link href="/evidence/nirvandham" className="font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] transition-colors inline-flex items-center gap-1">
                <span>Nirvandham</span>
                <ArrowRight className="w-3 h-3 text-[#16a34a]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Services 13 to 18 */}
        {advisoryServices.map((service, idx) => renderServiceBlock(service, idx + 13, idx + 1))}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHICH PATH FITS YOU (DECISION HELPER) */}
      {/* ========================================================================= */}
      <section id="which-path" className="py-16 md:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0A0A] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-3">
            <span className="font-plex-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              04 — decision helper
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold mb-4 text-black dark:text-white tracking-tight font-plex-sans scroll-mt-24">
            Which Path Fits Your Current Growth Stage?
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl mb-12">
            Select your primary business requirement below to jump directly to the relevant investment cluster, or schedule an architecture consultation with Dr. Ajay Shukla.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Option 1 */}
            <div className="p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 flex flex-col justify-between">
              <div>
                <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  Path 01 · Engineering
                </div>
                <h3 className="font-plex-sans text-xl font-bold text-neutral-950 dark:text-white mb-3">
                  "I need something built"
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  You need a high-converting landing funnel, corporate website redesign, SEO-ready web engineering, or a custom Next.js digital platform built with clean code and zero SaaS bloat.
                </p>
              </div>
              <a
                href="#cluster-design-build"
                className="inline-flex items-center gap-2 text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
              >
                <span>Jump to Design &amp; Build (6 Services)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Option 2 */}
            <div className="p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 flex flex-col justify-between">
              <div>
                <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  Path 02 · Growth &amp; AI
                </div>
                <h3 className="font-plex-sans text-xl font-bold text-neutral-950 dark:text-white mb-3">
                  "I need visibility, AI or automation"
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  You want to scale inbound organic enquiries, dominate Google Local Map Packs, implement automated WhatsApp CRM lead routing, or replace costly Zapier subscriptions with self-hosted n8n.
                </p>
              </div>
              <a
                href="#cluster-search-automation"
                className="inline-flex items-center gap-2 text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
              >
                <span>Jump to Search, AI &amp; Automation (6 Services)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Option 3 */}
            <div className="p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 flex flex-col justify-between">
              <div>
                <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2">
                  Path 03 · Leadership
                </div>
                <h3 className="font-plex-sans text-xl font-bold text-neutral-950 dark:text-white mb-3">
                  "I need technology direction"
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  You are facing critical technology investments, evaluating agency RFP bids, modernizing legacy systems, or need ongoing senior CTO oversight without the cost of a full-time executive.
                </p>
              </div>
              <a
                href="#cluster-advisory"
                className="inline-flex items-center gap-2 text-xs font-plex-mono font-bold text-[#16a34a] hover:underline"
              >
                <span>Jump to Advisory &amp; Leadership (6 Services)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Fallback Architecture Call Banner */}
          <div className="p-6 md:p-8 rounded-2xl border border-[#16a34a]/30 bg-[#16a34a]/5 dark:bg-[#16a34a]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="font-plex-mono text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-1">
                Unsure Which Discipline You Need?
              </div>
              <h4 className="font-plex-sans text-lg font-bold text-neutral-950 dark:text-white mb-2">
                Still unsure? Book a 30-Min Architecture Call
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                Speak directly with Dr. Ajay Shukla. We will review your current technical bottlenecks and provide honest, vendor-neutral clarity on the exact scope, timeline, and investment required.
              </p>
            </div>
            <Link
              href="/contact?type=advisory"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold shrink-0 transition-colors shadow-sm"
            >
              <span>Book a 30-Minute Architecture Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MARKET CONTEXT & BENCHMARKS */}
      {/* ========================================================================= */}
      <section id="market-benchmarks" className="py-16 md:py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="font-plex-mono text-xs uppercase tracking-wider text-[#16a34a] font-semibold mb-2">
              05 · Industry Landscape &amp; Realistic Economics
            </div>
            <h2 className="font-plex-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Market Context — Digital Services Pricing in India
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              To evaluate digital services objectively, buyers must understand how agency pricing is structured across India. The following market benchmarks reflect standard commercial rates aggregated from independent published industry sources across website engineering and monthly search retainers.
            </p>
          </div>

          {/* Subsection 1: India Website Development Cost Benchmarks */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-wider">
                Category Benchmark A
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <h3 className="font-plex-sans text-lg font-bold text-neutral-950 dark:text-white">
                India Website Development Investment Tiers
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1: Freelancer & Template Shops */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <div className="font-plex-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Entry Market Bracket
                </div>
                <h4 className="font-plex-sans font-bold text-lg text-neutral-950 dark:text-white mb-1">
                  Freelancer & Template Shops
                </h4>
                <div className="font-plex-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  ₹15,000 – ₹50,000
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Entry-level web presence typically delivered using pre-made CMS themes or low-code site builders. Tailored for early-stage validation, basic local discovery, or straightforward brochure sites with standard page structures.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <div>• Pre-made CMS theme configuration & standard template layouts</div>
                  <div>• Best suited for simple informational brochure sites</div>
                  <div>• Routine plugin updates & basic maintenance requirements</div>
                </div>
              </div>

              {/* Category 2: Mid-Tier Agencies */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <div className="font-plex-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Mid-Market Bracket
                </div>
                <h4 className="font-plex-sans font-bold text-lg text-neutral-950 dark:text-white mb-1">
                  Traditional Mid-Tier Agencies
                </h4>
                <div className="font-plex-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  ₹80,000 – ₹2,50,000
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Custom design workflows, dedicated development, and multi-page layouts. Balanced execution for growing businesses requiring structured staging milestones, custom brand integration, and CRM or database connections.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <div>• Bespoke frontend design & responsive UI component systems</div>
                  <div>• Structured staging milestones & quality assurance reviews</div>
                  <div>• Multi-disciplinary project delivery team (designer, developer, PM)</div>
                </div>
              </div>

              {/* Category 3: Enterprise Consultancies */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <div className="font-plex-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Enterprise Bracket
                </div>
                <h4 className="font-plex-sans font-bold text-lg text-neutral-950 dark:text-white mb-1">
                  Enterprise Consultancies
                </h4>
                <div className="font-plex-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  ₹5,00,000+
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  End-to-end digital transformation delivered by large consultancies and multinational IT networks. Geared toward corporate enterprises requiring extensive multi-department governance, rigorous compliance audits, and dedicated enterprise support.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <div>• Multi-month discovery, compliance & architectural governance</div>
                  <div>• Enterprise service level agreements (SLAs) & dedicated support</div>
                  <div>• Multi-stakeholder integration & enterprise security compliance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subsection 2: India SEO & Search Marketing Retainer Benchmarks */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-plex-mono text-xs font-semibold text-[#16a34a] uppercase tracking-wider">
                Category Benchmark B
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <h3 className="font-plex-sans text-lg font-bold text-neutral-950 dark:text-white">
                India SEO & Search Marketing Monthly Retainers
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* SEO Tier 1: Entry / Local SEO */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <div className="font-plex-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Entry Search Bracket
                </div>
                <h4 className="font-plex-sans font-bold text-lg text-neutral-950 dark:text-white mb-1">
                  Entry / Local SEO
                </h4>
                <div className="font-plex-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  ₹15,000 – ₹30,000 <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ mo</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Focused local visibility programs centered on Google Business Profile optimization, local citation management, and foundational on-page technical fixes for single-location service businesses.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <div>• Single-location Map Pack tracking & GBP updates</div>
                  <div>• Local citation directory cleanup & NAP consistency</div>
                  <div>• Basic meta tag & on-page technical corrections</div>
                </div>
              </div>

              {/* SEO Tier 2: Growth / Competitive SEO */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <div className="font-plex-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Growth Search Bracket
                </div>
                <h4 className="font-plex-sans font-bold text-lg text-neutral-950 dark:text-white mb-1">
                  Growth / Competitive SEO
                </h4>
                <div className="font-plex-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  ₹35,000 – ₹75,000 <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ mo</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Multi-category competitive organic growth combining deep technical optimization, content cluster architecture, and structured schema implementation for regional or competitive markets.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <div>• Deep technical crawl audits & sub-second page tuning</div>
                  <div>• Pillar & cluster content publishing with internal links</div>
                  <div>• Semantic entity schema graphs & bi-weekly telemetry</div>
                </div>
              </div>

              {/* SEO Tier 3: Enterprise / National SEO */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <div className="font-plex-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Enterprise Search Bracket
                </div>
                <h4 className="font-plex-sans font-bold text-lg text-neutral-950 dark:text-white mb-1">
                  Enterprise / National SEO
                </h4>
                <div className="font-plex-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  ₹80,000 – ₹2,00,000+ <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ mo</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  National or multi-market search authority engineering featuring dedicated technical sprints, programmatic content architectures, and complex data attribution pipelines.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <div>• Dedicated technical SEO engineering & programmatic scale</div>
                  <div>• High-tier digital PR & authoritative citation syndication</div>
                  <div>• Multi-regional dominance & executive revenue attribution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Benchmark Sourcing Footnote */}
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#16a34a] shrink-0" aria-hidden="true" />
                <span>
                  <strong>Benchmark Methodology:</strong> Aggregated market brackets synthesized from published independent web development surveys, regional agency rate cards, and industry benchmarks across Indian metropolitan hubs.
                </span>
              </div>
              <Link
                href="/audit"
                className="shrink-0 text-[#16a34a] hover:underline font-plex-mono font-medium inline-flex items-center gap-1"
              >
                <span>Calculate your project scope →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: COMPREHENSIVE FAQ (4 SUB-CLUSTERS) */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 md:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="font-plex-mono text-xs uppercase tracking-wider text-[#16a34a] font-semibold mb-2">
              06 · Comprehensive Investment FAQs
            </div>
            <h2 className="font-plex-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Frequently Asked Questions About DigiXPro Pricing
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              20 authoritative answers covering commercial contracts, source code ownership, Next.js architecture economics, ongoing retainers, and fractional CTO advisory terms.
            </p>
          </div>

          {/* FAQ Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist" aria-label="FAQ Categories">
            <button
              type="button"
              onClick={() => setActiveFaqCategory("all")}
              className={`font-plex-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all min-h-[38px] ${
                activeFaqCategory === "all"
                  ? "bg-[#16a34a] text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              All FAQs (20)
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory("commercial")}
              className={`font-plex-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all min-h-[38px] ${
                activeFaqCategory === "commercial"
                  ? "bg-[#16a34a] text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Commercial Terms (5)
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory("design-build")}
              className={`font-plex-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all min-h-[38px] ${
                activeFaqCategory === "design-build"
                  ? "bg-[#16a34a] text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Design & Build (5)
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory("search-ai")}
              className={`font-plex-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all min-h-[38px] ${
                activeFaqCategory === "search-ai"
                  ? "bg-[#16a34a] text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Search, AI & Automation (5)
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory("advisory")}
              className={`font-plex-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all min-h-[38px] ${
                activeFaqCategory === "advisory"
                  ? "bg-[#16a34a] text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Advisory & Fractional CTO (5)
            </button>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.anchorId}
                  id={faq.anchorId}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-neutral-50/80 dark:hover:bg-neutral-900/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <span className="font-plex-mono text-[11px] text-[#16a34a] uppercase tracking-wider font-semibold block mb-1">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="font-plex-sans font-semibold text-base sm:text-lg text-neutral-950 dark:text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className="shrink-0 p-1 rounded-md text-neutral-400 dark:text-neutral-500">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 mt-1">
                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: "GET AN EXACT QUOTE" FINAL CTA PAIR */}
      {/* ========================================================================= */}
      <section id="quote-cta" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="font-plex-mono text-xs uppercase tracking-wider text-[#16a34a] font-semibold mb-2">
              07 · Next Steps &amp; Commercial Engagement
            </div>
            <h2 className="font-plex-sans text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Ready to Scope an Exact Architectural Quote?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Choose the path that fits your current evaluation stage. Get an instant automated systems audit or schedule a direct consultation with Dr. Ajay Shukla.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CTA 1: Automated Audit */}
            <div className="p-8 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-colors">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#16a34a]/10 border border-[#16a34a]/20 text-[#16a34a] font-plex-mono text-xs font-semibold mb-4">
                  <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Instant & Automated · Zero Sales Pressure</span>
                </div>
                <h3 className="font-plex-sans text-xl font-bold text-neutral-950 dark:text-white mb-2">
                  Request a Technical Architecture Audit
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Input your existing website URL and operational requirements. Receive an automated diagnostic report detailing technical SEO gaps, Core Web Vitals profiling, and a deterministic DigiXPro investment estimate within 90 seconds.
                </p>
              </div>
              <Link
                href="/audit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#16a34a] text-white font-semibold text-sm hover:bg-[#15803d] transition-colors shadow-xs min-h-[46px]"
              >
                <span>Request a Technical Architecture Audit</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* CTA 2: Architecture Call */}
            <div className="p-8 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-colors">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-plex-mono text-xs font-semibold mb-4">
                  <Cpu className="w-3.5 h-3.5 text-[#16a34a]" aria-hidden="true" />
                  <span>Direct Senior Technical Advisory</span>
                </div>
                <h3 className="font-plex-sans text-xl font-bold text-neutral-950 dark:text-white mb-2">
                  Book a 30-Minute Architecture Call
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Schedule a focused 30-minute technical evaluation directly with Dr. Ajay Shukla. Review your current technology stack, explore custom multi-service scopes, or discuss fractional CTO advisory terms without sales intermediaries.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold text-sm hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-xs min-h-[46px]"
              >
                <span>Book a 30-Minute Architecture Call</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
