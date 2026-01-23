// 等待页面完全加载后执行
window.onload = function() {
    // 1. 初始化three.js核心对象
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 2. 添加光照（解决模型发黑问题）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. 加载模型（你的模型文件名是3d model.glb）
    const loader = new GLTFLoader();
    const loadingText = document.querySelector('.loading');

    loader.load(
        // 模型路径（仓库根目录下的3d model.glb）
        '3d%20model.glb', // 注意：空格要转成%20，浏览器URL中不能直接有空格
        function (gltf) {
            // 模型加载成功
            const model = gltf.scene;
            // 调整模型大小和位置
            model.scale.set(0.8, 0.8, 0.8);
            model.position.set(0, -1, 0);
            scene.add(model);
            // 隐藏加载提示
            loadingText.style.display = 'none';
        },
        function (xhr) {
            // 加载进度
            console.log(`加载进度：${(xhr.loaded / xhr.total * 100).toFixed(0)}%`);
        },
        function (error) {
            // 加载失败提示
            console.error('模型加载失败：', error);
            loadingText.innerText = '加载失败，请刷新重试';
        }
    );

    // 4. 设置相机位置
    camera.position.z = 5;

    // 5. 添加轨道控制器（支持旋转/缩放）
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // 6. 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // 7. 窗口大小适配
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
