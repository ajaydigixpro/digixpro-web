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
import Script from 'next/script';
import { evidenceItems } from '@/data/evidence';

export const metadata: Metadata = {
  title: 'Founder & Technology Architect | Dr. Ajay Shukla',
  description: 'Technology decisions engineered to outlast the next six months of growth — not just the next funding round. Founder & Technology Architect at DigiXPro.',
  alternates: {
    canonical: 'https://www.digixpro.in/founder',
  },
  openGraph: {
    title: 'Founder & Technology Architect | Dr. Ajay Shukla',
    description: 'Technology decisions engineered to outlast the next six months of growth — not just the next funding round.',
    url: 'https://www.digixpro.in/founder',
    type: 'profile',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Dr. Ajay Shukla - Founder & Technology Architect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder & Technology Architect | Dr. Ajay Shukla',
    description: 'Technology decisions engineered to outlast the next six months of growth — not just the next funding round.',
    images: ['/twitter-image.png'],
  },
};

export default function FounderPage() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.digixpro.in/founder/#profilepage",
    "url": "https://www.digixpro.in/founder",
    "name": "Dr. Ajay Shukla (डॉ. अजय शुक्ल — विद्या वाचस्पति) — Founder & Technology Architect Profile",
    "mainEntity": {
      "@id": "https://www.digixpro.in/#founder"
    }
  };

  return (
    <>
      <PersonSchema />
      <Script
        id="profile-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20 transition-colors duration-200">
        
        {/* 1. HERO SECTION (2-COLUMN LAYOUT) */}
        <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Copy & Context */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#009E73]"></span>
                <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                  Founder &amp; Technology Architect
                </span>
              </div>
              
              <h1 className="text-[40px] md:text-[52px] font-extrabold tracking-tight leading-[1.08] mb-8 text-black dark:text-white">
                Technology decisions engineered to outlast the next six months of growth — not just the next funding round.
              </h1>
              
              <p className="text-[18px] md:text-[20px] text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10">
                Every business eventually reaches a point where software, people, and processes stop working together. The operating system gets designed before expensive technology decisions are made.
              </p>
              
              {/* Name Block with Hindi Name & Vidhya Vachaspati */}
              <div className="mb-10">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="text-[22px] font-extrabold text-black dark:text-white">Dr. Ajay Shukla</h3>
                  <span className="text-[15px] font-medium text-neutral-500 dark:text-neutral-400">
                    (डॉ. अजय शुक्ल — विद्या वाचस्पति)
                  </span>
                </div>
                <p className="text-[14px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Founder, DigiXPro Digital Solution
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[16px] rounded-xl hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
                >
                  Request a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="https://www.linkedin.com/in/ajay-shukla-digixpro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-[15px] rounded-xl hover:border-neutral-500 dark:hover:border-neutral-400 hover:text-black dark:hover:text-white transition-colors min-h-[52px]"
                >
                  Connect on LinkedIn <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Right: The Portrait (Above the fold) */}
            <div className="relative w-full max-w-[480px] mx-auto md:mx-0 md:ml-auto">
              <div className="absolute top-4 -right-4 bottom-4 -left-4 bg-neutral-100 dark:bg-neutral-900 rounded-[32px] -z-10 border border-neutral-200 dark:border-neutral-800"></div>
              
              <Image
                src="/founder-portrait.png"
                alt="Dr. Ajay Shukla - Technology Architect"
                width={480}
                height={600}
                priority
                className="rounded-[32px] object-cover shadow-2xl relative z-10 w-full h-auto bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

          </div>
        </section>

        {/* 2. WHY FOUNDERS USUALLY CALL */}
        <section className="bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800 py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-14">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-black dark:text-white mb-4">Why founders usually call</h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Standard software usually fails to map to operational reality — that&apos;s typically when the call comes in.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Their CRM doesn't match reality.",
                "The founder approves every minor decision.",
                "Nobody trusts the business data.",
                "Teams run core operations on WhatsApp.",
                "AI initiatives have no clear direction.",
                "Technology decisions became expensive.",
                "The tech stack got chosen by whoever was available, not by strategy.",
                "Every new hire learns operations differently — nothing is written down.",
                "Growth outpaced the systems meant to support it."
              ].map((problem, idx) => (
                <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" />
                  <p className="text-[16px] font-medium text-black dark:text-white">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE PHILOSOPHY (THE 7 STEPS) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[40px] font-extrabold mb-6 text-black dark:text-white">The Philosophy</h2>
            <p className="text-[18px] text-neutral-600 dark:text-neutral-400 font-medium">
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
                <div className="flex flex-col items-center min-w-[110px] p-4 rounded-xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
                  <div className="text-neutral-500 dark:text-neutral-400">{step.icon}</div>
                  <span className={`font-bold text-[15px] ${idx === arr.length - 1 ? 'text-[#009E73]' : 'text-black dark:text-white'}`}>
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
        </section>

        {/* 3.5 BEYOND TECHNOLOGY */}
        <section className="bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-black dark:text-white mb-6">Beyond Technology</h2>
              <p className="text-[17px] md:text-[19px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
                Beyond enterprise technology lies a broader commitment to restoring the Sanatan Gurukul Parampara in India and making meaningful education accessible without barriers. Through Yuj Foundation and related voluntary initiatives, this work extends across core-team and advisory responsibilities, teaching across Gurukuls, and supporting free education, publishing, and open technology platforms.
              </p>

              <ul className="space-y-4 mb-8 text-[16px] md:text-[17px] text-neutral-800 dark:text-neutral-200 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono select-none mr-3.5 shrink-0">—</span>
                  <span>Core team member and teacher at <a href="https://www.nirvandham.in" target="_blank" rel="noopener noreferrer" className="font-bold text-[#009E73] hover:underline">Nirvandham</a> Online Gurukul, supporting its Advaita-based teaching tradition.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono select-none mr-3.5 shrink-0">—</span>
                  <span>Teaches as a Trigyan Teacher at <a href="https://gyanmarg.guru" target="_blank" rel="noopener noreferrer" className="font-bold text-[#009E73] hover:underline">gyanmarg.guru</a>, a multilingual online gurukul.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono select-none mr-3.5 shrink-0">—</span>
                  <span>Core team member and advisor at <a href="https://www.yujfoundation.in" target="_blank" rel="noopener noreferrer" className="font-bold text-[#009E73] hover:underline">Yuj Foundation</a>, supporting the Yuj Gurukul tradition, free startup guidance, and community initiatives.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono select-none mr-3.5 shrink-0">—</span>
                  <span>Editor-in-Chief of <Link href="/evidence/muktibodh" className="font-bold text-[#009E73] hover:underline">Muktibodh</Link>, a free Advaita Vedanta and Upanishad-based Adhyatmik e-Magazine reaching readers in Hindi, English, and Nepali.</span>
                </li>
              </ul>

              <p className="text-[17px] md:text-[19px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Across all voluntary initiatives, the approach stays the same: clarity built through practice and direct experience, not lecture.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SELECTED EVIDENCE (TRACK-DRIVEN FROM EVIDENCE.TS) */}
        <section className="bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6 space-y-16">
            <div className="border-b border-neutral-800 pb-6">
              <h2 className="text-[32px] md:text-[40px] font-extrabold">Selected Evidence</h2>
              <p className="text-[18px] text-neutral-400 mt-2">Production systems and digital architectures engineered under direct advisory guidance.</p>
            </div>

            {/* Technology Evidence Track */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-[#009E73] font-mono text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Technology Advisory Track</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {evidenceItems.filter((item) => item.track === 'tech').map((item) => (
                  <div key={item.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-[20px] flex flex-col h-full group hover:border-[#009E73]/50 transition-all shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700 font-bold">{item.category}</span>
                      <span className="text-[10px] font-mono text-[#009E73] bg-[#009E73]/10 px-2 py-0.5 rounded font-bold">Tech Track</span>
                    </div>
                    <h3 className="text-[18px] font-extrabold mb-2 text-white group-hover:text-[#009E73] transition-colors">{item.title}</h3>
                    <p className="text-[13px] text-neutral-400 mb-6 flex-grow">Production evidence and operational architecture for {item.title}.</p>
                    <Link href={`/evidence/${item.id}`} className="inline-flex items-center text-[#009E73] font-bold text-[13px] group-hover:text-white transition-colors">
                      View Architecture Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Evidence Track */}
            <div className="space-y-6 pt-6 border-t border-neutral-900">
              <div className="flex items-center space-x-3 text-[#009E73] font-mono text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Design &amp; Publishing Track</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {evidenceItems.filter((item) => item.track === 'design').map((item) => (
                  <div key={item.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-[20px] flex flex-col h-full group hover:border-[#009E73]/50 transition-all shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700 font-bold">{item.category}</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-bold">Design Track</span>
                    </div>
                    <h3 className="text-[18px] font-extrabold mb-2 text-white group-hover:text-[#009E73] transition-colors">{item.title}</h3>
                    <p className="text-[13px] text-neutral-400 mb-6 flex-grow">Digital publication design and visual knowledge architecture for {item.title}.</p>
                    <Link href={`/evidence/${item.id}`} className="inline-flex items-center text-[#009E73] font-bold text-[13px] group-hover:text-white transition-colors">
                      View Design Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 5. WHAT THIS ADVISORY DELIVERS (EXPECT VS NOT EXPECT) */}
        <section className="py-24 max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            
            {/* Positive */}
            <div>
              <h3 className="text-[24px] font-extrabold text-black dark:text-white mb-6">What This Advisory Delivers</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-[16px] font-medium text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Independent advice
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Vendor-neutral recommendations
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Production-first thinking
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Long-term architecture
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] mr-3 shrink-0" /> Clear implementation roadmap
                </li>
              </ul>
            </div>

            {/* Negative */}
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-[24px] font-extrabold text-black dark:text-white mb-6">What you should not expect</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-[16px] font-medium text-neutral-600 dark:text-neutral-400">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Cheapest developer
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-600 dark:text-neutral-400">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Technology trends
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-600 dark:text-neutral-400">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" /> Generic AI consulting
                </li>
                <li className="flex items-center text-[16px] font-medium text-neutral-600 dark:text-neutral-400">
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