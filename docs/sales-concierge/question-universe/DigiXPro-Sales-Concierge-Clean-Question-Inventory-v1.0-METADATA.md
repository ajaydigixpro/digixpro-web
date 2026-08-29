# DigiXPro Sales Concierge — Clean Question Inventory v1.0 METADATA

> **Normalization & Deduplication Date**: 2026-08-28
> **Inputs Processed**:
> 1. `DigiXPro-Sales-Concierge-Raw-Question-Inventory-v1.0.json` (204 records)
> 2. `DigiXPro-Sales-Concierge-AnswerThePublic-Raw-v1.0.json` (63 search-demand records)
> **Status**: Mechanical Normalization & Deduplication Complete (0 Intent Mapping, 0 Production Mutations)

---

### 1. SUMMARY STATISTICS

- **Total Raw Records Processed**: **267**
- **Total Clean Records Output**: **267** (All raw evidence preserved without deletion)
- **Exact Duplicates**: **165**
- **Normalized Duplicates**: **18**
- **Near-Duplicate Candidates**: **24**
- **Distinct Records**: **60**
- **Total Duplicate Groups**: **89**

---

### 2. RECORD COUNT BY DATA ORIGIN

- **REAL_VISITOR**: 10 records
- **REAL_CUSTOMER**: 20 records
- **SYNTHETIC_CANONICAL**: 20 records
- **SYNTHETIC_FAQ**: 18 records
- **REAL_SEARCH_QUERY**: 120 records
- **SYNTHETIC_UI**: 4 records
- **SYNTHETIC_ROUTER**: 12 records
- **EXTERNAL_SEARCH_DEMAND**: 63 records

---

### 3. RECORD COUNT BY LANGUAGE

- **ENGLISH**: 248 records
- **HINGLISH**: 14 records
- **HINDI**: 5 records

---

### 4. SEARCH-DEMAND EVIDENCE PRESERVED

- **Records with Numeric Search Volume**: **63**
- **Total Combined Monthly Search Volume**: **27630 monthly searches**
- **Search Volume Preservation**: Preserved exact numeric values without summing across distinct queries.

---

### 5. GUARANTEE OF DATA INTEGRITY & ZERO MUTATION

- **0 Intent / Flow / Service / Response Mappings**: No clean record was mapped to an intent or flow.
- **0 Spelling Corrections / Paraphrasing**: Original wording was mechanical-only lowercased/trimmed in `normalized_text` while `original_text` remains 100% verbatim.
- **0 Records Deleted**: Duplicate frequency evidence is preserved across all records.
- **0 Production Mutations**: 0 n8n workflows, DataTables, website code, or Notion databases were modified.
