import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('featured Rockimals blog card uses a compact thumbnail at every breakpoint', async () => {
  const css = await readFile(new URL('../css/rockimals-landing.css', import.meta.url), 'utf8');
  const imageRule = css.match(/\.rk-blog-feature img\{([^}]+)\}/)?.[1] ?? '';

  assert.match(imageRule, /height:auto/);
  assert.match(css, /\.rk-blog-feature\{[^}]*grid-template-columns:126px minmax\(0,1fr\)/);
  assert.match(css, /\.rk-blog-feature-description\{[^}]*-webkit-line-clamp:1/);
  assert.match(css, /\.rk-blog-feature\{grid-template-columns:90px minmax\(0,1fr\)/);
  assert.match(css, /\.rk-blog-feature-description\{display:none\}/);
});
