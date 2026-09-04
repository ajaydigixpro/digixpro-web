import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: '404 Page Not Found | DigiXPro',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: '404 Page Not Found | DigiXPro',
    description: 'The page you are looking for does not exist or has been moved.',
    url: 'https://www.digixpro.in/404',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'DigiXPro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 Page Not Found | DigiXPro',
    description: 'The page you are looking for does not exist or has been moved.',
    images: ['/twitter-image.png'],
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#009E73] text-white font-bold rounded-xl hover:bg-[#007a55] transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
