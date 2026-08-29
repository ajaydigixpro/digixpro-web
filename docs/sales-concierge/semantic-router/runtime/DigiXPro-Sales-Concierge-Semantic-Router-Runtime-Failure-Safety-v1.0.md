# DigiXPro Sales Concierge — Runtime Failure Safety Spec v1.0

> **Spec Date**: 2026-08-28
> **Scope**: Embedding Provider Exception & Fallback Protocol
> **Final Status**: **FAIL-SAFE VERIFIED**

---

### 1. FAILURE SAFETY RULES

- **Embedding Exception**: If ONNX embedding extraction fails, router gracefully falls back to Tier-0 precedence or `INTENT-12-VALUEPROP`.
- **Zero Hallucinated Confidence**: Never returns high-confidence routing when embedding extraction encounters an error.
