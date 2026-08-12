const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'services', 'index.html');
let html = fs.readFileSync(filePath, 'utf-8');

// 1. Fix Head tags
html = html.replace(/<title>.*?<\/title>/, '<title>Digital Services Johannesburg | Web Design, SEO, Apps & Branding | Toran Digital</title>');
html = html.replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Professional web design, mobile apps, SEO, vehicle branding & DSTV installations in Johannesburg. Get a free quote from Toran Digital — Gauteng\'s trusted digital agency.">');
html = html.replace(/<meta name="keywords" content=".*?">/, '<meta name="keywords" content="digital agency services Johannesburg, web development Gauteng, mobile apps South Africa, vehicle wrapping, DSTV installation">');
html = html.replace(/<link rel="icon" type="image\/png" href="logo\/Gemini_Generated_Image_.png">/, '<link rel="icon" type="image/png" href="../logo/Gemini_Generated_Image_.png">');

// Reorder tags and add preload/schema
const headEndMatch = html.match(/<\/head>/);
if (headEndMatch) {
  // We'll just insert schema before </head>
  const schema = `
  <link rel="preload" as="style" href="../index.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Toran Digital Services",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Website Design & Development",
          "url": "https://torandigital.co.za/web-design/"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Mobile App Development",
          "url": "https://torandigital.co.za/mobile-apps/"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "SEO & Google Ads",
          "url": "https://torandigital.co.za/seo-marketing/"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Vehicle Branding",
          "url": "https://torandigital.co.za/vehicle-branding/"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "DSTV Installations",
          "url": "https://torandigital.co.za/dstv-installations/"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Graphic Design",
          "url": "https://torandigital.co.za/graphic-design/"
        }
      }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://torandigital.co.za/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://torandigital.co.za/services/"
      }
    ]
  }
  </script>
`;
  html = html.replace('</head>', schema + '\n</head>');
}

// Extract header/footer
const mainStartIdx = html.indexOf('<main id="main-content">');
const mainEndIdx = html.indexOf('</main>') + 7;

const headerPart = html.substring(0, mainStartIdx);
const footerPart = html.substring(mainEndIdx);

// Build new <main>
// We need to incorporate Images via placehold.co or unsplash source, and inline SVG icons
const newMain = `
  <main id="main-content">
    
    <!-- BREADCRUMBS -->
    <div class="container" style="padding-top: 100px;">
      <nav aria-label="breadcrumb" style="padding: 1rem 0; font-size: 0.9rem; color: var(--text-muted);">
        <ol style="list-style: none; padding: 0; margin: 0; display: flex; gap: 0.5rem;">
          <li><a href="../" style="color: var(--teal-600); text-decoration: none;">Home</a></li>
          <li>/</li>
          <li aria-current="page">Services</li>
        </ol>
      </nav>
    </div>

    <!-- ==================== HERO SECTION ==================== -->
    <section class="services-hero" style="padding: 40px 0 80px;">
      <div class="container">
        <div class="services-intro">
          <p class="section-label reveal" style="justify-content: center;">What We Do</p>
          <h1 class="section-title reveal reveal-delay-1">Digital Marketing & <br><span class="gradient-text">Web Design Services</span> in Johannesburg</h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin: 0 auto 2rem;">
            We build high-grade digital products, design professional marketing collateral, and carry out accredited field installations. Trusted by 50+ Gauteng businesses.
          </p>
          <div class="hero-ctas reveal reveal-delay-2" style="display: flex; gap: 1rem; justify-content: center;">
            <a href="#services-grid" class="btn btn-primary">Explore Services</a>
            <a href="../contact/" class="btn btn-outline">Request a Quote</a>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST STRIP -->
    <div class="trust-strip" style="border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); padding: 2rem 0; background: var(--white); text-align: center;">
      <div class="container">
        <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-light); margin-bottom: 1rem;">Trusted by leading brands across South Africa</p>
        <div style="display: flex; gap: 3rem; justify-content: center; align-items: center; opacity: 0.5; flex-wrap: wrap;">
           <!-- Placeholders for client logos -->
           <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor"><rect width="100%" height="100%" fill="#E2E8F0"/></svg>
           <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor"><rect width="100%" height="100%" fill="#E2E8F0"/></svg>
           <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor"><rect width="100%" height="100%" fill="#E2E8F0"/></svg>
           <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor"><rect width="100%" height="100%" fill="#E2E8F0"/></svg>
        </div>
      </div>
    </div>

    <!-- ==================== SERVICES LIST ==================== -->
    <section class="section" id="services-grid">
      <div class="container">
        <div class="services-list-grid" style="gap: 6rem;">

          <!-- 1. Website Design -->
          <div class="service-row reveal" id="web-design">
            <div class="service-row-info">
              <h2>Website Design & Development</h2>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--teal-600); margin-bottom: 0.5rem;">Starting from R4,500</p>
              <p>Your website is your 24/7 digital storefront. We build stunning, modern sites engineered to convert traffic into qualified leads. From corporate WordPress templates to complex transactional e-commerce portals, our code is optimized for lightning-fast load speeds, mobile responsiveness, and SEO crawlers. We focus on frictionless user journeys that establish immediate brand authority.</p>
              <a href="../web-design/" class="btn btn-outline" style="margin-bottom: 2rem;">
                View Web Pricing
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="service-row-cards">
                <a href="../web-design/ecommerce/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div>
                  <h4>Ecommerce Stores</h4>
                  <p>Fully integrated shopping carts, payment gateways, and inventory systems.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../web-design/custom-web-apps/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>
                  <h4>Custom Web Apps</h4>
                  <p>Tailor-made software platforms designed for high user volumes and specific workflows.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../web-design/wordpress/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
                  <h4>WordPress Portals</h4>
                  <p>Professional business templates offering client management dashboards and full code control.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
              </div>
            </div>
            <div class="service-image-col">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Web Design Agency Johannesburg" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" loading="lazy">
            </div>
          </div>

          <!-- 2. Mobile App Development -->
          <div class="service-row reverse reveal" id="mobile-apps">
            <div class="service-row-info">
              <h2>Mobile App Development</h2>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--teal-600); margin-bottom: 0.5rem;">Custom Quotes Available</p>
              <p>Keep your business directly in your clients' pockets with custom-engineered mobile applications. We build high-performance Native (Swift/Kotlin) and Cross-Platform (React Native/Flutter) apps specifically optimized for South African cellular networks and device specs. From UX prototyping to Apple App Store deployment, we handle the entire product lifecycle.</p>
              <a href="../mobile-apps/" class="btn btn-outline" style="margin-bottom: 2rem;">
                Explore Mobile Solutions
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="service-row-cards">
                <a href="../mobile-apps/ios-development/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg></div>
                  <h4>Native iOS Apps</h4>
                  <p>Bespoke Swift development deployed natively to the Apple App Store.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../mobile-apps/android-development/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg></div>
                  <h4>Native Android Apps</h4>
                  <p>Kotlin-engineered apps built for South African Android markets.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../mobile-apps/cross-platform/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div>
                  <h4>Cross-Platform</h4>
                  <p>React Native or Flutter apps built to deploy on both OS environments from one codebase.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
              </div>
            </div>
            <div class="service-image-col">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" alt="Mobile App Development South Africa" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" loading="lazy">
            </div>
          </div>

          <!-- Mid-Page CTA -->
          <div class="mid-page-cta" style="background: var(--navy-900); border-radius: var(--radius-xl); padding: 3rem; text-align: center; color: white; margin: 2rem 0; position: relative; overflow: hidden;">
            <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(6,182,212,0.2) 0%, transparent 60%); pointer-events: none;"></div>
            <h3 style="color: white; font-size: 2rem; margin-bottom: 1rem; position: relative; z-index: 1;">Need a customized solution?</h3>
            <p style="color: var(--slate-300); max-width: 600px; margin: 0 auto 2rem; position: relative; z-index: 1;">Book a free 30-minute discovery call with our directors to discuss your project parameters and get a precise cost estimate.</p>
            <a href="../contact/" class="btn btn-primary btn-lg" style="position: relative; z-index: 1;">Schedule Discovery Call</a>
          </div>

          <!-- 3. SEO & Digital Marketing -->
          <div class="service-row reveal" id="seo-marketing">
            <div class="service-row-info">
              <h2>SEO & Google Ads</h2>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--teal-600); margin-bottom: 0.5rem;">Packages from R2,500/mo</p>
              <p>Stop losing customers to competitors who rank higher. Our data-led search marketing programs generate consistent, qualified inquiries using local SEO blueprints and high-ROI Google Ad scripts. We build structured keyword architectures designed to dominate Johannesburg and Gauteng regional search results, ensuring your business gets found exactly when customers have purchasing intent.</p>
              <a href="../seo-marketing/" class="btn btn-outline" style="margin-bottom: 2rem;">
                Boost Search Lead-Gen
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="service-row-cards">
                <a href="../seo-marketing/local-seo/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                  <h4>On-Page & Local SEO</h4>
                  <p>Structured keyword architectures built to dominate regional search results.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../seo-marketing/google-ads/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                  <h4>Google Search Ads</h4>
                  <p>Pay-per-click ads built to target purchasing intent and generate immediate ROI.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../seo-marketing/google-business-profile/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
                  <h4>Google Business Profile</h4>
                  <p>Optimization of Google Maps properties to capture local neighborhood traffic.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
              </div>
            </div>
            <div class="service-image-col">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="SEO Services Johannesburg" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" loading="lazy">
            </div>
          </div>

          <!-- 4. Vehicle Branding -->
          <div class="service-row reverse reveal" id="vehicle-wraps">
            <div class="service-row-info">
              <h2>Vehicle Branding & Wrapping</h2>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--teal-600); margin-bottom: 0.5rem;">Starting from R3,500</p>
              <p>Transform your company vehicles into mobile billboards that generate brand awareness 24/7. Our vehicle branding team handles everything from high-definition wrap vector design to applying durable 3M and Avery cast vinyl on commercial bakkies, vans, and corporate sedans. We guarantee a professional, bubble-free installation that withstands the harsh South African climate.</p>
              <a href="../vehicle-branding/" class="btn btn-outline" style="margin-bottom: 2rem;">
                Get Wrap Pricing
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="service-row-cards">
                <a href="../vehicle-branding/full-wraps/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                  <h4>Full Vehicle Wraps</h4>
                  <p>Complete transformation with durable vinyl wrappers designed for long-term outdoor use.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../vehicle-branding/fleet-wrapping/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg></div>
                  <h4>Fleet Wrapping</h4>
                  <p>Coordinated logos, safety lines, and contact numbering for corporate fleets.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../vehicle-branding/bakkie-branding/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg></div>
                  <h4>Bakkie & Van Branding</h4>
                  <p>Custom graphic configurations matching commercial cargo panels and tailgates.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
              </div>
            </div>
            <div class="service-image-col">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80" alt="Vehicle Wrapping Johannesburg" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" loading="lazy">
            </div>
          </div>

          <!-- 5. DSTV & Installations -->
          <div class="service-row reveal" id="dstv-cctv">
            <div class="service-row-info">
              <h2>DSTV & Home Installations</h2>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--teal-600); margin-bottom: 0.5rem;">Call-outs from R450</p>
              <p>Reliable, accredited local technicians equipped to configure your home entertainment setups and business security structures. We handle complex DSTV signal troubleshooting, Explora upgrades, smart cabling, and clean TV mounting integrations. Need security? We deploy high-resolution CCTV camera links with secure remote-phone monitoring access.</p>
              <a href="../dstv-installations/" class="btn btn-outline" style="margin-bottom: 2rem;">
                Book Accredited Installer
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="service-row-cards">
                <a href="../dstv-installations/dstv/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2v6h-6"></path><path d="M21 13a9 9 0 1 1-3-7.7L21 8"></path></svg></div>
                  <h4>DSTV Installations</h4>
                  <p>Signal realignment, Explora upgrades, and multi-point smart connections.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../dstv-installations/cctv/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z"></path></svg></div>
                  <h4>CCTV Security Systems</h4>
                  <p>High-resolution commercial camera links with secure remote-phone monitoring.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../dstv-installations/tv-mounting/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg></div>
                  <h4>TV Mounting & Audio</h4>
                  <p>Flush-wall configurations, soundbar bracket setups, and clean wire concealment.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
              </div>
            </div>
            <div class="service-image-col">
              <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80" alt="DSTV Installers Gauteng" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" loading="lazy">
            </div>
          </div>

          <!-- 6. Graphic Design -->
          <div class="service-row reverse reveal" id="graphic-branding">
            <div class="service-row-info">
              <h2>Graphic Design & Print</h2>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--teal-600); margin-bottom: 0.5rem;">Corporate Identity Packages</p>
              <p>Visual assets that establish immediate market credibility. Our agency studio builds professional brand identities, customizes vector layouts, and coordinates large-format signage print specifications. From premium logo engineering to complete storefront signage, we ensure your offline branding matches the quality of your digital presence.</p>
              <a href="../graphic-design/" class="btn btn-outline" style="margin-bottom: 2rem;">
                Launch Brand Design
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="service-row-cards">
                <a href="../graphic-design/corporate-identity/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
                  <h4>Corporate Identity</h4>
                  <p>Complete style guides, logos, color codes, and print-ready business stationery.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../graphic-design/logo-design/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 9h9l-7.5 5.5 3 9L12 19l-7.5 6.5 3-9L0 11h9z"></path></svg></div>
                  <h4>Logo Engineering</h4>
                  <p>Premium vector logos that translate cleanly from web displays to clothing embroidery.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
                <a href="../graphic-design/signage/" class="sub-service-card" style="text-decoration: none;">
                  <div style="color: var(--teal-500); margin-bottom: 1rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg></div>
                  <h4>Storefront Signage</h4>
                  <p>Outdoor panels, window lettering vectors, and commercial billboard designs.</p>
                  <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--teal-600);">Learn more &rarr;</span>
                </a>
              </div>
            </div>
            <div class="service-image-col">
              <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" alt="Graphic Design Agency" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" loading="lazy">
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="section" style="background: var(--bg-secondary); padding: 5rem 0;">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 3rem;">
          <h2 style="font-family: var(--font-display); font-weight: 800; font-size: 2.5rem; color: var(--navy-800);">Frequently Asked Questions</h2>
          <p style="color: var(--text-body);">Common questions about our digital and installation services across Johannesburg.</p>
        </div>
        
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
          <details style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; cursor: pointer;">
            <summary style="font-weight: 600; font-size: 1.1rem; color: var(--navy-800); outline: none; list-style: none;">What areas in Gauteng do you service?</summary>
            <p style="margin-top: 1rem; color: var(--text-body); line-height: 1.6;">Our core team is based in Benoni, but we service the entire Johannesburg and wider Gauteng region. For digital services (Web Design, SEO, Apps), we work with clients nationally and internationally. For physical installations (Vehicle Branding, DSTV, Signage), our teams cover Johannesburg, Sandton, Midrand, Pretoria, and the East Rand.</p>
          </details>
          <details style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; cursor: pointer;">
            <summary style="font-weight: 600; font-size: 1.1rem; color: var(--navy-800); outline: none; list-style: none;">How do I get a quote for my project?</summary>
            <p style="margin-top: 1rem; color: var(--text-body); line-height: 1.6;">You can request a free quote by filling out the form on our Contact page, or by clicking the WhatsApp button floating on your screen. We typically respond within 2-4 hours during business days with a preliminary estimate or a request for a quick discovery call to finalize scope.</p>
          </details>
          <details style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; cursor: pointer;">
            <summary style="font-weight: 600; font-size: 1.1rem; color: var(--navy-800); outline: none; list-style: none;">Do you offer payment plans or maintenance packages?</summary>
            <p style="margin-top: 1rem; color: var(--text-body); line-height: 1.6;">Yes, we offer structured payment plans for large web and app development projects (typically 50% deposit, 25% on beta, 25% on launch). For SEO and website management, we offer affordable monthly retainers to ensure your digital assets remain secure, updated, and highly ranked on Google.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ==================== CTA BANNER ==================== -->
    <section class="cta-banner">
      <div class="container">
        <div class="cta-banner-inner reveal-scale">
          <h2>Ready to Start Your <span class="gradient-text">Project?</span></h2>
          <p>Let's build something great together. Connect with Toran Digital today for a free custom audit and proposal.</p>
          <div class="cta-banner-buttons">
            <a href="../contact/" class="btn btn-primary btn-lg">
              Get Your Free Proposal
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="https://wa.me/27696219479" class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
`;

let finalHtml = headerPart + newMain + footerPart;
fs.writeFileSync(filePath, finalHtml);
console.log('Successfully updated services/index.html');
