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

  // Section 1: Legacy contamination — 301 permanent redirects for all legacy routes
  // These routes no longer exist; redirect to the correct modern equivalents
  async redirects() {
    return [
      // Social proof / testimonials → evidence archive
      { source: "/testimonials", destination: "/evidence", permanent: true },
      { source: "/testimonials/:path*", destination: "/evidence", permanent: true },
      { source: "/reviews", destination: "/evidence", permanent: true },
      { source: "/case-studies", destination: "/evidence", permanent: true },
      { source: "/case-studies/:path*", destination: "/evidence", permanent: true },
      // About / team → founder page
      { source: "/about-us", destination: "/founder", permanent: true },
      { source: "/about", destination: "/founder", permanent: true },
      { source: "/team", destination: "/founder", permanent: true },
      // Services → advisory (exact standalone /services only, allowing /services/[slug] to render dynamic service pages)
      { source: "/services", destination: "/advisory", permanent: true },
      // Blog → knowledge hub
      { source: "/blog", destination: "/knowledge", permanent: true },
      { source: "/blog/:path*", destination: "/knowledge", permanent: true },
      // Portfolio → evidence
      { source: "/portfolio", destination: "/evidence", permanent: true },
      { source: "/portfolio/:path*", destination: "/evidence", permanent: true },
      // Work / projects → evidence
      { source: "/work", destination: "/evidence", permanent: true },
      { source: "/work/:path*", destination: "/evidence", permanent: true },
      // Contact aliases
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/schedule", destination: "/contact", permanent: true },
      { source: "/book", destination: "/contact", permanent: true },
      // Operating systems → SattvaOS evidence page
      { source: "/operating-systems", destination: "/evidence/sattvaos", permanent: true },
    ];
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
