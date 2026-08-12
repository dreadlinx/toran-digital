const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

function addCanonicalToDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && item !== '.agents' && item !== 'assets' && item !== 'logo') {
            addCanonicalToDir(fullPath);
        } else if (stat.isFile() && fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            
            // Generate canonical URL
            let canonicalUrl = 'https://torandigital.co.za/';
            let relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
            if (relPath === 'index.html') {
                canonicalUrl = 'https://torandigital.co.za/';
            } else {
                // e.g. about/index.html -> https://torandigital.co.za/about/
                // e.g. blog/seo-guide.html -> https://torandigital.co.za/blog/seo-guide.html
                if (relPath.endsWith('index.html')) {
                    canonicalUrl = `https://torandigital.co.za/${relPath.replace('index.html', '')}`;
                } else {
                    canonicalUrl = `https://torandigital.co.za/${relPath}`;
                }
            }

            // Check if canonical exists
            if (content.includes('<link rel="canonical"')) {
                content = content.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}">`);
            } else {
                // Insert after author meta tag
                const authorRegex = /<meta name="author"[^>]*>/;
                if (authorRegex.test(content)) {
                    content = content.replace(authorRegex, (match) => `${match}\n  <link rel="canonical" href="${canonicalUrl}">`);
                } else {
                    // Fallback to before </head>
                    content = content.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}">\n</head>`);
                }
            }

            fs.writeFileSync(fullPath, content);
            console.log(`Updated canonical for ${relPath}`);
        }
    }
}

addCanonicalToDir(dir);
