import React from 'react';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  GraduationCap, 
  Layers, 
  Briefcase,
  BookOpen,
  Code2,
  Workflow,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'DigiXPro Architecture Evidence | DigiXPro',
  description: 'Production evidence and technical architecture breakdown for DigiXPro digital ecosystem.',
  alternates: {
    canonical: 'https://digixpro.in/evidence/digixpro',
  },
  openGraph: {
    title: 'DigiXPro Architecture Evidence | DigiXPro',
    description: 'Production evidence and technical architecture breakdown for DigiXPro digital ecosystem.',
    url: 'https://digixpro.in/evidence/digixpro',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'DigiXPro Architecture Evidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiXPro Architecture Evidence | DigiXPro',
    description: 'Production evidence and technical architecture breakdown for DigiXPro digital ecosystem.',
    images: ['/twitter-image.png'],
  },
};

export default function DigiXProArchitecture() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20">
      
      {/* Navigation Back */}
      <a href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </a>

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-black bg-neutral-200 px-2 py-0.5 rounded border border-neutral-300 font-bold uppercase tracking-widest">
            Framework Report
          </span>
          <span className="text-[10px] font-mono text-[#22C55E] bg-green-50 px-2 py-0.5 rounded border border-green-200 font-bold uppercase tracking-widest">
            Company Architecture
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight">
          DigiXPro
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Building reusable engineering assets instead of one-off client projects.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          How we architected DigiXPro not as a traditional software outsourcing agency, but as an Architecture Advisory and Product Engineering Studio that compounds intellectual property.
        </p>
      </div>

      {/* ABOVE THE FOLD: Core Metrics / Principles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-green-800 uppercase tracking-wider mb-1 flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-[#22C55E]" /> Model
          </div>
          <div className="text-lg font-extrabold text-green-950 font-mono mt-1">Knowledge-First</div>
          <p className="text-[11px] text-green-800 mt-1">Consulting led execution</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-black" /> Output
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Reusable IP</div>
          <p className="text-[11px] text-neutral-500 mt-1">Frameworks & Modules</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Workflow className="w-3.5 h-3.5 mr-1 text-black" /> Process
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Architecture</div>
          <p className="text-[11px] text-neutral-500 mt-1">Decisions before code</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Briefcase className="w-3.5 h-3.5 mr-1 text-black" /> Proof
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Evidence Archive</div>
          <p className="text-[11px] text-neutral-500 mt-1">8 Verified Reports</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. The Traditional Agency Failure */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. The Traditional Agency Failure
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Most digital agencies and software development shops operate on an unscalable model: selling hours for lines of code. This results in isolated, one-off projects that generate zero compounding value for the firm and push unnecessary technical debt onto the client.
            </p>
            
            <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>Client requests software</span>
                <span className="text-red-600 font-bold">Agency quotes hours</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>Custom code written from scratch</span>
                <span className="text-red-600 font-bold">No architectural reuse</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>Project delivered & forgotten</span>
                <span className="text-red-600 font-bold">Zero IP generated</span>
              </div>
              <div className="text-center text-[#22C55E] font-bold mt-2">↓ The DigiXPro Shift ↓</div>
              <div className="flex items-center justify-between bg-[#0A0A0A] text-white p-3.5 rounded font-bold">
                <span>Extract Reusable Architecture</span>
                <span className="text-[#22C55E]">Compound Engineering IP</span>
              </div>
            </div>
          </section>

          {/* 2. The Architecture Decision */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The DigiXPro Architecture Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">// COMPANY LOG</p>
              <p className="mb-4 leading-relaxed">
                We consciously decided to position DigiXPro as a <strong>Knowledge-First Architecture Firm</strong> rather than a coding shop. <em>Code is cheap; architectural decisions are expensive.</em>
              </p>
              <ul className="space-y-2 text-neutral-300 font-mono text-xs">
                <li>→ We never start with code. We start with business systems understanding.</li>
                <li>→ We rely heavily on our <strong>Evidence Archive</strong> to prove past architectural success.</li>
                <li>→ Every deployment (Healthcare, Marketplace, AI) must yield a reusable framework.</li>
              </ul>
            </div>
          </section>

          {/* 3. The IP Generation Pipeline & Generated Evidence */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. The Intellectual Property Pipeline
            </h2>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Our core operational moat is how we process client engagements. We do not just deliver software; we extract knowledge through a strict, continuous pipeline:
            </p>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6 font-mono text-xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-neutral-50 p-4 rounded border text-center">
                <span className="bg-white px-3 py-2 rounded border font-bold text-black">Observation</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold text-black">Evidence</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold text-black">Pattern</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold text-black">Principle</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-green-50 text-green-900 px-3 py-2 rounded border border-green-200 font-bold">Reusable Architecture</span>
              </div>

              {/* Generated Evidence Proof Grid (Updated Names) */}
              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="text-neutral-500 font-bold uppercase text-[10px] tracking-wider mb-2">Generated Evidence Proofs in Production:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-neutral-800">
                  <a href="/evidence/dr-aggarwal" className="bg-neutral-50 p-2 rounded border hover:border-black transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mr-1.5 shrink-0" /> Dr. Amit Aggrwal (PT)</a>
                  <a href="/evidence/scan-centre" className="bg-neutral-50 p-2 rounded border hover:border-black transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mr-1.5 shrink-0" /> Scan Centre near me</a>
                  <a href="/evidence/buy-secondhand-book" className="bg-neutral-50 p-2 rounded border hover:border-black transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mr-1.5 shrink-0" /> Buy Secondhand Books</a>
                  <a href="/evidence/sattvaos" className="bg-neutral-50 p-2 rounded border hover:border-black transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mr-1.5 shrink-0" /> SattvaOS</a>
                  <a href="/evidence/nirvandham" className="bg-neutral-50 p-2 rounded border hover:border-black transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mr-1.5 shrink-0" /> Nirvandham</a>
                  <a href="/evidence/muktibodh" className="bg-neutral-50 p-2 rounded border hover:border-black transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mr-1.5 shrink-0" /> Muktibodh</a>
                </div>
              </div>
            </div>
          </section>

          {/* 4. The Compound Advantage */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 4. The Compound Advantage
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-3 font-mono text-xs text-neutral-700">
              <p className="font-sans text-neutral-600 text-sm mb-2">Every project increases our operational capability. Each engagement compounds the next:</p>
              
              <div className="p-3 bg-neutral-50 rounded border flex items-center justify-between">
                <span>Healthcare Systems (Dr. Amit Aggrwal (PT))</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black">Improved Marketplace Design</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border flex items-center justify-between">
                <span>Marketplace Engineering (Scan Centre near me)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black">Improved Commerce Systems</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border flex items-center justify-between">
                <span>Commerce Operating System (Buy Secondhand Books)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black">Improved AI Infrastructure</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border flex items-center justify-between">
                <span>AI Infrastructure (SattvaOS)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black">Improved Institutional Platforms</span>
              </div>
            </div>
          </section>

          {/* 5. Closing Black Card Statement */}
          <section>
            <div className="bg-[#0A0A0A] text-white p-8 rounded-xl border border-neutral-800 space-y-4 shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 mr-2" /> Decision Optimization Engine
              </div>
              <p className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-snug">
                "DigiXPro does not optimize projects. DigiXPro optimizes decision quality."
              </p>
              <div className="pt-4 border-t border-neutral-800 font-mono text-xs text-neutral-300 flex flex-wrap items-center gap-2">
                <span className="bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700 font-bold">Better Decisions</span> → 
                <span className="bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700 font-bold">Better Architecture</span> → 
                <span className="bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700 font-bold">Better Software</span> → 
                <span className="bg-green-950 text-[#22C55E] px-3 py-1.5 rounded border border-green-800 font-bold">Better Businesses</span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle Box */}
        <div className="md:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-001</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                "A technology company's value is not measured by lines of code written, but by the reusable intellectual property generated from every execution."
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Architecture before implementation. Knowledge before code.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: DigiXPro (Core Philosophy)
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Need Architectural Advisory?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Optimize decision quality before writing code.</p>
              <a href="mailto:consult@digixpro.in?subject=Architecture%20Advisory%20Audit" className="block w-full py-2.5 bg-black text-white font-bold rounded hover:bg-[#22C55E] hover:text-black transition">
                Book Architecture Audit
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}