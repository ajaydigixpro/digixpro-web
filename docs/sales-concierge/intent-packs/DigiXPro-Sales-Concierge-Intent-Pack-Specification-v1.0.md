# DigiXPro Sales Concierge — Intent Pack Specification v1.0

> **Specification Date**: 2026-08-28
> **Runtime Constraint**: **100% Zero-LLM Deterministic / Tier-0 Router Compatible**
> **Approved Family Baseline**: **Approved Question Family Registry v1.0 (12 Families, 2,137 Records)**
> **Status**: **INTENT PACK SPECIFICATION READY**

---

### 1. SPECIFICATION OVERVIEW

The Intent Pack Specification acts as the authoritative bridge connecting:

- **Master Question Universe (2,137 Records)**
- **Approved Question Family Registry v1.0 (12 Families)**
- **Candidate Intent Specifications (14 Intents)**
- **Conversational States & Service Entities**
- **Phase 2 Locked Conversational Flows**

---

### 2. CANDIDATE INTENT SPECIFICATIONS (14 INTENTS)


#### INTENT-01-SEO: SEO & Search Visibility Inquiry
- **Parent Question Family**: `FAM-01`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Conversational State**: `SERVICE_IDENTIFIED`
- **Entity Requirements**: Canonical Services: technical_seo, local_seo, geo_ai_search
- **Business Purpose**: Clarify technical SEO, GEO (AI search), indexing, local map pack visibility, and organic search acceleration scope.
- **Trigger Conditions**: Presence of explicit search/SEO keywords ('seo', 'google visibility', 'local seo', 'geo', 'search ranking'). Takes precedence over generic website container wording.
- **Positive Signals**: `seo, technical seo, local seo, google visibility, ai search, geo, aio, indexing, schema, organic traffic`
- **Negative Signals**: `redesign, rebuild, website banani, website audit, pricing kitni hai`
- **Disambiguation Signals**: If 'seo' is present, prioritize INTENT-01-SEO over INTENT-02-WEB.
- **Expected Action**: Provide managed monthly technical SEO capability brief & link to /search-automation.
- **Exit Conditions**: Visitor requests audit intake or discovery consultation.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 135 Master Records (128 Real Observed, 7 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-02-WEB: Website Design & Rebuild Inquiry
- **Parent Question Family**: `FAM-02`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Conversational State**: `SERVICE_IDENTIFIED`
- **Entity Requirements**: Canonical Services: custom_web_dev, website_redesign, landing_page_design
- **Business Purpose**: Clarify custom Next.js SSR web engineering, website redesign, speed optimization, and mobile responsiveness scope.
- **Trigger Conditions**: Presence of website redesign/rebuild wording ('redesign', 'rebuild', 'new website', 'website banani', 'wordpress website').
- **Positive Signals**: `redesign, rebuild, new website, custom website, website banani, website banwani, wordpress website`
- **Negative Signals**: `seo, technical seo, automation, n8n, audit, fee kitni hai`
- **Disambiguation Signals**: Matches when website rebuild is specified without explicit SEO keywords.
- **Expected Action**: Provide custom web engineering brief & link to /design-services.
- **Exit Conditions**: Visitor requests instant audit or discovery meeting.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 297 Master Records (287 Real Observed, 10 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-03-AUTO: Workflow & AI Automation Inquiry
- **Parent Question Family**: `FAM-03`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Conversational State**: `SERVICE_IDENTIFIED`
- **Entity Requirements**: Canonical Services: workflow_automation, lead_capture_crm, business_process_arch
- **Business Purpose**: Clarify n8n workflow automation, Zoho CRM sales pipelines, lead capture automation, and API integration scope.
- **Trigger Conditions**: Presence of workflow/automation wording ('automation', 'n8n', 'crm', 'workflow', 'api integration', 'lead automation').
- **Positive Signals**: `automation, n8n, crm, workflow, api integration, lead automation, process automation, webhook`
- **Negative Signals**: `seo, website redesign, audit, fee kitni hai`
- **Disambiguation Signals**: Matches explicit business process and messaging automation queries.
- **Expected Action**: Provide workflow automation capability brief & link to /search-automation.
- **Exit Conditions**: Visitor requests diagnostic audit or direct consultation.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 507 Master Records (504 Real Observed, 3 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-04-CTO: Technology Advisory & Fractional CTO
- **Parent Question Family**: `FAM-04`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Conversational State**: `SERVICE_IDENTIFIED`
- **Entity Requirements**: Canonical Services: it_consulting, vendor_eval, digital_trans, technology_roadmaps
- **Business Purpose**: Clarify strategic technology advisory, fractional CTO leadership, enterprise architecture, and vendor evaluation scope.
- **Trigger Conditions**: Presence of advisory/leadership wording ('advisory', 'fractional cto', 'tech stack', 'vendor evaluation', 'roadmap').
- **Positive Signals**: `advisory, fractional cto, tech stack, due diligence, consulting, roadmap, vendor evaluation`
- **Negative Signals**: `seo, website redesign, n8n, audit`
- **Disambiguation Signals**: Matches CTO-level strategic consulting inquiries.
- **Expected Action**: Provide strategic advisory brief & link to /advisory.
- **Exit Conditions**: Visitor requests discovery call with leadership.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 503 Master Records (500 Real Observed, 3 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-05-PRICE: Pricing, Investment & Retainer Inquiry
- **Parent Question Family**: `FAM-05`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Conversational State**: `PRICING_DISCUSSION`
- **Entity Requirements**: Cross-Domain Commercial Pricing
- **Business Purpose**: Explain DigiXPro diagnostic-driven investment structure without quoting static template prices.
- **Trigger Conditions**: Direct standalone asks for fee, cost, rates, retainer price, or pricing package.
- **Positive Signals**: `aapki fee kitni hai, pricing kitni hai, how much cost, retainer per month, rates`
- **Negative Signals**: `freelancer, cheaper, sasta, budget kam hai`
- **Disambiguation Signals**: Matches standalone price inquiries without budget objections.
- **Expected Action**: Explain tailored effort estimation via diagnostic audit & link to /audit.
- **Exit Conditions**: Visitor runs instant audit or schedules discovery call.
- **High-Risk Flag**: **YES**
- **Evidence Base**: 7 Master Records (3 Real Observed, 4 Discovery Synthetic)
- **Coverage Status**: **`ADEQUATE`**


#### INTENT-06-AUDIT-INTAKE: Diagnostic Systems Review Intake (Audit)
- **Parent Question Family**: `FAM-06`
- **Locked Phase 2 Flow**: `FLOW-04: Diagnostic Systems Review Intake (Audit)`
- **Conversational State**: `AUDIT_INTENT`
- **Entity Requirements**: Canonical Services: systems_audit_review
- **Business Purpose**: Initiate structured diagnostic audit intake for prospective client website or tech stack.
- **Trigger Conditions**: Actionable request to run, book, or submit a website for a diagnostic review ('audit karwana hai', 'check site').
- **Positive Signals**: `audit karwana hai, check my site, website speed audit, technical audit, systems review`
- **Negative Signals**: `audit kya hota hai, pricing kitni hai, hi`
- **Disambiguation Signals**: Actionable audit request (FLOW-04) as opposed to informational audit FAQ (FLOW-02).
- **Expected Action**: Direct visitor to instant diagnostic audit tool at /audit.
- **Exit Conditions**: Audit completion or scheduling of post-audit review call.
- **High-Risk Flag**: **YES**
- **Evidence Base**: 19 Master Records (19 Real Observed, 0 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-06-AUDIT-INFO: Informational Audit FAQ
- **Parent Question Family**: `FAM-06`
- **Locked Phase 2 Flow**: `FLOW-02: Value Proposition Explanation`
- **Conversational State**: `DISCOVERY`
- **Entity Requirements**: Canonical Services: systems_audit_review
- **Business Purpose**: Explain what a DigiXPro Diagnostic Systems Review includes before intake.
- **Trigger Conditions**: Informational questions asking what an audit is ('audit kya hota hai?', 'what is included in audit').
- **Positive Signals**: `audit kya hota hai, what is included in audit, why run an audit`
- **Negative Signals**: `run audit now, check my site`
- **Disambiguation Signals**: Informational question routed to FLOW-02 per DEC-004.
- **Expected Action**: Explain audit parameters (PageSpeed, schema, crawlability, security) & offer /audit tool.
- **Exit Conditions**: Visitor initiates audit intake.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 1 Master Records (0 Real Observed, 1 Discovery Synthetic)
- **Coverage Status**: **`ADEQUATE`**


#### INTENT-07-EVIDENCE: Case Studies & Production Evidence Request
- **Parent Question Family**: `FAM-07`
- **Locked Phase 2 Flow**: `FLOW-03: Case Study / Evidence Presentation`
- **Conversational State**: `DISCOVERY`
- **Entity Requirements**: Cross-Domain Verified Evidence
- **Business Purpose**: Present verified production evidence, portfolio case studies, and engineering outcomes.
- **Trigger Conditions**: Requests for proof, examples, portfolio, or case studies ('show work', 'case study', 'examples').
- **Positive Signals**: `work, portfolio, evidence, case study, design work, examples, sample, projects, proof`
- **Negative Signals**: `pricing, fee, audit karwana hai`
- **Disambiguation Signals**: Matches requests for proof of engineering outcomes.
- **Expected Action**: Present relevant verified case study link (e.g. Dr. Aggarwal Physio) & link to /advisory.
- **Exit Conditions**: Visitor requests diagnostic audit or discovery call.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 2 Master Records (0 Real Observed, 2 Discovery Synthetic)
- **Coverage Status**: **`ADEQUATE`**


#### INTENT-08-BOOKING: Direct Consultation Scheduling
- **Parent Question Family**: `FAM-08`
- **Locked Phase 2 Flow**: `FLOW-05: Direct Consultation Scheduling`
- **Conversational State**: `CONSULTATION_REQUEST`
- **Entity Requirements**: Leadership Consultation
- **Business Purpose**: Schedule a direct 30-minute discovery consultation with DigiXPro leadership.
- **Trigger Conditions**: Explicit requests to book a call or meeting ('book call', 'schedule meeting', '30 min call').
- **Positive Signals**: `book call, schedule call, 30 min consultation, meeting, book time with founder`
- **Negative Signals**: `kisi se baat karni hai, live chat agent`
- **Disambiguation Signals**: Scheduled discovery consultation booking per DEC-005.
- **Expected Action**: Provide consultation calendar booking link (/audit or contact form) & leadership contact email.
- **Exit Conditions**: Meeting scheduled or email lead captured.
- **High-Risk Flag**: **YES**
- **Evidence Base**: 5 Master Records (5 Real Observed, 0 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-08-HANDOFF: Live Human Agent Handoff
- **Parent Question Family**: `FAM-08`
- **Locked Phase 2 Flow**: `FLOW-05: Direct Consultation Scheduling`
- **Conversational State**: `HUMAN_HANDOFF`
- **Entity Requirements**: Human Agent Handoff
- **Business Purpose**: Handle immediate requests to speak to a human or founder via direct email/contact.
- **Trigger Conditions**: Requests for immediate human interaction ('speak to someone', 'human agent', 'talk to human').
- **Positive Signals**: `speak to someone, talk to human, human agent, contact person, founder contact`
- **Negative Signals**: `book call, schedule call`
- **Disambiguation Signals**: Immediate human handoff request per DEC-005.
- **Expected Action**: Provide direct leadership contact details (hello@digixpro.in) & trigger lead capture form.
- **Exit Conditions**: Lead details recorded in customer_context.
- **High-Risk Flag**: **YES**
- **Evidence Base**: 1 Master Records (1 Real Observed, 0 Discovery Synthetic)
- **Coverage Status**: **`ADEQUATE`**


#### INTENT-09-OBJECTION: Budget & Freelancer Objection Handling
- **Parent Question Family**: `FAM-09`
- **Locked Phase 2 Flow**: `FLOW-07: Objection Handling / Budget Qualification`
- **Conversational State**: `OBJECTION`
- **Entity Requirements**: Commercial Qualification
- **Business Purpose**: Qualify commercial budget & explain engineering value vs cheap template/freelancer approaches.
- **Trigger Conditions**: Price objections, asking for cheaper options, or freelancer comparisons ('freelancer', 'sasta', 'too expensive').
- **Positive Signals**: `freelancer, cheaper, sasta, too expensive, agency rates, can someone cheaper do this`
- **Negative Signals**: `fee kitni hai, pricing per month`
- **Disambiguation Signals**: Budget objection qualification (FLOW-07) per DEC-006.
- **Expected Action**: Explain sub-second PageSpeed, schema integrity, and long-term TCO vs template rebuilds.
- **Exit Conditions**: Visitor shifts to diagnostic audit or pricing discussion.
- **High-Risk Flag**: **YES**
- **Evidence Base**: 9 Master Records (4 Real Observed, 5 Discovery Synthetic)
- **Coverage Status**: **`ADEQUATE`**


#### INTENT-10-GREETING: Greeting & System Welcome
- **Parent Question Family**: `FAM-10`
- **Locked Phase 2 Flow**: `FLOW-01: Visitor Intent Identification`
- **Conversational State**: `NEW_VISITOR`
- **Entity Requirements**: System Greeting
- **Business Purpose**: Acknowledge initial greeting and guide visitor to DigiXPro capabilities.
- **Trigger Conditions**: Initial greeting phrase ('hi', 'hello', 'hey', 'namaste').
- **Positive Signals**: `hi, hello, hey, namaste, good morning, good evening`
- **Negative Signals**: `seo, website, pricing, audit`
- **Disambiguation Signals**: Standalone greeting phrases without business intent.
- **Expected Action**: Deliver concise greeting brief & introduce 4 core service streams.
- **Exit Conditions**: Visitor specifies intent.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 3 Master Records (3 Real Observed, 0 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


#### INTENT-11-MULTI: Ambiguous & Multi-Intent Signal Clarification
- **Parent Question Family**: `FAM-11`
- **Locked Phase 2 Flow**: `FLOW-01: Visitor Intent Identification`
- **Conversational State**: `DISCOVERY`
- **Entity Requirements**: Intent Clarification
- **Business Purpose**: Clarify visitor intent when prompt contains multiple service terms or conflicting requests.
- **Trigger Conditions**: Prompts combining 2+ distinct service streams (e.g. 'SEO + Web + Pricing').
- **Positive Signals**: `seo AND website AND pricing, audit AND retainer`
- **Negative Signals**: `single intent queries`
- **Disambiguation Signals**: Multiple-Service Signal architecture per DEC-003.
- **Expected Action**: Offer non-assuming clarification choices to identify primary priority.
- **Exit Conditions**: Visitor selects single primary intent.
- **High-Risk Flag**: **YES**
- **Evidence Base**: 1 Master Records (1 Real Observed, 0 Discovery Synthetic)
- **Coverage Status**: **`ADEQUATE`**


#### INTENT-12-VALUEPROP: General Value Proposition & Service Discovery
- **Parent Question Family**: `FAM-12`
- **Locked Phase 2 Flow**: `FLOW-02: Value Proposition Explanation`
- **Conversational State**: `DISCOVERY`
- **Entity Requirements**: Agency Value Proposition
- **Business Purpose**: Explain overall DigiXPro positioning & guide general searchers to relevant service streams.
- **Trigger Conditions**: General search terms asking about agency capabilities ('services', 'what do you do', 'it consulting').
- **Positive Signals**: `services, what services, what do you do, it consulting services, business automation agency`
- **Negative Signals**: `specific pricing asks, audit intake, direct booking`
- **Disambiguation Signals**: General service discovery per DEC-001.
- **Expected Action**: Explain 4 primary service streams & link to /how-we-work.
- **Exit Conditions**: Visitor selects specific service stream.
- **High-Risk Flag**: **NO**
- **Evidence Base**: 662 Master Records (638 Real Observed, 24 Discovery Synthetic)
- **Coverage Status**: **`STRONG`**


---

### 3. CONFIDENCE MODEL & BOUNDARY GUIDELINES

1. **Deterministic Positive Signal Matching**: Signals are evaluated in strict priority order. Explicit service capability intents (`INTENT-01-SEO`, `INTENT-03-AUTO`, `INTENT-04-CTO`) take precedence over generic website wording (`INTENT-02-WEB`).
2. **Negative Signal Filtering**: If negative signals (e.g. pricing asks or audit requests) are present in a query, routing bypasses basic service discovery and transitions directly to pricing clarification (`INTENT-05-PRICE`) or audit intake (`INTENT-06-AUDIT-INTAKE`).
3. **Multi-Intent Handling**: When multiple distinct capability keywords are detected simultaneously (e.g. SEO + Web + Pricing), the engine transitions to `INTENT-11-MULTI` to offer non-assuming clarification choices without guessing.

---

### 4. PRODUCTION SAFETY CONFIRMATION

- **0 n8n workflows modified**
- **0 DataTables modified**
- **0 website code modified**
- **0 Notion databases modified**
- **0 live chatbot behaviour modified**
- **0 LLM calls made**
- **0 synthetic questions generated**
- **0 embeddings generated**
- **0 Semantic Router rules created**
- **0 response policies created**

---

# **FINAL STATUS: PHASE 4.0 COMPLETE — INTENT PACK SPECIFICATION READY**
