import React from 'react';
import { Metadata } from 'next';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Zap, 
  GraduationCap, 
  Server, 
  Cpu, 
  ShieldCheck, 
  FileCheck,
  BrainCircuit,
  Lock,
  ExternalLink,
  Layers,
  Activity
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'SattvaOS Architecture Evidence',
  description: 'Production evidence for SattvaOS enterprise management system and platform architecture.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/sattvaos',
  },
  openGraph: {
    title: 'SattvaOS Architecture Evidence | DigiXPro',
    description: 'Production evidence for SattvaOS enterprise management system and platform architecture.',
    url: 'https://www.digixpro.in/evidence/sattvaos',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'SattvaOS Architecture Evidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SattvaOS Architecture Evidence | DigiXPro',
    description: 'Production evidence for SattvaOS enterprise management system and platform architecture.',
    images: ['/twitter-image.png'],
  },
};

export default function SattvaOSEvidence() {
  return (
    <>
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-24 md:pb-12">
      
      {/* Navigation Back */}
      <a href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </a>

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-black bg-neutral-200 px-2 py-0.5 rounded border border-neutral-300 font-bold uppercase tracking-widest">
            Master Architecture Report
          </span>
          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold uppercase tracking-widest">
            AI Infrastructure & Governance
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight">
          SattvaOS
        </h1>
        <p className="text-xl text-neutral-900 font-extrabold max-w-3xl mb-2">
          Governed AI Infrastructure for High-Trust Organizations.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          Architecting a master AI operating system designed to eliminate institutional risk, enforce strict policy guardrails, and deliver precise context retrieval.
        </p>
      </div>

      {/* ABOVE THE FOLD: Core Engines Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider mb-1 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-purple-600" /> Platform Type
          </div>
          <div className="text-lg font-extrabold text-purple-950 font-mono mt-1">Governed AI Infra</div>
          <p className="text-[11px] text-purple-800 mt-1">Institutional compliance layer</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Cpu className="w-3.5 h-3.5 mr-1 text-black" /> Status
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Master Core</div>
          <p className="text-[11px] text-neutral-500 mt-1">Proprietary tech stack</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <BrainCircuit className="w-3.5 h-3.5 mr-1 text-black" /> Architecture
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Multi-Tenant</div>
          <p className="text-[11px] text-neutral-500 mt-1">Scalable institutional OS</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center">
            <Lock className="w-3.5 h-3.5 mr-1 text-black" /> Security
          </div>
          <div className="text-2xl font-extrabold text-black font-mono mt-1">Policy Guard</div>
          <p className="text-[11px] text-neutral-500 mt-1">Zero data leakage risk</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. Why SattvaOS Exists (Visual Flow) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. Why SattvaOS Exists
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Deploying raw, generic AI models in high-trust organizations introduces severe operational vulnerabilities. The institutional risk pipeline demonstrates why ungoverned AI fails in enterprise settings:
            </p>
            
            {/* Visual Risk Flow Diagram */}
            <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span className="font-bold">Generic LLM Input</span>
                <span className="text-neutral-400">Standard Public Endpoint</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span className="font-bold text-red-600">Hallucination & Data Leakage</span>
                <span className="text-neutral-400">Uncontrolled Drift</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                <span className="font-bold text-red-600">No Governance Layer</span>
                <span className="text-neutral-400">Zero Role Permissioning</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-purple-50 border border-purple-200 p-3 rounded text-purple-950 font-bold">
                <span>Institutional Risk (Enterprise Liability)</span>
                <span>Unsafe for Deployment</span>
              </div>
              <div className="text-center text-purple-600 font-bold">↓ Replaced By ↓</div>
              <div className="flex items-center justify-between bg-[#0A0A0A] text-white p-3.5 rounded font-bold">
                <span>SattvaOS (Governed AI Infrastructure)</span>
                <span className="text-[#22C55E]">Zero Risk Architecture</span>
              </div>
            </div>
          </section>

          {/* 2. Platform Architecture Stack & URLs */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Server className="w-5 h-5 mr-2 text-black" /> 2. Master Platform Architecture Stack
            </h2>
            <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
              <div className="text-center font-bold text-black text-sm font-sans mb-2">Ecosystem Hierarchy</div>
              
              <div className="p-3 bg-neutral-100 rounded border flex justify-between items-center font-bold">
                <span>sattvaos.tech (Master Infrastructure Platform)</span>
                <a href="https://www.sattvaos.tech/" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline flex items-center">
                  Visit <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              <div className="text-center text-neutral-400">↓</div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded flex justify-between items-center font-bold text-purple-950">
                <span>aatma.guru (Organization Onboarding & Tenant Provisioning)</span>
                <a href="https://www.aatma.guru/" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline flex items-center">
                  Visit <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              <div className="text-center text-neutral-400">↓</div>

              <div className="p-3 bg-neutral-50 rounded border text-center font-bold text-neutral-700">
                &lt;tenant&gt;.aatma.guru (Deployed Governed Digital Guides)
              </div>
            </div>
          </section>

          {/* 3. Core Engines */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Zap className="w-5 h-5 mr-2 text-black" /> 3. Core Engine Architecture
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-purple-700 font-bold mb-1">IDENTITY ENGINE</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Secure Tenancy & Auth</div>
                <p className="text-neutral-500 font-sans text-[11px]">Isolates organization data spaces with strict cryptographic boundaries.</p>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-purple-700 font-bold mb-1">KNOWLEDGE ENGINE</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Contextual Vector Retrieval</div>
                <p className="text-neutral-500 font-sans text-[11px]">Indexes proprietary institutional assets for precise, hallucination-free retrieval.</p>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-purple-700 font-bold mb-1">RIGHTS ENGINE</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Granular Permissioning</div>
                <p className="text-neutral-500 font-sans text-[11px]">Ensures users only access data slices authorized by institutional hierarchy.</p>
              </div>

              <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                <div className="text-purple-700 font-bold mb-1">GOVERNANCE ENGINE</div>
                <div className="font-bold text-sm text-black font-sans mb-1">Policy Guardrails</div>
                <p className="text-neutral-500 font-sans text-[11px]">Real-time interception layer preventing policy violations and toxic drift.</p>
              </div>
            </div>
          </section>

          {/* 4. Evidence Lineage (Evolutionary Journey) */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-6 border-b border-neutral-200 pb-2">
              <Layers className="w-5 h-5 mr-2 text-black" /> 4. Evidence Lineage & Evolution
            </h2>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
              Sattvaos was not built in a vacuum. It represents the culmination of 20+ years of systems engineering across multiple operational domains:
            </p>
            <div className="relative border-l border-neutral-300 ml-3 space-y-6 pb-2 text-xs font-mono">
              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-400 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">1. Healthcare Systems</div>
                <p className="text-neutral-500 font-sans mt-0.5">Mastering local trust architecture, data security, and client reliability (Dr Aggarwal).</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-400 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">2. Marketplace Engineering</div>
                <p className="text-neutral-500 font-sans mt-0.5">Architecting multi-vendor taxonomies and role-based access control (ScanCentreNearMe).</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-400 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">3. Commerce Operating Systems</div>
                <p className="text-neutral-500 font-sans mt-0.5">Decoupling high-velocity inventory engines and pricing logic (Buy Secondhand Books).</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-2.5 h-2.5 bg-neutral-400 rounded-full -left-[5px] top-1"></div>
                <div className="font-bold text-black text-sm font-sans">4. Digital Publishing & Knowledge Systems</div>
                <p className="text-neutral-500 font-sans mt-0.5">Building multilingual indexing and structured knowledge repositories (Muktibodh).</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(147,51,235,0.6)]"></div>
                <div className="font-bold text-black text-sm font-sans text-purple-950">5. Institutional AI Infrastructure (SattvaOS)</div>
                <p className="text-neutral-700 font-sans mt-0.5">Synthesizing all prior system learnings into a master governed AI operating platform.</p>
              </div>
            </div>
          </section>

          {/* 5. Production Evidence & Surfaces */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2">
              <Activity className="w-5 h-5 mr-2 text-black" /> 5. Active Production Surfaces
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-3 font-mono text-xs">
              <div className="font-bold text-black text-sm font-sans mb-3">Verification of Live Architecture Stack:</div>
              
              <div className="p-3 bg-neutral-50 rounded border flex justify-between items-center">
                <span>Public Platform → <a href="https://www.sattvaos.tech/" target="_blank" rel="noreferrer" className="text-purple-700 underline font-bold">sattvaos.tech</a></span>
                <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">Infrastructure Core</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded border flex justify-between items-center">
                <span>Onboarding → <a href="https://www.aatma.guru/" target="_blank" rel="noreferrer" className="text-purple-700 underline font-bold">aatma.guru</a></span>
                <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">Tenant Provisioning</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded border flex justify-between items-center">
                <span>Tenant Example → nirvandham.aatma.guru</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Digital Guide</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded border flex justify-between items-center">
                <span>Knowledge Base → Muktibodh Journal</span>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">Research Repository</span>
              </div>
            </div>
          </section>

          {/* 6. FOOTER PROOF: Reusable Knowledge Created */}
          <section className="bg-neutral-900 text-white p-6 rounded-xl border border-neutral-800 space-y-4">
            <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider">
              <FileCheck className="w-4 h-4 mr-2" /> Reusable Intellectual Property Generated
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              SattvaOS development established core institutional frameworks:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-200">
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Governed AI Pipeline Architecture</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Institutional Policy Interceptor</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Multi-Tenant Knowledge Schema</div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">• Zero-Leakage Context Retriever</div>
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
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-031</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                &ldquo;AI in high-trust institutions is not about raw capability. It is about governed boundaries.&rdquo;
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Without institutional governance and rights enforcement, artificial intelligence remains an enterprise liability rather than an asset.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: SattvaOS (AI Infrastructure Core)
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    <StickyMobileCTA />
    </>
  );
}
