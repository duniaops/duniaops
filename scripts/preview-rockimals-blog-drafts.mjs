import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadRockimalsBlogSources,
  ROCKIMALS_BLOG_CATEGORIES
} from './rockimals-blog-content.mjs';
import { renderRockimalsBlogArticle } from './rockimals-blog-article.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'rockimals-blog');
const OUTPUT_DIR = path.join(ROOT, '.rockimals-blog-preview', 'drafts');
const APP_STORE_URL = 'https://apps.apple.com/gb/app/rockimals/id6792505608';

const EXPERIENCE_COPY = Object.freeze({
  en: Object.freeze({
    title: 'Meet a visitor on Radar',
    text: 'Tap a visitor, then compare its size, Moon-distance and speed before opening the available story.',
    label: 'Back to the Rockimals product page',
    imageAlt: 'Rockimals Radar showing visitors around Earth'
  }),
  tr: Object.freeze({
    title: 'Radar’da bir ziyaretçiyle tanışın',
    text: 'Bir ziyaretçiye dokunun; açılabilen hikâyeye geçmeden önce boyutunu, Ay uzaklığını ve hızını karşılaştırın.',
    label: 'Rockimals ürün sayfasına dönün',
    imageAlt: 'Dünya çevresindeki ziyaretçileri gösteren Rockimals Radar ekranı'
  })
});

function productPath(locale) {
  return locale === 'en' ? '/' : `/${locale}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function main() {
  if (path.basename(OUTPUT_DIR) !== 'drafts' || path.basename(path.dirname(OUTPUT_DIR)) !== '.rockimals-blog-preview') {
    throw new Error(`Refusing to clean unexpected preview directory: ${OUTPUT_DIR}`);
  }

  const sources = (await loadRockimalsBlogSources({ contentDir: CONTENT_DIR }))
    .filter(({ draft }) => draft);
  const groups = new Map();
  for (const post of sources) {
    const group = groups.get(post.translationKey) ?? [];
    group.push(post);
    groups.set(post.translationKey, group);
  }

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });
  const links = [];

  for (const [translationKey, posts] of groups) {
    const topicDir = path.join(OUTPUT_DIR, translationKey);
    const alternatePaths = Object.fromEntries(posts.map(({ locale }) => [locale, `./${locale}.html`]));
    await mkdir(topicDir, { recursive: true });

    for (const post of posts) {
      const copy = EXPERIENCE_COPY[post.locale];
      const previewPost = {
        ...post,
        categoryLabel: ROCKIMALS_BLOG_CATEGORIES[post.category][post.locale],
        alternatePaths
      };
      const html = renderRockimalsBlogArticle({
        post: previewPost,
        ctaHref: APP_STORE_URL,
        experience: copy ? {
          title: copy.title,
          text: copy.text,
          href: productPath(post.locale),
          label: copy.label,
          image: `/assets/products/rockimals-preview/${post.locale}/01-radar-home.jpg`,
          imageAlt: copy.imageAlt,
          width: 828,
          height: 1800
        } : null,
        preview: true
      });
      const filename = `${post.locale}.html`;
      await writeFile(path.join(topicDir, filename), html);
      links.push(`<li><a href="./${translationKey}/${filename}">${escapeHtml(post.locale)}: ${escapeHtml(post.title)}</a></li>`);
    }
  }

  await writeFile(
    path.join(OUTPUT_DIR, 'index.html'),
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex,nofollow"><title>Rockimals draft previews</title><body><h1>Rockimals draft previews</h1><ul>${links.join('')}</ul></body></html>`
  );
  console.log(`Built ${sources.length} private Rockimals draft preview(s) in ${path.relative(ROOT, OUTPUT_DIR)}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
