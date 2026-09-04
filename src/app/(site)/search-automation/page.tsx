import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SEARCH_AUTOMATION_SERVICES } from '@/data/searchAutomationData';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Building2, 
  HelpCircle as QuestionIcon,
  Search,
  Network,
  Clock,
  CheckSquare,
  Sparkles,
  Zap,
  Share2,
  Users,
  Repeat
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Search Automation Services & Instant Lead Workflows',
  description: "Search visibility and operational automation services combining technical SEO, AI search readiness (GEO), local search ranking, and n8n lead workflows.",
  keywords: [
    'search visibility services',
    'AI search optimization',
    'GEO consulting',
    'technical SEO',
    'local SEO services',
    'social media management',
    'workflow automation agency',
    'n8n automation',
    'lead capture CRM automation'
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/search-automation',
  },
  openGraph: {
    title: 'Search Automation Services & Instant Lead Workflows | DigiXPro',
    description: "Search visibility and operational automation services combining technical SEO, AI search readiness (GEO), local search ranking, and n8n lead workflows.",
    url: 'https://www.digixpro.in/search-automation',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Search Visibility, AI Discovery & Automation Services',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Automation Services & Instant Lead Workflows | DigiXPro',
    description: "Search visibility and operational automation services combining technical SEO, AI search readiness (GEO), local search ranking, and n8n lead workflows.",
    images: ['/twitter-image.png'],
  },
};

export default function SearchAutomationPage() {
  const hubFaqs = [
    {
      question: "Why should SEO, AI discovery, social media, and automation be connected?",
      answer: "When treated as isolated activities, marketing creates disconnected traffic while operations struggle with manual follow-up. Connecting search visibility, AI discovery, social content, lead capture, and n8n automation creates a single, reliable acquisition and operating pipeline."
    },
    {
      question: "What is the difference between monthly services and implementation projects?",
      answer: "Implementation projects (like CRM setup, n8n workflow engineering, or GEO schema plumbing) establish your technical infrastructure. Monthly services (like SEO, local map rankings, and social content systems) drive ongoing visibility and continuous lead flow."
    },
    {
      question: "How does AI Search Optimization (GEO) work alongside traditional SEO?",
      answer: "Traditional SEO optimizes your website for search engine crawlers and keyword rankings. GEO structures machine-readable entity data (JSON-LD, llms.txt) so AI engines like ChatGPT, Claude, and Perplexity parse and cite your business in synthesized answers."
    },
    {
      question: "Can DigiXPro work with our existing CRM, website, or marketing team?",
      answer: "Yes. We integrate with your existing CRM (HubSpot, Salesforce, Notion, Zoho) and work alongside your team to engineer automation webhooks, optimize SEO indexability, and scale content publishing."
    },
    {
      question: "How does DigiXPro handle social media content without consuming our team's time?",
      answer: "We run a structured content pipeline: Topic Research -> AI-assisted Copy Drafting -> Human Editorial Review -> Graphic Design -> Automated Scheduling. Your team only spends 30 minutes a month reviewing a ready-to-publish content calendar."
    },
    {
      question: "What is n8n and why is it used for workflow automation?",
      answer: "n8n is a self-hosted automation platform that allows secure API webhooks, complex logic branching, and AI model integrations without the escalating per-task fees of tools like Zapier or Make."
    },
    {
      question: "How fast can automated lead routing notify our sales team?",
      answer: "Our automated webhook pipelines route incoming lead form submissions directly to your assigned sales reps via Slack, WhatsApp, or CRM within 2 to 5 seconds."
    },
    {
      question: "Does DigiXPro provide guarantees on SEO rankings or lead volume?",
      answer: "We focus on rigorous technical code compliance, commercial keyword architecture, robust automation logic, and systematic visibility optimization. Search engine algorithms operate autonomously, so our framework emphasizes verifiable engineering standards rather than speculative marketing promises."
    },
    {
      question: "Can these services be customized for international markets?",
      answer: "Yes. We engineer search, GEO, and automation strategies for growing businesses operating across the United States, United Kingdom, Australia, Singapore, and India."
    },
    {
      question: "How do you ensure our customer data remains secure during automation?",
      answer: "We build self-hosted n8n automation pipelines with encrypted API keys, strict CORS parameters, and zero data retention on un-vetted third-party platforms."
    },
    {
      question: "What happens if a form submission or webhook fails?",
      answer: "We engineer automated retry logic, fallback logging queues, and instant notification alerts into every lead workflow so no enquiry is ever lost."
    },
    {
      question: "How do we get started with Search, AI & Automation?",
      answer: "Start by booking a 30-minute growth systems call. We will review your current acquisition channels, lead flow, manual bottlenecks, and growth goals to outline an empirical roadmap."
    },
    {
      question: "What pricing models does DigiXPro offer?",
      answer: "We offer transparent milestone-based pricing for implementation projects (workflow automation, lead system setup) and clear fixed monthly retainers for ongoing services (SEO, local SEO, social content management)."
    },
    {
      question: "What deliverables will we receive during an engagement?",
      answer: "Deliverables include technical audit reports, keyword matrices, llms.txt context files, production n8n workflows, social content calendars, custom graphic assets, and monthly performance dashboards."
    }
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Search, AI & Automation', url: 'https://www.digixpro.in/search-automation' },
        ]}
      />
      <FAQSchema items={hubFaqs} />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-20 transition-colors duration-200">
        
        {/* ==========================================
            01 • HERO SECTION
        ========================================== */}
        <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">
                CONNECTED DIGITAL ACQUISITION &amp; OPERATING SYSTEM
              </span>
            </div>
            
            <h1 className="text-[40px] md:text-[62px] font-extrabold tracking-tight leading-[1.06] mb-6 text-black dark:text-white">
              Get Found. Be Understood.<br />
              <span className="text-[#16a34a]">Capture Demand. Automate the Work.</span>
            </h1>
            
            <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-8">
              DigiXPro does not treat SEO, AI discovery, social media, and workflow automation as disconnected activities. We build one connected digital acquisition and operating system for growing businesses.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
              >
                Book a 30-Minute Growth Systems Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] rounded-xl hover:border-black dark:hover:border-white transition-colors min-h-[52px]"
              >
                Explore Acquisition Architecture
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            02 • CALM BUYER PROBLEM RECOGNITION
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
          <div className="max-w-3xl mb-12">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              COMMERCIAL ACQUISITION REALITY
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white">
              What Are You Looking to Solve?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Organic & AI Invisibility",
                desc: "Your website gets insufficient search traffic, and AI answer engines do not understand or cite your brand."
              },
              {
                title: "Local Market Friction",
                desc: "Local buyers search for your services nearby, but your business does not feature prominently in Google Maps."
              },
              {
                title: "Inconsistent Content Presence",
                desc: "Your team knows social media is valuable, but daily operational work prevents regular publishing."
              },
              {
                title: "Leads Slipping Through Cracks",
                desc: "Enquiries arrive via forms, WhatsApp, or email, but follow-up is manual, delayed, or un-tracked in a CRM."
              }
            ].map((prob, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4 text-[#16a34a] font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-black dark:text-white mb-2">{prob.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            03 • THE SIX CANONICAL SERVICES (3x2 GRID)
        ========================================== */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              THE 6 SEARCH &amp; AUTOMATION PILLARS
            </div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
              Six Acquisition Capabilities. One Connected OS.
            </h2>
            <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore our six canonical capabilities. Each pillar can be deployed independently or connected into an integrated acquisition engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SEARCH_AUTOMATION_SERVICES.map((service, idx) => (
              <div 
                key={service.slug}
                className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#16a34a] transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                      0{idx + 1} &bull; {service.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-neutral-500 bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded uppercase">
                      {service.commercialModel}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-black dark:text-white mb-3 group-hover:text-[#16a34a] transition-colors">
                    {service.title}
                  </h3>

                  {/* BUYER QUESTION */}
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-4">
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 italic">
                      &ldquo;{service.buyerQuestion}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* CAPABILITY SIGNALS */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.slice(0, 3).map((d, dIdx) => (
                      <div key={dIdx} className="flex items-center text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mr-2 shrink-0" />
                        <span>{d.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link 
                    href={`/search-automation/${service.slug}`} 
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-black dark:text-white bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-4 py-3 rounded-xl group-hover:border-[#16a34a] group-hover:text-[#16a34a] transition-colors"
                  >
                    <span>Explore Pillar Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            04 • MONTHLY VS IMPLEMENTATION MODEL GUIDE
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              COMMERCIAL MODEL ORIENTATION
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white mb-4">
              Implementation Projects vs. Ongoing Growth Services
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
              Some commercial challenges require technical architecture build first. Others require continuous optimization. DigiXPro connects both.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-[#16a34a]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                BUILD &amp; INFRASTRUCTURE
              </span>
              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3">
                Implementation Projects
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Turn-key technical setups delivered against defined milestones, clear specifications, and empirical verification tests.
              </p>
              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0" /> n8n Workflow Automation Pipelines</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0" /> CRM &amp; Lead Capture Webhook Integrations</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0" /> Machine-Readable llms.txt &amp; Schema Plumbing</li>
              </ul>
            </div>

            <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4">
                <Repeat className="w-5 h-5 text-[#16a34a]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-wider block mb-2">
                CONTINUOUS GROWTH &amp; DISCOVERY
              </span>
              <h3 className="text-xl font-extrabold text-black dark:text-white mb-3">
                Ongoing Growth Services
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Predictable monthly retainers driving continuous organic search rankings, local map pack visibility, and social media content.
              </p>
              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0" /> Technical SEO &amp; Organic Rank Optimization</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0" /> Google Business Profile &amp; Local Map Pack SEO</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#16a34a] mr-2 shrink-0" /> Social Media Management &amp; Content Pipeline</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==========================================
            05 • FACTUAL PRODUCTION EVIDENCE
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              FACTUAL PROOF
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white mb-6">
              Proven Acquisition Systems in Production
            </h2>
            <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Our search and automation systems are built on proven engineering frameworks operating live today.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-8">
              <Link href="/evidence/digixpro" className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group shadow-sm">
                <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">PROOFS &bull; PLATFORM &amp; LEAD AUTOMATION</div>
                <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-2">DigiXPro Lead Pipeline &rarr;</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Web forms &rarr; n8n webhook &rarr; instant Notion logging &amp; team alerts.</p>
              </Link>

              <Link href="/evidence/360-neck-shoulder" className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group shadow-sm">
                <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">PROOFS &bull; LOCAL HEALTHCARE SEARCH</div>
                <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-2">360 Neck &amp; Shoulder Search &rarr;</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Local search optimization &amp; digital enquiry capture for specialized healthcare.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            06 • BUYER FAQS
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              BUYER QUESTIONS
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white">
              Questions Business Owners Usually Ask
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {hubFaqs.map((faq, idx) => (
              <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-[17px] md:text-[19px] font-bold text-black dark:text-white mb-3 flex items-start">
                  <HelpCircle className="w-5 h-5 text-[#16a34a] mr-3 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            07 • 30-MINUTE GROWTH SYSTEMS CALL CTA
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-neutral-800 p-10 md:p-14 rounded-[32px] shadow-xl max-w-4xl mx-auto text-white">
            <div className="text-center mb-8">
              <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-3">
                SYSTEMS DISCOVERY
              </span>
              <h2 className="font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
                Ready to Connect Your Search, AI &amp; Automation System?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                Book a 30-minute discovery call to evaluate your organic search, AI visibility, content pipeline, and lead automation options.
              </p>
            </div>

            {/* EXPECTATION SETTING BLOCK */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 md:p-8 mb-8 text-left max-w-3xl mx-auto">
              <div className="text-xs font-mono font-bold text-[#16a34a] uppercase tracking-wider mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> What Happens On The 30-Minute Call
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm text-neutral-300">
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Review your current organic search &amp; local visibility.</span>
                </div>
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Audit your AI discovery readiness (ChatGPT, Perplexity, GEO).</span>
                </div>
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Identify manual copy-paste bottlenecks and workflow automation opportunities.</span>
                </div>
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Map an empirical roadmap connecting search, lead capture, and CRM.</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-center font-mono text-[11px] text-neutral-400">
                No obligation &bull; No sales pitch &bull; Scope comes after understanding the problem
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#16a34a] text-white font-bold text-[15px] rounded-xl hover:bg-[#15803d] transition-colors shadow-md min-h-[52px]"
              >
                Book a 30-Minute Growth Systems Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              {/* PHASE 25 (Part 5/6 funnel gap): no canonical service page
                  linked to /pricing anywhere on the site before this. */}
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
              >
                View Investment Guide
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center justify-center px-7 py-4 border border-neutral-700 text-neutral-300 font-bold text-[15px] rounded-xl hover:border-neutral-500 hover:text-white transition-colors min-h-[52px]"
              >
                Explore How We Work
              </Link>
            </div>
          </div>
        </section>

        <DeferredStickyMobileCTA />
      </div>
    </>
  );
}
