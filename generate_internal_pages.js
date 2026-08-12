const fs = require('fs');
const path = require('path');

const header = fs.readFileSync('index.html', 'utf8').split('  <main id="main-content">')[0];
const footer = `  </main>
  
  <!-- ==================== FOOTER ==================== -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="../" class="logo">
            <img src="../logo/Gemini_Generated_Image_.png" alt="Toran Digital Logo" width="40" height="40">
            <span class="logo-text" style="color: var(--white);">TORAN <span style="background: var(--gradient-teal); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">DIGITAL</span></span>
          </a>
          <p class="footer-description">Premium web design, apps, and technical installations for Gauteng businesses.</p>
        </div>
        <div class="footer-links">
          <h4>Services</h4>
          <a href="../web-design/">Web Design</a>
          <a href="../mobile-apps/">Mobile Apps</a>
          <a href="../vehicle-branding/">Vehicle Branding</a>
          <a href="../dstv-installations/">DSTV Installations</a>
        </div>
        <div class="footer-links">
          <h4>Company</h4>
          <a href="../about/">About Us</a>
          <a href="../portfolio/">Portfolio</a>
          <a href="../areas/">Areas</a>
          <a href="../contact/">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Toran Digital. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  <script src="../index.js"></script>
</body>
</html>`;

function getHeader(title, desc, canonical, schema) {
    let modifiedHeader = header.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    modifiedHeader = modifiedHeader.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${desc}">`);
    modifiedHeader = modifiedHeader.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${canonical}">`);
    
    modifiedHeader = modifiedHeader.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${schema}\n</script>`);
    
    modifiedHeader = modifiedHeader.replace(/href="\.\/"/g, 'href="../"');
    modifiedHeader = modifiedHeader.replace(/href="([a-zA-Z0-9-]+)\/"/g, 'href="../$1/"');
    modifiedHeader = modifiedHeader.replace(/src="logo\//g, 'src="../logo/');
    modifiedHeader = modifiedHeader.replace(/href="logo\//g, 'href="../logo/');
    modifiedHeader = modifiedHeader.replace(/href="index\.css"/g, 'href="../index.css"');
    
    return modifiedHeader;
}

// ================= CONTACT PAGE =================
const contactSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Toran Digital",
    "telephone": "+27696219479",
    "email": "sales@torandigital.co.za",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "14 Jordaan Street",
      "addressLocality": "Benoni",
      "addressRegion": "Gauteng",
      "postalCode": "1501",
      "addressCountry": "ZA"
    }
  }
}, null, 2);

const contactContent = `
  <main id="main-content">
    <section class="hero section" style="padding-bottom: 2rem; min-height: 50vh;">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="container">
        <div class="hero-content" style="max-width: 900px;">
          <div class="hero-badge reveal">Contact Us</div>
          <h1 class="reveal reveal-delay-1">Let's Build Something <span class="highlight">Unstoppable</span></h1>
          <p class="hero-description reveal reveal-delay-2" style="font-size: var(--text-xl);">Reach out for app development, branding, or field installations anywhere in Gauteng.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="services-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="service-card" style="background: var(--dark-950); color: var(--white);">
            <h2 style="font-family: var(--font-display); font-size: var(--text-3xl); color: var(--white);">Get In Touch</h2>
            <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
              <div>
                <h4 style="color: var(--accent-600); font-family: var(--font-display);">Direct Line / WhatsApp</h4>
                <a href="https://wa.me/27696219479" style="color: var(--white); font-size: var(--text-xl); font-weight: 700;">+27 69 621 9479</a>
              </div>
              <div>
                <h4 style="color: var(--accent-600); font-family: var(--font-display);">Email</h4>
                <a href="mailto:sales@torandigital.co.za" style="color: var(--white); font-size: var(--text-xl); font-weight: 700;">sales@torandigital.co.za</a>
              </div>
              <div>
                <h4 style="color: var(--accent-600); font-family: var(--font-display);">Headquarters</h4>
                <p style="color: var(--slate-300); font-size: var(--text-lg);">14 Jordaan Street<br>Benoni, Gauteng 1501<br>South Africa</p>
              </div>
            </div>
          </div>
          
          <div class="service-card">
            <h2 style="font-family: var(--font-display); font-size: var(--text-3xl);">Project Inquiry</h2>
            <form style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
              <input type="text" placeholder="Full Name" style="padding: 1rem; border: 1px solid var(--dark-900); font-family: var(--font-body); font-size: var(--text-base); border-radius: 0;">
              <input type="email" placeholder="Email Address" style="padding: 1rem; border: 1px solid var(--dark-900); font-family: var(--font-body); font-size: var(--text-base); border-radius: 0;">
              <select style="padding: 1rem; border: 1px solid var(--dark-900); font-family: var(--font-body); font-size: var(--text-base); border-radius: 0;">
                <option>Web Design & Dev</option>
                <option>Mobile App</option>
                <option>Vehicle Branding</option>
                <option>Hardware/DSTV Installation</option>
              </select>
              <textarea placeholder="Project Details" rows="4" style="padding: 1rem; border: 1px solid var(--dark-900); font-family: var(--font-body); font-size: var(--text-base); border-radius: 0;"></textarea>
              <button type="button" class="btn btn-primary" style="align-self: flex-start; padding: 1rem 3rem;">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section" style="background: var(--bg-primary);">
      <div class="container">
        <h2 class="section-title">Explore Next</h2>
        <div class="services-grid" style="grid-template-columns: 1fr 1fr;">
          <a href="../areas/" class="btn btn-outline" style="padding: 2rem;">See Our Service Areas</a>
          <a href="../services/" class="btn btn-outline" style="padding: 2rem;">Explore All Services</a>
        </div>
      </div>
    </section>
`;
fs.mkdirSync('contact', { recursive: true });
fs.writeFileSync('contact/index.html', getHeader('Contact Us | Toran Digital', 'Get a free quote for web design, app development, vehicle wrapping, or DSTV installations in Gauteng.', 'https://torandigital.co.za/contact/', contactSchema) + contactContent + footer);

// ================= PORTFOLIO PAGE =================
const portfolioSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Toran Digital Portfolio",
  "description": "Case studies of our web design, app development, and branding projects across Gauteng."
}, null, 2);

const portfolioContent = `
  <main id="main-content">
    <section class="hero section" style="padding-bottom: 2rem; min-height: 50vh;">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="container">
        <div class="hero-content" style="max-width: 900px;">
          <div class="hero-badge reveal">Our Portfolio</div>
          <h1 class="reveal reveal-delay-1">Proof Of <span class="highlight">Performance</span></h1>
          <p class="hero-description reveal reveal-delay-2" style="font-size: var(--text-xl);">Explore our deep-dive case studies showcasing technical superiority and distinctive branding across Gauteng.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="services-grid">
          <!-- Case Study 1 -->
          <div class="service-card" style="padding: 0; border: 2px solid var(--dark-900);">
            <div style="background: var(--dark-900); height: 250px;"></div>
            <div style="padding: 2rem;">
              <div class="section-label" style="margin-bottom: 0.5rem;">Web Design & E-Commerce</div>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800;">Sandton Retail Platform</h3>
              <p style="margin-top: 1rem; color: var(--dark-600);">We rebuilt a lagging WordPress site into a high-speed React storefront, resulting in a 300% increase in mobile conversions and top-3 local SEO rankings.</p>
              <a href="../web-design/" class="btn btn-outline" style="margin-top: 1.5rem;">View Web Services</a>
            </div>
          </div>
          <!-- Case Study 2 -->
          <div class="service-card" style="padding: 0; border: 2px solid var(--dark-900);">
            <div style="background: var(--dark-900); height: 250px;"></div>
            <div style="padding: 2rem;">
              <div class="section-label" style="margin-bottom: 0.5rem;">Vehicle Branding</div>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800;">Germiston Logistics Fleet</h3>
              <p style="margin-top: 1rem; color: var(--dark-600);">Designed, printed, and applied full cast vinyl wraps for a fleet of 12 distribution bakkies. High-visibility reflective decals for night safety.</p>
              <a href="../vehicle-branding/" class="btn btn-outline" style="margin-top: 1.5rem;">View Wrapping Services</a>
            </div>
          </div>
          <!-- Case Study 3 -->
          <div class="service-card" style="padding: 0; border: 2px solid var(--dark-900);">
            <div style="background: var(--dark-900); height: 250px;"></div>
            <div style="padding: 2rem;">
              <div class="section-label" style="margin-bottom: 0.5rem;">Mobile App Development</div>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800;">Johannesburg Delivery App</h3>
              <p style="margin-top: 1rem; color: var(--dark-600);">Developed a custom cross-platform mobile application for real-time driver tracking and automated customer notifications.</p>
              <a href="../mobile-apps/" class="btn btn-outline" style="margin-top: 1.5rem;">View App Services</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--dark-950); color: var(--white);">
      <div class="container" style="text-align: center;">
        <h2 class="section-title" style="color: var(--white);">Ready For Your Own Success Story?</h2>
        <a href="../contact/" class="btn btn-primary btn-lg" style="margin-top: 2rem; background: var(--white); color: var(--dark-950);">Start A Project</a>
      </div>
    </section>
`;
fs.mkdirSync('portfolio', { recursive: true });
fs.writeFileSync('portfolio/index.html', getHeader('Portfolio | Toran Digital Case Studies', 'View our latest web design, app development, and vehicle wrapping projects in Johannesburg and Gauteng.', 'https://torandigital.co.za/portfolio/', portfolioSchema) + portfolioContent + footer);

// ================= AREAS PAGE =================
const areasSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Service Areas in Gauteng",
  "description": "Toran Digital serves Johannesburg, Pretoria, Sandton, Benoni, Boksburg, and the entire Gauteng region."
}, null, 2);

const areasContent = `
  <main id="main-content">
    <section class="hero section" style="padding-bottom: 2rem; min-height: 50vh;">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="container">
        <div class="hero-content" style="max-width: 900px;">
          <div class="hero-badge reveal">Coverage Areas</div>
          <h1 class="reveal reveal-delay-1">Serving All Of <span class="highlight">Gauteng</span></h1>
          <p class="hero-description reveal reveal-delay-2" style="font-size: var(--text-xl);">From digital deployments to on-site vehicle branding and network installations across South Africa's economic hub.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="services-grid" style="grid-template-columns: repeat(4, 1fr);">
          <a href="../web-design-sandton/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Sandton</h3>
          </a>
          <a href="../web-design-johannesburg/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Johannesburg</h3>
          </a>
          <a href="../web-design-pretoria/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Pretoria</h3>
          </a>
          <a href="../web-design-benoni/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Benoni</h3>
          </a>
          <a href="../web-design-boksburg/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Boksburg</h3>
          </a>
          <a href="../web-design-midrand/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Midrand</h3>
          </a>
          <a href="../web-design-randburg/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Randburg</h3>
          </a>
          <a href="../vehicle-branding-germiston/" class="service-card" style="text-align: center; padding: 2rem 1rem;">
            <h3 style="font-family: var(--font-display); font-size: var(--text-xl);">Germiston</h3>
          </a>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--dark-950); color: var(--white);">
      <div class="container">
        <h2 class="section-title" style="color: var(--white);">Local Expertise, Global Standards</h2>
        <p style="font-size: var(--text-lg); color: var(--slate-300); max-width: 800px;">Because we handle physical installations (DSTV, CCTV, Vehicle Wraps) alongside our digital services (Web Design, SEO, Apps), we have a deep understanding of the local Gauteng landscape. We deploy technicians rapidly to your site.</p>
        <a href="../contact/" class="btn btn-primary" style="margin-top: 2rem; background: var(--accent-600); border: none; box-shadow: none;">Contact Our Dispatch Team</a>
      </div>
    </section>
`;
fs.mkdirSync('areas', { recursive: true });
fs.writeFileSync('areas/index.html', getHeader('Service Areas in Gauteng | Toran Digital', 'We provide web design, vehicle branding, and hardware installations across Sandton, Johannesburg, Pretoria, and the East Rand.', 'https://torandigital.co.za/areas/', areasSchema) + areasContent + footer);

// ================= BLOG PAGE =================
const blogSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Toran Digital Insights",
  "description": "Articles on web development, mobile apps, SEO, and business branding in South Africa."
}, null, 2);

const blogContent = `
  <main id="main-content">
    <section class="hero section" style="padding-bottom: 2rem; min-height: 50vh;">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="container">
        <div class="hero-content" style="max-width: 900px;">
          <div class="hero-badge reveal">Insights & News</div>
          <h1 class="reveal reveal-delay-1">The Digital <span class="highlight">Vanguard</span></h1>
          <p class="hero-description reveal reveal-delay-2" style="font-size: var(--text-xl);">Expert perspectives on web architecture, local SEO algorithms, and commercial branding strategies.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="services-grid">
          <!-- Post 1 -->
          <div class="service-card" style="padding: 0; border: 2px solid var(--dark-900);">
            <div style="background: var(--dark-900); height: 200px;"></div>
            <div style="padding: 2rem;">
              <div class="section-label" style="margin-bottom: 0.5rem;">Web Development</div>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800;">Why Speed is the Ultimate SEO Metric</h3>
              <p style="margin-top: 1rem; color: var(--dark-600);">A deep dive into Core Web Vitals and why sluggish WordPress templates are killing your Gauteng local rankings.</p>
              <a href="#" class="btn btn-outline" style="margin-top: 1.5rem;">Read Article</a>
            </div>
          </div>
          <!-- Post 2 -->
          <div class="service-card" style="padding: 0; border: 2px solid var(--dark-900);">
            <div style="background: var(--dark-900); height: 200px;"></div>
            <div style="padding: 2rem;">
              <div class="section-label" style="margin-bottom: 0.5rem;">Vehicle Branding</div>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800;">Cast Vinyl vs. Calendared Wraps</h3>
              <p style="margin-top: 1rem; color: var(--dark-600);">Understanding the material science behind commercial fleet wrapping and why cheaper materials fail under the African sun.</p>
              <a href="#" class="btn btn-outline" style="margin-top: 1.5rem;">Read Article</a>
            </div>
          </div>
          <!-- Post 3 -->
          <div class="service-card" style="padding: 0; border: 2px solid var(--dark-900);">
            <div style="background: var(--dark-900); height: 200px;"></div>
            <div style="padding: 2rem;">
              <div class="section-label" style="margin-bottom: 0.5rem;">App Development</div>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800;">React Native for Logistics Apps</h3>
              <p style="margin-top: 1rem; color: var(--dark-600);">How cross-platform architecture saves development costs while delivering native-like performance for tracking apps.</p>
              <a href="#" class="btn btn-outline" style="margin-top: 1.5rem;">Read Article</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--bg-primary);">
      <div class="container" style="text-align: center;">
        <h2 class="section-title">Learn More About What We Do</h2>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
          <a href="../web-design/" class="btn btn-outline">Web Design</a>
          <a href="../mobile-apps/" class="btn btn-outline">Mobile Apps</a>
          <a href="../seo-marketing/" class="btn btn-outline">SEO</a>
          <a href="../vehicle-branding/" class="btn btn-outline">Wraps</a>
        </div>
      </div>
    </section>
`;
fs.mkdirSync('blog', { recursive: true });
fs.writeFileSync('blog/index.html', getHeader('Blog & Digital Insights | Toran Digital', 'Read our latest articles on web design, app development, SEO marketing, and vehicle branding.', 'https://torandigital.co.za/blog/', blogSchema) + blogContent + footer);

console.log('All internal pages generated successfully.');
