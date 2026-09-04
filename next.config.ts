import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Cloudflare Pages
  output: "export",

  // Disable default image optimization server for static export
  images: {
    unoptimized: true,
  },

  // Enforce canonical URLs without trailing slashes
  trailingSlash: false,

  // Remove X-Powered-By header
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: '/studio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/unlimited-graphic-design',
        destination: '/design-services',
        permanent: true,
      },
      {
        source: '/services/erp-consultant-services',
        destination: '/advisory/business-systems-process-architecture',
        permanent: true,
      },
      {
        source: '/services/it-consulting-services',
        destination: '/advisory/it-consulting-technology-strategy',
        permanent: true,
      },
      {
        source: '/services/ai-consulting-services',
        destination: '/search-automation/ai-search-optimization-geo',
        permanent: true,
      },
      {
        source: '/services/ai-automation-agency',
        destination: '/search-automation/workflow-ai-automation',
        permanent: true,
      },
      {
        source: '/services/business-process-automation',
        destination: '/search-automation/workflow-ai-automation',
        permanent: true,
      },
      {
        source: '/services/website-design-services',
        destination: '/design-services',
        permanent: true,
      },
      {
        source: '/services/social-media-campaign-strategy',
        destination: '/search-automation/social-media-management',
        permanent: true,
      },
      {
        source: '/services/branding-services',
        destination: '/design-services',
        permanent: true,
      },
      {
        source: '/services/website-design-for-trades-and-contractors',
        destination: '/design-services/small-business-websites',
        permanent: true,
      },
      {
        source: '/services/fractional-cto-services',
        destination: '/advisory/fractional-cto-technology-leadership',
        permanent: true,
      },
      {
        source: '/services/fractional-ceo-services',
        destination: '/advisory',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
