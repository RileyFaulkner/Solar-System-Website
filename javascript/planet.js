import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const menuItems = dropdown.querySelectorAll('.dropdown-content li');

    dropdown.addEventListener('mouseenter', () => {
      menuItems.forEach((item, index) => {
        // clear any previous animation classes
        item.classList.remove('drop-out');
        item.style.animation = `dropIn 0.4s forwards ${index * 0.05}s`;
      });
    });

    dropdown.addEventListener('mouseleave', () => {
      menuItems.forEach((item, index) => {
        item.classList.remove('drop-in');
        item.style.animation = `dropOut 0.4s forwards ${index * 0.05}s`;
      });
    });
  });
});

// Scene and camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Planet textures
const textureLoader = new THREE.TextureLoader();
const pageName = window.location.pathname.split('/').pop().replace('.html', '');
const textureURL = `https://threejs.org/examples/textures/planets/${pageName}.jpg`;
const PlanetTexture = textureLoader.load(textureURL);

// Planet mesh
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: PlanetTexture });
const Planet = new THREE.Mesh(geometry, material);
scene.add(Planet);

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Animate
function animate() {
  requestAnimationFrame(animate);
  Planet.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resising
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Dropdown animation
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const menuItems = dropdown.querySelectorAll('.dropdown-content li');

  dropdown.addEventListener('mouseenter', () => {
    menuItems.forEach((item, index) => {
      item.classList.remove('drop-out');
      item.style.animationDelay = `${index * 0.05}s`;
      item.classList.add('drop-in');
    });
  });

  dropdown.addEventListener('mouseleave', () => {
    menuItems.forEach((item, index) => {
      item.classList.remove('drop-in');
      item.style.animationDelay = `${index * 0.05}s`;
      item.classList.add('drop-out');
    });
  });
});
