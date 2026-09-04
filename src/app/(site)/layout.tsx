import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SalesConcierge from "@/components/layout/SalesConcierge";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import MicrosoftClarity from "@/components/seo/MicrosoftClarity";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// The homepage LCP is text. Optional display keeps the critical heading
// paintable with the system fallback instead of waiting for Inter to arrive.
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#009E73",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digixpro.in"),
  applicationName: "DigiXPro",
  title: {
    default: "DigiXPro | Independent Technology Architecture Advisory",
    template: "%s | DigiXPro",
  },
  description:
    "Your business is growing. Your operations aren't. Every wrong technology decision costs time, money, and momentum.",
  keywords: [
    "technology architecture advisory",
    "business operating system",
    "CRM ERP advisory India",
    "workflow automation consulting",
    "AI business systems",
    "DigiXPro",
    "Dr Ajay Shukla",
    "startup technology consultant",
    "digital transformation advisory",
  ],
  authors: [{ name: "Dr. Ajay Shukla (डॉ. अजय शुक्ल — विद्या वाचस्पति)", url: "https://www.digixpro.in/founder" }],
  creator: "DigiXPro",
  publisher: "DigiXPro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.digixpro.in",
    languages: {
      "en-IN": "https://www.digixpro.in",
      "x-default": "https://www.digixpro.in",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "DigiXPro",
    title: "DigiXPro | Independent Technology Architecture Advisory",
    description:
      "Your business is growing. Your operations aren't. Every wrong technology decision costs time, money, and momentum.",
    url: "https://www.digixpro.in",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DigiXPro — Independent Technology Architecture Advisory",
        type: "image/png",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@digixpro",
    creator: "@digixpro",
    title: "DigiXPro | Independent Technology Architecture Advisory",
    description:
      "Your business is growing. Your operations aren't. Every wrong technology decision costs time, money, and momentum.",
    images: [
      {
        url: "/twitter-image.png",
        alt: "DigiXPro — Independent Technology Architecture Advisory",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://calendly.com" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20 flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <OrganizationSchema />
          <WebSiteSchema />
          <MicrosoftClarity />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <SalesConcierge />
        </ThemeProvider>
      </body>
    </html>
  );
}
