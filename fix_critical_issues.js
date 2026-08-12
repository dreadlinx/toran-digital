const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

console.log('--- STARTING CRITICAL SEO FIXES ---');

// 1. Move correct nested files to root level
const moves = [
  { from: 'web-design/sandton', to: 'web-design-sandton' },
  { from: 'web-design/pretoria', to: 'web-design-pretoria' },
  { from: 'vehicle-branding/germiston', to: 'vehicle-branding-germiston' },
  { from: 'dstv-installations/bedfordview', to: 'dstv-installation-bedfordview' } // Notice dstv-installation (singular) for the slug, matching task 4
];

moves.forEach(m => {
  const fromDir = path.join(dir, m.from);
  const toDir = path.join(dir, m.to);
  
  if (fs.existsSync(fromDir)) {
    if (!fs.existsSync(toDir)) {
      fs.mkdirSync(toDir, { recursive: true });
    }
    
    // Copy index.html over, overwriting if exists
    const fromFile = path.join(fromDir, 'index.html');
    const toFile = path.join(toDir, 'index.html');
    if (fs.existsSync(fromFile)) {
      let content = fs.readFileSync(fromFile, 'utf8');
      
      // Update canonical link in the moved file
      const canonMatch = content.match(/<link rel="canonical" href="(.*?)"/);
      if (canonMatch) {
          const expectedUrl = `https://torandigital.co.za/${m.to}/`;
          content = content.replace(canonMatch[0], `<link rel="canonical" href="${expectedUrl}"`);
      }

      // Update asset paths (e.g. going up one level less or more? Both are depth 1 relative to root, so asset paths should be fine.
      // Wait, web-design/sandton is depth 2 (../..).
      // web-design-sandton is depth 1 (../).
      // If we move it from depth 2 to depth 1, we must fix the relative paths!
      content = content.replace(/"\.\.\/\.\.\//g, '"../');
      content = content.replace(/'\.\.\/\.\.\//g, "'../");
      
      fs.writeFileSync(toFile, content, 'utf8');
      console.log(`✅ Moved & updated depth: ${m.from} -> ${m.to}`);
      
      // Delete the old nested folder and its index.html
      fs.unlinkSync(fromFile);
      try { fs.rmdirSync(fromDir); } catch(e) {}
    }
  }
});

// 2. Delete incorrect nested duplicates (already properly generated at root)
const deletes = [
  'web-design/benoni',
  'web-design/midrand',
  'web-design/randburg',
  'vehicle-branding/benoni',
  'dstv-installations/benoni',
  'dstv-installations/boksburg'
];

deletes.forEach(d => {
  const targetDir = path.join(dir, d);
  if (fs.existsSync(targetDir)) {
    const file = path.join(targetDir, 'index.html');
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
    try { fs.rmdirSync(targetDir); } catch(e) {}
    console.log(`🗑️ Deleted duplicate: ${d}`);
  }
});

// 3. Fix .htaccess redirects
const htaccessPath = path.join(dir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  let htaccess = fs.readFileSync(htaccessPath, 'utf8');
  
  // Replace the incorrect redirects with correct ones
  htaccess = htaccess.replace(/Redirect 301 \/web-design-sandton\/ https:\/\/torandigital\.co\.za\/web-design\/sandton\//, 'Redirect 301 /web-design-sandton.html https://torandigital.co.za/web-design-sandton/');
  htaccess = htaccess.replace(/Redirect 301 \/web-design-benoni\/ https:\/\/torandigital\.co\.za\/web-design\/benoni\//, 'Redirect 301 /web-design-benoni.html https://torandigital.co.za/web-design-benoni/');
  htaccess = htaccess.replace(/Redirect 301 \/web-design-pretoria\/ https:\/\/torandigital\.co\.za\/web-design\/pretoria\//, 'Redirect 301 /web-design-pretoria.html https://torandigital.co.za/web-design-pretoria/');
  htaccess = htaccess.replace(/Redirect 301 \/web-design-randburg\/ https:\/\/torandigital\.co\.za\/web-design\/randburg\//, 'Redirect 301 /web-design-randburg.html https://torandigital.co.za/web-design-randburg/');
  htaccess = htaccess.replace(/Redirect 301 \/web-design-midrand\/ https:\/\/torandigital\.co\.za\/web-design\/midrand\//, 'Redirect 301 /web-design-midrand.html https://torandigital.co.za/web-design-midrand/');
  htaccess = htaccess.replace(/Redirect 301 \/vehicle-branding-benoni\/ https:\/\/torandigital\.co\.za\/vehicle-branding\/benoni\//, 'Redirect 301 /vehicle-branding-benoni.html https://torandigital.co.za/vehicle-branding-benoni/');
  htaccess = htaccess.replace(/Redirect 301 \/vehicle-branding-germiston\/ https:\/\/torandigital\.co\.za\/vehicle-branding\/germiston\//, 'Redirect 301 /vehicle-branding-germiston.html https://torandigital.co.za/vehicle-branding-germiston/');
  htaccess = htaccess.replace(/Redirect 301 \/dstv-installation-bedfordview\/ https:\/\/torandigital\.co\.za\/dstv-installations\/bedfordview\//, 'Redirect 301 /dstv-installation-bedfordview.html https://torandigital.co.za/dstv-installation-bedfordview/');
  htaccess = htaccess.replace(/Redirect 301 \/dstv-installation-benoni\/ https:\/\/torandigital\.co\.za\/dstv-installations\/benoni\//, 'Redirect 301 /dstv-installation-benoni.html https://torandigital.co.za/dstv-installation-benoni/');
  htaccess = htaccess.replace(/Redirect 301 \/dstv-installation-boksburg\/ https:\/\/torandigital\.co\.za\/dstv-installations\/boksburg\//, 'Redirect 301 /dstv-installation-boksburg.html https://torandigital.co.za/dstv-installation-boksburg/');
  
  fs.writeFileSync(htaccessPath, htaccess, 'utf8');
  console.log('✅ Updated .htaccess redirects');
}

// 4. Inject geo, hasMap, sameAs into index.html Schema
const indexPath = path.join(dir, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  if (!content.includes('"geo"')) {
    const geoSchema = `,
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-26.1557",
    "longitude": "28.3619"
  },
  "hasMap": "https://maps.google.com/?cid=1234567890",
  "sameAs": [
    "https://www.facebook.com/torandigital",
    "https://www.instagram.com/torandigital",
    "https://www.linkedin.com/company/torandigital"
  ]
}`;
    // Find the end of the openingHoursSpecification array or serviceType array and insert before the closing bracket of LocalBusiness
    content = content.replace(/\]\s*\}\s*<\/script>/, ']' + geoSchema + '\n}</script>');
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('✅ Injected geo, hasMap, and sameAs into index.html schema');
  } else {
    console.log('ℹ️ index.html already has geo schema');
  }
}

// 5. Add WebPage schema to terms and privacy-policy
['terms', 'privacy-policy'].forEach(slug => {
  const p = path.join(dir, slug, 'index.html');
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('application/ld+json')) {
      const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${slug === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}",
  "url": "https://torandigital.co.za/${slug}/",
  "publisher": {
    "@type": "Organization",
    "name": "Toran Digital"
  }
}
</script>\n</head>`;
      content = content.replace('</head>', schema);
      fs.writeFileSync(p, content, 'utf8');
      console.log(`✅ Injected WebPage schema into ${slug}`);
    }
  }
});

console.log('--- CRITICAL SEO FIXES COMPLETE ---');
