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

export const metadata: Metadata = {
  title: 'The Decision Library — Web Engineering, Technical SEO & Systems Architecture | DigiXPro',
  description: 'Documented architecture decisions, custom website engineering principles, technical SEO strategy, and workflow automation lessons from production systems.',
  alternates: {
    canonical: 'https://www.digixpro.in/knowledge',
  },
  openGraph: {
    title: 'The Decision Library | DigiXPro',
    description: 'Documented architecture and operational intelligence from live production systems.',
    url: 'https://www.digixpro.in/knowledge',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'The Decision Library | DigiXPro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Decision Library | DigiXPro',
    description: 'Documented architecture and operational intelligence from live production systems.',
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
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-16 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#009E73]" />
            <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
              Architecture Insights
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-8 text-black dark:text-white">
            The Decision Library.
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-8">
            Real lessons from production systems, consulting engagements, and architecture decisions. 
          </p>

          {/* Philosophy Block */}
          <div className="bg-neutral-50 dark:bg-neutral-900/50 border-l-4 border-[#009E73] p-6 rounded-r-2xl max-w-3xl border-neutral-200 dark:border-neutral-800">
            <p className="text-[16px] text-neutral-700 dark:text-neutral-300 font-medium">
              <strong className="text-black dark:text-white">Our Editorial Rule:</strong> Every insight published here originates from a real architecture decision, an advisory engagement, or a live production system. We don&apos;t write trend pieces; we document engineering reality to help founders make better technical decisions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE 5 PILLARS */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-12 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex items-center space-x-3 w-full md:w-auto min-w-max bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-6 py-4 rounded-xl shadow-sm">
                <div className="text-[#009E73]">{pillar.icon}</div>
                <span className="font-bold text-[15px] text-black dark:text-white">{pillar.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE DECISION LIBRARY LIST */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[40px] font-extrabold mb-4 text-black dark:text-white">Latest Insights</h2>
          <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
            Documented architecture and operational intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {knowledgeArticles.map((article, idx) => (
            <Link 
              href={`/knowledge/${article.id}`} 
              key={idx}
              className="group block border-b md:border-b-0 md:border border-neutral-200 dark:border-neutral-800 pb-8 md:p-8 md:rounded-[24px] hover:border-black/30 dark:hover:border-neutral-700 transition-all bg-white dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 px-3 py-1 rounded-md bg-neutral-50 dark:bg-neutral-800 group-hover:bg-white dark:group-hover:bg-neutral-900 transition-colors">
                  {article.pillar}
                </span>
                <span className="text-[12px] font-mono text-neutral-400 dark:text-neutral-500 font-medium flex items-center">
                  <GitBranch className="w-3.5 h-3.5 mr-1.5" />
                  {article.date}
                </span>
              </div>
              
              <h3 className="text-[22px] md:text-[26px] font-extrabold text-black dark:text-white mb-4 leading-snug group-hover:text-[#009E73] dark:group-hover:text-[#009E73] transition-colors">
                {article.title}
              </h3>
              
              {article.image && (
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}

              <p className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {article.summary}
              </p>
              
              <div className="inline-flex items-center text-[15px] font-bold text-black dark:text-white group-hover:text-[#009E73] dark:group-hover:text-[#009E73] transition-colors">
                Read the breakdown <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
