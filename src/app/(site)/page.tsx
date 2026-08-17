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
        <section className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-28 pb-16 md:pb-20">
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
        </section>

        {/* ==========================================
            2. WHAT WE BUILD (OUR 8 SERVICE PILLARS — MOVED IMMEDIATELY AFTER HERO)
        ========================================== */}
        <section className="defer-below-fold py-24 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                What We Build
              </div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
                Our Service Pillars &amp; System Capabilities
              </h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Explore our structured technology advisory and digital experience design pillars.
              </p>
            </div>

            <div className="space-y-16">
              {/* Technology Advisory Track Grid (6 Cards) */}
              <div>
                <div className="flex items-center space-x-3 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <Cpu className="w-6 h-6 text-[#16a34a]" />
                  <h3 className="text-2xl font-extrabold text-black dark:text-white">Technology Advisory Track</h3>
                  <span className="text-xs font-mono bg-emerald-50 dark:bg-emerald-950/50 text-[#16a34a] px-2.5 py-1 rounded-full font-bold uppercase border border-emerald-200 dark:border-emerald-800">6 Core Pillars</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techServices.map((service) => (
                    <div key={service.slug} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#16a34a] transition-all shadow-sm">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded uppercase tracking-wider mb-3 inline-block border border-emerald-200 dark:border-emerald-800">
                          {service.category}
                        </span>
                        <h4 className="text-lg font-extrabold text-black dark:text-white mb-2 group-hover:text-[#16a34a] transition-colors">{service.title}</h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">{service.shortDesc}</p>
                      </div>
                      <Link href={`/services/${service.slug}`} className="inline-flex items-center text-xs font-bold text-black dark:text-neutral-200 group-hover:text-[#16a34a] transition-colors pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        Explore Service Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Track Grid (2 Cards — PROMINENT & EQUAL PRIORITY STYLING) */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <Palette className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <h3 className="text-2xl font-extrabold text-black dark:text-white">Design &amp; Digital Experience Track</h3>
                  </div>
                  <span className="text-xs font-mono bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full font-bold uppercase border border-amber-200 dark:border-amber-800">
                    2 Core Pillars &bull; Systems &amp; Identity
                  </span>
                </div>
                
                {/* Prominent 2-card layout with wider padding and structured border highlight */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                  {designServices.map((service) => (
                    <div key={service.slug} className="bg-white dark:bg-neutral-900 border-2 border-neutral-200/80 dark:border-neutral-800 p-8 rounded-3xl flex flex-col justify-between group hover:border-amber-500 dark:hover:border-amber-500 transition-all shadow-md">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded uppercase tracking-wider border border-amber-200 dark:border-amber-800">
                            {service.category}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 font-bold uppercase">Design Pillar</span>
                        </div>
                        <h4 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{service.title}</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">{service.shortDesc}</p>
                      </div>
                      <Link href={`/services/${service.slug}`} className="inline-flex items-center text-xs font-bold text-black dark:text-neutral-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        Explore Design Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  ))}
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
                  "Website", "Leads", "CRM", "WhatsApp", "Sales", "Billing", "Support", "Knowledge", "Analytics"
                ].map((node, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-xl font-mono font-bold text-[15px] text-black dark:text-white shadow-sm flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition-colors cursor-default">
                      {node}
                    </div>
                    {idx !== arr.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-neutral-400 dark:text-neutral-600 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="text-center mt-12 text-[14px] font-medium text-neutral-500 dark:text-neutral-400 relative z-10">
                Designed architecture ensures your business operates as a continuous, self-feeding loop.
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. WE DON'T GUESS
        ========================================== */}
        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">We Don&apos;t Guess.</h2>
              <p className="text-[18px] text-neutral-400">
                We don&apos;t recommend systems without understanding your business. Discovery isn&apos;t just an interview. Every engagement starts with observing actual operational reality.
              </p>
            </div>

            <div className="max-w-2xl mx-auto relative">
              <div className="absolute top-0 bottom-0 left-[28px] w-0.5 bg-neutral-800 hidden md:block"></div>
              <div className="space-y-4">
                {[
                  { title: "Founder Discussions", icon: <MessageSquareWarning className="w-5 h-5 mr-3 text-neutral-400" /> },
                  { title: "Department Meetings", icon: <Users className="w-5 h-5 mr-3 text-neutral-400" /> },
                  { title: "Observing Staff Workflows", icon: <Eye className="w-5 h-5 mr-3 text-neutral-400" /> },
                  { title: "Analyzing Existing Software", icon: <Code2 className="w-5 h-5 mr-3 text-neutral-400" /> },
                  { title: "Pain Points & Bottlenecks", icon: <XCircle className="w-5 h-5 mr-3 text-neutral-400" /> },
                  { title: "Architecture Blueprint", icon: <Network className="w-5 h-5 mr-3 text-[#16a34a]" /> },
                  { title: "Technology Roadmap", icon: <Map className="w-5 h-5 mr-3 text-[#16a34a]" /> }
                ].map((step, idx, arr) => (
                  <div key={idx} className="flex items-center relative">
                    <div className={`w-14 h-14 border rounded-full flex items-center justify-center font-mono font-bold shrink-0 z-10 hidden md:flex ${idx >= arr.length - 2 ? 'bg-[#16a34a]/10 border-[#16a34a] text-[#16a34a]' : 'bg-neutral-900 border-neutral-700 text-neutral-400'}`}>
                      0{idx + 1}
                    </div>
                    <div className={`md:ml-8 border p-5 md:p-6 rounded-2xl flex-1 flex items-center ${idx >= arr.length - 2 ? 'bg-[#16a34a]/5 border-[#16a34a]/30' : 'bg-neutral-900/50 border-neutral-800'}`}>
                      {step.icon}
                      <span className={`text-[17px] md:text-[18px] font-bold ${idx >= arr.length - 2 ? 'text-[#16a34a]' : 'text-white'}`}>{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. DELIVERABLES (MATCHED TO SERVICES.TS SOLUTION DELIVERABLES PATTERN)
        ========================================== */}
        <section className="defer-below-fold py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              {/* Deliverables List (Strictly Matched to services.ts Deliverables) */}
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-10 rounded-[32px] border border-neutral-200 dark:border-neutral-800">
                <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                  The Output
                </div>
                <h2 className="text-[32px] font-extrabold mb-8 text-black dark:text-white">What You Actually Get</h2>
                <p className="text-[16px] text-neutral-600 dark:text-neutral-400 mb-8">Tangible intelligence to run your business. Every engagement yields specific deliverables:</p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                  {[
                    "Architecture Due-Diligence",
                    "Technology Roadmap",
                    "Vendor & Stack Selection",
                    "Cost Optimization Report",
                    "Operational Hierarchy Blueprint",
                    "Governed RAG Architecture",
                    "Cross-System API Integration",
                    "TailwindCSS Design System",
                    "Logo & Visual Identity System"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-[14px] font-bold text-neutral-800 dark:text-neutral-200">
                      <FileText className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Ultimate Philosophy Statement */}
              <div className="p-4 md:p-10">
                <h2 className="text-[40px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6 text-black dark:text-white">
                  Implementation is optional.<br />
                  <span className="text-[#16a34a]">Good architecture is not.</span>
                </h2>
                <p className="text-[18px] text-neutral-600 dark:text-neutral-400 mb-8">
                  The architecture remains valid regardless of who implements it. You can hire our studio, build internally, or hire external partners.
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
            7. AVOID EXPENSIVE MISTAKES 
        ========================================== */}
        <section className="defer-below-fold max-w-[1200px] mx-auto px-6 py-24">
          <div className="mb-16 max-w-3xl">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              The Ultimate ROI
            </div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">
              Avoid expensive technology mistakes before they happen.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8 hover:border-black/20 dark:hover:border-neutral-700 transition-all">
              <h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Eliminate Waste</h3>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Stop paying for duplicate software, mismatched CRMs, and wrong AI investments. We align technology with actual operational reality.</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8 hover:border-black/20 dark:hover:border-neutral-700 transition-all">
              <h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Kill Manual Work</h3>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Lead handling, customer onboarding, reporting, and team workflows become automated, connected pipelines.</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8 hover:border-black/20 dark:hover:border-neutral-700 transition-all">
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
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-neutral-300">Buy Second Hand Books</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-neutral-300">Scan Centre Near Me</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-neutral-300">SattvaOS</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-neutral-300">Nirvandham</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-neutral-300">Muktibodh</span>
            </div>
            <div className="mt-12">
              <Link href="/evidence" className="inline-flex items-center text-[#16a34a] font-bold hover:text-white transition-colors">
                Review our Architectures <ArrowRight className="w-4 h-4 ml-2" />
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
