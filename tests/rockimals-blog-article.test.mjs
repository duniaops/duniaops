import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import {
  ROCKIMALS_ARTICLE_UI,
  renderRockimalsBlogArticle
} from '../scripts/rockimals-blog-article.mjs';
import { ROCKIMALS_BLOG_LOCALES } from '../scripts/rockimals-blog-content.mjs';

function post(overrides = {}) {
  return {
    translationKey: 'first-visitor',
    locale: 'en',
    title: 'Meet your first visitor',
    description: 'Open the Radar, choose a visitor and begin a calm space adventure.',
    categoryLabel: 'Discover the Game',
    published: '2026-09-22T10:00:00.000Z',
    updated: '2026-09-22T10:00:00.000Z',
    image: '/assets/products/rockimals-card-hero-v2.jpg',
    imageAlt: 'Rockimals characters travelling through space',
    author: { id: 'duniaops-team', name: 'DuniaOps Team' },
    cta: { id: 'app-store', label: 'Download on the App Store' },
    relatedPosts: [],
    bodyMarkdown: `Introduction.

## Start with the Radar

Choose a visitor.

## What happens next

Read the story.

## Sources

- [NASA](https://www.nasa.gov/)
`,
    canonicalPath: '/blog/meet-your-first-visitor',
    alternatePaths: Object.fromEntries(ROCKIMALS_BLOG_LOCALES.map((locale) => [
      locale,
      locale === 'en' ? '/blog/meet-your-first-visitor' : `/${locale}/blog/meet-your-first-visitor`
    ])),
    source: 'fixture/en.md',
    ...overrides
  };
}

const experience = {
  title: 'Find the Radar',
  text: 'See today’s visitors around Earth.',
  href: '/#explore',
  label: 'Explore the game',
  image: '/assets/products/rockimals-preview/en/01-radar-home.jpg',
  imageAlt: 'The Rockimals Radar screen',
  width: 828,
  height: 1800
};

test('renders a complete semantic article without client-side JavaScript', () => {
  const html = renderRockimalsBlogArticle({
    post: post(),
    ctaHref: 'https://apps.apple.com/example',
    experience,
    preview: true
  });

  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /<main id="article-content">/);
  assert.match(html, /<h2 id="sources">Sources<\/h2>/);
  assert.match(html, /<nav class="rkb-toc"/);
  assert.match(html, /href="#start-with-the-radar"/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.doesNotMatch(html, /<script/);
});

test('shows the App Store badge near the title and marks Google Play as unavailable', () => {
  const html = renderRockimalsBlogArticle({
    post: post({ locale: 'tr', cta: { id: 'app-store', label: 'Rockimals’ı App Store’dan indirin' } }),
    ctaHref: 'https://apps.apple.com/gb/app/rockimals/id6792505608',
    preview: true
  });

  const hero = html.match(/<header class="rkb-hero">([\s\S]*?)<\/header>/)?.[1] ?? '';
  assert.match(hero, /class="rkb-app-store" href="https:\/\/apps\.apple\.com\/gb\/app\/rockimals\/id6792505608"/);
  assert.match(hero, /download-on-the-app-store\.svg" alt="Rockimals’ı App Store’dan indirin"/);
  assert.match(hero, /Google Play · İncelemede/);
  assert.ok(hero.indexOf('rkb-store-actions') < hero.indexOf('rkb-cover'));
  assert.doesNotMatch(hero, /DuniaOps Team|DuniaOps Ekibi|Yayınlandı/);
  assert.match(html, /class="rkb-footer-credit">© 2026 Rockimals[\s\S]*DuniaOps Team[\s\S]*Yayınlandı/);
  assert.equal((html.match(/data-rockimals-cta=/g) ?? []).length, 1);
  assert.doesNotMatch(hero, /href="https:\/\/play\.google\.com/);
});

test('renders fixed cover dimensions and a lazy portrait experience image', () => {
  const html = renderRockimalsBlogArticle({ post: post(), experience });

  assert.match(html, /class="rkb-cover"><img[^>]+width="1200" height="630"/);
  assert.match(html, /class="rkb-experience-visual"><img[^>]+width="828" height="1800" loading="lazy" decoding="async"/);
});

test('does not label a different resolved CTA as an App Store download', () => {
  const html = renderRockimalsBlogArticle({
    post: post({ cta: { id: 'learn-more', label: 'Learn more' } }),
    ctaHref: 'https://example.com/guide'
  });

  assert.match(html, /data-rockimals-cta="learn-more">Learn more<\/a>/);
  assert.doesNotMatch(html, /download-on-the-app-store\.svg|Google Play · In review/);
});

test('omits related UI when the publication manifest provides no related posts', () => {
  const html = renderRockimalsBlogArticle({ post: post() });
  assert.doesNotMatch(html, /class="rkb-related"/);
});

test('renders only related entries supplied by the publication manifest', () => {
  const html = renderRockimalsBlogArticle({
    post: post({
      relatedPosts: [{ translationKey: 'asteroid-guide', title: 'What is an asteroid?', path: '/blog/what-is-an-asteroid' }]
    })
  });

  assert.match(html, /href="\/blog\/what-is-an-asteroid"/);
  assert.equal((html.match(/class="rkb-related-grid"/g) ?? []).length, 1);
});

test('rejects an article body that attempts to add a second page heading', () => {
  assert.throws(
    () => renderRockimalsBlogArticle({ post: post({ bodyMarkdown: '# Another H1' }) }),
    /cannot contain an H1/
  );
});

test('renders representative text and document language for every supported locale', () => {
  const titles = {
    en: 'Long English article title',
    tr: 'Uzun Türkçe makale başlığı',
    ja: '長い日本語の記事タイトル',
    ko: '긴 한국어 문서 제목',
    'zh-Hans': '较长的简体中文文章标题',
    fr: 'Un long titre d’article français',
    de: 'Ein langer deutscher Artikeltitel',
    es: 'Un título largo en español'
  };

  for (const locale of ROCKIMALS_BLOG_LOCALES) {
    const html = renderRockimalsBlogArticle({
      post: post({ locale, title: titles[locale], categoryLabel: `Category ${locale}` })
    });
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assert.ok(html.includes(titles[locale]));
    assert.ok(html.includes(ROCKIMALS_ARTICLE_UI[locale].quickAnswer));
  }
});

test('article CSS includes narrow-screen, table overflow, focus, and reduced-motion protections', async () => {
  const css = await readFile(new URL('../css/rockimals-blog.css', import.meta.url), 'utf8');
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /"Noto Sans JP"/);
  assert.match(css, /"Noto Sans KR"/);
  assert.match(css, /"Noto Sans SC"/);
  assert.match(css, /\.rkb-store-actions \{[^}]+flex-wrap: wrap/);
});
