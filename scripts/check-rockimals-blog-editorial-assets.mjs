import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const editorialRoot = path.join(repoRoot, 'content/rockimals-blog/_editorial');
const expectedLocales = ['en', 'tr', 'ja', 'ko', 'zh-Hans', 'fr', 'de', 'es'];
const expectedTopics = ['01', '15', '28'];
const expectedHeroes = ['Niko', 'Tavi', 'Barney', 'Kito', 'Pofi', 'Bobo', 'Ciko', 'Enoli'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(editorialRoot, relativePath), 'utf8'));
}

function jpegDimensions(buffer, source) {
  assert(buffer[0] === 0xff && buffer[1] === 0xd8, `${source}: expected a JPEG file.`);
  let offset = 2;

  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const segmentLength = buffer.readUInt16BE(offset);
    const isStartOfFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);
    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5)
      };
    }
    offset += segmentLength;
  }

  throw new Error(`${source}: could not find JPEG dimensions.`);
}

async function verifyImage(record, expectedWidth, expectedHeight) {
  const absolutePath = path.join(repoRoot, record.path ?? record.webOutput);
  const buffer = await readFile(absolutePath);
  const dimensions = jpegDimensions(buffer, absolutePath);
  const digest = createHash('sha256').update(buffer).digest('hex');
  const fileStat = await stat(absolutePath);

  assert(dimensions.width === expectedWidth, `${absolutePath}: expected width ${expectedWidth}, got ${dimensions.width}.`);
  assert(dimensions.height === expectedHeight, `${absolutePath}: expected height ${expectedHeight}, got ${dimensions.height}.`);
  assert(digest === record.sha256, `${absolutePath}: SHA-256 differs from the editorial manifest.`);
  if (record.bytes !== undefined) {
    assert(fileStat.size === record.bytes, `${absolutePath}: byte size differs from the editorial manifest.`);
  }
}

const product = await readJson('product-reference.json');
const assets = await readJson('asset-manifest.json');

assert(product.snapshotDate === '2026-09-22', 'Product reference must keep its dated evidence snapshot.');
assert(product.liveStore.version === '1.3.0', 'Live editorial claims must remain pinned to App Store 1.3.0.');
assert(product.repositorySnapshot.status === 'development-not-live', 'Repository behavior must be labelled development-only.');
assert(product.platformStatus.android.includes('not verified'), 'Unverified Android availability must remain explicit.');
assert(product.nasaBoundary.requiredDisclosure.includes('not affiliated'), 'NASA non-affiliation disclosure is missing.');
assert(
  JSON.stringify(product.heroes.map(({ displayName }) => displayName)) === JSON.stringify(expectedHeroes),
  'Approved hero display names or order changed.'
);
assert(
  JSON.stringify(Object.keys(product.localizedTerms)) === JSON.stringify(expectedLocales),
  'Localized term sources must cover the eight supported locales in contract order.'
);
for (const [locale, terms] of Object.entries(product.localizedTerms)) {
  assert(terms.species.length === 8, `${locale}: expected eight localized species names.`);
  for (const key of ['radar', 'storyLibrary', 'earthShield', 'spaceDistanceMap', 'flybySnap', 'spaceMemory', 'sizeStack', 'journal', 'missions', 'parentGate', 'plus']) {
    assert(typeof terms[key] === 'string' && terms[key].trim(), `${locale}: missing localized term ${key}.`);
  }
}

assert(
  JSON.stringify(assets.covers.map(({ topicId }) => topicId)) === JSON.stringify(expectedTopics),
  'Cover order must preserve topics 01, 15 and 28.'
);
for (const cover of assets.covers) {
  assert(cover.language === 'textless-shared', `${cover.topicId}: shared cover must remain textless.`);
  assert(cover.width === 1200 && cover.height === 630, `${cover.topicId}: cover manifest must declare 1200×630.`);
  assert(cover.sources.length >= 2, `${cover.topicId}: cover source provenance is incomplete.`);
  assert(cover.sources.every(({ commit }) => /^[0-9a-f]{40}$/.test(commit)), `${cover.topicId}: source commit is invalid.`);
  await verifyImage(cover, 1200, 630);
}

assert(assets.localizedScreens.length === 2, 'Expected the Radar and meet-card localized screenshot sets.');
for (const screenSet of assets.localizedScreens) {
  assert(screenSet.sourceVersion === '1.3.0', `${screenSet.scene}: screenshot set must remain tied to live 1.3.0.`);
  assert(
    JSON.stringify(Object.keys(screenSet.outputs)) === JSON.stringify(expectedLocales),
    `${screenSet.scene}: screenshot locale coverage does not match the content contract.`
  );
  for (const output of Object.values(screenSet.outputs)) {
    await verifyImage(output, screenSet.width, screenSet.height);
  }
}

assert(
  Object.keys(assets.catalogEvidence.chapterOneCoverThumbnails).length === 8,
  'Catalog evidence must map every approved hero to a chapter-one cover through catalog.json.'
);
assert(
  assets.openEvidenceIssues.some(({ topicId, status }) => topicId === '28' && status === 'missing-current-localized-screen'),
  'Topic 28 must retain the missing current parent-screen evidence issue.'
);

console.log('Rockimals editorial assets: PASS (3 covers, 16 localized screens, 8 locales, 8 heroes).');
