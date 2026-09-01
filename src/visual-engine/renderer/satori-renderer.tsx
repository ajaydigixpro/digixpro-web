import React from 'react';
import satori from 'satori';
import { TemplatePayload, RenderOptions, AssetRecord } from './types';
import { loadProductionFonts } from './font-loader';
import { AssetResolver } from './asset-resolver';
import { Master01Insight } from '../templates/master_01_insight';
import { Master02ProblemSolution } from '../templates/master_02_problem_solution';
import { Master03Framework } from '../templates/master_03_framework';
import { Master05DataSignal } from '../templates/master_05_data_signal';
import { Master07Comparison } from '../templates/master_07_comparison';
import { Master08Announcement } from '../templates/master_08_announcement';
import { Master10Testimonial } from '../templates/master_10_testimonial';
import { validatePayload } from './qa';

const resolver = new AssetResolver();

export async function renderTemplateToSvg(
  payload: TemplatePayload,
  options?: RenderOptions
): Promise<{ svg: string; bgRecord: AssetRecord }> {
  const validation = validatePayload(payload);
  if (!validation.valid) {
    throw new Error(`[SatoriRenderer] Validation failed: ${validation.errors.join(', ')}`);
  }

  const width = options?.width || 1080;
  const height = options?.height || 1080;
  const fonts = loadProductionFonts();

  let element: React.ReactNode = null;
  let bgRecord: AssetRecord;

  if (payload.template_id === 'master_01_insight') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_insight_code_clean';
    const resolved = resolver.resolveAsset('master_01_insight', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;
    element = <Master01Insight data={p} backgroundVariant={bgId === 'bg_insight_code_clean' ? 'editorial_desk_code' : 'base_light'} bgDataUri={resolved.base64DataUri} />;
  } else if (payload.template_id === 'master_02_problem_solution') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_family_radial_focus';
    const resolved = resolver.resolveAsset('master_02_problem_solution', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;
    element = <Master02ProblemSolution data={p} backgroundVariant="radial_focus" bgDataUri={resolved.base64DataUri} />;
  } else if (payload.template_id === 'master_03_framework') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_family_base_light';
    const resolved = resolver.resolveAsset('master_03_framework', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;
    element = <Master03Framework data={p} backgroundVariant="base_light" bgDataUri={resolved.base64DataUri} />;
  } else if (payload.template_id === 'master_05_data_signal') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_family_signal_data';
    const resolved = resolver.resolveAsset('master_05_data_signal', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;
    element = <Master05DataSignal data={p} backgroundVariant="signal_subtle" bgDataUri={resolved.base64DataUri} />;
  } else if (payload.template_id === 'master_07_comparison') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_family_base_light';
    const resolved = resolver.resolveAsset('master_07_comparison', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;
    element = <Master07Comparison data={p} backgroundVariant="base_light" bgDataUri={resolved.base64DataUri} />;
  } else if (payload.template_id === 'master_08_announcement') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_family_announcement';
    const resolved = resolver.resolveAsset('master_08_announcement', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;

    let partnerLogoUri: string | undefined;
    if (p.partner_logo_id) {
      const resolvedLogo = resolver.resolveAsset('master_08_announcement', p.partner_logo_id, 'partner_logo');
      partnerLogoUri = resolvedLogo.base64DataUri;
    }

    element = (
      <Master08Announcement
        data={p}
        backgroundVariant="announcement_subtle"
        bgDataUri={resolved.base64DataUri}
        partnerLogoUri={partnerLogoUri}
      />
    );
  } else if (payload.template_id === 'master_10_testimonial') {
    const p = payload as any;
    const bgId = p.background_id || 'bg_family_radial_focus';
    const resolved = resolver.resolveAsset('master_10_testimonial', bgId, 'background', options?.allowPrototypeBackground || false);
    bgRecord = resolved.record;

    const hasPhoto = Boolean(p.client_photo_id);
    const hasLogo = Boolean(p.client_logo_id);
    if (hasPhoto && hasLogo) {
      throw new Error('[Master10] POLICY VIOLATION: Exactly ONE of client_photo_id OR client_logo_id is allowed. Both were supplied.');
    }
    if (!hasPhoto && !hasLogo) {
      throw new Error('[Master10] POLICY VIOLATION: Exactly ONE of client_photo_id OR client_logo_id is required. Neither was supplied.');
    }

    let photoUri: string | undefined;
    let logoUri: string | undefined;
    if (hasPhoto) {
      const resolvedPhoto = resolver.resolveAsset('master_10_testimonial', p.client_photo_id, 'client_photo');
      photoUri = resolvedPhoto.base64DataUri;
    } else if (hasLogo) {
      const resolvedLogo = resolver.resolveAsset('master_10_testimonial', p.client_logo_id, 'client_logo');
      logoUri = resolvedLogo.base64DataUri;
    }

    element = (
      <Master10Testimonial
        data={p}
        backgroundVariant="radial_focus"
        bgDataUri={resolved.base64DataUri}
        clientPhotoUri={photoUri}
        clientLogoUri={logoUri}
      />
    );
  } else {
    throw new Error(`[SatoriRenderer] Template ${payload.template_id} is not yet implemented.`);
  }

  const svg = await satori(element as any, {
    width,
    height,
    fonts,
  });

  return { svg, bgRecord };
}
