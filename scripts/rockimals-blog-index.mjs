import { ROCKIMALS_BLOG_CATEGORIES, ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';
import {
  rockimalsBlogIndexPaths,
  rockimalsProductPath,
  renderRockimalsLanguageMenu
} from './rockimals-blog-navigation.mjs';

export const ROCKIMALS_INDEX_UI = Object.freeze({
  en: Object.freeze({
    skip: 'Skip to guides',
    language: 'Article language',
    product: 'Explore Rockimals',
    eyebrow: 'Rockimals stories & guides',
    title: 'Curious questions. Calm space adventures.',
    intro: 'Friendly guides for families and young explorers, from meeting your first visitor to understanding the real science in today’s sky.',
    categories: 'Four ways to explore',
    latest: 'Latest guides',
    read: 'Read article',
    emptyTitle: 'Stories are on the way',
    emptyText: 'We are preparing the first complete eight-language guide. No unfinished article is shown here.',
    footer: 'A calmer way to explore space.'
  }),
  tr: Object.freeze({
    skip: 'Rehberlere geç',
    language: 'Yazı dili',
    product: 'Rockimals’ı keşfet',
    eyebrow: 'Rockimals hikâyeleri ve rehberleri',
    title: 'Meraklı sorular. Sakin uzay maceraları.',
    intro: 'İlk ziyaretçinle tanışmaktan bugünün gökyüzündeki gerçek bilimi anlamaya kadar aileler ve genç kâşifler için sıcak rehberler.',
    categories: 'Keşfetmenin dört yolu',
    latest: 'Son rehberler',
    read: 'Yazıyı oku',
    emptyTitle: 'Hikâyeler hazırlanıyor',
    emptyText: 'İlk eksiksiz sekiz dilli rehberi hazırlıyoruz. Tamamlanmamış hiçbir yazı burada gösterilmez.',
    footer: 'Uzayı keşfetmenin daha sakin bir yolu.'
  }),
  ja: Object.freeze({
    skip: 'ガイドへ移動',
    language: '記事の言語',
    product: 'Rockimalsを探検',
    eyebrow: 'Rockimalsの物語とガイド',
    title: '好奇心いっぱいの疑問。穏やかな宇宙の冒険。',
    intro: '最初の訪問者との出会いから今日の空の本物の科学まで、家族と小さな探検者のためのやさしいガイドです。',
    categories: '4つの探検方法',
    latest: '最新ガイド',
    read: '記事を読む',
    emptyTitle: '物語を準備しています',
    emptyText: '最初の8言語ガイドを準備中です。未完成の記事は表示しません。',
    footer: '宇宙をゆっくり楽しむ方法。'
  }),
  ko: Object.freeze({
    skip: '가이드로 이동',
    language: '문서 언어',
    product: 'Rockimals 탐험하기',
    eyebrow: 'Rockimals 이야기와 가이드',
    title: '호기심 가득한 질문. 차분한 우주 모험.',
    intro: '첫 방문자를 만나는 방법부터 오늘 하늘의 실제 과학까지, 가족과 어린 탐험가를 위한 친절한 가이드입니다.',
    categories: '네 가지 탐험 방법',
    latest: '최신 가이드',
    read: '글 읽기',
    emptyTitle: '이야기를 준비하고 있어요',
    emptyText: '첫 번째 8개 언어 가이드를 준비 중입니다. 완성되지 않은 글은 표시하지 않습니다.',
    footer: '우주를 차분하게 탐험하는 방법.'
  }),
  'zh-Hans': Object.freeze({
    skip: '跳到指南',
    language: '文章语言',
    product: '探索 Rockimals',
    eyebrow: 'Rockimals 故事与指南',
    title: '好奇的问题，宁静的太空冒险。',
    intro: '从认识第一位访客到了解今日天空中的真实科学，为家庭和小小探索者准备的友好指南。',
    categories: '四种探索方式',
    latest: '最新指南',
    read: '阅读文章',
    emptyTitle: '故事正在准备中',
    emptyText: '我们正在准备第一份完整的八语言指南，不会展示未完成的文章。',
    footer: '用更从容的方式探索太空。'
  }),
  fr: Object.freeze({
    skip: 'Aller aux guides',
    language: 'Langue de l’article',
    product: 'Explorer Rockimals',
    eyebrow: 'Histoires et guides Rockimals',
    title: 'Des questions curieuses. Des aventures spatiales sereines.',
    intro: 'Des guides accueillants pour les familles et les jeunes explorateurs, de la première rencontre à la vraie science du ciel d’aujourd’hui.',
    categories: 'Quatre façons d’explorer',
    latest: 'Derniers guides',
    read: 'Lire l’article',
    emptyTitle: 'Les histoires arrivent',
    emptyText: 'Nous préparons le premier guide complet en huit langues. Aucun article inachevé ne s’affiche ici.',
    footer: 'Une façon plus calme d’explorer l’espace.'
  }),
  de: Object.freeze({
    skip: 'Zu den Ratgebern springen',
    language: 'Artikelsprache',
    product: 'Rockimals entdecken',
    eyebrow: 'Rockimals Geschichten und Ratgeber',
    title: 'Neugierige Fragen. Ruhige Weltraum-Abenteuer.',
    intro: 'Freundliche Ratgeber für Familien und junge Entdecker – vom ersten Besucher bis zur echten Wissenschaft am heutigen Himmel.',
    categories: 'Vier Wege zum Entdecken',
    latest: 'Neueste Ratgeber',
    read: 'Artikel lesen',
    emptyTitle: 'Geschichten sind unterwegs',
    emptyText: 'Wir bereiten den ersten vollständigen Ratgeber in acht Sprachen vor. Unfertige Artikel werden hier nicht angezeigt.',
    footer: 'Eine ruhigere Art, den Weltraum zu entdecken.'
  }),
  es: Object.freeze({
    skip: 'Ir a las guías',
    language: 'Idioma del artículo',
    product: 'Explorar Rockimals',
    eyebrow: 'Historias y guías de Rockimals',
    title: 'Preguntas curiosas. Aventuras espaciales tranquilas.',
    intro: 'Guías cercanas para familias y jóvenes exploradores, desde conocer al primer visitante hasta comprender la ciencia real del cielo de hoy.',
    categories: 'Cuatro formas de explorar',
    latest: 'Guías recientes',
    read: 'Leer el artículo',
    emptyTitle: 'Las historias están en camino',
    emptyText: 'Estamos preparando la primera guía completa en ocho idiomas. Aquí no se muestran artículos sin terminar.',
    footer: 'Una forma más tranquila de explorar el espacio.'
  })
});

const CATEGORY_ORDER = ['discover-game', 'learn-space', 'family-guide', 'stories-activities'];

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatDate(value, locale) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value));
}

function renderCard(post, ui) {
  return `<article class="rkb-index-card">
  <a class="rkb-index-card-image" href="${escapeHtml(post.canonicalPath)}" tabindex="-1" aria-hidden="true"><img src="${escapeHtml(post.image)}" alt="" width="1200" height="630" loading="lazy" decoding="async"></a>
  <div class="rkb-index-card-body">
    <p class="rkb-kicker">${escapeHtml(post.categoryLabel)}</p>
    <h3><a href="${escapeHtml(post.canonicalPath)}">${escapeHtml(post.title)}</a></h3>
    <p>${escapeHtml(post.description)}</p>
    <div class="rkb-index-card-meta"><span>${escapeHtml(post.author.name)}</span><time datetime="${escapeHtml(post.published)}">${escapeHtml(formatDate(post.published, post.locale))}</time></div>
    <a class="rkb-index-read" href="${escapeHtml(post.canonicalPath)}">${escapeHtml(ui.read)} <span aria-hidden="true">→</span></a>
  </div>
</article>`;
}

function renderListings(posts, ui) {
  if (posts.length === 0) {
    return `<section class="rkb-index-empty"><img src="/assets/products/rockimals-icon.png?v=20260919" alt="" width="72" height="72"><h2>${escapeHtml(ui.emptyTitle)}</h2><p>${escapeHtml(ui.emptyText)}</p></section>`;
  }

  const sections = CATEGORY_ORDER.map((category) => ({
    category,
    posts: posts.filter((post) => post.category === category)
  })).filter((section) => section.posts.length > 0);

  return `<div class="rkb-index-sections">${sections.map((section) => `<section aria-labelledby="category-${section.category}">
  <div class="rkb-index-section-heading"><p class="rkb-kicker">${escapeHtml(ui.latest)}</p><h2 id="category-${section.category}">${escapeHtml(ROCKIMALS_BLOG_CATEGORIES[section.category][posts[0].locale])}</h2></div>
  <div class="rkb-index-grid">${section.posts.map((post) => renderCard(post, ui)).join('\n')}</div>
</section>`).join('\n')}</div>`;
}

export function renderRockimalsBlogIndex({
  manifest,
  locale,
  indexPaths = rockimalsBlogIndexPaths(),
  preview = false
}) {
  if (!ROCKIMALS_BLOG_LOCALES.includes(locale)) throw new Error(`Unsupported Rockimals blog locale: ${locale}.`);
  if (!manifest || !Array.isArray(manifest.posts)) throw new TypeError('A Rockimals publication manifest is required.');
  const ui = ROCKIMALS_INDEX_UI[locale];
  const posts = manifest.posts.filter((post) => post.locale === locale);
  const categoryItems = CATEGORY_ORDER.map((category) => (
    `<li>${escapeHtml(ROCKIMALS_BLOG_CATEGORIES[category][locale])}</li>`
  )).join('');

  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(ui.eyebrow)} · Rockimals</title>
<meta name="description" content="${escapeHtml(ui.intro)}">
${preview ? '<meta name="robots" content="noindex,nofollow">\n' : ''}<meta name="theme-color" content="#07101d">
<link rel="icon" type="image/png" href="/assets/products/rockimals-icon.png?v=20260919">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&amp;family=Inter:wght@400;500;600;700;800&amp;family=Noto+Sans+JP:wght@400;600;700&amp;family=Noto+Sans+KR:wght@400;600;700&amp;family=Noto+Sans+SC:wght@400;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/rockimals-blog.css?v=20260922-index">
</head>
<body class="rkb-page rkb-index-page">
<a class="rkb-skip" href="#blog-content">${escapeHtml(ui.skip)}</a>
<header class="rkb-header"><div class="rkb-wrap rkb-nav">
  <a class="rkb-brand" href="${rockimalsProductPath(locale)}"><img src="/assets/products/rockimals-icon.png?v=20260919" alt="" width="42" height="42"><span>Rockimals</span></a>
  <div class="rkb-nav-actions"><a class="rkb-back" href="${rockimalsProductPath(locale)}">${escapeHtml(ui.product)}</a>${renderRockimalsLanguageMenu({ activeLocale: locale, paths: indexPaths, ariaLabel: ui.language })}</div>
</div></header>
<main id="blog-content">
  <section class="rkb-index-hero"><div class="rkb-stars" aria-hidden="true"></div><div class="rkb-wrap rkb-index-hero-inner">
    <p class="rkb-kicker">${escapeHtml(ui.eyebrow)}</p>
    <h1>${escapeHtml(ui.title)}</h1>
    <p>${escapeHtml(ui.intro)}</p>
    <div class="rkb-category-guide"><h2>${escapeHtml(ui.categories)}</h2><ul>${categoryItems}</ul></div>
  </div></section>
  <div class="rkb-wrap rkb-index-content">${renderListings(posts, ui)}</div>
</main>
<footer class="rkb-footer"><div class="rkb-wrap"><span>© 2026 Rockimals</span><span>${escapeHtml(ui.footer)}</span></div></footer>
</body>
</html>`;
}
