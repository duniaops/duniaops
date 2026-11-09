import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateBreadcrumbs } from '../scripts/validate-breadcrumbs.mjs';

const home = { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.duniaops.com/' };
const current = { '@type': 'ListItem', position: 2, name: 'Software Project Handover Checklist' };
const trail = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items });

test('rejects the production W08 error: an intermediate category without a destination', () => {
  const errors = validateBreadcrumbs({ '@graph': [trail([
    home,
    { '@type': 'ListItem', position: 2, name: 'Resources' },
    { ...current, position: 3 }
  ])] });
  assert.deepEqual(errors, ['BreadcrumbList item 2: missing item URL before the final breadcrumb']);
});

test('allows the final page to omit its item URL', () => {
  assert.deepEqual(validateBreadcrumbs(trail([home, current])), []);
});

test('accepts a Thing identified by @id and a terminal URL', () => {
  assert.deepEqual(validateBreadcrumbs([trail([
    { ...home, item: { '@type': 'Thing', '@id': home.item } },
    { ...current, item: 'https://www.duniaops.com/resources/software-project-handover-checklist' }
  ])]), []);
});

test('rejects empty intermediate destinations and one-item trails', () => {
  assert.equal(validateBreadcrumbs(trail([{ ...home, item: ' ' }, current])).length, 1);
  assert.equal(validateBreadcrumbs(trail([home])).length, 1);
});

test('does not require breadcrumb markup on unrelated structured data', () => {
  assert.deepEqual(validateBreadcrumbs({ '@graph': [{ '@type': 'WebPage', name: 'A page' }] }), []);
});
