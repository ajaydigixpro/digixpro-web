'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Lightbulb, 
  ExternalLink, 
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  ArrowRight,
  Ban,
  CheckCircle2,
  Stethoscope,
  TrendingUp
} from 'lucide-react';

export default function DrAggarwalClient() {
  const [imgError, setImgError] = useState(false);

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
            Healthcare OS &amp; Local SEO
          </span>
          <span className="text-neutral-400 text-xs font-mono">Case Study #01</span>
          <span className="text-emerald-700 bg-emerald-50 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-200">
            Tech Track
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-black">
          Dr Aggarwal Physio Centre
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-700 font-medium leading-relaxed max-w-3xl">
          Zero-to-One local search trust architecture and patient acquisition system for a leading healthcare practice operating two specialized clinic locations in Noida.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-neutral-400" /> 9+ Years Client Relationship (2015 – Present)</div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Active Architecture</div>
          <div className="flex items-center gap-2">
            <a href="https://draggarwalphysio.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline font-semibold">
              <ExternalLink className="w-4 h-4" /> draggarwalphysio.com
            </a>
            <span className="text-neutral-300">·</span>
            <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline font-semibold">
              <ExternalLink className="w-4 h-4" /> 360neckshoulder.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Narrative & Proof */}
        <div className="md:col-span-2 space-y-12">
          
          {/* 1. Problem / Challenge */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> 1. The Business &amp; Operational Problem
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Dr Aggarwal Physio Centre operated with zero digital visibility across both clinic locations in Noida. Patient appointments relied entirely on offline word-of-mouth recommendations and footfall, severely limiting practice growth, appointment predictability, and clinical authority.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>No digital inquiry capture or automated appointment booking mechanism</li>
                <li>Zero local search presence for high-intent queries across Sector 62 and Sector 104 Noida catchment areas</li>
                <li>Lack of structured patient trust signals, verified review pathways, and schema-mapped clinical credentials</li>
                <li>No brand separation between the general physiotherapy practice and the specialist 360 Neck &amp; Shoulder clinic</li>
              </ul>
            </div>
          </section>

          {/* 2. Decisions & Strategy */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Lightbulb className="w-5 h-5 text-[#16a34a]" /> 2. Architectural Decisions &amp; Strategy
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Instead of deploying a generic brochure website, DigiXPro engineered a dual-property local search architecture. We decoupled general physiotherapy care from specialist cervical spine care, establishing independent digital footprints tuned to distinct patient search intents.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Primary Practice Property</div>
                  <div className="text-xs text-neutral-500 mb-2">Full-service physiotherapy clinic architecture for the primary Noida practice.</div>
                  <a href="https://draggarwalphysio.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#16a34a] hover:underline flex items-center gap-1 font-mono"><ExternalLink className="w-3 h-3" /> draggarwalphysio.com</a>
                </div>
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Specialist Sub-Property</div>
                  <div className="text-xs text-neutral-500 mb-2">Dedicated clinic site for neck &amp; shoulder care — decoupled for local SEO and patient intake.</div>
                  <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#16a34a] hover:underline flex items-center gap-1 font-mono"><ExternalLink className="w-3 h-3" /> 360neckshoulder.com</a>
                </div>
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Local Maps &amp; GEO Engine</div>
                  <div className="text-xs text-neutral-500">Targeted high-intent localized search terms for physiotherapy in Noida.</div>
                </div>
                <div className="border border-neutral-100 bg-neutral-50 p-4 rounded-xl">
                  <div className="font-bold text-black mb-1">Medical Business Schema</div>
                  <div className="text-xs text-neutral-500">MedicalBusiness &amp; Physician JSON-LD schemas for direct Google Knowledge Panel indexing.</div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Verified Proof Screenshot */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <ImageIcon className="w-5 h-5 text-blue-500" /> 3. Verifiable Organic Search Proof
            </h2>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
              {!imgError ? (
                <Image
                  src="/dr-aggarwal.png" 
                  alt="Ahrefs Branded Keyword Ranking Proof for Dr Aggarwal Physio Centre" 
                  width={1200}
                  height={630}
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
                Source: Ahrefs &amp; Google Search Console Organic Ranking Verification (Noida Catchment Area)
              </p>
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
                <span><strong>No Paid Ad Burn:</strong> We did not run expensive Google Ads or Facebook ads to fake short-term patient traffic. Growth was engineered through organic local search equity.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Speculative Ranking Promises:</strong> We avoided artificial search ranking promises. Instead, we engineered clean technical SEO, structured schemas, and Google Maps trust signals.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Automated Clinical Consultations:</strong> We did not automate medical diagnostic advice. Inbound digital flows strictly schedule consultations for human clinical evaluation.</span>
              </div>
            </div>
          </section>

          {/* 5. Buyer Fear & Objection Questions */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <HelpCircle className="w-5 h-5 text-purple-600" /> 5. Critical Buyer Questions Answered
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;Can a local healthcare practice generate consistent patient inquiries without relying on paid advertising?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Yes. By structuring local service pages around specific medical conditions (cervical spondylosis, frozen shoulder, sciatica), adding MedicalBusiness JSON-LD schema, and optimizing Google Business Profiles for local maps 3-pack visibility, local practices capture high-intent patients searching at the exact moment of physical pain.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;Should a clinic separate its specialized services onto a dedicated website?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  When a clinic offers a distinct specialist treatment (such as 360 Neck &amp; Shoulder Care), separating it onto a specialized domain provides sharp brand positioning, eliminates conversion friction for acute sufferers, and builds concentrated local search authority for specialized queries.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;How do we track whether website visitors convert into actual in-clinic appointments?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We deploy direct click-to-WhatsApp and phone consultation tracking events, linking online visitor interactions directly to reception desk intake records.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Frequently Asked Questions (FAQ) */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <FileText className="w-5 h-5 text-emerald-600" /> 6. Frequently Asked Questions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-sans">
              <div>
                <h3 className="font-bold text-black text-sm mb-1">How long does it take for a local clinic website to show up in local Google searches?</h3>
                <p className="text-neutral-600 leading-relaxed">Local Google Maps 3-Pack signals typically index within 4 to 8 weeks following proper Google Business Profile verification, structured address schema implementation, and local citation building.</p>
              </div>
              <div className="border-t border-neutral-100 pt-3">
                <h3 className="font-bold text-black text-sm mb-1">What schema markup should healthcare websites use?</h3>
                <p className="text-neutral-600 leading-relaxed">Healthcare practice websites require MedicalBusiness, Physician, LocalBusiness, and FAQPage JSON-LD schemas mapped directly to verified clinic locations and practitioner credentials.</p>
              </div>
              <div className="border-t border-neutral-100 pt-3">
                <h3 className="font-bold text-black text-sm mb-1">Why is word-of-mouth no longer enough for healthcare practice growth?</h3>
                <p className="text-neutral-600 leading-relaxed">While word-of-mouth builds initial trust, 80%+ of prospective patients search online to read reviews, check doctor credentials, and inspect clinic locations before booking their first appointment.</p>
              </div>
            </div>
          </section>

          {/* 7. Related DigiXPro Service Link */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                <h3 className="text-lg font-bold text-emerald-950">Local SEO &amp; Local Lead Visibility</h3>
                <p className="text-xs text-emerald-800 mt-1">Explore how DigiXPro builds ongoing local search dominance for service businesses and clinics.</p>
              </div>
              <Link 
                href="/search-automation/local-seo-lead-visibility"
                className="inline-flex items-center justify-center px-5 py-3 bg-[#16a34a] text-white font-bold text-xs rounded-xl hover:bg-[#15803d] transition shrink-0 font-sans"
              >
                View Local SEO Service <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Right Column: Outcomes, Tech Specs & Consultative CTA */}
        <div className="space-y-8">
          
          {/* Key Results */}
          <div className="bg-[#0A0A0A] text-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#16a34a] font-bold mb-4">
              Measured Outcomes
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-extrabold text-white">Top 3 Rank</div>
                <div className="text-xs text-neutral-400">For core local physiotherapy queries in Noida</div>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="text-3xl font-extrabold text-white">10x</div>
                <div className="text-xs text-neutral-400">Increase in organic inbound patient inquiries</div>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="text-3xl font-extrabold text-white">2</div>
                <div className="text-xs text-neutral-400">Separate digital properties — general &amp; specialist</div>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="text-3xl font-extrabold text-white">9+ Years</div>
                <div className="text-xs text-neutral-400">Continuous client partnership since 2015</div>
              </div>
            </div>
          </div>

          {/* Execution Scope */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-mono">
            <h3 className="font-bold text-black uppercase tracking-wider text-sm border-b pb-2">
              Execution Scope
            </h3>
            <div>
              <span className="text-neutral-400 block">Domain:</span>
              <span className="text-neutral-800 font-semibold font-sans">Healthcare / Practice Network (2 Locations)</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Deliverables:</span>
              <span className="text-neutral-800 font-semibold font-sans">Websites (×2), Local SEO, Schema Markup, Intake Flows</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Live Properties:</span>
              <div className="space-y-1 mt-1 font-sans">
                <a href="https://draggarwalphysio.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#16a34a] hover:underline font-semibold"><ExternalLink className="w-3 h-3" /> draggarwalphysio.com</a>
                <a href="https://360neckshoulder.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#16a34a] hover:underline font-semibold"><ExternalLink className="w-3 h-3" /> 360neckshoulder.com</a>
              </div>
            </div>
            <div>
              <span className="text-neutral-400 block">Status:</span>
              <span className="text-emerald-600 font-semibold">Production Live</span>
            </div>
          </div>

          {/* Consultative CTA Card */}
          <div className="bg-white p-6 border border-neutral-200 rounded-2xl shadow-sm space-y-3 text-center">
            <div className="font-bold text-black text-sm">Growing a Local Practice or Clinic?</div>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              The first step is not buying software or paying for ads. It is understanding how your local patients discover and choose a practice.
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
