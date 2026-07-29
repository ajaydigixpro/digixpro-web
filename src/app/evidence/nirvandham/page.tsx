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
  Building,
  BookOpen,
  Globe,
  Smartphone,
  Layers,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

export default function NirvandhamEvidence() {
  const [homeError, setHomeError] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [appError, setAppError] = useState(false);

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
          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold uppercase tracking-widest">
            First Production Tenant
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight">
          Nirvandham
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Deploying a Governed Digital Institution at Production Scale.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          The first real-world production deployment of the SattvaOS ecosystem: unifying multilingual publishing, AI-guided learning, digital libraries, and institutional governance.
        </p>
      </div>

      {/* ABOVE THE FOLD: Production Scale Cards (With Structured Corpus added) */}
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
          
          {/* SECTION 1: Why Traditional Spiritual Websites Fail */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
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
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span>No Member Progression or AI Integration</span>
                <span className="text-red-600 font-bold">Passive Experience</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-red-50 border border-red-200 p-3 rounded text-red-950 font-bold">
                <span>Knowledge Remains Unsearchable & Fragmented</span>
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
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Institutional Architecture Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">// TENANT ARCHITECTURE</p>
              <p className="mb-4 leading-relaxed">
                Instead of building a conventional content website, we engineered Nirvandham as the <strong>first production tenant running on the SattvaOS governed infrastructure</strong>.
              </p>
              <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                Every book, every magazine article, every AI response, every member interaction, and every published corpus shares one single institutional knowledge architecture.
              </p>
            </div>
          </section>

          {/* SECTION 3: Production Modules (Categorized / Grouped Hierarchically) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. Deployed Production Modules
            </h2>
            <div className="space-y-4 text-xs font-mono">
              
              {/* Knowledge Group */}
              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-purple-700 font-bold uppercase tracking-wider mb-2 text-[10px]">Knowledge & Content Engine</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Digital Library</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Structured Books</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Knowledge Corpus</span>
                </div>
              </div>

              {/* AI & Publishing Group */}
              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-blue-700 font-bold uppercase tracking-wider mb-2 text-[10px]">AI Intelligence & Publishing</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">AI Guide Assistant</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Muktibodh Magazine</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Multilingual Engine</span>
                </div>
              </div>

              {/* Portal & Operations Group */}
              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-emerald-700 font-bold uppercase tracking-wider mb-2 text-[10px]">Member Portal & Operations</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Member Portal</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">QR Donation System</span>
                  <span className="bg-neutral-50 border p-2 rounded text-center text-black font-sans font-medium">Mobile Application</span>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4: Structured Knowledge Assets */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <BookOpen className="w-5 h-5 mr-2 text-black" /> 4. Structured Knowledge Pipeline
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4 font-mono text-xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-neutral-50 p-4 rounded border text-center">
                <span className="bg-white px-3 py-2 rounded border font-bold">Books Corpus</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold">Magazine Archive</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold">Research Articles</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white px-3 py-2 rounded border font-bold">AI Guide Index</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-purple-50 text-purple-900 px-3 py-2 rounded border border-purple-200 font-bold">Knowledge Corpus</span>
              </div>
              <p className="text-neutral-600 text-xs font-sans leading-relaxed">
                Thousands of structured knowledge nodes published through one governed repository, instantly searchable and accessible in both Hindi and English.
              </p>
            </div>
          </section>

          {/* SECTION 5: Production Deployment Evidence (Ordered: Homepage -> Digital Library -> AI Guide Chat) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 5. Production Deployment Evidence
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm space-y-4 mb-6">
              <div className="text-xs font-mono text-neutral-500">
                Verified Multi-Surface Deployment (Ordered by User Journey):
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                
                {/* 1. Live Homepage */}
                <div className="border border-neutral-200 rounded-lg p-2 bg-neutral-50 flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-neutral-200 rounded flex items-center justify-center overflow-hidden mb-2 relative">
                    {!homeError ? (
                      <img 
                        src="/nirvandham-home.png" 
                        alt="Live Homepage" 
                        className="w-full h-full object-cover object-center"
                        onError={() => setHomeError(true)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-500">nirvandham-home.png missing</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-center text-neutral-700">Live Homepage</div>
                </div>

                {/* 2. Structured Knowledge Library */}
                <div className="border border-neutral-200 rounded-lg p-2 bg-neutral-50 flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-neutral-200 rounded flex items-center justify-center overflow-hidden mb-2 relative">
                    {!aiError ? (
                      <img 
                        src="/nirvandham-ai.png" 
                        alt="Structured Knowledge Library" 
                        className="w-full h-full object-cover object-center"
                        onError={() => setAiError(true)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-500">nirvandham-ai.png missing</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-center text-neutral-700">Structured Knowledge Library</div>
                </div>

                {/* 3. Governed AI Retrieval */}
                <div className="border border-neutral-200 rounded-lg p-2 bg-neutral-50 flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-neutral-200 rounded flex items-center justify-center overflow-hidden mb-2 relative">
                    {!appError ? (
                      <img 
                        src="/nirvandham-app.png" 
                        alt="Governed AI Retrieval" 
                        className="w-full h-full object-cover object-center"
                        onError={() => setAppError(true)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-500">nirvandham-app.png missing</span>
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

          {/* SECTION 7: Institutional Outcomes (With concrete numbers) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Target className="w-5 h-5 mr-2 text-black" /> 6. Institutional Outcomes
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-700">
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span><strong>10+</strong> Digital Books & Publications</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span><strong>2 Languages</strong> (Hindi + English) Live</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span><strong>AI Guide</strong> Active for Corpus Retrieval</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span><strong>Muktibodh</strong> Magazine Publishing Pipeline</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span><strong>Mobile App</strong> & Member Portal Ecosystem</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span><strong>Production Tenant</strong> on SattvaOS</span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle Box */}
        <div className="md:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            {/* SECTION 6: Derived Principle (Validated by first production deployment) */}
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-042</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                "Knowledge becomes an institutional asset only when publishing, search, AI, and governance share the same architecture."
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Without a unified foundation, content remains scattered across isolated tools, failing to compound in value.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Validated by first production deployment
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Building an Institution?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let's discuss deploying governed digital infrastructure.</p>
              <a href="mailto:consult@digixpro.in?subject=Institutional%20Architecture%20Audit" className="block w-full py-2.5 bg-black text-white font-bold rounded hover:bg-purple-700 hover:text-white transition">
                Book Institution Audit
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}