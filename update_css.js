const fs = require('fs');

let css = fs.readFileSync('index.css', 'utf8');

// Replace typography
css = css.replace(/--font-display: 'Outfit', sans-serif;/g, "--font-display: 'Syne', sans-serif;");
css = css.replace(/--font-body: 'DM Sans', sans-serif;/g, "--font-body: 'Manrope', sans-serif;");

// Replace color names globally
css = css.replace(/--navy-950/g, '--dark-950');
css = css.replace(/--navy-900/g, '--dark-900');
css = css.replace(/--navy-800/g, '--dark-800');
css = css.replace(/--navy-700/g, '--dark-700');
css = css.replace(/--navy-600/g, '--dark-600');
css = css.replace(/--navy-500/g, '--dark-500');

css = css.replace(/--teal-700/g, '--accent-700');
css = css.replace(/--teal-600/g, '--accent-600');
css = css.replace(/--teal-500/g, '--accent-500');
css = css.replace(/--teal-400/g, '--accent-400');
css = css.replace(/--teal-300/g, '--accent-300');

// Replace the actual root declarations with the new palette
css = css.replace(/--dark-950: #04111F;/g, '--dark-950: #000000;');
css = css.replace(/--dark-900: #071A2F;/g, '--dark-900: #09090b;');
css = css.replace(/--dark-800: #0C2D57;/g, '--dark-800: #18181b;');
css = css.replace(/--dark-700: #0F3A6E;/g, '--dark-700: #27272a;');
css = css.replace(/--dark-600: #1E4D8C;/g, '--dark-600: #3f3f46;');
css = css.replace(/--dark-500: #2563EB;/g, '--dark-500: #52525b;');

css = css.replace(/--accent-700: #0E7490;/g, '--accent-700: #cc2900;');
css = css.replace(/--accent-600: #0891B2;/g, '--accent-600: #ff3300;');
css = css.replace(/--accent-500: #06B6D4;/g, '--accent-500: #ff5c33;');
css = css.replace(/--accent-400: #22D3EE;/g, '--accent-400: #ff8566;');
css = css.replace(/--accent-300: #67E8F9;/g, '--accent-300: #ffad99;');

// Update some semantic vars for stark white/black contrast
css = css.replace(/--text-heading: var\(--slate-900\);/g, '--text-heading: var(--dark-900);');
css = css.replace(/--text-body: var\(--slate-700\);/g, '--text-body: var(--dark-600);');

fs.writeFileSync('index.css', css);
console.log('CSS updated successfully');
