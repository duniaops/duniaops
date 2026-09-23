import MarkdownIt from 'markdown-it';
import { ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';
import {
  rockimalsBlogIndexPath,
  rockimalsProductPath,
  renderRockimalsLanguageMenu
} from './rockimals-blog-navigation.mjs';
import { renderRockimalsSeo } from './rockimals-blog-seo.mjs';
import {
  ROCKIMALS_SMART_APP_BANNER,
  ROCKIMALS_STICKY_CTA_STYLE,
  renderRockimalsStickyCta
} from './rockimals-blog-cta.mjs';

export const ROCKIMALS_ARTICLE_UI = Object.freeze({
  en: Object.freeze({
    skip: 'Skip to article',
    blog: 'Blog',
    language: 'Article language',
    quickAnswer: 'Quick answer',
    contents: 'On this page',
    published: 'Published',
    updated: 'Updated',
    exploreEyebrow: 'Explore in Rockimals',
    related: 'Keep exploring',
    sources: 'Sources',
    googleReview: 'Google Play · In review',
    footer: 'A calmer way to explore space.',
    stickyText: 'Real asteroids, friendly space animals',
    stickyClose: 'Close'
  }),
  tr: Object.freeze({
    skip: 'Makaleye geç',
    blog: 'Blog',
    language: 'Yazı dili',
    quickAnswer: 'Kısa cevap',
    contents: 'Bu sayfada',
    published: 'Yayınlandı',
    updated: 'Güncellendi',
    exploreEyebrow: 'Rockimals’ta keşfet',
    related: 'Keşfetmeye devam et',
    sources: 'Kaynaklar',
    googleReview: 'Google Play · İncelemede',
    footer: 'Uzayı keşfetmenin daha sakin bir yolu.',
    stickyText: 'Gerçek asteroitler, sevimli uzay hayvanları',
    stickyClose: 'Kapat'
  }),
  ja: Object.freeze({
    skip: '記事へ移動',
    blog: 'ブログ',
    language: '記事の言語',
    quickAnswer: 'かんたんな答え',
    contents: 'このページの内容',
    published: '公開日',
    updated: '更新日',
    exploreEyebrow: 'Rockimalsで探検',
    related: 'もっと探検する',
    sources: '参考資料',
    googleReview: 'Google Play · 審査中',
    footer: '宇宙をゆっくり楽しむ方法。',
    stickyText: '本物の小惑星が、かわいい宇宙どうぶつに',
    stickyClose: '閉じる'
  }),
  ko: Object.freeze({
    skip: '본문으로 이동',
    blog: '블로그',
    language: '문서 언어',
    quickAnswer: '짧은 답변',
    contents: '이 페이지의 내용',
    published: '게시일',
    updated: '수정일',
    exploreEyebrow: 'Rockimals에서 탐험하기',
    related: '계속 탐험하기',
    sources: '출처',
    googleReview: 'Google Play · 검토 중',
    footer: '우주를 차분하게 탐험하는 방법.',
    stickyText: '진짜 소행성이 귀여운 우주 동물로',
    stickyClose: '닫기'
  }),
  'zh-Hans': Object.freeze({
    skip: '跳到正文',
    blog: '博客',
    language: '文章语言',
    quickAnswer: '简短回答',
    contents: '本页内容',
    published: '发布日期',
    updated: '更新日期',
    exploreEyebrow: '在 Rockimals 中探索',
    related: '继续探索',
    sources: '资料来源',
    googleReview: 'Google Play · 审核中',
    footer: '用更从容的方式探索太空。',
    stickyText: '真实的小行星，变成可爱的太空动物',
    stickyClose: '关闭'
  }),
  fr: Object.freeze({
    skip: 'Aller à l’article',
    blog: 'Blog',
    language: 'Langue de l’article',
    quickAnswer: 'Réponse courte',
    contents: 'Dans cet article',
    published: 'Publié le',
    updated: 'Mis à jour le',
    exploreEyebrow: 'Explorer dans Rockimals',
    related: 'Continuer l’exploration',
    sources: 'Sources',
    googleReview: 'Google Play · En cours d’examen',
    footer: 'Une façon plus calme d’explorer l’espace.',
    stickyText: 'De vrais astéroïdes, d’adorables animaux spatiaux',
    stickyClose: 'Fermer'
  }),
  de: Object.freeze({
    skip: 'Zum Artikel springen',
    blog: 'Blog',
    language: 'Artikelsprache',
    quickAnswer: 'Kurz erklärt',
    contents: 'Auf dieser Seite',
    published: 'Veröffentlicht',
    updated: 'Aktualisiert',
    exploreEyebrow: 'In Rockimals entdecken',
    related: 'Weiter entdecken',
    sources: 'Quellen',
    googleReview: 'Google Play · In Prüfung',
    footer: 'Eine ruhigere Art, den Weltraum zu entdecken.',
    stickyText: 'Echte Asteroiden, süße Weltraumtiere',
    stickyClose: 'Schließen'
  }),
  es: Object.freeze({
    skip: 'Ir al artículo',
    blog: 'Blog',
    language: 'Idioma del artículo',
    quickAnswer: 'Respuesta breve',
    contents: 'En esta página',
    published: 'Publicado',
    updated: 'Actualizado',
    exploreEyebrow: 'Explorar en Rockimals',
    related: 'Seguir explorando',
    sources: 'Fuentes',
    googleReview: 'Google Play · En revisión',
    footer: 'Una forma más tranquila de explorar el espacio.',
    stickyText: 'Asteroides reales, adorables animales espaciales',
    stickyClose: 'Cerrar'
  })
});

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function headingSlug(value) {
  return value
    .toLocaleLowerCase('en')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function renderMarkdown(markdown, source) {
  const toc = [];
  const headingIds = new Map();
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
  const tokens = md.parse(markdown, {});

  if (tokens.some((token) => token.type === 'heading_open' && token.tag === 'h1')) {
    throw new Error(`${source}: article body cannot contain an H1; the template owns the page heading.`);
  }

  const defaultHeadingOpen = md.renderer.rules.heading_open
    ?? ((items, index, options, env, renderer) => renderer.renderToken(items, index, options));
  md.renderer.rules.heading_open = (items, index, options, env, renderer) => {
    const token = items[index];
    const label = items[index + 1]?.content?.trim() || 'Section';
    const base = headingSlug(label);
    const seen = headingIds.get(base) ?? 0;
    headingIds.set(base, seen + 1);
    const id = seen ? `${base}-${seen + 1}` : base;
    token.attrSet('id', id);
    if (token.tag === 'h2') toc.push({ id, label });
    return defaultHeadingOpen(items, index, options, env, renderer);
  };

  const defaultLinkOpen = md.renderer.rules.link_open
    ?? ((items, index, options, env, renderer) => renderer.renderToken(items, index, options));
  md.renderer.rules.link_open = (items, index, options, env, renderer) => {
    const href = items[index].attrGet('href') ?? '';
    if (/^https?:\/\//i.test(href)) items[index].attrSet('rel', 'noopener');
    return defaultLinkOpen(items, index, options, env, renderer);
  };

  return { html: md.renderer.render(tokens, md.options, {}), toc };
}

function formatDate(value, locale) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value));
}

function renderRelated(post, ui) {
  if (!post.relatedPosts?.length) return '';
  return `<section class="rkb-related" aria-labelledby="related-title">
  <h2 id="related-title">${escapeHtml(ui.related)}</h2>
  <div class="rkb-related-grid">
    ${post.relatedPosts.map((related) => `<article><h3><a href="${escapeHtml(related.path)}">${escapeHtml(related.title)}</a></h3></article>`).join('\n    ')}
  </div>
</section>`;
}

function renderExperience(experience, ui) {
  if (!experience) return '';
  const action = experience.href && experience.label
    ? `<a class="rkb-secondary-action" href="${escapeHtml(experience.href)}">${escapeHtml(experience.label)}</a>`
    : '';
  const visual = experience.image
    ? `<figure class="rkb-experience-visual"><img src="${escapeHtml(experience.image)}" alt="${escapeHtml(experience.imageAlt)}" width="${Number(experience.width)}" height="${Number(experience.height)}" loading="lazy" decoding="async"></figure>`
    : '';

  return `<aside class="rkb-experience" aria-labelledby="experience-title">
  <div class="rkb-experience-copy">
    <p class="rkb-kicker">${escapeHtml(ui.exploreEyebrow)}</p>
    <h2 id="experience-title">${escapeHtml(experience.title)}</h2>
    <p>${escapeHtml(experience.text)}</p>
    ${action}
  </div>
  ${visual}
</aside>`;
}

function validateRenderInput(post, experience, ctaHref) {
  if (!post || typeof post !== 'object') throw new TypeError('post is required.');
  if (!ROCKIMALS_BLOG_LOCALES.includes(post.locale)) {
    throw new Error(`Unsupported Rockimals article locale: ${post.locale}.`);
  }
  for (const field of ['title', 'description', 'categoryLabel', 'published', 'updated', 'image', 'imageAlt', 'bodyMarkdown']) {
    if (typeof post[field] !== 'string' || !post[field].trim()) {
      throw new Error(`${post.source ?? 'article'}: "${field}" is required to render an article.`);
    }
  }
  if (!post.author?.name) throw new Error(`${post.source ?? 'article'}: author name is required.`);
  if (ctaHref && (!post.cta?.id || !post.cta?.label)) {
    throw new Error(`${post.source ?? 'article'}: a resolved CTA requires an id and localized label.`);
  }
  if (experience?.image) {
    if (!experience.imageAlt || !Number.isInteger(experience.width) || !Number.isInteger(experience.height)) {
      throw new Error('Article experience images require alt text and integer width/height values.');
    }
  }
}

export function renderRockimalsBlogArticle({
  post,
  ctaHref = '',
  experience = null,
  preview = false
}) {
  validateRenderInput(post, experience, ctaHref);
  const ui = ROCKIMALS_ARTICLE_UI[post.locale];
  const rendered = renderMarkdown(post.bodyMarkdown, post.source ?? post.translationKey);
  const home = rockimalsProductPath(post.locale);
  const showUpdated = post.updated !== post.published;
  const toc = rendered.toc.length >= 2
    ? `<nav class="rkb-toc" aria-labelledby="toc-title"><h2 id="toc-title">${escapeHtml(ui.contents)}</h2><ul>${rendered.toc.map((item) => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join('')}</ul></nav>`
    : '';
  const storeActions = ctaHref && post.cta.id === 'app-store'
    ? `<div class="rkb-store-actions"><a class="rkb-app-store" href="${escapeHtml(ctaHref)}" rel="noopener" data-rockimals-cta="${escapeHtml(post.cta.id)}"><img src="/assets/products/download-on-the-app-store.svg" alt="${escapeHtml(post.cta.label)}" width="180" height="60"></a><span class="rkb-google-status"><svg width="27" height="30" viewBox="0 0 29 32" aria-hidden="true" focusable="false"><path fill="#00d0ff" d="M1 1 17 16 1 31Z"/><path fill="#00ef77" d="m1 1 20 11-4 4Z"/><path fill="#ffce00" d="m21 12 7 4-7 4-4-4Z"/><path fill="#ff405b" d="m1 31 16-15 4 4Z"/></svg><span>${escapeHtml(ui.googleReview)}</span></span></div>`
    : ctaHref
      ? `<div class="rkb-store-actions"><a class="rkb-primary-action" href="${escapeHtml(ctaHref)}" rel="noopener" data-rockimals-cta="${escapeHtml(post.cta.id)}">${escapeHtml(post.cta.label)}</a></div>`
      : '';
  const articleMeta = `<span>${escapeHtml(post.author.name)}</span><span aria-hidden="true">·</span><span>${escapeHtml(ui.published)} <time datetime="${escapeHtml(post.published)}">${escapeHtml(formatDate(post.published, post.locale))}</time></span>${showUpdated ? `<span aria-hidden="true">·</span><span>${escapeHtml(ui.updated)} <time datetime="${escapeHtml(post.updated)}">${escapeHtml(formatDate(post.updated, post.locale))}</time></span>` : ''}`;
  const sticky = ctaHref && post.cta.id === 'app-store'
    ? renderRockimalsStickyCta({ href: ctaHref, text: ui.stickyText, storeLabel: post.cta.label, closeLabel: ui.stickyClose, inline: true })
    : '';
  const documentTitle = `${post.title} · Rockimals`;
  const seo = preview ? '' : `${renderRockimalsSeo({
    locale: post.locale,
    title: documentTitle,
    schemaTitle: post.title,
    description: post.description,
    canonicalPath: post.canonicalPath,
    alternatePaths: post.alternatePaths,
    image: post.image,
    imageAlt: post.imageAlt,
    kind: 'article',
    published: post.published,
    updated: post.updated,
    authorName: post.author.name,
    indexPath: rockimalsBlogIndexPath(post.locale),
    indexName: ui.blog
  })}\n`;

  return `<!doctype html>
<html lang="${escapeHtml(post.locale)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${ROCKIMALS_SMART_APP_BANNER}
<title>${escapeHtml(documentTitle)}</title>
<meta name="description" content="${escapeHtml(post.description)}">
${preview ? '<meta name="robots" content="noindex,nofollow">\n' : seo}<meta name="theme-color" content="#07101d">
<link rel="icon" type="image/png" href="/assets/products/rockimals-icon.png?v=20260919">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&amp;family=Inter:wght@400;500;600;700;800&amp;family=Noto+Sans+JP:wght@400;600;700&amp;family=Noto+Sans+KR:wght@400;600;700&amp;family=Noto+Sans+SC:wght@400;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/rockimals-blog.css?v=20260922-toc">${sticky ? `\n${ROCKIMALS_STICKY_CTA_STYLE}` : ''}
</head>
<body class="rkb-page">
<a class="rkb-skip" href="#article-content">${escapeHtml(ui.skip)}</a>
<header class="rkb-header">
  <div class="rkb-wrap rkb-nav">
    <a class="rkb-brand" href="${home}"><img src="/assets/products/rockimals-icon.png?v=20260919" alt="" width="42" height="42"><span>Rockimals</span></a>
    <div class="rkb-nav-actions"><a class="rkb-back" href="${rockimalsBlogIndexPath(post.locale)}">${escapeHtml(ui.blog)}</a>${renderRockimalsLanguageMenu({ activeLocale: post.locale, paths: post.alternatePaths, ariaLabel: ui.language })}</div>
  </div>
</header>
<main id="article-content">
  <article>
    <header class="rkb-hero">
      <div class="rkb-stars" aria-hidden="true"></div>
      <div class="rkb-wrap rkb-hero-inner">
        <p class="rkb-kicker">${escapeHtml(post.categoryLabel)}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="rkb-deck">${escapeHtml(post.description)}</p>
        ${storeActions}
        <figure class="rkb-cover"><img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" width="1200" height="630" fetchpriority="high"></figure>
      </div>
    </header>
    <div class="rkb-wrap rkb-article-layout">
      ${toc}
      <div class="rkb-reading-column">
        <aside class="rkb-answer" aria-labelledby="quick-answer-title"><p class="rkb-kicker" id="quick-answer-title">${escapeHtml(ui.quickAnswer)}</p><p>${escapeHtml(post.description)}</p></aside>
        <div class="rkb-prose">${rendered.html}</div>
        ${renderExperience(experience, ui)}
        ${renderRelated(post, ui)}
        ${sticky}
      </div>
    </div>
  </article>
</main>
<footer class="rkb-footer"><div class="rkb-wrap"><span class="rkb-footer-credit">© 2026 Rockimals <span aria-hidden="true">·</span> <span class="rkb-meta">${articleMeta}</span></span><span>${escapeHtml(ui.footer)}</span></div></footer>
</body>
</html>`;
}
