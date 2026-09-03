"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, Info } from "lucide-react";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import FAQSchema from "@/components/seo/FAQSchema";
import {
  PRICING_RANGES,
  formatRange,
  UNIT_SUFFIX,
  type DisplayCurrency,
  type PricingCluster
} from "@/data/pricing";

// PHASE 24: canonical /pricing page. All figures come from
// src/data/pricing.ts (the single canonical pricing source — see that
// file's header comment for the authority-resolution reasoning). This
// component never hardcodes a number; it only formats what pricing.ts
// returns, so this page cannot silently drift from the canonical source.

const CURRENCIES: DisplayCurrency[] = ["INR", "USD", "GBP", "AUD", "SGD"];

const CLUSTERS: { key: PricingCluster; label: string; blurb: string; href: string }[] = [
  {
    key: "advisory",
    label: "Advisory",
    blurb: "Technology strategy, due diligence, and architecture decisions before you commit budget.",
    href: "/advisory"
  },
  {
    key: "design-build",
    label: "Design & Build",
    blurb: "Websites and web systems engineered for search visibility, conversion, and long-term growth.",
    href: "/design-services"
  },
  {
    key: "search-ai-automation",
    label: "Search, AI & Automation",
    blurb: "SEO, AI Search Optimization, and workflow automation that connect discoverability to operations.",
    href: "/search-automation"
  }
];

const PRICING_FAQS = [
  {
    question: "How does DigiXPro's pricing work?",
    answer:
      "Investment is driven by project scope, not a fixed package list. The ranges on this page are indicative — a starting reference for planning — not a quotation. An exact price requires establishing your actual scope, which the free Systems Audit or a scoping call does."
  },
  {
    question: "What's the difference between indicative investment and an exact quote?",
    answer:
      "Indicative investment is a realistic range based on comparable past engagements, useful for budgeting before you talk to anyone. An exact quote is a committed number tied to a specific, assessed scope — it only follows a diagnostic Audit or a scoping conversation, never a guess."
  },
  {
    question: "Is the Systems Audit free?",
    answer:
      "Yes — the diagnostic Systems Audit is complimentary. It's how we establish real scope before quoting, rather than quoting first and discovering the real problem later."
  },
  {
    question: "What actually changes the investment for my project?",
    answer:
      "Mainly: how custom the build needs to be versus template-based, how many systems and integrations are involved, the condition and size of any existing site or data being migrated, and any ongoing (monthly) requirements versus a one-time build."
  },
  {
    // PHASE 26 (Part 7 content gap): "what is included" was covered
    // implicitly by the scope-drivers section but had no direct FAQ answer.
    // Reuses the existing, already-approved framing from AuditClient.tsx's
    // pricing FAQ ("one-time build fee plus a small ongoing hosting/
    // maintenance cost") rather than inventing new inclusions.
    question: "What's typically included in the investment?",
    answer:
      "For a build (website, automation system, etc.), the investment is usually a one-time build fee plus a small ongoing hosting/maintenance cost - not a pure monthly subscription, unless you choose a template platform. For ongoing work (SEO, social media management, retainers), it's structured as a recurring monthly scope. Which structure applies depends on the service - the Audit or a scoping call confirms it for your specific case."
  },
  {
    question: "Can I get a fixed price without a scope assessment?",
    answer:
      "No — and we won't pretend to. A fixed number without knowing the real scope is a guess dressed up as a quote. The Audit or a short scoping call is what turns a range into a committed price."
  },
  {
    question: "Do you offer discounts or price-matching?",
    answer:
      "We don't price-match, because the number isn't the variable that matters — the scope is. A low-cost template site and a custom-engineered platform solve different problems, so the fair comparison is what each actually includes, not which quote is lower."
  }
];

function CurrencySwitcher({ currency, onChange }: { currency: DisplayCurrency; onChange: (c: DisplayCurrency) => void }) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 dark:border-neutral-800 dark:bg-neutral-900/50"
      role="group"
      aria-label="Display currency"
    >
      {CURRENCIES.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={currency === c}
          className={`min-h-9 rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
            currency === c
              ? "bg-[#0A0A0A] text-white dark:bg-white dark:text-black"
              : "text-neutral-600 hover:bg-white dark:text-neutral-400 dark:hover:bg-neutral-800"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default function PricingClient() {
  const [currency, setCurrency] = useState<DisplayCurrency>("INR");

  const rangesByCluster = (cluster: PricingCluster) => PRICING_RANGES.filter((r) => r.cluster === cluster || (cluster === "design-build" && r.cluster === "other"));

  return (
    <div className="min-h-screen bg-white pb-24 font-sans text-[#0A0A0A] transition-colors duration-200 selection:bg-[#16a34a]/20 dark:bg-[#0A0A0A] dark:text-neutral-100">
      {/* HERO */}
      <section className="mx-auto max-w-[1200px] border-b border-neutral-200 px-6 pb-16 pt-12 dark:border-neutral-800 md:pb-24 md:pt-20">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 dark:border-neutral-800 dark:bg-neutral-900">
            <span className="h-2 w-2 rounded-full bg-[#16a34a]"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
              Investment Guide
            </span>
          </div>
          <h1 className="mb-4 text-[36px] font-extrabold leading-tight text-black dark:text-white md:text-[48px]">
            Pricing &amp; Investment
          </h1>
          <p className="max-w-2xl text-[18px] font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
            Indicative investment ranges for every DigiXPro service, in your currency. Scope determines
            the exact number — this page shows what similar work has actually cost, so you can plan
            before a conversation, not instead of one.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CurrencySwitcher currency={currency} onChange={setCurrency} />
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              INR is canonical. Other currencies are fixed, rounded reference values — not live exchange rates.
            </span>
          </div>
        </div>
      </section>

      {/* HOW PRICING WORKS */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">
              How Pricing Works
            </div>
            <h2 className="mb-4 text-[28px] font-extrabold leading-tight text-black dark:text-white md:text-[36px]">
              Indicative investment, not a guess — and never an invented exact price
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="mb-4 flex items-center gap-2 text-[#16a34a]">
                <Info className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wide">Indicative Investment</span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                The ranges below reflect what comparable engagements have actually cost. Use them for
                budgeting and planning. They are a starting reference, not a commitment.
              </p>
            </div>
            <div className="rounded-3xl border-2 border-[#16a34a] bg-white p-8 shadow-md dark:bg-neutral-900">
              <div className="mb-4 flex items-center gap-2 text-[#16a34a]">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wide">Exact Quote</span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                A committed number follows a real scope assessment — a complimentary Systems Audit or a
                scoping call. We do not quote an exact price before we know what the project actually
                requires.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="mb-4 text-lg font-extrabold text-black dark:text-white">What changes the investment?</h3>
            <ul className="grid gap-3 text-sm text-neutral-600 dark:text-neutral-400 md:grid-cols-2">
              {[
                "How custom the build needs to be vs. template-based",
                "Number of systems and third-party integrations",
                "Condition and size of any existing site or data being migrated",
                "Custom functionality (e-commerce, portals, automation)",
                "Ongoing (monthly) requirements vs. a one-time build",
                "Content volume and how much needs to be authored, not just placed"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#16a34a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span>
                We don&apos;t expose internal hourly-rate calculations publicly, and we don&apos;t promise an
                exact ceiling before scope is known.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE SEGMENTS */}
      <section className="border-b border-neutral-200 py-16 dark:border-neutral-800 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">
              Service Segments
            </div>
            <h2 className="text-[28px] font-extrabold leading-tight text-black dark:text-white md:text-[36px]">
              Three segments, one architecture
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {CLUSTERS.map((cluster) => (
              <div
                key={cluster.key}
                className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm transition-all hover:border-[#16a34a] dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <div>
                  <h3 className="mb-3 text-xl font-extrabold text-black dark:text-white">{cluster.label}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{cluster.blurb}</p>
                </div>
                <Link
                  href={cluster.href}
                  className="inline-flex items-center border-t border-neutral-200 pt-4 text-xs font-bold text-[#16a34a] hover:underline dark:border-neutral-800"
                >
                  Explore {cluster.label} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING RANGES BY CLUSTER */}
      {CLUSTERS.map((cluster) => {
        const ranges = rangesByCluster(cluster.key);
        if (ranges.length === 0) return null;
        return (
          <section
            key={cluster.key}
            id={cluster.key}
            className="border-b border-neutral-200 py-16 dark:border-neutral-800 md:py-20"
          >
            <div className="mx-auto max-w-[1200px] px-6">
              <h2 className="mb-8 text-2xl font-extrabold text-black dark:text-white md:text-3xl">
                {cluster.label} — indicative investment
              </h2>
              {/* PHASE 24 (Part 12 mobile hardening): this previously sat
                  inside an `overflow-x-auto` wrapper with `min-w-[560px]`,
                  forcing desktop-width rows and a horizontal scrollbar even
                  though each card already stacks correctly on its own
                  (flex-col below `sm:`, flex-row at `sm:` and up) - found
                  live on a 375px viewport, where the label text was cut off
                  and required horizontal scrolling to read. Removed the
                  unnecessary width-forcing wrapper; the cards' own
                  responsive layout handles narrow viewports without it. */}
              <div className="space-y-3">
                {ranges.map((range) => (
                  <div
                    key={range.id}
                    className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-semibold text-black dark:text-white">{range.label}</span>
                    <span className="text-sm font-bold text-[#16a34a]">
                      {formatRange(range, currency)}
                      {UNIT_SUFFIX[range.unit]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <FAQSchema items={PRICING_FAQS} />
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#007a55] dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
              Pricing FAQ
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-black dark:text-white md:text-3xl">
              How Investment &amp; Quoting Works
            </h2>
          </div>
          <div className="space-y-4">
            {PRICING_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 md:p-6"
              >
                <summary className="cursor-pointer text-base font-bold text-black marker:content-none dark:text-white md:text-lg">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-6 pb-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-[#16a34a] bg-neutral-50 p-10 text-center dark:bg-neutral-900/50 md:p-16">
          <h2 className="text-2xl font-extrabold text-black dark:text-white md:text-3xl">
            Ready for an exact number?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            A complimentary Systems Audit establishes your real scope in a few minutes — the fastest way
            to turn an indicative range into a committed quote.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#16a34a] dark:bg-white dark:text-black dark:hover:bg-[#16a34a] dark:hover:text-white"
            >
              Start Free Systems Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-bold text-black transition-colors hover:border-[#16a34a] dark:border-neutral-700 dark:text-white"
            >
              Book a Scoping Call
            </Link>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}
