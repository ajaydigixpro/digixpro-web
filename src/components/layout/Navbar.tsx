"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Advisory', href: '/advisory' },
    { name: 'How We Work', href: '/how-we-work' },
    { name: 'Evidence', href: '/evidence' },
    { name: 'Knowledge', href: '/knowledge' },
    { name: 'Founder', href: '/founder' },
  ];

  return (
    <nav className="border-b border-neutral-200 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* DOM Cleaner Logo Link */}
        <Link href="/" className="font-extrabold tracking-tighter text-2xl flex items-center">
          DigiXPro<span className="text-[#16a34a] text-3xl leading-none">.</span>
        </Link>
        
        {/* Active Link Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-[14px] font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors ${isActive ? 'text-black' : 'text-neutral-500 hover:text-black'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        <div>
          <Link 
            href="/contact" 
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#0A0A0A] text-white font-bold text-[13px] rounded-lg hover:bg-[#16a34a] transition-colors"
          >
            Request a 30-Min Call
          </Link>
        </div>
      </div>
    </nav>
  );
}