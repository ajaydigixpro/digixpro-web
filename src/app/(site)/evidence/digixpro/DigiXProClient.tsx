'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bot, 
  Share2, 
  Workflow, 
  Database, 
  Globe2, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Layers, 
  FileCode2, 
  Sparkles,
  ExternalLink,
  Code2,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function DigiXProClient() {
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
            Self-Architecture &amp; AI Automation
          </span>
          <span className="text-neutral-400 text-xs font-mono">Case Study #07</span>
          <span className="text-emerald-700 bg-emerald-50 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-200">
            Tech Track
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-black">
          DigiXPro Architecture Engine
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-700 font-medium leading-relaxed max-w-3xl">
          Living proof of our own commercial engineering: Multilingual 24/7 AI Assist concierge, multi-model automated publishing pipelines, and n8n webhook lead capture.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-600" /> Active Platform Engine</div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Autonomous Operational Workflow</div>
          <div className="flex items-center gap-2">
            <a href="https://digixpro.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#16a34a] hover:underline font-semibold">
              <ExternalLink className="w-4 h-4" /> Live Platform (digixpro.in)
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Technical Narrative & Proof */}
        <div className="md:col-span-2 space-y-12">
          
          {/* SECTION 1: Problem / Purpose */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Code2 className="w-5 h-5 text-[#16a34a]" /> 1. Operational Imperative
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                An engineering consultancy must run on the exact standards it preaches. Building a static brochure website that requires manual human triage for every inquiry or manual daily labor for content distribution creates operational friction and violates our core engineering principles.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>Eliminate manual lead triage with deterministic, zero-hallucination tag substitution</li>
                <li>Operate 24/7 client concierge support across 9+ Indian regional scripts</li>
                <li>Automate multi-model social content pipeline on fixed cron schedule</li>
              </ul>
            </div>
          </section>

          {/* SECTION 2: AI Assist Engine */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Bot className="w-5 h-5 text-purple-600" /> 2. AI Assist Concierge (Zero Hallucination Architecture)
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                The DigiXPro AI Assist widget operates via Google Gemini 2.5 Flash, backed by a strict system prompt and deterministic post-processing.
              </p>
              <div className="bg-neutral-900 text-neutral-100 p-4 rounded-xl font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-bold">// Deterministic Tag Substitution Pattern</div>
                <div className="text-neutral-400">INPUT → Model returns tags: [SEE_SERVICES], [SEE_EVIDENCE], [CONTACT]</div>
                <div className="text-neutral-300">PARSER → Replaces tags with actual verified Next.js Links with zero URL hallucination.</div>
              </div>
            </div>
          </section>

          {/* SECTION 3: Multi-Model Automated Publishing */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Workflow className="w-5 h-5 text-blue-600" /> 3. Automated Multi-Model Publishing Engine
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Our social broadcast pipeline operates on a fixed cron schedule via GitHub Actions and Node.js, utilizing multi-model AI synthesis:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-center">
                  <div className="font-bold text-black">Gemini 2.5 Flash</div>
                  <div className="text-[10px] text-neutral-500 mt-1">LinkedIn Copy Generation</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-center">
                  <div className="font-bold text-black">Gemini 2.5 Flash Lite</div>
                  <div className="text-[10px] text-neutral-500 mt-1">X / Twitter Thread Synthesis</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-center">
                  <div className="font-bold text-black">n8n + Notion</div>
                  <div className="text-[10px] text-neutral-500 mt-1">Lead Storage &amp; Webhook Sync</div>
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
                <span><strong>No Freeform URL Generation:</strong> We did not allow the AI bot to guess or invent URLs dynamically. All internal links are injected via deterministic tag substitution.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Manual Lead Copy-Pasting:</strong> Inbound consultation requests flow directly from web form to n8n webhook to Notion database with zero manual data entry.</span>
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
                  &ldquo;How do we automate inbound lead triage without risking broken workflows or bot hallucinations?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  By separating the generative intelligence layer from the deterministic control layer. Gemini generates contextual answers in natural language, while deterministic regex parsers and n8n webhooks handle internal routing and CRM database insertion.
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
                <h3 className="font-bold text-black text-sm mb-1">What is deterministic tag substitution in AI bots?</h3>
                <p className="text-neutral-600 leading-relaxed">Deterministic tag substitution forces the AI model to output placeholder tokens (e.g. [CONTACT_LINK]) instead of raw URLs, allowing frontend code to parse and replace tokens with exact, verified application links.</p>
              </div>
            </div>
          </section>

          {/* SECTION 7: Related DigiXPro Service Link */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                <h3 className="text-lg font-bold text-emerald-950">Workflow &amp; AI Automation</h3>
                <p className="text-xs text-emerald-800 mt-1">See how DigiXPro builds custom n8n webhooks, AI lead capture, and automated content pipelines for clients.</p>
              </div>
              <Link 
                href="/search-automation/workflow-ai-automation"
                className="inline-flex items-center justify-center px-5 py-3 bg-[#16a34a] text-white font-bold text-xs rounded-xl hover:bg-[#15803d] transition shrink-0 font-sans"
              >
                View Automation Service <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Right Column: Tech Specs & Consultative CTA */}
        <div className="space-y-8">
          
          <div className="bg-[#0A0A0A] text-white p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#16a34a] font-bold">
              Self-Architecture Specs
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block">AI Concierge:</span>
                <span className="text-white font-bold font-sans">Gemini 2.5 Flash + Tag Substitution</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Lead Pipeline:</span>
                <span className="text-white font-bold font-sans">n8n Webhook → Notion CRM</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Multilingual Support:</span>
                <span className="text-white font-bold font-sans">9+ Indian Scripts</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Content Pipeline:</span>
                <span className="text-white font-bold font-sans">Multi-Model Cron Publishing</span>
              </div>
            </div>
          </div>

          {/* Consultative CTA Card */}
          <div className="bg-white p-6 border border-neutral-200 rounded-2xl shadow-sm space-y-3 text-center">
            <div className="font-bold text-black text-sm">Want Automations Like This?</div>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              Let&apos;s evaluate how n8n webhooks and AI assist concierges can automate your inbound lead operations.
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
