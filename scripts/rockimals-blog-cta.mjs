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

const escapeAttribute = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// The mobile sticky App Store bar (website spec 035, addendum). Pages load
// css/rockimals-sticky-cta.css and js/rockimals-sticky-cta.js, and mark
// their own App Store badge with data-rockimals-sticky-after and their
// closing call to action with data-rockimals-sticky-before.
//
// `inline: true` is the script-free variant for blog articles, which render
// without client-side JavaScript: a CSS `position: sticky` bar at the end of
// the reading column, visible while the article is read and gone after it,
// with no close button.
export function renderRockimalsStickyCta({ href, text, storeLabel, closeLabel, inline = false }) {
  const open = inline
    ? `<aside class="rk-sticky-cta rk-sticky-cta--inline" aria-label="${escapeAttribute(storeLabel)}">`
    : `<aside class="rk-sticky-cta" data-rockimals-sticky hidden aria-label="${escapeAttribute(storeLabel)}">`;
  return open
    + '<img class="rk-sticky-icon" src="/assets/products/rockimals-icon.png?v=20260919" alt="" width="36" height="36">'
    + `<span class="rk-sticky-text">${escapeAttribute(text)}</span>`
    + `<a class="rk-sticky-store" href="${escapeAttribute(href)}" rel="noopener"><img src="/assets/products/download-on-the-app-store.svg" alt="${escapeAttribute(storeLabel)}" width="120" height="40"></a>`
    + (inline ? '' : `<button type="button" class="rk-sticky-close" data-rockimals-sticky-close aria-label="${escapeAttribute(closeLabel)}">×</button>`)
    + '</aside>';
}

export const ROCKIMALS_STICKY_CTA_STYLE = '<link rel="stylesheet" href="/css/rockimals-sticky-cta.css?v=20260923">';
export const ROCKIMALS_STICKY_CTA_ASSETS = `${ROCKIMALS_STICKY_CTA_STYLE}<script src="/js/rockimals-sticky-cta.js?v=20260923" defer></script>`;
