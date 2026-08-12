const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

function removeBrokenSocialLinks(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && item !== '.agents' && item !== 'assets' && item !== 'logo') {
            removeBrokenSocialLinks(fullPath);
        } else if (stat.isFile() && fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            
            // Regex to match <a href="#" ...>...</a> that contains social icons. 
            // It might span multiple lines if formatted that way.
            // A simple regex to remove any <a href="#" class="social-link"...>...</a>
            // Note: Since HTML can be tricky, we can use a regex that matches the opening tag, anything inside until the closing </a>
            const before = content;
            content = content.replace(/<a\s+href="#"\s+class="social-link"[^>]*>[\s\S]*?<\/a>/gi, '');
            
            if (before !== content) {
                fs.writeFileSync(fullPath, content);
                console.log(`Removed broken social links in ${path.relative(dir, fullPath)}`);
            }
        }
    }
}

removeBrokenSocialLinks(dir);
