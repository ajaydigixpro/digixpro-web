import { VisitorSessionState } from './types';
import { DecisionKey } from './informationGap';
import {
  identifyActiveDecisionSource,
  isBarePlatformFollowUp,
  questionsFreelancerAlternative,
  questionsFreelancerSufficiency,
  questionsShopifySufficiency
} from './workingMemory';

// PHASE 18 PART 2/3: FIRST-CLASS MESSAGE FUNCTION
//
// A deterministic classifier that answers "what is this message DOING
// conversationally" before any response is chosen - the missing piece
// named in Phases 15/17. Deliberately scoped: this does not replace
// precedence.ts's ~150 existing fast-path rules (that would be rebuilding
// the router, explicitly forbidden). It gives the THREE named architectural
// weaknesses (Part 4 "what would you do", Part 5 "why", Part 6 objections)
// ONE shared classification step instead of three independent regex-owned
// reasoning paths, and is state-aware (Part 3) via identifyActiveDecisionSource,
// which reads intent history exactly like resolveWhyTarget/resolveWhatNext
// already do - no new memory, no new lexical system.

export type MessageFunction =
  | 'RECOMMENDATION_REQUEST'
  | 'WHY'
  | 'WHAT_WOULD_CHANGE_MIND'
  | 'OBJECTION'
  | 'GENERAL';

export type ObjectionKey = 'FREELANCER' | 'SHOPIFY_WORDPRESS' | 'AUDIT_OVERKILL' | 'DIY';

export interface MessageFunctionResult {
  function: MessageFunction;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  /** The decision (if any) this message's function should be resolved against - state-aware, not lexical alone. */
  targetDecision?: DecisionKey;
  objectionKey?: ObjectionKey;
}

// Each pattern below is the SAME signal family the individual precedence.ts
// rules already used before this phase (see the Phase 18 report's decision-
// tree map) - consolidated so ONE classification happens, not duplicated.

const RECOMMENDATION_REQUEST_PATTERN =
  /\b(if this were your (own )?business|what would you do if this were your business|what would you do if this were your own business|what would you do in my position|what would you do first\??|what would you do first|what would you recommend|what would you do\??|what would you do|what should i do|what would be your move|what's your recommendation|whats your recommendation|so where would you start|where would you start|someone told me|can you actually help me decide|help me decide whether rebuilding)\b/i;

// PHASE 22 (Part 4 hardening): "why that?" (no "'s"/"is"), "okay, but why?"
// (an intervening "but"), and "what do you mean?" right after a
// recommendation are the same WHY-shaped request in natural phrasing this
// pattern didn't cover - found via this phase's own testing to fall through
// to the fuzzy layer instead of re-explaining the current recommendation
// ("what do you mean?" was the worse case: a HIGH-confidence fuzzy
// misfire to the generic company value-prop, unrelated to what was just
// said). Added as anchored whole-message alternatives, same shape as the
// existing entries - not a new mechanism.
const WHY_PATTERN = /^(why|why that|why('s| is) that|why not\??|so why|okay,? (but )?why|why do you say that|what makes you think that|why would you recommend that|what's the reasoning|whats the reasoning|what do you mean)\??\.?$/i;

// PHASE 18 PART 22: general reference resolution - "your recommendation" /
// "that approach" / "what you suggested" asked about are WHY-shaped
// (asking to justify/re-affirm something already said), so they resolve
// through the SAME resolveWhyTarget/shown-text mechanism rather than a new
// pronoun-specific rule. Small, bounded addition - not a pronoun table.
const WHY_REFERENCE_PATTERN = /\b(what you suggested|your recommendation|that approach|is that still your recommendation|do you still recommend that|still think that|still stand by that)\b/i;

const WHAT_WOULD_CHANGE_MIND_PATTERN =
  /\b(what would change your (mind|recommendation)|what would make you (rebuild|recommend|change your mind)|when would (seo|shopify|that) (become|be)|what would it take to change (your|that))\b/i;

// PHASE 22 (Part 9 hardening): each pattern below gained a small set of
// natural phrasings found broken by this phase's own conversation testing -
// the visitor's ACTUAL wording ("why can't Shopify do this?", "isn't a
// freelancer enough?", "why do I need an audit?", "this sounds like
// overkill", "can't I just fix the website myself?") rather than only the
// narrower phrasings each pattern originally anchored on. No new objection
// categories were added - only wider coverage of the same four.
const OBJECTION_PATTERNS: Array<{ key: ObjectionKey; test: (norm: string) => boolean }> = [
  {
    key: 'FREELANCER',
    test: (norm) =>
      /\b(why should i use digixpro|why (should i )?choose digixpro|why (not|choose) (a |your )?freelancer|why not (just )?hire a freelancer|why not (a |just )?freelance|isn'?t a freelancer enough|wouldn'?t a freelancer (be enough|do|work)|a freelancer (is|would be) cheaper|freelancer(s)? (is|are|would be) cheaper)\b/i.test(norm) ||
      questionsFreelancerAlternative(norm) ||
      questionsFreelancerSufficiency(norm)
  },
  {
    key: 'SHOPIFY_WORDPRESS',
    test: (norm) =>
      /\b(can you build (on|with) shopify|do you build (on|with) shopify|shopify is enough|is shopify enough|build (it |this )?on shopify|use shopify|why not shopify|why not wordpress|can you build it on wordpress|why not use wordpress|why not just use wordpress|why (would|do) i need custom|why can'?t shopify (do this|handle this|work)|why can'?t wordpress (do this|handle this|work))\b/i.test(
        norm
      ) || questionsShopifySufficiency(norm) || isBarePlatformFollowUp(norm)
  },
  {
    key: 'AUDIT_OVERKILL',
    test: (norm) =>
      /\b(don't think i need an audit|do i really need an audit|not sure i need an audit|don't need an audit|not sure about the audit|is an audit really necessary|do i need to do an audit|is the audit necessary|skip the audit|isn't this overkill|is this overkill|seems like overkill|sounds like overkill|why do i need an audit|why would i need an audit|why (do|would) i need (an )?audit)\b/i.test(
        norm
      )
  },
  {
    key: 'DIY',
    test: (norm) =>
      /\b(can't i (just )?do this myself|can i (just )?do this myself|can't i build this myself|couldn't i just build it myself|why can't i do it myself|can'?t i (just )?fix (the |my )?(website|site) myself|can i (just )?fix (the |my )?(website|site) myself|i can (just )?do this myself|i can (just )?build this myself|i can (just )?fix (the |my )?(website|site) myself)\b/i.test(norm)
  }
];

export function classifyMessageFunction(norm: string, session: VisitorSessionState | undefined): MessageFunctionResult {
  const activeDecision = identifyActiveDecisionSource(session, { skipFollowUpDecisions: true })?.decision;

  if (WHAT_WOULD_CHANGE_MIND_PATTERN.test(norm)) {
    return { function: 'WHAT_WOULD_CHANGE_MIND', confidence: 'HIGH', targetDecision: activeDecision };
  }
  if (RECOMMENDATION_REQUEST_PATTERN.test(norm)) {
    return { function: 'RECOMMENDATION_REQUEST', confidence: 'HIGH', targetDecision: activeDecision };
  }
  for (const objection of OBJECTION_PATTERNS) {
    if (objection.test(norm)) {
      return { function: 'OBJECTION', confidence: 'HIGH', targetDecision: activeDecision, objectionKey: objection.key };
    }
  }
  if (WHY_PATTERN.test(norm.trim()) || WHY_REFERENCE_PATTERN.test(norm)) {
    return { function: 'WHY', confidence: 'HIGH', targetDecision: activeDecision };
  }
  return { function: 'GENERAL', confidence: 'LOW', targetDecision: activeDecision };
}
