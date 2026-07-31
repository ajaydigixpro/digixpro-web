import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  Briefcase,
  Users,
  Settings,
  Database,
  Network,
  Cpu,
  Code2,
  AlertCircle
} from 'lucide-react';
import PersonSchema from "@/components/seo/PersonSchema";

export const metadata: Metadata = {
  title: 'Founder & Technology Architect | Dr. Ajay Shukla',
  description: 'I help founders make technology decisions they won\'t have to rebuild six months later. Founder & Technology Architect at DigiXPro.',
  alternates: {
    canonical: 'https://www.digixpro.in/founder',
  },
  openGraph: {
    title: 'Founder & Technology Architect | Dr. Ajay Shukla',
    description: 'I help founders make technology decisions they won\'t have to rebuild six months later.',
    url: 'https://www.digixpro.in/founder',
    type: 'profile',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Dr. Ajay Shukla - Founder & Technology Architect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder & Technology Architect | Dr. Ajay Shukla',
    description: 'I help founders make technology decisions they won\'t have to rebuild six months later.',
    images: ['/twitter-image.png'],
  },
};

export default function FounderPage() {
  return (
    <>
      <PersonSchema />
      <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#009E73]/20">
        
        {/* 1. HERO SECTION (2-COLUMN LAYOUT) */}
        <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Copy & Context */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-full mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#009E73]"></span>
                <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700">
                  Founder & Technology Architect
                </span>
              </div>
              
              <h1 className="text-[44px] md:text-[56px] font-extrabold tracking-tight leading-[1.05] mb-8">
                I help founders make technology decisions they won't have to rebuild six months later.
              </h1>
              
              <p className="text-[18px] md:text-[20px] text-neutral-600 leading-relaxed mb-6">
                Every business eventually reaches a point where software, people, and processes stop working together.
              </p>
              <p className="text-[18px] md:text-[20px] text-neutral-600 leading-relaxed mb-10">
                My work is to design the operating system before expensive technology decisions are made.
              </p>
              
              {/* Name Block with Hindi Name & Vidhya Vachaspati */}
              <div className="mb-10">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="text-[22px] font-extrabold text-black">Dr. Ajay Shukla</h3>
                  <span className="text-[15px] font-medium text-neutral-500">
                    (डॉ. अजय शुक्ल — विद्या वाचस्पति)
                  </span>
                </div>
                <p className="text-[14px] font-mono text-neutral-500 uppercase tracking-wider">
                  Founder, DigiXPro Digital Solution
                </p>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] text-white font-bold text-[16px] rounded-xl hover:bg-[#009E73] transition-colors shadow-md"
              >
                Request a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Right: The Portrait (Above the fold) */}
            <div className="relative w-full max-w-[480px] mx-auto md:mx-0 md:ml-auto">
              <div className="absolute top-4 -right-4 bottom-4 -left-4 bg-neutral-100 rounded-[32px] -z-10 border border-neutral-200"></div>
              
              <Image
                src="/founder-portrait.png"
                alt="Dr. Ajay Shukla - Technology Architect"
                width={480}
                height={600}
                priority
                className="rounded-[32px] object-cover shadow-2xl relative z-10 w-full h-auto bg-neutral-200"
              />
            </div>

          </div>
        </section>

        {/* 2. WHY FOUNDERS CALL ME */}
        <section className="bg-neutral-50 border-y border-neutral-200 py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-14">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-black mb-4">Why founders usually call me</h2>
              <p className="text-[18px] text-neutral-600 max-w-2xl">
                I am typically brought in when standard software fails to map to operational reality.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-black">Their CRM doesn't match reality.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-black">Their ERP implementation failed.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-black">Nobody trusts the business data.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-black">Teams run core operations on WhatsApp.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-black">AI initiatives have no clear direction.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-black">Technology decisions became expensive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MY PHILOSOPHY (THE 7 STEPS) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[40px] font-extrabold mb-6">My philosophy</h2>
            <p className="text-[18px] text-neutral-600 font-medium">
              Technology is never the starting point. It is the outcome.
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
              { name: "Software", icon: <Code2 className="w-6 h-6 mb-2 text-[#009E73]" /> },
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center min-w-[110px] p-4 rounded-xl bg-white shadow-sm border border-neutral-200">
                  <div className="text-neutral-500">{step.icon}</div>
                  <span className={`font-bold text-[15px] ${idx === arr.length - 1 ? 'text-[#009E73]' : 'text-black'}`}>
                    {step.name}
                  </span>
                </div>
                {idx !== arr.length - 1 && (
                  <div className="hidden md:block text-neutral-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
                {idx !== arr.length - 1 && (
                  <div className="md:hidden text-neutral-300 my-2 rotate-90">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 4. SELECTED EVIDENCE (3 PROJECTS) */}
        <section className="bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-[32px] md:text-[40px] font-extrabold">Selected Evidence</h2>
              <p className="text-[18px] text-neutral-400 mt-2">Production systems architected under my guidance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[24px] flex flex-col h-full group hover:border-[#009E73]/30 transition-all">
                <h3 className="text-[20px] font-extrabold mb-3">Buy Second Hand Books</h3>
                <p className="text-[15px] text-neutral-400 mb-6 flex-grow">Marketplace operating system with multi-vendor OMS and decoupled inventory.</p>
                <Link href="/evidence/buy-secondhand-book" className="inline-flex items-center text-[#009E73] font-bold text-[14px] group-hover:text-white transition-colors">
                  View Blueprint <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[24px] flex flex-col h-full group hover:border-[#009E73]/30 transition-all">
                <h3 className="text-[20px] font-extrabold mb-3">SattvaOS</h3>
                <p className="text-[15px] text-neutral-400 mb-6 flex-grow">Governed AI execution layer with strict multi-tenant data isolation and role controls.</p>
                <Link href="/evidence/sattvaos" className="inline-flex items-center text-[#009E73] font-bold text-[14px] group-hover:text-white transition-colors">
                  View Blueprint <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[24px] flex flex-col h-full group hover:border-[#009E73]/30 transition-all">
                <h3 className="text-[20px] font-extrabold mb-3">Muktibodh</h3>
                <p className="text-[15px] text-neutral-400 mb-6 flex-grow">Multilingual digital publishing ecosystem engineered for zero-cost horizontal scaling.</p>
                <Link href="/evidence/muktibodh" className="inline-flex items-center text-[#009E73] font-bold text-[14px] group-hover:text-white transition-colors">
                  View Blueprint <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHAT TO EXPECT (EXPECT VS NOT EXPECT) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            
            {/* Positive */}
            <div>
              <h3 className="text-[24px] font-extrabold text-black mb-6">What you can expect from me</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-[16px] font-medium text-neutral-800">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Independent advice
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Vendor-neutral recommendations
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Production-first thinking
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Long-term architecture
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Clear implementation roadmap
                </li>
              </ul>
            </div>

            {/* Negative */}
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
              <h3 className="text-[24px] font-extrabold text-black mb-6">What you should not expect</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-[16px] font-medium text-neutral-600">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Cheapest developer
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-600">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Technology trends
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-600">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Generic AI consulting
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-600">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Sales pitches
                </li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}