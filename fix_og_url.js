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
    let changed = false;

    // Find Canonical
    const canRegex = /<link rel="canonical" href="([^"]+)">/;
    const match = content.match(canRegex);
    if (match) {
        const canonicalUrl = match[1];
        
        // Find og:url
        const ogUrlRegex = /<meta property="og:url" content="[^"]*">/g;
        if (ogUrlRegex.test(content)) {
            content = content.replace(ogUrlRegex, `<meta property="og:url" content="${canonicalUrl}">`);
            changed = true;
        } else {
            // If missing, add it before </head>
            // Actually it's safer not to inject unless we have to, but having og:url is good practice.
            // I'll just replace existing ones as that's where the old URLs were living.
        }
    }

    if (changed) {
        fs.writeFileSync(file, content);
    }
});
console.log('OG URLs updated to match canonical URLs.');
