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

export default function DrAggarwalClient() {
  const [imgError, setImgError] = useState(false);

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
            Healthcare OS & SEO
          </span>
          <span className="text-neutral-400 text-xs font-mono">Case Study #01</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Dr Aggarwal Physio Centre
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
          Zero-to-One digital footprint and patient acquisition system for a leading physiotherapy clinic network operating across two locations in Greater Noida.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-neutral-400" /> 2023 - Present</div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Active Architecture</div>
          <div className="flex items-center gap-2">
            <a href="https://draggarwalphysiocentre.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline">
              <ExternalLink className="w-4 h-4" /> Main Clinic
            </a>
            <span className="text-neutral-300">·</span>
            <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline">
              <ExternalLink className="w-4 h-4" /> 360 Neck &amp; Shoulder
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
                Dr Aggarwal Physio Centre was operating with zero digital visibility across both clinic locations in Greater Noida. Patients relied entirely on word-of-mouth, limiting practice growth and appointment predictability.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>No online booking or inquiry capture mechanism</li>
                <li>Zero local search presence for high-intent queries across both locations</li>
                <li>Lack of structured patient trust signals and verified reviews</li>
                <li>No digital separation between the general physiotherapy practice and the specialist neck &amp; shoulder clinic</li>
              </ul>
            </div>
          </section>

          {/* Architecture & Solution */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Lightbulb className="w-5 h-5 text-[#16a34a]" /> Architectural Interventions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                DigiXPro engineered a focused digital acquisition engine combining hyper-local SEO, schema-structured medical service pages, and frictionless patient intake flows — deployed independently across two specialised digital properties.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Main Practice Site</div>
                  <div className="text-xs text-neutral-500 mb-2">Full-service physiotherapy clinic architecture for the primary Greater Noida location.</div>
                  <a href="https://draggarwalphysiocentre.in" target="_blank" rel="noopener noreferrer" className="text-xs text-[#16a34a] hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" /> draggarwalphysiocentre.in</a>
                </div>
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">360 Neck &amp; Shoulder</div>
                  <div className="text-xs text-neutral-500 mb-2">Specialist sub-site for the neck &amp; shoulder clinic — separated for targeted local SEO and patient journey.</div>
                  <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#16a34a] hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" /> 360neckshoulder.com</a>
                </div>
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Local SEO Engine</div>
                  <div className="text-xs text-neutral-500">Targeted high-intent localized search terms for physiotherapy in Greater Noida.</div>
                </div>
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Structured Schema</div>
                  <div className="text-xs text-neutral-500">MedicalBusiness &amp; Physician JSON-LD schemas for direct Google Knowledge Panel indexing.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Proof Screenshot */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <ImageIcon className="w-5 h-5 text-blue-500" /> Verified Organic Search Proof
            </h2>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
              {!imgError ? (
                <img 
                  src="/evidence/dr-aggarwal-proof.png" 
                  alt="Ahrefs Branded Keyword Proof for Dr Aggarwal Physio Centre" 
                  className="w-full h-auto rounded-xl border border-neutral-100"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="bg-neutral-100 rounded-xl p-8 text-center text-neutral-500 text-sm">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                  Organic Search Proof Documented in Ahrefs analytics database.
                </div>
              )}
              <p className="text-xs text-neutral-400 mt-3 text-center font-mono">
                Source: Ahrefs / Google Search Console Organic Ranking Verification
              </p>
            </div>
          </section>

        </div>

        {/* Right Column: Outcomes & Tech Specs */}
        <div className="space-y-8">
          
          {/* Key Results */}
          <div className="bg-[#0A0A0A] text-white p-6 rounded-2xl shadow-md">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#16a34a] font-bold mb-4">
              Measured Outcomes
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-extrabold text-white">#1 Rank</div>
                <div className="text-xs text-neutral-400">For core local physiotherapy keywords in Greater Noida</div>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="text-3xl font-extrabold text-white">10x</div>
                <div className="text-xs text-neutral-400">Increase in organic inbound patient inquiries</div>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="text-3xl font-extrabold text-white">2</div>
                <div className="text-xs text-neutral-400">Separate digital properties — one per clinic location</div>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-neutral-400">Automated appointment booking capture</div>
              </div>
            </div>
          </div>

          {/* Stack & Scope */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-mono">
            <h3 className="font-bold text-black uppercase tracking-wider text-sm border-b pb-2">
              Execution Scope
            </h3>
            <div>
              <span className="text-neutral-400 block">Domain:</span>
              <span className="text-neutral-800 font-semibold">Healthcare / Local Practice (2 Locations)</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Deliverables:</span>
              <span className="text-neutral-800 font-semibold">Website (×2), Local SEO, Schema Markup, Booking Flow</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Live Sites:</span>
              <div className="space-y-1 mt-1">
                <a href="https://draggarwalphysiocentre.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#16a34a] hover:underline font-semibold"><ExternalLink className="w-3 h-3" /> draggarwalphysiocentre.in</a>
                <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#16a34a] hover:underline font-semibold"><ExternalLink className="w-3 h-3" /> 360neckshoulder.com</a>
              </div>
            </div>
            <div>
              <span className="text-neutral-400 block">Status:</span>
              <span className="text-emerald-600 font-semibold">Production Live</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
