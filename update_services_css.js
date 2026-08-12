const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Update services grid
css = css.replace(/\.services-grid \{[\s\S]*?\}/, `.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(340px, auto);
  gap: var(--space-xl);
  /* Editorial: masonry style or distinct gap */
}`);

// Update service card
css = css.replace(/\.service-card \{[\s\S]*?\}/, `.service-card {
  background: var(--white);
  border: 1.5px solid var(--dark-900);
  border-radius: 0;
  padding: var(--space-2xl);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.05);
}`);

// Hover effects neo-brutalist
css = css.replace(/\.service-card:hover \{[\s\S]*?\}/, `.service-card:hover {
  border-color: var(--dark-900);
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px var(--dark-900);
}`);

// Update card top line
css = css.replace(/\.service-card::before \{[\s\S]*?\}/, `.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--accent-600);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 3;
}`);

// Add noise to services section
css = css.replace(/\.services \{[\s\S]*?\}/, `.services {
  background: var(--bg-primary);
  position: relative;
}
.services::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
}`);

// Update Typography for Service Cards
css = css.replace(/font-size: var\(--text-xl\);\n  font-weight: 700;/g, `font-family: var(--font-display);\n  font-size: var(--text-2xl);\n  font-weight: 800;\n  letter-spacing: -0.02em;`);

fs.writeFileSync('index.css', css);
console.log('Services CSS updated');
