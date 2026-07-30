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
  Server, 
  Cpu, 
  ShieldCheck, 
  FileCheck,
  BookOpen,
  Layers,
  Share2,
  Download,
  BookMarked,
  Image as ImageIcon
} from 'lucide-react';

export default function MuktibodhClient() {
  const [libError, setLibError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [readerError, setReaderError] = useState(false);
  const [magError, setMagError] = useState(false);

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
            Architecture Report
          </span>
          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold uppercase tracking-widest">
            Knowledge Publishing Engine
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight">
          Muktibodh
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Engineering a Multi-Format Digital Knowledge Delivery System.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          Moving beyond downloadable PDFs to build an interactive, dual-mode reading ecosystem complete with digital libraries, flipbook rendering, and AI-ready knowledge indexing.
        </p>
      </div>

      {/* ABOVE THE FOLD: Hero Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-600" /> Core Engine
          </div>
          <div className="text-lg font-extrabold text-amber-950 font-mono mt-1">Knowledge Engine</div>
          <p className="text-[11px] text-amber-800 mt-1">Structured corpus delivery</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <BookMarked className="w-3.5 h-3.5 mr-1 text-black" /> Reading Modes
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Dual Mode</div>
          <p className="text-[11px] text-neutral-500 mt-1">Blog style & Book style</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-black" /> Formats
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Flipbook + PDF</div>
          <p className="text-[11px] text-neutral-500 mt-1">Interactive distribution</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Cpu className="w-3.5 h-3.5 mr-1 text-black" /> Status
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Production Ready</div>
          <p className="text-[11px] text-neutral-500 mt-1">AI-ready indexing</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* PROBLEM: Normal Institutions vs Muktibodh */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. The Knowledge Loss Problem in Institutions
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Normal cultural and academic institutions treat publications as dead files. They upload unindexed PDFs to random drives or chat groups, resulting in zero engagement and lost intellectual property:
            </p>
            
            <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>Raw PDF Uploads</span>
                <span className="text-red-600 font-bold">Unsearchable Files</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>Distributed via WhatsApp / Google Drive</span>
                <span className="text-red-600 font-bold">Fragmented Distribution</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>No Reading Experience or Indexing</span>
                <span className="text-red-600 font-bold">Low Reader Retention</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-red-50 border border-red-200 p-3 rounded text-red-950 font-bold">
                <span>Institutional Knowledge is Effectively Lost</span>
                <span>Systemic Inefficiency</span>
              </div>
              <div className="text-center text-[#22C55E] font-bold">↓ Replaced By ↓</div>
              <div className="flex items-center justify-between bg-[#0A0A0A] text-white p-3.5 rounded font-bold">
                <span>Muktibodh (Structured Knowledge Publishing Engine)</span>
                <span className="text-[#22C55E]">Complete Delivery Layer</span>
              </div>
            </div>
          </section>

          {/* ARCHITECTURE DECISION */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Publishing Architecture Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">// ARCHITECTURE LOG</p>
              <p className="mb-4 leading-relaxed">
                Instead of treating publications as downloadable PDFs, we engineered a <strong>structured knowledge delivery layer</strong>.
              </p>
              <p className="text-xs text-neutral-300 font-mono leading-relaxed mb-3">
                Every publication is accessible through an intentional UX pipeline:
              </p>
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800 text-xs font-mono text-neutral-200">
                Read Button → Book Detail Page → Choose Reader (Flipbook vs. Blog Reader) → Distribution & Sharing
              </div>
            </div>
          </section>

          {/* CORE MODULES */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. Core Publishing Modules
            </h2>
            <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-01</span>
                <span className="font-bold text-black font-sans">Digital Library</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-02</span>
                <span className="font-bold text-black font-sans">Book Catalog</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-03</span>
                <span className="font-bold text-black font-sans">Magazine Archive</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-04</span>
                <span className="font-bold text-black font-sans">Book Detail View</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-05</span>
                <span className="font-bold text-black font-sans">Flipbook Reader</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-06</span>
                <span className="font-bold text-black font-sans">Blog Reader Mode</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-07</span>
                <span className="font-bold text-black font-sans">PDF Distribution</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-08</span>
                <span className="font-bold text-black font-sans">Knowledge Metadata</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm">
                <span className="text-amber-700 font-bold block mb-1">MODULE-09</span>
                <span className="font-bold text-black font-sans">Sharing Layer</span>
              </div>
            </div>
          </section>

          {/* KNOWLEDGE FLOW PIPELINE */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <BookOpen className="w-5 h-5 mr-2 text-black" /> 4. Structured Knowledge Flow
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4 font-mono text-xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-neutral-50 p-4 rounded border text-center">
                <span className="bg-white px-3 py-2 rounded border font-bold">Structured Corpus</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold">Library Discovery</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold">Book Metadata</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold">Dual Reader (Blog/Flip)</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-amber-50 text-amber-900 px-3 py-2 rounded border border-amber-200 font-bold">AI Ready</span>
              </div>
            </div>
          </section>

          {/* PRODUCTION EVIDENCE SECTION (2x2 Rectangular Grid with Badges) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 5. Production Evidence & UI Flow
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6 mb-6">
              <div className="text-xs font-mono text-neutral-500">
                Verified Multi-Format Knowledge Delivery Pipeline (Discover → Select → Read → Publish):
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* 1. Library Discovery */}
                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">DISCOVERY</span>
                    <span className="text-[11px] font-bold text-neutral-700">Library Homepage</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!libError ? (
                      <img 
                        src="/muktibodh-lib.png" 
                        alt="Digital Library Discovery" 
                        className="w-full h-auto object-contain max-h-[280px]"
                        onError={() => setLibError(true)}
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">muktibodh-lib.png missing in /public/</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mt-2 text-center">Digital Library Discovery</div>
                </div>

                {/* 2. Book Detail & Metadata */}
                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">METADATA</span>
                    <span className="text-[11px] font-bold text-neutral-700">Book Detail Page</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!detailError ? (
                      <img 
                        src="/muktibodh-detail.png" 
                        alt="Structured Book Detail & Reading Options" 
                        className="w-full h-auto object-contain max-h-[280px]"
                        onError={() => setDetailError(true)}
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">muktibodh-detail.png missing in /public/</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mt-2 text-center">Structured Book Detail & Reading Options</div>
                </div>

                {/* 3. Interactive Flipbook Reader */}
                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">READING ENGINE</span>
                    <span className="text-[11px] font-bold text-neutral-700">Flipbook Reader</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!readerError ? (
                      <img 
                        src="/muktibodh-reader.png" 
                        alt="Interactive Flipbook Reading Engine" 
                        className="w-full h-auto object-contain max-h-[280px]"
                        onError={() => setReaderError(true)}
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">muktibodh-reader.png missing in /public/</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mt-2 text-center">Interactive Flipbook Reading Engine</div>
                </div>

                {/* 4. Magazine Publishing Archive */}
                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">PUBLISHING</span>
                    <span className="text-[11px] font-bold text-neutral-700">Magazine Archive</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!magError ? (
                      <img 
                        src="/muktibodh-mag.png" 
                        alt="Monthly Magazine Publishing & Archive" 
                        className="w-full h-auto object-contain max-h-[280px]"
                        onError={() => setMagError(true)}
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">muktibodh-mag.png missing in /public/</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mt-2 text-center">Monthly Magazine Publishing & Archive</div>
                </div>

              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-600 flex justify-between items-center mt-4">
                <span>Status: Production Deployment</span>
                <span className="font-bold text-amber-700">Knowledge Delivery Layer</span>
              </div>
            </div>
          </section>

          {/* INSTITUTIONAL OUTCOMES */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Target className="w-5 h-5 mr-2 text-black" /> 6. Publishing Outcomes
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-700">
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Transitioned from static PDFs to interactive reading UX</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Implemented dual reading modes (Blog & Flipbook)</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Structured book metadata & search indexing</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Seamless magazine archive & distribution layer</span>
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
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-055</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                "Knowledge compounds only when publication, discovery, reading, sharing, and preservation are engineered as one continuous system."
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Disjointed document sharing destroys intellectual value. True digital publishing requires an integrated delivery ecosystem.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Validated by production publishing engine
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Building a Publication System?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let's discuss engineering digital knowledge delivery layers.</p>
              <a href="mailto:consult@digixpro.in?subject=Publishing%20Architecture%20Audit" className="block w-full py-2.5 bg-black text-white font-bold rounded hover:bg-amber-600 hover:text-white transition">
                Book Publishing Audit
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}