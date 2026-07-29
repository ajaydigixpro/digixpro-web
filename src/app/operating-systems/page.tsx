'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  LayoutTemplate,
  Database,
  Globe,
  Lock,
  FlaskConical,
  Image as ImageIcon
} from 'lucide-react';

const platforms = [
  {
    id: "buysecondhandbooks",
    name: "BuySecondHandBooks",
    category: "Marketplace Operating System",
    status: "Production",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    year: "2024",
    icon: <Globe className="w-5 h-5" />,
    image: "/platforms/bshb-screenshot.jpg",
    route: "/evidence/buy-secondhand-book", // <-- Direct route embedded
    highlights: [
      "Multi-vendor OMS (Order Management)",
      "Independent Inventory Engine",
      "Decoupled Payments Architecture",
      "Zero Plugin Dependency"
    ]
  },
  {
    id: "sattvaos",
    name: "SattvaOS",
    category: "Core AI Infrastructure",
    status: "Internal Platform",
    statusColor: "bg-purple-50 text-purple-700 border-purple-200",
    year: "2025",
    icon: <Database className="w-5 h-5" />,
    image: "/platforms/sattvaos-screenshot.png",
    route: "/evidence/sattvaos", // <-- Direct route embedded
    highlights: [
      "Governed AI Execution Layer",
      "Strict Tenant Data Isolation",
      "Centralized Audit Logging",
      "Modular Logic Blocks"
    ]
  },
  {
    id: "aatma-guru",
    name: "aatma.guru",
    category: "Multi-Tenant Onboarding OS",
    status: "Active",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    year: "2025",
    icon: <LayoutTemplate className="w-5 h-5" />,
    image: "/platforms/aatmaguru-screenshot.png",
    route: "/evidence/aatma-guru", // <-- Direct route embedded
    highlights: [
      "Automated Tenant Provisioning",
      "Role-Based Studio Access",
      "Decoupled Content Delivery",
      "Scalable Micro-Databases"
    ]
  },
  {
    id: "muktibodh",
    name: "Muktibodh",
    category: "Digital Publishing Ecosystem",
    status: "Production",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    year: "2023",
    icon: <Globe className="w-5 h-5" />,
    image: "/platforms/muktibodh-screenshot.png",
    route: "/evidence/muktibodh", // <-- Direct route embedded
    highlights: [
      "Multilingual Content Delivery",
      "Custom Rendering Engine",
      "Zero-cost Horizontal Scaling",
      "Integrated Editorial Workflows"
    ]
  },
  {
    id: "nirvandham",
    name: "Nirvandham",
    category: "Healthcare Knowledge Platform",
    status: "Research",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    year: "2024",
    icon: <FlaskConical className="w-5 h-5" />,
    image: "/platforms/nirvandham-screenshot.png",
    route: "/evidence/nirvandham", // <-- Direct route embedded
    highlights: [
      "Secure Patient Data Modeling",
      "Privacy-First Compliance Layer",
      "AI-Assisted Diagnostic Flows",
      "Scalable Health Records System"
    ]
  }
];

export default function PlatformsPage() {
  
  const ImageWithFallback = ({ src, alt }: { src: string, alt: string }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
      return (
        <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center text-neutral-400">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Screenshot Pending</span>
        </div>
      );
    }

    return (
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
        onError={() => setHasError(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#16a34a]/20 pb-24">
      
      {/* Navigation Back */}
      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black transition">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Overview
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-16">
        <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
          Verified Execution
        </div>
        <h1 className="text-[48px] md:text-[64px] font-extrabold tracking-tight leading-none mb-4">
          Production <br className="hidden md:block" /> Platforms.
        </h1>
        <p className="text-[18px] md:text-[22px] text-neutral-600 max-w-2xl leading-relaxed">
          We don't just write architecture documents. We engineer and scale complete operating systems and platforms that execute those architectural decisions.
        </p>
      </section>

      {/* PLATFORMS GRID */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          
          {platforms.map((platform) => (
            <div 
              key={platform.id} 
              className="bg-white rounded-[24px] border border-neutral-200 overflow-hidden flex flex-col group hover:border-black/30 transition-all shadow-sm hover:shadow-md"
            >
              {/* Top: Screenshot Area */}
              <div className="w-full aspect-video bg-neutral-100 border-b border-neutral-200 relative overflow-hidden">
                <ImageWithFallback src={platform.image} alt={platform.name} />
              </div>

              {/* Bottom: Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest flex items-center">
                    {platform.icon}
                    <span className="ml-2">{platform.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded border font-bold uppercase tracking-wider ${platform.statusColor}`}>
                      {platform.status}
                    </span>
                    <span className="text-[12px] font-mono font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
                      {platform.year}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[28px] font-extrabold text-black mb-6">
                  {platform.name}
                </h3>

                {/* Architecture Highlights */}
                <div className="mb-8 flex-grow">
                  <div className="text-[12px] font-bold text-black uppercase tracking-widest mb-4 border-b border-neutral-100 pb-2">
                    Architecture Highlights
                  </div>
                  <ul className="space-y-3">
                    {platform.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-[15px] text-neutral-700 font-medium">
                        <span className="text-[#16a34a] mr-3 mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Link directly to platform.route */}
                <div className="pt-4 border-t border-neutral-100 mt-auto">
                  <Link 
                    href={platform.route} 
                    className="inline-flex items-center text-[15px] font-bold text-black group-hover:text-[#16a34a] transition-colors"
                  >
                    Read Full Case Study <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 mt-10">
        <div className="bg-neutral-50 border border-neutral-200 p-10 md:p-14 rounded-[24px] text-center flex flex-col justify-center items-center">
          <Lock className="w-8 h-8 text-neutral-400 mb-4" />
          <h3 className="text-[24px] md:text-[32px] font-extrabold text-black mb-4">
            Custom Architecture Needs?
          </h3>
          <p className="text-[16px] text-neutral-600 max-w-lg mx-auto mb-8">
            Every platform shown here started with an architecture discovery phase. Let's discuss what your next system requires.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-7 py-3.5 bg-black text-white font-bold text-[15px] rounded-xl hover:bg-[#16a34a] transition-colors"
          >
            Book Architecture Discussion
          </Link>
        </div>
      </section>

    </div>
  );
}