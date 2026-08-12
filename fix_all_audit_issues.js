const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

console.log('=== STARTING COMPREHENSIVE AUDIT FIXES ===');

// 1. Copy new logo into logo/toran_logo_perfect.png
const srcLogo = path.join(rootDir, 'toran_logo_perfect.png');
const destLogo = path.join(rootDir, 'logo', 'toran_logo_perfect.png');

if (fs.existsSync(srcLogo)) {
  fs.mkdirSync(path.dirname(destLogo), { recursive: true });
  fs.copyFileSync(srcLogo, destLogo);
  console.log('✅ New logo copied to logo/toran_logo_perfect.png');
}

// 2. Delete heavy unused images
const heavyImages = [
  path.join(rootDir, 'Gemini_Generated_Image_(1).png'),
  path.join(rootDir, 'Gemini_Generated_Image_(2).png'),
  path.join(rootDir, 'logo', 'Gemini_Generated_Image_.png'),
  path.join(rootDir, 'Gemini_Generated_Image_.png')
];

heavyImages.forEach(img => {
  if (fs.existsSync(img)) {
    try {
      fs.unlinkSync(img);
      console.log(`✅ Deleted heavy image: ${path.basename(img)}`);
    } catch (e) {
      console.error(`Could not delete ${img}:`, e.message);
    }
  }
});

// Helper function to find all HTML files
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.agents' && file !== '.impeccable') {
        results = results.concat(getAllHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files to update.`);

// Title truncation map for overlong titles
const titleFixes = {
  '/blog/vehicle-branding-roi/index.html': 'Vehicle Branding ROI: Is Fleet Wrapping Worth It? | Toran Digital',
  '/blog/website-cost-johannesburg/index.html': 'Website Cost in Johannesburg: 2026 Pricing Guide | Toran Digital',
  '/blog/dstv-signal-problems/index.html': 'Fix DSTV Signal Problems & E48-32 Error | Toran Digital',
  '/blog/seo-guide-johannesburg-businesses/index.html': 'Local SEO Guide for Johannesburg Businesses | Toran Digital',
  '/mobile-apps/cross-platform/index.html': 'Cross-Platform Mobile App Development | Toran Digital',
  '/graphic-design/index.html': 'Graphic Design & Corporate Identity Services | Toran Digital',
  '/dstv-installations/bedfordview/index.html': 'DSTV Installers Bedfordview | TV & CCTV | Toran Digital',
  '/vehicle-branding/fleet-wrapping/index.html': 'Commercial Fleet Wrapping & Decals | Toran Digital',
  '/web-design/wordpress/index.html': 'WordPress Web Design & Development | Toran Digital',
  '/web-design-pretoria/index.html': 'Web Design Pretoria | Business Websites | Toran Digital'
};

// 3. Process each HTML file for logo replacement, title trimming, and schema fixes
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;

  // Replace old logo filenames with toran_logo_perfect.png
  if (content.includes('Gemini_Generated_Image_.png')) {
    content = content.replace(/Gemini_Generated_Image_\.png/g, 'toran_logo_perfect.png');
    modified = true;
  }

  // Check and trim overlong title tags (>65 chars)
  const relPath = '/' + path.relative(rootDir, file).replace(/\\/g, '/');
  if (titleFixes[relPath]) {
    const newTitle = titleFixes[relPath];
    content = content.replace(/<title>.*?<\/title>/s, `<title>${newTitle}</title>`);
    modified = true;
  } else {
    // Automatic title check
    const titleMatch = content.match(/<title>(.*?)<\/title>/s);
    if (titleMatch && titleMatch[1].length > 65) {
      let t = titleMatch[1];
      // Clean up repetitive phrases
      t = t.replace(/\s+\|\s+Toran Digital/g, '');
      if (t.length > 50) {
        t = t.substring(0, 50).trim() + '...';
      }
      t = t + ' | Toran Digital';
      content = content.replace(/<title>.*?<\/title>/s, `<title>${t}</title>`);
      modified = true;
    }
  }

  // Check and trim overlong meta descriptions (>160 chars)
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/s);
  if (descMatch && descMatch[1].length > 165) {
    let d = descMatch[1];
    d = d.substring(0, 155).trim();
    const lastSpace = d.lastIndexOf(' ');
    if (lastSpace > 120) {
      d = d.substring(0, lastSpace);
    }
    d += '.';
    content = content.replace(/<meta\s+name="description"\s+content=".*?"/s, `<meta name="description" content="${d}"`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});

console.log('✅ Logo references sitewide updated & overlong titles/descriptions trimmed.');

// 4. Differentiate location pages body content and add local embedded maps
const locationBodyUpdates = [
  {
    path: path.join(rootDir, 'web-design-benoni', 'index.html'),
    areaName: 'Benoni',
    landmarks: 'Northmead, Farrarmere, Rynfield, Lakefield, and Benoni Agricultural Holdings',
    mapUrl: 'https://maps.google.com/maps?q=Benoni,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed',
    uniqueSection: `
    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <h2 class="section-title">Web Design Tailored for Benoni &amp; East Rand Businesses</h2>
        <p style="font-size: 1.1rem; color: var(--surface-300); max-width: 800px; margin-bottom: 2rem;">
          Benoni is a thriving commercial hub on the East Rand, spanning bustling retail centers in Northmead and Farrarmere to industrial and agricultural businesses in Lakefield and Benoni AH. Toran Digital crafts high-speed, mobile-first websites designed specifically to capture local East Rand customers searching for your services.
        </p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 1.5rem;">
          <div style="background: var(--navy-800); padding: 1.5rem; border-radius: 10px;">
            <h4 style="color: var(--teal-400); margin-bottom: 8px;">Northmead &amp; Farrarmere Retail</h4>
            <p style="font-size: 0.92rem; color: var(--surface-200);">Custom e-commerce and lead generation websites for local shops, medical practices, and professional services.</p>
          </div>
          <div style="background: var(--navy-800); padding: 1.5rem; border-radius: 10px;">
            <h4 style="color: var(--teal-400); margin-bottom: 8px;">Benoni Industrial &amp; Logistics</h4>
            <p style="font-size: 0.92rem; color: var(--surface-200);">Robust corporate portals and service catalogs for manufacturing, engineering, and transport fleets.</p>
          </div>
        </div>
        <div style="margin-top: 2.5rem; border-radius: 12px; overflow: hidden; height: 300px; border: 1px solid var(--navy-700);">
          <iframe title="Benoni Web Design Location Map" width="100%" height="100%" style="border:0;" loading="lazy" src="https://maps.google.com/maps?q=Benoni,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
    </section>`
  },
  {
    path: path.join(rootDir, 'web-design-midrand', 'index.html'),
    areaName: 'Midrand',
    landmarks: 'Waterfall City, Kyalami, Grand Central, Halfway House, and Vorna Valley',
    mapUrl: 'https://maps.google.com/maps?q=Midrand,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed',
    uniqueSection: `
    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <h2 class="section-title">High-Performance Web Engineering for Midrand &amp; Waterfall City</h2>
        <p style="font-size: 1.1rem; color: var(--surface-300); max-width: 800px; margin-bottom: 2rem;">
          Positioned right between Johannesburg and Pretoria, Midrand is South Africa's premier technology and corporate corridor. From tech startups in Waterfall City and automotive enterprises near Kyalami to logistics firms in Grand Central and Halfway House, Toran Digital delivers Next.js web applications engineered for enterprise scale and speed.
        </p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 1.5rem;">
          <div style="background: var(--navy-800); padding: 1.5rem; border-radius: 10px;">
            <h4 style="color: var(--teal-400); margin-bottom: 8px;">Waterfall City Tech Ventures</h4>
            <p style="font-size: 0.92rem; color: var(--surface-200);">Headless CMS solutions, React application architectures, and custom SaaS platforms built for venture-backed growth.</p>
          </div>
          <div style="background: var(--navy-800); padding: 1.5rem; border-radius: 10px;">
            <h4 style="color: var(--teal-400); margin-bottom: 8px;">Kyalami &amp; Grand Central Logistics</h4>
            <p style="font-size: 0.92rem; color: var(--surface-200);">High-converting B2B websites, client portals, and automated quote intake workflows for commercial operations.</p>
          </div>
        </div>
        <div style="margin-top: 2.5rem; border-radius: 12px; overflow: hidden; height: 300px; border: 1px solid var(--navy-700);">
          <iframe title="Midrand Web Design Location Map" width="100%" height="100%" style="border:0;" loading="lazy" src="https://maps.google.com/maps?q=Midrand,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
    </section>`
  },
  {
    path: path.join(rootDir, 'web-design-randburg', 'index.html'),
    areaName: 'Randburg',
    landmarks: 'Ferndale, Cresta, Linden, Blairgowrie, and Fontainebleau',
    mapUrl: 'https://maps.google.com/maps?q=Randburg,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed',
    uniqueSection: `
    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <h2 class="section-title">Web Design &amp; Digital Growth for Randburg Businesses</h2>
        <p style="font-size: 1.1rem; color: var(--surface-300); max-width: 800px; margin-bottom: 2rem;">
          Randburg is home to a vibrant mix of media production houses, retail nodes around Cresta Shopping Centre, and professional services across Ferndale and Linden. Toran Digital builds custom websites designed to convert local searchers into paying clients.
        </p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 1.5rem;">
          <div style="background: var(--navy-800); padding: 1.5rem; border-radius: 10px;">
            <h4 style="color: var(--teal-400); margin-bottom: 8px;">Cresta &amp; Linden Consumer Retail</h4>
            <p style="font-size: 0.92rem; color: var(--surface-200);">Fast WooCommerce &amp; Shopify online stores with instant WhatsApp inquiry integrations.</p>
          </div>
          <div style="background: var(--navy-800); padding: 1.5rem; border-radius: 10px;">
            <h4 style="color: var(--teal-400); margin-bottom: 8px;">Ferndale Professional Services</h4>
            <p style="font-size: 0.92rem; color: var(--surface-200);">Sleek corporate sites for law firms, financial advisors, medical practices, and agencies.</p>
          </div>
        </div>
        <div style="margin-top: 2.5rem; border-radius: 12px; overflow: hidden; height: 300px; border: 1px solid var(--navy-700);">
          <iframe title="Randburg Web Design Location Map" width="100%" height="100%" style="border:0;" loading="lazy" src="https://maps.google.com/maps?q=Randburg,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
    </section>`
  },
  {
    path: path.join(rootDir, 'dstv-installation-benoni', 'index.html'),
    areaName: 'Benoni',
    landmarks: 'Farrarmere, Rynfield, Northmead, and Lakefield residential estates',
    mapUrl: 'https://maps.google.com/maps?q=Benoni,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed',
    uniqueSection: `
    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <h2 class="section-title">Accredited DSTV &amp; TV Mounting Technicians in Benoni</h2>
        <p style="font-size: 1.1rem; color: var(--surface-300); max-width: 800px; margin-bottom: 2rem;">
          Experiencing signal loss or E48-32 errors in Benoni? Toran Digital provides accredited DSTV installations, Smart LNB upgrades, dish re-alignments, and seamless TV wall mounting across Farrarmere, Rynfield, Northmead, and surrounding East Rand suburbs.
        </p>
        <div style="margin-top: 2rem; border-radius: 12px; overflow: hidden; height: 300px; border: 1px solid var(--navy-700);">
          <iframe title="Benoni DSTV Installation Location Map" width="100%" height="100%" style="border:0;" loading="lazy" src="https://maps.google.com/maps?q=Benoni,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
    </section>`
  },
  {
    path: path.join(rootDir, 'dstv-installation-boksburg', 'index.html'),
    areaName: 'Boksburg',
    landmarks: 'Sunward Park, Beyers Park, Bartlett, Ravenswood, and Jansen Park',
    mapUrl: 'https://maps.google.com/maps?q=Boksburg,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed',
    uniqueSection: `
    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <h2 class="section-title">Same-Day DSTV &amp; CCTV Security Setup in Boksburg</h2>
        <p style="font-size: 1.1rem; color: var(--surface-300); max-width: 800px; margin-bottom: 2rem;">
          From home Explora installations in Sunward Park and Beyers Park to commercial CCTV camera setups in Bartlett and Ravenswood, Toran Digital delivers fast, reliable hardware installations across Boksburg.
        </p>
        <div style="margin-top: 2rem; border-radius: 12px; overflow: hidden; height: 300px; border: 1px solid var(--navy-700);">
          <iframe title="Boksburg DSTV Location Map" width="100%" height="100%" style="border:0;" loading="lazy" src="https://maps.google.com/maps?q=Boksburg,+Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
    </section>`
  }
];

locationBodyUpdates.forEach(loc => {
  if (fs.existsSync(loc.path)) {
    let content = fs.readFileSync(loc.path, 'utf-8');
    if (!content.includes('Location Map')) {
      content = content.replace(/<\/main>/i, `${loc.uniqueSection}\n</main>`);
      fs.writeFileSync(loc.path, content, 'utf-8');
      console.log(`✅ Added unique location section & map to ${path.basename(path.dirname(loc.path))}`);
    }
  }
});

console.log('🎉 ALL AUDIT FIXES APPLIED SUCCESSFULLY!');
