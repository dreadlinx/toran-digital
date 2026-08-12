const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

const filesToMove = [
  'about.html',
  'services.html',
  'web-design.html',
  'mobile-apps.html',
  'seo-marketing.html',
  'vehicle-branding.html',
  'dstv-installations.html',
  'graphic-design.html',
  'portfolio.html',
  'contact.html',
  'areas.html',
  'web-design-sandton.html',
  'web-design-pretoria.html',
  'vehicle-branding-germiston.html',
  'dstv-installation-bedfordview.html'
];

// Read all HTML files in the root first
const allFiles = fs.readdirSync(dir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

function processHtml(content, isRoot) {
    let newContent = content;

    // 1. Replace links to moved pages
    filesToMove.forEach(page => {
        const folderName = page.replace('.html', '');
        // e.g. href="about.html" or href="about.html#anchor"
        const regex = new RegExp(`href=["']${page}(#.*?)?["']`, 'g');
        newContent = newContent.replace(regex, (match, hash) => {
            const h = hash || '';
            if (isRoot) {
                return `href="${folderName}/${h}"`;
            } else {
                return `href="../${folderName}/${h}"`;
            }
        });
    });

    // 2. Replace links to index.html
    newContent = newContent.replace(/href=["']index\.html(#.*?)?["']/g, (match, hash) => {
        const h = hash || '';
        return isRoot ? `href="./${h}"` : `href="../${h}"`;
    });

    // 3. Update asset paths if not root
    if (!isRoot) {
        // href="index.css" -> href="../index.css"
        newContent = newContent.replace(/href=["']index\.css["']/g, 'href="../index.css"');
        // src="index.js" -> src="../index.js"
        newContent = newContent.replace(/src=["']index\.js["']/g, 'src="../index.js"');
        // src="assets/..." -> src="../assets/..."
        newContent = newContent.replace(/src=["']assets\//g, 'src="../assets/');
        // href="assets/..." -> href="../assets/..."
        newContent = newContent.replace(/href=["']assets\//g, 'href="../assets/');
        // src="logo/..." -> src="../logo/..."
        newContent = newContent.replace(/src=["']logo\//g, 'src="../logo/');
    }

    return newContent;
}

// First update index.html in place
if (htmlFiles.includes('index.html')) {
    const indexPath = path.join(dir, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf-8');
    content = processHtml(content, true);
    fs.writeFileSync(indexPath, content);
}

// Now process and move the rest
filesToMove.forEach(file => {
    const oldPath = path.join(dir, file);
    if (!fs.existsSync(oldPath)) return;

    let content = fs.readFileSync(oldPath, 'utf-8');
    
    // Process links considering it will be in a 1-level subdirectory
    content = processHtml(content, false);
    
    // Fix canonical tag if it exists
    const folderName = file.replace('.html', '');
    const newCanonical = `https://torandigital.co.za/${folderName}/`;
    content = content.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${newCanonical}">`);

    // Self-link fix: if the file links to itself, it should link to "./"
    content = content.replace(new RegExp(`href=["']\\.\\.\\/${folderName}\\/(#.*?)?["']`, 'g'), 'href="./$1"');

    const newDir = path.join(dir, folderName);
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
    }
    const newPath = path.join(newDir, 'index.html');
    
    fs.writeFileSync(newPath, content);
    fs.unlinkSync(oldPath);
});

console.log("Migration complete.");
