import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyticsRevision, versionAnalyticsScripts } from './analytics-cache.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const revision = analyticsRevision(await readFile(path.join(DIST, 'js/analytics.js')));
let changed = 0;

// Run after every generator: later product builds also emit analytics script tags.
async function versionDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing public symlink: ${file}`);
    if (entry.isDirectory()) await versionDirectory(file);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      const versioned = versionAnalyticsScripts(html, revision);
      if (versioned !== html) {
        await writeFile(file, versioned);
        changed += 1;
      }
    }
  }
}

await versionDirectory(DIST);
console.log(`Versioned analytics in ${changed} public HTML files with content revision ${revision}.`);
