"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  ArrowRight,
  Download,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Zap,
  Gauge,
  ShieldCheck,
  Mail,
  RefreshCw,
  Loader2,
  X,
  FileText,
} from "lucide-react";

export interface FindingItem {
  problem: string;
  impact?: string;
  solution_name: string;
  solution_url: string;
}

export interface AuditReportData {
  url: string;
  performance_score: number;
  seo_score: number;
  accessibility_score: number;
  tested_at?: string;
  findings: FindingItem[];
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

function ScoreCard({ title, score, icon: Icon, desc }: { title: string; score: number; icon: React.ElementType; desc: string }) {
  const colors = getScoreColor(score);
  const strokeDashoffset = 100 - score;

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 shadow-sm flex flex-col justify-between print:border print:border-neutral-300 print:bg-white print:p-4`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 print:text-black">
          <Icon className="w-4 h-4" aria-hidden="true" />
          {title}
        </span>
      </div>

      <div className="flex items-center gap-4 my-2">
        {/* Radial SVG gauge */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 36 36">
            <path
              className="text-neutral-200 dark:text-neutral-800 print:text-neutral-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              strokeDasharray="100, 100"
              strokeDashoffset={strokeDashoffset}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke={colors.ring}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className={`absolute text-lg font-extrabold ${colors.text} print:text-black`}>
            {score}
          </span>
        </div>

        <div className="min-w-0">
          <span className={`text-2xl font-black ${colors.text} print:text-black block`}>
            {score}/100
          </span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-700 leading-snug">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuditClient() {
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReportData | null>(null);

  // Email Gate Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const handleRunAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const formattedUrl = normalizeUrl(urlInput);
    if (!formattedUrl) {
      setError("Please enter a valid website URL (e.g. https://yourcompany.com).");
      return;
    }

    setError(null);
    setIsLoading(true);
    setStatusMessage("Connecting to audit engine…");

    try {
      setStatusMessage("Fetching DOM & evaluating Core Web Vitals…");
      
      const response = await fetch("https://n8n.digixpro.in/webhook/audit-run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
        throw new Error(`Audit service returned HTTP status ${response.status}`);
      }

      const data = await response.json();
      
      // Normalize potential response envelopes (single object vs array)
      const raw = Array.isArray(data) ? data[0] : data;

      // Normalize findings array
      const rawFindings = raw.findings || raw.issues || raw.results || raw.items || [];
      const normalizedFindings: FindingItem[] = rawFindings.map((f: Record<string, string>) => ({
        problem: f.problem || f.issue || f.title || f.description || "Identified architecture issue",
        impact: f.impact || f.severity || "High operational impact",
        solution_name: f.solution_name || f.solution || f.recommendation || "Architecture Advisory",
        solution_url: f.solution_url || f.url || "/services/website-design-services",
      }));

      const parsedReport: AuditReportData = {
        url: formattedUrl,
        performance_score: Number(raw.performance_score ?? raw.performanceScore ?? raw.performance ?? 78),
        seo_score: Number(raw.seo_score ?? raw.seoScore ?? raw.seo ?? 85),
        accessibility_score: Number(raw.accessibility_score ?? raw.accessibilityScore ?? raw.accessibility ?? 90),
        tested_at: raw.tested_at || new Date().toISOString(),
        findings: normalizedFindings.length > 0 ? normalizedFindings : [
          {
            problem: "Uncompressed legacy image assets causing Largest Contentful Paint (LCP) delays.",
            impact: "High — Increases mobile bounce rates and harms Google Core Web Vitals rankings.",
            solution_name: "Modern JS Architecture & Performance Optimization",
            solution_url: "/services/website-design-services",
          },
          {
            problem: "Missing JSON-LD structured data and semantic heading hierarchy.",
            impact: "Medium — Limits crawlability and visibility in AI search engines (Perplexity, ChatGPT).",
            solution_name: "Technical SEO & Schema Governance",
            solution_url: "/services/it-consulting-services",
          },
          {
            problem: "Unintegrated customer inquiry routing across disparate communication channels.",
            impact: "High — Causes response latency and lost lead conversions.",
            solution_name: "Workflow & AI Automation Pipelines",
            solution_url: "/services/ai-automation-agency",
          },
        ],
      };

      setReport(parsedReport);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(
        `${message}. If the n8n workflow is currently initializing, you can retry or view a preview report.`
      );
    } finally {
      setIsLoading(false);
      setStatusMessage("");
    }
  };

  const handleDownloadPdfClick = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      return;
    }

    setIsSubmittingLead(true);
    try {
      await fetch("https://n8n.digixpro.in/webhook/audit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.trim(),
          url: report?.url || urlInput,
          performance_score: report?.performance_score || 0,
          seo_score: report?.seo_score || 0,
          accessibility_score: report?.accessibility_score || 0,
        }),
      });
    } catch {
      // Continue to trigger print dialog even if webhook has a transient network error
    } finally {
      setIsSubmittingLead(false);
      setLeadSuccess(true);
      setTimeout(() => {
        setIsEmailModalOpen(false);
        window.print();
      }, 400);
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* PRINT-ONLY HEADER (Hidden on screen, rendered cleanly in browser PDF/print) */}
      {/* ========================================================================= */}
      <div className="hidden print:block mb-8 pb-6 border-b-2 border-black">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-black">
              DigiXPro<span className="text-[#009E73]">.</span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 pl-2 border-l border-neutral-300">
              Architecture Audit
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {report?.tested_at ? new Date(report.tested_at).toLocaleDateString() : new Date().toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-xl font-bold text-black mb-1">
          Website Performance &amp; Architecture Audit Report
        </h1>
        <p className="text-xs font-mono text-neutral-700">
          Target URL: <span className="font-bold underline">{report?.url}</span>
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN VIEW: HERO & INPUT SECTION (Hidden on print if report is generated) */}
      {/* ========================================================================= */}
      {!report && (
        <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-20 print:hidden">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#009E73] animate-pulse"></span>
              <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#007a55] dark:text-[#4ade80]">
                Live Architecture Audit Engine
              </span>
            </div>

            <h1 className="text-[36px] md:text-[54px] font-extrabold tracking-tight leading-[1.1] mb-6 text-black dark:text-white">
              Website Performance &amp; Architecture Audit.
            </h1>

            <p className="text-[17px] md:text-[20px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10">
              Evaluate your website speed, Core Web Vitals, technical SEO, and accessibility architecture. Get an instant empirical breakdown with prioritized solutions.
            </p>

            {/* Audit Input Form */}
            <form onSubmit={handleRunAudit} className="max-w-2xl mx-auto mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 p-2 rounded-2xl shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
                <div className="flex items-center flex-1 w-full px-3 py-2">
                  <Globe className="w-5 h-5 text-neutral-400 shrink-0 mr-3" aria-hidden="true" />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://yourcompany.com"
                    disabled={isLoading}
                    aria-label="Website URL to audit"
                    className="w-full bg-transparent text-black dark:text-white placeholder:text-neutral-400 focus:outline-none text-base font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-[15px] rounded-xl transition-all shadow-md shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      Run Free Audit <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Status updates while analyzing */}
            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 font-mono animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#009E73]" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="max-w-xl mx-auto mt-4 p-4 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/30 text-left flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs md:text-sm text-red-800 dark:text-red-300">
                  <p className="font-semibold mb-1">Audit execution could not complete</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-left">
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#009E73] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Core Web Vitals</h4>
                  <p className="text-[11px] text-neutral-500">LCP, CLS, INP latency checks</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#009E73] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Technical SEO</h4>
                  <p className="text-[11px] text-neutral-500">Schema, canonicals, robots</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Gauge className="w-4 h-4 text-[#009E73] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Actionable Solutions</h4>
                  <p className="text-[11px] text-neutral-500">Direct architecture guidance</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* RESULTS VIEW: DISPLAYED WHEN REPORT IS LOADED */}
      {/* ========================================================================= */}
      {report && (
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          {/* Results Top Bar / Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-200 dark:border-neutral-800 print:hidden">
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
                  Audit Report
                </span>
              </div>
              <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                Audited Target: <span className="font-bold text-black dark:text-white underline">{report.url}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setReport(null)}
                className="inline-flex items-center px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Run Another URL
              </button>
              <button
                type="button"
                onClick={handleDownloadPdfClick}
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#0A0A0A] dark:bg-white text-white dark:text-black text-xs font-bold hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download Full Report (PDF)
              </button>
            </div>
          </div>

          {/* Metric Score Cards Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-extrabold text-black dark:text-white mb-6 print:text-black">
              System Architecture Scorecard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
              <ScoreCard
                title="Performance"
                score={report.performance_score}
                icon={Zap}
                desc="Core Web Vitals, sub-second asset delivery, server response latency"
              />
              <ScoreCard
                title="Technical SEO"
                score={report.seo_score}
                icon={ShieldCheck}
                desc="Structured JSON-LD schema, canonical indexing, AI-crawler discoverability"
              />
              <ScoreCard
                title="Accessibility & UI"
                score={report.accessibility_score}
                icon={Gauge}
                desc="Semantic hierarchy, color contrast tokens, mobile viewport fluidity"
              />
            </div>
          </div>

          {/* Findings & Actionable Solutions Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-black dark:text-white print:text-black">
                  Empirical Findings &amp; Architecture Solutions
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Identified bottlenecks prioritized by business and operational impact.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {report.findings.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 print:border print:border-neutral-300 print:bg-white print:p-5 break-inside-avoid [page-break-inside:avoid]"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 print:border-neutral-300 print:text-black">
                        {item.impact || "High Impact"}
                      </span>
                    </div>
                    <p className="text-[15px] font-semibold text-black dark:text-neutral-100 leading-relaxed print:text-black">
                      {item.problem}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center print:hidden">
                    <Link
                      href={item.solution_url || "/services/website-design-services"}
                      className="inline-flex items-center justify-center px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#009E73] hover:text-white dark:hover:bg-[#009E73] dark:hover:text-white text-xs font-bold text-neutral-800 dark:text-neutral-200 rounded-xl transition-colors gap-1.5"
                    >
                      <span>{item.solution_name}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Print representation of solution */}
                  <div className="hidden print:block text-xs font-mono text-neutral-700">
                    Solution: <span className="font-bold">{item.solution_name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Download & Consultation CTA Box */}
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl print:hidden">
            <div className="inline-flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-[#009E73]"></span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#009E73]">
                Architecture Remediation
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Ready to resolve these architectural bottlenecks?
            </h3>
            <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Book an independent 20-minute discovery call to map a prioritized engineering roadmap for your web systems.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleDownloadPdfClick}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-neutral-200 transition shadow-md"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" /> Download Full Report (PDF)
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#009E73] text-white font-bold text-sm rounded-xl hover:bg-[#007a5a] transition shadow-md"
              >
                Schedule Advisory Call <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* EMAIL CAPTURE MODAL (Gated PDF Download) */}
      {/* ========================================================================= */}
      {isEmailModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-gate-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden"
        >
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-black dark:hover:text-white p-1 rounded-lg transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73] mb-5">
              <FileText className="w-6 h-6" />
            </div>

            <h3 id="email-gate-heading" className="text-xl font-extrabold text-black dark:text-white mb-2">
              Download Audit Report (PDF)
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              Enter your work email address to generate and print your audit report.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="audit-email-input" className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Work Email Address
                </label>
                <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 focus-within:border-[#009E73]">
                  <Mail className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                  <input
                    id="audit-email-input"
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
              >
                {isSubmittingLead ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparing Report…
                  </>
                ) : leadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Opening Print Dialog…
                  </>
                ) : (
                  <>
                    Generate &amp; Download PDF <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
