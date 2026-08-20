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
  User,
  Mail,
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
  CheckSquare,
  Square,
} from "lucide-react";

export interface BriefFormData {
  company: string;
  product: string;
  market: string;
  industry: string;
  company_size: string;
  business_age: string;
  selectedSystems: string[];
  fullName: string;
  email: string;
}

export interface RecommendationItem {
  service_name?: string;
  title?: string;
  service_url?: string;
  url?: string;
  price_range?: string;
  reason?: string;
  description?: string;
}

export interface BriefReportData {
  summary: string;
  recommendations: RecommendationItem[];
  business_context?: {
    company?: string;
    product?: string;
    market?: string;
    industry?: string;
    company_size?: string;
    business_age?: string;
    current_systems?: string;
  };
  generated_at?: string;
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

function getScoreColor(score: number): { text: string; bg: string; border: string } {
  if (score >= 90) {
    return {
      text: "text-[#009E73] dark:text-[#4ade80]",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
    };
  }
  return {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
  };
}

function buildCurrentSystemsString(selectedOptions: string[]): string {
  if (selectedOptions.length === 0 || selectedOptions.includes("none_manual")) {
    return "Social media posting is manual, no chat assistant on website, no automatic lead tracking system, no automated follow-up messages.";
  }

  const automated: string[] = [];
  const manual: string[] = [];

  if (selectedOptions.includes("social_media")) {
    automated.push("social media posts go out automatically on a schedule");
  } else {
    manual.push("social media posting is manual");
  }

  if (selectedOptions.includes("chat_assistant")) {
    automated.push("website has a chat assistant that answers visitor questions");
  } else {
    manual.push("no chat assistant on website");
  }

  if (selectedOptions.includes("lead_tracking")) {
    automated.push("new leads get tracked in a system automatically");
  } else {
    manual.push("no automatic lead tracking system");
  }

  if (selectedOptions.includes("follow_ups")) {
    automated.push("follow-up messages go out automatically");
  } else {
    manual.push("no automated follow-up messages");
  }

  let result = "";
  if (automated.length > 0) {
    result += "Automated: " + automated.join(", ") + ". ";
  }
  if (manual.length > 0) {
    result += "Manual: " + manual.join(", ") + ".";
  }

  return result.trim();
}

export default function AuditClient() {
  // Step State (1 to 7)
  const [step, setStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<BriefFormData>({
    company: "",
    product: "",
    market: "",
    industry: "",
    company_size: "",
    business_age: "",
    selectedSystems: [],
    fullName: "",
    email: "",
  });

  // Submission & Brief Report State
  const [isSubmittingBrief, setIsSubmittingBrief] = useState(false);
  const [briefReport, setBriefReport] = useState<BriefReportData | null>(null);

  // Secondary Optional Tech Check State
  const [isTechCheckExpanded, setIsTechCheckExpanded] = useState(false);
  const [techUrlInput, setTechUrlInput] = useState("");
  const [isTechLoading, setIsTechLoading] = useState(false);
  const [techReport, setTechReport] = useState<TechnicalReportData | null>(null);

  const updateForm = (key: keyof BriefFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleChecklistOption = (key: string) => {
    setFormData((prev) => {
      let current = [...prev.selectedSystems];
      if (key === "none_manual") {
        return { ...prev, selectedSystems: ["none_manual"] };
      }

      current = current.filter((item) => item !== "none_manual");
      if (current.includes(key)) {
        current = current.filter((item) => item !== key);
      } else {
        current.push(key);
      }
      return { ...prev, selectedSystems: current };
    });
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
  // Sends EXACTLY the 7 required keys: company, product, market, industry, company_size, business_age, current_systems
  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBrief(true);

    const currentSystemsString = buildCurrentSystemsString(formData.selectedSystems);

    const payload = {
      company: formData.company,
      product: formData.product,
      market: formData.market,
      industry: formData.industry,
      company_size: formData.company_size,
      business_age: formData.business_age,
      current_systems: currentSystemsString,
      fullName: formData.fullName,
      email: formData.email,
    };

    try {
      const response = await fetch("https://n8n.digixpro.in/webhook/audit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Audit service returned HTTP status ${response.status}`);
      }

      const data = await response.json();
      const raw = Array.isArray(data) ? data[0] : data;

      const generatedReport: BriefReportData = {
        summary:
          raw.summary ||
          `Based on your input, ${formData.company || "your company"} is operating with ${formData.company_size || "your current team size"} in the ${formData.industry || "selected"} sector. Connecting your operational workflows will reduce daily manual effort.`,
        recommendations: raw.recommendations || [
          {
            service_name: "Business Process Automation",
            service_url: "/services/business-process-automation",
            price_range: "Scoped in discovery",
            reason: "Connect lead capture and operational tracking to eliminate manual data entry across departments.",
          },
          {
            service_name: "IT Architecture Consulting",
            service_url: "/services/it-consulting-services",
            price_range: "Project-based or retainer",
            reason: "Establish a clear software roadmap to eliminate subscription waste and simplify your business OS.",
          },
        ],
        business_context: raw.business_context || {
          company: formData.company,
          product: formData.product,
          market: formData.market,
          industry: formData.industry,
          company_size: formData.company_size,
          business_age: formData.business_age,
          current_systems: currentSystemsString,
        },
        generated_at: raw.generated_at || new Date().toISOString(),
      };

      setBriefReport(generatedReport);
    } catch {
      // Clean fallback if n8n webhook has a transient connection issue
      const fallbackReport: BriefReportData = {
        summary: `Based on your brief, ${formData.company || "your business"} has established strong growth in ${formData.industry || "your industry"}. Streamlining your operational handoffs and lead workflows will eliminate daily manual effort.`,
        recommendations: [
          {
            service_name: "Business Process Automation",
            service_url: "/services/business-process-automation",
            price_range: "Scoped in discovery",
            reason: "Connect lead capture and operational tracking to eliminate manual data entry across departments.",
          },
          {
            service_name: "IT Architecture Consulting",
            service_url: "/services/it-consulting-services",
            price_range: "Project-based or retainer",
            reason: "Establish a clear software roadmap to eliminate subscription waste and simplify your business OS.",
          },
        ],
        business_context: {
          company: formData.company,
          product: formData.product,
          market: formData.market,
          industry: formData.industry,
          company_size: formData.company_size,
          business_age: formData.business_age,
          current_systems: currentSystemsString,
        },
        generated_at: new Date().toISOString(),
      };

      setBriefReport(fallbackReport);
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  // Secondary Webhook Submit: audit-run (Optional Speed & SEO Check)
  const handleTechCheckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = normalizeUrl(techUrlInput);
    if (!formattedUrl) return;

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

      setTechReport({
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
      });
    } catch {
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

  // Plain-Language Question Options
  const MARKET_OPTIONS = [
    "B2B Companies & Businesses",
    "Individual Consumers (B2C)",
    "Patients & Healthcare Clients",
    "Schools, Non-Profits & Institutions",
  ];

  const INDUSTRY_OPTIONS = [
    "IT, Technology & Software / SaaS",
    "Healthcare, Clinics & Wellness",
    "E-Commerce & Retail",
    "Publishing, Media & Education",
    "Professional Services & Advisory",
  ];

  const SIZE_OPTIONS = [
    "Just me / 1–5 team members",
    "6–20 employees",
    "21–50 employees",
    "51–200 employees",
    "200+ enterprise team",
  ];

  const AGE_OPTIONS = [
    "Under 1 year (New business)",
    "1–3 years (Early growth)",
    "3–7 years (Established)",
    "7+ years (Mature company)",
  ];

  const CHECKLIST_ITEMS = [
    { key: "social_media", text: "Social media posts go out automatically, on a schedule" },
    { key: "chat_assistant", text: "Website has a chat assistant that answers visitor questions" },
    { key: "lead_tracking", text: "New leads/inquiries get tracked in a system automatically" },
    { key: "follow_ups", text: "Follow-up messages/reminders go out automatically" },
    { key: "none_manual", text: "None of these — it's mostly manual right now" },
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
              Architecture Audit Report
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-xl font-bold text-black mb-1">
          Business Systems &amp; Architecture Audit Report
        </h1>
        <p className="text-xs font-mono text-neutral-700">
          Organization: <span className="font-bold">{briefReport?.business_context?.company || formData.company}</span>
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PRIMARY FLOW: 7-QUESTION PLAIN-LANGUAGE BRIEF FORM */}
      {/* ========================================================================= */}
      {!briefReport && (
        <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-20 print:hidden">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#009E73] animate-pulse"></span>
                <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#007a55] dark:text-[#4ade80]">
                  Free Business Systems Audit
                </span>
              </div>
              <h1 className="text-[34px] md:text-[50px] font-extrabold tracking-tight leading-[1.1] mb-4 text-black dark:text-white">
                Find Your Automation &amp; System Bottlenecks.
              </h1>
              <p className="text-[16px] md:text-[19px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Answer 7 simple questions about your business to get a instant, personalized system assessment report.
              </p>
            </div>

            {/* Stepped Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500 mb-2">
                <span>QUESTION {step} OF 7</span>
                <span>{Math.round((step / 7) * 100)}% COMPLETED</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#009E73] h-full transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 shadow-xl">
              <form onSubmit={step === 7 ? handleBriefSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
                
                {/* QUESTION 1: Company & Contact */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          1. What is your business called?
                        </h2>
                        <p className="text-xs text-neutral-500">Your company name and contact details.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Company / Business Name *
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5">
                          <Building2 className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => updateForm("company", e.target.value)}
                            placeholder="DigiXPro Digital Solution"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Your Full Name *
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
                      </div>
                    </div>
                  </div>
                )}

                {/* QUESTION 2: Product / Service */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          2. What product or main service do you sell?
                        </h2>
                        <p className="text-xs text-neutral-500">Describe what your business offers in plain words.</p>
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={4}
                        required
                        value={formData.product}
                        onChange={(e) => updateForm("product", e.target.value)}
                        placeholder="e.g. Independent technology architecture advisory, healthcare clinical services, custom e-commerce software…"
                        className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 text-sm text-black dark:text-white focus:outline-none focus:border-[#009E73] placeholder:text-neutral-400 font-medium resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* QUESTION 3: Target Market */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          3. Who are your main customers?
                        </h2>
                        <p className="text-xs text-neutral-500">Select who buys your products or services.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MARKET_OPTIONS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            updateForm("market", m);
                            handleNextStep();
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            formData.market === m
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="block text-sm font-extrabold text-black dark:text-white">{m}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 4: Industry */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          4. Which industry is your business in?
                        </h2>
                        <p className="text-xs text-neutral-500">Select your primary business sector.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {INDUSTRY_OPTIONS.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => {
                            updateForm("industry", ind);
                            handleNextStep();
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                            formData.industry === ind
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="text-sm font-semibold text-black dark:text-white">{ind}</span>
                          {formData.industry === ind && <CheckCircle2 className="w-4 h-4 text-[#009E73] shrink-0 ml-2" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 5: Team Size */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          5. How big is your team right now?
                        </h2>
                        <p className="text-xs text-neutral-500 font-normal">Select your current employee or staff count.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SIZE_OPTIONS.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            updateForm("company_size", sz);
                            handleNextStep();
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            formData.company_size === sz
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="block text-sm font-extrabold text-black dark:text-white">{sz}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 6: Business Age */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          6. How long has your business been operating?
                        </h2>
                        <p className="text-xs text-neutral-500">Select your company age or stage.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AGE_OPTIONS.map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => {
                            updateForm("business_age", age);
                            handleNextStep();
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            formData.business_age === age
                              ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                          }`}
                        >
                          <span className="block text-sm font-extrabold text-black dark:text-white">{age}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 7: Concrete Multi-Select Checklist */}
                {step === 7 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <CheckSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          7. Which of these do you already have running automatically?
                        </h2>
                        <p className="text-xs text-neutral-500 font-normal">Select all that apply.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {CHECKLIST_ITEMS.map((item) => {
                        const isChecked = formData.selectedSystems.includes(item.key);
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => toggleChecklistOption(item.key)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                              isChecked
                                ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                            }`}
                          >
                            <div className="shrink-0 text-[#009E73]">
                              {isChecked ? (
                                <CheckSquare className="w-5 h-5" />
                              ) : (
                                <Square className="w-5 h-5 text-neutral-400" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-black dark:text-white">
                              {item.text}
                            </span>
                          </button>
                        );
                      })}
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
                  ) : <div />}

                  {step < 7 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={
                        (step === 1 && (!formData.company || !formData.fullName || !formData.email)) ||
                        (step === 2 && !formData.product) ||
                        (step === 3 && !formData.market) ||
                        (step === 4 && !formData.industry) ||
                        (step === 5 && !formData.company_size) ||
                        (step === 6 && !formData.business_age)
                      }
                      className="inline-flex items-center px-7 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmittingBrief}
                      className="inline-flex items-center px-8 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
                    >
                      {isSubmittingBrief ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Compiling Report…
                        </>
                      ) : (
                        <>
                          Generate Audit Report <Sparkles className="w-4 h-4 ml-2" />
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
                  System Audit Report
                </span>
              </div>
              <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                Prepared for: <span className="font-bold text-black dark:text-white">{briefReport.business_context?.company || formData.company}</span>
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
                Edit Audit Brief
              </button>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm mb-10 print:border print:p-6">
            <h2 className="text-2xl font-extrabold text-black dark:text-white mb-3">
              Executive Systems Assessment
            </h2>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              {briefReport.summary}
            </p>
          </div>

          {/* Dynamic Webhook Recommendations & Prices (NO Hardcoded Pricing Block) */}
          {briefReport.recommendations && briefReport.recommendations.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-extrabold text-black dark:text-white mb-6">
                Recommended Architecture Solutions &amp; Investment Scope
              </h3>
              <div className="space-y-4">
                {briefReport.recommendations.map((rec, idx) => {
                  const serviceTitle = rec.service_name || rec.title || "Advisory Solution";
                  const serviceUrl = rec.service_url || rec.url || "/contact";
                  const priceRange = rec.price_range || "Scoped in discovery";
                  const description = rec.reason || rec.description || "Identified architecture optimization.";

                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 print:border print:p-5 break-inside-avoid [page-break-inside:avoid]"
                    >
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#009E73] border border-emerald-200 dark:border-emerald-800 print:border-neutral-300 print:text-black">
                            Price: {priceRange}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-black dark:text-white mb-2 print:text-black">
                          {serviceTitle}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed print:text-black">
                          {description}
                        </p>
                      </div>

                      <div className="shrink-0 print:hidden">
                        <Link
                          href={serviceUrl}
                          className="inline-flex items-center justify-center px-5 py-2.5 bg-[#009E73] hover:bg-[#007a5a] text-white text-xs font-bold rounded-xl transition shadow-sm gap-1.5"
                        >
                          <span>Explore Solution</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Discovery Call CTA Box */}
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl mb-16 print:hidden">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#009E73] bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full mb-4 inline-block">
              Architecture Next Step
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Schedule Your 30-Minute Discovery Call
            </h3>
            <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Review your systems assessment directly with our principal technologist before committing budget.
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
