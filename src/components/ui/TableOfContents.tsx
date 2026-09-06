"use client";

import React, { useState, useEffect } from "react";
import { ListFilter } from "lucide-react";

export interface TocItem {
  id: string;
  label?: string;
  text?: string;
  number?: string;
}

export interface TableOfContentsProps {
  items: TocItem[];
  variant?: "block" | "sticky";
  title?: string;
  className?: string;
  activeId?: string;
}

export default function TableOfContents({
  items,
  variant = "block",
  title = "On this page",
  className = "",
  activeId,
}: TableOfContentsProps) {
  const [currentActiveId, setCurrentActiveId] = useState<string>(activeId || items[0]?.id || "");

  useEffect(() => {
    if (variant !== "sticky") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setCurrentActiveId(items[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, variant]);

  if (variant === "sticky") {
    return (
      <nav
        className={`sticky top-0 z-30 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-xs ${className}`}
        aria-label="Table of contents navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar text-xs">
            <div className="font-plex-mono text-[11px] font-bold uppercase tracking-wider text-[#16a34a] flex items-center shrink-0 mr-2 pr-3 border-r border-neutral-200 dark:border-neutral-800">
              <ListFilter className="w-3.5 h-3.5 mr-1.5 shrink-0" aria-hidden="true" />
              <span>{title}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {items.map((item, idx) => {
                const isActive = currentActiveId === item.id;
                const displayNum = item.number || `0${idx + 1}`;
                const displayText = item.label || item.text || "";
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-plex-sans text-xs transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#16a34a]/10 text-[#16a34a] dark:text-[#16a34a] font-bold border border-[#16a34a]/20 shadow-xs"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <span className="font-plex-mono text-[10px] opacity-60">{displayNum}</span>
                    <span>{displayText}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Default "block" variant: Dotted-leader index style used across service pages
  return (
    <div className={`bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="font-plex-mono text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4 flex items-center">
        <ListFilter className="w-4 h-4 mr-2 shrink-0" aria-hidden="true" /> {title}
      </div>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-3.5">
        {items.map((sec, idx) => {
          const displayNum = sec.number || `0${idx + 1}`;
          const displayText = sec.label || sec.text || "";
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="flex items-baseline justify-between group text-xs text-neutral-700 dark:text-neutral-300 hover:text-[#16a34a] dark:hover:text-[#16a34a] font-medium transition-colors"
            >
              <span className="truncate pr-2">{displayText}</span>
              <span className="flex-1 mx-2 border-b border-dotted border-neutral-300 dark:border-neutral-700 relative -top-1" />
              <span className="font-plex-mono text-neutral-400 dark:text-neutral-500 text-[11px] shrink-0">
                {displayNum}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
