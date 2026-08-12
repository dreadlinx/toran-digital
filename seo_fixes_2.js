const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

const locationsMap = {
  'web-design-sandton': 'web-design/sandton',
  'web-design-benoni': 'web-design/benoni',
  'web-design-pretoria': 'web-design/pretoria',
  'web-design-randburg': 'web-design/randburg',
  'web-design-midrand': 'web-design/midrand',
  'vehicle-branding-benoni': 'vehicle-branding/benoni',
  'vehicle-branding-germiston': 'vehicle-branding/germiston',
  'dstv-installation-bedfordview': 'dstv-installations/bedfordview',
  'dstv-installation-benoni': 'dstv-installations/benoni',
  'dstv-installation-boksburg': 'dstv-installations/boksburg'
};

const uniqueParagraphs = {
  'web-design-sandton': `<p style="margin-bottom: 2rem;">Sandton is Johannesburg's financial hub, home to the JSE, major banks, and thousands of professional service firms. Our Sandton web design clients include financial advisors, legal practices, luxury retail brands, and corporate consultancies who need websites that project authority and convert high-value leads.</p>`,
  'web-design-benoni': `<p style="margin-bottom: 2rem;">Benoni and the broader East Rand corridor is a major industrial and logistics hub. Our Benoni web design work covers manufacturing businesses, trade suppliers, automotive dealers, and local retailers looking to capture online customers across Ekurhuleni.</p>`,
  'web-design-pretoria': `<p style="margin-bottom: 2rem;">Pretoria's business community spans government contractors, tech startups in the innovation district, healthcare providers, and educational institutions. Our Pretoria web design team understands the capital city's unique market dynamics and builds sites optimised for both B2B and B2C audiences.</p>`,
  'web-design-randburg': `<p style="margin-bottom: 2rem;">Randburg is home to a massive mix of creative agencies, IT services, and suburban retail centres like Cresta. We help Randburg businesses stand out in a dense market by building lightning-fast, high-converting websites that dominate local search results.</p>`,
  'web-design-midrand': `<p style="margin-bottom: 2rem;">Positioned right between Johannesburg and Pretoria, Midrand's booming business parks and logistics centres require serious digital infrastructure. We build custom web apps and corporate portals tailored for Midrand's B2B distribution and tech sectors.</p>`,
  'vehicle-branding-benoni': `<p style="margin-bottom: 2rem;">Benoni's industrial zones in Apex and Benoni South are packed with logistics, construction, and plumbing businesses. Our heavy-duty vehicle wraps are designed to withstand East Rand construction sites and highway driving, turning every bakkie into a mobile billboard.</p>`,
  'vehicle-branding-germiston': `<p style="margin-bottom: 2rem;">As a core manufacturing and freight hub in Gauteng, Germiston relies on commercial fleets. We specialize in high-visibility fleet branding and truck wraps for Germiston logistics companies to ensure maximum brand exposure on the N3 and N17 highways.</p>`,
  'dstv-installation-bedfordview': `<p style="margin-bottom: 2rem;">Bedfordview's residential estates and commercial office parks demand premium audio-visual setups. Our accredited technicians provide discreet, high-end DSTV Explora installations, Extra View setups, and CCTV camera mounting for Bedfordview properties.</p>`,
  'dstv-installation-benoni': `<p style="margin-bottom: 2rem;">From the sprawling estates in Rynfield to the bustling businesses in Northmead, our Benoni DSTV installers offer rapid, same-day call-outs. We fix E48-32 signal errors quickly and offer professional TV wall-mounting services across the East Rand.</p>`,
  'dstv-installation-boksburg': `<p style="margin-bottom: 2rem;">Boksburg's diverse mix of suburban homes in Sunward Park and commercial hubs near the East Rand Mall require reliable connectivity. We handle everything from communal dish installations for Boksburg complexes to home CCTV security setups.</p>`
};

// 1. Move files and update content
for (const [oldFolder, newRelPath] of Object.entries(locationsMap)) {
    const oldPath = path.join(dir, oldFolder, 'index.html');
    if (!fs.existsSync(oldPath)) {
        console.warn(`File not found: ${oldPath}`);
        continue;
    }
    
    let content = fs.readFileSync(oldPath, 'utf8');

    // Fix 9: Inject unique paragraph
    // Let's insert it after the main H2 in the content block
    // "Grow Your Sandton Business <span class="gradient-text">With Premium Design</span></h2>"
    // The previous script might have changed it to H2_1. We can just insert it before the first `<ul class="pricing-features"` or after `<h2 class="section-title">...</h2>`
    const h2Match = content.match(/<h2 class="section-title">.*?<\/h2>/);
    if (h2Match) {
        content = content.replace(h2Match[0], h2Match[0] + '\n            ' + uniqueParagraphs[oldFolder]);
    } else {
        // Fallback: inject after section-subtitle
        content = content.replace(/<\/h1>[\s\S]*?<\/p>/, `$& \n            ${uniqueParagraphs[oldFolder]}`);
    }

    // Fix 10: Update canonical URL
    const canonicalMatch = content.match(/<link rel="canonical" href="https:\/\/torandigital\.co\.za\/(.*?)\/">/);
    if (canonicalMatch) {
        content = content.replace(canonicalMatch[0], `<link rel="canonical" href="https://torandigital.co.za/${newRelPath}/">`);
    }

    // Adjust relative paths (increase depth by 1)
    // href="../" becomes href="../../"
    content = content.replace(/(href|src)="(\.\.\/)/g, '$1../../');
    // Also cover href="./" to href="../" (which was for root level links, but now needs to go up 1)
    // Wait, href="./" for index.html links to current dir. 
    // Actually, root links are all ../ in a 1-deep folder. The logo is ../logo/ etc.
    // If we changed ../ to ../../ we are good.

    // Write to new location
    const newDir = path.join(dir, ...newRelPath.split('/'));
    if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });
    
    fs.writeFileSync(path.join(newDir, 'index.html'), content);
}

// 2. Update links across all HTML files
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

    for (const [oldFolder, newRelPath] of Object.entries(locationsMap)) {
        // e.g. replace "web-design-sandton/" with "web-design/sandton/"
        const regex = new RegExp(`href="([^"]*?)${oldFolder}/"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `href="$1${newRelPath}/"`);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content);
    }
});

// 3. Delete old folders
for (const oldFolder of Object.keys(locationsMap)) {
    const oldDirPath = path.join(dir, oldFolder);
    if (fs.existsSync(oldDirPath)) {
        fs.rmSync(oldDirPath, { recursive: true, force: true });
    }
}

// 4. Create .htaccess file
const htaccessContent = `
RewriteEngine On
Redirect 301 /web-design-sandton/ https://torandigital.co.za/web-design/sandton/
Redirect 301 /web-design-benoni/ https://torandigital.co.za/web-design/benoni/
Redirect 301 /web-design-pretoria/ https://torandigital.co.za/web-design/pretoria/
Redirect 301 /web-design-randburg/ https://torandigital.co.za/web-design/randburg/
Redirect 301 /web-design-midrand/ https://torandigital.co.za/web-design/midrand/
Redirect 301 /vehicle-branding-benoni/ https://torandigital.co.za/vehicle-branding/benoni/
Redirect 301 /vehicle-branding-germiston/ https://torandigital.co.za/vehicle-branding/germiston/
Redirect 301 /dstv-installation-bedfordview/ https://torandigital.co.za/dstv-installations/bedfordview/
Redirect 301 /dstv-installation-benoni/ https://torandigital.co.za/dstv-installations/benoni/
Redirect 301 /dstv-installation-boksburg/ https://torandigital.co.za/dstv-installations/boksburg/
`;

fs.writeFileSync(path.join(dir, '.htaccess'), htaccessContent.trim());

console.log('Fix 9 and Fix 10 complete. .htaccess generated.');
