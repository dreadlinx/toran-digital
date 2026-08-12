document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-3d-canvas');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = null;

  // Camera setup
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  function updateCameraZ() {
    if (window.innerWidth < 991) {
      camera.position.z = 25;
    } else {
      camera.position.z = 16;
    }
  }
  updateCameraZ();

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Group to hold the phone
  const phone = new THREE.Group();
  scene.add(phone);

  // 1. Phone Body (Dark, sleek, metallic)
  const bodyWidth = 6;
  const bodyHeight = 12.5;
  const bodyDepth = 0.6;
  
  const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x111111,
    roughness: 0.1,
    metalness: 0.9
  });
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  phone.add(bodyMesh);

  // 2. Phone Screen (Canvas Texture)
  // Create an offscreen canvas to draw a fake website
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Draw Website on Canvas
  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 1024);
  
  // Header
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, 512, 80);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('TORAN DIGITAL', 30, 50);
  
  // Hero Section
  ctx.fillStyle = '#f4f4f5';
  ctx.fillRect(0, 80, 512, 400);
  
  ctx.fillStyle = '#09090b';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText('WE BUILD', 30, 180);
  ctx.fillStyle = '#ff3300';
  ctx.fillText('DIGITAL', 30, 240);
  ctx.fillStyle = '#09090b';
  ctx.fillText('PRODUCTS', 30, 300);
  
  // Button
  ctx.fillStyle = '#0044FF';
  ctx.fillRect(30, 350, 200, 60);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('Get a Quote', 60, 388);

  // Grid / Services
  ctx.fillStyle = '#e4e4e7';
  ctx.fillRect(30, 520, 210, 200);
  ctx.fillRect(270, 520, 210, 200);
  ctx.fillRect(30, 750, 210, 200);
  ctx.fillRect(270, 750, 210, 200);

  ctx.fillStyle = '#ff3300';
  ctx.fillRect(50, 540, 40, 40);
  ctx.fillStyle = '#0044FF';
  ctx.fillRect(290, 540, 40, 40);

  // Create texture from canvas
  const screenTexture = new THREE.CanvasTexture(canvas);
  
  const screenWidth = bodyWidth - 0.4;
  const screenHeight = bodyHeight - 0.4;
  const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
  
  const screenMaterial = new THREE.MeshBasicMaterial({ 
    map: screenTexture
  });
  
  const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
  screenMesh.position.z = bodyDepth / 2 + 0.01; // Slightly in front of body
  phone.add(screenMesh);

  // 3. Screen Bezel Glow (optional tech accent)
  const bezelGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(screenWidth + 0.1, screenHeight + 0.1));
  const bezelMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
  const bezelLines = new THREE.LineSegments(bezelGeometry, bezelMaterial);
  bezelLines.position.z = bodyDepth / 2 + 0.02;
  phone.add(bezelLines);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(10, 20, 30);
  scene.add(directionalLight1);

  // Edge lighting for tech feel
  const blueLight = new THREE.DirectionalLight(0x0044FF, 3);
  blueLight.position.set(20, 0, -10);
  scene.add(blueLight);

  const orangeLight = new THREE.DirectionalLight(0xff3300, 2);
  orangeLight.position.set(-20, 10, -10);
  scene.add(orangeLight);

  // Initial Rotation
  phone.rotation.y = -0.3; // Angle it slightly
  phone.rotation.x = 0.1;

  // Animation Loop
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  let time = 0;

  const animate = function () {
    requestAnimationFrame(animate);
    time += 0.01;

    // Floating effect
    phone.position.y = Math.sin(time) * 1.5;

    // Smooth mouse tracking
    const targetRotationY = -0.3 + mouseX * 0.5;
    const targetRotationX = 0.1 + mouseY * 0.3;
    
    phone.rotation.y += (targetRotationY - phone.rotation.y) * 0.05;
    phone.rotation.x += (targetRotationX - phone.rotation.x) * 0.05;

    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    updateCameraZ();
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
