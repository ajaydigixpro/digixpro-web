import { DiagnosticOutput, DiagnosticInputContext, DiagnosticTrack } from './diagnostic-matrix';

export interface PriorityRoadmapItem {
  level: 'PRIORITY 1 — Address First' | 'PRIORITY 2 — Address Next' | 'PRIORITY 3 — Consider Later';
  title: string;
  description: string;
}

export interface InvestmentScopeLevel {
  level_number: 1 | 2 | 3;
  name: string;
  scope_summary: string;
  is_recommended: boolean;
  key_deliverables: string[];
  cost_drivers: string[];
}

export interface InvestmentFrameworkContent {
  headline: string;
  explanation: string;
  levels: InvestmentScopeLevel[];
  commercial_note: string;
}

export interface FullRenderedReportContent {
  client_situation: string;
  primary_diagnosis: string;
  verdict_headline: string;
  why_it_matters: string;
  has_technical_evidence: boolean;
  technical_evidence?: {
    url: string;
    performance_score: number;
    seo_score: number;
    accessibility_score: number;
    findings: Array<{ problem: string; impact?: string; solution_name: string; solution_url: string }>;
  };
  what_we_recommend: string;
  what_we_do_not_recommend: string;
  investment_framework: InvestmentFrameworkContent;
  priority_roadmap: PriorityRoadmapItem[];
  relevant_capability: {
    service_name: string;
    service_url: string;
  };
  has_relevant_evidence: boolean;
  relevant_evidence?: {
    evidence_url: string;
    label: string;
  };
  call_value_proposition: string;
}

export const CLIENT_SITUATION_TEMPLATES: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) =>
    ctx.hasWebsite === 'no'
      ? `Operating as a ${ctx.company_size || 'growing business'} in the ${ctx.industry || 'commercial'} sector, ${ctx.company || 'your company'} delivers ${ctx.product || 'its core services'} to ${ctx.market || 'its client base'}. Without a professional web platform, your inbound enquiry flow relies on manual channels, restricting brand authority and conversion scalability.`
      : `Operating in the ${ctx.industry || 'commercial'} sector, ${ctx.company || 'your company'} serves ${ctx.market || 'its target market'} with ${ctx.product || 'its core offerings'}. While a website is active, severe technical performance degradation (Speed Score: ${ctx.performance_score || 'below 40'}/100) creates heavy user friction and causes prospective clients to bounce before converting.`,

  WEB_OPTIMIZATION: (ctx) =>
    `Operating in the ${ctx.industry || 'commercial'} space as a ${ctx.business_age || 'growing'} business, ${ctx.company || 'your company'} provides ${ctx.product || 'its services'} to ${ctx.market || 'its audience'}. Your primary commercial challenge is conversion funnel friction — visitors land on your website but drop off prior to submitting qualified sales or consultation inquiries.`,

  SEO_GROWTH: (ctx) =>
    `As an established ${ctx.industry || 'commercial'} firm serving ${ctx.market || 'its market'}, ${ctx.company || 'your company'} offers ${ctx.product || 'its primary solutions'}. While your website performance foundation is stable (Performance Score: ${ctx.performance_score || 85}/100), technical SEO crawl barriers and missing indexation markup restrict your organic search discovery.`,

  CRM_AUTOMATION: (ctx) =>
    `Operating as a ${ctx.company_size || 'team'} in the ${ctx.industry || 'commercial'} sector, ${ctx.company || 'your company'} delivers ${ctx.product || 'its offerings'} to ${ctx.market || 'its market'}. Inbound customer inquiries are currently handled manually (${ctx.current_systems || 'manual tracking'}), leading to response delays, manual entry overhead, and sales pipeline leakage.`,

  TECH_ADVISORY: (ctx) =>
    `Operating in the ${ctx.industry || 'commercial'} sector, ${ctx.company || 'your company'} is currently reviewing a major software vendor proposal or technology investment. Independent technical due diligence is required to verify licensing scope, code architecture, and cost estimates before releasing development capital.`
};

export const CALL_VALUE_PROPOSITIONS: Record<DiagnosticTrack, string> = {
  WEB_REBUILD: "Your audit identifies core platform engineering as the primary bottleneck. In a 30-minute architecture review, we can validate whether full platform refactoring or MVP scoping is required, establish key performance targets, and determine the most practical launch sequence. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before making platform commitments.",
  WEB_OPTIMIZATION: "Your audit identifies conversion funnel friction as the primary bottleneck. In a 30-minute architecture review, we can pinpoint exact dropoff points on your core landing pages, evaluate CTA positioning, and prioritize high-impact UX improvements. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before making design changes.",
  SEO_GROWTH: "Your audit identifies search indexation and technical SEO as the primary bottleneck. In a 30-minute architecture review, we can review crawl barriers, sitemap health, and JSON-LD schema requirements to expand search discovery. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point for your search growth strategy.",
  CRM_AUTOMATION: "Your audit identifies manual lead handling as the primary operational bottleneck. In a 30-minute architecture review, we can map your lead intake flow and design a self-hosted n8n automation pipeline connecting web forms directly to your CRM. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point to stop lead leakage.",
  TECH_ADVISORY: "Your audit identifies vendor proposal governance as the primary priority. In a 30-minute CTO due diligence call, we can evaluate proposed vendor scope, licensing contracts, and architecture specs to separate essential requirements from unnecessary overbuilding. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before releasing development capital."
};

export function buildPriorityRoadmap(diag: DiagnosticOutput): PriorityRoadmapItem[] {
  const items: PriorityRoadmapItem[] = [
    {
      level: 'PRIORITY 1 — Address First',
      title: diag.primary_bottleneck,
      description: diag.suggested_first_action
    },
    {
      level: 'PRIORITY 2 — Address Next',
      title: diag.relevant_service_name,
      description: diag.what_we_recommend
    }
  ];

  if (diag.track === 'TECH_ADVISORY') {
    items.push({
      level: 'PRIORITY 3 — Consider Later',
      title: 'Long-Term System Governance & Code Audits',
      description: 'Establish quarterly code reviews, security vulnerability scans, and vendor delivery milestone sign-offs.'
    });
  } else if (diag.track === 'CRM_AUTOMATION') {
    items.push({
      level: 'PRIORITY 3 — Consider Later',
      title: 'CRM Database Structuring & Customer Lifecycle Tracking',
      description: 'Structure customer context tables and automated stage transitions for multi-channel lead nurturing.'
    });
  } else if (diag.track === 'SEO_GROWTH') {
    items.push({
      level: 'PRIORITY 3 — Consider Later',
      title: 'Search-Intent Content Expansion & Authority Building',
      description: 'Build targeted service landing pages and structured JSON-LD schema to capture high-intent commercial queries.'
    });
  } else {
    items.push({
      level: 'PRIORITY 3 — Consider Later',
      title: 'Lead Capture & Automated Workflow Dispatch',
      description: 'Connect web form submissions directly to automated CRM routing and instant WhatsApp/Email alerts.'
    });
  }

  return items;
}

export function buildInvestmentFramework(
  diag: DiagnosticOutput,
  ctx: DiagnosticInputContext
): InvestmentFrameworkContent {
  const track = diag.track;

  const frameworkMap: Record<DiagnosticTrack, InvestmentFrameworkContent> = {
    WEB_REBUILD: {
      headline: 'Web Engineering & Platform Architecture Scope',
      explanation: 'Implementation investment depends on page volume, custom feature scope, and backend integrations.',
      levels: [
        {
          level_number: 1,
          name: 'Level 1 — Essential MVP',
          scope_summary: 'Lean 5-page Next.js SSG build focusing on core messaging and mobile page speed.',
          is_recommended: false,
          key_deliverables: ['Lean Next.js SSG setup', 'Mobile layout refactoring', 'Basic contact form routing'],
          cost_drivers: ['Page count', 'Static styling complexity'],
        },
        {
          level_number: 2,
          name: 'Level 2 — DigiXPro Recommended',
          scope_summary: 'Full custom Next.js web platform, sub-second load times, structured schema, and headless CMS.',
          is_recommended: true,
          key_deliverables: ['Custom Next.js component design', 'Sub-second speed refactoring', 'JSON-LD schema plumbing', 'Headless CMS integration'],
          cost_drivers: ['Custom design system', 'CMS integration depth', 'Conversion UX workflows'],
        },
        {
          level_number: 3,
          name: 'Level 3 — Advanced Platform',
          scope_summary: 'Decoupled platform architecture, custom database APIs, role-based auth, and multi-tenant portals.',
          is_recommended: false,
          key_deliverables: ['Multi-tenant platform engineering', 'Role-based access control', 'Custom API & database backend'],
          cost_drivers: ['Database concurrency', 'Security governance', 'Custom API endpoints'],
        },
      ],
      commercial_note: 'Final commercial scope and itemized roadmap are confirmed during your 30-minute Architecture Review.',
    },

    WEB_OPTIMIZATION: {
      headline: 'Conversion UX & Platform Refactoring Scope',
      explanation: 'Investment scope depends on landing page count, mobile UX complexity, and conversion funnel depth.',
      levels: [
        {
          level_number: 1,
          name: 'Level 1 — Focused UX Refactoring',
          scope_summary: 'Targeted layout optimization and CTA positioning on primary landing page.',
          is_recommended: true,
          key_deliverables: ['Mobile layout refactoring', 'CTA positioning fix', 'Headline messaging adjustment'],
          cost_drivers: ['Single page refactoring', 'Form cleanup'],
        },
        {
          level_number: 2,
          name: 'Level 2 — DigiXPro Recommended',
          scope_summary: 'Full website conversion refactoring, mobile speed tuning, and custom lead intake UX.',
          is_recommended: false,
          key_deliverables: ['Multi-page layout optimization', 'Mobile speed tuning', 'Interactive form UX', 'CTA funnel architecture'],
          cost_drivers: ['Multi-page scope', 'Interactive UI elements', 'Speed refactoring'],
        },
        {
          level_number: 3,
          name: 'Level 3 — Advanced Funnel Engineering',
          scope_summary: 'Multi-funnel conversion engineering, real-time analytics integration, and automated lead qualification.',
          is_recommended: false,
          key_deliverables: ['Multi-segment funnel design', 'Custom event analytics', 'Real-time lead qualification UX'],
          cost_drivers: ['Complex user flow logic', 'Analytics pipeline integration'],
        },
      ],
      commercial_note: 'Final commercial scope and itemized roadmap are confirmed during your 30-minute Architecture Review.',
    },

    SEO_GROWTH: {
      headline: 'Technical SEO & Search Indexation Scope',
      explanation: 'Investment scope depends on technical site health, Schema markup depth, and search-intent content requirements.',
      levels: [
        {
          level_number: 1,
          name: 'Level 1 — Technical SEO Fixes',
          scope_summary: 'Core indexation error repairs, sitemap setup, canonical header fixes, and robots.txt audit.',
          is_recommended: false,
          key_deliverables: ['Indexation error fixes', 'Sitemap & robots.txt repair', 'Canonical URL audit'],
          cost_drivers: ['Crawl error count', 'Site architecture size'],
        },
        {
          level_number: 2,
          name: 'Level 2 — DigiXPro Recommended',
          scope_summary: 'Comprehensive technical SEO refactoring, structured JSON-LD schema plumbing, and search-intent service pages.',
          is_recommended: true,
          key_deliverables: ['Full technical SEO refactoring', 'JSON-LD schema plumbing', 'Search-intent service page structure'],
          cost_drivers: ['Schema markup complexity', 'Service page count', 'Technical site health'],
        },
        {
          level_number: 3,
          name: 'Level 3 — Managed SEO & AI Search',
          scope_summary: 'Ongoing monthly search retainer, category content expansion, and AI Search (GEO) indexation.',
          is_recommended: false,
          key_deliverables: ['Monthly technical SEO retainer', 'AI Search (GEO) schema optimization', 'Multi-location keyword targeting'],
          cost_drivers: ['Ongoing content velocity', 'Competitive search landscape', 'Multi-location setup'],
        },
      ],
      commercial_note: 'Final commercial scope and itemized roadmap are confirmed during your 30-minute Architecture Review.',
    },

    CRM_AUTOMATION: {
      headline: 'Lead Capture & Workflow Automation Scope',
      explanation: 'Investment scope depends on lead channel volume, CRM integration depth, and workflow dispatch complexity.',
      levels: [
        {
          level_number: 1,
          name: 'Level 1 — Essential Lead Pipeline',
          scope_summary: 'Single web form → self-hosted n8n webhook → instant WhatsApp/Email team alerts.',
          is_recommended: true,
          key_deliverables: ['Web form webhook intake', 'Instant WhatsApp/Email alerts', 'Basic lead logging'],
          cost_drivers: ['Single form intake', 'Basic notification channel'],
        },
        {
          level_number: 2,
          name: 'Level 2 — DigiXPro Recommended',
          scope_summary: 'Multi-channel intake (forms, chat, ads) → self-hosted n8n workflows → CRM automated lead routing & tagging.',
          is_recommended: false,
          key_deliverables: ['Multi-channel lead intake', 'Automated CRM lead tagging', 'Lead qualification routing', 'n8n workflow dispatch'],
          cost_drivers: ['CRM API integration', 'Qualification branching', 'Multi-channel setup'],
        },
        {
          level_number: 3,
          name: 'Level 3 — Enterprise Workflow Engine',
          scope_summary: 'Multi-system n8n enterprise workflows, ERP/accounting integration, and automated lifecycle nurturing.',
          is_recommended: false,
          key_deliverables: ['Multi-system API integrations', 'ERP/accounting data sync', 'Automated customer lifecycle engine'],
          cost_drivers: ['Multi-system API complexity', 'Data transformation rules', 'Automated sync schedules'],
        },
      ],
      commercial_note: 'Final commercial scope and itemized roadmap are confirmed during your 30-minute Architecture Review.',
    },

    TECH_ADVISORY: {
      headline: 'Technology Due Diligence & Architecture Governance Scope',
      explanation: 'Investment scope depends on software vendor proposal complexity, codebase volume, and ongoing CTO governance requirements.',
      levels: [
        {
          level_number: 1,
          name: 'Level 1 — Focused Vendor Review',
          scope_summary: 'Independent evaluation of a single software vendor proposal, licensing contract, and cost estimates.',
          is_recommended: true,
          key_deliverables: ['Single vendor proposal audit', 'Licensing contract scope check', 'Pricing & architecture evaluation'],
          cost_drivers: ['Proposal page length', 'Single vendor scope'],
        },
        {
          level_number: 2,
          name: 'Level 2 — DigiXPro Recommended',
          scope_summary: 'In-depth vendor proposal audit, code architecture inspection, licensing risk analysis, and vendor SLA negotiation.',
          is_recommended: false,
          key_deliverables: ['Full vendor proposal & code audit', 'Architecture blueprint verification', 'Licensing & SLA negotiation support'],
          cost_drivers: ['Multi-vendor comparison', 'Codebase review depth', 'Architecture verification'],
        },
        {
          level_number: 3,
          name: 'Level 3 — Fractional CTO Governance',
          scope_summary: 'Part-time fractional CTO advisory, quarterly code audits, security vulnerability scans, and milestone sign-offs.',
          is_recommended: false,
          key_deliverables: ['Ongoing fractional CTO leadership', 'Quarterly security & code audits', 'Development milestone sign-offs'],
          cost_drivers: ['Ongoing monthly advisory hours', 'Enterprise compliance governance', 'Long-term roadmap oversight'],
        },
      ],
      commercial_note: 'Final commercial scope and itemized roadmap are confirmed during your 30-minute Architecture Review.',
    }
  };

  return frameworkMap[track] || frameworkMap.WEB_OPTIMIZATION;
}

export function compileFullReportContent(
  diag: DiagnosticOutput,
  ctx: DiagnosticInputContext
): FullRenderedReportContent {
  const summaryFn = CLIENT_SITUATION_TEMPLATES[diag.track] || CLIENT_SITUATION_TEMPLATES.WEB_OPTIMIZATION;
  const clientSituation = summaryFn(ctx);

  // Track-aware Technical Evidence check: Render ONLY if an actual scan ran with valid scores/url
  const hasTechEvidence = Boolean(
    ctx.websiteUrl &&
    ctx.hasWebsite === 'yes' &&
    ctx.performance_score !== undefined &&
    ctx.performance_score > 0
  );

  const techEvidence = hasTechEvidence ? {
    url: ctx.websiteUrl || '',
    performance_score: ctx.performance_score || 0,
    seo_score: ctx.seo_score || 0,
    accessibility_score: ctx.accessibility_score || 0,
    findings: ctx.findings || []
  } : undefined;

  const hasEvidence = Boolean(diag.evidence_url && diag.evidence_url.length > 0);
  const evidenceLabel = diag.evidence_url.includes('sattvaos')
    ? 'Inspect SattvaOS Enterprise Due Diligence Case Study'
    : diag.evidence_url.includes('buy-secondhand-book')
    ? 'Inspect BuySecondHandBook E-Commerce Case Study'
    : 'Inspect DigiXPro Case Study & Verification Credentials';

  return {
    client_situation: clientSituation,
    primary_diagnosis: diag.primary_bottleneck,
    verdict_headline: diag.verdict_headline,
    why_it_matters: diag.why_this_matters,
    has_technical_evidence: hasTechEvidence,
    technical_evidence: techEvidence,
    what_we_recommend: diag.what_we_recommend,
    what_we_do_not_recommend: diag.what_we_do_not_recommend,
    investment_framework: buildInvestmentFramework(diag, ctx),
    priority_roadmap: buildPriorityRoadmap(diag),
    relevant_capability: {
      service_name: diag.relevant_service_name,
      service_url: diag.relevant_service_url
    },
    has_relevant_evidence: hasEvidence,
    relevant_evidence: hasEvidence ? {
      evidence_url: diag.evidence_url,
      label: evidenceLabel
    } : undefined,
    call_value_proposition: CALL_VALUE_PROPOSITIONS[diag.track] || CALL_VALUE_PROPOSITIONS.WEB_OPTIMIZATION
  };
}
