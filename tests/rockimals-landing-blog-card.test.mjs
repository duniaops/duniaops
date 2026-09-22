import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('featured Rockimals blog card has a readable, bounded layout', async () => {
  const css = await readFile(new URL('../css/rockimals-landing.css', import.meta.url), 'utf8');
  const cardRule = css.match(/\.rk-blog-feature\{([^}]+)\}/)?.[1] ?? '';
  const imageRule = css.match(/\.rk-blog-feature img\{([^}]+)\}/)?.[1] ?? '';

  assert.match(cardRule, /grid-template-columns:172px minmax\(0,1fr\)/);
  assert.match(cardRule, /max-width:930px;min-height:220px/);
  assert.match(imageRule, /height:190px/);
  assert.match(css, /\.rk-blog-feature-description\{[^}]*-webkit-line-clamp:2/);
  assert.match(css, /\.rk-blog-feature\{grid-template-columns:1fr/);
  assert.match(css, /\.rk-blog-feature img\{max-height:155px\}/);
});
