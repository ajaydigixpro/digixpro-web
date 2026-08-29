# DigiXPro Sales Concierge — Dialogue Engine & Response Policy Specification v1.0

> **Specification Date**: 2026-08-28
> **Scope**: Deterministic State Machine & Response Policy Layer (sits between Semantic Router & Response Output)
> **Final Gate Decision**: **READY FOR FROZEN DIALOGUE/POLICY REVIEW**

---

### 1. DIALOGUE ENGINE PIPELINE ARCHITECTURE

```
[ Visitor Input ]
       ↓
[ Local Semantic Router ] -> Returns (Intent ID, Confidence, Margin)
       ↓
[ Dialogue State Machine ] -> Evaluates Current State + Context
       ↓
[ Intent Dialogue Contract ] -> Validates Allowed State Transitions
       ↓
[ Response Policy Engine ] -> Enforces Claims, Pricing & Escalation Rules
       ↓
[ Action Execution Contract ] -> Selects Action (Show Info / Intake / Booking / Handoff)
       ↓
[ Response Formatting Layer ] -> Output to Visitor
```

---

### 2. CANONICAL STATE MACHINE (10 STATES)

1. **NEW_VISITOR**: Initial session boot.
2. **DISCOVERY**: Broad service discovery & value prop explanation (`FLOW-02`).
3. **SERVICE_IDENTIFIED**: Specific service stream selected (SEO / Web / Auto / CTO).
4. **PRICING_DISCUSSION**: Retainer scope & commercial qualification (`FLOW-06`).
5. **AUDIT_INTENT**: Technical website/marketing audit intake (`FLOW-04`).
6. **CONSULTATION_REQUEST**: Scheduled 30-min discovery call (`FLOW-05`).
7. **HUMAN_HANDOFF**: Immediate live founder/expert contact (`FLOW-05`).
8. **OBJECTION**: Budget / freelancer qualification objection handling (`FLOW-07`).
9. **CLARIFICATION**: Multi-intent ambiguity resolution (`INTENT-11-MULTI`).
10. **COMPLETED**: Intake or booking successfully captured.

---

# **FINAL STATUS: PHASE 5.0 COMPLETE — DIALOGUE ENGINE & RESPONSE POLICY SPECIFICATION COMPLETE**
