"use client";

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bot,
  ChevronRight,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  X,
  ArrowRight,
  Calendar,
  FileCheck2,
  ShieldCheck,
  User,
  Compass,
} from "lucide-react";

const API_ENDPOINT = "/api/sales-concierge";
const SESSION_STORAGE_KEY = "digixpro-sales-concierge-session";
const CHAT_HISTORY_STORAGE_KEY = "digixpro-sales-concierge-history";
// Round-tripped VisitorSessionState snapshot (Phase 5) - lets the stateless
// backend continue a multi-turn conversation without any server-side session
// store. Deliberately separate from CHAT_HISTORY_STORAGE_KEY: chat history is
// display-only transcript, this is the router/tour engine's actual working
// state (intent, collected answers, journey progress).
const SESSION_STATE_STORAGE_KEY = "digixpro-sales-concierge-session-state";
const MAX_STORED_MESSAGES = 30;

export type TourActionType =
  | 'ASK_QUESTION'
  | 'SHOW_SERVICE'
  | 'SHOW_PAGE'
  | 'SHOW_EVIDENCE'
  | 'START_AUDIT'
  | 'BOOK_CONSULTATION'
  | 'HUMAN_HANDOFF'
  | 'CLARIFY'
  | 'COMPLETE';

export type TourAction = {
  action_type: TourActionType;
  label: string;
  url?: string;
  description: string;
  what_to_inspect?: string;
  why_relevant?: string;
  cta_text: string;
};

export type TourStepInfo = {
  intent_id: string;
  family_id: string;
  flow_id: string;
  headline_message: string;
  targeted_question?: string;
  suggested_replies?: string[];
  canonical_destination: {
    destination_type?: 'CANONICAL_PAGE' | 'EVIDENCE_CASE' | 'AUDIT_INTAKE' | 'CONSULTATION';
    canonical_path?: string;
    display_label?: string;
    page_purpose?: string;
    title?: string;
    url?: string;
    what_to_inspect: string;
    why_relevant?: string;
    why_it_matters?: string;
    evidence_destinations?: Array<{
      label: string;
      url: string;
      what_to_inspect: string;
    }>;
    next_steps?: string[];
  };
  tour_actions: TourAction[];
};

type ChatMessage = {
  id: string;
  role: "visitor" | "assistant";
  text: string;
  suggestedReplies?: string[];
  tourActions?: TourAction[];
  tourStep?: TourStepInfo;
};

type QuickStart = {
  label: string;
  message: string;
};

// Compact entry chips - suggestions, not a form. Labels come from the existing
// product taxonomy (Advisory / Design & Build / Search-AI-Automation service
// streams already used across precedence.ts and canonicalRegistry.ts); each
// underlying message is a phrasing already proven to route directly to the
// correct intent, so a chip click behaves exactly like a visitor typing it.
const QUICK_STARTS: QuickStart[] = [
  { label: "Build a website", message: "Build a new website" },
  { label: "Redesign", message: "I need a website redesign." },
  { label: "SEO / AI Search", message: "I need SEO or AI search optimization (GEO) help." },
  { label: "E-commerce", message: "E-commerce / Marketplace" },
  { label: "Technical / CTO", message: "I need fractional CTO or technology advisory." },
  { label: "Not sure", message: "I'm not sure what I need yet." },
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

function getStoredSessionState(): unknown {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(SESSION_STATE_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : undefined;
  } catch {
    window.localStorage.removeItem(SESSION_STATE_STORAGE_KEY);
    return undefined;
  }
}

function setStoredSessionState(state: unknown) {
  if (typeof window === "undefined") return;
  if (!state || typeof state !== "object" || Array.isArray(state)) return;
  try {
    window.localStorage.setItem(SESSION_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable - non-fatal, next turn simply starts fresh.
  }
}

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `digixpro-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getSessionId() {
  if (typeof window === "undefined") return createSessionId();
  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const sessionId = createSessionId();
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

function isInternalDigiXProUrl(href: string) {
  try {
    if (href.startsWith("/")) return true;
    const hostname = new URL(href).hostname.replace(/^www\./, "");
    return hostname === "digixpro.in" || hostname === "localhost";
  } catch {
    return false;
  }
}

// Extracted so the action->navigation-target decision used for every guided-tour
// action card (View Case Study, service links, Start Diagnostic Audit, Book 30-Min
// Call) is a single, independently testable rule instead of inline JSX logic. Pure
// refactor of the existing behavior - no change to which URL any action card opens.
export function resolveTourActionLink(action: Pick<TourAction, "url">): { href: string; isInternal: boolean } {
  const url = action.url;
  if (url && url.startsWith("/")) {
    return { href: url, isInternal: true };
  }
  return { href: url || "/", isInternal: false };
}

function MarkdownReply({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g;
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

    if (isInternal) {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-semibold text-[#007a55] underline decoration-[#009E73]/50 underline-offset-2 transition-colors hover:text-[#005f43] dark:text-[#4ade80] dark:hover:text-[#86efac]"
        >
          {renderInlineText(label, `link-${match.index}`)}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#007a55] underline decoration-[#009E73]/50 underline-offset-2 transition-colors hover:text-[#005f43] dark:text-[#4ade80] dark:hover:text-[#86efac]"
        >
          {renderInlineText(label, `link-${match.index}`)}
        </a>,
      );
    }
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(...renderInlineText(text.slice(lastIndex), "text-final"));
  }

  return <>{parts}</>;
}

export default function SalesConcierge() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(0);
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

  // Smooth Auto-Scroll to Latest Turn
  useEffect(() => {
    if (messages.length > 0) {
      const scrollTimer = setTimeout(() => {
        if (latestMessageRef.current) {
          latestMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 100);
      return () => clearTimeout(scrollTimer);
    }
  }, [messages, isSending]);

  function openConcierge() {
    setNudgeDismissed(true);
    setIsOpen(true);
  }

  function startNewConversation() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
      window.localStorage.removeItem(SESSION_STATE_STORAGE_KEY);
    }
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

    if (visitorMessage.length > 2000) {
      setError("Message exceeds maximum length of 2,000 characters. Please shorten your query.");
      return;
    }

    const visitorEntry: ChatMessage = {
      id: nextMessageId("visitor"),
      role: "visitor",
      text: visitorMessage,
    };

    setMessages((current) => [...current, visitorEntry].slice(-MAX_STORED_MESSAGES));
    setDraft("");
    setError("");
    setIsSending(true);

    const currentPageContext = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: visitorMessage,
          session_id: getSessionId(),
          current_page: currentPageContext,
          session_state: getStoredSessionState()
        }),
      });

      if (!response.ok) {
        throw new Error(`API response failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.text) {
        setStoredSessionState(data.session_state);
        const tourStep: TourStepInfo | undefined = data.tour_step;
        const assistantEntry: ChatMessage = {
          id: nextMessageId("assistant"),
          role: "assistant",
          text: data.text,
          suggestedReplies: tourStep?.suggested_replies,
          tourActions: tourStep?.tour_actions,
          tourStep: tourStep
        };
        setMessages((current) => [...current, assistantEntry].slice(-MAX_STORED_MESSAGES));
      } else {
        throw new Error(data.error || "Failed to process guided tour response.");
      }
    } catch (requestError) {
      console.error("DigiXPro Concierge Error:", requestError);
      const fallbackEntry: ChatMessage = {
        id: nextMessageId("assistant"),
        role: "assistant",
        text: "I am having trouble processing that request right now. You can explore our core services at [/how-we-work](/how-we-work) or request a complimentary website diagnostic audit at [/audit](/audit).",
        suggestedReplies: ["Explore Services", "Request Free Audit", "Book 30-Min Call"]
      };
      setMessages((current) => [...current, fallbackEntry].slice(-MAX_STORED_MESSAGES));
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
        isOpen ? "md:top-24 md:bottom-auto" : "md:bottom-6"
      }`}
    >
      {isOpen && (
        <section
          aria-label="DigiXPro Concierge"
          className="flex h-[min(40rem,calc(100dvh-7.5rem))] w-full max-w-[25rem] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-2xl shadow-black/20 dark:border-neutral-800 dark:bg-[#0E0E0E] md:h-[min(40rem,calc(100dvh-8rem))] md:w-[25rem]"
        >
          {/* HEADER */}
          <header className="border-b border-neutral-200 bg-white px-3.5 py-2.5 dark:border-neutral-800 dark:bg-[#121212]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#009E73] to-[#007a55] text-white shadow-sm">
                  <Compass className="h-4 w-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-[#121212]"></span>
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold leading-tight text-[#0A0A0A] dark:text-white">
                    DigiXPro<span className="text-[#009E73]">.</span> Concierge
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={startNewConversation}
                    className="inline-flex min-h-7 items-center rounded-lg border border-neutral-200 bg-neutral-50 px-2 text-[11px] font-bold text-neutral-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-[#007a55] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-emerald-800 dark:hover:text-[#4ade80]"
                    aria-label="Start a new tour"
                  >
                    New Tour
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-7 min-w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:text-[#0A0A0A] dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                  aria-label="Close Concierge"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </header>

          {/* CONVERSATION FEED */}
          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4" aria-live="polite">
            {/* Compact opening state ONLY when no messages exist */}
            {messages.length === 0 && (
              <div className="space-y-3.5">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#009E73]" aria-hidden="true" />
                  <p className="text-[13px] leading-5 text-neutral-700 dark:text-neutral-300">
                    Tell me what you&apos;re trying to build, fix, or improve — I&apos;ll guide you to the right next step.
                    <span className="mt-1 block text-neutral-500 dark:text-neutral-400">
                      Not sure where to start? Just say what you&apos;re trying to achieve.
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {QUICK_STARTS.map((quickStart) => (
                    <button
                      key={quickStart.label}
                      type="button"
                      onClick={() => void sendVisitorMessage(quickStart.message)}
                      disabled={isSending}
                      className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-[#009E73] hover:text-[#007a55] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-[#4ade80] dark:hover:text-[#4ade80]"
                    >
                      {quickStart.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;

              if (message.role === "visitor") {
                return (
                  <div
                    key={message.id}
                    className="ml-auto flex flex-col items-end max-w-[85%] space-y-1"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pr-1 flex items-center gap-1">
                      <User className="h-3 w-3" /> You
                    </span>
                    <div className="rounded-2xl rounded-tr-sm bg-[#0A0A0A] px-3.5 py-2.5 text-[13px] leading-5 text-white shadow-md dark:bg-[#009E73] dark:text-white">
                      {message.text}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={message.id}
                  ref={isLastMessage ? latestMessageRef : null}
                  className="mr-auto flex flex-col items-start w-full space-y-2.5"
                >
                  <div className="flex items-center gap-2 pl-0.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#009E73] text-white shadow-sm">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide text-[#007a55] dark:text-[#4ade80]">
                      DigiXPro Concierge
                    </span>
                  </div>

                  <div className="w-full rounded-2xl rounded-tl-sm border border-neutral-200 bg-white p-3.5 text-[13px] leading-5 text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-[#141414] dark:text-neutral-200">
                    <MarkdownReply text={message.text} />

                    {/* SUGGESTED REPLIES CHIPS (Active only on the latest turn to prevent out-of-context clicks) */}
                    {message.suggestedReplies && message.suggestedReplies.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex flex-wrap gap-2">
                          {message.suggestedReplies.map((reply, idx) => (
                            <button
                              key={`reply-${idx}`}
                              type="button"
                              disabled={!isLastMessage || isSending}
                              onClick={() => void sendVisitorMessage(reply)}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                                isLastMessage
                                  ? "border-emerald-200 bg-emerald-50/80 text-[#007a55] hover:bg-[#009E73] hover:text-white hover:border-[#009E73] hover:shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-[#4ade80] dark:hover:bg-[#009E73] dark:hover:text-white"
                                  : "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-60 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-600"
                              }`}
                            >
                              <span>{reply}</span>
                              <ArrowRight className="h-3 w-3 shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* GUIDED TOUR ACTION CARDS (CLICKABLE INTERNAL NEXT.JS LINK CONTROLS) */}
                    {message.tourActions && message.tourActions.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#007a55] dark:text-[#4ade80]">
                          RECOMMENDED NEXT STEP
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {message.tourActions.map((action, aIdx) => {
                            const { href, isInternal } = resolveTourActionLink(action);
                            // Visual hierarchy: Audit/Book-Call are the primary conversion
                            // actions and get a stronger, tinted treatment; evidence/service
                            // links are supporting navigation and stay quieter.
                            const isPrimary = action.action_type === 'START_AUDIT' || action.action_type === 'BOOK_CONSULTATION';
                            const cardContent = (
                              <>
                                <div>
                                  <div className="flex items-center justify-between gap-1.5 mb-1">
                                    <span className={`text-xs font-bold ${isPrimary ? "text-[#005f43] dark:text-[#4ade80]" : "text-[#0A0A0A] group-hover:text-[#007a55] dark:text-white dark:group-hover:text-[#4ade80]"}`}>
                                      {action.label}
                                    </span>
                                    {action.action_type === 'BOOK_CONSULTATION' ? (
                                      <Calendar className="h-4 w-4 text-[#009E73] shrink-0" />
                                    ) : action.action_type === 'START_AUDIT' ? (
                                      <FileCheck2 className="h-4 w-4 text-[#009E73] shrink-0" />
                                    ) : (
                                      <ShieldCheck className="h-4 w-4 text-[#009E73] shrink-0" />
                                    )}
                                  </div>
                                  {action.what_to_inspect && (
                                    <p className="text-[11px] leading-4 text-neutral-500 line-clamp-2 dark:text-neutral-400">
                                      {action.what_to_inspect}
                                    </p>
                                  )}
                                </div>
                                <span className="mt-2 inline-flex items-center text-[11px] font-bold text-[#007a55] dark:text-[#4ade80]">
                                  {action.cta_text} <ChevronRight className="h-3 w-3 ml-0.5 transition-transform group-hover:translate-x-1" />
                                </span>
                              </>
                            );
                            const cardClassName = isPrimary
                              ? "group flex flex-col justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 transition-all hover:-translate-y-0.5 hover:border-[#009E73] hover:shadow-md dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:hover:border-[#4ade80]"
                              : "group flex flex-col justify-between rounded-xl border border-neutral-200 bg-neutral-50/80 p-3 transition-all hover:-translate-y-0.5 hover:border-[#009E73] hover:bg-white hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-[#4ade80] dark:hover:bg-neutral-900";

                            if (isInternal) {
                              return (
                                <Link key={`action-${aIdx}`} href={href} className={cardClassName}>
                                  {cardContent}
                                </Link>
                              );
                            }

                            return (
                              <a
                                key={`action-${aIdx}`}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={cardClassName}
                              >
                                {cardContent}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl rounded-tl-sm border border-neutral-200 bg-white px-4 py-3 text-xs font-semibold text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                <LoaderCircle className="h-4 w-4 animate-spin text-[#009E73]" aria-hidden="true" />
                Analyzing guided website tour destination…
              </div>
            )}

            {error && <p className="px-1 text-xs leading-5 text-red-700 dark:text-red-400">{error}</p>}
            <div ref={messageEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className="border-t border-neutral-200 bg-white px-3.5 py-3 dark:border-neutral-800 dark:bg-[#121212]">
            <form onSubmit={sendMessage}>
              <label htmlFor="sales-concierge-message" className="sr-only">
                Ask DigiXPro Concierge a question
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
                  placeholder="Ask about SEO, website design, automation, or audits…"
                  rows={2}
                  maxLength={2000}
                  disabled={isSending}
                  className="min-h-11 flex-1 resize-none rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm leading-5 text-[#0A0A0A] placeholder:text-neutral-400 focus:border-[#009E73] focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#1A1A1A] dark:text-white dark:placeholder:text-neutral-500 dark:focus:bg-[#141414]"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || isSending}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-[#009E73] text-white transition-all hover:bg-[#007a5a] shadow-md disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="relative mb-3 w-full max-w-[19rem] md:w-[19rem]">
          <button
            type="button"
            onClick={openConcierge}
            className="w-full rounded-2xl border border-emerald-200 bg-white p-3 pr-8 text-left shadow-xl shadow-black/10 transition-transform hover:-translate-y-0.5 dark:border-emerald-900/70 dark:bg-neutral-900"
          >
            <span className="mb-1 block text-xs font-bold text-[#0A0A0A] dark:text-white">
              Need a guided website tour?
            </span>
            <span className="block text-xs leading-5 text-neutral-600 dark:text-neutral-400">
              Explore SEO, custom web design, n8n automation, or free website audits.
            </span>
          </button>
          {/* PHASE 23 (Part 14 mobile hardening): this nudge previously had no
              way to dismiss it without opening the full concierge - on mobile,
              where it spans nearly the full viewport width, it persistently
              overlapped page content (found live on the /audit pricing FAQ,
              obscuring FAQ question text as the visitor scrolled). Reuses the
              existing nudgeDismissed state (already wired to hide this block)
              instead of introducing new dismissal logic. */}
          <button
            type="button"
            onClick={() => setNudgeDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-2 top-2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
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
          <span className="hidden border-l border-neutral-600 pl-2 text-[11px] font-medium text-neutral-300 sm:inline">Concierge</span>
        </button>
      )}
    </div>
  );
}
