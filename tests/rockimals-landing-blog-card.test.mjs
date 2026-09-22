import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

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
