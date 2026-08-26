import { MetadataRoute } from 'next';
import { knowledgeArticles } from '@/data/knowledge';
import { evidenceItems } from '@/data/evidence';
import { services } from '@/data/services';
import { designSubServices } from '@/data/designServicesData';
import { ADVISORY_SERVICES } from '@/data/advisoryServicesData';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.digixpro.in';

  // 1. Static Core Pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/advisory`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/design-services`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evidence`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/knowledge`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/hi`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Legal / Trust pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Commercial Advisory Sub-Service Slugs
  const advisorySubServiceRoutes: MetadataRoute.Sitemap = ADVISORY_SERVICES.map((advisoryService) => ({
    url: `${baseUrl}/advisory/${advisoryService.slug}`,
    lastModified: new Date('2026-08-26'),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 3. Commercial Design Sub-Service Slugs
  const designSubServiceRoutes: MetadataRoute.Sitemap = designSubServices.map((subService) => ({
    url: `${baseUrl}/design-services/${subService.slug}`,
    lastModified: new Date('2026-08-26'),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 4. TRUE Dynamic Service Slugs (From SSOT)
  const serviceSlugs: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 5. TRUE Dynamic Knowledge Slugs (From SSOT)
  const knowledgeSlugs: MetadataRoute.Sitemap = knowledgeArticles.map((article) => ({
    url: `${baseUrl}/knowledge/${article.id}`,
    lastModified: new Date('2026-08-26'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 6. TRUE Dynamic Evidence Slugs (From SSOT)
  const evidenceSlugs: MetadataRoute.Sitemap = evidenceItems.map((item) => ({
    url: `${baseUrl}/evidence/${item.id}`,
    lastModified: new Date(item.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...advisorySubServiceRoutes, ...designSubServiceRoutes, ...serviceSlugs, ...knowledgeSlugs, ...evidenceSlugs];
}
