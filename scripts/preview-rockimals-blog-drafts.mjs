import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadRockimalsBlogSources,
  ROCKIMALS_BLOG_CATEGORIES
} from './rockimals-blog-content.mjs';
import { renderRockimalsBlogArticle } from './rockimals-blog-article.mjs';
import { ROCKIMALS_APP_STORE_URL } from './rockimals-blog-cta.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'rockimals-blog');
const OUTPUT_DIR = path.join(ROOT, '.rockimals-blog-preview', 'drafts');

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
  }),
  ja: Object.freeze({
    title: 'レーダーで訪問者に会おう',
    text: '訪問者をタップし、読めるお話へ進む前に、大きさ、月までの距離を基準にした値、速さを比べてみましょう。',
    label: 'Rockimalsの製品ページに戻る',
    imageAlt: '地球のまわりの訪問者を表示するRockimalsのレーダー画面'
  }),
  ko: Object.freeze({
    title: '레이더에서 방문자를 만나 보세요',
    text: '방문자를 누르고, 열 수 있는 이야기로 이동하기 전에 크기와 달 거리 기준 값, 속도를 비교해 보세요.',
    label: 'Rockimals 제품 페이지로 돌아가기',
    imageAlt: '지구 주변의 방문자를 보여 주는 Rockimals 레이더 화면'
  }),
  'zh-Hans': Object.freeze({
    title: '在雷达中认识一位访客',
    text: '点选访客，在进入可开启的故事前，比较它的大小、以月球距离为参照的数值和速度。',
    label: '返回Rockimals产品页面',
    imageAlt: '显示地球周围访客的Rockimals雷达画面'
  }),
  fr: Object.freeze({
    title: 'Rencontrez un visiteur sur le Radar',
    text: 'Touchez un visiteur, puis comparez sa taille, sa distance exprimée par rapport à la Lune et sa vitesse avant d’ouvrir l’histoire disponible.',
    label: 'Revenir à la page produit de Rockimals',
    imageAlt: 'Radar de Rockimals montrant des visiteurs autour de la Terre'
  }),
  de: Object.freeze({
    title: 'Triff einen Besucher auf dem Radar',
    text: 'Tippe auf einen Besucher und vergleiche Größe, Mondentfernung und Geschwindigkeit, bevor du die verfügbare Geschichte öffnest.',
    label: 'Zurück zur Rockimals-Produktseite',
    imageAlt: 'Rockimals-Radar mit Besuchern rund um die Erde'
  }),
  es: Object.freeze({
    title: 'Conoce a un visitante en el Radar',
    text: 'Toca un visitante y compara su tamaño, su distancia respecto a la Luna y su velocidad antes de abrir la historia disponible.',
    label: 'Volver a la página de producto de Rockimals',
    imageAlt: 'Radar de Rockimals con visitantes alrededor de la Tierra'
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
        ctaHref: ROCKIMALS_APP_STORE_URL,
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
