import { MetadataRoute } from 'next';
import { knowledgeArticles } from '@/data/knowledge';
import { evidenceItems } from '@/data/evidence';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.digixpro.in';

  // 1. Static Core Pages — with accurate static dates and differentiated frequencies
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/advisory`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evidence`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/knowledge`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 2. TRUE Dynamic Knowledge Slugs (From SSOT)
  const knowledgeSlugs: MetadataRoute.Sitemap = knowledgeArticles.map((article) => ({
    url: `${baseUrl}/knowledge/${article.id}`,
    lastModified: new Date('2025-07-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 3. TRUE Dynamic Evidence Slugs (From SSOT)
  const evidenceSlugs: MetadataRoute.Sitemap = evidenceItems.map((item) => ({
    url: `${baseUrl}/evidence/${item.id}`,
    lastModified: new Date(item.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...knowledgeSlugs, ...evidenceSlugs];
}