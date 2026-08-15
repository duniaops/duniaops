import { lstat, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://www.duniaops.com';

const REQUIRED_PATHS = [
  '_headers',
  '_redirects',
  'assets/vendor/lucide.min.js',
  'blog.html',
  'css/site.css',
  'feed.xml',
  'index.html',
  'js/analytics.js',
  'privacy.html',
  'products.html',
  'robots.txt',
  'sitemap.xml',
  'thank-you.html'
];

const FORBIDDEN_PATHS = [
  '.git',
  '.github',
  '.netlify',
  'AGENTS.md',
  'brand',
  'content',
  'design-qa.md',
  'invoices',
  'netlify.toml',
  'node_modules',
  'package-lock.json',
  'package.json',
  'scripts',
  'specs'
];

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function insideDist(relativePath) {
  const candidate = path.resolve(DIST_DIR, relativePath);
  if (candidate !== DIST_DIR && !candidate.startsWith(`${DIST_DIR}${path.sep}`)) {
    throw new Error(`Resolved path escapes dist: ${relativePath}`);
  }
  return candidate;
}

async function walk(relativeDirectory = '') {
  const directory = insideDist(relativeDirectory);
  const files = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const details = await lstat(insideDist(relativePath));
    if (details.isSymbolicLink()) throw new Error(`dist must not contain symlinks: ${relativePath}`);
    if (entry.isDirectory()) files.push(...await walk(relativePath));
    else if (entry.isFile()) files.push(toPosix(relativePath));
    else throw new Error(`dist contains unsupported file type: ${relativePath}`);
  }

  return files;
}

function routeCandidates(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded === '/') return ['index.html'];

  const relativePath = decoded.replace(/^\/+/, '');
  if (path.posix.extname(relativePath)) return [relativePath];
  return [`${relativePath}.html`, `${relativePath}/index.html`];
}

async function routeExists(pathname) {
  for (const candidate of routeCandidates(pathname)) {
    try {
      const details = await stat(insideDist(candidate));
      if (details.isFile()) return true;
    } catch {
      // Try the next clean-URL candidate.
    }
  }
  return false;
}

async function validateHtmlLinks(files) {
  const errors = [];
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  for (const relativePath of htmlFiles) {
    const html = await readFile(insideDist(relativePath), 'utf8');
    for (const match of html.matchAll(/\b(?:href|src|action)="([^"]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (/^(?:data:|mailto:|tel:|javascript:|#)/i.test(value)) continue;

      const resolved = new URL(value, new URL(relativePath, `${SITE_ORIGIN}/`));
      if (resolved.origin !== SITE_ORIGIN) continue;
      if (!await routeExists(resolved.pathname)) {
        errors.push(`${relativePath}: missing internal target ${resolved.pathname}`);
      }
    }
  }

  return errors;
}

async function main() {
  const details = await stat(DIST_DIR);
  if (!details.isDirectory()) throw new Error('dist is not a directory; run npm run build:site first.');

  const files = await walk();
  const fileSet = new Set(files);
  const errors = [];

  for (const requiredPath of REQUIRED_PATHS) {
    if (!fileSet.has(requiredPath)) errors.push(`missing required public file: ${requiredPath}`);
  }

  for (const file of files) {
    if (file.split('/').includes('.DS_Store')) errors.push(`OS metadata leaked into dist: ${file}`);
    if (file.endsWith('.md')) errors.push(`Markdown source leaked into dist: ${file}`);
    for (const forbiddenPath of FORBIDDEN_PATHS) {
      if (file === forbiddenPath || file.startsWith(`${forbiddenPath}/`)) {
        errors.push(`forbidden source path leaked into dist: ${file}`);
      }
    }
  }

  errors.push(...await validateHtmlLinks(files));

  if (errors.length) throw new Error(`Public output validation failed:\n- ${errors.join('\n- ')}`);
  console.log(`Validated ${files.length} public files with no forbidden source paths or broken internal links.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
