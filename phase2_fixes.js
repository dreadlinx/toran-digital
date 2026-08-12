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

    // Determine the depth of the file to build relative paths for favicon
    const relativePath = path.relative(dir, file);
    const depth = relativePath.split(path.sep).length - 1;
    const prefix = depth === 0 ? '' : '../'.repeat(depth);

    // 1. Favicons
    if (!content.includes('rel="icon"')) {
        const favicons = `
  <!-- Favicons -->
  <link rel="icon" type="image/png" href="${prefix}logo/Gemini_Generated_Image_.png">
  <link rel="apple-touch-icon" href="${prefix}logo/Gemini_Generated_Image_.png">`;
        content = content.replace(/<\/head>/, `${favicons}\n</head>`);
    }

    // 2. Twitter Card
    if (!content.includes('name="twitter:card"')) {
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        const descMatch = content.match(/<meta name="description" content="(.*?)">/);
        
        const title = titleMatch ? titleMatch[1] : 'Toran Digital';
        const desc = descMatch ? descMatch[1] : 'Premium digital agency offering custom web design, mobile app development, SEO, vehicle wraps, and home installations in Johannesburg, Gauteng.';

        const twitterCard = `
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">`;
        content = content.replace(/<\/head>/, `${twitterCard}\n</head>`);
    }

    // 3. Open Graph (OG)
    if (!content.includes('property="og:image"')) {
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        const descMatch = content.match(/<meta name="description" content="(.*?)">/);
        
        const title = titleMatch ? titleMatch[1] : 'Toran Digital';
        const desc = descMatch ? descMatch[1] : 'Premium digital agency offering custom web design, mobile app development, SEO, vehicle wraps, and home installations in Johannesburg, Gauteng.';
        
        let urlPath = relativePath.replace(/\\/g, '/').replace('index.html', '');
        const ogUrl = `https://torandigital.co.za/${urlPath}`;

        const ogTags = `
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${ogUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/png">`;
        content = content.replace(/<\/head>/, `${ogTags}\n</head>`);
    }

    // 4. Google Fonts preconnect for location pages
    if (!content.includes('fonts.googleapis.com') && file.includes('index.html')) {
        const preconnect = `
  <!-- Google Fonts preloaded for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"></noscript>`;
        content = content.replace(/<\/head>/, `${preconnect}\n</head>`);
    }

    // 5. Remove irrelevant keywords from blog pages
    if (relativePath.startsWith('blog') && relativePath !== 'blog\\index.html') {
        content = content.replace(/<meta name="keywords" content=".*?">/g, '');
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated HTML: ${file}`);
    }
});

// Fix .htaccess
const htaccessPath = path.join(dir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
    let htaccess = fs.readFileSync(htaccessPath, 'utf8');
    if (!htaccess.includes('RewriteCond %{HTTPS} off')) {
        const httpsRedirect = `\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n`;
        htaccess = htaccess.replace('RewriteEngine On', 'RewriteEngine On' + httpsRedirect);
        fs.writeFileSync(htaccessPath, htaccess, 'utf8');
        console.log('Updated .htaccess with HTTPS redirect.');
    }
}

console.log('Phase 2 fixes applied.');
