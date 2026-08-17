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
        source: '/services/unlimited-graphic-design',
        destination: '/services/branding-services',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
