"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const WEBHOOK_URL = "https://n8n.digixpro.in/webhook/digixpro-sales-concierge";

const sessionId = () => {
  if (typeof window === "undefined") return "contact-callback";

  const key = "digixpro-callback-session";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const created = window.crypto?.randomUUID?.() ?? `callback-${Date.now()}`;
  window.localStorage.setItem(key, created);
  return created;
};

export default function CallbackRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!phone.trim() && !email.trim()) {
      setStatus("error");
      setError("Please provide a WhatsApp/contact number or email address.");
      return;
    }

    setStatus("sending");
    setError("");

    const visitorMessage = [
      `My name is ${name.trim()}.`,
      phone.trim() ? `WhatsApp/contact number: ${phone.trim()}.` : "",
      email.trim() ? `Email: ${email.trim()}.` : "",
      `Callback request: ${requirement.trim()}.`,
    ]
      .filter(Boolean)
      .join(" ");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_message: visitorMessage,
          session_id: sessionId(),
          page_url: window.location.href,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
    } catch {
      setStatus("error");
      setError("The request could not be sent. Please try again or book a call directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900/70 dark:bg-emerald-950/30">
        <CheckCircle2 className="mx-auto mb-3 h-7 w-7 text-[#009E73]" />
        <h3 className="text-lg font-extrabold text-black dark:text-white">Callback request received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          The DigiXPro team has been notified and will use the preferred contact method shared above.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="callback-name" className="mb-1.5 block text-sm font-bold text-black dark:text-white">
          Your name
        </label>
        <input
          id="callback-name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm text-black outline-none transition focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
          autoComplete="name"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="callback-phone" className="mb-1.5 block text-sm font-bold text-black dark:text-white">
            WhatsApp / contact number
          </label>
          <input
            id="callback-phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm text-black outline-none transition focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        <div>
          <label htmlFor="callback-email" className="mb-1.5 block text-sm font-bold text-black dark:text-white">
            Business email
          </label>
          <input
            id="callback-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm text-black outline-none transition focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            autoComplete="email"
          />
        </div>
      </div>

      <p className="-mt-2 text-xs text-neutral-500 dark:text-neutral-400">Share either a WhatsApp/contact number or an email address.</p>

      <div>
        <label htmlFor="callback-requirement" className="mb-1.5 block text-sm font-bold text-black dark:text-white">
          What would you like help with?
        </label>
        <textarea
          id="callback-requirement"
          name="requirement"
          required
          value={requirement}
          onChange={(event) => setRequirement(event.target.value)}
          rows={3}
          className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-3 text-sm text-black outline-none transition focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
        />
      </div>

      {status === "error" && <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#009E73] px-5 text-sm font-bold text-white transition hover:bg-[#008362] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending request…" : "Request a callback"}
        {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
      </button>
    </form>
  );
}
