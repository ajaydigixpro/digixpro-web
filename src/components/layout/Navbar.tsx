"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Compass,
  ShieldCheck,
  Cpu,
  Layers,
  Milestone,
  UserCheck,
  Code2,
  RefreshCw,
  Store,
  Layout,
  Zap,
  Lock,
  Search,
  Sparkles,
  MapPin,
  Share2,
  Workflow,
  Database,
  Award,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export interface ServiceItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface ServiceCluster {
  id: string;
  name: string;
  slug: string;
  descriptor: string;
  icon: LucideIcon;
  services: ServiceItem[];
}

export const SERVICE_CLUSTERS: ServiceCluster[] = [
  {
    id: 'advisory',
    name: 'ADVISORY',
    slug: '/advisory',
    descriptor: 'Independent architecture, due diligence & technology leadership.',
    icon: Compass,
    services: [
      { title: 'IT Consulting & Technology Strategy', href: '/advisory/it-consulting-technology-strategy', icon: Compass },
      { title: 'Technology Due Diligence & Vendor Evaluation', href: '/advisory/technology-due-diligence-vendor-evaluation', icon: ShieldCheck },
      { title: 'Digital Transformation Consulting', href: '/advisory/digital-transformation-consulting', icon: Cpu },
      { title: 'Business Systems & Process Architecture', href: '/advisory/business-systems-process-architecture', icon: Layers },
      { title: 'Technology Roadmaps & Architecture', href: '/advisory/technology-roadmaps-architecture', icon: Milestone },
      { title: 'Fractional CTO & Technology Leadership', href: '/advisory/fractional-cto-technology-leadership', icon: UserCheck },
    ],
  },
  {
    id: 'design-services',
    name: 'DESIGN & BUILD',
    slug: '/design-services',
    descriptor: 'High-performance Next.js websites, conversion UX & clean rebuilds.',
    icon: Code2,
    services: [
      { title: 'Custom Business Website Design', href: '/design-services/custom-business-website-design', icon: Code2 },
      { title: 'Website Redesign & SEO-Safe Rebuild', href: '/design-services/website-redesign', icon: RefreshCw },
      { title: 'Small Business Web Systems', href: '/design-services/small-business-websites', icon: Store },
      { title: 'Landing Page & Lead Generation Design', href: '/design-services/landing-page-lead-generation', icon: Layout },
      { title: 'Website UX & Conversion Optimization', href: '/design-services/website-conversion-optimization', icon: Zap },
      { title: 'SEO-Ready Website Engineering', href: '/design-services/seo-ready-website-engineering', icon: Lock },
    ],
  },
  {
    id: 'search-automation',
    name: 'SEARCH, AI & AUTOMATION',
    slug: '/search-automation',
    descriptor: 'SEO, Generative Engine Optimization & n8n workflow pipelines.',
    icon: Search,
    services: [
      { title: 'SEO & Search Visibility', href: '/search-automation/seo-search-visibility', icon: Search },
      { title: 'AI Search Optimization & GEO', href: '/search-automation/ai-search-optimization-geo', icon: Sparkles },
      { title: 'Local SEO & Local Lead Visibility', href: '/search-automation/local-seo-lead-visibility', icon: MapPin },
      { title: 'Social Media Systems', href: '/search-automation/social-media-management', icon: Share2 },
      { title: 'Workflow & AI Automation', href: '/search-automation/workflow-ai-automation', icon: Workflow },
      { title: 'Lead Capture, CRM & Sales Automation', href: '/search-automation/lead-capture-crm-sales-automation', icon: Database },
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
            fetchPriority="high"
            decoding="async"
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

      {/* DESKTOP SERVICES MEGA MENU DROPDOWN (ALL 18 CANONICAL SERVICES) */}
      {isServicesOpen && (
        <div
          id="services-mega-menu"
          role="region"
          aria-label="Services exploration menu"
          className="hidden xl:block absolute top-full left-0 w-full bg-white dark:bg-[#0E0E0E] border-b border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-black/10 dark:shadow-black/40 z-50 animate-subtle-fade-up"
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

                  {/* 6 Canonical Services with Lucide Line Icons */}
                  <ul className="space-y-1.5" role="list">
                    {cluster.services.map((service) => {
                      const Icon = service.icon;
                      const isServiceActive = pathname === service.href;
                      return (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={() => setIsServicesOpen(false)}
                            className={`group flex items-center space-x-3 py-2 px-3 rounded-xl text-[13px] transition-all ${
                              isServiceActive
                                ? 'text-[#009E73] font-bold bg-[#009E73]/10'
                                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 font-medium'
                            }`}
                          >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-[#009E73]/10 group-hover:text-[#009E73] transition-colors">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="line-clamp-1">{service.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* View Cluster Hub Link */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                    <Link
                      href={cluster.slug}
                      onClick={() => setIsServicesOpen(false)}
                      className="inline-flex items-center text-[12px] font-bold text-[#009E73] hover:text-[#007a55] transition-colors group"
                    >
                      <span>
                        Explore {cluster.name === 'ADVISORY' ? 'Advisory' : cluster.name === 'DESIGN & BUILD' ? 'Design & Build' : 'Search, AI & Automation'} Hub
                      </span>
                      <span className="ml-1 text-[13px] group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* FEATURED EVIDENCE CASE STUDY CARD */}
            <div className="mt-8 pt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col md:flex-row items-start md:items-center justify-between bg-neutral-50/90 dark:bg-neutral-900/60 rounded-xl p-4 border border-neutral-200/80 dark:border-neutral-800 gap-4">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#009E73] dark:text-[#4ade80]">
                  <Award className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#009E73]/10 text-[#009E73] dark:bg-emerald-950 dark:text-[#4ade80] px-2 py-0.5 rounded">
                      Featured Evidence
                    </span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                      SattvaOS Master Platform
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                    Custom business operating system — <strong className="text-neutral-800 dark:text-neutral-200">+140% Lead Throughput</strong> &amp; <strong className="text-neutral-800 dark:text-neutral-200">0.4s LCP Performance</strong>.
                  </p>
                </div>
              </div>
              <Link
                href="/evidence/sattvaos"
                onClick={() => setIsServicesOpen(false)}
                className="whitespace-nowrap shrink-0 inline-flex items-center justify-center px-4 py-2 bg-[#009E73] text-white text-xs font-bold rounded-lg hover:bg-[#007a55] transition-colors"
              >
                View Case Study <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE ACCORDION NAVIGATION MENU (3 LIGHTWEIGHT CLUSTER CARDS LINKING TO HUBS) */}
      <div
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`xl:hidden bg-white dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 px-6 overflow-y-auto transition-all duration-200 ${
          isMobileMenuOpen ? 'py-5 max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
        } flex flex-col space-y-4 shadow-xl absolute w-full left-0 top-20`}
      >
        {/* 3 Cluster-Level Entries linking to Hub pages */}
        <div className="space-y-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Service Track Hubs
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            {SERVICE_CLUSTERS.map((cluster) => {
              const ClusterIcon = cluster.icon;
              const isClusterActive = pathname.startsWith(cluster.slug);
              return (
                <Link
                  key={cluster.id}
                  href={cluster.slug}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group rounded-xl border p-3.5 flex items-center justify-between transition-all ${
                    isClusterActive
                      ? 'border-[#009E73] bg-[#009E73]/5 dark:bg-[#009E73]/10'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 hover:border-[#009E73]'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-neutral-800 text-[#009E73] shadow-xs">
                      <ClusterIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-[#009E73] transition-colors">
                        {cluster.name}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        {cluster.descriptor}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-neutral-400 group-hover:text-[#009E73] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Primary Nav Links */}
        <div className="space-y-1 py-1">
          {PRIMARY_NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-[15px] font-bold transition-colors ${
                  isActive ? 'text-[#009E73]' : 'text-neutral-800 dark:text-neutral-200 hover:text-[#009E73]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>

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
