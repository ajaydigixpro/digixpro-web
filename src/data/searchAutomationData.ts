export interface SearchAutomationFAQItem {
  question: string;
  answer: string;
}

export interface SearchAutomationDeliverable {
  title: string;
  desc: string;
}

export interface SearchAutomationServiceItem {
  slug: string;
  title: string;
  buyerQuestion: string;
  buyerSituation: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  category: string;
  commercialModel: 'MONTHLY / ONGOING' | 'STRATEGY + ONGOING' | 'MONTHLY' | 'IMPLEMENTATION + SUPPORT' | 'IMPLEMENTATION + OPTIMIZATION';
  badgeText: string;
  heroHeading: string;
  heroSubheading: string;
  shortDesc: string;
  problemHeading: string;
  problemPoints: string[];
  solutionHeading: string;
  deliverables: SearchAutomationDeliverable[];
  evidenceText: string;
  evidenceLink: string;
  evidenceTitle: string;
  faqs: SearchAutomationFAQItem[];
  ctaHeading: string;
  ctaButtonText: string;
  ctaSubtext: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
}

export const SEARCH_AUTOMATION_SERVICES: SearchAutomationServiceItem[] = [
  // =========================================================================
  // 01 — SEO & SEARCH VISIBILITY
  // =========================================================================
  {
    slug: "seo-search-visibility",
    title: "SEO & Search Visibility",
    buyerQuestion: "How do we get found when prospective customers search for what we sell?",
    buyerSituation: "We want our business to be consistently visible in organic search results without relying solely on paid ad spend.",
    primaryKeyword: "SEO services",
    supportingKeywords: [
      "SEO consulting",
      "technical SEO",
      "SEO for small business",
      "SEO for service businesses",
      "search engine optimization services"
    ],
    category: "Organic Search",
    commercialModel: "MONTHLY / ONGOING",
    badgeText: "Organic Search Discovery",
    heroHeading: "SEO & Organic Search Visibility Services.",
    heroSubheading: "Engineered search visibility combining technical crawlability, semantic HTML5 architecture, keyword intent mapping, and high-value content optimization.",
    shortDesc: "Technical SEO audits, semantic keyword mapping, on-page optimization, content strategy, and indexability for growing businesses.",
    problemHeading: "Search Visibility Bottlenecks We Resolve",
    problemPoints: [
      "Targeting competitive keywords without the necessary technical SEO infrastructure or domain authority strategy.",
      "Search engines failing to index key service pages due to canonical errors, thin content, or slow page speed.",
      "High paid ad costs required continuously because organic search visibility is underdeveloped.",
      "Website receiving traffic for irrelevant informational queries that never convert into commercial enquiries."
    ],
    solutionHeading: "SEO & Search Deliverables You Receive",
    deliverables: [
      { title: "Technical SEO & Indexability Audit", desc: "Inspection of crawl access, dynamic XML sitemaps, canonical tags, DOM hierarchy, and Core Web Vitals performance." },
      { title: "Commercial Keyword Intent Matrix", desc: "Mapping high-intent buyer keywords, long-tail problem searches, and commercial service intent." },
      { title: "On-Page Semantic & Content Optimization", desc: "Injecting structured HTML5 headings, metadata, schema markup, and internal linking structures." },
      { title: "Monthly Ranking & Organic Visibility Reports", desc: "Transparent tracking of search impressions, keyword positions, organic traffic growth, and conversion rates." }
    ],
    evidenceTitle: "DigiXPro Platform Search Architecture",
    evidenceText: "DigiXPro's platform is built on native technical SEO architecture with static pre-rendering, automated sitemap generation, and 100% Core Web Vitals score.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "How long does it take to see results from an SEO campaign?",
        answer: "Initial technical SEO improvements and indexation fixes yield rank improvements within 4 to 8 weeks. Compounding organic traffic growth for competitive keyword clusters typically scales over 3 to 6 months of ongoing optimization."
      },
      {
        question: "How does DigiXPro's SEO service differ from traditional marketing agencies?",
        answer: "We treat SEO as web engineering and intent architecture, not keyword-stuffing or superficial blogging. We align search indexability with custom code, semantic schemas, and conversion pathways."
      },
      {
        question: "Do I need to redesign my website to do SEO?",
        answer: "Not necessarily. If your current website has clean code, we can optimize metadata, internal links, schemas, and content. If your platform has severe performance or structural defects, we recommend an SEO-ready web rebuild."
      },
      {
        question: "What is included in the monthly SEO management service?",
        answer: "Monthly service includes continuous technical SEO diagnostics, keyword tracking, content optimizations, schema updates, competitor gap analysis, and transparent performance reporting."
      },
      {
        question: "Does DigiXPro guarantee first-page Google rankings?",
        answer: "Search engine algorithms operate autonomously, so exact search positions cannot be promised by any provider. We focus on technical SEO compliance, commercial keyword architecture, and systematic search performance optimization."
      },
      {
        question: "Can DigiXPro handle SEO for businesses operating in multiple regions?",
        answer: "Yes. We engineer national and international B2B search strategies using clean canonical hierarchy, language tags, and localized keyword intent mapping without creating doorway spam."
      },
      {
        question: "How do you measure SEO success?",
        answer: "Success is measured by qualified organic search traffic, commercial keyword impressions, non-branded search rankings, and actual lead submissions."
      },
      {
        question: "What happens during the initial discovery call?",
        answer: "We review your current domain authority, search visibility bottlenecks, primary target keywords, and commercial goals to define an empirical SEO roadmap."
      }
    ],
    ctaHeading: "Ready to build sustainable, compounding organic search visibility?",
    ctaButtonText: "Discuss Your SEO Strategy",
    ctaSubtext: "Book a 30-minute growth systems call to evaluate your current search visibility and keyword strategy.",
    lastUpdated: "2026-08-26",
    metaTitle: "SEO Services & Organic Search Visibility | DigiXPro",
    metaDescription: "Technical SEO services, commercial keyword mapping, on-page optimization, and organic search visibility strategy for growing businesses."
  },

  // =========================================================================
  // 02 — AI SEARCH OPTIMIZATION & GEO
  // =========================================================================
  {
    slug: "ai-search-optimization-geo",
    title: "AI Search Optimization & GEO",
    buyerQuestion: "How do we make our business visible and cited when customers ask AI answer engines?",
    buyerSituation: "Customers are increasingly asking AI tools (ChatGPT, Claude, Perplexity, Gemini) for vendor recommendations instead of using traditional search links.",
    primaryKeyword: "AI search optimization",
    supportingKeywords: [
      "generative engine optimization",
      "GEO consulting",
      "AEO services",
      "LLMO",
      "AI visibility",
      "AI discovery strategy"
    ],
    category: "AI Discovery & GEO",
    commercialModel: "STRATEGY + ONGOING",
    badgeText: "AI & Answer Engine Discovery",
    heroHeading: "AI Search Optimization & Generative Engine Optimization (GEO).",
    heroSubheading: "Prepare your business for the shift from traditional search engines to AI answer engines. We engineer machine-readable structured data, llms.txt context files, and AI citation strategy.",
    shortDesc: "Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), LLM machine-readable data structuring, and AI discovery readiness.",
    problemHeading: "AI Discovery Challenges We Address",
    problemPoints: [
      "Invisibility when prospective clients ask ChatGPT, Perplexity, or Claude for top service providers in your industry.",
      "Unstructured website copy that AI models cannot parse, verify, or synthesize accurately in direct answers.",
      "Competitors being recommended in AI search summaries because their entity data is clearly structured.",
      "Uncertainty around how to format brand messaging and technical data for machine-readable interpretation."
    ],
    solutionHeading: "AI Search & GEO Deliverables You Receive",
    deliverables: [
      { title: "Generative Engine Optimization (GEO) Audit", desc: "Evaluating how major AI models currently parse, cite, and synthesize your brand authority." },
      { title: "Machine-Readable Context & llms.txt Plumbing", desc: "Injecting structured JSON-LD entity graphs, markdown documentation, and llms.txt files for AI crawlers." },
      { title: "Structured Entity & Brand Citation Blueprint", desc: "Formatting service specs, FAQs, and proof metrics so LLMs cite your business as an authoritative source." },
      { title: "Ongoing AI Visibility Monitoring", desc: "Tracking brand citations and answer engine recommendations across ChatGPT, Perplexity, Claude, and Gemini." }
    ],
    evidenceTitle: "DigiXPro Machine-Readable Architecture",
    evidenceText: "DigiXPro's domain includes machine-readable llms.txt context, rich JSON-LD structured entity schemas, and semantic HTML5 hierarchy designed specifically for AI parsing.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "What is Generative Engine Optimization (GEO)?",
        answer: "Generative Engine Optimization (GEO) is the discipline of structuring your digital content and entity data so AI answer engines (ChatGPT, Perplexity, Claude, Gemini) can accurately parse, verify, and cite your business in synthesized answers."
      },
      {
        question: "How is GEO different from traditional SEO?",
        answer: "SEO targets search engine algorithms to rank web links. GEO targets Large Language Models (LLMs) to ensure your business is cited and recommended when users ask complex natural language questions."
      },
      {
        question: "What is an llms.txt file?",
        answer: "An llms.txt file is a standardized markdown file located at the root of a domain that provides AI agents with a clean, structured summary of a business, its services, key URLs, and factual data."
      },
      {
        question: "Does GEO replace traditional SEO?",
        answer: "No. GEO builds on top of technical SEO. AI engines use search engine indexes and web crawlers to retrieve real-time data, so strong technical SEO is a prerequisite for AI discovery."
      },
      {
        question: "How do you measure AI search visibility?",
        answer: "We test standardized buyer prompts across major LLMs (ChatGPT, Claude, Perplexity, Gemini) to track brand citation frequency, service accuracy, and competitive positioning."
      },
      {
        question: "Can any business benefit from AI Search Optimization?",
        answer: "GEO is valuable for B2B services, technology providers, specialized healthcare, professional advisory, and high-consideration businesses where buyers research vendor options using AI."
      },
      {
        question: "Will implementing GEO affect our human website visitors?",
        answer: "No. GEO adds machine-readable data layers (JSON-LD schemas, llms.txt) behind the scenes while enhancing visible page clarity for human visitors."
      },
      {
        question: "How do we get started with GEO?",
        answer: "We perform an AI discovery readiness audit to analyze how major LLMs cite your company today, then map the data plumbing required for complete AI visibility."
      }
    ],
    ctaHeading: "Want your business to be discovered and cited by AI answer engines?",
    ctaButtonText: "Plan Your AI Search Strategy",
    ctaSubtext: "Book a 30-minute growth systems call to evaluate your Generative Engine Optimization (GEO) roadmap.",
    lastUpdated: "2026-08-26",
    metaTitle: "AI Search Optimization & GEO Services | DigiXPro",
    metaDescription: "Generative Engine Optimization (GEO), AI Search Optimization, LLM machine-readable data structuring, and llms.txt implementation for growing businesses."
  },

  // =========================================================================
  // 03 — LOCAL SEO & LOCAL LEAD VISIBILITY
  // =========================================================================
  {
    slug: "local-seo-lead-visibility",
    title: "Local SEO & Local Lead Visibility",
    buyerQuestion: "How do we get found by customers searching for our services in our local area?",
    buyerSituation: "We need consistent local customer inquiries from Google Maps and local search without spending heavily on local ad campaigns.",
    primaryKeyword: "local SEO services",
    supportingKeywords: [
      "local SEO for small business",
      "Google business visibility",
      "local lead generation",
      "Google map pack optimization",
      "local search marketing"
    ],
    category: "Local Discovery",
    commercialModel: "MONTHLY / ONGOING",
    badgeText: "Google Maps & Local Search",
    heroHeading: "Local SEO & High-Intent Local Lead Visibility.",
    heroSubheading: "Capture high-intent local customer searches. We optimize Google Business Profiles, local search citations, geo-targeted web pages, and local review pathways.",
    shortDesc: "Google Business Profile optimization, local map pack ranking, geo-targeted service pages, local citation management, and local lead capture.",
    problemHeading: "Local Search Obstacles We Solve",
    problemPoints: [
      "Invisibility in Google's 3-Pack Map results when local customers search for immediate service providers.",
      "Outdated or inconsistent NAP (Name, Address, Phone) data across local business directories.",
      "Competitors capturing local market share due to higher review volume and optimized Google profiles.",
      "Website lacking localized service landing pages that rank for specific city and suburb search queries."
    ],
    solutionHeading: "Local SEO Deliverables You Receive",
    deliverables: [
      { title: "Google Business Profile Optimization", desc: "Complete audit and enhancement of business categories, service areas, photos, posts, and Q&A features." },
      { title: "Local Citation & Directory Synchronization", desc: "Cleaning and synchronizing core business citations across authoritative local directories to build local trust." },
      { title: "Geo-Targeted Service Page Architecture", desc: "Engineering localized web pages structured around specific service areas and local search intent." },
      { title: "Review Pathway & Local Reputation Strategy", desc: "Establishing structured customer review capture processes to build ongoing local social proof." }
    ],
    evidenceTitle: "360 Neck & Shoulder Local Search & Web Architecture",
    evidenceText: "Engineered healthcare web architecture, local search trust optimization, and patient enquiry capture for specialized clinic 360neckshoulder.com.",
    evidenceLink: "/evidence/360-neck-shoulder",
    faqs: [
      {
        question: "How long does it take to rank in Google Maps 3-Pack?",
        answer: "Google Map Pack optimization typically produces rank increases within 30 to 60 days of profile enhancement, citation cleaning, and local review collection."
      },
      {
        question: "Do I need a physical office address for local SEO?",
        answer: "Yes, a legitimate physical address or defined Service Area Business (SAB) profile is required for Google Business Profile verification."
      },
      {
        question: "What is the difference between general SEO and Local SEO?",
        answer: "General SEO ranks web pages for national or global search terms. Local SEO optimizes Google Map Pack results, localized search queries, and proximity-based searches."
      },
      {
        question: "How do you manage local business citations?",
        answer: "We audit major business directories, correct inconsistent Name, Address, and Phone (NAP) details, and submit your verified data to authoritative local platforms."
      },
      {
        question: "Can local SEO help service businesses that visit customers at their location?",
        answer: "Yes. We configure Service Area Business (SAB) profiles that define your exact delivery regions without displaying a residential street address."
      },
      {
        question: "How does Local SEO drive phone calls and lead form submissions?",
        answer: "By placing your business at the top of Google Maps and local search results, mobile users can tap to call or navigate directly to your lead capture form."
      },
      {
        question: "What is included in monthly local SEO maintenance?",
        answer: "Monthly service includes Google profile updates, local review response management, citation monitoring, localized content updates, and local ranking reports."
      },
      {
        question: "How do we get started with local SEO?",
        answer: "We begin with a local search audit evaluating your Google Business Profile, local citations, and local competitor positioning."
      }
    ],
    ctaHeading: "Ready to dominate Google Maps and capture local customer demand?",
    ctaButtonText: "Discuss Your Local SEO Strategy",
    ctaSubtext: "Book a 30-minute growth systems call to evaluate your local map pack rankings and lead generation.",
    lastUpdated: "2026-08-26",
    metaTitle: "Local SEO Services & Google Business Visibility | DigiXPro",
    metaDescription: "Local SEO services, Google Business Profile optimization, local map pack rankings, and geo-targeted lead generation for service businesses."
  },

  // =========================================================================
  // 04 — SOCIAL MEDIA MANAGEMENT & CONTENT SYSTEMS
  // =========================================================================
  {
    slug: "social-media-management",
    title: "Social Media Management & Content Systems",
    buyerQuestion: "How do we maintain consistent social media visibility without carrying the heavy content workload?",
    buyerSituation: "We know our business needs consistent social media presence, but our internal team lacks the time to research topics, write posts, create graphics, and schedule publishing.",
    primaryKeyword: "social media management",
    supportingKeywords: [
      "social media marketing services",
      "social media management for small business",
      "social media content management",
      "B2B social content system",
      "automated content workflow"
    ],
    category: "Content Systems",
    commercialModel: "MONTHLY",
    badgeText: "Structured Content Pipeline",
    heroHeading: "Social Media Management & Structured Content Systems.",
    heroSubheading: "Position your brand consistently across social channels. We operate a structured content pipeline: Strategy -> Research -> AI-assisted Copy -> Human Review -> Creative -> Publishing.",
    shortDesc: "Structured social media management, content pipeline strategy, AI-assisted content creation, human editing, graphic design, and multi-channel publishing.",
    problemHeading: "Social Media Content Bottlenecks We Eliminate",
    problemPoints: [
      "Sporadic posting schedules caused by internal staff prioritizing daily operations over content creation.",
      "Generic, uninspiring social posts that fail to communicate your core value proposition or technical authority.",
      "High internal effort spent drafting posts manually without a repeatable topic research or creative framework.",
      "Social media presence operating in isolation, disconnected from search visibility and website lead capture."
    ],
    solutionHeading: "Social Content System Deliverables You Receive",
    deliverables: [
      { title: "Monthly Content Calendar & Topic Strategy", desc: "Structured editorial calendar mapping industry topics, buyer pain points, case study highlights, and service CTAs." },
      { title: "AI-Assisted Drafting & Human Editorial Review", desc: "Leveraging AI for rapid topic research and draft generation, followed by rigorous human editorial review for brand voice." },
      { title: "Custom Visual Assets & Brand Graphics", desc: "Designed social cards, infographics, carousels, and visual templates matching your brand identity." },
      { title: "Multi-Channel Publishing & Performance Review", desc: "Automated scheduling, cross-channel publishing, engagement monitoring, and monthly analytics reporting." }
    ],
    evidenceTitle: "DigiXPro Internal Content Workflow",
    evidenceText: "DigiXPro operates its own structured content pipeline: raw topic collection -> AI-assisted draft generation -> human review and editorial refining -> visual asset design -> automated publishing.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "How does DigiXPro's social media service differ from generic posting services?",
        answer: "We do not publish generic quotes or stock filler. We build a structured B2B content system that translates your actual service capabilities, client evidence, and industry insights into authoritative social content."
      },
      {
        question: "Do you use AI for content creation?",
        answer: "We use AI models for rapid topic research and initial draft structuring, but every piece of content undergoes strict human editorial review, factual verification, and brand voice refinement before publishing."
      },
      {
        question: "Which social media platforms do you manage?",
        answer: "We manage LinkedIn, Twitter/X, Facebook, Instagram, and YouTube content channels depending on where your target buyers research service providers."
      },
      {
        question: "How much time does my internal team need to spend each month?",
        answer: "Typically less than 60 minutes per month. We conduct a monthly 30-minute topic alignment call and send a batch content preview for your quick review and approval."
      },
      {
        question: "Who creates the graphics and visual assets?",
        answer: "Our design team creates custom visual assets, social cards, carousel slides, and branded graphics aligned with your visual identity tokens."
      },
      {
        question: "Does social media management help with search and AI discovery?",
        answer: "Yes. Consistent social publishing builds indexable web signals, creates structured brand references across the web, and feeds fresh context for search engines and AI answer engines."
      },
      {
        question: "What is included in the monthly social media package?",
        answer: "Monthly service includes topic research, editorial planning, copy drafting, graphic creation, scheduling, cross-platform publishing, and monthly performance reporting."
      },
      {
        question: "How do we get started with social media management?",
        answer: "We start with a content discovery call to audit your existing channels, define your brand voice guidelines, and outline your first 30-day content calendar."
      }
    ],
    ctaHeading: "Ready to establish a consistent, authoritative social media presence?",
    ctaButtonText: "Discuss Your Content Strategy",
    ctaSubtext: "Book a 30-minute growth systems call to evaluate your social content pipeline.",
    lastUpdated: "2026-08-26",
    metaTitle: "Social Media Management & Content Systems | DigiXPro",
    metaDescription: "Structured social media management, content pipeline strategy, AI-assisted drafting, human editorial review, graphic design, and multi-channel publishing."
  },

  // =========================================================================
  // 05 — WORKFLOW & AI AUTOMATION
  // =========================================================================
  {
    slug: "workflow-ai-automation",
    title: "Workflow & AI Automation",
    buyerQuestion: "Can repetitive operational work across our business actually be automated cleanly?",
    buyerSituation: "Our team spends hours on manual copy-paste tasks, data re-entry across tools, and manual follow-ups that slow down core business operations.",
    primaryKeyword: "workflow automation",
    supportingKeywords: [
      "AI automation agency",
      "business automation",
      "n8n automation",
      "AI workflow automation",
      "API automation",
      "webhook integration"
    ],
    category: "Workflow Automation",
    commercialModel: "IMPLEMENTATION + SUPPORT",
    badgeText: "n8n & API Automation",
    heroHeading: "Workflow & AI Automation Engineering.",
    heroSubheading: "Eliminate manual data entry and departmental friction. We connect your business software, APIs, AI models, and databases into self-hosted n8n automation pipelines.",
    shortDesc: "Production n8n workflow engineering, custom API webhook integrations, AI model connections, automated document processing, and data synchronization.",
    problemHeading: "Manual Operational Bottlenecks We Automate",
    problemPoints: [
      "Employees manually re-entering client lead data between web forms, spreadsheets, CRMs, and email.",
      "Important customer inquiries delayed because notifications rely on manual team forwardings.",
      "Fragile third-party automation tools charging high per-task fees with limited error handling.",
      "Desire to leverage AI tools internally, but lacking the technical infrastructure to connect AI securely to workflows."
    ],
    solutionHeading: "Automation Engineering Deliverables You Receive",
    deliverables: [
      { title: "Production n8n Workflow Pipelines", desc: "Self-hosted, secure automation workflows connecting web forms, CRMs, Notion, email, and messaging platforms." },
      { title: "Direct API & Webhook Integrations", desc: "Custom HTTP webhook triggers ensuring instant, sub-second data handoffs between core software tools." },
      { title: "AI Model & Document Processing Connections", desc: "Integrating LLM APIs (OpenAI, Anthropic) to extract structured data from unstructured emails, PDFs, and forms." },
      { title: "Resilient Error Handling & Monitoring", desc: "Engineering retry logic, failover queues, and automated alerts to prevent dropped transactions and ensure system resilience." }
    ],
    evidenceTitle: "DigiXPro n8n Webhook Infrastructure",
    evidenceText: "DigiXPro operates its own production lead pipeline using self-hosted n8n webhooks: web forms -> n8n webhook -> instant Notion database routing & notification feeds.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "Why does DigiXPro use n8n for workflow automation instead of Zapier or Make?",
        answer: "n8n allows self-hosted code control, complete data privacy compliance, complex conditional logic, custom JavaScript nodes, and zero per-task cost escalations as transaction volume scales."
      },
      {
        question: "What software tools and APIs can be automated?",
        answer: "Any software application with a REST API, webhook support, or database access can be connected — including HubSpot, Salesforce, Notion, Slack, WhatsApp, Google Workspace, and custom web apps."
      },
      {
        question: "How do you ensure data security during workflow automation?",
        answer: "We deploy self-hosted automation instances with encrypted API key storage, strict CORS access control, and zero data retention on un-vetted third-party servers."
      },
      {
        question: "What happens if an API or third-party service fails during an automated workflow?",
        answer: "We engineer automated retry logic, error logging queues, and instant email/slack notification alerts into every workflow to ensure data is never lost."
      },
      {
        question: "Can AI models be integrated into automated workflows?",
        answer: "Yes. We integrate AI API endpoints to classify leads, summarize customer requests, extract data from documents, and generate structured draft responses automatically."
      },
      {
        question: "Do we need an internal developer to manage automated workflows?",
        answer: "No. We deliver fully documented, turn-key automation pipelines and provide ongoing technical maintenance and support."
      },
      {
        question: "How is a workflow automation project structured?",
        answer: "We begin with a workflow discovery audit, map data handoffs, build and test the n8n pipeline in a staging environment, and deploy with full monitoring."
      },
      {
        question: "How do we get started with workflow automation?",
        answer: "Schedule a 30-minute discovery call to map your current manual bottlenecks and evaluate automation ROI."
      }
    ],
    ctaHeading: "Ready to eliminate manual copy-paste tasks and automate operational workflows?",
    ctaButtonText: "Plan Your Automation Pipeline",
    ctaSubtext: "Book a 30-minute growth systems call to evaluate your workflow automation opportunities.",
    lastUpdated: "2026-08-26",
    metaTitle: "Workflow & AI Automation Services | n8n & API Engineering | DigiXPro",
    metaDescription: "Production workflow automation, n8n pipeline engineering, custom API webhook integrations, AI model connections, and business process automation."
  },

  // =========================================================================
  // 06 — LEAD CAPTURE, CRM & SALES AUTOMATION
  // =========================================================================
  {
    slug: "lead-capture-crm-sales-automation",
    title: "Lead Capture, CRM & Sales Automation",
    buyerQuestion: "How do we ensure every website enquiry is captured, qualified, routed, and followed up consistently?",
    buyerSituation: "Enquiries arrive from web forms, email, and phone, but follow-up is inconsistent, lead data is scattered, and sales follow-ups fall through the cracks.",
    primaryKeyword: "lead generation systems",
    supportingKeywords: [
      "lead capture automation",
      "CRM automation",
      "sales automation",
      "lead management automation",
      "enquiry automation"
    ],
    category: "Lead Infrastructure",
    commercialModel: "IMPLEMENTATION + OPTIMIZATION",
    badgeText: "Lead Routing & CRM OS",
    heroHeading: "Lead Capture, CRM & Sales Automation Systems.",
    heroSubheading: "Turn incoming enquiries into a structured, automated follow-up process. We integrate web forms, instant CRM lead creation, automated notifications, and sales pipeline tracking.",
    shortDesc: "Lead capture system engineering, CRM automation, instant lead routing, sales pipeline synchronization, and automated lead follow-up workflows.",
    problemHeading: "Lead Management Flaws We Fix",
    problemPoints: [
      "Enquiries sitting unread in email inboxes for hours before team members respond to prospective buyers.",
      "Leads lost when form submissions fail silently without technical error logging or instant notifications.",
      "Sales reps spending time manually creating CRM contacts instead of speaking with qualified prospects.",
      "Lack of executive visibility into lead source attribution, response times, and pipeline conversion metrics."
    ],
    solutionHeading: "Lead System Deliverables You Receive",
    deliverables: [
      { title: "High-Conversion Lead Capture Form Architecture", desc: "Engineering fast, accessible web forms with client-side validation, anti-spam protection, and instant webhook triggers." },
      { title: "Instant Lead Routing & Notification Feed", desc: "Automated routing sending lead alerts directly to assigned sales reps via Slack, WhatsApp, or email within seconds." },
      { title: "CRM Pipeline & Database Synchronization", desc: "Automated creation of contact records, deal stages, and lead source tracking in HubSpot, Salesforce, or Notion." },
      { title: "Automated Lead Nurture & Follow-Up Sequences", desc: "Configuring automated email confirmations, calendar booking links, and follow-up reminders." }
    ],
    evidenceTitle: "DigiXPro SalesConcierge Infrastructure",
    evidenceText: "DigiXPro operates its own production SalesConcierge lead capture system, routing form submissions into automated validation, Notion database logging, and instant notification feeds.",
    evidenceLink: "/evidence/digixpro",
    faqs: [
      {
        question: "Why is getting a lead different from managing a lead?",
        answer: "Getting a lead creates an initial inquiry. Managing a lead ensures instant technical capture, automated qualification, instant sales notification, CRM logging, and consistent follow-up so no opportunity is lost."
      },
      {
        question: "How fast can automated lead routing notify our sales team?",
        answer: "Our automated webhook pipelines route lead submissions to your sales team's Slack, WhatsApp, or CRM within 2 to 5 seconds of form submission."
      },
      {
        question: "Can lead capture integrate with our existing CRM?",
        answer: "Yes. We connect web forms directly to HubSpot, Salesforce, Zoho, Notion, Pipedrive, or custom CRM databases using direct API webhooks."
      },
      {
        question: "How do you prevent spam form submissions?",
        answer: "We implement honeypot fields, server-side validation, rate limiting, and automated spam filtering before lead data enters your CRM."
      },
      {
        question: "What happens if a customer submits an enquiry outside business hours?",
        answer: "Automated workflows send an immediate personalized email confirmation with self-service calendar booking links, ensuring the prospect is engaged immediately."
      },
      {
        question: "Can lead capture track where enquiries originated?",
        answer: "Yes. We capture UTM parameters, referrer data, and landing page URLs so your CRM reports exact lead source attribution."
      },
      {
        question: "Do we need a complex CRM software to start?",
        answer: "No. If you do not have a CRM, we can build a lightweight Notion or Airtable lead pipeline that provides clear lead tracking without expensive user license costs."
      },
      {
        question: "How do we get started with lead capture automation?",
        answer: "Schedule a 30-minute discovery call to evaluate your current lead capture flow, CRM setup, and response times."
      }
    ],
    ctaHeading: "Ready to turn website enquiries into an organized, automated lead pipeline?",
    ctaButtonText: "Build Your Lead Capture System",
    ctaSubtext: "Book a 30-minute growth systems call to evaluate your lead management infrastructure.",
    lastUpdated: "2026-08-26",
    metaTitle: "Lead Capture, CRM & Sales Automation Systems | DigiXPro",
    metaDescription: "Lead capture system engineering, CRM automation, instant lead routing, sales pipeline tracking, and automated lead follow-up workflows."
  }
];
