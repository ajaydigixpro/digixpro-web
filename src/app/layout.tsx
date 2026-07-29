import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#009E73",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://digixpro.in"),
  applicationName: "DigiXPro",
  title: {
    default: "DigiXPro | Independent Technology Architecture Advisory",
    template: "%s | DigiXPro",
  },
  description:
    "Your business is growing. Your operations aren't. Every wrong technology decision costs time, money, and momentum.",
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
    url: "https://digixpro.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiXPro | Independent Technology Architecture Advisory",
    description:
      "Your business is growing. Your operations aren't. Every wrong technology decision costs time, money, and momentum.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#009E73]/20 flex flex-col`}
      >
        <OrganizationSchema />
        <WebSiteSchema />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}