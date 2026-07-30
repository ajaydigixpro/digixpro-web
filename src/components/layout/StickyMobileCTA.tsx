"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * StickyMobileCTA — a slim, unobtrusive sticky bottom bar for mobile.
 * - Only visible on mobile (hidden on md+)
 * - Appears after scrolling past 300px (so it doesn't show immediately on short pages)
 * - Dignified styling: matches site palette, no aggressive pulse/animation
 * - No manipulation: no countdown, no fake scarcity
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A] border-t border-neutral-800 px-4 py-3 flex items-center justify-between gap-3"
      role="complementary"
      aria-label="Book a discovery call"
    >
      <p className="text-white text-[13px] font-semibold leading-tight truncate">
        Ready to discuss your architecture?
      </p>
      <Link
        href="/contact"
        className="shrink-0 inline-flex items-center justify-center bg-[#009E73] text-white font-bold text-[13px] rounded-lg px-4 py-2.5 hover:bg-[#007a5a] transition-colors min-h-[44px]"
        aria-label="Request a 30-minute discovery call"
      >
        Book Call <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
