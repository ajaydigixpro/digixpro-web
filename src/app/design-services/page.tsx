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
  CheckCircle2,
  FileText,
  Map,
  CheckSquare,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Brand & Digital Design Services',
  description: 'Structured visual communication, custom modern website design, unlimited graphic design retaners, and strategic branding services for growing organizations.',
  keywords: [
    'website design services',
    'unlimited graphic design service',
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

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'website-design-services':
        return <Layout className="w-7 h-7 text-[#16a34a]" />;
      case 'unlimited-graphic-design':
        return <Sparkles className="w-7 h-7 text-[#16a34a]" />;
      case 'branding-services':
        return <Palette className="w-7 h-7 text-[#16a34a]" />;
      default:
        return <Palette className="w-7 h-7 text-[#16a34a]" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#16a34a]/20 pb-16">
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
            answer: 'We provide structured visual communication through 3 core design pillars: Website Design Services (Next.js/React modern JS architectures), Unlimited Graphic Design Service subscriptions, and Strategic Branding Services (logo design systems, brand guidelines, and multi-page magazine/editorial layouts).',
          },
          {
            question: 'Why choose custom JS web design over traditional WordPress themes?',
            answer: 'Custom JS website design (Next.js, React, TailwindCSS) delivers 100% Core Web Vitals performance, instant page loads, immune security against plugin exploits, and unlimited design flexibility tailored to your exact brand positioning.',
          },
          {
            question: 'How does the Unlimited Graphic Design subscription work?',
            answer: 'You pay a flat monthly rate for continuous creative support. You submit design requests into a queue for social media graphics, ad banners, presentations, pitch decks, and brand marketing collateral with fast 24-48 hour turnaround.',
          },
          {
            question: 'Do your branding services include magazine and publication design?',
            answer: 'Yes. We specialize in editorial publication design (digital magazines, books, annual reports) as part of our branding services, as demonstrated in our Muktibodh publishing system evidence.',
          },
        ]}
      />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-neutral-200">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700">
              Visual Communication &bull; Web Engineering
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8">
            Brand &amp; Digital Experience Design.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 leading-relaxed max-w-3xl">
            We design high-performance websites, enduring brand identities, and predictable graphic design support systems that elevate visual authority.
          </p>
        </div>
      </section>

      {/* 2. DESIGN SERVICE PILLARS (ARRAY-DRIVEN FROM SERVICES.TS) */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4">Design Service Pillars</h2>
          <p className="text-[18px] text-neutral-600">
            Structured creative capabilities engineered for consistency, speed, and digital distinction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designServices.map((service) => (
            <div 
              key={service.slug}
              className="bg-neutral-50 border border-neutral-200 rounded-[32px] p-8 md:p-10 flex flex-col group hover:border-black/20 transition-all shadow-sm"
            >
              <div className="w-14 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                {getIcon(service.slug)}
              </div>
              <span className="text-[11px] font-mono text-[#16a34a] font-bold uppercase tracking-wider mb-2">
                {service.category}
              </span>
              <h3 className="text-[22px] font-extrabold mb-3 text-black">{service.title}</h3>
              <p className="text-[15px] text-neutral-600 leading-relaxed mb-8 flex-grow">
                {service.shortDesc}
              </p>
              <div className="pt-6 border-t border-neutral-200">
                <Link 
                  href={`/services/${service.slug}`} 
                  className="inline-flex items-center text-[15px] font-bold text-black hover:text-[#16a34a] transition-colors"
                >
                  Explore Design Blueprint <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHAT YOU RECEIVE */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4">What You Receive</h2>
            <p className="text-[18px] text-neutral-600">
              Tangible visual assets and design systems to power your brand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Custom Web Application UI/UX", icon: <Layout className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Vector Logo Mark & System", icon: <Palette className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Comprehensive Brand Guidelines", icon: <FileText className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Digital Magazine & Publication Layouts", icon: <Sparkles className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Dedicated Design Queue", icon: <CheckSquare className="w-5 h-5 text-[#16a34a]" /> },
              { title: "Native Source Files (Figma, AI, PSD)", icon: <ShieldCheck className="w-5 h-5 text-[#16a34a]" /> }
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

      {/* 4. HOW WE WORK */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4">Design Workflow</h2>
          <p className="text-[18px] text-neutral-600">
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

        {/* Bottom CTA Block */}
        <div className="bg-[#0A0A0A] p-8 md:p-10 rounded-[24px] text-center shadow-xl max-w-4xl mx-auto">
          <h3 className="text-white font-extrabold text-[20px] md:text-[24px] mb-4">Ready to elevate your visual identity?</h3>
          <p className="text-[16px] text-neutral-400 leading-relaxed mb-8">
            Let&apos;s discuss your website, graphic design support, or brand guidelines. Book a 30-minute discovery consultation.
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
