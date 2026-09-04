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

    // Replace the browser-native menu with a site-styled, keyboard-friendly list.
    // The original select remains the submitted form control and is the no-JS fallback.
    var selectWrapper = document.createElement('div');
    selectWrapper.className = 'service-select';

    var selectTrigger = document.createElement('button');
    selectTrigger.className = 'service-select-trigger';
    selectTrigger.type = 'button';
    selectTrigger.setAttribute('aria-haspopup', 'listbox');
    selectTrigger.setAttribute('aria-expanded', 'false');
    selectTrigger.setAttribute('aria-labelledby', 'service-label service-select-value');

    var selectValue = document.createElement('span');
    selectValue.id = 'service-select-value';
    selectTrigger.appendChild(selectValue);

    var selectMenu = document.createElement('div');
    selectMenu.className = 'service-select-menu';
    selectMenu.id = 'service-select-menu';
    selectMenu.setAttribute('role', 'listbox');
    selectMenu.setAttribute('aria-labelledby', 'service-label');
    selectMenu.hidden = true;
    selectTrigger.setAttribute('aria-controls', selectMenu.id);

    var nativeRequired = serviceSelect.required;
    serviceSelect.required = false;
    serviceSelect.hidden = true;
    serviceSelect.parentNode.insertBefore(selectWrapper, serviceSelect);
    selectWrapper.appendChild(serviceSelect);
    selectWrapper.appendChild(selectTrigger);
    selectWrapper.appendChild(selectMenu);

    var optionButtons = [];
    Array.prototype.forEach.call(serviceSelect.options, function (option, index) {
      var optionButton = document.createElement('button');
      optionButton.className = 'service-select-option';
      optionButton.type = 'button';
      optionButton.id = 'service-option-' + index;
      optionButton.value = option.value;
      optionButton.textContent = option.textContent;
      optionButton.setAttribute('role', 'option');
      optionButton.setAttribute('aria-selected', option.selected ? 'true' : 'false');
      optionButton.tabIndex = -1;
      selectMenu.appendChild(optionButton);
      optionButtons.push(optionButton);
    });

    var syncServiceSelect = function () {
      var selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
      selectValue.textContent = selectedOption ? selectedOption.textContent : '';
      selectTrigger.classList.toggle('is-placeholder', !serviceSelect.value);
      selectTrigger.removeAttribute('aria-invalid');
      optionButtons.forEach(function (optionButton) {
        optionButton.setAttribute('aria-selected', optionButton.value === serviceSelect.value ? 'true' : 'false');
      });
    };

    var closeServiceSelect = function (returnFocus) {
      selectWrapper.classList.remove('is-open', 'open-up');
      selectMenu.hidden = true;
      selectTrigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) selectTrigger.focus();
    };

    var openServiceSelect = function () {
      selectMenu.hidden = false;
      selectWrapper.classList.add('is-open');
      selectTrigger.setAttribute('aria-expanded', 'true');

      var menuRect = selectMenu.getBoundingClientRect();
      var triggerRect = selectTrigger.getBoundingClientRect();
      var spaceBelow = window.innerHeight - triggerRect.bottom;
      if (spaceBelow < menuRect.height + 12 && triggerRect.top > spaceBelow) {
        selectWrapper.classList.add('open-up');
      }

      var selectedButton = optionButtons.filter(function (optionButton) {
        return optionButton.getAttribute('aria-selected') === 'true';
      })[0];
      (selectedButton || optionButtons[0]).focus();
    };

    var chooseService = function (optionButton) {
      serviceSelect.value = optionButton.value;
      serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
      syncServiceSelect();
      closeServiceSelect(true);
    };

    selectTrigger.addEventListener('click', function () {
      if (selectMenu.hidden) openServiceSelect();
      else closeServiceSelect(false);
    });

    selectTrigger.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (selectMenu.hidden) openServiceSelect();
      }
    });

    optionButtons.forEach(function (optionButton, index) {
      optionButton.addEventListener('click', function () { chooseService(optionButton); });
      optionButton.addEventListener('keydown', function (event) {
        var nextIndex;
        if (event.key === 'ArrowDown') nextIndex = (index + 1) % optionButtons.length;
        else if (event.key === 'ArrowUp') nextIndex = (index - 1 + optionButtons.length) % optionButtons.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = optionButtons.length - 1;
        else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          chooseService(optionButton);
          return;
        } else if (event.key === 'Escape') {
          event.preventDefault();
          closeServiceSelect(true);
          return;
        } else if (event.key === 'Tab') {
          closeServiceSelect(false);
          return;
        } else {
          return;
        }
        event.preventDefault();
        optionButtons[nextIndex].focus();
      });
    });

    document.addEventListener('pointerdown', function (event) {
      if (!selectMenu.hidden && !selectWrapper.contains(event.target)) closeServiceSelect(false);
    });

    window.addEventListener('resize', function () {
      if (!selectMenu.hidden) closeServiceSelect(false);
    });

    var enquiryForm = serviceSelect.form;
    if (enquiryForm && nativeRequired) {
      enquiryForm.addEventListener('submit', function (event) {
        if (serviceSelect.value) return;
        event.preventDefault();
        selectTrigger.setAttribute('aria-invalid', 'true');
        openServiceSelect();
      });
    }

    serviceSelect.addEventListener('change', syncServiceSelect);
    syncServiceSelect();
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
