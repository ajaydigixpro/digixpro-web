import { VisitorSessionState } from './types';
import { DecisionKey, resolveDecisionState, resolveDecisionStatus, readFact, DECISION_LABELS } from './informationGap';
import { isConversionBottleneckProfile } from './workingMemory';

// PHASE 18 PART 15: NORMALIZED RECOMMENDATION OBJECT
//
// Every decision-bearing response the system gives (a direct answer to
// "what would you do?", a "why?" explanation, a "what would change your
// mind?" answer) should be derived from the SAME typed object rather than
// each caller re-deriving its own text. This module is deliberately a
// FACTORING of logic that already existed, scattered, in tour-matrix.ts's
// dynamic-override chain (see the Phase 14/16/17 comments there) - the
// TEXT below is copied verbatim from those branches, not rewritten, so
// existing tests asserting on that exact text keep passing; only the
// SOURCE of the branch decision and text changes (one function instead of
// three near-duplicate inline chains).

export type RecommendationOption =
  | 'REBUILD'
  | 'IMPROVE'
  | 'AUDIT'
  | 'SELF_SERVICE'
  | 'CONVERSION_FOCUS'
  | 'VISIBILITY_FOCUS'
  | 'INSUFFICIENT';

export interface Recommendation {
  decision: DecisionKey;
  option: RecommendationOption;
  /** The actual sentences to show - already-authored, decision-derived prose, not template-generated. */
  rationale: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PROVISIONAL' | 'RESOLVED' | 'INSUFFICIENT';
  /** What the recommendation currently assumes, if anything (Part 10: never silently promoted to fact). */
  assumptions: string[];
  unresolvedGaps: string[];
  /** What new information would change this recommendation (Part 16). */
  whatWouldChange: string[];
  reversibility: 'HIGH' | 'MEDIUM' | 'LOW';
}

function buildRebuildRecommendation(session: VisitorSessionState | undefined): Recommendation {
  const state = resolveDecisionState('REBUILD_VS_IMPROVE', session);
  const technicalConstraintLimiting = state.knownFacts.technical_constraint === 'limiting';
  const trafficHealthy = state.knownFacts.traffic_health === 'healthy';
  const hasExistingSite = state.knownFacts.existing_website === 'has_site';

  if (technicalConstraintLimiting) {
    return {
      decision: 'REBUILD_VS_IMPROVE',
      option: 'REBUILD',
      rationale: [
        "That changes things. A structurally limiting platform is the exact fact this decision turns on - if the current system genuinely can't support what you need, improving around it just delays the same problem. I'd lean toward a rebuild."
      ],
      confidence: 'HIGH',
      status: 'RESOLVED',
      assumptions: [],
      unresolvedGaps: [],
      whatWouldChange: ['If a diagnostic Audit found the platform was NOT actually structurally limiting after all, that would shift this back toward improving it instead.'],
      reversibility: 'MEDIUM'
    };
  }
  if (trafficHealthy && hasExistingSite) {
    return {
      decision: 'REBUILD_VS_IMPROVE',
      option: 'IMPROVE',
      rationale: [
        "I wouldn't rebuild yet. Traffic is already there and the site is already live - what's missing is enquiries, which points at conversion, not the platform itself. Rebuilding without knowing that would risk spending budget on the wrong fix."
      ],
      confidence: 'MEDIUM',
      status: 'RESOLVED',
      assumptions: ['the current platform is not structurally limiting (not yet confirmed)'],
      unresolvedGaps: ['technical_constraint'],
      whatWouldChange: ["If the Audit finds the current architecture genuinely can't support the changes needed, that would change this recommendation toward a rebuild - but that's not established yet."],
      reversibility: 'HIGH'
    };
  }
  if (hasExistingSite) {
    return {
      decision: 'REBUILD_VS_IMPROVE',
      option: 'IMPROVE',
      rationale: ['Not necessarily. My default lean is to improve rather than rebuild, on the assumption that the current platform can technically support what you need.'],
      confidence: 'LOW',
      status: 'PROVISIONAL',
      assumptions: ['the current platform can technically support what you need'],
      unresolvedGaps: ['technical_constraint', 'traffic_health'],
      whatWouldChange: ["If that assumption turns out to be wrong - if the existing stack is structurally limiting - I'd change that recommendation toward a rebuild."],
      reversibility: 'HIGH'
    };
  }
  return {
    decision: 'REBUILD_VS_IMPROVE',
    option: 'INSUFFICIENT',
    rationale: [
      "Not necessarily. There are two sensible paths here: improve the current site, or rebuild it. The deciding factor isn't preference, it's whether the existing system can actually support what you need - technically and structurally.",
      "Right now I don't have enough to tell which side of that line you're on."
    ],
    confidence: 'LOW',
    status: 'INSUFFICIENT',
    assumptions: [],
    unresolvedGaps: ['existing_website', 'technical_constraint', 'traffic_health'],
    whatWouldChange: ['Knowing whether you have an existing site, and whether it is technically constraining you, would settle this.'],
    reversibility: 'HIGH'
  };
}

function buildAuditRecommendation(session: VisitorSessionState | undefined): Recommendation {
  const problemConfirmedUnclear = readFact(session, 'problem_clarity').value === 'unclear';
  if (!problemConfirmedUnclear && !isConversionBottleneckProfile(session)) {
    return {
      decision: 'AUDIT_VS_SELF_SERVICE',
      option: 'SELF_SERVICE',
      rationale: [
        "Not necessarily, if the problem is already clear. An Audit earns its cost when the root cause is genuinely uncertain - if you already know what needs fixing, we can go straight to scoping it."
      ],
      confidence: 'MEDIUM',
      status: 'RESOLVED',
      assumptions: ['the problem is not yet confirmed to be genuinely unclear'],
      unresolvedGaps: [],
      whatWouldChange: ["If it turns out the root cause genuinely isn't clear, an Audit becomes worth its cost."],
      reversibility: 'HIGH'
    };
  }
  return {
    decision: 'AUDIT_VS_SELF_SERVICE',
    option: 'AUDIT',
    rationale: ["In your case, yes - the root problem isn't confirmed yet, and there's more than one thing it could be. That's exactly the situation an Audit is for."],
    confidence: 'HIGH',
    status: 'RESOLVED',
    assumptions: [],
    unresolvedGaps: [],
    whatWouldChange: ["If the bottleneck were already obvious, I wouldn't recommend spending time on a diagnostic step."],
    reversibility: 'HIGH'
  };
}

function buildConversionRecommendation(session: VisitorSessionState | undefined): Recommendation {
  const state = resolveDecisionState('CONVERSION_VS_TRAFFIC', session);
  const trafficHealthy = state.knownFacts.traffic_health === 'healthy';
  const enquiriesWeak = state.knownFacts.enquiry_health === 'weak';
  if (trafficHealthy && enquiriesWeak) {
    return {
      decision: 'CONVERSION_VS_TRAFFIC',
      option: 'CONVERSION_FOCUS',
      rationale: [
        "That confirms it - if people are already finding the site but not enquiring, the bottleneck almost certainly isn't search visibility. Buying more SEO at this point would just send more traffic into the same leak."
      ],
      confidence: 'HIGH',
      status: 'RESOLVED',
      assumptions: [],
      unresolvedGaps: [],
      whatWouldChange: ['If traffic itself turned out to be declining, this would become a visibility question again, not a conversion one.'],
      reversibility: 'HIGH'
    };
  }
  if (state.knownFacts.traffic_health === 'weak') {
    return {
      decision: 'CONVERSION_VS_TRAFFIC',
      option: 'VISIBILITY_FOCUS',
      rationale: ['With little to no traffic reaching the site, the priority is visibility - technical SEO and indexation - before anything about conversion can even be measured.'],
      confidence: 'MEDIUM',
      status: 'RESOLVED',
      assumptions: [],
      unresolvedGaps: ['enquiry_health'],
      whatWouldChange: ['If traffic turns out to already be healthy, this becomes a conversion question instead.'],
      reversibility: 'HIGH'
    };
  }
  return {
    decision: 'CONVERSION_VS_TRAFFIC',
    option: 'INSUFFICIENT',
    rationale: ['Whether this is a visibility problem or a conversion problem depends on whether the site is already getting reasonable traffic.'],
    confidence: 'LOW',
    status: 'INSUFFICIENT',
    assumptions: [],
    unresolvedGaps: ['traffic_health', 'enquiry_health'],
    whatWouldChange: ['Knowing current traffic and enquiry levels would settle which one this is.'],
    reversibility: 'HIGH'
  };
}

/**
 * Fallback for decisions without a dedicated builder (PRICING, TIMELINE,
 * ECOMMERCE_ARCHITECTURE) - these are scope-refinement decisions, not
 * binary gates, so their "recommendation" is honest scope-dependency
 * language rather than a picked option.
 */
function buildGenericRecommendation(decision: DecisionKey, session: VisitorSessionState | undefined): Recommendation {
  const status = resolveDecisionStatus(decision, session);
  const label = DECISION_LABELS[decision];
  return {
    decision,
    option: 'INSUFFICIENT',
    rationale: [`That depends on ${label}.`],
    confidence: status === 'RESOLVED' ? 'MEDIUM' : 'LOW',
    status: status === 'BLOCKED' ? 'INSUFFICIENT' : status === 'RESOLVED' ? 'RESOLVED' : 'INSUFFICIENT',
    assumptions: [],
    unresolvedGaps: [],
    whatWouldChange: [`Once ${label} is clearer, this has a more specific answer.`],
    reversibility: 'HIGH'
  };
}

export function buildRecommendation(decision: DecisionKey, session: VisitorSessionState | undefined): Recommendation {
  switch (decision) {
    case 'REBUILD_VS_IMPROVE':
      return buildRebuildRecommendation(session);
    case 'AUDIT_VS_SELF_SERVICE':
      return buildAuditRecommendation(session);
    case 'CONVERSION_VS_TRAFFIC':
      return buildConversionRecommendation(session);
    default:
      return buildGenericRecommendation(decision, session);
  }
}

// =============================================================================
// PHASE 18 PART 6/14: OBJECTION / TRADE-OFF REGISTRY
//
// A small deterministic table of "is the simpler/cheaper alternative
// actually fine" trade-off answers, reused across the freelancer/Shopify/
// WordPress/overkill/DIY objection family instead of one hand-authored
// paragraph per objection with no shared structure. The text is REUSED from
// the existing, already-honest stepDefs (tour-matrix.ts) - this registry's
// job is to let a NEW capability (contextual bridging to the active
// decision, "what would change your mind" for an objection) sit on top of
// that existing text, not to replace it.
// =============================================================================

export type ObjectionKey = 'FREELANCER' | 'SHOPIFY_WORDPRESS' | 'AUDIT_OVERKILL' | 'DIY';

export interface ObjectionTradeOff {
  key: ObjectionKey;
  /** Existing stepDef intent_id whose text is the canonical answer for this objection. */
  intentId: string;
  /** Honest condition under which the visitor's simpler alternative is genuinely fine - never omitted, per Part 6. */
  alternativeIsFineWhen: string;
  /** What DigiXPro actually adds when the requirement grows past that. */
  digiXProAddsWhen: string;
}

export const OBJECTION_TRADEOFFS: Record<ObjectionKey, ObjectionTradeOff> = {
  FREELANCER: {
    key: 'FREELANCER',
    intentId: 'INTENT-SKEPTICISM-WHY-DIGIXPRO',
    alternativeIsFineWhen: 'the requirement is genuinely simple and unlikely to need to evolve',
    digiXProAddsWhen: 'the site is tied to growth, automation, search visibility, integrations, or a system that needs to evolve'
  },
  SHOPIFY_WORDPRESS: {
    key: 'SHOPIFY_WORDPRESS',
    intentId: 'INTENT-PLATFORM-OBJECTION',
    alternativeIsFineWhen: 'a template-based store already covers what is needed',
    digiXProAddsWhen: 'the requirement is likely to grow into something more custom - performance, SEO structure, or how far the site can evolve later'
  },
  AUDIT_OVERKILL: {
    key: 'AUDIT_OVERKILL',
    intentId: 'INTENT-06-AUDIT-OBJECTION',
    alternativeIsFineWhen: 'the root cause is already clear',
    digiXProAddsWhen: "the root cause is genuinely uncertain - it's most useful when you're not sure whether the real problem is SEO, conversion, UX, or the underlying system"
  },
  DIY: {
    key: 'DIY',
    intentId: 'INTENT-SKEPTICISM-WHY-DIGIXPRO',
    alternativeIsFineWhen: 'you have the time and technical comfort to build and maintain it yourself',
    digiXProAddsWhen: 'the build needs production-grade performance, security, and long-term maintainability without your own ongoing time investment'
  }
};
