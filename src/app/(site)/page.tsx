import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ProfessionalServiceSchema from "@/components/seo/ProfessionalServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu,
  Code2,
  Briefcase,
  FileText,
  Users,
  Database,
  Network,
  CheckCircle2,
  HelpCircle,
  Search,
  Globe,
  Bot,
  Zap,
  RefreshCw,
  MessageSquare,
  UserCheck,
  Layers,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Technology Consulting & Custom Web Systems Architecture | DigiXPro',
  description: 'DigiXPro provides independent technology consulting, IT advisory services, custom website engineering, and workflow automation for growing businesses.',
  keywords: [
    'technology consulting',
    'IT consulting services',
    'technology advisory',
    'technology strategy',
    'systems architecture',
    'custom website design',
    'web engineering',
    'SEO search visibility',
    'AI search optimization',
    'workflow automation'
  ],
  alternates: {
    canonical: 'https://www.digixpro.in',
  },
  openGraph: {
    title: 'Technology Consulting & Custom Web Systems Architecture | DigiXPro',
    description: 'Independent technology consulting and IT advisory firm providing custom website engineering, search visibility, and workflow automation.',
    url: 'https://www.digixpro.in',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Technology Consulting & IT Advisory',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology Consulting & Custom Web Systems Architecture | DigiXPro',
    description: 'Independent technology consulting and IT advisory firm providing custom website engineering and workflow automation.',
    images: ['/twitter-image.png'],
  },
};

export default function HomePage() {
  const faqItems = [
    {
      question: "What does DigiXPro actually do?",
      answer: "DigiXPro is an independent technology architecture and business systems advisory. Work spans three connected areas: Advisory (technology strategy, due diligence, fractional CTO leadership), Design & Build (websites and web systems engineered for growth, not just visual design), and Search, AI & Automation (SEO, AI search visibility, and workflow automation). Most clients start in one area and expand once the underlying systems are in place."
    },
    {
      question: "How is DigiXPro different from a typical web design or digital marketing agency?",
      answer: "A typical agency sells a deliverable — a website, a set of social posts, a monthly SEO report. DigiXPro starts from the business problem underneath the request: why isn't the website converting, why doesn't the CRM talk to the booking system, why does traffic exist but leads don't. The technology and design work that follows solves that root problem — this is why advisory and architecture sit alongside design and automation as equal, connected capabilities rather than upsells."
    },
    {
      question: "Who does DigiXPro typically work with?",
      answer: "Primarily growing businesses and founders — in India (particularly Delhi-NCR) and internationally across the US, UK, Australia, and Singapore — who have outgrown ad-hoc tools but aren't yet at the size where a large enterprise agency or full in-house technology team makes sense."
    },
    {
      question: "Do I need to know which service I need before reaching out?",
      answer: "No. The complimentary Systems Audit exists specifically for this — it takes a few minutes and identifies which service area (or combination) actually fits, rather than asking a visitor to self-diagnose first."
    },
    {
      question: "What's the difference between the Audit, the Investment Guide, and an Architecture Call?",
      answer: "The Audit diagnoses what's actually going on. The Investment Guide (/pricing) shows indicative investment ranges for every service, so there's budget context before any conversation. The Architecture Call is where an exact scope and final number get confirmed once real requirements are understood."
    },
    {
      question: "How do I get started?",
      answer: "The fastest path is the complimentary Systems Audit at /audit. For those who already know the service area and are ready to discuss scope, booking an Architecture Call is the more direct route."
    }
  ];

  return (
    <>
      <ProfessionalServiceSchema />
      <FAQSchema items={faqItems} />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 transition-colors duration-200">
        
        {/* ==========================================
            01 • HERO (FOUNDER POSITIONING LOCKED)
        ========================================== */}
        <section className="max-w-[1200px] mx-auto px-6 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full mb-6 md:mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                INDEPENDENT &bull; VENDOR-NEUTRAL &bull; EVIDENCE-DRIVEN
              </span>
            </div>
            
            <h1 className="hero-lcp-heading text-[40px] md:text-[68px] font-extrabold tracking-tight leading-[1.06] mb-6 md:mb-8 text-black dark:text-white">
              Independent Technology Architecture<br />
              <span className="text-[#16a34a]">&amp; Business Systems Advisory</span>
            </h1>
            
            <div className="border-l-4 border-[#16a34a] pl-4 md:pl-6 mb-8 md:mb-10">
              <p className="text-[18px] md:text-[23px] font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed mb-3">
                We diagnose how your business actually operates, design the system it needs, and help turn the right technology into a working business outcome.
              </p>
              <p className="text-[15px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
                From website engineering and search visibility to AI discovery and workflow automation, implementation follows the business diagnosis.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-4 bg-[#009E73] hover:bg-[#007a55] text-white font-bold text-[15px] md:text-[16px] rounded-xl shadow-md hover:shadow-lg transition-all min-h-[52px]"
              >
                Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] md:text-[15px] rounded-xl hover:border-neutral-500 dark:hover:border-neutral-400 hover:text-black dark:hover:text-white transition-colors min-h-[52px]"
              >
                Explore How We Work
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            02 • WHAT DIGIXPRO BUILDS / IMPLEMENTATION LAYERS
        ========================================== */}
        <section className="defer-below-fold py-24 bg-white dark:bg-[#0A0A0A] border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                IMPLEMENTATION LAYERS
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-4 leading-tight text-black dark:text-white">
                What DigiXPro Builds
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                One business problem. One architecture. The right implementation layers.
              </p>
            </div>

            {/* THREE STRATEGIC CAPABILITY BLOCKS */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* BLOCK 01 — ADVISORY */}
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-[#16a34a] transition-all">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-3">01 &bull; ADVISORY</div>
                  <h3 className="text-xl font-extrabold text-black dark:text-white mb-3">Business &amp; Technology Advisory</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Diagnose the business problem, map the operating reality, define the right system architecture, and establish a practical technology roadmap before major technology decisions are made.
                  </p>
                </div>
                <Link href="/advisory" className="inline-flex items-center text-xs font-bold text-[#16a34a] hover:underline pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  Explore Advisory &rarr;
                </Link>
              </div>

              {/* BLOCK 02 — DESIGN & BUILD */}
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border-2 border-[#16a34a] dark:border-[#16a34a] shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                      02 &bull; DESIGN &amp; BUILD
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase">Commercial Entry</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-black dark:text-white mb-3">Website Design &amp; Web Engineering</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Design and build business websites and web systems that support search visibility, lead capture, conversion and long-term digital growth.
                  </p>
                </div>
                <Link href="/design-services" className="inline-flex items-center text-xs font-bold text-white bg-[#0A0A0A] dark:bg-white dark:text-black px-4 py-2.5 rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors justify-center">
                  Explore Website Design &rarr;
                </Link>
              </div>

              {/* BLOCK 03 — SEARCH, AI & AUTOMATION */}
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-[#16a34a] transition-all">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-3">03 &bull; SEARCH, AI &amp; AUTOMATION</div>
                  <h3 className="text-xl font-extrabold text-black dark:text-white mb-3">Search Visibility, AI Discovery &amp; Automation</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Combine technical SEO, AI Search Optimization, workflow automation and AI systems to improve discoverability and connect digital operations with business processes.
                  </p>
                </div>
                <Link href="/search-automation" className="inline-flex items-center text-xs font-bold text-[#16a34a] hover:underline pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  Explore Search &amp; Automation &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            03 • EXPLORE BY BUSINESS NEED (8 CAPABILITIES)
        ========================================== */}
        <section className="defer-below-fold py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                EXPLORE OUR CAPABILITIES
              </div>
              <h2 className="text-[32px] md:text-[44px] font-extrabold mb-4 leading-tight text-black dark:text-white">
                Explore by Business Need, Not by Jargon
              </h2>
              <p className="text-[17px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Choose the area that matches your current priority. We&apos;ll help you understand what&apos;s really needed, without pushing unnecessary software or services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Website Design & Engineering",
                  desc: "Custom, scalable web platforms",
                  href: "/design-services",
                  icon: <Globe className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Website Redesign",
                  desc: "Modernize legacy web systems",
                  href: "/design-services/website-redesign",
                  icon: <RefreshCw className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "IT Consulting & Technology Strategy",
                  desc: "Independent architecture & IT direction",
                  href: "/advisory/it-consulting-technology-strategy",
                  icon: <Search className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "AI Search Optimization",
                  desc: "GEO, AEO & LLM discoverability",
                  href: "/search-automation/ai-search-optimization-geo",
                  icon: <Bot className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Workflow & AI Automation",
                  desc: "Connected multi-tool pipelines",
                  href: "/search-automation/workflow-ai-automation",
                  icon: <Zap className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Lead Capture & Sales Automation",
                  desc: "Instant routing & CRM OS",
                  href: "/search-automation/lead-capture-crm-sales-automation",
                  icon: <Network className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Technology Advisory",
                  desc: "Independent architecture review",
                  href: "/advisory",
                  icon: <Briefcase className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Technology Due Diligence & Vendor Evaluation",
                  desc: "Build-vs-buy & vendor risk assessment",
                  href: "/advisory/technology-due-diligence-vendor-evaluation",
                  icon: <FileText className="w-5 h-5 text-[#16a34a]" />
                }
              ].map((cap) => (
                <Link 
                  key={cap.title}
                  href={cap.href}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-[#16a34a] dark:hover:border-[#16a34a] hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-3">
                      {cap.icon}
                    </div>
                    <h3 className="text-[15px] font-bold text-black dark:text-white mb-1 group-hover:text-[#16a34a] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {cap.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-[#16a34a]">
                    Explore <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            04 • PROBLEM RECOGNITION ("Does this sound familiar?")
        ========================================== */}
        <section className="defer-below-fold py-20 bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                Operating Reality Check
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 text-black dark:text-white">
                Does this sound familiar?
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Technology is supposed to make your business faster. But right now, fragmented tools are creating operational bottlenecks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  text: "Core operations and communication running through WhatsApp groups and unstructured chat threads.",
                  icon: <MessageSquare className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  text: "Multiple spreadsheet versions of the truth created across teams, leading to reporting errors.",
                  icon: <Database className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  text: "CRM or ERP purchased with high expectations, but poorly adopted by employees.",
                  icon: <Users className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  text: "The founder personally involved in approving minor operational decisions and manual workarounds.",
                  icon: <UserCheck className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  text: "Wanting to leverage AI and automation, but unsure where it actually belongs safely.",
                  icon: <Cpu className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  text: "Website exists as a standalone digital card, completely disconnected from lead handling and business workflows.",
                  icon: <Globe className="w-5 h-5 text-[#16a34a]" />
                }
              ].map((problem, idx) => (
                <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm hover:border-[#16a34a]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                    {problem.icon}
                  </div>
                  <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">{problem.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center max-w-2xl mx-auto">
              <p className="text-[17px] md:text-[19px] font-bold text-black dark:text-white mb-6 leading-relaxed">
                If these problems sound familiar, the first step is not another software purchase. It is understanding how the business actually works.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors"
              >
                Discuss Your Business Bottlenecks <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            05 • SYSTEM CONNECTION ("How the Pieces Work Together")
        ========================================== */}
        <section className="defer-below-fold bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                System Connectivity
              </div>
              <h2 className="text-[32px] md:text-[44px] font-extrabold mb-6 leading-tight text-black dark:text-white">
                How the Pieces of Your Business Should Work Together
              </h2>
              <p className="text-[17px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                DigiXPro looks at the connections between these systems before recommending where technology or automation should be introduced.
              </p>
            </div>
            
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] p-10 md:p-14 shadow-sm overflow-hidden relative">
              <RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-neutral-200/40 dark:text-neutral-800/20 -z-0" />
              
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-10">
                {[
                  "Website",
                  "Leads",
                  "Sales",
                  "Operations",
                  "Finance",
                  "Reporting",
                  "Customer Experience"
                ].map((node, idx, arr) => (
                  <React.Fragment key={node}>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-5 py-3 rounded-xl font-mono font-bold text-[14px] md:text-[15px] text-black dark:text-white shadow-sm">
                      {node}
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="text-center mt-10 text-[14px] font-medium text-neutral-500 dark:text-neutral-400 relative z-10">
                Designed architecture ensures your digital presence and operations run as one connected system.
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            06 • NO GUESSWORK / METHOD
        ========================================== */}
        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                Methodology
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
                We Don&apos;t Guess.
              </h2>
              <p className="text-[18px] text-neutral-400 leading-relaxed">
                Systems are recommended after understanding the business first. Discovery starts with actual operating reality.
              </p>
            </div>

            <div className="max-w-2xl mx-auto relative">
              <div className="absolute top-0 bottom-0 left-[28px] w-0.5 bg-neutral-800 hidden md:block" />

              <div className="space-y-4">
                {[
                  "Founder discussions",
                  "Department conversations",
                  "Staff workflow observation",
                  "Existing software analysis",
                  "System blueprint definition",
                  "Independent recommendation"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <div className="text-sm md:text-base font-bold text-neutral-200">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/how-we-work"
                className="inline-flex items-center text-sm font-mono font-bold text-[#16a34a] hover:underline"
              >
                Learn More About Our Operating Blueprint &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            07 • WHAT YOU ACTUALLY GET / DELIVERABLES
        ========================================== */}
        <section className="defer-below-fold py-24 bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                TANGIBLE DELIVERABLES
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 text-black dark:text-white">
                What You Actually Receive
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Clear documentation, engineered assets, and system architectures delivered with full client ownership.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "System Architecture Blueprint", icon: <Layers className="w-5 h-5 text-[#16a34a]" />, desc: "Clear mapping of your business operating layers." },
                { title: "Custom Next.js & React Codebase", icon: <Code2 className="w-5 h-5 text-[#16a34a]" />, desc: "Clean web applications built for speed and security." },
                { title: "Technical SEO & Schema Plumbing", icon: <Search className="w-5 h-5 text-[#16a34a]" />, desc: "Built-in search indexability and JSON-LD schemas." },
                { title: "Automated Workflow Pipelines", icon: <Zap className="w-5 h-5 text-[#16a34a]" />, desc: "Production API webhooks connecting core software." },
                { title: "Top-Tier Core Web Vitals Performance", icon: <Cpu className="w-5 h-5 text-[#16a34a]" />, desc: "Fast Core Web Vitals metrics on desktop and mobile." },
                { title: "Machine-Readable AI Context", icon: <Sparkles className="w-5 h-5 text-[#16a34a]" />, desc: "Structured data and llms.txt for AI search discovery." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900 hover:border-[#16a34a]/40 transition-colors shadow-sm">
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
            08 • PRODUCTION EVIDENCE ("We Build What We Advise")
        ========================================== */}
        <section className="defer-below-fold py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                LIVE PROOF
              </div>
              <h2 className="text-[32px] md:text-[46px] font-extrabold mb-6 text-black dark:text-white">
                We Build What We Advise
              </h2>
              <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                The DigiXPro platform itself is built on the exact web engineering architecture we deliver for clients: decoupled Next.js static output, fast Core Web Vitals performance, automated JSON-LD schemas, and production n8n webhook lead routing.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-10">
                <Link href="/evidence/digixpro" className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group shadow-sm">
                  <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">CASE STUDY &bull; SYSTEM PROOF</div>
                  <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-2">DigiXPro Platform Architecture &rarr;</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Decoupled Next.js static site, automated schema generation, and n8n webhook routing.</p>
                </Link>

                <Link href="/evidence/360-neck-shoulder" className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group shadow-sm">
                  <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">CASE STUDY &bull; SERVICE HEALTHCARE</div>
                  <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-2">360 Neck &amp; Shoulder Diagnostic System &rarr;</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Healthcare discovery architecture, local search visibility, and structured patient enquiry flows.</p>
                </Link>
              </div>

              <Link href="/evidence" className="text-xs font-mono font-bold text-[#16a34a] hover:underline">
                Explore All Production Case Studies &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            09 • QUESTIONS BUSINESS OWNERS USUALLY ASK (FAQS)
        ========================================== */}
        <section className="defer-below-fold py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                BUYER QUESTIONS &amp; OBJECTIONS
              </div>
              <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
                Questions Business Owners Usually Ask
              </h2>
              <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Clear answers regarding technology advisory, website engineering, search visibility, and workflow automation.
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
            10 • FINAL PHILOSOPHY / TRUST
        ========================================== */}
        <section className="defer-below-fold py-20 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6 text-center max-w-3xl">
            <ShieldCheck className="w-10 h-10 text-[#16a34a] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white mb-4">
              Vendor-Neutral Advisory &amp; Architecture
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              We do not accept software kickbacks or push proprietary platform lock-ins. Every architectural blueprint and technology choice is selected solely for your business operational reality and growth goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-neutral-500 font-semibold">
              <span>&bull; 100% Client Codebase Ownership</span>
              <span>&bull; Zero Commission Incentives</span>
              <span>&bull; Empirical Verification</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            11 • 30-MINUTE ARCHITECTURE CALL (FINAL CONVERSION CTA)
        ========================================== */}
        <section className="defer-below-fold py-20 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
            <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
              COMMERCIAL DISCOVERY
            </span>
            <h2 className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
              Ready to Discuss Your Business Technology Architecture?
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a 30-minute discovery call with our leadership to evaluate your operating bottlenecks, current software stack, and growth goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#16a34a] text-white font-bold text-[15px] rounded-xl hover:bg-[#15803d] transition-colors shadow-md min-h-[52px]"
              >
                Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              {/* PHASE 25 (Part 5/6 funnel gap): the homepage's final CTA
                  never linked to /pricing. */}
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
    </>
  );
}
