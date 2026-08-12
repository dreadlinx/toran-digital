const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';
const baseUrl = 'https://torandigital.co.za';

function findHtmlFiles(currentDir, fileList = []) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        const filePath = path.join(currentDir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('index.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = findHtmlFiles(dir);

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

htmlFiles.forEach(file => {
    let relPath = path.relative(dir, file).replace(/\\/g, '/');
    if (relPath === 'index.html') relPath = '';
    else relPath = relPath.replace('/index.html', '/');
    
    // Priority logic
    let priority = 0.8;
    if (relPath === '') {
        priority = 1.0;
    } else if (/^(web-design|seo-marketing|vehicle-branding|mobile-apps|dstv-installations|graphic-design)\/?$/.test(relPath)) {
        priority = 0.9;
    } else if (relPath.includes('blog/')) {
        priority = relPath === 'blog/' ? 0.8 : 0.7; // Blog index 0.8, posts 0.7
    } else if (relPath.includes('privacy-policy') || relPath.includes('terms')) {
        priority = 0.3;
    } else if (/^(about|portfolio|contact)\/?$/.test(relPath)) {
        priority = 0.8;
    } else {
        // Location pages will be here (e.g. web-design/sandton/)
        priority = 0.8;
    }
    
    sitemap += `  <url>
    <loc>${baseUrl}/${relPath}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);

console.log('sitemap.xml created successfully.');
