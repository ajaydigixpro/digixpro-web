import React from 'react';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  GraduationCap, 
  Server, 
  Cpu, 
  FileCheck,
  UserCheck,
  Building2,
  BookOpen
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aatma Guru Architecture Evidence',
  description: 'Production evidence for Aatma Guru institution management and governance OS designed by DigiXPro.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/aatma-guru',
  },
  openGraph: {
    title: 'Aatma Guru Architecture Evidence | DigiXPro',
    description: 'Production evidence for Aatma Guru institution management and governance OS.',
    url: 'https://www.digixpro.in/evidence/aatma-guru',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aatma Guru Architecture Evidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aatma Guru Architecture Evidence | DigiXPro',
    description: 'Production evidence for Aatma Guru institution management and governance OS.',
    images: ['/twitter-image.png'],
  },
};

export default function AatmaGuruEvidence() {
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
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
            Organization Onboarding Platform
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight">
          aatma.guru
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Engineering a Governed Organization Onboarding Platform.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          The execution layer of SattvaOS: Provisioning multi-tenant workspaces, validating institutional rights, and launching dedicated Digital Guides at scale.
        </p>
      </div>

      {/* ABOVE THE FOLD: Core Execution Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center">
            <Building2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Platform Role
          </div>
          <div className="text-lg font-extrabold text-emerald-950 font-mono mt-1">Tenant Provisioner</div>
          <p className="text-[11px] text-emerald-800 mt-1">SattvaOS execution engine</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <UserCheck className="w-3.5 h-3.5 mr-1 text-black" /> Verification
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Human Gate</div>
          <p className="text-[11px] text-neutral-500 mt-1">Strict identity validation</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-black" /> Knowledge
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Corpus Sync</div>
          <p className="text-[11px] text-neutral-500 mt-1">Structured asset indexing</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Cpu className="w-3.5 h-3.5 mr-1 text-black" /> Deployment
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Studio Ready</div>
          <p className="text-[11px] text-neutral-500 mt-1">Instant guide provisioning</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. Why Onboarding Matters */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. Why Multi-Tenant Onboarding is an Engineering Challenge
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              In high-trust institutional AI, onboarding cannot be a simple self-service signup form. Organizations require strict verification, compliance gating, corpus registration, and cryptographic tenant isolation before a single AI query is processed.
            </p>
            <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2 text-xs text-neutral-700 font-mono">
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Risk of unauthorized organizational data injection.</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Complexity of provisioning isolated tenant sub-domains (&lt;tenant&gt;.aatma.guru).</div>
              <div className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> Requirement for human-in-the-loop approval workflows prior to launch.</div>
            </div>
          </section>

          {/* 2. Architectural Execution Workflow */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Onboarding Pipeline Architecture
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">Execution pipeline</p>
              <p className="mb-4 leading-relaxed">
                aatma.guru acts as the controlled gateway between the raw SattvaOS infrastructure and deployed institutional guides.
              </p>
              <ul className="space-y-2 text-neutral-300 font-mono text-xs">
                <li>→ <strong>Organization Registration:</strong> Captures institutional metadata and authority credentials.</li>
                <li>→ <strong>Human Verification & Rights Approval:</strong> Manual or programmatic review gates before tenant activation.</li>
                <li>→ <strong>Knowledge Registration:</strong> Ingests and indexes the initial organizational corpus into Vector RAG.</li>
                <li>→ <strong>Studio Provisioning:</strong> Deploys the isolated tenant interface (<span className="text-[#22C55E]">tenant.aatma.guru</span>).</li>
              </ul>
            </div>
          </section>

          {/* 3. Core Modules */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. Core Onboarding Modules
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-emerald-700 font-bold mb-1">TENANT STUDIO</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Workspace Control</div>
                <p className="text-neutral-500 font-sans text-[11px]">Enables organization admins to configure brand identity, tone parameters, and access rules.</p>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-emerald-700 font-bold mb-1">RIGHTS VALIDATION</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Policy Gatekeeper</div>
                <p className="text-neutral-500 font-sans text-[11px]">Validates institutional credentials and clearance levels before granting system access.</p>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-emerald-700 font-bold mb-1">KNOWLEDGE CORPUS</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Asset Ingestion</div>
                <p className="text-neutral-500 font-sans text-[11px]">Structured upload channels for textbooks, research papers, and policy documentation.</p>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-emerald-700 font-bold mb-1">READINESS GATES</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Launch Protocol</div>
                <p className="text-neutral-500 font-sans text-[11px]">Automated test suites ensuring zero-leakage and compliance before final guide publication.</p>
              </div>
            </div>
          </section>

          {/* 4. Public Verification & Live Surface */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Server className="w-5 h-5 mr-2 text-black" /> 4. Live Platform Verification
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-3 font-mono text-xs">
              <div className="font-bold text-black text-sm font-sans mb-2">Verified Production Deployment:</div>
              <div className="p-3 bg-neutral-50 rounded border flex justify-between items-center">
                <span>Platform Surface → <a href="https://www.aatma.guru/" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-bold">aatma.guru</a></span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Active Engine</span>
              </div>
              <p className="text-neutral-500 font-sans text-[11px] mt-2">
                Serving as the active onboarding bridge between SattvaOS infrastructure and real organizational tenants like Nirvandham.
              </p>
            </div>
          </section>

          {/* 5. FOOTER PROOF: Reusable Knowledge Created */}
          <section className="bg-neutral-900 text-white p-6 rounded-xl border border-neutral-800 space-y-4">
            <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider">
              <FileCheck className="w-4 h-4 mr-2" /> Reusable Intellectual Property Generated
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              aatma.guru development established modular multi-tenant patterns:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-200">
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Multi-Tenant Subdomain Provisioner</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Human Verification Workflow Engine</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Automated Launch Readiness Gates</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Institutional Tenant Studio Core</div>
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
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-035</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                &ldquo;In multi-tenant AI systems, secure onboarding and rights validation are more complex than the underlying model.&rdquo;
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Platform scale is dictated not by inference speed, but by the rigor of organizational provisioning and verification gates.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: aatma.guru (Onboarding Platform)
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
