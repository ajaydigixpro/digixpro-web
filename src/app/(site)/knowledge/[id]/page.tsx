import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
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
  const title = article ? article.title : "Article Not Found";
  const description = article ? article.summary : "Decision Library Article";
  const url = `https://www.digixpro.in/knowledge/${resolvedParams.id}`;

  return {
    title: `${title} — Decision Library`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | DigiXPro`,
      description,
      url,
      type: 'article',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DigiXPro`,
      description,
      images: ['/twitter-image.png'],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = knowledgeArticles.find((item) => item.id === resolvedParams.id);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100">
        <h1 className="text-[32px] font-extrabold mb-4">Decision Article Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">The architecture insight you are looking for does not exist or has been archived.</p>
        <Link href="/knowledge" className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to The Decision Library
        </Link>
      </div>
    );
  }

  const articleUrl = `https://www.digixpro.in/knowledge/${article.id}`;
  const sanitizedContent = DOMPurify.sanitize(article.content, {
    ALLOWED_TAGS: [
      'a', 'blockquote', 'br', 'code', 'div', 'em', 'h2', 'h3', 'h4', 'img', 'li',
      'ol', 'p', 'section', 'span', 'strong', 'table', 'tbody', 'td', 'th',
      'thead', 'tr', 'ul',
    ],
    ALLOWED_ATTR: ['alt', 'class', 'colspan', 'href', 'rel', 'rowspan', 'src', 'target', 'width', 'height'],
  });

  return (
    <>
      <ArticleSchema 
        title={article.title}
        description={article.summary}
        url={articleUrl}
        publishedAt="2026-01-01"
        updatedAt="2026-01-01"
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20 pb-24 transition-colors duration-200">
        
        {/* Back Link */}
        <div className="max-w-[800px] mx-auto px-6 pt-12">
          <Link href="/knowledge" className="inline-flex items-center text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to The Decision Library
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-[800px] mx-auto px-6 pt-8 pb-16">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-1 rounded-md">
              {article.pillar}
            </span>
            <span className="text-[12px] font-mono text-neutral-400 dark:text-neutral-500 font-medium flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {article.date}
            </span>
          </div>

          <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.15] mb-8 text-black dark:text-white">
            {article.title}
          </h1>

          <p className="text-[20px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed pb-8 border-b border-neutral-200 dark:border-neutral-800 mb-10">
            {article.summary}
          </p>

          {article.image && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-[17px] text-neutral-800 dark:text-neutral-200 leading-[1.8] space-y-6">
            {sanitizedContent.trim().split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<h4') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<div') || trimmed.startsWith('<section') || trimmed.startsWith('<table') || trimmed.startsWith('<blockquote')) {
                return <div key={idx} dangerouslySetInnerHTML={{ __html: trimmed }} />;
              }
              if (trimmed.startsWith('### ')) {
                return <h3 key={idx} className="text-[22px] font-extrabold text-black dark:text-white mt-8 mb-3">{trimmed.replace('### ', '')}</h3>;
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={idx} className="text-[26px] font-extrabold text-black dark:text-white mt-10 mb-4">{trimmed.replace('## ', '')}</h2>;
              }
              return <p key={idx} dangerouslySetInnerHTML={{ __html: trimmed }} />;
            })}
          </div>

          {/* Author / Practice Signoff */}
          <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold text-black dark:text-white">Published by DigiXPro Digital Solution</p>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400">Technology Architecture Advisory &middot; Dr. Ajay Shukla</p>
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
