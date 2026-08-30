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
    explanation: string;
  };
  has_relevant_evidence: boolean;
  relevant_evidence?: {
    evidence_url: string;
    label: string;
  };
  cta_heading: string;
  call_value_proposition: string;
}

export const CLIENT_SITUATION_TEMPLATES: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) => {
    const company = ctx.company || 'your business';
    const name = ctx.name ? `${ctx.name}, based` : 'Based';
    const ageStr = ctx.business_age ? `operating for ${ctx.business_age}` : 'an active business';
    if (ctx.hasWebsite === 'no') {
      return `${name} on the details submitted for ${company}, operating in the ${ctx.industry || 'commercial'} sector (${ageStr}) delivering ${ctx.product || 'core services'} to ${ctx.market || 'your target audience'}, your primary bottleneck is operating without a dedicated web platform. Relying solely on manual or third-party channels restricts brand authority and prevents automated lead acquisition.`;
    }
    return `${name} on the details submitted for ${company}, serving ${ctx.market || 'your clients'} with ${ctx.product || 'core offerings'} in the ${ctx.industry || 'commercial'} sector, your current website suffers from critical speed degradation (Performance Score: ${ctx.performance_score || 'below 40'}/100). High page load latency creates immediate user friction, causing prospective clients to bounce before engaging.`;
  },

  WEB_OPTIMIZATION: (ctx) => {
    const company = ctx.company || 'your organization';
    const name = ctx.name ? `${ctx.name}, based` : 'Based';
    const sizeStr = ctx.company_size ? `with a team of ${ctx.company_size}` : 'as a growing team';
    return `${name} on your inputs for ${company} (${sizeStr}) offering ${ctx.product || 'specialized services'} to ${ctx.market || 'your client base'} in the ${ctx.industry || 'commercial'} space, your primary commercial challenge is conversion funnel friction. While visitors reach your platform, key landing pages fail to guide them efficiently toward submitting qualified consultation inquiries.`;
  },

  SEO_GROWTH: (ctx) => {
    const company = ctx.company || 'your business';
    const name = ctx.name ? `${ctx.name}, based` : 'Based';
    return `${name} on your inputs for ${company}, an established firm in the ${ctx.industry || 'commercial'} sector providing ${ctx.product || 'core offerings'} to ${ctx.market || 'your target market'}, your site performance baseline is stable (Performance Score: ${ctx.performance_score || 85}/100). However, missing JSON-LD structured schema and technical crawl barriers restrict your organic search visibility for high-intent queries.`;
  },

  CRM_AUTOMATION: (ctx) => {
    const company = ctx.company || 'your business';
    const name = ctx.name ? `${ctx.name}, based` : 'Based';
    const systems = ctx.current_systems ? `(${ctx.current_systems})` : '';
    return `${name} on your inputs for ${company} in the ${ctx.industry || 'commercial'} sector delivering ${ctx.product || 'services'} to ${ctx.market || 'your client base'}, your primary operational friction stems from manual lead handling ${systems}. Manually processing inbound inquiries creates response delays, team overhead, and sales pipeline leakage.`;
  },

  TECH_ADVISORY: (ctx) => {
    const company = ctx.company || 'your enterprise';
    const name = ctx.name ? `${ctx.name}, based` : 'Based';
    const contextText = ctx.current_systems || ctx.product || 'major technology investments';
    return `${name} on the evaluation request for ${company} in the ${ctx.industry || 'technology & institutional'} sector, your immediate priority is independent technology due diligence and vendor proposal governance regarding ${contextText}. Independent validation of architecture blueprints, licensing contracts, and engineering estimates is required before committing development capital.`;
  }
};

export const CALL_VALUE_PROPOSITIONS: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) =>
    `Your audit identifies core platform engineering and severe page latency as the primary bottleneck for ${ctx.company || 'your business'}. In a 30-minute Architecture Review, we will clarify: (1) whether a focused Next.js MVP rebuild or targeted refactoring is required, (2) key performance targets to stop visitor bounce, and (3) the exact step-by-step launch sequence. You will walk away with a clear technical roadmap rather than a generic sales pitch. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before making platform commitments.`,

  WEB_OPTIMIZATION: (ctx) =>
    `Your audit identifies conversion funnel friction as the primary bottleneck for ${ctx.company || 'your business'}. In a 30-minute Architecture Review, we will clarify: (1) exact UX dropoff points on your primary landing page, (2) CTA positioning and message clarity adjustments, and (3) which changes will yield immediate conversion improvements without rebuilding your site. You will walk away with an actionable optimization plan rather than a generic pitch. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before making design changes.`,

  SEO_GROWTH: (ctx) =>
    `Your audit identifies search indexation and technical SEO crawl barriers as the primary bottleneck for ${ctx.company || 'your business'}. In a 30-minute Architecture Review, we will clarify: (1) specific technical sitemap and canonical fixes needed, (2) JSON-LD schema requirements for your key services, and (3) how to capture commercial search-intent queries efficiently. You will walk away with a precise technical SEO blueprint. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point for your search growth strategy.`,

  CRM_AUTOMATION: (ctx) =>
    `Your audit identifies manual lead handling as the primary operational bottleneck for ${ctx.company || 'your business'}. In a 30-minute Architecture Review, we will clarify: (1) where inbound inquiries are currently leaking, (2) how to build a self-hosted n8n automation pipeline connecting web forms directly to your team's WhatsApp and CRM, and (3) the exact sequence to eliminate manual data entry. You will walk away with a clear workflow automation diagram. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point to stop lead leakage.`,

  TECH_ADVISORY: (ctx) =>
    `Your audit identifies technology due diligence and vendor proposal governance as the primary priority for ${ctx.company || 'your organization'}. In a 30-minute CTO Due Diligence Call, we will clarify: (1) whether proposed vendor scope and architecture specs are technically justified, (2) essential requirements versus unnecessary overbuilding, and (3) key licensing, IP ownership, and SLA contract protections to resolve before committing capital. You will walk away with an independent technical evaluation to make an informed decision. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before releasing development capital.`
};

export function buildPriorityRoadmap(diag: DiagnosticOutput, ctx: DiagnosticInputContext): PriorityRoadmapItem[] {
  const company = ctx.company || 'your business';
  
  if (diag.track === 'TECH_ADVISORY') {
    return [
      {
        level: 'PRIORITY 1 — Address First',
        title: `Vendor Proposal Audit & Architecture Validation for ${company}`,
        description: `Independently audit vendor scope, code specifications, licensing terms, and engineering cost estimates before releasing development capital.`
      },
      {
        level: 'PRIORITY 2 — Address Next',
        title: `Vendor SLA & Licensing Contract Alignment`,
        description: `Establish strict milestone sign-offs, IP ownership guarantees, and delivery SLAs to prevent vendor lock-in or scope creep.`
      },
      {
        level: 'PRIORITY 3 — Consider Later',
        title: `Fractional CTO Governance & Code Audits`,
        description: `Institute quarterly security vulnerability scans, code review checkpoints, and long-term technical roadmap oversight.`
      }
    ];
  }

  if (diag.track === 'CRM_AUTOMATION') {
    return [
      {
        level: 'PRIORITY 1 — Address First',
        title: `Automate Inbound Lead Intake & WhatsApp/Email Alerts`,
        description: `Connect web forms directly to self-hosted n8n webhooks for instant team notifications and zero manual entry lag.`
      },
      {
        level: 'PRIORITY 2 — Address Next',
        title: `CRM Database Structuring & Lead Qualification Routing`,
        description: `Structure lead context tables and automated stage routing to ensure high-value inquiries reach senior team members immediately.`
      },
      {
        level: 'PRIORITY 3 — Consider Later',
        title: `Customer Lifecycle Nurturing & Multi-Channel Workflows`,
        description: `Implement automated follow-up sequences and re-engagement triggers for stalled pipeline deals.`
      }
    ];
  }

  if (diag.track === 'SEO_GROWTH') {
    return [
      {
        level: 'PRIORITY 1 — Address First',
        title: `Fix Technical Crawl Barriers & Canonical Indexation Errors`,
        description: `Repair sitemap errors, resolve canonical header conflicts, and fix robots.txt directives to unlock Google search crawling.`
      },
      {
        level: 'PRIORITY 2 — Address Next',
        title: `Plumb JSON-LD Structured Schema & Service Landing Pages`,
        description: `Implement rich structured data markup for your core services to capture commercial search-intent queries.`
      },
      {
        level: 'PRIORITY 3 — Consider Later',
        title: `Managed Search Authority & AI Search (GEO) Indexation`,
        description: `Expand high-intent search content and optimize site architecture for AI search engine recommendations.`
      }
    ];
  }

  if (diag.track === 'WEB_REBUILD') {
    return [
      {
        level: 'PRIORITY 1 — Address First',
        title: `Execute Core Web Platform Refactoring & Speed Optimization`,
        description: `Rebuild page architecture on modern Next.js framework to eliminate latency barriers and achieve sub-second load times.`
      },
      {
        level: 'PRIORITY 2 — Address Next',
        title: `Conversion UX Architecture & Mobile Layout Design`,
        description: `Structure clear value propositions, responsive mobile layouts, and high-converting CTA paths for ${company}.`
      },
      {
        level: 'PRIORITY 3 — Consider Later',
        title: `Headless CMS & Automated Lead Intake Plumbing`,
        description: `Integrate headless content management and direct n8n webhook routing for incoming consultation requests.`
      }
    ];
  }

  // WEB_OPTIMIZATION
  return [
    {
      level: 'PRIORITY 1 — Address First',
      title: `Refactor Primary Landing Page Layout & CTA Positioning`,
      description: `Eliminate UX friction on key conversion pages, clarify core offer messaging, and reposition primary action triggers.`
    },
    {
      level: 'PRIORITY 2 — Address Next',
      title: `Mobile Experience Tuning & Multi-Page Funnel Optimization`,
      description: `Streamline form fields, optimize mobile viewport rendering, and remove navigation dropoff points.`
    },
    {
      level: 'PRIORITY 3 — Consider Later',
      title: `Event Tracking Analytics & Lead Qualification Routing`,
      description: `Implement custom event tracking to measure funnel dropoffs and route qualified inquiries directly to sales.`
    }
  ];
}

export const CTA_HEADINGS: Record<DiagnosticTrack, string> = {
  WEB_REBUILD: 'Validate Your Web Platform Architecture',
  WEB_OPTIMIZATION: 'Review Your Website Conversion Priorities',
  SEO_GROWTH: 'Review Your Search Growth Priorities',
  CRM_AUTOMATION: 'Validate Your Lead-Capture Architecture',
  TECH_ADVISORY: 'Validate Your Technology Investment'
};

export const DIGIXPRO_CAPABILITY_EXPLANATIONS: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) =>
    `DigiXPro's relevant capability for ${ctx.company || 'your business'} is high-performance web engineering: building a sub-second Next.js platform that eliminates page load latency and projects authentic brand authority without bloated generic templates.`,

  WEB_OPTIMIZATION: (ctx) =>
    `DigiXPro's relevant capability for ${ctx.company || 'your organization'} is conversion UX architecture: restructuring key landing page layouts, CTAs, and mobile viewports to stop lead dropoffs without requiring an expensive full-site rebuild.`,

  SEO_GROWTH: (ctx) =>
    `DigiXPro's relevant capability for ${ctx.company || 'your business'} is technical search indexation & schema plumbing: repairing sitemap/canonical barriers and implementing JSON-LD structured data to capture high-intent commercial queries.`,

  CRM_AUTOMATION: (ctx) =>
    `DigiXPro's relevant capability for ${ctx.company || 'your team'} is workflow architecture: connecting your web form channels directly to self-hosted n8n automation pipelines and WhatsApp/CRM alerts, eliminating manual data entry lag.`,

  TECH_ADVISORY: (ctx) =>
    `DigiXPro's relevant capability for ${ctx.company || 'your enterprise'} is independent technology due diligence: auditing vendor proposals, code specifications, licensing contracts, and engineering estimates to protect your capital before commitments.`
};

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
          name: 'Essential Foundation Scope',
          scope_summary: 'Lean 5-page Next.js SSG build focusing on core messaging and mobile page speed.',
          is_recommended: false,
          key_deliverables: ['Lean Next.js SSG setup', 'Mobile layout refactoring', 'Basic contact form routing'],
          cost_drivers: ['Page count', 'Static styling complexity'],
        },
        {
          level_number: 2,
          name: 'Recommended Custom Platform Scope',
          scope_summary: 'Full custom Next.js web platform, sub-second load times, structured schema, and headless CMS.',
          is_recommended: true,
          key_deliverables: ['Custom Next.js component design', 'Sub-second speed refactoring', 'JSON-LD schema plumbing', 'Headless CMS integration'],
          cost_drivers: ['Custom design system', 'CMS integration depth', 'Conversion UX workflows'],
        },
        {
          level_number: 3,
          name: 'Advanced Enterprise Architecture Scope',
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
          name: 'Focused Landing Page Optimization Scope',
          scope_summary: 'Targeted layout optimization and CTA positioning on primary landing page.',
          is_recommended: true,
          key_deliverables: ['Mobile layout refactoring', 'CTA positioning fix', 'Headline messaging adjustment'],
          cost_drivers: ['Single page refactoring', 'Form cleanup'],
        },
        {
          level_number: 2,
          name: 'Recommended Funnel Architecture Scope',
          scope_summary: 'Full website conversion refactoring, mobile speed tuning, and custom lead intake UX.',
          is_recommended: false,
          key_deliverables: ['Multi-page layout optimization', 'Mobile speed tuning', 'Interactive form UX', 'CTA funnel architecture'],
          cost_drivers: ['Multi-page scope', 'Interactive UI elements', 'Speed refactoring'],
        },
        {
          level_number: 3,
          name: 'Advanced Multi-Funnel Engineering Scope',
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
          name: 'Essential Technical SEO Corrections Scope',
          scope_summary: 'Core indexation error repairs, sitemap setup, canonical header fixes, and robots.txt audit.',
          is_recommended: false,
          key_deliverables: ['Indexation error fixes', 'Sitemap & robots.txt repair', 'Canonical URL audit'],
          cost_drivers: ['Crawl error count', 'Site architecture size'],
        },
        {
          level_number: 2,
          name: 'Recommended Search & Schema Architecture Scope',
          scope_summary: 'Comprehensive technical SEO refactoring, structured JSON-LD schema plumbing, and search-intent service pages.',
          is_recommended: true,
          key_deliverables: ['Full technical SEO refactoring', 'JSON-LD schema plumbing', 'Search-intent service page structure'],
          cost_drivers: ['Schema markup complexity', 'Service page count', 'Technical site health'],
        },
        {
          level_number: 3,
          name: 'Advanced Growth & AI Search Optimization Scope',
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
          name: 'Essential Lead Intake Pipeline Scope',
          scope_summary: 'Single web form → self-hosted n8n webhook → instant WhatsApp/Email team alerts.',
          is_recommended: true,
          key_deliverables: ['Web form webhook intake', 'Instant WhatsApp/Email alerts', 'Basic lead logging'],
          cost_drivers: ['Single form intake', 'Basic notification channel'],
        },
        {
          level_number: 2,
          name: 'Recommended CRM Workflow Architecture Scope',
          scope_summary: 'Multi-channel intake (forms, chat, ads) → self-hosted n8n workflows → CRM automated lead routing & tagging.',
          is_recommended: false,
          key_deliverables: ['Multi-channel lead intake', 'Automated CRM lead tagging', 'Lead qualification routing', 'n8n workflow dispatch'],
          cost_drivers: ['CRM API integration', 'Qualification branching', 'Multi-channel setup'],
        },
        {
          level_number: 3,
          name: 'Advanced Enterprise Lifecycle Engine Scope',
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
          name: 'Focused Vendor Proposal Review Scope',
          scope_summary: 'Independent evaluation of a single software vendor proposal, licensing contract, and cost estimates.',
          is_recommended: true,
          key_deliverables: ['Single vendor proposal audit', 'Licensing contract scope check', 'Pricing & architecture evaluation'],
          cost_drivers: ['Proposal page length', 'Single vendor scope'],
        },
        {
          level_number: 2,
          name: 'Recommended Due Diligence & Code Audit Scope',
          scope_summary: 'In-depth vendor proposal audit, code architecture inspection, licensing risk analysis, and vendor SLA negotiation.',
          is_recommended: false,
          key_deliverables: ['Full vendor proposal & code audit', 'Architecture blueprint verification', 'Licensing & SLA negotiation support'],
          cost_drivers: ['Multi-vendor comparison', 'Codebase review depth', 'Architecture verification'],
        },
        {
          level_number: 3,
          name: 'Advanced Fractional CTO Governance Scope',
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

  const capExpFn = DIGIXPRO_CAPABILITY_EXPLANATIONS[diag.track] || DIGIXPRO_CAPABILITY_EXPLANATIONS.WEB_OPTIMIZATION;

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
    priority_roadmap: buildPriorityRoadmap(diag, ctx),
    relevant_capability: {
      service_name: diag.relevant_service_name,
      service_url: diag.relevant_service_url,
      explanation: capExpFn(ctx)
    },
    has_relevant_evidence: hasEvidence,
    relevant_evidence: hasEvidence ? {
      evidence_url: diag.evidence_url,
      label: evidenceLabel
    } : undefined,
    cta_heading: CTA_HEADINGS[diag.track] || CTA_HEADINGS.WEB_OPTIMIZATION,
    call_value_proposition: (CALL_VALUE_PROPOSITIONS[diag.track] || CALL_VALUE_PROPOSITIONS.WEB_OPTIMIZATION)(ctx)
  };
}
