/* DuniaOps — consent-controlled Google Analytics 4 */
(function () {
  'use strict';

  var measurementId = 'G-B7X6HGW2J5';
  var consentKey = 'duniaops_analytics_consent';
  var leadKey = 'duniaops_project_enquiry_submitted';
  var analyticsLoaded = false;
  var banner;

  function readConsent() {
    try { return window.localStorage.getItem(consentKey); } catch (error) { return null; }
  }

  function writeConsent(value) {
    try { window.localStorage.setItem(consentKey, value); } catch (error) { /* continue without persistence */ }
  }

  function consentState(analyticsStorage) {
    return {
      ad_storage: 'denied',
      analytics_storage: analyticsStorage,
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted'
    };
  }

  function queueLeadEvent() {
    if (window.location.pathname.replace(/\/$/, '') !== '/thank-you') return;

    var submitted = false;
    try { submitted = window.sessionStorage.getItem(leadKey) === 'true'; } catch (error) { /* no-op */ }
    if (!submitted) return;

    window.gtag('event', 'generate_lead', {
      currency: 'GBP',
      value: 0
    });
    try { window.sessionStorage.removeItem(leadKey); } catch (error) { /* no-op */ }
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', consentState('denied'));
    window.gtag('consent', 'update', consentState('granted'));
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    queueLeadEvent();

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showBanner(shouldFocus) {
    if (!banner) return;
    banner.hidden = false;
    if (shouldFocus) {
      var heading = banner.querySelector('h2');
      if (heading) heading.focus();
    }
  }

  function setConsent(value) {
    writeConsent(value);

    if (value === 'granted') {
      if (analyticsLoaded) window.gtag('consent', 'update', consentState('granted'));
      else loadAnalytics();
    } else {
      if (analyticsLoaded) window.gtag('consent', 'update', consentState('denied'));
      if (window.location.pathname.replace(/\/$/, '') === '/thank-you') {
        try { window.sessionStorage.removeItem(leadKey); } catch (error) { /* no-op */ }
      }
    }

    hideBanner();
  }

  function createConsentControls() {
    banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.hidden = true;
    banner.setAttribute('aria-labelledby', 'cookie-title');
    banner.setAttribute('aria-describedby', 'cookie-description');
    banner.innerHTML =
      '<div class="cookie-copy">' +
        '<h2 id="cookie-title" tabindex="-1">Your cookie choices</h2>' +
        '<p id="cookie-description">We use optional cookies to understand how people use our website and help us improve it. We never use your enquiry details for analytics.</p>' +
        '<a href="/privacy#analytics-cookies">Cookie and privacy details</a>' +
      '</div>' +
      '<div class="cookie-actions">' +
        '<button class="btn btn-red" type="button" data-consent="granted">Accept optional cookies</button>' +
        '<button class="btn btn-outline" type="button" data-consent="denied">Reject optional cookies</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelectorAll('[data-consent]').forEach(function (button) {
      button.addEventListener('click', function () { setConsent(button.getAttribute('data-consent')); });
    });

    var footerBase = document.querySelector('.foot-base');
    if (footerBase) {
      var manage = document.createElement('button');
      manage.type = 'button';
      manage.className = 'cookie-manage';
      manage.textContent = 'Cookie settings';
      manage.addEventListener('click', function () { showBanner(true); });
      footerBase.appendChild(manage);
    }

    var currentConsent = readConsent();
    if (currentConsent === 'granted') loadAnalytics();
    else if (currentConsent !== 'denied') showBanner(false);
  }

  var enquiryForm = document.querySelector('form[name="project-enquiry"]');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function () {
      try { window.sessionStorage.setItem(leadKey, 'true'); } catch (error) { /* no-op */ }
    });
  }

  createConsentControls();
})();
