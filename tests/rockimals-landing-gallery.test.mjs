import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('Rockimals screenshots are laid out without a horizontal-only scroll dependency', async () => {
  const css = await readFile(new URL('../css/rockimals-landing.css', import.meta.url), 'utf8');
  const generator = await readFile(new URL('../scripts/build-rockimals-landing.mjs', import.meta.url), 'utf8');
  const galleryRule = css.match(/\.rk-shot-row\{([^}]+)\}/)?.[1] ?? '';

  assert.match(galleryRule, /display:grid/);
  assert.match(galleryRule, /grid-template-columns:repeat\(6,/);
  assert.doesNotMatch(galleryRule, /overflow-x|scroll-snap|scrollbar-color/);
  assert.match(css, /@media\(max-width:1500px\)[^{]*\{[^}]*\.rk-shot-row\{[^}]*grid-template-columns:repeat\(3,/);
  assert.match(css, /@media\(max-width:680px\)[^{]*\{[^}]*\.rk-shot-row\{[^}]*grid-template-columns:repeat\(2,/);
  assert.match(css, /@media\(max-width:420px\)[^{]*\{[^}]*\.rk-shot-row\{[^}]*grid-template-columns:1fr/);
  assert.doesNotMatch(generator, /class="rk-shot-row" tabindex="0"/);
});
