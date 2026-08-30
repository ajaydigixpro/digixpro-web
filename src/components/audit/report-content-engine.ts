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
  takeaway: string;
  takeaway_description: string;
  unresolved_questions: string;
}

export const formatFreeTextContext = (text?: string, prefix: string = 'specifically regarding '): string => {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (trimmed.length === 0) return '';

  const safeText = trimmed.length > 120 ? `${trimmed.substring(0, 117)}...` : trimmed;
  const cleaned = safeText.replace(/^["']|["']$/g, '').replace(/\.$/, '');

  return `${prefix}"${cleaned}"`;
};

export const CLIENT_SITUATION_TEMPLATES: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) => {
    const company = ctx.company || 'your business';
    const nameStr = ctx.name ? `${ctx.name}, based` : 'Based';
    const contextNote = formatFreeTextContext(ctx.current_systems, ' — specifically noting: ');

    if (ctx.hasWebsite === 'no') {
      return `${nameStr} on the details submitted for ${company}, operating in the ${ctx.industry || 'commercial'} sector delivering ${ctx.product || 'core services'} to ${ctx.market || 'your target audience'}, your primary bottleneck is operating without a dedicated web platform. Relying solely on manual or third-party channels restricts brand authority and prevents automated lead acquisition.`;
    }
    return `${nameStr} on the details submitted for ${company}, serving ${ctx.market || 'your clients'} with ${ctx.product || 'core offerings'} in the ${ctx.industry || 'commercial'} sector, your current website suffers from critical speed degradation (Performance Score: ${ctx.performance_score || 'below 40'}/100)${contextNote}. High page load latency creates immediate user friction, causing prospective clients to bounce before engaging.`;
  },

  WEB_OPTIMIZATION: (ctx) => {
    const company = ctx.company || 'your organization';
    const nameStr = ctx.name ? `${ctx.name}, based` : 'Based';
    const contextNote = formatFreeTextContext(ctx.current_systems, ' — specifically noting: ');

    return `${nameStr} on your inputs for ${company} offering ${ctx.product || 'specialized services'} to ${ctx.market || 'your client base'} in the ${ctx.industry || 'commercial'} space, your primary commercial challenge is conversion funnel friction${contextNote}. While visitors reach your platform, key landing pages fail to guide them efficiently toward submitting qualified consultation inquiries.`;
  },

  SEO_GROWTH: (ctx) => {
    const company = ctx.company || 'your business';
    const nameStr = ctx.name ? `${ctx.name}, based` : 'Based';
    const contextNote = formatFreeTextContext(ctx.current_systems, ' — specifically noting: ');

    return `${nameStr} on your inputs for ${company}, an established firm in the ${ctx.industry || 'commercial'} sector providing ${ctx.product || 'core offerings'} to ${ctx.market || 'your target market'}, your site performance baseline is stable (Performance Score: ${ctx.performance_score || 85}/100)${contextNote}. However, missing JSON-LD structured schema and technical crawl barriers restrict your organic search visibility for high-intent queries.`;
  },

  CRM_AUTOMATION: (ctx) => {
    const company = ctx.company || 'your business';
    const nameStr = ctx.name ? `${ctx.name}, based` : 'Based';
    const contextNote = formatFreeTextContext(ctx.current_systems, ' — specifically noting: ');

    return `${nameStr} on your inputs for ${company} in the ${ctx.industry || 'commercial'} sector delivering ${ctx.product || 'services'} to ${ctx.market || 'your client base'}, your primary operational friction stems from manual lead handling${contextNote}. Manually processing inbound inquiries creates response delays, team overhead, and sales pipeline leakage.`;
  },

  TECH_ADVISORY: (ctx) => {
    const company = ctx.company || 'your enterprise';
    const nameStr = ctx.name ? `${ctx.name}, based` : 'Based';
    const contextNote = formatFreeTextContext(ctx.current_systems, ' — specifically regarding: ');

    return `${nameStr} on the evaluation request for ${company} in the ${ctx.industry || 'technology & institutional'} sector, your immediate priority is independent technology due diligence and vendor proposal governance${contextNote}. Independent validation of architecture blueprints, licensing contracts, and engineering estimates is required before committing development capital.`;
  }
};

export const CALL_VALUE_PROPOSITIONS: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) => {
    const company = ctx.company || 'your business';
    const scoreStr = ctx.performance_score ? ` (Performance Score: ${ctx.performance_score}/100)` : '';
    return `For ${company}, your audit identifies severe web platform speed latency${scoreStr} as your primary technical bottleneck. What remains uncertain from this audit alone is whether your existing codebase can be refactored or if a clean Next.js rebuild is required. In a 30-minute Architecture Review, we will clarify: (1) key performance targets required to stop mobile visitor bounce, (2) frontend refactoring requirements vs. full platform rebuild, and (3) the most practical step-by-step launch sequence. The review is designed to give you a clear decision framework on whether a full platform rebuild is justified or if targeted engineering refactoring will solve the bottleneck. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before making platform commitments.`;
  },

  WEB_OPTIMIZATION: (ctx) => {
    const company = ctx.company || 'your business';
    return `For ${company}, your audit identifies landing page conversion dropoff as your primary commercial bottleneck. What remains uncertain from this audit alone is which specific layout elements, form lengths, or call-to-action positions are causing prospective clients to leave without inquiring. In a 30-minute Architecture Review, we will clarify: (1) primary UX dropoff points on your core landing pages, (2) headline messaging adjustments and CTA repositioning priorities, and (3) high-impact conversion fixes that can be implemented without rebuilding your website. You should leave the review with a clear, prioritized view of the highest-impact UX adjustments to execute before spending more money on web traffic. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before making design changes.`;
  },

  SEO_GROWTH: (ctx) => {
    const company = ctx.company || 'your business';
    const scoreStr = ctx.seo_score ? ` (SEO Score: ${ctx.seo_score}/100)` : '';
    return `For ${company}, your audit identifies search indexation and technical crawl barriers${scoreStr} as your primary growth restriction. What remains uncertain from this audit alone is which technical sitemap errors, canonical tag conflicts, or missing schema markups are hiding your core services from Google. In a 30-minute Architecture Review, we will clarify: (1) specific technical crawl and indexation errors blocking search discovery, (2) structured JSON-LD schema requirements for your primary commercial service offerings, and (3) the exact sequence to fix technical search barriers before investing in ongoing SEO. You should leave the review with a clear understanding of the technical search corrections required before committing capital to ongoing search marketing. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point for your search growth strategy.`;
  },

  CRM_AUTOMATION: (ctx) => {
    const company = ctx.company || 'your business';
    return `For ${company}, your audit identifies manual lead entry and delayed follow-ups as your primary operational leakage point. What remains uncertain from this audit alone is which inbound lead channels (web forms, WhatsApp, email) should be automated first to stop pipeline leakage. In a 30-minute Architecture Review, we will clarify: (1) exact intake points where inbound inquiries are currently leaking or delayed, (2) how self-hosted n8n automation workflows can connect your web forms directly to team WhatsApp and CRM alerts, and (3) the minimum viable lead automation architecture needed to eliminate manual data entry. You should leave the review with a clear operational view of which lead-handling steps to automate first to reduce team response lag. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point to stop lead leakage.`;
  },

  TECH_ADVISORY: (ctx) => {
    const company = ctx.company || 'your organization';
    return `For ${company}, your audit identifies vendor proposal governance and technology due diligence as your immediate priority. What remains uncertain from this audit alone is whether proposed vendor scope, licensing contracts, and architecture cost estimates are technically justified. In a 30-minute CTO Due Diligence Call, we will clarify: (1) essential architecture requirements vs unnecessary vendor scope overbuilding, (2) key licensing terms, IP ownership guarantees, and delivery SLA protections, and (3) cost estimate validity before capital is released to software vendors. You should leave the call with independent CTO clarity on which vendor scope items require validation before committing development capital. Because this assessment reflects your inputs submitted today, reviewing the findings while fresh provides the clearest starting point before releasing development capital.`;
  }
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

export const NAMED_TAKEAWAYS: Record<DiagnosticTrack, string> = {
  WEB_REBUILD: "Website Architecture & Build Specification",
  WEB_OPTIMIZATION: "Conversion UX & Dropoff Priority Map",
  SEO_GROWTH: "Search Visibility & Technical SEO Priority Map",
  CRM_AUTOMATION: "Lead Workflow Architecture Blueprint",
  TECH_ADVISORY: "Vendor Scope & Technical Risk Evaluation"
};

export const TAKEAWAY_DESCRIPTIONS: Record<DiagnosticTrack, string> = {
  WEB_REBUILD: "A technical specification outlining Next.js platform requirements, mobile speed benchmarks, and practical build scope.",
  WEB_OPTIMIZATION: "A prioritized breakdown of high-impact landing page adjustments to fix visitor drop-off before spending budget on traffic.",
  SEO_GROWTH: "An itemized roadmap of technical crawl barriers and JSON-LD schema markup requirements to capture high-intent search queries.",
  CRM_AUTOMATION: "An operational workflow map identifying the exact automation points to connect web forms directly to team WhatsApp/CRM alerts.",
  TECH_ADVISORY: "An independent CTO due diligence evaluation separating essential software requirements from bloated vendor estimates and licensing risks."
};

export const UNRESOLVED_QUESTIONS: Record<DiagnosticTrack, (ctx: DiagnosticInputContext) => string> = {
  WEB_REBUILD: (ctx) =>
    `We can establish that severe platform speed latency creates visitor bounce for ${ctx.company || 'your business'}. What remains unresolved from this audit alone is whether frontend code refactoring will suffice or if a clean Next.js rebuild is justified.`,

  WEB_OPTIMIZATION: (ctx) =>
    `We can establish that primary landing page conversion friction is restricting appointment inquiries for ${ctx.company || 'your organization'}. What remains unresolved from this audit alone is which specific layout elements, mobile viewports, or CTA positions are creating the highest visitor drop-off.`,

  SEO_GROWTH: (ctx) =>
    `We can establish that technical crawl and indexation errors restrict search visibility for ${ctx.company || 'your business'}. What remains unresolved from this audit alone is which sitemap errors, canonical tag conflicts, or missing JSON-LD schema markups are hiding your core services from Google.`,

  CRM_AUTOMATION: (ctx) =>
    `We can establish that manual lead entry creates follow-up lag for ${ctx.company || 'your team'}. What remains unresolved from this audit alone is which inbound lead channels (forms, WhatsApp, email) should be automated first to eliminate team response delay.`,

  TECH_ADVISORY: (ctx) =>
    `We can establish that independent vendor proposal review is required before releasing capital for ${ctx.company || 'your enterprise'}. What remains unresolved from this audit alone is which specific line items, licensing terms, and delivery SLA assumptions require negotiation.`
};

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
  const unresolvedFn = UNRESOLVED_QUESTIONS[diag.track] || UNRESOLVED_QUESTIONS.WEB_OPTIMIZATION;

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
    call_value_proposition: (CALL_VALUE_PROPOSITIONS[diag.track] || CALL_VALUE_PROPOSITIONS.WEB_OPTIMIZATION)(ctx),
    takeaway: NAMED_TAKEAWAYS[diag.track] || NAMED_TAKEAWAYS.WEB_OPTIMIZATION,
    takeaway_description: TAKEAWAY_DESCRIPTIONS[diag.track] || TAKEAWAY_DESCRIPTIONS.WEB_OPTIMIZATION,
    unresolved_questions: unresolvedFn(ctx)
  };
}
