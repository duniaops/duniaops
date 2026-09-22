import MarkdownIt from 'markdown-it';
import { ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';
import {
  rockimalsBlogIndexPath,
  rockimalsProductPath,
  renderRockimalsLanguageMenu
} from './rockimals-blog-navigation.mjs';

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
    footer: 'A calmer way to explore space.'
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
    footer: 'Uzayı keşfetmenin daha sakin bir yolu.'
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
    footer: '宇宙をゆっくり楽しむ方法。'
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
    footer: '우주를 차분하게 탐험하는 방법.'
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
    footer: '用更从容的方式探索太空。'
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
    footer: 'Une façon plus calme d’explorer l’espace.'
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
    footer: 'Eine ruhigere Art, den Weltraum zu entdecken.'
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
    footer: 'Una forma más tranquila de explorar el espacio.'
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
    ? `<nav class="rkb-toc" aria-labelledby="toc-title"><h2 id="toc-title">${escapeHtml(ui.contents)}</h2><ol>${rendered.toc.map((item) => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join('')}</ol></nav>`
    : '';
  const primaryAction = ctaHref
    ? `<a class="rkb-primary-action" href="${escapeHtml(ctaHref)}" rel="noopener" data-rockimals-cta="${escapeHtml(post.cta?.id ?? '')}">${escapeHtml(post.cta?.label ?? '')}</a>`
    : '';

  return `<!doctype html>
<html lang="${escapeHtml(post.locale)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(post.title)} · Rockimals</title>
<meta name="description" content="${escapeHtml(post.description)}">
${preview ? '<meta name="robots" content="noindex,nofollow">\n' : ''}<meta name="theme-color" content="#07101d">
<link rel="icon" type="image/png" href="/assets/products/rockimals-icon.png?v=20260919">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&amp;family=Inter:wght@400;500;600;700;800&amp;family=Noto+Sans+JP:wght@400;600;700&amp;family=Noto+Sans+KR:wght@400;600;700&amp;family=Noto+Sans+SC:wght@400;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/rockimals-blog.css?v=20260922-article">
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
        <p class="rkb-meta"><span>${escapeHtml(post.author.name)}</span><span aria-hidden="true">·</span><span>${escapeHtml(ui.published)} <time datetime="${escapeHtml(post.published)}">${escapeHtml(formatDate(post.published, post.locale))}</time></span>${showUpdated ? `<span aria-hidden="true">·</span><span>${escapeHtml(ui.updated)} <time datetime="${escapeHtml(post.updated)}">${escapeHtml(formatDate(post.updated, post.locale))}</time></span>` : ''}</p>
        <figure class="rkb-cover"><img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" width="1200" height="630" fetchpriority="high"></figure>
      </div>
    </header>
    <div class="rkb-wrap rkb-article-layout">
      ${toc}
      <div class="rkb-reading-column">
        <aside class="rkb-answer" aria-labelledby="quick-answer-title"><p class="rkb-kicker" id="quick-answer-title">${escapeHtml(ui.quickAnswer)}</p><p>${escapeHtml(post.description)}</p></aside>
        <div class="rkb-prose">${rendered.html}</div>
        ${renderExperience(experience, ui)}
        ${primaryAction ? `<aside class="rkb-main-cta">${primaryAction}</aside>` : ''}
        ${renderRelated(post, ui)}
      </div>
    </div>
  </article>
</main>
<footer class="rkb-footer"><div class="rkb-wrap"><span>© 2026 Rockimals</span><span>${escapeHtml(ui.footer)}</span></div></footer>
</body>
</html>`;
}
