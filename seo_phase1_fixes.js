/**
 * seo_phase1_fixes.js — Toran Digital Phase 1 SEO Fixes
 * Run: node seo_phase1_fixes.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function readFile(p) { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, c) { fs.writeFileSync(p, c, 'utf8'); }

function findAllHtml(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.agents', '.git'].includes(e.name)) continue;
      findAllHtml(fp, results);
    } else if (e.name === 'index.html') {
      results.push(fp);
    }
  }
  return results;
}

const FONT_URL_BASE = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900';
const FONT_URL_SANS = '&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';
const FONT_URL = FONT_URL_BASE + FONT_URL_SANS;

const FONT_PRELOAD = [
  '  <!-- Google Fonts preloaded for performance (no render-blocking @import) -->',
  '  <link rel="preconnect" href="https://fonts.googleapis.com">',
  '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '  <link rel="preload" as="style" href="' + FONT_URL + '">',
  '  <link rel="stylesheet" href="' + FONT_URL + '" media="print" onload="this.media=\'all\'">',
  '  <noscript><link rel="stylesheet" href="' + FONT_URL + '"></noscript>',
].join('\n');

const OG_DIMS = [
  '  <meta property="og:image:width" content="1200">',
  '  <meta property="og:image:height" content="630">',
  '  <meta property="og:image:type" content="image/png">',
].join('\n');

let total = 0, changed = 0;
const changeLog = [];

function applyPerFileFixes(fp) {
  let c = readFile(fp);
  const orig = c;
  const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
  const fixes = [];

  // Fix 1: lang="en" -> lang="en-ZA"
  if (c.includes('<html lang="en">')) {
    c = c.replace('<html lang="en">', '<html lang="en-ZA">');
    fixes.push('lang=en-ZA');
  }

  // Fix 2: Add Google Fonts preload if not already present
  const hasPreconnect = c.includes('rel="preconnect"') && c.includes('fonts.googleapis.com');
  if (!hasPreconnect) {
    const cssLinkRe = /([ \t]*<link rel="stylesheet" href="[^"]*index\.css">)/;
    if (cssLinkRe.test(c)) {
      c = c.replace(cssLinkRe, FONT_PRELOAD + '\n$1');
      fixes.push('font-preload');
    }
  }

  // Fix 3: Add OG image dimensions
  if (c.includes('property="og:image"') && !c.includes('og:image:width')) {
    c = c.replace(
      /(<meta property="og:image" content="[^"]+">)/,
      '$1\n' + OG_DIMS
    );
    fixes.push('og-dims');
  }

  if (c !== orig) {
    writeFile(fp, c);
    changed++;
    changeLog.push({ rel, fixes });
  }
  total++;
}

function fixHomepageSchema() {
  const fp = path.join(ROOT, 'index.html');
  let c = readFile(fp);
  const orig = c;

  // Replace fake address
  c = c.replace(
    /"streetAddress":\s*"123 Main Street",\s*[\r\n]+\s*"addressLocality":\s*"Johannesburg",\s*[\r\n]+\s*"addressRegion":\s*"Gauteng",\s*[\r\n]+\s*"postalCode":\s*"2000",\s*[\r\n]+\s*"addressCountry":\s*"ZA"/,
    '"streetAddress": "14 Jordaan Street",\n    "addressLocality": "Benoni",\n    "addressRegion": "Gauteng",\n    "postalCode": "1501",\n    "addressCountry": "ZA"'
  );

  // Add @id if missing
  if (!c.includes('"@id": "https://torandigital.co.za/#business"')) {
    c = c.replace(
      '"@type": "LocalBusiness",',
      '"@type": "LocalBusiness",\n  "@id": "https://torandigital.co.za/#business",'
    );
  }

  if (c !== orig) { writeFile(fp, c); return '✅ schema address fixed + @id added'; }
  return '⚠️  schema address pattern not matched — check manually';
}

function fixAboutMeta() {
  const fp = path.join(ROOT, 'about', 'index.html');
  let c = readFile(fp);
  const orig = c;
  const newDesc = 'Toran Digital is a Benoni-based digital agency founded by Tinotenda Vafana in 2023, delivering web design, SEO, and branding to Gauteng businesses.';
  c = c.replace(/(<meta name="description" content=")[^"]+(")/,  '$1' + newDesc + '$2');
  if (c !== orig) { writeFile(fp, c); return '✅ meta description updated'; }
  return '⚠️  meta description not matched';
}

function fixRobots() {
  const fp = path.join(ROOT, 'robots.txt');
  writeFile(fp, 'User-agent: *\nAllow: /\nDisallow: /privacy-policy/\nDisallow: /terms/\n\nSitemap: https://torandigital.co.za/sitemap.xml\n');
  return '✅ robots.txt updated';
}

function fixCssImport() {
  const fp = path.join(ROOT, 'index.css');
  let c = readFile(fp);
  const orig = c;
  c = c.replace(
    /\/\* --- Google Fonts --- \*\/\s*[\r\n]+@import url\('[^']+'\);\s*[\r\n]+/,
    '/* Google Fonts loaded via <link> preload in HTML <head> */\n\n'
  );
  c = c.replace(/@import url\('https:\/\/fonts\.googleapis\.com[^']+'\);\s*[\r\n]+/g, '');
  if (c !== orig) { writeFile(fp, c); return '✅ @import removed from index.css'; }
  return '⚠️  @import not matched';
}

function fixHeroPreload() {
  const fp = path.join(ROOT, 'index.html');
  let c = readFile(fp);
  const orig = c;
  if (c.includes('hero_bg')) return '✅ hero_bg reference already present';
  if (c.includes('<link rel="stylesheet" href="index.css">')) {
    c = c.replace(
      '<link rel="stylesheet" href="index.css">',
      '<link rel="preload" as="image" href="/assets/hero_bg.png" fetchpriority="high">\n  <link rel="stylesheet" href="index.css">'
    );
    if (c !== orig) { writeFile(fp, c); return '✅ hero preload added'; }
  }
  return '⚠️  hero preload not added';
}

// MAIN
console.log('\n🚀 Toran Digital — Phase 1 SEO Fixes\n' + '━'.repeat(50));
const allHtml = findAllHtml(ROOT);
console.log('📋 Found ' + allHtml.length + ' HTML files\n');
console.log('🔧 Applying per-file fixes...');
allHtml.forEach(applyPerFileFixes);
console.log('\n🔧 Specific fixes:');
console.log('   Homepage schema:   ' + fixHomepageSchema());
console.log('   About meta desc:   ' + fixAboutMeta());
console.log('   robots.txt:        ' + fixRobots());
console.log('   CSS @import:       ' + fixCssImport());
console.log('   Hero preload:      ' + fixHeroPreload());
console.log('\n' + '━'.repeat(50));
console.log('✅ Done! Scanned: ' + total + ' | Modified: ' + changed + '\n');
console.log('📝 Per-file changes:');
changeLog.forEach(({ rel, fixes }) => {
  console.log('   ' + rel);
  fixes.forEach(f => console.log('     → ' + f));
});
console.log('');
