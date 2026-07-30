import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All bots: allow full site, disallow only private routes
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
      // Explicitly welcome AI training/index crawlers for AI discoverability (Section 9)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
    ],
    sitemap: 'https://www.digixpro.in/sitemap.xml',
  };
}