import http from 'http';
import { URL } from 'url';
import { renderTemplateToPng } from './renderer/png-renderer';
import { validatePayload } from './renderer/qa';
import { resolveMaster02Intelligence } from './renderer/master02-intelligence';
import {
  TemplatePayload,
  Master01Payload,
  Master02Payload,
  Master03Payload,
  Master04Payload,
  Master05Payload,
  Master06Payload,
  Master07Payload,
  Master08Payload,
  Master09Payload,
  Master10Payload
} from './renderer/types';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '127.0.0.1';

function buildPayload(url: URL): TemplatePayload {
  const templateId = (url.searchParams.get('template_id') || 'master_01_insight').trim();
  const variant = (url.searchParams.get('variant') as any) || 'v1';
  const category_badge_text = url.searchParams.get('category_badge_text') || undefined;
  const background_id = url.searchParams.get('background_id') || undefined;

  switch (templateId) {
    case 'master_01_insight': {
      const payload: Master01Payload = {
        template_id: 'master_01_insight',
        insight_headline: url.searchParams.get('insight_headline') || url.searchParams.get('headline') || '',
        supporting_text: url.searchParams.get('supporting_text') || '',
        category_badge_text,
        background_id,
        variant,
        reference_note: url.searchParams.get('reference_note') || undefined,
      };
      return payload;
    }

    case 'master_02_problem_solution': {
      const payload: Master02Payload = {
        template_id: 'master_02_problem_solution',
        problem_headline: url.searchParams.get('problem_headline') || '',
        problem_supporting_text: url.searchParams.get('problem_supporting_text') || '',
        solution_headline: url.searchParams.get('solution_headline') || '',
        solution_supporting_text: url.searchParams.get('solution_supporting_text') || '',
        category_badge_text,
        background_id,
        variant,
        reference_note: url.searchParams.get('reference_note') || undefined,
      };
      return payload;
    }

    case 'master_03_framework': {
      const payload: Master03Payload = {
        template_id: 'master_03_framework',
        framework_headline: url.searchParams.get('framework_headline') || '',
        framework_summary: url.searchParams.get('framework_summary') || '',
        framework_step_1: url.searchParams.get('framework_step_1') || '',
        framework_description_1: url.searchParams.get('framework_description_1') || '',
        framework_step_2: url.searchParams.get('framework_step_2') || '',
        framework_description_2: url.searchParams.get('framework_description_2') || '',
        framework_step_3: url.searchParams.get('framework_step_3') || '',
        framework_description_3: url.searchParams.get('framework_description_3') || '',
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_04_architecture': {
      const payload: Master04Payload = {
        template_id: 'master_04_architecture',
        architecture_headline: url.searchParams.get('architecture_headline') || '',
        architecture_summary: url.searchParams.get('architecture_summary') || '',
        architecture_step_1: url.searchParams.get('architecture_step_1') || '',
        architecture_detail_1: url.searchParams.get('architecture_detail_1') || '',
        architecture_step_2: url.searchParams.get('architecture_step_2') || '',
        architecture_detail_2: url.searchParams.get('architecture_detail_2') || '',
        architecture_step_3: url.searchParams.get('architecture_step_3') || '',
        architecture_detail_3: url.searchParams.get('architecture_detail_3') || '',
        architecture_step_4: url.searchParams.get('architecture_step_4') || '',
        architecture_detail_4: url.searchParams.get('architecture_detail_4') || '',
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_05_data_signal': {
      const payload: Master05Payload = {
        template_id: 'master_05_data_signal',
        data_headline: url.searchParams.get('data_headline') || '',
        metric: url.searchParams.get('metric') || '',
        metric_label: url.searchParams.get('metric_label') || '',
        short_context: url.searchParams.get('short_context') || '',
        source_period_context: url.searchParams.get('source_period_context') || undefined,
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_06_case_study': {
      const payload: Master06Payload = {
        template_id: 'master_06_case_study',
        case_study_headline: url.searchParams.get('case_study_headline') || '',
        client_project_type: url.searchParams.get('client_project_type') || '',
        short_challenge: url.searchParams.get('short_challenge') || '',
        what_digixpro_changed: url.searchParams.get('what_digixpro_changed') || '',
        verified_result_outcome: url.searchParams.get('verified_result_outcome') || '',
        case_study_summary: url.searchParams.get('case_study_summary') || '',
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_07_comparison': {
      const payload: Master07Payload = {
        template_id: 'master_07_comparison',
        comparison_headline: url.searchParams.get('comparison_headline') || '',
        client_project_type: url.searchParams.get('client_project_type') || undefined,
        before_heading: url.searchParams.get('before_heading') || 'Before',
        after_heading: url.searchParams.get('after_heading') || 'After',
        before_point_1: url.searchParams.get('before_point_1') || '',
        after_point_1: url.searchParams.get('after_point_1') || '',
        before_point_2: url.searchParams.get('before_point_2') || '',
        after_point_2: url.searchParams.get('after_point_2') || '',
        before_point_3: url.searchParams.get('before_point_3') || '',
        after_point_3: url.searchParams.get('after_point_3') || '',
        comparison_summary: url.searchParams.get('comparison_summary') || '',
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_08_announcement': {
      const payload: Master08Payload = {
        template_id: 'master_08_announcement',
        announcement_headline: url.searchParams.get('announcement_headline') || '',
        announcement_subtitle: url.searchParams.get('announcement_subtitle') || undefined,
        announcement_message: url.searchParams.get('announcement_message') || '',
        announcement_supporting_detail: url.searchParams.get('announcement_supporting_detail') || undefined,
        announcement_date_context: url.searchParams.get('announcement_date_context') || undefined,
        partner_logo_id: url.searchParams.get('partner_logo_id') || undefined,
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_09_occasion': {
      const payload: Master09Payload = {
        template_id: 'master_09_occasion',
        occasion_name: url.searchParams.get('occasion_name') || '',
        greeting_headline: url.searchParams.get('greeting_headline') || '',
        relevant_message: url.searchParams.get('relevant_message') || '',
        line_message: url.searchParams.get('line_message') || '',
        date_context: url.searchParams.get('date_context') || undefined,
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    case 'master_10_testimonial': {
      const payload: Master10Payload = {
        template_id: 'master_10_testimonial',
        client_name: url.searchParams.get('client_name') || '',
        company_role: url.searchParams.get('company_role') || '',
        quote: url.searchParams.get('quote') || '',
        optional_context: url.searchParams.get('optional_context') || undefined,
        client_photo_id: url.searchParams.get('client_photo_id') || undefined,
        client_logo_id: url.searchParams.get('client_logo_id') || undefined,
        category_badge_text,
        background_id,
        variant
      };
      return payload;
    }

    default:
      return { template_id: templateId as any };
  }
}

const server = http.createServer(async (req, res) => {
  // Only allow GET and HEAD requests
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  // Healthcheck endpoint
  if (parsedUrl.pathname === '/healthz' || parsedUrl.pathname === '/health') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    res.end(JSON.stringify({ status: 'ok', service: 'visual-engine-renderer' }));
    return;
  }

  // Render / Preview endpoints
  const isPreview =
    parsedUrl.pathname === '/preview' ||
    parsedUrl.pathname === '/api/visual-engine/preview' ||
    parsedUrl.searchParams.get('preview') === 'true' ||
    parsedUrl.searchParams.get('engine') === 'v4';

  if (
    parsedUrl.pathname === '/render' ||
    parsedUrl.pathname === '/api/visual-engine/render' ||
    parsedUrl.pathname === '/preview' ||
    parsedUrl.pathname === '/api/visual-engine/preview'
  ) {
    try {
      // Default to master_02_problem_solution on dedicated preview routes if unspecified
      if (
        (parsedUrl.pathname === '/preview' || parsedUrl.pathname === '/api/visual-engine/preview') &&
        !parsedUrl.searchParams.has('template_id')
      ) {
        parsedUrl.searchParams.set('template_id', 'master_02_problem_solution');
      }

      const payload = buildPayload(parsedUrl);

      // Validate payload strictly
      const validation = validatePayload(payload);
      if (!validation.valid) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ error: 'Validation failed', details: validation.errors }));
        return;
      }

      let intelligenceMeta: any = null;
      if (isPreview && payload.template_id === 'master_02_problem_solution') {
        intelligenceMeta = await resolveMaster02Intelligence(null, payload as Master02Payload, parsedUrl.searchParams);
      }

      const { png, qa } = await renderTemplateToPng(payload, {
        width: 1080,
        height: 1080,
        master02Intelligence: intelligenceMeta
      });

      const headers: Record<string, string> = {
        'Content-Type': 'image/png',
        'Content-Length': png.length.toString(),
        'Cache-Control': isPreview ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers':
          'X-DigiXPro-Engine, X-DigiXPro-Asset, X-DigiXPro-Palette, X-DigiXPro-Footer, X-DigiXPro-Storage, X-DigiXPro-Reason, X-Render-Time-Ms, X-Template-Id',
        'X-Render-Time-Ms': qa.telemetry.render_time_ms.toString(),
        'X-Template-Id': payload.template_id
      };

      if (intelligenceMeta) {
        headers['X-DigiXPro-Engine'] = 'v4-pilot';
        headers['X-DigiXPro-Asset'] = intelligenceMeta.injectedAssetId || 'NONE';
        headers['X-DigiXPro-Palette'] = `${intelligenceMeta.palette.id} (${intelligenceMeta.palette.name})`;
        headers['X-DigiXPro-Footer'] = intelligenceMeta.showFooter ? 'FOOTER_PRESENT' : 'FOOTER_SUPPRESSED';
        headers['X-DigiXPro-Storage'] = intelligenceMeta.storageMechanism;
        headers['X-DigiXPro-Reason'] = intelligenceMeta.decisionReason;
      }

      res.writeHead(200, headers);

      if (req.method === 'HEAD') {
        res.end();
      } else {
        res.end(png);
      }
    } catch (err: any) {
      console.error('[Render Error]:', err);
      res.writeHead(500, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`[Visual Engine Renderer] Server listening on http://${HOST}:${PORT}`);
});
