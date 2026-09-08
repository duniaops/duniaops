import { lstat, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://www.duniaops.com';
const RELEASE_PAGES = [
  {
    file: 'about.html',
    canonical: `${SITE_ORIGIN}/about`,
    redirect: '/about.html /about 301!'
  },
  {
    file: 'services/software-project-rescue.html',
    canonical: `${SITE_ORIGIN}/services/software-project-rescue`,
    redirect: '/services/software-project-rescue.html /services/software-project-rescue 301!'
  }
];

const REQUIRED_PATHS = [
  '_headers',
  '_redirects',
  'about.html',
  'assets/vendor/lucide.min.js',
  'blog.html',
  'css/site.css',
  'feed.xml',
  'index.html',
  'js/analytics.js',
  'js/site.js',
  'privacy.html',
  'products.html',
  'robots.txt',
  'services/software-project-rescue.html',
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

async function validateHtmlQuality(files) {
  const errors = [];
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  for (const relativePath of htmlFiles) {
    const html = await readFile(insideDist(relativePath), 'utf8');
    const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicateIds.length) errors.push(`${relativePath}: duplicate id values ${duplicateIds.join(', ')}`);

    const h1Count = Array.from(html.matchAll(/<h1(?:\s|>)/g)).length;
    if (h1Count !== 1) errors.push(`${relativePath}: expected exactly one h1, found ${h1Count}`);

    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${relativePath}: image is missing an alt attribute`);
    }

    for (const schema of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(schema[1]);
      } catch (error) {
        errors.push(`${relativePath}: invalid JSON-LD (${error.message})`);
      }
    }

    if (html.includes('id="primary-navigation"') && !html.includes('href="/about"')) {
      errors.push(`${relativePath}: primary navigation does not link to /about`);
    }
    if (html.includes('<h4>Services</h4>') && !html.includes('href="/services/software-project-rescue"')) {
      errors.push(`${relativePath}: services footer does not link to Project Rescue`);
    }
    if (html.includes('href="/#why">About</a>') || html.includes('href="#why">About</a>')) {
      errors.push(`${relativePath}: About still points to the legacy homepage anchor`);
    }
  }

  return errors;
}

async function validateReleasePages() {
  const errors = [];
  const sitemap = await readFile(insideDist('sitemap.xml'), 'utf8');
  const redirects = await readFile(insideDist('_redirects'), 'utf8');
  const homepage = await readFile(insideDist('index.html'), 'utf8');

  for (const page of RELEASE_PAGES) {
    const html = await readFile(insideDist(page.file), 'utf8');
    if (/name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
      errors.push(`${page.file}: release page must not be noindex`);
    }
    if (html.includes('review-banner') || html.includes('Local review draft')) {
      errors.push(`${page.file}: local-review banner remains in the release page`);
    }

    const expectedCanonical = `<link rel="canonical" href="${page.canonical}">`;
    if (!html.includes(expectedCanonical)) errors.push(`${page.file}: missing canonical ${page.canonical}`);

    const sitemapEntry = `<loc>${page.canonical}</loc>`;
    const sitemapCount = sitemap.split(sitemapEntry).length - 1;
    if (sitemapCount !== 1) errors.push(`sitemap.xml: expected one ${page.canonical} entry, found ${sitemapCount}`);

    if (!redirects.split('\n').includes(page.redirect)) {
      errors.push(`_redirects: missing ${page.redirect}`);
    }
  }

  for (const requiredHomepageLink of ['/about', '/services/software-project-rescue']) {
    if (!homepage.includes(`href="${requiredHomepageLink}"`)) {
      errors.push(`index.html: missing release link ${requiredHomepageLink}`);
    }
  }

  return errors;
}

async function validateLeadMeasurement() {
  const errors = [];
  const homepage = await readFile(insideDist('index.html'), 'utf8');
  const analytics = await readFile(insideDist('js/analytics.js'), 'utf8');
  const siteScript = await readFile(insideDist('js/site.js'), 'utf8');

  const requiredFormFragments = [
    'name="form_version" value="project_enquiry_v2"',
    'name="landing_page_group" value="home"',
    'name="test_submission" value="false"',
    'name="service_category"',
    '<option value="rescue">',
    '<option value="support">',
    '<option value="custom_software">',
    'id="form-error-summary" role="alert"',
    'id="name-error"',
    'id="email-error"',
    'id="service-error"',
    'id="brief-error"'
  ];
  for (const fragment of requiredFormFragments) {
    if (!homepage.includes(fragment)) errors.push(`index.html: missing lead taxonomy fragment ${fragment}`);
  }

  const serviceSelectMatch = homepage.match(/<select id="service"[^>]*>([\s\S]*?)<\/select>/);
  const expectedServiceOptions = [
    '|Choose a service',
    'ai|AI-enabled software or workflow development',
    'support|Application support and maintenance',
    'booking|Booking or allocation platform',
    'custom_software|Custom software development',
    'devops_cloud|DevOps or cloud consultancy',
    'mobile|Mobile app development',
    'rescue|Rescue or take over an existing software project',
    'consultancy|Software consultancy or team support',
    'unknown|Not sure yet'
  ];
  const actualServiceOptions = serviceSelectMatch
    ? Array.from(serviceSelectMatch[1].matchAll(/<option value="([^"]*)">([^<]*)<\/option>/g), (match) => `${match[1]}|${match[2]}`)
    : [];
  if (actualServiceOptions.join('\n') !== expectedServiceOptions.join('\n')) {
    errors.push('index.html: service choices must be alphabetical after the placeholder, with Not sure yet last');
  }

  const formTag = homepage.match(/<form class="form-card"[^>]*>/)?.[0] || '';
  if (!formTag) errors.push('index.html: project enquiry form tag is missing');
  if (/\bnovalidate\b/.test(formTag)) {
    errors.push('index.html: static form must retain native no-JavaScript validation fallback');
  }

  const requiredAnalyticsFragments = [
    "window.gtag('event', 'generate_lead'",
    'form_version: context.form_version',
    'service_category: context.service_category',
    'landing_page_group: context.landing_page_group',
    'test_submission: context.test_submission'
  ];
  for (const fragment of requiredAnalyticsFragments) {
    if (!analytics.includes(fragment)) errors.push(`js/analytics.js: missing privacy-safe lead field ${fragment}`);
  }

  const requiredValidationFragments = [
    'enquiryForm.noValidate = true',
    "event.stopImmediatePropagation()",
    "target.setAttribute('aria-invalid', 'true')",
    "validationTarget(firstInvalid).focus()",
    "enquiryForm.addEventListener('input', refreshChangedField)"
  ];
  for (const fragment of requiredValidationFragments) {
    if (!siteScript.includes(fragment)) errors.push(`js/site.js: missing inline validation behaviour ${fragment}`);
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
  errors.push(...await validateHtmlQuality(files));
  errors.push(...await validateReleasePages());
  errors.push(...await validateLeadMeasurement());

  if (errors.length) throw new Error(`Public output validation failed:\n- ${errors.join('\n- ')}`);
  console.log(`Validated ${files.length} public files, release routes, JSON-LD and navigation with no broken internal links.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
