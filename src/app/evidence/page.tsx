import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Cpu, 
  ShoppingBag, 
  Stethoscope, 
  BookOpen,
  Network,
  Briefcase,
  FileText
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Evidence',
  description: 'Production technology architectures, case studies, and engineering blueprints designed and deployed under DigiXPro guidance.',
  alternates: {
    canonical: 'https://digixpro.in/evidence',
  },
};

export default function EvidencePage() {
  const evidenceItems = [
    {
      id: 'buy-secondhand-book',
      category: 'Marketplace Systems',
      title: 'Buy Second Hand Books',
      summary: 'Multi-vendor marketplace operating system with independent inventory engines, decoupled OMS, and payment isolation.',
      icon: <ShoppingBag className="w-6 h-6 text-[#16a34a]" />
    },
    {
      id: 'scan-centre-near-me',
      category: 'Healthcare Infrastructure',
      title: 'Scan Centre Near Me',
      summary: 'High-availability diagnostic & imaging discovery platform connecting patients with certified medical scan centres.',
      icon: <Stethoscope className="w-6 h-6 text-[#16a34a]" />
    },
    {
      id: 'sattvaos',
      category: 'AI Infrastructure',
      title: 'SattvaOS',
      summary: 'Governed AI execution layer architected with strict multi-tenant data isolation, role hierarchies, and institutional audit logging.',
      icon: <Cpu className="w-6 h-6 text-[#16a34a]" />
    },
    {
      id: 'muktibodh',
      category: 'Digital Publishing',
      title: 'Muktibodh Ecosystem',
      summary: 'Multilingual journal publishing platform engineered for zero-cost horizontal scaling and long-term digital preservation.',
      icon: <BookOpen className="w-6 h-6 text-[#16a34a]" />
    },
    {
      id: 'nirvandham',
      category: 'Healthcare Knowledge',
      title: 'Nirvandham Health',
      summary: 'Privacy-first medical diagnostic and knowledge system handling sensitive operational workflows with strict governance.',
      icon: <Database className="w-6 h-6 text-[#16a34a]" />
    },
    // Naye add kiye gaye projects (Aap inka text apne real projects se replace kar lena)
    {
      id: 'enterprise-crm-automation',
      category: 'Business Automation',
      title: 'Enterprise CRM & Workflow',
      summary: 'End-to-end digitization of sales pipelines, lead routing, and customer onboarding to eliminate manual data entry.',
      icon: <Network className="w-6 h-6 text-[#16a34a]" />
    },
    {
      id: 'b2b-vendor-portal',
      category: 'B2B Commerce',
      title: 'B2B Vendor Portal',
      summary: 'Centralized vendor management system with automated billing, inventory syncing, and procurement tracking.',
      icon: <Briefcase className="w-6 h-6 text-[#16a34a]" />
    },
    {
      id: 'edtech-knowledge-system',
      category: 'EdTech Infrastructure',
      title: 'EdTech Knowledge System',
      summary: 'Scalable learning management and knowledge distribution architecture designed for concurrent institutional access.',
      icon: <FileText className="w-6 h-6 text-[#16a34a]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#16a34a]/20 pb-24">
      
      {/* 1. HERO SECTION (EXTRA BREATHING SPACE, NO BACK LINK) */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 px-4 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700">
              Verified Production Proof
            </span>
          </div>
          
          <h1 className="text-[40px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-6">
            Evidence Archive.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-semibold text-neutral-800 leading-relaxed mb-4">
            We don't rely on unverified claims. Every architecture pattern shown here represents production systems deployed in the real world.
          </p>
          <p className="text-[16px] text-neutral-600 leading-relaxed">
            Review detailed technical blueprints, operational decisions, and risk-mitigation strategies across healthcare, marketplaces, AI platforms, and publishing infrastructure.
          </p>
        </div>
      </section>

      {/* 2. EVIDENCE REPOSITORY GRID */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 border-t border-neutral-200">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {evidenceItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-neutral-50 border border-neutral-200 rounded-[24px] p-8 flex flex-col justify-between hover:border-black/30 transition-all hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-neutral-500 bg-white border border-neutral-200 px-3 py-1 rounded-md">
                    {item.category}
                  </span>
                  {item.icon}
                </div>
                
                <h3 className="text-[22px] font-extrabold text-black mb-3 group-hover:text-[#16a34a] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-8">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200">
                <Link 
                  href={`/evidence/${item.id}`} 
                  className="inline-flex items-center text-[15px] font-bold text-black hover:text-[#16a34a] transition-colors"
                >
                  View Evidence <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}