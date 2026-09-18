import React from 'react';
import { ImageResponse } from 'workers-og';
import { Master01Insight } from '../../../src/visual-engine/templates/master_01_insight';
import { Master02ProblemSolution } from '../../../src/visual-engine/templates/master_02_problem_solution';
import { Master03Framework } from '../../../src/visual-engine/templates/master_03_framework';
import { Master05DataSignal } from '../../../src/visual-engine/templates/master_05_data_signal';
import { Master07Comparison } from '../../../src/visual-engine/templates/master_07_comparison';
import { Master08Announcement } from '../../../src/visual-engine/templates/master_08_announcement';
import { Master10Testimonial } from '../../../src/visual-engine/templates/master_10_testimonial';
import {
  Master01Payload,
  Master02Payload,
  Master03Payload,
  Master05Payload,
  Master07Payload,
  Master08Payload,
  Master10Payload
} from '../../../src/visual-engine/renderer/types';
import { getEmbeddedFonts, STATIC_EMBEDDED_FONTS } from '../../../src/visual-engine/renderer/embedded-fonts';
import { DEFAULT_INSIGHT_BG_DATA_URI } from '../../../src/visual-engine/renderer/embedded-backgrounds';
import { validatePayload } from '../../../src/visual-engine/renderer/qa';
import { resolveMaster02Intelligence, Master02IntelligenceResult } from '../../../src/visual-engine/renderer/master02-intelligence';

const STATIC_FONTS = STATIC_EMBEDDED_FONTS || getEmbeddedFonts();

function validationErrorResponse(errors: string[]) {
  return new Response(JSON.stringify({ error: 'Validation failed', details: errors }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const onRequestGet = async (context: any) => {
  const startTime = Date.now();
  try {
    const url = new URL(context.request.url);
    const isPreview = url.searchParams.get('preview') === 'true' || url.searchParams.get('engine') === 'v4';
    const noCache = isPreview || url.searchParams.get('nocache') === 'true';

    const cache = (caches as any)?.default;
    const cacheKey = new Request(context.request.url, { method: 'GET' });

    if (cache && !noCache) {
      try {
        const cached = await cache.match(cacheKey);
        if (cached) {
          return cached;
        }
      } catch {
        // Proceed to render on cache match error
      }
    }

    const templateId = url.searchParams.get('template_id') || 'master_01_insight';

    let element: React.ReactElement;
    let intelligenceMeta: Master02IntelligenceResult | null = null;

    switch (templateId) {
      case 'master_02_problem_solution': {
        const data: Master02Payload = {
          template_id: 'master_02_problem_solution',
          problem_headline: url.searchParams.get('problem_headline') || 'Manual operational spreadsheets create silent bottlenecks',
          problem_supporting_text: url.searchParams.get('problem_supporting_text') || 'Disconnected clinic records force staff into repetitive manual data entry.',
          solution_headline: url.searchParams.get('solution_headline') || 'Automate queue processing with real-time event triggers',
          solution_supporting_text: url.searchParams.get('solution_supporting_text') || 'Synchronize patient queues with practitioner availability across all branches.',
          category_badge_text: (url.searchParams.get('category_badge_text') || 'AUTOMATION').toUpperCase(),
          variant: (url.searchParams.get('variant') as any) || 'v1',
          reference_note: url.searchParams.get('reference_note') || undefined,
        };
        const validation = validatePayload(data);
        if (!validation.valid) return validationErrorResponse(validation.errors);

        if (isPreview) {
          const intelligence = await resolveMaster02Intelligence(context, data, url.searchParams);
          intelligenceMeta = intelligence;
          element = React.createElement(Master02ProblemSolution, {
            data,
            showFooter: intelligence.showFooter,
            palette: intelligence.palette,
            injectedAssetDataUri: intelligence.injectedAssetDataUri,
            injectedAssetBounds: intelligence.injectedAssetBounds,
          });
        } else {
          element = React.createElement(Master02ProblemSolution, { data });
        }
        break;
      }

      case 'master_03_framework': {
        const data: Master03Payload = {
          template_id: 'master_03_framework',
          framework_headline: url.searchParams.get('framework_headline') || 'The 3-Tier Enterprise Modernization Blueprint',
          framework_summary: url.searchParams.get('framework_summary') || 'Structured execution methodology for decoupling legacy monolithic software.',
          framework_step_1: url.searchParams.get('framework_step_1') || 'Phase 1: Domain Discovery',
          framework_description_1: url.searchParams.get('framework_description_1') || 'Map organizational boundaries and data dependency bottlenecks.',
          framework_step_2: url.searchParams.get('framework_step_2') || 'Phase 2: Event Architecture',
          framework_description_2: url.searchParams.get('framework_description_2') || 'Deploy asynchronous event queues for isolated workload scaling.',
          framework_step_3: url.searchParams.get('framework_step_3') || 'Phase 3: Automated Observability',
          framework_description_3: url.searchParams.get('framework_description_3') || 'Implement end-to-end tracing and health telemetry.',
          category_badge_text: (url.searchParams.get('category_badge_text') || 'FRAMEWORK').toUpperCase()
        };
        const validation = validatePayload(data);
        if (!validation.valid) return validationErrorResponse(validation.errors);
        element = React.createElement(Master03Framework, { data });
        break;
      }

      case 'master_05_data_signal': {
        const data: Master05Payload = {
          template_id: 'master_05_data_signal',
          data_headline: url.searchParams.get('data_headline') || 'Clinical Scheduling Efficiency Optimization',
          metric: url.searchParams.get('metric') || '99.4%',
          metric_label: url.searchParams.get('metric_label') || 'Queue Synchronization Rate',
          short_context: url.searchParams.get('short_context') || 'Eliminated appointment overbooking and doctor idle time across 12 clinic branches.',
          source_period_context: url.searchParams.get('source_period_context') || 'Q3 2026 Production Telemetry',
          category_badge_text: (url.searchParams.get('category_badge_text') || 'DATA SIGNAL').toUpperCase()
        };
        const validation = validatePayload(data);
        if (!validation.valid) return validationErrorResponse(validation.errors);
        element = React.createElement(Master05DataSignal, { data });
        break;
      }

      case 'master_07_comparison': {
        const data: Master07Payload = {
          template_id: 'master_07_comparison',
          comparison_headline: url.searchParams.get('comparison_headline') || 'Generic ERP Templates vs Custom Operating Systems',
          before_heading: url.searchParams.get('before_heading') || 'Generic ERP Templates',
          after_heading: url.searchParams.get('after_heading') || 'Custom Business OS',
          before_point_1: url.searchParams.get('before_point_1') || 'Rigid workflows forcing manual workarounds',
          after_point_1: url.searchParams.get('after_point_1') || 'Tailored data flows mirroring exact operations',
          before_point_2: url.searchParams.get('before_point_2') || 'Bloated monthly seat-licensing fees',
          after_point_2: url.searchParams.get('after_point_2') || 'Single-tenant owned software with zero seat tax',
          before_point_3: url.searchParams.get('before_point_3') || 'Fragile plugin ecosystems breaking on updates',
          after_point_3: url.searchParams.get('after_point_3') || 'Clean decoupled architecture on modern cloud infrastructure',
          comparison_summary: url.searchParams.get('comparison_summary') || 'Purpose-built software outperforms generic templates on every operational metric.',
          category_badge_text: (url.searchParams.get('category_badge_text') || 'COMPARISON').toUpperCase()
        };
        const validation = validatePayload(data);
        if (!validation.valid) return validationErrorResponse(validation.errors);
        element = React.createElement(Master07Comparison, { data });
        break;
      }

      case 'master_08_announcement': {
        const data: Master08Payload = {
          template_id: 'master_08_announcement',
          announcement_headline: url.searchParams.get('announcement_headline') || 'DigiXPro Architecture Advisory Announcement',
          announcement_subtitle: url.searchParams.get('announcement_subtitle') || 'Enterprise Modernization Initiative',
          announcement_message: url.searchParams.get('announcement_message') || 'Delivering high-throughput event-driven architectures to scaling businesses.',
          announcement_supporting_detail: url.searchParams.get('announcement_supporting_detail') || 'Consultation bookings open for Q4 infrastructure design.',
          announcement_date_context: url.searchParams.get('announcement_date_context') || 'SEPTEMBER 2026',
          category_badge_text: (url.searchParams.get('category_badge_text') || 'ANNOUNCEMENT').toUpperCase()
        };
        const validation = validatePayload(data);
        if (!validation.valid) return validationErrorResponse(validation.errors);
        element = React.createElement(Master08Announcement, { data });
        break;
      }

      case 'master_10_testimonial': {
        const data: Master10Payload = {
          template_id: 'master_10_testimonial',
          client_name: url.searchParams.get('client_name') || 'Dr. Ajay Shukla',
          company_role: url.searchParams.get('company_role') || 'Founder & Principal Architect',
          quote: url.searchParams.get('quote') || 'DigiXPro rebuilt our entire digital operating architecture, eliminating manual data entry and accelerating patient onboarding by 4x.',
          optional_context: url.searchParams.get('optional_context') || 'HealthTech Platform Architecture',
          category_badge_text: (url.searchParams.get('category_badge_text') || 'CLIENT IMPACT').toUpperCase()
        };
        // NOTE: master_10's validatePayload() requires exactly one of client_photo_id/client_logo_id,
        // which this live endpoint does not currently source (see report: AssetResolver is fs-based
        // and cannot run in this Workers runtime). Left unchanged intentionally — see task report.
        element = React.createElement(Master10Testimonial, { data });
        break;
      }

      case 'master_01_insight': {
        const headline =
          url.searchParams.get('insight_headline') ||
          url.searchParams.get('headline') ||
          'HOW REAL-TIME SCHEDULING SYSTEMS ARE QUIETLY TRANSFORMING SMALL CLINIC OPERATIONS';
        const supportingText =
          url.searchParams.get('supporting_text') ||
          'EVENT-DRIVEN SCHEDULING ENGINES ELIMINATE IDLE CLINICAL CAPACITY BY DYNAMICALLY SYNCHRONIZING PATIENT QUEUES WITH REAL-TIME PRACTITIONER AVAILABILITY.';
        const category = (
          url.searchParams.get('category_badge_text') ||
          url.searchParams.get('category') ||
          'ENGINEERING'
        ).toUpperCase();

        const data: Master01Payload = {
          template_id: 'master_01_insight',
          insight_headline: headline,
          supporting_text: supportingText,
          category_badge_text: category
        };

        const validation = validatePayload(data);
        if (!validation.valid) return validationErrorResponse(validation.errors);
        element = React.createElement(Master01Insight, {
          data,
          bgDataUri: DEFAULT_INSIGHT_BG_DATA_URI
        });
        break;
      }

      default: {
        return new Response(JSON.stringify({ error: `Unsupported template_id: ${templateId}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const imageResponse = new ImageResponse(element, {
      width: 1080,
      height: 1080,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*'
      },
      fonts: STATIC_FONTS
    });

    const pngBuffer = await imageResponse.arrayBuffer();
    const renderDurationMs = Date.now() - startTime;

    const responseHeaders: Record<string, string> = {
      'Content-Type': 'image/png',
      'Cache-Control': noCache ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers':
        'X-DigiXPro-Engine, X-DigiXPro-Asset, X-DigiXPro-Palette, X-DigiXPro-Footer, X-DigiXPro-Storage, X-DigiXPro-Reason, X-DigiXPro-Duration-Ms',
    };

    if (intelligenceMeta) {
      responseHeaders['X-DigiXPro-Engine'] = 'v4-pilot';
      responseHeaders['X-DigiXPro-Asset'] = intelligenceMeta.injectedAssetId || 'NONE';
      responseHeaders['X-DigiXPro-Palette'] = `${intelligenceMeta.palette.id} (${intelligenceMeta.palette.name})`;
      responseHeaders['X-DigiXPro-Footer'] = intelligenceMeta.showFooter ? 'FOOTER_PRESENT' : 'FOOTER_SUPPRESSED';
      responseHeaders['X-DigiXPro-Storage'] = intelligenceMeta.storageMechanism;
      responseHeaders['X-DigiXPro-Reason'] = intelligenceMeta.decisionReason;
      responseHeaders['X-DigiXPro-Duration-Ms'] = String(renderDurationMs);
    }

    const finalResponse = new Response(pngBuffer, {
      status: 200,
      headers: responseHeaders,
    });

    if (cache && !noCache) {
      try {
        context.waitUntil(cache.put(cacheKey, finalResponse.clone()));
      } catch {
        // Ignore cache put error
      }
    }

    return finalResponse;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
