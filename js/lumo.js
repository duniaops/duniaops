(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const languageLink = document.querySelector('.language-link');
  languageLink?.addEventListener('click', () => {
    languageLink.hash = window.location.hash;
  });

  const demo = document.querySelector('[data-review-demo]');
  if (demo) {
    const frames = demo.querySelector('.demo-frames');
    const choices = Array.from(frames.querySelectorAll('input[type="checkbox"]'));
    const footer = demo.querySelector('.demo-footer');
    const summary = demo.querySelector('[data-demo-summary]');
    const review = demo.querySelector('[data-demo-review]');
    const reviewLabel = review.textContent;
    const reset = demo.querySelector('[data-demo-reset]');
    let reviewing = false;

    function updateReview() {
      const kept = choices.filter((choice) => choice.checked).length;
      choices.forEach((choice) => {
        choice.closest('.demo-card').hidden = reviewing && !choice.checked;
      });
      frames.disabled = reviewing;
      review.disabled = kept === 0;
      review.textContent = reviewing ? review.dataset.showAll : reviewLabel;
      summary.textContent = summary.dataset.pattern.replace('{count}', kept).replace('{total}', choices.length);
      demo.toggleAttribute('data-reviewing', reviewing);
    }

    frames.addEventListener('change', updateReview);
    review.addEventListener('click', () => {
      reviewing = !reviewing;
      updateReview();
    });
    reset.addEventListener('click', () => {
      choices.forEach((choice) => { choice.checked = choice.defaultChecked; });
      reviewing = false;
      updateReview();
    });

    updateReview();
    footer.hidden = false;
  }

  const player = document.querySelector('.film-player');
  if (player) {
    const video = player.querySelector('video');
    const play = player.querySelector('.film-play');
    play.hidden = false;
    video.addEventListener('playing', () => {
      if (document.activeElement === play) video.focus();
      play.hidden = true;
    }, { once: true });
    play.addEventListener('click', async () => {
      try {
        await video.play();
      } catch {
        play.hidden = true;
        video.focus();
      }
    });
  }

  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      observer.unobserve(target);
      if (reducedMotion.matches) return;

      target.animate([
        { opacity: .45, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 620, easing: 'cubic-bezier(.2, .7, .25, 1)' });
    });
  }, { threshold: .14 });

  document.querySelectorAll('.shot-card, .film-player, .privacy-photo, .plan, .interior-hero img')
    .forEach((section) => observer.observe(section));
})();
