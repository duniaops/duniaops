(() => {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const codeOutput = document.querySelector('[data-invite-code]');
  const codePanel = document.querySelector('[data-invite-panel]');
  const invalidPanel = document.querySelector('[data-invalid-panel]');
  const copyButton = document.querySelector('[data-copy-code]');
  const playLink = document.querySelector('[data-play-link]');

  function normaliseCode(raw) {
    if (!/^[0-9A-Za-z]{6}$/.test(raw)) return null;
    const value = raw.toUpperCase().replace(/[IL]/g, '1').replace(/O/g, '0');
    return [...value].every((character) => alphabet.includes(character)) ? value : null;
  }

  function codeFromPath(pathname) {
    const prefix = '/products/zoday/invite/';
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
  if (!code) {
    codePanel.hidden = true;
    invalidPanel.hidden = false;
    return;
  }

  codeOutput.textContent = code;
  const payload = `v=1&utm_source=website&utm_medium=website&utm_campaign=website_product&invite=${code}`;
  const destination = new URL('https://play.google.com/store/apps/details');
  destination.searchParams.set('id', 'com.duniaops.zoday');
  destination.searchParams.set('referrer', payload);
  playLink.href = destination.toString();

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code);
      copyButton.textContent = 'Copied · Kopyalandı';
    } catch {
      codeOutput.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeOutput);
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = 'Select and copy · Seçip kopyala';
    }
  });
})();
