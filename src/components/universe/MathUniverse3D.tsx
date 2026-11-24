import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../services/audio';
import { 
  Orbit, Sparkles, Compass, Eye, RefreshCw, ZoomIn, ZoomOut, 
  Layers, ChevronRight, Zap, Play, Pause, Camera, Radio, Globe
} from 'lucide-react';
import { MathView } from '../common/MathView';

export interface CelestialRealm {
  id: string;
  name: string;
  category: string;
  colorHex: string;
  colorThree: number;
  position: [number, number, number];
  type: 'blackhole' | 'calabiyau' | 'torusknot' | 'tesseract' | 'stellated' | 'riemann';
  description: string;
  governingEquation: string;
  targetTab: string;
  metrics: {
    curvature: string;
    eulerChar: string;
    bettiNumbers: string;
    dimension: string;
  };
}

const COSMIC_REALMS: CelestialRealm[] = [
  {
    id: 'calculus_singularity',
    name: 'Calculus Kerr Singularity & Black Hole',
    category: 'Analysis & Gravitational Geometry',
    colorHex: '#f59e0b',
    colorThree: 0xf59e0b,
    position: [0, 0, 0],
    type: 'blackhole',
    description: 'Relativistic gravitational well with an accretion disk of continuous flux, Riemann sums, and event horizon photon orbits.',
    governingEquation: 'R_{\\mu\\nu} - \\frac{1}{2}R g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}',
    targetTab: 'calculus_academy',
    metrics: {
      curvature: 'R = +∞ (Singularity)',
      eulerChar: 'χ = 2',
      bettiNumbers: 'β = (1, 0, 1)',
      dimension: '4D Spacetime'
    }
  },
  {
    id: 'topology_calabiyau',
    name: 'Calabi-Yau Quantum Manifold',
    category: 'Complex Algebraic Geometry',
    colorHex: '#d946ef',
    colorThree: 0xd946ef,
    position: [-7, 3, -4],
    type: 'calabiyau',
    description: 'A 6-dimensional Ricci-flat Kähler manifold compactification space from superstring theory with SU(3) holonomy.',
    governingEquation: 'c_1(M) = 0 \\implies R_{i\\bar{j}} = 0',
    targetTab: 'visual_3d',
    metrics: {
      curvature: 'Ricci Flat (R = 0)',
      eulerChar: 'χ = -200',
      bettiNumbers: 'h^{1,1}=1, h^{2,1}=101',
      dimension: '6D Real / 3D Complex'
    }
  },
  {
    id: 'algebra_torus_portal',
    name: 'Torus Knot Dimensional Portal (3, 7)',
    category: 'Knot Theory & Harmonic Analysis',
    colorHex: '#8b5cf6',
    colorThree: 0x8b5cf6,
    position: [7, 2, -3],
    type: 'torusknot',
    description: 'Non-trivial prime knot winding around the standard embedding of a 2-torus in S³, featuring liquid chrome refraction.',
    governingEquation: 'p = 3, \\quad q = 7, \\quad \\Delta(t) = \\frac{(t^{21}-1)(t-1)}{(t^3-1)(t^7-1)}',
    targetTab: 'formula_library',
    metrics: {
      curvature: 'Gaussian K = 0 (Flat)',
      eulerChar: 'χ = 0',
      bettiNumbers: 'β = (1, 2, 1)',
      dimension: '3D Embedded in S³'
    }
  },
  {
    id: 'hypercube_tesseract',
    name: '4D Hypercube (Tesseract) Projection',
    category: 'Four-Dimensional Polytopes',
    colorHex: '#38bdf8',
    colorThree: 0x38bdf8,
    position: [-6, -4, 3],
    type: 'tesseract',
    description: 'Perspective 3D shadow of an 8-cell hypercube rotating simultaneously through double orthogonal planes (XW and YZ).',
    governingEquation: 'V = a^4, \\quad \\text{Vertices} = 16, \\quad \\text{Edges} = 32',
    targetTab: 'geometry_universe',
    metrics: {
      curvature: 'Flat Euclidean',
      eulerChar: 'χ = 0',
      bettiNumbers: 'β = (1, 0, 0, 0, 1)',
      dimension: '4-Polytope'
    }
  },
  {
    id: 'kepler_stellated',
    name: 'Great Stellated Dodecahedron',
    category: 'Non-Convex Uniform Polyhedra',
    colorHex: '#f43f5e',
    colorThree: 0xf43f5e,
    position: [6, -3.5, 4],
    type: 'stellated',
    description: 'Kepler-Poinsot regular star polyhedron composed of 12 intersecting pentagrammic faces meeting at 20 triangular vertices.',
    governingEquation: '\\{5/2, 3\\}, \\quad V - E + F = 20 - 30 + 12 = 2',
    targetTab: 'discovery_lab',
    metrics: {
      curvature: 'Discrete Polyhedral',
      eulerChar: 'χ = 4',
      bettiNumbers: 'β = (1, 0, 1)',
      dimension: 'Regular Star 3D'
    }
  },
  {
    id: 'riemann_surface',
    name: 'Minimal Riemann Complex Surface',
    category: 'Differential Geometry & Minimal Surfaces',
    colorHex: '#10b981',
    colorThree: 0x10b981,
    position: [0, 6, -6],
    type: 'riemann',
    description: 'Zero mean-curvature parametric immersion representing complex harmonic maps and soap-film minimal action equilibria.',
    governingEquation: 'H = \\frac{\\kappa_1 + \\kappa_2}{2} = 0, \\quad K < 0',
    targetTab: 'graphing_studio',
    metrics: {
      curvature: 'Mean H = 0, Gauss K ≤ 0',
      eulerChar: 'χ = -1',
      bettiNumbers: 'β = (1, 1, 0)',
      dimension: 'Immersed 2-Manifold'
    }
  }
];

export const MathUniverse3D: React.FC<{ onSelectRealm?: (realmName: string) => void }> = ({ onSelectRealm }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<CelestialRealm>(COSMIC_REALMS[0]);
  const [cameraMode, setCameraMode] = useState<'orbit' | 'focused' | 'free'>('orbit');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSpacetimeGrid, setShowSpacetimeGrid] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);

  // References to communicate between React state and Three.js loop
  const focusTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraTargetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 4, 18));
  const isDraggingRef = useRef<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitAngleRef = useRef<{ theta: number; phi: number; radius: number }>({ theta: 0, phi: 0.3, radius: 20 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ─── THREE.JS SCENE SETUP ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04030a, 0.025);

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // ─── VOLUMETRIC LIGHTING ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blackHoleCoreLight = new THREE.PointLight(0xf59e0b, 3, 30);
    blackHoleCoreLight.position.set(0, 0, 0);
    scene.add(blackHoleCoreLight);

    const magentaLight = new THREE.PointLight(0xd946ef, 2.5, 40);
    magentaLight.position.set(-8, 5, -5);
    scene.add(magentaLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 2.5, 40);
    violetLight.position.set(8, -4, 5);
    scene.add(violetLight);

    // ─── 1. COSMIC PARTICLES (ACCRETION DISK & GALAXY DUST) ───
    const particleCount = 4500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Disk vs ambient stars
      if (i < 2500) {
        // Relativistic Accretion Disk around Black Hole
        const r = Math.pow(Math.random(), 0.5) * 5.5 + 1.2;
        const theta = Math.random() * Math.PI * 2;
        particlePositions[i3] = Math.cos(theta) * r;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 0.35 * (r / 2);
        particlePositions[i3 + 2] = Math.sin(theta) * r;

        // Color shift from hot white-gold near horizon to violet at edge
        if (r < 2.0) {
          particleColors[i3] = 1.0;
          particleColors[i3 + 1] = 0.95;
          particleColors[i3 + 2] = 0.7; // Golden white
        } else if (r < 3.8) {
          particleColors[i3] = 0.95;
          particleColors[i3 + 1] = 0.4;
          particleColors[i3 + 2] = 0.1; // Molten amber
        } else {
          particleColors[i3] = 0.85;
          particleColors[i3 + 1] = 0.2;
          particleColors[i3 + 2] = 0.9; // Magenta edge
        }
      } else {
        // Deep field cosmic dust
        const r = Math.random() * 60 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        particlePositions[i3] = r * Math.cos(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = r * Math.sin(phi);
        particlePositions[i3 + 2] = r * Math.cos(phi) * Math.sin(theta);

        particleColors[i3] = 0.5 + Math.random() * 0.5;
        particleColors[i3 + 1] = 0.5 + Math.random() * 0.4;
        particleColors[i3 + 2] = 0.8 + Math.random() * 0.2;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // ─── 2. SPACETIME CURVATURE GRID (WARPED METRIC) ───
    const gridRes = 50;
    const gridGeo = new THREE.PlaneGeometry(36, 36, gridRes, gridRes);
    gridGeo.rotateX(-Math.PI / 2);
    const gridPositions = gridGeo.attributes.position.array as Float32Array;

    // Dip the metric tensor grid around the black hole (z = -2 / (r + 0.5))
    for (let i = 0; i < gridPositions.length; i += 3) {
      const gx = gridPositions[i];
      const gz = gridPositions[i + 2];
      const dist = Math.sqrt(gx * gx + gz * gz);
      gridPositions[i + 1] = -3.2 / (dist * 0.4 + 1.2) - 1.5;
    }
    gridGeo.computeVertexNormals();

    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x4c1d95,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const spacetimeGrid = new THREE.Mesh(gridGeo, gridMat);
    scene.add(spacetimeGrid);

    // ─── 3. CELESTIAL REALM OBJECTS ───
    const realmGroup = new THREE.Group();
    scene.add(realmGroup);

    // (A) Black Hole Event Horizon & Photon Sphere
    const blackHoleGroup = new THREE.Group();
    blackHoleGroup.position.set(0, 0, 0);

    // Pure black void sphere (absorbing event horizon)
    const horizonGeo = new THREE.SphereGeometry(1.2, 48, 48);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const horizonSphere = new THREE.Mesh(horizonGeo, horizonMat);
    blackHoleGroup.add(horizonSphere);

    // Glowing relativistic photon sphere ring
    const photonRingGeo = new THREE.RingGeometry(1.25, 1.45, 64);
    const photonRingMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    const photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
    photonRing.rotation.x = Math.PI / 2;
    blackHoleGroup.add(photonRing);
    realmGroup.add(blackHoleGroup);

    // (B) Calabi-Yau Translucent Manifold
    const calabiGeo = new THREE.TorusKnotGeometry(1.4, 0.45, 160, 24, 2, 5);
    const calabiMat = new THREE.MeshPhysicalMaterial({
      color: 0xd946ef,
      emissive: 0x701a75,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const calabiMesh = new THREE.Mesh(calabiGeo, calabiMat);
    calabiMesh.position.set(-7, 3, -4);
    realmGroup.add(calabiMesh);

    // (C) Liquid Chrome Torus Knot (3, 7)
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.3, 0.35, 180, 32, 3, 7);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x2e1065,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false
    });
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnotMesh.position.set(7, 2, -3);
    realmGroup.add(torusKnotMesh);

    // Wireframe overlay for Torus Knot
    const torusKnotWireMat = new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const torusKnotWire = new THREE.Mesh(torusKnotGeo, torusKnotWireMat);
    torusKnotMesh.add(torusKnotWire);

    // (D) 4D Hypercube (Tesseract) Projection Model
    const tesseractGroup = new THREE.Group();
    tesseractGroup.position.set(-6, -4, 3);
    // Outer cube
    const outerCubeGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const outerCubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    const outerCube = new THREE.Mesh(outerCubeGeo, outerCubeMat);
    tesseractGroup.add(outerCube);
    // Inner cube
    const innerCubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const innerCubeMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, wireframe: true });
    const innerCube = new THREE.Mesh(innerCubeGeo, innerCubeMat);
    tesseractGroup.add(innerCube);
    realmGroup.add(tesseractGroup);

    // (E) Kepler Great Stellated Dodecahedron
    const stellatedGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const stellatedMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0x881337,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true
    });
    const stellatedMesh = new THREE.Mesh(stellatedGeo, stellatedMat);
    stellatedMesh.position.set(6, -3.5, 4);
    realmGroup.add(stellatedMesh);

    // (F) Minimal Riemann Surface
    const riemannRes = 32;
    const riemannGeo = new THREE.PlaneGeometry(3.5, 3.5, riemannRes, riemannRes);
    const rPos = riemannGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < rPos.length; i += 3) {
      const u = rPos[i] * 1.5;
      const v = rPos[i + 1] * 1.5;
      rPos[i + 2] = Math.sin(u) * Math.cos(v) * 0.9;
    }
    riemannGeo.computeVertexNormals();

    const riemannMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x064e3b,
      metalness: 0.7,
      roughness: 0.3,
      side: THREE.DoubleSide
    });
    const riemannMesh = new THREE.Mesh(riemannGeo, riemannMat);
    riemannMesh.position.set(0, 6, -6);
    riemannMesh.rotation.x = Math.PI / 4;
    realmGroup.add(riemannMesh);

    // ─── INTERACTION & MOUSE LISTENERS ───
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - mousePosRef.current.x;
      const dy = e.clientY - mousePosRef.current.y;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      orbitAngleRef.current.theta += dx * 0.005;
      orbitAngleRef.current.phi = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, orbitAngleRef.current.phi + dy * 0.005));
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      orbitAngleRef.current.radius = Math.max(8, Math.min(45, orbitAngleRef.current.radius + e.deltaY * 0.02));
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('wheel', handleWheel, { passive: true });

    // Window Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ─── ANIMATION CLOCK LOOP ───
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!isPaused) {
        // Rotate celestial structures
        particleCloud.rotation.y += delta * 0.05;
        calabiMesh.rotation.x += delta * 0.25;
        calabiMesh.rotation.y += delta * 0.35;
        torusKnotMesh.rotation.x += delta * 0.2;
        torusKnotMesh.rotation.z += delta * 0.3;
        tesseractGroup.rotation.x += delta * 0.3;
        tesseractGroup.rotation.y += delta * 0.4;
        stellatedMesh.rotation.y += delta * 0.4;
        stellatedMesh.rotation.z += delta * 0.2;
        riemannMesh.rotation.z += delta * 0.15;

        // Black hole relativistic pulse
        const pulse = 1.0 + Math.sin(elapsed * 2) * 0.03;
        photonRing.scale.set(pulse, pulse, pulse);
      }

      // Camera positioning logic
      if (cameraMode === 'orbit') {
        orbitAngleRef.current.theta += delta * 0.08;
        const targetCamX = orbitAngleRef.current.radius * Math.cos(orbitAngleRef.current.phi) * Math.sin(orbitAngleRef.current.theta);
        const targetCamY = orbitAngleRef.current.radius * Math.sin(orbitAngleRef.current.phi);
        const targetCamZ = orbitAngleRef.current.radius * Math.cos(orbitAngleRef.current.phi) * Math.cos(orbitAngleRef.current.theta);

        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.04);
        camera.lookAt(focusTargetRef.current);
      } else if (cameraMode === 'focused') {
        camera.position.lerp(cameraTargetPosRef.current, 0.05);
        camera.lookAt(focusTargetRef.current);
      } else {
        // Free mode uses mouse angles directly
        const targetCamX = orbitAngleRef.current.radius * Math.cos(orbitAngleRef.current.phi) * Math.sin(orbitAngleRef.current.theta);
        const targetCamY = orbitAngleRef.current.radius * Math.sin(orbitAngleRef.current.phi);
        const targetCamZ = orbitAngleRef.current.radius * Math.cos(orbitAngleRef.current.phi) * Math.cos(orbitAngleRef.current.theta);
        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.1);
        camera.lookAt(focusTargetRef.current);
      }

      spacetimeGrid.visible = showSpacetimeGrid;
      particleCloud.visible = showParticles;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      calabiGeo.dispose();
      calabiMat.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      outerCubeGeo.dispose();
      innerCubeGeo.dispose();
      stellatedGeo.dispose();
      stellatedMat.dispose();
      riemannGeo.dispose();
      riemannMat.dispose();
      renderer.dispose();
    };
  }, [isPaused, cameraMode, showSpacetimeGrid, showParticles]);

  // Handle focusing on a realm
  const handleFocusRealm = (realm: CelestialRealm) => {
    sound.playClick();
    setSelectedRealm(realm);
    setCameraMode('focused');

    focusTargetRef.current.set(...realm.position);
    // Camera sits offset in front of object
    const offset = realm.type === 'blackhole' ? 7 : 4.5;
    cameraTargetPosRef.current.set(
      realm.position[0],
      realm.position[1] + 1.2,
      realm.position[2] + offset
    );
  };

  const handleResetOrbit = () => {
    sound.playClick();
    setCameraMode('orbit');
    focusTargetRef.current.set(0, 0, 0);
    orbitAngleRef.current.radius = 20;
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Cosmic Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#070514] via-[#120a2e]/60 to-[#070514] border border-violet-500/20 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(139,92,246,0.12)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold mb-3 border border-violet-500/30">
            <Orbit size={15} className="text-fuchsia-400 animate-spinSlow" />
            <span>Interactive 3D Cosmic Mathematical Universe</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-cinzel">
            The Cosmic Continuum
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2.5 leading-relaxed">
            Navigate the grand architecture of mathematics. Gravitational Kerr black holes, Calabi-Yau 6D manifolds, 
            Kepler star polyhedra, and 4D tesseracts floating in a continuous relativistic spacetime continuum.
          </p>
        </div>

        {/* Global 3D Camera & Display Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetOrbit}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                cameraMode === 'orbit'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-400'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Globe size={13} />
              <span>Panoramic Orbit</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCameraMode('free');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                cameraMode === 'free'
                  ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 border border-fuchsia-400'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Camera size={13} />
              <span>Free Drag Control</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsPaused(!isPaused);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white flex items-center gap-1.5"
            >
              {isPaused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} className="text-amber-400" />}
              <span>{isPaused ? 'Resume Motion' : 'Freeze Time'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpacetimeGrid(!showSpacetimeGrid)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium border transition-all ${
                showSpacetimeGrid ? 'bg-violet-950/40 text-violet-300 border-violet-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              Metric Grid {showSpacetimeGrid ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowParticles(!showParticles)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium border transition-all ${
                showParticles ? 'bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              Accretion Disk {showParticles ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative rounded-3xl overflow-hidden border border-violet-500/30 bg-[#04030a] shadow-[0_0_80px_rgba(0,0,0,0.8)] h-[560px]">
        {/* WebGL Canvas Mount */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Viewport Overlay Controls */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-xl">
          {COSMIC_REALMS.map(realm => {
            const isSelected = selectedRealm.id === realm.id && cameraMode === 'focused';
            return (
              <button
                key={realm.id}
                onClick={() => handleFocusRealm(realm)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all backdrop-blur-md flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-violet-600/90 text-white border-violet-300 shadow-lg shadow-violet-600/40 scale-105'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-violet-500/50 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: realm.colorHex }} />
                <span>{realm.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Floating HUD for Selected Realm */}
        <div className="absolute bottom-4 right-4 z-20 max-w-md w-full p-5 rounded-2xl bg-slate-950/85 border border-violet-500/30 backdrop-blur-xl shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 block">
                {selectedRealm.category}
              </span>
              <h3 className="text-base font-black text-white">{selectedRealm.name}</h3>
            </div>
            {onSelectRealm && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onSelectRealm(selectedRealm.name);
                }}
                className="px-3 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 shadow-md shadow-fuchsia-600/25"
              >
                <span>Enter Realm</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedRealm.description}
          </p>

          <div className="p-2 bg-slate-900/90 rounded-xl text-center border border-slate-800">
            <MathView math={selectedRealm.governingEquation} block />
          </div>

          {/* Metric Tensor Data Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Curvature:</span>
              <span className="text-amber-400 font-bold truncate block">{selectedRealm.metrics.curvature}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Euler Characteristic:</span>
              <span className="text-fuchsia-400 font-bold block">{selectedRealm.metrics.eulerChar}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Topology:</span>
              <span className="text-violet-400 font-bold block">{selectedRealm.metrics.dimension}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Betti Numbers:</span>
              <span className="text-emerald-400 font-bold truncate block">{selectedRealm.metrics.bettiNumbers}</span>
            </div>
          </div>
        </div>

        {/* Mouse Navigation Hint */}
        <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 backdrop-blur-md text-[10px] text-slate-400 font-mono">
          Drag: Rotate | Scroll: Zoom | Click Realm to Focus
        </div>
      </div>
    </div>
  );
};
