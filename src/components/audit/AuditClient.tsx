"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
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
  Sparkles,
  Printer,
  Calendar,
  CheckSquare,
  Square,
  Info,
  HelpCircle,
  PackageCheck,
  Award,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export interface BriefFormData {
  name: string;
  email: string;
  company: string;
  product: string;
  market: string;
  industry: string;
  company_size: string;
  business_age: string;
  hasWebsite: "yes" | "no" | "";
  websiteUrl: string;
  selectedSystems: string[];
  selectedServices: string[];
}

export interface ThreeTiers {
  premium: string;
  digixpro: string;
  bootstrap: string;
}

export interface RecommendationItem {
  automation_name: string;
  what_it_does: string;
  why_it_fits: string;
  three_tiers: ThreeTiers;
  recommended_tier: "premium" | "digixpro" | "bootstrap" | string;
  explain_recommendation: string;
  digixpro_service_name: string;
  digixpro_service_url: string;
  digixpro_price_range: string;
}

export interface BriefReportData {
  summary: string;
  trust_note: string;
  estimate_disclaimer_long?: string;
  estimate_disclaimer_short?: string;
  bundle_estimate: string;
  recommendations: RecommendationItem[];
  closing_message: string;
  business_context?: {
    name?: string;
    email?: string;
    company?: string;
    product?: string;
    market?: string;
    industry?: string;
    company_size?: string;
    business_age?: string;
    current_systems?: string;
    interested_services?: string;
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

function buildCurrentSystemsString(selectedOptions: string[], hasWebsite: "yes" | "no" | ""): string {
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
    result += "Manual: " + manual.join(", ") + ". ";
  }

  // Direct Website Status Signal for Gemini Recommendation Engine
  if (hasWebsite === "no") {
    result += "Website: No professional website.";
  } else if (hasWebsite === "yes") {
    result += "Website: Has a professional website.";
  }

  return result.trim();
}

function buildInterestedServicesString(selectedOptions: string[]): string {
  if (selectedOptions.length === 0 || selectedOptions.includes("not_sure")) {
    return "Not sure yet — open to suggestions";
  }

  const servicesMap: Record<string, string> = {
    website: "Website design or redesign",
    branding: "Branding / visual identity",
    consulting: "IT or AI consulting",
    automation: "Business automation (workflows, chatbots, lead systems)",
    seo: "SEO / organic growth",
  };

  const selectedLabels = selectedOptions
    .map((key) => servicesMap[key])
    .filter(Boolean);

  if (selectedLabels.length === 0) {
    return "Not sure yet — open to suggestions";
  }

  return selectedLabels.join(", ");
}

export default function AuditClient() {
  // Step State (1 to 10)
  const [step, setStep] = useState<number>(1);

  // Form State (10 flat keys + Website URL & Status)
  const [formData, setFormData] = useState<BriefFormData>({
    name: "",
    email: "",
    company: "",
    product: "",
    market: "",
    industry: "",
    company_size: "",
    business_age: "",
    hasWebsite: "",
    websiteUrl: "",
    selectedSystems: [],
    selectedServices: [],
  });

  // Submission, Brief Report, Rate Limit & Generation Failure State
  const [isSubmittingBrief, setIsSubmittingBrief] = useState(false);
  const [briefReport, setBriefReport] = useState<BriefReportData | null>(null);
  const [rateLimitedNotice, setRateLimitedNotice] = useState<string | null>(null);
  const [generationFailedNotice, setGenerationFailedNotice] = useState<string | null>(null);

  // On-Demand Technical Check State
  const [techUrlInput, setTechUrlInput] = useState("");
  const [isTechLoading, setIsTechLoading] = useState(false);
  const [techReport, setTechReport] = useState<TechnicalReportData | null>(null);
  const [techErrorNotice, setTechErrorNotice] = useState<string | null>(null);

  const updateForm = (key: keyof BriefFormData, value: string | string[]) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "websiteUrl" && typeof value === "string") {
        setTechUrlInput(value);
      }
      return next;
    });
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

  const toggleServiceOption = (key: string) => {
    setFormData((prev) => {
      let current = [...prev.selectedServices];
      if (key === "not_sure") {
        return { ...prev, selectedServices: ["not_sure"] };
      }

      current = current.filter((item) => item !== "not_sure");
      if (current.includes(key)) {
        current = current.filter((item) => item !== key);
      } else {
        current.push(key);
      }
      return { ...prev, selectedServices: current };
    });
  };

  const handleNextStep = () => {
    if (step < 10) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // STEP 1: Single reliable submission to audit-brief
  const handleBriefSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmittingBrief(true);
    setRateLimitedNotice(null);
    setGenerationFailedNotice(null);

    const currentSystemsString = buildCurrentSystemsString(formData.selectedSystems, formData.hasWebsite);
    const interestedServicesString = buildInterestedServicesString(formData.selectedServices);

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      product: formData.product,
      market: formData.market,
      industry: formData.industry,
      company_size: formData.company_size,
      business_age: formData.business_age,
      current_systems: currentSystemsString,
      interested_services: interestedServicesString,
    };

    // Pre-fill techUrlInput if website URL was provided in Q8
    if (formData.hasWebsite === "yes" && formData.websiteUrl) {
      setTechUrlInput(normalizeUrl(formData.websiteUrl));
    }

    try {
      const response = await fetch("https://n8n.digixpro.in/webhook/audit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Audit service returned HTTP status ${response.status}`);
      }

      let rawBrief: Record<string, any> = {};
      const text = await response.text();
      if (text && text.trim()) {
        try {
          const data = JSON.parse(text);
          rawBrief = Array.isArray(data) ? data[0] : data;
        } catch {
          rawBrief = {};
        }
      }

      if (rawBrief.rate_limited === true || rawBrief.rate_limited === "true") {
        setRateLimitedNotice(
          rawBrief.message ||
            "You have recently generated an audit report. Please review your existing report or schedule a direct discovery call below."
        );
        return;
      }

      if (rawBrief.generation_failed === true || rawBrief.generation_failed === "true") {
        setGenerationFailedNotice(
          rawBrief.message || "Something went wrong generating your report - please try again in a moment."
        );
        return;
      }

      if (!rawBrief.summary && (!rawBrief.recommendations || rawBrief.recommendations.length === 0)) {
        setGenerationFailedNotice(
          "Something went wrong generating your report - please try again in a moment."
        );
        return;
      }

      const generatedReport: BriefReportData = {
        summary: rawBrief.summary || "",
        trust_note: rawBrief.trust_note || "",
        estimate_disclaimer_long: rawBrief.estimate_disclaimer_long || "",
        estimate_disclaimer_short: rawBrief.estimate_disclaimer_short || "",
        bundle_estimate: rawBrief.bundle_estimate || "",
        recommendations: (rawBrief.recommendations || []).map((rec: any) => ({
          automation_name: rec.automation_name || "",
          what_it_does: rec.what_it_does || "",
          why_it_fits: rec.why_it_fits || "",
          three_tiers: {
            premium: rec.three_tiers?.premium || "",
            digixpro: rec.three_tiers?.digixpro || rec.digixpro_price_range || "",
            bootstrap: rec.three_tiers?.bootstrap || "",
          },
          recommended_tier: rec.recommended_tier || "digixpro",
          explain_recommendation: rec.explain_recommendation || "",
          digixpro_service_name: rec.digixpro_service_name || "Custom Architecture & Automation",
          digixpro_service_url: rec.digixpro_service_url || "/services/ai-automation-agency",
          digixpro_price_range: rec.digixpro_price_range || "",
        })),
        closing_message: rawBrief.closing_message || "",
        business_context: rawBrief.business_context || {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          product: formData.product,
          market: formData.market,
          industry: formData.industry,
          company_size: formData.company_size,
          business_age: formData.business_age,
          current_systems: currentSystemsString,
          interested_services: interestedServicesString,
        },
        generated_at: rawBrief.generated_at || new Date().toISOString(),
      };

      setBriefReport(generatedReport);
    } catch {
      setGenerationFailedNotice(
        "Something went wrong generating your report - please try again in a moment."
      );
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  // STEP 3: Separate On-Demand Technical Health Webhook Submit
  const handleTechCheckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = normalizeUrl(techUrlInput || formData.websiteUrl);
    if (!formattedUrl) return;

    setIsTechLoading(true);
    setTechErrorNotice(null);

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
        performance_score: Number(raw.performance_score ?? raw.performanceScore ?? 0),
        seo_score: Number(raw.seo_score ?? raw.seoScore ?? 0),
        accessibility_score: Number(raw.accessibility_score ?? raw.accessibilityScore ?? 0),
        findings: normalizedFindings,
      });
    } catch {
      setTechErrorNotice("Technical check could not be completed for this URL right now. Please verify the URL and try again.");
    } finally {
      setIsTechLoading(false);
    }
  };

  // Options
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

  const SERVICE_CHECKLIST_ITEMS = [
    { key: "website", text: "Website design or redesign" },
    { key: "branding", text: "Branding / visual identity" },
    { key: "consulting", text: "IT or AI consulting" },
    { key: "automation", text: "Business automation (workflows, chatbots, lead systems)" },
    { key: "seo", text: "SEO / organic growth" },
    { key: "not_sure", text: "Not sure yet — open to suggestions" },
  ];

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* COMPACT PRINT HEADER (Lean 1-2 Page Format) */}
      {/* ========================================================================= */}
      <div className="hidden print:block mb-6 pb-4 border-b border-black">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-black">
              DigiXPro<span className="text-[#009E73]">.</span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 pl-2 border-l border-neutral-300">
              Systems Audit Report
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono" suppressHydrationWarning>
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs font-mono text-neutral-700">
          Organization: <span className="font-bold text-black">{briefReport?.business_context?.company || formData.company}</span>
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PRIMARY FLOW: 9-QUESTION BRIEF FORM + REPORT DELIVERY DETAILS (STEP 10) */}
      {/* ========================================================================= */}
      {!briefReport && !rateLimitedNotice && !generationFailedNotice && (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-2 md:pt-4 pb-12 print:hidden">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-3 md:mb-4">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-0.5 rounded-full mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009E73] animate-pulse"></span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#007a55] dark:text-[#4ade80]">
                  Free Business Audit + Price Quote
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-1 text-black dark:text-white whitespace-nowrap">
                Free Audit &amp; Price Quote
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-tight mb-2 whitespace-nowrap">
                7 questions. Real audit. Real pricing. No guesswork.
              </p>

              {/* 24-Hour Notice Line */}
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 max-w-full">
                <Info className="w-3 h-3 text-[#009E73] shrink-0" />
                <span className="truncate">One report per 24h per email — answer thoughtfully.</span>
              </div>
            </div>

            {/* Stepped Progress Bar */}
            <div className="mb-3 md:mb-4">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-neutral-500 mb-1">
                <span>{step <= 9 ? `QUESTION ${step} OF 9` : "REPORT DELIVERY"}</span>
                <span>{Math.round((step / 10) * 100)}% COMPLETED</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#009E73] h-full transition-all duration-300"
                  style={{ width: `${(step / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">
              <form onSubmit={step === 10 ? handleBriefSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
                
                {/* QUESTION 1: Company Name */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-black dark:text-white">
                          1. What is your business called?
                        </h2>
                        <p className="text-[11px] text-neutral-500">Your company or organization name.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                        Company / Business Name *
                      </label>
                      <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5">
                        <Building2 className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => updateForm("company", e.target.value)}
                          placeholder="e.g. DigiXPro Digital Solution"
                          className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                        />
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

                {/* QUESTION 7: Current Systems Checklist */}
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

                {/* QUESTION 8: Website Status & URL */}
                {step === 8 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          8. Do you have an active website right now?
                        </h2>
                        <p className="text-xs text-neutral-500">Tell us if your business has an active website URL.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => updateForm("hasWebsite", "yes")}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          formData.hasWebsite === "yes"
                            ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                            : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                        }`}
                      >
                        <span className="block text-base font-extrabold text-black dark:text-white mb-1">Yes, we have a website</span>
                        <span className="block text-xs text-neutral-500 font-medium">You can run a separate PageSpeed &amp; technical health check on your report.</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          updateForm("hasWebsite", "no");
                          updateForm("websiteUrl", "");
                          setTechUrlInput("");
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          formData.hasWebsite === "no"
                            ? "border-[#009E73] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#009E73]"
                            : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
                        }`}
                      >
                        <span className="block text-base font-extrabold text-black dark:text-white mb-1">No, not yet</span>
                        <span className="block text-xs text-neutral-500 font-medium">We rely on social media or direct inquiries right now.</span>
                      </button>
                    </div>

                    {/* Revealed URL field when Yes */}
                    {formData.hasWebsite === "yes" && (
                      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 animate-in fade-in duration-200">
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          What is your website URL? *
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-3">
                          <Globe className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0" />
                          <input
                            type="text"
                            value={formData.websiteUrl}
                            onChange={(e) => updateForm("websiteUrl", e.target.value)}
                            placeholder="https://yourcompany.com"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* QUESTION 9: Interested Services Checklist */}
                {step === 9 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          9. Which of these are you specifically looking for help with?
                        </h2>
                        <p className="text-xs text-neutral-500 font-normal">Select all that apply, or skip if not sure yet.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {SERVICE_CHECKLIST_ITEMS.map((item) => {
                        const isChecked = formData.selectedServices.includes(item.key);
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => toggleServiceOption(item.key)}
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

                {/* STEP 10: Report Delivery Details (Name & Email) */}
                {step === 10 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-black dark:text-white">
                          Where should we send your report?
                        </h2>
                        <p className="text-xs text-neutral-500 font-normal">Enter your details to generate and access your tailored assessment.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Your name
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-3">
                          <User className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                            placeholder="e.g. Dr. Ajay Shukla"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Email address *
                        </label>
                        <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-3">
                          <Mail className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            placeholder="name@company.com"
                            className="w-full bg-transparent text-sm text-black dark:text-white focus:outline-none placeholder:text-neutral-400 font-medium"
                          />
                        </div>
                      </div>
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

                  {step < 10 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={
                        (step === 1 && !formData.company) ||
                        (step === 2 && !formData.product) ||
                        (step === 3 && !formData.market) ||
                        (step === 4 && !formData.industry) ||
                        (step === 5 && !formData.company_size) ||
                        (step === 6 && !formData.business_age) ||
                        (step === 8 && !formData.hasWebsite) ||
                        (step === 8 && formData.hasWebsite === "yes" && !formData.websiteUrl)
                      }
                      className="inline-flex items-center px-7 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmittingBrief || !formData.email}
                      className="inline-flex items-center px-8 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
                    >
                      {isSubmittingBrief ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Report…
                        </>
                      ) : (
                        <>
                          Get My Report <Sparkles className="w-4 h-4 ml-2" />
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
      {/* TASK 1: GENERATION FAILED HONEST ERROR NOTICE WITH RETRY BUTTON */}
      {/* ========================================================================= */}
      {generationFailedNotice && (
        <section className="max-w-[1200px] mx-auto px-6 py-16 print:hidden">
          <div className="max-w-2xl mx-auto bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-600 dark:text-amber-400 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
              Report Generation Interrupted
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-medium">
              {generationFailedNotice}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => handleBriefSubmit()}
                disabled={isSubmittingBrief}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-[#009E73] text-white text-xs font-bold hover:bg-[#007a5a] transition shadow-sm disabled:opacity-50"
              >
                {isSubmittingBrief ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Retrying…
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setGenerationFailedNotice(null); setStep(10); }}
                className="inline-flex items-center px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition"
              >
                Edit Form Details
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* RATE LIMITED FRIENDLY INFORMATIONAL NOTICE */}
      {/* ========================================================================= */}
      {rateLimitedNotice && (
        <section className="max-w-[1200px] mx-auto px-6 py-16 print:hidden">
          <div className="max-w-2xl mx-auto bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73] mx-auto mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
              Audit Report Limit Reached
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 font-medium">
              {rateLimitedNotice}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => { setRateLimitedNotice(null); setStep(1); }}
                className="inline-flex items-center px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition"
              >
                Back to Form
              </button>
              <a
                href="https://calendly.com/shukla-ajay05/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#009E73] text-white text-xs font-bold hover:bg-[#007a5a] transition"
              >
                Schedule Discovery Call <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* REPORT VIEW */}
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

          {/* 1. summary paragraph */}
          {briefReport.summary && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm mb-6 print:border print:p-6">
              <h2 className="text-2xl font-extrabold text-black dark:text-white mb-3 print:text-black">
                Executive Systems Assessment
              </h2>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium print:text-black">
                {briefReport.summary}
              </p>
            </div>
          )}

          {/* 2. trust_note - a distinct, calm callout box */}
          {briefReport.trust_note && (
            <div className="bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 mb-4 flex items-start gap-3.5 shadow-xs print:border-neutral-300 print:bg-neutral-50">
              <ShieldCheck className="w-5 h-5 text-[#009E73] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed print:text-black">
                {briefReport.trust_note}
              </p>
            </div>
          )}

          {/* Full estimate_disclaimer_long Callout (Right after trust_note) */}
          {briefReport.estimate_disclaimer_long && (
            <div className="bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 mb-8 flex items-start gap-3.5 shadow-xs print:border-neutral-300 print:bg-neutral-50">
              <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed print:text-neutral-700">
                {briefReport.estimate_disclaimer_long}
              </p>
            </div>
          )}

          {/* 4. For EACH item in recommendations (render ALL business recommendation cards) */}
          {briefReport.recommendations && briefReport.recommendations.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-extrabold text-black dark:text-white mb-6 print:text-black">
                Recommended Architecture Solutions &amp; Investment Scope
              </h3>
              <div className="space-y-8">
                {briefReport.recommendations.map((rec: RecommendationItem, idx: number) => {
                  const cardTitle = rec.automation_name || `Automated Solution #${idx + 1}`;
                  const recTierRaw = (rec.recommended_tier || "digixpro").toLowerCase();

                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 print:border print:border-neutral-300 print:bg-white print:p-5 break-inside-avoid [page-break-inside:avoid]"
                    >
                      {/* Card Title = automation_name */}
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#009E73] border border-emerald-200 dark:border-emerald-800 print:border-neutral-300 print:text-black mb-2 inline-block">
                          Recommended Automation #{idx + 1}
                        </span>
                        <h4 className="text-xl font-extrabold text-black dark:text-white print:text-black leading-snug">
                          {cardTitle}
                        </h4>
                      </div>

                      {/* what_it_does, then why_it_fits */}
                      <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed print:text-black font-normal">
                        {rec.what_it_does && (
                          <p>
                            <strong className="font-semibold text-black dark:text-white print:text-black">What it does: </strong>
                            {rec.what_it_does}
                          </p>
                        )}
                        {rec.why_it_fits && (
                          <p>
                            <strong className="font-semibold text-black dark:text-white print:text-black">Why it fits your business: </strong>
                            {rec.why_it_fits}
                          </p>
                        )}
                      </div>

                      {/* Three tier rows, clearly labeled */}
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3 print:text-neutral-700">
                          Investment &amp; Implementation Options:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* Premium Agency */}
                          <div className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            recTierRaw === "premium"
                              ? "border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-500 shadow-sm"
                              : "border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40"
                          }`}>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400">
                                  Premium Agency
                                </span>
                                {recTierRaw === "premium" && (
                                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white flex items-center gap-1">
                                    <Award className="w-3 h-3" /> Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-800 dark:text-neutral-200 font-semibold leading-snug">
                                {rec.three_tiers?.premium || "Scoped in discovery"}
                              </p>
                            </div>
                          </div>

                          {/* DigiXPro */}
                          <div className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            recTierRaw === "digixpro" || recTierRaw === "digix"
                              ? "border-[#009E73] bg-emerald-50/80 dark:bg-emerald-950/50 ring-2 ring-[#009E73] shadow-md"
                              : "border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40"
                          }`}>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono font-bold uppercase text-[#009E73] dark:text-[#4ade80] flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5" /> DigiXPro
                                </span>
                                {(recTierRaw === "digixpro" || recTierRaw === "digix") && (
                                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#009E73] text-white flex items-center gap-1">
                                    <Award className="w-3 h-3" /> Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-900 dark:text-neutral-100 font-extrabold leading-snug">
                                {rec.three_tiers?.digixpro || rec.digixpro_price_range || "Scoped in discovery"}
                              </p>
                            </div>
                          </div>

                          {/* Bootstrap (DIY) */}
                          <div className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            recTierRaw === "bootstrap" || recTierRaw === "diy"
                              ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500 shadow-sm"
                              : "border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40"
                          }`}>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400">
                                  Bootstrap (DIY)
                                </span>
                                {(recTierRaw === "bootstrap" || recTierRaw === "diy") && (
                                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-500 text-white flex items-center gap-1">
                                    <Award className="w-3 h-3" /> Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-800 dark:text-neutral-200 font-semibold leading-snug">
                                {rec.three_tiers?.bootstrap || "Self-managed workaround"}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Highlighted badge on whichever tier row matches recommended_tier with explain_recommendation */}
                      {rec.explain_recommendation && (
                        <div className="bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/80 rounded-2xl p-4 flex items-start gap-3 print:border-neutral-300 print:bg-emerald-50">
                          <CheckCircle2 className="w-5 h-5 text-[#009E73] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#007a55] dark:text-[#4ade80] mb-0.5">
                              Recommended tier for you: {rec.recommended_tier ? rec.recommended_tier.toUpperCase() : "DIGIXPRO"}
                            </p>
                            <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                              {rec.explain_recommendation}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Link using digixpro_service_url / digixpro_service_name labeled "Explore Service Blueprint" */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 print:border-neutral-200">
                        <span className="text-xs text-neutral-500 font-mono">
                          Service Track: {rec.digixpro_service_name}
                        </span>
                        <div className="print:hidden">
                          <Link
                            href={rec.digixpro_service_url || "/services/ai-automation-agency"}
                            className="inline-flex items-center text-xs font-bold text-[#009E73] hover:underline gap-1"
                          >
                            <span>Explore Service Blueprint</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: IF TECHNICAL CHECK HAS RUN, INSERT DIRECTLY INTO MAIN REPORT FLOW */}
          {techReport && (
            <div className="mb-12 break-inside-avoid [page-break-inside:avoid] animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-black dark:text-white print:text-black">
                    Your Website&apos;s Technical Health
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    URL Audited: {techReport.url}
                  </p>
                </div>
              </div>

              {/* Scores Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

              {/* Technical Findings Cards (Same visual style as business recommendations) */}
              {techReport.findings && techReport.findings.length > 0 && (
                <div className="space-y-6">
                  {techReport.findings.map((f, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4 print:border print:border-neutral-300 print:bg-white print:p-5"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 mb-2 inline-block">
                          Technical Finding #{i + 1} • {f.impact}
                        </span>
                        <h4 className="text-lg font-extrabold text-black dark:text-white print:text-black leading-snug">
                          {f.problem}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 print:border-neutral-200">
                        <span className="text-xs text-neutral-500 font-mono">
                          Recommended Solution: {f.solution_name}
                        </span>
                        <div className="print:hidden">
                          <Link
                            href={f.solution_url || "/services/website-design-services"}
                            className="inline-flex items-center text-xs font-bold text-[#009E73] hover:underline gap-1"
                          >
                            <span>Explore Blueprint</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SEPARATE CLEARLY-VISIBLE TECHNICAL CHECK OPTION CARD */}
          <div className="mb-12 print:hidden">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#009E73] shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-black dark:text-white">
                    Check your website&apos;s technical health
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {formData.hasWebsite === "yes" && formData.websiteUrl
                      ? "Run a PageSpeed & SEO health check for your website URL below."
                      : "Audit a specific website URL for Core Web Vitals, schema tags, and performance metrics."}
                  </p>
                </div>
              </div>

              <form onSubmit={handleTechCheckSubmit} className="max-w-2xl">
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
                    disabled={isTechLoading || !techUrlInput.trim()}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-xs rounded-xl transition shadow-sm shrink-0 disabled:opacity-50"
                  >
                    {isTechLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Auditing Website…
                      </>
                    ) : (
                      <>
                        Run Technical Check <ArrowRight className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Technical Error Notice */}
              {techErrorNotice && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 font-medium">
                  {techErrorNotice}
                </div>
              )}
            </div>
          </div>

          {/* RELOCATED bundle_estimate - highlighted summary block right before closing_message */}
          {briefReport.bundle_estimate && (
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-3xl p-6 md:p-8 mb-12 shadow-sm print:border-neutral-300 print:bg-emerald-50 max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[#007a55] dark:text-[#4ade80]">
                <PackageCheck className="w-4 h-4 text-[#009E73]" />
                <span>Bundled Package Estimate</span>
              </div>
              <p className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 print:text-black leading-relaxed">
                {briefReport.bundle_estimate}
              </p>
            </div>
          )}

          {/* 5. closing_message as a final paragraph & 6. "Book a 30-Min Discovery Call" CTA button directly below it */}
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl mb-16 print:border print:border-neutral-300 print:bg-white print:text-black print:p-6 print:shadow-none print:break-inside-avoid">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#009E73] bg-emerald-950/60 print:bg-emerald-50 print:text-[#009E73] border border-emerald-800/80 print:border-emerald-300 px-3 py-1 rounded-full mb-4 inline-block">
              Architecture Next Step
            </span>

            {/* 5. closing_message paragraph */}
            {briefReport.closing_message && (
              <p className="text-sm md:text-base text-neutral-300 dark:text-neutral-300 print:text-neutral-900 max-w-2xl mx-auto mb-6 leading-relaxed font-normal">
                {briefReport.closing_message}
              </p>
            )}

            {/* Short estimate_disclaimer_short reminder */}
            {briefReport.estimate_disclaimer_short && (
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-400 print:text-neutral-600 max-w-xl mx-auto mb-6 leading-normal font-normal">
                {briefReport.estimate_disclaimer_short}
              </p>
            )}

            <h3 className="text-2xl md:text-3xl font-extrabold mb-6 print:text-black">
              Schedule Your 30-Minute Discovery Call
            </h3>

            {/* 6. "Book a 30-Min Discovery Call" CTA button */}
            <div className="flex flex-wrap items-center justify-center gap-4 print:hidden">
              <a
                href="https://calendly.com/shukla-ajay05/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2" /> Book a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="hidden print:block text-xs font-mono font-bold text-[#009E73]">
              <a href="https://calendly.com/shukla-ajay05/30min" target="_blank" rel="noopener noreferrer" className="underline">
                Book online: calendly.com/shukla-ajay05/30min
              </a>
            </div>
          </div>

          {/* Compact Print Footer Line */}
          <div className="hidden print:flex items-center justify-between text-xs font-mono text-neutral-500 pt-6 mt-8 border-t border-neutral-300">
            <span>DigiXPro Digital Solution • digixpro.in</span>
            <span suppressHydrationWarning>Report Generated: {new Date().toLocaleDateString()}</span>
          </div>
        </section>
      )}
    </div>
  );
}
