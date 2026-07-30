import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import { 
  ArrowRight, 
  Database, 
  Cpu, 
  Network, 
  ShieldAlert,
  ArrowDown,
  CheckCircle2,
  FileText,
  Map,
  CheckSquare,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology Architecture Advisory Services',
  description: 'Independent technology architecture advisory for growing businesses. We work with founders before major technology decisions are made to reduce risk, eliminate waste, and design operational clarity.',
  keywords: [
    'technology architecture advisory',
    'independent tech consultant India',
    'AI infrastructure advisory',
    'ERP CRM advisory',
    'business workflow automation',
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/advisory',
  },
  openGraph: {
    title: 'Technology Architecture Advisory Services | DigiXPro',
    description: 'Independent technology architecture advisory for growing businesses. We work with founders before major technology decisions are made.',
    url: 'https://www.digixpro.in/advisory',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Technology Architecture Advisory Services',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology Architecture Advisory Services | DigiXPro',
    description: 'Independent technology architecture advisory for growing businesses.',
    images: ['/twitter-image.png'],
  },
};

export default function AdvisoryPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#16a34a]/20 pb-16">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Advisory Services', url: 'https://www.digixpro.in/advisory' },
        ]}
      />
      <FAQSchema
        items={[
          {
            question: 'What does a technology architecture advisory do?',
            answer: 'A technology architecture advisor analyses your business operations and designs the right system architecture before you spend money on software. DigiXPro evaluates your workflows, identifies gaps, selects the right tools (CRM, ERP, AI), and creates a blueprint for implementation — so you avoid costly mistakes and rebuilds.',
          },
          {
            question: 'How is DigiXPro different from a software development company?',
            answer: 'DigiXPro does not write code or build software. We are an independent advisory firm — we design the architecture, select the right vendors, and manage implementation accountability. Our independence means we have no bias toward any software vendor or technology stack.',
          },
          {
            question: 'Who are DigiXPro\'s advisory services for?',
            answer: 'DigiXPro works with founders, CEOs, and leadership teams of growing businesses — typically 10 to 200 people — who are about to make a major technology investment (CRM, ERP, AI systems, custom software) and want an independent expert to validate their decisions before committing.',
          },
          {
            question: 'How much does a technology architecture advisory engagement cost?',
            answer: 'Engagement scope and fees vary depending on the complexity of your operations and the depth of advisory required. Start with a free 30-minute discovery call to discuss your situation. Book via the Contact page.',
          },
          {
            question: 'Can DigiXPro help with AI implementation for my business?',
            answer: 'Yes. DigiXPro advises on AI readiness, AI vendor selection, and governed AI infrastructure design. We have direct experience architecting institutional AI systems (SattvaOS) and can evaluate whether AI is the right investment for your current operational maturity.',
          },
        ]}
      />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-24 border-b border-neutral-200">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700">
              Architecture Consulting. Not code outsourcing.
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8">
            Independent Architecture Advisory.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 leading-relaxed max-w-3xl">
            We work with founders and growing businesses before major technology decisions are made. Our role is to reduce risk through architecture, operational design, and independent technical guidance.
          </p>
        </div>
      </section>

      {/* 2. TYPICAL ADVISORY ENGAGEMENTS */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4">Typical Advisory Engagements</h2>
          <p className="text-[18px] text-neutral-600">
            Where we typically help founders and organizations establish operational and technical clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: AI */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-[32px] p-8 md:p-10 flex flex-col group hover:border-black/20 transition-all">
            <div className="w-14 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Cpu className="w-7 h-7 text-[#16a34a]" />
            </div>
            <h3 className="text-[24px] font-extrabold mb-4">AI Infrastructure & Governance</h3>
            <p className="text-[16px] text-neutral-600 leading-relaxed mb-8 flex-grow">
              Stop experimenting with generic AI. We architect secure, role-based AI execution layers that integrate with your proprietary data while ensuring strict governance and data isolation.
            </p>
            <div className="pt-6 border-t border-neutral-200">
              <Link href="/evidence" className="inline-flex items-center text-[15px] font-bold text-black hover:text-[#16a34a] transition-colors">
                View Related Evidence <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Marketplaces */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-[32px] p-8 md:p-10 flex flex-col group hover:border-black/20 transition-all">
            <div className="w-14 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Network className="w-7 h-7 text-[#16a34a]" />
            </div>
            <h3 className="text-[24px] font-extrabold mb-4">Marketplace & Platform Architecture</h3>
            <p className="text-[16px] text-neutral-600 leading-relaxed mb-8 flex-grow">
              Designing scalable multi-vendor operating systems. We decouple your inventory, order management, and payment gateways so your business can scale horizontally without breaking.
            </p>
            <div className="pt-6 border-t border-neutral-200">
              <Link href="/evidence" className="inline-flex items-center text-[15px] font-bold text-black hover:text-[#16a34a] transition-colors">
                View Related Evidence <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3: Business Automation */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-[32px] p-8 md:p-10 flex flex-col group hover:border-black/20 transition-all">
            <div className="w-14 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Database className="w-7 h-7 text-[#16a34a]" />
            </div>
            <h3 className="text-[24px] font-extrabold mb-4">Business & Workflow Automation</h3>
            <p className="text-[16px] text-neutral-600 leading-relaxed mb-8 flex-grow">
              Replacing fragmented WhatsApp groups and messy Excel sheets with a centralized business operating system. We map your operations and automate manual bottlenecks.
            </p>
            <div className="pt-6 border-t border-neutral-200">
              <Link href="/evidence" className="inline-flex items-center text-[15px] font-bold text-black hover:text-[#16a34a] transition-colors">
                View Related Evidence <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 4: Architecture Audit */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-[32px] p-8 md:p-10 flex flex-col group hover:border-black/20 transition-all">
            <div className="w-14 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <ShieldAlert className="w-7 h-7 text-[#16a34a]" />
            </div>
            <h3 className="text-[24px] font-extrabold mb-4">Enterprise Tech Audit & Rescue</h3>
            <p className="text-[16px] text-neutral-600 leading-relaxed mb-8 flex-grow">
              Independent technical due-diligence. If your current software is failing, slow, or burning cash, we analyze the architecture, identify the root flaws, and map out a rescue strategy.
            </p>
            <div className="pt-6 border-t border-neutral-200">
              <Link href="/evidence" className="inline-flex items-center text-[15px] font-bold text-black hover:text-[#16a34a] transition-colors">
                View Related Evidence <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHAT YOU RECEIVE */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4">What You Receive</h2>
            <p className="text-[18px] text-neutral-600">
              Tangible, production-ready intelligence to run your operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Business Operating System Blueprint", icon: <Map className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Technology Roadmap", icon: <CheckSquare className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Decision Rationale", icon: <FileText className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Vendor Evaluation", icon: <Briefcase className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Implementation Strategy", icon: <ArrowRight className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Risk Assessment", icon: <ShieldCheck className="w-5 h-5 text-red-500" /> }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center p-6 border border-neutral-200 rounded-2xl bg-white hover:border-[#16a34a]/30 transition-colors shadow-sm">
                <div className="mr-4 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  {item.icon}
                </div>
                <span className="text-[15px] font-bold text-neutral-800">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE PARTNER */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4">How We Partner</h2>
          <p className="text-[18px] text-neutral-600">
            A transparent workflow designed to separate the architecture from the implementation.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-12 mb-8">
          {[
            { step: "01", name: "Discovery" },
            { step: "02", name: "Architecture" },
            { step: "03", name: "Implementation Strategy" },
            { step: "04", name: "Execution Support (Optional)" }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col w-full md:w-auto min-w-[200px] p-6 rounded-2xl bg-white shadow-sm border border-neutral-200">
                <span className="text-[12px] font-mono font-bold text-neutral-400 mb-2">PHASE {item.step}</span>
                <span className={`font-extrabold text-[18px] ${idx === arr.length - 1 ? 'text-[#16a34a]' : 'text-black'}`}>
                  {item.name}
                </span>
              </div>
              {idx !== arr.length - 1 && (
                <div className="hidden md:block text-neutral-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
              {idx !== arr.length - 1 && (
                <div className="md:hidden text-neutral-300 my-2">
                  <ArrowDown className="w-6 h-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* The Differentiator Block */}
        <div className="bg-[#0A0A0A] p-8 md:p-10 rounded-[24px] text-center shadow-xl max-w-4xl mx-auto">
          <h3 className="text-white font-extrabold text-[20px] md:text-[24px] mb-4">Implementation is Optional</h3>
          <p className="text-[16px] text-neutral-400 leading-relaxed">
            Execution may be handled by your internal team, your preferred implementation partner, or DigiXPro where appropriate. We design the system; you choose how it gets built.
          </p>
        </div>

      </section>

    </div>
  );
}