import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="border-b border-neutral-200 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo.svg" // ya "/logo.png"
            alt="DigiXPro Logo" 
            width={160} 
            height={40} 
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-8 text-[14px] font-bold">
          <Link href="/advisory" className="transition-colors text-neutral-500 hover:text-black">Advisory</Link>
          <Link href="/how-we-work" className="transition-colors text-neutral-500 hover:text-black">How We Work</Link>
          <Link href="/evidence" className="transition-colors text-neutral-500 hover:text-black">Evidence</Link>
          <Link href="/knowledge" className="transition-colors text-neutral-500 hover:text-black">Knowledge</Link>
          <Link href="/founder" className="transition-colors text-neutral-500 hover:text-black">Founder</Link>
        </div>

        {/* CTA BUTTON */}
        <div>
          <Link 
            href="/contact" 
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#0A0A0A] text-white font-bold text-[13px] rounded-lg hover:bg-[#009E73] transition-colors"
          >
            Request a 30-Min Call
          </Link>
        </div>

      </div>
    </nav>
  );
}