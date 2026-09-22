import assert from 'node:assert/strict';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { writeRockimalsBlog } from '../scripts/build-rockimals-blog.mjs';
import { ROCKIMALS_BLOG_CATEGORIES, ROCKIMALS_BLOG_LOCALES } from '../scripts/rockimals-blog-content.mjs';

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

function post(locale) {
  const slug = `published-${locale.toLowerCase()}`;
  const canonicalPath = locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
  return {
    translationKey: 'published-topic',
    locale,
    slug,
    title: `Published title ${locale}`,
    description: `Published description ${locale}`,
    category: 'discover-game',
    categoryLabel: ROCKIMALS_BLOG_CATEGORIES['discover-game'][locale],
    published: '2026-09-20T10:00:00.000Z',
    updated: '2026-09-21T10:00:00.000Z',
    image: '/assets/products/rockimals-card-hero-v2.jpg',
    imageAlt: `Rockimals cover ${locale}`,
    author: { id: 'duniaops-team', name: 'DuniaOps Team' },
    cta: { id: 'app-store', label: `CTA ${locale}` },
    relatedPosts: [],
    canonicalPath,
    alternatePaths: Object.fromEntries(ROCKIMALS_BLOG_LOCALES.map((candidate) => {
      const candidateSlug = `published-${candidate.toLowerCase()}`;
      return [candidate, candidate === 'en' ? `/blog/${candidateSlug}` : `/${candidate}/blog/${candidateSlug}`];
    })),
    bodyMarkdown: 'A visible introduction.\n\n## Sources\n\n- [NASA](https://www.nasa.gov/)',
    source: `fixture/${locale}.md`
  };
}

function manifest() {
  const posts = ROCKIMALS_BLOG_LOCALES.map(post);
  return {
    schemaVersion: 1,
    generatedAsOf: '2026-09-22T10:00:00.000Z',
    locales: [...ROCKIMALS_BLOG_LOCALES],
    categories: ROCKIMALS_BLOG_CATEGORIES,
    topics: [{ translationKey: 'published-topic', posts }],
    posts
  };
}

async function outputDirectory() {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'rockimals-blog-build-'));
  temporaryDirectories.push(temporaryDirectory);
  return path.join(temporaryDirectory, 'products', 'rockimals-blog');
}

test('writes eight indexes, localized articles, sitemap and robots from the publication manifest', async () => {
  const outputDir = await outputDirectory();
  await writeRockimalsBlog({ outputDir, manifest: manifest() });

  for (const locale of ROCKIMALS_BLOG_LOCALES) {
    const html = await readFile(path.join(outputDir, locale, 'index.html'), 'utf8');
    const canonical = locale === 'en'
      ? 'https://rockimals.duniaops.com/blog'
      : `https://rockimals.duniaops.com/${locale}/blog`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, /hreflang="x-default" href="https:\/\/rockimals\.duniaops\.com\/blog"/);
    await access(path.join(outputDir, locale, `published-${locale.toLowerCase()}`, 'index.html'));
  }

  const sitemap = await readFile(path.join(outputDir, 'sitemap.xml'), 'utf8');
  const robots = await readFile(path.join(outputDir, 'robots.txt'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 16);
  assert.match(sitemap, /https:\/\/rockimals\.duniaops\.com\/ja\/blog\/published-ja/);
  assert.match(robots, /Sitemap: https:\/\/rockimals\.duniaops\.com\/sitemap\.xml/);
});

test('article metadata and structured data match the visible localized article', async () => {
  const outputDir = await outputDirectory();
  await writeRockimalsBlog({ outputDir, manifest: manifest() });
  const html = await readFile(path.join(outputDir, 'tr', 'published-tr', 'index.html'), 'utf8');
  const schemaText = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  const schema = JSON.parse(schemaText);
  const article = schema['@graph'].find((entry) => entry['@type'] === 'BlogPosting');
  const breadcrumbs = schema['@graph'].find((entry) => entry['@type'] === 'BreadcrumbList');

  assert.equal(article.headline, 'Published title tr');
  assert.equal(article.author.name, 'DuniaOps Team');
  assert.equal(article.datePublished, '2026-09-20T10:00:00.000Z');
  assert.equal(article.mainEntityOfPage, 'https://rockimals.duniaops.com/tr/blog/published-tr');
  assert.equal(breadcrumbs.itemListElement.at(-1).name, 'Published title tr');
  assert.match(html, /<meta property="og:type" content="article">/);
  assert.match(html, /<link rel="alternate" hreflang="en" href="https:\/\/rockimals\.duniaops\.com\/blog\/published-en">/);
  assert.match(html, /data-rockimals-cta="app-store"/);
  assert.match(html, /href="https:\/\/apps\.apple\.com\/gb\/app\/rockimals\/id6792505608"/);
  assert.match(html, /download-on-the-app-store\.svg/);
});

test('rebuild removes only owned stale output and never invents withdrawn article URLs', async () => {
  const outputDir = await outputDirectory();
  const sibling = path.join(path.dirname(outputDir), 'keep-me.txt');
  await mkdir(path.join(outputDir, 'en', 'withdrawn'), { recursive: true });
  await writeFile(path.join(outputDir, 'en', 'withdrawn', 'index.html'), 'stale');
  await writeFile(sibling, 'preserve');

  const emptyManifest = { ...manifest(), topics: [], posts: [] };
  await writeRockimalsBlog({ outputDir, manifest: emptyManifest });

  await assert.rejects(access(path.join(outputDir, 'en', 'withdrawn', 'index.html')));
  assert.equal(await readFile(sibling, 'utf8'), 'preserve');
  const sitemap = await readFile(path.join(outputDir, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 8);
  assert.doesNotMatch(sitemap, /withdrawn/);
});

test('refuses to clean a directory outside the generator-owned output boundary', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'rockimals-blog-boundary-'));
  temporaryDirectories.push(temporaryDirectory);
  await assert.rejects(
    writeRockimalsBlog({ outputDir: path.join(temporaryDirectory, 'dist'), manifest: manifest() }),
    /Refusing to clean unexpected Rockimals blog output/
  );
});
