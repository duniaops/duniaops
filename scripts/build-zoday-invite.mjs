import { readFile, writeFile, mkdir } from 'node:fs/promises';
import vm from 'node:vm';

// Use the same translations for the initial HTML and the interactive picker.
const context = { window: {} };
vm.runInNewContext(await readFile(new URL('../js/zoday-invite-translations.js', import.meta.url), 'utf8'), context);
const translations = context.window.ZodayInviteTranslations;
const template = await readFile(new URL('../products/zoday/invite.html', import.meta.url), 'utf8');
const output = new URL('../dist/products/zoday/invite-locales/', import.meta.url);
await mkdir(output, { recursive: true });
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const locales = { en: 'en_US', tr: 'tr_TR', es: 'es_ES', 'pt-BR': 'pt_BR', de: 'de_DE' };
for (const [lang, copy] of Object.entries(translations)) {
  let html = template.replace('<html lang="en">', `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(copy.pageTitle)}</title>`)
    .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*(">)/g, `$1${escape(copy.intro)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${escape(copy.pageTitle)}$2`)
    .replace(/(<[^>]+data-i18n="([^"]+)"[^>]*>)[^<]*(<\/[^>]+>)/g, (_match, open, key, close) => `${open}${escape(copy[key])}${close}`)
    .replace('</head>', `<meta property="og:locale" content="${locales[lang]}">\n<meta name="twitter:title" content="${escape(copy.pageTitle)}">\n<meta name="twitter:description" content="${escape(copy.intro)}">\n</head>`);
  await writeFile(new URL(`${lang}.html`, output), html);
}
console.log('Built five localized invitation pages with server-rendered sharing metadata.');
