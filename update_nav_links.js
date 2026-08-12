const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

// 1. Update sitemap
const newUrls = [
  'web-design/ecommerce/', 'web-design/custom-web-apps/', 'web-design/wordpress/',
  'mobile-apps/ios-development/', 'mobile-apps/android-development/', 'mobile-apps/cross-platform/',
  'seo-marketing/local-seo/', 'seo-marketing/google-ads/', 'seo-marketing/google-business-profile/',
  'vehicle-branding/full-wraps/', 'vehicle-branding/fleet-wrapping/', 'vehicle-branding/bakkie-branding/',
  'dstv-installations/dstv/', 'dstv-installations/cctv/', 'dstv-installations/tv-mounting/',
  'graphic-design/corporate-identity/', 'graphic-design/logo-design/', 'graphic-design/signage/'
];

const sitemapPath = path.join(dir, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const today = '2026-07-14';
const newEntries = newUrls.map(u => [
  '  <url>',
  '    <loc>https://torandigital.co.za/' + u + '</loc>',
  '    <lastmod>' + today + '</lastmod>',
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.85</priority>',
  '  </url>'
].join('\n')).join('\n');
sitemap = sitemap.replace('</urlset>', newEntries + '\n</urlset>');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('sitemap.xml updated with 18 new URLs');

// 2. Update anchor links to real page links in ALL HTML files
function findHtmlFiles(d, list) {
  if (!list) list = [];
  fs.readdirSync(d).forEach(function(f) {
    var fp = path.join(d, f);
    if (fs.statSync(fp).isDirectory()) findHtmlFiles(fp, list);
    else if (f.endsWith('.html')) list.push(fp);
  });
  return list;
}

var replacements = [
  // root-relative (index.html)
  ['href="web-design/#ecommerce"', 'href="web-design/ecommerce/"'],
  ['href="web-design/#custom"', 'href="web-design/custom-web-apps/"'],
  ['href="web-design/#wordpress"', 'href="web-design/wordpress/"'],
  ['href="mobile-apps/#ios"', 'href="mobile-apps/ios-development/"'],
  ['href="mobile-apps/#android"', 'href="mobile-apps/android-development/"'],
  ['href="mobile-apps/#cross-platform"', 'href="mobile-apps/cross-platform/"'],
  ['href="seo-marketing/#seo"', 'href="seo-marketing/local-seo/"'],
  ['href="seo-marketing/#google-ads"', 'href="seo-marketing/google-ads/"'],
  ['href="seo-marketing/#gbp"', 'href="seo-marketing/google-business-profile/"'],
  ['href="vehicle-branding/#full-wraps"', 'href="vehicle-branding/full-wraps/"'],
  ['href="vehicle-branding/#fleet"', 'href="vehicle-branding/fleet-wrapping/"'],
  ['href="vehicle-branding/#bakkie"', 'href="vehicle-branding/bakkie-branding/"'],
  ['href="dstv-installations/#dstv"', 'href="dstv-installations/dstv/"'],
  ['href="dstv-installations/#cctv"', 'href="dstv-installations/cctv/"'],
  ['href="dstv-installations/#tv-mounting"', 'href="dstv-installations/tv-mounting/"'],
  ['href="graphic-design/#identity"', 'href="graphic-design/corporate-identity/"'],
  ['href="graphic-design/#logo"', 'href="graphic-design/logo-design/"'],
  ['href="graphic-design/#signage"', 'href="graphic-design/signage/"'],
  // depth-1 (../)
  ['href="../web-design/#ecommerce"', 'href="../web-design/ecommerce/"'],
  ['href="../web-design/#custom"', 'href="../web-design/custom-web-apps/"'],
  ['href="../web-design/#wordpress"', 'href="../web-design/wordpress/"'],
  ['href="../mobile-apps/#ios"', 'href="../mobile-apps/ios-development/"'],
  ['href="../mobile-apps/#android"', 'href="../mobile-apps/android-development/"'],
  ['href="../mobile-apps/#cross-platform"', 'href="../mobile-apps/cross-platform/"'],
  ['href="../seo-marketing/#seo"', 'href="../seo-marketing/local-seo/"'],
  ['href="../seo-marketing/#google-ads"', 'href="../seo-marketing/google-ads/"'],
  ['href="../seo-marketing/#gbp"', 'href="../seo-marketing/google-business-profile/"'],
  ['href="../vehicle-branding/#full-wraps"', 'href="../vehicle-branding/full-wraps/"'],
  ['href="../vehicle-branding/#fleet"', 'href="../vehicle-branding/fleet-wrapping/"'],
  ['href="../vehicle-branding/#bakkie"', 'href="../vehicle-branding/bakkie-branding/"'],
  ['href="../dstv-installations/#dstv"', 'href="../dstv-installations/dstv/"'],
  ['href="../dstv-installations/#cctv"', 'href="../dstv-installations/cctv/"'],
  ['href="../dstv-installations/#tv-mounting"', 'href="../dstv-installations/tv-mounting/"'],
  ['href="../graphic-design/#identity"', 'href="../graphic-design/corporate-identity/"'],
  ['href="../graphic-design/#logo"', 'href="../graphic-design/logo-design/"'],
  ['href="../graphic-design/#signage"', 'href="../graphic-design/signage/"'],
  // depth-2 (../../)
  ['href="../../web-design/#ecommerce"', 'href="../../web-design/ecommerce/"'],
  ['href="../../web-design/#custom"', 'href="../../web-design/custom-web-apps/"'],
  ['href="../../web-design/#wordpress"', 'href="../../web-design/wordpress/"'],
  ['href="../../mobile-apps/#ios"', 'href="../../mobile-apps/ios-development/"'],
  ['href="../../mobile-apps/#android"', 'href="../../mobile-apps/android-development/"'],
  ['href="../../mobile-apps/#cross-platform"', 'href="../../mobile-apps/cross-platform/"'],
  ['href="../../seo-marketing/#seo"', 'href="../../seo-marketing/local-seo/"'],
  ['href="../../seo-marketing/#google-ads"', 'href="../../seo-marketing/google-ads/"'],
  ['href="../../seo-marketing/#gbp"', 'href="../../seo-marketing/google-business-profile/"'],
  ['href="../../vehicle-branding/#full-wraps"', 'href="../../vehicle-branding/full-wraps/"'],
  ['href="../../vehicle-branding/#fleet"', 'href="../../vehicle-branding/fleet-wrapping/"'],
  ['href="../../vehicle-branding/#bakkie"', 'href="../../vehicle-branding/bakkie-branding/"'],
  ['href="../../dstv-installations/#dstv"', 'href="../../dstv-installations/dstv/"'],
  ['href="../../dstv-installations/#cctv"', 'href="../../dstv-installations/cctv/"'],
  ['href="../../dstv-installations/#tv-mounting"', 'href="../../dstv-installations/tv-mounting/"'],
  ['href="../../graphic-design/#identity"', 'href="../../graphic-design/corporate-identity/"'],
  ['href="../../graphic-design/#logo"', 'href="../../graphic-design/logo-design/"'],
  ['href="../../graphic-design/#signage"', 'href="../../graphic-design/signage/"'],
];

var files = findHtmlFiles(dir);
var updatedCount = 0;
files.forEach(function(f) {
  var content = fs.readFileSync(f, 'utf8');
  var orig = content;
  replacements.forEach(function(r) { content = content.split(r[0]).join(r[1]); });
  if (content !== orig) {
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  }
});
console.log('Updated nav links in ' + updatedCount + ' HTML files');
console.log('All done!');
