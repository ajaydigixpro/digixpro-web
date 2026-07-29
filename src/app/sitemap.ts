import { MetadataRoute } from 'next';
import { knowledgeArticles } from '@/data/knowledge';
import { evidenceItems } from '@/data/evidence';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://digixpro.in';

  // 1. Static Core Pages
  const routes = [
    '',
    '/advisory',
    '/how-we-work',
    '/evidence',
    '/knowledge',
    '/founder',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. TRUE Dynamic Knowledge Slugs (From SSOT)
  const knowledgeSlugs = knowledgeArticles.map((article) => ({
    url: `${baseUrl}/knowledge/${article.id}`,
    // Ideally map this to a real date field if available, fallback to new Date()
    lastModified: new Date(), 
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 3. TRUE Dynamic Evidence Slugs (From SSOT)
  const evidenceSlugs = evidenceItems.map((item) => ({
    url: `${baseUrl}/evidence/${item.id}`,
    lastModified: new Date(item.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...knowledgeSlugs, ...evidenceSlugs];
}