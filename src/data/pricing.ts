/**
 * CANONICAL PUBLIC PRICING DATA — DIGIXPRO INVESTMENT GUIDE
 *
 * Authority Architecture:
 * Every figure in this file represents a DRAFT, founder-reviewable benchmark
 * derived directly from the founder anchor guidance:
 * - Design & Build: Basic ₹40,000–₹70,000 | Standard ₹80,000–₹1,50,000 | Premium ₹2,00,000–₹5,00,000+
 * - Search, AI & Automation (Monthly): Basic ₹15,000–₹30,000/mo | Standard ₹35,000–₹75,000/mo | Premium ₹80,000–₹2,00,000+/mo
 * - Advisory: Basic ₹25,000–₹60,000 | Standard ₹75,000–₹2,00,000 | Premium ₹1,00,000+/mo (custom scope)
 *
 * Tier Renaming:
 * Tiers are uniformly standardized to: Basic / Standard / Premium across all 3 clusters.
 * Advisory cluster tier descriptions strictly use engagement-scope language:
 * (diagnostic session / defined-scope project / ongoing retainer).
 *
 * All tier entries are marked with `isDraft: true` and carry a discrete UI badge on /pricing
 * until individual service numbers are finalized by the founder.
 *
 * Currencies:
 * INR is canonical. Foreign currencies (USD, GBP, AUD, SGD) use fixed reference
 * standards without live FX lookups.
 */

export const CANONICAL_PRICING_SOURCE =
  'DigiXPro Founder Draft Guidance — Indicative Commercial Parameters';

export type PricingCluster = 'advisory' | 'design-build' | 'search-ai-automation' | 'other';
export type PricingUnit = 'one-time' | 'per-month' | 'per-hour' | 'per-project' | 'starting-from';

export interface PricingRange {
  id: string;
  service: string | null;
  cluster: PricingCluster;
  label: string;
  unit: PricingUnit;
  inrMin: number;
  inrMax: number | null;
  usdMin: number;
  usdMax: number | null;
}

export const FIXED_REFERENCE_RATES_INR: Record<'GBP' | 'AUD' | 'SGD', number> = {
  GBP: 105,
  AUD: 55,
  SGD: 62
};

export type DisplayCurrency = 'INR' | 'USD' | 'GBP' | 'AUD' | 'SGD';

export const CURRENCY_SYMBOLS: Record<DisplayCurrency, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  AUD: 'A$',
  SGD: 'S$'
};

/** Rounds a computed foreign-currency amount to a clean display step. */
function roundForDisplay(amount: number): number {
  const step = amount >= 10_000 ? 500 : amount >= 1_000 ? 50 : 10;
  return Math.round(amount / step) * step;
}

/** Deterministically converts a canonical INR amount to GBP/AUD/SGD for display. Never called for INR/USD. */
export function convertInrToForeign(amountInr: number, currency: 'GBP' | 'AUD' | 'SGD'): number {
  const rate = FIXED_REFERENCE_RATES_INR[currency];
  return roundForDisplay(amountInr / rate);
}

/** Formats a plain number with comma grouping (Indian lakh grouping for INR, standard grouping otherwise). */
function formatNumber(amount: number, currency: DisplayCurrency): string {
  if (currency === 'INR') {
    if (amount >= 100_000) {
      const lakh = amount / 100_000;
      const rounded = Math.round(lakh * 100) / 100;
      return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2).replace(/0$/, '')} lakh`;
    }
    return amount.toLocaleString('en-IN');
  }
  return amount.toLocaleString('en-US');
}

/** Returns the display amount (as a number) for a given range/bound/currency, deterministically derived from canonical values. */
export function getDisplayAmount(inrAmount: number, usdAmount: number, currency: DisplayCurrency): number {
  if (currency === 'INR') return inrAmount;
  if (currency === 'USD') return usdAmount;
  return convertInrToForeign(inrAmount, currency);
}

/** Formats one bound (min or max) of a range in the requested display currency, e.g. "₹1.5 lakh" / "$1,800" / "£1,400". */
export function formatBound(inrAmount: number, usdAmount: number, currency: DisplayCurrency): string {
  const amount = getDisplayAmount(inrAmount, usdAmount, currency);
  return `${CURRENCY_SYMBOLS[currency]}${formatNumber(amount, currency)}`;
}

/** Formats a full range ("₹80,000 – ₹1.5 lakh" or "$950 – $1,800") in the requested currency, honoring an open-ended (null max) range. */
export function formatRange(range: PricingRange, currency: DisplayCurrency): string {
  const min = formatBound(range.inrMin, range.usdMin, currency);
  if (range.inrMax === null || range.usdMax === null) {
    return `Starting around ${min}`;
  }
  const max = formatBound(range.inrMax, range.usdMax, currency);
  return `${min} – ${max}`;
}

export const UNIT_SUFFIX: Record<PricingUnit, string> = {
  'one-time': '',
  'per-month': ' / month',
  'per-hour': ' / hour',
  'per-project': ' / project',
  'starting-from': ''
};

/**
 * Fixed, founder-set reference conversion rate for USD (1 USD = 85 INR).
 * Derived from the locked Section 9A rule: fixed, rounded reference values, not live FX.
 */
export const FIXED_USD_RATE_INR = 85;

/**
 * Cluster-differentiated reference ad-hoc / hourly consulting rates (USD-native).
 * Reflects genuine industry specialization and seniority-value differences:
 * 1. Design & Build cluster (6 services): $120 – $200/hour
 * 2. Search, AI & Automation cluster (6 services): $100 – $180/hour
 * 3. Advisory & Leadership cluster (6 services): $150 – $280/hour
 */
export const HOURLY_REFERENCE_DESIGN_BUILD = { min: 120, max: 200 };
export const HOURLY_REFERENCE_SEARCH_AUTOMATION = { min: 100, max: 180 };
export const HOURLY_REFERENCE_ADVISORY = { min: 150, max: 280 };

export const HOURLY_REFERENCE_BY_CLUSTER: Record<PricingCluster, { min: number; max: number }> = {
  'design-build': HOURLY_REFERENCE_DESIGN_BUILD,
  'search-ai-automation': HOURLY_REFERENCE_SEARCH_AUTOMATION,
  'advisory': HOURLY_REFERENCE_ADVISORY,
  'other': HOURLY_REFERENCE_DESIGN_BUILD
};

export interface FormattedHourlyRate {
  primary: string;
  secondary?: string;
  fullDisplay: string;
  minUsd: number;
  maxUsd: number;
}

/**
 * Deterministically formats the cluster-differentiated hourly/ad-hoc reference rate in the requested display currency.
 * Uses the exact locked conversion factor (1 USD = 85 INR).
 */
export function formatHourlyReferenceForCluster(
  cluster: PricingCluster,
  currency: DisplayCurrency
): FormattedHourlyRate {
  const band = HOURLY_REFERENCE_BY_CLUSTER[cluster] || HOURLY_REFERENCE_DESIGN_BUILD;
  const usdLabel = `$${band.min}–$${band.max} / hour`;
  if (currency === 'USD') {
    return {
      primary: `$${band.min} – $${band.max} / hour`,
      fullDisplay: `$${band.min} – $${band.max} / hour`,
      minUsd: band.min,
      maxUsd: band.max
    };
  }

  const minInr = band.min * FIXED_USD_RATE_INR;
  const maxInr = band.max * FIXED_USD_RATE_INR;

  if (currency === 'INR') {
    const inrStr = `₹${minInr.toLocaleString('en-IN')} – ₹${maxInr.toLocaleString('en-IN')} / hour`;
    return {
      primary: inrStr,
      secondary: `≈ ${usdLabel}`,
      fullDisplay: `${inrStr} (≈ ${usdLabel})`,
      minUsd: band.min,
      maxUsd: band.max
    };
  }

  const foreignMin = convertInrToForeign(minInr, currency);
  const foreignMax = convertInrToForeign(maxInr, currency);
  const symbol = CURRENCY_SYMBOLS[currency];
  const foreignStr = `${symbol}${foreignMin.toLocaleString('en-US')} – ${symbol}${foreignMax.toLocaleString('en-US')} / hour`;
  return {
    primary: foreignStr,
    secondary: `≈ ${usdLabel}`,
    fullDisplay: `${foreignStr} (≈ ${usdLabel})`,
    minUsd: band.min,
    maxUsd: band.max
  };
}

/** Backwards-compatible overload allowing optional cluster specification. */
export function formatHourlyReference(
  currency: DisplayCurrency,
  cluster: PricingCluster = 'design-build'
): FormattedHourlyRate {
  return formatHourlyReferenceForCluster(cluster, currency);
}

// ============================================================================
// 18 CANONICAL SERVICES 3-TIER PRICING MATRIX — DIGIXPRO INVESTMENT GUIDE
// ============================================================================

export type PricingTierName = 'Basic' | 'Standard' | 'Premium';

export interface ServiceTier {
  name: PricingTierName;
  tagline: string;
  inrMin: number;
  inrMax: number | null;
  usdMin: number;
  usdMax: number | null;
  unit: PricingUnit;
  deliverables: string[];
  scopeDrivers: string[];
  typicalTimeline: string;
  isDraft?: boolean;
  isPlaceholder?: boolean;
}

export interface CanonicalServicePricing {
  id: string;
  name: string;
  slug: string;
  canonicalUrl: string;
  cluster: PricingCluster;
  clusterNumber: '01' | '02' | '03';
  clusterLabel: string;
  summary: string;
  idealFor: string;
  commercialModel: string;
  tiers: Record<PricingTierName, ServiceTier>;
}

/** Formats a full 3-tier price bracket into the requested currency. */
export function formatTierPrice(tier: ServiceTier, currency: DisplayCurrency): string {
  const min = formatBound(tier.inrMin, tier.usdMin, currency);
  const suffix = UNIT_SUFFIX[tier.unit];
  if (tier.inrMax === null || tier.usdMax === null) {
    return `Starting around ${min}${suffix}`;
  }
  const max = formatBound(tier.inrMax, tier.usdMax, currency);
  return `${min} – ${max}${suffix}`;
}

export const CANONICAL_SERVICES_PRICING: CanonicalServicePricing[] = [
  // ============================================================================
  // CLUSTER 01: DESIGN & BUILD
  // Anchor: Basic ₹40k–₹70k | Standard ₹80k–₹1.5L | Premium ₹2L–₹5L+
  // ============================================================================
  {
    id: 'landing_page',
    name: 'Landing Page & Lead Generation Design',
    slug: 'landing-page-lead-generation',
    canonicalUrl: '/design-services/landing-page-lead-generation',
    cluster: 'design-build',
    clusterNumber: '01',
    clusterLabel: 'Design & Build',
    summary: 'High-conversion, single-objective campaign pages engineered for Google Ads, Meta Ads, and performance marketing campaigns.',
    idealFor: 'Performance marketing teams and founders spending money on ads who need higher enquiry rates and lower customer acquisition costs.',
    commercialModel: 'Milestone-Based Fixed Scope',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Single High-Impact Campaign Landing Page',
        inrMin: 40_000,
        inrMax: 55_000,
        usdMin: 480,
        usdMax: 650,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'High-converting single-objective layout engineered to convert paid ad traffic',
          'Instant mobile page loads (<0.8s on 4G) preventing visitor drop-off before seeing your offer',
          'Instant lead capture connecting form submissions directly to WhatsApp and email alerts',
          'Reliable conversion tracking with Google Tag Manager, GA4 events & ad pixel integrations',
          'Frictionless mobile browsing designed for thumb-reach ergonomics and fast action'
        ],
        scopeDrivers: ['Single core offer / service', 'Brand assets provided', 'Standard lead capture fields'],
        typicalTimeline: '1–2 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Multi-Variant Funnel & A/B Testing',
        inrMin: 60_000,
        inrMax: 95_000,
        usdMin: 700,
        usdMax: 1_120,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Higher conversion across audience segments with up to 3 targeted campaign variants',
          'Pre-qualified high-intent leads using an interactive quiz or cost estimation widget',
          'Zero lead leakage via instant CRM routing and automated SMS / WhatsApp team alerts',
          'Continuous conversion gains with structured A/B split testing and analytics tracking',
          'Actionable visitor behavior insights through full heatmapping and scroll-depth telemetry'
        ],
        scopeDrivers: ['Multiple audience personas', 'Dynamic URL parameter personalization', 'Automated lead distribution'],
        typicalTimeline: '2–3 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'High-Volume Performance Marketing System',
        inrMin: 110_000,
        inrMax: 200_000,
        usdMin: 1_300,
        usdMax: 2_350,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Scalable multi-market reach with programmatic landing pages for localized variations',
          'Clean sales pipelines through automated lead deduplication, spam scoring & fraud filters',
          'Higher ad relevance and Quality Scores via dynamic keyword insertion (DKI) architecture',
          'Seamless sales operations with real-time CRM and multi-stage pipeline synchronization',
          'Compounding conversion gains through dedicated ongoing CRO testing and iteration sprints'
        ],
        scopeDrivers: ['High monthly ad spend (>₹5L/mo)', 'Multi-city or multi-language campaigns', 'Complex sales routing'],
        typicalTimeline: '3–6 weeks'
      }
    }
  },
  {
    id: 'conversion_opt',
    name: 'Website UX & Conversion Optimization',
    slug: 'website-conversion-optimization',
    canonicalUrl: '/design-services/website-conversion-optimization',
    cluster: 'design-build',
    clusterNumber: '01',
    clusterLabel: 'Design & Build',
    summary: 'Data-driven UX refactoring to systematically eliminate friction, accelerate user journeys, and extract more enquiries from existing traffic.',
    idealFor: 'Platforms with healthy visitor volume but disappointing form submission rates or high checkout drop-offs.',
    commercialModel: 'Milestone-Based Fixed Scope',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'UX Friction Audit & Quick Wins',
        inrMin: 45_000,
        inrMax: 65_000,
        usdMin: 530,
        usdMax: 770,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Clear diagnosis of drop-off points through comprehensive heuristic UX & bottleneck analysis',
          'Higher form completion rates via form friction inspection & field minimization blueprint',
          'Smoother mobile interactions with actionable mobile touch target & viewport refactoring report',
          'Prioritized execution roadmap with an actionable engineering recommendations document',
          'Verifiable ROI measurement through before-and-after baseline metrics setup in GA4'
        ],
        scopeDrivers: ['Up to 5 key conversion funnel pages', 'Existing analytics data available', 'Standard lead generation model'],
        typicalTimeline: '2–3 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Comprehensive Conversion Architecture Overhaul',
        inrMin: 75_000,
        inrMax: 130_000,
        usdMin: 900,
        usdMax: 1_550,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Eliminated conversion bottlenecks through end-to-end user journey mapping & heatmaps',
          'Higher user engagement via interactive component redesign and persuasive micro-copy',
          'Immediate performance improvements through direct Next.js codebase refactoring of key funnel pages',
          'Increased enquiry volume using low-friction progressive multi-step lead capture flows',
          'Proven conversion lift verified by 30 days of post-refactor statistical monitoring'
        ],
        scopeDrivers: ['Full site conversion flow (up to 15 pages)', 'Custom interactive steps / calculators', 'Direct codebase implementation'],
        typicalTimeline: '3–5 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Continuous Optimization & Multivariate Testing',
        inrMin: 150_000,
        inrMax: 300_000,
        usdMin: 1_800,
        usdMax: 3_550,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Compounding revenue growth through continuous multivariate A/B experimentation',
          'Deep buyer insight via custom user segment behavioral telemetry & session replay analysis',
          'Maximized transaction value with algorithmic personalization across checkout & lead funnels',
          'Sustained conversion leadership through quarterly UX architecture reviews & sprints',
          'Fast iteration velocity with dedicated conversion engineering support and code deployment'
        ],
        scopeDrivers: ['High-traffic platforms (>100k visitors/mo)', 'Complex multi-product or SaaS journeys', 'Ongoing optimization cadence'],
        typicalTimeline: '6–10 weeks'
      }
    }
  },
  {
    id: 'seo_ready',
    name: 'SEO-Ready Website Engineering',
    slug: 'seo-ready-website-engineering',
    canonicalUrl: '/design-services/seo-ready-website-engineering',
    cluster: 'design-build',
    clusterNumber: '01',
    clusterLabel: 'Design & Build',
    summary: 'Building production web architecture with 100% technical SEO compliance, semantic JSON-LD entity graphs, OpenGraph protocols, and sub-second crawlability.',
    idealFor: 'New brand launches and ground-up builds requiring perfect search engine indexability from day one.',
    commercialModel: 'Milestone-Based Fixed Scope',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Technical Foundation & Core Schema',
        inrMin: 45_000,
        inrMax: 70_000,
        usdMin: 530,
        usdMax: 820,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Effortless search engine indexing through clean semantic HTML5 hierarchy (single H1, structured H2/H3)',
          'Complete crawl coverage with automated dynamic XML sitemap & robots.txt generation',
          'Enhanced brand visibility in search via foundational Organization & WebSite JSON-LD schemas',
          'Professional social sharing previews with automated OpenGraph & Twitter card metadata',
          'Audited technical excellence targeting 100/100 Lighthouse SEO compliance'
        ],
        scopeDrivers: ['Standard business website (<15 pages)', 'Standard structured data needs', 'Included standard in custom builds'],
        typicalTimeline: '2–3 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Advanced Entity Graphs & Rich Snippets',
        inrMin: 80_000,
        inrMax: 140_000,
        usdMin: 950,
        usdMax: 1_650,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Rich snippet search eligibility powered by comprehensive multi-entity schema graphs (Service, FAQPage, BreadcrumbList)',
          'Search ranking protection across URL parameters through automated canonical link enforcement',
          'Clear site navigation and search breadcrumbs with semantic BreadcrumbList schema',
          'Top-tier Core Web Vitals rankings through aggressive asset tuning (LCP < 1.2s, stable CLS, fast INP)',
          'Compounding page authority via programmatic hub-and-spoke internal linking architecture'
        ],
        scopeDrivers: ['Content-heavy platform (15–50 pages)', 'Rich snippet eligibility target', 'Complex service taxonomies'],
        typicalTimeline: '3–5 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Programmatic SEO & AI Search Integration',
        inrMin: 160_000,
        inrMax: 320_000,
        usdMin: 1_900,
        usdMax: 3_800,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Exponential keyword coverage using programmatic SEO dynamic template architecture',
          'AI search engine discoverability through llms.txt endpoints and machine-readable context',
          'Targeted international search positioning with multi-region hreflang & localized schema',
          'Continuous indexation protection via automated edge-rendered schema validation in CI/CD',
          'Efficient search spider indexing of deep catalogues through enterprise crawl budget optimization'
        ],
        scopeDrivers: ['Hundreds of programmatic URLs', 'Multi-language / multi-country expansion', 'Continuous CI/CD automated SEO checks'],
        typicalTimeline: '5–8 weeks'
      }
    }
  },
  {
    id: 'small_business',
    name: 'Small Business & Service Business Websites',
    slug: 'small-business-service-business-websites',
    canonicalUrl: '/design-services/small-business-service-business-websites',
    cluster: 'design-build',
    clusterNumber: '01',
    clusterLabel: 'Design & Build',
    summary: 'Turnkey, high-performance web architecture engineered for local clinics, professional practices, and high-trust service providers.',
    idealFor: 'Medical clinics, legal practices, consulting firms, and specialized local contractors needing instant credibility.',
    commercialModel: 'Milestone-Based Fixed Scope',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Turnkey Core Presence',
        inrMin: 50_000,
        inrMax: 70_000,
        usdMin: 600,
        usdMax: 820,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Professional commercial web presence with up to 5 custom-designed responsive service pages',
          'Sub-second mobile loading speeds engineered with Next.js static site generation',
          'Instant client communication via direct WhatsApp click-to-chat and email enquiry webhooks',
          'Local search eligibility enabled by structured LocalBusiness and MedicalClinic schema markup',
          'Verified top-tier speed and crawlability targeting 100/100 Lighthouse SEO and Core Web Vitals'
        ],
        scopeDrivers: ['Single physical clinic/office location', 'Fixed brand assets provided', 'Standard enquiry capture'],
        typicalTimeline: '3–4 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Multi-Service Conversion Engine',
        inrMin: 80_000,
        inrMax: 150_000,
        usdMin: 950,
        usdMax: 1_800,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Expanded market reach across service lines with up to 12 dedicated responsive pages',
          'Hands-free client scheduling with automated appointment booking calendar integration',
          'Dominant local search visibility through localized schema and Google Business Profile alignment',
          'Higher conversion rates via interactive lead qualification forms with instant dispatch',
          'Full source-code repository handover with no proprietary dependency'
        ],
        scopeDrivers: ['Multiple distinct service categories', 'Automated scheduling integration', 'Custom UI component tokens'],
        typicalTimeline: '4–6 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Multi-Branch Clinic / Regional Network',
        inrMin: 180_000,
        inrMax: 350_000,
        usdMin: 2_150,
        usdMax: 4_150,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Seamless multi-city operations with multi-location branch network architecture',
          'Streamlined administrative operations through custom patient/client intake workflows and logic',
          'Unified executive visibility with centralized analytics and custom CRM / ERP webhook pipelines',
          'Eliminated booking conflicts with multi-practitioner calendar synchronization',
          'Operational peace of mind through priority post-launch support and staff handover training'
        ],
        scopeDrivers: ['Multiple physical branches', 'Custom CRM / database integration', 'High appointment concurrency'],
        typicalTimeline: '6–10 weeks'
      }
    }
  },
  {
    id: 'redesign',
    name: 'Website Redesign & SEO-Safe Rebuild',
    slug: 'website-redesign',
    canonicalUrl: '/design-services/website-redesign',
    cluster: 'design-build',
    clusterNumber: '01',
    clusterLabel: 'Design & Build',
    summary: 'Upgrading legacy WordPress, Drupal, or PHP sites to modern Next.js while safeguarding organic search rankings and backlink equity.',
    idealFor: 'Established websites with valuable search rankings that cannot afford a post-redesign traffic collapse.',
    commercialModel: 'Milestone-Based Fixed Scope',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Ranking-Preservation Core Migration',
        inrMin: 55_000,
        inrMax: 70_000,
        usdMin: 650,
        usdMax: 820,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Protected search equity via comprehensive crawl audit of your existing URL taxonomy',
          'Zero broken links and preserved rankings with 1:1 permanent 301 redirect mapping',
          'Dramatically faster customer experience leaping from sluggish ~30 to 95+ mobile PageSpeed',
          'Seamless ranking continuity through complete metadata & structured data schema transfer',
          'Post-cutover ranking security via 48-hour real-time Google Search Console index monitoring'
        ],
        scopeDrivers: ['Under 50 indexed legacy URLs', 'Clean existing taxonomy', 'Straightforward content migration'],
        typicalTimeline: '3–5 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Full Architectural & Brand Modernization',
        inrMin: 90_000,
        inrMax: 150_000,
        usdMin: 1_060,
        usdMax: 1_800,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Modern, high-trust brand perception with complete UI/UX redesign and modular design system',
          'Safe migration of up to 250 legacy URLs with complete query parameter preservation',
          'Organic growth opportunities identified via historical ranking benchmarking & content gap analysis',
          'Effortless content publishing without developer bottlenecks via modern headless CMS integration',
          'Planned DNS cutover with staging and rollback validation'
        ],
        scopeDrivers: ['50–250 indexed legacy URLs', 'Complete visual rebrand', 'Dynamic database migration'],
        typicalTimeline: '5–8 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Complex High-Volume Legacy Migration',
        inrMin: 200_000,
        inrMax: 450_000,
        usdMin: 2_350,
        usdMax: 5_300,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Safeguarded enterprise search equity with algorithmic redirect routing for 1,000+ complex URLs',
          'Flawless historical data preservation via custom database migration scripts and validation',
          'Unified brand authority through multi-domain consolidation and international SEO preservation',
          'Minimized migration risk using staged parallel rollouts with canary testing protocols',
          'Guarded organic revenue with 3 months of post-launch ranking telemetry and traffic monitoring'
        ],
        scopeDrivers: ['1,000+ URLs', 'High daily organic traffic (>50k visits/mo)', 'Complex eCommerce or user accounts'],
        typicalTimeline: '8–12 weeks'
      }
    }
  },
  {
    id: 'website',
    name: 'Custom Business Website Design & Development',
    slug: 'custom-business-website-design',
    canonicalUrl: '/design-services/custom-business-website-design',
    cluster: 'design-build',
    clusterNumber: '01',
    clusterLabel: 'Design & Build',
    summary: 'Enterprise-grade bespoke Next.js web applications engineered for sub-second performance, hardened architecture eliminating CMS plugin vulnerabilities, and long-term brand authority.',
    idealFor: 'Scaling B2B companies, tech startups, and established enterprises replacing fragile monolithic CMS platforms.',
    commercialModel: 'Milestone-Based Fixed Scope',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Bespoke Corporate Platform',
        inrMin: 60_000,
        inrMax: 70_000,
        usdMin: 700,
        usdMax: 820,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Distinctive, high-authority brand aesthetics with bespoke Next.js and Tailwind design tokens',
          'Tailored digital customer experience with up to 8 bespoke responsive page templates',
          'Flexible editorial workflows without code updates via modern headless CMS integration',
          'Maximized search engine comprehension through rich JSON-LD semantic entity graphs',
          'Full source-code repository handover with no proprietary dependency or plugin vulnerabilities'
        ],
        scopeDrivers: ['Custom UI design tokens', 'Content migration from legacy site', 'Structured blogging & case studies'],
        typicalTimeline: '4–6 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Advanced Interactive Web Application',
        inrMin: 100_000,
        inrMax: 150_000,
        usdMin: 1_180,
        usdMax: 1_800,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Higher visitor engagement and qualified leads through custom interactive calculators and configurators',
          'Secure user portals and customer dashboards backed by structured PostgreSQL data models',
          'Higher lead quality using multi-step qualification funnels with intelligent branching',
          'Automated sales pipeline sync connecting your website forms to CRM via custom n8n webhooks',
          'Sub-second global page loads using edge caching, automated page revalidation & global CDN'
        ],
        scopeDrivers: ['Custom dynamic logic & state management', 'User authentication & dashboard', 'Multi-channel automated pipelines'],
        typicalTimeline: '6–8 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'High-Throughput Global Enterprise Architecture',
        inrMin: 200_000,
        inrMax: 500_000,
        usdMin: 2_350,
        usdMax: 5_900,
        unit: 'one-time',
        isDraft: true,
        deliverables: [
          'Near-zero global latency for high-traffic platforms via multi-region edge deployment',
          'Enterprise-grade access security with role-based access control (RBAC) & SSO integration',
          'Seamless integration of core business systems using custom API gateways & microservices orchestration',
          'Hardened institutional security verified through compliance reviews & penetration testing',
          'Mission-critical reliability backed by dedicated engineering SLAs & 24/7 monitoring'
        ],
        scopeDrivers: ['Global edge latency requirements', 'Strict enterprise security audits', 'Complex legacy ERP data sync'],
        typicalTimeline: '8–14 weeks'
      }
    }
  },

  // ============================================================================
  // CLUSTER 02: SEARCH, AI & AUTOMATION (MONTHLY RETAINER FRAMING)
  // Anchor: Basic ₹15k–₹30k/mo | Standard ₹35k–₹75k/mo | Premium ₹80k–₹2L+/mo
  // ============================================================================
  {
    id: 'local_seo',
    name: 'Local SEO & Local Lead Visibility',
    slug: 'local-seo-lead-visibility',
    canonicalUrl: '/search-automation/local-seo-lead-visibility',
    cluster: 'search-ai-automation',
    clusterNumber: '02',
    clusterLabel: 'Search, AI & Automation',
    summary: 'Dominating Google Map Pack (3-Pack) rankings and localized search queries to capture high-intent local buyers.',
    idealFor: 'Physical diagnostic centres, healthcare clinics, legal firms, and local service businesses dependent on nearby customer calls.',
    commercialModel: 'Monthly Performance Engineering',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Single-Location Google Map Pack Authority',
        inrMin: 15_000,
        inrMax: 25_000,
        usdMin: 180,
        usdMax: 300,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Dominant local search presence through complete Google Business Profile (GBP) optimization',
          'Higher local search credibility via systematic NAP (Name, Address, Phone) citation cleanup',
          'Direct local query matching enabled by rich LocalBusiness and MedicalClinic schema markup',
          'Steady stream of 5-star patient/client reviews with a structured collection and response protocol',
          'Transparent performance visibility with monthly geogrid Map Pack ranking reports'
        ],
        scopeDrivers: ['Single physical business location', 'Local metro area target', 'Standard category competition'],
        typicalTimeline: 'Monthly ongoing (3-month initial sprint)'
      },
      Standard: {
        name: 'Standard',
        tagline: 'High-Competition Local Market Dominance',
        inrMin: 30_000,
        inrMax: 50_000,
        usdMin: 350,
        usdMax: 600,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Expanded local catchment area through geo-targeted localized landing pages with schema',
          'Strong local domain authority built via curated community citations and business directories',
          'High engagement and algorithmic freshness with weekly GBP posts, photo updates, and Q&A optimization',
          'Outrank local competitors by analyzing review sentiment and systematically closing citation gaps',
          'Clear ROI accountability through precise call and enquiry attribution tracking'
        ],
        scopeDrivers: ['High-density metropolitan market', 'Competitive healthcare / legal / service sector', 'Up to 3 nearby micro-markets'],
        typicalTimeline: 'Monthly ongoing (6-month sprint)'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Multi-Location Regional Branch Network',
        inrMin: 60_000,
        inrMax: 120_000,
        usdMin: 700,
        usdMax: 1_400,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Unified local dominance across all branches with centralized multi-location GBP management',
          'Effortless reputation growth through automated review collection integrated with your CRM',
          'Scalable local search expansion via programmatic branch page architecture',
          'Regional market authority built through cross-location search equity and entity syndication',
          'Fast strategic execution with a dedicated senior local search strategist'
        ],
        scopeDrivers: ['5 or more physical branches', 'Multi-city presence', 'Complex local operational hierarchy'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  },
  {
    id: 'seo',
    name: 'SEO & Search Visibility',
    slug: 'seo-search-visibility',
    canonicalUrl: '/search-automation/seo-search-visibility',
    cluster: 'search-ai-automation',
    clusterNumber: '02',
    clusterLabel: 'Search, AI & Automation',
    summary: 'Comprehensive technical SEO, high-authority content architecture, and ethical organic search positioning.',
    idealFor: 'Businesses seeking sustainable, compounding customer discovery without escalating ad costs.',
    commercialModel: 'Monthly Performance Engineering',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Focused Single-Vertical Search Authority',
        inrMin: 20_000,
        inrMax: 30_000,
        usdMin: 240,
        usdMax: 350,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Protected organic traffic through continuous technical crawl health monitoring & indexation fixes',
          'High-intent buyer discovery driven by keyword intent research and competitor gap analysis',
          'Compounding organic authority with 2 fact-dense, high-ranking technical content assets per month',
          'Maximized page authority distribution via internal linking optimization & semantic schema',
          'Clear ROI visibility through monthly executive ranking and organic revenue attribution reports'
        ],
        scopeDrivers: ['Single regional service market', 'Low-to-moderate competition vertical', 'Standard website footprint'],
        typicalTimeline: 'Monthly ongoing (3-month initial sprint)'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Multi-Category Competitive Organic Growth',
        inrMin: 35_000,
        inrMax: 70_000,
        usdMin: 410,
        usdMax: 820,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Superior search indexation and speed rankings through deep technical Core Web Vitals & schema tuning',
          'Category search dominance with 4 comprehensive pillar and cluster content assets per month',
          'Authoritative domain trust built through white-hat digital PR and editorial brand citations',
          'Accelerated ranking velocity using automated, context-aware internal linking structures',
          'Data-driven campaign steering via bi-weekly ranking telemetry and commercial conversion tracking'
        ],
        scopeDrivers: ['High-competition industry vertical', 'National organic scope', 'Active competitor content campaigns'],
        typicalTimeline: 'Monthly ongoing (6-month commitment)'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Market Dominance & National Search Authority',
        inrMin: 80_000,
        inrMax: 180_000,
        usdMin: 950,
        usdMax: 2_120,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Aggressive market capture powered by a dedicated senior SEO engineering sprint team',
          'Global customer acquisition through multi-regional and international keyword positioning',
          'Exponential search footprint scale with custom programmatic content generation pipelines',
          'Top-tier brand authority through high-impact digital PR and executive thought leadership syndication',
          'Board-level revenue visibility with weekly strategy steering and pipeline attribution modeling'
        ],
        scopeDrivers: ['Multi-state or global organic footprint', 'Extensive content catalog (100+ pages)', 'Aggressive enterprise competitors'],
        typicalTimeline: 'Monthly ongoing (12-month strategic roadmap)'
      }
    }
  },
  {
    id: 'crm_automation',
    name: 'Lead Capture, CRM & Sales Automation',
    slug: 'lead-capture-crm-sales-automation',
    canonicalUrl: '/search-automation/lead-capture-crm-sales-automation',
    cluster: 'search-ai-automation',
    clusterNumber: '02',
    clusterLabel: 'Search, AI & Automation',
    summary: 'Near-instant lead routing: connecting website enquiry forms directly to WhatsApp alerts, CRM pipelines, and automated team assignments.',
    idealFor: 'Sales teams and reception desks where 5-minute lead response time directly multiplies closing rates.',
    commercialModel: 'Monthly Performance Engineering',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Instant Alert & Lead Routing Pipeline',
        inrMin: 18_000,
        inrMax: 30_000,
        usdMin: 210,
        usdMax: 350,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Instant enquiry response (<30 seconds) connecting website forms directly to WhatsApp team alerts',
          'Eliminated manual data entry via automatic lead insertion into HubSpot, Zoho, or Supabase',
          'Higher prospect engagement with instant personalized email and WhatsApp confirmations',
          'Clean sales pipelines protected by Cloudflare Turnstile automated spam prevention',
          'Zero dropped leads ensured by continuous webhook health monitoring and monthly maintenance'
        ],
        scopeDrivers: ['Single website form', 'Standard CRM destination', 'Direct WhatsApp notification'],
        typicalTimeline: 'Monthly ongoing'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Automated Lead Qualification & Round-Robin Routing',
        inrMin: 35_000,
        inrMax: 65_000,
        usdMin: 410,
        usdMax: 760,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Higher lead conversion rates with multi-step interactive qualification funnel maintenance',
          'Faster deal velocity through automated round-robin sales rep assignment by territory and service',
          'Maximized enquiry closing rates via automated multi-touch email and WhatsApp follow-up sequences',
          'Prioritize high-value prospects with automated lead scoring and company domain enrichment',
          'Actionable executive clarity through real-time sales velocity and conversion dashboards'
        ],
        scopeDrivers: ['Multiple sales reps / teams', 'Conditional lead qualification logic', 'Multi-stage automated follow-ups'],
        typicalTimeline: 'Monthly ongoing'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Enterprise Omni-Channel Revenue Engine',
        inrMin: 75_000,
        inrMax: 150_000,
        usdMin: 880,
        usdMax: 1_760,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Capture every inbound prospect across website, WhatsApp, ad channels, and telephony',
          'Unified operational records with bi-directional synchronization to enterprise ERP and core systems',
          'High-velocity sales responsiveness using custom sales cadence automation and SLA tracking',
          '24/7 instant lead qualification powered by voice AI reception and interactive IVR routing',
          'Continuous revenue gains with dedicated engineering support and ongoing funnel optimization'
        ],
        scopeDrivers: ['Multiple lead sources & branches', 'Complex enterprise sales cycles', 'Custom telephony / voice integration'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  },
  {
    id: 'social_media',
    name: 'Social Media Management & Content Systems',
    slug: 'social-media-management',
    canonicalUrl: '/search-automation/social-media-management',
    cluster: 'search-ai-automation',
    clusterNumber: '02',
    clusterLabel: 'Search, AI & Automation',
    summary: 'Systematic, brand-aligned creative design systems, multi-platform collateral, and content scheduling architectures.',
    idealFor: 'Founders and corporate leaders needing consistent, high-credibility brand presence across LinkedIn, X, and Meta.',
    commercialModel: 'Monthly Performance Engineering',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Executive Thought Leadership Presence',
        inrMin: 20_000,
        inrMax: 30_000,
        usdMin: 240,
        usdMax: 350,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Consistent visual authority with bespoke brand design templates in Figma and Canva',
          'Sustained executive presence with 10 fact-dense, authoritative posts per month on LinkedIn and X',
          'Higher industry credibility using professional copywriting highlighting real client results',
          'Stress-free publishing with an organized monthly content calendar and automated queue',
          'Actionable audience insights through monthly engagement and audience growth analytics'
        ],
        scopeDrivers: ['Single primary platform (e.g. LinkedIn)', 'Founder/executive personal brand', 'Organic focus'],
        typicalTimeline: 'Monthly ongoing'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Multi-Channel Brand Content Machine',
        inrMin: 35_000,
        inrMax: 70_000,
        usdMin: 410,
        usdMax: 820,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Elevated visual brand perception with 20 custom visual assets per month (carousels, infographics, banners)',
          'Expanded commercial reach through synchronized distribution across LinkedIn, X, and Instagram',
          'Deep domain authority established via long-form technical thought leadership articles and repurposing',
          'Flawless publishing consistency powered by custom n8n automated scheduling pipelines',
          'Stronger prospect relationships through active daily community engagement and response moderation'
        ],
        scopeDrivers: ['Multiple corporate channels', 'Rich graphic & carousel asset production', 'Bi-weekly strategy check-ins'],
        typicalTimeline: 'Monthly ongoing'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Full-Spectrum Creative & Campaign Studio',
        inrMin: 80_000,
        inrMax: 175_000,
        usdMin: 950,
        usdMax: 2_060,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Dominant industry mindshare with daily publishing across all corporate social channels',
          'Higher viral reach and engagement through short-form video scripts and motion graphic animations',
          'Established founder and executive authority with tailored ghostwriting for key leaders',
          'Maximized product and milestone visibility with coordinated campaign launch and PR collateral',
          'Agency-grade creative execution backed by a dedicated creative director and specialized copywriter'
        ],
        scopeDrivers: ['Daily multi-channel publishing', 'Executive team ghostwriting', 'High-production multimedia assets'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  },
  {
    id: 'geo',
    name: 'AI Search Optimization & GEO',
    slug: 'ai-search-optimization-geo',
    canonicalUrl: '/search-automation/ai-search-optimization-geo',
    cluster: 'search-ai-automation',
    clusterNumber: '02',
    clusterLabel: 'Search, AI & Automation',
    summary: 'Generative Engine Optimization (GEO) ensuring your business is recommended and accurately cited by ChatGPT, Claude, Perplexity, and Gemini.',
    idealFor: 'Modern businesses whose potential clients ask AI search engines for vendor recommendations.',
    commercialModel: 'Monthly Performance Engineering',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'AI Search Diagnostic & Entity Plumbing',
        inrMin: 25_000,
        inrMax: 30_000,
        usdMin: 300,
        usdMax: 350,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Clear baseline visibility of your brand citations across ChatGPT, Claude, Perplexity, and Gemini',
          'Accurate AI comprehension with entity disambiguation and machine-readable JSON-LD schema graphs',
          'Seamless LLM crawler access via standardized llms.txt endpoints',
          'Authoritative entity standing through knowledge graph alignment and structured data validation',
          'Track your AI share-of-voice with monthly generative engine recommendation and citation reports'
        ],
        scopeDrivers: ['Single brand entity', 'Correction of AI hallucinations', 'Foundational entity establishing'],
        typicalTimeline: 'Monthly ongoing (3-month sprint)'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Authoritative AI Citation Engineering',
        inrMin: 40_000,
        inrMax: 75_000,
        usdMin: 470,
        usdMax: 880,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Authoritative AI recommendations engineered by placing citations across trusted industry datasets',
          'Win conversational AI searches with fact-dense structured comparison and pricing content',
          'Consistently cited as the preferred provider on Perplexity and ChatGPT Search',
          'Protect brand reputation by mitigating obsolete training data and incorrect AI hallucinations',
          'Optimized server responses and indexing for GPTBot, ClaudeBot, and Google-Extended crawlers'
        ],
        scopeDrivers: ['Competitive industry with high AI search adoption', 'Need for frequent prompt-based citations', 'Multi-product authority'],
        typicalTimeline: 'Monthly ongoing (6-month sprint)'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Enterprise Generative Authority & AI Ecosystem Defense',
        inrMin: 80_000,
        inrMax: 160_000,
        usdMin: 950,
        usdMax: 1_880,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Enterprise-wide AI dominance across business units with unified brand entity graphs',
          'Uncover and capture buyer query variations using synthetic prompt matrix evaluations',
          'Long-term AI citation lock-in through syndicated placement in high-authority data repositories',
          'Continuous brand defense via real-time hallucination detection and correction protocols',
          'Strategic leadership advantage through regular briefings on generative search shifts and algorithm changes'
        ],
        scopeDrivers: ['Multi-subsidiary corporate brand', 'Global enterprise footprint', 'High-stakes B2B brand reputation'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  },
  {
    id: 'ai_automation',
    name: 'Workflow & AI Automation',
    slug: 'workflow-ai-automation',
    canonicalUrl: '/search-automation/workflow-ai-automation',
    cluster: 'search-ai-automation',
    clusterNumber: '02',
    clusterLabel: 'Search, AI & Automation',
    summary: 'Engineering self-hosted n8n pipelines, webhook integrations, document parsing engines, and intelligent operational automations.',
    idealFor: 'Businesses drowning in manual data transfers, repetitive spreadsheet updates, and disconnected SaaS applications.',
    commercialModel: 'Monthly Performance Engineering',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Core Workflow Automation & Monitoring',
        inrMin: 25_000,
        inrMax: 30_000,
        usdMin: 300,
        usdMax: 350,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Zero per-task SaaS fees by hosting and maintaining dedicated n8n automation instances',
          'Eliminated manual data entry across up to 3 core pipelines (e.g. Lead → CRM → WhatsApp)',
          'Reliable data delivery with automated error logging, retries, and instant team alerts',
          'Complete workflow independence with no recurring third-party platform licensing markups',
          'Uninterrupted operational flow through continuous workflow telemetry and health checks'
        ],
        scopeDrivers: ['Standard REST APIs', 'Linear workflow logic', 'Single database or CRM destination'],
        typicalTimeline: 'Monthly ongoing'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Intelligent AI Document & Operational Pipeline',
        inrMin: 45_000,
        inrMax: 75_000,
        usdMin: 530,
        usdMax: 880,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Automated operational handoffs with up to 8 complex multi-branch conditional workflows',
          'Instant document processing with AI extraction from PDF invoices, contracts, and receipts',
          'Clean, accurate business records through bi-directional database sync and automated deduplication',
          'Enterprise data privacy ensured with HMAC authentication, webhook verification, and encryption',
          'Complete workflow visibility via real-time operational telemetry and incident dashboards'
        ],
        scopeDrivers: ['AI LLM integration (OpenAI/Claude parsing)', 'Complex multi-step branching logic', 'Legacy software API wrappers'],
        typicalTimeline: 'Monthly ongoing'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Enterprise Operational Architecture & Agentic Swarms',
        inrMin: 80_000,
        inrMax: 200_000,
        usdMin: 950,
        usdMax: 2_350,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Industrial transaction scale powered by distributed n8n clusters with dedicated queue workers',
          'Autonomous operational execution using supervised AI agents for end-to-end tasks',
          'Modernized legacy systems with custom API connectors for proprietary ERPs and mainframes',
          'Institutional compliance assured with complete audit logging and verified data residency controls',
          'Rapid automation scaling backed by a dedicated engineering retainer for continuous pipeline buildout'
        ],
        scopeDrivers: ['High transaction volumes (>100k events/mo)', 'Strict enterprise security & data privacy', 'Custom middleware development'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  },

  // ============================================================================
  // CLUSTER 03: ADVISORY & LEADERSHIP
  // Anchor: Basic ₹25k–₹60k | Standard ₹75k–₹2L | Premium ₹1L+/mo (custom scope)
  // Phrasing: diagnostic session / defined-scope project / ongoing retainer
  // ============================================================================
  {
    id: 'tech_roadmaps',
    name: 'Technology Roadmaps & Architecture',
    slug: 'technology-roadmaps-architecture',
    canonicalUrl: '/advisory/technology-roadmaps-architecture',
    cluster: 'advisory',
    clusterNumber: '03',
    clusterLabel: 'Advisory',
    summary: 'Multi-quarter architectural blueprints and milestone roadmaps for scaling software systems without incurring paralyzing technical debt.',
    idealFor: 'CTOs, VP of Engineering, and founders architecting their platform for 5x–10x traffic and user growth.',
    commercialModel: 'Defined-Scope Architectural Project',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Diagnostic Session · Strategic Architecture Evaluation',
        inrMin: 25_000,
        inrMax: 50_000,
        usdMin: 300,
        usdMax: 600,
        unit: 'per-project',
        deliverables: [
          'Pinpoint system bottlenecks through a diagnostic session evaluating infrastructure scalability',
          'Clear engineering direction with a high-level 12-month architectural milestone roadmap',
          'Informed technology choices via independent stack evaluation & modernization blueprints',
          'Accelerated database throughput through an indexing, caching & query optimization strategy memo',
          'Executive clarity on retiring technical debt presented directly to leadership'
        ],
        scopeDrivers: ['Single core web/mobile application', 'Anticipating 2x–3x growth in 12 months', 'Targeted architectural blueprint'],
        typicalTimeline: '1–2 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Defined-Scope Project · Multi-Quarter Architecture Blueprint',
        inrMin: 75_000,
        inrMax: 150_000,
        usdMin: 880,
        usdMax: 1_760,
        unit: 'per-project',
        deliverables: [
          'Sustainable multi-year scaling with a defined-scope project delivering a 24-month technology roadmap',
          'Avoid architectural dead-ends with a tailored microservices vs. modular monolith decoupling strategy',
          'Faster deployment velocity through an automated CI/CD testing & deployment pipeline blueprint',
          'Substantial hosting savings via cloud cost optimization & reserved capacity modeling',
          'Continuous alignment ensured through quarterly architectural review checkpoints'
        ],
        scopeDrivers: ['Multiple integrated platforms', 'Anticipating 5x–10x growth', 'Cloud spend optimization requirement'],
        typicalTimeline: '3–5 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Defined-Scope Project · Enterprise Multi-Year Roadmap & Architecture Blueprint',
        inrMin: 180_000,
        inrMax: 350_000,
        usdMin: 2_100,
        usdMax: 4_100,
        unit: 'per-project',
        deliverables: [
          'Enterprise market readiness with a defined-scope project delivering a multi-year architectural blueprint',
          'Resilient data infrastructure specified for event-driven streaming, data lakes & multi-region failover',
          'Protected procurement budgets through RFP technical contract design & vendor evaluation blueprints',
          'Uncompromised business continuity with sub-minute RPO/RTO disaster recovery & compliance architecture',
          'Investor and board confidence secured through direct technical presentations on engineering runway'
        ],
        scopeDrivers: ['Millions of monthly active users / transactions', 'Multi-region compliance & data residency', 'Enterprise vendor RFP execution'],
        typicalTimeline: '6–10 weeks'
      }
    }
  },
  {
    id: 'systems_arch',
    name: 'Business Systems & Process Architecture',
    slug: 'business-systems-process-architecture',
    canonicalUrl: '/advisory/business-systems-process-architecture',
    cluster: 'advisory',
    clusterNumber: '03',
    clusterLabel: 'Advisory',
    summary: 'Designing custom business operating systems and domain schemas that eliminate WhatsApp chaos and spreadsheet fragmentation.',
    idealFor: 'Scaling businesses that have outgrown Excel and off-the-shelf SaaS, needing a unified operational core.',
    commercialModel: 'Independent Advisory Retainer',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Diagnostic Session · Process Bottleneck & Systems Evaluation',
        inrMin: 30_000,
        inrMax: 60_000,
        usdMin: 350,
        usdMax: 700,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Clarity on business data flows through a diagnostic session mapping core entities (Clients, Orders, Tasks)',
          'Eliminated communication bottlenecks with visual process flow diagrams and root-cause analysis',
          'Solid technical foundation with clean PostgreSQL / Supabase database schema contract specifications',
          'Clear build blueprint provided in an actionable Custom Operating System architectural memo',
          'De-risked software execution ready for tender to internal or external developers'
        ],
        scopeDrivers: ['Single core business workflow', 'Clear domain rules', 'Architectural specification only'],
        typicalTimeline: '2–3 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Defined-Scope Project · Systems Integration Blueprint & Contract Specs',
        inrMin: 75_000,
        inrMax: 180_000,
        usdMin: 880,
        usdMax: 2_120,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Unified operational control through a defined-scope project engineering your custom business OS architecture',
          'Secure departmental collaboration with multi-entity domain schemas and role-based access control (RBAC)',
          'Decoupled real-time system synchronization specified with event-driven webhooks and message buses',
          'Fixed development accountability using comprehensive developer RFP contracts and milestone acceptance criteria',
          'Rigorous code quality assured through independent technical review and sign-off on developer deliverables'
        ],
        scopeDrivers: ['Multiple intersecting business processes', 'Inventory, billing & CRM integration', 'Engineering supervision of implementation'],
        typicalTimeline: '4–6 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Defined-Scope Project · Enterprise Multi-Domain Platform Architecture',
        inrMin: 180_000,
        inrMax: 350_000,
        usdMin: 2_120,
        usdMax: 4_120,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Seamless enterprise scalability with clear domain boundary contracts and microservices architecture',
          'High-volume transaction resilience specified with Kafka, Redis, or RabbitMQ message queue architectures',
          'Institutional data governance and compliance assured by zero-trust architecture and audit logging',
          'Robust data preservation engineered through multi-region replication and high-availability topologies',
          'Flawless engineering execution backed by continuous architectural governance throughout rollout'
        ],
        scopeDrivers: ['Enterprise scale (>1,000 internal users/agents)', 'High transaction concurrency', 'Mission-critical reliability requirements'],
        typicalTimeline: '6–10 weeks'
      }
    }
  },
  {
    id: 'digital_trans',
    name: 'Digital Transformation Consulting',
    slug: 'digital-transformation-consulting',
    canonicalUrl: '/advisory/digital-transformation-consulting',
    cluster: 'advisory',
    clusterNumber: '03',
    clusterLabel: 'Advisory',
    summary: 'Guiding traditional businesses through paperless automation, cloud modernization, and operational software adoption.',
    idealFor: 'Established healthcare, manufacturing, and traditional service firms modernizing away from spreadsheet and paper bottlenecks.',
    commercialModel: 'Independent Advisory Retainer',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Diagnostic Session · Digital Maturity & Friction Audit',
        inrMin: 30_000,
        inrMax: 60_000,
        usdMin: 350,
        usdMax: 700,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Targeted transformation priorities identified through a diagnostic session auditing workflow bottlenecks',
          'Accelerated staff velocity by identifying and eliminating high-friction manual data entry points',
          'Reduced software bloat with an objective cloud stack evaluation and consolidation plan',
          'Predictable rollout roadmap outlined in a phase-by-phase Digital Transformation Blueprint memo',
          'Board and executive alignment achieved with a clear ROI projection and transformation presentation'
        ],
        scopeDrivers: ['Single facility or department', 'Up to 3 operational workflows', 'Clear leadership sponsor'],
        typicalTimeline: '2–3 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Defined-Scope Project · Phase-Wise Operational Modernization Blueprint',
        inrMin: 80_000,
        inrMax: 200_000,
        usdMin: 940,
        usdMax: 2_350,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Paperless operational efficiency delivered through a defined-scope project digitizing core journeys',
          'Frictionless tooling adoption with objective selection and architectural integration of modern cloud tools',
          'High employee adoption assured by structured change management protocols and clear SOP documentation',
          'Historical data preserved with automated data migration specifications from legacy spreadsheets',
          'On-time milestone delivery ensured through bi-weekly implementation governance and reviews'
        ],
        scopeDrivers: ['Multiple operational departments', '50+ team members affected', 'Data migration from manual records'],
        typicalTimeline: '4–8 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Defined-Scope / Retainer · Enterprise Digital Core Overhaul',
        inrMin: 200_000,
        inrMax: 400_000,
        usdMin: 2_350,
        usdMax: 4_700,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Transformative business agility achieved through a comprehensive enterprise operating model redesign',
          'De-risked infrastructure modernization with a planned legacy-to-cloud migration strategy',
          'Unified core data flows specified via an enterprise-grade API integration layer',
          'Accountable strategic progress directed through executive steering committee leadership and KPI tracking',
          'Enterprise risk mitigation ensured through full digital governance and cybersecurity hardening'
        ],
        scopeDrivers: ['Multi-location enterprise', 'Legacy database dependencies', 'Strict corporate change management'],
        typicalTimeline: '8–12 weeks'
      }
    }
  },
  {
    id: 'vendor_eval',
    name: 'Technology Due Diligence & Vendor Evaluation',
    slug: 'technology-due-diligence-vendor-evaluation',
    canonicalUrl: '/advisory/technology-due-diligence-vendor-evaluation',
    cluster: 'advisory',
    clusterNumber: '03',
    clusterLabel: 'Advisory',
    summary: 'Unbiased, commission-free technical vetting of agency proposals, software contracts, and developer claims to protect your capital.',
    idealFor: 'Investors, CEOs, and corporate leadership evaluating external development bids or acquiring digital software assets.',
    commercialModel: 'Independent Advisory Retainer',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Diagnostic Session · Single Vendor Proposal & RFP Audit',
        inrMin: 35_000,
        inrMax: 60_000,
        usdMin: 410,
        usdMax: 700,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Protected project budgets through a diagnostic session providing line-by-line proposal & contract reviews',
          'Eliminate billing surprises by exposing hidden scope exclusions and software reseller markups',
          'Avoid fragile architectures with independent technical feasibility & stack suitability assessments',
          'Maximized negotiation leverage armed with an independent fair-market price benchmark report',
          'Confident decision-making through a dedicated debrief call with executive leadership'
        ],
        scopeDrivers: ['Review of up to 3 competitive agency proposals', 'Single software initiative', 'Written due diligence report'],
        typicalTimeline: '1–2 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Defined-Scope Project · Technical Due Diligence & Codebase Vetting',
        inrMin: 75_000,
        inrMax: 180_000,
        usdMin: 880,
        usdMax: 2_120,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Uncompromised code quality through a defined-scope project with complete repository code inspection',
          'Avoid hidden recurring costs with an infrastructure spend analysis and dependency audit',
          'Verify true technical capability by interviewing vendor technical leadership and key engineers',
          'Legally enforceable delivery standards with technical SLA and milestone acceptance contract formulation',
          'Total budget protection through contractual milestone guardrails and clear staging criteria'
        ],
        scopeDrivers: ['Existing codebase inspection (>50k lines of code)', 'M&A asset valuation or critical mission build', 'Vendor technical interview'],
        typicalTimeline: '2–4 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Defined-Scope Project · Comprehensive Procurement & M&A Diligence',
        inrMin: 180_000,
        inrMax: 350_000,
        usdMin: 2_120,
        usdMax: 4_120,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Optimal vendor selection and pricing through multi-vendor competitive RFP steering',
          'Secure software asset value via comprehensive intellectual property, licensing & regulatory audits',
          'De-risked software acquisitions with automated code analysis and penetration testing reviews',
          'Uncompromised software delivery backed by post-contract milestone sign-off governance & testing',
          'Informed M&A decisions supported by an executive board presentation on technical acquisition risk'
        ],
        scopeDrivers: ['Multi-vendor RFP evaluation (>₹1 Cr contract value)', 'Complex regulatory & IP liability inspection', 'Ongoing milestone verification'],
        typicalTimeline: '4–8 weeks'
      }
    }
  },
  {
    id: 'it_consulting',
    name: 'IT Consulting & Technology Strategy',
    slug: 'it-consulting-technology-strategy',
    canonicalUrl: '/advisory/it-consulting-technology-strategy',
    cluster: 'advisory',
    clusterNumber: '03',
    clusterLabel: 'Advisory',
    summary: 'Independent, vendor-neutral technology evaluation, software architecture design, and strategic engineering guidance led by Dr. Ajay Shukla.',
    idealFor: 'Business owners and non-technical founders facing critical software investments who need objective senior expertise.',
    commercialModel: 'Independent Advisory Retainer / Defined Project',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Diagnostic Session · Strategic IT & Cloud Infrastructure Audit',
        inrMin: 30_000,
        inrMax: 60_000,
        usdMin: 350,
        usdMax: 700,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Clear technical health visibility through a diagnostic session evaluating codebase and infrastructure',
          'Eliminated system risks by identifying security vulnerabilities, technical debt & bottlenecks',
          'Objective vendor evaluation through independent code quality and proposal assessments',
          'Actionable engineering priorities delivered in an Executive Architecture Audit Report',
          'Executive clarity and alignment achieved across two 90-minute strategic advisory debrief sessions'
        ],
        scopeDrivers: ['Single application / system', 'Pre-existing codebase review', 'Up to 5 key architectural decisions'],
        typicalTimeline: '1–2 weeks'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Defined-Scope Project · Enterprise Modernization & Tooling Blueprint',
        inrMin: 85_000,
        inrMax: 200_000,
        usdMin: 1_000,
        usdMax: 2_350,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Modernized IT architecture delivered through a defined-scope project analyzing your systems landscape',
          'Future-proof scalability with detailed target architecture design (microservices, databases, APIs)',
          'Accurate developer bids enabled by comprehensive technical specification blueprints',
          'Optimized procurement outcomes with objective vendor selection criteria and RFP governance',
          'Seamless implementation kickoff backed by hands-on architectural steering during vendor onboarding'
        ],
        scopeDrivers: ['Multi-system enterprise integration', 'Legacy core replacement', 'Vendor RFP execution'],
        typicalTimeline: '3–6 weeks'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Defined-Scope Project · Comprehensive IT Modernization & Governance',
        inrMin: 200_000,
        inrMax: 400_000,
        usdMin: 2_350,
        usdMax: 4_700,
        unit: 'per-project',
        isDraft: true,
        deliverables: [
          'Sustained technology leadership provided via an ongoing retainer for technical modernization',
          'Protected corporate data with cloud migration, data sovereignty & high-availability strategies',
          'Continuous architectural integrity maintained through quarterly review board leadership',
          'High-performing engineering teams built through technical interview grading & engineering standards',
          'Board-level peace of mind with direct executive advisory and technology risk management'
        ],
        scopeDrivers: ['Large-scale legacy migration', 'Multi-disciplinary engineering teams', 'Regulated industry compliance'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  },
  {
    id: 'fractional_cto',
    name: 'Fractional CTO & Technology Leadership',
    slug: 'fractional-cto-technology-leadership',
    canonicalUrl: '/advisory/fractional-cto-technology-leadership',
    cluster: 'advisory',
    clusterNumber: '03',
    clusterLabel: 'Advisory',
    summary: 'Senior executive technology leadership for growing businesses needing CTO-level steering without full-time executive payroll overhead.',
    idealFor: 'Founders without a technical co-founder, or scaling companies needing experienced direction for their engineering team.',
    commercialModel: 'Monthly Executive Retainer',
    tiers: {
      Basic: {
        name: 'Basic',
        tagline: 'Diagnostic Session & Light Advisory · Weekly Architecture Guidance (8–12 hrs/mo)',
        inrMin: 60_000,
        inrMax: 100_000,
        usdMin: 710,
        usdMax: 1_180,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Targeted technical steering through dedicated weekly 1-on-1 strategic advisory sessions',
          'Protected codebase quality via direct code reviews and architecture sign-offs on major PRs',
          'On-schedule developer delivery through rigorous vendor and engineering team accountability',
          'Higher engineering hiring quality via technical screening and candidate interview grading',
          'Fast executive clarity via a direct advisory communication channel with Dr. Ajay Shukla'
        ],
        scopeDrivers: ['Early-stage team (1–4 developers)', 'Weekly steering cadence (approx 8–12 hrs/mo)', 'Strategic governance'],
        typicalTimeline: 'Monthly ongoing (minimum 3 months)'
      },
      Standard: {
        name: 'Standard',
        tagline: 'Defined Leadership Retainer · Active Engineering Direction (15–25 hrs/mo)',
        inrMin: 125_000,
        inrMax: 225_000,
        usdMin: 1_470,
        usdMax: 2_650,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Accelerated sprint velocity through bi-weekly sprint planning and active architectural direction',
          'Flawless feature execution via direct hands-on architecture design for complex modules',
          'Reduced AWS/cloud bills and tightened security through comprehensive infrastructure governance',
          'Consistent business alignment with quarterly technology roadmap execution tracking',
          'Credible technical representation during investor diligence and board presentations'
        ],
        scopeDrivers: ['Mid-sized engineering team (5–12 developers)', 'Active sprint steering (approx 15–25 hrs/mo)', 'Stakeholder & board reporting'],
        typicalTimeline: 'Monthly ongoing (6-month commitment)'
      },
      Premium: {
        name: 'Premium',
        tagline: 'Ongoing Executive Retainer · Comprehensive Leadership & Board Advisory (30–40+ hrs/mo)',
        inrMin: 250_000,
        inrMax: 600_000,
        usdMin: 2_940,
        usdMax: 7_060,
        unit: 'per-month',
        isDraft: true,
        deliverables: [
          'Transformative engineering velocity through full executive technology leadership and culture building',
          'Rapid system recovery and stability through crisis technical debt resolution and turnaround',
          'Institutional enterprise readiness with SOC2/ISO preparation and rigorous data governance',
          'High-retention engineering leadership developed through team restructuring and coaching',
          'Seamless executive succession with permanent CTO search, technical vetting & onboarding'
        ],
        scopeDrivers: ['Complex enterprise organization (>15 engineers)', 'Critical tech turnaround or major pivot', 'Executive board representation'],
        typicalTimeline: 'Monthly ongoing'
      }
    }
  }
];
