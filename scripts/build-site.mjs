import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT, 'dist');

const PUBLIC_DIRECTORIES = [
  'assets',
  'blog',
  'css',
  'js',
  'products',
  'rockimals',
  'services',
  'zoday'
];

const PUBLIC_ROOT_FILES = [
  '_headers',
  '_redirects',
  'blog.html',
  'feed.xml',
  'index.html',
  'privacy.html',
  'products.html',
  'robots.txt',
  'sitemap.xml',
  'thank-you.html'
];

const EXCLUDED_FILENAMES = new Set([
  '.DS_Store',
  'README.md'
]);

function destinationFor(relativePath) {
  const destination = path.resolve(DIST_DIR, relativePath);
  if (destination !== DIST_DIR && !destination.startsWith(`${DIST_DIR}${path.sep}`)) {
    throw new Error(`Refusing to write outside dist: ${relativePath}`);
  }
  return destination;
}

async function assertRegularFile(relativePath) {
  const source = path.join(ROOT, relativePath);
  const details = await stat(source);
  if (!details.isFile()) throw new Error(`Expected a regular public file: ${relativePath}`);
  return source;
}

async function copyFile(relativePath) {
  const source = await assertRegularFile(relativePath);
  const destination = destinationFor(relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { force: true });
}

async function copyDirectory(relativePath) {
  const source = path.join(ROOT, relativePath);
  const details = await stat(source);
  if (!details.isDirectory()) throw new Error(`Expected a public directory: ${relativePath}`);

  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (EXCLUDED_FILENAMES.has(entry.name)) continue;
    if (entry.isSymbolicLink()) {
      throw new Error(`Public output must not contain symlinks: ${path.join(relativePath, entry.name)}`);
    }

    const childPath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(childPath);
    } else if (entry.isFile()) {
      await copyFile(childPath);
    } else {
      throw new Error(`Unsupported public file type: ${childPath}`);
    }
  }
}

async function main() {
  if (path.basename(DIST_DIR) !== 'dist' || path.dirname(DIST_DIR) !== ROOT) {
    throw new Error(`Refusing to clean unexpected output directory: ${DIST_DIR}`);
  }

  await rm(DIST_DIR, { recursive: true, force: true });
  await mkdir(DIST_DIR, { recursive: true });

  for (const relativePath of PUBLIC_ROOT_FILES) await copyFile(relativePath);
  for (const relativePath of PUBLIC_DIRECTORIES) await copyDirectory(relativePath);

  console.log(
    `Built the public site in ${path.relative(ROOT, DIST_DIR)} from `
    + `${PUBLIC_ROOT_FILES.length} root files and ${PUBLIC_DIRECTORIES.length} public directories.`
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
