import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ProfessionalServiceSchema from "@/components/seo/ProfessionalServiceSchema";
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { services } from '@/data/services';
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu,
  Code2,
  Briefcase,
  FileText,
  Map,
  XCircle,
  MessageSquareWarning,
  Eye,
  RefreshCw,
  Users,
  Settings,
  Database,
  Network,
  Palette
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Independent IT Consulting & Business Process Automation | DigiXPro',
  description: 'Independent IT consulting services, business process automation, fractional CTO advisory, and modern web design systems for growing enterprises. Technology Architecture Advisory by DigiXPro.',
  alternates: {
    canonical: 'https://www.digixpro.in',
    languages: {
      en: 'https://www.digixpro.in/',
      hi: 'https://www.digixpro.in/hi',
      'x-default': 'https://www.digixpro.in/',
    },
  },
  openGraph: {
    title: 'Independent IT Consulting & Business Process Automation | DigiXPro',
    description: 'Independent IT consulting services, business process automation, and technology architecture advisory for growing organizations.',
    url: 'https://www.digixpro.in',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Independent IT Consulting & Business Process Automation',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Independent IT Consulting & Business Process Automation | DigiXPro',
    description: 'Independent IT consulting services, business process automation, and technology architecture advisory.',
    images: ['/twitter-image.png'],
  },
};

export default function HomePage() {
  const techServices = services.filter((s) => s.track === 'tech');
  const designServices = services.filter((s) => s.track === 'design');

  return (
    <>
      <ProfessionalServiceSchema />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 transition-colors duration-200">
        
        {/* ==========================================
            1. HERO SECTION (UPDATED VALIDATED KEYWORD HEADLINE)
        ========================================== */}
        <section className="max-w-[1200px] mx-auto px-6 pt-10 md:pt-16 pb-12 md:pb-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full mb-6 md:mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                Technology Architecture Advisory &bull; Independent &bull; Vendor-Neutral
              </span>
            </div>
            
            <h1 className="hero-lcp-heading text-[40px] md:text-[72px] font-extrabold tracking-tight leading-[1.05] mb-6 md:mb-8 text-black dark:text-white">
              Independent IT Consulting &amp;<br />
              <span className="text-[#16a34a]">Business Process Automation.</span>
            </h1>
            
            <div className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 md:pl-6 mb-8 md:mb-12">
              <p className="text-[18px] md:text-[24px] font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed mb-2">
                Your business is growing. Your operations aren&apos;t.
              </p>
              <p className="text-[16px] md:text-[19px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
                Before you buy another CRM, ERP, or AI tool... make sure you&apos;re solving the right problem. We design business operating systems before you spend money on software.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] md:text-[16px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
              >
                Request a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/evidence"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] md:text-[15px] rounded-xl hover:border-neutral-500 dark:hover:border-neutral-400 hover:text-black dark:hover:text-white transition-colors min-h-[52px]"
              >
                View Our Evidence
              </Link>
            </div>
          </div>
        </section>        {/* ==========================================
            2. WHAT WE BUILD (DIGIXPRO CAPABILITY STACK & SERVICE PILLARS)
        ========================================== */}
        <section className="defer-below-fold py-24 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                What DigiXPro Builds
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
                Our System Capability Stack
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                From initial strategic diagnosis to production web engineering, search visibility, and automated lead capture.
              </p>
            </div>

            {/* PLAIN-LANGUAGE CAPABILITY OVERVIEW GRID */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">01 &bull; Advisory Layer</div>
                  <h3 className="text-lg font-extrabold text-black dark:text-white mb-2">Business &amp; Technology Advisory</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">Diagnose operational friction, evaluate software stacks, and define vendor-neutral systems before purchasing licenses.</p>
                </div>
                <Link href="/services/it-consulting-services" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800">Explore IT Advisory <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">02 &bull; Engineering Layer</div>
                  <h3 className="text-lg font-extrabold text-black dark:text-white mb-2">Custom Web Engineering</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">Build Next.js web applications engineered as high-converting business, technical SEO, and lead capture infrastructure.</p>
                </div>
                <Link href="/services/website-design-services" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800">Explore Web Engineering <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">03 &bull; Search Layer</div>
                  <h3 className="text-lg font-bold text-white dark:text-white text-black mb-2">SEO &amp; Search Visibility</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">Capture conventional search demand with sub-second page performance, canonical structure, and clean semantic architecture.</p>
                </div>
                <Link href="/services/website-design-services" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800">Explore Technical SEO <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">04 &bull; AI Discovery Layer</div>
                  <h3 className="text-lg font-extrabold text-black dark:text-white mb-2">AI Search Optimization (AIO/GEO/LLMO)</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">Structure entity metadata, root llms.txt context, and answer-oriented content for machine-readable discovery across AI engines.</p>
                </div>
                <Link href="/services/ai-consulting-services" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800">Explore AI Discovery <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">05 &bull; Automation Layer</div>
                  <h3 className="text-lg font-extrabold text-black dark:text-white mb-2">AI &amp; Workflow Automation</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">Connect web lead forms, CRM platforms, and operational workflows via production n8n webhooks to eliminate manual errors.</p>
                </div>
                <Link href="/services/ai-automation-agency" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800">Explore Automation Agency <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">06 &bull; Conversion Layer</div>
                  <h3 className="text-lg font-extrabold text-black dark:text-white mb-2">Conversion &amp; Lead Architecture</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">Turn organic search traffic into qualified 30-minute discovery conversations routed directly to executive leadership.</p>
                </div>
                <Link href="/services/business-process-automation" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800">Explore Business Automation <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </div>
            </div>

            <div className="space-y-16">
              {/* Technology Advisory Track Grid (6 Cards) */}
              <div>
                <div className="flex items-center space-x-3 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <Cpu className="w-6 h-6 text-[#16a34a]" />
                  <h3 className="text-2xl font-extrabold text-black dark:text-white">Technology Advisory Track</h3>
                  <span className="text-xs font-mono bg-emerald-50 dark:bg-emerald-950/50 text-[#16a34a] px-2.5 py-1 rounded-full font-bold uppercase border border-emerald-200 dark:border-emerald-800">6 Core Pillars</span>
                </div>
              </div>

              {/* Design Track Grid (3 Cards — PROMINENT & EQUAL PRIORITY STYLING) */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-2xl font-extrabold text-black dark:text-white">Design &amp; Digital Experience Track</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            3. TYPICAL PROBLEMS
        ========================================== */}
        <section className="defer-below-fold py-24 max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 text-black dark:text-white">Does this sound familiar?</h2>
            <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
              Technology is supposed to make your business faster. But right now, it is doing the exact opposite.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              "Your team is running core operations on WhatsApp groups.",
              "Excel sheets are everywhere, with 10 different versions of truth.",
              "You bought a CRM, but nobody actually uses it.",
              "The founder is involved in every minor operational decision.",
              "You want to use AI, but don't know where to safely start.",
              "Your website exists, but the business runs completely disconnected from it."
            ].map((problem, idx) => (
              <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm">
                <XCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-neutral-800 dark:text-neutral-200">{problem}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[20px] font-bold text-black dark:text-white mb-6">If these sound familiar, we should talk.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold text-[16px] rounded-xl hover:border-black dark:hover:border-white transition-colors"
            >
              Discuss Your Bottlenecks <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>

        {/* ==========================================
            4. HOW YOUR SYSTEMS CONNECT (UPDATED SECTION TITLE FROM "WHAT WE ACTUALLY DESIGN")
        ========================================== */}
        <section className="defer-below-fold bg-neutral-50 dark:bg-neutral-900/50 py-24 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                System Connectivity
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
                How Your Systems Connect.
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We don&apos;t build isolated apps. We map and architect the complete operational model of your business so data flows seamlessly across one connected operating system.
              </p>
            </div>
            
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] p-10 md:p-16 shadow-sm overflow-hidden relative">
              <RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-neutral-200/50 dark:text-neutral-800/30 -z-0" />
              
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                {[
                  "Sales & Leads",
                  "Operations Workflow",
                  "Finance & Billing",
                  "Reporting Dashboard",
                  "Customer Experience"
                ].map((node, idx, arr) => (
                  <React.Fragment key={node}>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-xl font-mono font-bold text-[15px] text-black dark:text-white shadow-sm">
                      {node}
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-neutral-400 dark:text-neutral-600 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="text-center mt-12 text-[14px] font-medium text-neutral-500 dark:text-neutral-400 relative z-10">
                The designed architecture runs the business like one continuous, self-reinforcing loop.
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. DISCOVERY PHILOSOPHY (NO GUESSWORK)
        ========================================== */}
        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
                No Guesswork.
              </h2>
              <p className="text-[18px] text-neutral-400">
                Systems are never recommended without understanding the business first. Discovery is not just an interview; every engagement starts by seeing the actual operational reality.
              </p>
            </div>

            <div className="max-w-2xl mx-auto relative">
              <div className="absolute top-0 bottom-0 left-[28px] w-0.5 bg-neutral-800 hidden md:block" />

              <div className="space-y-4">
                {[
                  { title: "Diagnose actual operational friction points", icon: <XCircle className="w-5 h-5 text-neutral-400 mr-3 shrink-0" /> },
                  { title: "Map current human, process, and information flows", icon: <Map className="w-5 h-5 text-neutral-400 mr-3 shrink-0" /> },
                  { title: "Identify high-leverage automation opportunities", icon: <Cpu className="w-5 h-5 text-neutral-400 mr-3 shrink-0" /> },
                  { title: "Design the target system architecture", icon: <Briefcase className="w-5 h-5 text-neutral-400 mr-3 shrink-0" /> },
                  { title: "Define vendor-neutral software requirements", icon: <ShieldCheck className="w-5 h-5 text-neutral-400 mr-3 shrink-0" /> },
                  { title: "Deliver a production-ready system blueprint", icon: <FileText className="w-5 h-5 text-[#16a34a] mr-3 shrink-0" /> }
                ].map((step, idx) => (
                  <div key={step.title} className="flex items-center relative">
                    <div className={`w-14 h-14 border rounded-full flex items-center justify-center font-mono font-bold shrink-0 z-10 hidden md:flex ${
                      idx >= 5 
                        ? 'bg-[#16a34a]/10 border-[#16a34a] text-[#16a34a]' 
                        : 'bg-neutral-900 border-neutral-700 text-neutral-500'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div className={`md:ml-8 border p-5 md:p-6 rounded-2xl flex-1 flex items-center ${
                      idx >= 5 
                        ? 'bg-[#16a34a]/5 border-[#16a34a]/30' 
                        : 'bg-neutral-900/50 border-neutral-800'
                    }`}>
                      {step.icon}
                      <span className={`text-[17px] md:text-[18px] font-bold ${
                        idx >= 5 ? 'text-[#16a34a]' : 'text-white'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. DELIVERABLES (WHAT YOU ACTUALLY GET)
        ========================================== */}
        <section className="defer-below-fold py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-10 rounded-[32px] border border-neutral-200 dark:border-neutral-800">
                <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                  Outcomes
                </div>
                <h2 className="text-[32px] font-extrabold mb-8 text-black dark:text-white">
                  What You Actually Get
                </h2>
                <p className="text-[16px] text-neutral-600 dark:text-neutral-400 mb-8">
                  Concrete intelligence for running your business. Every engagement produces clear deliverables:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                  {[
                    "Process Flow Diagrams",
                    "Target Architecture Map",
                    "Software Selection Matrix",
                    "Implementation Roadmap",
                    "Automation Blueprints",
                    "Data Governance Model"
                  ].map((item) => (
                    <li key={item} className="flex items-start text-[14px] font-bold text-neutral-800 dark:text-neutral-200">
                      <FileText className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 md:p-10">
                <h2 className="text-[40px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6 text-black dark:text-white">
                  Implementation is optional.<br />
                  <span className="text-[#16a34a]">Good architecture isn&apos;t.</span>
                </h2>
                <p className="text-[18px] text-neutral-600 dark:text-neutral-400 mb-8">
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
            7. ULTIMATE ROI (3 BENEFIT CARDS)
        ========================================== */}
        <section className="defer-below-fold max-w-[1200px] mx-auto px-6 py-24">
          <div className="mb-16 max-w-3xl">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              Ultimate ROI
            </div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
              Prevent expensive technology mistakes before they happen.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8">
              <h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Eliminate Waste</h3>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Stop spending on duplicate software, mismatched CRMs, and wrong AI investments. Technology is aligned to actual operational reality.</p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8">
              <h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Remove Manual Work</h3>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Lead handling, customer onboarding, reporting, and team workflows become automated, connected pipelines.</p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8">
              <h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">End Founder Dependency</h3>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Design role hierarchies, internal approvals, and structured knowledge bases so the business scales without you constantly intervening.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            8. EVIDENCE PHILOSOPHY 
        ========================================== */}
        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <ShieldCheck className="w-12 h-12 text-[#16a34a] mx-auto mb-6" />
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
              Claims backed by production evidence.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/evidence/buy-secondhand-book" className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">Buy Second Hand Books Architecture</Link>
              <Link href="/evidence/scan-centre" className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">Scan Centre Diagnostic Network</Link>
              <Link href="/evidence/sattvaos" className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">SattvaOS Operating System</Link>
              <Link href="/evidence/nirvandham" className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">Nirvandham Decoupled Media Platform</Link>
              <Link href="/evidence/muktibodh" className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#16a34a] hover:text-[#16a34a] rounded-lg text-sm font-mono text-neutral-300 transition-colors">Muktibodh Publishing Architecture</Link>
            </div>
            <div className="mt-12">
              <Link href="/evidence" className="inline-flex items-center text-[#16a34a] font-bold hover:text-white transition-colors">
                Review Full Case Study Evidence <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            9. THE CLOSING PHILOSOPHY 
        ========================================== */}
        <section className="defer-below-fold bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                Our Core Philosophy
              </div>
              <h2 className="text-[32px] md:text-[40px] font-extrabold mb-6 text-black dark:text-white">Technology is never the starting point. It is the outcome of understanding the business.</h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 font-medium">
                DigiXPro never starts with software. This is our non-negotiable architectural order.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-8">
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
            10. BOTTOM CTA
        ========================================== */}
        <section className="defer-below-fold max-w-[1200px] mx-auto px-6 py-24">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 md:p-16 rounded-[32px] text-center shadow-lg">
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
              Ready to design your operational system?
            </h2>
            <p className="text-[18px] text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
              Let&apos;s discuss your workflows, operational bottlenecks, and technology architecture before you make expensive commitments. Fill out the qualification form to request a 30-minute discovery call.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[16px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md"
            >
              Request a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>

      </div>
      <DeferredStickyMobileCTA />
    </>
  );
}
