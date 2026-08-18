'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  GraduationCap, 
  Layers, 
  Briefcase,
  BookOpen,
  Workflow,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Bot,
  MessageSquareCode,
  CalendarCheck,
  Send,
  Languages,
  Sparkles,
  Share2,
  Lock,
  Clock,
  Cpu,
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';

export default function DigiXProClient() {
  const [chatWidgetError, setChatWidgetError] = useState(false);
  const [contentAutoError, setContentAutoError] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#16a34a]/20 transition-colors duration-200">
      
      {/* Navigation Back */}
      <Link href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </Link>

      {/* Header Section */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 font-bold uppercase tracking-widest">
            Framework Report
          </span>
          <span className="text-[10px] font-mono text-[#16a34a] bg-green-50 dark:bg-green-950/50 px-2 py-0.5 rounded border border-green-200 dark:border-green-800 font-bold uppercase tracking-widest">
            Self-Architecture &amp; Production Systems
          </span>
          <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 font-bold uppercase tracking-widest">
            Live in Production
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black dark:text-white">
          DigiXPro
        </h1>
        <p className="text-xl text-neutral-900 dark:text-neutral-200 font-extrabold max-w-3xl mb-2">
          Building reusable engineering assets and autonomous systems instead of one-off client hours.
        </p>
        <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal max-w-3xl leading-relaxed">
          How we architected DigiXPro not as a traditional software outsourcing agency, but as an Architecture Advisory and Product Engineering Studio that compounds intellectual property through live, production-grade autonomous engines.
        </p>
      </div>

      {/* ABOVE THE FOLD: Core Metrics / Principles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 rounded-xl p-5">
          <div className="text-[10px] font-mono font-bold text-green-800 dark:text-green-300 uppercase tracking-wider mb-1 flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-[#16a34a]" /> Model
          </div>
          <div className="text-lg font-extrabold text-green-950 dark:text-green-100 font-mono mt-1">Knowledge-First</div>
          <p className="text-[11px] text-green-800 dark:text-green-300/80 mt-1">Advisory-led execution</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 flex items-center">
            <Bot className="w-3.5 h-3.5 mr-1 text-[#16a34a]" /> AI Concierge
          </div>
          <div className="text-2xl font-extrabold text-black dark:text-white font-mono mt-1">9+ Scripts</div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Zero-hallucination moat</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#16a34a]" /> Publishing
          </div>
          <div className="text-2xl font-extrabold text-black dark:text-white font-mono mt-1">Multi-Model</div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Unattended pipeline</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-[#16a34a]" /> Output
          </div>
          <div className="text-2xl font-extrabold text-black dark:text-white font-mono mt-1">Compound IP</div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">8 Verified Reports</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Main Narrative & Evidence */}
        <div className="md:col-span-8 space-y-12">
          
          {/* 1. The Traditional Agency Failure */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 text-black dark:text-white">
              <AlertTriangle className="w-5 h-5 mr-2 text-black dark:text-white" /> 1. The Traditional Agency Failure
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              Most digital agencies and software development shops operate on an unscalable model: selling hours for lines of code. This results in isolated, one-off projects that generate zero compounding value for the firm and push unnecessary technical debt onto the client.
            </p>
            
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs text-neutral-700 dark:text-neutral-300 space-y-3 shadow-sm">
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded border border-neutral-200 dark:border-neutral-700">
                <span>Client requests software</span>
                <span className="text-red-600 dark:text-red-400 font-bold">Agency quotes hours</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded border border-neutral-200 dark:border-neutral-700">
                <span>Custom code written from scratch</span>
                <span className="text-red-600 dark:text-red-400 font-bold">No architectural reuse</span>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded border border-neutral-200 dark:border-neutral-700">
                <span>Project delivered &amp; forgotten</span>
                <span className="text-red-600 dark:text-red-400 font-bold">Zero IP generated</span>
              </div>
              <div className="text-center text-[#16a34a] font-bold mt-2">↓ The DigiXPro Shift ↓</div>
              <div className="flex items-center justify-between bg-[#0A0A0A] text-white p-3.5 rounded border border-neutral-800 font-bold">
                <span>Extract Reusable Architecture &amp; Autonomous Engines</span>
                <span className="text-[#16a34a]">Compound Engineering IP</span>
              </div>
            </div>
          </section>

          {/* 2. The Architecture Decision */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 text-black dark:text-white">
              <Lightbulb className="w-5 h-5 mr-2 text-black dark:text-white" /> 2. The DigiXPro Architecture Decision
            </h2>
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-sm text-sm">
              <p className="font-mono text-[#16a34a] mb-3 font-bold text-xs">Company log // Architecture Manifesto</p>
              <p className="mb-4 leading-relaxed">
                We consciously decided to position DigiXPro as a <strong>Knowledge-First Architecture Firm</strong> rather than a coding shop. <em>Code is cheap; architectural decisions are expensive.</em>
              </p>
              <ul className="space-y-2.5 text-neutral-300 font-mono text-xs">
                <li className="flex items-start">
                  <span className="text-[#16a34a] mr-2">→</span>
                  <span>We never start with code. We start with business operating systems understanding.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16a34a] mr-2">→</span>
                  <span>We rely heavily on our <strong>Evidence Archive</strong> to prove past architectural success.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16a34a] mr-2">→</span>
                  <span>Every deployment (Healthcare, Marketplace, AI Infrastructure) must yield a reusable framework.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16a34a] mr-2">→</span>
                  <span>We build, dogfood, and govern our own autonomous infrastructure in production before advising enterprises.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. The IP Generation Pipeline */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 text-black dark:text-white">
              <Zap className="w-5 h-5 mr-2 text-black dark:text-white" /> 3. The Intellectual Property Pipeline
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 leading-relaxed">
              Our core operational moat is how we process engagements. We do not just build systems; we extract knowledge through a strict, continuous pipeline:
            </p>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6 font-mono text-xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded border border-neutral-200 dark:border-neutral-700 text-center">
                <span className="bg-white dark:bg-neutral-900 px-3 py-2 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-black dark:text-white">Observation</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white dark:bg-neutral-900 px-3 py-2 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-black dark:text-white">Evidence</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white dark:bg-neutral-900 px-3 py-2 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-black dark:text-white">Pattern</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-white dark:bg-neutral-900 px-3 py-2 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-black dark:text-white">Principle</span>
                <span className="text-neutral-400">→</span>
                <span className="bg-green-50 dark:bg-green-950/60 text-green-900 dark:text-green-300 px-3 py-2 rounded border border-green-200 dark:border-green-800 font-bold">Reusable Architecture</span>
              </div>

              {/* Generated Evidence Proof Grid */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-2">
                <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase text-[10px] tracking-wider mb-2">Generated Evidence Proofs in Production:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-neutral-800 dark:text-neutral-200">
                  <Link href="/evidence/dr-aggarwal" className="bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-1.5 shrink-0" /> Dr. Amit Aggrwal (PT)</Link>
                  <Link href="/evidence/scan-centre" className="bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-1.5 shrink-0" /> Scan Centre near me</Link>
                  <Link href="/evidence/buy-secondhand-book" className="bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-1.5 shrink-0" /> Buy Secondhand Books</Link>
                  <Link href="/evidence/sattvaos" className="bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-1.5 shrink-0" /> SattvaOS</Link>
                  <Link href="/evidence/nirvandham" className="bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-1.5 shrink-0" /> Nirvandham</Link>
                  <Link href="/evidence/muktibodh" className="bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-1.5 shrink-0" /> Muktibodh</Link>
                </div>
              </div>
            </div>
          </section>

          {/* 4. AI Assist: Governed and Multilingual, Live in Production (NEW CONCRETE EVIDENCE) */}
          <section className="scroll-mt-16">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <h2 className="text-xl font-bold flex items-center text-black dark:text-white">
                <Bot className="w-5 h-5 mr-2 text-[#16a34a]" /> 4. AI Assist: Governed &amp; Multilingual, Live in Production
              </h2>
              <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-green-50 dark:bg-green-950/50 px-2.5 py-0.5 rounded border border-green-200 dark:border-green-800">
                24/7 Live Concierge
              </span>
            </div>
            
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 leading-relaxed">
              We engineered a production-grade autonomous conversational triage concierge for DigiXPro. Built to operate around the clock, it conducts natural, technically accurate discovery conversations with inbound business prospects across India without human latency or sales hyperbole.
            </p>

            {/* 2-Column Section: Portrait Screenshot / Placeholder on Left, Architectural Facts & Real Log on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
              
              {/* Left Column: Vertical Portrait Screenshot Frame */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[340px]">
                  {chatWidgetError ? (
                    <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[440px]">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-3">
                        <Bot className="w-6 h-6 text-[#16a34a]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                        ai-assist-widget-conversation.png
                      </span>
                      <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mb-3">
                        Orientation: Vertical / Portrait (9:16)
                      </span>
                      <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                        Path: public/evidence/digixpro/ai-assist-widget-conversation.png
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
                        Drop the real portrait screenshot of the AI Assist widget conversation into this folder.
                      </p>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
                      <Image
                        src="/evidence/digixpro/ai-assist-widget-conversation.png"
                        alt="DigiXPro AI Assist live conversational widget mid-dialogue handling client discovery"
                        width={400}
                        height={700}
                        className="w-full h-auto object-contain rounded-xl"
                        onError={() => setChatWidgetError(true)}
                        priority
                      />
                    </div>
                  )}
                  <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-3 text-center leading-relaxed">
                    Production AI Assist: Real conversational concierge mid-conversation on digixpro.in.
                  </p>
                </div>
              </div>

              {/* Right Column: Key Architectural Facts */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wider">
                    <Languages className="w-4 h-4 text-[#16a34a]" />
                    <span>Multilingual in 9+ Indian Scripts</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Fluently engages visitors in <strong>English, Hindi, Punjabi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam</strong>, and conversational <strong>Hinglish / Roman-script transliterations</strong>. Crucially, the system always replies in the visitor&apos;s exact script rather than forcing a language shift.
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wider">
                    <Lock className="w-4 h-4 text-[#16a34a]" />
                    <span>Deterministic Tag Substitution (Zero-Hallucination Moat)</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    The LLM never directly generates hyperlinks or monetary figures. Instead, the model emits typed structural markup tokens. A downstream deterministic code layer parses and injects authentic canonical URLs and validated figures—eliminating the broken-link and fabricated-pricing failure modes typical of off-the-shelf bots.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center text-[11px] font-mono font-bold text-[#16a34a] mb-1">
                      <Send className="w-3.5 h-3.5 mr-1" /> Instant Lead Parse
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-normal">
                      Every contact detail triggers an immediate structured context alert directly to the founder.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center text-[11px] font-mono font-bold text-[#16a34a] mb-1">
                      <Clock className="w-3.5 h-3.5 mr-1" /> Low-Latency Inference
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-normal">
                      Response streaming delivers localized, structured replies in single-digit to low-double-digit seconds.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Production Exchange Log (Dark Box Style) */}
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-lg font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                <div className="flex items-center space-x-2 text-[#16a34a] font-bold">
                  <MessageSquareCode className="w-4 h-4" />
                  <span>Company log // Live Production Transcript (Anonymized)</span>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase">Triage Audit</span>
              </div>

              <div className="space-y-4 leading-relaxed">
                <div className="bg-neutral-900/90 p-3.5 rounded-lg border border-neutral-800 text-neutral-300">
                  <span className="text-neutral-500 font-bold uppercase block mb-1 text-[10px]">Context:</span>
                  Visitor inquiring about launching an online spices venture with a capital constraint of ~₹50,000, asking whether custom engineering and official WhatsApp API automation were mandatory on Day 1.
                </div>

                <div className="space-y-2.5 pt-1 font-sans">
                  <div className="bg-neutral-900/60 p-3 rounded-lg border-l-2 border-neutral-600 text-neutral-300 text-xs">
                    <strong className="text-white font-mono block text-[11px] mb-1">Visitor:</strong>
                    &ldquo;I have a ₹50,000 budget for my new spices brand. Do I need custom development and full WhatsApp automation right now?&rdquo;
                  </div>

                  <div className="bg-neutral-900 p-3.5 rounded-lg border-l-2 border-[#16a34a] text-neutral-200 text-xs leading-relaxed">
                    <strong className="text-[#16a34a] font-mono block text-[11px] mb-1">DigiXPro AI Assist:</strong>
                    &ldquo;With a ₹50,000 launch budget, you should not spend your capital on custom software architecture. Prioritize launching on a clean, template-based commerce storefront to get live and validate order velocity first. Furthermore, official WhatsApp Business API integration requires formal business registration and GST credentials for verification—without an established entity, you cannot activate official API access. DigiXPro focuses on architecture advisory and does not handle business tax registration; we recommend completing your GST setup with a qualified Chartered Accountant before provisioning API-level automation.&rdquo;
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-400 font-mono border-t border-neutral-800 flex items-center justify-between">
                  <span>Objective: Honest constraints over premature software spend.</span>
                  <span className="text-[#16a34a] font-bold">✓ Verified Boundary Enforcement</span>
                </div>
              </div>
            </div>

          </section>

          {/* 5. Content Automation: A Multi-Model Publishing Pipeline (NEW CONCRETE EVIDENCE) */}
          <section className="scroll-mt-16">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <h2 className="text-xl font-bold flex items-center text-black dark:text-white">
                <Sparkles className="w-5 h-5 mr-2 text-[#16a34a]" /> 5. Content Automation: A Multi-Model Publishing Pipeline
              </h2>
              <span className="text-[11px] font-mono font-bold text-[#16a34a] bg-green-50 dark:bg-green-950/50 px-2.5 py-0.5 rounded border border-green-200 dark:border-green-800">
                Scheduled &amp; Unattended
              </span>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 leading-relaxed">
              We operate an autonomous, multi-model publishing pipeline that conceives, audits, synthesizes, and broadcasts technical architectural insights across our social channels on a fixed cron schedule with zero human handoffs.
            </p>

            {/* Architecture Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wider">
                  <CalendarCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>Fixed Execution Cadence</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  The automated engine runs on an exact production clock with zero manual intervention:
                </p>
                <ul className="text-[11px] font-mono space-y-1 text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 px-2.5 py-1 rounded">
                    <span>Weekdays (Mon – Fri):</span>
                    <span className="font-bold text-[#16a34a]">08:00 AM IST</span>
                  </li>
                  <li className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 px-2.5 py-1 rounded">
                    <span>Saturdays:</span>
                    <span className="font-bold text-[#16a34a]">10:30 AM IST</span>
                  </li>
                  <li className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 px-2.5 py-1 rounded">
                    <span>Sundays:</span>
                    <span className="font-bold text-[#16a34a]">11:00 AM IST</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-[#16a34a]" />
                  <span>Multi-Model Intelligence Layer</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Specialized AI model roles coordinated in strict sequential execution:
                </p>
                <ul className="text-[11px] space-y-1.5 text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-start">
                    <span className="text-[#16a34a] font-mono mr-1.5 font-bold">1.</span>
                    <span><strong>Groq Engine</strong>: Rapid draft conceptualization from approved topic calendars.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#16a34a] font-mono mr-1.5 font-bold">2.</span>
                    <span><strong>Gemini Model</strong>: Deep brand voice critique, fact verification, and tone alignment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#16a34a] font-mono mr-1.5 font-bold">3.</span>
                    <span><strong>Visual Synthesis</strong>: Automated graphic generation formatted for distribution.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* LinkedIn Post Example Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-[#16a34a]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
                    Live Production Output: Auto-Published Broadcast
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                  LinkedIn &amp; Facebook Multi-Channel
                </span>
              </div>

              <div className="max-w-xl mx-auto">
                {contentAutoError ? (
                  <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[320px]">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      content-automation-linkedin-example.png
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mb-3">
                      Orientation: Square or Vertical (1:1 or 4:5)
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                      Path: public/evidence/digixpro/content-automation-linkedin-example.png
                    </span>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
                      Drop the example screenshot of an auto-published post into this folder.
                    </p>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 shadow-md">
                    <Image
                      src="/evidence/digixpro/content-automation-linkedin-example.png"
                      alt="Example of an auto-published technical insight post on LinkedIn synthesized by DigiXPro multi-model pipeline"
                      width={800}
                      height={800}
                      className="w-full h-auto object-contain rounded-lg"
                      onError={() => setContentAutoError(true)}
                    />
                  </div>
                )}
                <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-3 text-center leading-relaxed">
                  Production Proof: End-to-end multi-model generation, tone audit, visual synthesis, and auto-publishing.
                </p>
              </div>
            </div>

          </section>

          {/* 6. The Compound Advantage */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 text-black dark:text-white">
              <TrendingUp className="w-5 h-5 mr-2 text-black dark:text-white" /> 6. The Compound Advantage
            </h2>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-3 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <p className="font-sans text-neutral-600 dark:text-neutral-400 text-sm mb-2">Every system built expands our operational capability. Each architecture compounds into the next:</p>
              
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span>Healthcare Systems (Dr. Amit Aggrwal)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black dark:text-white">High-Trust Architecture</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span>Marketplace Engineering (Scan Centre)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black dark:text-white">Decoupled Multi-Vendor Flows</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span>Commerce Operating System (Buy Secondhand Books)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black dark:text-white">Single-Copy Inventory Engines</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span>Autonomous Concierge &amp; Pipelines (DigiXPro Core)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black dark:text-white">Governed Multi-Model Automation</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span>Institutional AI Infrastructure (SattvaOS)</span>
                <span className="text-neutral-400">→</span>
                <span className="font-bold text-black dark:text-white">Enterprise Architecture Blueprints</span>
              </div>
            </div>
          </section>

          {/* 7. Closing Black Card Statement */}
          <section>
            <div className="bg-[#0A0A0A] text-white p-8 rounded-xl border border-neutral-800 space-y-4 shadow-xl">
              <div className="flex items-center text-[#16a34a] font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 mr-2" /> Decision Optimization Engine
              </div>
              <p className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-snug">
                &ldquo;DigiXPro does not optimize projects. DigiXPro optimizes decision quality.&rdquo;
              </p>
              <div className="pt-4 border-t border-neutral-800 font-mono text-xs text-neutral-300 flex flex-wrap items-center gap-2">
                <span className="bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700 font-bold">Better Decisions</span> → 
                <span className="bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700 font-bold">Better Architecture</span> → 
                <span className="bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700 font-bold">Better Software</span> → 
                <span className="bg-green-950 text-[#16a34a] px-3 py-1.5 rounded border border-green-800 font-bold">Better Businesses</span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle Box */}
        <div className="md:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#16a34a] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-001</div>
              <p className="text-lg font-bold leading-tight text-white mb-3">
                &ldquo;A technology company&apos;s value is not measured by lines of code written, but by the reusable intellectual property generated from every execution.&rdquo;
              </p>
              <p className="text-sm font-medium leading-relaxed text-neutral-300 mb-4">
                Architecture before implementation. Autonomous infrastructure over billable labor.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: DigiXPro (Self-Architecture)
              </div>
            </div>

            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-xl shadow-xl">
              <div className="flex items-center text-[#16a34a] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Governance Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-002</div>
              <p className="text-base font-bold leading-tight text-white mb-2">
                Deterministic Code Over Freeform LLM Outputs
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Autonomous models reason and draft; deterministic code resolves routes, pricing, and integrations.
              </p>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white dark:bg-neutral-900 p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black dark:text-white text-sm font-sans mb-1">Need Architectural Advisory?</div>
              <p className="text-neutral-500 dark:text-neutral-400 font-sans text-xs mb-4">Design business systems and autonomous pipelines before writing code.</p>
              <Link href="/contact" className="inline-flex items-center justify-center w-full py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition">
                Request Architecture Audit <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
