// App Store destinations for every Rockimals web page (website spec 035;
// Rockimals spec 119).
//
// One storefront-neutral link: Apple opens each visitor's own storefront, so
// Turkish, Japanese or German readers no longer land on the UK store.
// Campaign attribution needs the App Store Connect provider token (`pt`).
// Until it is configured the plain link is used and no token is invented;
// setting ROCKIMALS_CAMPAIGN_PROVIDER turns the per-page campaign names on.
export const ROCKIMALS_APP_ID = '6792505608';
export const ROCKIMALS_APP_STORE_URL = `https://apps.apple.com/app/rockimals/id${ROCKIMALS_APP_ID}`;
export const ROCKIMALS_CAMPAIGN_PROVIDER = '';

// Apple limits a campaign token to 40 characters.
const CAMPAIGN_TOKEN_LIMIT = 40;

export function rockimalsAppStoreUrl(campaign = '') {
  if (!ROCKIMALS_CAMPAIGN_PROVIDER || !campaign) return ROCKIMALS_APP_STORE_URL;
  const url = new URL(ROCKIMALS_APP_STORE_URL);
  url.searchParams.set('pt', ROCKIMALS_CAMPAIGN_PROVIDER);
  url.searchParams.set('ct', campaign.slice(0, CAMPAIGN_TOKEN_LIMIT));
  return url.toString();
}

// Safari on iOS shows its own Open / Get banner for this app. No script, no
// tracking.
export const ROCKIMALS_SMART_APP_BANNER = `<meta name="apple-itunes-app" content="app-id=${ROCKIMALS_APP_ID}">`;
