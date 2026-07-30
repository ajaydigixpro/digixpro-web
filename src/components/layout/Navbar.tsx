"use client"; // Kyunki hum useState use kar rahe hain

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Icons ke liye

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-neutral-200 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo.svg" // Ya logo.png jo bhi aapka naam ho
            alt="DigiXPro Logo" 
            width={160} 
            height={40} 
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center space-x-8 text-[14px] font-bold">
          <Link href="/advisory" className="transition-colors text-neutral-500 hover:text-black">Advisory</Link>
          <Link href="/how-we-work" className="transition-colors text-neutral-500 hover:text-black">How We Work</Link>
          <Link href="/evidence" className="transition-colors text-neutral-500 hover:text-black">Evidence</Link>
          <Link href="/knowledge" className="transition-colors text-neutral-500 hover:text-black">Knowledge</Link>
          <Link href="/founder" className="transition-colors text-neutral-500 hover:text-black">Founder</Link>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:block">
          <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 bg-[#0A0A0A] text-white font-bold text-[13px] rounded-lg hover:bg-[#009E73] transition-colors">
            Request a Call
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-6 py-4 flex flex-col space-y-4 shadow-lg absolute w-full left-0 top-20">
          <Link href="/advisory" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-neutral-700">Advisory</Link>
          <Link href="/how-we-work" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-neutral-700">How We Work</Link>
          <Link href="/evidence" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-neutral-700">Evidence</Link>
          <Link href="/knowledge" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-neutral-700">Knowledge</Link>
          <Link href="/founder" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-neutral-700">Founder</Link>
          <div className="pt-4 border-t border-neutral-100">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-center px-5 py-3 bg-[#0A0A0A] text-white font-bold text-[15px] rounded-lg">
              Request a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}