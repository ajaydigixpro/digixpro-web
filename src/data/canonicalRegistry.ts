/**
 * DIGIXPRO CANONICAL KNOWLEDGE REGISTRY
 * Single Authoritative Source of Truth for DigiXPro Website & AI Assist
 * 
 * Contains:
 * 1. Company & Founder Master Record
 * 2. URL Registry (Canonical routes only - 0 legacy /services/ URLs)
 * 3. 18 Canonical Services Data
 * 4. 9 Evidence Case Studies Data
 * 5. Evidence Relationship Graph (Service <-> Evidence <-> Capability <-> Buyer Problem)
 * 6. Connected Solution Cross-Sell Matrix (Primary <-> Secondary <-> Future)
 * 7. Blog & Knowledge Content Index (with ACTIVE / DRAFT / ARCHIVED freshness status)
 * 8. Relevant Retrieval Helper Engine
 */

export interface CompanyRecord {
  name: string;
  legalEntity: string;
  founder: {
    name: string;
    title: string;
    role: string;
    expertise: string[];
  };
  headquarters: string;
  primaryMarkets: Array<{ country: string; currency: string; symbol: string }>;
  philosophy: {
    coreApproach: string;
    pricingPhilosophy: string;
    consultantPersona: string;
    dignifiedBudgetStatement: string;
  };
  commercialSegments: Array<{ id: string; number: string; name: string; slug: string }>;
}

export interface CanonicalUrlRecord {
  id: string;
  type: 'core' | 'service' | 'evidence' | 'knowledge' | 'policy';
  title: string;
  url: string;
  legacyAliases?: string[];
}

export interface ServiceRecord {
  id: string;
  segmentId: 'advisory' | 'design-services' | 'search-automation';
  name: string;
  slug: string;
  canonicalUrl: string;
  summary: string;
  buyerProblem: string[];
  buyerQuestions: string[];
  idealFor: string;
  deliverables: Array<{ title: string; desc: string }>;
  commercialModel: 'Independent Advisory Retainer' | 'Milestone-Based Fixed Scope' | 'Monthly Performance Engineering';
  pricingReference: string;
  relevantEvidenceIds: string[];
  relatedServices: {
    secondaryIds: string[];
    futureIds: string[];
  };
  faqs: Array<{ question: string; answer: string }>;
  keywords: string[];
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  lastUpdated: string;
}

export interface EvidenceRecord {
  id: string;
  name: string;
  canonicalUrl: string;
  projectType: string;
  capabilities: string[];
  factualScope: string;
  relevantServiceIds: string[];
  proofAvailable: boolean;
  liveLinks: string[];
  metrics: string[];
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  lastUpdated: string;
}

export interface KnowledgeContentRecord {
  id: string;
  pillar: string;
  title: string;
  summary: string;
  canonicalUrl: string;
  content: string;
  keywords: string[];
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  lastUpdated: string;
}

// ============================================================================
// 1. COMPANY & FOUNDER MASTER RECORD
// ============================================================================
export const COMPANY_MASTER: CompanyRecord = {
  name: "DigiXPro",
  legalEntity: "DigiXPro Digital Solution",
  founder: {
    name: "Dr. Ajay Shukla",
    title: "Founder & Technology Advisor",
    role: "Technology Due Diligence, Business Systems Architecture & Digital Transformation Lead",
    expertise: [
      "Enterprise Systems Architecture",
      "Asynchronous Event-Driven Workflows",
      "Generative Engine Optimization (GEO)",
      "Technical Due Diligence & Vendor Selection"
    ]
  },
  headquarters: "Noida / Delhi-NCR, India",
  primaryMarkets: [
    { country: "India", currency: "INR", symbol: "₹" },
    { country: "United States / Global", currency: "USD", symbol: "$" },
    { country: "United Kingdom", currency: "GBP", symbol: "£" },
    { country: "Australia", currency: "AUD", symbol: "A$" },
    { country: "Singapore", currency: "SGD", symbol: "S$" }
  ],
  philosophy: {
    coreApproach: "Independent Architecture & Digital Engineering. We understand the visitor's situation, clarify requirements, advise on technology strategy, and recommend practical paths without aggressive sales pressure.",
    pricingPhilosophy: "Diagnostic scope first, zero software markups, milestone-based governance. Clients pay software vendors directly without middleman markups.",
    consultantPersona: "Ek knowledgeable person jo meri situation samajh raha hai aur mujhe sahi rasta dikha raha hai.",
    dignifiedBudgetStatement: "₹50,000 ke budget ko samajhte hue, mujhe nahi lagta ki DigiXPro ka custom approach aapke liye abhi best fit hoga. Is level par standard Shopify/WooCommerce setup practical ho sakta hai. Hamari approach tab useful hoti hai jab business ko custom architecture, integrations, search visibility, automation ya future scaling ki requirements justify karti hain."
  },
  commercialSegments: [
    { id: "advisory", number: "01", name: "Advisory", slug: "/advisory" },
    { id: "design-services", number: "02", name: "Design & Build", slug: "/design-services" },
    { id: "search-automation", number: "03", name: "Search, AI & Automation", slug: "/search-automation" }
  ]
};

// ============================================================================
// 2. CANONICAL URL REGISTRY (0 Legacy Links)
// ============================================================================
export const CANONICAL_URL_REGISTRY: CanonicalUrlRecord[] = [
  // Core pages
  { id: "home", type: "core", title: "Home", url: "https://www.digixpro.in/" },
  { id: "advisory-hub", type: "core", title: "01 — Advisory Segment", url: "https://www.digixpro.in/advisory" },
  { id: "design-hub", type: "core", title: "02 — Design & Build Segment", url: "https://www.digixpro.in/design-services", legacyAliases: ["/services/unlimited-graphic-design", "/services/website-design-services", "/services/branding-services"] },
  { id: "search-hub", type: "core", title: "03 — Search, AI & Automation Segment", url: "https://www.digixpro.in/search-automation" },
  { id: "evidence-hub", type: "core", title: "Evidence Library", url: "https://www.digixpro.in/evidence" },
  { id: "founder-page", type: "core", title: "Dr. Ajay Shukla — Founder", url: "https://www.digixpro.in/founder" },
  { id: "how-we-work", type: "core", title: "How We Work", url: "https://www.digixpro.in/how-we-work" },
  { id: "audit-page", type: "core", title: "Systems Audit", url: "https://www.digixpro.in/audit" },
  { id: "contact-page", type: "core", title: "Contact", url: "https://www.digixpro.in/contact" },
  { id: "knowledge-hub", type: "core", title: "Knowledge Library", url: "https://www.digixpro.in/knowledge" },
  { id: "privacy", type: "policy", title: "Privacy Policy", url: "https://www.digixpro.in/privacy-policy" },
  { id: "terms", type: "policy", title: "Terms of Service", url: "https://www.digixpro.in/terms" },
  { id: "disclaimer", type: "policy", title: "Disclaimer", url: "https://www.digixpro.in/disclaimer" },

  // 18 Canonical Service URLs
  { id: "it_consulting", type: "service", title: "IT Consulting & Technology Strategy", url: "https://www.digixpro.in/advisory/it-consulting-technology-strategy", legacyAliases: ["/services/it-consulting-services"] },
  { id: "vendor_eval", type: "service", title: "Technology Due Diligence & Vendor Evaluation", url: "https://www.digixpro.in/advisory/technology-due-diligence-vendor-evaluation" },
  { id: "digital_trans", type: "service", title: "Digital Transformation Consulting", url: "https://www.digixpro.in/advisory/digital-transformation-consulting" },
  { id: "systems_arch", type: "service", title: "Business Systems & Process Architecture", url: "https://www.digixpro.in/advisory/business-systems-process-architecture", legacyAliases: ["/services/erp-consultant-services"] },
  { id: "tech_roadmaps", type: "service", title: "Technology Roadmaps & Architecture", url: "https://www.digixpro.in/advisory/technology-roadmaps-architecture" },
  { id: "fractional_cto", type: "service", title: "Fractional CTO & Technology Leadership", url: "https://www.digixpro.in/advisory/fractional-cto-technology-leadership", legacyAliases: ["/services/fractional-cto-services"] },
  { id: "website", type: "service", title: "Custom Business Website Design & Development", url: "https://www.digixpro.in/design-services/custom-business-website-design", legacyAliases: ["/services/custom-website-design-development"] },
  { id: "redesign", type: "service", title: "Website Redesign & SEO-Safe Rebuild", url: "https://www.digixpro.in/design-services/website-redesign", legacyAliases: ["/services/website-redesign-services"] },
  { id: "small_business", type: "service", title: "Small Business & Service Business Websites", url: "https://www.digixpro.in/design-services/small-business-websites", legacyAliases: ["/services/website-design-for-trades-and-contractors"] },
  { id: "landing_page", type: "service", title: "Landing Page & Lead Generation Design", url: "https://www.digixpro.in/design-services/landing-page-lead-generation" },
  { id: "conversion_opt", type: "service", title: "Website UX & Conversion Optimization", url: "https://www.digixpro.in/design-services/website-conversion-optimization" },
  { id: "seo_ready", type: "service", title: "SEO-Ready Website Engineering", url: "https://www.digixpro.in/design-services/seo-ready-website-engineering" },
  { id: "seo", type: "service", title: "SEO & Search Visibility", url: "https://www.digixpro.in/search-automation/seo-search-visibility", legacyAliases: ["/services/seo-services"] },
  { id: "geo", type: "service", title: "AI Search Optimization & GEO", url: "https://www.digixpro.in/search-automation/ai-search-optimization-geo", legacyAliases: ["/services/ai-consulting-services"] },
  { id: "local_seo", type: "service", title: "Local SEO & Local Lead Visibility", url: "https://www.digixpro.in/search-automation/local-seo-lead-visibility" },
  { id: "social_media", type: "service", title: "Social Media Management & Content Systems", url: "https://www.digixpro.in/search-automation/social-media-management", legacyAliases: ["/services/social-media-campaign-strategy"] },
  { id: "ai_automation", type: "service", title: "Workflow & AI Automation", url: "https://www.digixpro.in/search-automation/workflow-ai-automation", legacyAliases: ["/services/workflow-automation-n8n", "/services/ai-automation-agency", "/services/business-process-automation"] },
  { id: "crm_automation", type: "service", title: "Lead Capture, CRM & Sales Automation", url: "https://www.digixpro.in/search-automation/lead-capture-crm-sales-automation" },

  // 9 Evidence URLs
  { id: "dr-aggarwal", type: "evidence", title: "Dr. Aggarwal Physio Centre Case Study", url: "https://www.digixpro.in/evidence/dr-aggarwal" },
  { id: "scan-centre", type: "evidence", title: "Scan Centre Near Me Case Study", url: "https://www.digixpro.in/evidence/scan-centre" },
  { id: "buy-secondhand-book", type: "evidence", title: "Buy Second Hand Book Case Study", url: "https://www.digixpro.in/evidence/buy-secondhand-book" },
  { id: "sattvaos", type: "evidence", title: "SattvaOS Case Study", url: "https://www.digixpro.in/evidence/sattvaos" },
  { id: "aatma-guru", type: "evidence", title: "Aatma Guru Case Study", url: "https://www.digixpro.in/evidence/aatma-guru" },
  { id: "nirvandham", type: "evidence", title: "Nirvandham Case Study", url: "https://www.digixpro.in/evidence/nirvandham" },
  { id: "muktibodh", type: "evidence", title: "Muktibodh Case Study", url: "https://www.digixpro.in/evidence/muktibodh" },
  { id: "digixpro", type: "evidence", title: "DigiXPro Architecture Demo", url: "https://www.digixpro.in/evidence/digixpro" },
  { id: "360-neck-shoulder", type: "evidence", title: "360 Neck & Shoulder Care Case Study", url: "https://www.digixpro.in/evidence/360-neck-shoulder" }
];

// ============================================================================
// 3. 18 CANONICAL SERVICE RECORDS
// ============================================================================
export const CANONICAL_SERVICES: ServiceRecord[] = [
  // Segment 01: Advisory
  {
    id: "it_consulting",
    segmentId: "advisory",
    name: "IT Consulting & Technology Strategy",
    slug: "it-consulting-technology-strategy",
    canonicalUrl: "https://www.digixpro.in/advisory/it-consulting-technology-strategy",
    summary: "Strategic IT consulting, systems architecture evaluation, and technology roadmap planning led by Dr. Ajay Shukla.",
    buyerProblem: ["Legacy software friction", "Vendor lock-in", "Lack of clear tech roadmap"],
    buyerQuestions: ["Which technology stack should we choose?", "Is our current agency code scalable?"],
    idealFor: "Growing SMEs and enterprises scaling beyond basic web setups.",
    deliverables: [
      { title: "Architecture Audit", desc: "Comprehensive code and infrastructure review." },
      { title: "Strategic Technology Roadmap", desc: "Phase-by-phase engineering plan." }
    ],
    commercialModel: "Independent Advisory Retainer",
    pricingReference: "Scoped after initial diagnostic review.",
    relevantEvidenceIds: ["digixpro", "sattvaos"],
    relatedServices: { secondaryIds: ["vendor_eval", "systems_arch"], futureIds: ["fractional_cto"] },
    faqs: [{ question: "How does advisory work?", answer: "Independent diagnostic review followed by clear architecture blueprints." }],
    keywords: ["it consulting", "technology strategy", "tech roadmap", "architecture audit"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "vendor_eval",
    segmentId: "advisory",
    name: "Technology Due Diligence & Vendor Evaluation",
    slug: "technology-due-diligence-vendor-evaluation",
    canonicalUrl: "https://www.digixpro.in/advisory/technology-due-diligence-vendor-evaluation",
    summary: "Unbiased technical due diligence, RFP creation, and vendor proposal evaluation to prevent overcharging and flawed software selection.",
    buyerProblem: ["Overpriced agency proposals", "Unrealistic software estimates", "Vendor capability uncertainty"],
    buyerQuestions: ["Is this vendor quote realistic?", "Are we overpaying for software licenses?"],
    idealFor: "Founders & CTOs evaluating third-party development bids.",
    deliverables: [
      { title: "Vendor Proposal Evaluation Report", desc: "Unbiased line-by-line bid verification." },
      { title: "Technical SLA & Acceptance Criteria Blueprint", desc: "Milestone guardrails for contract enforcement." }
    ],
    commercialModel: "Independent Advisory Retainer",
    pricingReference: "Fixed fee per evaluation or advisory engagement.",
    relevantEvidenceIds: ["digixpro"],
    relatedServices: { secondaryIds: ["it_consulting"], futureIds: ["fractional_cto"] },
    faqs: [{ question: "Do you take commissions from vendors?", answer: "Zero commissions or referral markups. Purely independent advisory." }],
    keywords: ["vendor evaluation", "tech due diligence", "rfp review", "agency audit"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "digital_trans",
    segmentId: "advisory",
    name: "Digital Transformation Consulting",
    slug: "digital-transformation-consulting",
    canonicalUrl: "https://www.digixpro.in/advisory/digital-transformation-consulting",
    summary: "Guiding traditional businesses through cloud migration, process digitization, and modern software adoption.",
    buyerProblem: ["Paper/Excel dependencies", "Siloed department operations", "Resistance to modern software"],
    buyerQuestions: ["How do we digitize manual operations without disrupting business?"],
    idealFor: "Traditional service businesses and healthcare/manufacturing firms.",
    deliverables: [
      { title: "Transformation Blueprint", desc: "Step-by-step digital process migration guide." }
    ],
    commercialModel: "Independent Advisory Retainer",
    pricingReference: "Custom project scope.",
    relevantEvidenceIds: ["dr-aggarwal", "nirvandham"],
    relatedServices: { secondaryIds: ["systems_arch"], futureIds: ["ai_automation"] },
    faqs: [{ question: "How long does a transformation roadmap take?", answer: "Typically 2 to 4 weeks for diagnostic discovery and roadmap delivery." }],
    keywords: ["digital transformation", "process digitization", "legacy modernization"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "systems_arch",
    segmentId: "advisory",
    name: "Business Systems & Process Architecture",
    slug: "business-systems-process-architecture",
    canonicalUrl: "https://www.digixpro.in/advisory/business-systems-process-architecture",
    summary: "Designing custom business operating systems and process architecture that outperform generic ERP templates.",
    buyerProblem: ["Fragmented messaging threads (WhatsApp chaos)", "Data duplication", "Lack of operational visibility"],
    buyerQuestions: ["Why is WhatsApp or Excel failing as our operating system?"],
    idealFor: "Scaling companies replacing fragmented tools with governed operating systems.",
    deliverables: [
      { title: "Domain Context Map & Schema Contract", desc: "Bounded context architectural specification." }
    ],
    commercialModel: "Independent Advisory Retainer",
    pricingReference: "Scoped based on process complexity.",
    relevantEvidenceIds: ["nirvandham", "buy-secondhand-book"],
    relatedServices: { secondaryIds: ["crm_automation"], futureIds: ["ai_automation"] },
    faqs: [{ question: "Why avoid off-the-shelf ERPs?", answer: "Generic ERP templates force rigid workflows; custom OS aligns with actual domain logic." }],
    keywords: ["business systems architecture", "custom operating system", "process architecture"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "tech_roadmaps",
    segmentId: "advisory",
    name: "Technology Roadmaps & Architecture",
    slug: "technology-roadmaps-architecture",
    canonicalUrl: "https://www.digixpro.in/advisory/technology-roadmaps-architecture",
    summary: "Multi-year technology architecture planning and system design for high-throughput enterprise growth.",
    buyerProblem: ["Short-term tech debt", "Unplanned infrastructure bottlenecks"],
    buyerQuestions: ["How do we architect our platform for 10x traffic growth?"],
    idealFor: "CTOs and engineering leaders.",
    deliverables: [{ title: "Enterprise Technology Roadmap", desc: "Architectural blueprint and milestone timeline." }],
    commercialModel: "Independent Advisory Retainer",
    pricingReference: "Custom advisory scope.",
    relevantEvidenceIds: ["sattvaos"],
    relatedServices: { secondaryIds: ["it_consulting"], futureIds: ["fractional_cto"] },
    faqs: [{ question: "What is included in the roadmap?", answer: "Tech stack selection, database architecture, queue isolation, and security guardrails." }],
    keywords: ["technology roadmap", "enterprise architecture", "system design"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "fractional_cto",
    segmentId: "advisory",
    name: "Fractional CTO & Technology Leadership",
    slug: "fractional-cto-technology-leadership",
    canonicalUrl: "https://www.digixpro.in/advisory/fractional-cto-technology-leadership",
    summary: "Part-time executive technology leadership for companies needing senior guidance without full-time CTO overhead.",
    buyerProblem: ["Lack of senior tech leadership", "Developer team misdirection"],
    buyerQuestions: ["Can we get CTO-level technical leadership on a fractional basis?"],
    idealFor: "Founders without a technical co-founder.",
    deliverables: [{ title: "Fractional CTO Governance", desc: "Weekly technical steering, code review, and hiring guidance." }],
    commercialModel: "Independent Advisory Retainer",
    pricingReference: "Monthly executive retainer.",
    relevantEvidenceIds: ["digixpro", "sattvaos"],
    relatedServices: { secondaryIds: ["it_consulting"], futureIds: ["tech_roadmaps"] },
    faqs: [{ question: "How many hours per week?", answer: "Structured weekly advisory sessions and architecture code reviews." }],
    keywords: ["fractional cto", "technology leadership", "interim cto"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },

  // Segment 02: Design & Build
  {
    id: "website",
    segmentId: "design-services",
    name: "Custom Business Website Design & Development",
    slug: "custom-business-website-design",
    canonicalUrl: "https://www.digixpro.in/design-services/custom-business-website-design",
    summary: "High-performance Next.js custom business websites engineered for conversion, speed, and search visibility.",
    buyerProblem: ["Slow WordPress site", "Low lead conversion", "Outdated visual identity"],
    buyerQuestions: ["Why should we choose custom Next.js over template WordPress?"],
    idealFor: "Businesses requiring fast, modern, custom web presence.",
    deliverables: [
      { title: "Custom Next.js Frontend", desc: "Sub-second loading speed with Tailwind CSS." },
      { title: "Structured Content Plumbing", desc: "Machine-readable schemas and mobile responsive layout." }
    ],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Standard engagements start above ₹1,00,000 / $1,500. Standard WordPress templates recommended for budgets under ₹50,000.",
    relevantEvidenceIds: ["360-neck-shoulder", "digixpro"],
    relatedServices: { secondaryIds: ["seo_ready", "conversion_opt"], futureIds: ["seo"] },
    faqs: [{ question: "Do you build on WordPress templates?", answer: "No. We build custom Next.js websites for superior security, performance, and SEO." }],
    keywords: ["custom business website", "nextjs development", "website design"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "redesign",
    segmentId: "design-services",
    name: "Website Redesign & SEO-Safe Rebuild",
    slug: "website-redesign",
    canonicalUrl: "https://www.digixpro.in/design-services/website-redesign",
    summary: "Rebuilding legacy websites with modern stack while ensuring zero loss of search engine rankings through strict 301 URL mapping.",
    buyerProblem: ["Fear of losing Google ranks during redesign", "Outdated tech stack", "Poor mobile experience"],
    buyerQuestions: ["How do we redesign our site without losing organic search traffic?"],
    idealFor: "Established websites upgrading to Next.js without SEO rank drops.",
    deliverables: [{ title: "SEO-Safe Migration Mapping", desc: "100% 301 redirect map and canonical URL preservation." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Fixed project pricing.",
    relevantEvidenceIds: ["360-neck-shoulder", "scan-centre"],
    relatedServices: { secondaryIds: ["seo_ready", "seo"], futureIds: ["conversion_opt"] },
    faqs: [{ question: "Will my rankings drop during redesign?", answer: "Our zero-rank-loss protocol guarantees exact URL redirects and schema continuity." }],
    keywords: ["website redesign", "seo safe migration", "rebuild website"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "small_business",
    segmentId: "design-services",
    name: "Small Business & Service Business Websites",
    slug: "small-business-websites",
    canonicalUrl: "https://www.digixpro.in/design-services/small-business-websites",
    summary: "Professional custom web architectures for service providers, medical clinics, and local professional firms.",
    buyerProblem: ["Unprofessional web appearance", "Lack of local client trust", "Missing lead capture"],
    buyerQuestions: ["What does a professional clinic or service website need?"],
    idealFor: "Local clinics, law practices, consultancy firms.",
    deliverables: [{ title: "Service Business Web Architecture", desc: "Local booking and conversion funnel." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Custom scope depending on service pages.",
    relevantEvidenceIds: ["dr-aggarwal", "360-neck-shoulder"],
    relatedServices: { secondaryIds: ["local_seo"], futureIds: ["crm_automation"] },
    faqs: [{ question: "Can appointment forms be integrated?", answer: "Yes, automated lead and booking forms connect directly to CRM/WhatsApp." }],
    keywords: ["small business website", "clinic website", "service website"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "landing_page",
    segmentId: "design-services",
    name: "Landing Page & Lead Generation Design",
    slug: "landing-page-lead-generation",
    canonicalUrl: "https://www.digixpro.in/design-services/landing-page-lead-generation",
    summary: "Dedicated high-converting campaign landing pages engineered for high ad response rates.",
    buyerProblem: ["High ad spend with low conversion", "Cluttered landing pages"],
    buyerQuestions: ["Why are our Google/Meta ad leads expensive?"],
    idealFor: "Performance marketing campaigns and product launches.",
    deliverables: [{ title: "High-Conversion Landing Page", desc: "Single-objective messaging layout." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Fixed fee per landing page.",
    relevantEvidenceIds: ["360-neck-shoulder"],
    relatedServices: { secondaryIds: ["conversion_opt"], futureIds: ["crm_automation"] },
    faqs: [{ question: "Do you handle ad spend management?", answer: "No. We engineer the high-converting web assets; paid media management is handled separately." }],
    keywords: ["landing page design", "lead generation page", "conversion landing page"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "conversion_opt",
    segmentId: "design-services",
    name: "Website UX & Conversion Optimization",
    slug: "website-conversion-optimization",
    canonicalUrl: "https://www.digixpro.in/design-services/website-conversion-optimization",
    summary: "Data-driven UX refactoring to increase enquiry rates without increasing traffic spend.",
    buyerProblem: ["High traffic but low form submissions", "Confusing user journeys"],
    buyerQuestions: ["How do we double conversion rates from existing traffic?"],
    idealFor: "E-commerce and SaaS platforms with established traffic.",
    deliverables: [{ title: "Conversion Architecture Review", desc: "UX audit and form optimization refactor." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Project refactor fee.",
    relevantEvidenceIds: ["buy-secondhand-book"],
    relatedServices: { secondaryIds: ["landing_page"], futureIds: ["crm_automation"] },
    faqs: [{ question: "What results can we expect?", answer: "Focuses on friction removal, form clarity, and sub-second page rendering." }],
    keywords: ["conversion optimization", "website ux refactor", "cro audit"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "seo_ready",
    segmentId: "design-services",
    name: "SEO-Ready Website Engineering",
    slug: "seo-ready-website-engineering",
    canonicalUrl: "https://www.digixpro.in/design-services/seo-ready-website-engineering",
    summary: "Engineering website architecture with complete technical SEO, JSON-LD schema, open graph metadata, and semantic markup out of the box.",
    buyerProblem: ["New website not indexed properly", "Missing meta descriptions", "Invalid canonical tags"],
    buyerQuestions: ["Is the website built SEO-ready from day one?"],
    idealFor: "New brand launches and major technical site rebuilds.",
    deliverables: [{ title: "SEO Plumbing & Schema Integration", desc: "100% Lighthouse SEO compliance." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Included in standard custom web engineering projects.",
    relevantEvidenceIds: ["digixpro", "scan-centre"],
    relatedServices: { secondaryIds: ["seo"], futureIds: ["geo"] },
    faqs: [{ question: "Does this include monthly SEO?", answer: "SEO-Ready Engineering covers the initial technical foundation. Monthly search growth is a separate service." }],
    keywords: ["seo ready website", "technical seo engineering", "schema markup"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },

  // Segment 03: Search, AI & Automation
  {
    id: "seo",
    segmentId: "search-automation",
    name: "SEO & Search Visibility",
    slug: "seo-search-visibility",
    canonicalUrl: "https://www.digixpro.in/search-automation/seo-search-visibility",
    summary: "Technical SEO, organic search strategy, and search engine visibility for sustainable non-paid growth.",
    buyerProblem: ["Low Google organic visibility", "Over-reliance on paid ads", "Keyword ranking loss"],
    buyerQuestions: ["How long does organic SEO take to yield results?"],
    idealFor: "Businesses building long-term organic discovery.",
    deliverables: [{ title: "Technical SEO & Search Strategy", desc: "Audit, schema plumbing, and content optimization." }],
    commercialModel: "Monthly Performance Engineering",
    pricingReference: "Monthly engineering retainer.",
    relevantEvidenceIds: ["dr-aggarwal", "scan-centre"],
    relatedServices: { secondaryIds: ["geo", "local_seo"], futureIds: ["ai_automation"] },
    faqs: [{ question: "Do you guarantee #1 rankings?", answer: "No ethical practitioner guarantees #1 rankings. We engineer strict technical compliance and authoritative content search signals." }],
    keywords: ["seo services", "search visibility", "organic google ranking"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "geo",
    segmentId: "search-automation",
    name: "AI Search Optimization & GEO",
    slug: "ai-search-optimization-geo",
    canonicalUrl: "https://www.digixpro.in/search-automation/ai-search-optimization-geo",
    summary: "Generative Engine Optimization (GEO) to ensure your business is cited accurately by ChatGPT, Claude, Perplexity, and Gemini.",
    buyerProblem: ["Invisible to AI search engines", "AI hallucinating incorrect company details"],
    buyerQuestions: ["How do we get featured in ChatGPT and Perplexity recommendations?"],
    idealFor: "Brands wanting AI search visibility.",
    deliverables: [{ title: "GEO Machine-Readable Context Plumbing", desc: "JSON-LD entity graphs, llms.txt integration, and citation engineering." }],
    commercialModel: "Monthly Performance Engineering",
    pricingReference: "Monthly GEO performance scope.",
    relevantEvidenceIds: ["sattvaos", "digixpro"],
    relatedServices: { secondaryIds: ["seo"], futureIds: ["ai_automation"] },
    faqs: [{ question: "What is GEO?", answer: "Generative Engine Optimization structures machine-readable content so AI engines cite your business directly." }],
    keywords: ["geo consulting", "ai search optimization", "chatgpt search visibility"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "local_seo",
    segmentId: "search-automation",
    name: "Local SEO & Local Lead Visibility",
    slug: "local-seo-lead-visibility",
    canonicalUrl: "https://www.digixpro.in/search-automation/local-seo-lead-visibility",
    summary: "Dominating local Google Map Pack rankings and local search queries for clinics, stores, and regional service providers.",
    buyerProblem: ["Low Google Maps visibility", "Competitors dominating 'near me' queries"],
    buyerQuestions: ["How do local clinics attract nearby patients via search?"],
    idealFor: "Healthcare clinics, physical diagnostic centres, local professional practices.",
    deliverables: [{ title: "Local Map Pack & GMB Optimization", desc: "Citation cleanup, local schema, and review signals." }],
    commercialModel: "Monthly Performance Engineering",
    pricingReference: "Monthly local search scope.",
    relevantEvidenceIds: ["dr-aggarwal", "scan-centre"],
    relatedServices: { secondaryIds: ["small_business"], futureIds: ["crm_automation"] },
    faqs: [{ question: "How fast do local search rankings improve?", answer: "Local Map Pack optimizations usually show initial traction within 30 to 60 days." }],
    keywords: ["local seo", "google map pack", "local clinic leads"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "social_media",
    segmentId: "search-automation",
    name: "Social Media Management & Content Systems",
    slug: "social-media-management",
    canonicalUrl: "https://www.digixpro.in/search-automation/social-media-management",
    summary: "Structured social content systems, brand asset templates, and campaign collateral design.",
    buyerProblem: ["Inconsistent social posting", "Poor brand collateral quality"],
    buyerQuestions: ["Do you offer social media content design?"],
    idealFor: "Brands needing systematic creative assets.",
    deliverables: [{ title: "Social Content & Brand Asset System", desc: "Design templates, content calendar structure, and campaign assets." }],
    commercialModel: "Monthly Performance Engineering",
    pricingReference: "Monthly content retainer.",
    relevantEvidenceIds: ["muktibodh"],
    relatedServices: { secondaryIds: ["website"], futureIds: ["ai_automation"] },
    faqs: [{ question: "Does this include ad spend management?", answer: "Creative assets and content strategy are included. Paid media buying is scoped separately." }],
    keywords: ["social media management", "content systems", "brand collateral"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "ai_automation",
    segmentId: "search-automation",
    name: "Workflow & AI Automation",
    slug: "workflow-ai-automation",
    canonicalUrl: "https://www.digixpro.in/search-automation/workflow-ai-automation",
    summary: "Automating internal business processes, n8n webhook workflows, document parsing, and AI automation queues.",
    buyerProblem: ["Manual data entry bottlenecks", "Disconnected software tools"],
    buyerQuestions: ["How can n8n or AI automate our business workflows?"],
    idealFor: "Companies replacing manual work with automated n8n pipelines.",
    deliverables: [{ title: "n8n Workflow Automation Architecture", desc: "Asynchronous webhook pipelines and exception handlers." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Project or monthly automation scope.",
    relevantEvidenceIds: ["nirvandham", "digixpro"],
    relatedServices: { secondaryIds: ["crm_automation"], futureIds: ["systems_arch"] },
    faqs: [{ question: "Do we need expensive enterprise licenses?", answer: "We leverage open n8n and API webhooks without unnecessary software markups." }],
    keywords: ["n8n automation", "workflow automation", "ai process automation"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "crm_automation",
    segmentId: "search-automation",
    name: "Lead Capture, CRM & Sales Automation",
    slug: "lead-capture-crm-sales-automation",
    canonicalUrl: "https://www.digixpro.in/search-automation/lead-capture-crm-sales-automation",
    summary: "Instant lead routing from website forms to WhatsApp alerts, CRM database, and team notification channels.",
    buyerProblem: ["Delayed lead follow-up", "Leads getting lost in email inboxes"],
    buyerQuestions: ["Can website leads automatically trigger WhatsApp notifications and CRM updates?"],
    idealFor: "Sales teams and clinic reception desks requiring instant lead alerts.",
    deliverables: [{ title: "Automated Lead Funnel Plumbing", desc: "Instant Webhook -> WhatsApp -> CRM integration." }],
    commercialModel: "Milestone-Based Fixed Scope",
    pricingReference: "Fixed funnel automation fee.",
    relevantEvidenceIds: ["nirvandham", "dr-aggarwal"],
    relatedServices: { secondaryIds: ["ai_automation"], futureIds: ["systems_arch"] },
    faqs: [{ question: "How fast are WhatsApp lead alerts delivered?", answer: "Instantaneous (sub-second) execution via n8n event webhooks." }],
    keywords: ["crm automation", "whatsapp lead alert", "sales automation"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  }
];

// ============================================================================
// 4. 9 EVIDENCE CASE STUDY RECORDS
// ============================================================================
export const CANONICAL_EVIDENCE: EvidenceRecord[] = [
  {
    id: "dr-aggarwal",
    name: "Dr Aggarwal Physio Centre",
    canonicalUrl: "https://www.digixpro.in/evidence/dr-aggarwal",
    projectType: "Healthcare Local Search & Clinic Enquiry Capture",
    capabilities: ["Local Map Pack SEO", "Clinic Booking Flow", "WhatsApp Lead Routing"],
    factualScope: "Deployed local SEO and digital booking architecture for a multi-specialty physiotherapy practice in Delhi-NCR.",
    relevantServiceIds: ["local_seo", "small_business", "crm_automation"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/dr-aggarwal"],
    metrics: ["#1 Local Map Pack rankings for local physio queries", "Sub-second WhatsApp lead notifications"],
    status: "ACTIVE",
    lastUpdated: "2024-01-15"
  },
  {
    id: "scan-centre",
    name: "Scan Centre Near Me",
    canonicalUrl: "https://www.digixpro.in/evidence/scan-centre",
    projectType: "Diagnostic Discovery Network & High-Intent SEO",
    capabilities: ["Diagnostic Location Architecture", "High-Volume SEO Plumbing", "PHI Data Isolation"],
    factualScope: "Engineered scalable search discovery platform connecting patients with accredited diagnostic scan centers.",
    relevantServiceIds: ["seo", "local_seo", "seo_ready"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/scan-centre"],
    metrics: ["Multi-city local search coverage", "Zero PHI compliance leakage"],
    status: "ACTIVE",
    lastUpdated: "2023-11-20"
  },
  {
    id: "buy-secondhand-book",
    name: "Buy Second Hand Books Marketplace",
    canonicalUrl: "https://www.digixpro.in/evidence/buy-secondhand-book",
    projectType: "Decoupled Marketplace Inventory Architecture",
    capabilities: ["Decoupled Inventory Engine", "Asynchronous Order Queues", "High-Catalog UX"],
    factualScope: "Architected scalable multi-vendor book marketplace isolating stock updates from core order processing pipelines.",
    relevantServiceIds: ["website", "conversion_opt", "systems_arch"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/buy-secondhand-book"],
    metrics: ["Zero inventory transaction lockups during peak sales"],
    status: "ACTIVE",
    lastUpdated: "2024-01-15"
  },
  {
    id: "sattvaos",
    name: "SattvaOS AI Architecture",
    canonicalUrl: "https://www.digixpro.in/evidence/sattvaos",
    projectType: "Governed Multi-Tenant AI Platform",
    capabilities: ["Tenant Isolation", "RAG Prompt Guardrails", "AI Systems Advisory"],
    factualScope: "Designed schema-level multi-tenant security and LLM context injection protocols for enterprise AI applications.",
    relevantServiceIds: ["geo", "it_consulting", "tech_roadmaps"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/sattvaos"],
    metrics: ["100% strict row-level security isolation across tenant LLM queries"],
    status: "ACTIVE",
    lastUpdated: "2024-03-10"
  },
  {
    id: "aatma-guru",
    name: "aatma.guru",
    canonicalUrl: "https://www.digixpro.in/evidence/aatma-guru",
    projectType: "AI Knowledge Base & Content System",
    capabilities: ["Structured Entity Indexing", "AI Retrieval Plumbing"],
    factualScope: "Engineered high-performance knowledge retrieval platform indexing unstructured domain content.",
    relevantServiceIds: ["geo", "website"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/aatma-guru"],
    metrics: ["Sub-second vector context retrieval"],
    status: "ACTIVE",
    lastUpdated: "2024-02-28"
  },
  {
    id: "nirvandham",
    name: "Nirvandham Operations",
    canonicalUrl: "https://www.digixpro.in/evidence/nirvandham",
    projectType: "Custom Operating System & Automated Lead Pipeline",
    capabilities: ["Custom Business Operating System", "n8n Workflow Automation", "Lead Capture Plumbing"],
    factualScope: "Replaced fragmented messaging and paper processes with a unified custom business operating system.",
    relevantServiceIds: ["systems_arch", "ai_automation", "crm_automation"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/nirvandham"],
    metrics: ["Eliminated manual data entry overhead across core operational teams"],
    status: "ACTIVE",
    lastUpdated: "2024-02-28"
  },
  {
    id: "muktibodh",
    name: "Muktibodh Publishing System",
    canonicalUrl: "https://www.digixpro.in/evidence/muktibodh",
    projectType: "Publishing & Digital Brand Collateral Architecture",
    capabilities: ["Editorial Content Architecture", "Brand System Design"],
    factualScope: "Engineered digital publishing platform and structured typography asset system.",
    relevantServiceIds: ["social_media", "website"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/muktibodh"],
    metrics: ["Standardized brand collateral workflows across multi-author publishing pipeline"],
    status: "ACTIVE",
    lastUpdated: "2023-09-05"
  },
  {
    id: "digixpro",
    name: "DigiXPro — Our Own Architecture",
    canonicalUrl: "https://www.digixpro.in/evidence/digixpro",
    projectType: "Decoupled Web & n8n AI Assist Infrastructure",
    capabilities: ["Next.js SSG/ISR", "n8n Webhook AI Assist", "Sub-second Page Load"],
    factualScope: "Our own production website: Next.js static architecture connected with n8n central brain workflows.",
    relevantServiceIds: ["website", "seo_ready", "ai_automation"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/digixpro"],
    metrics: ["Sub-second page speeds", "Zero server execution lag"],
    status: "ACTIVE",
    lastUpdated: "2024-05-15"
  },
  {
    id: "360-neck-shoulder",
    name: "360 Neck & Shoulder Care",
    canonicalUrl: "https://www.digixpro.in/evidence/360-neck-shoulder",
    projectType: "Healthcare Service UX & Conversion Architecture",
    capabilities: ["Medical Web UX", "Mobile Conversion Funnel", "Service Landing Page"],
    factualScope: "Designed specialized patient acquisition web layout for a clinical neck and shoulder treatment center.",
    relevantServiceIds: ["small_business", "website", "landing_page"],
    proofAvailable: true,
    liveLinks: ["https://www.digixpro.in/evidence/360-neck-shoulder"],
    metrics: ["Increased mobile enquiry conversion rate"],
    status: "ACTIVE",
    lastUpdated: "2024-05-15"
  }
];

// ============================================================================
// 5. BLOG & KNOWLEDGE CONTENT INDEX (With Freshness Status)
// ============================================================================
export const CANONICAL_KNOWLEDGE_ARTICLES: KnowledgeContentRecord[] = [
  {
    id: "asynchronous-event-queues-decoupling-monoliths-for-high-throughput-enterprise-architecture",
    pillar: "Operations & Automation",
    title: "Asynchronous Event Queues: Decoupling Monoliths for High-Throughput Enterprise Architecture",
    summary: "Decoupling monolithic enterprise systems through asynchronous event queues prevents transactional database locking and supports high-throughput workload handling.",
    canonicalUrl: "https://www.digixpro.in/knowledge/asynchronous-event-queues-decoupling-monoliths-for-high-throughput-enterprise-architecture",
    content: "Enterprise architectures often experience severe degradation when database operations lock main transactional loops. Under Technology Advisory by Dr. Ajay Shukla at DigiXPro, decoupled event queues isolate workloads to sustain high throughput.",
    keywords: ["asynchronous queues", "monolith decoupling", "enterprise architecture", "n8n automation"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "why-a-custom-business-operating-system-outperforms-generic-erp-templates",
    pillar: "Business Systems",
    title: "Why a Custom Business Operating System Outperforms Generic ERP Templates",
    summary: "Adopting a custom Business Operating System allows growing enterprises to decouple bounded contexts, enforce domain governance, and achieve horizontal scalability beyond generic ERP template limits.",
    canonicalUrl: "https://www.digixpro.in/knowledge/why-a-custom-business-operating-system-outperforms-generic-erp-templates",
    content: "Generic ERP templates force rigid workflows on unique businesses. Custom operating systems decouple bounded contexts and structure data pipelines around actual business domain logic.",
    keywords: ["custom business operating system", "erp templates vs custom os", "domain driven design"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "scaling-past-the-human-bottleneck-why-manual-approvals-stifle-modern-enterprise-architecture",
    pillar: "Operations & Automation",
    title: "Scaling Past the Human Bottleneck: Why Manual Approvals Stifle Modern Enterprise Architecture",
    summary: "As enterprises scale, manual gates introduce operational latency and systemic bottlenecks that automated policy-as-code governance resolves.",
    canonicalUrl: "https://www.digixpro.in/knowledge/scaling-past-the-human-bottleneck-why-manual-approvals-stifle-modern-enterprise-architecture",
    content: "Manual approval threads slow down deployments and operations. Automated policy guardrails and n8n event pipelines maintain speed while preserving compliance audit trails.",
    keywords: ["automation bottleneck", "workflow automation", "policy as code"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "website-redesign-cost-guide",
    pillar: "Technology Architecture",
    title: "What Does a Website Redesign Actually Cost in 2026?",
    summary: "Comprehensive cost breakdown comparing agency retainers, custom Next.js builds, and template budget pitfalls.",
    canonicalUrl: "https://www.digixpro.in/knowledge/website-redesign-cost-guide",
    content: "Website pricing varies by architecture. Low-budget template builds range ₹10,000-₹50,000; custom enterprise Next.js engineering starts above ₹1,00,000 / $1,500 due to technical SEO, custom UI, and sub-second performance requirements.",
    keywords: ["website redesign cost", "website pricing", "custom nextjs cost"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "common-branding-mistakes",
    pillar: "Design & Brand",
    title: "The Most Common Branding Mistakes Growing Businesses Make",
    summary: "Why superficial logo tweaks fail without structured content systems and brand asset governance.",
    canonicalUrl: "https://www.digixpro.in/knowledge/common-branding-mistakes",
    content: "Branding is not just a logo graphic; it is a systematic design asset framework that aligns social collateral, website UX, and campaign messaging.",
    keywords: ["branding mistakes", "social media content systems", "brand collateral"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  },
  {
    id: "crm-vs-erp",
    pillar: "Business Systems",
    title: "CRM vs ERP: What You Actually Need to Fix Your Operations",
    summary: "Clarifying customer relationship management versus enterprise resource planning to avoid unnecessary software licensing expenses.",
    canonicalUrl: "https://www.digixpro.in/knowledge/crm-vs-erp",
    content: "CRMs manage customer touchpoints and lead capture; ERPs manage inventory and financials. Buying a heavy ERP when you only need CRM sales automation leads to wasted software spend.",
    keywords: ["crm vs erp", "lead capture automation", "sales pipeline"],
    status: "ACTIVE",
    lastUpdated: "2026-08-25"
  }
];

// ============================================================================
// 6. RETRIEVAL & FRESHNESS ENGINE
// ============================================================================
/**
 * Retrieve relevant, non-archived context matching the user query or page context
 */
export function retrieveRelevantContext(
  query: string,
  pageUrl?: string,
  options?: { includeDrafts?: boolean }
): {
  company: CompanyRecord;
  matchedServices: ServiceRecord[];
  matchedEvidence: EvidenceRecord[];
  matchedArticles: KnowledgeContentRecord[];
  activeUrls: CanonicalUrlRecord[];
} {
  const q = query.toLowerCase();
  const allowDrafts = options?.includeDrafts ?? false;

  // Filter active services (never return ARCHIVED)
  const activeServices = CANONICAL_SERVICES.filter(s => 
    s.status === 'ACTIVE' || (allowDrafts && s.status === 'DRAFT')
  );

  // Match services by keyword or slug
  const matchedServices = activeServices.filter(s => 
    s.keywords.some(k => q.includes(k.toLowerCase())) ||
    q.includes(s.name.toLowerCase()) ||
    q.includes(s.slug.toLowerCase()) ||
    (pageUrl && pageUrl.includes(s.slug))
  );

  // Match evidence case studies
  const activeEvidence = CANONICAL_EVIDENCE.filter(e => 
    e.status === 'ACTIVE' || (allowDrafts && e.status === 'DRAFT')
  );
  
  const matchedEvidenceIds = new Set<string>();
  matchedServices.forEach(s => s.relevantEvidenceIds.forEach(id => matchedEvidenceIds.add(id)));

  const matchedEvidence = activeEvidence.filter(e => 
    matchedEvidenceIds.has(e.id) ||
    e.capabilities.some(c => q.includes(c.toLowerCase())) ||
    q.includes(e.name.toLowerCase()) ||
    q.includes(e.id.toLowerCase())
  );

  // Match knowledge articles (never return ARCHIVED)
  const activeArticles = CANONICAL_KNOWLEDGE_ARTICLES.filter(a => 
    a.status === 'ACTIVE' || (allowDrafts && a.status === 'DRAFT')
  );

  const matchedArticles = activeArticles.filter(a => 
    a.keywords.some(k => q.includes(k.toLowerCase())) ||
    q.includes(a.id.toLowerCase()) ||
    q.includes(a.title.toLowerCase())
  );

  return {
    company: COMPANY_MASTER,
    matchedServices: matchedServices.slice(0, 2), // Max 2 for prompt conciseness
    matchedEvidence: matchedEvidence.slice(0, 1), // Max 1 for link discipline
    matchedArticles: matchedArticles.slice(0, 1),
    activeUrls: CANONICAL_URL_REGISTRY
  };
}
