import React from 'react';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'DigiXPro Terms of Use — conditions governing use of our website, technology advisory, web engineering, and commercial automation services.',
  alternates: {
    canonical: 'https://www.digixpro.in/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const lastUpdated = 'August 26, 2026';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-16 max-w-3xl mx-auto transition-colors duration-200">
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#009E73]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">Commercial Terms &amp; Conditions</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-black dark:text-white">Terms of Use</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">Last updated: {lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website at <a href="https://www.digixpro.in" className="text-[#009E73] hover:underline font-semibold">www.digixpro.in</a> (&ldquo;Website&rdquo;), you agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;). These Terms are governed by the laws of India. Any disputes arising from Website use shall be subject to the jurisdiction of courts in Uttar Pradesh, India.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">2. Intellectual Property &amp; Codebase Ownership</h2>
          <p>
            All website content, custom frameworks, case studies, diagrams, and branding on this Website remain the intellectual property of DigiXPro Digital Solution.
          </p>
          <p className="mt-3">
            For paid client web engineering and custom software engagements, <strong>the client owns 100% of the custom codebase, design tokens, and digital assets</strong> upon full completion and payment. DigiXPro imposes zero proprietary platform lock-in fees or ongoing software licensing taxes on custom builds.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">3. Advisory &amp; Commercial Scope</h2>
          <p>
            Information published on this Website is provided for operational orientation. Formal technology advisory, web engineering, SEO management, or workflow automation engagements require a dedicated, written scope agreement defining deliverables, timelines, and commercial terms.
          </p>
          <p className="mt-3">
            Advisory blueprints operate independently: clients retain complete freedom to execute recommendations internally, contract third-party agencies, or engage DigiXPro Studio.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">4. Client Responsibilities</h2>
          <p>Clients engaging DigiXPro are responsible for:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Providing accurate business context, operational requirements, and timely milestone feedback/approvals.</li>
            <li>Maintaining active accounts and licenses for third-party platforms (e.g., CRMs, domain registrars, hosting, LLM API keys).</li>
            <li>Ensuring legal rights and copyright clearances for all logos, copy, images, and data supplied to DigiXPro.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">5. Third-Party Software &amp; Platform Dependencies</h2>
          <p>
            Our web applications, automation pipelines, and search strategies integrate with third-party software vendors (e.g. HubSpot, Salesforce, Notion, Cloudflare, OpenAI, Anthropic, Google). DigiXPro is not liable for third-party vendor service outages, API deprecations, rate limits, or vendor pricing modifications.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">6. Automation Operations &amp; Failure Boundaries</h2>
          <p>
            Workflow automations (such as n8n webhooks) are engineered with error logging and notification fail-safes. However, continuous execution requires valid third-party API credentials and stable network endpoints. DigiXPro is not responsible for workflow interruptions caused by unnotified third-party password/token changes or external vendor API downtime.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">7. Disclaimers &amp; Limitation of Liability</h2>
          <p>
            The Website and its contents are provided on an &ldquo;as is&rdquo; basis. To the maximum extent permitted by applicable law, DigiXPro shall not be liable for indirect, incidental, or consequential damages resulting from website use or implementation of published guidance. Please review our complete <a href="/disclaimer" className="text-[#009E73] hover:underline font-semibold">Disclaimer</a> for specific service boundary details.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">8. Contact Information</h2>
          <p>
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline font-semibold">consult@digixpro.in</a>
          </p>
        </section>

      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
        <a href="/privacy-policy" className="hover:text-black dark:hover:text-white transition">Privacy Policy</a>
        <a href="/disclaimer" className="hover:text-black dark:hover:text-white transition">Disclaimer</a>
        <a href="/contact" className="hover:text-black dark:hover:text-white transition">Contact Us</a>
      </div>
    </div>
  );
}
