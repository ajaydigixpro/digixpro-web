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
  Settings,
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
  UserCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Independent Technology Architecture & Business Systems Advisory | DigiXPro',
  description: 'Independent technology architecture, business systems advisory, custom web engineering, search visibility, AI discovery, and workflow automation by DigiXPro.',
  alternates: {
    canonical: 'https://www.digixpro.in',
    languages: {
      en: 'https://www.digixpro.in/',
      hi: 'https://www.digixpro.in/hi',
      'x-default': 'https://www.digixpro.in/',
    },
  },
  openGraph: {
    title: 'Independent Technology Architecture & Business Systems Advisory | DigiXPro',
    description: 'Independent technology architecture, business systems advisory, custom web engineering, search visibility, AI discovery, and workflow automation.',
    url: 'https://www.digixpro.in',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Independent Technology Architecture & Business Systems Advisory',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Independent Technology Architecture & Business Systems Advisory | DigiXPro',
    description: 'Independent technology architecture, business systems advisory, and modern web engineering.',
    images: ['/twitter-image.png'],
  },
};

export default function HomePage() {
  const faqItems = [
    {
      question: "Do I need a new website, or is my existing website the real problem?",
      answer: "We diagnose before prescribing. We evaluate your current website's underlying code, performance, conversion paths, and search architecture to determine whether a targeted redesign, complete rebuild, or content/SEO optimization is the right strategic move."
    },
    {
      question: "Can DigiXPro help if I already have a CRM, ERP or other software?",
      answer: "Yes. DigiXPro provides vendor-neutral architecture advisory. We inspect your existing software stack to eliminate duplicate subscriptions, fix data silos, and integrate tools into one cohesive operating system rather than pushing unnecessary replacements."
    },
    {
      question: "What does a 30-minute architecture call actually cover?",
      answer: "The call is a direct technical discovery conversation with leadership. We discuss your operational bottlenecks, current software setup, search visibility, and desired business outcomes to determine whether advisory, web engineering, automation, or custom architecture is the appropriate next step."
    },
    {
      question: "Can you help us identify where AI or automation would actually save time?",
      answer: "We evaluate your human, data, and operational workflows process-first to pinpoint high-leverage automation opportunities. We implement production webhooks and AI discovery layers only where they deliver measurable time savings and eliminate manual errors."
    },
    {
      question: "Do I need SEO if my website is being redesigned?",
      answer: "Yes. Technical search architecture, semantic HTML5 structure, and canonical integrity must be built into the web application during design and engineering. Retrofitting SEO after a redesign risks severe keyword ranking drops and broken URLs."
    },
    {
      question: "What if I already have an internal technical team?",
      answer: "DigiXPro acts as an independent system architect and decision-support advisor. We deliver the operating blueprint, software selection matrices, and implementation roadmaps, allowing your internal team or external partners to execute with clarity."
    },
    {
      question: "Why is my website getting visitors but not enough enquiries?",
      answer: "We evaluate your site's positioning, message-to-market fit, user journey, and conversion architecture. Often, traffic isn't the issue — the bottleneck is an unclear value proposition, weak call-to-actions, or a disconnected conversion pathway."
    },
    {
      question: "How do we know what should be fixed first?",
      answer: "Every engagement produces a prioritized technology roadmap. We sequence initiatives based on operational friction, revenue impact, technical dependencies, and immediate business ROI."
    }
  ];

  return (
    <>
      <ProfessionalServiceSchema />
      <FAQSchema items={faqItems} />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 transition-colors duration-200">
        
        {/* ==========================================
            SECTION 1 — HERO (FOUNDER POSITIONING LOCKED)
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
                className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] md:text-[16px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
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
            SECTION 2 — PROBLEM RECOGNITION ("Does this sound familiar?")
        ========================================== */}
        <section className="defer-below-fold py-20 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
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
                <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm hover:border-[#16a34a]/40 transition-colors">
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
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold text-[15px] rounded-xl hover:border-black dark:hover:border-white transition-colors"
              >
                Discuss Your Business Bottlenecks <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 3 — WHAT DIGIXPRO BUILDS (THREE STRATEGIC CAPABILITY BLOCKS)
        ========================================== */}
        <section className="defer-below-fold py-24 bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800">
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

              {/* BLOCK 02 — DESIGN & BUILD (VISUALLY PROMINENT & MAJOR COMMERCIAL ENTRY POINT) */}
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
                <Link href="/services/website-design-services" className="inline-flex items-center text-xs font-bold text-white bg-[#0A0A0A] dark:bg-white dark:text-black px-4 py-2.5 rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors justify-center">
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
                <Link href="/services/ai-automation-agency" className="inline-flex items-center text-xs font-bold text-[#16a34a] hover:underline pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  Explore Search &amp; Automation &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 4 — EXPLORE OUR CAPABILITIES
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
                  href: "/services/website-design-services",
                  icon: <Globe className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Website Redesign",
                  desc: "Modernize legacy web systems",
                  href: "/services/website-design-services",
                  icon: <RefreshCw className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Technical SEO",
                  desc: "Crawlability & search architecture",
                  href: "/services/website-design-services",
                  icon: <Search className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "AI Search Optimization",
                  desc: "GEO, AEO & LLM discoverability",
                  href: "/services/ai-consulting-services",
                  icon: <Bot className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "AI & Workflow Automation",
                  desc: "Connected multi-tool pipelines",
                  href: "/services/ai-automation-agency",
                  icon: <Zap className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Business Process Automation",
                  desc: "Eliminate manual team overhead",
                  href: "/services/business-process-automation",
                  icon: <Network className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Technology Advisory",
                  desc: "Independent architecture review",
                  href: "/advisory",
                  icon: <Briefcase className="w-5 h-5 text-[#16a34a]" />
                },
                {
                  title: "Lead Generation & Conversion Systems",
                  desc: "Conversion pathway architecture",
                  href: "/services/website-design-services",
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
            SECTION 5 — HOW THE SYSTEM CONNECTS
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
            SECTION 6 — OUR METHOD ("We Don't Guess.")
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
                Systems are never recommended without understanding the business first. Discovery starts with actual operating reality.
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
                  "Pain points & bottlenecks",
                  "Architecture blueprint",
                  "Technology roadmap"
                ].map((step, idx) => (
                  <div key={step} className="flex items-center relative">
                    <div className={`w-14 h-14 border rounded-full flex items-center justify-center font-mono font-bold shrink-0 z-10 hidden md:flex ${
                      idx >= 5 
                        ? 'bg-[#16a34a]/10 border-[#16a34a] text-[#16a34a]' 
                        : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div className={`md:ml-8 border p-5 md:p-6 rounded-2xl flex-1 flex items-center ${
                      idx >= 5 
                        ? 'bg-[#16a34a]/5 border-[#16a34a]/30' 
                        : 'bg-neutral-900/50 border-neutral-800'
                    }`}>
                      <span className={`text-[17px] md:text-[18px] font-bold ${
                        idx >= 5 ? 'text-[#16a34a]' : 'text-white'
                      }`}>
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 7 — WHAT THE CLIENT ACTUALLY GETS
        ========================================== */}
        <section className="defer-below-fold py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-10 rounded-[32px] border border-neutral-200 dark:border-neutral-800">
                <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                  Tangible Deliverables
                </div>
                <h2 className="text-[32px] font-extrabold mb-6 text-black dark:text-white">
                  What You Actually Get
                </h2>
                <p className="text-[16px] text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Concrete intelligence for running your business. Every engagement produces clear deliverable assets:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                  {[
                    "Operating System Blueprint",
                    "Decision Rationale",
                    "Technology Roadmap",
                    "Implementation Strategy",
                    "CRM / ERP Recommendations",
                    "Process Automation Plan",
                    "AI Opportunity Assessment",
                    "Risk / Audit Report",
                    "Data Governance Notes"
                  ].map((item) => (
                    <li key={item} className="flex items-start text-[14px] font-bold text-neutral-800 dark:text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 md:p-10">
                <h2 className="text-[38px] md:text-[54px] font-extrabold leading-[1.1] tracking-tight mb-6 text-black dark:text-white">
                  Implementation is optional.<br />
                  <span className="text-[#16a34a]">Good architecture isn&apos;t.</span>
                </h2>
                <p className="text-[18px] text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  No matter who executes the implementation, the architecture remains useful. Choose your own studio, build internally, or work with an external partner.
                </p>
                <Link 
                  href="/how-we-work" 
                  className="inline-flex items-center text-[16px] font-bold text-black dark:text-white border-b border-black dark:border-white pb-1 hover:text-[#16a34a] dark:hover:text-[#16a34a] hover:border-[#16a34a] transition-colors"
                >
                  See How We Work <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 8 — FAQ / PINPOINT BUYER QUESTIONS
        ========================================== */}
        <section className="defer-below-fold py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                Buyer Objections &amp; Intent
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
                Questions Business Owners Usually Ask
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Before choosing a technology partner, these are the questions that usually matter.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-black dark:text-white mb-4 flex items-start">
                      <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 9 — PRODUCTION EVIDENCE ("We Build What We Advise.")
        ========================================== */}
        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <ShieldCheck className="w-12 h-12 text-[#16a34a] mx-auto mb-6" />
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              Live Proof System
            </div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
              We Build What We Advise.
            </h2>
            <p className="text-[18px] text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              DigiXPro&apos;s own platform is a live example of the architecture we recommend: business-led system design, web engineering, search visibility, AI-discovery architecture and automated lead handling working together.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link href="/evidence/buy-secondhand-book" className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-xl text-sm font-mono text-neutral-300 transition-colors">
                Multi-Vendor E-Commerce Platform Architecture
              </Link>
              <Link href="/evidence/scan-centre" className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-xl text-sm font-mono text-neutral-300 transition-colors">
                Healthcare Diagnostic Discovery Network
              </Link>
              <Link href="/evidence/sattvaos" className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-xl text-sm font-mono text-neutral-300 transition-colors">
                Enterprise Operating System (SattvaOS)
              </Link>
              <Link href="/evidence/nirvandham" className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">
                Decoupled High-Throughput Media Platform
              </Link>
              <Link href="/evidence/muktibodh" className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">
                Publishing &amp; Content System (Muktibodh)
              </Link>
            </div>

            <Link href="/evidence" className="inline-flex items-center text-[#16a34a] font-bold text-[16px] hover:text-white transition-colors">
              Explore DigiXPro Evidence &rarr;
            </Link>
          </div>
        </section>

        {/* ==========================================
            SECTION 10 — CORE PHILOSOPHY
        ========================================== */}
        <section className="defer-below-fold bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                Core Differentiator
              </div>
              <h2 className="text-[32px] md:text-[40px] font-extrabold mb-6 text-black dark:text-white">
                Technology Is Never the Starting Point.
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 font-medium">
                It is the outcome of understanding the business.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-4">
              {[
                { name: "Business", icon: <Briefcase className="w-6 h-6 mb-2" /> },
                { name: "People", icon: <Users className="w-6 h-6 mb-2" /> },
                { name: "Process", icon: <Settings className="w-6 h-6 mb-2" /> },
                { name: "Information", icon: <Database className="w-6 h-6 mb-2" /> },
                { name: "Automation", icon: <Network className="w-6 h-6 mb-2" /> },
                { name: "Technology", icon: <Cpu className="w-6 h-6 mb-2" /> },
                { name: "Software", icon: <Code2 className="w-6 h-6 mb-2 text-[#16a34a]" /> },
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center min-w-[110px] p-4 rounded-xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <div className="text-neutral-500 dark:text-neutral-400">{step.icon}</div>
                    <span className={`font-bold text-[15px] ${idx === arr.length - 1 ? 'text-[#16a34a]' : 'text-black dark:text-white'}`}>
                      {step.name}
                    </span>
                  </div>
                  {idx !== arr.length - 1 && (
                    <div className="hidden md:block text-neutral-300 dark:text-neutral-700">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                  {idx !== arr.length - 1 && (
                    <div className="md:hidden text-neutral-300 dark:text-neutral-700 my-2 rotate-90">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 11 — FINAL CONVERSION (ONE STRONG CONVERSION BLOCK)
        ========================================== */}
        <section className="defer-below-fold max-w-[1200px] mx-auto px-6 py-24">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-10 md:p-16 rounded-[32px] text-center shadow-lg">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              Executive Discovery Call
            </div>
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
              Have a Business Problem You Need to Solve?
            </h2>
            <p className="text-[17px] md:text-[18px] text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Bring us your current situation, existing systems and desired outcome. The first 30 minutes are used to understand the problem and determine whether the right next step is advisory, web engineering, search visibility, AI/automation, system architecture or another suitable engagement.
            </p>
            <div className="mb-8">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[16px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md"
              >
                Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              No sales pitch. We diagnose first, then recommend the appropriate next step.
            </p>
          </div>
        </section>

      </div>
      <DeferredStickyMobileCTA />
    </>
  );
}
