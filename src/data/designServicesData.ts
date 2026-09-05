export interface DesignServiceOverviewSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  subsections?: { title: string; description?: string; bullets?: string[] }[];
  bulletPoints?: string[];
}

export interface DesignServiceComparisonTable {
  title?: string;
  subtitle?: string;
  columnAHeader?: string;
  columnBHeader?: string;
  rows: { feature?: string; columnA: string; columnB: string }[];
}

export interface DesignServiceFAQ {
  question: string;
  answer: string;
}

export interface DesignServiceDeliverable {
  title: string;
  desc: string;
}

export interface DesignServiceItem {
  slug: string;
  number: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  problemAwareKeywords: string[];
  readyToActKeywords: string[];
  buyerSituation: string;
  heroHeading: string;
  heroSubheading: string;
  metaTitle: string;
  metaDescription: string;
  shortDesc: string;
  problemHeading: string;
  problemPoints: string[];
  solutionHeading: string;
  solutionDeliverables: DesignServiceDeliverable[];
  capabilitySignals: string[];
  faqs: DesignServiceFAQ[];
  overviewSections?: DesignServiceOverviewSection[];
  comparisonTable?: DesignServiceComparisonTable;
  ctaHeading: string;
  ctaButtonText: string;
  ctaSubtext: string;
}

export const designSubServices: DesignServiceItem[] = [
  // =========================================================================
  // SERVICE 01: CUSTOM BUSINESS WEBSITE DESIGN & DEVELOPMENT
  // =========================================================================
  {
    slug: "custom-business-website-design",
    number: "01",
    title: "Custom Website Design Services for Small & Growing Businesses",
    primaryKeyword: "custom website design services",
    secondaryKeywords: [
      "small business website design",
      "custom website design",
      "business website design",
      "custom website development",
      "custom website development service"
    ],
    problemAwareKeywords: [
      "why generic website templates fail growing businesses",
      "custom web application vs monolithic CMS templates",
      "building a custom website for B2B lead capture"
    ],
    readyToActKeywords: [
      "hire custom website development agency",
      "plan custom business website build",
      "custom web development quote"
    ],
    buyerSituation: "I need a new business website engineered for speed, authority, and lead capture.",
    heroHeading: "Custom Website Design Services for Small & Growing Businesses",
    heroSubheading: "Custom business website design is the engineering of bespoke web applications tailored directly to a company's brand authority, operational workflows, and commercial lead capture targets. Unlike rigid pre-made templates, professional custom website design services build decoupled frontend architecture using React and Next.js, ensuring 100% Core Web Vitals page speed, immune site security, and native search indexability for small business website design requirements.",
    metaTitle: "Custom Website Design Services for Small & Growing Businesses",
    metaDescription: "Bespoke custom website design services and React/Next.js codebase engineering for small business website design requirements. 100% Core Web Vitals & lead capture.",
    shortDesc: "Bespoke web applications built on modern Next.js and React architecture. Engineered for visual authority, fast performance, search indexability, and B2B lead capture.",
    problemHeading: "Common Obstacles When Building a New Business Website",
    problemPoints: [
      "Buying rigid pre-made templates that restrict brand distinction and fail to communicate operational authority.",
      "Building on slow, plugin-heavy monolithic CMS platforms that suffer from poor Core Web Vitals and security exploits.",
      "Designing pages visually without planning user intent, content hierarchy, or clear B2B lead capture pathways.",
      "Treating technical SEO as a post-launch add-on rather than engineering search indexability into the codebase."
    ],
    solutionHeading: "Custom Web Engineering Deliverables",
    solutionDeliverables: [
      { title: "Design Scope", desc: "Accessible UI/UX design tokens, Tailwind CSS component library, responsive viewports, and enterprise visual authority." },
      { title: "Development Scope", desc: "Decoupled Next.js static & server rendering, React Server Components, zero third-party plugin bloat, sub-second speed." },
      { title: "Integrations", desc: "Direct API webhooks connecting lead capture forms to CRM platforms (Notion, HubSpot, WhatsApp, n8n automation)." },
      { title: "SEO-Readiness", desc: "Automated JSON-LD structured data schemas, canonical tag management, semantic HTML5, 100% Core Web Vitals optimization." }
    ],
    capabilitySignals: [
      "Custom Next.js & React Architecture",
      "100% Core Web Vitals Performance",
      "Built-in Technical SEO Plumbing",
      "Lead Capture & Webhook UX"
    ],
    faqs: [
      {
        question: "What is custom website design and how does it differ from template websites?",
        answer: "Custom website design is the engineering of bespoke web applications tailored directly to a company's brand identity, operational workflows, and conversion requirements rather than forcing content into pre-packaged themes. Off-the-shelf templates rely on monolithic CMS platforms like WordPress, which ship with bloated CSS, unoptimized JavaScript, unused third-party plugins, and rigid layout boundaries that restrict brand authority. In contrast, our custom business website design services build clean Next.js and React codebases optimized for 100% Core Web Vitals speed, zero plugin vulnerability risk, and complete architectural scalability. To compare detailed investment tiers for custom builds versus template migrations, review the [DigiXPro Investment Guide](/pricing)."
      },
      {
        question: "What does a professional custom website development service include?",
        answer: "A professional custom website development service includes comprehensive technical discovery, accessible UI design system engineering, decoupled frontend development, automated JSON-LD structured data integration, and direct API lead capture plumbing. Rather than delivering simple graphic mocks, our engineering team constructs modular Tailwind CSS component libraries paired with server-rendered Next.js pages. We also implement custom webhook routes connecting web forms to your internal CRM, Notion boards, or automated workflow engines without relying on vulnerable third-party plugins. For a breakdown of phase deliverables and scoping options, consult the [DigiXPro Investment Guide](/pricing)."
      },
      {
        question: "Custom website vs WordPress: Which architecture is right for my business?",
        answer: "Decoupled custom website architecture is right for businesses that prioritize sub-second page performance, immune security, and long-term brand authority over quick template deployment. Traditional WordPress sites suffer from plugin bloat, frequent database exploits, slow mobile rendering, and high maintenance overhead. Modern Next.js custom applications eliminate database query latency by serving pre-compiled static HTML pages and optimized React components across global CDN edge nodes. While generic WordPress setups suit basic low-traffic blogs, growing businesses require decoupled Next.js web applications to convert search visitors into qualified lead pipelines. Explore detailed feature comparisons and delivery schedules in the [DigiXPro Investment Guide](/pricing)."
      },
      {
        question: "How much does a custom business website cost?",
        answer: "Custom business website development pricing depends directly on total page scope, bespoke UI component complexity, interactive workflow logic, and custom API integration requirements. Unlike low-cost template installations, custom web engineering provides a long-term digital asset engineered for conversion, zero security vulnerabilities, and sub-second page performance. Engagements are structured as fixed-scope milestones covering architecture discovery, UI design tokens, Next.js codebase construction, technical SEO integration, and webhook lead routing. To review standard engagement tiers, scoping benchmarks, and commercial payment terms, view the [DigiXPro Investment Guide](/pricing)."
      },
      {
        question: "How long does a custom web development project take?",
        answer: "A custom business website engineering project typically takes 4 to 8 weeks from initial discovery to live production launch depending on technical scope and content readiness. Phase 1 (Weeks 1–2) focuses on architecture discovery, user intent mapping, and structural wireframing. Phase 2 (Weeks 3–4) establishes visual design system tokens and responsive Tailwind CSS layout components. Phase 3 (Weeks 5–7) executes decoupled Next.js codebase engineering, schema injection, and webhook API routes. Phase 4 (Week 8) conducts Core Web Vitals optimization and production release. Detailed timeline breakdowns for every development stage are detailed in the [DigiXPro Investment Guide](/pricing)."
      },
      {
        question: "Will search indexability be built into our custom business website?",
        answer: "Yes, comprehensive technical search indexability is engineered directly into the custom codebase from day one rather than treated as a post-launch add-on. Every custom Next.js website includes automated JSON-LD structured data schemas, canonical tag management, dynamic XML sitemaps, clean semantic HTML5 heading structures, and OpenGraph metadata configuration. Server-side rendering in Next.js serves pre-rendered HTML to search engine crawlers, eliminating indexing delays associated with client-side JavaScript applications. Furthermore, our performance architecture guarantees 100% Core Web Vitals scores across mobile viewports, providing an immediate ranking advantage in Google search results."
      },
      {
        question: "Can our custom Next.js website connect with our existing CRM or software stack?",
        answer: "Yes, custom Next.js web applications seamlessly connect with CRMs, Notion databases, email marketing platforms, and n8n workflow engines via direct API webhooks. Instead of relying on insecure third-party plugins that degrade page performance, we construct idempotent API webhook endpoints that transmit lead form data instantly upon submission. This eliminates manual copy-paste data entry and guarantees zero lead loss between web forms and sales pipelines. Review our [verified client evidence](/evidence) to see real-world API integration blueprints, or learn more about our [founder-led technical strategy](/founder) for enterprise software integration."
      },
      {
        question: "What is the difference between frontend visual design and codebase engineering?",
        answer: "Frontend visual design focuses on brand aesthetics, color palettes, typography hierarchy, user interface layouts, and visual asset production to create an engaging brand identity. Codebase engineering translates visual designs into production-ready software using React components, Tailwind CSS styling, optimized JavaScript assets, server-side rendering logic, and secure API endpoints. While visual design ensures your website looks professional, codebase engineering guarantees that your website loads in under one second, remains secure against cyber threats, ranks effectively on search engines, and converts visitors into leads. Unsure which fits your business? A quick [Technical Architecture Audit](/audit) clarifies this."
      },
      {
        question: "How does a custom Next.js website achieve fast mobile Core Web Vitals page speed?",
        answer: "Custom Next.js web applications achieve sub-second mobile page loads through server-side rendering, automatic code splitting, optimized image loading, and decoupled architecture. Next.js compiles static HTML at build time, eliminating backend database execution delays when users visit your site. Furthermore, React Server Components isolate heavy dependencies on the server, serving minimal JavaScript bundles to mobile browsers. This architecture eliminates layout shift, reduces interaction latency, and guarantees 100% Core Web Vitals scores across all mobile cellular networks. Unsure which fits your business? A quick [Technical Architecture Audit](/audit) clarifies this."
      },
      {
        question: "Do we get 100% source code ownership of our custom business website?",
        answer: "Yes, you retain complete 100% source code ownership, design asset IP, and repository access upon completion of your custom business website project. We deliver full production source code via GitHub repositories along with modern deployment configurations for Vercel, Cloudflare, or your preferred cloud infrastructure. There are zero mandatory monthly maintenance lock-ins, proprietary framework licensing fees, or hidden platform host restrictions. Your team retains total control to host, modify, extend, or transfer your custom web application as your business scales. Unsure which fits your business? A quick [Technical Architecture Audit](/audit) clarifies this."
      }
    ],
    ctaHeading: "Ready to build a custom business website engineered for growth?",
    ctaButtonText: "Request a Technical Architecture Audit",
    ctaSubtext: "Book an architecture discovery session to discuss your business bottlenecks, target audience intent, and technical web engineering requirements."
  },

  // =========================================================================
  // SERVICE 02: WEBSITE REDESIGN & SEO-SAFE REBUILD
  // =========================================================================
  {
    slug: "website-redesign",
    number: "02",
    title: "Website Redesign & SEO-Safe Rebuild",
    primaryKeyword: "website redesign service",
    secondaryKeywords: [
      "small business website redesign",
      "website redesign SEO",
      "SEO website redesign",
      "website redesign cost",
      "website redesign services"
    ],
    problemAwareKeywords: [
      "will redesigning my website hurt my Google rankings",
      "how to redesign a website without losing SEO traffic",
      "rebuilding bloated WordPress site on Next.js"
    ],
    readyToActKeywords: [
      "hire SEO website redesign agency",
      "book website redesign audit",
      "small business website redesign quote"
    ],
    buyerSituation: "I already have a website, but it isn't working properly.",
    heroHeading: "Website Redesign & SEO-Safe Codebase Rebuild.",
    heroSubheading: "Modernize legacy WordPress or CMS platforms without risking existing Google rankings. We preserve canonical integrity, fix Core Web Vitals bottlenecks, and eliminate plugin security vulnerabilities.",
    metaTitle: "Website Redesign & SEO-Safe Rebuild Services",
    metaDescription: "Modernize legacy websites without losing Google rankings. SEO-safe website redesign service preserving canonical integrity, 301 mappings, and Core Web Vitals speed.",
    shortDesc: "Modernize legacy WordPress or CMS platforms without risking existing Google rankings. Preserves canonical integrity, fixes Core Web Vitals bottlenecks, and eliminates plugin vulnerabilities.",
    problemHeading: "Critical Risks When Redesigning an Existing Business Website",
    problemPoints: [
      "Redesigning page layouts without mapping existing URL structures, causing broken links (404s) and severe keyword ranking drops.",
      "Carrying bloated legacy code and insecure third-party plugins into the new website, preserving slow load times.",
      "Altering page titles, heading structures, and schema tags without preserving established search engine indexability.",
      "Focusing exclusively on aesthetic visual polish while ignoring underlying lead capture bottlenecks and conversion friction."
    ],
    solutionHeading: "SEO-Safe Redesign & Rebuild Deliverables",
    solutionDeliverables: [
      { title: "SEO-Safe Content & Ranking Migration Map", desc: "Comprehensive 301 redirect mapping, canonical tag validation, and search index audit to protect existing keyword authority." },
      { title: "Modern Next.js Component Stack Rebuild", desc: "Rebuilding legacy pages on decoupled Next.js and TailwindCSS architecture for 100% Core Web Vitals page speed." },
      { title: "Conversion UX & Message Hierarchy Overhaul", desc: "Restructuring value propositions, call-to-actions, and lead forms to turn existing traffic into qualified enquiries." },
      { title: "Automated Structured Data Schema Injection", desc: "Updating JSON-LD schemas, OpenGraph tags, and machine-readable context for modern search engines and AI discovery (GEO)." }
    ],
    capabilitySignals: [
      "SEO-Safe Content & Ranking Migration",
      "Performance & Codebase Rebuild",
      "301 Mapping & Canonical Integrity",
      "Modern Component Stack Conversion"
    ],
    faqs: [
      {
        question: "Will redesigning my website hurt my existing Google search rankings?",
        answer: "Not if technical SEO is built into the redesign architecture. We perform detailed URL mapping, implement 301 redirects, preserve canonical integrity, and maintain semantic HTML5 structure during the rebuild. This prevents keyword drops and ensures your new website launches with clean indexability and improved search performance."
      },
      {
        question: "Can existing URLs and organic SEO authority be preserved during a redesign?",
        answer: "Yes. We conduct a thorough audit of your top-performing organic landing pages, index status, and backlink profile. We match existing URL structures wherever possible and configure exact 301 redirects for any altered paths, preserving domain authority."
      },
      {
        question: "How do you identify what is actually wrong with an existing website before redesigning?",
        answer: "We perform a strategic diagnosis evaluating codebase efficiency, Core Web Vitals metrics, search crawl logs, user conversion paths, and message clarity. This ensures the redesign addresses real operational bottlenecks rather than making superficial visual changes."
      },
      {
        question: "What factors govern total website redesign cost?",
        answer: "Website redesign cost depends on total page count, content migration scope, interactive workflow needs, custom API webhooks, and technical SEO complexity. Migrating to modern Next.js architecture eliminates recurring plugin license fees and reduces ongoing maintenance costs."
      },
      {
        question: "Can you redesign our website without replacing our entire software stack?",
        answer: "Yes. Our advisory is vendor-neutral. We protect your existing software investments by building custom API webhooks to connect your new frontend user experience with your existing CRM, ERP, or marketing platforms."
      },
      {
        question: "How long does an SEO-safe website redesign take to complete?",
        answer: "Most website redesign engagements take 4 to 8 weeks from audit and wireframing to code rebuild, 301 mapping, and production release."
      }
    ],
    ctaHeading: "Planning a website redesign and worried about losing SEO traffic?",
    ctaButtonText: "Review Your Existing Website",
    ctaSubtext: "Book a 30-minute discovery call to audit your existing website, review ranking migration strategies, and plan an SEO-safe rebuild."
  },

  // =========================================================================
  // SERVICE 03: SMALL BUSINESS & SERVICE BUSINESS WEBSITES
  // =========================================================================
  {
    slug: "small-business-websites",
    number: "03",
    title: "Small Business & Service Business Websites",
    primaryKeyword: "small business website design service",
    secondaryKeywords: [
      "small business website design",
      "service business website design",
      "small business website design company",
      "business website design service"
    ],
    problemAwareKeywords: [
      "how service businesses get qualified enquiries online",
      "structuring a small business website for lead capture",
      "avoiding cheap commodity website templates"
    ],
    readyToActKeywords: [
      "hire small business website design service",
      "small business website design quote",
      "discuss service business website architecture"
    ],
    buyerSituation: "I need a website designed around how my business actually gets enquiries.",
    heroHeading: "Small Business & Service Business Web Engineering.",
    heroSubheading: "We design and build purpose-built web platforms for service enterprises. Structured around clear service packaging, high-intent lead capture UX, search indexability, and direct customer acquisition.",
    metaTitle: "Small Business Website Design Services",
    metaDescription: "Purpose-built small business website design services. Structured around service packaging, B2B lead capture UX, search visibility, and automated lead handoffs.",
    shortDesc: "Purpose-built web platforms for service enterprises. Structured around lead capture pathways, service-business UX, search visibility, and real customer acquisition.",
    problemHeading: "Why Generic Small Business Websites Fail to Convert",
    problemPoints: [
      "Using commodity templates that list generic services without explaining delivery blueprints or business outcomes.",
      "Lacking clear call-to-actions, forcing prospective clients to hunt for contact info or fill out long, high-friction forms.",
      "Failing to capture local and international search intent, leaving the business invisible to prospective buyers.",
      "Manual enquiry handling that relies on unstructured emails or lost phone calls without CRM webhook automation."
    ],
    solutionHeading: "Service Enterprise Web Engineering Deliverables",
    solutionDeliverables: [
      { title: "Service Intent Packaging & UX Blueprint", desc: "Structuring core service offerings around buyer intent, operational scope, and transparent delivery expectations." },
      { title: "High-Converting Enquiry Architecture", desc: "Prominent CTA placements, friction-free qualification forms, and clear next-step guidance for prospective clients." },
      { title: "Search Visibility & Indexability Infrastructure", desc: "Local and global technical SEO schemas, clean HTML5 hierarchy, and Core Web Vitals speed optimization." },
      { title: "Direct CRM & WhatsApp Notification Integration", desc: "Instant lead routing via secure API webhooks directly to your team's CRM or mobile communication channels." }
    ],
    capabilitySignals: [
      "Service-Business Intent Mapping",
      "High-Converting Enquiry Architecture",
      "Local & Global Search Infrastructure",
      "Direct CRM & WhatsApp Integration"
    ],
    faqs: [
      {
        question: "What should a service business website include to generate consistent enquiries?",
        answer: "A service business website requires a clear value proposition statement, detailed service packaging, transparent methodology blueprints, social proof/evidence, accessible contact options, and automated lead capture webhooks."
      },
      {
        question: "How does a custom service business website compare to generic website templates?",
        answer: "Generic templates focus on visual placeholder blocks rather than sales workflow alignment. Custom web engineering tailors page structures around your specific sales process, optimizes Core Web Vitals for search performance, and eliminates CMS plugin vulnerabilities."
      },
      {
        question: "Can a small business website rank effectively in competitive local and global search markets?",
        answer: "Yes. By building technical SEO, structured JSON-LD schemas, clean canonical tags, and fast Next.js page speeds directly into the codebase, small business websites can rank strongly for high-intent commercial keywords."
      },
      {
        question: "Can our small business website connect directly with WhatsApp or our CRM?",
        answer: "Yes. We build direct API webhooks connecting web forms with WhatsApp notifications, Notion lead boards, or CRMs like HubSpot and Salesforce, ensuring instant enquiry handoffs."
      },
      {
        question: "Can DigiXPro work with our existing brand guidelines?",
        answer: "Yes. We ingest your existing brand assets, vector logos, and color palettes, building a clean, modern TailwindCSS UI design system that reflects your business authority."
      },
      {
        question: "How do we get started with a small business website project?",
        answer: "Book a 30-minute architecture call. We evaluate your current website, discuss your service packaging, and define the right web engineering roadmap for your business."
      }
    ],
    ctaHeading: "Ready to build a website designed around how your business gets leads?",
    ctaButtonText: "Discuss Your Business Website",
    ctaSubtext: "Book a 30-minute discovery consultation to discuss your service packaging, search target markets, and lead capture goals."
  },

  // =========================================================================
  // SERVICE 04: LANDING PAGE & LEAD GENERATION DESIGN
  // =========================================================================
  {
    slug: "landing-page-lead-generation",
    number: "04",
    title: "Landing Page & Lead Generation Design",
    primaryKeyword: "landing page design service",
    secondaryKeywords: [
      "landing page design",
      "lead generation landing page design",
      "landing page design agency",
      "landing page design with form",
      "landing page design services"
    ],
    problemAwareKeywords: [
      "why paid ad campaigns fail on general homepages",
      "structuring landing pages for high-intent B2B conversion",
      "reducing landing page bounce rates for paid traffic"
    ],
    readyToActKeywords: [
      "order landing page design service",
      "hire landing page design agency",
      "plan campaign landing page"
    ],
    buyerSituation: "I need a specific offer or campaign to generate enquiries.",
    heroHeading: "Landing Page & Lead Generation Conversion Design.",
    heroSubheading: "We design and engineer high-converting landing pages built for offer clarity, visitor intent alignment, friction-free lead capture forms, and automated CRM webhook routing.",
    metaTitle: "Landing Page Design & Lead Generation Services",
    metaDescription: "High-converting landing page design services. Engineered for campaign offer clarity, visitor intent alignment, friction-free lead forms, and automated CRM webhooks.",
    shortDesc: "High-converting landing pages engineered for offer clarity, visitor intent alignment, friction-free lead capture forms, and automated CRM webhook routing.",
    problemHeading: "Why Ad Campaigns & Promotional Landing Pages Fail to Convert",
    problemPoints: [
      "Sending paid traffic to general homepages with competing navigation links, distracting visitors from the primary offer.",
      "Mismatch between campaign ad copy and landing page headlines, causing immediate bounce rates.",
      "Overwhelming prospective clients with lengthy, multi-step forms that create conversion friction.",
      "Failing to integrate lead capture forms directly with backend CRMs, causing delayed follow-up times."
    ],
    solutionHeading: "Lead Generation Landing Page Engineering Deliverables",
    solutionDeliverables: [
      { title: "Offer Clarity & Message Alignment Blueprint", desc: "Structuring headlines, subtext, and value propositions to match exact ad copy and visitor campaign intent." },
      { title: "Friction-Free Lead Qualification Forms", desc: "Accessible, fast-loading enquiry forms designed to maximize completion rates while gathering essential buyer context." },
      { title: "Core Web Vitals & Mobile Speed Optimization", desc: "Engineered on Next.js for instant page load speeds, ensuring paid traffic is never lost to slow server rendering." },
      { title: "Automated CRM & Workflow Webhook Integration", desc: "Direct API webhooks passing lead data to CRM boards, email notifications, or n8n workflow pipelines instantaneously." }
    ],
    capabilitySignals: [
      "Offer Clarity & Copy Strategy",
      "Campaign Message Alignment",
      "Friction-Free Qualification Forms",
      "Automated n8n/CRM Webhooks"
    ],
    faqs: [
      {
        question: "Do I need a dedicated landing page or should I send campaign traffic to my website?",
        answer: "Dedicated landing pages significantly outperform general websites for marketing campaigns. Landing pages remove navigation distractions, align 100% with ad copy messaging, and guide visitors to a single conversion action."
      },
      {
        question: "How should a lead generation landing page be structured for high conversion?",
        answer: "A high-converting landing page features an instant value proposition, social proof/evidence, structured benefits, friction-free lead forms, explicit objection handling, and clear call-to-actions."
      },
      {
        question: "Can your landing pages connect directly to our lead management software or CRM?",
        answer: "Yes. We build direct API webhooks connecting form submissions to CRMs (HubSpot, Salesforce), Notion lead boards, WhatsApp notifications, or n8n workflow automation pipelines."
      },
      {
        question: "How quickly can a dedicated campaign landing page be engineered and launched?",
        answer: "Dedicated landing page engagements typically take 1 to 2 weeks from message design and component layout to code build and webhook testing."
      },
      {
        question: "Are your landing pages mobile-optimized and fast-loading?",
        answer: "Yes. Built on Next.js and TailwindCSS, our landing pages achieve 100% Core Web Vitals performance and instant rendering on all mobile devices."
      },
      {
        question: "Can landing pages support paid ad campaigns on Google Ads and LinkedIn?",
        answer: "Absoluty. Our landing pages are engineered specifically for paid traffic conversion, ensuring message match, high quality scores, and clean attribution tracking."
      }
    ],
    ctaHeading: "Planning a marketing campaign or service launch?",
    ctaButtonText: "Plan Your Lead-Generation Page",
    ctaSubtext: "Book a 30-minute discovery call to align your offer, campaign messaging, landing page UX, and CRM lead pipeline."
  },

  // =========================================================================
  // SERVICE 05: WEBSITE UX & CONVERSION OPTIMIZATION
  // =========================================================================
  {
    slug: "website-conversion-optimization",
    number: "05",
    title: "Website UX & Conversion Optimization",
    primaryKeyword: "website conversion optimization services",
    secondaryKeywords: [
      "website conversion optimization",
      "website conversion rate optimization",
      "website UX design",
      "website conversion improvement"
    ],
    problemAwareKeywords: [
      "why is my website getting visitors but not enough enquiries",
      "how to identify where website visitors drop off",
      "improving website conversion without full redesign"
    ],
    readyToActKeywords: [
      "hire website conversion optimization agency",
      "diagnose website conversion drop-off",
      "website UX and conversion audit"
    ],
    buyerSituation: "My website gets visitors, but it doesn't generate enough enquiries.",
    heroHeading: "Website UX & Conversion Rate Optimization Services.",
    heroSubheading: "We diagnose user drop-off bottlenecks, eliminate conversion friction, and rebuild message hierarchy—connecting your web traffic directly with your commercial pipeline to turn visitors into booked calls.",
    metaTitle: "Website Conversion Optimization & UX Services",
    metaDescription: "Turn existing website traffic into qualified enquiries. Website conversion optimization services, UX drop-off diagnostics, message hierarchy overhaul, and lead form friction reduction.",
    shortDesc: "Diagnose user drop-off, eliminate conversion friction, and rebuild message hierarchy. Connects directly with your commercial pipeline to turn traffic into qualified calls.",
    problemHeading: "Why High Website Traffic Fails to Produce Business Enquiries",
    problemPoints: [
      "Vague value propositions that fail to explain what your business solves within the critical first 5 seconds.",
      "Confusing visual navigation and weak call-to-action placement that leaves visitors unsure of the next step.",
      "High-friction inquiry forms demanding unnecessary information, driving prospective buyers away.",
      "Mobile user experience bugs, slow script execution, or broken interactive elements on mobile devices."
    ],
    solutionHeading: "Conversion Optimization & UX Engineering Deliverables",
    solutionDeliverables: [
      { title: "Conversion Drop-Off & UX Diagnostic Audit", desc: "Thorough audit evaluating user journeys, visual hierarchy, mobile usability bottlenecks, and form drop-off points." },
      { title: "Value Proposition & Message UX Overhaul", desc: "Restructuring headlines, subtext, and content flow to communicate immediate value and eliminate buyer confusion." },
      { title: "Friction-Free Form & CTA Re-engineering", desc: "Redesigning contact points and qualification forms to maximize conversion rates without losing essential lead context." },
      { title: "Lead Handoff & Pipeline Integration Review", desc: "Ensuring form submissions trigger immediate automated follow-up workflows via secure API webhooks." }
    ],
    capabilitySignals: [
      "Conversion Drop-Off Diagnostics",
      "Value Proposition & Message UX",
      "Call-to-Action Placement Review",
      "Lead Handoff Pathway Optimization"
    ],
    faqs: [
      {
        question: "Why is my website getting visitors but not enough enquiries?",
        answer: "High traffic with low enquiries indicates a conversion architecture problem. We evaluate your value proposition clarity, mobile user experience, visual hierarchy, form friction, and call-to-action placement to turn existing traffic into booked discovery calls."
      },
      {
        question: "Do I need a complete website redesign to improve conversion rates?",
        answer: "Not necessarily. If your underlying web architecture is fast and secure, targeted conversion UX optimization—such as restructuring messaging, simplifying lead forms, and clarifying CTAs—can significantly increase enquiry volume without a total site rebuild."
      },
      {
        question: "How do you identify where website visitors are dropping off?",
        answer: "We analyze user journey patterns, form completion drop-offs, device-specific rendering issues, and message clarity gaps across your key commercial landing pages."
      },
      {
        question: "What is the difference between aesthetic web design and conversion UX design?",
        answer: "Aesthetic web design focuses solely on visual decorations, whereas conversion UX design engineers content hierarchy, cognitive ease, clear next steps, and low-friction forms to drive specific business outcomes."
      },
      {
        question: "Can conversion optimization improve lead quality as well as quantity?",
        answer: "Yes. By refining form qualification questions and establishing clear offer expectations, conversion UX ensures inbound enquiries come from well-fit prospective clients."
      },
      {
        question: "How do we get started with a conversion optimization engagement?",
        answer: "Book a 30-minute architecture call. We review your current website performance, analyze conversion drop-off points, and outline immediate UX improvements."
      }
    ],
    ctaHeading: "Struggling with website visitors who don't convert into calls?",
    ctaButtonText: "Diagnose Your Conversion Bottleneck",
    ctaSubtext: "Book a 30-minute discovery call to review your website conversion paths, user experience bottlenecks, and lead pipeline goals."
  },

  // =========================================================================
  // SERVICE 06: SEO-READY WEBSITE ENGINEERING
  // =========================================================================
  {
    slug: "seo-ready-website-engineering",
    number: "06",
    title: "SEO-Ready Website Engineering",
    primaryKeyword: "SEO-ready website design",
    secondaryKeywords: [
      "website design SEO",
      "SEO website design",
      "SEO-friendly website design",
      "technical SEO website architecture",
      "search-ready website engineering"
    ],
    problemAwareKeywords: [
      "how to build a website that ranks on Google from day one",
      "integrating technical SEO into custom React Next.js code",
      "avoiding post-launch technical SEO fixes"
    ],
    readyToActKeywords: [
      "plan SEO-ready website build",
      "engineer search-ready business website",
      "hire SEO web engineering agency"
    ],
    buyerSituation: "I need a website that doesn't sacrifice search visibility.",
    heroHeading: "SEO-Ready Website Engineering & Codebase Architecture.",
    heroSubheading: "We build search visibility directly into the codebase from line one—injecting automated JSON-LD schemas, clean HTML5 hierarchy, 100% Core Web Vitals speed, and machine-readable AI search (GEO) compatibility.",
    metaTitle: "SEO-Ready Website Engineering Services",
    metaDescription: "Search visibility built into code, not bolted on later. SEO-ready website engineering with automated JSON-LD schemas, Core Web Vitals speed, and clean HTML5 hierarchy.",
    shortDesc: "Technical search architecture engineered into the codebase from line one. Automated JSON-LD schemas, clean HTML5 hierarchy, and machine-readable AI search (GEO) compatibility.",
    problemHeading: "Why Traditional Web Development Breaks Search Visibility",
    problemPoints: [
      "Building websites visually without planning semantic HTML5 heading structures, leading to search crawler confusion.",
      "Relying on fragile, heavy WordPress plugins for basic SEO meta tags and sitemaps that degrade page load speed.",
      "Failing to implement machine-readable JSON-LD structured data schemas for Organization, Services, and FAQs.",
      "Treating search optimization as a post-launch add-on, requiring expensive structural code rewrites later."
    ],
    solutionHeading: "SEO-Ready Web Engineering Deliverables",
    solutionDeliverables: [
      { title: "Built-In Technical SEO & Heading Hierarchy", desc: "Semantic HTML5 architecture, accessible landmark roles, and structured DOM trees optimized for search crawlers." },
      { title: "Automated JSON-LD Structured Data Schemas", desc: "Machine-readable schemas for Organization, ProfessionalService, WebSite, and FAQPage generated automatically." },
      { title: "100% Core Web Vitals Speed Architecture", desc: "Engineered on Next.js for instant page loads, fast LCP, and zero cumulative layout shift (CLS)." },
      { title: "Machine-Readable AI Search (GEO & LLM) Context", desc: "Optimized for modern AI discovery engines with structured sitemaps, clean meta tags, and llms.txt context." }
    ],
    capabilitySignals: [
      "Built-in Technical SEO Hierarchy",
      "Automated JSON-LD Structured Data",
      "Semantic HTML5 Clean Markup",
      "AI Search (GEO & LLM) Plumbing"
    ],
    faqs: [
      {
        question: "How does SEO-ready web engineering differ from ongoing Technical SEO consulting?",
        answer: "Technical SEO consulting focuses on auditing, diagnosing, and optimizing existing websites. SEO-Ready Web Engineering builds search indexability, canonical integrity, automated JSON-LD schemas, and Core Web Vitals speed directly into a new or rebuilt web application during development."
      },
      {
        question: "How does codebase-level technical SEO compare to relying on CMS plugins?",
        answer: "SEO plugins add unnecessary script weight, slow down server response times, and frequently introduce security vulnerabilities. Engineering search plumbing natively into Next.js delivers faster load speeds and error-free structured data."
      },
      {
        question: "How does an SEO-ready website support AI search engines (GEO, AEO, ChatGPT)?",
        answer: "We structure page content with clear direct-answer formatting, semantic HTML5 markup, automated JSON-LD schemas, and machine-readable llms.txt files, allowing AI discovery engines to cite your business accurately."
      },
      {
        question: "Will our new SEO-ready website rank on Google immediately after launch?",
        answer: "An SEO-ready website ensures Google search crawlers can index every page efficiently without technical errors from day one. Organic ranking speed depends on domain authority, keyword competition, and content depth."
      },
      {
        question: "Is mobile page speed included in SEO-ready website engineering?",
        answer: "Yes. Core Web Vitals metrics (LCP, CLS, INP) are primary search ranking factors. We target 100% performance benchmarks on all mobile and desktop devices."
      },
      {
        question: "How do we get started with an SEO-ready web engineering project?",
        answer: "Book a 30-minute architecture call. We evaluate your target search keywords, audit technical requirements, and map out an SEO-ready web engineering plan."
      }
    ],
    ctaHeading: "Building a new website and want search visibility built-in from day one?",
    ctaButtonText: "Plan an SEO-Ready Website",
    ctaSubtext: "Book a 30-minute discovery call to discuss your search target markets, technical SEO requirements, and web engineering plan."
  }
];
