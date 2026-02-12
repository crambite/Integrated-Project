import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import {GLTFLoader} from "jsm/loaders/GLTFLoader.js";

let w = window.innerWidth;
let h = window.innerHeight;
const scene = new THREE.Scene();
const data = JSON.parse(sessionStorage.getItem("data"));
let model = "./assets/Small.glb";
let position = 1;

//decide which model to use
let count = 0;

if (data["North_America"] === true) {
  count += 1;
}

if (data["South_America"] === true) {
  count += 1;
}

if (data["Asia"] === true) {
  count += 1;
}

if (data["Africa"] === true) {
  count += 1;
}

if (data["Australia"] === true) {
  count += 1;
}

if (count >= 2) {
  position = 2;
  model = "./assets/Small+legs.glb";
}

if (count >= 4) {
  model = "./assets/Small+armslegs.glb";
  position = 2;

}

if (data["North_America"] === true && data["South_America"] === true && data["Asia"] === true && data["Africa"] === true && data["Australia"] === true) {
  model = "./assets/Big.glb";
  position = 2;

}

if (w<h){
  [w, h] = [h, w];
}


const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
camera.position.set(0.75, 0.5, 1.5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);

const container = document.getElementById("canvas");
container.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

const gltfLoader = new GLTFLoader();
gltfLoader.load(model, (gltf) =>{
  const robot = gltf.scene;

  robot.position.set(0, -position ,0);
  scene.add(robot);
})



const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 5);
sunLight.position.set(5, 2, 1);
scene.add(sunLight);

const backLight = new THREE.DirectionalLight(0xffffff, 3);
backLight.position.set(-5, 2, -1);
scene.add(backLight);


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