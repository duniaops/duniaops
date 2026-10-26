import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { ROCKIMALS_BLOG_CATEGORIES, ROCKIMALS_BLOG_LOCALES } from '../scripts/rockimals-blog-content.mjs';
import { ROCKIMALS_INDEX_UI, renderRockimalsBlogIndex } from '../scripts/rockimals-blog-index.mjs';
import { renderRockimalsBlogArticle } from '../scripts/rockimals-blog-article.mjs';

function manifestPost(locale, overrides = {}) {
  return {
    translationKey: 'first-visitor',
    locale,
    title: `Published ${locale}`,
    description: `Description ${locale}`,
    category: 'discover-game',
    categoryLabel: ROCKIMALS_BLOG_CATEGORIES['discover-game'][locale],
    published: '2026-09-22T10:00:00.000Z',
    updated: '2026-09-22T10:00:00.000Z',
    image: '/assets/products/rockimals-card-hero-v2.jpg',
    imageAlt: `Image ${locale}`,
    author: { id: 'duniaops-team', name: 'DuniaOps Team' },
    cta: { id: 'app-store', label: `CTA ${locale}` },
    relatedPosts: [],
    canonicalPath: locale === 'en' ? '/blog/published-en' : `/${locale}/blog/published-${locale}`,
    alternatePaths: Object.fromEntries(ROCKIMALS_BLOG_LOCALES.map((target) => [target, `/${target}/same-topic`])),
    bodyMarkdown: '## Sources\n\n- Source',
    source: `fixture/${locale}.md`,
    ...overrides
  };
}

test('each index renders only the publishable posts supplied for its locale', () => {
  const manifest = { posts: ROCKIMALS_BLOG_LOCALES.map((locale) => manifestPost(locale)) };

  for (const locale of ROCKIMALS_BLOG_LOCALES) {
    const html = renderRockimalsBlogIndex({ manifest, locale });
    assert.match(html, new RegExp(`Published ${locale}`));
    for (const otherLocale of ROCKIMALS_BLOG_LOCALES.filter((candidate) => candidate !== locale)) {
      assert.doesNotMatch(html, new RegExp(`Published ${otherLocale}`));
    }
    assert.doesNotMatch(html, /<script(?! type="application\/ld\+json")/);
  }
});

test('the latest-posts label appears once above all category columns', () => {
  const manifest = { posts: [
    manifestPost('tr'),
    manifestPost('tr', {
      translationKey: 'asteroid', category: 'learn-space',
      canonicalPath: '/tr/blog/asteroid', title: 'Asteroid'
    }),
    manifestPost('tr', {
      translationKey: 'parent-guide', category: 'family-guide',
      canonicalPath: '/tr/blog/parent-guide', title: 'Parent Guide'
    })
  ] };
  const html = renderRockimalsBlogIndex({ manifest, locale: 'tr' });

  assert.equal(html.split(ROCKIMALS_INDEX_UI.tr.latest).length - 1, 1);
  assert.match(html, /class="rkb-kicker rkb-index-listings-label">Son rehberler<\/p>\s*<div class="rkb-index-sections">/);
  assert.equal((html.match(/class="rkb-index-section-heading"/g) ?? []).length, 3);
});

test('latest guides put the newest category and its newest card first', () => {
  const manifest = { posts: [
    manifestPost('tr', { title: 'Old game guide', published: '2026-09-22T10:00:00.000Z' }),
    manifestPost('tr', {
      translationKey: 'old-asteroid', category: 'learn-space', title: 'Old asteroid guide',
      published: '2026-10-16T10:00:00.000Z'
    }),
    manifestPost('tr', {
      translationKey: 'new-asteroid', category: 'learn-space', title: 'New asteroid guide',
      published: '2026-10-26T10:00:00.000Z'
    }),
    manifestPost('tr', {
      translationKey: 'parent-guide', category: 'family-guide', title: 'Parent guide',
      published: '2026-10-19T10:00:00.000Z'
    })
  ] };
  const html = renderRockimalsBlogIndex({ manifest, locale: 'tr' });
  const listings = html.slice(html.indexOf('class="rkb-index-sections"'));

  assert.ok(listings.indexOf('id="category-learn-space"') < listings.indexOf('id="category-family-guide"'));
  assert.ok(listings.indexOf('id="category-family-guide"') < listings.indexOf('id="category-discover-game"'));
  assert.ok(listings.indexOf('New asteroid guide') < listings.indexOf('Old asteroid guide'));
});

test('only one-card categories use their natural height', () => {
  const manifest = { posts: [
    manifestPost('tr', { category: 'learn-space' }),
    manifestPost('tr', { translationKey: 'parent-one', category: 'family-guide' }),
    manifestPost('tr', { translationKey: 'parent-two', category: 'family-guide' })
  ] };
  const html = renderRockimalsBlogIndex({ manifest, locale: 'tr' });

  assert.match(html, /<section class="rkb-index-section-single" aria-labelledby="category-learn-space">/);
  assert.match(html, /<section aria-labelledby="category-family-guide">/);
});

test('empty indexes show a useful state without cards, filters, or invented links', () => {
  const html = renderRockimalsBlogIndex({ manifest: { posts: [] }, locale: 'en' });

  assert.match(html, new RegExp(ROCKIMALS_INDEX_UI.en.emptyTitle));
  assert.doesNotMatch(html, /class="rkb-index-card"/);
  assert.doesNotMatch(html, /search|filter/i);
});

test('index language links target the corresponding locale indexes', () => {
  const html = renderRockimalsBlogIndex({ manifest: { posts: [] }, locale: 'tr' });

  assert.match(html, /href="\/blog" lang="en" hreflang="en"/);
  assert.match(html, /href="\/ja\/blog" lang="ja" hreflang="ja"/);
  assert.match(html, /href="\/tr\/blog" lang="tr" hreflang="tr" aria-current="page"/);
});

test('article language links preserve the topic and omit unavailable translations', () => {
  const article = manifestPost('en', {
    alternatePaths: { en: '/blog/same-topic', tr: '/tr/blog/ayni-konu' }
  });
  const html = renderRockimalsBlogArticle({ post: article });

  assert.match(html, /href="\/tr\/blog\/ayni-konu" lang="tr" hreflang="tr"/);
  assert.doesNotMatch(html, /lang="ja" hreflang="ja"/);
  assert.match(html, /href="\/blog">Blog<\/a>/);
  assert.match(html, /class="rkb-brand" href="\/"/);
});

test('the product landing source provides a localized blog navigation label for every locale', async () => {
  const locales = JSON.parse(await readFile(new URL('../content/rockimals-landing/locales.json', import.meta.url), 'utf8'));
  const generator = await readFile(new URL('../scripts/build-rockimals-landing.mjs', import.meta.url), 'utf8');

  for (const locale of ROCKIMALS_BLOG_LOCALES) assert.ok(locales[locale].navBlog, `${locale} is missing navBlog`);
  assert.match(generator, /const blogPath = `https:\/\/rockimals\.duniaops\.com\$\{code === 'en'/);
  assert.match(generator, /href="\$\{blogPath\}"/);
});

test('index CSS includes responsive cards and keyboard-visible native language navigation', async () => {
  const css = await readFile(new URL('../css/rockimals-blog.css', import.meta.url), 'utf8');
  assert.match(css, /\.rkb-index-sections \{[^}]+grid-template-columns: repeat\(3/);
  assert.match(css, /\.rkb-index-sections \{[^}]+grid-auto-rows: auto/);
  assert.match(css, /\.rkb-index-sections \{[^}]+align-items: stretch/);
  assert.match(css, /\.rkb-index-sections > \.rkb-index-section-single \{ align-self: start; \}/);
  assert.match(css, /\.rkb-index-section-heading h2 \{ min-height: 2\.16em; \}/);
  assert.match(css, /\.rkb-index-grid \{[^}]+grid-auto-rows: 1fr/);
  assert.match(css, /\.rkb-index-card \{[^}]+flex-direction: column/);
  assert.match(css, /@media \(max-width: 900px\) \{[\s\S]+?\.rkb-index-sections \{ grid-template-columns: repeat\(2/);
  assert.match(css, /\.rkb-language summary:focus-visible/);
  assert.match(css, /\.rkb-index-sections \{ grid-template-columns: 1fr; grid-auto-rows: auto; align-items: start; gap: 46px; \}/);
  assert.match(css, /\.rkb-index-section-heading h2 \{ min-height: 0; \}/);
  assert.doesNotMatch(css, /\.rkb-index-card:only-child/);
  assert.match(css, /\.rkb-index-read \{[^}]+align-self: flex-end;[^}]+text-decoration: none;/);
});
