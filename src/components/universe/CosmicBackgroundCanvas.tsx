import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CosmicBackgroundCanvas: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const mount = mountRef.current;
    if (!mount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Cosmic Particle Cloud
    const particleCount = 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    // Palette: Ultraviolet (0.6, 0.2, 0.9), Electric Magenta (0.9, 0.1, 0.7), Cyan (0.1, 0.8, 0.9), Gold (0.95, 0.7, 0.1)
    const colorChoices = [
      [0.65, 0.25, 0.95],
      [0.92, 0.18, 0.75],
      [0.15, 0.75, 0.95],
      [0.98, 0.72, 0.15],
      [0.2, 0.85, 0.55]
    ];

    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy dispersion
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 2) * 85 + 5;
      const angle = Math.random() * Math.PI * 2 + (radius * 0.05);

      positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 12;
      positions[i3 + 1] = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 45;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i3] = c[0];
      colors[i3 + 1] = c[1];
      colors[i3 + 2] = c[2];

      scales[i] = Math.random() * 1.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Slowly rotating cosmic torus ring
    const ringGeo = new THREE.TorusGeometry(26, 0.25, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.12,
      wireframe: true
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      particles.rotation.z += delta * 0.02;
      particles.rotation.y += delta * 0.01;
      ring.rotation.z -= delta * 0.015;

      // Parallax smooth interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 15;
      camera.position.y = -targetY * 15;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};
