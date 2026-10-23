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

test('localized YouTube video embeds directly and autoplays muted only in view', async () => {
  const locales = JSON.parse(await readFile(new URL('../content/rockimals-landing/locales.json', import.meta.url), 'utf8'));
  const expectedIds = {
    en: 'BjPU9gBs1L8', tr: 'Ei_x0fT2JhU', ja: 'DibkbeV7DuA', ko: 'XV18QovMEBw',
    'zh-Hans': 'UgD6GQ3NhFU', fr: 'UwklqBOykAE', de: '-Vp5eX9HHec', es: 'vorQHCjdqTs'
  };
  for (const [locale, id] of Object.entries(expectedIds)) {
    assert.ok(locales[locale].videoTitle, `${locale}: missing video title`);
    assert.equal(locales[locale].videoUrl, `https://www.youtube.com/watch?v=${id}`);
  }

  const source = await readFile(new URL('../products/rockimals.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../css/rockimals-landing.css', import.meta.url), 'utf8');
  const poster = await readFile(new URL('../assets/products/rockimals-heroes/lineup.jpg', import.meta.url));
  assert.ok(poster.length > 0);
  assert.match(source, /data-rockimals-video-id="BjPU9gBs1L8"/);
  assert.match(source, /class="rk-video-frame-wrap" data-rockimals-video-frame/);
  assert.doesNotMatch(source, /data-rockimals-video-play|rk-video-cta|youtube\.com\/watch\?v=BjPU9gBs1L8/);
  assert.ok(source.indexOf('class="rk-video-feature"') < source.indexOf('class="rk-today-card"'));
  assert.match(css, /\.rk-video-feature\{[^}]*max-width:900px/);
  assert.match(css, /\.rk-video-frame-wrap\{[^}]*aspect-ratio:16\/9/);
  assert.match(css, /\.rk-video-frame-wrap iframe\{display:block;width:100%;height:100%;border:0\}/);

  const script = await readFile(new URL('../js/rockimals-landing.js', import.meta.url), 'utf8');
  const calls = [];
  const frameSlot = { children: [], append(child) { this.children.push(child); } };
  const feature = {
    dataset: { rockimalsVideoId: expectedIds.tr },
    querySelector: (selector) => selector === '[data-rockimals-video-frame]' ? frameSlot : { textContent: locales.tr.videoTitle }
  };
  let observe;
  const browser = {
    location: { origin: 'http://127.0.0.1:8091' },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    IntersectionObserver: class {}
  };
  const Observer = class {
    constructor(callback) { observe = callback; }
    observe(target) { assert.equal(target, frameSlot); }
  };
  runInNewContext(script, {
    document: {
      querySelector: (selector) => selector === '[data-rockimals-video-id]' ? feature : null,
      createElement: (tag) => ({ tag }),
      head: { append: (child) => { calls.push(`script:${child.src}`); } },
      addEventListener: () => {},
      hidden: false
    },
    window: browser,
    IntersectionObserver: Observer
  });
  assert.equal(frameSlot.children.length, 1, 'the YouTube player is embedded without a click');
  assert.match(frameSlot.children[0].src, new RegExp(`youtube-nocookie\\.com/embed/${expectedIds.tr}\\?enablejsapi=1`));
  assert.equal(frameSlot.children[0].loading, 'lazy');
  assert.deepEqual(calls, [], 'the API loads only when the player becomes visible');
  observe([{ intersectionRatio: 0.6 }]);
  assert.deepEqual(calls, ['script:https://www.youtube.com/iframe_api']);
  let onReady;
  browser.YT = { Player: class {
    constructor(frame, options) {
      assert.equal(frame, frameSlot.children[0]);
      this.mute = () => calls.push('mute');
      this.playVideo = () => calls.push('play');
      this.pauseVideo = () => calls.push('pause');
      onReady = options.events.onReady;
    }
  } };
  browser.onYouTubeIframeAPIReady();
  onReady();
  assert.deepEqual(calls.slice(-2), ['mute', 'play']);
  observe([{ intersectionRatio: 0 }]);
  assert.equal(calls.at(-1), 'pause');
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
