export interface AdvisoryFAQItem {
  question: string;
  answer: string;
}

export interface AdvisoryDeliverable {
  title: string;
  desc: string;
}

export interface AdvisoryServiceItem {
  slug: string;
  title: string;
  buyerQuestion: string;
  buyerSituation: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  category: string;
  badgeText: string;
  heroHeading: string;
  heroSubheading: string;
  shortDesc: string;
  problemHeading: string;
  problemPoints: string[];
  solutionHeading: string;
  deliverables: AdvisoryDeliverable[];
  evidenceText: string;
  evidenceLink: string;
  evidenceTitle: string;
  faqs: AdvisoryFAQItem[];
  ctaHeading: string;
  ctaButtonText: string;
  ctaSubtext: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
}

export const ADVISORY_SERVICES: AdvisoryServiceItem[] = [
  // =========================================================================
  // 01 — IT CONSULTING & TECHNOLOGY STRATEGY
  // =========================================================================
  {
    slug: "it-consulting-technology-strategy",
    title: "IT Consulting & Technology Strategy",
    buyerQuestion: "Is our technology direction actually right?",
    buyerSituation: "Before you invest in another system, understand what your business actually needs.",
    primaryKeyword: "IT consulting services",
    supportingKeywords: [
      "IT consulting",
      "IT strategy consulting",
      "technology consulting",
      "technology strategy",
      "IT architecture consulting",
      "technology architecture consulting"
    ],
    category: "Strategy & Governance",
    badgeText: "Independent Tech Direction",
    heroHeading: "IT Consulting & Strategic Technology Advisory.",
    heroSubheading: "We evaluate your current technology stack, identify architecture risks, eliminate technical debt, and establish clear technology priorities before major investments are made.",
    shortDesc: "Independent evaluation of current technology direction, architecture risk assessment, technology priorities, and strategic IT alignment.",
    problemHeading: "Technology Strategy Friction We Diagnose",
    problemPoints: [
      "Uncertainty over whether your current IT infrastructure will support your next 3 years of business growth.",
      "Fragmented software systems bought over time without an overarching technology direction.",
      "High recurring SaaS license bills with zero clarity on operational ROI or actual employee adoption.",
      "Internal engineering teams or external IT vendors proposing expensive upgrades without clear business alignment."
    ],
    solutionHeading: "Strategic IT Deliverables You Receive",
    deliverables: [
      { title: "Independent IT Stack Audit", desc: "Diagnostic review of existing software, infrastructure dependencies, and scalability bottlenecks." },
      { title: "Technical Debt & Risk Matrix", desc: "Prioritized assessment of security risks, single points of failure, and high-maintenance legacy code." },
      { title: "Strategic Technology Direction Blueprint", desc: "Target technology state mapping software integrations, data flows, and architectural standards." },
      { title: "Executive Prioritization Roadmap", desc: "Clear sequencing of technology initiatives based on operational urgency, risk mitigation, and ROI." }
    ],
    evidenceTitle: "DigiXPro Platform Architecture",
    evidenceText: "DigiXPro operates on the same architecture principles it recommends: a decoupled Next.js static architecture with pre-rendered production pages, structured web engineering, technical SEO, and production lead infrastructure.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "How does IT strategy consulting differ from hiring an IT support vendor?",
        answer: "IT support vendors maintain daily workstations and servers. IT strategy consulting evaluates your overall business architecture, software investments, technology direction, and scalability before major capital allocation."
      },
      {
        question: "Why should we review our technology strategy before buying new software?",
        answer: "Purchasing software without a clear technology strategy often leads to duplicate SaaS subscriptions, broken integrations, low employee adoption, and expensive rebuilds within 12 to 18 months."
      },
      {
        question: "Can DigiXPro work alongside our internal IT team or existing software vendors?",
        answer: "Yes. We act as independent technical advisors. We provide objective architectural decision support, enabling internal teams or external vendors to execute with clarity."
      }
    ],
    ctaHeading: "Unsure if your current technology direction aligns with business goals?",
    ctaButtonText: "Discuss Your Technology Strategy",
    ctaSubtext: "Book a 30-minute discovery call to evaluate your IT infrastructure and strategic options.",
    lastUpdated: "2026-08-26",
    metaTitle: "IT Consulting Services & Technology Strategy Advisory | DigiXPro",
    metaDescription: "Independent IT consulting services and technology architecture advisory for growing enterprises. Evaluate technology direction before major capital investments."
  },

  // =========================================================================
  // 02 — TECHNOLOGY DUE DILIGENCE & VENDOR EVALUATION
  // =========================================================================
  {
    slug: "technology-due-diligence-vendor-evaluation",
    title: "Technology Due Diligence & Vendor Evaluation",
    buyerQuestion: "Are we choosing the right software, platform or technology vendor?",
    buyerSituation: "About to buy, replace or inherit a major technology system? Review the decision before the commitment.",
    primaryKeyword: "technology due diligence",
    supportingKeywords: [
      "vendor evaluation consulting",
      "software evaluation framework",
      "CRM ERP evaluation",
      "build vs buy decision",
      "technical proposal review"
    ],
    category: "Risk Mitigation & Selection",
    badgeText: "Vendor-Neutral Evaluation",
    heroHeading: "Technology Due Diligence & Vendor Evaluation Advisory.",
    heroSubheading: "Protect your capital before signing major software contracts. We perform independent vendor evaluation, technical proposal reviews, build-vs-buy analysis, and license cost verification.",
    shortDesc: "Independent software evaluation, vendor due diligence, technical proposal reviews, build-vs-buy decision models, and SaaS license auditing.",
    problemHeading: "Vendor & Software Risks We Protect You Against",
    problemPoints: [
      "Aggressive sales presentations pushing proprietary vendor lock-in and hidden per-user licensing fees.",
      "Complex technical proposals from development agencies containing realistic-sounding but unverified claims.",
      "Uncertainty whether to build custom software in-house or configure an off-the-shelf commercial platform.",
      "Historical software purchases that failed to deliver promised features or required expensive custom workarounds."
    ],
    solutionHeading: "Due Diligence Deliverables You Receive",
    deliverables: [
      { title: "Vendor & Software Evaluation Matrix", desc: "Objective scoring of candidate platforms against your actual operational requirements." },
      { title: "Build-vs-Buy Decision Model", desc: "Financial and technical comparison evaluating total cost of ownership over a 3-year operating horizon." },
      { title: "Technical Proposal & Risk Review", desc: "Inspection of vendor scopes, SLA commitments, architecture claims, and security standards." },
      { title: "License & Contract Optimization Audit", desc: "Identifying redundant user tiers, unnecessary add-ons, and hidden vendor contract penalties." }
    ],
    evidenceTitle: "SattvaOS Institutional Vendor Evaluation",
    evidenceText: "Evaluated complex multi-vendor software proposals and architected an independent institutional operating framework, protecting leadership from redundant software licensing.",
    evidenceLink: "/evidence/sattvaos",
    faqs: [
      {
        question: "Why should we hire an independent advisor to evaluate technology vendors?",
        answer: "Software vendors and implementation agencies have a financial incentive to sell their specific products or maximize billable development hours. DigiXPro accepts zero vendor commissions, providing 100% objective recommendations."
      },
      {
        question: "How does DigiXPro conduct a build-vs-buy assessment?",
        answer: "We analyze your functional requirements, internal technical capabilities, long-term maintenance costs, and integration requirements to determine whether configuring commercial software or building a custom application delivers superior ROI."
      },
      {
        question: "Can DigiXPro review a vendor proposal we have already received?",
        answer: "Yes. We review technical proposals, architecture blueprints, line-item pricing, and implementation timelines to highlight hidden risks, missing requirements, or unrealistic milestone assumptions."
      }
    ],
    ctaHeading: "Evaluating a major software purchase or vendor proposal?",
    ctaButtonText: "Review a Technology Decision",
    ctaSubtext: "Schedule a 30-minute discovery call to evaluate vendor proposals before signing contracts.",
    lastUpdated: "2026-08-26",
    metaTitle: "Technology Due Diligence & Vendor Evaluation Advisory | DigiXPro",
    metaDescription: "Independent technology due diligence, vendor evaluation, build-vs-buy analysis, and software proposal reviews to protect growing businesses from vendor risk."
  },

  // =========================================================================
  // 03 — DIGITAL TRANSFORMATION CONSULTING
  // =========================================================================
  {
    slug: "digital-transformation-consulting",
    title: "Digital Transformation Consulting",
    buyerQuestion: "Our business has outgrown the way we currently operate — how should technology help us transform?",
    buyerSituation: "Your business has outgrown its current tools and processes. Map the transformation before buying more software.",
    primaryKeyword: "digital transformation consulting",
    supportingKeywords: [
      "process first digital transformation",
      "business transformation consulting",
      "operational technology alignment",
      "enterprise digital strategy",
      "digital transformation roadmap"
    ],
    category: "Operational Scaling",
    badgeText: "Process-First Transformation",
    heroHeading: "Process-First Digital Transformation Consulting.",
    heroSubheading: "We align your Business Goals, People, Processes, Information Flows, and Technology. Modernize legacy operations without breaking daily business continuity.",
    shortDesc: "Process-first digital transformation aligning operational hierarchy (Business -> People -> Process -> Information -> Technology) for sustainable scaling.",
    problemHeading: "Transformation Friction Points We Resolve",
    problemPoints: [
      "Operational chaos where manual workarounds and employee fatigue limit revenue growth.",
      "Software tools introduced over time that created disconnected data silos instead of streamlining operations.",
      "Employee resistance to new digital systems caused by tools chosen without consulting operational workflows.",
      "Past digital transformation initiatives that stalled mid-way due to unclear sequencing and changing scope."
    ],
    solutionHeading: "Digital Transformation Deliverables You Receive",
    deliverables: [
      { title: "Business-to-Technology Alignment Map", desc: "Connecting strategic growth goals directly to operational workflows and technology capabilities." },
      { title: "Operational & People Readiness Blueprint", desc: "Auditing team workflows, training needs, and change governance before software deployment." },
      { title: "Phased Transformation Roadmap", desc: "Sequenced milestone plan delivering operational value incrementally without business disruption." },
      { title: "Transformation Governance Framework", desc: "KPI benchmarks and empirical verification protocols to ensure transformation goals are met." }
    ],
    evidenceTitle: "360 Neck & Shoulder Patient Workflow Optimization",
    evidenceText: "Re-engineered healthcare discovery, lead management, and patient enquiry communication workflows into a structured digital operating pipeline.",
    evidenceLink: "/evidence/360-neck-shoulder",
    faqs: [
      {
        question: "What does 'process-first' digital transformation mean?",
        answer: "Process-first transformation maps and optimizes human workflows, departmental handoffs, and data hygiene before selecting or building software. Software is the enabler of optimized processes, not the starting point."
      },
      {
        question: "How do you ensure employee adoption during digital transformation?",
        answer: "We involve key department staff early during operational workflow observation, designing software tools that reduce daily administrative friction rather than imposing rigid extra work."
      },
      {
        question: "How long does a typical digital transformation advisory project take?",
        answer: "Initial operational diagnostics and transformation roadmap definition take 3 to 6 weeks. Phased implementation milestones follow based on operational priority."
      }
    ],
    ctaHeading: "Ready to map digital transformation around your actual business operations?",
    ctaButtonText: "Discuss Your Transformation Roadmap",
    ctaSubtext: "Book a 30-minute discovery call to evaluate your operational hierarchy and transformation readiness.",
    lastUpdated: "2026-08-26",
    metaTitle: "Digital Transformation Consulting | Process-First Advisory | DigiXPro",
    metaDescription: "Process-first digital transformation consulting for mid-market businesses. Align business goals, human workflows, processes, and software tools."
  },

  // =========================================================================
  // 04 — BUSINESS SYSTEMS & PROCESS ARCHITECTURE
  // =========================================================================
  {
    slug: "business-systems-process-architecture",
    title: "Business Systems & Process Architecture",
    buyerQuestion: "How should our business processes and systems actually work together?",
    buyerSituation: "Disconnected departments, spreadsheets, WhatsApp workflows and manual handoffs indicate a systems problem, not simply a software problem.",
    primaryKeyword: "business systems process architecture",
    supportingKeywords: [
      "business process architecture",
      "operational workflow mapping",
      "departmental integration consulting",
      "business systems design",
      "information flow architecture"
    ],
    category: "Systems Engineering",
    badgeText: "Connected Operating OS",
    heroHeading: "Business Systems & Process Architecture Advisory.",
    heroSubheading: "Eliminate spreadsheet chaos and fragmented communication. We design connected operating systems where sales, operations, finance, and reporting run as one workflow.",
    shortDesc: "Designing unified business systems, mapping departmental handoffs, structuring information flows, and integrating CRM/ERP operating software.",
    problemHeading: "System Disconnects We Map & Re-Architect",
    problemPoints: [
      "Departments operating in isolation, using separate spreadsheets, chats, and un-synced software applications.",
      "Manual data re-entry required at every stage when a lead becomes a deal, order, project, and invoice.",
      "Lack of real-time operational dashboard visibility for executive leadership due to inconsistent data sources.",
      "High operational overhead where extra administrative staff are required simply to manage manual handoffs."
    ],
    solutionHeading: "Systems & Process Deliverables You Receive",
    deliverables: [
      { title: "Operational Workflow & Information Flow Map", desc: "Detailed visual blueprint mapping data journeys across sales, operations, finance, and support." },
      { title: "Departmental Handoff & Integration Matrix", desc: "Clear protocols and automated triggers defining exact responsibilities at every operational transition." },
      { title: "Centralized Data Architecture Model", desc: "Single source of truth data schema ensuring consistent customer and transaction records." },
      { title: "Systems Integration Specification Blueprint", desc: "Technical API and webhook requirements for developers to connect CRMs, ERPs, and web forms." }
    ],
    evidenceTitle: "SattvaOS Integrated Operating Blueprint",
    evidenceText: "Architected centralized information flows and automated departmental handoffs, connecting operational data feeds into a unified management system.",
    evidenceLink: "/evidence/sattvaos",
    faqs: [
      {
        question: "What is the difference between a software tool and a business system?",
        answer: "A software tool (e.g. CRM, accounting app) performs specific isolated functions. A business system defines how data, human actions, and software tools work together across departments to deliver business outcomes."
      },
      {
        question: "How do you eliminate reliance on spreadsheets and WhatsApp groups?",
        answer: "We map unstructured communication into structured data capture points (web forms, automated webhooks, task boards) so information updates automatically without manual copy-pasting."
      },
      {
        question: "Can process architecture be designed without replacing our existing CRM or ERP?",
        answer: "Yes. In most cases, we integrate and optimize existing software tools using custom webhooks and API handoffs, saving capital while eliminating operational silos."
      }
    ],
    ctaHeading: "Facing departmental silos, manual handoffs, or spreadsheet clutter?",
    ctaButtonText: "Map Your Business Systems",
    ctaSubtext: "Schedule a 30-minute discovery call to map your business processes into one connected system.",
    lastUpdated: "2026-08-26",
    metaTitle: "Business Systems & Process Architecture Advisory | DigiXPro",
    metaDescription: "Design unified business systems and process architecture. Eliminate spreadsheet silos, automate departmental handoffs, and integrate core operating software."
  },

  // =========================================================================
  // 05 — TECHNOLOGY ROADMAPS & ARCHITECTURE
  // =========================================================================
  {
    slug: "technology-roadmaps-architecture",
    title: "Technology Roadmaps & Architecture",
    buyerQuestion: "What should our technology architecture and roadmap look like over the next stage of growth?",
    buyerSituation: "You know technology needs to change. The difficult part is knowing what to change first.",
    primaryKeyword: "technology roadmap consulting",
    supportingKeywords: [
      "target technology architecture",
      "IT roadmap planning",
      "scalable tech architecture",
      "technology roadmap sequencing",
      "systems scalability blueprint"
    ],
    category: "Architecture & Planning",
    badgeText: "Target State Architecture",
    heroHeading: "Technology Roadmaps & Target Architecture Advisory.",
    heroSubheading: "Build a clear, phased technology roadmap. We define target system architecture, sequence initiatives by operational ROI and technical dependency, and ensure scalability.",
    shortDesc: "Architecting target technology blueprints, sequencing implementation roadmaps, evaluating technical dependencies, and establishing scaling frameworks.",
    problemHeading: "Roadmap & Architecture Challenges We Resolve",
    problemPoints: [
      "Leadership knowing technology needs upgrading, but lacking clarity on which projects to sequence first.",
      "Parallel software initiatives competing for budget and engineering capacity without clear dependencies.",
      "Architecture built for current size that will break when transaction volume or user numbers double.",
      "Wasted expenditure on advanced automation or AI tools deployed before core data foundations were ready."
    ],
    solutionHeading: "Roadmap & Architecture Deliverables You Receive",
    deliverables: [
      { title: "Target State Technology Architecture Blueprint", desc: "Technical diagram of your future software, data, integration, and security layers." },
      { title: "Sequenced 3-Phase Implementation Roadmap", desc: "Prioritized project sequence detailing Phase 1 Quick Wins, Phase 2 Core Systems, and Phase 3 Scaling." },
      { title: "Technical Dependency & Risk Matrix", desc: "Mapping software prerequisites to prevent launching dependent initiatives prematurely." },
      { title: "Resource Allocation & Budgeting Framework", desc: "Estimated engineering effort, vendor costs, and milestone timeline guidance." }
    ],
    evidenceTitle: "Nirvandham Digital Platform Architecture Roadmap",
    evidenceText: "Sequenced multi-phase platform architecture roadmap ensuring continuous operational stability while expanding digital content access.",
    evidenceLink: "/evidence/nirvandham",
    faqs: [
      {
        question: "What is a target technology architecture?",
        answer: "A target technology architecture is a visual and technical blueprint of your company's ideal software, data, security, and infrastructure state 2 to 3 years in the future."
      },
      {
        question: "How do you sequence projects on a technology roadmap?",
        answer: "We sequence projects based on operational urgency, technical dependencies, capital requirements, and speed to value — ensuring core data foundations are stabilized before complex tools are added."
      },
      {
        question: "How often should a technology roadmap be updated?",
        answer: "A technology roadmap should be reviewed quarterly to adapt to changing business growth goals, vendor updates, and emerging operational requirements."
      }
    ],
    ctaHeading: "Need a clear, sequenced technology roadmap for your next growth phase?",
    ctaButtonText: "Plan Your Technology Roadmap",
    ctaSubtext: "Book a 30-minute discovery call to map your target technology architecture and roadmap.",
    lastUpdated: "2026-08-26",
    metaTitle: "Technology Roadmaps & Architecture Advisory | DigiXPro",
    metaDescription: "Architect target technology blueprints and sequenced implementation roadmaps for growing mid-market enterprises. Build for scalability and clarity."
  },

  // =========================================================================
  // 06 — FRACTIONAL CTO & TECHNOLOGY LEADERSHIP
  // =========================================================================
  {
    slug: "fractional-cto-technology-leadership",
    title: "Fractional CTO & Technology Leadership",
    buyerQuestion: "Who can provide senior technology judgement without hiring a full-time CTO?",
    buyerSituation: "Need senior technology judgement without hiring a full-time CTO?",
    primaryKeyword: "fractional CTO services",
    supportingKeywords: [
      "fractional technology leadership",
      "interim CTO consultant",
      "executive technology decision support",
      "CTO advisory services",
      "part time CTO for business"
    ],
    category: "Executive Leadership",
    badgeText: "Senior Tech Judgement",
    heroHeading: "Fractional CTO & Executive Technology Leadership.",
    heroSubheading: "Access senior technology leadership, architectural decision-support, vendor oversight, and roadmap governance without the overhead of a full-time executive salary.",
    shortDesc: "Senior executive technology leadership, architecture decision support, vendor management, roadmap governance, and technical risk oversight.",
    problemHeading: "Leadership Gaps a Fractional CTO Fills",
    problemPoints: [
      "Non-technical founders or CEOs forced to make critical software architecture decisions without executive guidance.",
      "External agencies or internal developers operating without senior technical oversight or code quality benchmarks.",
      "Vendors missing deadlines or delivering over-budget software because leadership lacks technical audit capability.",
      "Needing strategic technical direction for quarterly board reviews and vendor negotiations on a part-time basis."
    ],
    solutionHeading: "Fractional CTO Deliverables You Receive",
    deliverables: [
      { title: "Executive Technical Decision Support", desc: "Direct advisory access for founders and CEOs during major technology evaluations and board meetings." },
      { title: "Vendor & Engineering Team Technical Governance", desc: "Active technical oversight of development agencies, contractors, and internal engineering teams." },
      { title: "Architecture & Security Standards Oversight", desc: "Establishing code standards, API security, data backup protocols, and infrastructure compliance." },
      { title: "Quarterly Roadmap & Technology Reviews", desc: "Continuous alignment of technology projects with evolving company growth objectives." }
    ],
    evidenceTitle: "Technology Architecture & Decision Governance",
    evidenceText: "Delivered executive technical direction, software evaluation models, and architecture governance across institutional projects, ensuring code standards and vendor compliance.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "What is a Fractional CTO and how does the engagement work?",
        answer: "A Fractional CTO provides part-time executive technology leadership, attending key decision meetings, managing vendors, and governing technology roadmaps for a fraction of a full-time CTO's salary."
      },
      {
        question: "When should a growing business consider a Fractional CTO instead of hiring full-time?",
        answer: "When your business requires high-level technical judgment, vendor oversight, and strategic architecture planning, but does not yet require 40 hours a week of full-time CTO management."
      },
      {
        question: "Does DigiXPro's Fractional CTO service manage our internal developers or vendors?",
        answer: "Yes. We conduct code reviews, evaluate sprint deliverables, establish technical standards, and hold external vendors or internal developers accountable for milestone delivery."
      }
    ],
    ctaHeading: "Need senior technical leadership and decision-support for your business?",
    ctaButtonText: "Discuss Fractional CTO Support",
    ctaSubtext: "Schedule a 30-minute discovery call to evaluate Fractional CTO leadership options.",
    lastUpdated: "2026-08-26",
    metaTitle: "Fractional CTO & Technology Leadership Services | DigiXPro",
    metaDescription: "Independent Fractional CTO services and executive technology leadership for mid-market businesses. Expert architecture governance and vendor oversight."
  }
];
