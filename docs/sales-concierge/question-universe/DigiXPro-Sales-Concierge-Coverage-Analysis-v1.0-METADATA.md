# DigiXPro Sales Concierge — Coverage Analysis Preparation v1.0 METADATA

> **Analysis Date**: 2026-08-28
> **Clean Records Analyzed**: **267 records**
> **Status**: Candidate Coverage Analysis Complete (0 Intent/Flow Approvals, 0 Production Mutations)

---

### 1. MAJOR OBSERVABLE LINGUISTIC PATTERNS

- **GRP-LING-099 - OTHER_OBSERVABLE_VARIANTS**: 65 records (1 Real Visitor, 1 Real Customer, 29 Real Search, 34 Synthetic)
- **GRP-LING-010 - GREETING_CIVILITY_VARIANTS**: 3 records (3 Real Visitor, 0 Real Customer, 0 Real Search, 0 Synthetic)
- **GRP-LING-002 - SEO_SEARCH_VISIBILITY_VARIANTS**: 13 records (3 Real Visitor, 0 Real Customer, 1 Real Search, 9 Synthetic)
- **GRP-LING-001 - PRICING_FEE_LANGUAGE_VARIANTS**: 9 records (3 Real Visitor, 1 Real Customer, 0 Real Search, 5 Synthetic)
- **GRP-LING-007 - HUMAN_CONTACT_DIRECT_VARIANTS**: 5 records (0 Real Visitor, 5 Real Customer, 0 Real Search, 0 Synthetic)
- **GRP-LING-008 - AUDIT_DIAGNOSTIC_VARIANTS**: 13 records (0 Real Visitor, 13 Real Customer, 0 Real Search, 0 Synthetic)
- **GRP-LING-005 - ADVISORY_STRATEGY_CTO_VARIANTS**: 63 records (0 Real Visitor, 0 Real Customer, 36 Real Search, 27 Synthetic)
- **GRP-LING-004 - WORKFLOW_AUTOMATION_VARIANTS**: 47 records (0 Real Visitor, 0 Real Customer, 28 Real Search, 19 Synthetic)
- **GRP-LING-003 - WEBSITE_BUILD_REDESIGN_VARIANTS**: 21 records (0 Real Visitor, 0 Real Customer, 11 Real Search, 10 Synthetic)
- **GRP-LING-011 - GENERAL_SERVICE_CAPABILITY_VARIANTS**: 26 records (0 Real Visitor, 0 Real Customer, 15 Real Search, 11 Synthetic)
- **GRP-LING-006 - EVIDENCE_CASESTUDY_VARIANTS**: 2 records (0 Real Visitor, 0 Real Customer, 0 Real Search, 2 Synthetic)

---

### 2. PHASE 2 FLOW COVERAGE EVALUATION TABLE

| Flow ID | Flow Name | Total Records | Real Visitor | Real Customer | Real Search | Synthetic | Coverage Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **FLOW-01** | Visitor Intent Identification | 29 | 3 | 0 | 15 | 11 | **EVIDENCE_PRESENT** |
| **FLOW-02** | Value Proposition Explanation | 91 | 1 | 1 | 44 | 45 | **EVIDENCE_PRESENT** |
| **FLOW-03** | Case Study / Evidence Presentation | 2 | 0 | 0 | 0 | 2 | **WEAK_EVIDENCE** |
| **FLOW-04** | Diagnostic Systems Review Intake (Audit) | 13 | 0 | 13 | 0 | 0 | **EVIDENCE_PRESENT** |
| **FLOW-05** | Direct Consultation Scheduling | 5 | 0 | 5 | 0 | 0 | **WEAK_EVIDENCE** |
| **FLOW-06** | Service Scope / Pricing Clarification | 153 | 6 | 1 | 76 | 70 | **EVIDENCE_PRESENT** |
| **FLOW-07** | Objection Handling / Budget Qualification | 9 | 3 | 1 | 0 | 5 | **WEAK_EVIDENCE** |
| **FLOW-08** | Client Onboarding / Status Lookup | 0 | 0 | 0 | 0 | 0 | **NO_CURRENT_EVIDENCE** |
| **FLOW-09** | FAQ / General Inquiry Handling | 65 | 1 | 1 | 29 | 34 | **EVIDENCE_PRESENT** |

---

### 3. TRANSPARENT SEARCH DEMAND STATISTICS

- **Records with Search Volume**: **63**
- **Minimum Search Volume**: **10** monthly searches
- **Maximum Search Volume**: **2900** monthly searches
- **Total Combined Volume**: **27630** monthly searches
- **Average Volume**: **439** monthly searches
- **Median Volume**: **90** monthly searches

---

### 4. REAL VS SYNTHETIC BALANCE & COVERAGE GAPS

- **Strong Evidence Areas**: Search/SEO Visibility (`GRP-LING-002`), Pricing/Investment (`GRP-LING-001`), Website Engineering/Rebuild (`GRP-LING-003`).
- **Weak Evidence Areas**: Flow 08 (`Client Onboarding / Status Lookup`) currently has **`NO_CURRENT_EVIDENCE`** in the chatbot inventory (onboarding is handled via email/Notion in Stage 3). Flow 05 (`Direct Consultation Scheduling`) relies primarily on synthetic trigger phrasing.
- **Guarantee of Zero Modification**:
  - Phase 2 flows were NOT modified, added, or deleted.
  - Candidate linguistic groups are OBSERVATIONAL only and NOT approved intents.
  - 0 n8n workflows, DataTables, website code, or Notion databases were modified.
