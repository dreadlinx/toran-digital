const fs = require('fs');
const path = require('path');

const dir = __dirname;

function findHtmlFiles(currentDir, fileList = []) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        if (file.startsWith('.') || file === 'node_modules') return;
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
let updatedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if already updated
    if (content.includes('Popular Locations')) return;

    // Determine path prefix
    const relPath = path.relative(dir, file);
    const depth = relPath.split(path.sep).length - 1;
    let prefix = depth === 0 ? './' : '../'.repeat(depth);
    if (depth === 0 && file.endsWith('index.html')) {
        prefix = '';
    }

    const locationsCol = `
        <div class="footer-col">
          <h4>Popular Locations</h4>
          <ul>
            <li><a href="${prefix}web-design-sandton/">Web Design Sandton</a></li>
            <li><a href="${prefix}web-design-fourways/">Web Design Fourways</a></li>
            <li><a href="${prefix}web-design-centurion/">Web Design Centurion</a></li>
            <li><a href="${prefix}vehicle-branding-kempton-park/">Vehicle Wrapping Isando</a></li>
            <li><a href="${prefix}dstv-installation-edenvale/">DSTV Edenvale</a></li>
            <li><a href="${prefix}areas/">All Coverage Areas &rarr;</a></li>
          </ul>
        </div>
`;

    // Insert before Contact Details in footer
    if (content.includes('<h4>Contact Details</h4>')) {
        content = content.replace(/(<div class="footer-col">\s*<h4>Contact Details<\/h4>)/, locationsCol + '        $1');
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Successfully added Popular Locations footer column to ${updatedCount} HTML files.`);
