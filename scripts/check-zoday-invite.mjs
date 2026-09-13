import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../js/zoday-invite-translations.js', import.meta.url), 'utf8') + await readFile(new URL('../js/zoday-invite.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../products/zoday/invite.html', import.meta.url), 'utf8');
function load(path, clipboardFails = false) {
  const elements = new Map();
  function element(key) {
    if (!elements.has(key)) elements.set(key, {
      textContent: '', hidden: false, disabled: true, dataset: {}, events: {},
      addEventListener(name, fn) { this.events[name] = fn; },
      focus() { this.focused = true; }
    });
    return elements.get(key);
  }
  const translated = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match, i) => {
    const node = element(`translation-${i}`);
    node.dataset.i18n = match[1];
    return node;
  });
  const state = { location: new URL(path, 'https://www.duniaops.com'), clipboard: '', selected: false };
  const document = {
    documentElement: {}, querySelector: element, querySelectorAll: () => translated,
    createRange: () => ({ selectNodeContents() { state.selected = true; } })
  };
  vm.runInNewContext(source, {
    URL, document,
    window: {
      location: state.location, addEventListener() {},
      history: { replaceState(_state, _title, url) { state.location = new URL(url); } },
      getSelection: () => ({ removeAllRanges() {}, addRange() {} })
    },
    navigator: { clipboard: { async writeText(code) {
      if (clipboardFails) throw new Error('Clipboard unavailable');
      state.clipboard = code;
    } } }
  });
  return { element, document, state, translated };
}
for (const lang of ['en', 'tr', 'es', 'pt-BR', 'de']) {
  const page = load(`/products/zoday/invite/SR4D5Q?lang=${lang}`);
  assert.equal(page.document.documentElement.lang, lang);
  assert.ok(page.translated.every(node => typeof node.textContent === 'string' && node.textContent.length));
  assert.equal(page.element('[data-invite-code]').textContent, 'SR4D5Q');
  const store = new URL(page.element('[data-play-link]').href);
  assert.equal(new URLSearchParams(store.searchParams.get('referrer')).get('invite'), 'SR4D5Q');
  assert.equal(store.searchParams.get('hl'), lang);
  await page.element('[data-copy-code]').events.click();
  assert.equal(page.state.clipboard, 'SR4D5Q');
  assert.ok(page.element('[data-copy-status]').textContent);
  page.element('#invite-language').value = 'tr';
  page.element('#invite-language').events.change();
  assert.equal(page.state.location.searchParams.get('lang'), 'tr');
  assert.equal(page.state.location.pathname, '/products/zoday/invite/SR4D5Q');
  assert.equal(page.element('[data-support-link]').href, 'https://zoday.duniaops.com/support?lang=tr');
}
for (const suffix of ['', 'ABC', 'ABCDEF/extra', '%252541BC', '%ZZ1234', 'ABC!23', 'UUUUUU']) {
  const page = load(`/products/zoday/invite/${suffix}?lang=de`);
  assert.equal(page.element('[data-invite-panel]').hidden, true, suffix);
  assert.equal(page.element('[data-invalid-panel]').hidden, false, suffix);
  assert.equal(page.element('.next-steps').hidden, true);
  assert.equal(new URL(page.element('[data-play-link]').href).searchParams.has('referrer'), false);
}
for (const lang of ['', 'fr', '__proto__']) {
  assert.equal(load(`/products/zoday/invite/SR4D5Q?lang=${lang}`).document.documentElement.lang, 'en');
}
assert.equal(load('/products/zoday/invite/oiLab2?lang=PT-br').element('[data-invite-code]').textContent, '011AB2');
assert.equal(load('/products/zoday/invite/SR4D5Q?lang=PT-br').document.documentElement.lang, 'pt-BR');
const fallback = load('/products/zoday/invite/SR4D5Q?lang=tr', true);
await fallback.element('[data-copy-code]').events.click();
assert.equal(fallback.state.selected, true);
assert.equal(fallback.element('[data-invite-code]').focused, true);
assert.match(fallback.element('[data-copy-status]').textContent, /Kod seçildi/);
console.log('Validated five invite languages, switching, fallback, code parsing, store attribution and clipboard states.');

assert.equal(load('/invite/SR4D5Q?lang=tr').element('[data-invite-code]').textContent, 'SR4D5Q');
