import { ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';

export const ROCKIMALS_LANGUAGE_LABELS = Object.freeze({
  en: 'English',
  tr: 'Türkçe',
  ja: '日本語',
  ko: '한국어',
  'zh-Hans': '简体中文',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español'
});

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function rockimalsProductPath(locale) {
  return locale === 'en' ? '/' : `/${locale}`;
}

export function rockimalsBlogIndexPath(locale) {
  return locale === 'en' ? '/blog' : `/${locale}/blog`;
}

export function rockimalsBlogIndexPaths() {
  return Object.fromEntries(ROCKIMALS_BLOG_LOCALES.map((locale) => (
    [locale, rockimalsBlogIndexPath(locale)]
  )));
}

export function renderRockimalsLanguageMenu({ activeLocale, paths, ariaLabel }) {
  const availableLocales = ROCKIMALS_BLOG_LOCALES.filter((locale) => paths?.[locale]);
  if (availableLocales.length <= 1) return '';

  const links = availableLocales.map((locale) => {
    const current = locale === activeLocale ? ' aria-current="page"' : '';
    return `<li><a href="${escapeHtml(paths[locale])}" lang="${locale}" hreflang="${locale}"${current}><span>${escapeHtml(ROCKIMALS_LANGUAGE_LABELS[locale])}</span>${current ? '<span aria-hidden="true">✓</span>' : ''}</a></li>`;
  }).join('');

  return `<details class="rkb-language">
  <summary><span class="rkb-sr-only">${escapeHtml(ariaLabel)}: </span><span lang="${activeLocale}">${escapeHtml(ROCKIMALS_LANGUAGE_LABELS[activeLocale])}</span><span aria-hidden="true">⌄</span></summary>
  <nav aria-label="${escapeHtml(ariaLabel)}"><ul>${links}</ul></nav>
</details>`;
}
