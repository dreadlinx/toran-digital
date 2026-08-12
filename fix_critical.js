const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';
const baseUrl = 'https://torandigital.co.za';

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
    let changed = false;

    // Fix 1: OG Image and Twitter Image
    const newOgImage = '<meta property="og:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">';
    const newTwitterImage = '<meta name="twitter:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">';
    
    // Replace any relative paths for these specific tags
    const ogImgRegex = /<meta property="og:image" content="(?!(?:https?:)?\/\/)[^"]*?logo\/Gemini_Generated_Image_\.png">/g;
    if (ogImgRegex.test(content)) {
        content = content.replace(ogImgRegex, newOgImage);
        changed = true;
    }
    
    const twImgRegex = /<meta name="twitter:image" content="(?!(?:https?:)?\/\/)[^"]*?logo\/Gemini_Generated_Image_\.png">/g;
    if (twImgRegex.test(content)) {
        content = content.replace(twImgRegex, newTwitterImage);
        changed = true;
    }

    // Fix 2: Old URL references
    // web-design-sandton/ etc. -> web-design/sandton/
    const oldUrls = [
        ['web-design-sandton', 'web-design/sandton'],
        ['web-design-benoni', 'web-design/benoni'],
        ['web-design-pretoria', 'web-design/pretoria'],
        ['web-design-randburg', 'web-design/randburg'],
        ['web-design-midrand', 'web-design/midrand'],
        ['vehicle-branding-benoni', 'vehicle-branding/benoni'],
        ['vehicle-branding-germiston', 'vehicle-branding/germiston'],
        ['dstv-installation-bedfordview', 'dstv-installations/bedfordview'],
        ['dstv-installation-benoni', 'dstv-installations/benoni'],
        ['dstv-installation-boksburg', 'dstv-installations/boksburg']
    ];

    oldUrls.forEach(([oldFolder, newFolder]) => {
        // e.g. href="../web-design-sandton/" or href="web-design-sandton/"
        const oldRegex = new RegExp(`(href|src)="(?:\\.\\./)*${oldFolder}/?"`, 'g');
        if (oldRegex.test(content)) {
            // Need to figure out the right depth.
            // Since we're inside the file, we should probably just use absolute paths or calculate relative.
            // The easiest is absolute for navigation, or calculate relative.
            // Actually, we can just replace the folder part because the leading ../ is already correct for the previous structure.
            // Wait, if we are currently at depth 2 (e.g. web-design/sandton/), a link to ../web-design-benoni/ should be ../benoni/
            // But let's just make all links to location pages absolute to be perfectly safe.
            content = content.replace(oldRegex, `$1="https://torandigital.co.za/${newFolder}/"`);
            changed = true;
        }
        
        // Also catch any instances where they just mention the string without href
        // Wait, let's only replace within href or src to be safe.
        // What about internal text? No, just hrefs.
        
        // Also check if canonical points to old url (it shouldn't, but just in case)
        const canRegex = new RegExp(`<link rel="canonical" href="https://torandigital.co.za/${oldFolder}/">`, 'g');
        if (canRegex.test(content)) {
            content = content.replace(canRegex, `<link rel="canonical" href="https://torandigital.co.za/${newFolder}/">`);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(file, content);
    }
});

// Fix 3: Manually inject Process + FAQ sections into seo-marketing/ and web-design/
// The previous script looked for <!-- ==================== LOCAL PROJECTS & TESTIMONIALS ==================== -->
// Let's check what's actually in these files.
const webDesignFile = path.join(dir, 'web-design', 'index.html');
if (fs.existsSync(webDesignFile)) {
    let content = fs.readFileSync(webDesignFile, 'utf8');
    if (!content.includes('Our Process')) {
        // Find a place to inject. Let's find the closing tag of the last section before the footer.
        // We'll inject right before </main> or <!-- FOOTER -->
        const processHtml = `
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
</section>
`;
        // Inject before CTA section if it exists, else before footer
        if (content.includes('<!-- CTA Section -->')) {
            content = content.replace('<!-- CTA Section -->', processHtml + '\n<!-- CTA Section -->');
        } else if (content.includes('<footer')) {
            content = content.replace(/<footer/i, processHtml + '\n<footer');
        }
        fs.writeFileSync(webDesignFile, content);
    }
}

const seoFile = path.join(dir, 'seo-marketing', 'index.html');
if (fs.existsSync(seoFile)) {
    let content = fs.readFileSync(seoFile, 'utf8');
    if (!content.includes('Our SEO Process')) {
        const processHtml = `
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
</section>
`;
        if (content.includes('<!-- CTA Section -->')) {
            content = content.replace('<!-- CTA Section -->', processHtml + '\n<!-- CTA Section -->');
        } else if (content.includes('<footer')) {
            content = content.replace(/<footer/i, processHtml + '\n<footer');
        }
        fs.writeFileSync(seoFile, content);
    }
}

// Fix 4: Add LocalBusiness schema to missing location pages
const missingSchemaPages = [
    {
        file: 'web-design/sandton/index.html',
        type: 'Web Design',
        url: 'https://torandigital.co.za/web-design/sandton/'
    },
    {
        file: 'vehicle-branding/germiston/index.html',
        type: 'Vehicle Branding',
        url: 'https://torandigital.co.za/vehicle-branding/germiston/'
    },
    {
        file: 'dstv-installations/bedfordview/index.html',
        type: 'DSTV Installations',
        url: 'https://torandigital.co.za/dstv-installations/bedfordview/'
    }
];

missingSchemaPages.forEach(page => {
    const filePath = path.join(dir, page.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('application/ld+json')) {
            const schema = `
  <!-- Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Toran Digital - ${page.type}",
    "url": "${page.url}",
    "telephone": "+27696219479",
    "image": "https://torandigital.co.za/logo/Gemini_Generated_Image_.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Johannesburg",
      "addressRegion": "Gauteng",
      "postalCode": "2000",
      "addressCountry": "ZA"
    }
  }
  </script>
</head>`;
            content = content.replace('</head>', schema);
            fs.writeFileSync(filePath, content);
        }
    }
});

console.log("Critical fixes applied successfully!");
