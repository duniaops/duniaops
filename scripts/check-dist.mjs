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
  '.well-known/assetlinks.json',
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
  'js/zoday-invite.js',
  'privacy.html',
  'products.html',
  'products/zoday/invite.html',
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

    // The Zoday subdomain permits styles from its own origin, not the company origin.
    if (relativePath === 'products/zoday.html') {
      for (const link of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)) {
        if (link[1].startsWith('https://www.duniaops.com/')) {
          errors.push(`${relativePath}: stylesheet violates the Zoday same-origin CSP: ${link[1]}`);
        }
      }
    }

    if (html.includes('id="primary-navigation"') && !html.includes('href="/about"') && !html.includes('href="https://www.duniaops.com/about"')) {
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

async function validateThankYouPage() {
  const errors = [];
  const thankYou = await readFile(insideDist('thank-you.html'), 'utf8');
  const siteStyles = await readFile(insideDist('css/site.css'), 'utf8');
  const requiredPageFragments = [
    '<body class="thank-you-page">',
    'class="container thank-you-hero-grid"',
    'aria-label="Response expectation"',
    'We normally reply within two working days.',
    '<ol class="thank-you-steps">',
    'class="thank-you-actions"'
  ];

  for (const fragment of requiredPageFragments) {
    if (!thankYou.includes(fragment)) errors.push(`thank-you.html: missing confirmation layout fragment ${fragment}`);
  }

  const requiredStyleFragments = [
    '.thank-you-page{min-height:100vh;min-height:100dvh;display:flex',
    '.thank-you-page main{display:flex;flex:1;flex-direction:column}',
    '.thank-you-next{display:flex;flex:1;align-items:center'
  ];
  for (const fragment of requiredStyleFragments) {
    if (!siteStyles.includes(fragment)) errors.push(`css/site.css: missing full-height confirmation layout ${fragment}`);
  }

  return errors;
}

async function validateZodayPlayGrowth() {
  const errors = [];
  const catalogue = await readFile(insideDist('products.html'), 'utf8');
  const product = await readFile(insideDist('products/zoday.html'), 'utf8');
  const invite = await readFile(insideDist('products/zoday/invite.html'), 'utf8');
  const inviteScript = await readFile(insideDist('js/zoday-invite.js'), 'utf8');
  const redirects = await readFile(insideDist('_redirects'), 'utf8');
  const headers = await readFile(insideDist('_headers'), 'utf8');
  const assetLinks = JSON.parse(await readFile(insideDist('.well-known/assetlinks.json'), 'utf8'));

  const productFragments = [
    'id=com.duniaops.zoday&amp;referrer=v%3D1%26utm_source%3Dwebsite%26utm_medium%3Dwebsite%26utm_campaign%3Dwebsite_product',
    'Get it on Google Play',
    "Google Play'den indir",
    '<dd>Public on Google Play</dd>'
  ];
  for (const fragment of productFragments) {
    if (!product.includes(fragment)) errors.push(`products/zoday.html: missing Play growth fragment ${fragment}`);
  }
  if (!catalogue.includes('<span>Android</span><span>Available now</span>')) {
    errors.push('products.html: Zoday must be marked available on Android');
  }
  if (/Android[^<]{0,40}(?:internal testing|coming soon)/i.test(product)) {
    errors.push('products/zoday.html: stale Android availability remains');
  }

  const inviteFragments = [
    '<meta name="robots" content="noindex, noarchive, nofollow">',
    '<meta name="referrer" content="no-referrer">',
    'data-invite-code',
    'data-play-link',
    'This page runs no analytics and does not validate the code.'
  ];
  for (const fragment of inviteFragments) {
    if (!invite.includes(fragment)) errors.push(`products/zoday/invite.html: missing privacy/fallback fragment ${fragment}`);
  }
  if (invite.includes('analytics.js') || invite.includes('googletagmanager')) {
    errors.push('products/zoday/invite.html: invite paths must not load analytics');
  }
  for (const fragment of [
    "const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'",
    "if (!/^[0-9A-Za-z]{6}$/.test(raw)) return null",
    "if (/%[0-9a-f]{2}/i.test(decoded)) return null",
    "destination.searchParams.set('referrer', payload)"
  ]) {
    if (!inviteScript.includes(fragment)) errors.push(`js/zoday-invite.js: missing bounded parser fragment ${fragment}`);
  }
  if (!redirects.split('\n').includes('/products/zoday/invite/* /products/zoday/invite.html 200!')) {
    errors.push('_redirects: missing Zoday invitation fallback rewrite');
  }
  for (const fragment of ['/products/zoday/invite/*', 'Referrer-Policy: no-referrer', 'X-Robots-Tag: noindex, noarchive']) {
    if (!headers.includes(fragment)) errors.push(`_headers: missing invite privacy fragment ${fragment}`);
  }

  const statement = assetLinks[0];
  const fingerprints = statement?.target?.sha256_cert_fingerprints;
  if (assetLinks.length !== 1 || statement?.target?.namespace !== 'android_app'
    || statement?.target?.package_name !== 'com.duniaops.zoday'
    || statement?.relation?.join(',') !== 'delegate_permission/common.handle_all_urls'
    || fingerprints?.join(',') !== 'C7:13:27:D6:0C:51:D1:31:23:76:DE:44:9D:08:E7:2B:D9:41:8F:6F:56:C3:FC:79:E3:34:B5:86:BA:F3:42:26') {
    errors.push('.well-known/assetlinks.json: Play App Signing association does not match Zoday');
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
  errors.push(...await validateThankYouPage());
  errors.push(...await validateZodayPlayGrowth());

  if (errors.length) throw new Error(`Public output validation failed:\n- ${errors.join('\n- ')}`);
  console.log(`Validated ${files.length} public files, release routes, JSON-LD and navigation with no broken internal links.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
