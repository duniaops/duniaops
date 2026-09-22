import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import {
  ROCKIMALS_BLOG_LOCALES,
  RockimalsBlogContentError,
  createRockimalsBlogManifest,
  loadRockimalsBlogSources
} from '../scripts/rockimals-blog-content.mjs';

const temporaryDirectories = [];
const NOW = '2026-09-22T12:00:00.000Z';

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => (
    rm(directory, { recursive: true, force: true })
  )));
});

async function fixtureDirectory() {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'rockimals-blog-'));
  temporaryDirectories.push(directory);
  return directory;
}

function frontmatter({
  translationKey = 'first-visitor',
  locale = 'en',
  slug,
  category = 'discover-game',
  published = '2026-09-22T10:00:00Z',
  updated = '2026-09-22T10:00:00Z',
  draft = false,
  relatedPosts = [],
  productGuide = true,
  reviewedAppVersion = '1.3.0'
} = {}) {
  const resolvedSlug = slug ?? `${translationKey}-${locale.toLowerCase()}`;
  return `---
translationKey: "${translationKey}"
locale: "${locale}"
slug: "${resolvedSlug}"
title: "Title ${locale}"
description: "Description ${locale}"
category: "${category}"
published: "${published}"
updated: "${updated}"
draft: ${draft}
image: "/assets/rockimals-blog/${translationKey}/cover.jpg"
imageAlt: "Image ${locale}"
author:
  id: "duniaops-team"
  name: "DuniaOps Team"
relatedPosts: ${JSON.stringify(relatedPosts)}
cta:
  id: "app-store"
  label: "Download ${locale}"
productGuide: ${productGuide}
reviewedAppVersion: ${productGuide ? `"${reviewedAppVersion}"` : 'null'}
---

Body ${locale}.
`;
}

async function writePost(contentDir, options = {}) {
  const translationKey = options.translationKey ?? 'first-visitor';
  const locale = options.locale ?? 'en';
  const directory = path.join(contentDir, translationKey);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${options.filenameLocale ?? locale}.md`), frontmatter(options));
}

async function writeCompleteGroup(contentDir, options = {}) {
  await Promise.all(ROCKIMALS_BLOG_LOCALES.map((locale) => (
    writePost(contentDir, { ...options, locale })
  )));
}

test('creates one deterministic manifest topic for a complete eligible locale group', async () => {
  const contentDir = await fixtureDirectory();
  await writeCompleteGroup(contentDir);

  const posts = await loadRockimalsBlogSources({ contentDir });
  const manifest = createRockimalsBlogManifest(posts, { asOf: NOW });

  assert.equal(manifest.topics.length, 1);
  assert.equal(manifest.posts.length, 8);
  assert.deepEqual(manifest.topics[0].posts.map((post) => post.locale), ROCKIMALS_BLOG_LOCALES);
  assert.equal(manifest.posts.find((post) => post.locale === 'en').canonicalPath, '/blog/first-visitor-en');
  assert.equal(manifest.posts.find((post) => post.locale === 'tr').canonicalPath, '/tr/blog/first-visitor-tr');
  assert.deepEqual(Object.keys(manifest.posts[0].alternatePaths), ROCKIMALS_BLOG_LOCALES);
});

test('excludes groups whose locales are all drafts or future publications', async () => {
  const contentDir = await fixtureDirectory();
  await writeCompleteGroup(contentDir, { draft: true });
  await writeCompleteGroup(contentDir, {
    translationKey: 'future-topic',
    published: '2026-09-23T10:00:00Z',
    updated: '2026-09-23T10:00:00Z'
  });

  const posts = await loadRockimalsBlogSources({ contentDir });
  const manifest = createRockimalsBlogManifest(posts, { asOf: NOW });

  assert.equal(manifest.topics.length, 0);
  assert.equal(manifest.posts.length, 0);
});

test('fails the whole selection when an eligible group is missing a locale', async () => {
  const contentDir = await fixtureDirectory();
  await Promise.all(ROCKIMALS_BLOG_LOCALES.slice(0, -1).map((locale) => writePost(contentDir, { locale })));
  const posts = await loadRockimalsBlogSources({ contentDir });

  assert.throws(
    () => createRockimalsBlogManifest(posts, { asOf: NOW }),
    (error) => error instanceof RockimalsBlogContentError && /missing es/.test(error.message)
  );
});

test('fails when one locale in a selected group remains draft or has conflicting metadata', async () => {
  const contentDir = await fixtureDirectory();
  await writeCompleteGroup(contentDir);
  await writePost(contentDir, { locale: 'es', draft: true, category: 'family-guide' });
  const posts = await loadRockimalsBlogSources({ contentDir });

  assert.throws(
    () => createRockimalsBlogManifest(posts, { asOf: NOW }),
    (error) => (
      error instanceof RockimalsBlogContentError
      && /draft or future locales: es/.test(error.message)
      && /conflicting "category"/.test(error.message)
    )
  );
});

test('rejects invalid locale, missing required fields, and product guide without a reviewed version', async () => {
  const contentDir = await fixtureDirectory();
  const directory = path.join(contentDir, 'first-visitor');
  await mkdir(directory, { recursive: true });
  const invalid = frontmatter({ locale: 'it' })
    .replace('title: "Title it"\n', '')
    .replace('reviewedAppVersion: "1.3.0"', 'reviewedAppVersion: null');
  await writeFile(path.join(directory, 'it.md'), invalid);

  await assert.rejects(
    () => loadRockimalsBlogSources({ contentDir }),
    (error) => (
      error instanceof RockimalsBlogContentError
      && /"locale" must be one of/.test(error.message)
      && /"title" must be a non-empty string/.test(error.message)
      && /product guides require "reviewedAppVersion"/.test(error.message)
    )
  );
});

test('rejects duplicate slugs inside one locale', async () => {
  const contentDir = await fixtureDirectory();
  await writePost(contentDir, { translationKey: 'topic-one', locale: 'en', slug: 'same-slug' });
  await writePost(contentDir, { translationKey: 'topic-two', locale: 'en', slug: 'same-slug' });

  await assert.rejects(
    () => loadRockimalsBlogSources({ contentDir }),
    (error) => error instanceof RockimalsBlogContentError && /slug "same-slug" duplicates/.test(error.message)
  );
});

test('rejects a duplicate translationKey and locale pair before manifest selection', async () => {
  const contentDir = await fixtureDirectory();
  await writeCompleteGroup(contentDir);
  const posts = await loadRockimalsBlogSources({ contentDir });

  assert.throws(
    () => createRockimalsBlogManifest([...posts, posts[0]], { asOf: NOW }),
    (error) => error instanceof RockimalsBlogContentError && /duplicates translationKey\/locale pair/.test(error.message)
  );
});

test('resolves related posts only to a published target in the same locale', async () => {
  const contentDir = await fixtureDirectory();
  await writeCompleteGroup(contentDir, { relatedPosts: ['related-topic', 'draft-topic'] });
  await writeCompleteGroup(contentDir, { translationKey: 'related-topic' });
  await writeCompleteGroup(contentDir, { translationKey: 'draft-topic', draft: true });

  const posts = await loadRockimalsBlogSources({ contentDir });
  const manifest = createRockimalsBlogManifest(posts, { asOf: NOW });
  const englishSource = manifest.posts.find((post) => (
    post.translationKey === 'first-visitor' && post.locale === 'en'
  ));

  assert.deepEqual(englishSource.relatedPosts, [{
    translationKey: 'related-topic',
    title: 'Title en',
    path: '/blog/related-topic-en'
  }]);
  assert.equal(englishSource.relatedPosts.some((post) => post.translationKey === 'draft-topic'), false);
});

test('requires RFC 3339 timestamps with an explicit time zone', async () => {
  const contentDir = await fixtureDirectory();
  await writePost(contentDir, { published: '2026-09-22', updated: '2026-09-22' });

  await assert.rejects(
    () => loadRockimalsBlogSources({ contentDir }),
    (error) => error instanceof RockimalsBlogContentError && /RFC 3339 timestamp/.test(error.message)
  );
});
