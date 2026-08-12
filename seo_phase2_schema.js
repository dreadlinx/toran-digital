/**
 * seo_phase2_schema.js — Toran Digital Phase 2 Schema Markup
 * Adds Article, ContactPage, Person, Blog, ItemList, FAQPage schemas
 * Run: node seo_phase2_schema.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
function readFile(p) { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, c) { fs.writeFileSync(p, c, 'utf8'); }

function injectSchema(filePath, schemaObj) {
  let c = readFile(filePath);
  if (c.includes('"@type": "' + schemaObj['@type'] + '"')) {
    return false; // already has this schema type
  }
  const schemaTag = '<script type="application/ld+json">\n' + JSON.stringify(schemaObj, null, 2) + '\n</script>';
  // Insert before </head>
  if (c.includes('</head>')) {
    c = c.replace('</head>', schemaTag + '\n</head>');
    writeFile(filePath, c);
    return true;
  }
  return false;
}

const BUSINESS_ID = 'https://torandigital.co.za/#business';
const AUTHOR = { '@type': 'Person', 'name': 'Tinotenda Vafana', 'url': 'https://torandigital.co.za/about/' };

const results = [];

// ── 2.1 Blog Posts: Article Schema ───────────────────────────────────────────
const blogPosts = [
  {
    dir: 'blog/dstv-signal-problems',
    headline: 'How to Fix Common DSTV Signal Problems in Johannesburg',
    slug: 'dstv-signal-problems',
    datePublished: '2026-06-27',
  },
  {
    dir: 'blog/seo-guide-johannesburg-businesses',
    headline: 'Local SEO Guide for Johannesburg Businesses (2026)',
    slug: 'seo-guide-johannesburg-businesses',
    datePublished: '2026-06-27',
  },
  {
    dir: 'blog/vehicle-branding-roi',
    headline: 'Is Vehicle Branding Worth It? ROI for Johannesburg Businesses',
    slug: 'vehicle-branding-roi',
    datePublished: '2026-06-27',
  },
  {
    dir: 'blog/website-cost-johannesburg',
    headline: 'How Much Does a Website Cost in Johannesburg? (2026 Guide)',
    slug: 'website-cost-johannesburg',
    datePublished: '2026-06-27',
  },
];

blogPosts.forEach(({ dir, headline, slug, datePublished }) => {
  const fp = path.join(ROOT, dir, 'index.html');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': headline,
    'datePublished': datePublished,
    'dateModified': datePublished,
    'author': AUTHOR,
    'publisher': { '@id': BUSINESS_ID },
    'url': 'https://torandigital.co.za/blog/' + slug + '/',
    'image': 'https://torandigital.co.za/logo/Gemini_Generated_Image_.png',
    'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://torandigital.co.za/blog/' + slug + '/' },
  };
  const ok = injectSchema(fp, schema);
  results.push({ file: dir + '/index.html', status: ok ? '✅ Article schema added' : '⚠️  already has Article or skip' });
});

// ── 2.2 Contact Page Schema ───────────────────────────────────────────────────
{
  const fp = path.join(ROOT, 'contact', 'index.html');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Toran Digital',
    'url': 'https://torandigital.co.za/contact/',
    'description': 'Contact Toran Digital for a free quote on web design, mobile apps, SEO, and vehicle branding services in Johannesburg.',
    'mainEntity': { '@id': BUSINESS_ID },
  };
  const ok = injectSchema(fp, schema);
  results.push({ file: 'contact/index.html', status: ok ? '✅ ContactPage schema added' : '⚠️  already present' });
}

// ── 2.3 Person Schema on About Page ──────────────────────────────────────────
{
  const fp = path.join(ROOT, 'about', 'index.html');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Tinotenda Vafana',
    'jobTitle': 'Founder & Lead Developer',
    'description': 'Tinotenda Vafana holds a Bachelor of Mathematics and Information Systems and has 6 years of experience in web development and digital marketing. He founded Toran Digital in 2023 to bring premium digital services to Gauteng businesses.',
    'worksFor': { '@id': BUSINESS_ID },
    'url': 'https://torandigital.co.za/about/',
    'knowsAbout': ['Web Design', 'SEO', 'Mobile App Development', 'Digital Marketing'],
  };
  const ok = injectSchema(fp, schema);
  results.push({ file: 'about/index.html', status: ok ? '✅ Person schema added' : '⚠️  already present' });
}

// ── 2.4 Blog Index: Blog Schema ───────────────────────────────────────────────
{
  const fp = path.join(ROOT, 'blog', 'index.html');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Toran Digital Blog',
    'url': 'https://torandigital.co.za/blog/',
    'description': 'Digital marketing, web design, and SEO tips for Johannesburg and Gauteng businesses.',
    'publisher': { '@id': BUSINESS_ID },
    'blogPost': blogPosts.map(p => ({
      '@type': 'BlogPosting',
      'headline': p.headline,
      'url': 'https://torandigital.co.za/blog/' + p.slug + '/',
      'datePublished': p.datePublished,
      'author': AUTHOR,
    })),
  };
  const ok = injectSchema(fp, schema);
  results.push({ file: 'blog/index.html', status: ok ? '✅ Blog schema added' : '⚠️  already present' });
}

// ── 2.5 Portfolio: ItemList Schema ────────────────────────────────────────────
{
  const fp = path.join(ROOT, 'portfolio', 'index.html');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Toran Digital Portfolio',
    'description': 'A showcase of websites, mobile apps, and branding projects delivered by Toran Digital for Gauteng businesses.',
    'url': 'https://torandigital.co.za/portfolio/',
    'numberOfItems': 15,
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Website Design Project', 'url': 'https://torandigital.co.za/portfolio/' },
    ],
  };
  const ok = injectSchema(fp, schema);
  results.push({ file: 'portfolio/index.html', status: ok ? '✅ ItemList schema added' : '⚠️  already present' });
}

// ── 2.6 Check and add FAQPage schema where FAQ section exists ─────────────────
const servicePages = [
  { dir: 'web-design', url: 'https://torandigital.co.za/web-design/' },
  { dir: 'seo-marketing', url: 'https://torandigital.co.za/seo-marketing/' },
  { dir: 'vehicle-branding', url: 'https://torandigital.co.za/vehicle-branding/' },
  { dir: 'graphic-design', url: 'https://torandigital.co.za/graphic-design/' },
];

servicePages.forEach(({ dir, url }) => {
  const fp = path.join(ROOT, dir, 'index.html');
  let c = readFile(fp);

  const hasFaqSection = c.includes('class="faq') || c.includes('id="faq') || c.includes('<details') || c.toLowerCase().includes('frequently asked');
  const hasSchemaFaq = c.includes('"FAQPage"');

  if (hasFaqSection && !hasSchemaFaq) {
    // Extract FAQ items from HTML (basic extraction)
    const faqMatches = [...c.matchAll(/<dt[^>]*>(.*?)<\/dt>\s*<dd[^>]*>(.*?)<\/dd>/gis)];
    let questions = faqMatches.map((m, i) => ({
      '@type': 'Question',
      'name': m[1].replace(/<[^>]+>/g, '').trim(),
      'acceptedAnswer': { '@type': 'Answer', 'text': m[2].replace(/<[^>]+>/g, '').trim() },
    }));

    // Fallback generic FAQ if extraction fails
    if (questions.length === 0) {
      questions = [
        {
          '@type': 'Question',
          'name': 'How much does ' + dir.replace('-', ' ') + ' cost in Johannesburg?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Pricing varies by project scope. Contact Toran Digital for a free, no-obligation quote tailored to your needs.' },
        },
        {
          '@type': 'Question',
          'name': 'How long does the process take?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Timelines depend on the project complexity. Toran Digital works efficiently to deliver results without compromising quality.' },
        },
      ];
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': questions,
    };

    const schemaTag = '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 2) + '\n</script>';
    if (c.includes('</head>')) {
      c = c.replace('</head>', schemaTag + '\n</head>');
      writeFile(fp, c);
      results.push({ file: dir + '/index.html', status: '✅ FAQPage schema added (' + questions.length + ' Q&As)' });
    }
  } else if (hasSchemaFaq) {
    results.push({ file: dir + '/index.html', status: '✅ FAQPage already present' });
  } else {
    results.push({ file: dir + '/index.html', status: '⚠️  No FAQ section detected — add FAQ HTML first, then re-run' });
  }
});

// ── MAIN ─────────────────────────────────────────────────────────────────────
console.log('\n🚀 Toran Digital — Phase 2 Schema Fixes\n' + '━'.repeat(50));
results.forEach(({ file, status }) => {
  console.log('   ' + file + ': ' + status);
});
console.log('\n' + '━'.repeat(50));
console.log('✅ Phase 2 Complete!\n');
