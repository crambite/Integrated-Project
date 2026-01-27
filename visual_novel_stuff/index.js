import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import {GLTFLoader} from "jsm/loaders/GLTFLoader.js";
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(2, 2, 2);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);

const container = document.getElementById("canvas");
container.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/integratedProject.glb', (gltf) =>{
  const robot = gltf.scene;

  robot.position.set(0,-1 ,0);
  scene.add(robot);
})



const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 5);
sunLight.position.set(5, 0, 1);
scene.add(sunLight);


// Sprites BG
const gradientBackground = getLayer({
  hue: 0.5,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -15.5,
});
scene.add(gradientBackground);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  ctrls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);