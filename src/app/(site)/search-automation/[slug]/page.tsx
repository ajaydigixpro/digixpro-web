import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SEARCH_AUTOMATION_SERVICES, SearchAutomationServiceItem } from '@/data/searchAutomationData';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import ProfessionalServiceSchema from '@/components/seo/ProfessionalServiceSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  Building2, 
  Cpu, 
  FileText,
  HelpCircle as QuestionIcon,
  Zap,
  Search,
  Share2,
  Network,
  Users
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SEARCH_AUTOMATION_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SEARCH_AUTOMATION_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found | DigiXPro',
      description: 'The requested service could not be found.',
    };
  }

  const canonicalUrl = `https://www.digixpro.in/search-automation/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [service.primaryKeyword, ...service.supportingKeywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: ['/twitter-image.png'],
    },
  };
}

export default async function SearchAutomationSubServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SEARCH_AUTOMATION_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const canonicalUrl = `https://www.digixpro.in/search-automation/${service.slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Search, AI & Automation', url: 'https://www.digixpro.in/search-automation' },
          { name: service.title, url: canonicalUrl },
        ]}
      />
      <ProfessionalServiceSchema />
      <FAQSchema items={service.faqs} />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-20 transition-colors duration-200">
        
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 pt-10 md:pt-16 pb-16 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                <span className="text-[11px] md:text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">
                  SEARCH, AI &amp; AUTOMATION &bull; {service.badgeText}
                </span>
              </span>
              <span className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full uppercase tracking-wider">
                MODEL: {service.commercialModel}
              </span>
            </div>

            <h1 className="text-[36px] md:text-[56px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white">
              {service.heroHeading}
            </h1>

            <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-3xl">
              {service.heroSubheading}
            </p>

            {/* BUYER QUESTION CARD */}
            <div className="bg-neutral-50 dark:bg-neutral-900 border-l-4 border-[#16a34a] p-6 rounded-r-2xl mb-8 shadow-sm">
              <div className="text-xs font-mono font-bold text-[#16a34a] uppercase tracking-wider mb-2 flex items-center">
                <QuestionIcon className="w-4 h-4 mr-2" /> Key Buyer Question
              </div>
              <p className="text-lg md:text-xl font-extrabold text-black dark:text-white italic">
                &ldquo;{service.buyerQuestion}&rdquo;
              </p>
              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                {service.buyerSituation}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
              >
                {service.ctaButtonText} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/search-automation"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] rounded-xl hover:border-black dark:hover:border-white transition-colors min-h-[52px]"
              >
                Explore All Search &amp; Automation Services
              </Link>
            </div>
          </div>
        </section>

        {/* PROBLEM RECOGNITION */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mb-12">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              ACQUISITION &amp; OPERATIONAL FRICTION
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white">
              {service.problemHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.problemPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
                </div>
                <p className="text-[15px] md:text-[16px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TANGIBLE DELIVERABLES */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mb-14">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              TANGIBLE SYSTEM OUTPUTS
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white">
              {service.solutionHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-[#16a34a]/40 transition-colors"
              >
                <div className="flex items-center mb-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#16a34a] font-mono font-bold text-xs flex items-center justify-center mr-3 shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-black dark:text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 pl-10 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* REAL CONTEXTUAL EVIDENCE */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              REAL-WORLD PROOF
            </div>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-black dark:text-white mb-4">
              Contextual Proof: {service.evidenceTitle}
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              {service.evidenceText}
            </p>
            <Link
              href={service.evidenceLink}
              className="inline-flex items-center text-xs font-mono font-bold text-[#16a34a] hover:underline"
            >
              Explore Case Study Proof &rarr;
            </Link>
          </div>
        </section>

        {/* BUYER FAQS */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              BUYER QUESTIONS &amp; OBJECTIONS
            </div>
            <h2 className="text-[30px] md:text-[40px] font-extrabold text-black dark:text-white">
              Questions Buyers Ask About {service.title}
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800"
              >
                <h3 className="text-[17px] md:text-[19px] font-bold text-black dark:text-white mb-3 flex items-start">
                  <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* VENDOR-NEUTRAL PHILOSOPHY & CTA */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 text-white p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto border border-neutral-800">
            <ShieldCheck className="w-10 h-10 text-[#16a34a] mx-auto mb-4" />
            <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-3">
              CONNECTED ACQUISITION SYSTEM
            </span>
            <h2 className="text-[28px] md:text-[40px] font-extrabold mb-4 leading-tight">
              {service.ctaHeading}
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              {service.ctaSubtext}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#16a34a] text-white font-bold text-[15px] rounded-xl hover:bg-[#15803d] transition-colors shadow-md min-h-[52px]"
              >
                {service.ctaButtonText} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              {/* PHASE 25 (Part 5/6 funnel gap): no canonical service page
                  linked to /pricing anywhere on the site before this. */}
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-700 text-neutral-300 font-bold text-[14px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
              >
                View Investment Guide
              </Link>
              <Link
                href="/search-automation"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-700 text-neutral-300 font-bold text-[14px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
              >
                View All Search &amp; Automation Services
              </Link>
            </div>
          </div>
        </section>

        <DeferredStickyMobileCTA />
      </div>
    </>
  );
}
