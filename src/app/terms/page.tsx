import React from 'react';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'DigiXPro Terms of Use — conditions governing use of our website and advisory services.',
  alternates: {
    canonical: 'https://www.digixpro.in/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const lastUpdated = 'July 30, 2025';

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#009E73]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Legal</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Terms of Use</h1>
        <p className="text-sm text-neutral-500 font-mono">Last updated: {lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-neutral-700">

        <section>
          <h2 className="text-base font-bold text-black mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website at <a href="https://www.digixpro.in" className="text-[#009E73] hover:underline">www.digixpro.in</a> (&ldquo;Website&rdquo;), you agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms, please discontinue your use of the Website immediately.
          </p>
          <p className="mt-3">
            These Terms are governed by the laws of India. Any disputes arising from use of this Website shall be subject to the jurisdiction of courts in Uttar Pradesh, India.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">2. Intellectual Property</h2>
          <p>
            All content published on this Website — including text, frameworks, case studies, diagrams, code, and branding — is the intellectual property of DigiXPro Digital Solution or its clients, protected under applicable copyright and intellectual property laws.
          </p>
          <p className="mt-3">
            You may not reproduce, redistribute, republish, or create derivative works from any content on this Website without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">3. Use of Website</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Use the Website for any unlawful purpose or in violation of applicable laws.</li>
            <li>Attempt to gain unauthorised access to any part of the Website or its infrastructure.</li>
            <li>Use automated tools to scrape, harvest, or extract content from the Website in bulk without prior consent.</li>
            <li>Impersonate DigiXPro or any representative of DigiXPro.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">4. Advisory Services</h2>
          <p>
            Information presented on this Website is for general informational purposes. It does not constitute a binding advisory engagement. A formal advisory engagement requires a separate written agreement between you and DigiXPro.
          </p>
          <p className="mt-3">
            Case studies and evidence pages describe actual client engagements and are presented with client consent. Results are specific to each engagement context and are not guarantees of future outcomes for other clients.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">5. Third-Party Links</h2>
          <p>
            This Website may contain links to third-party websites (e.g., client sites, Calendly, LinkedIn). These links are provided for convenience only. DigiXPro has no control over the content or privacy practices of external sites and accepts no responsibility for them.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">6. Disclaimers</h2>
          <p>
            The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, express or implied. DigiXPro does not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
          <p className="mt-3">
            Please also review our full <a href="/disclaimer" className="text-[#009E73] hover:underline">Disclaimer</a> for limitations of liability regarding advisory content.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, DigiXPro shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this Website or its content, even if DigiXPro has been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the Website after changes constitutes acceptance of the revised Terms. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">9. Contact</h2>
          <p>
            Questions about these Terms should be directed to:<br />
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline">consult@digixpro.in</a>
          </p>
        </section>

      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
        <a href="/privacy-policy" className="hover:text-black transition">Privacy Policy</a>
        <a href="/disclaimer" className="hover:text-black transition">Disclaimer</a>
        <a href="/contact" className="hover:text-black transition">Contact Us</a>
      </div>
    </div>
  );
}
