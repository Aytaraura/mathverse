import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../services/audio';
import { Compass, Sparkles, Orbit, Eye, RefreshCw } from 'lucide-react';

interface CelestialRealm {
  name: string;
  category: string;
  color: number;
  position: [number, number, number];
  radius: number;
  description: string;
  keyTheorem: string;
}

const REALMS: CelestialRealm[] = [
  {
    name: 'Calculus Nebulae',
    category: 'Analysis & Derivatives',
    color: 0x38bdf8, // Sky Cyan
    position: [0, 2.5, 0],
    radius: 1.2,
    description: 'Realm of continuous change, limits, derivatives, and infinite integrals.',
    keyTheorem: 'Fundamental Theorem of Calculus'
  },
  {
    name: 'Algebraic Core',
    category: 'Polynomials & Symmetries',
    color: 0x818cf8, // Indigo
    position: [-4, 0.5, 1],
    radius: 1.0,
    description: 'The foundation of algebraic structures, polynomial roots, and Vieta relations.',
    keyTheorem: 'Fundamental Theorem of Algebra'
  },
  {
    name: 'Number Theory Cosmos',
    category: 'Primes & Diophantine',
    color: 0xf59e0b, // Amber
    position: [4, 1.2, -1],
    radius: 1.1,
    description: 'The celestial sanctuary of prime distribution, modular arithmetic, and Riemann zeros.',
    keyTheorem: 'Fermat\'s Little Theorem'
  },
  {
    name: 'Geometric Citadel',
    category: 'Euclidean & Projective',
    color: 0x10b981, // Emerald
    position: [-2.5, -2.5, 2],
    radius: 0.9,
    description: 'Spatial configurations, cyclic quadrilaterals, inversive geometry, and Ptolemy\'s law.',
    keyTheorem: 'Ptolemy\'s Theorem'
  },
  {
    name: 'Combinatorial Nexus',
    category: 'Enumeration & Graph Theory',
    color: 0xa855f7, // Purple
    position: [3, -2, 1.5],
    radius: 0.85,
    description: 'Permutations, invariants, Ramsey theory, and generating functions.',
    keyTheorem: 'Inclusion-Exclusion Principle'
  }
];

export const MathUniverse3D: React.FC<{ onSelectRealm?: (realmName: string) => void }> = ({ onSelectRealm }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeRealm, setActiveRealm] = useState<CelestialRealm>(REALMS[0]);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b10, 0.04);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Starfield Particle Dust
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 60;
      starPos[i + 1] = (Math.random() - 0.5) * 60;
      starPos[i + 2] = (Math.random() - 0.5) * 60;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Constellation lines connecting the realms
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.35
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePoints: THREE.Vector3[] = [];
    REALMS.forEach((r, idx) => {
      linePoints.push(new THREE.Vector3(...r.position));
      const nextR = REALMS[(idx + 1) % REALMS.length];
      linePoints.push(new THREE.Vector3(...nextR.position));
    });
    lineGeo.setFromPoints(linePoints);
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(constellationLines);

    // Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const centerGlow = new THREE.PointLight(0x6366f1, 2.5, 30);
    scene.add(centerGlow);

    // Realm Planetary Meshes
    const realmMeshes: { mesh: THREE.Mesh; ring: THREE.Mesh; data: CelestialRealm }[] = [];

    REALMS.forEach(realm => {
      // Core sphere
      const sphereGeo = new THREE.IcosahedronGeometry(realm.radius, 3);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: realm.color,
        roughness: 0.3,
        metalness: 0.6,
        wireframe: false
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(...realm.position);
      scene.add(mesh);

      // Wireframe aura ring
      const ringGeo = new THREE.TorusGeometry(realm.radius * 1.5, 0.02, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: realm.color,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(...realm.position);
      ring.rotation.x = Math.PI / 3;
      scene.add(ring);

      realmMeshes.push({ mesh, ring, data: realm });
    });

    // Raycasting for interactive click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(realmMeshes.map(r => r.mesh));

      if (intersects.length > 0) {
        const hit = realmMeshes.find(r => r.mesh === intersects[0].object);
        if (hit) {
          sound.playClick();
          setActiveRealm(hit.data);
          if (onSelectRealm) onSelectRealm(hit.data.name);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      starField.rotation.y += 0.0003;

      realmMeshes.forEach((r, idx) => {
        r.mesh.rotation.y += 0.008 * (idx % 2 === 0 ? 1 : -1);
        r.mesh.rotation.x += 0.004;
        r.ring.rotation.z += 0.005;
      });

      if (isRotating) {
        const time = clock.getElapsedTime() * 0.15;
        camera.position.x = Math.sin(time) * 8;
        camera.position.z = Math.cos(time) * 8;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating, onSelectRealm]);

  return (
    <div className="relative w-full h-[580px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Title Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2 border border-indigo-500/30">
          <Orbit size={14} /> 3D Celestial Cosmos
        </div>
        <h2 className="text-2xl font-black text-white tracking-wide">The Mathematical Universe</h2>
        <p className="text-xs text-slate-400">Click any celestial realm to navigate between realms.</p>
      </div>

      {/* Camera Rotation Toggle */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            setIsRotating(!isRotating);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-all ${
            isRotating 
              ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' 
              : 'bg-slate-900/60 border-slate-800 text-slate-400'
          }`}
        >
          <RefreshCw size={13} className={isRotating ? 'animate-spin' : ''} />
          {isRotating ? 'Orbit Active' : 'Orbit Paused'}
        </button>
      </div>

      {/* Bottom Realm Card Overlay */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {activeRealm.category}
          </span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `#${activeRealm.color.toString(16).padStart(6, '0')}` }} />
        </div>
        <h3 className="text-lg font-bold text-white mt-1.5">{activeRealm.name}</h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {activeRealm.description}
        </p>
        <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-indigo-300">
          <strong>Key Theorem: </strong> {activeRealm.keyTheorem}
        </div>
      </div>
    </div>
  );
};
