import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SalesConcierge from "@/components/layout/SalesConcierge";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import MicrosoftClarity from "@/components/seo/MicrosoftClarity";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#009E73",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digixpro.in"),
  applicationName: "DigiXPro",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.digixpro.in/hi",
  },
};

export default function HindiRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20 flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <OrganizationSchema />
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
