// Product identities and store destinations are controlled here, never arbitrary HTML from front matter.
export function renderProductHero(product) {
  if (product === undefined) return '';
  if (product !== 'lumo') throw new Error('Unsupported heroProduct; expected "lumo".');

  return `<div class="article-hero-brand"><img src="/assets/blog/lumo-banner-icon-128.png" alt="Lumo" width="64" height="64"><span aria-hidden="true">Lumo</span></div>
        <a class="article-hero-store" href="https://apps.apple.com/gb/app/lumo-photo-culling/id6799718934" aria-label="Download Lumo on the App Store"><img src="/assets/products/download-on-the-app-store.svg" alt="" width="260" height="87"></a>`;
}
