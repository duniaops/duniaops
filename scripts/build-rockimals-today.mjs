// Builds the daily "Today's Rockimals" pages (Rockimals spec 120, website
// spec 036) into dist/products/rockimals-today/.
//
// Data, in order of preference:
//   1. NASA NeoWs for the build's UTC day. Fetched only on Netlify, or locally
//      with ROCKIMALS_TODAY_FETCH=1. The key comes from NASA_API_KEY (a build
//      environment value, never committed) and falls back to DEMO_KEY.
//   2. The list the live site published last (…/rockimals-today/data.json),
//      so a failed fetch keeps the previous day and says so on the page.
//   3. The committed seed, content/rockimals-today/seed.json.
// The page is never published empty because of a failure.
//
//   node scripts/build-rockimals-today.mjs              build into dist
//   ROCKIMALS_TODAY_FETCH=1 node scripts/build-rockimals-today.mjs --write-seed
//                                                      also refresh the seed
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ROCKIMALS_TODAY_LOCALES,
  renderRockimalsToday,
  rockimalsTodayPath,
  rockimalsTodayVisitorsFromFeed,
  validateRockimalsTodayData
} from './rockimals-today.mjs';
import { ROCKIMALS_ORIGIN } from './rockimals-blog-seo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(ROOT, 'dist', 'products', 'rockimals-today');
const SITEMAP = path.join(ROOT, 'dist', 'products', 'rockimals-blog', 'sitemap.xml');
const SEED = path.join(ROOT, 'content', 'rockimals-today', 'seed.json');
const PUBLISHED_DATA = `${ROCKIMALS_ORIGIN}/products/rockimals-today/data.json`;
const NEOWS_FEED = 'https://api.nasa.gov/neo/rest/v1/feed';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url, timeoutMs) {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchNasaDay(date, apiKey) {
  const url = new URL(NEOWS_FEED);
  url.searchParams.set('start_date', date);
  url.searchParams.set('end_date', date);
  url.searchParams.set('api_key', apiKey);
  let lastError;
  for (const delay of [0, 2000, 6000]) {
    if (delay) await wait(delay);
    try {
      const feed = await fetchJson(url, 20000);
      if (!feed?.near_earth_objects || !(date in feed.near_earth_objects)) throw new Error('feed has no entry for the day');
      return {
        date,
        generatedAt: new Date().toISOString(),
        source: 'NASA NeoWs',
        visitors: rockimalsTodayVisitorsFromFeed(feed, date)
      };
    } catch (error) {
      // Report the reason only: the request URL carries the key.
      lastError = new Error(`NeoWs fetch failed: ${error.message}`);
    }
  }
  throw lastError;
}

function assertNoKey(content, apiKey, label) {
  if (/api_key|DEMO_KEY/.test(content) || (apiKey && apiKey !== 'DEMO_KEY' && content.includes(apiKey))) {
    throw new Error(`${label}: output would contain NASA API key material; refusing to write it.`);
  }
}

async function writeOwned(relativePath, content, apiKey) {
  const destination = path.resolve(OUTPUT_DIR, relativePath);
  if (!destination.startsWith(`${OUTPUT_DIR}${path.sep}`)) throw new Error(`Refusing to write outside ${OUTPUT_DIR}`);
  assertNoKey(content, apiKey, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

async function addToSitemap(date) {
  const sitemap = await readFile(SITEMAP, 'utf8');
  const entries = ROCKIMALS_TODAY_LOCALES
    .map((locale) => `${ROCKIMALS_ORIGIN}${rockimalsTodayPath(locale)}`)
    .filter((url) => !sitemap.includes(`<loc>${url}</loc>`))
    .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>daily</changefreq>\n  </url>`);
  if (!entries.length) return;
  await writeFile(SITEMAP, sitemap.replace('</urlset>', `${entries.join('\n')}\n</urlset>`));
}

export async function buildRockimalsToday({
  today = process.env.ROCKIMALS_TODAY_DATE || new Date().toISOString().slice(0, 10),
  fetchLive = process.env.NETLIFY === 'true' || process.env.ROCKIMALS_TODAY_FETCH === '1',
  apiKey = process.env.NASA_API_KEY || 'DEMO_KEY',
  writeSeed = false
} = {}) {
  let data = null;
  let origin = 'seed';
  if (fetchLive) {
    try {
      data = await fetchNasaDay(today, apiKey);
      origin = apiKey === 'DEMO_KEY' ? 'NeoWs (DEMO_KEY)' : 'NeoWs';
    } catch (error) {
      console.warn(`Rockimals today: ${error.message}; falling back to the published list.`);
      try {
        data = validateRockimalsTodayData(await fetchJson(PUBLISHED_DATA, 15000));
        origin = 'published list';
      } catch (fallbackError) {
        console.warn(`Rockimals today: published list unavailable (${fallbackError.message}); using the seed.`);
      }
    }
  }
  data ??= validateRockimalsTodayData(JSON.parse(await readFile(SEED, 'utf8')));

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  for (const locale of ROCKIMALS_TODAY_LOCALES) {
    await writeOwned(path.join(locale, 'index.html'), renderRockimalsToday({ locale, data, today }), apiKey);
  }
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await writeOwned('data.json', json, apiKey);
  await addToSitemap(data.date);
  if (writeSeed && origin.startsWith('NeoWs')) {
    assertNoKey(json, apiKey, 'seed');
    await writeFile(SEED, json);
  }
  console.log(`Rockimals today: ${data.visitors.length} visitors for ${data.date} from ${origin}${data.date === today ? '' : ` (stale; build day ${today})`}.`);
  return { data, origin };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildRockimalsToday({ writeSeed: process.argv.includes('--write-seed') });
}
