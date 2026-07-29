import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { knowledgeArticles } from '@/data/knowledge';
import ArticleSchema from '@/components/seo/ArticleSchema';

export async function generateStaticParams() {
  return knowledgeArticles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = knowledgeArticles.find((item) => item.id === resolvedParams.id);
  return {
    title: article ? article.title : "Article Not Found",
    description: article ? article.summary : "Decision Library Article",
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = knowledgeArticles.find((item) => item.id === resolvedParams.id);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[32px] font-extrabold mb-4">Decision Article Not Found</h1>
        <p className="text-neutral-600 mb-8">The architecture insight you are looking for does not exist or has been archived.</p>
        <Link href="/knowledge" className="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-[#009E73] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to The Decision Library
        </Link>
      </div>
    );
  }

  const articleUrl = `https://digixpro.in/knowledge/${article.id}`;

  return (
    <>
      <ArticleSchema 
        title={article.title}
        description={article.summary}
        url={articleUrl}
        publishedAt="2026-01-01"
        updatedAt="2026-01-01"
      />

      <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#009E73]/20 pb-24">
        
        {/* Back Link */}
        <div className="max-w-[800px] mx-auto px-6 pt-12">
          <Link href="/knowledge" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black transition">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to The Decision Library
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-[800px] mx-auto px-6 pt-8 pb-16">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-md">
              {article.pillar}
            </span>
            <span className="text-[12px] font-mono text-neutral-400 font-medium flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {article.date}
            </span>
          </div>

          <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.15] mb-8 text-black">
            {article.title}
          </h1>

          <p className="text-[20px] font-medium text-neutral-700 leading-relaxed pb-8 border-b border-neutral-200 mb-10">
            {article.summary}
          </p>

          {/* Article Body Content */}
          <div className="prose prose-neutral max-w-none text-[17px] text-neutral-800 leading-[1.8] space-y-6">
            {article.content.trim().split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
          </div>

          {/* Author / Practice Signoff */}
          <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold text-black">Published by DigiXPro Advisory Practice</p>
              <p className="text-[13px] text-neutral-500">Independent Technology Architecture & Systems</p>
            </div>
            <Link href="/contact" className="inline-flex items-center text-[14px] font-bold text-[#009E73] hover:underline">
              Discuss Your Architecture <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </article>

      </div>
    </>
  );
}