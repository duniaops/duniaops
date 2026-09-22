import { ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';

export const ROCKIMALS_ORIGIN = 'https://rockimals.duniaops.com';

const OG_LOCALES = Object.freeze({
  en: 'en_GB',
  tr: 'tr_TR',
  ja: 'ja_JP',
  ko: 'ko_KR',
  'zh-Hans': 'zh_CN',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES'
});

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function absoluteUrl(pathname) {
  return new URL(pathname, `${ROCKIMALS_ORIGIN}/`).href;
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

export function renderRockimalsSeo({
  locale,
  title,
  schemaTitle = title,
  description,
  canonicalPath,
  alternatePaths,
  image,
  imageAlt,
  kind,
  published,
  updated,
  authorName,
  indexPath,
  indexName
}) {
  if (!ROCKIMALS_BLOG_LOCALES.includes(locale)) throw new Error(`Unsupported Rockimals SEO locale: ${locale}.`);
  if (!canonicalPath) throw new TypeError('canonicalPath is required for Rockimals SEO.');

  const canonical = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(image);
  const alternates = alternatePaths ?? {};
  const alternateLinks = ROCKIMALS_BLOG_LOCALES
    .filter((candidate) => alternates[candidate])
    .map((candidate) => `<link rel="alternate" hreflang="${candidate}" href="${escapeHtml(absoluteUrl(alternates[candidate]))}">`);
  if (alternates.en) {
    alternateLinks.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrl(alternates.en))}">`);
  }

  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Rockimals', item: `${ROCKIMALS_ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: indexName, item: absoluteUrl(indexPath) }
  ];
  if (kind === 'article') {
    breadcrumbItems.push({ '@type': 'ListItem', position: 3, name: schemaTitle, item: canonical });
  }

  const primarySchema = kind === 'article'
    ? {
        '@type': 'BlogPosting',
        headline: schemaTitle,
        description,
        image: imageUrl,
        datePublished: published,
        dateModified: updated,
        inLanguage: locale,
        mainEntityOfPage: canonical,
        author: { '@type': 'Person', name: authorName },
        publisher: { '@type': 'Organization', name: 'DuniaOps', url: 'https://www.duniaops.com/' },
        isPartOf: { '@type': 'Blog', name: indexName, url: absoluteUrl(indexPath) }
      }
    : {
        '@type': 'Blog',
        name: title,
        description,
        url: canonical,
        inLanguage: locale,
        publisher: { '@type': 'Organization', name: 'DuniaOps', url: 'https://www.duniaops.com/' }
      };
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      primarySchema,
      { '@type': 'BreadcrumbList', itemListElement: breadcrumbItems }
    ]
  };

  const articleMeta = kind === 'article'
    ? `\n<meta property="article:published_time" content="${escapeHtml(published)}">\n<meta property="article:modified_time" content="${escapeHtml(updated)}">`
    : '';

  return `<link rel="canonical" href="${escapeHtml(canonical)}">
${alternateLinks.join('\n')}
<meta property="og:type" content="${kind === 'article' ? 'article' : 'website'}">
<meta property="og:site_name" content="Rockimals">
<meta property="og:locale" content="${OG_LOCALES[locale]}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="${escapeHtml(imageUrl)}">
<meta property="og:image:alt" content="${escapeHtml(imageAlt)}">${articleMeta}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(imageUrl)}">
<script type="application/ld+json">${safeJson(structuredData)}</script>`;
}
