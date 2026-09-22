import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROCKIMALS_BLOG_CATEGORIES, ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';
import { ROCKIMALS_ARTICLE_UI, renderRockimalsBlogArticle } from './rockimals-blog-article.mjs';
import { ROCKIMALS_APP_STORE_URL } from './rockimals-blog-cta.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(ROOT, '.rockimals-blog-preview', 'articles');

const TITLES = {
  en: 'How does Rockimals work? Meet your first visitor and begin exploring',
  tr: 'Rockimals nasıl oynanır? İlk ziyaretçinle tanış ve keşfetmeye başla',
  ja: 'Rockimalsの遊び方：最初の訪問者に出会い、宇宙の探検を始めよう',
  ko: 'Rockimals는 어떻게 플레이하나요? 첫 방문자를 만나 우주 탐험을 시작해요',
  'zh-Hans': 'Rockimals怎么玩？认识你的第一位访客，开始探索真实的太空',
  fr: 'Comment jouer à Rockimals ? Rencontrez votre premier visiteur et commencez à explorer',
  de: 'Wie funktioniert Rockimals? Triff deinen ersten Besucher und beginne die Entdeckungsreise',
  es: '¿Cómo se juega a Rockimals? Conoce a tu primer visitante y empieza a explorar'
};

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function previewPost(locale, landing) {
  const ui = ROCKIMALS_ARTICLE_UI[locale];
  const home = locale === 'en' ? '/' : `/${locale}`;
  return {
    translationKey: 'preview-first-visitor',
    locale,
    title: TITLES[locale],
    description: landing.heroLead,
    categoryLabel: ROCKIMALS_BLOG_CATEGORIES['discover-game'][locale],
    published: '2026-09-22T10:00:00.000Z',
    updated: '2026-09-22T10:00:00.000Z',
    image: '/assets/products/rockimals-card-hero-v2.jpg',
    imageAlt: `Rockimals · ${landing.heroTitle}`,
    author: { id: 'duniaops-team', name: 'DuniaOps Team' },
    cta: { id: 'app-store', label: landing.appStore },
    relatedPosts: [],
    alternatePaths: Object.fromEntries(ROCKIMALS_BLOG_LOCALES.map((targetLocale) => (
      [targetLocale, `./${targetLocale}.html`]
    ))),
    source: `preview/${locale}.md`,
    bodyMarkdown: `${landing.heroLead}

## ${landing.storyCard1Title}

${landing.storyCard1Text}

## ${landing.insideTitle}

| ${landing.shot1} | ${landing.shot2} | ${landing.shot3} |
| --- | --- | --- |
| ${landing.shot1Text} | ${landing.shot2Text} | ${landing.shot3Text} |

## ${ui.sources}

- [NASA Solar System Exploration](https://science.nasa.gov/solar-system/)
- [Rockimals](${home})
`
  };
}

async function main() {
  if (path.basename(OUTPUT_DIR) !== 'articles' || path.basename(path.dirname(OUTPUT_DIR)) !== '.rockimals-blog-preview') {
    throw new Error(`Refusing to clean unexpected preview directory: ${OUTPUT_DIR}`);
  }
  const landingLocales = JSON.parse(await readFile(path.join(ROOT, 'content', 'rockimals-landing', 'locales.json'), 'utf8'));
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const locale of ROCKIMALS_BLOG_LOCALES) {
    const landing = landingLocales[locale];
    if (!landing) throw new Error(`Missing Rockimals landing locale for article preview: ${locale}.`);
    const home = locale === 'en' ? '/' : `/${locale}`;
    const html = renderRockimalsBlogArticle({
      post: previewPost(locale, landing),
      ctaHref: ROCKIMALS_APP_STORE_URL,
      experience: {
        title: landing.insideTitle,
        text: landing.shot1Text,
        href: `${home}#explore`,
        label: landing.navExplore,
        image: `/assets/products/rockimals-preview/${locale}/01-radar-home.jpg`,
        imageAlt: `Rockimals · ${landing.shot1}`,
        width: 828,
        height: 1800
      },
      preview: true
    });
    await writeFile(path.join(OUTPUT_DIR, `${locale}.html`), html);
  }

  const links = ROCKIMALS_BLOG_LOCALES.map((locale) => (
    `<li><a href="./${locale}.html">${escapeHtml(landingLocales[locale].label)}</a></li>`
  )).join('');
  await writeFile(path.join(OUTPUT_DIR, 'index.html'), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex,nofollow"><title>Rockimals article previews</title><body><h1>Rockimals article previews</h1><ul>${links}</ul></body></html>`);
  console.log(`Built eight private Rockimals article previews in ${path.relative(ROOT, OUTPUT_DIR)}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
