/**
 * @file three-bg.js
 * Premium 3D animated background using Three.js.
 */
(function () {
    'use strict';
    let scene, camera, renderer, object, animId;
    function init() {
        const container = document.getElementById('canvas-container');
        if (!container || !window.THREE) return;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a1a,
            emissive: 0x200020,
            wireframe: true
        });
        object = new THREE.Mesh(geometry, material);
        scene.add(object);
        scene.add(new THREE.AmbientLight(0xffffff, 0.2));
        animate();
    }
    function animate() {
        animId = requestAnimationFrame(animate);
        if (object) {
            object.rotation.x += 0.002;
            object.rotation.y += 0.003;
        }
        renderer.render(scene, camera);
    }
    document.addEventListener('DOMContentLoaded', init);
}());
