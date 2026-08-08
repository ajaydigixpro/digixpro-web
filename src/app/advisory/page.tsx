import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import { 
  ArrowRight, 
  ArrowDown,
  FileText,
  Map,
  CheckSquare,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'IT Consulting & Technology Advisory Services | DigiXPro',
  description: 'Independent IT consulting services and technology architecture advisory for growing businesses. We work with founders before major technology decisions are made to reduce risk, eliminate waste, and design operational clarity.',
  keywords: [
    'IT consulting services',
    'technology architecture advisory',
    'independent tech consultant India',
    'AI infrastructure advisory',
    'ERP CRM advisory',
    'business workflow automation',
    'Fractional CTO services',
    'Fractional CEO services',
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/advisory',
  },
  openGraph: {
    title: 'IT Consulting & Technology Advisory Services | DigiXPro',
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
  const techServices = services.filter((s) => s.track === 'tech');

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200">
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
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">
              Architecture Consulting. Not code outsourcing.
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8 text-black dark:text-white">
            Independent Architecture Advisory.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            We work with founders and growing businesses before major technology decisions are made. Our role is to reduce risk through architecture, operational design, and independent technical guidance.
          </p>
        </div>
      </section>

      {/* 2. TYPICAL ADVISORY ENGAGEMENTS (ARRAY-DRIVEN FROM SERVICES.TS) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">Technology Advisory Pillars</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            Explore our specialized technology architecture services engineered for operational scaling and clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techServices.map((service) => (
            <div 
              key={service.slug}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#16a34a] transition-all shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded uppercase tracking-wider mb-3 inline-block border border-emerald-200 dark:border-emerald-800">
                  {service.category}
                </span>
                <h3 className="text-lg font-extrabold text-black dark:text-white mb-2 group-hover:text-[#16a34a] transition-colors">{service.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed flex-grow">{service.shortDesc}</p>
              </div>
              <Link 
                href={`/services/${service.slug}`} 
                className="inline-flex items-center text-xs font-bold text-black dark:text-neutral-200 group-hover:text-[#16a34a] transition-colors pt-3 border-t border-neutral-100 dark:border-neutral-800"
              >
                Explore Service Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHAT YOU RECEIVE */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-24 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">What You Receive</h2>
            <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
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
              <div key={idx} className="flex items-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 hover:border-[#16a34a]/30 transition-colors shadow-sm">
                <div className="mr-4 bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl border border-neutral-100 dark:border-neutral-700">
                  {item.icon}
                </div>
                <span className="text-[15px] font-bold text-neutral-800 dark:text-neutral-200">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE PARTNER */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">How We Partner</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
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
              <div className="flex flex-col w-full md:w-auto min-w-[200px] p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
                <span className="text-[12px] font-mono font-bold text-neutral-400 dark:text-neutral-500 mb-2">PHASE {item.step}</span>
                <span className={`font-extrabold text-[18px] ${idx === arr.length - 1 ? 'text-[#16a34a]' : 'text-black dark:text-white'}`}>
                  {item.name}
                </span>
              </div>
              {idx !== arr.length - 1 && (
                <div className="hidden md:block text-neutral-300 dark:text-neutral-700">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
              {idx !== arr.length - 1 && (
                <div className="md:hidden text-neutral-300 dark:text-neutral-700 my-2">
                  <ArrowDown className="w-6 h-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* The Differentiator Block */}
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-8 md:p-10 rounded-[24px] text-center shadow-xl max-w-4xl mx-auto">
          <h3 className="text-white font-extrabold text-[20px] md:text-[24px] mb-4">Implementation is Optional</h3>
          <p className="text-[16px] text-neutral-400 leading-relaxed mb-8">
            Execution may be handled by your internal team, your preferred implementation partner, or DigiXPro where appropriate. We design the system; you choose how it gets built.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#009E73] text-white font-bold text-[15px] rounded-xl hover:bg-[#007a5a] transition-colors shadow-md min-h-[52px]"
          >
            Request a 30-Min Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </section>

      {/* Mobile sticky CTA */}
      <StickyMobileCTA />

    </div>
  );
}
