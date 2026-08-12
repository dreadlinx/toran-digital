const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

function findHtmlFiles(currentDir, fileList = []) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        const filePath = path.join(currentDir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = findHtmlFiles(dir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix 2: Change Open Graph and Twitter image URLs to absolute
    content = content.replace(/<meta property="og:image" content="(.*?logo\/Gemini_Generated_Image_\.png)">/g, '<meta property="og:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">');
    content = content.replace(/<meta name="twitter:image" content="(.*?logo\/Gemini_Generated_Image_\.png)">/g, '<meta name="twitter:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">');

    // Fix 3: Contact Form to mailto (Option B)
    content = content.replace(/<form[^>]*class="contact-form"[^>]*>/, '<form action="mailto:sales@torandigital.co.za" method="POST" enctype="text/plain" class="contact-form">');
    content = content.replace(/<form id="contactForm"[^>]*>/, '<form id="contactForm" action="mailto:sales@torandigital.co.za" method="POST" enctype="text/plain">');

    // Fix 7: Footer address
    content = content.replace(/<li><span style="color: var\(--text-on-dark-muted\);">Johannesburg, Gauteng, ZA<\/span><\/li>/g, '<li><span style="color: var(--text-on-dark-muted);">123 Main Street, Johannesburg, Gauteng, 2000</span></li>');

    // Fix 1: JSON-LD Schema in index.html
    if (file === path.join(dir, 'index.html')) {
        const schemaReplacement = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Toran Digital",
  "url": "https://torandigital.co.za",
  "logo": "https://torandigital.co.za/logo/Gemini_Generated_Image_.png",
  "description": "Premium digital agency offering custom web design, mobile app development, SEO, vehicle wraps, and home installations in Johannesburg, Gauteng.",
  "telephone": "+27696219479",
  "email": "sales@torandigital.co.za",
  "priceRange": "ZAR",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Johannesburg",
    "addressRegion": "Gauteng",
    "postalCode": "2000",
    "addressCountry": "ZA"
  },
  "areaServed": [
    {"@type": "City", "name": "Johannesburg"},
    {"@type": "City", "name": "Sandton"},
    {"@type": "City", "name": "Benoni"},
    {"@type": "City", "name": "Boksburg"},
    {"@type": "City", "name": "Randburg"},
    {"@type": "City", "name": "Midrand"},
    {"@type": "City", "name": "Edenvale"},
    {"@type": "City", "name": "Kempton Park"},
    {"@type": "City", "name": "Pretoria"},
    {"@type": "City", "name": "Germiston"}
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "serviceType": [
    "Web Design & Development",
    "Mobile App Development",
    "SEO & Google Ads",
    "Vehicle Branding & Wrapping",
    "DSTV & Home Installations",
    "Graphic Design"
  ]
}
</script>`;
        // Replace existing LocalBusiness script block. Let's find it.
        const scriptMatch = content.match(/<script type="application\/ld\+json">[\s\S]*?"@type":\s*"LocalBusiness"[\s\S]*?<\/script>/);
        if (scriptMatch) {
            content = content.replace(scriptMatch[0], schemaReplacement);
        }
        
        // Fix 4 & 5: index.html title and meta description
        content = content.replace(/<title>.*?<\/title>/, '<title>Web Design, Apps & SEO Johannesburg | Toran Digital</title>');
        content = content.replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Toran Digital delivers web design, mobile apps, SEO, vehicle branding & DSTV installations across Johannesburg & Gauteng. Get a free quote today.">');
    }

    if (file === path.join(dir, 'vehicle-branding', 'index.html')) {
        content = content.replace(/<title>.*?<\/title>/, '<title>Vehicle Branding & Fleet Wrapping Johannesburg | Toran Digital</title>');
        content = content.replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Professional vehicle branding in Johannesburg. Custom car wraps, fleet branding & bakkie decals. Get a free quote today!">');
    }

    if (file === path.join(dir, 'dstv-installations', 'index.html')) {
        content = content.replace(/<title>.*?<\/title>/, '<title>DSTV Installers & TV Mounting Johannesburg | Toran Digital</title>');
    }

    if (file === path.join(dir, 'web-design', 'index.html')) {
        content = content.replace(/<title>.*?<\/title>/, '<title>Web Design Johannesburg | Custom Websites | Toran Digital</title>');
        
        // Fix 8: Expand web-design content
        if (!content.includes('How We Build Websites That')) {
            const processHtml = `<!-- ADD THIS SECTION after the packages section -->
<section class="section">
  <div class="container">
    <div class="section-header center">
      <p class="section-label">Our Process</p>
      <h2 class="section-title">How We Build Websites That <span class="gradient-text">Rank & Convert</span></h2>
    </div>
    <div class="process-timeline">
      <div class="process-step">
        <div class="process-number">01</div>
        <h3>Discovery & Strategy</h3>
        <p>We start by understanding your business, your customers, and your Johannesburg market. We analyse your competitors and identify the exact keywords your target clients are searching for.</p>
      </div>
      <div class="process-step">
        <div class="process-number">02</div>
        <h3>Design & UX Planning</h3>
        <p>Every Toran Digital website is designed mobile-first. With over 60% of South African web traffic coming from smartphones, your site must perform flawlessly on any screen size.</p>
      </div>
      <div class="process-step">
        <div class="process-number">03</div>
        <h3>Development & SEO Integration</h3>
        <p>We build on fast, clean code with on-page SEO baked in from the start — structured headings, schema markup, optimised images, and page speed tuning for South African network conditions.</p>
      </div>
      <div class="process-step">
        <div class="process-number">04</div>
        <h3>Launch & Ongoing Support</h3>
        <p>After launch we submit your sitemap to Google Search Console, set up Google Analytics, and provide 30 days of post-launch support so your site performs from day one.</p>
      </div>
    </div>

    <div style="margin-top: 3rem;">
      <h2 class="section-title">Frequently Asked Questions About Web Design in Johannesburg</h2>
      <div class="faq-list">
        <div class="faq-item active">
          <button class="faq-question">How long does it take to build a website?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>Most business websites are delivered in 2–4 weeks. E-commerce stores or custom web applications with complex integrations typically take 4–8 weeks. We provide a detailed timeline in your proposal before any work begins.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Do you build websites on WordPress?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>Yes. We build on WordPress, Shopify, and custom frameworks depending on your needs. WordPress suits most business sites and blogs; Shopify is our recommendation for product-heavy e-commerce stores.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Will my website rank on Google?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>Every website we build includes on-page SEO foundations — proper title tags, meta descriptions, heading structure, schema markup, fast loading, and mobile optimisation. For ongoing ranking growth, we recommend pairing your new website with our SEO & Google Ads service.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Do you offer website hosting and maintenance?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>Yes. We offer monthly hosting and maintenance packages that include security updates, backups, uptime monitoring, and content updates. Ask us about our maintenance plans when requesting a quote.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
            content = content.replace(/<!-- ==================== LOCAL PROJECTS & TESTIMONIALS ==================== -->/, processHtml + '\n\n    <!-- ==================== LOCAL PROJECTS & TESTIMONIALS ==================== -->');
        }
    }

    if (file === path.join(dir, 'seo-marketing', 'index.html')) {
        // Fix 8: Expand seo-marketing content
        if (!content.includes('Our SEO Process')) {
            const processHtml = `<!-- ADD THIS SECTION after the packages section -->
<section class="section">
  <div class="container">
    <div class="section-header center">
      <p class="section-label">Our SEO Process</p>
      <h2 class="section-title">How We Drive Targeted <span class="gradient-text">Traffic</span></h2>
    </div>
    <div class="process-timeline">
      <div class="process-step">
        <div class="process-number">01</div>
        <h3>Technical Audit</h3>
        <p>We crawl your website to identify technical roadblocks—fixing page speed, broken links, mobile usability, and indexation issues before starting any content work.</p>
      </div>
      <div class="process-step">
        <div class="process-number">02</div>
        <h3>Keyword Strategy</h3>
        <p>We map out the highest-converting search terms for your industry in Gauteng, ensuring we target buyers, not just browsers.</p>
      </div>
      <div class="process-step">
        <div class="process-number">03</div>
        <h3>On-Page Optimization</h3>
        <p>We optimize title tags, headers, meta descriptions, and on-page content while adding structured schema markup to help Google understand your business.</p>
      </div>
      <div class="process-step">
        <div class="process-number">04</div>
        <h3>Local SEO & Reporting</h3>
        <p>We optimize your Google Business Profile for local map packs and provide monthly transparent reporting on rankings and traffic growth.</p>
      </div>
    </div>

    <div style="margin-top: 3rem;">
      <h2 class="section-title">Frequently Asked Questions About SEO in Johannesburg</h2>
      <div class="faq-list">
        <div class="faq-item active">
          <button class="faq-question">How long does SEO take to show results?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>SEO is a long-term strategy. While technical fixes can show immediate improvements, significant ranking and traffic growth typically takes 3 to 6 months depending on the competitiveness of your industry.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">What is the difference between SEO and Google Ads?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>Google Ads provides instant visibility at a cost-per-click, stopping when your budget runs out. SEO builds organic authority over time, providing free, sustainable traffic that continues to deliver ROI long after the initial work.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Do you manage Google Business Profiles?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>Yes. A fully optimized Google Business Profile is critical for ranking in local "near me" searches. We manage your profile, ensure NAP consistency, and help generate reviews.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">How do you report on SEO progress?
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <div class="faq-answer">
            <p>We provide comprehensive monthly reports detailing keyword rankings, organic traffic growth, technical health, and actionable insights for the next month's strategy.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
            content = content.replace(/<!-- ==================== LOCAL PROJECTS & TESTIMONIALS ==================== -->/, processHtml + '\n\n    <!-- ==================== LOCAL PROJECTS & TESTIMONIALS ==================== -->');
        }
    }

    if (file === path.join(dir, 'about', 'index.html')) {
        content = content.replace(/<h1 class="reveal reveal-delay-1">Your Dedicated <br><span class="gradient-text">Digital Partner<\/span><\/h1>/, '<h1 class="reveal reveal-delay-1">Toran Digital — Johannesburg\'s <br><span class="gradient-text">Full-Service Digital Agency</span></h1>');
    }

    fs.writeFileSync(file, content);
});

console.log('Fixes 1-8 applied successfully.');
