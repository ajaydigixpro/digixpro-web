import { onRequestGet as renderGet } from './render';

/**
 * Dedicated preview endpoint for visual engine pilot (v4 intelligence).
 * Defaults template_id to 'master_02_problem_solution' and forces 'preview=true'.
 */
export const onRequestGet = async (context: any) => {
  const url = new URL(context.request.url);
  url.searchParams.set('preview', 'true');
  if (!url.searchParams.has('template_id')) {
    url.searchParams.set('template_id', 'master_02_problem_solution');
  }

  const modifiedRequest = new Request(url.toString(), context.request);
  const modifiedContext = {
    ...context,
    request: modifiedRequest,
  };

  return renderGet(modifiedContext);
};
