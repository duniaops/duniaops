import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createRockimalsBlogManifest,
  loadRockimalsBlogSources,
  ROCKIMALS_BLOG_LOCALES
} from './rockimals-blog-content.mjs';
import { renderRockimalsBlogArticle } from './rockimals-blog-article.mjs';
import { rockimalsAppStoreUrl } from './rockimals-blog-cta.mjs';
import { renderRockimalsBlogIndex } from './rockimals-blog-index.mjs';
import { rockimalsBlogIndexPath, rockimalsBlogIndexPaths } from './rockimals-blog-navigation.mjs';
import { ROCKIMALS_ORIGIN } from './rockimals-blog-seo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'rockimals-blog');
const OUTPUT_DIR = path.join(ROOT, 'dist', 'products', 'rockimals-blog');

function assertOwnedOutput(outputDir) {
  if (path.basename(outputDir) !== 'rockimals-blog' || path.basename(path.dirname(outputDir)) !== 'products') {
    throw new Error(`Refusing to clean unexpected Rockimals blog output: ${outputDir}`);
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderSitemap(manifest) {
  const indexes = ROCKIMALS_BLOG_LOCALES.map((locale) => ({
    path: rockimalsBlogIndexPath(locale),
    updated: null
  }));
  const posts = manifest.posts.map((post) => ({
    path: post.canonicalPath,
    updated: post.updated.slice(0, 10)
  }));
  const urls = [...indexes, ...posts].map(({ path: pathname, updated }) => `  <url>
    <loc>${escapeXml(new URL(pathname, `${ROCKIMALS_ORIGIN}/`).href)}</loc>${updated ? `\n    <lastmod>${updated}</lastmod>` : ''}
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${ROCKIMALS_ORIGIN}/sitemap.xml
`;
}

async function writeOwnedFile(outputDir, relativePath, content) {
  const destination = path.resolve(outputDir, relativePath);
  if (!destination.startsWith(`${outputDir}${path.sep}`)) {
    throw new Error(`Refusing to write outside Rockimals blog output: ${relativePath}`);
  }
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

export async function writeRockimalsBlog({ outputDir, manifest }) {
  const ownedOutputDir = path.resolve(outputDir);
  assertOwnedOutput(ownedOutputDir);
  await rm(ownedOutputDir, { recursive: true, force: true });
  await mkdir(ownedOutputDir, { recursive: true });

  const indexPaths = rockimalsBlogIndexPaths();
  for (const locale of ROCKIMALS_BLOG_LOCALES) {
    await writeOwnedFile(
      ownedOutputDir,
      path.join(locale, 'index.html'),
      renderRockimalsBlogIndex({ manifest, locale, indexPaths })
    );
  }
  for (const post of manifest.posts) {
    await writeOwnedFile(
      ownedOutputDir,
      path.join(post.locale, post.slug, 'index.html'),
      renderRockimalsBlogArticle({
        post,
        ctaHref: post.cta.id === 'app-store' ? rockimalsAppStoreUrl(`blog_${post.locale}`) : ''
      })
    );
  }
  await writeOwnedFile(ownedOutputDir, 'sitemap.xml', renderSitemap(manifest));
  await writeOwnedFile(ownedOutputDir, 'robots.txt', renderRobots());
}

export async function buildRockimalsBlog({
  contentDir = CONTENT_DIR,
  outputDir = OUTPUT_DIR,
  asOf = new Date()
} = {}) {
  const posts = await loadRockimalsBlogSources({ contentDir });
  const manifest = createRockimalsBlogManifest(posts, { asOf });
  await writeRockimalsBlog({ outputDir, manifest });
  return manifest;
}

async function main() {
  const manifest = await buildRockimalsBlog();
  console.log(
    `Built eight Rockimals blog indexes and ${manifest.posts.length} article page(s) `
    + `from ${manifest.topics.length} publishable topic package(s).`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
