(() => {
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
