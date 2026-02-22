/**
 * @file three-bg.js
 * Premium 3D animated background: Smoke Spiral & Rising Ash.
 */
(function () {
    'use strict';
    let scene, camera, renderer, smokeParticles = [], ashParticles, animId;
    let clock = new THREE.Clock();

    function init() {
        const container = document.getElementById('canvas-container');
        if (!container || !window.THREE) return;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505);
        scene.fog = new THREE.FogExp2(0x050505, 0.005);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 100;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        const smokeTexture = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
        const smokeGeo = new THREE.PlaneGeometry(300, 300);
        const smokeMat = new THREE.MeshLambertMaterial({
            map: smokeTexture, transparent: true, opacity: 0.15, depthWrite: false, color: 0x222222
        });

        for (let p = 0; p < 45; p++) {
            const particle = new THREE.Mesh(smokeGeo, smokeMat);
            particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
            particle.rotation.z = Math.random() * 360;
            scene.add(particle);
            smokeParticles.push(particle);
        }

        const ashGeo = new THREE.BufferGeometry();
        const ashCount = 300;
        const positions = new Float32Array(ashCount * 3);
        for (let i = 0; i < ashCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
        }
        ashGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const ashMat = new THREE.PointsMaterial({ size: 2, color: 0xffffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
        ashParticles = new THREE.Points(ashGeo, ashMat);
        scene.add(ashParticles);

        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(-1, 0, 1);
        scene.add(light);
        scene.add(new THREE.PointLight(0xa020f0, 2, 300)).position.set(50, 50, 50);
        scene.add(new THREE.PointLight(0x00ffff, 2, 300)).position.set(-50, -50, 50);

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        animate();
    }

    function animate() {
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        smokeParticles.forEach(p => {
            p.rotation.z += delta * 0.15;
            p.position.y += delta * 5;
            if(p.position.y > 250) p.position.y = -250;
        });
        const pos = ashParticles.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
            pos[i] += delta * 20;
            if (pos[i] > 200) pos[i] = -200;
        }
        ashParticles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    document.addEventListener('DOMContentLoaded', init);
}());
