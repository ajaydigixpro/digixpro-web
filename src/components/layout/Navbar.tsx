"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export interface ServiceItem {
  title: string;
  href: string;
}

export interface ServiceCluster {
  id: string;
  name: string;
  slug: string;
  descriptor: string;
  services: ServiceItem[];
}

export const SERVICE_CLUSTERS: ServiceCluster[] = [
  {
    id: 'advisory',
    name: 'ADVISORY',
    slug: '/advisory',
    descriptor: 'Independent architecture, due diligence & technology leadership.',
    services: [
      { title: 'IT Consulting & Technology Strategy', href: '/advisory/it-consulting-technology-strategy' },
      { title: 'Technology Due Diligence & Vendor Evaluation', href: '/advisory/technology-due-diligence-vendor-evaluation' },
      { title: 'Digital Transformation Consulting', href: '/advisory/digital-transformation-consulting' },
      { title: 'Business Systems & Process Architecture', href: '/advisory/business-systems-process-architecture' },
      { title: 'Technology Roadmaps & Architecture', href: '/advisory/technology-roadmaps-architecture' },
      { title: 'Fractional CTO & Technology Leadership', href: '/advisory/fractional-cto-technology-leadership' },
    ],
  },
  {
    id: 'design-services',
    name: 'DESIGN & BUILD',
    slug: '/design-services',
    descriptor: 'High-performance Next.js websites, conversion UX & clean rebuilds.',
    services: [
      { title: 'Custom Business Website Design & Development', href: '/design-services/custom-business-website-design' },
      { title: 'Website Redesign & SEO-Safe Rebuild', href: '/design-services/website-redesign' },
      { title: 'Small Business & Service Business Websites', href: '/design-services/small-business-websites' },
      { title: 'Landing Page & Lead Generation Design', href: '/design-services/landing-page-lead-generation' },
      { title: 'Website UX & Conversion Optimization', href: '/design-services/website-conversion-optimization' },
      { title: 'SEO-Ready Website Engineering', href: '/design-services/seo-ready-website-engineering' },
    ],
  },
  {
    id: 'search-automation',
    name: 'SEARCH, AI & AUTOMATION',
    slug: '/search-automation',
    descriptor: 'SEO, Generative Engine Optimization & n8n workflow pipelines.',
    services: [
      { title: 'SEO & Search Visibility', href: '/search-automation/seo-search-visibility' },
      { title: 'AI Search Optimization & GEO', href: '/search-automation/ai-search-optimization-geo' },
      { title: 'Local SEO & Local Lead Visibility', href: '/search-automation/local-seo-lead-visibility' },
      { title: 'Social Media Management & Content Systems', href: '/search-automation/social-media-management' },
      { title: 'Workflow & AI Automation', href: '/search-automation/workflow-ai-automation' },
      { title: 'Lead Capture, CRM & Sales Automation', href: '/search-automation/lead-capture-crm-sales-automation' },
    ],
  },
];

export const PRIMARY_NAV_LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/audit', label: 'Audit' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/founder', label: 'Founder' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openMobileClusters, setOpenMobileClusters] = useState<Record<string, boolean>>({
    advisory: true,
    'design-services': true,
    'search-automation': true,
  });
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Scroll indicator
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle click outside and Escape key to close desktop mega-menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isServicesOpen]);

  const isServicesActive =
    pathname.startsWith('/advisory') ||
    pathname.startsWith('/design-services') ||
    pathname.startsWith('/search-automation');

  const toggleMobileCluster = (clusterId: string) => {
    setOpenMobileClusters((prev) => ({
      ...prev,
      [clusterId]: !prev[clusterId],
    }));
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={`border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md z-50 transition-shadow duration-200 ${
        isScrolled ? 'shadow-md shadow-black/5 dark:shadow-black/20' : 'shadow-none'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center space-x-2 shrink-0 mr-4" aria-label="DigiXPro — Go to homepage">
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
        <div className="hidden xl:flex items-center space-x-6 text-[14px] font-bold" role="menubar">
          {/* Services Mega-Menu Trigger */}
          <div className="relative">
            <button
              type="button"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isServicesOpen}
              aria-controls="services-mega-menu"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`inline-flex items-center gap-1 whitespace-nowrap transition-colors relative pb-0.5 ${
                isServicesActive || isServicesOpen
                  ? 'text-black dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#009E73] after:rounded-full'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-[#009E73]' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Primary Top-Level Links */}
          {PRIMARY_NAV_LINKS.map(({ href, label }) => {
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
        <div className="hidden xl:flex items-center space-x-4 shrink-0">
          <ThemeToggle />
          <Link
            href="/contact"
            className="whitespace-nowrap shrink-0 inline-flex items-center justify-center px-4.5 py-2.5 bg-[#009E73] text-white font-bold text-[13px] rounded-xl hover:bg-[#007a55] shadow-xs hover:shadow transition-all"
          >
            Book a Call
          </Link>
        </div>

        {/* MOBILE MENU BUTTON & THEME TOGGLE */}
        <div className="flex xl:hidden items-center space-x-3">
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

      {/* DESKTOP SERVICES MEGA MENU DROPDOWN */}
      {isServicesOpen && (
        <div
          id="services-mega-menu"
          role="region"
          aria-label="Services exploration menu"
          className="hidden xl:block absolute top-full left-0 w-full bg-white dark:bg-[#0E0E0E] border-b border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-black/10 dark:shadow-black/40 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8 divide-x divide-neutral-100 dark:divide-neutral-800/80">
              {SERVICE_CLUSTERS.map((cluster, colIdx) => (
                <div key={cluster.id} className={colIdx > 0 ? 'pl-8' : ''}>
                  {/* Cluster Header */}
                  <div className="mb-4">
                    <Link
                      href={cluster.slug}
                      onClick={() => setIsServicesOpen(false)}
                      className="group inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#009E73] hover:text-[#007a55] transition-colors"
                    >
                      <span>{cluster.name}</span>
                      <span className="text-[13px] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
                    </Link>
                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                      {cluster.descriptor}
                    </p>
                  </div>

                  {/* 6 Canonical Services */}
                  <ul className="space-y-1" role="list">
                    {cluster.services.map((service) => {
                      const isServiceActive = pathname === service.href;
                      return (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={() => setIsServicesOpen(false)}
                            className={`block py-1.5 px-2.5 rounded-lg text-[13px] transition-colors ${
                              isServiceActive
                                ? 'text-[#009E73] font-bold bg-[#009E73]/10'
                                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 font-medium'
                            }`}
                          >
                            {service.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* View Cluster Link */}
                  <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                    <Link
                      href={cluster.slug}
                      onClick={() => setIsServicesOpen(false)}
                      className="inline-flex items-center text-[12px] font-bold text-[#009E73] hover:text-[#007a55] transition-colors group"
                    >
                      <span>
                        View {cluster.name === 'ADVISORY' ? 'Advisory' : cluster.name === 'DESIGN & BUILD' ? 'Design & Build' : 'Search, AI & Automation'}
                      </span>
                      <span className="ml-1 text-[13px] group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU DROPDOWN */}
      <div
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`xl:hidden bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 px-6 overflow-y-auto transition-all duration-200 ${
          isMobileMenuOpen ? 'py-5 max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
        } flex flex-col space-y-4 shadow-xl absolute w-full left-0 top-20`}
      >
        {/* Services Accordion Trigger */}
        <div className="border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <button
            type="button"
            onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
            className="w-full flex items-center justify-between text-[16px] font-bold text-neutral-800 dark:text-neutral-200 py-1"
            aria-expanded={isMobileServicesExpanded}
          >
            <span className={isServicesActive ? 'text-[#009E73]' : ''}>Services (18)</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${isMobileServicesExpanded ? 'rotate-180 text-[#009E73]' : ''}`}
            />
          </button>

          {/* Collapsible Cluster Sections */}
          {isMobileServicesExpanded && (
            <div className="mt-3 pl-2 space-y-4 border-l-2 border-[#009E73]/30">
              {SERVICE_CLUSTERS.map((cluster) => {
                const isClusterOpen = openMobileClusters[cluster.id];
                return (
                  <div key={cluster.id} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileCluster(cluster.id)}
                      className="w-full flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#009E73] py-1"
                    >
                      <span>{cluster.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isClusterOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isClusterOpen && (
                      <ul className="space-y-1.5 pl-2" role="list">
                        {cluster.services.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1 text-[13px] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-1">
                          <Link
                            href={cluster.slug}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-flex items-center text-[12px] font-bold text-[#009E73] hover:underline"
                          >
                            <span>Explore {cluster.name} Hub</span>
                            <ChevronRight size={12} className="ml-0.5" />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Primary Nav Links */}
        {PRIMARY_NAV_LINKS.map(({ href, label }) => {
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

        {/* Primary Mobile CTA Button */}
        <div className="pt-3 pb-2 border-t border-neutral-100 dark:border-neutral-800">
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
