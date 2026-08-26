'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function NeckShoulderClient() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-20 md:pb-12">
      
      {/* Navigation Back */}
      <Link href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </Link>

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-emerald-100 text-[#16a34a] text-xs font-bold px-3 py-1 rounded-full font-mono uppercase tracking-wider">
            Healthcare Web Design &amp; Branding
          </span>
          <span className="text-neutral-400 text-xs font-mono">Case Study #08</span>
          <span className="text-amber-700 bg-amber-50 text-xs font-mono font-bold px-3 py-1 rounded-full border border-amber-200">
            Design Track
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-black">
          360 Neck &amp; Shoulder Care
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-700 font-medium leading-relaxed max-w-3xl">
          Specialised clinic web design, visual identity architecture, and direct patient intake system for a niche cervical and shoulder physiotherapy clinic in Noida.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Active Architecture</div>
          <div className="flex items-center gap-2">
            <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline font-semibold">
              <ExternalLink className="w-4 h-4" /> Live Platform (360neckshoulder.com)
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Context & Proof */}
        <div className="md:col-span-2 space-y-12">
          
          {/* SECTION 1: Problem / Challenge */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> 1. The Business &amp; Operational Challenge
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

          {/* SECTION 2: Solution & Architecture */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Lightbulb className="w-5 h-5 text-[#16a34a]" /> 2. Architectural Interventions
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

          {/* SECTION 3: Measured Outcomes */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> 3. Measured Outcomes
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

          {/* SECTION 4: What We Deliberately Did Not Do */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Ban className="w-5 h-5 text-red-500" /> 4. What We Deliberately Did Not Do
            </h2>
            <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Generic Practice Dilution:</strong> We did not dilute specialist cervical care messaging with general physiotherapy copy; landing pages are tightly focused on neck and shoulder conditions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Unsubstantiated Claims:</strong> Patient numbers are strictly anchored in the parent practice&apos;s verified offline medical registry (45,000+ patients treated since 2008).</span>
              </div>
            </div>
          </section>

          {/* SECTION 5: Critical Buyer Questions Answered */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <HelpCircle className="w-5 h-5 text-purple-600" /> 5. Critical Buyer Questions Answered
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;How do dedicated landing pages for specialized medical services improve conversion rates?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  By matching the exact physical symptom searched by the patient (cervical pain, frozen shoulder) directly with clear clinical treatment protocols, eliminating navigation clutter and building instant trust.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 6: Frequently Asked Questions */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <FileText className="w-5 h-5 text-emerald-600" /> 6. Frequently Asked Questions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-sans">
              <div>
                <h3 className="font-bold text-black text-sm mb-1">Why separate specialist clinic branding from general practice websites?</h3>
                <p className="text-neutral-600 leading-relaxed">Specialist clinic branding signals focused expertise to acute sufferers, establishing higher perceived clinical value than generic multi-specialty marketing.</p>
              </div>
            </div>
          </section>

          {/* SECTION 7: Related DigiXPro Service Link */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                <h3 className="text-lg font-bold text-amber-950">Landing Page &amp; Lead Generation Engineering</h3>
                <p className="text-xs text-amber-800 mt-1">Explore how DigiXPro designs high-conversion landing pages for specialized services and clinics.</p>
              </div>
              <Link 
                href="/design-services/landing-page-lead-generation"
                className="inline-flex items-center justify-center px-5 py-3 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition shrink-0 font-sans"
              >
                View Landing Page Service <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
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
                <span className="font-bold text-neutral-900 font-sans">Design Track</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">CATEGORY</span>
                <span className="font-bold text-neutral-900 font-sans">Healthcare / Web Design</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">LIVE DOMAIN</span>
                <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-[#16a34a] hover:underline flex items-center gap-1 mt-0.5">
                  360neckshoulder.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">DELIVERABLES</span>
                <ul className="mt-1 space-y-1 text-neutral-700 font-medium font-sans">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Custom JS Web Architecture</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Clinic Visual Branding</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Local Schema Optimization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Consultative CTA Card */}
          <div className="bg-white p-6 border border-neutral-200 rounded-2xl shadow-sm space-y-3 text-center">
            <div className="font-bold text-black text-sm">Designing a Specialist Clinic Site?</div>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              Let&apos;s map your patient intake flow and specialist condition landing pages.
            </p>
            <Link
              href="/contact"
              className="block w-full py-3 bg-[#0A0A0A] text-white font-bold text-xs rounded-xl hover:bg-[#16a34a] transition shadow-sm font-sans"
            >
              Request a 30-Min Architecture Call
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
