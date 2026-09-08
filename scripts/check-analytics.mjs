import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ANALYTICS_SOURCE = await readFile(path.join(ROOT, 'js/analytics.js'), 'utf8');
const LEAD_KEY = 'duniaops_project_enquiry_submitted';

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
}

function bannerElement() {
  return {
    hidden: false,
    setAttribute() {},
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
}

function runPage({ pathname, search = '', localStorage, sessionStorage, form = null }) {
  const scripts = [];
  const document = {
    body: { appendChild() {} },
    head: { appendChild(script) { scripts.push(script); } },
    createElement(tagName) {
      if (tagName === 'section') return bannerElement();
      return { setAttribute() {} };
    },
    querySelector(selector) {
      if (selector === 'form[name="project-enquiry"]') return form;
      return null;
    }
  };
  const window = {
    dataLayer: [],
    document,
    localStorage,
    sessionStorage,
    location: { pathname, search }
  };

  vm.runInNewContext(ANALYTICS_SOURCE, {
    Date,
    JSON,
    URLSearchParams,
    document,
    encodeURIComponent,
    window
  });

  return { scripts, window };
}

const sessionStorage = memoryStorage();
const formFields = {
  service_category: {
    value: '',
    querySelector(selector) { return selector === 'option[value="rescue"]' ? {} : null; }
  },
  landing_page_group: { value: 'home' },
  test_submission: { value: 'false' }
};
let submitHandler;
const form = {
  querySelector(selector) {
    const match = selector.match(/^\[name="([^"]+)"\]$/);
    return match ? formFields[match[1]] || null : null;
  },
  addEventListener(name, handler) {
    if (name === 'submit') submitHandler = handler;
  }
};

runPage({
  pathname: '/',
  search: '?service=rescue&from=rescue&measurement_test=1',
  localStorage: memoryStorage({ duniaops_analytics_consent: 'denied' }),
  sessionStorage,
  form
});

assert.equal(formFields.service_category.value, 'rescue');
assert.equal(formFields.landing_page_group.value, 'rescue');
assert.equal(formFields.test_submission.value, 'true');
assert.equal(typeof submitHandler, 'function');
submitHandler();
assert.deepEqual(JSON.parse(sessionStorage.getItem(LEAD_KEY)), {
  form_version: 'project_enquiry_v2',
  service_category: 'rescue',
  landing_page_group: 'rescue',
  test_submission: 'true'
});

const confirmation = runPage({
  pathname: '/thank-you',
  localStorage: memoryStorage({ duniaops_analytics_consent: 'granted' }),
  sessionStorage
});
const leadCall = confirmation.window.dataLayer
  .map((entry) => Array.from(entry))
  .find((entry) => entry[0] === 'event' && entry[1] === 'generate_lead');

assert.ok(leadCall, 'generate_lead should be queued after a confirmed form journey');
assert.deepEqual(JSON.parse(JSON.stringify(leadCall[2])), {
  currency: 'GBP',
  value: 0,
  form_version: 'project_enquiry_v2',
  service_category: 'rescue',
  landing_page_group: 'rescue',
  test_submission: 'true'
});
assert.equal(sessionStorage.getItem(LEAD_KEY), null, 'lead context should be removed after queueing');
assert.equal(confirmation.scripts.length, 1, 'GA4 should load once after consent');

console.log('Validated privacy-safe project-enquiry attribution and generate_lead queueing.');
