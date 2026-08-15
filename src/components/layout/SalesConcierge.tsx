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
    label: "Learn & explore",
    detail: "Articles, frameworks and examples",
    message:
      "I am looking for information and practical guidance before I decide whether I need a service. Please direct me to the most relevant DigiXPro Decision Library article or production evidence.",
    icon: FolderOpen,
  },
  {
    label: "Independent advisory",
    detail: "Decide the right approach or vendor",
    message:
      "I need independent advisory before choosing a solution, platform, or implementation partner. Please help me identify the right decision path.",
    icon: Bot,
  },
  {
    label: "Work with DigiXPro Studio",
    detail: "Plan and execute a scoped engagement",
    message:
      "I want DigiXPro Studio to plan and execute work. Please help me choose the most relevant service area: website, SEO, IT systems, branding, social-media campaign creative, or AI Automation.",
    icon: Sparkles,
  },
  {
    label: "Website & SEO",
    detail: "Performance, redesign or organic visibility",
    message:
      "I am exploring a website or redesign. Please ask me one question: which investment band—below ₹1.5L, ₹1.5L-₹5L, or above ₹5L—before suggesting WordPress versus custom.",
    icon: Globe2,
  },
  {
    label: "IT systems & Automation",
    detail: "IT consulting, CRM, ERP or AI workflows",
    message:
      "I need guidance on IT consulting, CRM, ERP, operations, or AI Automation. Please help identify the most appropriate path.",
    icon: Workflow,
  },
  {
    label: "Brand & campaign creative",
    detail: "Branding, social assets or ad creative",
    message:
      "I need help with brand identity, social-media creative assets, campaign collateral, or ad-banner design. Please clarify the appropriate DigiXPro service scope.",
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
  const showNudge = hasLoadedHistory && !isOpen && messages.length === 0 && !nudgeDismissed;

  useEffect(() => {
    const storedMessages = getStoredHistory();
    messageCounterRef.current = storedMessages.length;
    setMessages(storedMessages);
    setHasLoadedHistory(true);
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

    setMessages((current) => [...current, visitorEntry].slice(-MAX_STORED_MESSAGES));
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_message: visitorMessage,
          session_id: getSessionId(),
          page_url: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error(`The concierge is temporarily unavailable (${response.status}).`);
      }

      const payload: unknown = await response.json();
      const reply =
        typeof payload === "object" &&
        payload !== null &&
        "reply" in payload &&
        typeof payload.reply === "string"
          ? payload.reply
          : "I’m sorry, I couldn’t read that response. Please try again.";

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
          aria-label="DigiXPro Sales Concierge"
          className="flex h-[min(42rem,calc(100dvh-8.5rem))] w-full max-w-[27rem] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/20 dark:border-neutral-800 dark:bg-[#101010] md:h-[min(42rem,calc(100dvh-9rem))] md:w-[27rem]"
        >
          <header className="border-b border-neutral-200 bg-gradient-to-br from-white via-white to-emerald-50/70 px-4 py-3.5 dark:border-neutral-800 dark:from-[#101010] dark:via-[#101010] dark:to-emerald-950/20">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#009E73] opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#009E73]" />
                  </span>
                  <p className="text-sm font-bold text-[#0A0A0A] dark:text-white">DigiXPro Sales Concierge</p>
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
                  aria-label="Close sales concierge"
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
          <span className="mb-1 flex items-center gap-2 text-xs font-bold text-[#0A0A0A] dark:text-white">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#009E73] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#009E73]" />
            </span>
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
          className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#0A0A0A] px-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-[#202020] focus-visible:-translate-y-0.5 dark:border dark:border-neutral-700"
          aria-expanded={false}
          aria-controls="sales-concierge-message"
        >
          <MessageCircle className="h-4 w-4 text-[#4ade80]" aria-hidden="true" />
          <span>Ask DigiXPro</span>
          <span className="hidden border-l border-neutral-600 pl-2 text-[11px] font-medium text-neutral-300 sm:inline">AI concierge</span>
        </button>
      )}
    </div>
  );
}
