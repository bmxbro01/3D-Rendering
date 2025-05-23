import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { cos, texture } from "three/tsl";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

scene.add(camera);
const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.render(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const texture1 = new THREE.TextureLoader().load("./static/textures/ring.jpg");
const torus = new THREE.Mesh(
	new THREE.TorusGeometry(10, 3, 2, 100),
	new THREE.MeshStandardMaterial({ map: texture1 })
);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 900, 100);
pointLight.position.set(20, 20, 20);
torus.rotation.x = 2;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geo2 = new THREE.SphereGeometry(0.25, 24, 24);
	const mat2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geo2, mat2);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x, y, z);
	scene.add(star);
}
Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load("./static/textures/space.jpg");
scene.background = spaceTexture;



const moonTexture = new THREE.TextureLoader().load("./static/textures/moon.jpg");
const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({ map: moonTexture })
);

moon.rotation.x = 2;
scene.add(moon);


function animate() {
	requestAnimationFrame(animate);
	torus.rotation.z += 0.008;

	moon.rotation.z += 0.005;
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.update();
	renderer.render(scene, camera);
}
animate();
