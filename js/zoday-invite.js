(() => {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const codeOutput = document.querySelector('[data-invite-code]');
  const codePanel = document.querySelector('[data-invite-panel]');
  const invalidPanel = document.querySelector('[data-invalid-panel]');
  const copyButton = document.querySelector('[data-copy-code]');
  const copyStatus = document.querySelector('[data-copy-status]');
  const playLink = document.querySelector('[data-play-link]');
  const languageSelect = document.querySelector('#invite-language');
  const translations = window.ZodayInviteTranslations;
  function normaliseCode(raw) {
    if (!/^[0-9A-Za-z]{6}$/.test(raw)) return null;
    const value = raw.toUpperCase().replace(/[IL]/g, '1').replace(/O/g, '0');
    return [...value].every((character) => alphabet.includes(character)) ? value : null;
  }

  function codeFromPath(pathname) {
    const prefix = pathname.startsWith('/invite/') ? '/invite/' : '/products/zoday/invite/';
    if (!pathname.startsWith(prefix)) return null;
    const suffix = pathname.slice(prefix.length);
    if (!suffix || suffix.includes('/')) return null;
    try {
      const decoded = decodeURIComponent(suffix);
      if (/%[0-9a-f]{2}/i.test(decoded)) return null;
      return normaliseCode(decoded);
    } catch {
      return null;
    }
  }

  const code = codeFromPath(window.location.pathname);
  const languages = Object.keys(translations);
  function resolveLanguage(raw) {
    return languages.find((language) => language.toLowerCase() === (raw || '').toLowerCase()) || 'en';
  }
  const label = document.querySelector('.language-bar label');
  // Enhance the native select with a themed popover. Older browsers keep the languageSelect.
  let trigger;
  let menu;
  let currentName;
  let languageLinks = [];
  if (typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype) {
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
    languageSelect.hidden = true;
    languageSelect.after(trigger);

    menu = document.createElement('nav');
    menu.id = 'legal-language-menu';
    menu.className = 'legal-language-menu';
    menu.setAttribute('popover', 'auto');
    languageLinks = Array.from(languageSelect.options, (option) => {
      const link = document.createElement('a');
      link.href = (() => { const url = new URL(window.location.href); url.searchParams.set('lang', option.value); return url.toString(); })();
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
        changeLanguage(option.value);
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
        languageLinks.find((link) => link.dataset.language === languageSelect.value)?.focus({ preventScroll: true });
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

  let language;
  let statusKey = '';
  function renderLanguage(value) {
    language = resolveLanguage(value);
    const strings = translations[language];
    document.documentElement.lang = language;
    document.title = strings.pageTitle;
    languageSelect.value = language;
    if (trigger) {
      currentName.textContent = languageSelect.selectedOptions[0].textContent;
      currentName.lang = language;
      menu.setAttribute('aria-label', strings.language);
      languageLinks.forEach((link) => {
        if (link.dataset.language === language) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = strings[element.dataset.i18n];
    });
    document.querySelector('meta[name="description"]').content = strings.intro;
    document.querySelector('[data-support-link]').href = `https://zoday.duniaops.com/support?lang=${language}`;
    document.querySelector('[data-privacy-link]').href = `https://zoday.duniaops.com/privacy-policy?lang=${language}`;
    copyStatus.textContent = statusKey ? strings[statusKey] : '';
    const destination = new URL('https://play.google.com/store/apps/details');
    destination.searchParams.set('id', 'com.duniaops.zoday');
    destination.searchParams.set('hl', language);
    if (code) {
      const payload = `v=1&utm_source=website&utm_medium=website&utm_campaign=website_product&invite=${code}`;
      destination.searchParams.set('referrer', payload);
    }
    playLink.href = destination.toString();
  }
  renderLanguage(new URL(window.location.href).searchParams.get('lang'));
  function changeLanguage(value) {
    renderLanguage(value);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState(null, '', url);
  }
  languageSelect.addEventListener('change', () => changeLanguage(languageSelect.value));
  window.addEventListener('popstate', () => renderLanguage(new URL(window.location.href).searchParams.get('lang')));
  codePanel.hidden = !code;
  invalidPanel.hidden = Boolean(code);
  document.querySelector('.next-steps').hidden = !code;
  if (!code) return;
  codeOutput.textContent = code;
  copyButton.disabled = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code);
      statusKey = 'copied';
    } catch {
      codeOutput.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeOutput);
      selection.removeAllRanges();
      selection.addRange(range);
      statusKey = 'copyFailed';
    }
    copyStatus.textContent = translations[language][statusKey];
  });
})();
