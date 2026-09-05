import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { designSubServices } from '@/data/designServicesData';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck
} from 'lucide-react';

function renderTextWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [, linkText, url] = match;
    parts.push(
      <Link key={match.index} href={url} className="text-[#16a34a] font-semibold hover:underline">
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

import CustomBusinessWebsiteDesignView from '@/components/design-services/CustomBusinessWebsiteDesignView';

export async function generateStaticParams() {
  return designSubServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = designSubServices.find((item) => item.slug === resolvedParams.slug);

  if (!service) {
    return {
    metadataBase: new URL('https://www.digixpro.in'),
    title: "Service Not Found",
      description: "The requested design service could not be found.",
    };
  }

  const url = `https://www.digixpro.in/design-services/${service.slug}`;

  return {
    metadataBase: new URL('https://www.digixpro.in'),
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [
      service.primaryKeyword,
      ...service.secondaryKeywords,
      ...service.readyToActKeywords
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.metaTitle}`,
      description: service.metaDescription,
      url: url,
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
      title: `${service.metaTitle}`,
      description: service.metaDescription,
      images: ['/twitter-image.png'],
    },
  };
}

export default async function DesignSubServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = designSubServices.find((item) => item.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  if (resolvedParams.slug === "custom-business-website-design") {
    return <CustomBusinessWebsiteDesignView />;
  }

  const currentUrl = `https://www.digixpro.in/design-services/${service.slug}`;
  const otherServices = designSubServices.filter((s) => s.slug !== service.slug);

  // Service Schema JSON-LD
  const serviceSchemaObj = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "provider": {
      "@type": "ProfessionalService",
      "name": "DigiXPro",
      "url": "https://www.digixpro.in"
    },
    "serviceType": service.title,
    "description": service.metaDescription,
    "url": currentUrl,
    "areaServed": ["US", "UK", "AU", "SG", "IN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Engineering Capabilities",
      "itemListElement": service.solutionDeliverables.map((d, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": d.title,
          "description": d.desc
        },
        "position": idx + 1
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-16 transition-colors duration-200">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaObj) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Website Design & Engineering', url: 'https://www.digixpro.in/design-services' },
          { name: service.title, url: currentUrl },
        ]}
      />
      <FAQSchema items={service.faqs} />

      {/* ==========================================
          SECTION 1 — HERO
      ========================================== */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 md:pt-16 pb-16 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <Link 
            href="/design-services"
            className="inline-flex items-center text-xs font-mono font-bold text-neutral-500 hover:text-[#16a34a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Website Design &amp; Engineering Hub
          </Link>

          <div className="flex items-center space-x-3 mb-6">
            <span className="text-xs font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              SERVICE {service.number}
            </span>
            <span className="text-xs font-mono text-neutral-500 font-bold uppercase">Commercial Acquisition Layer</span>
          </div>

          <h1 className="hero-lcp-heading text-[38px] md:text-[58px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white">
            {service.heroHeading}
          </h1>

          <div className="border-l-4 border-[#16a34a] pl-4 md:pl-6 mb-8">
            <p className="text-[17px] md:text-[21px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              {service.heroSubheading}
            </p>
            <div className="text-xs font-mono font-semibold text-[#16a34a]">
              Buyer Situation: &ldquo;{service.buyerSituation}&rdquo;
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
            >
              {service.ctaButtonText} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/design-services"
              className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] rounded-xl hover:border-black dark:hover:border-white transition-colors min-h-[52px]"
            >
              View All 6 Design Services
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 — SITUATION & PROBLEM OBSTACLES
      ========================================== */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              OPERATING BOTTLENECKS
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold mb-4 text-black dark:text-white">
              {service.problemHeading}
            </h2>
            <p className="text-[16px] md:text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Addressing the core operational and technical issues that prevent business websites from delivering qualified lead pipeline growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.problemPoints.map((point, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mr-4 shrink-0 font-mono font-bold text-xs text-[#16a34a] mt-0.5">
                  0{idx + 1}
                </div>
                <p className="text-[14px] md:text-[15px] font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3 — SOLUTION & TANGIBLE DELIVERABLES
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mb-16">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            TANGIBLE OUTPUTS
          </div>
          <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
            {service.solutionHeading}
          </h2>
          <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Concrete web assets, structured data schemas, and API integrations delivered with full codebase ownership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {service.solutionDeliverables.map((deliv, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-[#16a34a] transition-all">
              <div>
                <div className="flex items-center text-xs font-mono font-bold text-[#16a34a] mb-3">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> DELIVERABLE 0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">{deliv.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{deliv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 3.5 — DECISION FRAMEWORK & OVERVIEW (IF PRESENT)
      ========================================== */}
      {service.overviewSections && service.overviewSections.length > 0 && (
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-16">
            {service.overviewSections.map((sec, idx) => (
              <div key={idx} className="max-w-4xl">
                <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                  DECISION SUPPORT 0{idx + 1}
                </div>
                <h2 className="text-[28px] md:text-[38px] font-extrabold mb-4 text-black dark:text-white leading-tight">
                  {sec.heading}
                </h2>
                {sec.subheading && (
                  <p className="text-[17px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {sec.subheading}
                  </p>
                )}
                <div className="space-y-4 mb-6">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {renderTextWithLinks(p)}
                    </p>
                  ))}
                </div>
                {sec.subsections && sec.subsections.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {sec.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                        <h3 className="text-base font-bold text-black dark:text-white mb-2">{sub.title}</h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{sub.description}</p>
                        {sub.bullets && sub.bullets.length > 0 && (
                          <ul className="mt-3 space-y-1.5 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-2 shrink-0"></span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==========================================
          SECTION 3.6 — ARCHITECTURE COMPARISON TABLE (IF PRESENT)
      ========================================== */}
      {service.comparisonTable && (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                ARCHITECTURE EVALUATION
              </div>
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-3 text-black dark:text-white">
                {service.comparisonTable.title}
              </h2>
              {service.comparisonTable.subtitle && (
                <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.comparisonTable.subtitle}
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/80">
                    <th className="p-4 md:p-5 text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-300 w-1/4">Evaluation Factor</th>
                    <th className="p-4 md:p-5 text-xs font-mono font-bold uppercase text-[#16a34a] w-3/8">{service.comparisonTable.columnAHeader}</th>
                    <th className="p-4 md:p-5 text-xs font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 w-3/8">{service.comparisonTable.columnBHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {service.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                      <td className="p-4 md:p-5 text-xs font-bold text-black dark:text-white align-top">{row.feature}</td>
                      <td className="p-4 md:p-5 text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed align-top bg-emerald-50/30 dark:bg-emerald-950/20">{row.columnA}</td>
                      <td className="p-4 md:p-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed align-top">{row.columnB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          SECTION 4 — SEARCH & CONVERSION ARCHITECTURE
      ========================================== */}
      <section className="bg-white dark:bg-neutral-900 py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                TECHNICAL EXECUTION
              </div>
              <h2 className="text-[30px] md:text-[42px] font-extrabold mb-6 text-black dark:text-white leading-tight">
                Engineered for Search Indexability &amp; Conversion UX
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                We combine modern React/Next.js frontend engineering with technical search architecture and automated lead routing webhooks to ensure your web presence drives measurable business outcomes.
              </p>
              <div className="space-y-3">
                {service.capabilitySignals.map((sig, idx) => (
                  <div key={idx} className="flex items-center text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0" />
                    {sig}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 text-[#16a34a] mr-2" /> Engineering Standard
              </h3>
              <ul className="space-y-3 font-mono text-xs text-neutral-600 dark:text-neutral-300">
                <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                  <span>Primary Keyword Strategy</span>
                  <span className="text-[#16a34a] font-bold">{service.primaryKeyword}</span>
                </li>
                <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                  <span>Structured Data Schema</span>
                  <span className="text-[#16a34a] font-bold">JSON-LD (Service + FAQ)</span>
                </li>
                <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                  <span>Core Web Vitals Target</span>
                  <span className="text-[#16a34a] font-bold">100 / 100</span>
                </li>
                <li className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex justify-between">
                  <span>Lead Pipeline Handoff</span>
                  <span className="text-[#16a34a] font-bold">Direct API Webhook</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5 — PROOF OF EXECUTION
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
            VERIFIED PROOF
          </div>
          <h2 className="text-[32px] md:text-[44px] font-extrabold mb-6 text-black dark:text-white">
            We Build What We Advise
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            The DigiXPro platform is engineered on the exact architecture we deliver: decoupled Next.js static output, automated structured data, 100% Core Web Vitals performance, and secure n8n webhook lead routing.
          </p>

          <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-xl mx-auto text-left">
            <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">LIVE SYSTEM EVIDENCE</div>
            <h3 className="text-base font-bold text-black dark:text-white mb-2">DigiXPro Decoupled Web Platform</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
              Explore how DigiXPro&apos;s own infrastructure achieves sub-second page loads, structured JSON-LD schemas, and zero third-party plugin bloat.
            </p>
            <Link href="/evidence/digixpro" className="text-xs font-bold text-[#16a34a] hover:underline inline-flex items-center">
              View Platform Case Study <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6 — SITUATION-SPECIFIC BUYER FAQS
      ========================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              BUYER QUESTIONS &amp; OBJECTIONS
            </div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold mb-4 text-black dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Clear answers to buyer questions regarding {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-6">
            {service.faqs.map((item, idx) => (
              <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-[17px] md:text-[19px] font-bold text-black dark:text-white mb-3 flex items-start">
                  <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                  {item.question}
                </h3>
                <div className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                  {renderTextWithLinks(item.answer)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7 — OTHER DESIGN SERVICES (INTERNAL NAVIGATION)
      ========================================== */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mb-12">
          <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-2">
            EXPLORE OTHER SITUATIONS
          </div>
          <h2 className="text-2xl font-extrabold text-black dark:text-white">
            Related Web Engineering Services
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherServices.slice(0, 3).map((item) => (
            <Link 
              key={item.slug}
              href={`/design-services/${item.slug}`}
              className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-[#16a34a] transition-all group"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#16a34a] block mb-1">SERVICE {item.number}</span>
                <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-1">{item.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{item.shortDesc}</p>
              </div>
              <div className="mt-4 text-xs font-bold text-[#16a34a] flex items-center">
                Explore Service <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 8 — FINAL CONVERSION CTA
      ========================================== */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 md:p-14 rounded-[32px] text-center shadow-xl max-w-4xl mx-auto">
          <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-4">
            COMMERCIAL DISCOVERY
          </span>
          <h2 className="text-white font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
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
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
            >
              View Investment Guide
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
            >
              Explore Advisory Services
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <DeferredStickyMobileCTA />
    </div>
  );
}
