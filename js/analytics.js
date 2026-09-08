/* DuniaOps — consent-controlled Google Analytics 4 */
(function () {
  'use strict';

  var measurementId = 'G-B7X6HGW2J5';
  var consentKey = 'duniaops_analytics_consent';
  var leadKey = 'duniaops_project_enquiry_submitted';
  var formVersion = 'project_enquiry_v2';
  var serviceCategories = {
    rescue: true,
    support: true,
    devops_cloud: true,
    custom_software: true,
    ai: true,
    booking: true,
    mobile: true,
    consultancy: true,
    unknown: true
  };
  var legacyServiceCategories = {
    'ai-development': 'ai',
    'booking-platform': 'booking',
    'devops-cloud': 'devops_cloud',
    'mobile-app': 'mobile',
    'software-consultancy': 'consultancy',
    'not-sure': 'unknown'
  };
  var landingPageGroups = {
    home: true,
    about: true,
    rescue: true,
    support: true,
    devops_cloud: true,
    custom_software: true,
    ai: true,
    booking: true,
    mobile: true,
    consultancy: true,
    blog: true,
    other: true,
    unknown: true
  };
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

  function readQueryParameter(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (error) { return null; }
  }

  function normaliseServiceCategory(value) {
    if (serviceCategories[value]) return value;
    if (legacyServiceCategories[value]) return legacyServiceCategories[value];
    return 'unknown';
  }

  function normaliseLandingPageGroup(value) {
    return landingPageGroups[value] ? value : 'unknown';
  }

  function landingPageGroupForPath(pathname) {
    var path = pathname.replace(/\/$/, '') || '/';
    if (path === '/' || path === '/index.html') return 'home';
    if (path === '/about') return 'about';
    if (path === '/services/software-project-rescue') return 'rescue';
    if (path === '/services/application-support-maintenance') return 'support';
    if (path === '/services/devops-and-cloud-consultancy') return 'devops_cloud';
    if (path === '/services/custom-software-development') return 'custom_software';
    if (path === '/services/ai-software-development') return 'ai';
    if (path === '/services/booking-and-allocation-systems') return 'booking';
    if (path === '/services/mobile-app-development') return 'mobile';
    if (path === '/services/software-consultancy') return 'consultancy';
    if (path === '/blog' || path.indexOf('/blog/') === 0) return 'blog';
    return 'other';
  }

  function enquiryContext(form) {
    var service = form.querySelector('[name="service_category"]');
    var landingPage = form.querySelector('[name="landing_page_group"]');
    var testSubmission = form.querySelector('[name="test_submission"]');

    return {
      form_version: formVersion,
      service_category: normaliseServiceCategory(service ? service.value : ''),
      landing_page_group: normaliseLandingPageGroup(landingPage ? landingPage.value : ''),
      test_submission: testSubmission && testSubmission.value === 'true' ? 'true' : 'false'
    };
  }

  function prepareEnquiryForm(form) {
    var requestedService = normaliseServiceCategory(readQueryParameter('service'));
    var requestedOrigin = normaliseLandingPageGroup(readQueryParameter('from'));
    var service = form.querySelector('[name="service_category"]');
    var landingPage = form.querySelector('[name="landing_page_group"]');
    var testSubmission = form.querySelector('[name="test_submission"]');

    if (service && requestedService !== 'unknown' && service.querySelector('option[value="' + requestedService + '"]')) {
      service.value = requestedService;
    }
    if (landingPage) {
      landingPage.value = requestedOrigin !== 'unknown'
        ? requestedOrigin
        : landingPageGroupForPath(window.location.pathname);
    }
    if (testSubmission) testSubmission.value = readQueryParameter('measurement_test') === '1' ? 'true' : 'false';
  }

  function readLeadContext() {
    var stored;
    try { stored = window.sessionStorage.getItem(leadKey); } catch (error) { return null; }
    if (!stored) return null;

    if (stored === 'true') {
      return {
        form_version: 'legacy',
        service_category: 'unknown',
        landing_page_group: 'unknown',
        test_submission: 'false'
      };
    }

    try {
      var parsed = JSON.parse(stored);
      return {
        form_version: parsed.form_version === formVersion ? formVersion : 'legacy',
        service_category: normaliseServiceCategory(parsed.service_category),
        landing_page_group: normaliseLandingPageGroup(parsed.landing_page_group),
        test_submission: parsed.test_submission === 'true' ? 'true' : 'false'
      };
    } catch (error) {
      return null;
    }
  }

  function queueLeadEvent() {
    if (window.location.pathname.replace(/\/$/, '') !== '/thank-you') return;

    var context = readLeadContext();
    if (!context) return;

    window.gtag('event', 'generate_lead', {
      currency: 'GBP',
      value: 0,
      form_version: context.form_version,
      service_category: context.service_category,
      landing_page_group: context.landing_page_group,
      test_submission: context.test_submission
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
        '<p id="cookie-description">We use optional cookies to understand how people use our website and help us improve it. We never send your contact details or project description to analytics.</p>' +
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
    prepareEnquiryForm(enquiryForm);
    enquiryForm.addEventListener('submit', function () {
      try { window.sessionStorage.setItem(leadKey, JSON.stringify(enquiryContext(enquiryForm))); } catch (error) { /* no-op */ }
    });
  }

  createConsentControls();
})();
