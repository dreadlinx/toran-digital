const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

const oldUrls = [
    ['web-design-sandton', 'web-design/sandton'],
    ['web-design-benoni', 'web-design/benoni'],
    ['web-design-pretoria', 'web-design/pretoria'],
    ['web-design-randburg', 'web-design/randburg'],
    ['web-design-midrand', 'web-design/midrand'],
    ['vehicle-branding-benoni', 'vehicle-branding/benoni'],
    ['vehicle-branding-germiston', 'vehicle-branding/germiston'],
    ['dstv-installation-bedfordview', 'dstv-installations/bedfordview'],
    ['dstv-installation-benoni', 'dstv-installations/benoni'],
    ['dstv-installation-boksburg', 'dstv-installations/boksburg']
];

oldUrls.forEach(([oldFolder, newFolder]) => {
    const filePath = path.join(dir, newFolder, 'index.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find `"url": "https://torandigital.co.za/oldFolder/"`
        const regex = new RegExp(`"url":\\s*"https://torandigital\\.co\\.za/${oldFolder}/?"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `"url": "https://torandigital.co.za/${newFolder}/"`);
            fs.writeFileSync(filePath, content);
        }
    }
});
console.log('Schema URLs updated.');
