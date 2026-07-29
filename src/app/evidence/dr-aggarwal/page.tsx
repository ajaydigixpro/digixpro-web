'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  Layers,
  Milestone,
  FileText,
  XCircle,
  BookOpen
} from 'lucide-react';

export default function DrAggarwalEvidence() {
  const [imgError, setImgError] = useState(false);

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
            Evidence Report
          </span>
          <span className="text-[10px] font-mono text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
            Healthcare • Noida, NCR
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-3 leading-tight tracking-tight">
          Dr Aggarwal Physio Centre
        </h1>
        <p className="text-lg text-neutral-600 font-normal max-w-3xl leading-relaxed">
          A 9+ year strategic partnership: Engineering healthcare authority, dominating local organic search, and expanding into multi-unit clinical operations.
        </p>
      </div>

      {/* ABOVE THE FOLD: Top Impact Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center">
            <Award className="w-3.5 h-3.5 mr-1 text-[#22C55E]" /> Branded Volume
          </div>
          <div className="text-3xl font-extrabold text-emerald-950 font-mono">880+</div>
          <p className="text-[11px] text-emerald-800 mt-1">Monthly organic brand searches</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-black" /> Retained Relationship
          </div>
          <div className="text-3xl font-extrabold text-black font-mono">9+ Years</div>
          <p className="text-[11px] text-neutral-500 mt-1">Continuous advisory & build</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-black" /> Expansion Unit
          </div>
          <div className="text-3xl font-extrabold text-black font-mono">2026 Launch</div>
          <p className="text-[11px] text-neutral-500 mt-1">360 Neck & Shoulder</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1 text-black" /> Organic Search
          </div>
          <div className="text-3xl font-extrabold text-black font-mono">Page 1-4</div>
          <p className="text-[11px] text-neutral-500 mt-1">High-intent treatment keywords</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. Context & Business Problem */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> The Context & Bottleneck
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              When Dr Aggarwal Physio Centre began in Noida, the local healthcare space was crowded with generic clinic aggregators and ad-heavy practices. In healthcare, patient acquisition requires high clinical confidence; paid ad rentals yield low long-term retention.
            </p>
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2 text-xs text-neutral-700 font-mono">
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Zero organic keyword visibility for high-value treatment queries.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> High reliance on word-of-mouth with no digital brand recall.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Risk of burning capital on short-term ad campaigns.</div>
            </div>
          </section>

          {/* 2. Strategic Decision (Decision Log) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> The Strategic Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">// DECISION LOG</p>
              <p className="mb-4 leading-relaxed">
                Rather than renting customer attention through continuous PPC ad spend, DigiXPro decided to <strong>engineer an architecture-first organic trust engine</strong>.
              </p>
              <ul className="space-y-2 text-neutral-300 font-mono text-xs">
                <li>→ Shift focus entirely to high-intent Local SEO and Medical Schema.</li>
                <li>→ Build clean, semantic code structure that ranks naturally without heavy link spam.</li>
                <li>→ Nurture long-term brand equity so patients explicitly search for the brand name.</li>
              </ul>
            </div>
          </section>

          {/* 3. Capabilities Used */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> Capabilities Used
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-md shadow-sm">Local SEO Dominance</span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-md shadow-sm">Medical Schema Architecture</span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-md shadow-sm">Ahrefs Verified Keyword Tracking</span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-md shadow-sm">Zero-SEO Organic Ranking Code</span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-md shadow-sm">Multi-Location Ecosystem</span>
            </div>
          </section>

          {/* 4. Engagement Timeline */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-6 border-b border-neutral-200 pb-2">
              <Milestone className="w-5 h-5 mr-2 text-black" /> 9-Year Partnership Timeline
            </h2>
            <div className="relative border-l border-neutral-200 ml-3 space-y-6 pb-2 text-xs font-mono">
              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-300 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">2017 • Initial Engagement</div>
                <p className="text-neutral-500 font-sans mt-0.5">Core website deployment, Google Business Profile claim, and local medical schema setup.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-300 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">2018–2022 • Local Authority & Ranking</div>
                <p className="text-neutral-500 font-sans mt-0.5">Consistently ranking #1 for high-intent Noida treatment keywords. Transitionedgeneric searchers into direct brand searches.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-300 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">2023–2025 • Self-Sustaining Brand Equity</div>
                <p className="text-neutral-500 font-sans mt-0.5">Ahrefs data logs 880+ monthly searches for "Dr Aggarwal Physio Centre" brand keyword.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-[#22C55E] rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div className="font-bold text-black text-sm font-sans text-emerald-900">2026 • Specialized Unit Launch (360 Neck & Shoulder)</div>
                <p className="text-neutral-600 font-sans mt-0.5">Deployed architecture-first portal at 360neckshoulder.com. Ranking on Pages 3 & 4 organically out-of-the-box before active campaigns.</p>
              </div>
            </div>
          </section>

          {/* 5. Evidence Screenshots & Verification */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> Operational Evidence & Search Proof
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-3 shadow-sm overflow-hidden mb-6">
              {!imgError ? (
                <img 
                  src="/dr-aggarwal.png" 
                  alt="Ahrefs Branded Keyword Proof for Dr Aggarwal Physio Centre" 
                  className="w-full h-auto rounded-lg object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="p-8 bg-neutral-100 rounded-lg text-center font-mono text-xs text-neutral-500 border border-dashed border-neutral-300">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                  <p className="font-bold text-neutral-800 mb-1">Image Path: /public/dr-aggarwal.png</p>
                  <p className="text-[11px] text-neutral-500">
                    Save screenshot in <code className="bg-white px-1.5 py-0.5 rounded border">digixpro-web/public/dr-aggarwal.png</code>
                  </p>
                </div>
              )}

              <div className="p-4 bg-neutral-50 rounded-b-lg border-t border-neutral-100 text-xs font-mono text-neutral-600 flex justify-between items-center">
                <span>Source: Ahrefs Search Analytics Data Log</span>
                <span className="font-bold text-black">880 Monthly Branded Searches</span>
              </div>
            </div>

            {/* Public Verification Link */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-5 text-xs text-neutral-700 space-y-2 font-mono">
              <div className="flex items-center text-black font-bold">
                <ExternalLink className="w-4 h-4 mr-2 text-[#22C55E]" /> Live Public Verification
              </div>
              <p className="font-sans leading-relaxed text-neutral-600">
                Verify this partnership directly on Dr Aggarwal Physio Centre's official portal at <a href="https://draggarwalphysio.com" target="_blank" rel="noreferrer" className="text-black font-bold underline hover:text-[#22C55E]">draggarwalphysio.com</a> and their specialized unit at <a href="https://360neckshoulder.com/" target="_blank" rel="noreferrer" className="text-black font-bold underline hover:text-[#22C55E]">360neckshoulder.com</a>.
              </p>
            </div>
          </section>

          {/* 6. Knowledge Generated (Connected to Knowledge Base) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <BookOpen className="w-5 h-5 mr-2 text-black" /> Knowledge Generated
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              
              <a href="/knowledge" className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm hover:border-[#22C55E] transition block">
                <div className="text-[#22C55E] font-bold mb-1">FRAMEWORK-004</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Healthcare Trust Architecture</div>
                <p className="text-neutral-500 font-sans text-[11px]">Systemic blueprint for building local clinical authority without relying on paid advertising.</p>
              </a>

              <a href="/knowledge" className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm hover:border-blue-500 transition block">
                <div className="text-blue-600 font-bold mb-1">MATRIX-006</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Local Authority Decision Model</div>
                <p className="text-neutral-500 font-sans text-[11px]">Evaluating when to pivot from generic keyword targeting to direct brand equity building.</p>
              </a>

              <a href="/knowledge" className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm hover:border-red-500 transition block sm:col-span-2">
                <div className="text-red-600 font-bold mb-1 flex items-center"><XCircle className="w-3.5 h-3.5 mr-1" /> FAILURE LOGGED-001</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Ads Before Trust Don't Scale</div>
                <p className="text-neutral-500 font-sans text-[11px]">Why running PPC ads for healthcare practices before establishing local schema & map pack authority results in high bounce rates and burned budgets.</p>
              </a>

            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle Box */}
        <div className="md:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            {/* Derived Principle Card */}
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-012</div>
              <p className="text-base font-medium leading-relaxed text-neutral-100 mb-4">
                "When information architecture is correctly aligned with human search intent, software ranks naturally before marketing money is spent."
              </p>
              <div className="text-[10px] font-mono text-neutral-400 pt-3 border-t border-neutral-800">
                Derived from: Dr Aggarwal Physio & 360 Neck & Shoulder (9-Year Field Data)
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Facing a Similar Healthcare Bottleneck?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Book a 20-min free decision call to evaluate your local trust architecture.</p>
              <a href="mailto:consult@digixpro.in?subject=Healthcare%20Systems%20Audit" className="block w-full py-2.5 bg-black text-white font-bold rounded hover:bg-[#22C55E] hover:text-black transition">
                Book Systems Audit
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}