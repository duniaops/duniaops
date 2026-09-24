// Copies the Rockimals app strings that the daily "today" page reuses into
// content/rockimals-today/app-strings.json (Rockimals spec 120, website spec
// 036). The app is the parity source: species, hero names, size comparisons,
// Moon-distance labels, flyby tags and speed wording read exactly as in the
// app. Run it after the app's strings change; Netlify builds read the
// committed copy.
//
//   node scripts/sync-rockimals-today-strings.mjs [path/to/rockimals]
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP = path.resolve(process.argv[2] ?? path.join(ROOT, '..', 'rockimals'));
const OUTPUT = path.join(ROOT, 'content', 'rockimals-today', 'app-strings.json');

// Site locale → app ARB file.
const LOCALES = { en: 'en', tr: 'tr', ja: 'ja', ko: 'ko', 'zh-Hans': 'zh', fr: 'fr', de: 'de', es: 'es' };
const KEYS = [
  'speciesMouse', 'speciesRabbit', 'speciesFox', 'speciesTiger',
  'speciesBear', 'speciesElephant', 'speciesDino', 'speciesWhale',
  'critterName', 'speedKps', 'speedComparisonPlane', 'widthRangeMetres',
  'distancePercentMoon', 'distanceMoonMultiple', 'flybyCloseVisible', 'flybyJustPassing',
  'sizeComparisonCar', 'sizeComparisonBus', 'sizeComparisonHouse', 'sizeComparisonPlane',
  'sizeComparisonFootballPitch', 'sizeComparisonStadium', 'sizeComparisonSkyscraper',
  'sizeComparisonMountain'
];

const strings = {};
for (const [site, arb] of Object.entries(LOCALES)) {
  const source = JSON.parse(await readFile(path.join(APP, 'lib', 'l10n', `app_${arb}.arb`), 'utf8'));
  strings[site] = {};
  for (const key of KEYS) {
    if (typeof source[key] !== 'string') throw new Error(`app_${arb}.arb is missing ${key}`);
    strings[site][key] = source[key];
  }
}

await writeFile(OUTPUT, `${JSON.stringify({
  source: 'rockimals/lib/l10n/app_<locale>.arb',
  locales: strings
}, null, 2)}\n`);
console.log(`Wrote ${path.relative(ROOT, OUTPUT)} (${KEYS.length} keys × ${Object.keys(LOCALES).length} locales)`);
