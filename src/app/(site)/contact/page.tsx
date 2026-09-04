import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import CallbackRequestForm from '@/components/contact/CallbackRequestForm';
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, Mail, MapPin, PhoneCall, Plane, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digixpro.in'),
  title: 'Contact Us — Request a Discovery Call & Technology Advisory',
  description: 'Get in touch with DigiXPro. Request a discovery call or schedule a technology advisory consultation to discuss your business architecture and software strategy.',
  keywords: [
    'contact DigiXPro',
    'technology advisory consultation',
    'book discovery call',
    'IT consulting contact',
    'technology architecture consultant Greater Noida West',
    'schedule discovery call',
  ],
  alternates: { canonical: 'https://www.digixpro.in/contact' },
  openGraph: {
    title: 'Contact Us — Request a Discovery Call & Technology Advisory | DigiXPro',
    description: 'Get in touch with DigiXPro. Request a discovery call or schedule a technology advisory consultation to discuss your business architecture and software strategy.',
    url: 'https://www.digixpro.in/contact',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'DigiXPro — Book a Discovery Call', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Request a Discovery Call & Technology Advisory | DigiXPro',
    description: 'Get in touch with DigiXPro to discuss your technology architecture.',
    images: ['/twitter-image.png'],
  },
};

const goodFit = ['You are evaluating a consequential technology decision.', 'Operations are becoming difficult to manage manually.', 'Automation or AI integration is now on the roadmap.', 'Growth needs a stronger operating system, not another patch.'];
const poorFit = ['You only need a brochure website with no strategic requirement.', 'The sole decision criterion is the lowest development cost.', 'The build is already specified and only execution capacity is needed.'];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-24 font-sans text-[#0A0A0A] selection:bg-[#16a34a]/20 transition-colors duration-200 dark:bg-[#0A0A0A] dark:text-neutral-100">
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://www.digixpro.in' }, { name: 'Contact', url: 'https://www.digixpro.in/contact' }]} />
      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-[12px] font-bold uppercase tracking-widest text-[#009E73]">Initiate an engagement</p>
          <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-tight text-black md:text-[64px] dark:text-white">Start with the right conversation.</h1>
          <p className="mt-6 max-w-2xl text-[18px] font-medium leading-relaxed text-neutral-700 md:text-[22px] dark:text-neutral-300">Good technology decisions begin with business reality, operational constraints, and the outcome that needs to change—not a generic software requirement.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-14" aria-labelledby="fit-heading">
        <div className="overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="grid md:grid-cols-2 md:divide-x md:divide-neutral-200 dark:md:divide-neutral-800">
            <div className="p-7 md:p-9">
              <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#009E73]">A good fit</p>
              <h2 id="fit-heading" className="text-[21px] font-extrabold text-black dark:text-white">This conversation is useful when</h2>
              <ul className="mt-6 space-y-3.5 text-[15px] font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">{goodFit.map((item) => <li key={item} className="flex items-start"><CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-[#009E73]" />{item}</li>)}</ul>
            </div>
            <div className="border-t border-neutral-200 bg-white p-7 md:border-t-0 md:p-9 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500">Set expectations</p>
              <h2 className="text-[21px] font-extrabold text-black dark:text-white">Probably not the right fit when</h2>
              <ul className="mt-6 space-y-3.5 text-[15px] font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">{poorFit.map((item) => <li key={item} className="flex items-start"><XCircle className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-neutral-300 dark:text-neutral-600" />{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16" aria-labelledby="contact-paths-heading">
        <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#009E73]">Choose your next step</p><h2 id="contact-paths-heading" className="text-[28px] font-extrabold tracking-tight text-black md:text-[34px] dark:text-white">Two clear ways to begin.</h2></div><p className="max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">Book a focused discussion when the direction is clear, or leave the context for a callback when a conversation needs to be coordinated.</p></div>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="flex flex-col justify-between rounded-[24px] bg-[#0A0A0A] p-7 text-white shadow-xl shadow-black/10 md:p-9">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10"><CalendarDays className="h-6 w-6 text-[#57d6af]" /></div>
              <p className="mt-7 font-mono text-[11px] font-bold uppercase tracking-widest text-[#57d6af]">Direct scheduling</p>
              <h3 className="mt-2 text-[28px] font-extrabold tracking-tight md:text-[32px]">Ready to scope the work?</h3>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-neutral-300">Already explored the options and ready to discuss execution, architecture, or an advisory decision? Choose a dedicated 30-minute conversation.</p>
              <div className="mt-7 border-y border-white/10 py-5"><p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-neutral-400">Best when</p><ul className="space-y-3 text-[15px] leading-relaxed text-neutral-200"><li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#57d6af]" />A project, system problem, or decision is already in view.</li><li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#57d6af]" />A calendar slot is easier than a back-and-forth.</li><li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#57d6af]" />The right stakeholders can join the conversation.</li></ul></div>
            </div>
            <div className="mt-7">
              <a href="https://calendly.com/shukla-ajay05/30min" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-[15px] font-extrabold text-black transition hover:bg-[#57d6af] sm:w-auto shadow-sm">Book a 30-minute conversation <ArrowRight className="ml-2 h-4 w-4" /></a>
              <p className="mt-4 text-[13px] text-neutral-400">Select a convenient slot. The discussion starts with your operating context.</p>
            </div>
          </article>
          <section id="callback-request" className="flex flex-col justify-between rounded-[24px] border border-neutral-200 bg-white p-7 shadow-sm md:p-9 dark:border-neutral-800 dark:bg-neutral-900" aria-labelledby="callback-heading">
            <div>
              <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#009E73]/10"><PhoneCall className="h-6 w-6 text-[#009E73]" /></div><div><p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#009E73]">Callback request</p><h3 id="callback-heading" className="mt-1 text-[27px] font-extrabold tracking-tight text-black dark:text-white">Leave the context. Get a callback.</h3></div></div>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">Share a name, one preferred contact method, and the decision you are working through. The request goes directly to DigiXPro for a considered response.</p>
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-800"><CallbackRequestForm /></div>
          </section>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-6 px-6 pb-6 lg:grid-cols-2" aria-label="Engagement details">
        <article className="rounded-[24px] border border-neutral-200 p-7 md:p-8 dark:border-neutral-800"><p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#009E73]">How it progresses</p><h2 className="text-[24px] font-extrabold tracking-tight text-black dark:text-white">A focused path after the first conversation.</h2><div className="mt-7 grid gap-3 sm:grid-cols-3">{[['01', 'Understand', 'Clarify the business reality, constraints, and desired outcome.'], ['02', 'Map', 'Identify the right architecture, service path, or evidence.'], ['03', 'Recommend', 'Define the most useful next decision without forcing a generic package.']].map(([number, title, copy]) => <div key={number} className="rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-900/70"><span className="font-mono text-[11px] font-bold text-[#009E73]">{number}</span><h3 className="mt-3 text-[15px] font-extrabold text-black dark:text-white">{title}</h3><p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">{copy}</p></div>)}</div></article>
        <article className="rounded-[24px] border border-neutral-200 p-7 md:p-8 dark:border-neutral-800"><p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#009E73]">Engagement options</p><h2 className="text-[24px] font-extrabold tracking-tight text-black dark:text-white">Ways to work with DigiXPro.</h2><ul className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">{[['Architecture Review (Audit)', 'Technical due diligence for an existing system, supplier decision, or planned change.'], ['Remote Advisory Retainer', 'Ongoing architectural intelligence alongside an internal team.'], ['On-Site Discovery Workshops', 'Deep operational mapping with the people closest to the work.']].map(([title, copy]) => <li key={title} className="flex gap-3 py-4 first:pt-0 last:pb-0"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#009E73]" /><div><h3 className="text-[15px] font-extrabold text-black dark:text-white">{title}</h3><p className="mt-1 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">{copy}</p></div></li>)}</ul></article>
      </section>
      <section className="mx-auto max-w-[1200px] px-6 pb-6"><div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-7 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/50"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#009E73]">Typical output</p><h2 className="mt-2 text-[24px] font-extrabold tracking-tight text-black dark:text-white">What a well-scoped engagement can produce.</h2></div><p className="max-w-md text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">The exact deliverables follow the operating context and scope; they are not treated as a one-size-fits-all checklist.</p></div><div className="mt-6 flex flex-wrap gap-2.5">{['Operating-System Blueprint', 'Decision Rationale', 'Technology Roadmap', 'Implementation Strategy', 'Risk Report'].map((item) => <span key={item} className="rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-[13px] font-bold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">{item}</span>)}</div></div></section>
      <aside className="mx-auto max-w-[1200px] px-6" aria-labelledby="operational-details-heading"><div className="rounded-[24px] bg-[#0A0A0A] p-7 text-white md:p-8"><div className="mb-6 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-[#57d6af]" /><h2 id="operational-details-heading" className="text-[18px] font-extrabold">Operational details</h2></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><div><CheckCircle2 className="mb-3 h-5 w-5 text-[#57d6af]" /><h3 className="text-[14px] font-extrabold">Discovery first</h3><p className="mt-2 text-[13px] leading-relaxed text-neutral-400">Implementation is considered only after the architecture and operating context are understood.</p></div><div><Plane className="mb-3 h-5 w-5 text-neutral-400" /><h3 className="text-[14px] font-extrabold">On-site work</h3><p className="mt-2 text-[13px] leading-relaxed text-neutral-400">For in-person discovery, travel and commute expenses, including Delhi NCR, are borne by the client.</p></div><div><Mail className="mb-3 h-5 w-5 text-neutral-400" /><h3 className="text-[14px] font-extrabold">Direct email</h3><a href="mailto:ajay@digixpro.in" aria-label="Email ajay at digixpro dot in" className="mt-2 inline-block text-[13px] font-medium text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition hover:text-white"><span>ajay</span><span aria-hidden="true">@</span><span>digixpro.in</span></a></div><div><MapPin className="mb-3 h-5 w-5 text-neutral-400" /><h3 className="text-[14px] font-extrabold">Base location</h3><p className="mt-2 text-[13px] leading-relaxed text-neutral-400">Greater Noida West, Uttar Pradesh, India</p></div></div></div></aside>
    </div>
  );
}
