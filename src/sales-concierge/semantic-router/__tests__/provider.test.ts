import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, levenshteinDistance, isFuzzyTokenMatch, lexicalOverlapScore } from '../provider';
import { LocalSemanticRouter } from '../router';

describe('Deterministic Lexical/Fuzzy Matching Utilities', () => {
  test('tokenize splits and lowercases input', () => {
    assert.deepEqual(tokenize("SEO Chahiye Website Ke Liye"), ["seo", "chahiye", "website", "ke", "liye"]);
  });

  test('levenshteinDistance is 0 for identical strings and 1 for a single-character typo', () => {
    assert.equal(levenshteinDistance("website", "website"), 0);
    assert.equal(levenshteinDistance("website", "websute"), 1);
  });

  test('isFuzzyTokenMatch tolerates a single-character typo on longer words but not short ones', () => {
    assert.equal(isFuzzyTokenMatch("website", "websute"), true);
    assert.equal(isFuzzyTokenMatch("pricing", "budget"), false);
    // Short tokens are excluded from fuzzy matching to avoid false positives.
    assert.equal(isFuzzyTokenMatch("cto", "cta"), false);
  });

  test('lexicalOverlapScore is deterministic and repeatable for identical inputs', () => {
    const words = new Set(tokenize("website redesign cost"));
    const proto = tokenize("website redesign cost");
    const score1 = lexicalOverlapScore(words, proto);
    const score2 = lexicalOverlapScore(words, proto);
    assert.equal(score1, score2);
    assert.ok(score1 > 0.9, `expected near-perfect overlap, got ${score1}`);
  });

  test('lexicalOverlapScore gives partial (not zero) credit for a near-miss typo', () => {
    const exactWords = new Set(tokenize("website redesign cost"));
    const typoWords = new Set(tokenize("websute redesign cost"));
    const proto = tokenize("website redesign cost");

    const exactScore = lexicalOverlapScore(exactWords, proto);
    const typoScore = lexicalOverlapScore(typoWords, proto);

    assert.ok(typoScore > 0, "typo input should still score above zero via fuzzy matching");
    assert.ok(typoScore < exactScore, "typo input should score lower than an exact match");
  });

  test('lexicalOverlapScore returns 0 for completely unrelated phrases', () => {
    const words = new Set(tokenize("banana smoothie recipe"));
    const proto = tokenize("website redesign cost");
    assert.equal(lexicalOverlapScore(words, proto), 0);
  });

  test('LocalSemanticRouter no longer exposes any embedding provider - honest engine identity only', () => {
    const router = new LocalSemanticRouter();
    assert.equal(router.getEngineName(), "deterministic-lexical-fuzzy-v1");
    assert.equal((router as any).getEmbeddingProvider, undefined);
  });
});
