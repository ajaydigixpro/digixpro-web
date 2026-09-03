import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { LocalSemanticRouter } from '../router';
import { FROZEN_PROTOTYPES } from '../prototypes';

// PHASE 9 RESTORATION TESTS
//
// router.ts's Layer 2/3 deterministic lexical/fuzzy fallback (see provider.ts's
// lexicalOverlapScore) has existed and been unit-tested since Phase 1, but nothing in
// the production endpoint ever called loadPrototypes() - so prototypeRegistry was
// always [], top1_score was always 0, and every message that didn't match a Tier-0
// precedence.ts rule fell straight to generic clarification. These tests prove the
// restored FROZEN_PROTOTYPES data (sourced from the founder-approved, "FROZEN" Intent
// Pack Registry) now lets that existing layer actually resolve real paraphrases that
// Tier-0 does not cover - without touching a single precedence.ts rule.

function freshRouter(): LocalSemanticRouter {
  const router = new LocalSemanticRouter({ similarityThreshold: 0.75, marginThreshold: 0.10 });
  router.loadPrototypes(FROZEN_PROTOTYPES);
  return router;
}

describe('Phase 9: FROZEN_PROTOTYPES restores the previously-dead fuzzy fallback layer', () => {
  test('sanity: with no prototypes loaded, an uncovered paraphrase still falls to clarify (baseline unchanged)', () => {
    const router = new LocalSemanticRouter({ similarityThreshold: 0.75, marginThreshold: 0.10 });
    const res = router.route('google visibility', 'sess-p9-baseline');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-CONTEXTUAL-CLARIFY');
  });

  test('"google visibility" (SEO paraphrase, not matched by any Tier-0 rule) now resolves via the fuzzy layer', () => {
    const res = freshRouter().route('google visibility', 'sess-p9-seo');
    assert.equal(res.tier0_match, false, 'must be a genuine fuzzy-layer match, not a Tier-0 rule');
    assert.equal(res.candidate_intent, 'INTENT-01-SEO');
    assert.equal(res.candidate_family, 'FAM-01');
    assert.equal(res.confidence_status, 'HIGH');
  });

  test('"organic traffic" (SEO paraphrase) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('organic traffic', 'sess-p9-seo-2');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-01-SEO');
  });

  test('"wordpress website" (WEB paraphrase) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('wordpress website', 'sess-p9-web');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-02-WEB');
  });

  test('"tech stack review" (CTO paraphrase) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('tech stack review', 'sess-p9-cto');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-04-CTO');
  });

  test('"case study" (evidence paraphrase) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('case study', 'sess-p9-evidence');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-07-EVIDENCE');
  });

  test('"what do you do" (value-prop paraphrase) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('what do you do', 'sess-p9-valueprop');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-12-VALUEPROP');
  });

  test('"what is included in your audit" (informational audit FAQ, distinct from actionable intake) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('what is included in your audit', 'sess-p9-audit-info');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-06-AUDIT-INFO');
    assert.notEqual(res.candidate_intent, 'INTENT-06-AUDIT-INTAKE', 'must not be confused with the actionable audit-request intent');
  });

  test('"founder contact please" (human handoff paraphrase) resolves via the fuzzy layer', () => {
    const res = freshRouter().route('founder contact please', 'sess-p9-handoff');
    assert.equal(res.tier0_match, false);
    assert.equal(res.candidate_intent, 'INTENT-08-HANDOFF');
  });

  test('Tier-0 precedence.ts rules still take priority over the fuzzy layer when both could match', () => {
    const res = freshRouter().route('local seo', 'sess-p9-tier0-priority');
    assert.equal(res.tier0_match, true, 'an input already covered by an explicit Tier-0 rule must not be rerouted through the fuzzy layer');
    assert.equal(res.candidate_intent, 'INTENT-01-SEO');
  });

  test('INTENT-09-OBJECTION was deliberately excluded from restoration: objection-flavored language still falls to clarify, not an invented objection intent', () => {
    const res = freshRouter().route('freelancer se karwa lunga budget kam hai', 'sess-p9-no-objection');
    assert.notEqual(res.candidate_intent, 'INTENT-09-OBJECTION');
  });

  test('gibberish/unknown input is unaffected by the restored prototypes and still requires clarification', () => {
    const res = freshRouter().route('zzflorptastic wobblejam', 'sess-p9-gibberish');
    assert.equal(res.tier0_match, false);
    assert.equal(res.clarification_required, true);
  });
});
