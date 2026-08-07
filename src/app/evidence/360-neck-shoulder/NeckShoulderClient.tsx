'use client';

import React from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function NeckShoulderClient() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-20 md:pb-12">
      
      {/* Navigation Back */}
      <a href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </a>

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-emerald-100 text-[#16a34a] text-xs font-bold px-3 py-1 rounded-full font-mono uppercase tracking-wider">
            Healthcare Web Design &amp; Branding
          </span>
          <span className="text-neutral-400 text-xs font-mono">Case Study #08</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          360 Neck &amp; Shoulder Care
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
          Specialised clinic web design, visual identity architecture, and direct patient intake system for a niche cervical and shoulder physiotherapy clinic in Noida.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Active Architecture</div>
          <div className="flex items-center gap-2">
            <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline">
              <ExternalLink className="w-4 h-4" /> Live Platform (360neckshoulder.com)
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Context & Proof */}
        <div className="md:col-span-2 space-y-12">
          
          {/* Problem / Challenge */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> The Challenge
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Specialised medical practices often struggle to differentiate niche treatments from general physiotherapy services. Patients suffering from chronic cervical spine issues or shoulder joint immobility require immediate clinical trust and specialized treatment information.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>No dedicated digital identity separating specialized spine care from general physiotherapy in Noida</li>
                <li>Inconsistent mobile user experience and slow landing page speeds</li>
                <li>Lack of structured medical condition landing pages explaining cervical and shoulder protocols</li>
              </ul>
            </div>
          </section>

          {/* Solution & Architecture */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Lightbulb className="w-5 h-5 text-[#16a34a]" /> Architectural Interventions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                DigiXPro engineered a bespoke, high-performance web platform (360neckshoulder.com) featuring responsive UI components, medical schema markup, and direct click-to-whatsapp patient scheduling.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-mono">
                  <span className="font-bold text-neutral-900 block mb-1">Tailored Visual Identity</span>
                  Bespoke medical color tokens &amp; typography.
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-mono">
                  <span className="font-bold text-neutral-900 block mb-1">Mobile First Intake</span>
                  Instant consultation scheduling.
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Measured Outcomes
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-2xl font-extrabold text-emerald-700">10+ Keywords</div>
                  <div className="text-xs font-mono text-emerald-800 mt-1">#1 on Bing (Zero Paid SEO)</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-2xl font-extrabold text-emerald-700">Page 3-4</div>
                  <div className="text-xs font-mono text-emerald-800 mt-1">Google Rankings within months of launch — zero paid search spend</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 sm:col-span-2">
                  <div className="text-2xl font-extrabold text-emerald-700">45,000+</div>
                  <div className="text-xs font-mono text-emerald-800 mt-1">Patients treated by parent clinic since 2008 (18+ years)</div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Meta & Specs */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Technical Specs</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-400 block font-mono">TRACK</span>
                <span className="font-bold text-neutral-900">Design Track</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">CATEGORY</span>
                <span className="font-bold text-neutral-900">Healthcare / Web Design</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">LIVE DOMAIN</span>
                <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-[#16a34a] hover:underline flex items-center gap-1 mt-0.5">
                  360neckshoulder.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">DELIVERABLES</span>
                <ul className="mt-1 space-y-1 text-neutral-700 font-medium">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Custom JS Web Architecture</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Clinic Visual Branding</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Local Schema Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
