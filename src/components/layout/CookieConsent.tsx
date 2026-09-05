"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("digixpro_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("digixpro_cookie_consent", "accepted");
    window.dispatchEvent(new Event("digixpro-cookie-consent-updated"));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("digixpro_cookie_consent", "declined");
    window.dispatchEvent(new Event("digixpro-cookie-consent-updated"));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie Preference"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[90] bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800/80">
            <Cookie className="w-4 h-4 text-[#009E73]" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Privacy &amp; Cookie Notice
          </span>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close cookie consent banner"
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
        This website uses cookies. Learn more in our{" "}
        <Link
          href="/privacy-policy"
          className="text-[#009E73] font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
        <button
          onClick={handleDecline}
          className="px-3.5 py-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-xl transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 text-xs font-bold text-white bg-[#009E73] hover:bg-[#007a55] rounded-xl shadow-xs transition-all"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
