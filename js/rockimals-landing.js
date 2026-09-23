(() => {
  const page = document.querySelector('[data-rockimals-page]');
  const select = document.querySelector('[data-rockimals-language]');
  const picker = select?.closest('.rk-language');
  const label = document.querySelector('[data-rockimals-language-label]');
  if (!page || !select) return;

  const languageUrl = (language) => language === 'en' ? '/' : `/${language}/`;
  const navigate = (language) => window.location.assign(languageUrl(language));

  select.addEventListener('change', () => navigate(select.value));

  if (picker && label && 'showPopover' in HTMLElement.prototype) {
    const icon = (paths, className) => `<svg class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'rk-language-trigger';
    trigger.id = 'rk-language-trigger';
    trigger.setAttribute('popovertarget', 'rk-language-menu');
    trigger.setAttribute('aria-controls', 'rk-language-menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-labelledby', 'rk-language-label rk-language-current');
    trigger.innerHTML = icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>', 'rk-language-globe')
      + '<span id="rk-language-current"></span>'
      + icon('<path d="m7 10 5 5 5-5"/>', 'rk-language-chevron');

    label.id = 'rk-language-label';
    select.hidden = true;
    select.after(trigger);

    const currentName = trigger.querySelector('#rk-language-current');
    currentName.textContent = select.selectedOptions[0]?.textContent || '';
    currentName.lang = select.value;

    const menu = document.createElement('nav');
    menu.id = 'rk-language-menu';
    menu.className = 'rk-language-menu';
    menu.setAttribute('popover', 'auto');
    menu.setAttribute('aria-label', label.textContent);

    const links = Array.from(select.options, (option) => {
      const link = document.createElement('a');
      link.href = languageUrl(option.value);
      link.lang = option.value;
      link.hreflang = option.value;
      link.dataset.language = option.value;
      link.innerHTML = `<span>${option.textContent}</span>` + icon('<path d="m5 12 4 4L19 6"/>', 'rk-language-check');
      if (option.selected) link.setAttribute('aria-current', 'true');
      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        menu.hidePopover();
        navigate(option.value);
      });
      menu.append(link);
      return link;
    });
    document.body.append(menu);

    const positionMenu = () => {
      const rect = trigger.getBoundingClientRect();
      const gutter = 12;
      menu.style.width = `${Math.min(Math.max(rect.width, 220), window.innerWidth - gutter * 2)}px`;
      menu.style.maxHeight = `${window.innerHeight - gutter * 2}px`;
      const height = menu.getBoundingClientRect().height;
      const top = rect.bottom + 8 + height <= window.innerHeight - gutter
        ? rect.bottom + 8 : Math.max(gutter, rect.top - height - 8);
      menu.style.top = `${top}px`;
      menu.style.left = `${Math.max(gutter, Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - gutter))}px`;
    };

    menu.addEventListener('toggle', (event) => {
      const open = event.newState === 'open';
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        positionMenu();
        links.find((link) => link.hasAttribute('aria-current'))?.focus({ preventScroll: true });
      }
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        menu.showPopover();
      }
    });
    menu.addEventListener('keydown', (event) => {
      const index = links.indexOf(document.activeElement);
      const targets = { ArrowDown: (index + 1) % links.length, ArrowUp: (index - 1 + links.length) % links.length, Home: 0, End: links.length - 1 };
      if (event.key in targets) {
        event.preventDefault();
        links[targets[event.key]].focus();
      }
    });
    window.addEventListener('resize', () => { if (menu.matches(':popover-open')) positionMenu(); });
    window.addEventListener('scroll', () => { if (menu.matches(':popover-open')) menu.hidePopover(); }, { passive: true });
  }

  document.querySelectorAll('.rk-faq details').forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    summary.setAttribute('aria-expanded', String(details.open));
    details.addEventListener('toggle', () => summary.setAttribute('aria-expanded', String(details.open)));
  });
})();

// The hero loop (website spec 035): plays muted only while it is on screen,
// and never when the visitor asks for reduced motion — then the poster stays.
(() => {
  const video = document.querySelector('[data-rockimals-loop]');
  if (!video) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const sync = () => {
    if (visible && !reduced.matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    }, { rootMargin: '200px 0px' }).observe(video);
  } else {
    visible = true;
    sync();
  }
  reduced.addEventListener?.('change', sync);
})();
