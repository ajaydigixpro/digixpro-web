import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTourActionLink, resolveReplyAction } from '../SalesConcierge';

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

describe('resolveReplyAction - distinguishing navigation CTAs from conversational suggestions', () => {
  // 1. Navigation CTA is NOT sent as a Concierge message (must resolve to link, never conversation)
  test('A navigation CTA is NOT sent as a Concierge message (type === "link")', () => {
    const pricingResult = resolveReplyAction('View Pricing & Investment Guide');
    assert.equal(pricingResult.type, 'link', 'Pricing CTA must resolve to a link action, not conversation');

    const auditResult = resolveReplyAction('Start Free Systems Audit');
    assert.equal(auditResult.type, 'link', 'Audit CTA must resolve to a link action, not conversation');

    const bookingResult = resolveReplyAction('Book 30-Min Call');
    assert.equal(bookingResult.type, 'link', 'Booking CTA must resolve to a link action, not conversation');
  });

  // 2. Pricing CTA produces /pricing navigation
  test('Pricing CTA produces /pricing navigation', () => {
    const variants = [
      'View Pricing & Investment Guide',
      'View Pricing and Investment Guide',
      'Pricing & Investment Guide',
      'View Pricing Guide',
      'Check Pricing',
      'pricing'
    ];

    for (const v of variants) {
      const res = resolveReplyAction(v);
      assert.equal(res.type, 'link', `"${v}" must resolve to a link`);
      if (res.type === 'link') {
        assert.equal(res.href, '/pricing', `"${v}" must navigate to /pricing`);
        assert.equal(res.actionCategory, 'website');
      }
    }
  });

  // 3. Audit CTA produces /audit navigation
  test('Audit CTA produces /audit navigation', () => {
    const variants = [
      'Start Free Systems Audit',
      'Start Complimentary Systems Audit',
      'Start Complimentary Diagnostic Systems Audit',
      'Start Diagnostic Audit',
      'Start Free Website Audit',
      'Request Free Audit',
      'Request Website Diagnostic Audit',
      'Free Systems Audit (/audit)',
      'Submit Website URL',
      'Enter Website URL',
      'Start Free Audit',
      'Start Audit'
    ];

    for (const v of variants) {
      const res = resolveReplyAction(v);
      assert.equal(res.type, 'link', `"${v}" must resolve to a link`);
      if (res.type === 'link') {
        assert.equal(res.href, '/audit', `"${v}" must navigate to /audit`);
        assert.equal(res.actionCategory, 'conversion');
      }
    }
  });

  // 4. Booking CTA produces the established booking path (/contact)
  test('Booking CTA produces the established booking path (/contact)', () => {
    const variants = [
      'Book 30-Min Call',
      'Book 30-Min Call Instead',
      'Book a 30-Min Architecture Call',
      'Book 30-Minute Architecture Call',
      'Request Architecture Call',
      'Book Architecture Call',
      'Book Consultation',
      'Talk to a Strategist',
      'Talk to an Engineer',
      'Meet Technical Leadership',
      'Provide Contact Info'
    ];

    for (const v of variants) {
      const res = resolveReplyAction(v);
      assert.equal(res.type, 'link', `"${v}" must resolve to a link`);
      if (res.type === 'link') {
        assert.equal(res.href, '/contact', `"${v}" must navigate to /contact`);
        assert.equal(res.actionCategory, 'booking');
      }
    }
  });

  // 5. Conversational suggestion continues conversation normally
  test('Conversational suggestion continues conversation normally (type === "conversation")', () => {
    const conversationalReplies = [
      'Build a new website',
      'E-commerce / Marketplace',
      'Business / Corporate Website',
      'Something More Complex',
      'Not Sure — Help Me Decide',
      'Explore Diagnostic Audit Scope',
      'Check Audit Scope & Deliverables',
      'Check Audit Deliverables',
      'Learn How Audit Works',
      'Tell me about SEO',
      'Google rankings',
      'Around 500 products',
      'Yes',
      'No',
      'Vendor Proposal Evaluation',
      'Rebuild vs improve',
      'Starting from scratch'
    ];

    for (const reply of conversationalReplies) {
      const res = resolveReplyAction(reply);
      assert.equal(
        res.type,
        'conversation',
        `"${reply}" is a conversational choice and must continue conversation, not navigate`
      );
    }
  });

  // 6. CTA type remains deterministic (idempotent, pure function)
  test('CTA type remains deterministic and idempotent', () => {
    const input = 'View Pricing & Investment Guide';
    const res1 = resolveReplyAction(input);
    const res2 = resolveReplyAction(input);
    assert.deepEqual(res1, res2);

    const inputConv = 'Explore Diagnostic Audit Scope';
    const conv1 = resolveReplyAction(inputConv);
    const conv2 = resolveReplyAction(inputConv);
    assert.deepEqual(conv1, conv2);
  });

  // Service and Evidence Navigation Tests
  test('Service and evidence actions resolve to their canonical destinations', () => {
    const serviceTests = [
      { reply: 'Explore Design Services', href: '/design-services' },
      { reply: 'Web Engineering (/design-services)', href: '/design-services' },
      { reply: 'Explore Advisory Page', href: '/advisory' },
      { reply: 'Tech Advisory (/advisory)', href: '/advisory' },
      { reply: 'Explore Search & Automation', href: '/search-automation' },
      { reply: 'SEO & Growth (/search-automation)', href: '/search-automation' },
      { reply: 'Explore Services', href: '/how-we-work' },
      { reply: 'See How We Work', href: '/how-we-work' },
      { reply: 'See Founder Background', href: '/founder' },
      { reply: 'Inspect BuySecondHandBook E-Commerce Case Study', href: '/evidence/buy-secondhand-book' },
      { reply: 'Inspect Muktibodh Case Study', href: '/evidence/muktibodh' },
      { reply: 'Inspect Dr. Aggarwal Case Study', href: '/evidence/dr-aggarwal' },
      { reply: 'Inspect SattvaOS Case Study', href: '/evidence/sattvaos' },
      { reply: 'Inspect DigiXPro Case Study', href: '/evidence/digixpro' },
      { reply: 'View All Case Studies', href: '/evidence' }
    ];

    for (const { reply, href } of serviceTests) {
      const res = resolveReplyAction(reply);
      assert.equal(res.type, 'link', `"${reply}" must be a link`);
      if (res.type === 'link') {
        assert.equal(res.href, href, `"${reply}" must navigate to ${href}`);
      }
    }
  });
});
