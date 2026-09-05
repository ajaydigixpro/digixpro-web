import React from 'react';
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: { absolute: 'Disclaimer — DigiXPro Digital Solution' },
  description: 'DigiXPro Disclaimer — independent advisory boundaries, search performance expectations, vendor neutrality, AI context, and case study notices.',
  alternates: {
    canonical: 'https://www.digixpro.in/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  const lastUpdated = 'September 5, 2026';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-16 max-w-3xl mx-auto transition-colors duration-200">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.digixpro.in' },
          { name: 'Disclaimer', url: 'https://www.digixpro.in/disclaimer' },
        ]}
      />
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">Operational Limitations &amp; Disclaimers</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-black dark:text-white">Disclaimer</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">Last updated: {lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">1. Technology Advisory Disclaimer</h2>
          <p>
            DigiXPro Digital Solution (&ldquo;DigiXPro&rdquo;) provides independent technology architecture advisory and commercial engineering services. Content, blueprints, and recommendations published on this Website (<a href="https://www.digixpro.in" className="text-[#009E73] hover:underline font-semibold">www.digixpro.in</a>) represent technical judgment and operational analysis.
          </p>
          <p className="mt-3">
            Nothing on this Website constitutes formal legal, accounting, tax, or statutory compliance advice. Clients requiring such counsel should consult certified professionals in those domains.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">2. Case Study Evidence &amp; Performance Context</h2>
          <p>
            Evidence pages document real production systems engineered or advised by DigiXPro Digital Solution. Specific metrics — including page speed scores, redirect counts, traffic growth, and conversion improvements — reflect actual historical performance under specific operating conditions.
          </p>
          <p className="mt-3 font-semibold text-black dark:text-white">
            Past outcomes are not guarantees of future performance for other businesses. Results vary based on industry competition, execution speed, domain history, and client resource allocation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">3. Search Engine &amp; AI Discovery (GEO) Limitations</h2>
          <p>
            Search indexation, organic Google rankings, and AI answer engine (ChatGPT, Perplexity, Claude, Gemini) citations depend on autonomous third-party algorithms.
          </p>
          <p className="mt-3">
            DigiXPro Digital Solution delivers technical SEO compliance, pre-rendered HTML5 markup, automated JSON-LD schemas, and Core Web Vitals speed architecture. However, <strong>DigiXPro Digital Solution does not promise exact #1 keyword positions, specific search impression numbers, fixed lead quantities, or revenue figures</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">4. Vendor-Neutral Policy</h2>
          <p>
            DigiXPro Digital Solution accepts <strong>zero financial commissions, referral fees, or kickbacks</strong> from software vendors, hosting providers, or SaaS platforms recommended in our advisory reports or website blueprints. Our evaluations are 100% vendor-neutral.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">5. AI Model Limitations &amp; Human Verification</h2>
          <p>
            Generative AI tools and Large Language Model APIs process data probabilistically. DigiXPro Digital Solution enforces human editorial review and factual verification across all client deliverables, content pipelines, and automated workflows to mitigate AI hallucination risks.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">6. Client Approval &amp; Account Responsibility</h2>
          <p>
            Clients maintain final approval authority for published social content, brand copy, and ad campaign messaging. Clients are responsible for maintaining active subscriptions, API credentials, and administrative access for their third-party software accounts.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">7. Third-Party Links &amp; Advertising Disclosures</h2>
          <p>
            The Website contains links to external third-party websites and deploys digital campaign tracking tags (such as Meta Pixel and Google Ads) to measure marketing performance and campaign effectiveness. DigiXPro Digital Solution does not control or guarantee the content, privacy practices, or security of external third-party websites, and participation in advertising campaigns does not constitute an endorsement of third-party products or SaaS platforms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black dark:text-white mb-3">8. Contact Information</h2>
          <p>
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:ajay@digixpro.in" className="text-[#009E73] hover:underline font-semibold">ajay@digixpro.in</a>
          </p>
        </section>

      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
        <a href="/privacy-policy" className="hover:text-black dark:hover:text-white transition">Privacy Policy</a>
        <a href="/terms" className="hover:text-black dark:hover:text-white transition">Terms of Use</a>
        <a href="/contact" className="hover:text-black dark:hover:text-white transition">Contact Us</a>
      </div>
    </div>
  );
}
