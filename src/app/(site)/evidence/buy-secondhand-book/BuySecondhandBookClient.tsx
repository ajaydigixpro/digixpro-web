'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  Server,
  Clock,
  Cpu,
  ShoppingCart,
  RefreshCw,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Lock,
  Layers,
  Search,
  CheckSquare,
  Ban,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function BuySecondhandBookClient() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-20 md:pb-12">
      
      {/* Navigation Back */}
      <Link href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </Link>

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-black bg-neutral-200 px-2 py-0.5 rounded border border-neutral-300 font-bold uppercase tracking-widest">
            Case Study #02
          </span>
          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold uppercase tracking-widest">
            Custom PHP 8.4 Commerce Engine
          </span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-widest">
            Tech Track
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold mt-1 mb-4 leading-tight tracking-tight text-black">
          BuySecondHandBook
        </h1>
        <p className="text-xl md:text-2xl text-neutral-900 font-bold max-w-3xl mb-3 leading-snug">
          Full Migration from WordPress to Custom PHP 8.4 Commerce Engine.
        </p>
        <p className="text-base text-neutral-600 font-normal max-w-3xl leading-relaxed">
          How DigiXPro re-engineered an eight-year client platform for a Delhi heritage bookseller into a purpose-built single-copy circular commerce engine with zero data loss, zero SEO reset, and 99/100 Desktop PageSpeed.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-neutral-400" /> 8+ Years Client Relationship (2018 – Present)</div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Production Live</div>
          <div className="flex items-center gap-1.5">
            <a href="https://buysecondhandbook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#16a34a] hover:underline font-semibold">
              <ExternalLink className="w-3.5 h-3.5" /> Live Storefront (buysecondhandbook.com)
            </a>
          </div>
        </div>
      </div>

      {/* HERO IMAGE: Live Storefront */}
      <div className="mb-10 bg-white p-3 md:p-4 border border-neutral-200 rounded-2xl shadow-sm">
        <div className="relative w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
          <Image 
            src="/evidence/buy-secondhand-book/Homepage.png" 
            alt="BuySecondHandBook live homepage showing hero headline, curated secondhand book catalog, and SINCE 2018 heritage mark"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover object-top"
            priority
          />
        </div>
        <p className="text-xs text-neutral-500 font-mono mt-3 text-center">
          Production Storefront: Clean custom UI/UX carrying the genuine &ldquo;SINCE 2018&rdquo; heritage brand mark next to the logo.
        </p>
      </div>

      {/* AT A GLANCE: Summary Matrix */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-mono font-bold text-black uppercase tracking-wider">At a Glance — Verified Project Matrix</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-1">
            <div className="font-mono text-[10px] text-neutral-400 uppercase font-bold">Client Heritage &amp; Trust</div>
            <div className="font-bold text-neutral-900 text-sm">Client since 2018 (Original build by DigiXPro)</div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              Rooted in Delhi&apos;s Daryaganj Sunday book market (trading since 1986, formerly Sharma Book Service / International Book Service).
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-1">
            <div className="font-mono text-[10px] text-neutral-400 uppercase font-bold">Architecture Transition</div>
            <div className="font-bold text-neutral-900 text-sm">Full migration to custom PHP 8.4 commerce engine</div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              Zero data loss, zero SEO reset. Built from the ground up with proprietary routing, database layer, and zero page-builder bloat.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-1">
            <div className="font-mono text-[10px] text-neutral-400 uppercase font-bold">Core Inventory Challenge</div>
            <div className="font-bold text-neutral-900 text-sm">Single physical copy inventory model</div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              Every product is a genuine single physical copy, never restocked. 1,500+ individually inspected, individually photographed books.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-1">
            <div className="font-mono text-[10px] text-neutral-400 uppercase font-bold">SEO Continuity &amp; Authority</div>
            <div className="font-bold text-neutral-900 text-sm">12,272 legacy URL patterns 301-redirected</div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              Eight years of Google search authority preserved with zero broken inbound links and dynamic XML/JSON-LD structured schemas.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-1">
            <div className="font-mono text-[10px] text-neutral-400 uppercase font-bold">Core Web Vitals Benchmarks</div>
            <div className="font-bold text-emerald-700 text-sm">Mobile: 86/100 · Desktop: 99/100/100/100</div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              Independent Google PageSpeed run. 0ms Total Blocking Time, 0.000–0.005 Cumulative Layout Shift.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-1">
            <div className="font-mono text-[10px] text-neutral-400 uppercase font-bold">Asset Compression &amp; Proof</div>
            <div className="font-bold text-neutral-900 text-sm">266 MB → ~43 MB (84% reduction)</div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              Full catalog WebP conversion verified image-by-image. First live order: 13-book multi-title basket fulfilled within hours.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left Column: Narrative Sections */}
        <div className="md:col-span-8 space-y-14">
          
          {/* SECTION 1: A Relationship, Not a Handoff */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <BookOpen className="w-5 h-5 mr-2 text-black" /> 1. A Relationship, Not a Handoff
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                DigiXPro built this client&apos;s first digital platform in 2018 for a family book business deeply rooted in Delhi&apos;s historic Daryaganj Sunday book market—where they have traded since 1986 (formerly operating as Sharma Book Service / International Book Service).
              </p>
              <p>
                An eight-year client relationship is the foundational reason this rebuild could happen at all: a from-scratch commerce migration touching live customer payments, historic inventory, and years of customer account histories does not get handed to an unknown agency or a one-off contractor.
              </p>
              <p>
                The live storefront still proudly carries a <strong>&ldquo;Since 2018&rdquo;</strong> mark in its header—not as a decorative marketing flourish, but because that authentic digital track record is genuinely part of the brand&apos;s customer trust.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-xs text-amber-950 font-sans space-y-2">
                <div className="font-bold font-mono uppercase text-[11px] text-amber-900">The 8-Year Accumulation Paradox</div>
                <p>
                  Eight years of running on WordPress/WooCommerce had accumulated substantial real-world assets: steady organic traffic, search engine domain trust, and a dedicated repeat buyer base. However, it had also accumulated severe technical debt: slowing mobile page delivery, an expanding security surface, and a bloated plugin stack.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: The Problem Nobody Else Was Solving */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" /> 2. The Single-Copy Inventory Problem
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Almost every commercial e-commerce platform (Shopify, WooCommerce, Magento) is architected around a single foundational assumption: <em>inventory gets replenished from a warehouse or manufacturer</em>.
              </p>
              <p>
                A genuine secondhand bookstore breaks that assumption completely. In a circular book marketplace:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-neutral-700 text-xs font-sans">
                <li><strong>Every single copy is physically unique</strong>: Condition, paper yellowing, binding wear, and publication edition differ book by book.</li>
                <li><strong>Zero restock pipeline</strong>: When a copy sells, it cannot simply be backordered or replenished from a supplier.</li>
                <li><strong>High race-condition risk on concurrent checkouts</strong>: If two customers attempt to purchase the same single copy simultaneously, naive systems allow double-selling.</li>
              </ul>

              {/* IMAGE 2: Last Available Copy Badge */}
              <div className="my-6 bg-white p-3 border border-neutral-200 rounded-xl shadow-sm">
                <Image 
                  src="/evidence/buy-secondhand-book/Last_Available_Copy.png" 
                  alt="BuySecondHandBook live product grid showing genuine 'Last Available Copy' stock badge"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Live Product Grid: Full catalog view showing genuine &ldquo;Last Available Copy&rdquo; stock badges and real physical book covers.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: What We Actually Built */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Server className="w-5 h-5 mr-2 text-black" /> 3. What We Actually Built
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Rather than deploying another SaaS subscription template or heavy CMS page-builder, DigiXPro engineered a <strong>custom PHP 8.4 commerce engine from the ground up</strong>—with its own deterministic routing, lightweight dependency container, and clean database abstraction layer.
              </p>

              {/* IMAGE 3: Honest Pricing Breakdown */}
              <div className="my-6 bg-white p-3 border border-neutral-200 rounded-xl shadow-sm">
                <Image 
                  src="/evidence/buy-secondhand-book/honest_pricing_breakdown.png" 
                  alt="BuySecondHandBook live cart sidebar showing honest pricing breakdown with verified MRP comparison"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Live Cart Sidebar: Transparent pricing breakdown displaying verified original MRP comparisons and volume tier savings.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Honest Pricing Engine
                  </div>
                  <p className="font-sans text-neutral-600 leading-relaxed">
                    Original printed MRP and savings calculations are displayed only when the publisher&apos;s original retail price is genuinely verified. No inflated strike-through pricing.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-amber-600" /> 12,272 Legacy 301 Redirects
                  </div>
                  <p className="font-sans text-neutral-600 leading-relaxed">
                    Every historical URL path across 8 years of search history was cataloged, normalized, and mapped with server-side 301 redirects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: Smart Bulk Upload */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Sparkles className="w-5 h-5 mr-2 text-amber-500" /> 4. Smart Bulk Upload &amp; Operational Flow
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                The store owner snaps a photograph of the physical book cover on his desk and drops it into the admin interface. The system extracts title and edition cues, querying Google Books and Open Library APIs in real time.
              </p>

              {/* IMAGE 4: Smart Bulk Upload Admin Screen */}
              <div className="my-6 bg-white p-3.5 border border-neutral-200 rounded-xl shadow-md">
                <Image 
                  src="/evidence/buy-secondhand-book/Smart_Bulk_Upload.png" 
                  alt="BuySecondHandBook Smart Bulk Upload admin interface"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Smart Bulk Upload Admin Interface: Real-time book cover analysis querying Google Books &amp; Open Library.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: What We Deliberately Did Not Do */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <Ban className="w-5 h-5 text-red-500" /> 5. What We Deliberately Did Not Do
            </h2>
            <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Manufactured Urgency Badges:</strong> Scarcity badges (&ldquo;Last Available Copy&rdquo;) are strictly backed by real database inventory counts (1 copy remaining)—never manufactured through fake countdown timers or dark patterns.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Database Replacement for Trendiness:</strong> We did not replace the relational MySQL database with an unproven NoSQL setup simply because it was newer. Relational transactions were required for single-copy inventory locks.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>No Unsubstantiated Ranking Claims:</strong> We deliberately do not claim specific Google ranking position numbers; early signals are encouraging, but ranking claims take weeks of crawl data, to be updated once that data exists.</span>
              </div>
            </div>
          </section>

          {/* SECTION 6: Critical Buyer Questions Answered */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <HelpCircle className="w-5 h-5 text-purple-600" /> 6. Critical Buyer Questions Answered
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;Will rebuilding or migrating our legacy website destroy our existing Google search rankings?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Not if legacy URL equity is mapped properly. By cataloging, normalizing, and 301-redirecting all 12,272 legacy URL patterns and maintaining identical schema hierarchies, domain authority is preserved with zero broken inbound links.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h3 className="font-bold text-black text-sm">
                  &ldquo;How do you prevent two customers from buying the last physical item at the same time?&rdquo;
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We implement explicit database transaction locking during payment gateway initialization, holding the SKU for the first buyer and immediately updating catalog availability upon payment confirmation.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7: Frequently Asked Questions */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
              <FileText className="w-5 h-5 text-emerald-600" /> 7. Frequently Asked Questions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-sans">
              <div>
                <h3 className="font-bold text-black text-sm mb-1">Why migrate away from WordPress/WooCommerce to a custom PHP engine?</h3>
                <p className="text-neutral-600 leading-relaxed">When a commerce site accumulates 40+ plugins, page load times slow down on mobile devices and security vulnerability surfaces expand. A custom lean engine eliminates plugin bloat and delivers 99/100 PageSpeed scores.</p>
              </div>
              <div className="border-t border-neutral-100 pt-3">
                <h3 className="font-bold text-black text-sm mb-1">What are dark pattern guidelines in e-commerce pricing?</h3>
                <p className="text-neutral-600 leading-relaxed">India&apos;s Consumer Protection (Dark Patterns) Guidelines, 2023 restrict fake strike-through discounts and manufactured urgency. Prices must reflect genuine MRP and verified discounts.</p>
              </div>
            </div>
          </section>

          {/* SECTION 8: Related DigiXPro Service Link */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block mb-1">Related Service Architecture</span>
                <h3 className="text-lg font-bold text-amber-950">Website Redesign &amp; Re-Engineering</h3>
                <p className="text-xs text-amber-800 mt-1">Discover how DigiXPro rebuilds legacy web platforms with zero SEO loss and 90+ Core Web Vitals performance.</p>
              </div>
              <Link 
                href="/design-services/website-redesign"
                className="inline-flex items-center justify-center px-5 py-3 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition shrink-0 font-sans"
              >
                View Website Redesign Service <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Right Sidebar: STICKY Derived Principle & Consultative CTA */}
        <div className="md:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Derived Principle Card */}
            <div className="bg-[#0A0A0A] text-white p-6 border border-neutral-800 rounded-2xl shadow-xl">
              <div className="flex items-center text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 mr-1.5" /> Derived Principle
              </div>
              <div className="text-neutral-500 font-mono text-[10px] mb-2 border-b border-neutral-800 pb-2">PRINCIPLE-002</div>
              <p className="text-lg font-bold leading-tight text-white mb-3 font-sans">
                &ldquo;Legacy domain trust buys time. Custom architecture secures the next ten years.&rdquo;
              </p>
              <p className="text-xs font-medium leading-relaxed text-neutral-300 mb-4 font-sans">
                In circular commerce, specialized inventory mechanics require specialized code. Off-the-shelf software incurs hidden operational debt.
              </p>
              <div className="text-[10px] font-mono text-neutral-500 pt-3 border-t border-neutral-800">
                Derived from: BuySecondHandBook Migration Case Study
              </div>
            </div>

            {/* Consultative CTA Card */}
            <div className="bg-white p-5 border border-neutral-200 rounded-2xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Migrating a Complex Commerce Stack?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s map your business workflows and inventory logic before writing code.</p>
              <Link href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-[#009E73] transition shadow-sm font-sans">
                Book an Architecture Call
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
