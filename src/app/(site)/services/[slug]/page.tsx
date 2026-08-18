import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, ENGAGEMENT_PRICING_PHILOSOPHY } from '@/data/services';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import PersonSchema from '@/components/seo/PersonSchema';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
} from 'lucide-react';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((item) => item.slug === resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested advisory service could not be found.",
    };
  }

  const url = `https://www.digixpro.in/services/${service.slug}`;

  return {
    title: `${service.title} | DigiXPro`,
    description: service.heroSubheading,
    keywords: service.keywords || [
      service.primaryKeyword,
      service.supportingKeyword,
      service.category,
      "DigiXPro advisory",
      "technology architecture India",
      "Dr Ajay Shukla",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | DigiXPro Advisory`,
      description: service.heroSubheading,
      url,
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `DigiXPro — ${service.title}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | DigiXPro Advisory`,
      description: service.heroSubheading,
      images: ['/twitter-image.png'],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find((item) => item.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const parentHubUrl = service.track === 'design' ? 'https://www.digixpro.in/design-services' : 'https://www.digixpro.in/advisory';
  const parentHubName = service.track === 'design' ? 'Design Services' : 'Advisory Services';
  const parentHubPath = service.track === 'design' ? '/design-services' : '/advisory';

  const serviceSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDesc,
    "provider": {
      "@type": "Organization",
      "name": "DigiXPro Digital Solution",
      "url": "https://www.digixpro.in"
    },
    "serviceType": service.category,
    "keywords": service.keywords ? service.keywords.join(", ") : `${service.primaryKeyword}, ${service.supportingKeyword}`,
    "url": `https://www.digixpro.in/services/${service.slug}`
  };

  // Determine track decision context wording
  const isLeadership = service.category === 'Strategic Leadership' || service.slug.includes('fractional');
  const trackDecisionBadge = isLeadership 
    ? "Executive Leadership Decision" 
    : service.track === 'design' 
      ? "Design System & Visual Identity Decision" 
      : "Technology Architecture Decision";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: parentHubName, url: parentHubUrl },
          { name: service.title, url: `https://www.digixpro.in/services/${service.slug}` },
        ]}
      />
      <FAQSchema items={service.faqs} />
      <PersonSchema />

      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaMarkup) }}
      />

      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          {/* Back Navigation Link */}
          <Link 
            href={parentHubPath} 
            className="inline-flex items-center text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white mb-8 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to {parentHubName}
          </Link>

          <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-1.5 rounded-full mb-6 block">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
              {service.badgeText} &bull; {service.category}
            </span>
          </div>

          <h1 className="text-[40px] md:text-[60px] font-extrabold tracking-tight leading-[1.08] mb-8 text-black dark:text-white">
            {service.heroHeading}
          </h1>

          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-10">
            {service.heroSubheading}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
            >
              {service.ctaButtonText} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] md:text-[15px] rounded-xl hover:border-neutral-500 dark:hover:border-neutral-400 hover:text-black dark:hover:text-white transition-colors min-h-[52px]"
            >
              View Related Evidence
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM / BOTTLENECKS SECTION */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest block mb-2">The Operational Bottleneck</span>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white mb-4">
              {service.problemHeading}
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
              Why standard approaches fail and how operational complexity slows down growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {service.problemPoints.map((point, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-0.5" />
                <p className="text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTION & DELIVERABLES */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono text-[#16a34a] font-bold uppercase tracking-widest block mb-2">Architecture Output</span>
          <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 text-black dark:text-white">
            {service.solutionHeading}
          </h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            Tangible, production-ready deliverables designed for operational clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {service.solutionDeliverables.map((item, idx) => (
            <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-[28px] p-8 flex flex-col hover:border-black/20 dark:hover:border-neutral-700 transition-all">
              <div className="w-12 h-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[#16a34a]" />
              </div>
              <h3 className="text-[22px] font-extrabold mb-3 text-black dark:text-white">{item.title}</h3>
              <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-24 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Answers</span>
            </div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-black dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
              Clear answers regarding scope, process, and architectural rationale for {service.title}.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {service.faqs.map((faq, idx) => {
              const faqId = `faq-${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
              return (
                <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
                  <h3 id={faqId} className="text-[18px] md:text-[20px] font-extrabold text-black dark:text-white mb-3 scroll-mt-24">
                    {faq.question}
                  </h3>
                  <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SINGLE BOTTOM CTA SECTION (TRACK-DYNAMIC & PROBLEM-SPECIFIC) */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-[32px] p-10 md:p-16 text-center shadow-xl max-w-4xl mx-auto">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full mb-6 inline-block">
            {trackDecisionBadge}
          </span>
          <h2 className="text-[28px] md:text-[40px] font-extrabold mb-4 leading-tight">
            {service.ctaHeading}
          </h2>
          <p className="text-[16px] md:text-[18px] text-neutral-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            {service.ctaSubtext}
          </p>
          <p className="text-[14px] md:text-[15px] text-neutral-300 bg-neutral-900/90 dark:bg-neutral-800/60 border border-neutral-800 dark:border-neutral-700/80 p-5 md:p-6 rounded-2xl max-w-2xl mx-auto mb-8 leading-relaxed text-left md:text-center shadow-inner">
            {ENGAGEMENT_PRICING_PHILOSOPHY}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#009E73] text-white font-bold text-[15px] rounded-xl hover:bg-[#007a5a] transition-colors shadow-md min-h-[52px]"
          >
            {service.ctaButtonText} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <StickyMobileCTA />
    </div>
  );
}
