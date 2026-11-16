import { createHash } from 'node:crypto';

export function analyticsRevision(source) {
  return createHash('sha256').update(source).digest('hex').slice(0, 12);
}

function ownAnalyticsSource(source) {
  return /^(?:\/(?!\/)|(?:\.\.?\/)*)js\/analytics\.js(?:[?#].*)?$/.test(source);
}

export function versionAnalyticsScripts(html, revision) {
  if (!/^[a-f0-9]{12}$/.test(revision)) throw new Error('Invalid analytics content revision');
  return html.replace(/<script\b[^>]*>/gi, (tag) => tag.replace(
    /(\ssrc\s*=\s*)(["'])([^"']+)\2/i,
    (attribute, prefix, quote, source) => {
      if (!ownAnalyticsSource(source)) return attribute;
      const url = new URL(source, 'https://build.invalid/');
      url.searchParams.set('v', revision);
      const pathname = source.split(/[?#]/, 1)[0];
      return `${prefix}${quote}${pathname}${url.search}${url.hash}${quote}`;
    }
  ));
}

export function staleAnalyticsSources(html, revision) {
  const sources = [];
  for (const tag of html.matchAll(/<script\b[^>]*>/gi)) {
    const source = tag[0].match(/\ssrc\s*=\s*(["'])([^"']+)\1/i)?.[2];
    if (source && ownAnalyticsSource(source)
        && new URL(source, 'https://build.invalid/').searchParams.get('v') !== revision) {
      sources.push(source);
    }
  }
  return sources;
}
