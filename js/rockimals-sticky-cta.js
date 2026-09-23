// Rockimals mobile sticky App Store bar (website spec 035, addendum).
//
// Appears on narrow screens once the page's own App Store badge
// ([data-rockimals-sticky-after]) has scrolled above the viewport, and hides
// again while the closing call to action ([data-rockimals-sticky-before]) is
// on screen, so two App Store calls are never shown together. A dismissal
// lasts for the visit. No tracking; storage failures only mean the bar can
// come back.
(() => {
  const bar = document.querySelector('[data-rockimals-sticky]');
  const start = document.querySelector('[data-rockimals-sticky-after]');
  if (!bar || !start || !('IntersectionObserver' in window)) return;
  const key = 'rockimals-sticky-dismissed';
  let dismissed = false;
  try { dismissed = window.sessionStorage.getItem(key) === '1'; } catch { /* private mode */ }
  if (dismissed) return;

  const narrow = window.matchMedia('(max-width: 680px)');
  let pastStart = false;
  let atEnd = false;
  const sync = () => {
    bar.hidden = !(narrow.matches && pastStart && !atEnd && !dismissed);
  };

  new IntersectionObserver(([entry]) => {
    pastStart = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
    sync();
  }).observe(start);
  const end = document.querySelector('[data-rockimals-sticky-before]');
  if (end) {
    new IntersectionObserver(([entry]) => {
      atEnd = entry.isIntersecting;
      sync();
    }).observe(end);
  }
  narrow.addEventListener?.('change', sync);
  bar.querySelector('[data-rockimals-sticky-close]')?.addEventListener('click', () => {
    dismissed = true;
    try { window.sessionStorage.setItem(key, '1'); } catch { /* private mode */ }
    sync();
  });
})();
