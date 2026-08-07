import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import { 
  ArrowRight, 
  ArrowDown,
  CheckCircle2,
  XCircle,
  FileText,
  Map,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Methodology — How We Work',
  description: 'Our 7-step architecture hierarchy and independent advisory methodology. We design business operating systems before you spend money on software. Business, People, Process, Information, Automation, Technology, Software.',
  keywords: [
    'technology architecture methodology',
    'business operating system design',
    'how DigiXPro works',
    'IT advisory process',
    'operational clarity consulting',
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/how-we-work',
  },
  openGraph: {
    title: 'Our Methodology — How We Work | DigiXPro',
    description: 'Our 7-step architecture hierarchy and independent advisory methodology for designing business operating systems.',
    url: 'https://www.digixpro.in/how-we-work',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Architecture Methodology: Business to Software',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Methodology — How We Work | DigiXPro',
    description: 'Our 7-step architecture hierarchy and independent advisory methodology.',
    images: ['/twitter-image.png'],
  },
};

export default function HowWeWorkPage() {
  const sevenSteps = [
    { name: "Business", desc: "What is the core objective of the organization?" },
    { name: "People", desc: "Who is actually doing the work on the ground?" },
    { name: "Process", desc: "How does the workflow actually move between departments?" },
    { name: "Information", desc: "What specific data needs to be captured and tracked?" },
    { name: "Automation", desc: "What repetitive, manual work can be permanently killed?" },
    { name: "Technology", desc: "Which technology stack suits this scale and budget?" },
    { name: "Software", desc: "Finally, the code that ties the entire system together." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-24 transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'How We Work', url: 'https://www.digixpro.in/how-we-work' },
        ]}
      />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
              Independent Advisory Methodology
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8 text-black dark:text-white">
            Every successful technology system begins with understanding how the business actually works.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            Most projects fail because they start with software. We start with the business. Only after understanding people, processes, information, and operations do we recommend technology.
          </p>
        </div>
      </section>

      {/* 2. THE 7-STEP ARCHITECTURE HIERARCHY (VERTICAL FLOW) */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">The Architecture Hierarchy</h2>
            <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
              This is our non-negotiable order of operations. Skipping a step is the fastest way to build software that nobody uses.
            </p>
          </div>

          <div className="max-w-2xl relative">
            {/* Vertical Line */}
            <div className="absolute top-[28px] bottom-[28px] left-[28px] w-0.5 bg-neutral-300 dark:bg-neutral-700"></div>
            
            <div className="space-y-0">
              {sevenSteps.map((step, idx) => (
                <div key={idx} className="flex items-start relative pb-10 last:pb-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold shrink-0 z-10 border-2 bg-white dark:bg-neutral-900 ${idx === 6 ? 'border-[#16a34a] text-[#16a34a]' : 'border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500'}`}>
                    0{idx + 1}
                  </div>
                  <div className="ml-8 pt-3">
                    <h3 className={`text-[24px] font-extrabold mb-2 ${idx === 6 ? 'text-[#16a34a]' : 'text-black dark:text-white'}`}>
                      {step.name}
                    </h3>
                    <p className="text-[16px] text-neutral-600 dark:text-neutral-400 font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRADITIONAL VS DIGIXPRO */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">Why traditional IT projects fail</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            The difference between buying code and designing an operating system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* The Typical Project */}
          <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-[32px] p-8 md:p-12">
            <h3 className="text-[20px] font-extrabold text-neutral-400 dark:text-neutral-500 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">The Typical Project</h3>
            <div className="space-y-4">
              {['Requirement gathering', 'Cost & Quote', 'Development', 'Deployment', 'Low Adoption & Friction'].map((step, idx, arr) => (
                <div key={idx} className="text-center">
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 py-4 px-6 rounded-xl text-[15px] font-bold text-neutral-500 dark:text-neutral-400 shadow-sm">
                    {step}
                  </div>
                  {idx !== arr.length - 1 && <ArrowDown className="w-5 h-5 mx-auto text-neutral-300 dark:text-neutral-700 my-3" />}
                </div>
              ))}
            </div>
          </div>

          {/* The DigiXPro Methodology */}
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 rounded-[32px] p-8 md:p-12 shadow-xl border border-transparent dark:border-neutral-800">
            <h3 className="text-[20px] font-extrabold text-[#16a34a] mb-8 pb-4 border-b border-neutral-800">The DigiXPro Methodology</h3>
            <div className="space-y-4">
              {['Deep Discovery', 'Operational Mapping', 'Architecture Design', 'Technology Decisions', 'Structured Implementation', 'High Adoption & Scalability'].map((step, idx, arr) => (
                <div key={idx} className="text-center">
                  <div className={`py-4 px-6 rounded-xl text-[15px] font-bold shadow-sm border ${idx === arr.length - 1 ? 'bg-[#16a34a] text-white border-[#16a34a]' : 'bg-neutral-900 dark:bg-neutral-800 border-neutral-800 dark:border-neutral-700 text-white'}`}>
                    {step}
                  </div>
                  {idx !== arr.length - 1 && <ArrowDown className="w-5 h-5 mx-auto text-neutral-700 dark:text-neutral-600 my-3" />}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. ENGAGEMENT PROCESS */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-24 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">The Engagement Process</h2>
            <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
              How we move from operational chaos to technical clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="text-[12px] font-mono font-bold text-[#16a34a] mb-4 block">PHASE 01</span>
              <h3 className="text-[20px] font-extrabold mb-3 text-black dark:text-white">Discovery</h3>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Founder discussions, department meetings, and actively observing staff workflows in real-time.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="text-[12px] font-mono font-bold text-[#16a34a] mb-4 block">PHASE 02</span>
              <h3 className="text-[20px] font-extrabold mb-3 text-black dark:text-white">Bottleneck ID</h3>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Finding exactly where the business is leaking time, money, and momentum due to bad systems.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="text-[12px] font-mono font-bold text-[#16a34a] mb-4 block">PHASE 03</span>
              <h3 className="text-[20px] font-extrabold mb-3 text-black dark:text-white">The Blueprint</h3>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Delivering the complete Architecture Document, Decision Rationale, and scalable Tech Roadmap.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="text-[12px] font-mono font-bold text-[#16a34a] mb-4 block">PHASE 04</span>
              <h3 className="text-[20px] font-extrabold mb-3 text-black dark:text-white">Execution</h3>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Structured implementation, process automation, and technology rollout with strict governance.
              </p>
            </div>
          </div>

          {/* The Ultimate Differentiator */}
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-8 md:p-10 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-[24px] font-extrabold text-white mb-2">Implementation is optional.</h3>
              <p className="text-[16px] text-neutral-400 max-w-2xl">
                The architecture remains valid regardless of who builds it. You can build it internally, hire an external agency, or use the DigiXPro Studio to execute the blueprint.
              </p>
            </div>
            <ShieldCheck className="w-12 h-12 text-[#16a34a] shrink-0" />
          </div>

        </div>
      </section>

      {/* 4.5 VERIFICATION-FIRST OPERATING METHODOLOGY */}
      <section className="bg-white dark:bg-[#0A0A0A] py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-10 md:p-16 rounded-[32px] shadow-sm">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              Non-Negotiable Execution Principles
            </div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold mb-8 text-black dark:text-white">
              Verification-First Operating Methodology
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="font-extrabold text-lg text-black dark:text-white mb-3 text-[#16a34a]">Raw Evidence Verification</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Every completion claim verified with raw production evidence (source code, live URLs, commit logs); never verbal assurances or unverified mockups.
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="font-extrabold text-lg text-black dark:text-white mb-3 text-[#16a34a]">Single Source of Truth</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Operational data maintained strictly in a single source of truth, never duplicated across scattered messaging threads or unindexed spreadsheets.
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="font-extrabold text-lg text-black dark:text-white mb-3 text-[#16a34a]">Empirical Data Strategy</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Strategic architecture decisions driven by empirical market data and production metrics, never unvalidated assumptions or guesswork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT YOU RECEIVE */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">What You Receive</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            Tangible, production-ready intelligence to run your operations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Business Operating System Blueprint", icon: <Map className="w-5 h-5 text-[#16a34a]" /> },
            { title: "Decision Rationale Document", icon: <FileText className="w-5 h-5 text-[#16a34a]" /> },
            { title: "Long-Term Technology Roadmap", icon: <CheckSquare className="w-5 h-5 text-[#16a34a]" /> },
            { title: "Vendor & Stack Recommendations", icon: <CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> },
            { title: "Implementation Strategy", icon: <ArrowRight className="w-5 h-5 text-[#16a34a]" /> },
            { title: "Risk & Security Assessment", icon: <XCircle className="w-5 h-5 text-red-500" /> }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 hover:border-[#16a34a]/30 transition-colors shadow-sm">
              <div className="mr-4 bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl border border-neutral-100 dark:border-neutral-700">
                {item.icon}
              </div>
              <span className="text-[15px] font-bold text-neutral-800 dark:text-neutral-200">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-[24px] p-8 md:p-12 text-center">
          <h2 className="text-[24px] md:text-[36px] font-extrabold mb-4 text-black dark:text-white">
            Ready to apply this methodology to your business?
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Start with a 30-minute discovery call. We&apos;ll map your current operational state before recommending any technology.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
          >
            Request a Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Mobile sticky CTA for this long page */}
      <StickyMobileCTA />

    </div>
  );
}