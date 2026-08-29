# DigiXPro Sales Concierge — Threshold Calibration Plan v1.0

> **Plan Date**: 2026-08-28
> **Scope**: Empirical Calibration Methodology Using Phase 4.3 Benchmark
> **Final Status**: **PHASE 4.4 COMPLETE — THRESHOLD CALIBRATION PLAN READY**

---

### 1. EMPIRICAL CALIBRATION METHODOLOGY

Rather than guessing arbitrary threshold values (e.g. 0.80), DigiXPro will execute an **empirical grid search** against the 2,137-record Phase 4.3 Benchmark Dataset during Phase 4.5.

#### Calibration Metrics:
1. **Top-1 Cosine Similarity Threshold ($T_{sim}$)**: Minimum cosine similarity required to consider an intent candidate.
2. **Top-1 vs Top-2 Margin Gap ($Delta_{margin} = S_1 - S_2$)**: Minimum score separation between the top match and runner-up match required to route without clarification.
3. **High-Risk Strict Margin Adjustment ($Delta_{risk} = +0.10$)**: Additional margin required for Commercial, Audit, Booking, and Handoff intents.

#### Calibration Grid Ranges to Benchmark:
- $T_{sim} in [0.65, 0.70, 0.75, 0.80, 0.85]$
- $Delta_{margin} in [0.05, 0.08, 0.10, 0.12, 0.15]$

---

# **FINAL STATUS: PHASE 4.4 COMPLETE — THRESHOLD CALIBRATION PLAN READY**
