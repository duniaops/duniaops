import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import {
  createRockimalsBlogManifest,
  loadRockimalsBlogSources
} from './rockimals-blog-content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'rockimals-blog');

async function main() {
  const { values } = parseArgs({
    options: {
      'as-of': { type: 'string' },
      output: { type: 'string' }
    }
  });
  const posts = await loadRockimalsBlogSources({ contentDir: CONTENT_DIR });
  const manifest = createRockimalsBlogManifest(posts, {
    asOf: values['as-of'] ?? new Date()
  });

  if (values.output) {
    const outputPath = path.resolve(ROOT, values.output);
    if (outputPath !== ROOT && !outputPath.startsWith(`${ROOT}${path.sep}`)) {
      throw new Error('Manifest output must stay inside the repository.');
    }
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Wrote Rockimals blog preview manifest to ${path.relative(ROOT, outputPath)}.`);
  }

  console.log(
    `Rockimals blog content is valid: ${posts.length} source(s), `
    + `${manifest.topics.length} publishable topic package(s) as of ${manifest.generatedAsOf}.`
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
