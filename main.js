// 换成jsDelivr的CDN（更稳定）
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// 【第一个日志】确认代码开始执行
console.log('代码开始初始化，three.js 库加载正常');

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

// 【第二个日志】确认开始加载模型
console.log('开始加载模型文件：3d model.glb');

loader.load(
    '3d model.glb', // 你的模型文件名
    function (gltf) {
        // 【第三个日志】模型加载成功
        console.log('模型加载成功！', gltf);
        const model = gltf.scene;
        model.position.set(0, -1, 0);
        model.scale.set(0.5, 0.5, 0.5);
        scene.add(model);
        loadingText.style.display = 'none';
    },
    function (xhr) {
        console.log(`模型加载进度：${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
    },
    function (error) {
        console.error('模型加载失败！错误原因：', error);
    }
);

// 相机位置
camera.position.set(0, 0, 5);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.enableZoom = true;
controls.enablePan = false;

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
