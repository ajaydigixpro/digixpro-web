import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
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
  Activity,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'SattvaOS Architecture Evidence',
  description: 'Production evidence and case study for SattvaOS: enterprise AI infrastructure, governed multi-tenant system architecture, and security guardrails.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/sattvaos',
  },
  openGraph: {
    title: 'SattvaOS Architecture Evidence | DigiXPro',
    description: 'Production evidence for SattvaOS enterprise AI infrastructure and governed platform architecture.',
    url: 'https://www.digixpro.in/evidence/sattvaos',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'SattvaOS Architecture Evidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SattvaOS Architecture Evidence | DigiXPro',
    description: 'Production evidence for SattvaOS enterprise AI infrastructure.',
    images: ['/twitter-image.png'],
  },
};

const faqs = [
  {
    question: "What is AI governance in an enterprise setting?",
    answer: "AI governance enforces deterministic policy interceptors, role-based data permissions, context boundaries, and identity clearance around LLM inference, preventing toxic drift, hallucinations, and unauthorized data leakage."
  },
  {
    question: "How does SattvaOS eliminate data leakage across multi-tenant clients?",
    answer: "SattvaOS utilizes isolated tenant sub-spaces and cryptographic identity checks, ensuring that vector RAG retrieval queries only search within authorized organizational data boundaries."
  }
];

export default function SattvaOSEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'SattvaOS', url: 'https://www.digixpro.in/evidence/sattvaos' },
        ]}
      />
      <FAQSchema items={faqs} />
      
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-24 md:pb-12">
        
        {/* Navigation Back */}
        <Link href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
        </Link>

        {/* Header Section */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono text-black bg-neutral-200 px-2 py-0.5 rounded border border-neutral-300 font-bold uppercase tracking-widest">
              Master Architecture Report
            </span>
            <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold uppercase tracking-widest">
              AI Infrastructure &amp; Governance
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
              Tech Track
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black">
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
            
            {/* 1. Why SattvaOS Exists */}
            <section>
              <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
                <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. Why SattvaOS Exists
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Deploying raw, generic AI models in high-trust organizations introduces severe operational vulnerabilities. The institutional risk pipeline demonstrates why ungoverned AI fails in enterprise settings:
              </p>
              
              <div className="p-6 bg-white border border-neutral-200 rounded-xl font-mono text-xs text-neutral-700 space-y-3 shadow-sm">
                <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                  <span className="font-bold">Generic LLM Input</span>
                  <span className="text-neutral-400">Standard Public Endpoint</span>
                </div>
                <div className="text-center text-neutral-400">↓</div>
                <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border">
                  <span className="font-bold text-red-600">Hallucination &amp; Data Leakage</span>
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
                  <span className="text-[#22C55E]">Governed Sandboxed Architecture</span>
                </div>
              </div>
            </section>

            {/* 2. Platform Stack */}
            <section>
              <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
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
                  <span>aatma.guru (Organization Onboarding &amp; Tenant Provisioning)</span>
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

            {/* 3. Core Engine Architecture */}
            <section>
              <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
                <Zap className="w-5 h-5 mr-2 text-black" /> 3. Core Engine Architecture
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-white p-4 border border-neutral-200 rounded-xl shadow-sm">
                  <div className="text-purple-700 font-bold mb-1">IDENTITY ENGINE</div>
                  <div className="font-bold text-sm text-black font-sans mb-1">Secure Tenancy &amp; Auth</div>
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

            {/* 4. What We Deliberately Did Not Do */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                <Ban className="w-5 h-5 text-red-500" /> 4. What We Deliberately Did Not Do
              </h2>
              <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>No Raw Model Exposure:</strong> We did not allow end-users direct access to un-governed LLM API endpoints. All interactions pass through policy interceptors.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>No Public Training Leakage:</strong> Proprietary client knowledge bases are never submitted to public LLM retraining pipelines.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>No Over-Promised Full Automation:</strong> We did not claim that AI replaces institutional human decision-making; AI is deployed as a governed assist layer.</span>
                </div>
              </div>
            </section>

            {/* 5. Critical Buyer Questions Answered */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                <HelpCircle className="w-5 h-5 text-purple-600" /> 5. Critical Buyer Questions Answered
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-black text-sm">
                    &ldquo;How do we adopt AI in our organization without exposing proprietary data or allowing un-governed outputs?&rdquo;
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    By wrapping LLM inference in a multi-tenant governance layer like SattvaOS, data spaces are cryptographically isolated, and responses are restricted to indexed organizational documents via RAG.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-black text-sm">
                    &ldquo;What is the difference between generic wrapper bots and governed AI infrastructure?&rdquo;
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Generic wrapper bots pass prompt text directly to public models with zero policy control. Governed infrastructure adds identity validation, role-based rights, policy interception, and audit trails.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Frequently Asked Questions */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                <FileText className="w-5 h-5 text-emerald-600" /> 6. Frequently Asked Questions
              </h2>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-sans">
                <div>
                  <h3 className="font-bold text-black text-sm mb-1">What is AI governance in an enterprise setting?</h3>
                  <p className="text-neutral-600 leading-relaxed">AI governance enforces deterministic policy interceptors, role-based data permissions, context boundaries, and identity clearance around LLM inference, preventing toxic drift, hallucinations, and unauthorized data leakage.</p>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <h3 className="font-bold text-black text-sm mb-1">How does SattvaOS eliminate data leakage across multi-tenant clients?</h3>
                  <p className="text-neutral-600 leading-relaxed">SattvaOS utilizes isolated tenant sub-spaces and cryptographic identity checks, ensuring that vector RAG retrieval queries only search within authorized organizational data boundaries.</p>
                </div>
              </div>
            </section>

            {/* 7. Related DigiXPro Service Link */}
            <section className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                  <h3 className="text-lg font-bold text-purple-950">AI Search Optimization &amp; GEO</h3>
                  <p className="text-xs text-purple-800 mt-1">Explore how DigiXPro engineers machine-readable context, AI search visibility, and governed AI architecture.</p>
                </div>
                <Link 
                  href="/search-automation/ai-search-optimization-geo"
                  className="inline-flex items-center justify-center px-5 py-3 bg-purple-700 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition shrink-0 font-sans"
                >
                  View AI Search Service <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </section>

          </div>

          {/* Right Sidebar: STICKY Derived Principle Box */}
          <div className="md:col-span-4 space-y-6">
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
                  Derived from: SattvaOS Core
                </div>
              </div>

              {/* Consultative CTA Card */}
              <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
                <div className="font-bold text-black text-sm font-sans mb-1">Adopting Enterprise AI?</div>
                <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s evaluate your AI governance, data isolation, and RAG architecture before deployment.</p>
                <Link href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-sm font-sans">
                  Book Architecture Call
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
      <StickyMobileCTA />
    </>
  );
}
