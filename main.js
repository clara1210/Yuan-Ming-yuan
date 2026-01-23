import * as THREE from 'https://cdn.skypack.dev/three@0.158.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// 初始化场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // 透明背景
document.body.appendChild(renderer.domElement);

// 添加光照（让模型颜色正常显示）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 加载GLB模型
const loader = new GLTFLoader();
const loadingText = document.querySelector('.loading');

loader.load('artifact.glb', function (gltf) {
    const model = gltf.scene;
    // 调整模型位置和大小（根据你的模型修改）
    model.position.set(0, -1, 0);
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
    loadingText.style.display = 'none'; // 隐藏加载提示
});

// 相机位置
camera.position.set(0, 0, 5);

// 轨道控制器（旋转、缩放、拖拽）
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 平滑拖拽
controls.autoRotate = true; // 自动旋转（大赛演示必备）
controls.autoRotateSpeed = 2; // 旋转速度
controls.enableZoom = true; // 允许缩放
controls.enablePan = false; // 禁止平移（避免模型跑走）

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 适配窗口大小
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});