"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

const WEBHOOK_URL = "https://n8n.digixpro.in/webhook/digixpro-sales-concierge";

const sessionId = () => {
  if (typeof window === "undefined") return "contact-callback";
  const key = "digixpro-callback-session";
  try {
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    const created = window.crypto?.randomUUID?.() ?? `callback-${Date.now()}`;
    window.localStorage.setItem(key, created);
    return created;
  } catch {
    return `callback-${Date.now()}`;
  }
};

export default function CallbackRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleReset() {
    setName("");
    setPhone("");
    setEmail("");
    setRequirement("");
    setStatus("idle");
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setStatus("error");
      setError("Please provide your name so DigiXPro can confirm who to address.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setStatus("error");
      setError("Add a WhatsApp/contact number or business email so the team can respond.");
      return;
    }
    if (!requirement.trim()) {
      setStatus("error");
      setError("Please briefly describe the context or decision you'd like help with.");
      return;
    }

    setStatus("sending");
    setError("");
    const visitorMessage = [
      `My name is ${name.trim()}.`,
      phone.trim() ? `WhatsApp/contact number: ${phone.trim()}.` : "",
      email.trim() ? `Email: ${email.trim()}.` : "",
      `Callback request: ${requirement.trim()}.`,
    ].filter(Boolean).join(" ");

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
      setError("The request could not be sent. Please try again or book a conversation directly.");
    }
  }

  if (status === "success") {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 text-center dark:border-emerald-900/70 dark:bg-emerald-950/30 my-auto min-h-[360px]"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 mb-4">
          <CheckCircle2 className="h-8 w-8 text-[#009E73]" />
        </div>
        <h4 className="text-xl font-extrabold text-black dark:text-white">Callback request received.</h4>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          The DigiXPro team has been notified with your context and will reach out via your preferred contact method shortly.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2 hover:bg-white dark:hover:bg-neutral-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="callback-name" className="mb-1.5 block text-sm font-extrabold text-black dark:text-white">
          Your name
        </label>
        <input 
          id="callback-name" 
          name="name" 
          required 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          placeholder="How should the team address you?" 
          className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white" 
          autoComplete="name" 
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="callback-phone" className="mb-1.5 block text-sm font-extrabold text-black dark:text-white">
            WhatsApp / contact number <span className="font-normal text-neutral-500 text-xs">(optional)</span>
          </label>
          <input 
            id="callback-phone" 
            name="phone" 
            type="tel" 
            value={phone} 
            onChange={(event) => setPhone(event.target.value)} 
            placeholder="Preferred callback number" 
            className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white" 
            autoComplete="tel" 
            inputMode="tel" 
            aria-describedby="callback-contact-note" 
          />
        </div>
        <div>
          <label htmlFor="callback-email" className="mb-1.5 block text-sm font-extrabold text-black dark:text-white">
            Business email <span className="font-normal text-neutral-500 text-xs">(optional)</span>
          </label>
          <input 
            id="callback-email" 
            name="email" 
            type="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            placeholder="name@company.com" 
            className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white" 
            autoComplete="email" 
            aria-describedby="callback-contact-note" 
          />
        </div>
      </div>

      <p id="callback-contact-note" className="rounded-xl bg-neutral-50 dark:bg-neutral-950 px-3.5 py-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-800">
        One contact method is enough. WhatsApp is useful when a quick conversation is easier than email.
      </p>

      <div>
        <label htmlFor="callback-requirement" className="mb-1.5 block text-sm font-extrabold text-black dark:text-white">
          What would you like help with?
        </label>
        <textarea 
          id="callback-requirement" 
          name="requirement" 
          required 
          value={requirement} 
          onChange={(event) => setRequirement(event.target.value)} 
          placeholder="For example: evaluating ERP vs CRM architecture, or redesigning an e-commerce platform without losing SEO." 
          rows={3} 
          className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-black outline-none transition placeholder:text-neutral-400 focus:border-[#009E73] focus:ring-2 focus:ring-[#009E73]/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white" 
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button 
        type="submit" 
        disabled={status === "sending"} 
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#009E73] px-5 text-sm font-extrabold text-white transition hover:bg-[#008362] disabled:cursor-not-allowed disabled:opacity-70 shadow-sm"
      >
        {status === "sending" ? "Sending request…" : "Request a callback"}
        {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
      </button>
    </form>
  );
}
