/**
 * TORAN DIGITAL — Premium Interactivity Script
 * Handles:
 * - Sticky Header
 * - Mobile Navigation Menu & Accordion
 * - Desktop Mega-Dropdown (Hover & Click & Focus states)
 * - Intersection Observer Scroll Animations
 * - Animated Stats Counter
 * - Portfolio Filter
 * - FAQ Accordion
 * - Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Sticky Header
  // ==========================================
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Trigger scroll on load to set initial state
  window.dispatchEvent(new Event('scroll'));

  // ==========================================
  // 2. Desktop Mega Dropdown Logic
  // ==========================================
  const navDropdown = document.querySelector('.nav-dropdown');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  const megaItems = document.querySelectorAll('.mega-item');
  const subPanels = document.querySelectorAll('.mega-sub-panel');
  let dropdownTimeout;

  if (navDropdown && dropdownTrigger) {
    // Show dropdown function
    const showDropdown = () => {
      clearTimeout(dropdownTimeout);
      navDropdown.classList.add('open');
      dropdownTrigger.setAttribute('aria-expanded', 'true');
    };

    // Hide dropdown function
    const hideDropdown = () => {
      dropdownTimeout = setTimeout(() => {
        navDropdown.classList.remove('open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }, 200); // Small delay to avoid accidental flickering
    };

    // Mouse events for hover
    navDropdown.addEventListener('mouseenter', showDropdown);
    navDropdown.addEventListener('mouseleave', hideDropdown);

    // Keyboard navigation / Click toggle
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = navDropdown.classList.contains('open');
      if (isOpen) {
        hideDropdown();
      } else {
        showDropdown();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navDropdown.classList.remove('open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Mega dropdown tab switcher logic
    megaItems.forEach(item => {
      const targetPanelId = item.getAttribute('data-target');
      const targetPanel = document.getElementById(targetPanelId);

      const activateTab = () => {
        // Deactivate all items and panels
        megaItems.forEach(mi => mi.classList.remove('active'));
        subPanels.forEach(sp => sp.classList.remove('active'));

        // Activate matching item and panel
        item.classList.add('active');
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      };

      // Hover to switch
      item.addEventListener('mouseenter', activateTab);

      // Focus to switch (for keyboard navigation)
      item.addEventListener('focus', activateTab);
    });
  }

  // ==========================================
  // 3. Mobile Navigation & Accordion
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
  const mobileServicesList = document.querySelector('.mobile-services-list');

  if (hamburger && mobileNav) {
    const toggleMobileMenu = () => {
      const isOpen = mobileNav.classList.contains('open');
      hamburger.classList.toggle('active', !isOpen);
      mobileNav.classList.toggle('open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking links (except dropdown trigger)
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link:not(.mobile-services-toggle)');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile services accordion
    if (mobileServicesToggle && mobileServicesList) {
      mobileServicesToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = mobileServicesList.classList.contains('open');
        mobileServicesToggle.classList.toggle('open', !isOpen);
        mobileServicesList.classList.toggle('open', !isOpen);
      });
    }
  }

  // ==========================================
  // 4. Scroll Animations (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const revealOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('visible');
        
        // If the container with stats enters viewport, run the stats counter
        if (entry.target.classList.contains('hero-stats') || entry.target.querySelector('.hero-stat-value')) {
          startCounters();
        }
        
        observer.unobserve(entry.target);
      });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================
  // 5. Stats Counter Animation
  // ==========================================
  let countersAnimated = false;

  function startCounters() {
    if (countersAnimated) return;
    countersAnimated = true; // Lock immediately to prevent concurrent loops
    
    const countElements = document.querySelectorAll('.hero-stat-value[data-count]');
    if (!countElements.length) return;

    countElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      // Extract suffix HTML (e.g. <span class="accent">+</span> or %)
      const suffixEl = el.querySelector('span');
      const suffixHTML = suffixEl ? suffixEl.outerHTML : '';
      
      const duration = 1600; // ms
      let startTime = null;

      function update(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic function
        const easeOut = progress * (2 - progress);
        const currentCount = Math.floor(easeOut * target);

        el.innerHTML = currentCount + suffixHTML;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.innerHTML = target + suffixHTML;
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Check on load if stats are already in viewport
  setTimeout(() => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const rect = heroStats.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        startCounters();
      }
    }
  }, 150);

  // ==========================================
  // 6. Portfolio Filter logic
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            // Trigger a tiny reflow for opacity transition
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 30);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ==========================================
  // 7. FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close other open ones
          faqItems.forEach(fi => fi.classList.remove('active'));
          
          // Toggle current
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // ==========================================
  // 8. Smooth Scroll for internal anchors
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight || 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 9. Contact & Quote Form Lead Handler
  // ==========================================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = form.querySelector('[name="name"]') || form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('[name="email"]') || form.querySelector('input[type="email"]');
      const serviceInput = form.querySelector('[name="service"]') || form.querySelector('select');
      const messageInput = form.querySelector('[name="message"]') || form.querySelector('textarea');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value.trim() : 'General Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email) {
        alert('Please fill in your name and email address.');
        return;
      }

      // Build WhatsApp pre-filled link
      const waText = encodeURIComponent(`Hi Toran Digital,\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`);
      const waUrl = `https://wa.me/27696219479?text=${waText}`;

      // Create inline success notice
      const successBox = document.createElement('div');
      successBox.className = 'form-success-message';
      successBox.style.cssText = 'padding: 1.5rem; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; margin-top: 1rem; color: #15803d; font-family: var(--font-body);';
      successBox.innerHTML = `
        <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: #166534;">Thank you, ${name}!</h4>
        <p style="margin: 0 0 1rem 0; font-size: 0.95rem; color: #15803d;">Your enquiry has been received. Click below to instantly send your details directly via WhatsApp for a faster quote response:</p>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.25rem; font-weight: 700;">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Send via WhatsApp Instant
        </a>
      `;

      form.reset();
      const existingNotice = form.parentNode.querySelector('.form-success-message');
      if (existingNotice) existingNotice.remove();
      form.parentNode.appendChild(successBox);
    });
  });

  // ==========================================
  // 10. Interactive Quote Estimator
  // ==========================================
  const calcCard = document.querySelector('.quote-calculator-card');
  if (calcCard) {
    const categoryBtns = calcCard.querySelectorAll('.service-category-grid .calc-option-btn');
    const scopeSelect = document.getElementById('calc-scope-select');
    const addonsContainer = document.getElementById('calc-addons-container');
    const totalPriceEl = document.getElementById('calc-total-price');
    const whatsappBtn = document.getElementById('calc-whatsapp-btn');

    const optionsData = {
      web: {
        scopes: [
          { name: 'Starter Business Website (5 Pages)', baseMin: 3500, baseMax: 5000 },
          { name: 'Corporate Business Site (10+ Pages)', baseMin: 7500, baseMax: 12000 },
          { name: 'E-Commerce Online Store (WooCommerce/Shopify)', baseMin: 12500, baseMax: 22000 },
          { name: 'Custom React Web Application / Portal', baseMin: 25000, baseMax: 45000 }
        ],
        addons: [
          { id: 'seo', name: 'Local SEO Package', price: 2500 },
          { id: 'copy', name: 'Professional Content Writing', price: 1500 },
          { id: 'speed', name: 'Speed & Security Hardening', price: 1200 }
        ]
      },
      vehicle: {
        scopes: [
          { name: 'Bakkie / Van Door Branding Decals', baseMin: 1800, baseMax: 2800 },
          { name: 'Partial Vehicle Wrap (Half Wrap)', baseMin: 4500, baseMax: 7000 },
          { name: 'Full Vehicle Cast Vinyl Wrap', baseMin: 9500, baseMax: 14500 },
          { name: 'Commercial Fleet Branding (Multiple Vehicles)', baseMin: 18000, baseMax: 35000 }
        ],
        addons: [
          { id: 'design', name: 'Custom 3D Wrap Graphic Design', price: 1500 },
          { id: 'uv', name: 'Heavy-Duty UV Protective Laminate', price: 1200 }
        ]
      },
      field: {
        scopes: [
          { name: 'Standard DSTV Decoder Installation', baseMin: 850, baseMax: 1200 },
          { name: 'DSTV Explora + Smart LNB Installation', baseMin: 1850, baseMax: 2500 },
          { name: 'Concealed TV Wall Mounting (with Bracket)', baseMin: 1200, baseMax: 1800 },
          { name: '4-Camera HD CCTV Security Setup', baseMin: 5500, baseMax: 8500 }
        ],
        addons: [
          { id: 'extraview', name: 'Extra View Setup / Linking', price: 650 },
          { id: 'appsync', name: 'Mobile App Sync & Remote Viewing', price: 850 }
        ]
      }
    };

    let currentCategory = 'web';

    const updateCalculator = () => {
      const catData = optionsData[currentCategory];
      
      // Update Scope Options
      scopeSelect.innerHTML = catData.scopes.map((s, idx) => `<option value="${idx}">${s.name}</option>`).join('');
      
      // Update Addons
      addonsContainer.innerHTML = catData.addons.map(a => `
        <label style="display: flex; align-items: center; gap: 0.75rem; background: #27272a; padding: 0.85rem 1rem; border-radius: 8px; cursor: pointer; border: 1px solid #3f3f46; color: var(--white); font-size: 0.95rem;">
          <input type="checkbox" value="${a.price}" data-name="${a.name}" class="calc-addon-checkbox" style="accent-color: var(--accent-500); width: 18px; height: 18px; cursor: pointer;">
          <span>${a.name} (+R${a.price.toLocaleString()})</span>
        </label>
      `).join('');

      calculateTotal();
    };

    const calculateTotal = () => {
      const catData = optionsData[currentCategory];
      const selectedScopeIndex = parseInt(scopeSelect.value) || 0;
      const scopeObj = catData.scopes[selectedScopeIndex] || catData.scopes[0];

      let addonTotal = 0;
      const selectedAddons = [];
      const checkedBoxes = addonsContainer.querySelectorAll('.calc-addon-checkbox:checked');
      checkedBoxes.forEach(cb => {
        addonTotal += parseInt(cb.value);
        selectedAddons.push(cb.getAttribute('data-name'));
      });

      const totalMin = scopeObj.baseMin + addonTotal;
      const totalMax = scopeObj.baseMax + addonTotal;

      totalPriceEl.textContent = `R${totalMin.toLocaleString()} – R${totalMax.toLocaleString()}`;

      // Build WhatsApp message
      const msgText = `Hi Toran Digital,\n\nI used your Instant Cost Estimator:\n• Category: ${currentCategory.toUpperCase()}\n• Package: ${scopeObj.name}\n• Add-ons: ${selectedAddons.length ? selectedAddons.join(', ') : 'None'}\n• Estimated Total: R${totalMin.toLocaleString()} – R${totalMax.toLocaleString()}\n\nCan we discuss getting this started?`;
      whatsappBtn.href = `https://wa.me/27696219479?text=${encodeURIComponent(msgText)}`;
    };

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => {
          b.classList.remove('active');
          b.style.border = '2px solid #27272a';
          b.style.background = '#27272a';
          const iconEl = b.querySelector('.calc-icon');
          if (iconEl) iconEl.style.color = '#a1a1aa';
        });
        btn.classList.add('active');
        btn.style.border = '2px solid var(--accent-500)';
        btn.style.background = 'rgba(249,115,22,0.1)';
        const activeIconEl = btn.querySelector('.calc-icon');
        if (activeIconEl) activeIconEl.style.color = 'var(--accent-400)';

        currentCategory = btn.getAttribute('data-category');
        updateCalculator();
      });
    });

    scopeSelect.addEventListener('change', calculateTotal);
    addonsContainer.addEventListener('change', calculateTotal);

    updateCalculator();
  }
});
