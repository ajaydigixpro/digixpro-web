import Script from 'next/script';
import React from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export default function ArticleSchema({ title, description, url, publishedAt, updatedAt, imageUrl = "https://www.digixpro.in/opengraph-image.png" }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@id": "https://www.digixpro.in/#founder"
    },
    "publisher": {
      "@id": "https://www.digixpro.in/#organization"
    },
    "datePublished": publishedAt,
    "dateModified": updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return <Script id={`article-schema-${url.split('/').pop()}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}