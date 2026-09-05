import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: { absolute: 'Privacy Policy — DigiXPro Digital Solution' },
  description: "DigiXPro privacy policy detailing our data handling practices, storage protocols, and commitment to safeguarding confidential client operational data.",
  alternates: {
    canonical: 'https://www.digixpro.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 5, 2026';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-16 max-w-3xl mx-auto transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Privacy Policy', url: 'https://www.digixpro.in/privacy-policy' },
        ]}
      />
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
          <h2 className="text-base font-bold text-black dark:text-white mb-3">1. Organization &amp; Data Controller</h2>
          <p>
            DigiXPro Digital Solution (&ldquo;DigiXPro&rdquo;) is an Independent Technology Architecture Advisory &amp; Commercial Web Engineering firm based in Noida, Uttar Pradesh, India. Our website is <a href="https://www.digixpro.in" className="text-[#009E73] hover:underline font-semibold">www.digixpro.in</a>. You may contact us at <a href="mailto:ajay@digixpro.in" className="text-[#009E73] hover:underline font-semibold">ajay@digixpro.in</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">2. Information We Collect &amp; Process</h2>
          <p>Information is processed as necessary to deliver technology advisory, web engineering, SEO, and workflow automation services:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Enquiry &amp; Lead Capture Data</strong> — Name, business email address, phone number, organisation name, UTM parameters, and project context submitted via contact forms, discovery qualification forms, or our interactive SalesConcierge widget.</li>
            <li><strong>Client Operational &amp; Project Data</strong> — Technical documentation, process workflows, software inventory, API keys, and credential access provided during active advisory, web engineering, or automation engagements.</li>
            <li><strong>Automatically Collected Telemetry</strong> — Server logs, IP addresses, browser types, referring URLs, and page performance metrics collected via our hosting infrastructure solely to evaluate website security and Core Web Vitals performance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">3. How Information Is Used</h2>
          <p>Information is processed strictly to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Schedule and conduct 30-minute discovery and architecture calls.</li>
            <li>Architect target technology blueprints, engineer Next.js web applications, build n8n automation pipelines, and optimize search visibility.</li>
            <li>Route inbound lead notifications instantaneously to internal management databases via automated webhooks.</li>
            <li>Comply with statutory legal and accounting obligations.</li>
          </ul>
          <p className="mt-3 font-semibold text-black dark:text-white">DigiXPro Digital Solution does not sell, rent, trade, or monetize personal or business data to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">4. Infrastructure &amp; Third-Party Service Providers</h2>
          <p>Website and operational systems utilize selected third-party infrastructure providers:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Hosting &amp; Content Delivery</strong> — Served via Cloudflare Pages and Vercel static pre-rendering networks.</li>
            <li><strong>Analytics &amp; User Experience Telemetry</strong> — Microsoft Clarity used strictly for aggregated website usage analytics, scroll heatmaps, and interface optimization upon explicit user consent. Telemetry is anonymized.</li>
            <li><strong>Workflow &amp; Webhook Lead Automation</strong> — Self-hosted n8n automation pipelines and Notion lead management databases for secure, encrypted form routing.</li>
            <li><strong>Discovery Scheduling</strong> — Calendly for self-service consultation booking.</li>
            <li><strong>AI Model &amp; API Processing</strong> — Third-party Large Language Model APIs (e.g. OpenAI, Anthropic, Google Gemini) used statelessly for query parsing and content structuring. Client data is not submitted to public training sets.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">5. Confidentiality &amp; Data Security</h2>
          <p>
            Client business data, internal process blueprints, and API credentials shared with DigiXPro Digital Solution are treated as strictly confidential. HTTPS encryption in transit, encrypted environment secret management, and restricted access controls are enforced.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">6. Cookies &amp; Tracking Policy</h2>
          <p>
            DigiXPro Digital Solution uses cookies and local storage strictly to ensure site security, remember visitor preferences, and measure website performance:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Analytics Cookies (Microsoft Clarity)</strong> — Activated only upon explicit visitor consent via our cookie banner. These cookies gather anonymized session data, interaction heatmaps, and rendering telemetry to evaluate usability and improve technical architecture.
            </li>
            <li>
              <strong>Preference &amp; Essential Local Storage</strong> — Essential key-value pairs (such as dark/light theme choice and your cookie consent decision <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">digixpro_cookie_consent</code>) stored locally in your browser.
            </li>
            <li>
              <strong>Zero Advertising / Marketing Tracking</strong> — DigiXPro Digital Solution does <strong>not</strong> deploy third-party advertising cookies, cross-site tracking pixels, or remarketing scripts.
            </li>
          </ul>
          <p className="mt-3">
            Visitors may alter or revoke their cookie preferences at any time by clearing their browser&apos;s local storage or adjusting their browser cookie management settings.
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
          <p>You have the right to request access to, correction of, or deletion of your personal data held by DigiXPro. Requests should be sent to <a href="mailto:ajay@digixpro.in" className="text-[#009E73] hover:underline font-semibold">ajay@digixpro.in</a> and will be addressed within 30 days.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">9. Contact Information</h2>
          <p>
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:ajay@digixpro.in" className="text-[#009E73] hover:underline font-semibold">ajay@digixpro.in</a>
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
