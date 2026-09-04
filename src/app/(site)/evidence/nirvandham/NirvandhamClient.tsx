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
  Building,
  BookOpen,
  Globe,
  Image as ImageIcon,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function NirvandhamClient() {
  const [homeError, setHomeError] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [appError, setAppError] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-24 md:pb-12">
      
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
          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold uppercase tracking-widest">
            First Production Tenant
          </span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
            Tech Track
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black">
          Nirvandham Operations System Case Study
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Deploying a Governed Digital Institution at Production Scale.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          The first real-world production deployment of the SattvaOS ecosystem: unifying multilingual publishing, AI-guided learning, digital libraries, and institutional governance.
        </p>
      </div>

      {/* ABOVE THE FOLD: Production Scale Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider mb-1 flex items-center">
            <Building className="w-3.5 h-3.5 mr-1 text-purple-600" /> Tenant Status
          </div>
          <div className="text-lg font-extrabold text-purple-950 font-mono mt-1">Production Tenant</div>
          <p className="text-[11px] text-purple-800 mt-1">Live SattvaOS instance</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Globe className="w-3.5 h-3.5 mr-1 text-black" /> Localization
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Hindi + English</div>
          <p className="text-[11px] text-neutral-500 mt-1">Multilingual engine</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Cpu className="w-3.5 h-3.5 mr-1 text-black" /> Intelligence
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">AI Guide</div>
          <p className="text-[11px] text-neutral-500 mt-1">Governed RAG retrieval</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-black" /> Corpus
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Structured</div>
          <p className="text-[11px] text-neutral-500 mt-1">Unified repository</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* SECTION 1: Traditional Websites vs Nirvandham */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. Why Traditional Institutional Websites Fail
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Conventional digital properties built for spiritual and cultural institutions are treated as static brochures. They lack systemic architecture, resulting in fragmented and unsearchable repositories:
            </p>
            
            <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>Static HTML Pages</span>
                <span className="text-red-600 font-bold">Unstructured Data</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>No Central Knowledge Governance</span>
                <span className="text-red-600 font-bold">Siloed Libraries</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>No Multilingual Retrieval</span>
                <span className="text-red-600 font-bold">Language Barriers</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-red-50 border border-red-200 p-3 rounded text-red-950 font-bold">
                <span>Knowledge Remains Unsearchable &amp; Fragmented</span>
                <span>Systemic Failure</span>
              </div>
              <div className="text-center text-[#22C55E] font-bold">↓ Replaced By ↓</div>
              <div className="flex items-center justify-between bg-[#0A0A0A] text-white p-3.5 rounded font-bold">
                <span>Nirvandham (Governed Knowledge Platform)</span>
                <span className="text-[#22C55E]">Unified Architecture</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: Architecture Decision */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Institutional Architecture Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">Tenant architecture</p>
              <p className="mb-4 leading-relaxed">
                Instead of building a conventional content website, we engineered Nirvandham as the <strong>first production tenant running on the SattvaOS governed infrastructure</strong>.
              </p>
              <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                Every book, every magazine article, every AI response, every member interaction, and every published corpus shares one single institutional knowledge architecture.
              </p>
            </div>
          </section>

          {/* SECTION 3: Production Modules */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. Deployed Production Modules
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-purple-700 font-bold uppercase tracking-wider mb-2 text-[10px]">Knowledge &amp; Content Engine</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Digital Library</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Structured Books</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Knowledge Corpus</span>
                </div>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-blue-700 font-bold uppercase tracking-wider mb-2 text-[10px]">AI Intelligence &amp; Publishing</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">AI Guide Assistant</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Muktibodh Magazine</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Multilingual Engine</span>
                </div>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-emerald-700 font-bold uppercase tracking-wider mb-2 text-[10px]">Member Portal &amp; Operations</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Member Portal</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">QR Donation System</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Mobile Application</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: Production Evidence Views */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 4. Production Deployment Evidence
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm space-y-4 mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-neutral-200 rounded-lg p-2 bg-neutral-50 flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-neutral-200 rounded flex items-center justify-center overflow-hidden mb-2 relative">
                    {!homeError ? (
                      <Image
                        src="/nirvandham-home.png" 
                        alt="Live Homepage" 
                        width={800}
                        height={800}
                        className="w-full h-full object-cover object-center"
                        onError={() => setHomeError(true)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-500">nirvandham-home.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-center text-neutral-700">Live Homepage</div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-2 bg-neutral-50 flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-neutral-200 rounded flex items-center justify-center overflow-hidden mb-2 relative">
                    {!aiError ? (
                      <Image
                        src="/nirvandham-ai.png" 
                        alt="Structured Knowledge Library" 
                        width={800}
                        height={800}
                        className="w-full h-full object-cover object-center"
                        onError={() => setAiError(true)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-500">nirvandham-ai.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-center text-neutral-700">Knowledge Library</div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-2 bg-neutral-50 flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-neutral-200 rounded flex items-center justify-center overflow-hidden mb-2 relative">
                    {!appError ? (
                      <Image
                        src="/nirvandham-app.png" 
                        alt="Governed AI Retrieval" 
                        width={800}
                        height={800}
                        className="w-full h-full object-cover object-center"
                        onError={() => setAppError(true)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-500">nirvandham-app.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-center text-neutral-700">Governed AI Retrieval</div>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-600 flex justify-between items-center">
                <span>Status: Production Deployment</span>
                <span className="font-bold text-purple-700">First SattvaOS Tenant</span>
              </div>
            </div>
          </section>

          {/* 5. What We Deliberately Did Not Do */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Ban className="w-5 h-5 text-red-500" /> 5. What We Deliberately Did Not Do
            </h2>
            <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Paywalls on Educational Corpus:</strong> We did not lock spiritual and educational publications behind mandatory payment gates; knowledge remains accessible at zero cost.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Replacement of Traditional Teaching:</strong> AI guides were engineered as contextual assistant layers, not as automated replacements for human spiritual teachers.</span>
              </div>
            </div>
          </section>

          {/* 6. Critical Buyer Questions Answered */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <HelpCircle className="w-5 h-5 text-purple-600" /> 6. Critical Buyer Questions Answered
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;How do we unify an organization&apos;s scattered documents and publications into a searchable digital platform?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  By building a structured knowledge repository where digital books, magazine archives, and research papers share standardized JSON-LD metadata schemas, unified RAG vector embeddings, and dual-language reading interfaces.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Frequently Asked Questions */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <FileText className="w-5 h-5 text-emerald-600" /> 7. Frequently Asked Questions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-sans">
              <div>
                <h3 className="font-bold text-black text-sm mb-1">What is a digital institution platform?</h3>
                <p className="text-neutral-600 leading-relaxed">A digital institution platform unifies publishing, digital libraries, member accounts, multilingual search, and governed AI retrieval into a single integrated digital ecosystem.</p>
              </div>
            </div>
          </section>

          {/* 8. Related DigiXPro Service Link */}
          <section className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider block mb-1">Related Advisory Architecture</span>
                <h3 className="text-lg font-bold text-purple-950">Digital Transformation Consulting</h3>
                <p className="text-xs text-purple-800 mt-1">Discover how DigiXPro guides organizations from fragmented legacy processes to unified digital ecosystems.</p>
              </div>
              <Link 
                href="/advisory/digital-transformation-consulting"
                className="inline-flex items-center justify-center px-5 py-3 bg-purple-700 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition shrink-0 font-sans"
              >
                View Transformation Advisory <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle & Consultative CTA */}
        <div className="md:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-042</div>
              <p className="text-lg font-bold leading-tight text-white mb-3 font-sans">
                &ldquo;Knowledge becomes an institutional asset only when publishing, search, AI, and governance share the same architecture.&rdquo;
              </p>
              <p className="text-xs font-medium leading-relaxed text-neutral-300 mb-4 font-sans">
                Without a unified foundation, content remains scattered across isolated tools.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Validated by Nirvandham Deployment
              </div>
            </div>

            {/* Consultative CTA Card */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Building an Institution?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s discuss deploying governed digital infrastructure for your organization.</p>
              <Link href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-sm font-sans">
                Book Architecture Call
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
