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

const CURRENCIES: DisplayCurrency[] = ["INR", "USD", "GBP", "AUD", "SGD"];

const CLUSTERS: { key: PricingCluster; label: string; blurb: string; href: string }[] = [
  {
    key: "advisory",
    label: "Advisory",
    blurb: "Technology strategy, due diligence, IT consulting cost evaluation, and architecture decisions before you commit budget.",
    href: "/advisory"
  },
  {
    key: "design-build",
    label: "Design & Build",
    blurb: "Websites and web systems engineered for search visibility, conversion, and realistic website development cost India planning.",
    href: "/design-services"
  },
  {
    key: "search-ai-automation",
    label: "Search, AI & Automation",
    blurb: "SEO pricing India, AI Search Optimization, and workflow automation cost structures that connect discoverability to operations.",
    href: "/search-automation"
  }
];

const PRICING_FAQS = [
  {
    question: "How does DigiXPro structure pricing across Advisory, Design & Build, and Search/AI/Automation services?",
    answer:
      "DigiXPro engagements are structured around clear, fixed project scopes or transparent monthly retainers based on your exact business requirements. We establish predictable investment parameters before work begins, avoiding unpredictable hourly billing spikes."
  },
  {
    question: "What currencies are supported for international client invoices?",
    answer:
      "DigiXPro supports multi-currency billing in INR, USD, GBP, AUD, and SGD. INR is our canonical base currency, while other currencies are presented as fixed reference values for international budgeting clarity."
  },
  {
    question: "Why does DigiXPro publish indicative investment ranges instead of hiding prices behind sales calls?",
    answer:
      "We publish indicative investment ranges to provide transparent budgeting expectations upfront, helping clients evaluate commercial feasibility before scheduling a discovery audit."
  },
  {
    question: "How much does a standard business website vs a custom Next.js web application cost?",
    answer:
      "Standard service business websites range from ₹90,000 to ₹230,000 ($1,050 to $2,700), while complex decoupled Next.js web applications with custom API integrations range from ₹300,000 to ₹1,150,000 ($3,500 to $13,500)."
  },
  {
    question: "What are the pricing ranges for ongoing SEO and search visibility campaigns in India?",
    answer:
      "Focused local SEO campaigns range from ₹25,000 to ₹60,000/month ($300 to $700/mo), while competitive multi-location organic search authority campaigns range from ₹60,000 to ₹125,000/month ($700 to $1,500/mo)."
  },
  {
    question: "How much does Fractional CTO or hourly IT consulting cost?",
    answer:
      "Hourly IT consulting and architecture advisory ranges from ₹3,500 to ₹6,500/hour ($40 to $75/hr). Fractional CTO executive retainers and fixed-scope technology audits range from ₹190,000 to ₹1,400,000 ($2,200 to $16,500)."
  },
  {
    question: "What payment milestones and billing terms apply to DigiXPro engagements?",
    answer:
      "Fixed-scope projects typically follow a 50% deposit and 50% launch milestone schedule. Monthly retainers are billed at the beginning of each performance billing period."
  },
  {
    question: "Can a project be customized if our requirements fall between published pricing tiers?",
    answer:
      "Yes. We tailor project scopes to match exact technical requirements. Schedule a 30-minute Architecture Call to define custom multi-service deliverables."
  },
  {
    question: "What factors cause project investment to vary within the published pricing ranges?",
    answer:
      "Investment varies based on specific scope drivers—such as total page count, custom interactive components, third-party API webhooks, multi-currency features, and legacy database migration requirements."
  },
  {
    question: "Are there any hidden recurring platform fees or maintenance costs after website launch?",
    answer:
      "No. DigiXPro operates with 100% pricing transparency. All custom web builds deliver complete source code ownership with zero recurring platform licensing fees or mandatory maintenance charges."
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
              Commercial Investment Guide
            </span>
          </div>
          <h1 className="mb-4 text-[36px] font-extrabold leading-tight text-black dark:text-white md:text-[48px]">
            Digital Services Pricing &amp; Investment Guide in India
          </h1>
          <p className="max-w-2xl text-[18px] font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
            Indicative investment ranges for every DigiXPro service, in your currency. Understand website development cost India, SEO pricing India, IT consulting rates, and workflow automation cost before a scoping conversation.
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
              How DigiXPro Investment Works
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
                budgeting digixpro pricing and digital services pricing in India. They are a starting reference, not a commitment.
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
            <h3 className="mb-4 text-lg font-extrabold text-black dark:text-white">What determines project investment &amp; service cost?</h3>
            <ul className="grid gap-3 text-sm text-neutral-600 dark:text-neutral-400 md:grid-cols-2">
              {[
                "Custom web build complexity vs template-based sites (affects website development cost India)",
                "Competitive market scope and target geography (affects SEO pricing India)",
                "Senior advisory scope, hourly review vs project audit (affects IT consulting rates & IT consulting cost)",
                "Executive oversight and technology strategy depth (affects fractional CTO cost & fractional CTO hourly rate)",
                "System integration, webhooks, and n8n pipelines (affects workflow automation cost)",
                "Lead routing logic, CRM synchronization, and WhatsApp rules (affects CRM automation pricing)"
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
              Three service segments, one architecture
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
                {cluster.label} — service investment ranges &amp; indicative costs
              </h2>
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
              Pricing &amp; Investment FAQ
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-black dark:text-white md:text-3xl">
              Buyer Questions About Investment &amp; Quoting
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
            Ready for an exact project estimate?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            A complimentary Systems Audit establishes your real scope in a few minutes — the fastest way
            to turn an indicative range into a committed quote.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#009E73] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#007a55] shadow-md min-h-[48px]"
            >
              Start Free Systems Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] dark:bg-white px-6 py-3.5 text-sm font-bold text-white dark:text-black transition-colors hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white shadow-sm min-h-[48px]"
            >
              Book a 30-Minute Architecture Call
            </Link>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}
