import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import { 
  ArrowRight, 
  Palette, 
  Layout, 
  Sparkles,
  ArrowDown,
  FileText,
  CheckSquare,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Design & Strategic Branding Services | DigiXPro',
  description: 'Custom website design services, modern web development, and strategic branding services for enterprise clients.',
  keywords: [
    'website design services',
    'branding services',
    'digital publication design',
    'logo design system',
    'Figma UI UX design',
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/design-services',
  },
  openGraph: {
    title: 'Brand & Digital Design Services | DigiXPro',
    description: 'Structured visual communication, custom modern website design, and strategic branding services.',
    url: 'https://www.digixpro.in/design-services',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Brand & Digital Design Services',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand & Digital Design Services | DigiXPro',
    description: 'Structured visual communication and custom modern web design.',
    images: ['/twitter-image.png'],
  },
};

export default function DesignServicesPage() {
  const designServices = services.filter((s) => s.track === 'design');

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-amber-500/20 pb-16 transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Design Services', url: 'https://www.digixpro.in/design-services' },
        ]}
      />
      <FAQSchema
        items={[
          {
            question: 'What design services does DigiXPro offer?',
            answer: 'We provide structured visual communication through 2 core design pillars: Website Design Services (Next.js/React modern JS architectures) and Strategic Branding Services (logo design systems, brand guidelines, and multi-page magazine/editorial layouts).',
          },
          {
            question: 'Why choose custom JS web design over traditional WordPress themes?',
            answer: 'Custom JS website design (Next.js, React, TailwindCSS) delivers 100% Core Web Vitals performance, instant page loads, immune security against plugin exploits, and unlimited design flexibility tailored to your exact brand positioning.',
          },
          {
            question: 'Do your branding services include magazine and publication design?',
            answer: 'Yes. We specialize in editorial publication design (digital magazines, books, annual reports) as part of our branding services, as demonstrated in our Muktibodh publishing system evidence.',
          },
        ]}
      />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              Equal Priority: Design Systems &amp; Visual Communication
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8 text-black dark:text-white">
            Brand &amp; Digital Experience Design.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            We design high-performance websites and enduring brand identities that elevate visual authority.
          </p>
        </div>
      </section>

      {/* 2. DESIGN SERVICE PILLARS (ARRAY-DRIVEN FROM SERVICES.TS) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">Design Service Pillars</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            Structured creative capabilities engineered for consistency, speed, and digital distinction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designServices.map((service) => (
            <div 
              key={service.slug}
              className="bg-white dark:bg-neutral-900 border-2 border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-amber-500 dark:hover:border-amber-500 transition-all shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded uppercase tracking-wider border border-amber-200 dark:border-amber-800">
                    {service.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Design Pillar</span>
                </div>
                <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed flex-grow">{service.shortDesc}</p>
              </div>
              <Link 
                href={`/services/${service.slug}`} 
                className="inline-flex items-center text-xs font-bold text-black dark:text-neutral-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors pt-4 border-t border-neutral-100 dark:border-neutral-800"
              >
                Explore Design Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
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
              Tangible visual assets and design systems to power your brand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Custom Web Application UI/UX", icon: <Layout className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
              { title: "Vector Logo Mark & System", icon: <Palette className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
              { title: "Comprehensive Brand Guidelines", icon: <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
              { title: "Digital Magazine & Publication Layouts", icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
              { title: "Design System Tokens & UI Kit", icon: <CheckSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
              { title: "Native Source Files (Figma, AI, PSD)", icon: <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" /> }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 hover:border-amber-500/30 transition-colors shadow-sm">
                <div className="mr-4 bg-amber-50 dark:bg-amber-950/50 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
                  {item.icon}
                </div>
                <span className="text-[15px] font-bold text-neutral-800 dark:text-neutral-200">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">Design Workflow</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            A structured visual engineering pipeline from brand strategy to production assets.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-12 mb-8">
          {[
            { step: "01", name: "Visual Discovery" },
            { step: "02", name: "Design System Architecture" },
            { step: "03", name: "Component Engineering" },
            { step: "04", name: "Production Rollout" }
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

        {/* Bottom CTA Block */}
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-8 md:p-10 rounded-[24px] text-center shadow-xl max-w-4xl mx-auto">
          <h3 className="text-white font-extrabold text-[20px] md:text-[24px] mb-4">Ready to elevate your visual identity?</h3>
          <p className="text-[16px] text-neutral-400 leading-relaxed mb-8">
            Let&apos;s discuss your website or brand identity systems. Book a 30-minute discovery consultation.
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
