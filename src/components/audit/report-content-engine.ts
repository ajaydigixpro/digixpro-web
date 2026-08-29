import { DiagnosticOutput, DiagnosticInputContext, DiagnosticTrack } from './diagnostic-matrix';

export interface PriorityRoadmapItem {
  level: 'PRIORITY 1 — Address First' | 'PRIORITY 2 — Address Next' | 'PRIORITY 3 — Consider Later';
  title: string;
  description: string;
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
      ? `You currently do not have an active business website for ${ctx.company || 'your business'}, relying primarily on direct contact or offline channels.`
      : `You have an active website for ${ctx.company || 'your business'}, but severe platform load bottlenecks (Speed Score: ${ctx.performance_score || 'below 40'}/100) are creating critical conversion and user experience barriers.`,

  WEB_OPTIMIZATION: (ctx) =>
    `You have an active website for ${ctx.company || 'your business'}, but your primary commercial concern is that website visitors are dropping off before submitting qualified sales or patient enquiries.`,

  SEO_GROWTH: (ctx) =>
    `Your website for ${ctx.company || 'your business'} has a stable technical foundation (Performance Score: ${ctx.performance_score || 85}/100), but technical SEO crawl and indexation flaws are restricting organic search visibility.`,

  CRM_AUTOMATION: (ctx) =>
    `Your team at ${ctx.company || 'your business'} currently handles incoming inquiries manually without automated lead tracking or instant dispatch workflows, resulting in follow-up delays.`,

  TECH_ADVISORY: (ctx) =>
    `You are evaluating a significant software proposal or vendor contract for ${ctx.company || 'your business'} and require independent technical due diligence to verify architecture quality, licensing scope, and cost estimates.`
};

export const CALL_VALUE_PROPOSITIONS: Record<DiagnosticTrack, string> = {
  WEB_REBUILD: "In a 30-minute architecture discussion, we can determine whether your platform requires structural re-engineering or targeted optimization, and establish an initial MVP launch scope.",
  WEB_OPTIMIZATION: "In a 30-minute conversion UX review, we can analyze where leads drop off on your primary pages and prioritize high-impact UX improvements.",
  SEO_GROWTH: "In a 30-minute technical SEO session, we can review indexation barriers, sitemap structure, and JSON-LD schema requirements to expand search visibility.",
  CRM_AUTOMATION: "In a 30-minute automation review, we can map your current lead flow and design a self-hosted n8n workflow connecting website forms directly to your CRM.",
  TECH_ADVISORY: "In a 30-minute CTO due diligence call, we can review proposed vendor scope, licensing contracts, and architecture specs to verify that the proposed scope is proportionate to your business needs."
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
      title: 'Long-Term System Governance & SLA Audits',
      description: 'Establish quarterly code reviews, security vulnerability scans, and vendor delivery milestone sign-offs.'
    });
  } else if (diag.track === 'WEB_REBUILD' || diag.track === 'WEB_OPTIMIZATION') {
    items.push({
      level: 'PRIORITY 3 — Consider Later',
      title: 'Lead Capture & Automated Workflow Dispatch',
      description: 'Connect web form submissions directly to automated CRM routing and instant WhatsApp/Email alerts.'
    });
  }

  return items;
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
