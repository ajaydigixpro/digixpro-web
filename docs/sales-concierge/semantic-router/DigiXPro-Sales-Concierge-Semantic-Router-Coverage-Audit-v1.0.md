# DigiXPro Sales Concierge — Semantic Router Coverage Audit v1.0

> **Audit Date**: 2026-08-28
> **Dataset Version**: **v1.0 (DATASET PREPARATION ONLY — NO ROUTER TESTED)**
> **Total Master Records**: **2,137 Records**
> **Final Status**: **PHASE 4.3 COMPLETE — SEMANTIC ROUTER BENCHMARK DATASET READY**

---

### 1. BENCHMARK DATASET METRICS SUMMARY

- **Total Master Universe Records**: **2,137 Records**
- **Total Benchmark Corpus Records**: **2,137 Records (100% Traceable)**
- **GOLD_INHERITED Records**: **1429 Records (67%)**
- **REVIEW_REQUIRED (Ambiguous) Records**: **708 Records (33%)**
- **Hard Negative Test Pairs**: **73 Records**
- **Low-Confidence Rejection Candidates**: **3 Records**
- **High-Risk Intent Records**: **28 Records**

---

### 2. INTENT BENCHMARK COVERAGE MATRIX (14 FROZEN INTENTS)

| Intent ID | Parent Family | Phase 2 Flow | Total Evidence | Real Observed | Discovery Synthetic | Hard Negatives | Ambiguous | Benchmark Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **INTENT-01-SEO** | `FAM-01` | `FLOW-06` | 135 | 128 | 7 | 58 | 58 | **`STRONG`** |
| **INTENT-02-WEB** | `FAM-02` | `FLOW-06` | 297 | 287 | 10 | 0 | 0 | **`STRONG`** |
| **INTENT-03-AUTO** | `FAM-03` | `FLOW-06` | 507 | 504 | 3 | 0 | 0 | **`STRONG`** |
| **INTENT-04-CTO** | `FAM-04` | `FLOW-06` | 503 | 500 | 3 | 0 | 0 | **`STRONG`** |
| **INTENT-05-PRICE** | `FAM-05` | `FLOW-06` | 7 | 3 | 4 | 0 | 0 | **`ADEQUATE`** |
| **INTENT-06-AUDIT-INTAKE** | `FAM-06` | `FLOW-04` | 19 | 19 | 0 | 13 | 0 | **`STRONG`** |
| **INTENT-06-AUDIT-INFO** | `FAM-06` | `FLOW-02` | 1 | 0 | 1 | 1 | 0 | **`ADEQUATE`** |
| **INTENT-07-EVIDENCE** | `FAM-07` | `FLOW-03` | 2 | 0 | 2 | 0 | 0 | **`ADEQUATE`** |
| **INTENT-08-BOOKING** | `FAM-08` | `FLOW-05` | 0 | 0 | 0 | 0 | 0 | **`STRONG`** |
| **INTENT-08-HANDOFF** | `FAM-08` | `FLOW-05` | 0 | 0 | 0 | 0 | 0 | **`ADEQUATE`** |
| **INTENT-09-OBJECTION** | `FAM-09` | `FLOW-07` | 0 | 0 | 0 | 0 | 0 | **`ADEQUATE`** |
| **INTENT-10-GREETING** | `FAM-10` | `FLOW-01` | 3 | 3 | 0 | 0 | 0 | **`STRONG`** |
| **INTENT-11-MULTI** | `FAM-11` | `FLOW-01` | 1 | 1 | 0 | 1 | 1 | **`ADEQUATE`** |
| **INTENT-12-VALUEPROP** | `FAM-12` | `FLOW-02` | 662 | 638 | 24 | 0 | 649 | **`STRONG`** |

---

### 3. CONFIRMATIONS & PRODUCTION SAFETY

- **0 Semantic Router Accuracy Claims Made** (No router has been benchmarked or deployed)
- **0 Synthetic Paraphrases Generated**
- **0 LLM Calls Made**
- **0 Production Systems Modified**

---

# **FINAL STATUS: PHASE 4.3 COMPLETE — SEMANTIC ROUTER BENCHMARK DATASET READY**
