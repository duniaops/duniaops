(() => {
  // Forward a registered Zoday campaign from the landing URL into the Play referrer.
  // The registry is store/play/1.3.5/growth-2026-09-26/CAMPAIGN-REGISTRY.md in the
  // zoday repository and must match the app's allowlist. Anything else keeps the
  // static website_product referrer in the markup.
  const SOURCES = ['instagram', 'tiktok', 'youtube', 'whatsapp'];
  const MEDIUMS = ['organic_social', 'creator', 'direct_share'];
  const CAMPAIGNS = ['tr_daily_v1', 'tr_moon_v1', 'en_daily_v1', 'en_moon_v1'];
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');
  if (SOURCES.includes(source) && MEDIUMS.includes(medium) && CAMPAIGNS.includes(campaign)) {
    const payload = `v=1&utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
    document.querySelectorAll('a.zl-store').forEach((link) => {
      const destination = new URL(link.href);
      if (destination.hostname !== 'play.google.com') return;
      destination.searchParams.set('referrer', payload);
      link.href = destination.toString();
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.zl-faq details').forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary || typeof details.animate !== 'function') return;
    let animation;
    let expanded = details.open;
    summary.setAttribute('aria-expanded', String(expanded));
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      expanded = !expanded;
      if (animation) animation.cancel();
      summary.setAttribute('aria-expanded', String(expanded));
      if (reducedMotion.matches) {
        details.open = expanded;
        details.style.overflow = '';
        animation = null;
        return;
      }
      // Measure both natural states, keeping the content rendered during closing.
      details.open = expanded;
      const end = details.getBoundingClientRect().height;
      details.open = true;
      details.style.overflow = 'hidden';
      animation = details.animate(
        [{ height: `${start}px` }, { height: `${end}px` }],
        { duration: 300, easing: 'cubic-bezier(.2,.75,.25,1)' }
      );
      animation.onfinish = () => {
        details.open = expanded;
        details.style.overflow = '';
        animation = null;
      };
    });
  });
})();
