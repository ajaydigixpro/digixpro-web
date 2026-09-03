"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

// PHASE 25 (Part 5/6 funnel gap): /pricing (Phase 24's canonical Investment
// Guide) had zero inbound links anywhere on the site, including here - the
// single highest-leverage fix for the funnel's missing "Investment Context"
// step, since this nav renders on every page.
// PHASE 26 (Part 20 discoverability): /search-automation - one of the 3
// canonical service clusters - was entirely absent from primary nav (site
// reachable only via homepage cards/sitemap), while the other two clusters
// (Advisory, Design Services) were already present. Added for parity, not
// as a new/4th cluster.
const navLinks = [
  { href: '/advisory', label: 'Advisory' },
  { href: '/design-services', label: 'Design Services' },
  { href: '/search-automation', label: 'Search & Automation' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/audit', label: 'Audit' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/founder', label: 'Founder' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md z-50 transition-shadow duration-200 ${
        isScrolled ? 'shadow-md shadow-black/5 dark:shadow-black/20' : 'shadow-none'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center space-x-2" aria-label="DigiXPro — Go to homepage">
          <Image 
            src="/transparent_logo.png"
            alt="DigiXPro Logo" 
            width={160}
            height={31} 
            className="h-9 w-auto object-contain dark:invert"
            priority
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        {/* PHASE 25 (Part 18 mobile/tablet hardening): switched from md:
            (768px) to lg: (1024px) - 768px (a real device width: iPad Mini
            portrait) was already too narrow even before Phase 25's own
            "Pricing" addition.
            PHASE 26 (Part 20/21 hardening): switched lg: (1024px) -> xl:
            (1280px). Adding a 9th item ("Search & Automation") for
            discoverability, even after tightening gaps and adding
            whitespace-nowrap, produced a MEASURED (DOM scrollWidth vs
            clientWidth) 79px horizontal overflow at 1024px that pushed the
            "Request a Call" CTA off-screen. Same fix philosophy as Phase 25:
            a real device width (1024px = iPad landscape) that can't fit a
            9-item desktop nav cleanly gets the working mobile-menu instead
            of a cramped/overflowing one. All 4 of this file's
            lg:/hidden lg: pairs now move together to xl:/hidden xl:, so
            mobile-menu mode covers 768-1279px. */}
        <div className="hidden xl:flex items-center space-x-6 text-[14px] font-bold" role="menubar">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                role="menuitem"
                className={`whitespace-nowrap transition-colors relative pb-0.5 ${
                  isActive
                    ? 'text-black dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#009E73] after:rounded-full'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP TOGGLES & CTA */}
        <div className="hidden xl:flex items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#009E73] text-white font-bold text-[13px] rounded-xl hover:bg-[#007a55] shadow-sm hover:shadow transition-all"
          >
            Book a Call
          </Link>
        </div>

        {/* MOBILE MENU BUTTON & TOGGLES */}
        <div className="flex xl:hidden items-center space-x-3">
          <LanguageToggle />
          <ThemeToggle />
          <button 
            className="p-2 text-neutral-600 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`xl:hidden bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 px-6 overflow-hidden transition-all duration-200 ${
          isMobileMenuOpen ? 'py-4 max-h-96 opacity-100' : 'max-h-0 py-0 opacity-0'
        } flex flex-col space-y-4 shadow-lg absolute w-full left-0 top-20`}
      >
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-[16px] font-bold transition-colors ${
                isActive ? 'text-[#009E73]' : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <LanguageToggle />
        </div>
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center px-5 py-3.5 bg-[#009E73] text-white font-bold text-[15px] rounded-xl hover:bg-[#007a55] transition-colors shadow-sm"
          >
            Book a 30-Minute Architecture Call
          </Link>
        </div>
      </div>
    </nav>
  );
}
