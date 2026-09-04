import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Palette, Search, Home } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: '404 Page Not Found | DigiXPro',
  description: 'The page you requested could not be found. Explore DigiXPro technology advisory, website design, and AI search automation services.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: '404 Page Not Found | DigiXPro',
    description: 'The page you requested could not be found. Explore DigiXPro technology advisory, website design, and AI search automation services.',
    url: 'https://www.digixpro.in/404',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'DigiXPro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 Page Not Found | DigiXPro',
    description: 'The page you requested could not be found. Explore DigiXPro technology advisory, website design, and AI search automation services.',
    images: ['/twitter-image.png'],
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 md:py-24 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#009E73]/10 text-[#009E73] mb-6">
        <Compass className="w-4 h-4" /> Error 404 — Page Not Found
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-white mb-4 tracking-tight">
        Looking for Technology Guidance?
      </h1>
      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        The exact page or link you followed could not be located. Explore our primary technology service clusters below or return to the main portal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12 text-left">
        {/* Cluster 1: Advisory */}
        <Link 
          href="/advisory" 
          className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:border-[#009E73] transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#009E73]/10 flex items-center justify-center text-[#009E73] mb-4 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 flex items-center justify-between">
            Technology Advisory
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#009E73]" />
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Independent technology strategy, vendor due diligence, fractional CTO leadership, and business architecture.
          </p>
        </Link>

        {/* Cluster 2: Design & Build */}
        <Link 
          href="/design-services" 
          className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:border-[#009E73] transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#009E73]/10 flex items-center justify-center text-[#009E73] mb-4 group-hover:scale-105 transition-transform">
            <Palette className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 flex items-center justify-between">
            Design & Build
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#009E73]" />
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            High-converting custom business websites, UI/UX redesigns, and high-performance digital presence.
          </p>
        </Link>

        {/* Cluster 3: Search, AI & Automation */}
        <Link 
          href="/search-automation" 
          className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:border-[#009E73] transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#009E73]/10 flex items-center justify-center text-[#009E73] mb-4 group-hover:scale-105 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 flex items-center justify-between">
            Search, AI & Automation
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#009E73]" />
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Technical SEO, GEO/AI search engine optimization, local lead visibility, and workflow automation.
          </p>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#009E73] text-white font-bold rounded-xl hover:bg-[#007a55] transition-colors"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
        <Link
          href="/pricing"
          className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          Investment Guide (/pricing)
        </Link>
        <Link
          href="/knowledge"
          className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          Knowledge Center
        </Link>
      </div>
    </div>
  );
}
