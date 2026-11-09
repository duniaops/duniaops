// Google requires an item URL for every breadcrumb except the final page.
// https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
export function validateBreadcrumbs(schema) {
  const errors = [];

  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }

    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    if (types.includes('BreadcrumbList')) {
      const items = node.itemListElement;
      if (!Array.isArray(items) || items.length < 2) {
        errors.push('BreadcrumbList must contain at least two ListItems');
      } else {
        items.slice(0, -1).forEach((entry, index) => {
          const url = typeof entry?.item === 'string' ? entry.item : entry?.item?.['@id'];
          if (typeof url !== 'string' || !url.trim()) {
            errors.push(`BreadcrumbList item ${index + 1}: missing item URL before the final breadcrumb`);
          }
        });
      }
    }

    Object.values(node).forEach(visit);
  }

  visit(schema);
  return errors;
}
