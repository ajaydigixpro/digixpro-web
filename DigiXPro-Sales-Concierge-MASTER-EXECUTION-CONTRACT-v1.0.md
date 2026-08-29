# DigiXPro Sales Concierge — MASTER EXECUTION CONTRACT v1.0

## PRIMARY PRODUCT OBJECTIVE

Build an intelligent **guided website-tour Sales Concierge**.

Its primary job is **NOT** to behave like a generic FAQ chatbot. Its primary job is to understand a visitor's need through targeted questions and then guide that visitor through the most relevant DigiXPro website pages, services, evidence and next steps, ultimately leading qualified visitors to an **Audit or 30-minute Architecture Call**.

## NON-NEGOTIABLE RULES

1. Do NOT build a generic FAQ chatbot.
2. Do NOT turn the 2,137-question corpus into a 2,137-answer database.
3. The question corpus is evidence for language coverage, intent recognition and routing.
4. Questions must be used to make the guided journey intelligent, not to make conversations unnecessarily long.
5. The primary UX is a **guided website tour**.
6. Visitor need → targeted questions → context → relevant service/problem → relevant website destination → relevant evidence → next guided step.
7. Pricing requests follow the approved DigiXPro strategy: **guide toward Audit/diagnosis rather than becoming a price-list bot**. Never invent prices.
8. Complex, diagnostic or qualified visitors should be able to reach the Audit and/or 30-minute Architecture Call.
9. The concierge should explain what the visitor should inspect on a page/evidence destination and why it is relevant, rather than merely dumping links.
10. Do NOT restart completed research or repeatedly create architecture/readiness audits.
11. A new audit is justified only when it answers a specific implementation question or validates a concrete built component.
12. Every new phase should primarily produce **executable implementation, configuration, mappings, integration, or tests**.
13. Do not modify frozen foundations casually; use them as inputs.
14. Product success is measured by the quality of the real visitor journey, not by the number of specifications/audits produced.

## EXISTING FOUNDATION — USE IT

Already completed foundation includes:

- Master Question Universe
- Question Families
- Founder Decision Matrix
- Frozen Intent Registry
- Semantic Router benchmark
- Router architecture
- Router calibration
- Semantic Router prototype
- Real ONNX runtime binding
- Router verification/readiness work
- Dialogue Engine / Response Policy specification

These are supporting infrastructure. They are **not the finished product**.

## CORE JOURNEY

```text
Visitor
  ↓
Need / Intent
  ↓
Targeted Questions
  ↓
Understand Context / Problem
  ↓
Identify Relevant Service
  ↓
Guided Website Tour
  ↓
Relevant Page / Section
  ↓
Relevant Evidence / Case Study
  ↓
Qualification / Recommendation
  ↓
Audit OR 30-Minute Architecture Call
  ↓
Lead / Conversion
```

## GUIDED TOUR BEHAVIOUR

The concierge should:

- ask only questions that help choose the next useful step;
- remember answers within the visitor session;
- adapt subsequent questions to previous answers;
- identify the relevant DigiXPro service/problem;
- take the visitor to the correct website destination;
- tell the visitor what to look at and why;
- use relevant evidence instead of generic portfolio dumping;
- continue the tour based on the visitor's response;
- recognize uncertainty and use clarification or Audit when appropriate.

## PRICING

When a visitor asks about price, fee, cost, retainer, etc.:

- preserve the service context;
- do not hallucinate or invent prices;
- do not turn the experience into a price-list exchange;
- guide toward the appropriate diagnostic/Audit path where required;
- use the Audit findings and context as the basis for meaningful commercial discussion;
- move qualified visitors toward the 30-minute Architecture Call when appropriate.

## AUDIT

```text
Problem / uncertainty
  ↓
Targeted discovery
  ↓
Audit recommendation
  ↓
Audit intake
  ↓
Diagnostic output
  ↓
Findings / recommendations
  ↓
Relevant service / evidence
  ↓
30-Minute Architecture Call
```

Never claim an audit exists or has been completed when it has not.

## EVIDENCE

Evidence is a guided experience:

```text
Visitor need
  ↓
Relevant evidence category
  ↓
Relevant case / production evidence
  ↓
What to inspect
  ↓
Why it matters to this visitor
  ↓
Next step
```

Do not simply dump portfolio links.

## REQUIRED IMPLEMENTATION ARTIFACT

The next major implementation must create a **Guided Customer Journey / Guided Website Tour Matrix**:

```text
Visitor Goal
→ Entry Trigger
→ Targeted Question(s)
→ Answer Branches
→ Context State
→ Next Question
→ Website Destination
→ Evidence Destination
→ Audit Trigger
→ 30-Min Call Trigger
→ Completion / Exit Condition
```

This must be based on the existing DigiXPro Website Structure, service architecture, evidence architecture, audit workflow, consultation journey and frozen routing/intent foundation.

## PHASE DISCIPLINE

Preferred cycle:

**BUILD → RUN → TEST → FIX → INTEGRATE → END-TO-END TEST**

Avoid this cycle:

**AUDIT → RE-AUDIT → SPECIFICATION → READINESS REVIEW → FREEZE → ANOTHER AUDIT**

Do not create another audit/specification phase merely because it is possible.

## DEFINITION OF DONE

The Sales Concierge is NOT done merely because intents, routers, states, specifications or tests exist.

It is done when a real visitor can:

1. Enter the chatbot.
2. Express or select a need.
3. Be understood.
4. Answer a small number of useful questions.
5. Have the relevant service/problem identified.
6. Receive a guided tour of the correct DigiXPro website experience.
7. See relevant evidence when appropriate.
8. Continue through an adaptive journey.
9. Have pricing routed according to the Audit strategy.
10. Reach Audit when appropriate.
11. Reach the 30-minute Architecture Call when qualified.
12. Experience safe clarification/fallback when uncertain.
13. Maintain isolated session state.
14. Complete the intended journey on the actual DigiXPro website.

## ANTIGRAVITY / AGENT INSTRUCTION

**READ THIS DOCUMENT FIRST before doing Sales Concierge work.**

Then read the existing DigiXPro project documents and current implementation state.

Treat this document as the **product-execution guardrail**.

Do not restart completed research.

Do not create another audit/readiness/specification phase unless a concrete blocker requires it.

Use the existing frozen router, intents, dialogue foundation and project architecture.

The immediate priority is:

> **BUILD THE ACTUAL GUIDED WEBSITE-TOUR JOURNEY.**

For every proposed task, ask:

> **Does this directly move a real visitor closer to receiving the intended guided DigiXPro website tour and reaching the correct next step?**

If not, do not start it unless it is a necessary technical dependency.

At the end of every phase report:

- executable component built;
- existing components used;
- tests actually run;
- visitor journey now supported;
- remaining work to make it live.

## NORTH STAR

> **DigiXPro Sales Concierge = an intelligent guided website tour that understands the visitor, asks only the questions needed to guide them, shows the right DigiXPro service/evidence/page at the right moment, and moves qualified visitors toward Audit or a 30-minute Architecture Call.**

Everything else is infrastructure supporting this outcome.

**Status:** AUTHORITATIVE EXECUTION GUARDRAIL  
**Version:** v1.0
