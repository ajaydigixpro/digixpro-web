import { RoutingResult, VisitorSessionState } from './semantic-router/types';

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
  "INTENT-05-PRICE": {
    intent_id: "INTENT-05-PRICE",
    family_id: "FAM-05",
    flow_id: "FLOW-06",
    service_name: "Scope-Based Investment & Commercial Qualification",
    canonical_url: "/how-we-work",
    headline_message: "At DigiXPro, investment depends strictly on project scope — specifically whether you require a completely new web build, a redesign of an existing site, targeted technical optimization, or workflow automation.",
    targeted_question: "Rather than guessing an arbitrary package price, we recommend first establishing your exact scope or getting a diagnostic audit so you pay only for what your platform actually needs.",
    suggested_replies: ["Explore Diagnostic Audit Scope", "Discuss Custom Web Scope"],
    what_to_inspect: "Inspect our Engagement Model and Deliverable Framework on the How We Work page.",
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
    } else if (intentId === "INTENT-05-PRICE" || intentId === "INTENT-09-OBJECTION") {
      // Pricing query: Show Audit card ONLY
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
          }
        };

        const activeTrackKey = (session?.primary_intent === 'CTO' || session?.industry === 'advisory')
          ? 'CTO'
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
