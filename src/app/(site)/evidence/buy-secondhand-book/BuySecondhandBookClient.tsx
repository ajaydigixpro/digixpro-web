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
  Clock,
  Cpu,
  ShoppingCart,
  RefreshCw,
  FileCheck,
} from 'lucide-react';

export default function BuySecondhandBookClient() {
  const [activeMetricTab, setActiveMetricTab] = useState<'performance' | 'migration'>('performance');

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
            Commerce Operating System
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight">
          Buy Secondhand Books
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Modernizing a Legacy Top-10 National Bookstore via Decoupled Architecture.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          How we engineered a high-performance commerce operating system to revitalize an established market player facing outranking pressures due to technological shifts.
        </p>
      </div>

      {/* ABOVE THE FOLD: Top Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center">
            <ShoppingCart className="w-3.5 h-3.5 mr-1 text-amber-600" /> Legacy Milestone
          </div>
          <div className="text-2xl font-extrabold text-amber-950 font-mono mt-1">Top 8 in India</div>
          <p className="text-[11px] text-amber-800 mt-1">Peak historical national rank tier</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Modern Stack
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Decoupled OS</div>
          <p className="text-[11px] text-neutral-500 mt-1">Next-gen performance shift</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-black" /> Migration Time
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">1 Week Sprint</div>
          <p className="text-[11px] text-neutral-500 mt-1">Zero-downtime stack transition</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1 text-black" /> Business Engine
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Resilient Sales</div>
          <p className="text-[11px] text-neutral-500 mt-1">Strong baseline retention</p>
        </div>
      </div>

      {/* PLATFORM SCALE BAR */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-12 shadow-sm font-mono text-xs">
        <div className="text-neutral-500 font-bold uppercase tracking-wider mb-3 text-[10px]">Commerce Core Architecture Highlights:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">🏷️ Pricing Psychology</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">📦 Inventory Dynamics</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">⚡ Decoupled Speed</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">💳 Gateway Integration</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center sm:col-span-3 md:col-span-1">🔍 Core SEO Migration</span>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. Business Problem */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. The Legacy Technology & Outranking Challenge
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              Buy Secondhand Books was historically ranked among the top 8 online bookstores in India (peak national ranking milestone), enjoying massive organic search volume. However, as web standards evolved and modern decoupled frameworks took over search engine preference, legacy tech debt began causing outranking pressures. Despite resilient baseline sales, technical latency threatened future growth.
            </p>
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2 text-xs text-neutral-700 font-mono">
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Legacy architecture slowing down page delivery and Core Web Vitals.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Outranking vulnerability against newer, tech-optimized competitors.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Maintaining high inventory turnover while executing a zero-downtime stack shift.</div>
            </div>
          </section>

          {/* 2. Architecture Decision */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Commerce Modernization Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">Architecture log</p>
              <p className="mb-4 leading-relaxed">
                Instead of patching a decaying monolithic setup, we engineered a <strong>modern decoupled Commerce Operating System</strong> optimized for speed, precise pricing algorithms, and seamless checkout flows.
              </p>
              <ul className="space-y-2 text-neutral-300 font-mono text-xs">
                <li>→ Decoupled frontend presentation layer for instantaneous loading speeds.</li>
                <li>→ Integrated core supply-demand inventory logic tailored specifically for second-hand book valuation.</li>
                <li>→ Configured clean transactional rails awaiting final payment gateway synchronization.</li>
              </ul>
            </div>
          </section>

          {/* 3. System Architecture Diagram */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Server className="w-5 h-5 mr-2 text-black" /> 3. Commerce Architecture Pipeline
            </h2>
            <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <span className="bg-neutral-100 px-3 py-2 rounded border border-neutral-200 font-bold">1. Legacy Core</span> → 
                <span className="bg-neutral-100 px-3 py-2 rounded border border-neutral-200 font-bold">2. Decoupled Frontend</span> → 
                <span className="bg-neutral-100 px-3 py-2 rounded border border-neutral-200 font-bold">3. Inventory Engine</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-2 rounded font-bold">6. Compound Growth</span> ← 
                <span className="bg-neutral-100 px-3 py-2 rounded border border-neutral-200 font-bold">5. Secure Checkout</span> ← 
                <span className="bg-neutral-100 px-3 py-2 rounded border border-neutral-200 font-bold">4. Pricing Psychology Matrix</span>
              </div>
            </div>
          </section>

          {/* 4. Pricing Psychology & Inventory Intelligence */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> 4. Pricing Psychology & Inventory Intelligence
            </h2>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Unlike standard retail e-commerce where pricing is static, second-hand book marketplaces require fluid algorithms based on book condition, rarity, and real-time student demand.
            </p>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4 text-xs font-mono">
              <div className="border-b border-neutral-100 pb-3">
                <div className="text-black font-bold text-sm font-sans mb-1">The Pricing Matrix Trick</div>
                <p className="font-sans text-neutral-600">Engineered a dynamic valuation algorithm that balances acquisition cost against seasonal academic demand cycles, maximizing margins while keeping conversion rates high.</p>
              </div>
              <div>
                <div className="text-black font-bold text-sm font-sans mb-1">High-Throughput SKU Management</div>
                <p className="font-sans text-neutral-600">Optimized database indexing to handle thousands of unique, single-item SKU entries without query lag.</p>
              </div>
            </div>
          </section>

          {/* 5. Key Engineering Decisions */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Cpu className="w-5 h-5 mr-2 text-black" /> 5. Key Engineering Decisions
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Transitioned from legacy monolithic to decoupled stack</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Embedded advanced pricing psychology models</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Optimized single-item SKU database queries</span>
              </div>
              <div className="bg-white p-3.5 border border-neutral-200 rounded-lg shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-2 shrink-0" />
                <span>Executed 1-week deployment sprint pending gateway sync</span>
              </div>
            </div>
          </section>

          {/* 6. Measurable Migration Proof & Performance Logs */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 6. Measurable Migration Metrics
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex gap-2 border-b border-neutral-200 pb-3 font-mono text-xs">
                <button 
                  onClick={() => setActiveMetricTab('performance')}
                  className={`px-3 py-1.5 rounded transition ${activeMetricTab === 'performance' ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                >
                  Core Web Vitals Boost
                </button>
                <button 
                  onClick={() => setActiveMetricTab('migration')}
                  className={`px-3 py-1.5 rounded transition ${activeMetricTab === 'migration' ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                >
                  Migration Velocity
                </button>
              </div>

              <div className="text-xs font-mono text-neutral-700 pt-2">
                {activeMetricTab === 'performance' && (
                  <div className="space-y-3">
                    <div className="text-black font-bold text-sm font-sans">Lighthouse & Latency Improvement</div>
                    <p className="font-sans text-neutral-600">By decoupling the frontend presentation layer from the legacy backend, First Contentful Paint (FCP) dropped significantly, instantly recovering search crawler favorability.</p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-neutral-50 p-3 rounded border text-center">
                        <div className="text-lg font-bold text-black">Sub-second</div>
                        <div className="text-[10px] text-neutral-500">Catalog Load Time</div>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border text-center">
                        <div className="text-lg font-bold text-[#22C55E]">Optimized</div>
                        <div className="text-[10px] text-neutral-500">Core Web Vitals Score</div>
                      </div>
                    </div>
                  </div>
                )}
                {activeMetricTab === 'migration' && (
                  <div className="space-y-3">
                    <div className="text-black font-bold text-sm font-sans">Zero-Downtime Deployment Sprint</div>
                    <p className="font-sans text-neutral-600">Migrated core SKUs, customer records, and inventory taxonomies over a rigorous 7-day engineering cycle without disrupting active daily sales revenue.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 7. Why This Matters */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Target className="w-5 h-5 mr-2 text-black" /> 7. Why This Matters for Commerce Platforms
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm text-amber-950 leading-relaxed space-y-3 font-sans">
              <p>
                Established digital assets often suffer when foundational technology stagnates. Buy Secondhand Books proves that <strong>legacy traffic combined with modernized architecture creates an unbeatable compounding advantage</strong>.
              </p>
              <p className="text-xs font-mono text-amber-900">
                By retaining core domain equity while upgrading the underlying commerce engine, we preserve baseline revenue while positioning the brand to recapture top-tier market leadership.
              </p>
            </div>
          </section>

          {/* 8. FOOTER PROOF: Reusable Knowledge Created */}
          <section className="bg-neutral-900 text-white p-6 rounded-xl border border-neutral-800 space-y-4">
            <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider">
              <FileCheck className="w-4 h-4 mr-2" /> Reusable Intellectual Property Generated
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              This migration project contributed core modules to our internal commerce asset library:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-200">
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Secondhand SKU Valuation Engine</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Decoupled E-commerce Boilerplate</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• High-Velocity Inventory Indexing</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Dynamic Margin Psychology Matrix</div>
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
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-024</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                &ldquo;Legacy domain authority buys time. Modern architecture restores market dominance.&rdquo;
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                In digital commerce, traffic protects the present, but modular architecture secures the future.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: Buy Secondhand Books (Commerce OS)
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Upgrading Your E-commerce Stack?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s discuss modernizing your commerce operating system.</p>
              <a href="mailto:consult@digixpro.in?subject=Modernize%20Your%20Commerce%20Stack" className="block w-full py-2.5 bg-black text-white font-bold rounded hover:bg-amber-600 hover:text-white transition">
                Modernize Your Commerce Stack
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
