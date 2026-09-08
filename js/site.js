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
  var serviceSelectTrigger = null;
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
    selectTrigger.setAttribute('aria-describedby', 'service-error');
    serviceSelectTrigger = selectTrigger;

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
      selectTrigger.title = selectedOption ? selectedOption.textContent : '';
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
      selectMenu.style.maxHeight = '';
      selectMenu.hidden = false;
      selectWrapper.classList.add('is-open');
      selectTrigger.setAttribute('aria-expanded', 'true');

      var menuRect = selectMenu.getBoundingClientRect();
      var triggerRect = selectTrigger.getBoundingClientRect();
      var spaceBelow = window.innerHeight - triggerRect.bottom;
      var spaceAbove = triggerRect.top;
      var openUp = spaceBelow < menuRect.height + 12 && spaceAbove > spaceBelow;
      selectWrapper.classList.toggle('open-up', openUp);
      var availableSpace = openUp ? spaceAbove : spaceBelow;
      selectMenu.style.maxHeight = Math.max(96, availableSpace - 12) + 'px';

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

    serviceSelect.addEventListener('change', syncServiceSelect);
    syncServiceSelect();
  }

  // Use calm, contextual validation instead of browser-native popovers.
  // Native required fields remain the no-JavaScript fallback because novalidate is applied at runtime.
  var enquiryForm = document.querySelector('form[name="project-enquiry"]');
  if (enquiryForm) {
    var formErrorSummary = document.getElementById('form-error-summary');
    var formErrorCount = formErrorSummary ? formErrorSummary.querySelector('[data-error-count]') : null;
    var validationAttempted = false;
    var validationItems = [
      {
        control: document.getElementById('name'),
        errorId: 'name-error',
        requiredMessage: 'Enter your name.'
      },
      {
        control: document.getElementById('email'),
        errorId: 'email-error',
        requiredMessage: 'Enter your work email.',
        invalidMessage: 'Enter a valid email address.'
      },
      {
        control: serviceSelect,
        errorId: 'service-error',
        requiredMessage: 'Choose the service you need.'
      },
      {
        control: document.getElementById('brief'),
        errorId: 'brief-error',
        requiredMessage: 'Tell us briefly what you are trying to achieve.'
      }
    ].filter(function (item) { return item.control; });

    enquiryForm.noValidate = true;

    var validationTarget = function (item) {
      if (item.control === serviceSelect && serviceSelectTrigger) return serviceSelectTrigger;
      return item.control;
    };

    var validationMessage = function (item) {
      if (!String(item.control.value || '').trim()) return item.requiredMessage;
      if (item.invalidMessage && item.control.validity && item.control.validity.typeMismatch) {
        return item.invalidMessage;
      }
      return '';
    };

    var renderFieldValidation = function (item) {
      var message = validationMessage(item);
      var error = document.getElementById(item.errorId);
      var field = item.control.closest('.field');
      var target = validationTarget(item);

      if (error) error.textContent = message;
      if (field) field.classList.toggle('has-error', Boolean(message));
      if (message) target.setAttribute('aria-invalid', 'true');
      else target.removeAttribute('aria-invalid');
      return message;
    };

    var updateErrorSummary = function (count) {
      if (!formErrorSummary) return;
      formErrorSummary.hidden = count === 0;
      if (!formErrorCount || count === 0) return;
      formErrorCount.textContent = count === 1
        ? '1 field needs your attention.'
        : count + ' fields need your attention.';
    };

    var validateEnquiryForm = function () {
      var firstInvalid = null;
      var errorCount = 0;
      validationItems.forEach(function (item) {
        if (!renderFieldValidation(item)) return;
        errorCount += 1;
        if (!firstInvalid) firstInvalid = item;
      });
      updateErrorSummary(errorCount);
      return firstInvalid;
    };

    // Capture invalid attempts before the analytics submit listener records a confirmed journey.
    enquiryForm.addEventListener('submit', function (event) {
      validationAttempted = true;
      var firstInvalid = validateEnquiryForm();
      if (!firstInvalid) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      validationTarget(firstInvalid).focus();
    }, true);

    var refreshChangedField = function (event) {
      if (!validationAttempted) return;
      var item = validationItems.filter(function (candidate) {
        return candidate.control === event.target;
      })[0];
      if (!item) return;
      renderFieldValidation(item);
      var remainingErrors = validationItems.filter(function (candidate) {
        return Boolean(validationMessage(candidate));
      }).length;
      updateErrorSummary(remainingErrors);
    };

    enquiryForm.addEventListener('input', refreshChangedField);
    enquiryForm.addEventListener('change', refreshChangedField);
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
