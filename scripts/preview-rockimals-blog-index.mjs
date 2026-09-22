import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROCKIMALS_BLOG_CATEGORIES, ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';
import { renderRockimalsBlogIndex } from './rockimals-blog-index.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(ROOT, '.rockimals-blog-preview', 'indexes');

const TITLES = {
  en: 'How does Rockimals work? Meet your first visitor',
  tr: 'Rockimals nasıl oynanır? İlk ziyaretçinle tanış',
  ja: 'Rockimalsの遊び方：最初の訪問者に会おう',
  ko: 'Rockimals 플레이 방법: 첫 방문자를 만나요',
  'zh-Hans': 'Rockimals怎么玩？认识第一位访客',
  fr: 'Comment jouer à Rockimals ? Rencontrez votre premier visiteur',
  de: 'Wie funktioniert Rockimals? Triff deinen ersten Besucher',
  es: '¿Cómo se juega a Rockimals? Conoce a tu primer visitante'
};

function previewManifest(landingLocales) {
  return {
    posts: ROCKIMALS_BLOG_LOCALES.map((locale) => ({
      translationKey: 'preview-first-visitor',
      locale,
      title: TITLES[locale],
      description: landingLocales[locale].heroLead,
      category: 'discover-game',
      categoryLabel: ROCKIMALS_BLOG_CATEGORIES['discover-game'][locale],
      published: '2026-09-22T10:00:00.000Z',
      image: '/assets/products/rockimals-card-hero-v2.jpg',
      imageAlt: `Rockimals · ${landingLocales[locale].heroTitle}`,
      author: { id: 'duniaops-team', name: 'DuniaOps Team' },
      canonicalPath: `../articles/${locale}.html`
    }))
  };
}

async function main() {
  if (path.basename(OUTPUT_DIR) !== 'indexes' || path.basename(path.dirname(OUTPUT_DIR)) !== '.rockimals-blog-preview') {
    throw new Error(`Refusing to clean unexpected preview directory: ${OUTPUT_DIR}`);
  }
  const landingLocales = JSON.parse(await readFile(path.join(ROOT, 'content', 'rockimals-landing', 'locales.json'), 'utf8'));
  const manifest = previewManifest(landingLocales);
  const indexPaths = Object.fromEntries(ROCKIMALS_BLOG_LOCALES.map((locale) => [locale, `./${locale}.html`]));
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const locale of ROCKIMALS_BLOG_LOCALES) {
    const html = renderRockimalsBlogIndex({ manifest, locale, indexPaths, preview: true });
    await writeFile(path.join(OUTPUT_DIR, `${locale}.html`), html);
  }
  await writeFile(path.join(OUTPUT_DIR, 'index.html'), renderRockimalsBlogIndex({
    manifest,
    locale: 'en',
    indexPaths,
    preview: true
  }));
  console.log(`Built eight private Rockimals blog index previews in ${path.relative(ROOT, OUTPUT_DIR)}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
