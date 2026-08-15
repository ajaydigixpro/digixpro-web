"use client";

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageCircle, Send, X } from "lucide-react";

const WEBHOOK_URL = "https://n8n.digixpro.in/webhook/digixpro-sales-concierge";
const SESSION_STORAGE_KEY = "digixpro-sales-concierge-session";
const CHAT_HISTORY_STORAGE_KEY = "digixpro-sales-concierge-history";
const MAX_STORED_MESSAGES = 30;

type ChatMessage = {
  id: string;
  role: "visitor" | "assistant";
  text: string;
};

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

function MarkdownReply({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const [fullMatch, label, href] = match;
    parts.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-[#007a55] underline decoration-[#009E73]/50 underline-offset-2 hover:text-[#005f43] dark:text-[#16a34a] dark:hover:text-[#4ade80]"
      >
        {label}
      </a>,
    );
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

export default function SalesConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyReady, setHistoryReady] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedHistory: unknown = JSON.parse(
        window.localStorage.getItem(CHAT_HISTORY_STORAGE_KEY) ?? "[]",
      );

      if (Array.isArray(savedHistory)) {
        setMessages(savedHistory.filter(isChatMessage).slice(-MAX_STORED_MESSAGES));
      }
    } catch {
      window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
    } finally {
      setHistoryReady(true);
    }
  }, []);

  useEffect(() => {
    if (!historyReady) return;

    window.localStorage.setItem(
      CHAT_HISTORY_STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
    );
  }, [historyReady, messages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isSending]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const visitorMessage = draft.trim();
    if (!visitorMessage || isSending) return;

    const visitorEntry: ChatMessage = {
      id: `visitor-${Date.now()}`,
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
        id: `assistant-${Date.now()}`,
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

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[45] flex flex-col items-end md:bottom-6 md:left-auto md:right-6">
      {isOpen && (
        <section
          aria-label="DigiXPro Sales Concierge"
          className="mb-3 flex h-[min(35rem,calc(100dvh-8.5rem))] w-full max-w-[25rem] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/20 dark:border-neutral-800 dark:bg-[#101010] md:w-[25rem]"
        >
          <header className="flex items-start justify-between border-b border-neutral-200 px-4 py-3.5 dark:border-neutral-800">
            <div>
              <p className="text-sm font-bold text-[#0A0A0A] dark:text-white">DigiXPro Sales Concierge</p>
              <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                Discuss your systems, bottlenecks, and next step.
              </p>
              <p className="mt-1 text-[11px] font-medium leading-4 text-[#007a55] dark:text-[#4ade80]">
                Replies in your language: English · हिंदी · मराठी · தமிழ் · తెలుగు · ಕನ್ನಡ · മലയാളം
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="-mr-1 inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-[#0A0A0A] dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Close sales concierge"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4" aria-live="polite">
            {messages.length === 0 && (
              <p className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm leading-6 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                Share what needs to work better. The concierge can help identify the right advisory service and relevant production evidence.
              </p>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "visitor"
                    ? "ml-8 rounded-2xl rounded-br-md bg-[#009E73] px-3 py-2.5 text-sm leading-6 text-white"
                    : "mr-4 whitespace-pre-wrap rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2.5 text-sm leading-6 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                }
              >
                {message.role === "assistant" ? <MarkdownReply text={message.text} /> : message.text}
              </div>
            ))}

            {isSending && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                <LoaderCircle className="h-4 w-4 animate-spin text-[#009E73]" aria-hidden="true" />
                Thinking…
              </div>
            )}

            {error && <p className="px-1 text-xs leading-5 text-red-700 dark:text-red-400">{error}</p>}
            <div ref={messageEndRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t border-neutral-200 p-3 dark:border-neutral-800">
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
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0A0A0A] px-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-[#202020] focus-visible:-translate-y-0.5 dark:border dark:border-neutral-700 md:min-h-13"
        aria-expanded={isOpen}
        aria-controls="sales-concierge-message"
      >
        {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <MessageCircle className="h-4 w-4 text-[#16a34a]" aria-hidden="true" />}
        {isOpen ? "Close" : "Ask DigiXPro"}
      </button>
    </div>
  );
}
