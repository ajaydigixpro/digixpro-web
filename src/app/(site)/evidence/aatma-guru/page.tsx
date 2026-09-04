import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
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
  BookOpen,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Aatma Guru Architecture Evidence',
  description: 'Production evidence and case study for Aatma Guru: multi-tenant organization onboarding platform, workspace provisioning, and enterprise governance OS.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence/aatma-guru',
  },
  openGraph: {
    title: 'Aatma Guru Architecture Evidence | DigiXPro',
    description: 'Production evidence for Aatma Guru organization onboarding platform and multi-tenant workspace provisioning.',
    url: 'https://www.digixpro.in/evidence/aatma-guru',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aatma Guru Architecture Evidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aatma Guru Architecture Evidence | DigiXPro',
    description: 'Production evidence for Aatma Guru organization onboarding platform.',
    images: ['/twitter-image.png'],
  },
};

const faqs = [
  {
    question: "What is tenant workspace provisioning in multi-tenant SaaS?",
    answer: "Tenant workspace provisioning dynamically deploys isolated subdomains, database scopes, brand styling parameters, and role-based permissions for new organizational clients."
  },
  {
    question: "Why are human verification gates necessary prior to AI tenant activation?",
    answer: "Human verification gates ensure that organizational authority credentials, copyright clearances, and data integrity compliance are validated before an AI model indexes institutional documents."
  }
];

export default function AatmaGuruEvidence() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
          { name: 'aatma.guru', url: 'https://www.digixpro.in/evidence/aatma-guru' },
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
              Architecture Report
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
              Organization Onboarding Platform
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
              Tech Track
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black">
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
              <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
                <AlertTriangle className="w-5 h-5 mr-2 text-black" /> 1. The Multi-Tenant Onboarding Problem
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
              <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
                <Lightbulb className="w-5 h-5 mr-2 text-black" /> 2. The Onboarding Pipeline Architecture
              </h2>
              <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
                <p className="font-mono text-[#22C55E] mb-3 font-bold text-xs">Execution pipeline</p>
                <p className="mb-4 leading-relaxed">
                  aatma.guru acts as the controlled gateway between the raw SattvaOS infrastructure and deployed institutional guides.
                </p>
                <ul className="space-y-2 text-neutral-300 font-mono text-xs">
                  <li>→ <strong>Organization Registration:</strong> Captures institutional metadata and authority credentials.</li>
                  <li>→ <strong>Human Verification &amp; Rights Approval:</strong> Manual or programmatic review gates before tenant activation.</li>
                  <li>→ <strong>Knowledge Registration:</strong> Ingests and indexes the initial organizational corpus into Vector RAG.</li>
                  <li>→ <strong>Studio Provisioning:</strong> Deploys the isolated tenant interface (<span className="text-[#22C55E]">tenant.aatma.guru</span>).</li>
                </ul>
              </div>
            </section>

            {/* 3. Core Modules */}
            <section>
              <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
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

            {/* 4. What We Deliberately Did Not Do */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                <Ban className="w-5 h-5 text-red-500" /> 4. What We Deliberately Did Not Do
              </h2>
              <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>No Un-Gated Self-Registration:</strong> We did not allow anonymous users to provision enterprise AI guides without human verification clearance.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>No Shared Corpus Indexing:</strong> We did not merge multi-tenant RAG vector spaces; tenant workspaces are strictly decoupled.</span>
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
                    &ldquo;How do we structure multi-tenant customer onboarding so that each organization&apos;s data space remains strictly isolated?&rdquo;
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    By separating subdomain routing (&lt;tenant&gt;.aatma.guru), database row clearance keys, and vector namespace identifiers during workspace provisioning.
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
                  <h3 className="font-bold text-black text-sm mb-1">What is tenant workspace provisioning in multi-tenant SaaS?</h3>
                  <p className="text-neutral-600 leading-relaxed">Tenant workspace provisioning dynamically deploys isolated subdomains, database scopes, brand styling parameters, and role-based permissions for new organizational clients.</p>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <h3 className="font-bold text-black text-sm mb-1">Why are human verification gates necessary prior to AI tenant activation?</h3>
                  <p className="text-neutral-600 leading-relaxed">Human verification gates ensure that organizational authority credentials, copyright clearances, and data integrity compliance are validated before an AI model indexes institutional documents.</p>
                </div>
              </div>
            </section>

            {/* 7. Related DigiXPro Service Link */}
            <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">Related Advisory Architecture</span>
                  <h3 className="text-lg font-bold text-emerald-950">Business Systems &amp; Process Architecture</h3>
                  <p className="text-xs text-emerald-800 mt-1">Explore how DigiXPro designs multi-tenant B2B systems, operational workflows, and data isolation.</p>
                </div>
                <Link 
                  href="/advisory/business-systems-process-architecture"
                  className="inline-flex items-center justify-center px-5 py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition shrink-0 font-sans"
                >
                  View Systems Advisory <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
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
                <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-035</div>
                <p className="text-lg font-bold leading-tight text-white mb-3">
                  &ldquo;In multi-tenant AI systems, secure onboarding and rights validation are more complex than the underlying model.&rdquo;
                </p>
                <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                  Platform scale is dictated not by inference speed, but by the rigor of organizational provisioning and verification gates.
                </p>
                <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                  Derived from: aatma.guru Onboarding OS
                </div>
              </div>

              {/* Consultative CTA Card */}
              <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm text-xs font-mono text-center">
                <div className="font-bold text-black text-sm font-sans mb-1">Building Multi-Tenant SaaS?</div>
                <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s map tenant isolation, onboarding clearance, and RBAC security before writing code.</p>
                <Link href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-sm font-sans">
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
