export interface FAQItem {
  question: string;
  answer: string;
}

export interface Deliverable {
  title: string;
  desc: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  primaryKeyword: string;
  supportingKeyword: string;
  keywords: string[];
  category: string;
  track: 'tech' | 'design';
  badgeText: string;
  heroHeading: string;
  heroSubheading: string;
  shortDesc: string;
  problemHeading: string;
  problemPoints: string[];
  solutionHeading: string;
  solutionDeliverables: Deliverable[];
  faqs: FAQItem[];
  ctaHeading: string;
  ctaButtonText: string;
  ctaSubtext: string;
  lastUpdated: string;
  metaDescription?: string;
}

export const ENGAGEMENT_PRICING_PHILOSOPHY = {
  title: "Independent Architecture & Pricing Governance",
  subheading: "We do not sell software licenses, generic retainers, or bloated agency contracts. Engagements are structured around diagnostic benchmarks and verified milestones.",
  points: [
    {
      label: "Diagnostic Scope First",
      text: "Every engagement begins with an empirical architecture review of your operating reality before software is recommended."
    },
    {
      label: "Zero Software Markup",
      text: "We remain vendor-neutral. You pay third-party software vendors directly without middleman markups or kickbacks."
    },
    {
      label: "Milestone-Based Governance",
      text: "Implementation projects proceed through clear phase gates with empirical code and live URL verification."
    }
  ]
};

export const services: ServiceItem[] = [
  // =========================================================================
  // CORE SERVICE 01: AI CONSULTING & GEO / AI SEARCH OPTIMIZATION
  // =========================================================================
  {
    slug: "ai-consulting-services",
    title: "AI Consulting & AI Search Optimization (GEO)",
    primaryKeyword: "AI consulting services",
    supportingKeyword: "generative engine optimization",
    keywords: [
      "AI consulting services",
      "AI search optimization",
      "generative engine optimization",
      "GEO consulting",
      "AI discovery strategy",
      "LLM search visibility"
    ],
    category: "AI Strategy",
    track: "tech",
    badgeText: "AI Discovery & GEO Architecture",
    heroHeading: "AI Search Optimization & AI Systems Advisory.",
    heroSubheading: "Prepare your business for the shift from traditional search engines to AI discovery engines (ChatGPT, Claude, Perplexity, Gemini). We engineer machine-readable context and AI search strategy.",
    shortDesc: "Strategic AI consulting, Generative Engine Optimization (GEO), LLM machine-readable data structuring, and AI discovery readiness audits.",
    problemHeading: "Challenges In The Shift To AI Search Discovery",
    problemPoints: [
      "Invisible to AI search engines that synthesize direct answers instead of rendering traditional link lists.",
      "Unstructured website data that AI models cannot parse, categorize, or cite accurately.",
      "Uncertainty around where AI tools can be deployed safely without risking data privacy or hallucinated answers.",
      "High vendor costs for superficial AI wrappers that fail to connect with actual operational workflows."
    ],
    solutionHeading: "AI Search & GEO Architecture Deliverables",
    solutionDeliverables: [
      { title: "Generative Engine Optimization (GEO) Audit", desc: "Evaluating how AI engines cite your brand, services, and domain authority across major LLMs." },
      { title: "Machine-Readable Data & Schema Plumbing", desc: "Injecting JSON-LD, structured entity graphs, and llms.txt files for AI parsing accuracy." },
      { title: "Practical AI Workflow Assessment", desc: "Identifying high-leverage internal AI use-cases that automate repetitive research and content workflows." },
      { title: "AI Privacy & Operational Governance Blueprint", desc: "Establishing protocols to protect proprietary client data while leveraging cloud AI models." }
    ],
    faqs: [
      {
        question: "What is AI Search Optimization (GEO) and why does it matter for modern businesses?",
        answer: "Generative Engine Optimization (GEO) structures your digital presence so AI engines like ChatGPT, Claude, and Perplexity can parse, verify, and cite your business when users ask for service recommendations."
      },
      {
        question: "How does GEO differ from traditional SEO?",
        answer: "Traditional SEO targets keyword rankings in blue-link search results. GEO targets direct answer synthesis, structured entity citations, machine-readable JSON-LD, and llms.txt context files used by LLM search agents."
      },
      {
        question: "How do we get started with AI search optimization?",
        answer: "We perform an AI discovery audit to evaluate how major LLMs currently cite your business, then map the data plumbing required for complete AI search visibility."
      }
    ],
    ctaHeading: "Want your business to be discovered and cited by AI engines?",
    ctaButtonText: "Book an AI Search Discovery Audit",
    ctaSubtext: "Schedule a 30-minute call to evaluate your Generative Engine Optimization (GEO) roadmap.",
    lastUpdated: "2026-08-26"
  },

  // =========================================================================
  // CORE SERVICE 02: AI & WORKFLOW AUTOMATION AGENCY
  // =========================================================================
  {
    slug: "ai-automation-agency",
    title: "AI & Workflow Automation",
    primaryKeyword: "AI automation agency",
    supportingKeyword: "workflow automation services",
    keywords: [
      "AI automation agency",
      "workflow automation services",
      "n8n automation consultant",
      "API webhook integration",
      "automated lead routing",
      "business process automation"
    ],
    category: "Automation Systems",
    track: "tech",
    badgeText: "API & Webhook Automation",
    heroHeading: "End-to-End AI & Workflow Automation Services.",
    heroSubheading: "Eliminate manual data entry and departmental bottlenecks. We build production n8n workflows, API webhooks, and automated lead handling pipelines.",
    shortDesc: "Production workflow automation, n8n webhook engineering, custom API integrations, automated lead routing, and CRM synchronization.",
    problemHeading: "Manual Operational Bottlenecks We Automate",
    problemPoints: [
      "Team members copying and pasting lead data manually between web forms, spreadsheets, and CRMs.",
      "Delayed follow-up times on incoming customer inquiries due to disconnected communication tools.",
      "Human data entry errors causing inaccurate client onboarding records and reporting discrepancies.",
      "Over-reliance on expensive, fragile third-party automation tools with high monthly task costs."
    ],
    solutionHeading: "Production Automation Deliverables",
    solutionDeliverables: [
      { title: "Production n8n Workflow Pipelines", desc: "Custom, self-hosted automation workflows connecting forms, CRMs, email, and WhatsApp notifications." },
      { title: "Direct API Webhook Handoffs", desc: "Instant data routing between website forms, Notion lead boards, HubSpot, Salesforce, and team channels." },
      { title: "Automated Document & Reporting Generators", desc: "Transforming raw lead submissions into formatted proposals, PDFs, or internal notification feeds automatically." },
      { title: "Error Monitoring & Retry Logic", desc: "Resilient workflow architecture with failover logging to ensure zero lost leads or dropped transactions." }
    ],
    faqs: [
      {
        question: "Why use n8n for workflow automation instead of Zapier or Make?",
        answer: "n8n provides self-hosted code control, complete data privacy compliance, complex conditional branching, and zero per-task cost escalations, making it ideal for scalable enterprise automation."
      },
      {
        question: "Can automation connect our website forms directly to WhatsApp or our CRM?",
        answer: "Yes. Web form submissions pass through instant API webhooks directly into your CRM, Notion, or WhatsApp notifications for immediate team follow-up."
      },
      {
        question: "What happens if a third-party API goes down during an automated workflow?",
        answer: "We engineer retry logic, error handling queues, and automated email alerts into every workflow to ensure data is never lost."
      }
    ],
    ctaHeading: "Ready to eliminate manual copy-paste bottlenecks and automate lead handoffs?",
    ctaButtonText: "Plan Your Automation Pipeline",
    ctaSubtext: "Book a 30-minute discovery call to map your key operational workflows for automation.",
    lastUpdated: "2026-08-26"
  },

  // =========================================================================
  // CORE SERVICE 03: BUSINESS PROCESS AUTOMATION
  // =========================================================================
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    primaryKeyword: "business process automation",
    supportingKeyword: "business process automation tools",
    keywords: [
      "business process automation",
      "business process automation tools",
      "automating manual workflows",
      "business process automation consultant",
      "process optimization consulting",
      "operational OS design"
    ],
    category: "Operations",
    track: "tech",
    badgeText: "Business Systems OS",
    heroHeading: "End-to-End Business Process Automation Services.",
    heroSubheading: "Transform manual, error-prone operations into streamlined digital operating systems. We design business processes before connecting software pipelines.",
    shortDesc: "Designing unified business operating systems, automating manual workflows across departments, and establishing data hygiene as an independent business process automation consultant.",
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
      { title: "Automated Handoff Pipelines", desc: "Eliminating communication delays between sales, operations, and finance by automating manual workflows." },
      { title: "Real-Time Executive Dashboards", desc: "Building live operational monitoring feeds based on clean, structured data." }
    ],
    faqs: [
      {
        question: "Why should a company refine business processes before purchasing automation software?",
        answer: "Automating an inefficient or broken workflow merely accelerates operational errors. Mapping Business, People, Process, and Information layers prior to technology deployment ensures that workflows are optimized before code is connected."
      },
      {
        question: "How does an experienced business process automation consultant identify workflow bottlenecks?",
        answer: "We audit daily employee workflows, shadow operational handoffs, examine unstructured communication channels, and map data journeys across existing software tools."
      },
      {
        question: "What metrics demonstrate the operational return on business process automation?",
        answer: "Success is measured through reduced order-to-delivery cycle times, elimination of manual data re-entry errors, faster customer response rates, and higher transaction throughput per employee."
      }
    ],
    ctaHeading: "Ready to transform manual business processes into one connected operating system?",
    ctaButtonText: "Book a Business Systems Architecture Review",
    ctaSubtext: "If your business processes are hindered by departmental silos, let's map your operational hierarchy before purchasing more software.",
    lastUpdated: "2026-08-26"
  }
];
