import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTourActionLink } from '../SalesConcierge';

// Regression coverage for the exact action -> navigation-target rule every guided-tour
// action card (case study, service/page link, Diagnostic Audit, 30-Min Call) goes
// through. This is a pure extraction of the logic that used to live inline in JSX -
// verified here directly rather than only through a rendered component, since this
// project has no React/DOM test runner installed and none is being introduced for a
// single pure function.

describe('resolveTourActionLink - guided-tour action card navigation targets', () => {
  test('START_AUDIT action with url "/audit" resolves to an internal Next.js Link target (the reported bug scenario)', () => {
    const result = resolveTourActionLink({ url: '/audit' });
    assert.equal(result.href, '/audit');
    assert.equal(result.isInternal, true);
  });

  test('SHOW_EVIDENCE (case-study) action behaves identically to START_AUDIT for internal URLs', () => {
    const result = resolveTourActionLink({ url: '/evidence/dr-aggarwal' });
    assert.equal(result.href, '/evidence/dr-aggarwal');
    assert.equal(result.isInternal, true);
  });

  test('SHOW_SERVICE/page action behaves identically for internal URLs', () => {
    const result = resolveTourActionLink({ url: '/design-services' });
    assert.equal(result.href, '/design-services');
    assert.equal(result.isInternal, true);
  });

  test('BOOK_CONSULTATION action ("/contact") resolves internally like every other working action', () => {
    const result = resolveTourActionLink({ url: '/contact' });
    assert.equal(result.href, '/contact');
    assert.equal(result.isInternal, true);
  });

  test('an absolute external URL is treated as external (opens in a new tab), never as an internal Link', () => {
    const result = resolveTourActionLink({ url: 'https://example.com/report' });
    assert.equal(result.href, 'https://example.com/report');
    assert.equal(result.isInternal, false);
  });

  test('a missing url never silently falls back to "/" while claiming to be internal - stays external so it is visibly a no-op, not a wrong destination', () => {
    const result = resolveTourActionLink({ url: undefined });
    assert.equal(result.href, '/');
    assert.equal(result.isInternal, false, 'a missing URL must not render as an internal Link to an unrelated destination');
  });
});
