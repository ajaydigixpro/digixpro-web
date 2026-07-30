import React from 'react';
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'DigiXPro Disclaimer — advisory limitations, case study context, and liability notice for technology architecture advisory services.',
  alternates: {
    canonical: 'https://www.digixpro.in/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  const lastUpdated = 'July 30, 2025';

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans px-6 py-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Legal</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Disclaimer</h1>
        <p className="text-sm text-neutral-500 font-mono">Last updated: {lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-neutral-700">

        <section>
          <h2 className="text-base font-bold text-black mb-3">1. General Advisory Disclaimer</h2>
          <p>
            DigiXPro Digital Solution (&ldquo;DigiXPro&rdquo;) provides independent technology architecture advisory services. The information, frameworks, opinions, and analysis presented on this Website (<a href="https://www.digixpro.in" className="text-[#009E73] hover:underline">www.digixpro.in</a>) are for general informational purposes only.
          </p>
          <p className="mt-3">
            Nothing on this Website constitutes formal legal, financial, accounting, or regulatory advice. For matters requiring such advice, please consult a qualified professional in that domain.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">2. Case Study Results</h2>
          <p>
            Case studies and evidence reports presented on this Website document real engagements conducted by DigiXPro. However, outcomes described — including rankings, traffic growth, operational improvements, and revenue impact — are specific to each client&rsquo;s context, market conditions, timeline, and resource availability.
          </p>
          <p className="mt-3">
            These results are <strong>not guarantees</strong> that similar outcomes will be achieved for any other client or organisation. Technology and market conditions change continuously, and past results should not be interpreted as a reliable predictor of future performance.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">3. Technology Recommendations</h2>
          <p>
            DigiXPro&rsquo;s advisory recommendations regarding specific software platforms, vendors, architectures, or technical approaches are based on the information available at the time of engagement and DigiXPro&rsquo;s professional judgement.
          </p>
          <p className="mt-3">
            DigiXPro is <strong>vendor-neutral</strong> and does not receive commissions, referral fees, or financial incentives from any software vendor or technology platform mentioned on this Website or in its advisory reports.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">4. AI and Emerging Technology</h2>
          <p>
            Content related to Artificial Intelligence, machine learning, and emerging technology on this Website reflects DigiXPro&rsquo;s current understanding and experience. The AI technology landscape evolves rapidly. Statements about AI capabilities, limitations, governance requirements, or best practices may become outdated as the field progresses.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">5. External Links</h2>
          <p>
            Links to third-party websites (including client websites and referenced platforms) are provided for reference and verification purposes. DigiXPro does not control, endorse, or accept responsibility for the content, privacy practices, or availability of any external site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">6. Limitation of Liability</h2>
          <p>
            DigiXPro, its founder, employees, and associates shall not be liable for any loss, damage, or adverse outcome — direct or indirect — resulting from reliance on content published on this Website, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Business or technology decisions made based on Website content.</li>
            <li>Software or vendor selection decisions influenced by articles, case studies, or recommendations on this Website.</li>
            <li>Technical failures or errors on linked third-party platforms.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">7. Accuracy of Information</h2>
          <p>
            We endeavour to keep the information on this Website accurate and up to date. However, DigiXPro makes no representation or warranty — express or implied — regarding the completeness, accuracy, reliability, or suitability of any information for any particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">8. Contact</h2>
          <p>
            If you have questions or concerns about this Disclaimer, please contact:<br />
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline">consult@digixpro.in</a>
          </p>
        </section>

      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
        <a href="/privacy-policy" className="hover:text-black transition">Privacy Policy</a>
        <a href="/terms" className="hover:text-black transition">Terms of Use</a>
        <a href="/contact" className="hover:text-black transition">Contact Us</a>
      </div>
    </div>
  );
}
