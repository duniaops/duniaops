import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { createRockimalsBlogManifest, loadRockimalsBlogSources } from '../scripts/rockimals-blog-content.mjs';
import { renderRockimalsBlogIndex } from '../scripts/rockimals-blog-index.mjs';
import { ROCKIMALS_GOOGLE_PLAY_URL, rockimalsGooglePlayBadge } from '../scripts/rockimals-blog-cta.mjs';

test('English language switch stays on Rockimals in a local preview', async () => {
  const script = await readFile(new URL('../js/rockimals-landing.js', import.meta.url), 'utf8');
  const destinationFor = (hostname) => {
    let onChange;
    let destination;
    const select = {
      value: 'en',
      closest: () => null,
      addEventListener: (event, callback) => { if (event === 'change') onChange = callback; }
    };
    runInNewContext(script, {
      document: {
        querySelector: (selector) => selector === '[data-rockimals-language]' ? select : selector === '[data-rockimals-page]' ? {} : null,
        querySelectorAll: () => []
      },
      window: { location: { hostname, assign: (url) => { destination = url; } } }
    });
    onChange();
    return destination;
  };

  assert.equal(destinationFor('127.0.0.1'), '/products/rockimals-locales/en.html');
  assert.equal(destinationFor('localhost'), '/products/rockimals-locales/en.html');
  assert.equal(destinationFor('rockimals.duniaops.com'), '/');
});

test('every landing locale has live Google Play copy and a badge asset', async () => {
  const locales = JSON.parse(await readFile(new URL('../content/rockimals-landing/locales.json', import.meta.url), 'utf8'));
  const source = await readFile(new URL('../products/rockimals.html', import.meta.url), 'utf8');

  for (const [locale, copy] of Object.entries(locales)) {
    assert.ok(copy.googlePlay && copy.availableOn.includes('Android'), `${locale}: missing Android availability copy`);
    const badge = await readFile(new URL(`..${rockimalsGooglePlayBadge(locale)}`, import.meta.url));
    assert.ok(badge.length > 0, `${locale}: missing localized Google Play badge`);
    assert.equal(copy.googleReview, undefined);
  }
  assert.ok(source.includes(ROCKIMALS_GOOGLE_PLAY_URL));
  assert.doesNotMatch(source, /Google Play · In review/);
});

test('featured Rockimals blog card has a readable, bounded layout', async () => {
  const css = await readFile(new URL('../css/rockimals-landing.css', import.meta.url), 'utf8');
  const cardRule = css.match(/\.rk-blog-feature\{([^}]+)\}/)?.[1] ?? '';
  const imageRule = css.match(/\.rk-blog-feature img\{([^}]+)\}/)?.[1] ?? '';

  assert.match(cardRule, /grid-template-columns:minmax\(300px,360px\) minmax\(0,1fr\)/);
  assert.match(cardRule, /max-width:1080px;margin-inline:auto/);
  assert.match(imageRule, /height:auto;aspect-ratio:1200\/630;object-fit:contain/);
  assert.match(css, /\.rk-blog-feature-description\{[^}]*-webkit-line-clamp:2/);
  assert.match(css, /\.rk-blog-feature\{grid-template-columns:1fr/);
  assert.match(css, /\.rk-blog-feature img\{height:auto;max-height:none\}/);
  assert.match(css, /\.rk-blog-highlight\+\.rk-story\{padding-top:76px\}/);
});

test('parent guide links appear only after all eight locales are published', async () => {
  const sources = await loadRockimalsBlogSources({
    contentDir: fileURLToPath(new URL('../content/rockimals-blog/', import.meta.url))
  });
  const published = '2026-10-05T10:00:00Z';
  const manifestFor = (draft) => createRockimalsBlogManifest(sources.map((post) => (
    post.translationKey === 'rockimals-parent-controls'
      ? { ...post, draft, published, updated: published }
      : post
  )), { asOf: '2026-10-06T00:00:00Z' });

  assert.equal(manifestFor(true).topics.some((topic) => topic.translationKey === 'rockimals-parent-controls'), false);

  const ready = manifestFor(false);
  const topic = ready.topics.find((item) => item.translationKey === 'rockimals-parent-controls');
  assert.equal(topic?.posts.length, 8);
  for (const post of topic.posts) {
    const expected = post.locale === 'en'
      ? '/blog/' + post.slug
      : '/' + post.locale + '/blog/' + post.slug;
    assert.equal(post.canonicalPath, expected);
    assert.ok(renderRockimalsBlogIndex({ manifest: ready, locale: post.locale }).includes('href="' + expected + '"'));
  }

  const builder = await readFile(new URL('../scripts/build-rockimals-landing.mjs', import.meta.url), 'utf8');
  assert.match(builder, /topic\.translationKey === 'rockimals-parent-controls'/);
  assert.match(builder, /\$\{familyGuideLink\}<div class="rk-language-band"/);
});
