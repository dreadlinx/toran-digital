const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

if (!html.includes('three.min.js')) {
  html = html.replace('</head>', '  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n</head>');
}

html = html.replace(
  /<img src="assets\/brutalist_3d_hero\.png" alt="Toran Digital" width="800" height="600">/,
  '<div id="hero-3d-canvas" style="width: 100%; height: 600px; cursor: grab;"></div>'
);

if (!html.includes('hero-3d.js')) {
  html = html.replace('</body>', '  <script src="hero-3d.js"></script>\n</body>');
}

fs.writeFileSync('index.html', html);
console.log('HTML updated with 3D canvas');
