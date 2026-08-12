const fs = require('fs');
const path = require('path');

// 1. Update index.css
let css = fs.readFileSync('index.css', 'utf8');

// Ensure .hero .container is flex/grid if it isn't already handled by .container itself
if (!css.includes('.hero .container {')) {
  css = css.replace('.hero {', `.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
@media (max-width: 991px) {
  .hero .container {
    grid-template-columns: 1fr;
  }
}
.hero {`);
}

if (!css.includes('.hero-image-wrapper')) {
  css += `\n/* Hero Image additions */
.hero-image-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  animation: revealRight 0.8s ease-out forwards;
  opacity: 0;
}
.hero-image-wrapper img {
  width: 100%;
  height: auto;
  border: 2px solid var(--dark-950);
  box-shadow: 12px 12px 0px var(--accent-600);
  display: block;
}
`;
}
fs.writeFileSync('index.css', css);
console.log('CSS updated');

// 2. Update HTML files
const pages = [
  { path: 'index.html', img: 'assets/placeholder.png', alt: 'Toran Digital' },
  { path: 'about/index.html', img: '../assets/placeholder.png', alt: 'About Toran Digital' },
  { path: 'contact/index.html', img: '../assets/placeholder.png', alt: 'Contact Toran Digital' },
  { path: 'portfolio/index.html', img: '../assets/placeholder.png', alt: 'Toran Digital Portfolio' },
  { path: 'areas/index.html', img: '../assets/placeholder.png', alt: 'Toran Digital Areas' },
  { path: 'blog/index.html', img: '../assets/placeholder.png', alt: 'Toran Digital Blog' }
];

pages.forEach(page => {
  if (fs.existsSync(page.path)) {
    let html = fs.readFileSync(page.path, 'utf8');
    
    // Check if we haven't already added the image
    if (!html.includes('<div class="hero-image-wrapper">')) {
      const imgHtml = `\n        <div class="hero-image-wrapper">\n          <img src="${page.img}" alt="${page.alt}" width="800" height="600">\n        </div>`;
      
      // The hero-content div closes right before the container closes in our structures
      // Let's find the closing tag of hero-content and insert the image wrapper right after it
      // Standard structure: 
      // <div class="hero-content" ...>
      // ...
      // </div>
      // </div> <!-- container -->
      
      // regex to find the end of hero-content block based on known structure
      // Instead of complex regex, let's just do a targeted replace
      html = html.replace(/(<\/div>\s*)(<\/div>\s*<\/section>)/, `$1${imgHtml}\n      $2`);
      fs.writeFileSync(page.path, html);
      console.log('Updated ' + page.path);
    }
  }
});
