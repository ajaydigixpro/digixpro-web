import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  BookOpen,
  Briefcase,
  Database,
  Settings,
  Cpu,
  ShieldCheck,
  GitBranch
} from 'lucide-react';
import { knowledgeArticles } from '@/data/knowledge';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'The Decision Library: Systems Architecture & Tech Guides',
  description: 'Documented architecture decisions, custom website engineering principles, technical SEO strategy, and workflow automation lessons from production systems.',
  keywords: [
    'systems architecture',
    'web engineering',
    'technical SEO',
    'workflow automation',
    'DigiXPro decision library',
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/knowledge',
  },
  openGraph: {
    title: 'The Decision Library: Systems Architecture & Tech Guides | DigiXPro',
    description: 'Documented architecture decisions, custom website engineering principles, and workflow automation lessons from production systems.',
    url: 'https://www.digixpro.in/knowledge',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'The Decision Library | DigiXPro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Decision Library: Systems Architecture & Tech Guides | DigiXPro',
    description: 'Documented architecture decisions and web engineering principles from production systems.',
    images: ['/twitter-image.png'],
  },
};

export default function KnowledgePage() {
  const pillars = [
    { name: "Business Systems", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Technology Architecture", icon: <Database className="w-5 h-5" /> },
    { name: "Operations & Automation", icon: <Settings className="w-5 h-5" /> },
    { name: "Artificial Intelligence", icon: <Cpu className="w-5 h-5" /> },
    { name: "Lessons from Production", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20 pb-16 transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Knowledge', url: 'https://www.digixpro.in/knowledge' },
        ]}
      />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-16 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#009E73]" />
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
              Architecture Insights
            </span>
          </div>

          <h1 className="text-[42px] md:text-[60px] font-extrabold tracking-tight leading-[1.08] mb-6 text-black dark:text-white">
            Technology Architecture Knowledge Library
          </h1>

          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            Documented architecture decisions, custom website engineering principles, technical SEO strategy, and workflow automation lessons from production implementations.
          </p>
        </div>
      </section>

      {/* 2. PILLARS GRID */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap gap-3">
          {pillars.map((p, idx) => (
            <div key={idx} className="flex items-center space-x-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 text-[14px] font-bold">
              <span className="text-[#009E73]">{p.icon}</span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ARTICLES LIST */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {knowledgeArticles.map((article) => (
            <article key={article.id} className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-[#009E73]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[12px] font-mono text-neutral-500 mb-4">
                  <span className="text-[#009E73] font-bold uppercase tracking-wider">{article.pillar}</span>
                  <span>{article.date}</span>
                </div>

                <h2 className="text-[20px] font-extrabold text-black dark:text-white mb-3 group-hover:text-[#009E73] transition-colors leading-snug">
                  <Link href={`/knowledge/${article.id}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <Link href={`/knowledge/${article.id}`} className="inline-flex items-center text-[13px] font-bold text-black dark:text-neutral-200 group-hover:text-[#009E73] transition-colors">
                  Read Architecture Decision <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. FOOTER CONVERSION CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pt-8">
        <div className="bg-[#0A0A0A] text-white p-10 md:p-14 rounded-3xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#009E73] bg-[#009E73]/10 border border-[#009E73]/20 px-3 py-1 rounded-full mb-4 inline-block">
              Technology Advisory &amp; Architecture
            </span>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-white mb-4 leading-tight">
              Evaluating an Enterprise Technology Decision?
            </h2>
            <p className="text-[16px] text-neutral-300 leading-relaxed">
              Before allocating software budgets or purchasing off-the-shelf templates, schedule an independent architecture review with Dr. Ajay Shukla.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 inline-flex items-center justify-center px-7 py-4 bg-[#009E73] text-white font-bold text-[15px] rounded-xl hover:bg-[#007a5a] transition-all shadow-lg">
            Book a Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}
