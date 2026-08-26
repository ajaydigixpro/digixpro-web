import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DigiXPro Privacy Policy — how we collect, process, store, and protect personal and operational information across our advisory, web engineering, and automation services.',
  alternates: {
    canonical: 'https://www.digixpro.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'August 26, 2026';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-16 max-w-3xl mx-auto transition-colors duration-200">
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#009E73]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">Operational Disclosures &amp; Privacy</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-black dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">Last updated: {lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">1. Who We Are</h2>
          <p>
            DigiXPro Digital Solution (&ldquo;DigiXPro&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an Independent Technology Architecture Advisory &amp; Commercial Web Engineering firm based in Noida, Uttar Pradesh, India. Our website is <a href="https://www.digixpro.in" className="text-[#009E73] hover:underline font-semibold">www.digixpro.in</a>. You may contact us at <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline font-semibold">consult@digixpro.in</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">2. Information We Collect &amp; Process</h2>
          <p>We process information necessary to deliver our technology advisory, web engineering, SEO, and workflow automation services:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Enquiry &amp; Lead Capture Data</strong> — Name, business email address, phone number, organisation name, UTM parameters, and project context submitted via contact forms, discovery qualification forms, or our interactive SalesConcierge widget.</li>
            <li><strong>Client Operational &amp; Project Data</strong> — Technical documentation, process workflows, software inventory, API keys, and credential access provided during active advisory, web engineering, or automation engagements.</li>
            <li><strong>Automatically Collected Telemetry</strong> — Server logs, IP addresses, browser types, referring URLs, and page performance metrics collected via our hosting infrastructure solely to evaluate website security and Core Web Vitals performance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">3. How We Use Your Information</h2>
          <p>Information is processed strictly to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Schedule and conduct 30-minute discovery and architecture calls.</li>
            <li>Architect target technology blueprints, engineer Next.js web applications, build n8n automation pipelines, and optimize search visibility.</li>
            <li>Route inbound lead notifications instantaneously to our internal management databases via automated webhooks.</li>
            <li>Comply with statutory legal and accounting obligations.</li>
          </ul>
          <p className="mt-3 font-semibold text-black dark:text-white">We do not sell, rent, trade, or monetize your personal or business data to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">4. Infrastructure &amp; Third-Party Service Providers</h2>
          <p>Our website and operational systems utilize selected third-party infrastructure providers:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Hosting &amp; Content Delivery</strong> — Served via Cloudflare Pages and Vercel static pre-rendering networks.</li>
            <li><strong>Workflow &amp; Webhook Lead Automation</strong> — Self-hosted n8n automation pipelines and Notion lead management databases for secure, encrypted form routing.</li>
            <li><strong>Discovery Scheduling</strong> — Calendly for self-service consultation booking.</li>
            <li><strong>AI Model &amp; API Processing</strong> — Third-party Large Language Model APIs (e.g. OpenAI, Anthropic, Google Gemini) used statelessly for query parsing and content structuring. Client data is not submitted to public training sets.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">5. Confidentiality &amp; Data Security</h2>
          <p>
            Client business data, internal process blueprints, and API credentials shared with DigiXPro are treated as strictly confidential. We enforce HTTPS encryption in transit, encrypted environment secret management, and restricted team access.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">6. Cookies &amp; Tracking</h2>
          <p>
            We use minimal cookies required for security and functional site operation. We do not deploy third-party cross-site advertising cookies. Performance monitoring relies on privacy-respecting server metrics.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">7. Data Retention</h2>
          <p>
            General lead enquiries and project correspondence are retained for up to 3 years to maintain client relationship history, after which records are archived or deleted unless longer retention is legally required.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">8. Your Data Rights</h2>
          <p>You have the right to request access to, correction of, or deletion of your personal data held by DigiXPro. Requests should be sent to <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline font-semibold">consult@digixpro.in</a> and will be addressed within 30 days.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">9. Contact Us</h2>
          <p>
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline font-semibold">consult@digixpro.in</a>
          </p>
        </section>

      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
        <a href="/terms" className="hover:text-black dark:hover:text-white transition">Terms of Use</a>
        <a href="/disclaimer" className="hover:text-black dark:hover:text-white transition">Disclaimer</a>
        <a href="/contact" className="hover:text-black dark:hover:text-white transition">Contact Us</a>
      </div>
    </div>
  );
}
