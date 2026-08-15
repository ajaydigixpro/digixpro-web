import React from 'react';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import CallbackRequestForm from '@/components/contact/CallbackRequestForm';
import { 
  MapPin, 
  Mail, 
  Plane,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  CalendarDays
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Request a Discovery Call',
  description: 'Request a free 30-minute discovery call to discuss your business architecture, operational bottlenecks, and technology decisions. Based in Noida, India. Serving founders and growing businesses nationwide.',
  keywords: [
    'contact DigiXPro',
    'technology advisory consultation India',
    'book discovery call',
    'technology architecture consultant Noida',
  ],
  alternates: {
    canonical: 'https://www.digixpro.in/contact',
  },
  openGraph: {
    title: 'Contact Us — Request a Discovery Call | DigiXPro',
    description: 'Request a free 30-minute discovery call to discuss your business architecture, operational bottlenecks, and technology decisions.',
    url: 'https://www.digixpro.in/contact',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiXPro — Book a Discovery Call',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Request a Discovery Call | DigiXPro',
    description: 'Request a free 30-minute discovery call to discuss your technology architecture.',
    images: ['/twitter-image.png'],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#16a34a]/20 pb-24 transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Contact', url: 'https://www.digixpro.in/contact' },
        ]}
      />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-16">
        <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
          Initiate an Engagement
        </div>
        <h1 className="text-[40px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-6 text-black dark:text-white">
          Contact Us.
        </h1>
        <p className="text-[18px] md:text-[22px] font-semibold text-neutral-800 dark:text-neutral-200 max-w-3xl leading-relaxed mb-4">
          Every engagement starts with understanding your business reality, not your software requirements.
        </p>
      </section>

      {/* 2. QUALIFICATION BLOCK (Is DigiXPro Right For You?) */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-[24px] overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
            
            {/* Good Fit */}
            <div className="p-8 md:p-10">
              <h2 className="text-[18px] font-extrabold text-black dark:text-white mb-6">This 30-min call is suitable if:</h2>
              <ul className="space-y-4 text-[15px] font-medium text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  You&apos;re evaluating major technology decisions.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  Your operations have become difficult to manage.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  You&apos;re planning automation or AI integration.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  You&apos;re scaling beyond manual processes.
                </li>
              </ul>
            </div>

            {/* Bad Fit */}
            <div className="p-8 md:p-10 bg-white dark:bg-neutral-900">
              <h2 className="text-[18px] font-extrabold text-black dark:text-white mb-6">Probably not the right fit if:</h2>
              <ul className="space-y-4 text-[15px] font-medium text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-neutral-300 dark:text-neutral-600 mr-3 mt-0.5 shrink-0" />
                  You only need a brochure website.
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-neutral-300 dark:text-neutral-600 mr-3 mt-0.5 shrink-0" />
                  You&apos;re looking for the cheapest developer.
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-neutral-300 dark:text-neutral-600 mr-3 mt-0.5 shrink-0" />
                  You already know exactly what should be built and only need implementation.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT GRID */}
      <section className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: DIRECT BOOKING BLOCK */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 rounded-[24px] flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 bg-white dark:bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-200 dark:border-neutral-800 mb-6 shadow-sm">
                <CalendarDays className="w-8 h-8 text-[#16a34a]" />
              </div>
              <h2 className="text-[28px] md:text-[32px] font-extrabold mb-4 text-black dark:text-white">Ready to Scope the Work?</h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed">
                Already explored the options and ready to discuss execution? Pick a 30-minute discovery conversation and move directly into the right scope.
              </p>
              
              <a 
                href="https://calendly.com/shukla-ajay05/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[16px] rounded-xl px-10 py-4 hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-all hover:scale-105 shadow-md"
              >
                Book a 30-minute conversation <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest mt-6 mb-12">
                Direct scheduling • 30 minutes
              </p>

              {/* 3-Step Process */}
              <div className="w-full max-w-sm text-left border-t border-neutral-200 dark:border-neutral-800 pt-8 mt-auto">
                <h3 className="text-[14px] font-bold text-black dark:text-white uppercase tracking-wider mb-5 text-center">What happens after booking?</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center font-bold text-[12px] mr-4 shrink-0">1</div>
                    <p className="text-[15px] font-medium text-neutral-700 dark:text-neutral-300">Schedule your call</p>
                  </div>
                  <div className="w-0.5 h-5 bg-neutral-200 dark:bg-neutral-800 ml-3"></div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center font-bold text-[12px] mr-4 shrink-0">2</div>
                    <p className="text-[15px] font-medium text-neutral-700 dark:text-neutral-300">Discovery discussion</p>
                  </div>
                  <div className="w-0.5 h-5 bg-neutral-200 dark:bg-neutral-800 ml-3"></div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center font-bold text-[12px] mr-4 shrink-0">3</div>
                    <p className="text-[15px] font-medium text-neutral-700 dark:text-neutral-300">Receive next-step recommendations</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: EXPECTATIONS & STRUCTURE */}
          <div className="lg:col-span-5 space-y-12">
            <section id="callback-request" className="rounded-[24px] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
              <div className="mb-5">
                <div className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#16a34a]">Prefer a callback?</div>
                <h2 className="mt-2 text-[24px] font-extrabold text-black dark:text-white">Leave the context. We&apos;ll call back.</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Share a preferred WhatsApp/contact number or email, along with the decision you&apos;re working through. The request reaches DigiXPro directly.
                </p>
              </div>
              <CallbackRequestForm />
            </section>
            
            {/* Engagement Options */}
            <div>
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                Engagement Options
              </div>
              <h3 className="text-[20px] font-extrabold mb-4 text-black dark:text-white">Ways We Work Together</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[15px] text-black dark:text-white">Architecture Review (Audit)</strong>
                    <span className="text-[14px] text-neutral-600 dark:text-neutral-400">Technical due diligence for existing systems.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[15px] text-black dark:text-white">Remote Advisory Retainer</strong>
                    <span className="text-[14px] text-neutral-600 dark:text-neutral-400">Ongoing architectural intelligence for your team.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[15px] text-black dark:text-white">On-Site Discovery Workshops</strong>
                    <span className="text-[14px] text-neutral-600 dark:text-neutral-400">Deep operational mapping with your departments.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Expected Deliverables */}
            <div>
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">
                The Output
              </div>
              <h3 className="text-[20px] font-extrabold mb-4 text-black dark:text-white">Expected Deliverables</h3>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 mb-4">Following the discovery phase, engagements typically yield:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[13px] font-bold text-neutral-700 dark:text-neutral-300">OS Blueprint</span>
                <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[13px] font-bold text-neutral-700 dark:text-neutral-300">Decision Rationale</span>
                <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[13px] font-bold text-neutral-700 dark:text-neutral-300">Tech Roadmap</span>
                <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[13px] font-bold text-neutral-700 dark:text-neutral-300">Implementation Strategy</span>
                <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[13px] font-bold text-neutral-700 dark:text-neutral-300">Risk Report</span>
              </div>
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400 italic">
                * Deliverables vary depending on the scope of the engagement.
              </p>
            </div>

            {/* Travel Policy & Direct Info */}
            <div className="bg-[#0A0A0A] dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white p-6 md:p-8 rounded-2xl">
              <h3 className="text-[16px] font-bold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-[#16a34a] mr-2" />
                Operational Policies
              </h3>
              <ul className="space-y-4 text-[13px] text-neutral-400">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-[#16a34a]" />
                  <span><strong>Discovery First:</strong> Every engagement begins with a discovery discussion. Implementation, if required, is planned only after the architecture is complete.</span>
                </li>
                <li className="flex items-start border-t border-neutral-800 pt-4">
                  <Plane className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-neutral-500" />
                  <span><strong>Travel Policy:</strong> If an on-site discovery or in-person meeting is required, all travel and commute expenses (including within Delhi NCR) must be borne by the client.</span>
                </li>
                <li className="flex items-start border-t border-neutral-800 pt-4">
                  <Mail className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-neutral-500" />
                  <span>
                    <strong>Direct Email:</strong>{' '}
                    <a
                      href="mailto:consult%40digixpro.in"
                      aria-label="Email consult at digixpro dot in"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      <span>consult</span><span aria-hidden="true">@</span><span>digixpro.in</span>
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-neutral-500" />
                  <span><strong>Base Location:</strong> Noida, Uttar Pradesh, India</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
