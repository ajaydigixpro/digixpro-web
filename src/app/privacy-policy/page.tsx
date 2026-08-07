import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DigiXPro Privacy Policy — how we collect, use, and protect your personal information when you use our advisory services and website.',
  alternates: {
    canonical: 'https://www.digixpro.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'July 30, 2025';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans px-6 py-16 max-w-3xl mx-auto transition-colors duration-200">
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#009E73]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Legal</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-black dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">Last updated: {lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-neutral-700">

        <section>
          <h2 className="text-base font-bold text-black mb-3">1. Who We Are</h2>
          <p>
            DigiXPro Digital Solution (&ldquo;DigiXPro&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an Independent Technology Architecture Advisory firm based in Noida, Uttar Pradesh, India. Our website is <a href="https://www.digixpro.in" className="text-[#009E73] hover:underline">www.digixpro.in</a>. You may contact us at <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline">consult@digixpro.in</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">2. Information We Collect</h2>
          <p>We collect information in two ways:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Information you provide voluntarily</strong> — When you book a discovery call via Calendly, send us an email, or submit a contact form, you may provide your name, email address, phone number, organisation name, and any details you choose to share about your project or business.</li>
            <li><strong>Information collected automatically</strong> — When you visit our website, standard server logs and analytics tools may collect your IP address, browser type, referring URL, pages visited, and session duration. We use this data solely to understand how our website performs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Respond to your enquiries and schedule advisory calls.</li>
            <li>Provide and improve our advisory services.</li>
            <li>Send you relevant information about our services if you have consented.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p className="mt-3">We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">4. Third-Party Services</h2>
          <p>Our website and booking system use the following third-party services:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Calendly</strong> — Used for scheduling discovery calls. Subject to <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#009E73] hover:underline">Calendly&rsquo;s Privacy Policy</a>.</li>
            <li><strong>Vercel</strong> — Our website is hosted on Vercel. Subject to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#009E73] hover:underline">Vercel&rsquo;s Privacy Policy</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">5. Cookies</h2>
          <p>
            Our website uses minimal cookies necessary for the website to function. We do not use advertising or tracking cookies. Analytics data, if collected, is anonymised and used solely to improve site performance.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">6. Data Retention</h2>
          <p>
            We retain personal information only as long as necessary to fulfil the purpose for which it was collected, or as required by law. Enquiry data and email correspondence is retained for up to 3 years unless you request earlier deletion.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">7. Your Rights</h2>
          <p>Under applicable data protection laws, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict processing of your data.</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline">consult@digixpro.in</a>. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">8. Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect your personal information against loss, misuse, and unauthorised access. Our website is served over HTTPS at all times.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any material changes will be reflected with an updated &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black mb-3">10. Contact</h2>
          <p>
            For any privacy-related questions or requests, please contact:<br />
            <strong>DigiXPro Digital Solution</strong><br />
            Noida, Uttar Pradesh, India<br />
            Email: <a href="mailto:consult@digixpro.in" className="text-[#009E73] hover:underline">consult@digixpro.in</a>
          </p>
        </section>

      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
        <a href="/terms" className="hover:text-black transition">Terms of Use</a>
        <a href="/disclaimer" className="hover:text-black transition">Disclaimer</a>
        <a href="/contact" className="hover:text-black transition">Contact Us</a>
      </div>
    </div>
  );
}
