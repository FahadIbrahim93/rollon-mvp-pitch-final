/**
 * @file three-bg.js
 * Enhanced 3D Background with Smoke & Rising Ash particles.
 * Optimized with Frustum Culling and Visibility API.
 */

let scene, camera, renderer, clock, animId;
let smokeParticles = [];
let ashParticles;

function init() {
    const canvas = document.getElementById('smoke-bg');
    if (!canvas) return;

    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0012);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 0, 1);
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0xa020f0, 4, 1000);
    purpleLight.position.set(200, 300, 100);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x00ffff, 4, 1000);
    cyanLight.position.set(-200, 300, 100);
    scene.add(cyanLight);

        // Smoke layers (procedural texture, no external runtime dependency)
    const smokeGeo = new THREE.PlaneGeometry(500, 500);
    const smokeMat = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        color: 0x222222
    });

    for (let p = 0; p < 45; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMat);
        particle.position.set(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 100
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

    createAsh();
    animate();

window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('visibilitychange', handleVisibilityChange, false);
}

function createAsh() {
    const ashCount = 1200;
    const ashGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(ashCount * 3);

    for (let i = 0; i < ashCount * 3; i++) {
        positions[i] = Math.random() * 600 - 300;
    }

    ashGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create circular texture procedurally for softer embers
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const emberTexture = new THREE.CanvasTexture(canvas);

    const ashMat = new THREE.PointsMaterial({
        size: 2.2,
        map: emberTexture,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });

    ashParticles = new THREE.Points(ashGeo, ashMat);
    scene.add(ashParticles);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleVisibilityChange() {
    if (document.hidden) {
        cancelAnimationFrame(animId);
    } else {
        animate();
    }
}

function animate() {
    animId = requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Rotate smoke
    smokeParticles.forEach(p => {
        p.rotation.z += delta * 0.12;
        p.position.y += delta * 8; // Gentle drift
        if (p.position.y > 500) p.position.y = -500;
    });

    // Drift Ash
    const positions = ashParticles.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
        positions[i] += delta * 25; // Drift up
        if (positions[i] > 300) positions[i] = -300;
        
        // Add subtle horizontal sway
        positions[i-1] += Math.sin(Date.now() * 0.001 + i) * 0.1;
    }
    ashParticles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

init();
