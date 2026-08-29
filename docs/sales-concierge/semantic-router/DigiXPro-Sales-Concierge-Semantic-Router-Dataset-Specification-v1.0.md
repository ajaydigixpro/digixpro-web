# DigiXPro Sales Concierge — Semantic Router Dataset Specification v1.0

> **Specification Date**: 2026-08-28
> **Scope**: Benchmark Dataset Architecture for Local Semantic Router Testing
> **Total Benchmark Records**: **2,137 Records**
> **Final Status**: **PHASE 4.3 COMPLETE — SEMANTIC ROUTER BENCHMARK DATASET READY**

---

### 1. BENCHMARK DATASET ARCHITECTURE

The Semantic Router Benchmark Dataset v1.0 provides an empirical evaluation baseline for testing local deterministic/semantic intent routing:

1. **`CORE_GOLD` Partition (1429 records)**: Unambiguous queries where lineage from Master Question Universe record $ightarrow$ Approved Question Family $ightarrow$ Frozen Intent is 100% verified.
2. **`HARD_NEGATIVES` Partition (73 records)**: Query pairs that contain overlapping keyword triggers (e.g. SEO vs Website, Price vs Budget Objection, Audit Intake vs Audit FAQ) to benchmark router boundary precision.
3. **`AMBIGUOUS_MULTI_INTENT` Partition (708 records)**: Multi-topic or vague prompts to benchmark intent clarification trigger logic.
4. **`REJECTION_LOW_CONFIDENCE` Partition (3 records)**: Low-context greeting or generic inputs to benchmark non-assuming fallback behaviour.

---

### 2. PRODUCTION SAFETY CONFIRMATION

- **0 n8n workflows modified**
- **0 DataTables modified**
- **0 website code modified**
- **0 Notion databases modified**
- **0 live chatbot behaviour modified**
- **0 Phase 2 flows modified**
- **0 LLM calls made**
- **0 synthetic questions generated**
- **0 embeddings generated**
- **0 Semantic Router rules created**
- **0 response policies created**

---

# **FINAL STATUS: PHASE 4.3 COMPLETE — SEMANTIC ROUTER BENCHMARK DATASET READY**
