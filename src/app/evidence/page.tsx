import React from 'react';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  ArrowRight, 
  Stethoscope, 
  ShoppingBag, 
  BookOpen 
} from 'lucide-react';

// 1️⃣ SEO METADATA (Google aur Social Media ke liye)
export const metadata: Metadata = {
  title: 'Operational Evidence & Case Studies | DigiXPro',
  description: 'Real analytics, architecture logs, verified public footprints, and business outcomes engineered by DigiXPro across Healthcare, Marketplaces, and AI Systems.',
  alternates: {
    canonical: 'https://digixpro.in/evidence',
  },
  openGraph: {
    title: 'Operational Evidence | DigiXPro',
    description: 'Explore our production-grade architecture case studies and operational evidence.',
    url: 'https://digixpro.in/evidence',
    type: 'website',
  }
};

export default function EvidenceIndexPage() {
  
  // 2️⃣ JSON-LD SCHEMA (Google ko batane ke liye ki ye ek Archive/Collection hai)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "DigiXPro Operational Evidence",
    "description": "Real analytics, architecture logs, and business outcomes categorized across our core operational pillars.",
    "url": "https://digixpro.in/evidence",
    "publisher": {
      "@type": "Organization",
      "name": "DigiXPro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digixpro.in/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Dr Aggarwal Physio Centre Case Study",
          "url": "https://digixpro.in/evidence/dr-aggarwal"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "ScanCentreNearMe Marketplace Architecture",
          "url": "https://digixpro.in/evidence/scan-centre"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Buy Secondhand Books Commerce OS",
          "url": "https://digixpro.in/evidence/buy-secondhand-book"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "SattvaOS Master Platform",
          "url": "https://digixpro.in/evidence/sattvaos"
        }
      ]
    }
  };

  return (
    <>
      {/* Script tag for JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20">
        
        {/* Back Link */}
        <a href="/" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-12 transition">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Overview
        </a>

        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <span className="text-xs font-mono text-[#22C55E] font-bold uppercase tracking-widest">The Archive</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Operational Evidence</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
            Real analytics, architecture logs, verified public footprints, and business outcomes. Categorized across our core operational pillars.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* PILLAR 1: Healthcare Systems */}
          <section>
            <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
              <Stethoscope className="w-5 h-5 text-black" />
              <h2 className="text-2xl font-bold">Healthcare Systems</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <a href="/evidence/dr-aggarwal" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-[#22C55E] transition group shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">HEALTH-001</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">9+ Years Trust</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[#22C55E] transition">Dr Aggarwal Physio Centre</h3>
                <p className="text-xs text-neutral-500 mb-4">Local search dominance, trust architecture & 360 Neck expansion.</p>
                <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                  View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

            </div>
          </section>

          {/* PILLAR 2: Marketplace Systems */}
          <section>
            <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-2xl font-bold">Marketplace Systems</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <a href="/evidence/scan-centre" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-blue-500 transition group shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">MARKET-001</span>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">B2B2C Live</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">ScanCentreNearMe</h3>
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
                <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition">Buy Secondhand Books</h3>
                <p className="text-xs text-neutral-500 mb-4">Modernizing a legacy top-10 national bookstore via decoupled commerce infrastructure.</p>
                <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                  View Evidence Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

            </div>
          </section>

          {/* PILLAR 3: AI Infrastructure & Knowledge Publishing */}
          <section>
            <div className="flex items-center space-x-3 mb-6 border-b border-neutral-200 pb-2">
              <BookOpen className="w-5 h-5 text-black" />
              <h2 className="text-2xl font-bold">AI Infrastructure & Knowledge Systems</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* SattvaOS */}
              <a href="/evidence/sattvaos" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-purple-600 transition group shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">AI-SYS-001</span>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">Master Platform</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-purple-700 transition">SattvaOS</h3>
                <p className="text-xs text-neutral-500 mb-4">Governed AI infrastructure, multi-tenant hierarchy and institutional risk control.</p>
                <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                  View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

              {/* aatma.guru */}
              <a href="/evidence/aatma-guru" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-emerald-500 transition group shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">AI-SYS-002</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Onboarding OS</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition">aatma.guru</h3>
                <p className="text-xs text-neutral-500 mb-4">Governed organization onboarding platform & multi-tenant provisioning engine.</p>
                <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                  View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

              {/* Nirvandham */}
              <a href="/evidence/nirvandham" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-purple-600 transition group shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">TENANT-001</span>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">Production Tenant</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition">Nirvandham</h3>
                <p className="text-xs text-neutral-500 mb-4">First production deployment of the SattvaOS ecosystem as a governed digital institution.</p>
                <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                  View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

              {/* Muktibodh Active Link */}
              <a href="/evidence/muktibodh" className="block bg-white p-6 border border-neutral-200 rounded-xl hover:border-amber-500 transition group shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded border font-bold text-neutral-600">PUB-SYS-001</span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">Knowledge Engine</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition">Muktibodh</h3>
                <p className="text-xs text-neutral-500 mb-4">Engineering a multi-format digital knowledge delivery system and publishing engine.</p>
                <div className="flex items-center text-xs font-mono text-black font-bold pt-3 border-t border-neutral-100">
                  View Architecture Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

            </div>
          </section>

        </div>
      </div>
    </>
  );
}