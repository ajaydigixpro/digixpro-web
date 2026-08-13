'use client';

import React from 'react';
import Image from 'next/image';
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
  CheckSquare
} from 'lucide-react';

export default function BuySecondhandBookClient() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-[#22C55E]/20 pb-20 md:pb-12">
      
      {/* Navigation Back */}
      <a href="/evidence" className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Evidence Archive
      </a>

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
            Client Since 2018
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

      {/* HERO IMAGE: Live Storefront with 'SINCE 2018' Mark */}
      <div className="mb-10 bg-white p-3 md:p-4 border border-neutral-200 rounded-2xl shadow-sm">
        <div className="relative w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
          <Image 
            src="/evidence/buy-secondhand-book/Homepage.png" 
            alt="BuySecondHandBook live homepage showing hero headline, curated secondhand book catalog, and 'SINCE 2018' heritage mark next to the logo"
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
        
        {/* Left Column: Narrative Sections 1 through 6 */}
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
                  Eight years of running on WordPress/WooCommerce had accumulated substantial real-world assets: steady organic traffic, search engine domain trust, and a dedicated repeat buyer base. However, it had also accumulated severe technical debt: slowing mobile page delivery, an expanding security surface, and a bloated plugin stack where every new feature required fighting brittle third-party code.
                </p>
              </div>
              <p>
                The brief was stated plainly: <strong>engineer a purpose-built commerce engine that runs untouched and fast for the next ten years without losing a single day of the old site&apos;s hard-earned search trust.</strong>
              </p>
            </div>
          </section>

          {/* SECTION 2: The Problem Nobody Else Was Solving */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" /> 2. The Problem Nobody Else Was Solving
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
                <li><strong>High race-condition risk on concurrent checkouts</strong>: If two customers attempt to purchase the same single copy simultaneously, naive systems allow double-selling, leading to embarrassing order cancellations and customer frustration.</li>
                <li><strong>Product photography must be honest</strong>: The photograph displayed on the product page must represent the exact individual copy in stock—not a generic stock studio render.</li>
              </ul>

              {/* IMAGE 2: Last Available Copy Badge */}
              <div className="my-6 bg-white p-3 border border-neutral-200 rounded-xl shadow-sm">
                <Image 
                  src="/evidence/buy-secondhand-book/Last_Available_Copy.png" 
                  alt="BuySecondHandBook live product grid showing genuine 'Last Available Copy' stock badge and single-copy inventory availability"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Live Product Grid: Full catalog view showing genuine &ldquo;Last Available Copy&rdquo; stock badges and real physical book covers.
                </p>
              </div>

              <div className="bg-white p-5 border border-neutral-200 rounded-xl space-y-3 text-xs font-mono text-neutral-700 shadow-sm">
                <div className="font-bold text-black font-sans text-sm">Architectural Solution for Single-Copy Scarcity:</div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                  <span><strong>Explicit Transactional Locking:</strong> Custom database transaction locks hold the SKU during payment gateway initialization, preventing concurrent double-purchases while providing polite, immediate messaging to the customer who lost the race.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                  <span><strong>Genuine Scarcity Badges:</strong> &ldquo;Last Available Copy&rdquo; badges are triggered strictly by true database inventory counts (1 copy remaining)—never manufactured through fake countdown timers or fabricated urgency dark patterns.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                  <span><strong>Automatic Catalog Pruning:</strong> Sold inventory is automatically removed from public browsable catalogs the instant payment clears, eliminating ghost listings and manual administrative cleanup.</span>
                </div>
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
                  alt="BuySecondHandBook live cart sidebar showing honest pricing breakdown with verified MRP comparison, tiered discount savings, and transparent delivery calculation"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Live Cart Sidebar: Transparent pricing breakdown displaying verified original MRP comparisons, volume tier savings, and dynamic shipping calculation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Honest Pricing Engine
                  </div>
                  <p className="font-sans text-neutral-600 leading-relaxed">
                    Original printed MRP and &ldquo;Save ₹X&rdquo; calculations are displayed only when the publisher&apos;s original retail price is genuinely verified. No inflated strike-through pricing; engineered to comply strictly with India&apos;s Consumer Protection (Dark Patterns) Guidelines, 2023.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-blue-600" /> Tiered Shipping &amp; RTO Ladder
                  </div>
                  <p className="font-sans text-neutral-600 leading-relaxed">
                    Dynamic cart incentives designed around real measured Return to Origin (RTO) expenses on Cash on Delivery (COD) orders, encouraging prepaid UPI adoption and higher multi-book basket sizes.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-black" /> Hardened Security Architecture
                  </div>
                  <p className="font-sans text-neutral-600 leading-relaxed">
                    Per-order cryptographic access tokens, rate-limited administrative endpoints, auto-expiring abandoned UPI checkout sessions, and hardened secure cookies—independently verified with reproducible HTTP evidence.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-amber-600" /> 12,272 Legacy 301 Redirects
                  </div>
                  <p className="font-sans text-neutral-600 leading-relaxed">
                    Every historical URL path across 8 years of search history was cataloged, normalized, and mapped with server-side 301 redirects, ensuring zero SEO reset and zero 404 dead ends.
                  </p>
                </div>
              </div>

              <div className="bg-[#0A0A0A] text-white p-5 rounded-xl border border-neutral-800 text-xs font-mono space-y-2">
                <div className="text-emerald-400 font-bold uppercase tracking-wider">Built-for-2026 Discoverability Infrastructure:</div>
                <p className="text-neutral-300 font-sans leading-relaxed">
                  Every product page automatically renders comprehensive JSON-LD schemas (<code className="text-emerald-400">Product</code>, <code className="text-emerald-400">Book</code>, <code className="text-emerald-400">Offer</code>), automated dynamic XML sitemaps, and a dedicated <code className="text-emerald-400">llms.txt</code> file for next-generation AI shopping agents.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: The Feature That Explains Everything */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Sparkles className="w-5 h-5 mr-2 text-amber-500" /> 4. The Feature That Explains Everything (&ldquo;Just Let Me Drop the Photo In&rdquo;)
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                The initial technical specification called for a standard batch CSV/spreadsheet workflow for uploading new inventory. But during our discovery sessions, the client made an observation that reshaped the entire product roadmap:
              </p>
              
              <blockquote className="border-l-4 border-amber-500 pl-4 py-2 my-4 bg-amber-50/50 rounded-r-xl text-neutral-800 italic font-medium">
                &ldquo;I don&apos;t want to sit in front of an Excel sheet typing ISBN numbers, publisher names, and author biographies for hundreds of unique books every week. Just let me photograph the cover on my desk, and let the listing build itself.&rdquo;
              </blockquote>

              <p>
                That requirement became <strong>Smart Bulk Upload</strong>: the operational heart of the new platform.
              </p>

              {/* IMAGE 4: Smart Bulk Upload Admin Screen */}
              <div className="my-6 bg-white p-3.5 border border-neutral-200 rounded-xl shadow-md">
                <Image 
                  src="/evidence/buy-secondhand-book/Smart_Bulk_Upload.png" 
                  alt="BuySecondHandBook Smart Bulk Upload admin interface showing automated book cover recognition, metadata lookup via Open Library and Google Books, and instant listing creation"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Smart Bulk Upload Admin Interface: Real-time book cover analysis querying Google Books &amp; Open Library to auto-populate title, author, and description metadata.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-3 text-xs text-neutral-700 font-sans">
                <div className="font-bold text-black text-sm font-mono uppercase tracking-wider">How Smart Bulk Upload Operates:</div>
                <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                  <li><strong>Cover Image Ingestion:</strong> The store owner snaps a photograph of the physical book cover and drops it into the admin interface.</li>
                  <li><strong>Optical &amp; Metadata Resolution:</strong> The system extracts title and edition cues, querying Google Books and Open Library APIs in real time.</li>
                  <li><strong>Deterministic Verification:</strong> Author, genre classification, and synopsis are extracted and populated into the database schema. High-confidence matches auto-publish immediately; ambiguous copies route to a 1-click human review queue. Nothing is ever fabricated.</li>
                  <li><strong>Hybrid Workflow:</strong> The standard CSV workflow remains available for bulk intake days, but photo-first is now the primary daily routine.</li>
                </ol>
                <div className="pt-2 text-emerald-800 font-mono font-bold text-[11px]">
                  Client Feedback: &ldquo;It feels like being handed a magic wand.&rdquo;
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: Results, Measured Not Claimed */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" /> 5. Results, Measured Not Claimed
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>
                Every metric reported here is measured directly by independent diagnostic tools on the live production infrastructure—not theoretical lab calculations or internal staging estimates.
              </p>

              {/* IMAGE 5: Google PageSpeed Insights Desktop */}
              <div className="my-6 bg-white p-3 border border-neutral-200 rounded-xl shadow-sm">
                <Image 
                  src="/evidence/buy-secondhand-book/Google_PageSpeed_Insights.png" 
                  alt="Google PageSpeed Insights desktop run report showing 99 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO scores for BuySecondHandBook"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-neutral-100"
                />
                <p className="text-xs text-neutral-500 font-mono mt-2.5 text-center">
                  Independent Google PageSpeed Insights Run: Desktop scores showing 99 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1">
                  <div className="text-[10px] text-emerald-800 font-bold uppercase">Google PageSpeed Desktop</div>
                  <div className="text-3xl font-extrabold text-emerald-950">99 / 100</div>
                  <div className="text-[11px] text-emerald-800">100 Accessibility · 100 Best Practices · 100 SEO</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1">
                  <div className="text-[10px] text-emerald-800 font-bold uppercase">Google PageSpeed Mobile</div>
                  <div className="text-3xl font-extrabold text-emerald-950">86 / 100</div>
                  <div className="text-[11px] text-emerald-800">100 Accessibility · 100 Best Practices · 100 SEO</div>
                </div>
              </div>

              <div className="bg-white p-6 border border-neutral-200 rounded-xl shadow-sm space-y-4 text-xs">
                <div className="font-bold text-black text-sm font-mono uppercase tracking-wider">The Mobile Optimization Journey:</div>
                <p className="text-neutral-600 leading-relaxed font-sans">
                  The initial mobile Lighthouse test under harsh synthetic Slow-4G throttling scored <strong>65</strong>. Through systematic engineering passes, mobile score climbed to <strong>86</strong> real-world:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-mono text-neutral-700">
                  <li><strong>Catalog-Wide WebP Conversion:</strong> The complete catalog of 1,500+ books had its image payload compressed from <strong>266 MB → ~43 MB (84% reduction)</strong> with zero visible quality degradation, verified image-by-image.</li>
                  <li><strong>Zero Render-Blocking Overhead:</strong> Critical CSS inlined, deferred non-critical scripts, achieving <strong>0ms Total Blocking Time (TBT)</strong>.</li>
                  <li><strong>Explicit Layout Dimensions:</strong> Explicit aspect-ratio attributes enforced on all responsive containers, achieving <strong>0.000–0.005 Cumulative Layout Shift (CLS)</strong>.</li>
                  <li><strong>Visual Regression Pass:</strong> 100% UI consistency verified across storefront, product details, cart sidebar, checkout flow, and admin panels.</li>
                  <li><strong>Legacy Redirect Integrity:</strong> All <strong>12,272 URL redirects</strong> verified active with zero broken inbound backlinks.</li>
                  <li><strong>Immediate Real-World Revenue:</strong> The first live production order—a <strong>13-book multi-title basket</strong>—was placed and fulfilled within hours of DNS propagation.</li>
                </ul>
              </div>

              {/* SEARCH RANKING CLAIM DISCLAIMER - EXACT VERBATIM */}
              <div className="p-4 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600 text-xs font-mono leading-relaxed">
                <strong>Ranking Claim Notice:</strong> We deliberately do not claim a specific search-ranking position; early signals are encouraging on India-specific searches, but ranking claims take weeks of real crawl data, to be updated once that data exists.
              </div>
            </div>
          </section>

          {/* SECTION 6: Why This Is Different From "Building a Website" */}
          <section>
            <h2 className="text-xl font-bold flex items-center mb-4 border-b border-neutral-200 pb-2 text-black">
              <Target className="w-5 h-5 mr-2 text-black" /> 6. Why This Is Different From &ldquo;Building a Website&rdquo;
            </h2>
            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black text-sm font-mono flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-emerald-600" /> Purpose-Built vs. General CMS
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    Not a general-purpose CMS forced into shape with 40 conflicting plugins, but a lean custom engine where every database table maps directly to circular bookstore mechanics.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm font-mono flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> AI as Real Infrastructure
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    AI deployed where it saves genuine operational hours (cover recognition, metadata resolution, catalog normalization) rather than as a marketing gimmick.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm font-mono flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-black" /> Enterprise Security at Small Scale
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    Cryptographic order tokens, strict session hygiene, and rate-limiting applied with enterprise discipline where smaller businesses are usually left vulnerable.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm space-y-2">
                  <div className="font-bold text-black font-sans text-sm font-mono flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" /> A Ten-Year Mindset
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    Engineered from day one to operate reliably and cleanly for the next decade without ongoing plugin breakdown or forced redesign cycles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CLOSING ATTRIBUTION LINE (EXACT VERBATIM) */}
          <div className="border-t border-neutral-200 pt-8 mt-12">
            <p className="text-xs text-neutral-500 font-mono italic leading-relaxed bg-neutral-50 p-5 rounded-xl border border-neutral-200">
              BuySecondHandBook has been a DigiXPro client since 2018. This case study reflects the platform as independently verified at launch, including live performance testing, security audit evidence, and real production traffic. We update our evidence pages when the facts change — we don&apos;t inflate them when they don&apos;t.
            </p>
          </div>

        </div>

        {/* Right Sidebar: STICKY Derived Principle & Scope */}
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

            {/* Scope & Architecture Specs */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs font-mono">
              <h3 className="font-bold text-black uppercase tracking-wider text-sm border-b pb-2">
                Execution Specs
              </h3>
              <div>
                <span className="text-neutral-400 block">Domain:</span>
                <span className="text-neutral-800 font-semibold font-sans">Secondhand Books / Circular Commerce</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Core Architecture:</span>
                <span className="text-neutral-800 font-semibold font-sans">Custom PHP 8.4 Commerce Engine, MySQL, Tailored Routing</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Key Features:</span>
                <span className="text-neutral-800 font-semibold font-sans">Smart Bulk Upload, Single-Copy Locking, Honest Pricing</span>
              </div>
              <div>
                <span className="text-neutral-400 block">SEO Continuity:</span>
                <span className="text-neutral-800 font-semibold font-sans">12,272 301 Redirects, JSON-LD Schemas, llms.txt</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Client Timeline:</span>
                <span className="text-neutral-800 font-semibold font-sans">2018 (Original Build) → 2026 (PHP 8.4 Rebuild)</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Status:</span>
                <span className="text-emerald-600 font-semibold">Production Live</span>
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-white p-5 border border-neutral-200 rounded-2xl shadow-sm text-xs font-mono text-center">
              <div className="font-bold text-black text-sm font-sans mb-1">Migrating a Complex Commerce Stack?</div>
              <p className="text-neutral-500 font-sans text-xs mb-4">Let&apos;s map your business workflows and inventory logic before writing code.</p>
              <a href="/contact" className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:bg-[#009E73] transition shadow-sm font-sans">
                Book an Architecture Call
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
