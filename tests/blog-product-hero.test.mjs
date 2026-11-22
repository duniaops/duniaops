import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import matter from 'gray-matter';
import { renderProductHero } from '../scripts/blog-product-hero.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLE = 'building-a-privacy-first-ios-app-lessons-from-lumo';

test('generated Lumo banner exposes a named store link around the official badge', async () => {
  const html = await readFile(path.join(ROOT, 'blog', `${ARTICLE}.html`), 'utf8');
  const hero = html.match(/<figure class="article-hero-image">([\s\S]*?)<\/figure>/)?.[1];
  assert.ok(hero, 'product action must be inside the existing cover');
  assert.match(hero, /src="\/assets\/blog\/lumo-banner-icon-128.png" alt="Lumo"/);
  assert.match(hero, /<a class="article-hero-store" href="https:\/\/apps.apple.com\/gb\/app\/lumo-photo-culling\/id6799718934" aria-label="Download Lumo on the App Store"><img src="\/assets\/products\/download-on-the-app-store.svg"/);
  assert.doesNotMatch(hero, /\bonclick=|\bdownload=|javascript:/);
});

test('product stylesheet URL follows its bytes despite immutable CDN caching', async () => {
  const html = await readFile(path.join(ROOT, 'blog', `${ARTICLE}.html`), 'utf8');
  const styles = await readFile(path.join(ROOT, 'css', 'blog-product-hero.css'));
  const version = createHash('sha256').update(styles).digest('hex').slice(0, 12);
  assert.ok(html.includes(`href="/css/blog-product-hero.css?v=${version}"`));
});

test('articles without product metadata retain their ordinary cover', async () => {
  const dir = path.join(ROOT, 'content', 'blog');
  let checked = 0;
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.md') || name.startsWith('_')) continue;
    const { data } = matter(await readFile(path.join(dir, name), 'utf8'));
    if (data.draft || data.heroProduct !== undefined) continue;
    const html = await readFile(path.join(ROOT, 'blog', name.replace(/\.md$/, '.html')), 'utf8');
    assert.ok(!html.includes('article-hero-brand'), name);
    assert.ok(!html.includes('blog-product-hero.css'), name);
    checked += 1;
  }
  assert.ok(checked > 0);
});

test('unrecognised product metadata cannot supply banner HTML or a destination', () => {
  assert.equal(renderProductHero(undefined), '');
  for (const invalid of ['', null, false, 'other', '<script>', { href: 'javascript:alert(1)' }]) {
    assert.throws(() => renderProductHero(invalid), /Unsupported heroProduct/);
  }
});
