(() => {
  const page = document.querySelector('.zoday-legal-page');
  const tabs = Array.from(document.querySelectorAll('[data-legal-language]'));
  const panels = Array.from(document.querySelectorAll('[data-legal-panel]'));
  const localized = Array.from(document.querySelectorAll('[data-legal-copy]'));
  const relatedPages = Array.from(document.querySelectorAll('.legal-related-page'));

  if (!page || tabs.length === 0 || panels.length === 0) return;

  const supported = new Set(['tr', 'en']);
  const languageFromUrl = () => {
    const queryLanguage = new URL(window.location.href).searchParams.get('lang');
    if (supported.has(queryLanguage)) return queryLanguage;
    const hashLanguage = window.location.hash.replace('#', '');
    return supported.has(hashLanguage) ? hashLanguage : null;
  };

  const setLanguage = (language, updateUrl = true) => {
    const selectedLanguage = supported.has(language) ? language : 'en';

    tabs.forEach((tab) => {
      const selected = tab.dataset.legalLanguage === selectedLanguage;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.legalPanel !== selectedLanguage;
    });

    localized.forEach((element) => {
      element.hidden = element.dataset.legalCopy !== selectedLanguage;
    });

    document.documentElement.lang = selectedLanguage;
    document.title = selectedLanguage === 'tr' ? page.dataset.titleTr : page.dataset.titleEn;

    relatedPages.forEach((link) => {
      const relatedUrl = new URL(link.href, window.location.href);
      relatedUrl.searchParams.set('lang', selectedLanguage);
      link.href = relatedUrl.toString();
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', selectedLanguage);
      url.hash = '';
      window.history.replaceState({}, '', url);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setLanguage(tab.dataset.legalLanguage));
    tab.addEventListener('keydown', (event) => {
      const keyTargets = {
        ArrowLeft: index - 1,
        ArrowRight: index + 1,
        Home: 0,
        End: tabs.length - 1
      };
      if (!(event.key in keyTargets)) return;
      event.preventDefault();
      const nextIndex = (keyTargets[event.key] + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      setLanguage(tabs[nextIndex].dataset.legalLanguage);
    });
  });

  const initialLanguage = languageFromUrl() || 'en';
  setLanguage(initialLanguage, Boolean(languageFromUrl()));
})();
