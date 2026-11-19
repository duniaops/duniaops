import assert from 'node:assert/strict';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const origin = 'https://lumo.duniaops.com';
const iosStore = 'https://apps.apple.com/app/lumo-photo-culling/id6799718934';
const translations = JSON.parse(await readFile(new URL('../content/lumo/locales.json', import.meta.url), 'utf8'));
const languages = {
  en: { name: 'English', language: 'Language' },
  tr: { name: 'Türkçe', language: 'Dil' },
  ...translations
};
const escape = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const route = (code, page = '') => ((code === 'en' ? '' : '/' + code) + (page ? '/' + page : '')) || '/';

function languagePicker(active, page = '') {
  const codes = page ? ['en', 'tr'] : Object.keys(languages);
  return `<details class="language-picker" data-language-picker>
        <summary aria-label="${escape(languages[active].language + ' · ' + languages[active].name)}"><span lang="${active}">${escape(languages[active].name)}</span></summary>
        <ul aria-label="${escape(languages[active].language)}">${codes.map((code) =>
          `<li><a href="${route(code, page)}" lang="${code}" hreflang="${code}"${code === active ? ' aria-current="page"' : ''}>${escape(languages[code].name)}</a></li>`).join('')}</ul>
      </details>`;
}

function alternateLinks(page = '') {
  const codes = page ? ['en', 'tr'] : Object.keys(languages);
  return [...codes.map((code) => `<link rel="alternate" hreflang="${code}" href="${origin}${route(code, page)}">`),
    `<link rel="alternate" hreflang="x-default" href="${origin}${route('en', page)}">`].join('\n');
}

function demo(l) {
  const cards = [l.catLeft, l.catCentre, l.catRight].map((alt, i) => {
    const recommended = i === 1;
    const score = recommended ? 95 : 70;
    const image = recommended ? 'tutorial-cat-2-detail.jpg' : `tutorial-cat-${i + 1}.jpg`;
    const dimensions = recommended ? [887, 1774] : [320, 640];
    return `<label class="demo-card">
        <input class="visually-hidden" type="checkbox"${recommended ? ' checked' : ''} aria-label="${escape(l.keep + ': ' + alt)}">
        <img src="/assets/products/lumo-preview/demo/${image}" alt="${escape(alt)}" width="${dimensions[0]}" height="${dimensions[1]}">
        ${recommended ? `<span class="demo-pick">${escape(l.pick)}</span>` : ''}
        <span class="demo-card-controls"><span class="demo-score"><span class="visually-hidden">${escape(l.score)} ${score}/100</span><span aria-hidden="true">${score}<span class="demo-score-total">/100</span></span></span><span class="demo-choice"><span class="demo-check" aria-hidden="true"></span>${escape(l.keep)}</span></span>
      </label>`;
  });
  return `<section class="review-demo" id="review-demo" data-review-demo aria-labelledby="demo-title">
      <div class="demo-header"><div><h2 id="demo-title">${escape(l.review)}</h2><p>${escape(l.reviewIntro)}</p></div><span class="demo-tag">${escape(l.sample)}</span></div>
      <fieldset class="demo-frames" disabled><legend class="visually-hidden">${escape(l.review)}</legend>${cards.join('\n')}</fieldset>
      <div class="demo-footer" hidden><p data-demo-summary data-pattern="${escape(l.summary)}" role="status">${escape(l.summary.replace('{count}', '1').replace('{total}', '3'))}</p>
        <div class="demo-actions"><button class="demo-reset" type="button" data-demo-reset>${escape(l.reset)}</button><button class="demo-review" type="button" data-demo-review data-show-all="${escape(l.showAll)}">${escape(l.selection)}</button></div>
      </div>
    </section>`;
}

function landing(code, l) {
  const canonical = origin + route(code);
  const media = `/assets/products/lumo-preview/${code}`;
  const features = [{ title: l.review, description: l.culling }, ...l.features];
  const shots = ['review-control', 'large-videos', 'search', 'sharing-coast'];
  const styles = ['review', 'clean', 'find', 'share'];
  const support = `<a href="/support" hreflang="en">${escape(l.support)} (EN)</a>`;
  const privacy = `<a href="/privacy" hreflang="en">${escape(l.privacy)} (EN)</a>`;
  const terms = `<a href="/terms" hreflang="en">${escape(l.terms)} (EN)</a>`;
  const price = new Intl.NumberFormat(code, { style: 'currency', currency: 'GBP' });
  const title = 'Lumo — ' + l.title;
  return `<!doctype html>
<html lang="${code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(l.intro)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Lumo">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(l.intro)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${origin}/assets/products/lumo-preview/contact-sheet.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f7f9fe">
<link rel="canonical" href="${canonical}">
${alternateLinks()}
<link rel="icon" href="/assets/products/lumo-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400..800&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/lumo.css?v=20261119-11">
<script src="/js/lumo.js?v=20261119-5" defer></script>
</head>
<body>
<a class="skip" href="#main">${escape(l.skip)}</a>
<header class="site-header"><div class="wrap header-inner">
  <a class="brand" href="${route(code)}" aria-current="page"><img src="/assets/products/lumo-icon.png" alt="" width="40" height="40">Lumo</a>
  <nav aria-label="${escape(l.navigation)}"><a href="#workflow">${escape(l.workflow)}</a><a href="#plans">${escape(l.plans)}</a>${support}</nav>
  <div class="header-tools">${languagePicker(code)}<a class="header-action" href="#availability">${escape(l.availability)} <span aria-hidden="true">↗</span></a></div>
</div></header>
<main id="main">
<section class="hero-stage" aria-labelledby="hero-title"><div class="hero wrap">
  <div class="hero-copy">
    <p class="label">${escape(l.title)}</p><h1 id="hero-title">${escape(l.headline)}</h1><p class="lead">${escape(l.intro)}</p>
    <div class="actions"><a class="lumo-app-store" href="${iosStore}"><img src="/assets/products/download-on-the-app-store.svg" alt="${escape(l.download)}" width="170" height="57"></a></div>
    <p class="platform-note"><span></span>${escape(l.platforms)}</p>
  </div>
  ${demo(l)}
</div></section>
<section class="workflow" id="workflow" aria-labelledby="workflow-title"><div class="wrap">
  <div class="section-heading"><h2 id="workflow-title">${escape(l.title)}</h2><p>${escape(l.featureIntro)}</p></div>
  <div class="workflow-grid">${features.map((feature, i) => `<article class="shot-card"${i === 3 ? ' id="sharing"' : ''}>
    <div class="shot-copy"><h3>${escape(feature.title)}</h3><p>${escape(feature.description)}</p></div>
    <a class="shot-image shot-${styles[i]}" href="${media}/${shots[i]}.webp"><img src="${media}/${shots[i]}.webp" alt="${escape(i === 3 ? l.sharingAlt : feature.title + ' · Lumo')}" width="660" height="1434" loading="lazy" decoding="async"></a>
  </article>`).join('\n')}</div>
</div></section>
<section class="preview" id="preview" aria-labelledby="preview-title"><div class="wrap preview-layout">
  <h2 id="preview-title">${escape(l.watch)}</h2>
  <div class="film-player">
    <video controls playsinline preload="none" width="960" height="640" poster="/assets/products/lumo-preview/coast.webp" aria-labelledby="preview-title" aria-describedby="film-summary"><source src="${media}/lumo-preview.mp4" type="video/mp4"><a href="${media}/lumo-preview.mp4">${escape(l.watch)}</a></video>
    <button class="film-play" type="button" hidden><span class="film-play-icon" aria-hidden="true"></span>${escape(l.watch)}</button>
  </div>
  <p class="visually-hidden" id="film-summary">${escape([l.culling, ...l.features.map((feature) => feature.description)].join(' '))}</p>
</div></section>
<section class="privacy-band wrap" aria-labelledby="control-title">
  <div class="privacy-photo"><img src="/assets/products/lumo-preview/coffee.webp" alt="" width="760" height="570" loading="lazy" decoding="async"></div>
  <div><h2 id="control-title">${escape(l.privacy)}</h2><p class="lumo-section-copy">${escape(l.privacyCopy)}</p>${privacy}</div>
</section>
<section class="plans" id="plans" aria-labelledby="plans-title"><div class="wrap">
  <div class="section-heading"><h2 id="plans-title">${escape(l.plans)}</h2></div>
  <div class="plan-grid">
    <article class="plan"><h3>Lumo</h3><p class="price">${escape(l.freeTitle)}</p><p>${escape(l.freeCopy)}</p></article>
    <article class="plan plan-pro"><h3>Lumo Pro</h3><p class="lumo-section-copy">${escape(l.proCopy)}</p>
      <dl class="rates">${[[l.monthly, .99], [l.annual, 9.99], [l.lifetime, 49.99]].map(([label, amount]) => `<div><dt>${escape(label)}</dt><dd>${escape(price.format(amount))}</dd></div>`).join('')}</dl>
      <p class="fine-print">${escape(l.pricingNote)}</p>
    </article>
  </div>
</div></section>
<section class="availability" id="availability" aria-labelledby="availability-title"><div class="wrap availability-inner">
  <img src="/assets/products/lumo-icon.png" alt="" width="72" height="72" loading="lazy">
  <div><h2 id="availability-title">${escape(l.platforms)}</h2><p>${escape(l.release)}</p></div>
  <a class="lumo-app-store" href="${iosStore}"><img src="/assets/products/download-on-the-app-store.svg" alt="${escape(l.download)}" width="170" height="57"></a>
</div></section>
</main>
<footer class="site-footer"><div class="wrap footer-inner"><p><a href="${route(code)}">Lumo</a> · <a href="https://www.duniaops.com/">DuniaOps</a></p><nav aria-label="${escape(l.footer)}">${support}${privacy}${terms}</nav></div></footer>
</body>
</html>
`;
}

for (const code of ['en', 'tr']) {
  for (const page of ['', 'support', 'privacy', 'terms']) {
    const file = new URL(page ? `lumo/${code === 'tr' ? 'tr/' : ''}${page}.html` : code === 'tr' ? 'lumo/tr/index.html' : 'products/lumo.html', dist);
    const html = await readFile(file, 'utf8');
    const fallback = /<a class="language-link"[^>]*>[^<]*<\/a>/;
    assert.match(html, fallback);
    if (!page) assert.ok(html.includes(iosStore), `Missing iOS App Store link: ${code}`);
    const updated = html.replace(fallback, languagePicker(code, page))
      .replace(/<link rel="alternate" hreflang="en"[^>]*>\n<link rel="alternate" hreflang="tr"[^>]*>\n<link rel="alternate" hreflang="x-default"[^>]*>/, alternateLinks(page))
      .replace('lumo.css?v=20261119-8', 'lumo.css?v=20261119-11')
      .replace('lumo.js?v=20261119-4', 'lumo.js?v=20261119-5');
    await writeFile(file, updated);
  }
}

const directory = new URL('lumo/locales/', dist);
await mkdir(directory, { recursive: true });
const redirects = await readFile(new URL('_redirects', dist), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
for (const [code, locale] of Object.entries(translations)) {
  assert.match(code, /^[a-z]{2}(?:-[A-Z][A-Za-z]+)?$/);
  assert.equal(locale.features.length, 3, code);
  assert.ok(redirects.includes(`${origin}/${code} /lumo/locales/${code}.html 200!`), `Missing route: ${code}`);
  assert.ok(sitemap.includes(`<loc>${origin}/${code}</loc>`), `Missing sitemap entry: ${code}`);
  for (const file of ['review-control.webp', 'large-videos.webp', 'search.webp', 'sharing-coast.webp', 'lumo-preview.mp4']) {
    await access(new URL(`assets/products/lumo-preview/${code}/${file}`, dist));
  }
  await writeFile(new URL(`${code}.html`, directory), landing(code, locale));
}
console.log(`Built ${Object.keys(languages).length} Lumo landing languages and updated the English and Turkish support and legal menus.`);
