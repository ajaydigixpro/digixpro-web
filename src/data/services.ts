export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDeliverable {
  title: string;
  desc: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  primaryKeyword: string;
  category: string;
  track: "tech" | "design";
  badgeText: string;
  heroHeading: string;
  heroSubheading: string;
  shortDesc: string;
  problemHeading: string;
  problemPoints: string[];
  solutionHeading: string;
  solutionDeliverables: ServiceDeliverable[];
  faqs: ServiceFAQ[];
  lastUpdated: string;
}

export const services: ServiceItem[] = [
  // =========================================================================
  // TRACK 1: TECHNOLOGY ADVISORY (6 TECH SERVICES)
  // =========================================================================
  {
    slug: "it-consulting-services",
    title: "IT Consulting Services",
    primaryKeyword: "IT consulting services",
    category: "Technology Architecture",
    track: "tech",
    badgeText: "Independent Tech Advisory",
    heroHeading: "Independent IT Consulting Services for Growing Businesses.",
    heroSubheading: "We evaluate your technology architecture, eliminate software waste, and align systems with operational reality before you make major capital commitments.",
    shortDesc: "Independent technical due diligence, technology stack evaluation, and architecture blueprints to eliminate software waste.",
    problemHeading: "Common IT Alignment Bottlenecks",
    problemPoints: [
      "Software platforms purchased without mapping actual operational workflows.",
      "Fragmented data silos across departments with zero single source of truth.",
      "High monthly SaaS burn with underutilized platform licenses.",
      "Vendor lock-in and dependency on expensive third-party implementation agencies."
    ],
    solutionHeading: "What Our IT Consulting Delivers",
    solutionDeliverables: [
      { title: "Architecture Due-Diligence", desc: "Complete audit of your existing software stack, data pipelines, and infrastructure vulnerabilities." },
      { title: "Technology Roadmap", desc: "Prioritized 12-to-36 month architecture blueprint designed for operational scalability." },
      { title: "Vendor & Stack Selection", desc: "Unbiased, vendor-neutral evaluation of platforms based strictly on business fit." },
      { title: "Cost Optimization Report", desc: "Identification of redundant subscriptions, license waste, and architectural inefficiency." }
    ],
    faqs: [
      {
        question: "What makes DigiXPro IT consulting services independent?",
        answer: "DigiXPro does not sell software licenses or accept commissions from software vendors. Our advice is 100% independent and focused purely on your operational requirements."
      },
      {
        question: "How does IT consulting differ from software development outsourcing?",
        answer: "Software development outsourcing focuses on writing code to your specifications. IT architecture consulting evaluates whether that software should be built or bought, how it integrates with your business, and how to avoid costly rebuilds."
      },
      {
        question: "What size of business benefits most from your IT consulting services?",
        answer: "We work primarily with founders, CEOs, and leadership teams of organizations with 10 to 200 employees who are planning major technology investments or scaling operational complexity."
      },
      {
        question: "How long does a typical IT consulting engagement last?",
        answer: "Initial architecture reviews typically take 2 to 4 weeks, yielding a complete blueprint. Ongoing advisory retainers are available for continuous architectural guidance."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "ai-consulting-services",
    title: "AI Consulting Services",
    primaryKeyword: "AI consulting services",
    category: "Artificial Intelligence",
    track: "tech",
    badgeText: "Governed AI Infrastructure",
    heroHeading: "Strategic AI Consulting Services for High-Trust Organizations.",
    heroSubheading: "Move beyond generic AI chatbots. We design role-gated, production-ready AI infrastructure and retrieval systems grounded in your proprietary knowledge.",
    shortDesc: "Role-gated AI infrastructure, enterprise RAG design, and risk-governed institutional artificial intelligence advisory.",
    problemHeading: "The Reality of Enterprise AI Deployment",
    problemPoints: [
      "Public LLM tools leaking sensitive organizational data and intellectual property.",
      "Hallucination risks in customer-facing and decision-critical automated workflows.",
      "Lack of role-based access control and tenant data isolation in AI systems.",
      "Wasted capital on experimental AI wrappers that fail to scale in production."
    ],
    solutionHeading: "Our AI Advisory Blueprint",
    solutionDeliverables: [
      { title: "AI Readiness Audit", desc: "Comprehensive evaluation of your data hygiene, security posture, and high-impact AI use cases." },
      { title: "Governed RAG Architecture", desc: "Design of hallucination-free retrieval augmented generation pipelines using vector databases." },
      { title: "Tenant & Data Isolation", desc: "Role-gated access frameworks ensuring strict organizational privacy and zero data contamination." },
      { title: "AI Model & Infrastructure Selection", desc: "Independent guidance on open-weight vs proprietary models, GPU hosting, and API cost controls." }
    ],
    faqs: [
      {
        question: "How do your AI consulting services prevent data leakage?",
        answer: "We design self-hosted or tenant-isolated AI architectures (like SattvaOS) where your proprietary knowledge never trains public LLM models and access is strictly role-governed."
      },
      {
        question: "Can small to medium enterprises benefit from AI consulting?",
        answer: "Yes. By avoiding expensive trial-and-error implementations, AI consulting helps SMEs deploy targeted, high-ROI automation for internal knowledge search and customer workflows."
      },
      {
        question: "What is RAG and why is it essential for business AI?",
        answer: "Retrieval-Augmented Generation (RAG) connects AI models directly to your verified documents and databases, ensuring AI outputs are grounded in facts rather than hallucinations."
      },
      {
        question: "Do you build custom AI models or advise on architecture?",
        answer: "We provide end-to-end architecture advisory and system design. Where implementation support is requested, we govern the rollout through your team or vetted engineering partners."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "ai-automation-agency",
    title: "AI Automation & Agency Services",
    primaryKeyword: "AI automation agency",
    category: "Automation",
    track: "tech",
    badgeText: "Workflow & AI Automation",
    heroHeading: "Architectural AI Automation & Agency Services.",
    heroSubheading: "We replace repetitive manual tasks and fragmented communication loops with production-grade automated workflows and intelligent data pipelines.",
    shortDesc: "Automating manual bottlenecks, cross-platform data synchronization, and intelligent workflow pipelines.",
    problemHeading: "Operational Bottlenecks We Eliminate",
    problemPoints: [
      "Core operational tasks managed manually across scattered WhatsApp groups.",
      "Hours wasted copying data between unintegrated CRM, accounting, and inventory tools.",
      "Delayed customer response times due to manual lead routing and assignment.",
      "Human error in routine document processing, invoicing, and reporting."
    ],
    solutionHeading: "Automated Systems Architecture",
    solutionDeliverables: [
      { title: "Workflow Process Mapping", desc: "Complete operational breakdown to identify high-value manual tasks ready for automation." },
      { title: "Cross-System API Integration", desc: "Robust, decoupled middleware connecting your CRM, ERP, messaging, and database tools." },
      { title: "Intelligent Lead & Order Routing", desc: "Instant automated qualification, routing, and notifications for sales and support." },
      { title: "Automated Document Processing", desc: "AI-assisted extraction and verification for invoices, contracts, and customer forms." }
    ],
    faqs: [
      {
        question: "How is DigiXPro different from a low-code automation agency?",
        answer: "Most automation agencies build fragile zap connections that break at scale. We design decoupled, resilient system architecture with error logging, fallback queues, and data governance."
      },
      {
        question: "Which tools and platforms do you integrate?",
        answer: "We work with custom APIs, webhooks, PostgreSQL, Next.js, Python services, as well as enterprise platforms like Zoho, Salesforce, and custom CRM/ERP backends."
      },
      {
        question: "How long does an AI automation project take to show ROI?",
        answer: "Targeted workflow automations typically demonstrate measurable time savings and error reduction within 2 to 4 weeks of production deployment."
      },
      {
        question: "What happens if an API or third-party service goes down?",
        answer: "Our architectures include queue management, retry mechanisms, and automated notification alerts so business data is never lost during partner downtime."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "erp-consultant-services",
    title: "ERP Consultant Services",
    primaryKeyword: "ERP consultant services",
    category: "Business Systems",
    track: "tech",
    badgeText: "Enterprise Systems Advisory",
    heroHeading: "Independent ERP Consultant Services for Complex Operations.",
    heroSubheading: "Avoid failed ERP implementations. We map your manufacturing, inventory, and financial processes before vendor selection to guarantee operational alignment.",
    shortDesc: "Operational process mapping, vendor-neutral ERP selection, and implementation governance for complex businesses.",
    problemHeading: "Why 60% of ERP Implementations Fail",
    problemPoints: [
      "Buying expensive ERP software before defining standard operating procedures.",
      "Customizing standard ERP software heavily instead of aligning business processes.",
      "Data corruption during legacy database migration to the new ERP system.",
      "Low employee adoption due to overly complex, non-intuitive user interfaces."
    ],
    solutionHeading: "Our ERP Advisory Framework",
    solutionDeliverables: [
      { title: "Operational SOP Mapping", desc: "Deep-dive mapping of supply chain, finance, inventory, and sales workflows." },
      { title: "ERP RFP & Vendor Evaluation", desc: "Creation of clear technical requirement specs and objective vendor evaluation matrix." },
      { title: "Data Migration Strategy", desc: "Clean schema mapping and validation protocols for seamless legacy data migration." },
      { title: "Implementation Governance", desc: "Acting as your client-side representative to hold the ERP vendor accountable to timeline and budget." }
    ],
    faqs: [
      {
        question: "Why should we hire an independent ERP consultant instead of relying on the vendor?",
        answer: "ERP vendors are motivated to sell their platform and bill for implementation hours. An independent ERP consultant represents your interests, ensuring requirements are met without unnecessary customization fees."
      },
      {
        question: "Which ERP platforms do you evaluate?",
        answer: "We provide vendor-neutral evaluation across SAP, Oracle NetSuite, Odoo, Microsoft Dynamics, ERPNext, and specialized custom industry backends."
      },
      {
        question: "At what stage should an organization engage an ERP consultant?",
        answer: "The ideal time is before signing any ERP contract or issuing an RFP, when business processes and technical requirements can be clearly defined."
      },
      {
        question: "Can you help rescue a failing ERP project?",
        answer: "Yes. We perform ERP technical audits to diagnose root causes of failure, re-align business workflows, and establish a recovery roadmap."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "fractional-cto-services",
    title: "Fractional CTO Services",
    primaryKeyword: "fractional CTO services",
    category: "Strategic Leadership",
    track: "tech",
    badgeText: "Executive Tech Leadership",
    heroHeading: "Fractional CTO Services for Growing Technology Companies.",
    heroSubheading: "Get executive-level technology leadership, architecture strategy, and engineering governance without the overhead of a full-time executive salary.",
    shortDesc: "Strategic technology leadership, architecture oversight, engineering team governance, and investor technical due diligence.",
    problemHeading: "Leadership Challenges We Resolve",
    problemPoints: [
      "Founders overburdened by technical management decisions outside their core domain.",
      "Engineering teams building features without architectural governance or clear tech roadmaps.",
      "High infrastructure costs and scaling bottlenecks restricting product growth.",
      "Preparing for investor technical due diligence without senior technical representation."
    ],
    solutionHeading: "Fractional CTO Capabilities",
    solutionDeliverables: [
      { title: "Technology Roadmap & Strategy", desc: "Aligning technical development milestones directly with business growth targets." },
      { title: "Architecture & Code Oversight", desc: "Regular architectural reviews, security audits, and code quality governance." },
      { title: "Engineering Hiring & Management", desc: "Structuring engineering teams, establishing hiring standards, and mentoring tech leads." },
      { title: "Due-Diligence & Investor Readiness", desc: "Preparing comprehensive technical documentation for funding rounds and acquisitions." }
    ],
    faqs: [
      {
        question: "What is the difference between a Fractional CTO and a technical consultant?",
        answer: "A technical consultant advises on specific projects. A Fractional CTO acts as an embedded member of your executive team, taking long-term accountability for technology strategy, architecture, and team direction."
      },
      {
        question: "How many hours per month does a Fractional CTO work with us?",
        answer: "Engagements typically range from 10 to 40 hours per month depending on your stage, team size, and architectural complexity."
      },
      {
        question: "Is a Fractional CTO suitable for non-technical founders?",
        answer: "Yes. Non-technical founders benefit immensely from having a trusted senior technologist to evaluate engineering options, interview candidates, and prevent vendor overcharging."
      },
      {
        question: "How long does a Fractional CTO engagement usually last?",
        answer: "Engagements typically run from 6 to 18 months until the company reaches the scale where hiring a full-time executive CTO becomes necessary."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    primaryKeyword: "business process automation",
    category: "Operations",
    track: "tech",
    badgeText: "Business Systems OS",
    heroHeading: "End-to-End Business Process Automation Services.",
    heroSubheading: "Transform manual, error-prone operations into streamlined digital operating systems. We design business processes before connecting software pipelines.",
    shortDesc: "Designing unified business operating systems, automating cross-department workflows, and establishing data hygiene.",
    problemHeading: "Signs Your Operations Need Process Automation",
    problemPoints: [
      "Departmental handoffs relying on manual follow-ups, emails, or phone calls.",
      "Inconsistent customer onboarding and service delivery across team members.",
      "Lack of real-time operational visibility for executive leadership.",
      "High operational headcount growth required just to process routine transaction volume."
    ],
    solutionHeading: "Our Process Automation Strategy",
    solutionDeliverables: [
      { title: "Operational Hierarchy Blueprint", desc: "Mapping Business, People, Process, and Information layers prior to automation." },
      { title: "Centralized Data Architecture", desc: "Creating a single source of truth for customer, order, and operational data." },
      { title: "Automated Handoff Pipelines", desc: "Eliminating manual communication delays between sales, operations, and finance." },
      { title: "Real-Time Executive Dashboards", desc: "Building live operational monitoring feeds based on clean, structured data." }
    ],
    faqs: [
      {
        question: "Why does DigiXPro map business processes before recommending software?",
        answer: "Automating a broken process only speeds up bad results. We refine your business operating model first to ensure automation creates genuine efficiency."
      },
      {
        question: "Can legacy systems be integrated into modern automated workflows?",
        answer: "Yes. We design custom API adapters and middleware pipelines that connect legacy databases with modern cloud tools without requiring total system replacement."
      },
      {
        question: "How do you measure the success of a process automation project?",
        answer: "Success is measured by reduced cycle times, zero manual data re-entry, decreased error rates, and the ability to handle higher operational volume without linear headcount increases."
      },
      {
        question: "What industries do you specialize in for process automation?",
        answer: "We have proven architecture evidence across Healthcare, E-commerce, Publishing, Logistics, Marketplace platforms, and Institutional Services."
      }
    ],
    lastUpdated: "2026-08-01"
  },

  // =========================================================================
  // TRACK 2: DESIGN SERVICES (3 DESIGN SERVICES)
  // =========================================================================
  {
    slug: "website-design-services",
    title: "Website Design Services",
    primaryKeyword: "website design services",
    category: "Digital Experience",
    track: "design",
    badgeText: "Custom Modern JS Architecture",
    heroHeading: "High-Performance Modern Website Design Services.",
    heroSubheading: "We design and build ultra-fast, accessible web platforms using modern JavaScript stacks (Next.js, React, TailwindCSS) engineered for speed, SEO, and conversion.",
    shortDesc: "Custom modern JS web architecture, high-performance responsive engineering, accessible UI/UX, and conversion optimization.",
    problemHeading: "Why Traditional Website Builds Underperform",
    problemPoints: [
      "Heavy legacy CMS monoliths suffering from slow page load speeds and plugin bloat.",
      "Generic template layouts that fail to communicate technical authority and brand trust.",
      "Poor mobile performance, layout layout shift, and failing Core Web Vitals scores.",
      "Fragile security postures vulnerable to continuous plugin updates and script exploits."
    ],
    solutionHeading: "Modern Web Engineering Architecture",
    solutionDeliverables: [
      { title: "Custom Next.js & React Frontend", desc: "Bespoke, decoupled web applications built for lightning speed and 100% Lighthouse performance." },
      { title: "TailwindCSS Design System", desc: "Responsive, accessible design tokens and UI components styled for brand distinction." },
      { title: "100% Technical SEO & Schema", desc: "Built-in JSON-LD structured data, dynamic XML sitemap, and semantic HTML5 hierarchy." },
      { title: "Edge Deployment & Security", desc: "Global CDN hosting with static pre-rendering, zero plugin vulnerabilities, and instant loads." }
    ],
    faqs: [
      {
        question: "Why does DigiXPro use modern JS stacks (Next.js/React) instead of WordPress?",
        answer: "Modern JavaScript stacks (Next.js, React, TailwindCSS) deliver superior page load speed, uncompromised security, seamless API integration, and perfect Core Web Vitals. Unlike monolithic CMS platforms bloated with plugins, custom JS architectures load instantly, scale effortlessly, and provide total design flexibility."
      },
      {
        question: "How does your website design process ensure high Google search rankings?",
        answer: "Every site we build incorporates 100% technical SEO from day one: semantic HTML5 structure, precise canonical tags, automatic XML sitemaps, JSON-LD structured data, and ultra-fast mobile rendering."
      },
      {
        question: "Is custom web design suitable for non-technical teams to manage content?",
        answer: "Yes. We construct clean content architectures using structured SSOT data files or decoupled headless CMS setups so your team can easily manage articles, case studies, and pages without technical overhead."
      },
      {
        question: "What is included in your website design deliverable?",
        answer: "Full responsive UI/UX design, custom frontend code, technical SEO integration, analytics setup, accessibility compliance, and production deployment on global Edge hosting."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "unlimited-graphic-design",
    title: "Unlimited Graphic Design Service",
    primaryKeyword: "unlimited graphic design service",
    category: "Visual Communication",
    track: "design",
    badgeText: "Structured Design Support",
    heroHeading: "Dedicated Unlimited Graphic Design Service for Growing Brands.",
    heroSubheading: "Scale your visual marketing collateral without the hassle of per-project billing or unreliable freelancers. Structured graphic design support delivered with consistent speed and precision.",
    shortDesc: "Subscription visual design support, brand marketing assets, presentation systems, and digital creative production.",
    problemHeading: "Creative Production Bottlenecks We Eliminate",
    problemPoints: [
      "Unpredictable invoicing and unexpected cost inflation from traditional design agencies.",
      "Inconsistent brand aesthetics across social media, pitch decks, and marketing campaigns.",
      "Internal marketing teams delayed by slow turnaround times on routine graphics.",
      "Managing multiple specialized freelancers with conflicting design quality standards."
    ],
    solutionHeading: "Our Graphic Design Retainer Capabilities",
    solutionDeliverables: [
      { title: "Brand Marketing Assets", desc: "Social media graphics, ad banners, email header templates, and campaign collateral." },
      { title: "Presentation & Pitch Decks", desc: "Professional, high-impact pitch decks and corporate presentation design systems." },
      { title: "Print & Digital Media", desc: "Brochures, whitepapers, banners, event displays, and digital report layouts." },
      { title: "Design System Maintenance", desc: "Ensuring strict typography, color palette, and asset consistency across all channels." }
    ],
    faqs: [
      {
        question: "How does the unlimited graphic design service subscription work?",
        answer: "You pay a flat monthly fee and submit design requests through a prioritized queue. We work on your active requests sequentially with predictable turnaround times."
      },
      {
        question: "What types of design assets are covered under this service?",
        answer: "Social media graphics, ad creatives, presentation decks, marketing brochures, flyers, email templates, digital banners, and brand collateral are all covered."
      },
      {
        question: "What is the typical turnaround time for a design request?",
        answer: "Standard graphic design requests are delivered within 24 to 48 hours. Complex multi-page assets like pitch decks or whitepapers are broken into milestone deliverables."
      },
      {
        question: "Are source files included with every delivered asset?",
        answer: "Yes. You receive full ownership of all final native design source files (Figma, Illustrator, Photoshop, PDF, PNG, SVG)."
      }
    ],
    lastUpdated: "2026-08-01"
  },
  {
    slug: "branding-services",
    title: "Branding Services",
    primaryKeyword: "branding services",
    category: "Brand Identity",
    track: "design",
    badgeText: "Identity & Editorial Architecture",
    heroHeading: "Comprehensive Strategic Branding Services & Visual Identity.",
    heroSubheading: "We build enduring brand identities, precision logo design systems, and editorial publishing layouts (magazines, books, reports) that position your organization for market authority.",
    shortDesc: "Complete brand identity architecture, precision logo design systems, brand guidelines, and editorial publication design.",
    problemHeading: "Why Weak Brand Positioning Restricts Growth",
    problemPoints: [
      "Outdated or inconsistent logo systems that fail to reflect corporate scale and authority.",
      "Lack of comprehensive brand guidelines leading to mismatched typography and color usage.",
      "Digital and print publications (magazines, reports) looking amateurish and poorly formatted.",
      "Inability to command premium pricing due to weak visual perception in competitive markets."
    ],
    solutionHeading: "Our Comprehensive Branding Architecture",
    solutionDeliverables: [
      { title: "Logo & Visual Identity System", desc: "Vector logo marks, lockups, icon sets, and monochrome variations engineered for digital and print." },
      { title: "Brand Guidelines Architecture", desc: "Comprehensive brand book covering typography, color tokens, image direction, and usage rules." },
      { title: "Editorial & Magazine Design", desc: "Multi-page magazine layout pipelines, digital publication templates, and book publishing design." },
      { title: "Corporate Stationery & Collateral", desc: "Business cards, letterheads, presentation templates, and executive brand collateral." }
    ],
    faqs: [
      {
        question: "What is included in DigiXPro's branding services?",
        answer: "Our branding services cover visual strategy, logo design systems, brand guidelines, typography selection, color architecture, stationery systems, and editorial publication design (magazines, books, reports)."
      },
      {
        question: "Do you offer logo design as part of the branding package?",
        answer: "Yes. Logo design is engineered as a complete system including main mark, secondary lockups, favicon icons, and usage guidelines across digital and print media."
      },
      {
        question: "Can DigiXPro handle multi-page editorial and magazine publication design?",
        answer: "Yes. We specialize in editorial publishing pipelines (like Muktibodh magazine and digital repositories), handling layout typography, cover design, and multi-format publishing workflows."
      },
      {
        question: "How long does a full brand identity project take?",
        answer: "A comprehensive branding project—from strategy and logo design to brand book delivery—typically takes 3 to 6 weeks depending on scope."
      }
    ],
    lastUpdated: "2026-08-01"
  }
];
