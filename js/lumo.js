(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const picker = document.querySelector('[data-language-picker]');
  if (picker) {
    const trigger = picker.querySelector('summary');
    picker.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) link.hash = window.location.hash;
    });
    picker.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && picker.open) {
        event.preventDefault();
        picker.open = false;
        trigger.focus();
      }
    });
    document.addEventListener('pointerdown', (event) => {
      if (picker.open && !picker.contains(event.target)) picker.open = false;
    });
  }

  const demo = document.querySelector('[data-review-demo]');
  if (demo) {
    const frames = demo.querySelector('.demo-frames');
    const choices = Array.from(frames.querySelectorAll('input[type="checkbox"]'));
    const footer = demo.querySelector('.demo-footer');
    const summary = demo.querySelector('[data-demo-summary]');
    const review = demo.querySelector('[data-demo-review]');
    const reviewLabel = review.textContent;
    const reset = demo.querySelector('[data-demo-reset]');
    const scoreDialog = demo.querySelector('.demo-score-dialog');
    const focusMeter = scoreDialog.querySelector('#demo-focus-meter');
    const technicalMeter = scoreDialog.querySelector('#demo-technical-meter');
    const focusOutput = scoreDialog.querySelector('[data-score-focus]');
    const technicalOutput = scoreDialog.querySelector('[data-score-technical]');
    const reason = scoreDialog.querySelector('[data-score-reason-text]');
    let reviewing = false;

    function updateReview() {
      const kept = choices.filter((choice) => choice.checked).length;
      choices.forEach((choice) => {
        choice.closest('.demo-card').hidden = reviewing && !choice.checked;
        choice.disabled = reviewing;
      });
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

    demo.addEventListener('click', (event) => {
      const button = event.target.closest('[data-demo-score]');
      if (!button) return;
      const { demoScore, technicalScore, scoreReason } = button.dataset;
      focusMeter.value = Number(demoScore);
      technicalMeter.value = Number(technicalScore);
      focusOutput.textContent = demoScore;
      technicalOutput.textContent = technicalScore;
      reason.textContent = scoreReason;
      scoreDialog.classList.toggle('demo-strong-score', focusMeter.value >= 90);
      scoreDialog.showModal();
    });

    frames.disabled = false;
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

  const sticky = document.querySelector('[data-lumo-sticky]');
  if (sticky && 'IntersectionObserver' in window) {
    const heroBadge = document.querySelector('.hero .lumo-app-store');
    const closing = document.querySelector('#availability');
    const mobile = window.matchMedia('(max-width: 680px)');
    const storageKey = 'lumo-sticky-download-dismissed';
    const closeButton = sticky.querySelector('[data-lumo-sticky-close]');
    let dismissed = false;
    try { dismissed = window.sessionStorage.getItem(storageKey) === '1'; } catch { /* Private browsing. */ }

    const syncDownload = () => {
      sticky.hidden = dismissed || !mobile.matches ||
        heroBadge.getBoundingClientRect().bottom > 0 ||
        closing.getBoundingClientRect().top < window.innerHeight;
    };
    const visibility = new IntersectionObserver(syncDownload);
    visibility.observe(heroBadge);
    visibility.observe(closing);
    mobile.addEventListener('change', syncDownload);
    closeButton.addEventListener('click', () => {
      dismissed = true;
      try { window.sessionStorage.setItem(storageKey, '1'); } catch { /* Private browsing. */ }
      syncDownload();
    });
    syncDownload();
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
