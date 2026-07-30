import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[#0A0A0A] text-white pt-20 pb-8 px-6 overflow-hidden mt-auto">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Section: Primary Discovery Call CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-16 mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.1] mb-4 text-white tracking-tight">
              Ready to make your next technology decision?
            </h2>
            <p className="text-[18px] text-neutral-400 font-medium">
              One architecture decision today can prevent months of rebuilding tomorrow.
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="shrink-0">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-black font-bold text-[15px] rounded-xl hover:bg-[#009E73] hover:text-white transition-colors transition-transform shadow-lg hover:scale-105"
            >
              Request a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Middle Section: Giant DigiXPro Logo & Positioning */}
        <div className="mb-10">
          <Link href="/" aria-label="DigiXPro — Back to homepage" className="inline-block text-[18vw] md:text-[160px] font-extrabold tracking-tighter leading-none text-white hover:text-neutral-300 transition-colors select-none">
            DigiXPro<span className="text-[#009E73]" aria-hidden="true">.</span>
          </Link>
          <p className="text-[14px] md:text-[16px] font-mono text-neutral-400 uppercase tracking-widest mt-2">
            Independent Technology Architecture Advisory
          </p>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[14px] text-neutral-500 font-medium">
          <div>© {new Date().getFullYear()} DigiXPro. All rights reserved.</div>
          
          <nav aria-label="Social media links" className="flex items-center space-x-3">
            <a 
              href="https://www.linkedin.com/company/digixpro/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="DigiXPro on LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
            <span className="text-neutral-700" aria-hidden="true">&middot;</span>
            <a 
              href="https://www.facebook.com/digixprodigitalsolution" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="DigiXPro on Facebook (opens in new tab)"
            >
              Facebook
            </a>
          </nav>
        </div>

      </div>
    </footer>
  );
}