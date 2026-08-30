export type DiagnosticTrack =
  | 'WEB_REBUILD'
  | 'WEB_OPTIMIZATION'
  | 'SEO_GROWTH'
  | 'CRM_AUTOMATION'
  | 'TECH_ADVISORY';

export interface DiagnosticInputContext {
  company: string;
  name?: string;
  email?: string;
  product: string;
  market: string;
  industry: string;
  company_size: string;
  business_age: string;
  hasWebsite: 'yes' | 'no' | '';
  websiteUrl?: string;
  selectedSystems: string[];
  selectedServices: string[];
  current_systems?: string;
  interested_services?: string;
  performance_score?: number;
  seo_score?: number;
  accessibility_score?: number;
  findings?: Array<{ problem: string; impact?: string; solution_name: string; solution_url: string }>;
}

export interface DiagnosticOutput {
  id: string;
  track: DiagnosticTrack;
  primary_bottleneck: string;
  verdict_headline: string;
  why_this_matters: string;
  what_we_recommend: string;
  what_we_do_not_recommend: string;
  suggested_first_action: string;
  relevant_service_name: string;
  relevant_service_url: string;
  evidence_url: string;
  suggest_discovery_call: boolean;
  facts: {
    company: string;
    has_website: boolean;
    current_systems_summary: string;
    interested_services_summary: string;
  };
  measurements: {
    performance_score?: number;
    seo_score?: number;
    accessibility_score?: number;
    findings_count: number;
  };
}

export interface DiagnosticRule {
  id: string;
  name: string;
  priority: number;
  condition: (ctx: DiagnosticInputContext) => boolean;
  evaluate: (ctx: DiagnosticInputContext) => DiagnosticOutput;
}

export function isInstitutionalB2B(ctx: DiagnosticInputContext): boolean {
  const combinedText = [
    ctx.market || "",
    ctx.product || "",
    ctx.industry || "",
    ctx.current_systems || "",
    ctx.interested_services || "",
  ].join(" ");

  return /\b(banks?\s+(and|&)?\s+financial\s+institutions?|financial\s+institutions?|institutional\s+(buyers?|procurement|clients?)|enterprise\s+(procurement|buyers?|clients?|rfp)|selling\s+to\s+banks?|b2b\s+payment\s+gateway|escrow\s+apis?)\b/i.test(combinedText);
}

export const DIAGNOSTIC_RULES: DiagnosticRule[] = [
  // 1. Rule 1: Vendor Proposal Due Diligence & Technical Review
  {
    id: "RULE-01-VENDOR-ADVISORY",
    name: "Vendor Proposal Due Diligence",
    priority: 1,
    condition: (ctx) =>
      ctx.selectedServices.includes("it_consulting") ||
      ctx.selectedServices.includes("fractional_cto") ||
      /\b(vendor proposal|software proposal|spend \d+ lakh|20 lakh|quoted us|independent review|due diligence|technical opinion)\b/i.test(
        (ctx.product || "") + " " + (ctx.interested_services || "") + " " + (ctx.current_systems || "")
      ),
    evaluate: (ctx) => ({
      id: "RULE-01-VENDOR-ADVISORY",
      track: "TECH_ADVISORY",
      primary_bottleneck: "Vendor Proposal Governance & Technical Due Diligence",
      verdict_headline: "Before committing to high-capital software vendor proposals, independent technical due diligence protects your business from bloated scope and vendor lock-in.",
      why_this_matters: "Signing software vendor contracts without independent technical architecture review risks licensing traps, hidden integration costs, and overscoped delivery estimates.",
      what_we_recommend: "Independent vendor proposal evaluation, software architecture code audit, and fractional CTO governance.",
      what_we_do_not_recommend: "Do NOT approve vendor software proposals or release major development milestones without independent technical due diligence. Additionally, do NOT invest capital in generic consumer SEO campaigns or unnecessary ad retainers before technical scope validation.",
      suggested_first_action: "Review contract scope, licensing architecture, and vendor pricing with an independent fractional CTO.",
      relevant_service_name: "Technology Due Diligence & Vendor Evaluation",
      relevant_service_url: "/advisory",
      evidence_url: "/evidence/sattvaos",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 1b. Rule 1b: Enterprise & Institutional B2B Governance
  {
    id: "RULE-01B-ENTERPRISE-B2B",
    name: "Enterprise & Institutional B2B Governance",
    priority: 1.5,
    condition: (ctx) => isInstitutionalB2B(ctx),
    evaluate: (ctx) => ({
      id: "RULE-01B-ENTERPRISE-B2B",
      track: "TECH_ADVISORY",
      primary_bottleneck: "Enterprise Architecture & Institutional Due Diligence",
      verdict_headline: "For enterprise technology providers selling to banks and financial institutions, technical architecture, API security, and governance dictate commercial credibility.",
      why_this_matters: "Institutional buyers and financial institutions evaluate security compliance, API reliability, and enterprise architecture over consumer search marketing.",
      what_we_recommend: "Enterprise platform architecture evaluation, API security review, and fractional CTO governance.",
      what_we_do_not_recommend: "Do NOT spend capital on consumer SEO campaigns or generic marketing retainers for institutional enterprise sales.",
      suggested_first_action: "Review technical architecture specifications and enterprise security compliance.",
      relevant_service_name: "Technology Due Diligence & Vendor Evaluation",
      relevant_service_url: "/advisory",
      evidence_url: "/evidence/sattvaos",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 2. Rule 2: Critical Foundation Missing (No Website)
  {
    id: "RULE-02-NO-WEBSITE",
    name: "Missing Core Web Foundation",
    priority: 2,
    condition: (ctx) => ctx.hasWebsite === "no",
    evaluate: (ctx) => ({
      id: "RULE-02-NO-WEBSITE",
      track: "WEB_REBUILD",
      primary_bottleneck: "Missing Core Digital Engineering Foundation",
      verdict_headline: "Establishing an initial high-performance digital presence is your primary commercial priority.",
      why_this_matters: "Relying strictly on social media or offline word-of-mouth limits client trust, brand authority, and automated inbound enquiries.",
      what_we_recommend: "Deploy a lean, custom business website built for mobile speed, clear conversion paths, and organic search indexation.",
      what_we_do_not_recommend: "Do NOT invest in paid ad campaigns or social media marketing until your core website engineering foundation is live.",
      suggested_first_action: "Select website engineering scope and core branding requirements.",
      relevant_service_name: "Custom Business Website Design",
      relevant_service_url: "/design-services",
      evidence_url: "/evidence/buy-secondhand-book",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 3. Rule 3: Critical Technical Performance Barrier (Speed < 40)
  {
    id: "RULE-03-POOR-PERFORMANCE",
    name: "Severe Performance Degradation",
    priority: 3,
    condition: (ctx) =>
      ctx.hasWebsite === "yes" &&
      ctx.performance_score !== undefined &&
      ctx.performance_score > 0 &&
      ctx.performance_score < 40,
    evaluate: (ctx) => ({
      id: "RULE-03-POOR-PERFORMANCE",
      track: "WEB_REBUILD",
      primary_bottleneck: "Severe Platform Speed & Performance Degradation",
      verdict_headline: `Your website suffers from severe technical performance bottlenecks (Performance Score: ${ctx.performance_score}/100), driving visitors away before they convert.`,
      why_this_matters: "Severe load latency on mobile devices frequently increases visitor bounce rates and can negatively affect organic Google search visibility.",
      what_we_recommend: "Re-engineer core platform architecture or perform structural performance refactoring to achieve sub-second load times.",
      what_we_do_not_recommend: `Do NOT spend money buying more SEO traffic while page load speed remains severely degraded (${ctx.performance_score}/100).`,
      suggested_first_action: "Run a full code and server performance audit.",
      relevant_service_name: "Web Engineering & Platform Modernization",
      relevant_service_url: "/design-services",
      evidence_url: "/evidence/digixpro",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 4. Rule 4: Operational Lead Handling Bottleneck (Manual CRM Entry)
  {
    id: "RULE-04-MANUAL-CRM",
    name: "Manual Lead Entry Bottleneck",
    priority: 4,
    condition: (ctx) =>
      ctx.selectedSystems.includes("none_manual") ||
      ctx.selectedSystems.includes("manual_excel") ||
      ctx.selectedServices.includes("process_automation") ||
      ctx.selectedServices.includes("bpa") ||
      ctx.selectedServices.includes("ai_automation") ||
      /\b(manual|manually|manual order|excel|spreadsheet|copying leads|copy leads|manual crm|by hand|handling is completely manual)\b/i.test(
        (ctx.current_systems || "") + " " + (ctx.product || "") + " " + (ctx.interested_services || "")
      ),
    evaluate: (ctx) => ({
      id: "RULE-04-MANUAL-CRM",
      track: "CRM_AUTOMATION",
      primary_bottleneck: "Manual Lead Entry & Operational Workflow Leakage",
      verdict_headline: "Your primary growth bottleneck is manual lead entry and delayed customer follow-ups.",
      why_this_matters: "Manually copying inquiries into spreadsheets or CRMs causes response delays, human errors, and missed sales opportunities.",
      what_we_recommend: "Implement automated lead capture pipelines (n8n workflows) connecting website forms directly to your CRM and instant WhatsApp/Email alerts.",
      what_we_do_not_recommend: "Do NOT rebuild your website or purchase expensive CRM software before automating lead dispatch from existing forms.",
      suggested_first_action: "Map lead intake sources and configure self-hosted n8n lead automation.",
      relevant_service_name: "AI & Workflow Automation",
      relevant_service_url: "/search-automation",
      evidence_url: "/evidence/digixpro",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 5. Rule 5: Conversion Bottleneck (Good Traffic, Low Enquiries)
  {
    id: "RULE-05-CONVERSION-UX",
    name: "Conversion Funnel Friction",
    priority: 5,
    condition: (ctx) =>
      /\b(traffic is good|plenty of traffic|visitors but no|hardly any enquiries|people just don't enquire|leads are low|low leads|google traffic isn't great|conversion)\b/i.test(
        (ctx.current_systems || "") + " " + (ctx.product || "")
      ),
    evaluate: (ctx) => ({
      id: "RULE-05-CONVERSION-UX",
      track: "WEB_OPTIMIZATION",
      primary_bottleneck: "Leaky Conversion Funnel & UX Friction",
      verdict_headline: "Your website receives traffic but fails to convert visitors into qualified enquiries.",
      why_this_matters: "Driving more traffic into a non-converting website wastes marketing budget. Conversion dropoff is typically associated with unclear offer positioning, weak call-to-action placement, or mobile layout friction.",
      what_we_recommend: "Refactor page layout, sharpen value propositions, streamline contact forms, and address UX conversion friction.",
      what_we_do_not_recommend: "Do NOT buy more SEO traffic or ad campaigns until conversion rate optimization is complete.",
      suggested_first_action: "Run a conversion UX audit on your primary landing page.",
      relevant_service_name: "Website Redesign & Conversion UX",
      relevant_service_url: "/design-services",
      evidence_url: "/evidence/buy-secondhand-book",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 6. Rule 6: Lean Commerce Scope (30 Products)
  {
    id: "RULE-06-LEAN-COMMERCE",
    name: "Lean E-Commerce Scope",
    priority: 6,
    condition: (ctx) =>
      /\b(30 products|sell 30 products|initial catalog|starting catalog|small catalog)\b/i.test(
        (ctx.product || "") + " " + (ctx.interested_services || "")
      ),
    evaluate: (ctx) => ({
      id: "RULE-06-LEAN-COMMERCE",
      track: "WEB_OPTIMIZATION",
      primary_bottleneck: "Scoped E-Commerce Launch vs Over-Engineering",
      verdict_headline: "For an initial 30-product catalog, starting lean is the most profitable commercial decision.",
      why_this_matters: "Paying for complex custom marketplace software before validating product sales wastes capital and delays launch.",
      what_we_recommend: "Deploy a fast, lean e-commerce setup (Shopify or Next.js starter) configured for instant checkout and automated order notifications.",
      what_we_do_not_recommend: "Do NOT invest in custom marketplace platform engineering until monthly order volume justifies it.",
      suggested_first_action: "Configure rapid catalog structure and payment gateway integration.",
      relevant_service_name: "E-Commerce Web Engineering",
      relevant_service_url: "/design-services",
      evidence_url: "/evidence/buy-secondhand-book",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 7. Rule 7: Enterprise Custom Platform Architecture Scope
  {
    id: "RULE-07-ENTERPRISE-PLATFORM",
    name: "Enterprise Custom Architecture Scope",
    priority: 7,
    condition: (ctx) =>
      /\b(custom platform|multi-vendor|marketplace|portal|saas|complex software)\b/i.test(
        (ctx.product || "") + " " + (ctx.current_systems || "") + " " + (ctx.interested_services || "")
      ),
    evaluate: (ctx) => ({
      id: "RULE-07-ENTERPRISE-PLATFORM",
      track: "WEB_REBUILD",
      primary_bottleneck: "Custom Platform Architecture & API Integration",
      verdict_headline: "Building a scalable custom platform requires explicit API boundaries and decoupled architecture.",
      why_this_matters: "Attempting to build complex SaaS or marketplace portals on monolithic website builders creates technical debt and performance bottlenecks.",
      what_we_recommend: "Architect a custom, decoupled platform stack with robust API boundaries, role-based access control, and automated testing.",
      what_we_do_not_recommend: "Do NOT attempt to build a multi-vendor marketplace using generic website templates or visual page builders.",
      suggested_first_action: "Review system architecture blueprint and database schema specifications.",
      relevant_service_name: "Technology Advisory & Platform Architecture",
      relevant_service_url: "/advisory",
      evidence_url: "/evidence/sattvaos",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 8. Rule 8: Search Visibility Barrier (Good Performance, Low SEO)
  {
    id: "RULE-08-POOR-SEO",
    name: "Search Visibility Friction",
    priority: 8,
    condition: (ctx) =>
      ctx.hasWebsite === "yes" &&
      (ctx.performance_score === undefined || ctx.performance_score >= 60) &&
      ctx.seo_score !== undefined &&
      ctx.seo_score > 0 &&
      ctx.seo_score < 50 &&
      !/\b(bank|financial institution|government|vendor proposal|rfp|enterprise contract|due diligence|escrow)\b/i.test(
        (ctx.market || "") + " " + (ctx.product || "") + " " + (ctx.current_systems || "")
      ),
    evaluate: (ctx) => ({
      id: "RULE-08-POOR-SEO",
      track: "SEO_GROWTH",
      primary_bottleneck: "Technical SEO & Search Indexation Friction",
      verdict_headline: `Your website performance is stable (Performance Score: ${ctx.performance_score || 'N/A'}/100), but technical SEO flaws limit your search visibility (SEO Score: ${ctx.seo_score}/100).`,
      why_this_matters: "Missing schema markup, canonical errors, unindexed pages, and weak meta structure can restrict search engines from indexing and ranking your core service pages.",
      what_we_recommend: "Execute a technical SEO audit to fix crawl barriers, implement structured JSON-LD schema, and build search-intent content.",
      what_we_do_not_recommend: "Do NOT rebuild your website. Your performance is solid — focus purely on technical SEO and organic search indexation.",
      suggested_first_action: "Fix indexation errors and implement schema markup across service pages.",
      relevant_service_name: "SEO & Search Visibility",
      relevant_service_url: "/search-automation",
      evidence_url: "/evidence/digixpro",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 9. Rule 9: High-Performance Website (Targeted Refactoring Only)
  {
    id: "RULE-09-HEALTHY-SITE",
    name: "Healthy Website Optimization",
    priority: 9,
    condition: (ctx) =>
      ctx.hasWebsite === "yes" &&
      (ctx.performance_score === undefined || ctx.performance_score >= 70),
    evaluate: (ctx) => ({
      id: "RULE-09-HEALTHY-SITE",
      track: "WEB_OPTIMIZATION",
      primary_bottleneck: "Targeted Refactoring & Micro-Optimization",
      verdict_headline: `Your website foundation is strong (Performance Score: ${ctx.performance_score || 85}/100). A full website rebuild is commercially unjustified.`,
      why_this_matters: "Rebuilding a healthy website wastes development budget. Incremental improvements to messaging, speed, and CTA placement yield faster operational and conversion improvements.",
      what_we_recommend: "Targeted optimization of mobile layout, headline clarity, and conversion elements.",
      what_we_do_not_recommend: "Do NOT invest in a full custom website redesign. Your current technical foundation is healthy.",
      suggested_first_action: "Execute incremental conversion rate optimization.",
      relevant_service_name: "Website Engineering & Optimization",
      relevant_service_url: "/design-services",
      evidence_url: "/evidence/buy-secondhand-book",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 10. Rule 10: Multi-Topic / Unsure Need
  {
    id: "RULE-10-UNSURE-MULTI",
    name: "Multi-Service Scoping",
    priority: 5.5,
    condition: (ctx) =>
      ctx.selectedServices.includes("not_sure") || ctx.selectedServices.length > 3,
    evaluate: (ctx) => ({
      id: "RULE-10-UNSURE-MULTI",
      track: "WEB_OPTIMIZATION",
      primary_bottleneck: "Multi-Service Scoping & Strategic Roadmap Clarity",
      verdict_headline: "When multiple improvements are needed, establishing a phased implementation roadmap prevents budget waste.",
      why_this_matters: "Tackling website design, SEO, and automation simultaneously without staging creates operational chaos and delays launch.",
      what_we_recommend: "Start with a complimentary Systems Audit to prioritize immediate high-impact fixes before scaling.",
      what_we_do_not_recommend: "Do NOT commit to multi-service retainers before defining your Phase 1 core bottleneck.",
      suggested_first_action: "Schedule a 30-minute discovery call to map out a phased service roadmap.",
      relevant_service_name: "Systems Audit & Strategy Roadmap",
      relevant_service_url: "/how-we-work",
      evidence_url: "/evidence/digixpro",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },

  // 11. Rule 11: General Fallback Rule
  {
    id: "RULE-11-DEFAULT-FALLBACK",
    name: "General Systems Fallback",
    priority: 99,
    condition: () => true,
    evaluate: (ctx) => ({
      id: "RULE-11-DEFAULT-FALLBACK",
      track: "WEB_OPTIMIZATION",
      primary_bottleneck: "General Digital Systems Evaluation",
      verdict_headline: "To accelerate business growth, aligning web architecture, search visibility, and workflow automation is essential.",
      why_this_matters: "A cohesive digital system turns passive visitors into predictable sales enquiries.",
      what_we_recommend: "Evaluate website engineering, search visibility, and lead automation workflows.",
      what_we_do_not_recommend: "Do NOT invest in isolated marketing tactics without an integrated lead capture strategy.",
      suggested_first_action: "Explore core service blueprints or schedule a discovery call.",
      relevant_service_name: "Website & Systems Engineering",
      relevant_service_url: "/how-we-work",
      evidence_url: "/evidence/digixpro",
      suggest_discovery_call: true,
      facts: buildFacts(ctx),
      measurements: buildMeasurements(ctx),
    }),
  },
];

function buildFacts(ctx: DiagnosticInputContext) {
  return {
    company: ctx.company || "Your Business",
    has_website: ctx.hasWebsite === "yes",
    current_systems_summary: ctx.current_systems || "Manual operations",
    interested_services_summary: ctx.interested_services || "General engineering",
  };
}

function buildMeasurements(ctx: DiagnosticInputContext) {
  return {
    performance_score: ctx.performance_score,
    seo_score: ctx.seo_score,
    accessibility_score: ctx.accessibility_score,
    findings_count: ctx.findings?.length || 0,
  };
}

export function evaluateDiagnosticMatrix(ctx: DiagnosticInputContext): DiagnosticOutput {
  const sortedRules = [...DIAGNOSTIC_RULES].sort((a, b) => a.priority - b.priority);
  for (const rule of sortedRules) {
    if (rule.condition(ctx)) {
      return rule.evaluate(ctx);
    }
  }
  return DIAGNOSTIC_RULES[DIAGNOSTIC_RULES.length - 1].evaluate(ctx);
}
