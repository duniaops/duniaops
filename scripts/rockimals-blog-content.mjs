import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

export const ROCKIMALS_BLOG_LOCALES = Object.freeze([
  'en',
  'tr',
  'ja',
  'ko',
  'zh-Hans',
  'fr',
  'de',
  'es'
]);

export const ROCKIMALS_BLOG_CATEGORIES = Object.freeze({
  'discover-game': Object.freeze({
    en: 'Discover the Game',
    tr: 'Oyunu Keşfet',
    ja: 'ゲームを知る',
    ko: '게임 알아보기',
    'zh-Hans': '探索游戏',
    fr: 'Découvrir le jeu',
    de: 'Das Spiel entdecken',
    es: 'Descubrir el juego'
  }),
  'learn-space': Object.freeze({
    en: 'Learn about Space',
    tr: 'Uzayı Öğren',
    ja: '宇宙を学ぶ',
    ko: '우주 배우기',
    'zh-Hans': '探索太空',
    fr: 'Découvrir l’espace',
    de: 'Den Weltraum entdecken',
    es: 'Aprender sobre el espacio'
  }),
  'family-guide': Object.freeze({
    en: 'Family Guide',
    tr: 'Aile Rehberi',
    ja: 'ファミリーガイド',
    ko: '가족 가이드',
    'zh-Hans': '家庭指南',
    fr: 'Guide des familles',
    de: 'Familienratgeber',
    es: 'Guía para familias'
  }),
  'stories-activities': Object.freeze({
    en: 'Stories & Activities',
    tr: 'Hikâyeler ve Etkinlikler',
    ja: 'ストーリーとアクティビティ',
    ko: '이야기와 활동',
    'zh-Hans': '故事与活动',
    fr: 'Histoires et activités',
    de: 'Geschichten und Aktivitäten',
    es: 'Historias y actividades'
  })
});

const LOCALE_SET = new Set(ROCKIMALS_BLOG_LOCALES);
const CATEGORY_SET = new Set(Object.keys(ROCKIMALS_BLOG_CATEGORIES));
const IDENTIFIER_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ASSET_PATTERN = /^\/assets\/rockimals-blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/[^/?#]+\.(?:avif|jpe?g|png|webp)$/i;
const RFC3339_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

export class RockimalsBlogContentError extends Error {
  constructor(issues) {
    const uniqueIssues = [...new Set(issues)];
    super(`Rockimals blog content validation failed:\n- ${uniqueIssues.join('\n- ')}`);
    this.name = 'RockimalsBlogContentError';
    this.issues = uniqueIssues;
  }
}

function addRequiredString(data, field, source, issues) {
  const value = data[field];
  if (typeof value !== 'string' || !value.trim()) {
    issues.push(`${source}: "${field}" must be a non-empty string.`);
    return '';
  }
  return value.trim();
}

function normalizeTimestamp(value, field, source, issues) {
  if (typeof value !== 'string' || !RFC3339_PATTERN.test(value)) {
    issues.push(`${source}: "${field}" must be an RFC 3339 timestamp with an explicit time zone.`);
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    issues.push(`${source}: "${field}" is not a valid timestamp.`);
    return '';
  }
  return parsed.toISOString();
}

function normalizeStringArray(value, field, source, issues) {
  if (!Array.isArray(value)) {
    issues.push(`${source}: "${field}" must be an array.`);
    return [];
  }

  const result = [];
  for (const item of value) {
    if (typeof item !== 'string' || !IDENTIFIER_PATTERN.test(item)) {
      issues.push(`${source}: every "${field}" entry must be a lowercase kebab-case identifier.`);
      continue;
    }
    if (result.includes(item)) {
      issues.push(`${source}: "${field}" contains duplicate entry "${item}".`);
      continue;
    }
    result.push(item);
  }
  return result;
}

function normalizeAuthor(value, source, issues) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    issues.push(`${source}: "author" must contain "id" and "name".`);
    return { id: '', name: '' };
  }
  return {
    id: addRequiredString(value, 'id', `${source} author`, issues),
    name: addRequiredString(value, 'name', `${source} author`, issues)
  };
}

function normalizeCta(value, source, issues) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    issues.push(`${source}: "cta" must contain "id" and localized "label".`);
    return { id: '', label: '' };
  }
  return {
    id: addRequiredString(value, 'id', `${source} cta`, issues),
    label: addRequiredString(value, 'label', `${source} cta`, issues)
  };
}

function parseFrontmatter(raw, source, issues) {
  try {
    return matter(raw, {
      engines: {
        yaml: (input) => yaml.safeLoad(input, { schema: yaml.JSON_SCHEMA })
      }
    });
  } catch (error) {
    issues.push(`${source}: front matter could not be parsed (${error.message}).`);
    return { data: {}, content: '' };
  }
}

function validatePost({ raw, source, expectedTranslationKey, expectedLocale }) {
  const issues = [];
  const parsed = parseFrontmatter(raw, source, issues);
  const data = parsed.data ?? {};
  const translationKey = addRequiredString(data, 'translationKey', source, issues);
  const locale = addRequiredString(data, 'locale', source, issues);
  const slug = addRequiredString(data, 'slug', source, issues);
  const title = addRequiredString(data, 'title', source, issues);
  const description = addRequiredString(data, 'description', source, issues);
  const category = addRequiredString(data, 'category', source, issues);
  const image = addRequiredString(data, 'image', source, issues);
  const imageAlt = addRequiredString(data, 'imageAlt', source, issues);
  const published = normalizeTimestamp(data.published, 'published', source, issues);
  const updated = normalizeTimestamp(data.updated, 'updated', source, issues);
  const author = normalizeAuthor(data.author, source, issues);
  const cta = normalizeCta(data.cta, source, issues);
  const relatedPosts = normalizeStringArray(data.relatedPosts, 'relatedPosts', source, issues);

  if (!IDENTIFIER_PATTERN.test(translationKey)) {
    issues.push(`${source}: "translationKey" must be a lowercase kebab-case identifier.`);
  }
  if (translationKey && translationKey !== expectedTranslationKey) {
    issues.push(`${source}: "translationKey" must match its directory "${expectedTranslationKey}".`);
  }
  if (!LOCALE_SET.has(locale)) {
    issues.push(`${source}: "locale" must be one of ${ROCKIMALS_BLOG_LOCALES.join(', ')}.`);
  }
  if (locale && locale !== expectedLocale) {
    issues.push(`${source}: "locale" must match its filename "${expectedLocale}.md".`);
  }
  if (!SLUG_PATTERN.test(slug)) {
    issues.push(`${source}: "slug" must be lowercase ASCII kebab-case.`);
  }
  if (!CATEGORY_SET.has(category)) {
    issues.push(`${source}: "category" must be one of ${[...CATEGORY_SET].join(', ')}.`);
  }
  if (typeof data.draft !== 'boolean') {
    issues.push(`${source}: "draft" must be true or false.`);
  }
  if (typeof data.productGuide !== 'boolean') {
    issues.push(`${source}: "productGuide" must be true or false.`);
  }
  if (image && !ASSET_PATTERN.test(image)) {
    issues.push(`${source}: "image" must be a web image below /assets/rockimals-blog/<translation-key>/.`);
  } else if (translationKey && image && !image.startsWith(`/assets/rockimals-blog/${translationKey}/`)) {
    issues.push(`${source}: "image" must use the same translation key directory as the article.`);
  }
  if (published && updated && updated < published) {
    issues.push(`${source}: "updated" cannot be earlier than "published".`);
  }
  if (relatedPosts.includes(translationKey)) {
    issues.push(`${source}: "relatedPosts" cannot reference the article itself.`);
  }

  let reviewedAppVersion = null;
  if (data.reviewedAppVersion !== undefined && data.reviewedAppVersion !== null) {
    reviewedAppVersion = addRequiredString(data, 'reviewedAppVersion', source, issues);
  }
  if (data.productGuide === true && !reviewedAppVersion) {
    issues.push(`${source}: product guides require "reviewedAppVersion".`);
  }
  if (data.productGuide !== true && reviewedAppVersion) {
    issues.push(`${source}: "reviewedAppVersion" is only valid when "productGuide" is true.`);
  }
  if (data.draft === false && !parsed.content.trim()) {
    issues.push(`${source}: a non-draft article must contain Markdown body content.`);
  }

  if (issues.length) throw new RockimalsBlogContentError(issues);

  return Object.freeze({
    translationKey,
    locale,
    slug,
    title,
    description,
    category,
    published,
    updated,
    draft: data.draft,
    image,
    imageAlt,
    author: Object.freeze(author),
    relatedPosts: Object.freeze(relatedPosts),
    cta: Object.freeze(cta),
    productGuide: data.productGuide,
    reviewedAppVersion,
    bodyMarkdown: parsed.content.trim(),
    source
  });
}

async function sourceFiles(contentDir) {
  const entries = await readdir(contentDir, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const files = [];
  const issues = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const entryPath = path.join(contentDir, entry.name);
    if (!entry.isDirectory()) {
      issues.push(`${path.relative(contentDir, entryPath)}: article sources must use <translation-key>/<locale>.md.`);
      continue;
    }
    if (!IDENTIFIER_PATTERN.test(entry.name)) {
      issues.push(`${entry.name}: translation-key directories must be lowercase kebab-case.`);
      continue;
    }

    const localeEntries = await readdir(entryPath, { withFileTypes: true });
    for (const localeEntry of localeEntries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (localeEntry.name.startsWith('_') || localeEntry.name.startsWith('.')) continue;
      const localePath = path.join(entryPath, localeEntry.name);
      if (!localeEntry.isFile() || path.extname(localeEntry.name) !== '.md') {
        issues.push(`${path.relative(contentDir, localePath)}: article sources must be Markdown files directly below the translation key.`);
        continue;
      }
      files.push({
        absolutePath: localePath,
        translationKey: entry.name,
        locale: path.basename(localeEntry.name, '.md')
      });
    }
  }

  if (issues.length) throw new RockimalsBlogContentError(issues);
  return files;
}

export async function loadRockimalsBlogSources({ contentDir }) {
  if (!contentDir) throw new TypeError('contentDir is required.');
  const files = await sourceFiles(contentDir);
  const posts = [];
  const issues = [];

  for (const file of files) {
    const source = path.posix.join(
      'content/rockimals-blog',
      file.translationKey,
      `${file.locale}.md`
    );
    try {
      const raw = await readFile(file.absolutePath, 'utf8');
      posts.push(validatePost({
        raw,
        source,
        expectedTranslationKey: file.translationKey,
        expectedLocale: file.locale
      }));
    } catch (error) {
      if (error instanceof RockimalsBlogContentError) issues.push(...error.issues);
      else issues.push(`${source}: could not be read (${error.message}).`);
    }
  }

  issues.push(...collectionIssues(posts));

  if (issues.length) throw new RockimalsBlogContentError(issues);
  return posts.sort((a, b) => (
    a.translationKey.localeCompare(b.translationKey)
    || ROCKIMALS_BLOG_LOCALES.indexOf(a.locale) - ROCKIMALS_BLOG_LOCALES.indexOf(b.locale)
  ));
}

function collectionIssues(posts) {
  const issues = [];
  const seenPairs = new Map();
  const seenSlugs = new Map();
  for (const post of posts) {
    const pair = `${post.translationKey}\u0000${post.locale}`;
    if (seenPairs.has(pair)) {
      issues.push(`${post.source}: duplicates translationKey/locale pair from ${seenPairs.get(pair)}.`);
    } else {
      seenPairs.set(pair, post.source);
    }

    const localeSlug = `${post.locale}\u0000${post.slug}`;
    if (seenSlugs.has(localeSlug)) {
      issues.push(`${post.source}: slug "${post.slug}" duplicates ${seenSlugs.get(localeSlug)} in locale "${post.locale}".`);
    } else {
      seenSlugs.set(localeSlug, post.source);
    }
  }
  return issues;
}

function canonicalPath(post) {
  return post.locale === 'en'
    ? `/blog/${post.slug}`
    : `/${post.locale}/blog/${post.slug}`;
}

function consistentValue(posts, field, translationKey, issues) {
  const values = new Set(posts.map((post) => post[field] ?? null));
  if (values.size > 1) {
    issues.push(`${translationKey}: selected locale group has conflicting "${field}" values.`);
  }
}

export function createRockimalsBlogManifest(posts, { asOf = new Date() } = {}) {
  const duplicateIssues = collectionIssues(posts);
  if (duplicateIssues.length) throw new RockimalsBlogContentError(duplicateIssues);
  const asOfDate = asOf instanceof Date ? asOf : new Date(asOf);
  if (Number.isNaN(asOfDate.valueOf())) throw new TypeError('asOf must be a valid date or timestamp.');
  const asOfIso = asOfDate.toISOString();
  const groups = new Map();
  const issues = [];

  for (const post of posts) {
    const group = groups.get(post.translationKey) ?? [];
    group.push(post);
    groups.set(post.translationKey, group);
  }

  const selectedGroups = [];
  for (const [translationKey, group] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    const eligible = group.filter((post) => !post.draft && post.published <= asOfIso);
    if (eligible.length === 0) continue;

    const byLocale = new Map(group.map((post) => [post.locale, post]));
    const missingLocales = ROCKIMALS_BLOG_LOCALES.filter((locale) => !byLocale.has(locale));
    const unavailableLocales = ROCKIMALS_BLOG_LOCALES.filter((locale) => {
      const post = byLocale.get(locale);
      return post && (post.draft || post.published > asOfIso);
    });

    if (missingLocales.length) {
      issues.push(`${translationKey}: selected locale group is missing ${missingLocales.join(', ')}.`);
    }
    if (unavailableLocales.length) {
      issues.push(`${translationKey}: selected locale group has draft or future locales: ${unavailableLocales.join(', ')}.`);
    }
    for (const field of ['category', 'published', 'productGuide', 'reviewedAppVersion']) {
      consistentValue(group, field, translationKey, issues);
    }
    selectedGroups.push({ translationKey, posts: group });
  }

  if (issues.length) throw new RockimalsBlogContentError(issues);

  const publishedByPair = new Map();
  for (const group of selectedGroups) {
    for (const post of group.posts) {
      publishedByPair.set(`${post.translationKey}\u0000${post.locale}`, post);
    }
  }

  const topics = selectedGroups.map(({ translationKey, posts: groupPosts }) => {
    const orderedPosts = [...groupPosts].sort((a, b) => (
      ROCKIMALS_BLOG_LOCALES.indexOf(a.locale) - ROCKIMALS_BLOG_LOCALES.indexOf(b.locale)
    ));
    const alternatePaths = Object.fromEntries(
      orderedPosts.map((post) => [post.locale, canonicalPath(post)])
    );
    const localizedPosts = orderedPosts.map((post) => {
      const relatedPosts = post.relatedPosts
        .map((relatedTranslationKey) => publishedByPair.get(`${relatedTranslationKey}\u0000${post.locale}`))
        .filter(Boolean)
        .map((relatedPost) => ({
          translationKey: relatedPost.translationKey,
          title: relatedPost.title,
          path: canonicalPath(relatedPost)
        }));
      return {
        ...post,
        categoryLabel: ROCKIMALS_BLOG_CATEGORIES[post.category][post.locale],
        canonicalPath: canonicalPath(post),
        alternatePaths,
        relatedPosts
      };
    });

    return {
      translationKey,
      category: localizedPosts[0].category,
      published: localizedPosts[0].published,
      productGuide: localizedPosts[0].productGuide,
      reviewedAppVersion: localizedPosts[0].reviewedAppVersion,
      posts: localizedPosts
    };
  });

  return {
    schemaVersion: 1,
    generatedAsOf: asOfIso,
    locales: [...ROCKIMALS_BLOG_LOCALES],
    categories: ROCKIMALS_BLOG_CATEGORIES,
    topics,
    posts: topics.flatMap((topic) => topic.posts)
  };
}
