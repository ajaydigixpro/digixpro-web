'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  Cpu, 
  BookOpen,
  Layers,
  BookMarked,
  Image as ImageIcon,
  Video,
  ExternalLink,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function MuktibodhClient() {
  const [libError, setLibError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [readerError, setReaderError] = useState(false);
  const [magError, setMagError] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20">
      
      {/* Navigation Back */}
      <Link href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </Link>

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-black bg-neutral-200 px-2 py-0.5 rounded border border-neutral-300 font-bold uppercase tracking-widest">
            Architecture Report
          </span>
          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold uppercase tracking-widest">
            Knowledge Publishing Engine
          </span>
          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold uppercase tracking-widest">
            Design Track
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black">
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
          <p className="text-[11px] text-neutral-500 mt-1">Blog style &amp; Book style</p>
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
          
          {/* PROBLEM */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. The Knowledge Loss Problem in Publishing
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
                <span>Distributed via Chat / Drive</span>
                <span className="text-red-600 font-bold">Fragmented Distribution</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-red-50 border border-red-200 p-3 rounded text-red-950 font-bold">
                <span>Institutional Knowledge is Lost</span>
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
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Publishing Architecture Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">Architecture log</p>
              <p className="mb-4 leading-relaxed">
                Instead of treating publications as downloadable PDFs, we engineered a <strong>structured knowledge delivery layer</strong>.
              </p>
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800 text-xs font-mono text-neutral-200">
                Read Button → Book Detail Page → Choose Reader (Flipbook vs. Blog Reader) → Distribution &amp; Sharing
              </div>
            </div>
          </section>

          {/* PRODUCTION EVIDENCE SECTION */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 3. Production Evidence &amp; UI Flow
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">DISCOVERY</span>
                    <span className="text-[11px] font-bold text-neutral-700">Library Homepage</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!libError ? (
                      <Image
                        src="/evidence/muktibodh/muktibodh-lib.png" 
                        alt="Digital Library Discovery" 
                        width={1920}
                        height={912}
                        className="w-full h-auto object-contain max-h-[280px]"
                        onError={() => setLibError(true)}
                        priority
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">muktibodh-lib.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mt-2 text-center">Digital Library Discovery</div>
                </div>

                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">READING ENGINE</span>
                    <span className="text-[11px] font-bold text-neutral-700">Flipbook Reader</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!readerError ? (
                      <Image
                        src="/evidence/muktibodh/muktibodh-reader.png" 
                        alt="Interactive Flipbook Reading Engine" 
                        width={1920}
                        height={912}
                        className="w-full h-auto object-contain max-h-[280px]"
                        onError={() => setReaderError(true)}
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">muktibodh-reader.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mt-2 text-center">Interactive Flipbook Reading Engine</div>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-600 flex justify-between items-center">
                <span>Status: Production Deployment</span>
                <span className="font-bold text-amber-700">Knowledge Delivery Layer</span>
              </div>
            </div>
          </section>

          {/* 4. What We Deliberately Did Not Do */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Ban className="w-5 h-5 text-red-500" /> 4. What We Deliberately Did Not Do
            </h2>
            <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Flat PDF Lock-in:</strong> We did not restrict digital readers to clunky PDF downloads; we engineered dual interactive reading modes (clean web reader &amp; flipbook).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Generic Page-Builder Overhead:</strong> We did not build the publishing portal using slow third-party CMS plugins that degrade mobile reading performance.</span>
              </div>
            </div>
          </section>

          {/* 5. Critical Buyer Questions Answered */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <HelpCircle className="w-5 h-5 text-purple-600" /> 5. Critical Buyer Questions Answered
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;Why are static PDF downloads ineffective for digital publications, and how does multi-format publishing help?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Static PDFs require manual downloads, consume mobile storage, and are unindexed by search engines or AI bots. Multi-format web publishing makes every chapter indexable by Google while giving readers an instant interactive experience.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Frequently Asked Questions */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <FileText className="w-5 h-5 text-emerald-600" /> 6. Frequently Asked Questions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-sans">
              <div>
                <h3 className="font-bold text-black text-sm mb-1">What is dual-mode digital reading UX?</h3>
                <p className="text-neutral-600 leading-relaxed">Dual-mode reading allows readers to toggle seamlessly between a clean, responsive web article view (for fast mobile reading) and an interactive flipbook view (for page-by-page publication reading).</p>
              </div>
            </div>
          </section>

          {/* 7. MULTI-PLATFORM PRESENCE & EDITORIAL CREDITS */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Video className="w-5 h-5 mr-2 text-red-600" /> 7. Multi-Platform Presence &amp; Editorial Credits
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm text-xs font-mono space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-black text-sm font-sans block mb-1">Muktibodh Digital Channel</span>
                  <p className="text-neutral-500 font-sans text-xs">Official publication media channel and digital video archive.</p>
                </div>
                <a 
                  href="https://www.youtube.com/@muktibodhmagazine" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shrink-0"
                >
                  <Video className="w-4 h-4 mr-2" /> Visit YouTube Channel <ExternalLink className="w-3 h-3 ml-1.5 opacity-80" />
                </a>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 font-sans italic">
                Designed &amp; typeset by Ajay Shukla, in collaboration with Nirvan Dham.
              </div>
            </div>
          </section>

          {/* 8. Related DigiXPro Service Link */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                <h3 className="text-lg font-bold text-amber-950">Custom Business Website Design</h3>
                <p className="text-xs text-amber-800 mt-1">Explore how DigiXPro designs bespoke publishing portals, custom media sites, and content systems.</p>
              </div>
              <Link 
                href="/design-services/custom-business-website-design"
                className="inline-flex items-center justify-center px-5 py-3 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition shrink-0 font-sans"
              >
                View Website Design Service <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle */}
        <div className="md:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-055</div>
              <p className="text-lg font-bold leading-tight text-white mb-3 font-sans">
                &ldquo;Knowledge compounds only when publication, discovery, reading, sharing, and preservation are engineered as one continuous system.&rdquo;
              </p>
              <p className="text-xs font-medium leading-relaxed text-neutral-300 mb-4 font-sans">
                Disjointed document sharing destroys intellectual value.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Validated by Muktibodh Engine
              </div>
            </div>

            {/* Consultative CTA Card */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Building a Publication System?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s discuss engineering digital knowledge delivery layers for your organization.</p>
              <Link href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-amber-600 transition shadow-sm font-sans">
                Book Architecture Call
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
