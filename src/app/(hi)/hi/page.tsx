import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'हिंदी संस्करण (जल्द आ रहा है) | डिजिएक्सप्रो',
  description: 'डिजिएक्सप्रो का हिंदी संस्करण जल्द ही उपलब्ध होगा। स्वतंत्र प्रौद्योगिकी वास्तुकला परामर्श।',
  alternates: {
    canonical: 'https://www.digixpro.in/hi',
    languages: {
      en: 'https://www.digixpro.in/',
      hi: 'https://www.digixpro.in/hi',
      'x-default': 'https://www.digixpro.in/',
    },
  },
};

export default function HindiHomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 md:p-16 bg-neutral-50 dark:bg-neutral-900/50 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-4 py-1.5 rounded-full mb-6 text-amber-800 dark:text-amber-300">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">
            हिन्दी संस्करण &bull; निर्माणाधीन (Coming Soon)
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
          हिंदी संस्करण जल्द आ रहा है
        </h1>

        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
          डिजिएक्सप्रो का आधिकारिक हिंदी पोर्टल तैयार किया जा रहा है। पूर्ण हिंदी सामग्री अगले चरण में उपलब्ध होगी।
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#009E73] dark:hover:bg-[#009E73] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> मुख्य वेबसाइट पर जाएं (English Main Site)
          </Link>
        </div>
      </div>
    </div>
  );
}
