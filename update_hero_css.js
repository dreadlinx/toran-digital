const fs = require('fs');

let css = fs.readFileSync('index.css', 'utf8');

// Replace hero-bg and hero-pattern for Editorial feel
css = css.replace(/\.hero-bg::before \{[\s\S]*?\}\n\n\.hero-bg::after \{[\s\S]*?\}/, `.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
}

.hero-bg::after {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: radial-gradient(circle at center, transparent 30%, var(--bg-primary) 80%);
  pointer-events: none;
  z-index: 2;
}`);

css = css.replace(/\.hero-pattern \{[\s\S]*?\}/, `.hero-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: linear-gradient(var(--slate-200) 1px, transparent 1px), linear-gradient(90deg, var(--slate-200) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.4;
  mask-image: linear-gradient(to bottom, black 20%, transparent 80%);
  -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 80%);
}`);

// Make H1 huge and editorial
css = css.replace(/font-size: clamp\(2\.8rem, 5vw, 4\.2rem\);/, `font-size: clamp(3rem, 7vw, 5.5rem);\n  line-height: 1.05;\n  letter-spacing: -0.03em;\n  text-transform: uppercase;\n  font-weight: 800;`);
css = css.replace(/font-size: clamp\(1\.1rem, 1\.5vw, 1\.25rem\);/, `font-size: clamp(1.1rem, 1.5vw, 1.35rem);\n  font-weight: 400;`);

// Style the highlight specifically for editorial look
css = css.replace(/\.highlight \{[\s\S]*?\}/, `.highlight {
  display: inline-block;
  background: var(--dark-900);
  color: var(--white);
  padding: 0 0.5rem;
  font-style: italic;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  transform: skewX(-10deg);
}`);

// Fix hero-badge for editorial
css = css.replace(/\.hero-badge \{[\s\S]*?\}/, `.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  background: transparent;
  border: 1px solid var(--dark-900);
  border-radius: 0;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--dark-900);
  margin-bottom: var(--space-xl);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`);

css = css.replace(/\.hero-badge \.dot \{[\s\S]*?\}/, `.hero-badge .dot {
  width: 8px;
  height: 8px;
  background: var(--accent-600);
  border-radius: 50%;
  animation: pulse 2s infinite;
}`);

fs.writeFileSync('index.css', css);
console.log('Hero CSS updated for Editorial');
