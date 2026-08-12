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
    let originalContent = content;

    // 1. Fix broken src and href tags on location pages
    content = content.replace(/src\.\.\/\.\.\//g, 'src="../../');
    content = content.replace(/href\.\.\/\.\.\//g, 'href="../../');

    // 2. Fix NAP inconsistency
    content = content.replace(/123 Main Street, Johannesburg, Gauteng, 2000/g, '14 Jordaan Street, Putfontein, Benoni, 1501');
    content = content.replace(/"streetAddress":\s*"123 Main Street"/g, '"streetAddress": "14 Jordaan Street"');
    content = content.replace(/"addressLocality":\s*"Johannesburg"/g, '"addressLocality": "Benoni"');
    content = content.replace(/"postalCode":\s*"2000"/g, '"postalCode": "1501"');

    // 3. Fix typography: ... to …
    content = content.replace(/placeholder="Tell us about your project\.\.\."/g, 'placeholder="Tell us about your project…"');
    content = content.replace(/placeholder="Select a service\.\.\."/g, 'placeholder="Select a service…"');
    
    // 4. Fix curly quotes in testimonials
    content = content.replace(/"Toran Digital overhauled our website and SEO/g, '“Toran Digital overhauled our website and SEO');
    content = content.replace(/support is incredible\."/g, 'support is incredible.”');

    // 5. Add Skip to main content link
    if (content.includes('<body') && !content.includes('class="skip-link"')) {
        content = content.replace(/(<body[^>]*>)/, '$1\n    <a href="#main-content" class="skip-link">Skip to main content</a>');
    }
    
    // 6. Ensure main tag has id="main-content"
    if (content.includes('<main') && !content.includes('id="main-content"')) {
        content = content.replace(/<main([^>]*)>/, '<main id="main-content"$1>');
    }

    // 7. Add autocomplete to inputs
    content = content.replace(/<input type="text" id="name"(?!.*autocomplete) required placeholder="John Doe">/g, '<input type="text" id="name" name="name" autocomplete="name" required placeholder="John Doe">');
    content = content.replace(/<input type="email" id="email"(?!.*autocomplete) required placeholder="name@company\.co\.za">/g, '<input type="email" id="email" name="email" autocomplete="email" required placeholder="name@company.co.za">');
    content = content.replace(/<input type="text" id="name" name="name" placeholder="e\.g\. John Smith" required(?!.*autocomplete)>/g, '<input type="text" id="name" name="name" autocomplete="name" placeholder="e.g. John Smith" required>');
    content = content.replace(/<input type="email" id="email" name="email" placeholder="e\.g\. john@company\.co\.za" required(?!.*autocomplete)>/g, '<input type="email" id="email" name="email" autocomplete="email" placeholder="e.g. john@company.co.za" required>');
    content = content.replace(/<input type="tel" id="phone" name="phone" placeholder="e\.g\. 069 621 9479"(?!.*autocomplete)>/g, '<input type="tel" id="phone" name="phone" autocomplete="tel" placeholder="e.g. 069 621 9479">');

    // 8. Add aspect-ratio to placeholders
    content = content.replace(/<img src=".*?assets\/placeholder\.png"([^>]*)>/g, (match, p1) => {
        if (!p1.includes('aspect-ratio') && !p1.includes('width=')) {
            if (p1.includes('style="')) {
                return `<img src="../assets/placeholder.png"${p1.replace('style="', 'style="aspect-ratio: 16/9; object-fit: cover; ')}>`;
            } else {
                return `<img src="../assets/placeholder.png" style="aspect-ratio: 16/9; object-fit: cover;"${p1}>`;
            }
        }
        return match;
    });

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated HTML: ${file}`);
    }
});

// Fix CSS
const cssPath = path.join(dir, 'index.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    let originalCss = cssContent;

    // 1. Transition: all -> specific properties
    cssContent = cssContent.replace(/transition:\s*all([^;]*);/g, 'transition: background-color$1, color$1, border-color$1, transform$1, opacity$1, box-shadow$1;');

    // 2. Focus -> focus-visible
    cssContent = cssContent.replace(/\.form-group input:focus,\s*\n\.form-group select:focus,\s*\n\.form-group textarea:focus/g, '.form-group input:focus-visible,\n.form-group select:focus-visible,\n.form-group textarea:focus-visible');
    
    // Add focus ring to form controls
    if (!cssContent.includes('.form-group input:focus-visible {')) {
        cssContent = cssContent.replace(/\.form-group input:focus-visible,\s*\n\.form-group select:focus-visible,\s*\n\.form-group textarea:focus-visible\s*\{([\s\S]*?)\}/g, '.form-group input:focus-visible,\n.form-group select:focus-visible,\n.form-group textarea:focus-visible {$1\n  outline: 2px solid var(--teal-500);\n  outline-offset: 2px;\n}');
    }

    // 3. Skip link CSS
    if (!cssContent.includes('.skip-link')) {
        cssContent += `\n
/* ========================
   ACCESSIBILITY
   ======================== */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--teal-600);
  color: white;
  padding: 8px;
  z-index: 10000;
  transition: top 0.2s ease;
}
.skip-link:focus-visible {
  top: 0;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}
section[id] {
  scroll-margin-top: 100px;
}
`;
    }

    if (cssContent !== originalCss) {
        fs.writeFileSync(cssPath, cssContent, 'utf8');
        console.log(`Updated CSS: ${cssPath}`);
    }
}

// Fix Sitemap
const sitemapPath = path.join(dir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const origSitemap = sitemap;
    
    // Remove privacy-policy and terms from sitemap
    sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/torandigital\.co\.za\/privacy-policy\/<\/loc>[\s\S]*?<\/url>/g, '');
    sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/torandigital\.co\.za\/terms\/<\/loc>[\s\S]*?<\/url>/g, '');
    
    if (sitemap !== origSitemap) {
        fs.writeFileSync(sitemapPath, sitemap, 'utf8');
        console.log(`Updated sitemap.xml`);
    }
}

console.log('All automated fixes applied.');
