/*
 * TORAN DIGITAL — Shared interaction layer
 *
 * Provides accessible navigation, motion-safe reveals, portfolio filtering,
 * FAQ disclosure behavior, a reliable contact-form client, and the estimator.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header
  if (header) {
    const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', setHeaderState, { passive: true });
    setHeaderState();
  }

  // Desktop mega menu
  const navDropdown = document.querySelector('.nav-dropdown');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  const megaItems = [...document.querySelectorAll('.mega-item')];
  const subPanels = [...document.querySelectorAll('.mega-sub-panel')];
  let dropdownTimeout;

  if (navDropdown && dropdownTrigger) {
    dropdownTrigger.setAttribute('aria-haspopup', 'true');
    dropdownTrigger.setAttribute('aria-expanded', 'false');

    const showDropdown = () => {
      window.clearTimeout(dropdownTimeout);
      navDropdown.classList.add('open');
      dropdownTrigger.setAttribute('aria-expanded', 'true');
    };

    const hideDropdown = (returnFocus = false) => {
      window.clearTimeout(dropdownTimeout);
      dropdownTimeout = window.setTimeout(() => {
        navDropdown.classList.remove('open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) dropdownTrigger.focus();
      }, 150);
    };

    navDropdown.addEventListener('mouseenter', showDropdown);
    navDropdown.addEventListener('mouseleave', () => hideDropdown());
    dropdownTrigger.addEventListener('click', () => {
      if (navDropdown.classList.contains('open')) hideDropdown();
      else showDropdown();
    });

    megaItems.forEach((item) => {
      const targetPanel = document.getElementById(item.getAttribute('data-target'));
      if (!targetPanel) return;
      const activateTab = () => {
        megaItems.forEach((megaItem) => megaItem.classList.remove('active'));
        subPanels.forEach((panel) => panel.classList.remove('active'));
        item.classList.add('active');
        targetPanel.classList.add('active');
      };
      item.addEventListener('mouseenter', activateTab);
      item.addEventListener('focus', activateTab);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navDropdown.classList.contains('open')) {
        hideDropdown(true);
      }
    });
  }

  // Mobile navigation
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
  const mobileServicesList = document.querySelector('.mobile-services-list');

  if (hamburger && mobileNav) {
    let lastFocusedElement = null;
    hamburger.setAttribute('aria-controls', mobileNav.id || 'mobileNav');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');

    const setMenuState = (open) => {
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      mobileNav.classList.toggle('open', open);
      mobileNav.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        lastFocusedElement = document.activeElement;
        const firstFocusable = mobileNav.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
        window.setTimeout(() => firstFocusable?.focus(), 50);
      } else if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    hamburger.addEventListener('click', () => setMenuState(!mobileNav.classList.contains('open')));

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    if (mobileServicesToggle && mobileServicesList) {
      const servicesId = mobileServicesList.id || 'mobile-services-list';
      mobileServicesList.id = servicesId;
      mobileServicesToggle.setAttribute('aria-controls', servicesId);
      mobileServicesToggle.setAttribute('aria-expanded', String(mobileServicesList.classList.contains('open')));
      mobileServicesToggle.addEventListener('click', () => {
        const open = !mobileServicesList.classList.contains('open');
        mobileServicesToggle.classList.toggle('open', open);
        mobileServicesList.classList.toggle('open', open);
        mobileServicesToggle.setAttribute('aria-expanded', String(open));
      });
    }

    document.addEventListener('keydown', (event) => {
      if (!mobileNav.classList.contains('open')) return;
      if (event.key === 'Escape') {
        setMenuState(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...mobileNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  // Reveal animations
  const revealElements = [...document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
  } else if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('hero-stats') || entry.target.querySelector('.hero-stat-value')) {
          startCounters();
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  // Animated statistics
  let countersAnimated = false;
  function startCounters() {
    if (countersAnimated || reduceMotion) return;
    countersAnimated = true;
    document.querySelectorAll('.hero-stat-value[data-count]').forEach((element) => {
      const target = Number.parseInt(element.getAttribute('data-count'), 10);
      if (Number.isNaN(target)) return;
      const suffix = element.querySelector('span')?.outerHTML || '';
      let startTime = null;
      const update = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / 1600, 1);
        element.innerHTML = `${Math.floor((progress * (2 - progress)) * target)}${suffix}`;
        if (progress < 1) window.requestAnimationFrame(update);
        else element.innerHTML = `${target}${suffix}`;
      };
      window.requestAnimationFrame(update);
    });
  }

  window.setTimeout(() => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats && heroStats.getBoundingClientRect().top < window.innerHeight) startCounters();
  }, 150);

  // Portfolio filters
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const portfolioItems = [...document.querySelectorAll('.portfolio-item')];
  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.classList.contains('active')));
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter');
        filterButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        portfolioItems.forEach((item) => {
          const visible = category === 'all' || item.getAttribute('data-category') === category;
          item.hidden = !visible;
          item.style.display = visible ? 'block' : 'none';
        });
      });
    });
  }

  // FAQ disclosures
  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    const answerId = answer.id || `faq-answer-${index + 1}`;
    answer.id = answerId;
    question.setAttribute('aria-controls', answerId);
    const setFaqState = (open) => {
      item.classList.toggle('active', open);
      question.setAttribute('aria-expanded', String(open));
      answer.hidden = !open;
    };
    setFaqState(item.classList.contains('active'));
    question.addEventListener('click', () => {
      const willOpen = !item.classList.contains('active');
      faqItems.forEach((otherItem) => {
        const otherQuestion = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherQuestion && otherAnswer) {
          otherItem.classList.remove('active');
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.hidden = true;
        }
      });
      setFaqState(willOpen);
    });
  });

  // Smooth internal navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const selector = anchor.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      const headerHeight = header?.offsetHeight || 80;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: offset, behavior: reduceMotion ? 'auto' : 'smooth' });
        if (target instanceof HTMLElement) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }, reduceMotion ? 0 : 200);
    });
  });

  // Lead forms: server-side delivery, honeypot spam protection, clear messages.
  const showFormMessage = (form, type, message) => {
    form.parentElement?.querySelector('.form-status')?.remove();
    const status = document.createElement('div');
    status.className = `form-status form-status--${type}`;
    status.setAttribute('role', type === 'error' ? 'alert' : 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = message;
    form.insertAdjacentElement('afterend', status);
  };

  document.querySelectorAll('form[data-lead-form]').forEach((form) => {
    if (!form.querySelector('[name="website"]')) {
      const honeypot = document.createElement('div');
      honeypot.className = 'form-honeypot';
      honeypot.setAttribute('aria-hidden', 'true');
      honeypot.innerHTML = '<label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
      form.appendChild(honeypot);
    }

    form.querySelectorAll('input, select, textarea').forEach((field) => {
      if (!field.getAttribute('aria-label') && !field.id) {
        field.setAttribute('aria-label', field.getAttribute('placeholder') || field.getAttribute('name') || 'Form field');
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const sourceInput = form.querySelector('[name="source_url"]') || document.createElement('input');
      if (!sourceInput.name) {
        sourceInput.type = 'hidden';
        sourceInput.name = 'source_url';
        form.appendChild(sourceInput);
      }
      sourceInput.value = window.location.href;

      const submitButton = form.querySelector('[type="submit"]');
      const originalLabel = submitButton?.textContent || '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        submitButton.textContent = 'Sending your enquiry…';
      }

      try {
        const response = await fetch(form.action || '/contact.php', {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
          credentials: 'same-origin',
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.ok) {
          throw new Error(payload.message || 'We could not send your enquiry. Please try again or contact us on WhatsApp.');
        }
        form.reset();
        showFormMessage(form, 'success', payload.message || 'Thank you. Your enquiry has been sent successfully.');
      } catch (error) {
        showFormMessage(form, 'error', error instanceof Error ? error.message : 'We could not send your enquiry. Please contact us on WhatsApp or call us directly.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
          submitButton.textContent = originalLabel;
        }
      }
    });
  });

  // Interactive quote estimator
  const calcCard = document.querySelector('.quote-calculator-card');
  if (calcCard) {
    const categoryButtons = calcCard.querySelectorAll('.service-category-grid .calc-option-btn');
    const scopeSelect = document.getElementById('calc-scope-select');
    const addonsContainer = document.getElementById('calc-addons-container');
    const totalPrice = document.getElementById('calc-total-price');
    const whatsappButton = document.getElementById('calc-whatsapp-btn');
    if (!scopeSelect || !addonsContainer || !totalPrice || !whatsappButton) return;

    const optionsData = {
      web: {
        scopes: [
          { name: 'Starter Business Website (5 Pages)', baseMin: 3500, baseMax: 5000 },
          { name: 'Corporate Business Site (10+ Pages)', baseMin: 7500, baseMax: 12000 },
          { name: 'E-Commerce Online Store (WooCommerce/Shopify)', baseMin: 12500, baseMax: 22000 },
          { name: 'Custom Web Application / Portal', baseMin: 25000, baseMax: 45000 },
        ],
        addons: [
          { name: 'Local SEO Package', price: 2500 },
          { name: 'Professional Content Writing', price: 1500 },
          { name: 'Speed & Security Hardening', price: 1200 },
        ],
      },
      vehicle: {
        scopes: [
          { name: 'Bakkie / Van Door Branding Decals', baseMin: 1800, baseMax: 2800 },
          { name: 'Partial Vehicle Wrap', baseMin: 4500, baseMax: 7000 },
          { name: 'Full Vehicle Cast Vinyl Wrap', baseMin: 9500, baseMax: 14500 },
          { name: 'Commercial Fleet Branding', baseMin: 18000, baseMax: 35000 },
        ],
        addons: [
          { name: 'Custom 3D Wrap Graphic Design', price: 1500 },
          { name: 'Heavy-Duty UV Protective Laminate', price: 1200 },
        ],
      },
      field: {
        scopes: [
          { name: 'Standard DSTV Decoder Installation', baseMin: 850, baseMax: 1200 },
          { name: 'DSTV Explora + Smart LNB Installation', baseMin: 1850, baseMax: 2500 },
          { name: 'Concealed TV Wall Mounting', baseMin: 1200, baseMax: 1800 },
          { name: '4-Camera HD CCTV Security Setup', baseMin: 5500, baseMax: 8500 },
        ],
        addons: [
          { name: 'Extra View Setup / Linking', price: 650 },
          { name: 'Mobile App Sync & Remote Viewing', price: 850 },
        ],
      },
    };

    let currentCategory = 'web';
    const calculateTotal = () => {
      const category = optionsData[currentCategory];
      const scope = category.scopes[Number.parseInt(scopeSelect.value, 10) || 0];
      const selectedAddons = [...addonsContainer.querySelectorAll('.calc-addon-checkbox:checked')];
      const addonTotal = selectedAddons.reduce((sum, checkbox) => sum + Number.parseInt(checkbox.value, 10), 0);
      const totalMin = scope.baseMin + addonTotal;
      const totalMax = scope.baseMax + addonTotal;
      totalPrice.textContent = `R${totalMin.toLocaleString()} – R${totalMax.toLocaleString()}`;
      const addonNames = selectedAddons.map((checkbox) => checkbox.dataset.name).join(', ') || 'None';
      const message = `Hi Toran Digital,\n\nI used your Instant Cost Estimator:\n• Category: ${currentCategory.toUpperCase()}\n• Package: ${scope.name}\n• Add-ons: ${addonNames}\n• Estimated total: R${totalMin.toLocaleString()} – R${totalMax.toLocaleString()}\n\nCan we discuss getting this started?`;
      whatsappButton.href = `https://wa.me/27696219479?text=${encodeURIComponent(message)}`;
    };

    const updateCalculator = () => {
      const category = optionsData[currentCategory];
      scopeSelect.innerHTML = category.scopes.map((scope, index) => `<option value="${index}">${scope.name}</option>`).join('');
      addonsContainer.innerHTML = category.addons.map((addon, index) => `
        <label class="calc-addon-label">
          <input type="checkbox" value="${addon.price}" data-name="${addon.name}" class="calc-addon-checkbox" id="calc-addon-${index}">
          <span>${addon.name} (+R${addon.price.toLocaleString()})</span>
        </label>
      `).join('');
      calculateTotal();
    };

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        categoryButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        currentCategory = button.getAttribute('data-category') || 'web';
        updateCalculator();
      });
    });
    scopeSelect.addEventListener('change', calculateTotal);
    addonsContainer.addEventListener('change', calculateTotal);
    updateCalculator();
  }
});
