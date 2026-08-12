const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');

// Update buttons for editorial look (sharp edges, bold)
css = css.replace(/\.btn \{[\s\S]*?\}/, `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-sm);
  letter-spacing: 0.05em;
  padding: 0.8rem 1.8rem;
  border-radius: 0;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  text-transform: uppercase;
}`);

css = css.replace(/\.btn-primary \{[\s\S]*?\}/, `.btn-primary {
  background: var(--dark-950);
  color: var(--white);
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}`);

css = css.replace(/\.btn-primary:hover \{[\s\S]*?\}/, `.btn-primary:hover {
  background: var(--dark-950);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--accent-600);
  color: var(--white);
}`);

css = css.replace(/\.btn-outline \{[\s\S]*?\}/, `.btn-outline {
  background: transparent;
  color: var(--dark-950);
  border: 1.5px solid var(--dark-950);
}`);

css = css.replace(/\.btn-outline:hover \{[\s\S]*?\}/, `.btn-outline:hover {
  border-color: var(--dark-950);
  background: var(--dark-950);
  color: var(--white);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--dark-950);
}`);

// Update section label
css = css.replace(/\.section-label \{[\s\S]*?\}/, `.section-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--dark-950);
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}`);
css = css.replace(/\.section-label::before \{[\s\S]*?\}/, `.section-label::before {
  content: '';
  width: 32px;
  height: 2px;
  background: var(--accent-600);
}`);

// Update gradient text to just be italic accent color
css = css.replace(/\.gradient-text \{[\s\S]*?\}/, `.gradient-text {
  color: var(--accent-600);
  font-style: italic;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
}`);

// Make testimonials sharp
css = css.replace(/\.testimonials \{[\s\S]*?\}/, `.testimonials {
  background: var(--dark-950);
  position: relative;
  border-top: 1px solid var(--dark-800);
  border-bottom: 1px solid var(--dark-800);
}`);
css = css.replace(/\.testimonial-card \{[\s\S]*?\}/, `.testimonial-card {
  min-width: 350px;
  max-width: 450px;
  background: var(--dark-900);
  border: 1px solid var(--dark-800);
  border-radius: 0;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  box-shadow: 8px 8px 0px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
}`);

// Add noise to dark background for editorial contrast
css += `\n.testimonials::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  pointer-events: none;
}\n`;

fs.writeFileSync('index.css', css);
console.log('Global CSS updated');
