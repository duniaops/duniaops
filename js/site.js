/* DuniaOps — lightweight interactions (no dependencies) */
(function () {
  'use strict';

  // sticky header shadow
  var header = document.querySelector('body > header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // animated counters: <span data-count="7" data-suffix="+">
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduced && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target;
        var end = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1100;
        var t0 = null;
        var stepFn = function (t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased) + suffix;
          if (p < 1) requestAnimationFrame(stepFn);
        };
        requestAnimationFrame(stepFn);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // accessible mobile navigation
  var menuButton = document.querySelector('.nav-burger');
  var menu = document.getElementById('primary-navigation');
  if (menuButton && menu) {
    var closeMenu = function (returnFocus) {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu(false);
      } else {
        menu.classList.add('open');
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'Close navigation');
      }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
  }

  // preselect the service passed from a detail-page CTA
  var serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    var selectedService = new URLSearchParams(window.location.search).get('service');
    if (selectedService && serviceSelect.querySelector('option[value="' + selectedService + '"]')) {
      serviceSelect.value = selectedService;
    }
  }

  // copy an article's canonical URL without requiring a sharing service
  document.querySelectorAll('[data-copy-url]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy-url');
      var status = button.parentElement.querySelector('.copy-status');

      var showResult = function (message) {
        if (!status) return;
        status.textContent = message;
        window.setTimeout(function () { status.textContent = ''; }, 2400);
      };

      var fallbackCopy = function () {
        var field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        var copied = document.execCommand('copy');
        document.body.removeChild(field);
        if (!copied) throw new Error('Copy command failed');
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value)
          .then(function () { showResult('Link copied'); })
          .catch(function () {
            try {
              fallbackCopy();
              showResult('Link copied');
            } catch (error) {
              showResult('Unable to copy');
            }
          });
      } else {
        try {
          fallbackCopy();
          showResult('Link copied');
        } catch (error) {
          showResult('Unable to copy');
        }
      }
    });
  });
})();
