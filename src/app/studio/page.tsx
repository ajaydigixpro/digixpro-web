"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between p-6 md:p-12">
      <header className="flex items-center justify-between border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to DigiXPro
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            DigiXPro<span className="text-[#009E73]">.</span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#009E73] bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            Studio
          </span>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-center py-20">
        <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-[#009E73]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
            Design Systems &amp; Web Architecture
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          DigiXPro Studio
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          High-performance modern web platforms, enduring brand identities, and integrated campaign creative systems.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#009E73] hover:bg-[#007a5a] text-white font-bold text-[15px] rounded-xl transition shadow-md"
          >
            Scope a Project <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            href="/design-services"
            className="inline-flex items-center justify-center px-6 py-4 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 font-bold text-[15px] rounded-xl transition"
          >
            Explore Design Services
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-800 pt-6 text-center text-xs font-mono text-neutral-500">
        © {new Date().getFullYear()} DigiXPro Studio. All rights reserved.
      </footer>
    </main>
  );
}
