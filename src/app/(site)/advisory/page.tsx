import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ADVISORY_SERVICES } from '@/data/advisoryServicesData';
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
  CheckSquare
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Independent Technology Architecture & Business Systems Advisory | DigiXPro',
  description: 'Independent technology architecture advisory, IT consulting strategy, technology due diligence, digital transformation, and Fractional CTO leadership for growing enterprises.',
  keywords: [
    'technology architecture advisory',
    'IT strategy consulting',
    'technology due diligence',
    'digital transformation consulting',
    'business systems process architecture',
    'technology roadmap consulting',
    'Fractional CTO services',
    'independent tech consultant'
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/advisory',
  },
  openGraph: {
    title: 'Independent Technology Architecture & Business Systems Advisory | DigiXPro',
    description: 'Independent technology architecture advisory for growing businesses. Independent evaluation before major technology commitments.',
    url: 'https://www.digixpro.in/advisory',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Technology Architecture Advisory Services',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology Architecture Advisory Services | DigiXPro',
    description: 'Independent technology architecture advisory for growing businesses.',
    images: ['/twitter-image.png'],
  },
};

export default function AdvisoryPage() {
  const advisoryFaqs = [
    {
      question: "Do I need a new system or should we fix our existing one?",
      answer: "We diagnose before prescribing. We evaluate your current software codebases, data hygiene, and operational workflows to determine whether a targeted integration or a new architecture is required."
    },
    {
      question: "Can DigiXPro review software and vendors we are already considering?",
      answer: "Yes. We conduct vendor-neutral technology due diligence. We review software proposals, architecture claims, total cost of ownership, and contract terms to protect you from vendor lock-in."
    },
    {
      question: "Can you work alongside our existing internal IT or engineering team?",
      answer: "Yes. We act as independent technology architects and decision-support advisors. We provide objective specification blueprints and roadmaps, allowing internal teams or external vendors to execute with clarity."
    },
    {
      question: "What happens if we already have a CRM or ERP software?",
      answer: "We evaluate your existing CRM or ERP stack to eliminate duplicate SaaS subscriptions, resolve departmental data silos, and automate handoffs rather than pushing unnecessary software replacements."
    },
    {
      question: "How does a technology due diligence review work?",
      answer: "We audit functional software requirements, vendor SLA commitments, line-item pricing models, and security compliance to deliver a quantitative score matrix before contracts are signed."
    },
    {
      question: "What does a technology roadmap actually include?",
      answer: "A technology roadmap defines your target technology architecture, sequences projects into phases based on technical dependencies and operational ROI, and sets clear resource guidelines."
    },
    {
      question: "When does a company need a Fractional CTO?",
      answer: "When a growing business needs senior executive technology judgment, vendor oversight, and architecture governance, but does not require a full-time 40-hour executive salary overhead."
    },
    {
      question: "How does DigiXPro remain vendor-neutral?",
      answer: "DigiXPro accepts zero commissions, software kickbacks, or affiliate incentives from third-party vendors. Every architectural recommendation is based solely on your business requirements."
    },
    {
      question: "Can DigiXPro work with international businesses remotely?",
      answer: "Yes. We advise leadership teams across the US, UK, Australia, Singapore, and India through structured video discovery sessions, asynchronous workflow audits, and digital blueprints."
    },
    {
      question: "What happens during the 30-minute Architecture Call?",
      answer: "The call is a direct technical discovery conversation with leadership. We discuss your operational bottlenecks, current software setup, search visibility, and growth goals to determine the right next steps."
    },
    {
      question: "Do we need to replace our existing technology infrastructure?",
      answer: "Not necessarily. In most cases, we optimize and connect existing tools using custom webhooks and API handoffs, preserving capital while eliminating spreadsheet silos."
    },
    {
      question: "How is an advisory engagement scoped?",
      answer: "Engagements begin with a diagnostic scope definition. We define clear milestone phases and deliverables upfront, ensuring predictable governance without open-ended hourly retainers."
    }
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Advisory Services', url: 'https://www.digixpro.in/advisory' },
        ]}
      />
      <FAQSchema items={advisoryFaqs} />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-20 transition-colors duration-200">
        
        {/* ==========================================
            01 • HERO SECTION
        ========================================== */}
        <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 pb-16 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">
                INDEPENDENT &bull; VENDOR-NEUTRAL &bull; ARCHITECTURE ADVISORY
              </span>
            </div>
            
            <h1 className="text-[40px] md:text-[62px] font-extrabold tracking-tight leading-[1.06] mb-6 text-black dark:text-white">
              Independent Technology Architecture<br />
              <span className="text-[#16a34a]">&amp; Business Systems Advisory</span>
            </h1>
            
            <p className="text-[18px] md:text-[22px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-8">
              We diagnose how your business actually operates, evaluate software decisions before commitments are made, and design the target system architecture your business needs to scale.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md min-h-[52px]"
              >
                Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center justify-center px-6 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[14px] rounded-xl hover:border-black dark:hover:border-white transition-colors min-h-[52px]"
              >
                Explore Our Methodology
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            02 • WHO THIS ADVISORY IS FOR
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
          <div className="max-w-3xl mb-12">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              TARGET AUDIENCE &amp; PROFILE
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white">
              Who DigiXPro Advisory Is Engineered For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Founders & Executive Leadership",
                desc: "Preparing for major technology commitments (CRM, ERP, web apps) who need independent technical validation before spending capital."
              },
              {
                title: "Growing Mid-Market Enterprises",
                desc: "Business teams (10 to 200 staff) hindered by spreadsheet silos, manual departmental handoffs, and employee software fatigue."
              },
              {
                title: "Companies Lacking Executive Tech Oversight",
                desc: "Organizations managing external development agencies or internal IT staff without senior CTO-level decision-support and architecture governance."
              }
            ].map((profile, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-[#16a34a]" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{profile.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{profile.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            03 • THE SIX CANONICAL ADVISORY SERVICES (3x2 GRID)
        ========================================== */}
        <section className="py-24 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              THE 6 ADVISORY PILLARS
            </div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold mb-4 text-black dark:text-white">
              Six Advisory Decisions. One Architecture.
            </h2>
            <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Select the advisory area that matches your current business priority. Every engagement delivers independent technical judgment and tangible blueprints.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ADVISORY_SERVICES.map((service, idx) => (
              <div 
                key={service.slug}
                className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#16a34a] transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                      0{idx + 1} &bull; {service.category}
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
                    {service.buyerSituation}
                  </p>
                </div>

                <div>
                  <Link 
                    href={`/advisory/${service.slug}`} 
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-black dark:text-white bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-4 py-3 rounded-xl group-hover:border-[#16a34a] group-hover:text-[#16a34a] transition-colors"
                  >
                    <span>Explore Advisory Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            04 • WHAT YOU DECIDE (CONVERSION-FOCUSED DECISION CERTAINTY)
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              DECISION CERTAINTY BEFORE INVESTMENT
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white mb-4">
              What DigiXPro Advisory Helps You Decide
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
              Obtain independent clarity and decision frameworks before committing major capital to software vendors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "Should we replace our CRM or ERP?",
                a: "We clarify whether your existing system needs replacing, what software alternatives fit, what API webhooks are required, and what should happen first."
              },
              {
                q: "Should we build custom software or buy off-the-shelf?",
                a: "We build a financial and technical comparison model evaluating commercial platforms vs custom web engineering over a 3-year operating horizon."
              },
              {
                q: "Do we need a new software system?",
                a: "We diagnose whether your operational bottlenecks are caused by broken software tools or by unmapped departmental handoffs."
              },
              {
                q: "What should we fix or upgrade first?",
                a: "We deliver a sequenced technology roadmap prioritizing quick operational wins and data hygiene before major capital allocation."
              },
              {
                q: "Can our existing team or vendor execute this?",
                a: "We assess internal team execution readiness, audit external agency proposals, define SLA benchmarks, and establish technical governance."
              },
              {
                q: "How do we avoid vendor lock-in?",
                a: "We design vendor-neutral architecture blueprints using standard API webhooks and client code ownership so you retain full operational control."
              }
            ].map((dec, idx) => (
              <div key={idx} className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#16a34a] mb-2">DECISION 0{idx + 1}</div>
                  <h3 className="text-base font-extrabold text-black dark:text-white mb-3">&ldquo;{dec.q}&rdquo;</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{dec.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            05 • WHAT YOU RECEIVE (DELIVERABLES)
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              TANGIBLE OUTPUTS
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white">
              Tangible Advisory Deliverables
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
              Clear documentation, technical diagrams, and risk models delivered with 100% client ownership.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "System Architecture Blueprint", icon: <Layers className="w-5 h-5 text-[#16a34a]" />, desc: "Complete visual diagram of your target software, data, and integration layers." },
              { title: "Vendor Evaluation Matrix", icon: <FileText className="w-5 h-5 text-[#16a34a]" />, desc: "Quantitative scoring model comparing software platforms against operational needs." },
              { title: "Sequenced 3-Phase Roadmap", icon: <Network className="w-5 h-5 text-[#16a34a]" />, desc: "Prioritized milestone plan connecting short-term quick wins to long-term scaling." },
              { title: "Technical Debt & Risk Audit", icon: <ShieldCheck className="w-5 h-5 text-[#16a34a]" />, desc: "Comprehensive review of legacy code, security vulnerabilities, and single points of failure." },
              { title: "API Integration Specifications", icon: <Cpu className="w-5 h-5 text-[#16a34a]" />, desc: "Technical webhook standards enabling developers to integrate CRMs, ERPs, and forms." },
              { title: "Executive Decision Briefs", icon: <Briefcase className="w-5 h-5 text-[#16a34a]" />, desc: "Clear decision matrices for board members, investors, and executive leadership." }
            ].map((del, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
                    {del.icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-black dark:text-white">{del.title}</h3>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-11 leading-relaxed">{del.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            06 • METHODOLOGY
        ========================================== */}
        <section className="py-20 bg-[#0A0A0A] text-white border-b border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6 text-center max-w-3xl">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              METHODOLOGY
            </div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold mb-6">
              Process-First Architecture
            </h2>
            <p className="text-[17px] text-neutral-400 leading-relaxed mb-10">
              We never prescribe software without understanding operational reality first. Discovery follows our proven operating hierarchy:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm font-bold">
              <span className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">Business Goals</span>
              <ArrowRight className="w-4 h-4 text-[#16a34a]" />
              <span className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">People &amp; Teams</span>
              <ArrowRight className="w-4 h-4 text-[#16a34a]" />
              <span className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">Processes</span>
              <ArrowRight className="w-4 h-4 text-[#16a34a]" />
              <span className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">Information</span>
              <ArrowRight className="w-4 h-4 text-[#16a34a]" />
              <span className="bg-[#16a34a] text-white px-4 py-2 rounded-xl">Technology</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            07 • RELEVANT FACTUAL PRODUCTION EVIDENCE
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
              FACTUAL PROOF
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-black dark:text-white mb-6">
              Proven Architecture in Production
            </h2>
            <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Our advisory insights are derived from real-world engineering and system architecture deployments.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-8">
              <Link href="/evidence/digixpro" className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group">
                <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">PROOFS &bull; PLATFORM ARCHITECTURE</div>
                <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-2">DigiXPro Architecture Blueprint &rarr;</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Decoupled Next.js static site, automated schema generation, and n8n webhook routing.</p>
              </Link>

              <Link href="/evidence/sattvaos" className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-[#16a34a] transition-all group">
                <div className="text-xs font-mono text-[#16a34a] font-bold mb-1">PROOFS &bull; ENTERPRISE OS</div>
                <h3 className="text-base font-bold text-black dark:text-white group-hover:text-[#16a34a] transition-colors mb-2">SattvaOS Integrated Operating System &rarr;</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Institutional system architecture, centralized information flows, and governed workflow automation.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            08 • BUYER FAQS
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
            {advisoryFaqs.map((faq, idx) => (
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
            09 • VENDOR-NEUTRAL TRUST & PHILOSOPHY
        ========================================== */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6 text-center max-w-3xl">
            <ShieldCheck className="w-10 h-10 text-[#16a34a] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white mb-4">
              Vendor-Neutral Technology Advisory
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              We do not accept software kickbacks, vendor commissions, or push proprietary lock-ins. Every recommendation is made solely to benefit your operational goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-neutral-500 font-semibold">
              <span>&bull; Zero Software Commissions</span>
              <span>&bull; 100% Client Code Ownership</span>
              <span>&bull; Empirical Architecture Proof</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            10 • 30-MINUTE ARCHITECTURE CALL CTA (EXPECTATION SETTING)
        ========================================== */}
        <section className="py-20 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-neutral-800 p-10 md:p-14 rounded-[32px] shadow-xl max-w-4xl mx-auto text-white">
            <div className="text-center mb-8">
              <span className="text-[11px] font-mono font-bold text-[#16a34a] uppercase tracking-widest block mb-3">
                COMMERCIAL DISCOVERY
              </span>
              <h2 className="font-extrabold text-[28px] md:text-[40px] mb-4 leading-tight">
                Ready to Discuss Your Technology Architecture?
              </h2>
              <p className="text-[16px] md:text-[18px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                Book a 30-minute discovery call with our leadership to evaluate your operating bottlenecks, current software stack, and growth goals.
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
                  <span>Review your current business operating reality &amp; scaling goals.</span>
                </div>
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Identify your biggest technology &amp; process friction points.</span>
                </div>
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Evaluate software platforms or vendors you are considering.</span>
                </div>
                <div className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-[#16a34a] mr-2.5 shrink-0 mt-0.5" />
                  <span>Determine whether DigiXPro advisory is the right strategic fit.</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-center font-mono text-[11px] text-neutral-400">
                No obligation &bull; No sales pitch &bull; Diagnostic scope comes after understanding the problem
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#16a34a] text-white font-bold text-[15px] rounded-xl hover:bg-[#15803d] transition-colors shadow-md min-h-[52px]"
              >
                Book a 30-Minute Architecture Call <ArrowRight className="w-4 h-4 ml-2" />
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
