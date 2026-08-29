# DigiXPro Sales Concierge — Frozen Intent Pack Registry v1.0

> **Freeze Date**: 2026-08-28
> **Registry Version**: **v1.0 (FROZEN)**
> **Approved By**: Founder (Phase 4.1 Validation & Governance)
> **Master Records Mapped**: **2,137 Records (100% Traceable)**
> **Status**: **FROZEN — READ-ONLY SPECIFICATION**

---

### 1. AUTHORITATIVE FROZEN INTENT PACK REGISTRY (14 INTENTS)


#### INTENT-01-SEO: SEO & Search Visibility Inquiry
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-01`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Required Conversational State**: `SERVICE_IDENTIFIED`
- **Required Service Entities**: Canonical Services: technical_seo, local_seo, geo_ai_search
- **Business Purpose**: Clarify technical SEO, GEO (AI search), indexing, local map pack visibility, and organic search acceleration scope.
- **Positive Signals**: `seo, technical seo, local seo, google visibility, ai search, geo, aio, indexing, schema, organic traffic`
- **Negative Signals**: `redesign, rebuild, website banani, website audit, pricing kitni hai`
- **Disambiguation Signals**: If 'seo' is present, prioritize INTENT-01-SEO over INTENT-02-WEB.
- **Clarification Requirement**: YES (If visitor requests both website rebuild and SEO, initiate Multiple-Service Signal clarification.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Provide managed monthly technical SEO capability brief & link to /search-automation.
- **Exit Conditions**: Visitor requests audit intake or discovery consultation.
- **Evidence Base**: 135 Master Records (Traceable to `FAM-01`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: DEC-003 (Precedence & Multi-Service Signals)


#### INTENT-02-WEB: Website Design & Rebuild Inquiry
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-02`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Required Conversational State**: `SERVICE_IDENTIFIED`
- **Required Service Entities**: Canonical Services: custom_web_dev, website_redesign, landing_page_design
- **Business Purpose**: Clarify custom Next.js SSR web engineering, website redesign, speed optimization, and mobile responsiveness scope.
- **Positive Signals**: `redesign, rebuild, new website, custom website, website banani, website banwani, wordpress website`
- **Negative Signals**: `seo, technical seo, automation, n8n, audit, fee kitni hai`
- **Disambiguation Signals**: Matches when website rebuild is specified without explicit SEO keywords.
- **Clarification Requirement**: YES (If visitor asks about existing site without rebuild, offer managed monthly technical SEO.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Provide custom web engineering brief & link to /design-services.
- **Exit Conditions**: Visitor requests instant audit or discovery meeting.
- **Evidence Base**: 297 Master Records (Traceable to `FAM-02`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: Phase 3.8 Decision Matrix


#### INTENT-03-AUTO: Workflow & AI Automation Inquiry
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-03`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Required Conversational State**: `SERVICE_IDENTIFIED`
- **Required Service Entities**: Canonical Services: workflow_automation, lead_capture_crm, business_process_arch
- **Business Purpose**: Clarify n8n workflow automation, Zoho CRM sales pipelines, lead capture automation, and API integration scope.
- **Positive Signals**: `automation, n8n, crm, workflow, api integration, lead automation, process automation, webhook`
- **Negative Signals**: `seo, website redesign, audit, fee kitni hai`
- **Disambiguation Signals**: Matches explicit business process and messaging automation queries.
- **Clarification Requirement**: YES (None required for direct automation queries.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Provide workflow automation capability brief & link to /search-automation.
- **Exit Conditions**: Visitor requests diagnostic audit or direct consultation.
- **Evidence Base**: 507 Master Records (Traceable to `FAM-03`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: Phase 3.8 Decision Matrix


#### INTENT-04-CTO: Technology Advisory & Fractional CTO
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-04`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Required Conversational State**: `SERVICE_IDENTIFIED`
- **Required Service Entities**: Canonical Services: it_consulting, vendor_eval, digital_trans, technology_roadmaps
- **Business Purpose**: Clarify strategic technology advisory, fractional CTO leadership, enterprise architecture, and vendor evaluation scope.
- **Positive Signals**: `advisory, fractional cto, tech stack, due diligence, consulting, roadmap, vendor evaluation`
- **Negative Signals**: `seo, website redesign, n8n, audit`
- **Disambiguation Signals**: Matches CTO-level strategic consulting inquiries.
- **Clarification Requirement**: YES (None required for direct advisory inquiries.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Provide strategic advisory brief & link to /advisory.
- **Exit Conditions**: Visitor requests discovery call with leadership.
- **Evidence Base**: 503 Master Records (Traceable to `FAM-04`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: Phase 3.8 Decision Matrix


#### INTENT-05-PRICE: Pricing, Investment & Retainer Inquiry
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-05`
- **Locked Phase 2 Flow**: `FLOW-06: Service Scope / Pricing Clarification`
- **Required Conversational State**: `PRICING_DISCUSSION`
- **Required Service Entities**: Cross-Domain Commercial Pricing
- **Business Purpose**: Explain DigiXPro diagnostic-driven investment structure without quoting static template prices.
- **Positive Signals**: `aapki fee kitni hai, pricing kitni hai, how much cost, retainer per month, rates`
- **Negative Signals**: `freelancer, cheaper, sasta, budget kam hai`
- **Disambiguation Signals**: Matches standalone price inquiries without budget objections.
- **Clarification Requirement**: YES (Ask for website URL or primary business objective.)
- **High-Risk Status**: **YES**
- **Handoff Eligible**: **YES**
- **Expected Action**: Explain tailored effort estimation via diagnostic audit & link to /audit.
- **Exit Conditions**: Visitor runs instant audit or schedules discovery call.
- **Evidence Base**: 7 Master Records (Traceable to `FAM-05`)
- **Coverage Status**: **`ADEQUATE`**
- **Founder Approval Lineage**: DEC-002 (Pricing Strategy & Contextual Retainers)


#### INTENT-06-AUDIT-INTAKE: Diagnostic Systems Review Intake (Audit)
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-06`
- **Locked Phase 2 Flow**: `FLOW-04: Diagnostic Systems Review Intake (Audit)`
- **Required Conversational State**: `AUDIT_INTENT`
- **Required Service Entities**: Canonical Services: systems_audit_review
- **Business Purpose**: Initiate structured diagnostic audit intake for prospective client website or tech stack.
- **Positive Signals**: `audit karwana hai, check my site, website speed audit, technical audit, systems review`
- **Negative Signals**: `audit kya hota hai, pricing kitni hai, hi`
- **Disambiguation Signals**: Actionable audit request (FLOW-04) as opposed to informational audit FAQ (FLOW-02).
- **Clarification Requirement**: YES (Confirm URL and email for audit report delivery.)
- **High-Risk Status**: **YES**
- **Handoff Eligible**: **YES**
- **Expected Action**: Direct visitor to instant diagnostic audit tool at /audit.
- **Exit Conditions**: Audit completion or scheduling of post-audit review call.
- **Evidence Base**: 19 Master Records (Traceable to `FAM-06`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: DEC-004 (Actionable Audit Intake vs Informational FAQ)


#### INTENT-06-AUDIT-INFO: Informational Audit FAQ
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-06`
- **Locked Phase 2 Flow**: `FLOW-02: Value Proposition Explanation`
- **Required Conversational State**: `DISCOVERY`
- **Required Service Entities**: Canonical Services: systems_audit_review
- **Business Purpose**: Explain what a DigiXPro Diagnostic Systems Review includes before intake.
- **Positive Signals**: `audit kya hota hai, what is included in audit, why run an audit`
- **Negative Signals**: `run audit now, check my site`
- **Disambiguation Signals**: Informational question routed to FLOW-02 per DEC-004.
- **Clarification Requirement**: YES (None.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Explain audit parameters (PageSpeed, schema, crawlability, security) & offer /audit tool.
- **Exit Conditions**: Visitor initiates audit intake.
- **Evidence Base**: 1 Master Records (Traceable to `FAM-06`)
- **Coverage Status**: **`ADEQUATE`**
- **Founder Approval Lineage**: DEC-004 (Actionable Audit Intake vs Informational FAQ)


#### INTENT-07-EVIDENCE: Case Studies & Production Evidence Request
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-07`
- **Locked Phase 2 Flow**: `FLOW-03: Case Study / Evidence Presentation`
- **Required Conversational State**: `DISCOVERY`
- **Required Service Entities**: Cross-Domain Verified Evidence
- **Business Purpose**: Present verified production evidence, portfolio case studies, and engineering outcomes.
- **Positive Signals**: `work, portfolio, evidence, case study, design work, examples, sample, projects, proof`
- **Negative Signals**: `pricing, fee, audit karwana hai`
- **Disambiguation Signals**: Matches requests for proof of engineering outcomes.
- **Clarification Requirement**: YES (None.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Present relevant verified case study link (e.g. Dr. Aggarwal Physio) & link to /advisory.
- **Exit Conditions**: Visitor requests diagnostic audit or discovery call.
- **Evidence Base**: 2 Master Records (Traceable to `FAM-07`)
- **Coverage Status**: **`ADEQUATE`**
- **Founder Approval Lineage**: Phase 3.8 Decision Matrix


#### INTENT-08-BOOKING: Direct Consultation Scheduling
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-08`
- **Locked Phase 2 Flow**: `FLOW-05: Direct Consultation Scheduling`
- **Required Conversational State**: `CONSULTATION_REQUEST`
- **Required Service Entities**: Leadership Consultation
- **Business Purpose**: Schedule a direct 30-minute discovery consultation with DigiXPro leadership.
- **Positive Signals**: `book call, schedule call, 30 min consultation, meeting, book time with founder`
- **Negative Signals**: `kisi se baat karni hai, live chat agent`
- **Disambiguation Signals**: Scheduled discovery consultation booking per DEC-005.
- **Clarification Requirement**: YES (Confirm email and phone for calendar invite.)
- **High-Risk Status**: **YES**
- **Handoff Eligible**: **YES**
- **Expected Action**: Provide consultation calendar booking link (/audit or contact form) & leadership contact email.
- **Exit Conditions**: Meeting scheduled or email lead captured.
- **Evidence Base**: 5 Master Records (Traceable to `FAM-08`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: DEC-005 (Discovery Consultation Booking vs Live Handoff)


#### INTENT-08-HANDOFF: Live Human Agent Handoff
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-08`
- **Locked Phase 2 Flow**: `FLOW-05: Direct Consultation Scheduling`
- **Required Conversational State**: `HUMAN_HANDOFF`
- **Required Service Entities**: Human Agent Handoff
- **Business Purpose**: Handle immediate requests to speak to a human or founder via direct email/contact.
- **Positive Signals**: `speak to someone, talk to human, human agent, contact person, founder contact`
- **Negative Signals**: `book call, schedule call`
- **Disambiguation Signals**: Immediate human handoff request per DEC-005.
- **Clarification Requirement**: YES (Capture visitor email & message summary.)
- **High-Risk Status**: **YES**
- **Handoff Eligible**: **YES**
- **Expected Action**: Provide direct leadership contact details (hello@digixpro.in) & trigger lead capture form.
- **Exit Conditions**: Lead details recorded in customer_context.
- **Evidence Base**: 1 Master Records (Traceable to `FAM-08`)
- **Coverage Status**: **`ADEQUATE`**
- **Founder Approval Lineage**: DEC-005 (Discovery Consultation Booking vs Live Handoff)


#### INTENT-09-OBJECTION: Budget & Freelancer Objection Handling
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-09`
- **Locked Phase 2 Flow**: `FLOW-07: Objection Handling / Budget Qualification`
- **Required Conversational State**: `OBJECTION`
- **Required Service Entities**: Commercial Qualification
- **Business Purpose**: Qualify commercial budget & explain engineering value vs cheap template/freelancer approaches.
- **Positive Signals**: `freelancer, cheaper, sasta, too expensive, agency rates, can someone cheaper do this`
- **Negative Signals**: `fee kitni hai, pricing per month`
- **Disambiguation Signals**: Budget objection qualification (FLOW-07) per DEC-006.
- **Clarification Requirement**: YES (Explain ROI of production-grade engineering.)
- **High-Risk Status**: **YES**
- **Handoff Eligible**: **YES**
- **Expected Action**: Explain sub-second PageSpeed, schema integrity, and long-term TCO vs template rebuilds.
- **Exit Conditions**: Visitor shifts to diagnostic audit or pricing discussion.
- **Evidence Base**: 9 Master Records (Traceable to `FAM-09`)
- **Coverage Status**: **`ADEQUATE`**
- **Founder Approval Lineage**: DEC-006 (Commercial Pricing vs Budget Objections)


#### INTENT-10-GREETING: Greeting & System Welcome
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-10`
- **Locked Phase 2 Flow**: `FLOW-01: Visitor Intent Identification`
- **Required Conversational State**: `NEW_VISITOR`
- **Required Service Entities**: System Greeting
- **Business Purpose**: Acknowledge initial greeting and guide visitor to DigiXPro capabilities.
- **Positive Signals**: `hi, hello, hey, namaste, good morning, good evening`
- **Negative Signals**: `seo, website, pricing, audit`
- **Disambiguation Signals**: Standalone greeting phrases without business intent.
- **Clarification Requirement**: YES (Offer guided prompt chips.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Deliver concise greeting brief & introduce 4 core service streams.
- **Exit Conditions**: Visitor specifies intent.
- **Evidence Base**: 3 Master Records (Traceable to `FAM-10`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: Phase 3.8 Decision Matrix


#### INTENT-11-MULTI: Ambiguous & Multi-Intent Signal Clarification
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-11`
- **Locked Phase 2 Flow**: `FLOW-01: Visitor Intent Identification`
- **Required Conversational State**: `DISCOVERY`
- **Required Service Entities**: Intent Clarification
- **Business Purpose**: Clarify visitor intent when prompt contains multiple service terms or conflicting requests.
- **Positive Signals**: `seo AND website AND pricing, audit AND retainer`
- **Negative Signals**: `single intent queries`
- **Disambiguation Signals**: Multiple-Service Signal architecture per DEC-003.
- **Clarification Requirement**: YES (Present structured choices without guessing.)
- **High-Risk Status**: **YES**
- **Handoff Eligible**: **YES**
- **Expected Action**: Offer non-assuming clarification choices to identify primary priority.
- **Exit Conditions**: Visitor selects single primary intent.
- **Evidence Base**: 1 Master Records (Traceable to `FAM-11`)
- **Coverage Status**: **`ADEQUATE`**
- **Founder Approval Lineage**: DEC-003 (Precedence & Multi-Service Signals)


#### INTENT-12-VALUEPROP: General Value Proposition & Service Discovery
- **Registry Version**: `v1.0` (`FROZEN`)
- **Parent Question Family**: `FAM-12`
- **Locked Phase 2 Flow**: `FLOW-02: Value Proposition Explanation`
- **Required Conversational State**: `DISCOVERY`
- **Required Service Entities**: Agency Value Proposition
- **Business Purpose**: Explain overall DigiXPro positioning & guide general searchers to relevant service streams.
- **Positive Signals**: `services, what services, what do you do, it consulting services, business automation agency`
- **Negative Signals**: `specific pricing asks, audit intake, direct booking`
- **Disambiguation Signals**: General service discovery per DEC-001.
- **Clarification Requirement**: YES (Provide clear navigation paths.)
- **High-Risk Status**: **NO**
- **Handoff Eligible**: **NO**
- **Expected Action**: Explain 4 primary service streams & link to /how-we-work.
- **Exit Conditions**: Visitor selects specific service stream.
- **Evidence Base**: 662 Master Records (Traceable to `FAM-12`)
- **Coverage Status**: **`STRONG`**
- **Founder Approval Lineage**: DEC-001 (FAM-12 Value Proposition & Service Discovery)


---

### 2. HIGH-RISK TAXONOMY GOVERNANCE (VERSION 1.0)

The 6 high-risk intents in Registry v1.0 are:
1. `INTENT-05-PRICE` (Commercial investment/rates clarification)
2. `INTENT-06-AUDIT-INTAKE` (Actionable systems review intake)
3. `INTENT-08-BOOKING` (Leadership consultation scheduling)
4. `INTENT-08-HANDOFF` (Live human chat handoff)
5. `INTENT-09-OBJECTION` (Budget & freelancer objection qualification)
6. `INTENT-11-MULTI` (Ambiguous multi-service clarification)

---

### 3. PRODUCTION SAFETY CONFIRMATION

- **0 n8n workflows modified**
- **0 DataTables modified**
- **0 website code modified**
- **0 Notion databases modified**
- **0 live chatbot behaviour modified**
- **0 Phase 2 flows modified**
- **0 Master Question Universe records modified**
- **0 Approved Question Family Registry records modified**
- **0 LLM calls made**
- **0 synthetic questions generated**
- **0 embeddings generated**
- **0 Semantic Router rules created**
- **0 response policies created**

---

# **FINAL STATUS: PHASE 4.2 COMPLETE — INTENT PACK REGISTRY FROZEN v1.0**
