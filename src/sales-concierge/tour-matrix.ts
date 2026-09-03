import { RoutingResult, VisitorSessionState } from './semantic-router/types';
import { WHY_EXPLAINABLE_INTENTS, CHALLENGE_INTENTS, identifyActiveDecision } from './semantic-router/workingMemory';
import { DECISION_LABELS, computeInformationGapState, DecisionKey } from './semantic-router/informationGap';
import { buildRecommendation } from './semantic-router/recommendationEngine';
import { OBJECTION_TRADEOFFS, ObjectionKey } from './semantic-router/recommendationEngine';

// PHASE 15: intents whose ACTUALLY-SHOWN text (static or dynamically
// computed) gets persisted per-turn so a later "why?" or assumption
// follow-up can reuse the real text the visitor saw, not just the static
// stepDef default - see the persistence block in resolveTourStep() below.
const WHY_REUSABLE_INTENTS = new Set<string>([...WHY_EXPLAINABLE_INTENTS, ...CHALLENGE_INTENTS]);

const VARIANT_PREFIXES = ['', 'In short: ', "Here's the reasoning behind it: ", ''];

/**
 * PHASE 18 PART 23: applies a deterministic framing prefix based on the
 * variant recorded by responseStrategy.ts's pickResponseVariant() - ONLY
 * when that flag is present (i.e. this turn was reached via the unified
 * "what would you do?" path, not a direct question about the decision,
 * which should read as a fresh answer, not a repeated one). The flag is
 * CONSUMED (deleted) here so it never leaks into a later, unrelated turn
 * that reaches the same intent through a different path. The underlying
 * recommendation text itself is never altered - only what precedes it.
 */
function applyResponseVariant(text: string, session: VisitorSessionState | undefined, flagKey: string): string {
  if (!session) return text;
  const raw = session.collected_context?.[flagKey];
  if (raw === undefined) return text;
  const rest = { ...session.collected_context };
  delete rest[flagKey];
  session.collected_context = rest;
  const variant = Number(raw) % VARIANT_PREFIXES.length;
  const prefix = VARIANT_PREFIXES[variant] || '';
  return prefix ? `${prefix}${text}` : text;
}

export type TourActionType =
  | 'ASK_QUESTION'
  | 'SHOW_SERVICE'
  | 'SHOW_PAGE'
  | 'SHOW_EVIDENCE'
  | 'START_AUDIT'
  | 'BOOK_CONSULTATION'
  | 'HUMAN_HANDOFF'
  | 'CLARIFY'
  | 'COMPLETE';

export interface TourAction {
  action_type: TourActionType;
  label: string;
  url?: string;
  description: string;
  what_to_inspect?: string;
  why_relevant?: string;
  cta_text: string;
}

export interface GuidedTourResponse {
  intent_id: string;
  family_id: string;
  flow_id: string;
  headline_message: string;
  targeted_question?: string;
  suggested_replies?: string[];
  canonical_destination: {
    destination_type: 'CANONICAL_PAGE' | 'EVIDENCE_CASE' | 'AUDIT_INTAKE' | 'CONSULTATION';
    canonical_path: string;
    display_label: string;
    page_purpose: string;
    what_to_inspect: string;
    why_it_matters: string;
    evidence_destinations: Array<{
      label: string;
      url: string;
      what_to_inspect: string;
    }>;
    next_steps: string[];
  };
  tour_actions: TourAction[];
  evidence_destination?: TourAction;
  audit_recommendation?: TourAction;
  consultation_recommendation?: TourAction;
  session_id: string;
}

export interface GuidedTourStepDefinition {
  intent_id: string;
  family_id: string;
  flow_id: string;
  service_name: string;
  canonical_url: string;
  headline_message: string;
  targeted_question: string;
  suggested_replies: string[];
  what_to_inspect: string;
  why_relevant: string;
  evidence_label: string;
  evidence_url: string;
  evidence_inspect: string;
}

// Canonical Guided Website Tour Matrix aligned strictly to Table 1B Source of Truth
export const GUIDED_TOUR_MATRIX: Record<string, GuidedTourStepDefinition> = {
  "INTENT-01-SEO": {
    intent_id: "INTENT-01-SEO",
    family_id: "FAM-01",
    flow_id: "FLOW-01",
    service_name: "SEO & Search Visibility",
    canonical_url: "/search-automation",
    headline_message: "Certainly. SEO is built directly into our core web architecture, ensuring your business ranks on both Google Search and modern AI Search Engines.",
    targeted_question: "Are you looking to improve search rankings for an existing website, or building a new web platform?",
    suggested_replies: ["Existing Website SEO Audit", "New Website SEO Setup", "AI Search (GEO) Optimization"],
    what_to_inspect: "Inspect our AI Search (GEO) indexing framework and local Google Business Profile ranking systems on the Search & Automation page.",
    why_relevant: "Search engine visibility requires technical SEO structure, Schema markups, and fast performance rather than low-quality backlink packages.",
    evidence_label: "Inspect DigiXPro Web Infrastructure Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Observe how static Next.js SSG architecture, Core Web Vitals performance, and automated schema plumbing deliver search rankings."
  },
  "INTENT-01-SEO-NEW": {
    intent_id: "INTENT-01-SEO-NEW",
    family_id: "FAM-01",
    flow_id: "FLOW-01",
    service_name: "SEO-Ready Website Engineering",
    canonical_url: "/search-automation",
    headline_message: "Understood. For a new website platform, we build technical SEO structure, Schema markups, and fast performance directly into the site architecture from day one.",
    targeted_question: "What is your primary search objective for the new platform?",
    suggested_replies: ["Google rankings", "AI Search (GEO) visibility", "Local Google Business Profile", "Technical SEO Architecture"],
    what_to_inspect: "Inspect our Next.js technical SEO setup on the Search & Automation page.",
    why_relevant: "Building technical SEO into a new site from day one delivers 3x faster Google indexing.",
    evidence_label: "Inspect DigiXPro Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review 100/100 Core Web Vitals performance and automated schema plumbing."
  },
  "INTENT-01-SEO-EXISTING": {
    intent_id: "INTENT-01-SEO-EXISTING",
    family_id: "FAM-01",
    flow_id: "FLOW-01",
    service_name: "SEO & Search Visibility Audit",
    canonical_url: "/search-automation",
    headline_message: "Understood. For an existing website, what is your primary search goal?",
    targeted_question: "Select your primary target:",
    suggested_replies: ["Google rankings", "AI Search (GEO) visibility", "Local Google Business Profile", "Fix technical SEO errors"],
    what_to_inspect: "Inspect our technical SEO benchmarks on the Search & Automation page.",
    why_relevant: "Technical SEO optimization improves organic search reach.",
    evidence_label: "Inspect DigiXPro Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "See technical SEO search architecture in action."
  },
  "INTENT-01-SEO-RECOMMEND": {
    intent_id: "INTENT-01-SEO-RECOMMEND",
    family_id: "FAM-01",
    flow_id: "FLOW-01",
    service_name: "SEO Framework Recommendation",
    canonical_url: "/search-automation",
    headline_message: "Got it — improving search rankings and traffic. I suggest inspecting our Search & Automation framework or starting a complimentary Systems Audit.",
    targeted_question: "We build technical SEO structure, Schema markups, and fast performance directly into your site.",
    suggested_replies: ["Explore Search & Automation", "Inspect DigiXPro Case Study", "Request Free Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect our Search & AI Optimization framework on the Search & Automation page.",
    why_relevant: "Technical SEO structure guarantees long-term search engine rankings.",
    evidence_label: "Inspect DigiXPro Search Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Observe verified technical SEO architecture."
  },
  "INTENT-02-WEB": {
    intent_id: "INTENT-02-WEB",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Custom Business Website Design & Development",
    canonical_url: "/design-services",
    headline_message: "Those are closely related, but the right starting point depends on where you are today.",
    targeted_question: "Are you looking to build a new website, redesign an existing website, or improve SEO?",
    suggested_replies: ["Build a new website", "Redesign my existing website", "Improve SEO / AI Search"],
    what_to_inspect: "Inspect our design systems, component architecture, and Next.js performance benchmarks on the Design Services page.",
    why_relevant: "A modern business website must load under 1.5 seconds, be fully mobile responsive, and capture lead context effectively.",
    evidence_label: "Inspect Muktibodh Publishing System Evidence",
    evidence_url: "/evidence/muktibodh",
    evidence_inspect: "Review our custom web application engineering, editorial typography system, and responsive content grid."
  },
  "INTENT-02-WEB-NEW": {
    intent_id: "INTENT-02-WEB-NEW",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Custom Business Website Design & Development",
    canonical_url: "/design-services",
    headline_message: "Excellent. Let's start with the new website requirement.",
    targeted_question: "What are you looking to build?",
    suggested_replies: ["Business / Corporate Website", "E-commerce / Marketplace", "Something More Complex", "Not Sure — Help Me Decide"],
    what_to_inspect: "Inspect our custom business web application engineering framework on the Design Services page.",
    why_relevant: "Engineering a new web application with clean component architecture prevents technical debt and ensures fast load times.",
    evidence_label: "Inspect Muktibodh Web Engineering Evidence",
    evidence_url: "/evidence/muktibodh",
    evidence_inspect: "Review custom web application build evidence."
  },
  "INTENT-02-WEB-REDESIGN": {
    intent_id: "INTENT-02-WEB-REDESIGN",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Website Redesign & SEO-Safe Rebuild",
    canonical_url: "/design-services",
    headline_message: "Understood. For an existing website redesign, we focus on engineering quality, UX conversion, performance, and preserving search rankings.",
    targeted_question: "What is the main driver behind your redesign?",
    suggested_replies: ["Modernize UX & Load Speed", "Improve Lead Conversion", "Tech Stack Migration / Replatforming"],
    what_to_inspect: "Inspect our website redesign and migration methodology on the Design Services page.",
    why_relevant: "Redesigning without technical SEO safeguards risks losing existing Google search authority and rankings.",
    evidence_label: "Inspect BuySecondHandBook SEO-Safe Rebuild Evidence",
    evidence_url: "/evidence/buy-secondhand-book",
    evidence_inspect: "Review how marketplace inventory was replatformed with 100% 301 URL redirect maps and zero search rank loss."
  },
  "INTENT-02-WEB-PURPOSE": {
    intent_id: "INTENT-02-WEB-PURPOSE",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Website Objective & Purpose Diagnostic",
    canonical_url: "/design-services",
    headline_message: "Of course. Let's narrow it down together. What would you primarily want the new website to achieve for your business?",
    targeted_question: "Select your primary business objective:",
    suggested_replies: ["Present my business/services", "Generate more enquiries", "Sell online", "Something more specialised"],
    what_to_inspect: "Inspect our custom web engineering framework on the Design Services page.",
    why_relevant: "Aligning architectural decisions with business goals ensures your web platform drives revenue.",
    evidence_label: "Inspect Muktibodh Web Engineering Evidence",
    evidence_url: "/evidence/muktibodh",
    evidence_inspect: "See how custom UX layout drives lead generation."
  },
  "INTENT-02-WEB-PRESENCE": {
    intent_id: "INTENT-02-WEB-PRESENCE",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Existing Platform Context Diagnostic",
    canonical_url: "/design-services",
    headline_message: "Got it — focusing on generating qualified enquiries and presenting your capabilities effectively.",
    targeted_question: "Do you currently have an existing website or platform, or are you starting completely from scratch?",
    suggested_replies: ["Starting from scratch", "Have an existing website", "Replacing a legacy system"],
    what_to_inspect: "Inspect our platform migration standards on the Design Services page.",
    why_relevant: "Understanding your current digital assets helps plan a smooth technical transition.",
    evidence_label: "Inspect Web Engineering Case Studies",
    evidence_url: "/evidence",
    evidence_inspect: "Browse production outcomes across new builds and platform migrations."
  },
  "INTENT-02-WEB-RECOMMEND": {
    intent_id: "INTENT-02-WEB-RECOMMEND",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Custom Web Engineering",
    canonical_url: "/design-services",
    headline_message: "That gives me a clear picture of what you're building. Based on what you've described, I suggest exploring our Custom Web Engineering approach on the Design Services page.",
    targeted_question: "It shows how we combine high-conversion UX layout, Next.js component architecture, speed performance, and SEO structure from day one.",
    suggested_replies: [],
    what_to_inspect: "Inspect our design systems, component architecture, and Next.js performance benchmarks on the Design Services page.",
    why_relevant: "High-speed custom websites deliver 3x better conversion rates compared to generic low-cost agency templates.",
    evidence_label: "Inspect Custom Web Engineering Framework",
    evidence_url: "/design-services",
    evidence_inspect: "Explore our Next.js design systems and performance standards."
  },
  "INTENT-02-WEB-UNCERTAIN": {
    intent_id: "INTENT-02-WEB-UNCERTAIN",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Web Need Uncertainty Acknowledgment",
    canonical_url: "/design-services",
    headline_message: "That is completely fine — there is no reason to decide on a technical approach before understanding what the website needs to achieve for your business.",
    targeted_question: "To help us narrow this down, what would be your primary business objective — generating more enquiries, presenting your business more effectively, selling online, or something more specialized?",
    suggested_replies: ["Generate more enquiries", "Present my business/services", "Sell online", "Something more specialised"],
    what_to_inspect: "Inspect our design systems, component architecture, and Next.js performance benchmarks on the Design Services page.",
    why_relevant: "Aligning technical scope strictly with business outcomes prevents overspending on unnecessary agency features.",
    evidence_label: "Inspect Custom Web Engineering Framework",
    evidence_url: "/design-services",
    evidence_inspect: "Explore our Next.js design systems and performance standards."
  },
  "INTENT-02-WEB-QUALIFY-EXISTING": {
    intent_id: "INTENT-02-WEB-QUALIFY-EXISTING",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Small Business Enquiry Focus & Scope Qualification",
    canonical_url: "/design-services",
    headline_message: "That is very helpful context. Focusing strictly on generating qualified enquiries while avoiding unnecessary spend is the right way to approach scope.",
    targeted_question: "Before we discuss technical scope — do you already have an existing website that you're considering improving, or would this be a completely new project?",
    suggested_replies: ["We have an existing website", "Starting completely from scratch", "Not sure — help me decide"],
    what_to_inspect: "Inspect our custom business website design framework and conversion optimization models on the Design Services page.",
    why_relevant: "Focusing scope strictly on lead-generation elements avoids paying for unnecessary agency features.",
    evidence_label: "Inspect Custom Web Engineering Framework",
    evidence_url: "/design-services",
    evidence_inspect: "Observe how conversion-focused web architecture drives lead enquiries."
  },
  "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC": {
    intent_id: "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Consultant Recommendation: Establish Bottleneck First",
    canonical_url: "/audit",
    headline_message: "Before deciding on a rebuild or redesign, I recommend first establishing where the current bottleneck is — whether it's UX layout, page load speed, search visibility, or messaging.",
    targeted_question: "Establishing whether your current site is holding back enquiries prevents paying for a full platform rebuild when targeted UX or technical SEO improvements might achieve your goal.",
    suggested_replies: [],
    what_to_inspect: "Inspect our website redesign and technical optimization methodology on the Systems Audit page.",
    why_relevant: "Targeted UX and technical improvements deliver 3x lead growth without full platform replacement cost.",
    evidence_label: "Inspect Systems Audit Framework",
    evidence_url: "/audit",
    evidence_inspect: "Review platform optimization standards."
  },
  "INTENT-02-WEB-REBUILD-UNCERTAIN": {
    intent_id: "INTENT-02-WEB-REBUILD-UNCERTAIN",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Existing Site Rebuild Necessity Assessment",
    canonical_url: "/audit",
    headline_message: "Understood. If you already have a basic website, rebuilding from scratch is often unnecessary if the underlying structure is sound. An independent assessment will clarify whether targeted UX refactoring or technical SEO optimization will achieve your enquiry goals at a fraction of the cost.",
    targeted_question: "Would you like an independent diagnostic assessment of your current website before making any architectural or budget commitments?",
    suggested_replies: [],
    what_to_inspect: "Inspect our website conversion optimization framework on the Systems Audit page.",
    why_relevant: "Independent technical assessment prevents spending budget on unnecessary platform rewrites.",
    evidence_label: "Inspect Systems Audit Framework",
    evidence_url: "/audit",
    evidence_inspect: "See how UX refactoring optimizes lead enquiries."
  },
  "INTENT-02-WEB-DIAGNOSTIC-INTAKE": {
    intent_id: "INTENT-02-WEB-DIAGNOSTIC-INTAKE",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Diagnostic Systems Audit Intake",
    canonical_url: "/audit",
    headline_message: "Yes, absolutely. We can evaluate your live website to determine whether a full Next.js rebuild, an aesthetic redesign, or targeted UX and technical SEO optimization is the right scope for your goals.",
    targeted_question: "You can submit your website domain for a complimentary Systems Audit to get empirical performance, SEO, and conversion data before deciding on development budget.",
    suggested_replies: [],
    what_to_inspect: "Submit your domain URL on the Audit page for an empirical assessment of page speed, SEO schema, and UX conversion bottlenecks.",
    why_relevant: "An independent audit gives you empirical data before committing budget to web development.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a complimentary diagnostic audit report."
  },
  "INTENT-DECISION-SUMMARY": {
    intent_id: "INTENT-DECISION-SUMMARY",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Explicit Decision & Context Summary",
    canonical_url: "/audit",
    headline_message: "Based on our conversation: You have an active digital requirement focused on qualified lead enquiries, and you want to prioritize empirical diagnosis and high-ROI implementation before committing unnecessary budget.",
    targeted_question: "Would you like to initiate a complimentary Systems Audit to verify your performance, SEO, and conversion bottlenecks?",
    suggested_replies: ["Start Complimentary Systems Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect sample diagnostic report deliverables on the Systems Audit page.",
    why_relevant: "Empirical diagnosis ensures your budget is allocated strictly to high-ROI conversion fixes.",
    evidence_label: "Start Free Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Review Core Web Vitals, SEO metrics, and UX conversion scans."
  },
  "INTENT-02-NAV-DESIGN": {
    intent_id: "INTENT-02-NAV-DESIGN",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Design Services Navigation",
    canonical_url: "/design-services",
    headline_message: "Navigating to Design Services. You can inspect our web engineering framework, design systems, and speed benchmarks below.",
    targeted_question: "Let me know if you'd like to inspect real case study evidence or start a diagnostic audit.",
    suggested_replies: ["Inspect Web Case Studies", "Request Free Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect our Next.js component architecture, speed benchmarks, and design systems on the Design Services page.",
    why_relevant: "Engineering a fast, SEO-ready website guarantees performance under peak traffic.",
    evidence_label: "Inspect Production Evidence Vault",
    evidence_url: "/evidence",
    evidence_inspect: "Explore production case studies across custom web engineering."
  },
  "INTENT-01-SEO-NEW-WEB": {
    intent_id: "INTENT-01-SEO-NEW-WEB",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "SEO-Ready Web Engineering Integration",
    canonical_url: "/design-services",
    headline_message: "Website engineering and SEO should be considered together from day one so that technical SEO, Schema markups, and URL routing are built directly into the Next.js component architecture from launch.",
    targeted_question: "To help us guide the scope, what type of website are you planning — a corporate business site, an e-commerce platform, or a custom web application?",
    suggested_replies: ["Business / Corporate Website", "E-commerce / Marketplace", "Something more complex"],
    what_to_inspect: "Inspect our SEO-ready Next.js component architecture and performance benchmarks on the Design Services page.",
    why_relevant: "Building technical SEO into component architecture from day one prevents expensive post-launch refactoring.",
    evidence_label: "Inspect Custom Web Engineering Framework",
    evidence_url: "/design-services",
    evidence_inspect: "Review our Next.js SEO and performance standards."
  },
  "INTENT-02-WEB-PLATFORM": {
    intent_id: "INTENT-02-WEB-PLATFORM",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Complex Custom Platform Engineering",
    canonical_url: "/design-services",
    headline_message: "For custom web platforms requiring user accounts, complex workflows, and API integrations, we engineer custom Next.js web applications tailored strictly to your business operations.",
    targeted_question: "Inspect our web application architecture, component design systems, and speed benchmarks on the Design Services page.",
    suggested_replies: [],
    what_to_inspect: "Inspect our custom web application engineering architecture on the Design Services page.",
    why_relevant: "Custom Next.js web applications deliver 3x better performance and security compared to generic template CMS builds.",
    evidence_label: "Inspect SattvaOS Technical Platform Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review SattvaOS custom platform architecture and user account workflows."
  },
  "INTENT-03-AUTO-NAV": {
    intent_id: "INTENT-03-AUTO-NAV",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Search & Automation Navigation",
    canonical_url: "/search-automation",
    headline_message: "Navigating to Search & Automation. You can inspect our technical SEO compliance standards, AI Search Optimization frameworks, and n8n workflow diagrams below.",
    targeted_question: "Let me know if you'd like to inspect production case studies or request a diagnostic audit.",
    suggested_replies: [],
    what_to_inspect: "Inspect our SEO architecture and n8n automation pipelines on the Search & Automation page.",
    why_relevant: "Technical SEO and automated lead capture drive organic traffic growth.",
    evidence_label: "Inspect Search & Automation Framework",
    evidence_url: "/search-automation",
    evidence_inspect: "Explore search and automation capabilities."
  },
  "INTENT-03-AUTO": {
    intent_id: "INTENT-03-AUTO",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Workflow & AI Automation",
    canonical_url: "/search-automation",
    headline_message: "We replace manual data entry with self-hosted n8n automation pipelines, AI sales concierges, and CRM pipeline sync.",
    targeted_question: "Which process would you like to automate first — lead capture & CRM sync, automated follow-ups, or custom API integrations?",
    suggested_replies: ["Lead Capture & CRM Sync", "Automated WhatsApp Follow-ups", "Custom API & Webhook Pipelines"],
    what_to_inspect: "Inspect our n8n workflow architecture diagrams and AI Concierge pipelines on the Search & Automation page.",
    why_relevant: "Automating lead qualification reduces response times from hours to under 30 seconds, dramatically increasing lead conversion rates.",
    evidence_label: "Inspect DigiXPro Automation Infrastructure Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Examine our zero-maintenance n8n workflow engine powering instant lead capture and CRM pipeline routing."
  },
  "INTENT-03-AUTO-CRM": {
    intent_id: "INTENT-03-AUTO-CRM",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Lead Capture, CRM & Sales Automation",
    canonical_url: "/search-automation",
    headline_message: "Got it — lead capture and CRM pipeline synchronization. Which CRM or lead platform are you currently using?",
    targeted_question: "Select your current setup:",
    suggested_replies: ["HubSpot / Salesforce", "Custom / Notion / Google Sheets", "Planning a new CRM setup"],
    what_to_inspect: "Inspect our n8n integration architecture on the Search & Automation page.",
    why_relevant: "Syncing leads instantly increases conversion rates.",
    evidence_label: "Inspect DigiXPro Automation Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review zero-maintenance n8n workflows."
  },
  "INTENT-03-AUTO-RECOMMEND": {
    intent_id: "INTENT-03-AUTO-RECOMMEND",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Workflow & AI Automation Recommendation",
    canonical_url: "/search-automation",
    headline_message: "That gives me a clear picture. We build self-hosted n8n workflows that sync leads to your CRM in under 30 seconds with zero recurring SaaS fees.",
    targeted_question: "Explore our workflow architecture diagrams and AI Concierge pipelines on the Search & Automation page.",
    suggested_replies: ["Explore Automation Page", "Inspect Automation Evidence", "Book 30-Min Call"],
    what_to_inspect: "Inspect n8n automation pipelines on the Search & Automation page.",
    why_relevant: "Self-hosted workflows save thousands in monthly SaaS subscriptions.",
    evidence_label: "Inspect DigiXPro Automation Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Observe automated lead capture pipelines."
  },
  "INTENT-04-CTO": {
    intent_id: "INTENT-04-CTO",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Fractional CTO & Technology Leadership",
    canonical_url: "/advisory",
    headline_message: "We provide unbiased, fractional CTO leadership, tech stack evaluation, software architecture governance, and vendor auditing.",
    targeted_question: "What stage is your project at — evaluating vendors before building, auditing an ongoing software build, or planning a full tech roadmap?",
    suggested_replies: ["Vendor Proposal Evaluation", "Software Code & Architecture Audit", "Fractional CTO Strategy"],
    what_to_inspect: "Inspect our advisory methodology, vendor evaluation framework, and governance models on the Advisory page.",
    why_relevant: "Independent CTO oversight prevents expensive tech stack mistakes, vendor lock-in, and bloated software budgets.",
    evidence_label: "Inspect DigiXPro Technology Advisory Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review hands-on enterprise software architecture governance credentials."
  },
  "INTENT-04-ADVISORY-DIRECT": {
    intent_id: "INTENT-04-ADVISORY-DIRECT",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Independent Technology Advisory & Vendor Due Diligence",
    canonical_url: "/advisory",
    headline_message: "We provide unbiased fractional CTO leadership, software due diligence, architecture governance, and independent vendor proposal auditing.",
    targeted_question: "Inspect our vendor proposal auditing framework and technology governance models on the Advisory page.",
    suggested_replies: ["Vendor Proposal Evaluation", "Software Code & Architecture Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect our vendor proposal auditing framework and technology governance models on the Advisory page.",
    why_relevant: "Independent technical due diligence protects your software investment from vendor lock-in, licensing pitfalls, and overscoped pricing.",
    evidence_label: "Inspect SattvaOS Enterprise Due Diligence Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review SattvaOS multi-tenant architecture and security due diligence verification."
  },
  "INTENT-04-CTO-STAGE": {
    intent_id: "INTENT-04-CTO-STAGE",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Technology Due Diligence & Vendor Evaluation",
    canonical_url: "/advisory",
    headline_message: "Understood. When evaluating a vendor proposal or software architecture, what would you most like an independent view on?",
    targeted_question: "Select your primary evaluation priority:",
    suggested_replies: ["Technical quality & architecture", "Whether the proposal is fairly scoped", "Vendor capability & delivery risk", "All of the above"],
    what_to_inspect: "Inspect our vendor proposal auditing framework on the Advisory page.",
    why_relevant: "Independent evaluation identifies hidden technical debt and overscoped pricing.",
    evidence_label: "Inspect SattvaOS Vendor Due Diligence Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review SattvaOS multi-tenant architecture and security due diligence verification."
  },
  "INTENT-04-CTO-PRIORITY": {
    intent_id: "INTENT-04-CTO-PRIORITY",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Technology Due Diligence Timeline",
    canonical_url: "/advisory",
    headline_message: "Got it — assessing technical architecture and code quality before commitment.",
    targeted_question: "At what point in your timeline do you need this evaluation completed?",
    suggested_replies: ["Before signing the vendor", "Within the next 2 weeks", "Currently in active build"],
    what_to_inspect: "Inspect our advisory timelines on the Advisory page.",
    why_relevant: "Timely technical review prevents signing contractual commitments with wrong vendors.",
    evidence_label: "Inspect SattvaOS Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review technical architecture verification."
  },
  "INTENT-04-CTO-RECOMMEND": {
    intent_id: "INTENT-04-CTO-RECOMMEND",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Independent Advisory Recommendation",
    canonical_url: "/advisory",
    headline_message: "That gives me clear context. Based on your evaluation stage, I suggest inspecting our Independent Advisory Framework and Founder Credentials on the Advisory page.",
    targeted_question: "It details our hands-on experience evaluating enterprise software proposals and vendor contracts.",
    suggested_replies: ["Explore Advisory Page", "Meet Technical Leadership", "Book 30-Min Call"],
    what_to_inspect: "Inspect our Advisory framework on the Advisory page.",
    why_relevant: "Independent CTO oversight guarantees unbiased technical decision making.",
    evidence_label: "Inspect SattvaOS Technical Advisory Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review SattvaOS vendor due diligence and architecture governance."
  },
  "INTENT-04-NAV-ADVISORY": {
    intent_id: "INTENT-04-NAV-ADVISORY",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Technology Advisory Navigation",
    canonical_url: "/advisory",
    headline_message: "Navigating to Technology Advisory. You can inspect our vendor evaluation framework and CTO strategy standards below.",
    targeted_question: "Let me know if you'd like to inspect Founder credentials or book a 30-minute Architecture Call.",
    suggested_replies: ["Meet Technical Leadership", "Book 30-Min Call"],
    what_to_inspect: "Inspect our tech stack evaluation framework on the Advisory page.",
    why_relevant: "Avoid expensive software mistakes with senior CTO guidance.",
    evidence_label: "Inspect DigiXPro Advisory Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "See enterprise advisory credentials."
  },
  "INTENT-06-AUDIT-WHY": {
    intent_id: "INTENT-06-AUDIT-WHY",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Why Audit First Consultative Explanation",
    canonical_url: "/audit",
    headline_message: "An audit first is essential because it replaces guesswork with empirical data. Rather than spending budget on a full platform rebuild, a diagnostic scan isolates whether your current bottleneck is page speed, mobile UX layout, search schema, or messaging — allowing you to fix only what is actually holding back enquiries.",
    targeted_question: "You can submit your domain URL on our Audit page to receive an empirical diagnostic report before committing any development budget.",
    suggested_replies: [],
    what_to_inspect: "Inspect sample diagnostic report metrics and Core Web Vitals audit criteria on the Audit page.",
    why_relevant: "Empirical diagnostic data prevents paying for unnecessary platform rewrites.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a diagnostic audit report."
  },
  "INTENT-04-CTO-VENDOR-DIFF": {
    intent_id: "INTENT-04-CTO-VENDOR-DIFF",
    family_id: "FAM-04",
    flow_id: "FLOW-01",
    service_name: "Independent CTO vs Vendor Bias Explanation",
    canonical_url: "/advisory",
    headline_message: "Software vendors naturally have a commercial incentive to recommend their proprietary stack or sell maximum billable development hours. An independent CTO assessment evaluates vendor proposals, code quality, architecture assumptions, and security standards with zero commercial bias.",
    targeted_question: "Inspect our Technology Advisory framework and vendor evaluation standards on the Advisory page.",
    suggested_replies: [],
    what_to_inspect: "Inspect our vendor proposal evaluation framework on the Advisory page.",
    why_relevant: "Unbiased technical oversight protects your software investment from vendor lock-in.",
    evidence_label: "Inspect SattvaOS Technical Platform Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review SattvaOS architecture governance case study."
  },
  "INTENT-01-SEO-BUILTIN": {
    intent_id: "INTENT-01-SEO-BUILTIN",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Built-In SEO Architecture Explanation",
    canonical_url: "/design-services",
    headline_message: "Yes, absolutely. Building technical SEO into the Next.js component architecture from day one ensures that static page generation, structured JSON-LD Schema markups, canonical headers, and sub-second page loads are live at launch — preventing expensive post-launch SEO refactoring.",
    targeted_question: "Inspect our SEO-ready Next.js component architecture on the Design Services page.",
    suggested_replies: [],
    what_to_inspect: "Inspect Next.js component SEO architecture on the Design Services page.",
    why_relevant: "Integrating technical SEO into code components guarantees search indexation.",
    evidence_label: "Inspect Custom Web Engineering Framework",
    evidence_url: "/design-services",
    evidence_inspect: "Explore Next.js SEO and speed standards."
  },
  "INTENT-PAGE-EXPLAIN-AUDIT": {
    intent_id: "INTENT-PAGE-EXPLAIN-AUDIT",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Page Continuity: Systems Audit Explanation",
    canonical_url: "/audit",
    headline_message: "You are on the Systems Audit page. Based on your goal to avoid unnecessary rebuild costs, this page lets you submit your site URL for an empirical diagnostic report across mobile speed, Core Web Vitals, UX conversion layout, and structural SEO before committing any development budget.",
    targeted_question: "Submit your domain URL above to receive an empirical audit report.",
    suggested_replies: [],
    what_to_inspect: "Inspect sample diagnostic report metrics and Core Web Vitals audit criteria on the Audit page.",
    why_relevant: "Empirical diagnostic data prevents paying for unnecessary platform rewrites.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a diagnostic audit report."
  },
  "INTENT-07-EVIDENCE-PUBLISHING": {
    intent_id: "INTENT-07-EVIDENCE-PUBLISHING",
    family_id: "FAM-07",
    flow_id: "FLOW-05",
    service_name: "Evidence Filter: Publishing & Editorial Case Study",
    canonical_url: "/evidence/muktibodh",
    headline_message: "Here is our production case study for custom editorial and publishing systems: Muktibodh Adhyatmik E-Magazine & Knowledge System.",
    targeted_question: "Inspect the Muktibodh Adhyatmik E-Magazine case study below.",
    suggested_replies: [],
    what_to_inspect: "Review Muktibodh editorial architecture, digital publishing layout, and content delivery metrics.",
    why_relevant: "Muktibodh demonstrates custom digital publishing and structured knowledge systems.",
    evidence_label: "Inspect Muktibodh Editorial Case Study",
    evidence_url: "/evidence/muktibodh",
    evidence_inspect: "Review Muktibodh publishing system case study."
  },
  "INTENT-06-AUDIT-HONEST": {
    intent_id: "INTENT-06-AUDIT-HONEST",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Independent Diagnostic Honesty Guarantee",
    canonical_url: "/audit",
    headline_message: "Yes, absolutely. Our diagnostic audit model is completely independent. If an audit reveals that your existing website foundation is solid and targeted SEO or UX layout adjustments will solve your lead bottleneck, we will explicitly tell you that a new website is unnecessary.",
    targeted_question: "You can submit your domain URL on our Audit page to receive an empirical diagnostic report before committing any development budget.",
    suggested_replies: [],
    what_to_inspect: "Inspect sample diagnostic report metrics and Core Web Vitals audit criteria on the Audit page.",
    why_relevant: "Empirical diagnostic data prevents paying for unnecessary platform rewrites.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a diagnostic audit report."
  },
  "INTENT-01-SEO-NOTRAFFIC": {
    intent_id: "INTENT-01-SEO-NOTRAFFIC",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Search Visibility & Indexation Diagnosis",
    canonical_url: "/search-automation",
    headline_message: "When you get almost no Google traffic, the primary bottleneck is search visibility, missing Schema markups, or technical indexation issues. We recommend starting with a technical SEO & search visibility diagnosis to isolate why Google isn't indexing your pages.",
    targeted_question: "Inspect our SEO architecture and AI Search Optimization frameworks on the Search & Automation page.",
    suggested_replies: [],
    what_to_inspect: "Inspect technical SEO standards and Schema markups on the Search & Automation page.",
    why_relevant: "Resolving technical indexation bottlenecks restores search visibility.",
    evidence_label: "Explore Search & Automation Framework",
    evidence_url: "/search-automation",
    evidence_inspect: "Explore search and automation capabilities."
  },
  "INTENT-03-AUTO-INTEGRATE": {
    intent_id: "INTENT-03-AUTO-INTEGRATE",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Automation Integration Explanation",
    canonical_url: "/search-automation",
    headline_message: "Yes. Once your website and SEO foundation are established, we connect self-hosted n8n automation workflows to capture inbound lead enquiries instantly and sync them to your CRM in under 30 seconds.",
    targeted_question: "Inspect our n8n automation pipeline architecture on the Search & Automation page.",
    suggested_replies: [],
    what_to_inspect: "Inspect n8n workflow diagrams on the Search & Automation page.",
    why_relevant: "Automated lead routing eliminates manual data entry and increases lead conversion rates.",
    evidence_label: "Explore Search & Automation Framework",
    evidence_url: "/search-automation",
    evidence_inspect: "Explore search and automation capabilities."
  },
  "INTENT-02-CONSULTANT-DIRECT": {
    intent_id: "INTENT-02-CONSULTANT-DIRECT",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Direct Senior Consultant Recommendation",
    canonical_url: "/audit",
    headline_message: "If this were my business, I would not commission a platform rebuild or sign a vendor contract yet. Given what you've described — an existing site, limited budget, and uncertainty around visibility vs conversion — I would first run an empirical Systems Audit to isolate the exact bottleneck so you pay only for what actually moves the needle.",
    targeted_question: "You can submit your domain URL on our Audit page to receive an empirical diagnostic report before committing any development budget.",
    suggested_replies: [],
    what_to_inspect: "Inspect sample diagnostic report metrics and Core Web Vitals audit criteria on the Audit page.",
    why_relevant: "Empirical diagnostic data prevents paying for unnecessary platform rewrites.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a diagnostic audit report."
  },
  "INTENT-02-WEB-QUALIFY-CONVERSION": {
    intent_id: "INTENT-02-WEB-QUALIFY-CONVERSION",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Traffic vs Conversion Bottleneck Qualification",
    canonical_url: "/audit",
    headline_message: "Not necessarily. If you already get decent Google traffic but visitors aren't contacting you, the primary bottleneck is conversion UX layout, call-to-action placement, mobile page speed, or messaging — not search visibility. Driving more traffic to a page that doesn't convert won't solve the enquiry problem.",
    targeted_question: "To isolate whether your bottleneck is conversion UX or messaging, we recommend running a diagnostic Systems Audit first.",
    suggested_replies: [],
    what_to_inspect: "Inspect conversion UX diagnostic criteria on the Audit page.",
    why_relevant: "Fixing conversion bottlenecks delivers immediate lead growth from existing traffic.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a diagnostic audit report."
  },
  "INTENT-02-WEB-REBUILD-VERIFY": {
    intent_id: "INTENT-02-WEB-REBUILD-VERIFY",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Developer Rebuild Claim Verification",
    canonical_url: "/audit",
    headline_message: "Rather than accepting a developer rebuild recommendation blindly, we evaluate empirical criteria first: mobile page load speed benchmarks, UX conversion layout, code security, and structural SEO. If your existing platform foundation is solid, targeted UX or SEO refactoring is far more cost-effective than an expensive complete rewrite.",
    targeted_question: "You can submit your site for an empirical audit to determine whether a rebuild is actually justified.",
    suggested_replies: [],
    what_to_inspect: "Inspect our audit criteria for rebuild vs redesign determinations on the Audit page.",
    why_relevant: "Empirical verification prevents wasting budget on unnecessary developer rewrites.",
    evidence_label: "Start Complimentary Systems Audit",
    evidence_url: "/audit",
    evidence_inspect: "Submit your domain URL for a diagnostic audit report."
  },
  "INTENT-02-WEB-NONTECH": {
    intent_id: "INTENT-02-WEB-NONTECH",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Non-Technical Client Outcome Orientation",
    canonical_url: "/design-services",
    headline_message: "That is the right perspective. Technology choices should serve your business goals, not create unnecessary complexity. What matters most for bringing in customers is clear messaging, fast page load speeds on mobile phones, and a straightforward enquiry flow.",
    targeted_question: "Inspect our high-conversion website design standards on the Design Services page.",
    suggested_replies: [],
    what_to_inspect: "Inspect design systems and mobile conversion layouts on the Design Services page.",
    why_relevant: "Focusing on customer acquisition delivers real ROI without technical complexity.",
    evidence_label: "Inspect Custom Web Engineering Framework",
    evidence_url: "/design-services",
    evidence_inspect: "Explore Next.js design systems and performance standards."
  },
  // PHASE 24: canonical_url now points to /pricing (the canonical public
  // pricing page, src/data/pricing.ts-backed) instead of /how-we-work - the
  // Concierge still never states a number itself (unchanged, deliberate
  // safety), but now consistently routes a pricing question to the SAME
  // canonical source /pricing displays, rather than a page that doesn't
  // discuss investment at all. evidence_url stays /audit - still the
  // correct "get an exact, scoped number" destination.
  "INTENT-05-PRICE": {
    intent_id: "INTENT-05-PRICE",
    family_id: "FAM-05",
    flow_id: "FLOW-06",
    service_name: "Scope-Based Investment & Commercial Qualification",
    canonical_url: "/pricing",
    headline_message: "At DigiXPro, investment depends strictly on project scope — specifically whether you require a completely new web build, a redesign of an existing site, targeted technical optimization, or workflow automation.",
    targeted_question: "Rather than guessing an arbitrary package price, we recommend first checking indicative ranges on our Pricing page or getting a diagnostic audit so you pay only for what your platform actually needs.",
    suggested_replies: ["View Pricing & Investment Guide", "Explore Diagnostic Audit Scope"],
    what_to_inspect: "Inspect indicative investment ranges by service on the Pricing & Investment Guide.",
    why_relevant: "A diagnostic audit ensures you pay only for what your platform actually needs, avoiding bloated agency retainers.",
    evidence_label: "Inspect Diagnostic Systems Audit Intake",
    evidence_url: "/audit",
    evidence_inspect: "Start a complimentary Systems Audit to receive an exact diagnostic report and itemized scope breakdown."
  },
  "INTENT-13-MULTI-SERVICE": {
    intent_id: "INTENT-13-MULTI-SERVICE",
    family_id: "FAM-13",
    flow_id: "FLOW-01",
    service_name: "Multi-Service Visitor Prioritization",
    canonical_url: "/how-we-work",
    headline_message: "Those capabilities work together effectively. To give you the right technical recommendation, I'd like to establish the primary constraint first.",
    targeted_question: "Is your immediate priority getting a high-conversion website built, increasing search visibility, or automating what happens after a lead arrives?",
    suggested_replies: ["New website build first", "SEO & search visibility first", "Both simultaneously"],
    what_to_inspect: "Inspect our multi-discipline delivery methodology on the How We Work page.",
    why_relevant: "Prioritizing the primary bottleneck first delivers immediate ROI before expanding scope.",
    evidence_label: "Explore How We Work Engagement Model",
    evidence_url: "/how-we-work",
    evidence_inspect: "See how we combine web engineering, SEO, and automation."
  },
  "INTENT-07-EVIDENCE-REDESIGN": {
    intent_id: "INTENT-07-EVIDENCE-REDESIGN",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "Website Redesign Production Evidence",
    canonical_url: "/evidence/buy-secondhand-book",
    headline_message: "There's a relevant production example I'd suggest looking at because it demonstrates platform redesign and structural SEO refactoring.",
    targeted_question: "Inspect how BuySecondHandBook achieved 3x lead growth through Next.js refactoring with zero search rank loss.",
    suggested_replies: [],
    what_to_inspect: "Inspect BuySecondHandBook redesign metrics on the Evidence page.",
    why_relevant: "Demonstrates platform migration and redesign without search penalty.",
    evidence_label: "Inspect BuySecondHandBook Case Study",
    evidence_url: "/evidence/buy-secondhand-book",
    evidence_inspect: "Review live performance and conversion metrics."
  },
  "INTENT-07-EVIDENCE-SMALLBIZ": {
    intent_id: "INTENT-07-EVIDENCE-SMALLBIZ",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "Small Business Lead Growth Production Evidence",
    canonical_url: "/evidence/dr-aggarwal",
    headline_message: "There's a relevant production example I'd suggest looking at because it demonstrates small business lead growth and local service UX layout.",
    targeted_question: "Inspect how Dr. Aggarwal Physio Centre tripled qualified lead enquiries through targeted local UX architecture.",
    suggested_replies: [],
    what_to_inspect: "Inspect Dr. Aggarwal lead conversion metrics on the Evidence page.",
    why_relevant: "Demonstrates lead-generation UX for small service businesses.",
    evidence_label: "Inspect Dr. Aggarwal Case Study",
    evidence_url: "/evidence/dr-aggarwal",
    evidence_inspect: "Review local service lead conversion metrics."
  },
  "INTENT-06-AUDIT-INTAKE": {
    intent_id: "INTENT-06-AUDIT-INTAKE",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Diagnostic Systems Review & Site Audit",
    canonical_url: "/audit",
    headline_message: "A DigiXPro Systems Audit evaluates technical SEO, page load speed, conversion UX, and code security.",
    targeted_question: "Please provide your website URL so our diagnostic scanner can inspect your platform.",
    suggested_replies: ["Enter Website URL", "Check Audit Scope & Deliverables"],
    what_to_inspect: "Inspect the Audit Deliverable checklist and sample diagnostic findings on our Audit page.",
    why_relevant: "Our diagnostic audit identifies the exact technical issues holding back your website search rankings and sales conversions.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "Review what technical metrics, Core Web Vitals, and SEO issues are analyzed during a Systems Audit."
  },
  "INTENT-06-AUDIT-INFO": {
    intent_id: "INTENT-06-AUDIT-INFO",
    family_id: "FAM-06",
    flow_id: "FLOW-02",
    service_name: "Systems Audit Information & Scope",
    canonical_url: "/audit",
    headline_message: "A DigiXPro Systems Audit is an independent diagnostic assessment of your website's technical health, SEO setup, performance bottlenecks, and UX design.",
    targeted_question: "Would you like to start a complimentary audit for your website today?",
    suggested_replies: ["Start Free Website Audit", "Learn How Audit Works"],
    what_to_inspect: "Inspect the Audit Process breakdown on the Audit page.",
    why_relevant: "Auditing before building ensures your budget is focused on real performance improvements rather than cosmetic redesigns.",
    evidence_label: "Explore How We Work Engagement Model",
    evidence_url: "/how-we-work",
    evidence_inspect: "See how our audit findings transition seamlessly into custom engineering deliverables."
  },
  "INTENT-07-EVIDENCE": {
    intent_id: "INTENT-07-EVIDENCE",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "Verified Production Evidence & Case Studies",
    canonical_url: "/evidence",
    headline_message: "Here we showcase real production code, live website benchmarks, and verified customer case studies from our client engagements.",
    targeted_question: "Which type of evidence would you like to inspect — SEO growth, custom web engineering, healthcare platforms, or workflow automation?",
    suggested_replies: ["SEO & Traffic Growth Case Studies", "Web Application Production Evidence", "Healthcare & Medical Case Studies"],
    what_to_inspect: "Inspect our verified case studies, live Lighthouse scores, and customer outcomes on the Evidence page.",
    why_relevant: "Real production evidence proves technical capability far better than marketing promises.",
    evidence_label: "Inspect DigiXPro Platform Production Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review how we engineered static Next.js web output, automated schema, and n8n lead webhooks."
  },
  "INTENT-07-EVIDENCE-CTO": {
    intent_id: "INTENT-07-EVIDENCE-CTO",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "Technology Advisory Production Evidence",
    canonical_url: "/evidence/sattvaos",
    headline_message: "Here is our SattvaOS Technical Platform Case Study demonstrating enterprise architecture due diligence, vendor evaluation, and code quality governance.",
    targeted_question: "Review how SattvaOS evaluated vendor architecture, security assumptions, and custom platform components before deployment.",
    suggested_replies: [],
    what_to_inspect: "Inspect SattvaOS architecture governance metrics on the Evidence page.",
    why_relevant: "Demonstrates independent technology due diligence and vendor evaluation standards.",
    evidence_label: "Inspect SattvaOS Case Study",
    evidence_url: "/evidence/sattvaos",
    evidence_inspect: "Review live architecture governance metrics."
  },
  "INTENT-07-EVIDENCE-SEO": {
    intent_id: "INTENT-07-EVIDENCE-SEO",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "SEO Growth Production Evidence",
    canonical_url: "/evidence/digixpro",
    headline_message: "Here is our DigiXPro SEO & Search Architecture Evidence.",
    targeted_question: "It details how technical SEO structure, Schema markups, and sub-second page performance drive search visibility.",
    suggested_replies: ["Inspect DigiXPro Case Study", "View Web Application Evidence", "View All Case Studies"],
    what_to_inspect: "Inspect the DigiXPro SEO & Search Architecture case study on our Evidence page.",
    why_relevant: "Demonstrates empirical search ranking growth through technical SEO compliance.",
    evidence_label: "Inspect DigiXPro SEO Case Study",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Observe sub-second static page performance and schema markups."
  },
  "INTENT-07-EVIDENCE-WEB": {
    intent_id: "INTENT-07-EVIDENCE-WEB",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "Web Engineering Production Evidence",
    canonical_url: "/evidence/muktibodh",
    headline_message: "Here is our Muktibodh Publishing System Web Engineering Evidence.",
    targeted_question: "Review our custom Next.js web application engineering, editorial typography system, and responsive content grid.",
    suggested_replies: ["Inspect Muktibodh Case Study", "View SEO Growth Case Study", "View All Case Studies"],
    what_to_inspect: "Inspect our custom Next.js web engineering evidence.",
    why_relevant: "Proves Next.js performance benchmarks and custom web design systems.",
    evidence_label: "Inspect Muktibodh Web Evidence",
    evidence_url: "/evidence/muktibodh",
    evidence_inspect: "Review live editorial web platform build."
  },
  "INTENT-08-BOOKING": {
    intent_id: "INTENT-08-BOOKING",
    family_id: "FAM-08",
    flow_id: "FLOW-05",
    service_name: "30-Minute Architecture Consultation",
    canonical_url: "/contact",
    headline_message: "If you have a clear picture of what you're trying to solve, the next useful step is a 30-Minute Architecture Call to discuss the right approach and scope.",
    targeted_question: "Select your preferred topic for the 30-minute consultation call.",
    suggested_replies: ["Web Engineering & Redesign", "SEO & Growth Strategy", "Advisory & Tech Architecture"],
    what_to_inspect: "Inspect our Contact page options to reserve your preferred consultation slot.",
    why_relevant: "Direct 1-on-1 discussion with a technical architect gives you clarity on timeline, tech stack, and execution roadmap.",
    evidence_label: "Meet Our Technical Leadership",
    evidence_url: "/founder",
    evidence_inspect: "Learn more about the technical strategist leading your Architecture Call."
  },
  "INTENT-08-HANDOFF": {
    intent_id: "INTENT-08-HANDOFF",
    family_id: "FAM-08",
    flow_id: "FLOW-05",
    service_name: "Direct Founder & Human Agent Handoff",
    canonical_url: "/contact",
    headline_message: "Connecting you directly with a DigiXPro senior specialist. Please provide your contact details for an immediate callback or message.",
    targeted_question: "What is the best phone number or email address for our senior specialist to contact you?",
    suggested_replies: ["Provide Contact Info", "Book 30-Min Call Instead"],
    what_to_inspect: "Inspect direct contact options and office locations on our Contact page.",
    why_relevant: "Immediate human handoff connects you with an expert who can address urgent custom software inquiries.",
    evidence_label: "Inspect Founder Profile",
    evidence_url: "/founder",
    evidence_inspect: "See who you will be speaking with."
  },
  "INTENT-09-OBJECTION": {
    intent_id: "INTENT-09-OBJECTION",
    family_id: "FAM-09",
    flow_id: "FLOW-07",
    service_name: "Quality & Value Qualification",
    canonical_url: "/how-we-work",
    headline_message: "Budget efficiency is critical. Low-cost templates or inexperienced agencies often deliver broken code, zero SEO structure, and slow loading speeds that cost more to fix later.",
    targeted_question: "Would you like to see how our engineering approach protects your investment long-term?",
    suggested_replies: ["See How We Work", "Request Website Diagnostic Audit"],
    what_to_inspect: "Inspect our Code Quality Standards and Maintenance Guarantees on the How We Work page.",
    why_relevant: "Proper web engineering prevents security vulnerabilities, site crashes, and expensive redesigns within 6 months.",
    evidence_label: "Inspect Production Evidence Vault",
    evidence_url: "/evidence",
    evidence_inspect: "Compare our production quality against low-cost agency templates."
  },
  "INTENT-10-GREETING": {
    intent_id: "INTENT-10-GREETING",
    family_id: "FAM-10",
    flow_id: "FLOW-01",
    service_name: "DigiXPro Concierge",
    canonical_url: "/",
    headline_message: "Hello, welcome to DigiXPro. I’m DigiXPro Concierge. DigiXPro brings production experience dating back to 2016, with independently verified client feedback across multiple professional freelance platforms — checkable by anyone who looks.",
    targeted_question: "I can help guide you across our three primary service disciplines:\n1. Technology Advisory\n2. Website Design & Web Engineering\n3. Search, AI & Automation\n\nWhere would you like to begin?",
    suggested_replies: ["1. Technology Advisory", "2. Website Design & Web Engineering", "3. Search, AI & Automation"],
    what_to_inspect: "Explore our main service overview on the DigiXPro homepage.",
    why_relevant: "DigiXPro brings production experience dating back to 2016, with independently verified client feedback across multiple professional freelance platforms — checkable by anyone who looks.",
    evidence_label: "Explore Evidence Vault",
    evidence_url: "/evidence",
    evidence_inspect: "View verified outcomes from our client engagements."
  },
  "INTENT-11-MULTI": {
    intent_id: "INTENT-11-MULTI",
    family_id: "FAM-11",
    flow_id: "FLOW-06",
    service_name: "Multi-Service Clarification & Journey Customization",
    canonical_url: "/search-automation",
    headline_message: "It looks like you are evaluating multiple capabilities (such as Web Engineering alongside SEO or Automation). We build integrated digital platforms.",
    targeted_question: "Which capability is your HIGHEST PRIORITY right now?",
    suggested_replies: ["Website First, then SEO", "SEO & Traffic Growth First", "Full Web + SEO + Automation Package"],
    what_to_inspect: "Inspect our combined Search & Automation capabilities on the Search & Automation page.",
    why_relevant: "Combining web engineering with technical SEO from day one delivers 3x faster lead generation.",
    evidence_label: "Inspect Integrated Digital Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "See how we combine web design, SEO, and automation into a unified growth engine."
  },
  "INTENT-12-VALUEPROP": {
    intent_id: "INTENT-12-VALUEPROP",
    family_id: "FAM-12",
    flow_id: "FLOW-02",
    service_name: "DigiXPro Core Value Proposition & Capabilities",
    canonical_url: "/how-we-work",
    headline_message: "DigiXPro is an independent web engineering, technical SEO, and technology advisory firm. DigiXPro brings production experience dating back to 2016, with independently verified client feedback across multiple professional freelance platforms — checkable by anyone who looks.",
    targeted_question: "Which core service area would you like to explore first?",
    suggested_replies: ["Web Engineering (/design-services)", "SEO & Growth (/search-automation)", "Tech Advisory (/advisory)", "Free Systems Audit (/audit)"],
    what_to_inspect: "Inspect our core philosophy and engagement standards on the How We Work page.",
    why_relevant: "DigiXPro brings production experience dating back to 2016, with independently verified client feedback across multiple professional freelance platforms — checkable by anyone who looks.",
    evidence_label: "Inspect Verified Outcomes",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies across e-commerce, healthcare, and corporate platforms."
  },
  "INTENT-PAGE-CONTEXT": {
    intent_id: "INTENT-PAGE-CONTEXT",
    family_id: "FAM-12",
    flow_id: "FLOW-02",
    service_name: "Page-Aware Context Guidance",
    canonical_url: "/search-automation",
    headline_message: "You’re on the Search & Automation page. Since you’re exploring SEO for a new website, start with the SEO / AI Search section and look at how technical structure, schema and search visibility are incorporated into the platform. If you'd like to see how this translates into a production outcome, the DigiXPro search evidence is the next useful stop.",
    targeted_question: "Let me know if you'd like to inspect the DigiXPro case study evidence or request a complimentary website audit.",
    suggested_replies: ["Inspect DigiXPro Case Study", "Request Free Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect AI Search indexing framework and n8n workflow diagrams on the Search & Automation page.",
    why_relevant: "Combines technical SEO with lead automation.",
    evidence_label: "Inspect DigiXPro Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review sub-second static page performance and schema markups."
  },
  "INTENT-PAGE-EXPLAIN": {
    intent_id: "INTENT-PAGE-EXPLAIN",
    family_id: "FAM-12",
    flow_id: "FLOW-02",
    service_name: "Canonical Page Explanation",
    canonical_url: "/",
    headline_message: "This page presents DigiXPro capabilities and service frameworks.",
    targeted_question: "What would you like to inspect next?",
    suggested_replies: ["Explore Services", "Request Free Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect service overview and production evidence.",
    why_relevant: "Provides clarity on digital architecture and engineering capabilities.",
    evidence_label: "Inspect Evidence Library",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies."
  },

  // =========================================================================
  // PHASE 10: DEEP CONVERSATIONAL INTELLIGENCE - response definitions for
  // natural interruptions, objections and follow-ups now routed by precedence.ts
  // instead of falling through to the generic clarify fallback.
  // =========================================================================

  "INTENT-CREDIBILITY-TEAM": {
    intent_id: "INTENT-CREDIBILITY-TEAM",
    family_id: "FAM-10",
    flow_id: "FLOW-01",
    service_name: "Founder & Team Credibility",
    canonical_url: "/founder",
    headline_message: "DigiXPro's engineering and technology advisory work is led by Dr. Ajay Shukla, with production experience dating back to 2016 across independently verifiable client engagements.",
    targeted_question: "Would you like to see the founder's background, or go straight to production evidence?",
    suggested_replies: ["See Founder Background", "Inspect Case Studies", "Explore Services"],
    what_to_inspect: "Inspect the founder's track record and technical background on the Founder page.",
    why_relevant: "Knowing who is actually accountable for the engineering work matters before committing budget.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Review verified client case studies and production outcomes."
  },
  "INTENT-TECH-STACK": {
    intent_id: "INTENT-TECH-STACK",
    family_id: "FAM-12",
    flow_id: "FLOW-02",
    service_name: "Technology Stack",
    canonical_url: "/design-services",
    headline_message: "Custom Next.js and React, not WordPress templates - built for sub-second load speed, technical SEO, and long-term maintainability.",
    targeted_question: "Would you like to see this in a live production platform?",
    suggested_replies: ["Inspect Production Evidence", "Explore Design Services"],
    what_to_inspect: "Inspect the Next.js architecture and Core Web Vitals performance on a live case study.",
    why_relevant: "The underlying platform choice affects speed, security, and how easily the site can be extended later.",
    evidence_label: "Inspect DigiXPro Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review the live Next.js static architecture and performance benchmarks."
  },
  "INTENT-06-AUDIT-OBJECTION": {
    intent_id: "INTENT-06-AUDIT-OBJECTION",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Audit Necessity - Reasoned Response",
    canonical_url: "/audit",
    headline_message: "Fair - if you already know exactly what needs to change, an audit may not add much value. It's most useful when you're still unsure whether the real problem is SEO, conversion, UX, or the underlying system.",
    targeted_question: "Is there something specific you already believe is the issue, or is that still the open question?",
    suggested_replies: ["I know the specific issue", "Still not sure what's wrong", "Talk to a Strategist"],
    what_to_inspect: "If you already know the issue, we can go straight to scoping it - no audit required.",
    why_relevant: "Forcing a diagnostic step nobody needs just adds friction.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks, in case it's still useful."
  },
  "INTENT-ALREADY-SEEN": {
    intent_id: "INTENT-ALREADY-SEEN",
    family_id: "FAM-07",
    flow_id: "FLOW-03",
    service_name: "Already-Seen Evidence - Move Forward",
    canonical_url: "/audit",
    headline_message: "Right - no need to look at that again.",
    targeted_question: "Based on what you've shared, the next useful step is usually a quick Diagnostic Audit or a direct scope conversation. Which is more useful right now?",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call", "Ask something else"],
    what_to_inspect: "Submit your domain for a technical audit of performance, SEO structure, and UX bottlenecks.",
    why_relevant: "Once you've seen the evidence, the next useful thing is a decision, not another case study.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See what a Systems Audit actually checks."
  },
  // PHASE 24: canonical_url -> /pricing, same reasoning as INTENT-05-PRICE.
  "INTENT-05-PRICE-NEGOTIATION": {
    intent_id: "INTENT-05-PRICE-NEGOTIATION",
    family_id: "FAM-05",
    flow_id: "FLOW-06",
    service_name: "Pricing Negotiation - Scope-Based, Not Quote-Matching",
    canonical_url: "/pricing",
    headline_message: "We don't price-match, because the number isn't the variable that matters - the scope is. A ₹80,000 template site and a custom-engineered platform solve different problems, so the fair comparison is what each actually includes.",
    targeted_question: "Would it help to see what's actually driving cost - scope, platform, or ongoing maintenance?",
    suggested_replies: ["Explore Diagnostic Audit Scope", "Discuss Custom Web Scope"],
    what_to_inspect: "Inspect the Engagement Model and Deliverable Framework on the How We Work page.",
    why_relevant: "Matching a price without matching scope usually means matching corners cut, not value.",
    evidence_label: "Inspect Diagnostic Systems Audit Intake",
    evidence_url: "/audit",
    evidence_inspect: "Start a complimentary Systems Audit to get an exact, itemized scope breakdown."
  },
  "INTENT-TIMELINE": {
    intent_id: "INTENT-TIMELINE",
    family_id: "FAM-05",
    flow_id: "FLOW-06",
    service_name: "Timeline - Scope-Dependent",
    canonical_url: "/how-we-work",
    headline_message: "Timeline depends on the same thing budget does - scope. A landing page and a custom platform with automation don't run on the same clock.",
    targeted_question: "Once the scope is clear (from a quick audit or a call), we can give you a real, project-specific timeline instead of a generic estimate.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect our engagement milestones on the How We Work page.",
    why_relevant: "A timeline given before scope is fixed is usually wrong in one direction or the other.",
    evidence_label: "Inspect Engagement Model",
    evidence_url: "/how-we-work",
    evidence_inspect: "Review how DigiXPro structures milestone-based delivery."
  },
  "INTENT-CONTRADICTION-ECOMMERCE": {
    intent_id: "INTENT-CONTRADICTION-ECOMMERCE",
    family_id: "FAM-02",
    flow_id: "FLOW-06",
    service_name: "Ecommerce Scope Confirmation",
    canonical_url: "/design-services",
    headline_message: "That sounds closer to an ecommerce setup than a simple brochure site.",
    targeted_question: "Are customers expected to browse products and complete purchases online?",
    suggested_replies: ["Yes, full online purchase", "No, just enquiries"],
    what_to_inspect: "A product catalogue with payments is a materially different build than a presentation site.",
    why_relevant: "Getting the actual scope right up front avoids planning for the wrong architecture.",
    evidence_label: "Inspect E-commerce Case Study",
    evidence_url: "/evidence/buy-secondhand-book",
    evidence_inspect: "Review a production catalogue-and-checkout platform."
  },
  "INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION": {
    intent_id: "INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION",
    family_id: "FAM-02",
    flow_id: "FLOW-06",
    service_name: "Staged Ecommerce-to-Marketplace Architecture",
    canonical_url: "/design-services",
    headline_message: "Yes - that can be planned as a staged architecture. I'd first make the core catalogue, payments and order flow solid, while keeping the structure ready for a later marketplace layer (multiple sellers, vendor accounts) rather than building that complexity in from day one.",
    targeted_question: "Would you like to see how that kind of staged build looks in production?",
    suggested_replies: ["Inspect E-commerce Case Study", "Discuss Custom Web Scope"],
    what_to_inspect: "Inspect how a single-seller catalogue was engineered to allow later platform evolution.",
    why_relevant: "Building marketplace complexity before you need it usually slows down the part that matters now - getting the core store live.",
    evidence_label: "Inspect E-commerce Case Study",
    evidence_url: "/evidence/buy-secondhand-book",
    evidence_inspect: "Review the catalogue, search indexation, and checkout architecture."
  },
  "INTENT-ECOMMERCE-SCOPE-ACK": {
    intent_id: "INTENT-ECOMMERCE-SCOPE-ACK",
    family_id: "FAM-02",
    flow_id: "FLOW-06",
    service_name: "Ecommerce Scope Acknowledgment",
    canonical_url: "/design-services",
    headline_message: "Noted.",
    targeted_question: "At that scale, the priority is usually getting the catalogue, search/filtering, and checkout flow solid first. Is there anything else about the build that's a hard requirement - marketplace features, specific payment gateways, subscriptions?",
    suggested_replies: ["That's everything for now", "One more requirement"],
    what_to_inspect: "Inspect a comparable production catalogue on the E-commerce case study.",
    why_relevant: "Confirming hard requirements up front avoids re-architecting later.",
    evidence_label: "Inspect E-commerce Case Study",
    evidence_url: "/evidence/buy-secondhand-book",
    evidence_inspect: "Review catalogue browsing, search indexation, and checkout metrics at production scale."
  },

  // =========================================================================
  // PHASE 11: CONSULTATIVE ENGAGEMENT - skepticism, uncertainty, high-intent
  // and problem-reveal responses discovered missing via real conversation
  // testing (see Phase 11 report). Same discipline as Phase 10: only facts
  // already in canonicalRegistry.ts, no invented claims.
  // =========================================================================

  "INTENT-SKEPTICISM-WHY-DIGIXPRO": {
    intent_id: "INTENT-SKEPTICISM-WHY-DIGIXPRO",
    family_id: "FAM-12",
    flow_id: "FLOW-02",
    service_name: "Why DigiXPro / Why Not a Freelancer",
    canonical_url: "/how-we-work",
    headline_message: "Fair question. If the requirement is genuinely simple, a freelancer or a large architecture process may be unnecessary - I wouldn't pretend otherwise.",
    targeted_question: "Where this becomes more useful is when the website is tied to growth, automation, search visibility, integrations, or a system that needs to evolve - that's where production engineering and long-term maintainability start to matter more than the upfront price.",
    suggested_replies: ["See What DigiXPro Delivers", "Inspect Production Evidence"],
    what_to_inspect: "Inspect the engagement model and what's actually delivered, on the How We Work page.",
    why_relevant: "A fair comparison depends on what the project actually needs, not a blanket claim either way.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Review verified production outcomes rather than a marketing claim."
  },
  "INTENT-DONT-KNOW": {
    intent_id: "INTENT-DONT-KNOW",
    family_id: "FAM-02",
    flow_id: "FLOW-01",
    service_name: "Uncertainty Recovery",
    canonical_url: "/how-we-work",
    headline_message: "That's fine - let's narrow it down from the business problem rather than the technology.",
    targeted_question: "What's hurting more right now: getting people to the site, getting them to enquire, or managing what happens after they enquire?",
    suggested_replies: ["Getting people to the site", "Getting them to enquire", "Managing what happens after"],
    what_to_inspect: "Once the actual bottleneck is clear, the right service follows from that - not the other way round.",
    why_relevant: "Starting from the business problem avoids guessing at a technical fix for the wrong issue.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "See how similar problems were diagnosed and addressed in production."
  },
  "INTENT-NOT-INTERESTED": {
    intent_id: "INTENT-NOT-INTERESTED",
    family_id: "FAM-12",
    flow_id: "FLOW-01",
    service_name: "Graceful De-escalation",
    canonical_url: "/",
    headline_message: "No problem at all.",
    targeted_question: "If anything changes, the Evidence and How We Work pages are there whenever you want to look - no pressure either way.",
    suggested_replies: ["Explore Services", "Inspect Production Evidence"],
    what_to_inspect: "Browse at your own pace, whenever it's useful.",
    why_relevant: "There's no value in pushing a conversation the visitor doesn't want.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies whenever useful."
  },
  "INTENT-HIGH-INTENT": {
    intent_id: "INTENT-HIGH-INTENT",
    family_id: "FAM-08",
    flow_id: "FLOW-05",
    service_name: "High-Intent Fast Track",
    canonical_url: "/contact",
    headline_message: "Understood - at this point another chatbot question isn't going to add much value.",
    targeted_question: "A 30-minute Architecture Call with the senior technology side is the right next step: bring the actual requirement, constraints and questions, and we can work through the scope directly.",
    suggested_replies: ["Book 30-Min Call", "Talk to a Strategist"],
    what_to_inspect: "Come with whatever context you already have - a brief, a proposal, or just the requirement as you understand it.",
    why_relevant: "You already have enough clarity that a real conversation is more useful than more discovery.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Review relevant production work before the call if useful."
  },
  "INTENT-TRAFFIC-CONFIRMED": {
    intent_id: "INTENT-TRAFFIC-CONFIRMED",
    family_id: "FAM-01",
    flow_id: "FLOW-01",
    service_name: "Traffic Confirmed - Set Up Conversion Question",
    canonical_url: "/search-automation",
    headline_message: "Good - then I'd be careful about assuming more SEO is the fix.",
    targeted_question: "If visitors are already arriving, the more useful question is what happens once they land: are they contacting you, or mostly just browsing?",
    suggested_replies: ["Mostly just browsing", "Some contact, but not enough", "Hardly anyone contacts us"],
    what_to_inspect: "The answer to that changes whether the fix is visibility or conversion.",
    why_relevant: "Buying more traffic into a site that doesn't convert just means more people leaving without enquiring.",
    evidence_label: "Inspect DigiXPro Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review technical SEO and conversion-relevant architecture together."
  },
  "INTENT-SEO-CONVERSION-INSIGHT": {
    intent_id: "INTENT-SEO-CONVERSION-INSIGHT",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "SEO vs Conversion - Problem Reveal",
    canonical_url: "/audit",
    headline_message: "That confirms it - if people are already finding the site but not enquiring, the bottleneck almost certainly isn't search visibility. Buying more SEO at this point would just send more traffic into the same leak.",
    targeted_question: "A Systems Audit is the right tool here - it looks at conversion UX, page speed, and technical structure together, so we're fixing the actual bottleneck rather than guessing.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Submit your domain for a technical audit of performance, conversion UX, and SEO structure.",
    why_relevant: "Diagnosing before spending avoids paying for more of what isn't the problem.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE": {
    intent_id: "INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Consultant Moment - Ecommerce Scope + Conversion Synthesis",
    canonical_url: "/audit",
    // Placeholder headline - overridden dynamically in resolveTourStep() with the
    // actual product_count, so this default is only used if that field is
    // somehow missing (defensive fallback, should not normally be seen).
    headline_message: "Let me put the picture together: you have an existing website and a product catalogue in mind, but enquiries are the weak point - not traffic or the build itself.",
    targeted_question: "So I wouldn't start by selling you a new website. I'd first establish where the conversion bottleneck actually is - that's exactly where the Audit becomes useful.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Submit your domain for a technical audit of performance, conversion UX, and SEO structure.",
    why_relevant: "Rebuilding a site that isn't actually the problem wastes budget on the wrong fix.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },

  // =========================================================================
  // PHASE 12: CONVERSATIONAL COGNITION - reference resolution, correction
  // recovery, and user-control signals discovered missing via real
  // conversation testing (see Phase 12 report).
  // =========================================================================

  // PHASE 24: canonical_url -> /pricing, same reasoning as INTENT-05-PRICE.
  "INTENT-05-PRICE-WHY": {
    intent_id: "INTENT-05-PRICE-WHY",
    family_id: "FAM-05",
    flow_id: "FLOW-06",
    service_name: "Why Pricing Works This Way",
    canonical_url: "/pricing",
    headline_message: "Because a number without scope is either wrong or meaningless - too low and it hides missing work, too high and you're overpaying for things you don't need.",
    targeted_question: "The Audit exists specifically to establish that scope quickly, so the number you eventually get is tied to your actual requirement.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Inspect the Engagement Model on the How We Work page.",
    why_relevant: "Explains the reasoning behind the pricing approach rather than repeating the policy.",
    evidence_label: "Inspect Diagnostic Systems Audit Intake",
    evidence_url: "/audit",
    evidence_inspect: "Start a complimentary Systems Audit to get an itemized scope breakdown."
  },
  "INTENT-CORRECTION-RECOVERY": {
    intent_id: "INTENT-CORRECTION-RECOVERY",
    family_id: "FAM-12",
    flow_id: "FLOW-01",
    service_name: "Conversational Correction Recovery",
    canonical_url: "/how-we-work",
    headline_message: "Understood - let's go with that instead.",
    targeted_question: "What would be most useful to look at first?",
    suggested_replies: ["Explore Services", "Inspect Production Evidence", "Talk to a Strategist"],
    what_to_inspect: "Starting fresh from what you actually meant, not the earlier assumption.",
    why_relevant: "Correcting course quickly avoids wasting the visitor's time on the wrong track.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies relevant to your actual need."
  },
  "INTENT-START-OVER": {
    intent_id: "INTENT-START-OVER",
    family_id: "FAM-12",
    flow_id: "FLOW-01",
    service_name: "Conversation Reset",
    canonical_url: "/",
    headline_message: "Sure - starting fresh.",
    targeted_question: "What are you trying to build, fix, or improve?",
    suggested_replies: ["Build a website", "SEO / AI Search", "Technical / CTO", "Not sure"],
    what_to_inspect: "A clean slate, no assumptions carried over from before.",
    why_relevant: "Sometimes the fastest way forward is a genuine restart rather than untangling the previous thread.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies whenever useful."
  },
  "INTENT-PLATFORM-OBJECTION": {
    intent_id: "INTENT-PLATFORM-OBJECTION",
    family_id: "FAM-02",
    flow_id: "FLOW-06",
    service_name: "Platform Choice - Direct Answer",
    canonical_url: "/design-services",
    headline_message: "No - we build custom Next.js, not Shopify or WordPress templates. That's a deliberate choice: templates cap performance, SEO structure, and how far the site can evolve later.",
    targeted_question: "If a template-based store already covers what you need, it may genuinely be the more sensible choice - that's worth being honest about upfront. Is your requirement likely to stay simple, or grow into something more custom?",
    suggested_replies: ["Likely to stay simple", "Likely to grow", "Inspect Production Evidence"],
    what_to_inspect: "Inspect the Next.js architecture on a live production case study.",
    why_relevant: "The platform choice should match how far the requirement is actually expected to go.",
    evidence_label: "Inspect DigiXPro Platform Evidence",
    evidence_url: "/evidence/digixpro",
    evidence_inspect: "Review the live Next.js static architecture and performance benchmarks."
  },
  "INTENT-06-AUDIT-OBJECTION-RECOMMENDATION": {
    intent_id: "INTENT-06-AUDIT-OBJECTION-RECOMMENDATION",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Direct Recommendation Despite Audit Objection",
    canonical_url: "/design-services",
    // PHASE 21 (Part 4 fact/assumption safety): this branch can fire before
    // ANY traffic/enquiry fact is established (the audit-objection override
    // in resolveRecommendationRequest checks only the objection itself, not
    // isConversionBottleneckProfile) - so it must not claim "traffic already
    // fine and enquiries weak" as something the visitor told us. The dynamic
    // override just below (direct_recommendation_reason === 'conversion_bottleneck')
    // already handles the case where traffic really is an established fact.
    headline_message: "Fair - since you'd rather skip the audit, here's the direct answer: I'd look at the conversion path first - page layout, load speed, and what happens right after someone lands - before touching SEO or a rebuild.",
    targeted_question: "That's still a diagnostic question, just one you can reason through yourself if you'd rather not run the scan. If you want a second opinion on it, the Audit does that in a few minutes; otherwise a 30-minute call can cover the same ground directly.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "The conversion path itself: layout, load speed, and the first few seconds after landing.",
    why_relevant: "Respects the objection while still giving a real, usable recommendation instead of repeating the audit pitch.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Review a comparable conversion-focused case study."
  },

  // =========================================================================
  // PHASE 14: DECISION INTELLIGENCE - future-requirement tracking/supersession,
  // and the rebuild-vs-improve / audit-reasoning decision boundaries exercised
  // by the mandatory conversation (see the Phase 14 report).
  // =========================================================================

  "INTENT-FUTURE-REQUIREMENT-NOTED": {
    intent_id: "INTENT-FUTURE-REQUIREMENT-NOTED",
    family_id: "FAM-12",
    flow_id: "FLOW-01",
    service_name: "Future Requirement Noted",
    canonical_url: "/how-we-work",
    headline_message: "Noted for later - no need to plan that in right now.",
    targeted_question: "Is there anything about the immediate build that's still open?",
    suggested_replies: ["That's everything for now", "One more thing"],
    what_to_inspect: "Keeping future scope separate from the current build avoids paying for complexity before it's needed.",
    why_relevant: "A requirement flagged for later still gets remembered - it just doesn't shape today's build.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies whenever useful."
  },
  "INTENT-REQUIREMENT-SUPERSEDED": {
    intent_id: "INTENT-REQUIREMENT-SUPERSEDED",
    family_id: "FAM-12",
    flow_id: "FLOW-01",
    service_name: "Requirement Retracted",
    canonical_url: "/how-we-work",
    headline_message: "Understood - dropping that from scope.",
    targeted_question: "Does that change anything else about what you need?",
    suggested_replies: ["No, that's the only change", "Yes, one more thing"],
    what_to_inspect: "Scope now reflects the retraction, not the earlier mention.",
    why_relevant: "Carrying a retracted requirement forward would misshape the recommendation.",
    evidence_label: "Inspect Production Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "Browse verified case studies whenever useful."
  },
  "INTENT-REBUILD-VS-IMPROVE": {
    intent_id: "INTENT-REBUILD-VS-IMPROVE",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Rebuild vs Improve - Decision Boundary",
    canonical_url: "/audit",
    // Overridden dynamically in resolveTourStep() based on what's actually
    // established (conversion-bottleneck profile vs genuinely unknown) - see
    // the Phase 14 report. This default covers the unknown-profile case.
    headline_message: "Not necessarily. There are two sensible paths here: improve the current site, or rebuild it. The deciding factor isn't preference, it's whether the existing system can actually support what you need - technically and structurally.",
    targeted_question: "Right now I don't have enough to tell which side of that line you're on.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Whether the current platform can support the required changes without structural limitations.",
    why_relevant: "Rebuilding when the existing system could be improved wastes budget; improving when the system is genuinely limiting wastes time.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-AUDIT-REASONING": {
    intent_id: "INTENT-AUDIT-REASONING",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Direct Audit Recommendation With Reasoning",
    canonical_url: "/audit",
    // Overridden dynamically based on diagnostic_uncertainty - see resolveTourStep().
    headline_message: "In your case, yes - the root problem isn't confirmed yet, and there's more than one thing it could be. That's exactly the situation an Audit is for.",
    targeted_question: "If the bottleneck were already obvious, I wouldn't recommend spending time on a diagnostic step.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Submit your domain for a technical audit of performance, conversion UX, and SEO structure.",
    why_relevant: "Recommending a diagnostic step only when the diagnosis is actually uncertain keeps the advice honest.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-TECHNICAL-CONSTRAINT-CONFIRMED": {
    // PHASE 16: reached when the visitor resolves the REBUILD_VS_IMPROVE
    // decision's technical_constraint gap ("the current platform is
    // completely limiting us") - see informationGap.ts's Part 12. The
    // recommendation flips because the deciding fact is now known, not
    // because a new phrase was pattern-matched.
    intent_id: "INTENT-TECHNICAL-CONSTRAINT-CONFIRMED",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Rebuild vs Improve - Resolved by Confirmed Technical Constraint",
    canonical_url: "/audit",
    headline_message: "That changes things. A structurally limiting platform is the exact fact this decision turns on - if the current system genuinely can't support what you need, improving around it just delays the same problem. I'd lean toward a rebuild.",
    targeted_question: "Want that confirmed through a quick diagnostic audit first, or go straight to scoping the rebuild?",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Whether the current platform's limitations are structural (justifying a rebuild) or fixable within the existing system.",
    why_relevant: "A confirmed technical constraint is the one fact that reliably justifies a rebuild over an improve - everything else is a refinement, not this decision.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-TRAFFIC-DECLINE-UPDATE": {
    // PHASE 16: reached when the visitor contradicts a previously-recorded
    // healthy-traffic fact ("actually traffic has dropped badly") - see
    // informationGap.ts's Part 13. This acknowledges the superseded fact
    // rather than silently continuing to reason from the stale one.
    intent_id: "INTENT-TRAFFIC-DECLINE-UPDATE",
    family_id: "FAM-03",
    flow_id: "FLOW-01",
    service_name: "Traffic Fact Updated - Visibility Diagnosis",
    canonical_url: "/seo",
    headline_message: "Got it - that changes the picture. If traffic itself is now dropping, this isn't a conversion question anymore, it's back to visibility - a different problem than the one we were just discussing.",
    targeted_question: "Has this been a recent, sudden drop, or a gradual decline over time?",
    suggested_replies: ["Start Diagnostic Audit", "Talk to a Strategist"],
    what_to_inspect: "Whether the drop is indexation/ranking-related or a broader visibility issue.",
    why_relevant: "Reasoning from a corrected fact instead of the stale one avoids recommending a conversion fix for what may now be a visibility problem.",
    evidence_label: "Inspect Sample SEO Audit Report",
    evidence_url: "/seo",
    evidence_inspect: "See how a technical SEO audit diagnoses a traffic drop."
  },
  "INTENT-WHAT-NEXT-RESOLVED": {
    // PHASE 17 PART 1/5/6: reached when "what next?" (or any of its
    // equivalent phrasings) finds an ACTIVE decision whose status is
    // RESOLVED (informationGap.ts) - nothing decision-changing is left
    // worth asking, so the honest next step is the recommendation + an
    // appropriate action, not another generic diagnostic question. This
    // default covers the case where the source intent has no persisted
    // shown_text to reuse (see the dynamic override in resolveTourStep()).
    intent_id: "INTENT-WHAT-NEXT-RESOLVED",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Next Step - Decision Resolved",
    canonical_url: "/audit",
    headline_message: "Based on everything you've told me, the picture is clear enough to act on rather than ask another clarifying question.",
    targeted_question: "The sensible next step is either a quick diagnostic Audit to confirm it, or a 30-minute call to scope it directly - whichever you'd rather do.",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "Whichever next step matches how much certainty you want before committing.",
    why_relevant: "Once a decision is sufficiently resolved, offering another clarifying question just stalls the conversation - the honest next step is action, not more discovery.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-TOPIC-SWITCH-ECOMMERCE": {
    // PHASE 17 PART 8: a dormant future/secondary ecommerce requirement was
    // just explicitly promoted to the active topic by the visitor's own
    // words ("let's focus on the marketplace now") - see precedence.ts.
    intent_id: "INTENT-TOPIC-SWITCH-ECOMMERCE",
    family_id: "FAM-02",
    flow_id: "FLOW-02",
    service_name: "Ecommerce - Promoted From Future Requirement",
    canonical_url: "/design-services/custom-business-website-design",
    headline_message: "Sure - let's make that the focus now instead of a later add-on.",
    targeted_question: "Roughly how many products, and is this a new build or something to add to an existing site?",
    suggested_replies: ["Around 100 products", "Around 500 products", "Existing website"],
    what_to_inspect: "Catalogue size, payment/vendor integrations, and platform complexity - the facts that actually shape an ecommerce build.",
    why_relevant: "Once a requirement is the active topic rather than a deferred one, the same ecommerce scoping questions apply as if it had been the first thing mentioned.",
    evidence_label: "Inspect Ecommerce Evidence",
    evidence_url: "/evidence",
    evidence_inspect: "See a comparable ecommerce build."
  },
  "INTENT-WHAT-WOULD-CHANGE-MIND": {
    // PHASE 18 PART 16: a genuinely new capability - "what would change
    // your recommendation?" had no answer at all before this phase. Text
    // is dynamically built from the active decision's Recommendation.
    // whatWouldChange (recommendationEngine.ts) in resolveTourStep() below.
    intent_id: "INTENT-WHAT-WOULD-CHANGE-MIND",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "What Would Change The Recommendation",
    canonical_url: "/audit",
    headline_message: "That depends on which decision you mean - once we've established a recommendation together, I can tell you exactly what would change it.",
    targeted_question: "What are you weighing right now - a rebuild vs improve question, or whether an Audit is worth it?",
    suggested_replies: ["Rebuild vs improve", "Is an audit worth it?", "Start Diagnostic Audit"],
    what_to_inspect: "The specific fact that would flip the current recommendation.",
    why_relevant: "A recommendation that can't say what would change it isn't really reasoned - it's just an opinion.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-WHY-CONTEXTUAL": {
    intent_id: "INTENT-WHY-CONTEXTUAL",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Generalized Why - Reuses the Last Recommendation's Own Reasoning",
    canonical_url: "/audit",
    // Always overridden dynamically in resolveTourStep() - see the
    // why_target lookup there. This default is only used if that lookup
    // somehow finds nothing (defensive fallback, should not normally be seen).
    headline_message: "That's the reasoning behind what I just said.",
    targeted_question: "",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "The same facts already established this conversation.",
    why_relevant: "Explains the immediately preceding recommendation rather than defaulting to an unrelated audit pitch.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  },
  "INTENT-ASSUMPTION-FOLLOWUP": {
    intent_id: "INTENT-ASSUMPTION-FOLLOWUP",
    family_id: "FAM-06",
    flow_id: "FLOW-04",
    service_name: "Assumption Follow-Up - Reuses a Recent Challenge's Reasoning",
    canonical_url: "/audit",
    // Always overridden dynamically in resolveTourStep() - see the
    // assumption_challenge_target lookup there. Defensive fallback only.
    headline_message: "That's understandable, given what you originally came in asking about.",
    targeted_question: "",
    suggested_replies: ["Start Diagnostic Audit", "Book 30-Min Call"],
    what_to_inspect: "The reasoning already given a moment ago, restated against the original assumption.",
    why_relevant: "Acknowledges the original assumption while keeping the conversation anchored to what's actually been established.",
    evidence_label: "Inspect Sample Diagnostic Audit Report",
    evidence_url: "/audit",
    evidence_inspect: "See exactly what a Systems Audit checks."
  }
};

export class GuidedTourEngine {
  public resolveTourStep(routingResult: RoutingResult, session?: VisitorSessionState): GuidedTourResponse {
    const intentId = routingResult.candidate_intent || "INTENT-12-VALUEPROP";
    const currentPage = routingResult.current_page || session?.current_page || "/";
    let stepDef = GUIDED_TOUR_MATRIX[intentId] || GUIDED_TOUR_MATRIX["INTENT-12-VALUEPROP"];

    // Page Explanation or Page Context Overrides (Strictly based on actual currentPage)
    if (intentId === "INTENT-PAGE-EXPLAIN" || intentId === "INTENT-PAGE-CONTEXT") {
      if (currentPage.startsWith("/advisory")) {
        const isDirectEntry = !session || session.previous_states?.length === 0;
        stepDef = {
          ...stepDef,
          intent_id: intentId === "INTENT-PAGE-EXPLAIN" ? "INTENT-PAGE-EXPLAIN" : "INTENT-PAGE-CONTEXT",
          service_name: "Technology Advisory & Vendor Governance",
          canonical_url: "/advisory",
          headline_message: isDirectEntry
            ? "You are on the Advisory page. This page details DigiXPro's independent technology advisory, software due diligence, vendor proposal auditing, and Fractional CTO leadership."
            : "You are on the Advisory page. Based on your evaluation of vendor proposals and technology strategy, look specifically at our Vendor Proposal Auditing framework, Code Quality Due Diligence standards, and Fractional CTO governance models below.",
          targeted_question: "Would you like to inspect Founder technical credentials, or schedule a 30-Minute Architecture Call?",
          suggested_replies: ["Meet Technical Leadership", "Inspect Code Quality Audit", "Book 30-Min Call"],
          what_to_inspect: "Inspect our Vendor Proposal Auditing framework and Code Quality Due Diligence standards on the Advisory page.",
          why_relevant: "Provides unbiased technical oversight to prevent vendor lock-in.",
          evidence_label: "Inspect SattvaOS Vendor Due Diligence Case Study",
          evidence_url: "/evidence/sattvaos",
          evidence_inspect: "Review SattvaOS multi-tenant architecture and security due diligence verification."
        };
      } else if (currentPage.startsWith("/design-services")) {
        const isSmallBiz = session?.business_type === 'small_business' || session?.commercial_sensitivity === 'avoid_unnecessary_scope' || session?.collected_context?.seo_goal === 'conversions' || session?.collected_context?.existing_quality === 'conversion';
        const isDirectEntry = !session || (!session.primary_intent && !session.business_type && (!session.journey_history || session.journey_history.length === 0));
        stepDef = {
          ...stepDef,
          intent_id: intentId === "INTENT-PAGE-EXPLAIN" ? "INTENT-PAGE-EXPLAIN" : "INTENT-PAGE-CONTEXT",
          service_name: "Custom Website Design & Engineering",
          canonical_url: "/design-services",
          headline_message: isDirectEntry
            ? "You are on the Design Services page. This page presents DigiXPro's custom Next.js web application engineering, UX conversion design, and SEO-ready site redesign frameworks."
            : isSmallBiz
              ? "You are on the Design Services page. For your small business conversion requirement, focus on our Mobile Conversion Layouts, Sub-second Speed Benchmarks, and Clear Lead Capture paths below."
              : "You are on the Design Services page. For your custom web platform requirement, look specifically at our Next.js Component Architecture, API Integration layer, and Modular Design Systems below.",
          targeted_question: "Would you like to inspect case study evidence, or request a free Systems Audit?",
          suggested_replies: ["Inspect Case Study", "Request Free Audit", "Book 30-Min Call"],
          what_to_inspect: "Inspect our Next.js component architecture, speed benchmarks, and design systems on the Design Services page.",
          why_relevant: "Clean component engineering prevents technical debt and delivers 3x higher lead conversion.",
          evidence_label: isSmallBiz ? "Inspect Dr. Aggarwal Case Study" : "Inspect Muktibodh Web Engineering Evidence",
          evidence_url: isSmallBiz ? "/evidence/dr-aggarwal" : "/evidence/muktibodh",
          evidence_inspect: "Review custom web application engineering and UX conversion layout."
        };
      } else if (currentPage.startsWith("/search-automation")) {
        const isDirectEntry = !session || (!session.primary_intent && !session.business_type && (!session.journey_history || session.journey_history.length === 0));
        stepDef = {
          ...stepDef,
          intent_id: intentId === "INTENT-PAGE-EXPLAIN" ? "INTENT-PAGE-EXPLAIN" : "INTENT-PAGE-CONTEXT",
          service_name: "SEO & Search Visibility",
          canonical_url: "/search-automation",
          headline_message: isDirectEntry
            ? "You are on the Search & Automation page, exploring search visibility. This page showcases our technical SEO architecture, AI Search (GEO) indexing frameworks, and self-hosted n8n workflow automation pipelines."
            : "You are on the Search & Automation page. Since you are exploring search visibility and lead follow-ups, look specifically at our Technical SEO Schema Markups, AI Search Optimization, and n8n Workflow Automation diagrams below.",
          targeted_question: "Let me know if you'd like to inspect platform evidence or request a complimentary website audit.",
          suggested_replies: ["Inspect Search Evidence", "Request Free Audit", "Book 30-Min Call"],
          what_to_inspect: "Inspect AI Search indexing framework and n8n workflow diagrams on the Search & Automation page.",
          why_relevant: "Combines technical SEO with lead automation.",
          evidence_label: "Inspect DigiXPro Platform Production Evidence",
          evidence_url: "/evidence/digixpro",
          evidence_inspect: "Review sub-second static page performance and schema markups."
        };
      } else if (currentPage.startsWith("/audit")) {
        const isDirectEntry = !session || (!session.primary_intent && !session.business_type && (!session.journey_history || session.journey_history.length === 0));
        stepDef = {
          ...stepDef,
          intent_id: "INTENT-PAGE-EXPLAIN-AUDIT",
          service_name: "Diagnostic Systems Review & Site Audit",
          canonical_url: "/audit",
          headline_message: isDirectEntry
            ? "You are on the Systems Audit page. If you're exploring whether your website needs technical or structural work, this audit is designed to evaluate performance, mobile UX, and search indexation."
            : "You are on the Systems Audit page. Based on your goal to avoid unnecessary rebuild costs, this page lets you submit your site URL for an empirical diagnostic report across mobile speed, Core Web Vitals, UX conversion layout, and structural SEO before committing any development budget.",
          targeted_question: "Please enter your website URL to initiate your complimentary Systems Audit.",
          suggested_replies: ["Submit Website URL", "Check Audit Deliverables", "Book 30-Min Call"],
          what_to_inspect: "Inspect the Audit Process breakdown and sample report metrics on the Audit page.",
          why_relevant: "Auditing before building ensures your budget is spent only on verified bottlenecks.",
          evidence_label: "Inspect Sample Diagnostic Audit Report",
          evidence_url: "/audit",
          evidence_inspect: "Review Core Web Vitals, SEO metrics, and UX conversion scans."
        };
      } else if (currentPage.startsWith("/evidence")) {
        let nextRoute = "/design-services";
        if (currentPage.includes("sattvaos")) nextRoute = "/advisory";
        else if (currentPage.includes("dr-aggarwal")) nextRoute = "/audit";
        else if (session?.primary_intent === 'AUTO') nextRoute = "/search-automation";
        else if (session?.primary_intent === 'SEO') nextRoute = "/search-automation";
        else if (session?.primary_intent === 'CTO' || session?.industry === 'advisory') nextRoute = "/advisory";

        stepDef = {
          ...stepDef,
          canonical_url: nextRoute,
          service_name: "Recommended Next Action",
          headline_message: `You are inspecting the ${currentPage} case study. Based on verified benchmarks, the recommended next step is to explore our matching engineering capabilities or request a complimentary diagnostic audit.`
        };
      }
    }

    const actions: TourAction[] = [];

    const serviceAction: TourAction = {
      action_type: "SHOW_SERVICE",
      label: `Explore ${stepDef.service_name}`,
      url: stepDef.canonical_url,
      description: stepDef.what_to_inspect,
      what_to_inspect: stepDef.what_to_inspect,
      why_relevant: stepDef.why_relevant,
      cta_text: `Explore Page`
    };

    let activeEvidenceUrl = stepDef.evidence_url;
    let activeEvidenceLabel = stepDef.evidence_label;
    let activeEvidenceInspect = stepDef.evidence_inspect;

    if (session?.industry === 'publishing' || session?.business_type === 'editorial') {
      activeEvidenceUrl = "/evidence/muktibodh";
      activeEvidenceLabel = "Inspect Muktibodh Editorial & Publishing Case Study";
      activeEvidenceInspect = "Review custom web application engineering, editorial publishing workflow, and structured schema markups.";
    } else if (session?.industry === 'ecommerce' || session?.business_type === 'ecommerce') {
      activeEvidenceUrl = "/evidence/buy-secondhand-book";
      activeEvidenceLabel = "Inspect BuySecondHandBook E-Commerce Case Study";
      activeEvidenceInspect = "Review sub-second static catalog browsing, search indexation, and multi-seller checkout experience.";
    } else if (session?.industry === 'healthcare' || session?.business_type === 'small_business') {
      activeEvidenceUrl = "/evidence/dr-aggarwal";
      activeEvidenceLabel = "Inspect Dr. Aggarwal Healthcare Case Study";
      activeEvidenceInspect = "Review mobile lead conversion layouts and patient appointment capture.";
    } else if (session?.primary_intent === 'CTO' || session?.industry === 'advisory' || currentPage.startsWith('/advisory') || routingResult.candidate_intent?.includes('04') || routingResult.candidate_intent?.includes('ADVISORY')) {
      activeEvidenceUrl = "/evidence/sattvaos";
      activeEvidenceLabel = "Inspect SattvaOS Enterprise Due Diligence Case Study";
      activeEvidenceInspect = "Review multi-tenant architecture and security due diligence verification.";
    }

    const evidenceAction: TourAction = {
      action_type: "SHOW_EVIDENCE",
      label: activeEvidenceLabel,
      url: activeEvidenceUrl,
      description: activeEvidenceInspect,
      what_to_inspect: activeEvidenceInspect,
      why_relevant: "Inspect verified production code and real business lead growth metrics.",
      cta_text: "View Case Study"
    };

    const auditAction: TourAction = {
      action_type: "START_AUDIT",
      label: "Start Complimentary Diagnostic Systems Audit",
      url: "/audit",
      description: "Submit your domain URL for a technical audit of performance, SEO structure, and UX bottlenecks.",
      what_to_inspect: "Core Web Vitals, Schema markups, load speed, mobile UX, and code security.",
      why_relevant: "Get empirical data before spending budget on website redesigns or marketing campaigns.",
      cta_text: "Request Free Audit"
    };

    const consultationAction: TourAction = {
      action_type: "BOOK_CONSULTATION",
      label: "Book 30-Minute Architecture Call",
      url: "/contact",
      description: "Schedule a 1-on-1 call with a DigiXPro senior tech strategist to discuss your custom roadmap.",
      what_to_inspect: "Project timeline, technical approach, component architecture, and budget scope.",
      why_relevant: "Get direct answers from senior engineers rather than sales reps.",
      cta_text: "Book 30-Min Call"
    };

    // Intent-Specific Primary Purpose Allocation
    if (
      intentId === "INTENT-10-GREETING" ||
      intentId === "INTENT-12-VALUEPROP" ||
      intentId === "INTENT-13-MULTI-SERVICE" ||
      intentId === "INTENT-01-SEO-NEW-WEB" ||
      intentId === "INTENT-02-WEB" ||
      intentId === "INTENT-02-WEB-UNCERTAIN" ||
      intentId === "INTENT-02-WEB-QUALIFY-EXISTING" ||
      intentId === "INTENT-02-WEB-NEW" ||
      intentId === "INTENT-02-WEB-REDESIGN" ||
      intentId === "INTENT-02-WEB-PURPOSE" ||
      intentId === "INTENT-02-WEB-PRESENCE" ||
      intentId === "INTENT-02-WEB-TYPE" ||
      intentId === "INTENT-04-CTO" ||
      intentId === "INTENT-04-CTO-STAGE" ||
      intentId === "INTENT-04-CTO-PRIORITY" ||
      intentId === "INTENT-01-SEO" ||
      intentId === "INTENT-01-SEO-NEW" ||
      intentId === "INTENT-01-SEO-EXISTING" ||
      intentId === "INTENT-01-SEO-GOAL" ||
      intentId === "INTENT-03-AUTO-CRM" ||
      intentId === "INTENT-CONTEXTUAL-CLARIFY" ||
      intentId === "INTENT-FAMILY-CLARIFY"
    ) {
      // Discovery & Clarification Turns: Pure conversational response + suggested reply chips.
    } else if (intentId === "INTENT-PAGE-CONTEXT" || intentId === "INTENT-PAGE-EXPLAIN") {
      // Page Context Guidance: Include evidence card tailored to active journey
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-02-WEB-RECOMMEND") {
      // Web Engineering Recommendation: Display primary service destination card ONLY
      actions.push(serviceAction);
    } else if (intentId === "INTENT-02-WEB-PLATFORM") {
      // Custom Platform Engineering: Display primary service card + SattvaOS platform evidence card
      actions.push(serviceAction);
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC" || intentId === "INTENT-02-WEB-REBUILD-UNCERTAIN" || intentId === "INTENT-02-WEB-DIAGNOSTIC-INTAKE" || intentId === "INTENT-06-AUDIT-INTAKE" || intentId === "INTENT-06-AUDIT-INFO" || intentId === "INTENT-06-AUDIT-WHY" || intentId === "INTENT-02-CONSULTANT-DIRECT" || intentId === "INTENT-02-WEB-QUALIFY-CONVERSION" || intentId === "INTENT-02-WEB-REBUILD-VERIFY" || intentId === "INTENT-06-AUDIT-HONEST" || intentId === "INTENT-PAGE-EXPLAIN-AUDIT") {
      // Diagnostic Audit Override: Show Audit navigation card (/audit) ONLY
      actions.push(auditAction);
    } else if (intentId === "INTENT-04-CTO-RECOMMEND" || intentId === "INTENT-01-SEO-RECOMMEND" || intentId === "INTENT-03-AUTO-RECOMMEND") {
      // Recommendation Turn: Display primary service card + Evidence card
      actions.push(serviceAction);
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-02-NAV-DESIGN" || intentId === "INTENT-04-NAV-ADVISORY" || intentId === "INTENT-03-AUTO-NAV" || intentId === "INTENT-02-WEB-TYPE" || intentId === "INTENT-04-CTO-VENDOR-DIFF" || intentId === "INTENT-01-SEO-BUILTIN" || intentId === "INTENT-03-AUTO-INTEGRATE" || intentId === "INTENT-02-WEB-NONTECH" || intentId === "INTENT-01-SEO-NOTRAFFIC") {
      // Navigation Action or Consultative Explanation: Display primary service destination card
      actions.push(serviceAction);
    } else if (intentId === "INTENT-07-EVIDENCE" || intentId === "INTENT-07-EVIDENCE-SEO" || intentId === "INTENT-07-EVIDENCE-WEB" || intentId === "INTENT-07-EVIDENCE-REDESIGN" || intentId === "INTENT-07-EVIDENCE-SMALLBIZ" || intentId === "INTENT-07-EVIDENCE-CTO" || intentId === "INTENT-07-EVIDENCE-PUBLISHING") {
      // Evidence query/filter: Show Evidence card ONLY
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-06-AUDIT-INTAKE" || intentId === "INTENT-06-AUDIT-INFO") {
      // Audit query: Show Audit card ONLY
      actions.push(auditAction);
    } else if (intentId === "INTENT-08-BOOKING" || intentId === "INTENT-08-HANDOFF") {
      // Booking query: Show Consultation card ONLY
      actions.push(consultationAction);
    } else if (intentId === "INTENT-05-PRICE" || intentId === "INTENT-09-OBJECTION" || intentId === "INTENT-05-PRICE-NEGOTIATION" || intentId === "INTENT-TIMELINE" || intentId === "INTENT-06-AUDIT-OBJECTION" || intentId === "INTENT-ALREADY-SEEN" || intentId === "INTENT-06-AUDIT-OBJECTION-RECOMMENDATION") {
      // Pricing/Audit-reasoning query: Show Audit card ONLY
      actions.push(auditAction);
    } else if (intentId === "INTENT-CREDIBILITY-TEAM") {
      // Credibility question: link to the Founder page directly
      actions.push(serviceAction);
    } else if (intentId === "INTENT-TECH-STACK" || intentId === "INTENT-CONTRADICTION-ECOMMERCE" || intentId === "INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION") {
      // Technology/scope question answered with a grounding evidence example
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-ECOMMERCE-SCOPE-ACK" || intentId === "INTENT-DONT-KNOW" || intentId === "INTENT-NOT-INTERESTED" || intentId === "INTENT-TRAFFIC-CONFIRMED") {
      // Pure acknowledgment/discovery turn: conversational continuation only, no card yet
    } else if (intentId === "INTENT-SKEPTICISM-WHY-DIGIXPRO") {
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-HIGH-INTENT") {
      actions.push(consultationAction);
    } else if (intentId === "INTENT-SEO-CONVERSION-INSIGHT" || intentId === "INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE" || intentId === "INTENT-05-PRICE-WHY") {
      actions.push(auditAction);
    } else if (intentId === "INTENT-CORRECTION-RECOVERY" || intentId === "INTENT-START-OVER" || intentId === "INTENT-FUTURE-REQUIREMENT-NOTED" || intentId === "INTENT-REQUIREMENT-SUPERSEDED") {
      // Pure conversational reset/recovery/acknowledgment: no card, avoid anchoring the visitor to a stale destination
    } else if (intentId === "INTENT-PLATFORM-OBJECTION") {
      actions.push(evidenceAction);
    } else if (intentId === "INTENT-REBUILD-VS-IMPROVE" || intentId === "INTENT-AUDIT-REASONING" || intentId === "INTENT-WHY-CONTEXTUAL" || intentId === "INTENT-ASSUMPTION-FOLLOWUP" || intentId === "INTENT-TECHNICAL-CONSTRAINT-CONFIRMED" || intentId === "INTENT-TRAFFIC-DECLINE-UPDATE" || intentId === "INTENT-WHAT-NEXT-RESOLVED" || intentId === "INTENT-WHAT-WOULD-CHANGE-MIND") {
      actions.push(auditAction);
    } else {
      // Default Capabilities: Show primary service card
      actions.push(serviceAction);
    }

    let finalHeadline = stepDef.headline_message;
    let finalQuestion = stepDef.targeted_question;
    let finalReplies = stepDef.suggested_replies;

    // Contextual Clarification Engine for Follow-Up Queries (Data-Driven Track Selection)
    if (intentId === "INTENT-CONTEXTUAL-CLARIFY") {
      const q = (routingResult.user_question_raw || routingResult.input || "").toLowerCase();
      
      // 1. Explicit Follow-Up Phrase Overrides
      if (q.includes("how do i know") || q.includes("website is actually the problem") || q.includes("could the website itself")) {
        finalHeadline = "You don't need to assume the site needs a full rebuild. Before spending development budget, we determine whether the bottleneck is traffic, conversion UX, performance, technical SEO, or the underlying platform.";
        finalQuestion = "Would you like us to run a diagnostic audit on your current site, or explore specific conversion improvements first?";
        finalReplies = ["Explore Diagnostic Audit Scope", "Check Conversion UX First", "Talk to a Strategist"];
      } else if (q.includes("can you check") || q.includes("before i spend money") || q.includes("what exactly would you look at")) {
        finalHeadline = "Yes. We start by auditing site speed, mobile UX, indexation status, form conversion barriers, and lead attribution before recommending any platform changes.";
        finalQuestion = "Would you like to review the diagnostic audit intake process?";
        finalReplies = ["Start Diagnostic Audit", "Review Audit Scope", "Book 30-Min Call"];
      } else if (q.includes("start small") || q.includes("would shopify be enough") || q.includes("why would i need custom")) {
        finalHeadline = "Starting lean is always the right commercial decision. For an initial 30-product catalog, platforms like Shopify or a lightweight Next.js setup are often plenty to validate sales before investing in custom platform engineering.";
        finalQuestion = "Would you like to start with a rapid ecommerce setup or evaluate custom platform requirements?";
        finalReplies = ["Rapid Ecommerce Setup", "Custom Platform Evaluation", "Talk to an Engineer"];
      } else if (q.includes("spend money on seo") || q.includes("spend on seo")) {
        finalHeadline = "If your site already receives traffic but isn't generating enquiries, buying more SEO will just drive traffic into a leaky bucket. Fixing conversion UX and technical structure comes first.";
        finalQuestion = "Should we evaluate your conversion setup or review search indexation first?";
        finalReplies = ["Evaluate Conversion Setup", "Review Search Indexation", "Book 30-Min Call"];
      } else if (q.includes("what would you need from us") || q.includes("can you guarantee")) {
        finalHeadline = "For an independent review, we need your project goals, technical requirements, vendor proposals, and current cost estimates. We analyze architecture choices, licensing fees, and vendor lock-in risks.";
        finalQuestion = "Would you like us to review contract scope, architecture choices, or vendor pricing?";
        finalReplies = ["Review Scope & Architecture", "Review Vendor Pricing", "Talk to Fractional CTO"];
      } else if (q.includes("if you were in my position") || q.includes("figure out first")) {
        finalHeadline = "In your situation, the first priority is fixing where leads drop off. Once conversion structure is solid, search visibility and workflow automation produce immediate ROI.";
        finalQuestion = "Would you like to start with conversion diagnosis or workflow automation?";
        finalReplies = ["Conversion Diagnosis", "Workflow Automation", "Talk to a Strategist"];
      } 
      // 2. Active Session Context Track Resolution (Data-Driven Lookup Table)
      else {
        const CONTEXT_TRACK_RESPONSES: Record<string, { headline: string; question: string; replies: string[] }> = {
          CTO: {
            headline: "For technology due diligence and vendor governance, we provide independent CTO oversight to analyze architecture quality, contract scope, and pricing risks.",
            question: "Would you like us to audit vendor proposals, evaluate tech stack architecture, or discuss fractional CTO advisory?",
            replies: ["Vendor Proposal Evaluation", "Software Code & Architecture Audit", "Book 30-Min Call"]
          },
          WEB: {
            headline: "To determine whether your website structure or conversion funnel needs optimization, we evaluate performance, UX conversion layout, and structural SEO before proposing code changes.",
            question: "Would you like us to run a diagnostic Systems Audit or evaluate specific web engineering improvements?",
            replies: ["Start Free Systems Audit", "Explore Design Services", "Book 30-Min Call"]
          },
          SEO: {
            headline: "To scale your customer acquisition, we evaluate technical SEO indexation alongside self-hosted n8n lead automation workflows.",
            question: "Would you like to focus on search ranking visibility or lead automation workflows first?",
            replies: ["Search Visibility (SEO)", "Workflow Automation", "Book 30-Min Call"]
          },
          // PHASE 12: PRICE and EVIDENCE previously had no track at all and
          // fell straight to the generic DEFAULT three-choice menu for any
          // follow-up reference ("what about timeline?", "why does that
          // matter?") asked right after a pricing or evidence turn.
          PRICE: {
            headline: "Since cost depends on scope, the fastest way to get a real answer - on price, timeline, or anything else scope-dependent - is to establish the scope itself.",
            question: "Would you rather get a quick diagnostic scope from an Audit, or discuss it directly on a call?",
            replies: ["Start Diagnostic Audit", "Book 30-Min Call"]
          },
          EVIDENCE: {
            headline: "The production evidence is there to show how a comparable problem was actually solved, not just to list past work.",
            question: "Does your situation look closer to what you just saw, or is it meaningfully different?",
            replies: ["Closer to that", "Different situation", "Book 30-Min Call"]
          }
        };

        const activeTrackKey = (session?.primary_intent === 'CTO' || session?.industry === 'advisory')
          ? 'CTO'
          : (session?.primary_intent === 'PRICE')
          ? 'PRICE'
          : (session?.primary_intent === 'EVIDENCE')
          ? 'EVIDENCE'
          : (session?.primary_intent === 'WEB' || session?.existing_website || session?.primary_intent === 'AUDIT')
          ? 'WEB'
          : (session?.primary_intent === 'SEO' || session?.primary_intent === 'AUTO')
          ? 'SEO'
          : 'DEFAULT';

        const trackConfig = CONTEXT_TRACK_RESPONSES[activeTrackKey] || {
          headline: "To provide a precise recommendation based on your context, let's clarify your primary priority.",
          question: "Which aspect would you like to evaluate first?",
          replies: ["Diagnostic Audit", "Technical Architecture", "Talk to an Engineer"]
        };

        finalHeadline = trackConfig.headline;
        finalQuestion = trackConfig.question;
        finalReplies = trackConfig.replies;
      }
    } else if (intentId === "INTENT-FAMILY-CLARIFY") {
      finalHeadline = "To give you an accurate starting point, we evaluate website engineering, search visibility (SEO), workflow automation, and technology advisory.";
      finalQuestion = "Which area would you like to explore for your business?";
      finalReplies = ["Website Engineering", "Search Visibility (SEO)", "Workflow Automation", "Technology Advisory"];
    } else if (intentId === "INTENT-05-PRICE" && (session?.industry === 'ecommerce' || session?.business_type === 'ecommerce')) {
      // PHASE 7 FIX: acknowledge the visitor's already-established e-commerce project
      // context instead of the generic pricing message, so a pricing question doesn't
      // read as if the concierge forgot what was just discussed. Suggested replies and
      // the Audit action mapping are unchanged - same INTENT-05-PRICE, same next step.
      finalHeadline = "For your new e-commerce/marketplace website, investment depends strictly on project scope - product catalog size, payment gateway and vendor integrations, and platform complexity all affect the build.";
      finalQuestion = "Rather than guessing an arbitrary package price, we recommend first establishing your exact e-commerce scope or getting a diagnostic audit so you pay only for what your platform actually needs.";
    } else if (intentId === "INTENT-05-PRICE" || intentId === "INTENT-TIMELINE") {
      // PHASE 17 PART 3/4: contextual price/timeline - a follow-up question
      // asked mid-decision ("And what about price?", "How long would that
      // take?") must be framed around whichever decision is ACTIVE, not
      // answered as if the conversation just started. identifyActiveDecision
      // skips PRICING/TIMELINE themselves (skipFollowUpDecisions) so it
      // finds the SUBSTANTIVE decision underneath the follow-up, and
      // DECISION_LABELS gives one reusable phrase per decision instead of
      // a hand-authored sentence per (decision, PRICE|TIMELINE) pair.
      const activeDecision = identifyActiveDecision(session, { skipFollowUpDecisions: true });
      if (activeDecision && activeDecision !== 'ECOMMERCE_ARCHITECTURE') {
        const gapState = computeInformationGapState(activeDecision, session);
        const label = DECISION_LABELS[activeDecision];
        const noun = intentId === 'INTENT-05-PRICE' ? 'investment' : 'timeline';
        if (!gapState.recommendationCanProceed || gapState.decisionConfidence === 'INSUFFICIENT_INFORMATION') {
          finalHeadline = `Honestly, ${noun} isn't something I can responsibly narrow down yet - it depends on ${label}, and that isn't established yet.`;
          finalQuestion = gapState.topGap
            ? gapState.topGap.questionText
            : `Once ${label} is clearer, the ${noun} question has a real, grounded answer instead of a guess.`;
        } else {
          finalHeadline = `Since we're already discussing ${label}, the honest answer is that ${noun} still depends on which way that lands - a rebuild, an improve, or something else changes the number materially.`;
          finalQuestion = `A quick diagnostic Audit or a scoping call would pin that down precisely instead of guessing at a range now.`;
        }
      }
    } else if (intentId === "INTENT-ECOMMERCE-SCOPE-ACK") {
      // PHASE 10: acknowledge the specific catalogue size the visitor just gave
      // instead of a generic "Noted." - reuses the same product_count entity
      // captured in precedence.ts.
      const productCount = session?.collected_context?.product_count;
      finalHeadline = productCount ? `Noted - around ${productCount} products.` : "Noted.";
    } else if (intentId === "INTENT-ECOMMERCE-MARKETPLACE-EVOLUTION") {
      // PHASE 10: reference the actual catalogue size if the visitor already gave
      // one, instead of the generic "your catalogue" phrasing.
      const productCount = session?.collected_context?.product_count;
      finalHeadline = productCount
        ? `Yes - that can be planned as a staged architecture. For ${productCount} products, I'd first make the core catalogue, payments and order flow solid, while keeping the structure ready for a later marketplace layer (multiple sellers, vendor accounts) rather than building that complexity in from day one.`
        : stepDef.headline_message;
    } else if (intentId === "INTENT-CONSULTANT-SYNTHESIS-ECOMMERCE") {
      // PHASE 11: "Consultant moment" - synthesize the specific facts already
      // established this session (product count, existing website, weak
      // enquiries) instead of the generic audit-intake response, then explain
      // why that combination points to an Audit rather than a rebuild.
      const productCount = session?.collected_context?.product_count;
      finalHeadline = `Let me put the picture together. You're planning an ecommerce build around ${productCount ? `${productCount} products` : "a product catalogue"}, you already have a website, and the actual problem is weak enquiries - not the build itself, and not traffic.`;
    } else if (intentId === "INTENT-ALREADY-SEEN") {
      // PHASE 13: evidence memory - only claim "no need to look at that
      // again" when evidence was genuinely shown recently (set by
      // precedence.ts via wasEvidenceShownRecently()); otherwise be honest
      // that nothing specific has actually been shown yet.
      if (session?.collected_context?.evidence_actually_shown === 'false') {
        finalHeadline = "Fair enough - though nothing specific has actually been shown yet this conversation, so let's skip straight to something useful.";
      }
    } else if (intentId === "INTENT-REBUILD-VS-IMPROVE") {
      // PHASE 14: decision-boundary reasoning (rebuild vs improve) + "I
      // wouldn't do that yet" + recommendation confidence, derived from
      // established facts rather than a fixed answer either way.
      // PHASE 16: the branch conditions below are now SOURCED from the
      // general Information Gap Engine's decision state (informationGap.ts)
      // instead of a duplicated inline boolean - see the Phase 16 report's
      // decision-boundary table. Text is unchanged for the two branches that
      // already existed, so existing Phase 14/15 tests remain valid; the
      // technical-constraint branch is new (Part 12: a resolved gap changes
      // the recommendation).
      // PHASE 18 PART 15: text now sourced from ONE function
      // (recommendationEngine.ts's buildRecommendation()) instead of a
      // duplicated inline branch chain - the SAME function WHY, the
      // unified "what would you do?" path, and "what would change your
      // mind?" all call, so all four surfaces are guaranteed consistent by
      // construction rather than by careful copy-paste.
      const recommendation = buildRecommendation('REBUILD_VS_IMPROVE', session);
      if (recommendation.option !== 'INSUFFICIENT') {
        finalHeadline = applyResponseVariant(recommendation.rationale.join(' '), session, 'recommendation_request_variant');
        finalQuestion = recommendation.whatWouldChange[0] || finalQuestion;
      } else {
        // PHASE 20 (Phase 19 Finding 2): when nothing decisive is known yet,
        // ask the Information Gap Engine's own highest-value question
        // instead of the static generic fallback - the SAME
        // computeInformationGapState()/topGap.questionText pattern already
        // used by the contextual PRICE/TIMELINE branch below. No new
        // question registry, no change to gap scoring or decision
        // definitions - this only changes WHICH already-computed question
        // gets shown. The headline (stepDef default) is left as-is.
        const gapState = computeInformationGapState('REBUILD_VS_IMPROVE', session);
        finalQuestion = gapState.topGap?.questionText || finalQuestion;
      }
      if (recommendation.option === 'REBUILD') {
        // The dedicated stepDef's own action-oriented question reads better
        // here than the generic whatWouldChange sentence.
        finalQuestion = GUIDED_TOUR_MATRIX["INTENT-TECHNICAL-CONSTRAINT-CONFIRMED"].targeted_question;
      }
      // else: INSUFFICIENT_INFORMATION - keep the stepDef default, which
      // already asks for the deciding fact rather than guessing.
    } else if (intentId === "INTENT-AUDIT-REASONING") {
      // PHASE 14: Audit-vs-self-service decision boundary, reasoned from
      // diagnostic_uncertainty rather than answered the same way every time.
      // PHASE 16: problem_clarity now read via the engine (same underlying
      // session.diagnostic_uncertainty field - see informationGap.ts's
      // readFact()); the conversion-bottleneck exception is a decision-
      // specific business rule outside the single-fact registry entry, kept
      // inline exactly as before.
      // PHASE 18 PART 15: sourced from buildRecommendation() - see the
      // matching comment on INTENT-REBUILD-VS-IMPROVE above.
      const auditRecommendation = buildRecommendation('AUDIT_VS_SELF_SERVICE', session);
      finalHeadline = applyResponseVariant(auditRecommendation.rationale.join(' '), session, 'recommendation_request_variant');
      finalQuestion = auditRecommendation.option === 'SELF_SERVICE' ? 'Is the actual problem already clear to you, or still an open question?' : finalQuestion;
    } else if (intentId === "INTENT-WHAT-NEXT-RESOLVED") {
      // PHASE 17 PART 1: reuse the resolved decision's OWN already-shown
      // text (the same "reuse an existing intent's own reasoning"
      // mechanism as INTENT-WHY-CONTEXTUAL) instead of a fresh generic
      // diagnostic script. what_next_source_intent is recorded by
      // precedence.ts's "what next?" rule at the point of decision, not
      // read via getLastIntent() here, for the same previous_states-timing
      // reason documented on why_target/direct_recommendation_reason above.
      const sourceIntent = session?.collected_context?.what_next_source_intent;
      const shownText = sourceIntent ? session?.collected_context?.[`shown_text_${sourceIntent}`] : undefined;
      if (shownText) {
        finalHeadline = `Here's where things stand: ${shownText}`;
      }
    } else if (intentId === "INTENT-WHAT-WOULD-CHANGE-MIND") {
      // PHASE 18 PART 16: derive the answer from the active decision's
      // Recommendation.whatWouldChange - no hardcoded per-decision text.
      const changeDecision = session?.collected_context?.what_would_change_decision as DecisionKey | undefined;
      if (changeDecision) {
        const rec = buildRecommendation(changeDecision, session);
        const currentLean =
          rec.option === 'REBUILD'
            ? 'a rebuild'
            : rec.option === 'IMPROVE'
            ? 'improving the current site'
            : rec.option === 'AUDIT'
            ? 'an Audit'
            : rec.option === 'SELF_SERVICE'
            ? 'going straight to scoping it yourself'
            : rec.option === 'CONVERSION_FOCUS'
            ? 'conversion work'
            : rec.option === 'VISIBILITY_FOCUS'
            ? 'visibility/SEO work'
            : 'not yet established';
        finalHeadline =
          rec.whatWouldChange.length > 0
            ? `Right now I'm leaning toward ${currentLean}. ${rec.whatWouldChange.join(' ')}`
            : `Right now I'm leaning toward ${currentLean}, and nothing currently on the table would change that.`;
        finalQuestion = rec.unresolvedGaps.length > 0 ? `Do you know ${DECISION_LABELS[changeDecision]} yet, or is that still open?` : finalQuestion;
      }
    } else if (intentId === "INTENT-06-AUDIT-OBJECTION" || intentId === "INTENT-SKEPTICISM-WHY-DIGIXPRO" || intentId === "INTENT-PLATFORM-OBJECTION") {
      // PHASE 18 PART 6: bridge the (already-honest) objection answer to
      // whichever decision is currently active, when one exists - Part 6's
      // "answer using current facts + decision state", layered on top of
      // the existing stepDef text rather than replacing it.
      const objectionDecision = session?.collected_context?.objection_active_decision as DecisionKey | undefined;
      if (objectionDecision) {
        const rec = buildRecommendation(objectionDecision, session);
        // PHASE 18 (found via the mandatory conversation test): only bridge
        // when the active decision actually HAS a resolved lean
        // (REBUILD/IMPROVE/AUDIT/SELF_SERVICE/CONVERSION_FOCUS/
        // VISIBILITY_FOCUS) - ECOMMERCE_ARCHITECTURE/PRICING/TIMELINE have
        // no such option (always 'INSUFFICIENT' from buildGenericRecommendation),
        // so bridging to them would silently fall through to a WRONG,
        // hardcoded default lean instead of correctly saying nothing.
        if (rec.option !== 'INSUFFICIENT') {
          const leanLabel =
            rec.option === 'REBUILD'
              ? 'a rebuild'
              : rec.option === 'IMPROVE'
              ? 'improving the current site'
              : rec.option === 'AUDIT'
              ? 'an Audit'
              : rec.option === 'SELF_SERVICE'
              ? 'skipping the Audit'
              : rec.option === 'CONVERSION_FOCUS'
              ? 'conversion work over more SEO'
              : 'visibility/SEO work';
          finalHeadline = `${finalHeadline} Given what's already established here, I'm currently leaning toward ${leanLabel} anyway, independent of this question.`;
        }
      }
    } else if (intentId === "INTENT-TRAFFIC-DECLINE-UPDATE") {
      // PHASE 16: explicitly acknowledge the superseded fact when there was
      // one to supersede (Part 13), rather than a generic opener every time.
      if (session?.collected_context?.traffic_previously_healthy === 'true') {
        finalHeadline = "Earlier you mentioned traffic was healthy - good that you flagged this changed, because it changes the recommendation. If traffic itself is now dropping, this isn't a conversion question anymore, it's back to visibility.";
      }
    } else if (intentId === "INTENT-06-AUDIT-OBJECTION-RECOMMENDATION") {
      // PHASE 14: this intent is now reached two ways - after an explicit
      // audit objection (Phase 13), or from a "what would you do?" question
      // answered directly from an established conversion-bottleneck profile
      // (Phase 14, no objection involved). precedence.ts records which one
      // via direct_recommendation_reason (set at the point of decision,
      // where the distinction is actually known - getLastIntent() cannot be
      // used here since previous_states already includes THIS turn by the
      // time resolveTourStep runs). The stepDef default assumes the former
      // ("since you'd rather skip the audit..."); swap to a plain
      // direct-recommendation opening for the latter so it doesn't reference
      // an objection that never happened.
      if (session?.collected_context?.direct_recommendation_reason === 'conversion_bottleneck') {
        // PHASE 21 (Part 4 fact/assumption safety): traffic='plenty' IS an
        // established fact here (isConversionBottleneckProfile requires it),
        // but "enquiries weak" is not - it's this branch's own inference by
        // elimination (traffic isn't the constraint, so conversion is the
        // next place to look), not something every visitor reaching this
        // branch actually said. Only claim it as told when enquiry_health
        // was actually recorded as weak (recordFact, precedence.ts).
        const enquiriesActuallyWeak = session?.collected_context?.enquiry_health === 'weak';
        finalHeadline = enquiriesActuallyWeak
          ? "Based on what you've told me: with traffic already fine and enquiries weak, I'd look at the conversion path first - page layout, load speed, and what happens right after someone lands - before touching SEO or a rebuild."
          : "Based on what you've told me: with traffic already fine, I'd look at the conversion path first - page layout, load speed, and what happens right after someone lands - before touching SEO or a rebuild.";
      }
    } else if (intentId === "INTENT-WHY-CONTEXTUAL") {
      // PHASE 15: generalized "why" - reuse the target intent's OWN
      // response text as the explanation, rather than a hardcoded sentence.
      // why_target is recorded by precedence.ts (see the comment on that
      // field) rather than read via getLastIntent() here, for the same
      // previous_states-timing reason documented above.
      const whyTarget = session?.collected_context?.why_target;
      // PHASE 15: prefer the ACTUALLY-SHOWN text for that turn (which may
      // have been dynamically computed, e.g. INTENT-REBUILD-VS-IMPROVE's
      // confidence-tiered branches) over the static stepDef default - the
      // exact bug this phase's own testing found otherwise.
      const shownText = whyTarget ? session?.collected_context?.[`shown_text_${whyTarget}`] : undefined;
      const shownQuestion = whyTarget ? session?.collected_context?.[`shown_question_${whyTarget}`] : undefined;
      const targetDef = whyTarget ? GUIDED_TOUR_MATRIX[whyTarget] : undefined;
      if (shownText) {
        finalHeadline = shownText;
        finalQuestion = shownQuestion || finalQuestion;
      } else if (targetDef) {
        finalHeadline = targetDef.headline_message;
        finalQuestion = targetDef.targeted_question;
      }
    } else if (intentId === "INTENT-ASSUMPTION-FOLLOWUP") {
      // PHASE 15: reuse the recent challenge intent's own reasoning,
      // prefixed with an acknowledgment of the original assumption -
      // Part 18's exact target ("I thought SEO would fix it").
      // assumption_challenge_target is recorded by precedence.ts for the
      // same previous_states-timing reason as why_target above.
      const challengeTarget = session?.collected_context?.assumption_challenge_target;
      const shownChallengeText = challengeTarget ? session?.collected_context?.[`shown_text_${challengeTarget}`] : undefined;
      const challengeDef = challengeTarget ? GUIDED_TOUR_MATRIX[challengeTarget] : undefined;
      if (shownChallengeText) {
        finalHeadline = `That's understandable. ${shownChallengeText}`;
        finalQuestion = challengeTarget ? (session?.collected_context?.[`shown_question_${challengeTarget}`] || finalQuestion) : finalQuestion;
      } else if (challengeDef) {
        finalHeadline = `That's understandable. ${challengeDef.headline_message}`;
        finalQuestion = challengeDef.targeted_question;
      }
    }

    // PHASE 15: persist whatever was ACTUALLY shown for this turn (static
    // stepDef text or a dynamically-computed confidence-tiered override
    // above) whenever this intent is one "why?" or an assumption follow-up
    // might later need to reuse. Without this, resolveWhyTarget's "reuse the
    // target's own text" mechanism would only work for static stepDefs and
    // silently fall back to the generic default for any dynamically-computed
    // recommendation (the exact bug this phase's own testing found for
    // INTENT-REBUILD-VS-IMPROVE's HIGH_CONFIDENCE branch).
    if (session && WHY_REUSABLE_INTENTS.has(intentId) && finalHeadline) {
      session.collected_context = {
        ...session.collected_context,
        [`shown_text_${intentId}`]: finalHeadline,
        ...(finalQuestion ? { [`shown_question_${intentId}`]: finalQuestion } : {})
      };
    }

    // Response Language Matching (Hindi / Hinglish Pre-Authored Variants)
    if (routingResult.is_hindi || routingResult.detected_language === 'hi' || routingResult.detected_language === 'hinglish') {
      const isPureHindi = routingResult.detected_language === 'hi';
      if (intentId.includes("SEO")) {
        finalHeadline = isPureHindi
          ? "नमस्ते, DigiXPro में आपका स्वागत है। अगर आप अपनी वेबसाइट की सर्च विजिबिलिटी और गूगल रैंकिंग बेहतर करना चाहते हैं, तो हम टेक्निकल SEO, AI सर्च ऑप्टिमाइजेशन (GEO) और स्ट्रक्चर्ड डेटा मार्कअप में विशेषज्ञता रखते हैं। क्या आपकी वेबसाइट पर वर्तमान में सर्च ट्रैफिक आ रहा है, या यह एक नई साइट है?"
          : "Namaste! Agar aapki website par traffic nahi aa raha ya Google ranking improve karni hai, toh pehle ye dekhna zaroori hai ki issue indexation ka hai ya keyword authority ka. Kya aap pehle se SEO campaign chala rahe hain?";
      } else if (intentId.includes("WEB") || intentId.includes("SMALLBIZ")) {
        finalHeadline = isPureHindi
          ? "आपकी व्यवसाय वेबसाइट की लीड कन्वर्जन बेहतर करने के लिए, हम मोबाइल-फर्स्ट लेआउट और सब-सेकंड लोड स्पीड पर ध्यान केंद्रित करते हैं। क्या आप मौजूदा साइट का रिडिजाइन चाहते हैं या नया वेब प्लेटफॉर्म?"
          : "Aapki business website se zyada leads aur enquiries generate karne ke liye, hum mobile-first conversion design aur sub-second speed benchmarks use karte hain. Kya aap current site redesign karna chahte hain?";
      } else if (intentId.includes("ADVISORY") || intentId.includes("CTO")) {
        finalHeadline = isPureHindi
          ? "वेन्डर सॉफ्टवेयर प्रपोजल को स्वतंत्र रूप से रिव्यू करने के लिए हमारी टेक्नोलॉजी एडवाइजरी फ्रेमवर्क आपको निष्पक्ष ड्यू डिलिजेंस और आर्किटेक्चर ऑडिट प्रदान करती है। हम वेन्डर लॉक-इन और अनावश्यक सुविधाओं से आपका बजट सुरक्षित रखते हैं।"
          : "Vendor software proposal ko independently review karne ke liye humari Technology Advisory framework aapko unbiased due diligence aur architecture audit provide karti hai. Hum vendor lock-in aur unnecessary software features se aapka budget protect karte hain.";
      }
    }

    return {
      intent_id: stepDef.intent_id,
      family_id: stepDef.family_id,
      flow_id: stepDef.flow_id,
      headline_message: finalHeadline,
      targeted_question: finalQuestion || stepDef.targeted_question,
      suggested_replies: finalReplies || stepDef.suggested_replies,
      canonical_destination: {
        destination_type: 'CANONICAL_PAGE',
        canonical_path: stepDef.canonical_url,
        display_label: stepDef.service_name,
        page_purpose: stepDef.what_to_inspect,
        what_to_inspect: stepDef.what_to_inspect,
        why_it_matters: stepDef.why_relevant,
        evidence_destinations: [
          {
            label: activeEvidenceLabel,
            url: activeEvidenceUrl,
            what_to_inspect: activeEvidenceInspect
          }
        ],
        next_steps: finalReplies || stepDef.suggested_replies
      },
      tour_actions: actions,
      evidence_destination: evidenceAction,
      audit_recommendation: auditAction,
      consultation_recommendation: consultationAction,
      session_id: routingResult.session_id
    };
  }
}
