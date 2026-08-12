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
    
    // Replace schema script
    modifiedHeader = modifiedHeader.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${schema}\n</script>`);
    
    // Fix relative paths for inner pages
    modifiedHeader = modifiedHeader.replace(/href="\.\/"/g, 'href="../"');
    modifiedHeader = modifiedHeader.replace(/href="(?!\.\.\/|\/|http|#|mailto:|https:)([a-zA-Z0-9-_\/]+\/)"/g, 'href="../$1"');
    modifiedHeader = modifiedHeader.replace(/src="logo\//g, 'src="../logo/');
    modifiedHeader = modifiedHeader.replace(/href="logo\//g, 'href="../logo/');
    modifiedHeader = modifiedHeader.replace(/href="index\.css"/g, 'href="../index.css"');
    
    return modifiedHeader;
}

// ============================================
// ABOUT PAGE
// ============================================
const aboutSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Toran Digital",
    "description": "Gauteng's premier digital tech and hardware installation agency.",
    "foundingDate": "2018",
    "url": "https://torandigital.co.za/about/"
  }
}, null, 2);

const aboutContent = `
  <main id="main-content">
    <section class="hero section" style="padding-bottom: 2rem; min-height: 60vh;">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="container">
        <div class="hero-content" style="max-width: 900px;">
          <div class="hero-badge reveal">About Toran Digital</div>
          <h1 class="reveal reveal-delay-1">Redefining <span class="highlight">Digital Standards</span> In South Africa</h1>
          <p class="hero-description reveal reveal-delay-2" style="font-size: var(--text-xl);">We are a multi-disciplinary studio bridging the gap between high-performance software engineering and physical hardware installations.</p>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--bg-primary);">
      <div class="container">
        <div class="services-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="service-card">
            <h2 style="font-family: var(--font-display); font-size: var(--text-3xl);">Our Mission</h2>
            <p style="margin-top: 1rem; font-size: var(--text-lg); color: var(--dark-600);">To eliminate the friction businesses face when hiring separate contractors for digital and physical branding. We build the app, design the brand, wrap the fleet, and install the networks.</p>
          </div>
          <div class="service-card" style="background: var(--dark-950); color: var(--white);">
            <h2 style="font-family: var(--font-display); font-size: var(--text-3xl); color: var(--white);">Our Vision</h2>
            <p style="margin-top: 1rem; font-size: var(--text-lg); color: var(--slate-300);">To be the definitive technology partner for scaling enterprises in Gauteng, offering uncompromising quality and brutalist efficiency.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section-label">Company Timeline</p>
        <h2 class="section-title">A History of <span class="gradient-text">Execution</span></h2>
        
        <div style="display: flex; flex-direction: column; gap: 2rem; margin-top: 3rem;">
          <div class="service-card" style="flex-direction: row; align-items: center; gap: 2rem;">
            <div style="font-family: var(--font-display); font-size: 4rem; font-weight: 800; color: var(--accent-600);">2018</div>
            <div>
              <h3 style="font-size: var(--text-xl); font-family: var(--font-display);">The Foundation</h3>
              <p>Started as a boutique web design firm in Sandton, helping local startups establish their online presence.</p>
            </div>
          </div>
          <div class="service-card" style="flex-direction: row; align-items: center; gap: 2rem;">
            <div style="font-family: var(--font-display); font-size: 4rem; font-weight: 800; color: var(--accent-600);">2021</div>
            <div>
              <h3 style="font-size: var(--text-xl); font-family: var(--font-display);">Hardware Expansion</h3>
              <p>Integrated DSTV and CCTV installations into our core offerings to serve commercial clients requiring full-stack office setups.</p>
            </div>
          </div>
          <div class="service-card" style="flex-direction: row; align-items: center; gap: 2rem;">
            <div style="font-family: var(--font-display); font-size: 4rem; font-weight: 800; color: var(--accent-600);">2024</div>
            <div>
              <h3 style="font-size: var(--text-xl); font-family: var(--font-display);">The Agency Consolidation</h3>
              <p>Rebranded as Toran Digital, launching our vehicle wrapping division and enterprise mobile app development squad.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--dark-950); color: var(--white);">
      <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto 4rem;">
          <h2 class="section-title" style="color: var(--white);">Meet The Core Team</h2>
          <p style="font-size: var(--text-lg); color: var(--slate-300);">Engineers, designers, and technicians united by a singular focus on quality.</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card" style="background: var(--dark-900); border-color: var(--dark-800);">
            <div style="height: 250px; background: var(--dark-800); margin-bottom: 1rem;"></div>
            <h3 style="color: var(--white); font-family: var(--font-display);">David K.</h3>
            <p class="gradient-text" style="font-size: var(--text-sm);">Lead Software Engineer</p>
            <p style="color: var(--slate-300); margin-top: 1rem;">Architecting high-concurrency systems and mobile applications.</p>
          </div>
          <div class="service-card" style="background: var(--dark-900); border-color: var(--dark-800);">
            <div style="height: 250px; background: var(--dark-800); margin-bottom: 1rem;"></div>
            <h3 style="color: var(--white); font-family: var(--font-display);">Sarah M.</h3>
            <p class="gradient-text" style="font-size: var(--text-sm);">Creative Director</p>
            <p style="color: var(--slate-300); margin-top: 1rem;">Driving the bold aesthetic vision behind our web and vehicle wrap projects.</p>
          </div>
          <div class="service-card" style="background: var(--dark-900); border-color: var(--dark-800);">
            <div style="height: 250px; background: var(--dark-800); margin-bottom: 1rem;"></div>
            <h3 style="color: var(--white); font-family: var(--font-display);">Sipho T.</h3>
            <p class="gradient-text" style="font-size: var(--text-sm);">Head Technician</p>
            <p style="color: var(--slate-300); margin-top: 1rem;">Managing on-site deployments, CCTV networks, and hardware installations.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 class="section-title">Explore More</h2>
        </div>
        <div class="services-grid" style="grid-template-columns: 1fr 1fr 1fr;">
          <a href="../portfolio/" class="btn btn-outline" style="padding: 2rem;">View Our Portfolio</a>
          <a href="../contact/" class="btn btn-outline" style="padding: 2rem;">Get in Touch</a>
          <a href="../services/" class="btn btn-outline" style="padding: 2rem;">Explore Services</a>
        </div>
      </div>
    </section>
`;

fs.mkdirSync('about', { recursive: true });
fs.writeFileSync('about/index.html', getHeader('About Us | Toran Digital', 'Learn about Toran Digital, Gauteng\'s leading multi-disciplinary tech and design agency.', 'https://torandigital.co.za/about/', aboutSchema) + aboutContent + footer);

console.log('About page generated.');
