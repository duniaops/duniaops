// Rebuilds the site once a day so the Rockimals "today" page and the landing
// card show the new UTC day's visitors (website spec 036). Netlify runs it on
// schedule (UTC) on the published deploy only; it just calls the site's own
// build hook, and the build reads NASA NeoWs.
//
// Owner setup: create a build hook for `main` (Site configuration → Build &
// deploy → Build hooks) and store its URL in the environment variable
// ROCKIMALS_TODAY_BUILD_HOOK, with the Functions scope. Test it with "Run now"
// on the Functions page. The hook URL is never logged.
const BUILD_HOOK = /^https:\/\/api\.netlify\.com\/build_hooks\/[A-Za-z0-9]+$/;

export default async () => {
  const hook = process.env.ROCKIMALS_TODAY_BUILD_HOOK;
  if (!hook) {
    console.log('ROCKIMALS_TODAY_BUILD_HOOK is not set; skipping.');
    return;
  }
  if (!BUILD_HOOK.test(hook)) {
    console.error('ROCKIMALS_TODAY_BUILD_HOOK is not a Netlify build hook URL; skipping.');
    return;
  }
  const response = await fetch(`${hook}?trigger_title=rockimals-today`, {
    method: 'POST',
    body: '{}',
    signal: AbortSignal.timeout(15000)
  });
  console.log(`Rockimals today rebuild requested: HTTP ${response.status}`);
};

export const config = {
  schedule: '20 0 * * *'
};
