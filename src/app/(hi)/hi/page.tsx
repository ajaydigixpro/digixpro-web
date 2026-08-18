import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ProfessionalServiceSchema from '@/components/seo/ProfessionalServiceSchema';
import DeferredStickyMobileCTA from '@/components/layout/DeferredStickyMobileCTA';
import { services } from '@/data/services';
import {
  ArrowRight, ShieldCheck, Cpu, Code2, Briefcase, FileText, Map,
  XCircle, MessageSquareWarning, Eye, RefreshCw, Users, Settings,
  Database, Network, Palette,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'स्वतंत्र IT Consulting और Business Process Automation | DigiXPro',
  description: 'बढ़ते व्यवसायों के लिए स्वतंत्र IT Consulting, Business Process Automation, Fractional CTO सलाह और आधुनिक web design systems।',
  alternates: {
    canonical: 'https://www.digixpro.in/hi',
    languages: {
      en: 'https://www.digixpro.in/',
      hi: 'https://www.digixpro.in/hi',
      'x-default': 'https://www.digixpro.in/',
    },
  },
  openGraph: {
    title: 'स्वतंत्र IT Consulting और Business Process Automation | DigiXPro',
    description: 'सही software खरीदने से पहले सही business problem को समझें और अपना operating system डिजाइन करें।',
    url: 'https://www.digixpro.in/hi',
    type: 'website',
  },
};

const hindiServiceCopy: Record<string, { category: string; title: string; shortDesc: string }> = {
  'it-consulting-services': {
    category: 'Technology Architecture', title: 'स्वतंत्र IT Consulting Services',
    shortDesc: 'स्वतंत्र technical due diligence, technology stack evaluation और architecture blueprint से software waste कम करें।',
  },
  'ai-consulting-services': {
    category: 'Artificial Intelligence', title: 'AI Consulting Services',
    shortDesc: 'व्यावहारिक AI strategy, readiness assessment और governed implementation roadmap के लिए स्पष्ट सलाह।',
  },
  'ai-automation-agency': {
    category: 'Automation', title: 'AI Automation Services',
    shortDesc: 'दोहराए जाने वाले manual काम, cross-platform data sync और workflow bottlenecks को automate करें।',
  },
  'fractional-cto-services': {
    category: 'Strategic Leadership', title: 'Fractional CTO Services',
    shortDesc: 'पूर्णकालिक नियुक्ति के बिना strategic technology leadership, architecture oversight और engineering governance।',
  },
  'fractional-ceo-services': {
    category: 'Strategic Leadership', title: 'Fractional CEO Services',
    shortDesc: 'Growth, operating design और leadership decisions के लिए focused fractional executive support।',
  },
  'business-process-automation': {
    category: 'Business Automation', title: 'Business Process Automation',
    shortDesc: 'बिखरे workflows को connected, reliable और मापने योग्य operating systems में बदलें।',
  },
  'website-design-services': {
    category: 'Digital Experience', title: 'Website Design Services',
    shortDesc: 'तेज, भरोसेमंद और conversion-focused websites जो आपके business systems से जुड़ी हों।',
  },
  'social-media-campaign-strategy': {
    category: 'Campaign Strategy', title: 'Social Media और Campaign Strategy Services',
    shortDesc: 'Social media strategy, campaign creative, landing-page alignment और measurement framework से marketing activity को एक स्पष्ट customer journey से जोड़ें।',
  },
  'branding-services': {
    category: 'Brand Strategy', title: 'Branding Services',
    shortDesc: 'स्पष्ट positioning, visual identity और हर touchpoint पर consistent brand system।',
  },
};

const problemPoints = [
  'Core operations WhatsApp groups पर चल रहे हैं।',
  'हर जगह Excel sheets हैं और सच के 10 अलग-अलग version मौजूद हैं।',
  'CRM खरीदा गया, लेकिन कोई उसका उपयोग नहीं करता।',
  'हर छोटे operational decision में founder को शामिल होना पड़ता है।',
  'AI इस्तेमाल करना है, लेकिन सुरक्षित शुरुआत कहाँ से हो यह स्पष्ट नहीं है।',
  'Website मौजूद है, लेकिन business उससे पूरी तरह disconnected चल रहा है।',
];

const systemNodes = ['वेबसाइट', 'लीड्स', 'CRM', 'WhatsApp', 'सेल्स', 'बिलिंग', 'सपोर्ट', 'नॉलेज', 'एनालिटिक्स'];

const deliverables = [
  'Architecture Due-Diligence', 'Technology Roadmap', 'Vendor & Stack Selection',
  'Cost Optimization Report', 'Operational Hierarchy Blueprint', 'Governed RAG Architecture',
  'Cross-System API Integration', 'TailwindCSS Design System', 'Logo & Visual Identity System',
];

export default function HindiHomePage() {
  const techServices = services.filter((service) => service.track === 'tech');
  const designServices = services.filter((service) => service.track === 'design');

  const discoverySteps = [
    { title: 'Founder से बातचीत', icon: <MessageSquareWarning className="w-5 h-5 mr-3 text-neutral-400" /> },
    { title: 'Departments के साथ बैठकें', icon: <Users className="w-5 h-5 mr-3 text-neutral-400" /> },
    { title: 'Staff workflows का निरीक्षण', icon: <Eye className="w-5 h-5 mr-3 text-neutral-400" /> },
    { title: 'मौजूदा software का विश्लेषण', icon: <Code2 className="w-5 h-5 mr-3 text-neutral-400" /> },
    { title: 'Pain points और bottlenecks', icon: <XCircle className="w-5 h-5 mr-3 text-neutral-400" /> },
    { title: 'Architecture Blueprint', icon: <Network className="w-5 h-5 mr-3 text-[#16a34a]" /> },
    { title: 'Technology Roadmap', icon: <Map className="w-5 h-5 mr-3 text-[#16a34a]" /> },
  ];

  return (
    <>
      <ProfessionalServiceSchema />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-neutral-100 font-sans selection:bg-[#009E73]/20">
        <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300 mb-8">
              Technology Architecture Advisory <span className="text-[#16a34a]">•</span> स्वतंत्र <span className="text-[#16a34a]">•</span> Vendor-Neutral
            </div>
            <h1 className="text-[42px] md:text-[68px] font-extrabold leading-[1.04] tracking-tight max-w-5xl mx-auto mb-7 text-black dark:text-white">
              स्वतंत्र IT Consulting और <span className="text-[#16a34a]">Business Process Automation.</span>
            </h1>
            <div className="max-w-3xl mx-auto text-[18px] md:text-[20px] text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-3">
              <p className="font-bold text-black dark:text-white">Business बढ़ रहा है। Operations नहीं।</p>
              <p>एक और CRM, ERP या AI tool खरीदने से पहले यह सुनिश्चित करें कि सही समस्या हल हो रही है। Software पर खर्च करने से पहले business operating systems डिजाइन किए जाते हैं।</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link href="/contact" className="inline-flex items-center justify-center px-7 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md">
                30-मिनट Discovery Call का अनुरोध करें <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/evidence" className="inline-flex items-center justify-center px-7 py-4 bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold text-[15px] rounded-xl hover:border-black dark:hover:border-white transition-colors">
                हमारा Evidence देखें
              </Link>
            </div>
          </div>
        </section>

        <section className="defer-below-fold py-24 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">क्या बनाया जाता है</div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 text-black dark:text-white">Service Pillars और System Capabilities</h2>
              <p className="text-[18px] text-neutral-600 dark:text-neutral-400">Structured technology advisory और digital experience design के प्रमुख pillars देखें।</p>
            </div>

            <div className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div><p className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-2">Technology Advisory Track</p><h3 className="text-[28px] font-extrabold text-black dark:text-white">Core Technology Pillars</h3></div>
                <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Business systems और technology decisions के लिए</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techServices.map((service) => {
                  const copy = hindiServiceCopy[service.slug];
                  return <div key={service.slug} className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 shadow-sm hover:border-[#16a34a]/50 transition-colors flex flex-col">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#16a34a] mb-4">{copy.category}</div>
                    <h4 className="text-[20px] font-extrabold text-black dark:text-white mb-3">{copy.title}</h4>
                    <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 flex-1">{copy.shortDesc}</p>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center text-xs font-bold text-black dark:text-neutral-200 group-hover:text-[#16a34a] transition-colors pt-5 mt-5 border-t border-neutral-100 dark:border-neutral-800">Service Blueprint देखें <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
                  </div>;
                })}
              </div>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div><p className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-2">Design और Digital Experience Track</p><h3 className="text-[28px] font-extrabold text-black dark:text-white">Design System Pillars</h3></div>
                <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">समान प्राथमिकता: Design Systems और Visual Communication</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {designServices.map((service) => {
                  const copy = hindiServiceCopy[service.slug];
                  return <div key={service.slug} className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 shadow-sm hover:border-[#16a34a]/50 transition-colors flex flex-col">
                    <Palette className="w-6 h-6 text-[#16a34a] mb-4" />
                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#16a34a] mb-4">{copy.category}</div>
                    <h4 className="text-[20px] font-extrabold text-black dark:text-white mb-3">{copy.title}</h4>
                    <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 flex-1">{copy.shortDesc}</p>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center text-xs font-bold text-black dark:text-neutral-200 group-hover:text-[#16a34a] transition-colors pt-5 mt-5 border-t border-neutral-100 dark:border-neutral-800">Design Blueprint देखें <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
                  </div>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="defer-below-fold py-24 max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 text-black dark:text-white">क्या यह परिचित लगता है?</h2><p className="text-[18px] text-neutral-600 dark:text-neutral-400">Technology को business तेज करना चाहिए। लेकिन अभी परिणाम ठीक उलटा हो रहा है।</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">{problemPoints.map((problem) => <div key={problem} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start shadow-sm"><XCircle className="w-6 h-6 text-red-400 mr-4 shrink-0 mt-0.5" /><p className="text-[16px] font-medium text-neutral-800 dark:text-neutral-200">{problem}</p></div>)}</div>
          <div className="text-center"><p className="text-[20px] font-bold text-black dark:text-white mb-6">यदि ये स्थितियाँ परिचित हैं, तो बात होनी चाहिए।</p><Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold text-[16px] rounded-xl hover:border-black dark:hover:border-white transition-colors">Bottlenecks पर चर्चा करें <ArrowRight className="w-4 h-4 ml-2" /></Link></div>
        </section>

        <section className="defer-below-fold bg-neutral-50 dark:bg-neutral-900/50 py-24 border-y border-neutral-200 dark:border-neutral-800"><div className="max-w-[1200px] mx-auto px-6"><div className="mb-16 text-center max-w-3xl mx-auto"><div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">System Connectivity</div><h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">आपके Systems कैसे जुड़ते हैं।</h2><p className="text-[18px] text-neutral-600 dark:text-neutral-400 leading-relaxed">अलग-थलग apps नहीं बनाए जाते। पूरे operational model को map और architect किया जाता है ताकि data एक connected operating system में सहजता से बहे।</p></div><div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] p-10 md:p-16 shadow-sm overflow-hidden relative"><RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-neutral-200/50 dark:text-neutral-800/30 -z-0" /><div className="flex flex-wrap items-center justify-center gap-4 relative z-10">{systemNodes.map((node, idx) => <React.Fragment key={node}><div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-xl font-mono font-bold text-[15px] text-black dark:text-white shadow-sm">{node}</div>{idx < systemNodes.length - 1 && <ArrowRight className="w-5 h-5 text-neutral-400 dark:text-neutral-600 shrink-0" />}</React.Fragment>)}</div><div className="text-center mt-12 text-[14px] font-medium text-neutral-500 dark:text-neutral-400 relative z-10">Design की गई architecture business को एक सतत, स्वयं-सशक्त loop की तरह चलाती है।</div></div></div></section>

        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24"><div className="max-w-[1200px] mx-auto px-6"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">अनुमान पर काम नहीं होता।</h2><p className="text-[18px] text-neutral-400">Business को समझे बिना systems की सलाह नहीं दी जाती। Discovery केवल interview नहीं है; हर engagement वास्तविक operational reality को देखने से शुरू होती है।</p></div><div className="max-w-2xl mx-auto relative"><div className="absolute top-0 bottom-0 left-[28px] w-0.5 bg-neutral-800 hidden md:block" /><div className="space-y-4">{discoverySteps.map((step, idx) => <div key={step.title} className="flex items-center relative"><div className={`w-14 h-14 border rounded-full flex items-center justify-center font-mono font-bold shrink-0 z-10 hidden md:flex ${idx >= 5 ? 'bg-[#16a34a]/10 border-[#16a34a] text-[#16a34a]' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>0{idx + 1}</div><div className={`md:ml-8 border p-5 md:p-6 rounded-2xl flex-1 flex items-center ${idx >= 5 ? 'bg-[#16a34a]/5 border-[#16a34a]/30' : 'bg-neutral-900/50 border-neutral-800'}`}>{step.icon}<span className={`text-[17px] md:text-[18px] font-bold ${idx >= 5 ? 'text-[#16a34a]' : 'text-white'}`}>{step.title}</span></div></div>)}</div></div></div></section>

        <section className="defer-below-fold py-24 border-b border-neutral-200 dark:border-neutral-800"><div className="max-w-[1200px] mx-auto px-6"><div className="grid md:grid-cols-2 gap-16 items-center"><div className="bg-neutral-50 dark:bg-neutral-900/50 p-10 rounded-[32px] border border-neutral-200 dark:border-neutral-800"><div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">परिणाम</div><h2 className="text-[32px] font-extrabold mb-8 text-black dark:text-white">वास्तव में क्या मिलता है</h2><p className="text-[16px] text-neutral-600 dark:text-neutral-400 mb-8">Business चलाने के लिए ठोस intelligence। हर engagement से स्पष्ट deliverables मिलते हैं:</p><ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">{deliverables.map((item) => <li key={item} className="flex items-start text-[14px] font-bold text-neutral-800 dark:text-neutral-200"><FileText className="w-4 h-4 text-[#16a34a] mr-2 shrink-0 mt-0.5" />{item}</li>)}</ul></div><div className="p-4 md:p-10"><h2 className="text-[40px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6 text-black dark:text-white">Implementation वैकल्पिक है।<br /><span className="text-[#16a34a]">अच्छी architecture नहीं।</span></h2><p className="text-[18px] text-neutral-600 dark:text-neutral-400 mb-8">Implementation कोई भी करे, architecture उपयोगी रहती है। अपना studio चुनें, internally बनाएं या external partner के साथ काम करें।</p><Link href="/how-we-work" className="inline-flex items-center text-[16px] font-bold text-black dark:text-white border-b border-black dark:border-white pb-1 hover:text-[#16a34a] dark:hover:text-[#16a34a] hover:border-[#16a34a] transition-colors">काम करने का तरीका देखें <ArrowRight className="w-4 h-4 ml-2" /></Link></div></div></div></section>

        <section className="defer-below-fold max-w-[1200px] mx-auto px-6 py-24"><div className="mb-16 max-w-3xl"><div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">अंतिम ROI</div><h2 className="text-[36px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">महंगी technology mistakes होने से पहले रोकें।</h2></div><div className="grid md:grid-cols-3 gap-8"><div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8"><h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Waste खत्म करें</h3><p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Duplicate software, mismatched CRM और गलत AI investments पर खर्च रोकें। Technology को वास्तविक operational reality से align किया जाता है।</p></div><div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8"><h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Manual काम हटाएं</h3><p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Lead handling, customer onboarding, reporting और team workflows automated, connected pipelines बनते हैं।</p></div><div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-[24px] p-8"><h3 className="text-[20px] font-bold mb-4 text-[#16a34a]">Founder dependency खत्म करें</h3><p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">Role hierarchies, internal approvals और structured knowledge bases design करें ताकि लगातार हस्तक्षेप के बिना business scale हो।</p></div></div></section>

        <section className="defer-below-fold bg-[#0A0A0A] text-white py-24"><div className="max-w-[1200px] mx-auto px-6 text-center"><ShieldCheck className="w-12 h-12 text-[#16a34a] mx-auto mb-6" /><h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">Production evidence से समर्थित दावे।</h2><div className="flex flex-wrap justify-center gap-4">{['Buy Second Hand Books', 'Scan Centre Near Me', 'SattvaOS', 'Nirvandham', 'Muktibodh'].map((evidence) => <span key={evidence} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-neutral-300">{evidence}</span>)}</div><div className="mt-12"><Link href="/evidence" className="inline-flex items-center text-[#16a34a] font-bold hover:text-white transition-colors">हमारी Architectures देखें <ArrowRight className="w-4 h-4 ml-2" /></Link></div></div></section>

        <section className="defer-below-fold bg-neutral-50 dark:bg-neutral-900/50 py-24 border-b border-neutral-200 dark:border-neutral-800"><div className="max-w-[1200px] mx-auto px-6"><div className="text-center max-w-4xl mx-auto mb-16"><div className="text-[12px] font-mono text-[#16a34a] font-bold uppercase tracking-widest mb-3">मूल दर्शन</div><h2 className="text-[32px] md:text-[40px] font-extrabold mb-6 text-black dark:text-white">Technology कभी शुरुआती बिंदु नहीं है। यह business को समझने का परिणाम है।</h2><p className="text-[18px] text-neutral-600 dark:text-neutral-400 font-medium">DigiXPro software से शुरुआत नहीं करता। यही non-negotiable architectural order है।</p></div><div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-8">{[{ name: 'Business', icon: <Briefcase className="w-6 h-6 mb-2" /> }, { name: 'People', icon: <Users className="w-6 h-6 mb-2" /> }, { name: 'Process', icon: <Settings className="w-6 h-6 mb-2" /> }, { name: 'Information', icon: <Database className="w-6 h-6 mb-2" /> }, { name: 'Automation', icon: <Network className="w-6 h-6 mb-2" /> }, { name: 'Technology', icon: <Cpu className="w-6 h-6 mb-2" /> }, { name: 'Software', icon: <Code2 className="w-6 h-6 mb-2 text-[#16a34a]" /> }].map((step, idx, arr) => <React.Fragment key={step.name}><div className="flex flex-col items-center min-w-[110px] p-4 rounded-xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800"><div className="text-neutral-500 dark:text-neutral-400">{step.icon}</div><span className={`font-bold text-[15px] ${idx === arr.length - 1 ? 'text-[#16a34a]' : 'text-black dark:text-white'}`}>{step.name}</span></div>{idx !== arr.length - 1 && <><div className="hidden md:block text-neutral-300 dark:text-neutral-700"><ArrowRight className="w-5 h-5" /></div><div className="md:hidden text-neutral-300 dark:text-neutral-700 my-2 rotate-90"><ArrowRight className="w-5 h-5" /></div></>}</React.Fragment>)}</div></div></section>

        <section className="defer-below-fold max-w-[1200px] mx-auto px-6 py-24"><div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 md:p-16 rounded-[32px] text-center shadow-lg"><h2 className="text-[32px] md:text-[48px] font-extrabold mb-6 leading-tight text-black dark:text-white">अपना operational system डिजाइन करने के लिए तैयार हैं?</h2><p className="text-[18px] text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">महंगे commitments से पहले workflows, operational bottlenecks और technology architecture पर बात करें। 30-मिनट Discovery Call के लिए qualification form भरें।</p><Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] dark:bg-white text-white dark:text-black font-bold text-[16px] rounded-xl hover:bg-[#16a34a] dark:hover:bg-[#16a34a] dark:hover:text-white transition-colors shadow-md">30-मिनट Discovery Call का अनुरोध करें <ArrowRight className="w-4 h-4 ml-2" /></Link></div></section>
      </div>
      <DeferredStickyMobileCTA />
    </>
  );
}
