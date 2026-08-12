const fs = require('fs');
const path = require('path');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Add Three.js script to head if not present
if (!html.includes('three.min.js')) {
  html = html.replace('</head>', '  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n</head>');
}

// Replace the image with the 3D canvas container
html = html.replace(
  /<img src="assets\/brutalist_3d_hero\.png" alt="Toran Digital" width="800" height="600">/,
  '<div id="hero-3d-canvas" style="width: 100%; height: 600px;"></div>'
);

// Add the hero-3d.js script at the end of the body
if (!html.includes('hero-3d.js')) {
  html = html.replace('</body>', '  <script src="hero-3d.js"></script>\n</body>');
}

fs.writeFileSync('index.html', html);

// 2. Create hero-3d.js
const threeJsCode = \`
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-3d-canvas');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  // Transparent background
  scene.background = null;

  // Camera setup
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 40;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Geometry - Brutalist Icosahedron (Sharp angles)
  const geometry = new THREE.IcosahedronGeometry(12, 0);
  
  // Material - Dark slate with wireframe overlay for tech aesthetic
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x09090b, // Dark charcoal
    roughness: 0.2,
    metalness: 0.8,
    flatShading: true
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  // Wireframe to make it look highly technical
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xff3300, linewidth: 2 });
  const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireframeMaterial);
  mesh.add(wireframe);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Electric Blue Light
  const blueLight = new THREE.DirectionalLight(0x0044FF, 2);
  blueLight.position.set(10, 20, 10);
  scene.add(blueLight);

  // Electric Orange Light
  const orangeLight = new THREE.DirectionalLight(0xff3300, 1.5);
  orangeLight.position.set(-10, -20, -10);
  scene.add(orangeLight);

  // Animation Loop
  let mouseX = 0;
  let mouseY = 0;

  // Mouse interaction
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  const animate = function () {
    requestAnimationFrame(animate);

    // Base rotation
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;

    // Subtle interaction based on mouse
    mesh.rotation.x += mouseY * 0.01;
    mesh.rotation.y += mouseX * 0.01;

    renderer.render(scene, camera);
  };

  animate();

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
\`;

fs.writeFileSync('hero-3d.js', threeJsCode);

// 3. Clean up the CSS (remove the border/shadow from the old wrapper if it applies to canvas)
let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/\\.hero-image-wrapper img \\{[\\s\\S]*?\\}/, \`
.hero-image-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
}
.hero-image-wrapper #hero-3d-canvas {
  width: 100%;
  cursor: grab;
}
.hero-image-wrapper #hero-3d-canvas:active {
  cursor: grabbing;
}
\`);
fs.writeFileSync('index.css', css);

console.log('3D object script generated and injected.');
