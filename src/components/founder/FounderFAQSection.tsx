"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import FAQSchema from "@/components/seo/FAQSchema";

export const FOUNDER_FAQS = [
  {
    question: "Who is Dr. Ajay Shukla?",
    answer: "Dr. Ajay Shukla (डॉ. अजय शुक्ल — विद्या वाचस्पति) is the Founder and Lead Technology Architect at DigiXPro Digital Solution, bringing extensive experience in technology consulting, systems architecture, digital transformation, and business operating systems.",
  },
  {
    question: "What role does a technology consultant play for a growing business?",
    answer: "A technology consultant provides independent, vendor-neutral advisory to help organizations align software investments with operational realities, eliminate workflow bottlenecks, design scalable system architectures, and prevent costly technical debt.",
  },
  {
    question: "What is Dr. Ajay Shukla's background in IT consulting?",
    answer: "Dr. Ajay Shukla specializes in business operating system design, enterprise architecture, custom web platform engineering, and workflow automation, guiding founders and leadership teams from operational chaos to technical clarity.",
  },
  {
    question: "What is independent technology advisory?",
    answer: "Independent technology advisory means providing recommendations based purely on business requirements and technical merit, free from vendor commissions, software resale bias, or pre-packaged template constraints.",
  },
  {
    question: "How does Dr. Ajay Shukla approach enterprise digital transformation?",
    answer: "The approach follows a strict architecture hierarchy—evaluating Business, People, Process, Information, and Automation before selecting Technology or writing Software code.",
  },
  {
    question: "What types of organizations consult with Dr. Ajay Shukla?",
    answer: "Advisory services cater to growing mid-market enterprises, B2B companies, service organizations, and founders seeking strategic technical oversight, legacy modernization, or custom operating platform design.",
  },
  {
    question: "What voluntary initiatives is Dr. Ajay Shukla involved in?",
    answer: "Beyond enterprise consulting, Dr. Ajay Shukla actively supports Sanatan Gurukul initiatives, serving on the core team at Nirvandham Online Gurukul, teaching at gyanmarg.guru, advising Yuj Foundation, and editing Muktibodh e-Magazine.",
  },
  {
    question: "How can I book a strategic consultation with Dr. Ajay Shukla?",
    answer: "Founders and executive leaders can schedule a direct 30-minute discovery consultation through our [contact page](/contact) to evaluate their operational bottlenecks and system architecture needs.",
  },
  {
    question: "Does Dr. Ajay Shukla handle project implementation directly?",
    answer: "Dr. Ajay Shukla provides high-level architectural oversight and strategic direction, while the dedicated DigiXPro engineering studio handles hands-on development, testing, and rollout.",
  },
  {
    question: "What does it cost to engage DigiXPro for technology consulting?",
    answer: "Advisory and engineering packages are structured around project scope, architectural depth, and ongoing advisory requirements. Scoped tier details are available on our [pricing page](/pricing).",
  },
];

export default function FounderFAQSection() {
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
          className="text-[#009E73] dark:text-[#4ade80] font-semibold underline hover:text-[#007a5a] transition"
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
      <FAQSchema items={FOUNDER_FAQS} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#007a55] dark:text-[#4ade80] text-xs font-mono font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full inline-block mb-3">
            Advisory &amp; Consulting FAQ
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Frequently Asked Questions About Advisory &amp; Leadership
          </h2>
        </div>

        <div className="space-y-4">
          {FOUNDER_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-base md:text-lg text-black dark:text-white hover:text-[#009E73] dark:hover:text-[#4ade80] transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#009E73]" : ""
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
