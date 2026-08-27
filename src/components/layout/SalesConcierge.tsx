"use client";

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronRight,
  FolderOpen,
  Globe2,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const WEBHOOK_URL = "https://n8n.digixpro.in/webhook/digixpro-sales-concierge";
const SESSION_STORAGE_KEY = "digixpro-sales-concierge-session";
const CHAT_HISTORY_STORAGE_KEY = "digixpro-sales-concierge-history";
const MAX_STORED_MESSAGES = 30;

type ChatMessage = {
  id: string;
  role: "visitor" | "assistant";
  text: string;
};

type QuickStart = {
  label: string;
  detail: string;
  message: string;
  icon: typeof Globe2;
};

const QUICK_STARTS: QuickStart[] = [
  {
    label: "Advisory & Strategy",
    detail: "Technology roadmaps, vendor evaluation, Fractional CTO",
    message:
      "I need independent technology advisory, vendor evaluation, or fractional CTO leadership before committing budget to a platform.",
    icon: Bot,
  },
  {
    label: "Website Design & Engineering",
    detail: "Custom Next.js design, redesign migration, SEO-ready web",
    message:
      "I am evaluating a custom website design, website redesign, or SEO-ready web engineering project.",
    icon: Globe2,
  },
  {
    label: "Search, AI & Automation",
    detail: "SEO, AI search (GEO), local leads, workflow automation",
    message:
      "I need guidance on SEO, AI search optimization (GEO), local lead visibility, n8n workflow automation, or CRM sales pipelines.",
    icon: Workflow,
  },
  {
    label: "Audit Follow-up",
    detail: "Review your completed DigiXPro audit recommendations",
    message:
      "I completed the DigiXPro Systems Audit. Can we discuss the recommendations for my business?",
    icon: Sparkles,
  },
  {
    label: "Production Evidence",
    detail: "Case studies, live platforms, verified outcomes",
    message:
      "Please show me relevant DigiXPro client case studies and verified production evidence.",
    icon: FolderOpen,
  },
  {
    label: "How We Work",
    detail: "Engagement process & diagnostic methodology",
    message:
      "How does a DigiXPro engagement work—from initial diagnosis to architecture and implementation?",
    icon: MessageCircle,
  },
];

function isChatMessage(value: unknown): value is ChatMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "role" in value &&
    (value.role === "visitor" || value.role === "assistant") &&
    "text" in value &&
    typeof value.text === "string"
  );
}

function getStoredHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];

  try {
    const savedHistory: unknown = JSON.parse(
      window.localStorage.getItem(CHAT_HISTORY_STORAGE_KEY) ?? "[]",
    );

    return Array.isArray(savedHistory)
      ? savedHistory.filter(isChatMessage).slice(-MAX_STORED_MESSAGES)
      : [];
  } catch {
    window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
    return [];
  }
}

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `digixpro-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getSessionId() {
  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const sessionId = createSessionId();
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

function isInternalDigiXProUrl(href: string) {
  try {
    const hostname = new URL(href).hostname.replace(/^www\./, "");
    return hostname === "digixpro.in";
  } catch {
    return false;
  }
}

function MarkdownReply({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const renderInlineText = (value: string, key: string) =>
    value.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      const boldMatch = /^\*\*(.+)\*\*$/.exec(part);
      return boldMatch ? <strong key={`${key}-strong-${index}`}>{boldMatch[1]}</strong> : part;
    });
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...renderInlineText(text.slice(lastIndex, match.index), `text-${match.index}`));
    }

    const [fullMatch, label, href] = match;
    const isInternal = isInternalDigiXProUrl(href);
    parts.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noreferrer"}
        className="font-semibold text-[#007a55] underline decoration-[#009E73]/50 underline-offset-2 transition-colors hover:text-[#005f43] dark:text-[#4ade80] dark:hover:text-[#86efac]"
      >
        {renderInlineText(label, `link-${match.index}`)}
      </a>,
    );
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(...renderInlineText(text.slice(lastIndex), "text-final"));
  }

  return <>{parts}</>;
}

type MarketContext = {
  country: string;
  currency: string;
  currency_symbol: string;
  language: string;
};

type ConversationStage = "EXPLORE" | "UNDERSTAND" | "EVALUATE" | "VALIDATE" | "READY" | "HANDOFF";

function detectVisitorMarketContext(): MarketContext {
  let country = "Global";
  let currency = "USD";
  let currency_symbol = "$";
  let language = "en";

  if (typeof window !== "undefined") {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const lang = navigator.language || "en";
      language = lang.split("-")[0];

      if (tz.includes("Kolkata") || tz.includes("Calcutta")) {
        country = "India";
        currency = "INR";
        currency_symbol = "₹";
      } else if (tz.includes("London") || tz.includes("Belfast")) {
        country = "United Kingdom";
        currency = "GBP";
        currency_symbol = "£";
      } else if (tz.includes("Australia")) {
        country = "Australia";
        currency = "AUD";
        currency_symbol = "A$";
      } else if (tz.includes("Singapore")) {
        country = "Singapore";
        currency = "SGD";
        currency_symbol = "S$";
      } else if (tz.includes("New_York") || tz.includes("Chicago") || tz.includes("Los_Angeles") || tz.includes("Denver") || tz.includes("America")) {
        country = "United States";
        currency = "USD";
        currency_symbol = "$";
      }
    } catch {
      // fallback
    }
  }

  return { country, currency, currency_symbol, language };
}

function inferConversationStage(messages: ChatMessage[], latestInput: string): ConversationStage {
  const text = (latestInput + " " + messages.map(m => m.text).join(" ")).toLowerCase();

  if (text.includes("book") || text.includes("call") || text.includes("calendly") || text.includes("speak to founder") || text.includes("human")) {
    return "HANDOFF";
  }
  if (text.includes("cost") || text.includes("pricing") || text.includes("quote") || text.includes("how soon") || text.includes("timeline")) {
    return "READY";
  }
  if (text.includes("have you done") || text.includes("case study") || text.includes("proof") || text.includes("example") || text.includes("client")) {
    return "VALIDATE";
  }
  if (text.includes("our business") || text.includes("we need") || text.includes("clinic") || text.includes("ecommerce") || text.includes("leads")) {
    return "EVALUATE";
  }
  if (messages.length > 2) {
    return "UNDERSTAND";
  }
  return "EXPLORE";
}

function countPriceResistanceTurns(messages: ChatMessage[], latestInput: string): number {
  const combinedText = (messages.map(m => m.text).join(" ") + " " + latestInput).toLowerCase();
  const resistanceKeywords = [
    "50 k", "50k", "50,000", "30k", "30,000", "budget nahi hai", "price bahut zyada hai",
    "price bahutsyada hai", "service start nahi hoti", "chahiye hi nahi", "too expensive",
    "out of budget", "can't afford", "cannot afford", "price is high", "mera budget"
  ];

  let count = 0;
  for (const kw of resistanceKeywords) {
    if (combinedText.includes(kw)) count++;
  }
  return count;
}

function sanitizeAssistantReply(rawText: string, messages: ChatMessage[] = [], latestVisitorInput: string = ""): string {
  let cleaned = rawText;

  // 1. Map legacy /services/* paths to canonical 3-segment URLs
  const legacyMap: Record<string, string> = {
    "/services/ai-consulting-services": "/search-automation/ai-search-optimization-geo",
    "/services/ai-automation-agency": "/search-automation/workflow-ai-automation",
    "/services/business-process-automation": "/search-automation/lead-capture-crm-sales-automation",
    "/services/website-design-services": "/design-services/custom-business-website-design",
    "/services/website-design": "/design-services/custom-business-website-design",
    "/services/seo-services": "/search-automation/seo-search-visibility",
    "/services/it-consulting": "/advisory/it-consulting-technology-strategy",
  };

  for (const [legacy, canonical] of Object.entries(legacyMap)) {
    cleaned = cleaned.replaceAll(legacy, canonical);
    cleaned = cleaned.replaceAll(`https://www.digixpro.in${legacy}`, `https://www.digixpro.in${canonical}`);
  }

  // Catch any remaining legacy /services/ URLs
  cleaned = cleaned.replace(/https?:\/\/www\.digixpro\.in\/services\/[a-z0-9-]+/gi, "https://www.digixpro.in/search-automation");

  // 2. Sanitize fabricated legacy price ranges
  cleaned = cleaned.replace(/Indicative range [^\n]+\n?/gi, "DigiXPro pricing is determined by technical complexity, system integration requirements, and project scope rather than off-the-shelf tier packages.\n\n");

  // 3. Mandatory Budget-Mismatch & Three-Strike Commercial Restraint Engine
  const inputLower = (latestVisitorInput + " " + messages.slice(-3).map(m => m.text).join(" ")).toLowerCase();
  const isLowBudgetMismatch = inputLower.includes("50 k") || inputLower.includes("50k") || inputLower.includes("50,000") || inputLower.includes("30k") || inputLower.includes("mera budget") || inputLower.includes("too expensive") || inputLower.includes("service start bhi nahi");
  const resistanceScore = countPriceResistanceTurns(messages, latestVisitorInput);

  if (isLowBudgetMismatch || resistanceScore >= 3) {
    // Strip all sales pressure, Audit pushes, call bookings, and defensive pricing argument
    const isHindiOrHinglish = /[अ-ह]|mera|nahi|hai|kerna|chata|hu|benavani|sasta|dukan|baat|bata/i.test(latestVisitorInput);

    if (isLowBudgetMismatch) {
      if (isHindiOrHinglish) {
        cleaned = "हाँ, ₹50,000 के budget पर DigiXPro का current custom engagement practical fit नहीं होगा. मैं आपको हमारी service push नहीं करूँगा. अगर आपका immediate goal केवल D2C store launch करना है, तो इस stage पर standard Shopify या WooCommerce setup अधिक practical रहेगा.";
      } else {
        cleaned = "At a $500–$600 budget level, a custom DigiXPro web engineering engagement will not be a practical fit. We do not push custom services where scope requirements don't align. If your immediate priority is to launch a D2C store, a standard Shopify or WooCommerce implementation would be more practical at this stage.";
      }
    } else {
      // Strip all CTA links when in 3-strike commercial restraint
      cleaned = cleaned.replace(/\[[^\]]+\]\(https?:\/\/[^\s)]+\)/g, "").trim();
      cleaned = cleaned.replace(/(Book a call|Systems Audit|Contact Us|Schedule an Architecture Call)[^\.\n]*/gi, "").trim();
    }
  } else {
    // 4. Standard Link discipline: Limit trailing multi-link bars to at most 1-2 relevant links
    const isExplicitLinkRequest = /links|case study|proof|evidence|url/i.test(latestVisitorInput);
    const linkMatches = Array.from(cleaned.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g));
    const maxAllowedLinks = isExplicitLinkRequest ? 2 : 1;

    if (linkMatches.length > maxAllowedLinks) {
      const cutoffIndex = linkMatches[maxAllowedLinks - 1].index;
      if (cutoffIndex !== undefined) {
        cleaned = cleaned.slice(0, cutoffIndex + linkMatches[maxAllowedLinks - 1][0].length).trim();
      }
    }
  }

  return cleaned;
}

type ConciergeResponseContract = {
  success: boolean;
  reply: string;
  stage?: string;
  links?: string[];
  metadata?: Record<string, unknown>;
  error_code?: string;
};

async function parseConciergeResponse(response: Response, visitorMessage: string): Promise<ConciergeResponseContract> {
  console.info("[DigiXPro AI Assist v2] SAFE RESPONSE PARSER ACTIVE", {
    status: response.status,
    ok: response.ok,
    contentType: response.headers.get("content-type"),
  });

  const isHindiOrHinglish = /[अ-ह]|mera|nahi|hai|kerna|chata|hu|benavani|sasta|dukan|baat|bata|namaskar|nemaskar/i.test(visitorMessage);
  const defaultFallbackReply = isHindiOrHinglish
    ? "नमस्ते! मैं DigiXPro AI Assist हूँ. आपके व्यवसाय या तकनीकी प्रश्न को बेहतर ढंग से समझने के लिए, कृपया अपनी मुख्य प्राथमिकता या आवश्यकता स्पष्ट करें."
    : "Hello! I am DigiXPro AI Assist. To help guide your decision, could you share a bit more detail about your primary business goal or technology requirements?";

  if (!response.ok) {
    console.warn(`[DigiXPro Concierge] Webhook HTTP Error: ${response.status} ${response.statusText}`);
    return {
      success: false,
      reply: defaultFallbackReply,
      error_code: `HTTP_${response.status}`,
    };
  }

  let rawText = "";
  try {
    rawText = await response.text();
  } catch (err) {
    console.warn("[DigiXPro Concierge] Failed to read response stream text:", err);
    return {
      success: false,
      reply: defaultFallbackReply,
      error_code: "STREAM_READ_ERROR",
    };
  }

  const trimmedText = rawText.trim();
  if (!trimmedText) {
    console.warn("[DigiXPro Concierge] Webhook returned 200 OK with empty body (0 bytes). Executing dignified fallback.");
    return {
      success: false,
      reply: defaultFallbackReply,
      error_code: "EMPTY_RESPONSE_BODY",
    };
  }

  let jsonPayload: unknown = null;
  try {
    jsonPayload = JSON.parse(trimmedText);
  } catch {
    if (trimmedText.startsWith("<") || trimmedText.toLowerCase().includes("error")) {
      console.warn("[DigiXPro Concierge] Non-JSON error payload detected from webhook:", trimmedText.slice(0, 100));
      return {
        success: false,
        reply: defaultFallbackReply,
        error_code: "INVALID_JSON_HTML_ERROR",
      };
    }

    console.info("[DigiXPro Concierge] Plain text response received from n8n:", trimmedText.slice(0, 100));
    return {
      success: true,
      reply: trimmedText,
    };
  }

  if (typeof jsonPayload === "object" && jsonPayload !== null) {
    const obj = jsonPayload as Record<string, unknown>;
    const targetObj = (typeof obj.body === "object" && obj.body !== null ? obj.body : obj) as Record<string, unknown>;

    const candidateReply =
      (typeof targetObj.reply === "string" && targetObj.reply.trim()) ||
      (typeof targetObj.output === "string" && targetObj.output.trim()) ||
      (typeof targetObj.message === "string" && targetObj.message.trim()) ||
      (typeof targetObj.text === "string" && targetObj.text.trim()) ||
      (typeof targetObj.response === "string" && targetObj.response.trim());

    if (candidateReply) {
      return {
        success: true,
        reply: candidateReply,
        stage: typeof targetObj.stage === "string" ? targetObj.stage : undefined,
        links: Array.isArray(targetObj.links) ? (targetObj.links as string[]) : undefined,
        metadata: typeof targetObj.metadata === "object" && targetObj.metadata !== null ? (targetObj.metadata as Record<string, unknown>) : undefined,
      };
    }
  }

  console.warn("[DigiXPro Concierge] Valid JSON returned without recognized reply fields:", jsonPayload);
  return {
    success: false,
    reply: defaultFallbackReply,
    error_code: "MISSING_REPLY_FIELD",
  };
}

function detectPageContext() {
  if (typeof window === "undefined") {
    return {
      page_url: "https://www.digixpro.in/",
      page_path: "/",
      page_title: "DigiXPro Digital Solution",
      page_segment: "Home",
      page_service: null,
      page_service_slug: null,
    };
  }

  const path = window.location.pathname;
  const url = window.location.href;
  const title = document.title;

  let segment = "General";
  let service: string | null = null;
  let serviceSlug: string | null = null;

  if (path.startsWith("/advisory")) {
    segment = "Advisory";
    if (path.length > 10) {
      serviceSlug = path.replace("/advisory/", "");
      service = serviceSlug.replace(/-/g, " ");
    }
  } else if (path.startsWith("/design-services")) {
    segment = "Design & Build";
    if (path.length > 17) {
      serviceSlug = path.replace("/design-services/", "");
      service = serviceSlug.replace(/-/g, " ");
    }
  } else if (path.startsWith("/search-automation")) {
    segment = "Search, AI & Automation";
    if (path.length > 19) {
      serviceSlug = path.replace("/search-automation/", "");
      service = serviceSlug.replace(/-/g, " ");
    }
  } else if (path.startsWith("/evidence")) {
    segment = "Evidence Case Studies";
    if (path.length > 10) {
      serviceSlug = path.replace("/evidence/", "");
      service = `Evidence: ${serviceSlug}`;
    }
  } else if (path.startsWith("/audit")) {
    segment = "Systems Audit";
  } else if (path.startsWith("/founder")) {
    segment = "Founder";
  } else if (path.startsWith("/how-we-work")) {
    segment = "How We Work";
  }

  return {
    page_url: url,
    page_path: path,
    page_title: title,
    page_segment: segment,
    page_service: service,
    page_service_slug: serviceSlug,
  };
}

export default function SalesConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const showNudge = hasLoadedHistory && !isOpen && messages.length === 0 && !nudgeDismissed;

  useEffect(() => {
    const historyTimer = window.setTimeout(() => {
      const storedMessages = getStoredHistory();
      messageCounterRef.current = storedMessages.length;
      setMessages(storedMessages);
      setHasLoadedHistory(true);
    }, 0);

    return () => window.clearTimeout(historyTimer);
  }, []);

  useEffect(() => {
    if (!hasLoadedHistory) return;

    window.localStorage.setItem(
      CHAT_HISTORY_STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
    );
  }, [hasLoadedHistory, messages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isSending]);

  function openConcierge() {
    setNudgeDismissed(true);
    setIsOpen(true);
  }

  function startNewConversation() {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
    setMessages([]);
    setDraft("");
    setError("");
  }

  function nextMessageId(role: ChatMessage["role"]) {
    messageCounterRef.current += 1;
    return `${role}-${messageCounterRef.current}`;
  }

  async function sendVisitorMessage(rawMessage: string) {
    const visitorMessage = rawMessage.trim();
    if (!visitorMessage || isSending) return;

    const visitorEntry: ChatMessage = {
      id: nextMessageId("visitor"),
      role: "visitor",
      text: visitorMessage,
    };

    const updatedMessages = [...messages, visitorEntry];

    setMessages((current) => [...current, visitorEntry].slice(-MAX_STORED_MESSAGES));
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      let auditContext: unknown = null;
      if (typeof window !== "undefined") {
        try {
          const rawAudit = window.sessionStorage.getItem("digixpro_active_audit_brief");
          if (rawAudit) auditContext = JSON.parse(rawAudit);
        } catch {
          // ignore parse error
        }
      }

      const marketContext = detectVisitorMarketContext();
      const currentStage = inferConversationStage(messages, visitorMessage);
      const pageContext = detectPageContext();

      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem("digixpro_prefill_audit_context", JSON.stringify({
            country: marketContext.country,
            currency: marketContext.currency,
            stage: currentStage,
            latest_message: visitorMessage,
          }));
        } catch {
          // ignore parse error
        }
      }

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_message: visitorMessage,
          session_id: getSessionId(),
          page_url: window.location.href,
          page_context: pageContext,
          market_context: marketContext,
          stage: currentStage,
          audit_context: auditContext,
          history: updatedMessages.map(m => ({ role: m.role, text: m.text })),
        }),
      });

      const contract = await parseConciergeResponse(response, visitorMessage);
      let reply = contract.reply;

      // Central Intelligence Guard: sanitize legacy URLs, static pricing, low-budget refusal, and link discipline
      reply = sanitizeAssistantReply(reply, messages, visitorMessage);

      const assistantEntry: ChatMessage = {
        id: nextMessageId("assistant"),
        role: "assistant",
        text: reply,
      };
      setMessages((current) => [...current, assistantEntry].slice(-MAX_STORED_MESSAGES));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The concierge is temporarily unavailable. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendVisitorMessage(draft);
  }

  return (
    <div
      className={`fixed bottom-24 left-4 right-4 z-[45] flex flex-col items-end md:left-auto md:right-6 ${
        isOpen ? "md:top-28 md:bottom-auto" : "md:bottom-6"
      }`}
    >
      {isOpen && (
        <section
          aria-label="DigiXPro AI Assist"
          className="flex h-[min(42rem,calc(100dvh-8.5rem))] w-full max-w-[27rem] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/20 dark:border-neutral-800 dark:bg-[#101010] md:h-[min(42rem,calc(100dvh-9rem))] md:w-[27rem]"
        >
          <header className="border-b border-neutral-200 bg-gradient-to-br from-white via-white to-emerald-50/70 px-4 py-3.5 dark:border-neutral-800 dark:from-[#101010] dark:via-[#101010] dark:to-emerald-950/20">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div>
                  <p className="text-sm font-bold text-[#0A0A0A] dark:text-white">
                    DigiXPro<span className="text-[#009E73]" aria-hidden="true">.</span> AI Assist
                  </p>
                </div>
                <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  Practical architecture guidance before you commit budget.
                </p>
                <p className="mt-1 text-[11px] font-medium leading-4 text-[#007a55] dark:text-[#4ade80]">
                  English · हिंदी · ਪੰਜਾਬੀ · मराठी · ગુજરાતી · தமிழ் · తెలుగు · ಕನ್ನಡ · മലയാളം
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={startNewConversation}
                    className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 bg-white px-2.5 text-[11px] font-semibold text-neutral-600 transition-colors hover:border-emerald-200 hover:text-[#007a55] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-emerald-900 dark:hover:text-[#4ade80]"
                    aria-label="Start a new conversation"
                  >
                    New chat
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:text-[#0A0A0A] dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                  aria-label="Close DigiXPro AI Assist"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-2xl rounded-bl-md border border-emerald-100 bg-emerald-50/70 p-3.5 text-sm leading-6 text-neutral-800 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-neutral-200">
                  <div className="mb-1.5 flex items-center gap-2 font-bold text-[#0A0A0A] dark:text-white">
                    <Sparkles className="h-4 w-4 text-[#009E73]" aria-hidden="true" />
                    Choose the conversation you need.
                  </div>
                  <p>
                    Start by learning, taking independent advice, or scoping work with DigiXPro Studio. Then the conversation narrows to the right service, evidence, or article.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {QUICK_STARTS.map((quickStart) => {
                    const Icon = quickStart.icon;
                    return (
                      <button
                        key={quickStart.label}
                        type="button"
                        onClick={() => void sendVisitorMessage(quickStart.message)}
                        disabled={isSending}
                        className="group flex min-h-18 items-start gap-2.5 rounded-xl border border-neutral-200 bg-white px-3 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#009E73]/50 hover:bg-emerald-50/60 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#16a34a]/50 dark:hover:bg-emerald-950/20"
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#009E73]" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-bold text-[#0A0A0A] dark:text-white">{quickStart.label}</span>
                          <span className="mt-0.5 block text-[11px] leading-4 text-neutral-600 dark:text-neutral-400">{quickStart.detail}</span>
                        </span>
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#009E73]" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>

                <a
                  href="/contact"
                  className="flex min-h-11 items-center justify-center rounded-xl bg-[#0A0A0A] px-4 text-center text-sm font-bold text-white transition-colors hover:bg-[#202020] dark:border dark:border-neutral-700"
                >
                  Book a quick conversation
                </a>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "visitor"
                    ? "ml-8 rounded-2xl rounded-br-md bg-[#009E73] px-3 py-2.5 text-sm leading-6 text-white shadow-sm"
                    : "mr-4 whitespace-pre-wrap rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2.5 text-sm leading-6 text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                }
              >
                {message.role === "assistant" ? <MarkdownReply text={message.text} /> : message.text}
              </div>
            ))}

            {isSending && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                <LoaderCircle className="h-4 w-4 animate-spin text-[#009E73]" aria-hidden="true" />
                Reviewing the right next step…
              </div>
            )}

            {error && <p className="px-1 text-xs leading-5 text-red-700 dark:text-red-400">{error}</p>}
            <div ref={messageEndRef} />
          </div>

          <div className="border-t border-neutral-200 bg-neutral-50/80 px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-950/30">
            <p className="mb-2 text-[10px] leading-4 text-neutral-500 dark:text-neutral-500">
              AI-assisted preliminary guidance. Details, recommendations, and final scope are confirmed by the DigiXPro team.
            </p>
            <form onSubmit={sendMessage}>
              <label htmlFor="sales-concierge-message" className="sr-only">
                Ask DigiXPro a question
              </label>
              <div className="flex items-end gap-2">
                <textarea
                  id="sales-concierge-message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Ask in your language…"
                  rows={2}
                  disabled={isSending}
                  className="min-h-11 flex-1 resize-none rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm leading-5 text-[#0A0A0A] placeholder:text-neutral-500 focus:border-[#009E73] focus:outline-none dark:border-neutral-700 dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || isSending}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-[#009E73] text-white transition-colors hover:bg-[#007a5a] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {showNudge && (
        <button
          type="button"
          onClick={openConcierge}
          className="mb-3 w-full max-w-[19rem] rounded-2xl border border-emerald-200 bg-white p-3 text-left shadow-xl shadow-black/10 transition-transform hover:-translate-y-0.5 dark:border-emerald-900/70 dark:bg-neutral-900 md:w-[19rem]"
        >
          <span className="mb-1 block text-xs font-bold text-[#0A0A0A] dark:text-white">
            Need a clearer next step?
          </span>
          <span className="block text-xs leading-5 text-neutral-600 dark:text-neutral-400">
            Ask about your website, SEO, systems, or AI Automation. Relevant examples included.
          </span>
        </button>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={openConcierge}
          className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-[#202020] focus-visible:-translate-y-0.5 dark:border dark:border-neutral-700"
          aria-expanded={false}
          aria-controls="sales-concierge-message"
        >
          <MessageCircle className="h-4 w-4 text-[#4ade80]" aria-hidden="true" />
          <span>
            Ask DigiXPro<span className="text-[#009E73]" aria-hidden="true">.</span>
          </span>
          <span className="hidden border-l border-neutral-600 pl-2 text-[11px] font-medium text-neutral-300 sm:inline">AI Assist</span>
        </button>
      )}
    </div>
  );
}
