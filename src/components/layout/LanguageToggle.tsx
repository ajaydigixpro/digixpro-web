'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const pathname = usePathname();
  const isHindi = pathname?.startsWith('/hi');

  const targetHref = isHindi ? '/' : '/hi';
  const label = isHindi ? 'EN' : 'हिं';
  const ariaLabel = isHindi ? 'Switch to English' : 'हिंदी संस्करण पर जाएं';

  return (
    <Link
      href={targetHref}
      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <Globe className="w-3.5 h-3.5 text-[#009E73]" />
      <span>{label}</span>
    </Link>
  );
}
