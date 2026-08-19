import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], display: "optional" });

export const viewport: Viewport = {
  themeColor: "#009E73",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digixpro.in"),
  applicationName: "DigiXPro",
  title: "DigiXPro Studio — Website, Brand & Campaign Design",
  description:
    "DigiXPro Studio crafts bespoke high-performance websites, enduring brand identities, and integrated campaign creative systems.",
  alternates: {
    canonical: "https://www.digixpro.in/studio",
  },
  openGraph: {
    type: "website",
    siteName: "DigiXPro",
    title: "DigiXPro Studio — Website, Brand & Campaign Design",
    description:
      "DigiXPro Studio crafts bespoke high-performance websites, enduring brand identities, and integrated campaign creative systems.",
    url: "https://www.digixpro.in/studio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DigiXPro Studio — Website, Brand & Campaign Design",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiXPro Studio — Website, Brand & Campaign Design",
    description:
      "DigiXPro Studio crafts bespoke high-performance websites, enduring brand identities, and integrated campaign creative systems.",
    images: ["/twitter-image.png"],
  },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
