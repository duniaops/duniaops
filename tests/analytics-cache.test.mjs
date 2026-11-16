import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { analyticsRevision, staleAnalyticsSources, versionAnalyticsScripts } from '../scripts/analytics-cache.mjs';

test('a script content change invalidates a previously immutable URL', () => {
  const before = analyticsRevision('old attribution code');
  const after = analyticsRevision('corrected attribution code');
  assert.notEqual(before, after);
  const html = versionAnalyticsScripts('<script defer src="js/analytics.js?v=legacy"></script>', before);
  assert.equal(staleAnalyticsSources(html, after).length, 1);
  const updated = versionAnalyticsScripts(html, after);
  assert.equal(updated, `<script defer src="js/analytics.js?v=${after}"></script>`);
  assert.deepEqual(staleAnalyticsSources(updated, after), []);
});

test('root and nested routes retain paths, attributes, extra parameters and fragments', () => {
  for (const prefix of ['/', '', './', '../', '../../']) {
    const html = `<script defer src='${prefix}js/analytics.js?mode=test&v=old#fragment' data-context="public"></script>`;
    assert.equal(versionAnalyticsScripts(html, '012345abcdef'),
      `<script defer src='${prefix}js/analytics.js?mode=test&v=012345abcdef#fragment' data-context="public"></script>`);
  }
});

test('other scripts, external URLs and text references are unchanged', () => {
  const html = '<script src="https://vendor.test/js/analytics.js"></script>'
    + '<script src="//vendor.test/js/analytics.js"></script>'
    + '<script src="/js/site.js?v=existing"></script>'
    + '<a href="/js/analytics.js">Source</a>'
    + '<script data-src="/js/analytics.js" src="/js/site.js"></script>';
  assert.equal(versionAnalyticsScripts(html, '012345abcdef'), html);
  assert.deepEqual(staleAnalyticsSources(html, '012345abcdef'), []);
});

test('real conversion pages and generated blog output can use the actual asset revision', async () => {
  const root = new URL('../', import.meta.url);
  const revision = analyticsRevision(await readFile(new URL('js/analytics.js', root)));
  for (const file of ['index.html', 'thank-you.html', 'services/software-project-rescue.html',
    'work/fragmented-application-estate-modernisation.html',
    'resources/software-project-handover-checklist.html', 'blog/software-project-rescue-uk.html']) {
    const html = await readFile(new URL(file, root), 'utf8');
    assert.ok(staleAnalyticsSources(html, revision).length, `${file}: reproduce stale authoring URL`);
    const built = versionAnalyticsScripts(html, revision);
    assert.deepEqual(staleAnalyticsSources(built, revision), [], file);
    assert.ok(built.includes(`analytics.js?v=${revision}`), file);
    assert.equal(versionAnalyticsScripts(built, revision), built, 'stable rebuild');
  }
});
