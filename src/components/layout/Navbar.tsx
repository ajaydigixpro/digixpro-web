"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/advisory', label: 'Advisory' },
  { href: '/design-services', label: 'Design Services' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/studio', label: 'Studio' },
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
            src="/logo.svg?v=2"
            alt="DigiXPro Logo" 
            width={160} 
            height={40} 
            className="h-9 w-auto object-contain dark:invert"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center space-x-8 text-[14px] font-bold" role="menubar">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                role="menuitem"
                className={`transition-colors relative pb-0.5 ${
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
        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[13px] rounded-lg hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white transition-colors"
          >
            Request a Call
          </Link>
        </div>

        {/* MOBILE MENU BUTTON & TOGGLES */}
        <div className="flex md:hidden items-center space-x-3">
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
        className={`md:hidden bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 px-6 overflow-hidden transition-all duration-200 ${
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
            className="block text-center px-5 py-3 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-lg hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white transition-colors"
          >
            Request a Call
          </Link>
        </div>
      </div>
    </nav>
  );
}
