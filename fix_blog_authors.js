/**
 * fix_blog_authors.js — Fix blog post Article schema to use Person author
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const AUTHOR_STR = '"author": {"@type": "Person", "name": "Tinotenda Vafana", "url": "https://torandigital.co.za/about/"}';
const PUBLISHER_STR = '"publisher": {"@id": "https://torandigital.co.za/#business"}';

const blogPosts = [
  'blog/dstv-signal-problems/index.html',
  'blog/seo-guide-johannesburg-businesses/index.html',
  'blog/vehicle-branding-roi/index.html',
  'blog/website-cost-johannesburg/index.html',
];

blogPosts.forEach(rel => {
  const fp = path.join(ROOT, rel);
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  // Replace Organization author with Person
  c = c.replace(
    /"author":\s*\{"@type":\s*"Organization",\s*"name":\s*"Toran Digital"\}/g,
    AUTHOR_STR
  );

  // Replace verbose publisher block with @id reference
  c = c.replace(
    /"publisher":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"Toran Digital",\s*"logo":\s*\{"@type":\s*"ImageObject",\s*"url":\s*"[^"]+"\}\s*\}/g,
    PUBLISHER_STR
  );

  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf8');
    console.log('✅ Updated: ' + rel);
  } else {
    console.log('⚠️  No change: ' + rel);
  }
});

console.log('Done.');
