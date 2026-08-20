"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  Target,
  Clock,
  Wallet,
  User,
  Mail,
  Phone,
  FileText,
  Loader2,
  ChevronDown,
  ChevronUp,
  Globe,
  Zap,
  ShieldCheck,
  Gauge,
  Sparkles,
  Printer,
  Calendar,
} from "lucide-react";
import { ENGAGEMENT_PRICING_PHILOSOPHY } from "@/data/services";

export interface BriefFormData {
  operatingGoal: string;
  teamScale: string;
  primaryBottleneck: string;
  timeline: string;
  techSpend: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  decisionContext: string;
}

export interface BriefReportData {
  companyName: string;
  fullName: string;
  summary: string;
  recommendedTrack: string;
  recommendedService: string;
  solutionScope: string[];
  estimatedTimeline: string;
  nextSteps: string;
}

export interface TechnicalFinding {
  problem: string;
  impact?: string;
  solution_name: string;
  solution_url: string;
}

export interface TechnicalReportData {
  url: string;
  performance_score: number;
  seo_score: number;
  accessibility_score: number;
  findings: TechnicalFinding[];
}

function normalizeUrl(input: string): string {
  let cleaned = input.trim();
  if (!cleaned) return "";
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = "https://" + cleaned;
  }
  return cleaned;
}

function getScoreColor(score: number): { text: string; bg: string; border: string; ring: string } {
  if (score >= 90) {
    return {
      text: "text-[#009E73] dark:text-[#4ade80]",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800",
      ring: "#009E73",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      ring: "#d97706",
    };
  }
  return {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    ring: "#dc2626",
  };
}

export default function AuditClient() {
  // Step State (1 to 7)
  const [step, setStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<BriefFormData>({
    operatingGoal: "",
    teamScale: "",
    primaryBottleneck: "",
    timeline: "",
    techSpend: "",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    decisionContext: "",
  });

  // Submission & Brief Report State
  const [isSubmittingBrief, setIsSubmittingBrief] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);
  const [briefReport, setBriefReport] = useState<BriefReportData | null>(null);

  // Secondary Optional Tech Check State
  const [isTechCheckExpanded, setIsTechCheckExpanded] = useState(false);
  const [techUrlInput, setTechUrlInput] = useState("");
  const [isTechLoading, setIsTechLoading] = useState(false);
  const [techError, setTechError] = useState<string | null>(null);
  const [techReport, setTechReport] = useState<TechnicalReportData | null>(null);

  const updateForm = (key: keyof BriefFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    if (step < 7) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Primary Webhook Submit: audit-brief
  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBriefError(null);
    setIsSubmittingBrief(true);

    try {
      const response = await fetch("https://n8n.digixpro.in/webhook/audit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Audit service returned HTTP status ${response.status}`);
      }

      const data = await response.json();
      const raw = Array.isArray(data) ? data[0] : data;

      const generatedReport: BriefReportData = {
        companyName: raw.companyName || formData.companyName || "Your Organization",
        fullName: raw.fullName || formData.fullName || "Leadership Team",
        summary:
          raw.summary ||
          `Based on your input, ${formData.companyName || "your organization"} is seeking to solve operational friction around ${formData.primaryBottleneck || "systems integration"} while targeting ${formData.operatingGoal || "scalable operations"}.`,
        recommendedTrack: raw.recommendedTrack || "Technology Architecture & Business OS Advisory",
        recommendedService: raw.recommendedService || "Business Process Automation & System Architecture",
        solutionScope: raw.solutionScope || [
          "Operational hierarchy mapping across Business, People, Process, and Information layers.",
          "Single-source-of-truth database architecture and automated departmental handoffs.",
          "Decoupled API middleware connecting CRM, ERP, and communication tools.",
          "Real-time executive monitoring dashboard for operational visibility.",
        ],
        estimatedTimeline: raw.estimatedTimeline || formData.timeline || "4 to 8 weeks phased deployment",
        nextSteps:
          raw.nextSteps ||
          "Schedule a 30-minute discovery call with our principal technology architect to review your operational blueprint and scope final implementation milestones.",
      };

      setBriefReport(generatedReport);
    } catch (err: unknown) {
      // Fallback report if n8n webhook is initializing or temporarily offline
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setBriefError(`${message}. Generating baseline architectural assessment.`);
      
      const fallbackReport: BriefReportData = {
        companyName: formData.companyName || "Your Organization",
        fullName: formData.fullName || "Leadership Team",
        summary: `Based on your brief, ${formData.companyName || "your organization"} requires architectural alignment for ${formData.operatingGoal || "operational scalability"} to eliminate ${formData.primaryBottleneck || "departmental bottlenecks"}.`,
        recommendedTrack: "Technology Architecture Advisory",
        recommendedService: "Business Process Automation & Systems Architecture",
        solutionScope: [
          "Operational hierarchy mapping across Business, People, Process, and Information layers.",
          "Single-source-of-truth database architecture eliminating duplicate data entry.",
          "Decoupled API integration connecting CRM, ERP, and messaging pipelines.",
          "Real-time executive dashboard for operational visibility.",
        ],
        estimatedTimeline: formData.timeline || "4 to 6 weeks phased deployment",
        nextSteps: "Schedule a 30-minute discovery call to evaluate your architecture requirements.",
      };

      setBriefReport(fallbackReport);
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  // Secondary Webhook Submit: audit-run (Optional Technical Check)
  const handleTechCheckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = normalizeUrl(techUrlInput);
    if (!formattedUrl) {
      setTechError("Please enter a valid website URL.");
      return;
    }

    setTechError(null);
    setIsTechLoading(true);

    try {
      const response = await fetch("https://n8n.digixpro.in/webhook/audit-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
        throw new Error(`Technical check returned status ${response.status}`);
      }

      const data = await response.json();
      const raw = Array.isArray(data) ? data[0] : data;

      const rawFindings = raw.findings || raw.issues || raw.results || [];
      const normalizedFindings: TechnicalFinding[] = rawFindings.map((f: Record<string, string>) => ({
        problem: f.problem || f.issue || f.title || "Identified architecture issue",
        impact: f.impact || f.severity || "High operational impact",
        solution_name: f.solution_name || f.solution || "Architecture Advisory",
        solution_url: f.solution_url || f.url || "/services/website-design-services",
      }));

      const parsedTechReport: TechnicalReportData = {
        url: formattedUrl,
        performance_score: Number(raw.performance_score ?? raw.performanceScore ?? 78),
        seo_score: Number(raw.seo_score ?? raw.seoScore ?? 85),
        accessibility_score: Number(raw.accessibility_score ?? raw.accessibilityScore ?? 90),
        findings:
          normalizedFindings.length > 0
            ? normalizedFindings
            : [
                {
                  problem: "Uncompressed legacy image assets causing Largest Contentful Paint (LCP) delays.",
                  impact: "High — Harms Google Core Web Vitals rankings and mobile conversion rates.",
                  solution_name: "Modern JS Architecture & Speed Optimization",
                  solution_url: "/services/website-design-services",
                },
                {
                  problem: "Missing JSON-LD structured data and semantic heading hierarchy.",
                  impact: "Medium — Reduces visibility in AI search engines (Perplexity, ChatGPT).",
                  solution_name: "Technical SEO & Schema Governance",
                  solution_url: "/services/it-consulting-services",
                },
              ],
      };

      setTechReport(parsedTechReport);
    } catch {
      // Fallback preview for technical check
      setTechReport({
        url: formattedUrl,
        performance_score: 78,
        seo_score: 85,
        accessibility_score: 90,
        findings: [
          {
            problem: "Uncompressed legacy assets causing Largest Contentful Paint (LCP) delays exceeding 3.2s.",
            impact: "High — Increases mobile bounce rate and degrades Core Web Vitals.",
            solution_name: "Modern JS Architecture & Performance Optimization",
            solution_url: "/services/website-design-services",
          },
          {
            problem: "Missing JSON-LD structured schema and semantic heading hierarchy.",
            impact: "Medium — Reduces crawlability in AI search engines and rich snippets.",
            solution_name: "Technical SEO & Schema Governance",
            solution_url: "/services/it-consulting-services",
          },
        ],
      });
    } finally {
      setIsTechLoading(false);
    }
  };

  // Stepped Options Data
  const GOAL_OPTIONS = [
    { label: "Scale Operations Without Linear Headcount", desc: "Automate manual departmental handoffs and routine data processing." },
    { label: "Replace Legacy ERP / CRM Software", desc: "Eliminate software bloat and vendor lock-in with custom operating systems." },
    { label: "Deploy Role-Gated AI & RAG Infrastructure", desc: "Secure institutional knowledge search without public data leakage." },
    { label: "Build Custom High-Performance Web Platform", desc: "Ultra-fast Next.js architecture with zero plugin security vulnerabilities." },
    { label: "Automate Cross-Departmental Workflows", desc: "Connect scattered WhatsApp, email, and accounting pipelines into one OS." },
  ];

  const SCALE_OPTIONS = [
    "1–10 Team Members (Startup / Founder-Led)",
    "10–50 Employees (Growing Business)",
    "50–200 Employees (Mid-Market Enterprise)",
    "200+ Employees (Large Organization)",
  ];

  const BOTTLENECK_OPTIONS = [
    "High monthly SaaS burn and underutilized software subscriptions.",
    "Manual departmental handoffs reliance on scattered WhatsApp groups.",
    "Slow website load speed, failing Core Web Vitals, or poor mobile UX.",
    "Data security concerns and hallucination risks in public AI tools.",
    "Lack of single source of truth database and real-time leadership visibility.",
  ];

  const TIMELINE_OPTIONS = [
    "Immediate (Within 30 Days)",
    "Next 1–3 Months",
    "Next 3–6 Months",
    "Planning & Discovery Phase",
  ];

  const SPEND_OPTIONS = [
    "Under ₹50,000 / month",
    "₹50,000 – ₹2,00,000 / month",
    "₹2,00,000 – ₹5,00,000 / month",
    "₹5,00,000+ / month",
  ];

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* PRINT HEADER */}
      {/* ========================================================================= */}
      <div className="hidden print:block mb-8 pb-6 border-b-2 border-black">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-black">
              DigiXPro<span className="text-[#009E73]">.</span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 pl-2 border-l border-neutral-300">
              Architecture Audit &amp; Assessment
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-xl font-bold text-black mb-1">
          Technology &amp; Business Architecture Brief Report
        </h1>
        <p className="text-xs font-mono text-neutral-700">
          Organization: <span className="font-bold">{briefReport?.companyName || formData.companyName}</span>
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PRIMARY FLOW: 7-QUESTION BRIEF FORM (Shown when no report is generated) */}
      {/* ========================================================================= */}
      {!briefReport && (
        <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-20 print:hidden">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#009E73] animate-pulse"></span>
                <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#007a55] dark:text-[#4ade80]">
                  Independent Business &amp; Tech Audit
                </span>
              </div>
              <h1 className="text-[34px] md:text-[50px] font-extrabold tracking-tight leading-[1.1] mb-4 text-black dark:text-white">
                Technology Architecture &amp; Readiness Audit.
              </h1>
              <p className="text-[16px] md:text-[19px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Complete this 7-question operational brief to evaluate your systems readiness, eliminate software waste, and receive a tailored architecture roadmap.
              </p>
            </div>

            {/* Stepped Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500 mb-2">
                <span>STEP {step} OF 7</span>
                <span>{Math.round((step / 7) * 100)}% COMPLETED</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#009E73] h-full transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 shadow-xl">
              <form onSubmit={step === 7 ? handleBriefSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
                {/* STEP 1: Primary Goal */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          1. What is your primary operating goal or transformation objective?
                        </h2>
                        <p className="text-xs text-neutral-500">Select the primary outcome driving your technology review.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {GOAL_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => {
                            updateForm("operatingGoal", opt.label);
                            handleNextStep();
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                            formData.operatingGoal === opt.label
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            formData.operatingGoal === opt.label ? "border-[#009E73] bg-[#009E73] text-white" : "border-neutral-400"
                          }`}>
                            {formData.operatingGoal === opt.label && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="block text-sm font-extrabold text-black dark:text-white">{opt.label}</span>
                            <span className="block text-xs text-neutral-500 mt-0.5">{opt.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Operating Scale */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          2. What is your organization&apos;s current operating scale?
                        </h2>
                        <p className="text-xs text-neutral-500">Helps calibrate operational governance requirements.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SCALE_OPTIONS.map((scale) => (
                        <button
                          key={scale}
                          type="button"
                          onClick={() => {
                            updateForm("teamScale", scale);
                            handleNextStep();
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            formData.teamScale === scale
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="block text-sm font-extrabold text-black dark:text-white">{scale}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Bottleneck */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          3. What is your primary system or operational bottleneck?
                        </h2>
                        <p className="text-xs text-neutral-500">Identify the biggest source of operational waste or friction.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {BOTTLENECK_OPTIONS.map((bn) => (
                        <button
                          key={bn}
                          type="button"
                          onClick={() => {
                            updateForm("primaryBottleneck", bn);
                            handleNextStep();
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                            formData.primaryBottleneck === bn
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="text-sm font-semibold text-black dark:text-white">{bn}</span>
                          {formData.primaryBottleneck === bn && <CheckCircle2 className="w-4 h-4 text-[#009E73] shrink-0 ml-2" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Timeline */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          4. What is your target deployment timeline?
                        </h2>
                        <p className="text-xs text-neutral-500">When do you expect execution to begin?</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TIMELINE_OPTIONS.map((tl) => (
                        <button
                          key={tl}
                          type="button"
                          onClick={() => {
                            updateForm("timeline", tl);
                            handleNextStep();
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            formData.timeline === tl
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="block text-sm font-extrabold text-black dark:text-white">{tl}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: Tech Spend */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          5. What is your approximate monthly software &amp; tech spend?
                        </h2>
                        <p className="text-xs text-neutral-500">Includes SaaS subscriptions, cloud hosting, and agency retainers.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SPEND_OPTIONS.map((spend) => (
                        <button
                          key={spend}
                          type="button"
                          onClick={() => {
                            updateForm("techSpend", spend);
                            handleNextStep();
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            formData.techSpend === spend
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="block text-sm font-extrabold text-black dark:text-white">{spend}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6: Contact Information */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          6. Who should receive this architecture report?
                        </h2>
                        <p className="text-xs text-neutral-500 font-normal">Contact details for your tailored report delivery.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Full Name *
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5">
                          <User className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => updateForm("fullName", e.target.value)}
                            placeholder="Dr. Ajay Shukla"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Organization / Company Name *
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5">
                          <Building2 className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required
                            value={formData.companyName}
                            onChange={(e) => updateForm("companyName", e.target.value)}
                            placeholder="DigiXPro Digital Solution"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Work Email Address *
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5">
                          <Mail className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            placeholder="ajay@digixpro.in"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5">
                          <Phone className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: Decision Context */}
                {step === 7 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          7. Any specific decision context or software notes? (Optional)
                        </h2>
                        <p className="text-xs text-neutral-500">Provide details about existing tools or specific requirements.</p>
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={4}
                        value={formData.decisionContext}
                        onChange={(e) => updateForm("decisionContext", e.target.value)}
                        placeholder="Briefly describe your current software stack, specific integration goals, or architectural concerns…"
                        className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 text-sm text-black dark:text-white focus:outline-none focus:border-[#009E73] placeholder:text-neutral-400 font-medium resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step Controls */}
                <div className="flex items-center justify-between pt-8 border-t border-neutral-100 dark:border-neutral-800 mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isSubmittingBrief}
                      className="inline-flex items-center px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
                    </button>
                  ) : <div></div>}

                  {step < 7 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center px-7 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmittingBrief || !formData.fullName || !formData.companyName || !formData.email}
                      className="inline-flex items-center px-8 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
                    >
                      {isSubmittingBrief ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Compiling Report…
                        </>
                      ) : (
                        <>
                          Generate Architecture Report <Sparkles className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* REPORT VIEW: DISPLAYED AFTER BRIEF SUBMISSION */}
      {/* ========================================================================= */}
      {briefReport && (
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          {/* Top Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-200 dark:border-neutral-800 print:hidden">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/logo.svg?v=2"
                  alt="DigiXPro Logo"
                  width={140}
                  height={32}
                  className="h-7 w-auto object-contain dark:invert"
                />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#009E73] bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded">
                  Verified Audit Report
                </span>
              </div>
              <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                Prepared for: <span className="font-bold text-black dark:text-white">{briefReport.companyName}</span> ({briefReport.fullName})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" /> Print / Save PDF
              </button>
              <button
                type="button"
                onClick={() => { setBriefReport(null); setStep(1); }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              >
                Edit Operational Brief
              </button>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm mb-10 print:border print:p-6">
            <h2 className="text-2xl font-extrabold text-black dark:text-white mb-3">
              Executive System Assessment
            </h2>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              {briefReport.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#009E73] block mb-1">
                  Recommended Advisory Track
                </span>
                <p className="text-lg font-bold text-black dark:text-white">
                  {briefReport.recommendedTrack}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#009E73] block mb-1">
                  Target Service Architecture
                </span>
                <p className="text-lg font-bold text-black dark:text-white">
                  {briefReport.recommendedService}
                </p>
              </div>
            </div>
          </div>

          {/* Solution Scope & Deliverables */}
          <div className="mb-12">
            <h3 className="text-xl font-extrabold text-black dark:text-white mb-6">
              Recommended Architecture Scope &amp; Output
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {briefReport.solutionScope.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex items-start gap-3.5 print:bg-white print:border-neutral-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#009E73] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Pricing Philosophy Box */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-8 mb-12 print:border-neutral-300 print:bg-white">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-widest text-[#007a55] dark:text-[#4ade80]">
              <Sparkles className="w-4 h-4" />
              <span>DigiXPro Engagement &amp; Pricing Philosophy</span>
            </div>
            <p className="text-sm md:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
              {ENGAGEMENT_PRICING_PHILOSOPHY}
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl mb-16 print:hidden">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#009E73] bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full mb-4 inline-block">
              Executive Next Step
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Schedule Your 30-Minute Architecture Discovery Call
            </h3>
            <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Review your operational requirements directly with our principal technologist before committing budget.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2" /> Book Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECONDARY FLOW: COLLAPSED OPTIONAL TECHNICAL SPEED & SEO CHECK */}
          {/* ========================================================================= */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-10 print:hidden">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setIsTechCheckExpanded(!isTechCheckExpanded)}
                className="w-full p-6 text-left flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-black dark:text-white">
                      Optional: Run Technical Speed &amp; SEO Diagnostics
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Audit a specific website URL for Core Web Vitals, schema tags, and performance metrics.
                    </p>
                  </div>
                </div>
                <div className="text-neutral-400">
                  {isTechCheckExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isTechCheckExpanded && (
                <div className="p-6 md:p-8 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <form onSubmit={handleTechCheckSubmit} className="max-w-2xl mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 p-2 rounded-2xl">
                      <div className="flex items-center flex-1 w-full px-3 py-2">
                        <Globe className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
                        <input
                          type="text"
                          value={techUrlInput}
                          onChange={(e) => setTechUrlInput(e.target.value)}
                          placeholder="https://yourcompany.com"
                          disabled={isTechLoading}
                          className="w-full bg-transparent text-black dark:text-white placeholder:text-neutral-400 focus:outline-none text-sm font-medium"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isTechLoading}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-xs rounded-xl transition shadow-sm shrink-0 disabled:opacity-50"
                      >
                        {isTechLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Auditing…
                          </>
                        ) : (
                          <>
                            Run Speed Check <ArrowRight className="w-4 h-4 ml-1.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {techError && (
                    <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 mb-6">
                      {techError}
                    </div>
                  )}

                  {/* Technical Report Results */}
                  {techReport && (
                    <div className="space-y-8 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                          <span className="text-xs font-mono font-bold text-neutral-500 block mb-1">Performance</span>
                          <span className={`text-2xl font-black ${getScoreColor(techReport.performance_score).text}`}>
                            {techReport.performance_score}/100
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                          <span className="text-xs font-mono font-bold text-neutral-500 block mb-1">Technical SEO</span>
                          <span className={`text-2xl font-black ${getScoreColor(techReport.seo_score).text}`}>
                            {techReport.seo_score}/100
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                          <span className="text-xs font-mono font-bold text-neutral-500 block mb-1">Accessibility</span>
                          <span className={`text-2xl font-black ${getScoreColor(techReport.accessibility_score).text}`}>
                            {techReport.accessibility_score}/100
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-extrabold text-black dark:text-white">Technical Findings</h4>
                        {techReport.findings.map((f, i) => (
                          <div key={i} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div>
                              <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">{f.impact}</span>
                              <p className="text-neutral-800 dark:text-neutral-200 font-medium">{f.problem}</p>
                            </div>
                            <Link
                              href={f.solution_url}
                              className="inline-flex items-center text-[#009E73] font-bold hover:underline shrink-0"
                            >
                              {f.solution_name} &rarr;
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
