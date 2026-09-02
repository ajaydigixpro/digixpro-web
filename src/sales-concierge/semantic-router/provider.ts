/**
 * Deterministic lexical/fuzzy matching utilities for the Sales Concierge router.
 *
 * This module intentionally contains NO machine-learning model, NO embedding
 * inference, and NO external API call. It scores similarity between a visitor's
 * input and a set of canonical prototype phrases using plain token overlap plus
 * bounded-edit-distance fuzzy matching (typo tolerance). This is honest
 * lexical/pattern matching, not semantic embedding similarity, and must not be
 * described as such.
 */

/** Tokenize text into lowercase whitespace-separated words. */
export function tokenize(text: string): string[] {
  return text.trim().toLowerCase().split(/\s+/).filter(w => w.length > 0);
}

/** Bounded Levenshtein edit distance. Returns a value > maxDistance early if exceeded, for performance. */
export function levenshteinDistance(a: string, b: string, maxDistance = 2): number {
  if (a === b) return 0;
  const lenA = a.length;
  const lenB = b.length;
  if (Math.abs(lenA - lenB) > maxDistance) return maxDistance + 1;

  let prevRow = Array.from({ length: lenB + 1 }, (_, i) => i);
  for (let i = 1; i <= lenA; i++) {
    const currRow = [i];
    let rowMin = currRow[0];
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(
        prevRow[j] + 1,
        currRow[j - 1] + 1,
        prevRow[j - 1] + cost
      );
      currRow.push(value);
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > maxDistance) return maxDistance + 1;
    prevRow = currRow;
  }
  return prevRow[lenB];
}

/** Whether two tokens match exactly or within a small edit-distance tolerance (typo forgiveness). */
export function isFuzzyTokenMatch(a: string, b: string, maxDistance = 1): boolean {
  if (a === b) return true;
  // Skip fuzzy matching for very short tokens - too error-prone (e.g. "a" vs "b").
  if (a.length < 4 || b.length < 4) return false;
  return levenshteinDistance(a, b, maxDistance) <= maxDistance;
}

/**
 * Deterministic lexical overlap score between a query's token set and a prototype
 * phrase's tokens. Exact token matches count as full credit (1.0); near-miss
 * (single-edit-distance) tokens count as partial credit (0.6), giving basic typo
 * tolerance without inventing an intent that wasn't actually said.
 *
 * This is a normalized overlap score in the same family as Jaccard/cosine-of-bag-
 * of-words, deliberately simple and fully explainable per match.
 */
export function lexicalOverlapScore(queryWords: Set<string>, prototypeWords: string[]): number {
  const qLen = queryWords.size || 1;
  const pLen = prototypeWords.length || 1;

  let matchWeight = 0;
  for (const pWord of prototypeWords) {
    if (queryWords.has(pWord)) {
      matchWeight += 1;
      continue;
    }
    for (const qWord of queryWords) {
      if (isFuzzyTokenMatch(qWord, pWord)) {
        matchWeight += 0.6;
        break;
      }
    }
  }

  return matchWeight / Math.sqrt(qLen * pLen);
}
