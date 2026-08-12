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
    
    // Determine path prefix (e.g. '../' or './' or '../../')
    // Get depth relative to root
    const relPath = path.relative(dir, file);
    const depth = relPath.split(path.sep).length - 1;
    let prefix = depth === 0 ? './' : '../'.repeat(depth);
    if (depth === 0 && file.endsWith('index.html')) {
        prefix = '';
    }
    
    // 1. Desktop Nav - insert Blog before Contact
    // Look for `<a href="contact/">Contact</a>` or `<a href="../contact/">Contact</a>`
    content = content.replace(/(<a href="[^"]*contact\/">Contact<\/a>)/, `<a href="${prefix}blog/">Blog</a>\n          $1`);
    
    // 2. Mobile Nav - insert Blog before Contact
    content = content.replace(/(<a href="[^"]*contact\/" class="mobile-nav-link">Contact<\/a>)/, `<a href="${prefix}blog/" class="mobile-nav-link">Blog</a>\n    $1`);
    
    // 3. Footer Resources Column
    const resourcesCol = `
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="${prefix}blog/">Our Blog</a></li>
            <li><a href="${prefix}blog/website-cost-johannesburg/">Web Design Costs</a></li>
            <li><a href="${prefix}blog/seo-guide-johannesburg-businesses/">Local SEO Guide</a></li>
            <li><a href="${prefix}blog/vehicle-branding-roi/">Vehicle Wrap ROI</a></li>
            <li><a href="${prefix}blog/dstv-signal-problems/">DSTV Signal Fixes</a></li>
          </ul>
        </div>
`;
    // Insert before Contact Details
    content = content.replace(/(<div class="footer-col">\s*<h4>Contact Details<\/h4>)/, resourcesCol + '        $1');
    
    // 4. Footer Bottom (Privacy Policy and Terms)
    content = content.replace(
        /<div class="footer-bottom">/, 
        `<div class="footer-bottom" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">`
    );
    content = content.replace(
        /<p>&copy; 2026 Toran Digital\. All Rights Reserved\.<\/p>/,
        `<p>&copy; 2026 Toran Digital. All Rights Reserved. | <a href="${prefix}privacy-policy/" style="color: inherit; text-decoration: none;">Privacy Policy</a> | <a href="${prefix}terms/" style="color: inherit; text-decoration: none;">Terms & Conditions</a></p>`
    );
    
    // 5. Contact Form (Option A)
    if (file.includes('contact')) {
        content = content.replace(/<form class="contact-form">/, `<form class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">`);
        content = content.replace(/<button type="submit" class="btn btn-primary" style="width: 100%;">Send Message<\/button>/, `<button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>`);
    }

    // 6. Homepage Schema Updates
    if (depth === 0 && file.endsWith('index.html')) {
        // Find LocalBusiness schema and add areaServed
        if (content.includes('"@type": "LocalBusiness"')) {
            content = content.replace(/"addressCountry": "ZA"/, `"addressCountry": "ZA"
    },
    "areaServed": [
      {"@type": "City", "name": "Johannesburg"},
      {"@type": "City", "name": "Sandton"},
      {"@type": "City", "name": "Benoni"},
      {"@type": "City", "name": "Boksburg"},
      {"@type": "City", "name": "Randburg"},
      {"@type": "City", "name": "Midrand"},
      {"@type": "City", "name": "Edenvale"},
      {"@type": "City", "name": "Kempton Park"}
    ]`);
        }
    }

    // 7. FAQ Schema Injection
    if (content.includes('faq-item')) {
        // Simple regex to extract Q and A
        const faqBlocks = [...content.matchAll(/<div class="faq-item".*?>\s*<h3.*?>(.*?)<\/h3>\s*<p.*?>(.*?)<\/p>/g)];
        if (faqBlocks.length > 0) {
            let faqSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
`;
            faqBlocks.forEach((block, index) => {
                const q = block[1].replace(/"/g, "'");
                const a = block[2].replace(/"/g, "'");
                faqSchema += `        {
          "@type": "Question",
          "name": "${q}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${a}"
          }
        }${index === faqBlocks.length - 1 ? '' : ','}\n`;
            });
            faqSchema += `      ]
    }
    </script>`;
            // insert before </head>
            if (!content.includes('"@type": "FAQPage"')) {
                content = content.replace('</head>', faqSchema + '\n</head>');
            }
        }
    }
    
    fs.writeFileSync(file, content);
});

console.log('Global elements updated across all files.');
