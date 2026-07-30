import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce canonical URLs without trailing slashes to prevent duplicate content
  trailingSlash: false,

  // Remove X-Powered-By header (minor security hygiene)
  poweredByHeader: false,

  // Image optimization — enable modern formats
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Security & SEO HTTP headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/(.*)\\.(ico|png|svg|jpg|jpeg|webp|avif|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
