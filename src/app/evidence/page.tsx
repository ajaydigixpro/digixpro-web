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
  
  // 2️⃣ JSON-LD SCHEMA
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
          "name": "Muktibodh Publishing System",
          "url": "https://www.digixpro.in/evidence/muktibodh"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "DigiXPro Architecture Case Study",
          "url": "https://www.digixpro.in/evidence/digixpro"
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

      <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-12 transition">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Overview
        </Link>

        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <span className="text-xs font-mono text-[#22C55E] font-bold uppercase tracking-widest">The Archive</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Operational Evidence</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
            Real analytics, architecture logs, verified public footprints, and business outcomes. Grouped across Technology Advisory and Design Services tracks.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* =========================================================================
              TRACK 1: TECHNOLOGY ADVISORY EVIDENCE (TECH TRACK)
              ========================================================================= */}
          <section className="space-y-12">
            <div className="flex items-center space-x-3 border-b-2 border-black pb-3">
              <Cpu className="w-6 h-6 text-[#16a34a]" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-black">Technology Evidence</h2>
              <span className="text-xs font-mono bg-neutral-200 text-neutral-700 px-2.5 py-0.5 rounded-full font-bold">Tech Track</span>
            </div>

            {/* Sub-Pillar 1.1: Healthcare Systems */}
            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
                <Stethoscope className="w-5 h-5 text-black" />
                <h3 className="text-xl font-bold">Healthcare Systems</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/dr-aggarwal" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-[#22C55E] transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">HEALTH-001</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">9+ Years Trust</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-[#22C55E] transition">Dr Aggarwal Physio Centre</h4>
                  <p className="text-xs text-neutral-500 mb-4">Local search dominance, trust architecture &amp; 360 Neck expansion.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>

            {/* Sub-Pillar 1.2: Marketplace & Platform Systems */}
            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
                <ShoppingBag className="w-5 h-5 text-black" />
                <h3 className="text-xl font-bold">Marketplace &amp; Platform Systems</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/scan-centre" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-blue-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">MARKET-001</span>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">B2B2C Live</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">ScanCentreNearMe</h4>
                  <p className="text-xs text-neutral-500 mb-4">Healthcare marketplace aggregator engineered via smart framework customization.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/buy-secondhand-book" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-amber-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">MARKET-002</span>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">Commerce OS</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition">Buy Secondhand Books</h4>
                  <p className="text-xs text-neutral-500 mb-4">Modernizing a legacy top-10 national bookstore via decoupled commerce infrastructure.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>

            {/* Sub-Pillar 1.3: AI Infrastructure & Governance */}
            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
                <BookOpen className="w-5 h-5 text-black" />
                <h3 className="text-xl font-bold">AI Infrastructure &amp; Governance</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/sattvaos" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-purple-600 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">AI-SYS-001</span>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">Master Platform</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-purple-700 transition">SattvaOS</h4>
                  <p className="text-xs text-neutral-500 mb-4">Governed AI infrastructure, multi-tenant hierarchy and institutional risk control.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/aatma-guru" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-emerald-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">AI-SYS-002</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Onboarding OS</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition">aatma.guru</h4>
                  <p className="text-xs text-neutral-500 mb-4">Governed organization onboarding platform &amp; multi-tenant provisioning engine.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/nirvandham" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-purple-600 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">TENANT-001</span>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">Production Tenant</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition">Nirvandham</h4>
                  <p className="text-xs text-neutral-500 mb-4">First production deployment of the SattvaOS ecosystem as a governed digital institution.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>

                <a href="/evidence/digixpro" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-[#22C55E] transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">SELF-SYS-001</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Live Platform</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-[#22C55E] transition">DigiXPro Architecture</h4>
                  <p className="text-xs text-neutral-500 mb-4">DigiXPro&apos;s own digital presence as a live architecture demonstration.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRACK 2: DESIGN SERVICES EVIDENCE (DESIGN TRACK)
              ========================================================================= */}
          <section className="space-y-8 pt-6 border-t border-neutral-200">
            <div className="flex items-center space-x-3 border-b-2 border-black pb-3">
              <Palette className="w-6 h-6 text-[#16a34a]" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-black">Design Evidence</h2>
              <span className="text-xs font-mono bg-neutral-200 text-neutral-700 px-2.5 py-0.5 rounded-full font-bold">Design Track</span>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
                <BookOpen className="w-5 h-5 text-black" />
                <h3 className="text-xl font-bold">Publishing &amp; Editorial Systems</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/evidence/muktibodh" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-amber-500 transition group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">PUB-SYS-001</span>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">Knowledge Engine</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition">Muktibodh</h4>
                  <p className="text-xs text-neutral-500 mb-4">Engineering a multi-format digital knowledge delivery system and publishing engine.</p>
                  <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                    View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-12 bg-[#0A0A0A] rounded-[20px] p-8 md:p-10 text-center">
            <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest mb-3">Ready to work together?</p>
            <h2 className="text-white text-[22px] md:text-[28px] font-extrabold mb-4">
              Design your own architecture.
            </h2>
            <p className="text-neutral-400 text-[15px] max-w-lg mx-auto mb-6">
              Let&apos;s audit your current operational state and design the right technology stack — before you commit to any vendor.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#009E73] text-white font-bold text-[15px] rounded-xl hover:bg-[#007a5a] transition-colors shadow-md min-h-[52px]"
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