import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = new URL('../', import.meta.url);
const locales = JSON.parse(await readFile(new URL('content/rockimals-landing/locales.json', base), 'utf8'));
const localeOrder = ['en', 'tr', 'ja', 'ko', 'zh-Hans', 'fr', 'de', 'es'];
const appStoreUrl = 'https://apps.apple.com/gb/app/rockimals/id6792505608';

for (const locale of localeOrder) assert.ok(locales[locale], `Missing Rockimals locale: ${locale}`);

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (value) => esc(value).replaceAll('’', '&rsquo;');

function languageOptions(active) {
  return localeOrder.map((code) => `<option value="${code}"${code === active ? ' selected' : ''}>${locales[code].label}</option>`).join('');
}

function render(code) {
  const l = locales[code];
  const canonical = `https://rockimals.duniaops.com/${code === 'en' ? '' : code}`;
  const blogPath = `https://rockimals.duniaops.com${code === 'en' ? '/blog' : `/${code}/blog`}`;
  const screenshot = (name) => `/assets/products/rockimals-preview/${code}/${name}.jpg?v=20260919`;
  const shots = [1, 2, 3, 4, 5, 6].map((number) => {
    const file = ['01-radar-home', '02-hero-chapter-reader', '03-story-library', '04-meet-card', '05-earth-shield', '06-my-space-zoo'][number - 1];
    return `<figure class="rk-shot"><a href="${screenshot(file)}" aria-label="${text(l[`shot${number}`])}"><img src="${screenshot(file)}" alt="Rockimals · ${text(l[`shot${number}`])}" width="828" height="1800" loading="lazy" decoding="async"></a><figcaption><strong>${text(l[`shot${number}`])}</strong><span>${text(l[`shot${number}Text`])}</span></figcaption></figure>`;
  }).join('');
  const alternateLinks = localeOrder.map((alt) => `<link rel="alternate" hreflang="${locales[alt].htmlLang}" href="https://rockimals.duniaops.com/${alt === 'en' ? '' : alt}">`).join('\n');
  return `<!doctype html>
<html lang="${l.htmlLang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${text(l.title)}</title>
<meta name="description" content="${text(l.description)}">
<link rel="canonical" href="${canonical}">
${alternateLinks}
<link rel="alternate" hreflang="x-default" href="https://rockimals.duniaops.com/">
<meta property="og:title" content="${text(l.title)}"><meta property="og:description" content="${text(l.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="${l.ogLocale}">
<meta property="og:image" content="https://rockimals.duniaops.com/assets/products/rockimals-card-hero.png?v=20260919"><meta property="og:image:width" content="1024"><meta property="og:image:height" content="500"><meta property="og:image:alt" content="Rockimals — real asteroids, friendly space animals">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${text(l.title)}"><meta name="twitter:description" content="${text(l.description)}"><meta name="twitter:image" content="https://rockimals.duniaops.com/assets/products/rockimals-card-hero.png?v=20260919">
<meta name="theme-color" content="#07101d"><link rel="icon" type="image/png" href="/assets/products/rockimals-icon.png?v=20260919">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/rockimals-landing.css?v=20260919-language-menu"><script src="/js/rockimals-landing.js?v=20260919-language-menu" defer></script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Rockimals', applicationCategory: 'EducationalApplication', operatingSystem: 'iOS 13.0 or later; Android', description: l.description, url: canonical, downloadUrl: appStoreUrl, publisher: { '@type': 'Organization', name: 'DuniaOps', url: 'https://www.duniaops.com/' }, audience: { '@type': 'PeopleAudience', suggestedMinAge: 6, suggestedMaxAge: 12 }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP', availability: 'https://schema.org/InStock', description: 'Free download with an optional Rockimals Plus subscription.' } })}</script>
</head>
<body class="rk-page" data-rockimals-page data-locale="${code}">
<a class="rk-skip" href="#main-content">Skip to content</a>
<header class="rk-header"><nav class="rk-wrap rk-nav" aria-label="Rockimals"><a class="rk-brand" href="#main-content"><img src="/assets/products/rockimals-icon.png?v=20260919" alt="" width="46" height="46"><span>Rockimals</span></a><div class="rk-nav-links"><a href="#explore">${text(l.navExplore)}</a><a href="#stories">${text(l.navStories)}</a><a href="${blogPath}">${text(l.navBlog)}</a><a href="#plus">${text(l.navPlus)}</a><a href="https://rockimals.duniaops.com/support?lang=${code}">${text(l.navSupport)}</a></div><label class="rk-language"><span class="rk-sr-only" data-rockimals-language-label>Language</span><select data-rockimals-language aria-label="Language">${languageOptions(code)}</select></label></nav></header>
<main id="main-content">
<section class="rk-hero"><div class="rk-stars" aria-hidden="true"></div><div class="rk-wrap rk-hero-grid"><div class="rk-hero-copy"><p class="rk-kicker">${text(l.eyebrow)}</p><h1>${text(l.heroTitle)}</h1><p class="rk-lead">${text(l.heroLead)}</p><div class="rk-download"><a class="rk-app-store" href="${appStoreUrl}" rel="noopener"><img src="/assets/products/download-on-the-app-store.svg" alt="${text(l.appStore)}" width="170" height="57"></a><span class="rk-google-status">${text(l.googleReview)}</span></div><p class="rk-availability">${text(l.appleLive)}</p><div class="rk-trust"><span>${text(l.trust1)}</span><span>${text(l.trust2)}</span><span>${text(l.trust3)}</span><span>${text(l.trust4)}</span></div></div><figure class="rk-hero-visual"><div class="rk-orbit" aria-hidden="true"></div><img src="${screenshot('01-radar-home')}" alt="Rockimals · ${text(l.shot1)}" width="828" height="1800" fetchpriority="high"><figcaption>${text(l.heroCaption)}</figcaption></figure></div></section>
<section class="rk-story" id="stories"><div class="rk-wrap"><div class="rk-heading"><p class="rk-kicker">${text(l.storyEyebrow)}</p><h2>${text(l.storyTitle)}</h2><p>${text(l.storyLead)}</p></div><div class="rk-story-layout"><figure class="rk-story-screen"><img src="${screenshot('02-hero-chapter-reader')}" alt="Rockimals · ${text(l.shot2)}" width="828" height="1800" loading="lazy"></figure><div class="rk-story-cards"><article><span>01</span><h3>${text(l.storyCard1Title)}</h3><p>${text(l.storyCard1Text)}</p></article><article><span>02</span><h3>${text(l.storyCard2Title)}</h3><p>${text(l.storyCard2Text)}</p></article><article><span>03</span><h3>${text(l.storyCard3Title)}</h3><p>${text(l.storyCard3Text)}</p></article></div><figure class="rk-library-screen"><img src="${screenshot('03-story-library')}" alt="Rockimals · ${text(l.shot3)}" width="828" height="1800" loading="lazy"></figure></div></div></section>
<section class="rk-explore" id="explore"><div class="rk-wrap"><div class="rk-heading"><p class="rk-kicker">${text(l.insideEyebrow)}</p><h2>${text(l.insideTitle)}</h2></div><div class="rk-shot-row" tabindex="0">${shots}</div></div></section>
<section class="rk-facts"><div class="rk-wrap rk-facts-grid"><article><p class="rk-kicker">${text(l.scienceEyebrow)}</p><h2>${text(l.scienceTitle)}</h2><p>${text(l.scienceText)}</p></article><article id="plus"><p class="rk-kicker">${text(l.plusEyebrow)}</p><h2>${text(l.plusTitle)}</h2><p>${text(l.plusText)}</p><small>${text(l.plusNote)}</small></article></div></section>
<section class="rk-safe"><div class="rk-wrap"><div class="rk-heading"><p class="rk-kicker">${text(l.safeEyebrow)}</p><h2>${text(l.safeTitle)}</h2></div><div class="rk-safe-grid"><article><h3>${text(l.safe1Title)}</h3><p>${text(l.safe1Text)}</p></article><article><h3>${text(l.safe2Title)}</h3><p>${text(l.safe2Text)}</p></article><article><h3>${text(l.safe3Title)}</h3><p>${text(l.safe3Text)}</p></article></div><div class="rk-language-band"><div><h3>${text(l.languagesTitle)}</h3><p>${text(l.languagesText)}</p></div><p class="rk-language-list"><span>English</span><span>Türkçe</span><span>日本語</span><span>한국어</span><span>简体中文</span><span>Français</span><span>Deutsch</span><span>Español</span></p></div></div></section>
<section class="rk-faq"><div class="rk-wrap"><div class="rk-heading"><p class="rk-kicker">FAQ</p><h2>${text(l.faqTitle)}</h2></div><div class="rk-faq-list"><details><summary>${text(l.faq1Q)}</summary><p>${text(l.faq1A)}</p></details><details><summary>${text(l.faq2Q)}</summary><p>${text(l.faq2A)}</p></details><details><summary>${text(l.faq3Q)}</summary><p>${text(l.faq3A)}</p></details></div></div></section>
<section class="rk-closing"><div class="rk-wrap"><img src="/assets/products/rockimals-icon.png?v=20260919" alt="Rockimals" width="112" height="112"><h2>${text(l.closingTitle)}</h2><p>${text(l.closingText)}</p><a class="rk-app-store" href="${appStoreUrl}" rel="noopener"><img src="/assets/products/download-on-the-app-store.svg" alt="${text(l.appStore)}" width="170" height="57"></a></div></section>
</main>
<footer class="rk-footer rk-wrap"><span>© 2026 Rockimals · <a href="https://www.duniaops.com/">${text(l.by)}</a></span><div><a href="https://rockimals.duniaops.com/support?lang=${code}">${text(l.navSupport)}</a><a href="https://rockimals.duniaops.com/privacy-policy?lang=${code}">${text(l.privacy)}</a></div></footer>
</body></html>`;
}

const english = render('en');
if (process.argv.includes('--write-source')) {
  await writeFile(new URL('products/rockimals.html', base), english);
  console.log('Updated products/rockimals.html from the Rockimals locale source.');
}

const source = await readFile(new URL('products/rockimals.html', base), 'utf8');
assert.equal(source, english, 'products/rockimals.html is stale; run node scripts/build-rockimals-landing.mjs --write-source');

const output = new URL('dist/products/rockimals-locales/', base);
await mkdir(output, { recursive: true });
for (const code of localeOrder) {
  const html = render(code);
  await writeFile(new URL(`${code}.html`, output), html);
  const route = new URL(`dist/${code}/`, base);
  await mkdir(route, { recursive: true });
  await writeFile(new URL('index.html', route), html);
}
console.log('Built and checked eight localized Rockimals landing pages with matching 1.3.0 screenshots.');
