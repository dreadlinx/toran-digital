const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

function findHtmlFiles(currentDir, fileList = []) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        const filePath = path.join(currentDir, file);
        try {
            if (fs.statSync(filePath).isDirectory()) {
                if (!file.startsWith('.') && file !== 'node_modules' && file !== 'logo' && file !== 'assets') {
                    findHtmlFiles(filePath, fileList);
                }
            } else if (filePath.endsWith('.html')) {
                fileList.push(filePath);
            }
        } catch(e) {}
    });
    return fileList;
}

console.log('--- STARTING UI FIXES ---');

// 1. Fix CSS
const cssPath = path.join(dir, 'index.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    
    // Add focus-visible
    if (!css.includes(':focus-visible {')) {
        css = css.replace(/outline: none;/g, 'outline: none;\n}\n\n*:focus-visible {\n  outline: 2px solid var(--teal-400);\n  outline-offset: 4px;\n  border-radius: 2px;\n}');
    }

    // Fix prefers-reduced-motion
    if (css.includes('@media (prefers-reduced-motion: reduce) {')) {
        const oldMotion = `@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }`;
        const newMotion = `@media (prefers-reduced-motion: reduce) {
  /* Disable slide motion but keep fade-in for reveal animations */
  .reveal, .reveal-left, .reveal-right, .reveal-zoom {
    transform: none !important;
  }
  *, *::before, *::after {
    scroll-behavior: auto !important;
  }
}`;
        css = css.replace(/@media \(prefers-reduced-motion[\s\S]*?\}\s*\}/, newMotion);
    }
    
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('✅ Updated index.css (focus states & reduced motion)');
}

// 2. Fix HTML files
const htmlFiles = findHtmlFiles(dir);
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix SVGs (add aria-hidden="true" to decorative chevrons)
    content = content.replace(/<svg class="chevron-down"/g, '<svg class="chevron-down" aria-hidden="true"');
    content = content.replace(/<svg class="chevron-right"/g, '<svg class="chevron-right" aria-hidden="true"');
    
    // Fix ellipses
    content = content.replace(/"Sending..."/g, '"Sending…"');

    // Fix Image Dimensions
    // Match <img ...> that do NOT have width or height attributes
    // To be safe, we just match placeholder.png and inject width/height if missing
    content = content.replace(/<img([^>]*)src="([^"]*placeholder\.png)"([^>]*)>/g, (match, p1, p2, p3) => {
        let newImg = match;
        if (!newImg.includes('width=')) {
            newImg = newImg.replace('>', ' width="800" height="450">');
        }
        return newImg;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log(`✅ Updated HTML files (ARIA tags, image dimensions, typography)`);

// Check index.js for sending state
const jsPath = path.join(dir, 'index.js');
if (fs.existsSync(jsPath)) {
    let js = fs.readFileSync(jsPath, 'utf8');
    if (js.includes('Sending...')) {
        js = js.replace(/Sending\.\.\./g, 'Sending…');
        fs.writeFileSync(jsPath, js, 'utf8');
        console.log('✅ Updated index.js typography');
    }
}

console.log('--- UI FIXES COMPLETE ---');
