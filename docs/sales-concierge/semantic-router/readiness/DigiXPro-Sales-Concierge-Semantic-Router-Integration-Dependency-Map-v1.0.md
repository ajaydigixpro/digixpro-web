# DigiXPro Sales Concierge — Integration Dependency Map v1.0

> **Map Date**: 2026-08-28
> **Scope**: End-to-End Chatbot Architecture & Data Flow Boundaries
> **Final Status**: **ARCHITECTURE DEPENDENCY MAP COMPLETE**

---

### 1. END-TO-END CHATBOT PIPELINE (READ-ONLY ARCHITECTURE MAP)

```
[ Website Visitor ]
       ↓
[ SalesConcierge.tsx (React Frontend UI) ]
       ↓ (HTTP POST /api/concierge/message)
[ Concierge API Route / Handler ]
       ↓ (Passes text + sessionId)
[ LocalSemanticRouter.route() ]
       ↓
  Layer 1: Tier-0 Precedence Rules
  Layer 2: Local Pre-processing
  Layer 3: Local ONNX Embedding Provider (multilingual-e5-small)
  Layer 4: 2-Stage Hierarchical k-NN Prototype Scoring
  Layer 5: Score Margin & High-Risk State Validation
       ↓
[ RoutingResult (Intent ID + Confidence Status + Flow ID) ]
       ↓
[ Phase 2 Flow Handler (FLOW-01 to FLOW-18) ]
       ↓
[ Response Policy & Formatting Engine ] -> [ Visitor Chat UI ]
```
