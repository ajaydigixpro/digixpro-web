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
        permanent: false,
      },
      {
        source: '/services/unlimited-graphic-design',
        destination: '/design-services',
        permanent: true,
      },
      {
        source: '/services/erp-consultant-services',
        destination: '/services/business-process-automation',
        permanent: true,
      },
      {
        source: '/services/social-media-campaign-strategy',
        destination: '/services/website-design-services',
        permanent: true,
      },
      {
        source: '/services/branding-services',
        destination: '/design-services',
        permanent: true,
      },
      {
        source: '/services/fractional-ceo-services',
        destination: '/services/business-process-automation',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
