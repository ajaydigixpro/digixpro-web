export interface KnowledgeArticle {
  id: string;
  pillar: string;
  title: string;
  summary: string;
  date: string;
  content: string;
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "whatsapp-is-not-an-os",
    pillar: "Operations & Automation",
    title: "Why WhatsApp isn't a scalable operating system.",
    summary: "Exploring the hidden cost of running core business operations on fragmented messaging apps instead of centralized workflows.",
    date: "Architecture Decision",
    content: "Running core business operations on WhatsApp groups feels fast in the beginning, but as team size and client volume grow, it becomes a major operational bottleneck...\n\nWhen data, approvals, and customer histories are scattered across private chats and unindexed threads, accountability dies. Critical decisions get buried, and founders are forced to manually intervene in every operational loop.\n\nAn operating system requires structured data capture, role-based visibility, and automated workflow triggers. WhatsApp provides none of these. Before scaling operations, businesses must transition from conversational chaos to structured software pipelines."
  },
  {
    id: "decoupled-inventory-scaling",
    pillar: "Lessons from Production",
    title: "Why decoupled inventory scales better than spreadsheet inventory.",
    summary: "A breakdown of the marketplace architecture used in 'Buy Second Hand Books' to isolate OMS from stock management.",
    date: "Production Evidence",
    content: "In multi-vendor marketplaces, coupling inventory directly with the order management system (OMS) creates catastrophic race conditions during high-traffic events...\n\nDuring the architecture design for 'Buy Second Hand Books', we enforced a strict decoupling pattern. The inventory engine operates as an independent bounded context, while the order processing layer communicates through asynchronous events.\n\nThis ensures that stock inconsistencies, concurrent checkouts, and vendor updates never lock down the core transactional pipeline, enabling seamless horizontal scalability without data corruption."
  },
  {
    id: "tenant-isolation-before-ai",
    pillar: "Artificial Intelligence",
    title: "Why tenant isolation should be designed before AI integration.",
    summary: "Lessons from SattvaOS: The architectural prerequisites for building governed, secure, multi-tenant AI systems.",
    date: "Production Evidence",
    content: "Integrating Large Language Models (LLMs) or retrieval-augmented generation (RAG) systems into a multi-tenant application introduces severe security and data privacy risks if tenant boundaries are porous...\n\nDuring our work on SattvaOS, a foundational rule was established: data governance and multi-tenant isolation must be hardcoded at the database and execution layer before any AI context injection is built.\n\nWithout strict schema-level or row-level security boundaries, AI prompt contexts can inadvertently leak cross-tenant information, violating institutional trust and data compliance mandates."
  },
  {
    id: "patient-data-operational-storage",
    pillar: "Lessons from Production",
    title: "Why patient data should never share operational storage.",
    summary: "Security and architectural principles derived from deploying healthcare knowledge systems and diagnostic networks.",
    date: "Production Evidence",
    content: "Healthcare platforms and diagnostic discovery networks (such as 'Scan Centre Near Me') handle sensitive Protected Health Information (PHI). A common architectural mistake is mixing transactional operational data with patient medical records in a single database instance...\n\nTo maintain absolute regulatory compliance and system resilience, we enforce strict data partitioning. Operational logs, user sessions, and scheduling workflows are decoupled entirely from encrypted diagnostic records.\n\nThis separation ensures that performance spikes in daily operations never compromise the security, encryption standards, or isolation required for medical data archives."
  },
  {
    id: "monolith-vs-modular",
    pillar: "Technology Architecture",
    title: "Monolith vs Modular: When to actually split your codebase.",
    summary: "Stop over-engineering. A pragmatic framework for deciding when a monolithic architecture is actually the right business decision.",
    date: "Architecture Decision",
    content: "The tech industry often pressures growing startups into premature microservices adoption, resulting in extreme operational overhead, complex debugging, and deployment friction...\n\nOur architecture advisory practice consistently recommends starting with a well-structured modular monolith.\n\nBy cleanly separating domain boundaries within a single deployable unit, businesses capture the architectural clarity of microservices without paying the heavy infrastructure and distributed-systems tax before achieving actual product-market scale."
  },
  {
    id: "crm-vs-erp",
    pillar: "Business Systems",
    title: "CRM vs ERP: What you actually need to fix your operations.",
    summary: "Before you buy another software license, understand the fundamental difference between tracking relationships and managing resources.",
    date: "Advisory Insight",
    content: "Founders frequently burn capital on complex Enterprise Resource Planning (ERP) tools when their actual operational bottleneck is merely disorganized lead handling—or vice versa...\n\nA Customer Relationship Management (CRM) system is optimized for tracking external relationships, pipelines, and communication touchpoints. An ERP is built for internal resource allocation, supply chain, accounting, and inventory control.\n\nDiagnosing the exact operational bottleneck before purchasing software licenses prevents costly software shelf-ware and ensures technology investments directly target business friction points."
  }
];