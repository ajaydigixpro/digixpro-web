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
  Clock,
  DollarSign,
  Server,
  Image as ImageIcon,
  FileCheck,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function ScanCentreClient() {
  const [activeTab, setActiveTab] = useState<'vendor' | 'search' | 'admin'>('vendor');
  const [homeError, setHomeError] = useState(false);
  const [dashError, setDashError] = useState(false);

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
          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold uppercase tracking-widest">
            HealthTech Marketplace
          </span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
            Tech Track
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black">
          ScanCentreNearMe Healthcare Portal Architecture
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Production-Ready Healthcare Marketplace in Weeks, Not Months.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          How strategic architectural leverage allowed us to build a multi-city diagnostic aggregator without burning capital on redundant commodity infrastructure.
        </p>
      </div>

      {/* ABOVE THE FOLD: Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-blue-800 uppercase tracking-wider mb-1 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-blue-600" /> Time to Market
          </div>
          <div className="text-2xl font-extrabold text-blue-950 font-mono mt-1">6–8 Weeks</div>
          <p className="text-[11px] text-blue-800 mt-1">vs 8-12 months custom build</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <DollarSign className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Capital Expenditure
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">80% Saved</div>
          <p className="text-[11px] text-neutral-500 mt-1">Optimized CapEx allocation</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Server className="w-3.5 h-3.5 mr-1 text-black" /> Architecture
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">B2B2C Hybrid</div>
          <p className="text-[11px] text-neutral-500 mt-1">Multi-city &amp; Multi-vendor</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Cpu className="w-3.5 h-3.5 mr-1 text-black" /> System Status
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Production</div>
          <p className="text-[11px] text-neutral-500 mt-1">Fully deployed ecosystem</p>
        </div>
      </div>

      {/* PLATFORM SCALE BAR */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-12 shadow-sm font-mono text-xs">
        <div className="text-neutral-500 font-bold uppercase tracking-wider mb-3 text-[10px]">Platform Scale &amp; Scope Highlights:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">🌍 Multi-city Ready</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">🗂️ Multi-service Taxonomy</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">👤 Patient Dashboard</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center">🏥 Centre Dashboard</span>
          <span className="bg-neutral-50 border border-neutral-200 p-2 rounded text-center sm:col-span-3 md:col-span-1">🔐 Role-based Access</span>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. Business Problem */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. The Fragmented Diagnostics Problem
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              Diagnostic healthcare is heavily fragmented. Patients struggle to discover verified scan centers, compare test pricing, or book appointments seamlessly. Simultaneously, independent diagnostic centers lack digital infrastructure to manage incoming leads, patient reports, and scheduling.
            </p>
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2 text-xs text-neutral-700 font-mono">
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Fragmented patient discovery across multi-city locations.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Lack of unified vendor management dashboards for scan centers.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> High software development risk and runway depletion for early-stage healthtech execution.</div>
            </div>
          </section>

          {/* 2. Architecture Decision */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Architectural Leverage Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">Architecture log</p>
              <p className="mb-4 leading-relaxed">
                Instead of writing 60,000+ lines of commodity infrastructure code from scratch (user auth, basic database schemas, routing boilerplates), <strong>we reused the commodity layer and custom-engineered the competitive layer</strong>.
              </p>
              <ul className="space-y-2 text-neutral-300 font-mono text-xs">
                <li>→ Reused robust multi-vendor database frameworks for base stability.</li>
                <li>→ Re-architected taxonomies to handle complex multi-city diagnostic parameters.</li>
                <li>→ Custom-engineered dual operational workflows for independent patients vs. clinic partners.</li>
              </ul>
            </div>
          </section>

          {/* 3. Platform Capabilities & Interactive Dashboard Views */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. Platform Capabilities &amp; Workflows
            </h2>
            <p className="text-neutral-600 text-sm mb-4">
              The platform is structured into specialized functional layers designed for high-concurrency medical discovery:
            </p>

            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4 font-mono text-xs">
                <button 
                  onClick={() => setActiveTab('vendor')}
                  className={`px-3 py-1.5 rounded transition ${activeTab === 'vendor' ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                >
                  Centre Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('search')}
                  className={`px-3 py-1.5 rounded transition ${activeTab === 'search' ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                >
                  Patient Search &amp; Taxonomy
                </button>
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 rounded transition ${activeTab === 'admin' ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                >
                  Admin &amp; Onboarding
                </button>
              </div>

              <div className="text-xs font-mono text-neutral-700 space-y-2 pt-2">
                {activeTab === 'vendor' && (
                  <div className="space-y-2">
                    <div className="text-black font-bold text-sm font-sans">Vendor / Diagnostic Centre Owner Panel</div>
                    <p className="font-sans text-neutral-600">Allows local labs and imaging centers to manage appointment slots, upload patient reporting files, update test pricing taxonomies, and view booking histories independently.</p>
                  </div>
                )}
                {activeTab === 'search' && (
                  <div className="space-y-2">
                    <div className="text-black font-bold text-sm font-sans">Multi-City Taxonomy &amp; Location Hierarchy</div>
                    <p className="font-sans text-neutral-600">Structured category trees (MRI, CT Scan, Pathology, Ultrasound) mapped seamlessly with geographic filters so patients can instantly filter tests by proximity and cost.</p>
                  </div>
                )}
                {activeTab === 'admin' && (
                  <div className="space-y-2">
                    <div className="text-black font-bold text-sm font-sans">Centralized Platform Administration</div>
                    <p className="font-sans text-neutral-600">Super-admin controls for vetting scan center registrations, monitoring platform traffic, managing commission models, and overseeing customer communications.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 4. Operational Evidence Views */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <TrendingUp className="w-5 h-5 mr-2 text-black" /> 4. Operational Evidence &amp; Live Views
            </h2>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm space-y-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">DISCOVERY</span>
                    <span className="text-[11px] font-bold text-neutral-700">Marketplace Portal</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!homeError ? (
                      <Image
                        src="/evidence/scan-centre/homepage.png" 
                        alt="Scan Centre Near Me Homepage" 
                        width={1920}
                        height={912}
                        className="w-full h-auto object-contain max-h-[280px] rounded"
                        onError={() => setHomeError(true)}
                        priority
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">homepage.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-center text-neutral-700 mt-2">Homepage Portal</div>
                </div>

                <div className="border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">OPERATIONS</span>
                    <span className="text-[11px] font-bold text-neutral-700">Centre Operations</span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-lg overflow-hidden relative shadow-sm flex items-center justify-center p-2">
                    {!dashError ? (
                      <Image
                        src="/evidence/scan-centre/dashboard.png" 
                        alt="Scan Centre Near Me Centre Dashboard" 
                        width={1920}
                        height={912}
                        className="w-full h-auto object-contain max-h-[280px] rounded"
                        onError={() => setDashError(true)}
                        priority
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500">dashboard.png</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-center text-neutral-700 mt-2">Centre Dashboard</div>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-600 flex justify-between items-center">
                <span>Status: Production-Ready Platform</span>
                <span className="font-bold text-black"><a href="https://scancentrenearme.com/" target="_blank" rel="noreferrer" className="underline hover:text-blue-600">scancentrenearme.com</a></span>
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
                <span><strong>No Commodity Code Rewrite:</strong> We did not waste months writing 60,000+ lines of custom user auth and database boilerplate from scratch. We focused capital strictly on competitive marketplace workflows.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Over-Engineered Microservices:</strong> We did not build a complex multi-repo microservice cluster for an early-stage launch. We engineered a robust modular monolith capable of scaling efficiently.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Unvalidated Custom CMS:</strong> We did not invent a custom CMS framework where standard relational database schemas handled the multi-vendor diagnostic taxonomy cleanly.</span>
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
                  &ldquo;How do I know whether to build custom software from scratch or leverage an existing framework?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  If the functionality is commodity (user login, standard CRUD, basic payment routing), leverage proven battle-tested frameworks. If the functionality is your core competitive moat (unique marketplace taxonomy, proprietary vendor workflows), custom engineer it.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;Can a multi-city marketplace scale without burning CapEx on redundant software builds?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Yes. By decoupling location taxonomies and vendor role-based permissions from core engine logic, new cities and diagnostic categories can be onboarded via database configuration rather than new software deployments.
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
                <h3 className="font-bold text-black text-sm mb-1">What is smart framework leverage in marketplace engineering?</h3>
                <p className="text-neutral-600 leading-relaxed">Smart framework leverage involves utilizing existing open-source or commercial foundation frameworks for commodity software requirements (auth, session management, database migrations) while reserving engineering budgets exclusively for proprietary business workflows.</p>
              </div>
              <div className="border-t border-neutral-100 pt-3">
                <h3 className="font-bold text-black text-sm mb-1">How do multi-vendor marketplaces handle data privacy between competing vendors?</h3>
                <p className="text-neutral-600 leading-relaxed">Role-Based Access Control (RBAC) and row-level database tenancy isolation ensure diagnostic centers only access their own patient appointments, reporting uploads, and revenue metrics.</p>
              </div>
            </div>
          </section>

          {/* 8. Related DigiXPro Service Link */}
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                <h3 className="text-lg font-bold text-blue-950">Technology Due Diligence &amp; Vendor Evaluation</h3>
                <p className="text-xs text-blue-800 mt-1">Learn how DigiXPro evaluates tech stack choices, prevents vendor lock-in, and optimizes CapEx spend.</p>
              </div>
              <Link 
                href="/advisory/technology-due-diligence-vendor-evaluation"
                className="inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition shrink-0 font-sans"
              >
                View Due Diligence Advisory <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle & Consultative CTA */}
        <div className="md:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Derived Principle Card */}
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-018</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                &ldquo;Competitive advantage should be custom built. Commodity infrastructure should be reused.&rdquo;
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Smart software engineering is knowing when to write code from scratch, and when to heavily leverage existing frameworks to preserve runway.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: ScanCentreNearMe Build
              </div>
            </div>

            {/* Consultative CTA Box */}
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Building a Marketplace?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s audit your architecture and optimize your CapEx spend before writing code.</p>
              <Link href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-sm font-sans">
                Book Architecture Call
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
