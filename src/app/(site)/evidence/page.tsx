import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import { 
  ArrowLeft, 
  ArrowRight, 
  Stethoscope, 
  ShoppingBag, 
  BookOpen,
  Cpu,
  Palette
} from 'lucide-react';

// 1️⃣ SEO METADATA
export const metadata: Metadata = {
  title: 'Operational Evidence & Case Studies',
  description: 'Real analytics, architecture logs, verified public footprints, and business outcomes engineered by DigiXPro across Healthcare, Marketplaces, AI Systems, and Design Platforms.',
  alternates: {
    canonical: 'https://www.digixpro.in/evidence',
  },
  openGraph: {
    title: 'Operational Evidence & Case Studies | DigiXPro',
    description: 'Explore our production-grade architecture case studies and operational evidence across technology and design tracks.',
    url: 'https://www.digixpro.in/evidence',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Operational Evidence & Case Studies',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Operational Evidence & Case Studies | DigiXPro',
    description: 'Explore our production-grade architecture case studies and operational evidence.',
    images: ['/twitter-image.png'],
  },
};

export default function EvidenceIndexPage() {
  
  // 2️⃣ JSON-LD SCHEMA (EXACT MATCH FOR ALL 8 VISIBLE CARDS)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "DigiXPro Operational Evidence",
    "description": "Real analytics, architecture logs, and business outcomes categorized across technology and design pillars.",
    "url": "https://www.digixpro.in/evidence",
    "publisher": {
      "@type": "Organization",
      "name": "DigiXPro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.digixpro.in/logo-1024.png?v=2"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Dr Aggarwal Physio Centre Case Study",
          "url": "https://www.digixpro.in/evidence/dr-aggarwal"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "ScanCentreNearMe Marketplace Architecture",
          "url": "https://www.digixpro.in/evidence/scan-centre"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Buy Secondhand Books Commerce OS",
          "url": "https://www.digixpro.in/evidence/buy-secondhand-book"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "SattvaOS Master Platform",
          "url": "https://www.digixpro.in/evidence/sattvaos"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "aatma.guru Onboarding OS",
          "url": "https://www.digixpro.in/evidence/aatma-guru"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Nirvandham Digital Institution",
          "url": "https://www.digixpro.in/evidence/nirvandham"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "DigiXPro Architecture Case Study",
          "url": "https://www.digixpro.in/evidence/digixpro"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Muktibodh Publishing System",
          "url": "https://www.digixpro.in/evidence/muktibodh"
        },
        {
          "@type": "ListItem",
          "position": 9,
          "name": "360 Neck & Shoulder Care System",
          "url": "https://www.digixpro.in/evidence/360-neck-shoulder"
        }
      ]
    }
  };

  return (
    <>
      {/* BreadcrumbList schema for SERP rich results */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Operational Evidence', url: 'https://www.digixpro.in/evidence' },
        ]}
      />
      {/* Script tag for JSON-LD CollectionPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 transition-colors duration-200">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white mb-12 transition">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Overview
        </Link>

        {/* Page Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-12">
          <span className="text-xs font-mono text-[#007a55] font-bold uppercase tracking-widest">The Archive</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 text-black dark:text-white">Operational Evidence</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-4 max-w-3xl leading-relaxed">
            Real analytics, architecture logs, verified public footprints, and business outcomes. Grouped across Technology Advisory and Design Services tracks.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* =========================================================================
              TRACK 1: TECHNOLOGY ADVISORY EVIDENCE (TECH TRACK)
              ========================================================================= */}
          <section className="space-y-12">
            <div className="flex items-center space-x-3 border-b-2 border-black dark:border-white pb-3">
              <Cpu className="w-6 h-6 text-[#16a34a]" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white">Technology Evidence</h2>
              <span className="text-xs font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2.5 py-0.5 rounded-full font-bold">Tech Track</span>
            </div>

            {/* Sub-Pillar 1.1: Healthcare Systems */}
            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <Stethoscope className="w-5 h-5 text-black dark:text-white" />
                <h3 className="text-xl font-bold text-black dark:text-white">Healthcare Systems</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/dr-aggarwal" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-[#22C55E] transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">HEALTH-001</span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold">9+ Years Trust</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-[#22C55E] transition">Dr Aggarwal Physio Centre</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Local search dominance, trust architecture &amp; 360 Neck expansion.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>

            {/* Sub-Pillar 1.2: Marketplace & Platform Systems */}
            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <ShoppingBag className="w-5 h-5 text-black dark:text-white" />
                <h3 className="text-xl font-bold text-black dark:text-white">Marketplace &amp; Platform Systems</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/scan-centre" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">MARKET-001</span>
                    <span className="text-[10px] font-mono text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-bold">B2B2C Live</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-blue-600 transition">ScanCentreNearMe</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Healthcare marketplace aggregator engineered via smart framework customization.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/buy-secondhand-book" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-amber-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">MARKET-002</span>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-bold">Custom PHP 8.4 Engine</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-amber-600 transition">BuySecondHandBook</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">WordPress to custom PHP 8.4 engine migration: 12,272 URL redirects, zero SEO reset, 99/100 PageSpeed.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>

            {/* Sub-Pillar 1.3: AI Infrastructure & Governance */}
            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <BookOpen className="w-5 h-5 text-black dark:text-white" />
                <h3 className="text-xl font-bold text-black dark:text-white">AI Infrastructure &amp; Governance</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/sattvaos" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-purple-600 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">AI-SYS-001</span>
                    <span className="text-[10px] font-mono text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 font-bold">Master Platform</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-purple-700 transition">SattvaOS</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Governed AI infrastructure, multi-tenant hierarchy and institutional risk control.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/aatma-guru" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-emerald-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">AI-SYS-002</span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold">Onboarding OS</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-emerald-600 transition">aatma.guru</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Governed organization onboarding platform &amp; multi-tenant provisioning engine.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/nirvandham" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-purple-600 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">TENANT-001</span>
                    <span className="text-[10px] font-mono text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 font-bold">Production Tenant</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-purple-600 transition">Nirvandham</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">First production deployment of the SattvaOS ecosystem as a governed digital institution.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/digixpro" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-[#22C55E] transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">SELF-SYS-001</span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold">Live Platform</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-[#22C55E] transition">DigiXPro Architecture</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">DigiXPro&apos;s own digital presence as a live architecture demonstration.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRACK 2: DESIGN SERVICES EVIDENCE (DESIGN TRACK)
              ========================================================================= */}
          <section className="space-y-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center space-x-3 border-b-2 border-black dark:border-white pb-3">
              <Palette className="w-6 h-6 text-[#16a34a]" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white">Design Evidence</h2>
              <span className="text-xs font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2.5 py-0.5 rounded-full font-bold">Design Track</span>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <BookOpen className="w-5 h-5 text-black dark:text-white" />
                <h3 className="text-xl font-bold text-black dark:text-white">Publishing &amp; Healthcare Web Design Systems</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/muktibodh" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-amber-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">PUB-SYS-001</span>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-bold">Knowledge Engine</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-amber-600 transition">Muktibodh</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Engineering a multi-format digital knowledge delivery system and publishing engine.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/360-neck-shoulder" className="block bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-emerald-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400">DESIGN-HEALTH-001</span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold">Specialist Branding</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white group-hover:text-emerald-600 transition">360 Neck &amp; Shoulder Care</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Specialised clinic web design, visual identity architecture &amp; local patient intake platform.</p>
                  <div className="flex items-center text-xs font-mono text-black dark:text-white font-bold pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    View Case Study <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-12 bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 rounded-[20px] p-8 md:p-10 text-center">
            <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest mb-3">Ready to work together?</p>
            <h2 className="text-white text-[22px] md:text-[28px] font-extrabold mb-4">
              Design your own architecture.
            </h2>
            <p className="text-neutral-400 text-[15px] max-w-lg mx-auto mb-6">
              Let&apos;s audit your current operational state and design the right technology stack — before you commit to any vendor.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#007a5a] text-white font-bold text-[15px] rounded-xl hover:bg-[#006247] transition-colors shadow-md min-h-[52px]"
            >
              Request a Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

        </div>
      </div>
      {/* Mobile sticky CTA */}
      <StickyMobileCTA />
    </>
  );
}
