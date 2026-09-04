"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import FAQSchema from "@/components/seo/FAQSchema";

export const HOW_WE_WORK_FAQS = [
  {
    question: "What is the web development process?",
    answer: "The web development process is a structured technical methodology for building a website. It spans initial discovery, operational mapping, systems architecture, frontend and backend development, quality assurance testing, and production deployment.",
  },
  {
    question: "What are the steps in the website design process?",
    answer: "The website design process steps include wireframing layout structure, defining brand design systems, creating responsive desktop and mobile UI mockups, drafting conversion copy, and prototyping interactive interface components.",
  },
  {
    question: "What are the steps in the web development process?",
    answer: "The web development process steps consist of 7 sequential phases: Discovery & Strategy, Process Mapping, Systems Architecture, Stack Selection, Custom Frontend/Backend Development, Quality Assurance Testing, and Deployment with Post-Launch Support.",
  },
  {
    question: "What is the difference between website design and web development?",
    answer: "Website design focuses on visual aesthetics, UI layout, user experience, brand identity, and interface interactions. Web development focuses on writing the underlying code, database architecture, server integration, performance optimization, and functional logic.",
  },
  {
    question: "How does the website design and development process work?",
    answer: "The website design and development process works by aligning business objectives with technical execution—moving from diagnostic discovery and design wireframes to custom engineering, performance optimization, and post-launch maintenance.",
  },
];

export default function HowWeWorkFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAnswerWithLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <Link
          key={match.index}
          href={url}
          className="text-[#16a34a] font-semibold underline hover:text-[#15803d] transition"
        >
          {label}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  return (
    <section className="py-24 max-w-[1200px] mx-auto px-6 border-t border-neutral-200 dark:border-neutral-800">
      <FAQSchema items={HOW_WE_WORK_FAQS} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#16a34a] text-xs font-mono font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full inline-block mb-3">
            Process &amp; Execution FAQ
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Frequently Asked Questions About Our Development Process
          </h2>
        </div>

        <div className="space-y-4">
          {HOW_WE_WORK_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-base md:text-lg text-black dark:text-white hover:text-[#16a34a] dark:hover:text-[#16a34a] transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#16a34a]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium border-t border-neutral-100 dark:border-neutral-800/80 pt-4">
                    {renderAnswerWithLinks(faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
