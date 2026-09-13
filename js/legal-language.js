(() => {
  const page = document.querySelector('[data-legal-page]');
  const select = document.querySelector('[data-legal-language-select]');
  const label = document.querySelector('[data-language-label]');
  const panels = Array.from(document.querySelectorAll('[data-legal-panel]'));
  const localized = Array.from(document.querySelectorAll('[data-legal-copy]'));
  const relatedPages = Array.from(document.querySelectorAll('.legal-related-page, .legal-related a'));

  if (!page || !select || panels.length === 0) return;

  const supported = new Set(Array.from(select.options, (option) => option.value));
  const defaultLanguage = document.documentElement.lang;
  const labels = { tr: 'Dil', en: 'Language', es: 'Idioma', 'pt-BR': 'Idioma', de: 'Sprache', fr: 'Langue', ja: '言語', ko: '언어', 'zh-Hans': '语言' };
  const root = page.classList.contains('zoday-legal-page') && window.location.hostname !== 'zoday.duniaops.com' ? '/zoday' : page.dataset.legalRoot;
  const languageFromUrl = () => {
    const queryLanguage = new URL(window.location.href).searchParams.get('lang');
    if (supported.has(queryLanguage)) return queryLanguage;
    const hashLanguage = window.location.hash.slice(1);
    return supported.has(hashLanguage) ? hashLanguage : defaultLanguage;
  };
  const languageUrl = (pageName, language) => {
    if (page.hasAttribute('data-zoday-landing')) {
      const base = window.location.hostname === 'zoday.duniaops.com' ? '/' : '/products/zoday';
      return `${base}?lang=${language}`;
    }
    const base = `${root}/${pageName}`;
    if (page.dataset.legalRouting === 'query') return `${base}?lang=${language}`;
    return language === 'tr' || language === 'en'
      ? `${base}?lang=${language}`
      : `${base}/${language}`;
  };

  // Enhance the native select with a themed popover. Older browsers keep the select.
  let trigger;
  let menu;
  let currentName;
  let languageLinks = [];
  if ('showPopover' in HTMLElement.prototype) {
    const icon = (paths, className = '') => `<svg class="${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = 'legal-language-trigger';
    trigger.className = 'legal-language-trigger';
    trigger.setAttribute('popovertarget', 'legal-language-menu');
    trigger.setAttribute('aria-controls', 'legal-language-menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-labelledby', 'legal-language-label legal-language-current');
    trigger.innerHTML = icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>', 'legal-language-globe')
      + '<span id="legal-language-current"></span>'
      + icon('<path d="m7 10 5 5 5-5"/>', 'legal-language-chevron');
    currentName = trigger.querySelector('span');
    label.id = 'legal-language-label';
    label.htmlFor = trigger.id;
    select.hidden = true;
    select.after(trigger);

    menu = document.createElement('nav');
    menu.id = 'legal-language-menu';
    menu.className = 'legal-language-menu';
    menu.setAttribute('popover', 'auto');
    languageLinks = Array.from(select.options, (option) => {
      const link = document.createElement('a');
      link.href = languageUrl(page.dataset.legalPage, option.value);
      link.lang = option.value;
      link.hreflang = option.value;
      link.dataset.language = option.value;
      const name = document.createElement('span');
      name.textContent = option.textContent;
      link.append(name);
      link.insertAdjacentHTML('beforeend', icon('<path d="m5 12 4 4L19 6"/>', 'legal-language-check'));
      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        menu.hidePopover();
        trigger.focus({ preventScroll: true });
        setLanguage(option.value);
      });
      menu.append(link);
      return link;
    });
    document.body.append(menu);

    const positionMenu = () => {
      const rect = trigger.getBoundingClientRect();
      const gutter = 12;
      menu.style.width = `${Math.min(Math.max(rect.width, 230), window.innerWidth - gutter * 2)}px`;
      menu.style.maxHeight = `${window.innerHeight - gutter * 2}px`;
      const height = menu.getBoundingClientRect().height;
      const top = rect.bottom + 8 + height <= window.innerHeight - gutter
        ? rect.bottom + 8 : Math.max(gutter, rect.top - height - 8);
      menu.style.top = `${top}px`;
      menu.style.left = `${Math.max(gutter, Math.min(rect.left, window.innerWidth - menu.offsetWidth - gutter))}px`;
    };
    menu.addEventListener('toggle', (event) => {
      const open = event.newState === 'open';
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        positionMenu();
        languageLinks.find((link) => link.dataset.language === select.value)?.focus({ preventScroll: true });
      }
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        menu.showPopover();
      }
    });
    menu.addEventListener('keydown', (event) => {
      const index = languageLinks.indexOf(document.activeElement);
      const targets = { ArrowDown: (index + 1) % languageLinks.length, ArrowUp: (index - 1 + languageLinks.length) % languageLinks.length, Home: 0, End: languageLinks.length - 1 };
      if (event.key in targets) {
        event.preventDefault();
        languageLinks[targets[event.key]].focus();
      }
    });
    document.addEventListener('focusin', (event) => {
      if (menu.matches(':popover-open') && !menu.contains(event.target) && event.target !== trigger) menu.hidePopover();
    });
    window.addEventListener('resize', () => { if (menu.matches(':popover-open')) positionMenu(); });
    window.addEventListener('scroll', () => { if (menu.matches(':popover-open')) menu.hidePopover(); }, { passive: true });
  }

  const setLanguage = (language, updateUrl = true) => {
    const selectedLanguage = supported.has(language) ? language : defaultLanguage;
    const panel = panels.find((item) => item.dataset.legalPanel === selectedLanguage);

    if (!panel) {
      const destination = languageUrl(page.dataset.legalPage, selectedLanguage);
      if (updateUrl) window.location.assign(destination);
      else window.location.replace(destination);
      return;
    }

    select.value = selectedLanguage;
    label.textContent = labels[selectedLanguage];
    if (trigger) {
      currentName.textContent = select.selectedOptions[0].textContent;
      currentName.lang = selectedLanguage;
      menu.setAttribute('aria-label', labels[selectedLanguage]);
      languageLinks.forEach((link) => {
        if (link.dataset.language === selectedLanguage) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
    panels.forEach((item) => { item.hidden = item !== panel; });
    localized.forEach((element) => {
      element.hidden = element.dataset.legalCopy !== selectedLanguage;
    });

    document.documentElement.lang = selectedLanguage;
    const title = page.getAttribute(`data-title-${selectedLanguage}`);
    if (title) document.title = title;

    relatedPages.forEach((link) => {
      const relatedUrl = new URL(link.href, window.location.href);
      const match = relatedUrl.pathname.startsWith(`${root}/`)
        ? relatedUrl.pathname.slice(root.length).match(/^\/(support|privacy-policy)(?:\/|$)/) : null;
      if (relatedUrl.origin === window.location.origin && match) {
        link.href = languageUrl(match[1], selectedLanguage);
      }
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', selectedLanguage);
      url.hash = '';
      window.history.replaceState({}, '', url);
    }
  };

  select.addEventListener('change', () => setLanguage(select.value));
  window.addEventListener('popstate', () => setLanguage(languageFromUrl(), false));
  window.addEventListener('hashchange', () => setLanguage(languageFromUrl(), false));
  window.addEventListener('pageshow', () => setLanguage(languageFromUrl(), false));
  setLanguage(languageFromUrl(), false);
})();
