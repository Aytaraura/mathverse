import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import {
  Box, Circle, Triangle, Layers, Compass, RotateCcw,
  Maximize2, Eye, Sliders, Info, Zap, Sparkles, Check
} from 'lucide-react';

type GeometryTab = '2d_shapes' | '3d_solids' | 'coordinate_plane' | 'theorems';

export const GeometryUniverse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GeometryTab>('2d_shapes');

  // ─── 2D SHAPES STATE ───
  const [selected2DShape, setSelected2DShape] = useState<
    'square' | 'rectangle' | 'circle' | 'triangle' | 'right_triangle' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'regular_polygon' | 'ellipse' | 'kite'
  >('circle');
  const [dimA, setDimA] = useState(6); // radius / side / base / length
  const [dimB, setDimB] = useState(4); // height / width
  const [dimC, setDimC] = useState(5); // third dimension or angle
  const [polySides, setPolySides] = useState(6);

  // ─── 3D SOLIDS STATE ───
  const [selected3DSolid, setSelected3DSolid] = useState<
    'cube' | 'cuboid' | 'sphere' | 'cylinder' | 'cone' | 'pyramid' | 'prism' | 'hemisphere' | 'tetrahedron'
  >('cube');
  const [solidA, setSolidA] = useState(4); // edge / radius / length
  const [solidB, setSolidB] = useState(6); // height / width
  const [solidC, setSolidC] = useState(5); // depth
  const [wireframe, setWireframe] = useState(false);

  // ─── THEOREMS STATE ───
  const [activeTheorem, setActiveTheorem] = useState<'pythagorean' | 'inscribed_angle' | 'triangle_centers'>('pythagorean');
  const [pythA, setPythA] = useState(3);
  const [pythB, setPythB] = useState(4);
  const [inscribedAngleDeg, setInscribedAngleDeg] = useState(40);

  // ─── COORDINATE PLANE STATE ───
  const [pt1, setPt1] = useState<{ x: number; y: number }>({ x: -3, y: -2 });
  const [pt2, setPt2] = useState<{ x: number; y: number }>({ x: 4, y: 3 });

  // Canvas Refs
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const threeMountRef = useRef<HTMLDivElement | null>(null);
  const theoremCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const coordCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── 2D CALCULATIONS ───
  const calc2D = () => {
    switch (selected2DShape) {
      case 'circle': {
        const r = dimA;
        const area = Math.PI * r * r;
        const perimeter = 2 * Math.PI * r;
        return {
          name: 'Circle',
          area: area.toFixed(2),
          perimeter: perimeter.toFixed(2),
          extra: `Diameter: ${(2 * r).toFixed(2)}`
        };
      }
      case 'square': {
        const s = dimA;
        return {
          name: 'Square',
          area: (s * s).toFixed(2),
          perimeter: (4 * s).toFixed(2),
          extra: `Diagonal: ${(s * Math.SQRT2).toFixed(2)}`
        };
      }
      case 'rectangle': {
        const l = dimA;
        const w = dimB;
        return {
          name: 'Rectangle',
          area: (l * w).toFixed(2),
          perimeter: (2 * (l + w)).toFixed(2),
          extra: `Diagonal: ${Math.sqrt(l * l + w * w).toFixed(2)}`
        };
      }
      case 'triangle': {
        const b = dimA;
        const h = dimB;
        return {
          name: 'General Triangle',
          area: (0.5 * b * h).toFixed(2),
          perimeter: (b + 2 * Math.sqrt((b / 2) ** 2 + h ** 2)).toFixed(2) + ' (approx)',
          extra: `Base: ${b}, Height: ${h}`
        };
      }
      case 'right_triangle': {
        const a = dimA;
        const b = dimB;
        const c = Math.sqrt(a * a + b * b);
        return {
          name: 'Right Triangle',
          area: (0.5 * a * b).toFixed(2),
          perimeter: (a + b + c).toFixed(2),
          extra: `Hypotenuse: ${c.toFixed(2)}`
        };
      }
      case 'trapezoid': {
        const a = dimA;
        const b = dimB;
        const h = dimC;
        return {
          name: 'Trapezoid',
          area: (0.5 * (a + b) * h).toFixed(2),
          perimeter: 'Variable with slant angles',
          extra: `Median: ${((a + b) / 2).toFixed(2)}`
        };
      }
      case 'parallelogram': {
        const b = dimA;
        const h = dimB;
        const a = dimC;
        return {
          name: 'Parallelogram',
          area: (b * h).toFixed(2),
          perimeter: (2 * (b + a)).toFixed(2),
          extra: `Base: ${b}, Height: ${h}`
        };
      }
      case 'rhombus': {
        const d1 = dimA;
        const d2 = dimB;
        const s = 0.5 * Math.sqrt(d1 * d1 + d2 * d2);
        return {
          name: 'Rhombus',
          area: (0.5 * d1 * d2).toFixed(2),
          perimeter: (4 * s).toFixed(2),
          extra: `Side length: ${s.toFixed(2)}`
        };
      }
      case 'regular_polygon': {
        const n = polySides;
        const s = dimA;
        const perimeter = n * s;
        const apothem = s / (2 * Math.tan(Math.PI / n));
        const area = 0.5 * perimeter * apothem;
        return {
          name: `Regular ${n}-gon`,
          area: area.toFixed(2),
          perimeter: perimeter.toFixed(2),
          extra: `Apothem: ${apothem.toFixed(2)}, Int Angle: ${(((n - 2) * 180) / n).toFixed(1)}°`
        };
      }
      case 'ellipse': {
        const a = dimA;
        const b = dimB;
        const area = Math.PI * a * b;
        const perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
        return {
          name: 'Ellipse',
          area: area.toFixed(2),
          perimeter: perimeter.toFixed(2) + ' (approx)',
          extra: `Focal Distance c: ${Math.sqrt(Math.max(0, a * a - b * b)).toFixed(2)}`
        };
      }
      case 'kite': {
        const d1 = dimA;
        const d2 = dimB;
        return {
          name: 'Kite',
          area: (0.5 * d1 * d2).toFixed(2),
          perimeter: 'Depends on adjacent sides',
          extra: `Orthogonal Diagonals: d1=${d1}, d2=${d2}`
        };
      }
      default:
        return { name: '', area: '', perimeter: '', extra: '' };
    }
  };

  // ─── 3D CALCULATIONS ───
  const calc3D = () => {
    switch (selected3DSolid) {
      case 'cube': {
        const s = solidA;
        return {
          name: 'Cube',
          volume: (s ** 3).toFixed(2),
          tsa: (6 * s * s).toFixed(2),
          lsa: (4 * s * s).toFixed(2),
          vertices: 8,
          edges: 12,
          faces: 6,
          spaceDiag: (s * Math.sqrt(3)).toFixed(2)
        };
      }
      case 'cuboid': {
        const l = solidA;
        const w = solidB;
        const h = solidC;
        return {
          name: 'Cuboid / Rectangular Prism',
          volume: (l * w * h).toFixed(2),
          tsa: (2 * (l * w + w * h + h * l)).toFixed(2),
          lsa: (2 * h * (l + w)).toFixed(2),
          vertices: 8,
          edges: 12,
          faces: 6,
          spaceDiag: Math.sqrt(l * l + w * w + h * h).toFixed(2)
        };
      }
      case 'sphere': {
        const r = solidA;
        return {
          name: 'Sphere',
          volume: ((4 / 3) * Math.PI * r ** 3).toFixed(2),
          tsa: (4 * Math.PI * r * r).toFixed(2),
          lsa: 'None (Smooth)',
          vertices: 0,
          edges: 0,
          faces: 1,
          spaceDiag: (2 * r).toFixed(2) + ' (Diameter)'
        };
      }
      case 'cylinder': {
        const r = solidA;
        const h = solidB;
        return {
          name: 'Right Circular Cylinder',
          volume: (Math.PI * r * r * h).toFixed(2),
          tsa: (2 * Math.PI * r * (r + h)).toFixed(2),
          lsa: (2 * Math.PI * r * h).toFixed(2),
          vertices: 0,
          edges: 2,
          faces: 3,
          spaceDiag: Math.sqrt((2 * r) ** 2 + h * h).toFixed(2)
        };
      }
      case 'cone': {
        const r = solidA;
        const h = solidB;
        const l = Math.sqrt(r * r + h * h);
        return {
          name: 'Right Circular Cone',
          volume: ((1 / 3) * Math.PI * r * r * h).toFixed(2),
          tsa: (Math.PI * r * (r + l)).toFixed(2),
          lsa: (Math.PI * r * l).toFixed(2),
          vertices: 1,
          edges: 1,
          faces: 2,
          spaceDiag: `Slant height: ${l.toFixed(2)}`
        };
      }
      case 'pyramid': {
        const s = solidA;
        const h = solidB;
        const slant = Math.sqrt((s / 2) ** 2 + h * h);
        return {
          name: 'Square Pyramid',
          volume: ((1 / 3) * s * s * h).toFixed(2),
          tsa: (s * s + 2 * s * slant).toFixed(2),
          lsa: (2 * s * slant).toFixed(2),
          vertices: 5,
          edges: 8,
          faces: 5,
          spaceDiag: `Slant: ${slant.toFixed(2)}`
        };
      }
      case 'prism': {
        const s = solidA;
        const h = solidB;
        const baseArea = (Math.sqrt(3) / 4) * s * s;
        return {
          name: 'Triangular Prism',
          volume: (baseArea * h).toFixed(2),
          tsa: (2 * baseArea + 3 * s * h).toFixed(2),
          lsa: (3 * s * h).toFixed(2),
          vertices: 6,
          edges: 9,
          faces: 5,
          spaceDiag: 'N/A'
        };
      }
      case 'hemisphere': {
        const r = solidA;
        return {
          name: 'Solid Hemisphere',
          volume: ((2 / 3) * Math.PI * r ** 3).toFixed(2),
          tsa: (3 * Math.PI * r * r).toFixed(2),
          lsa: (2 * Math.PI * r * r).toFixed(2) + ' (Curved)',
          vertices: 0,
          edges: 1,
          faces: 2,
          spaceDiag: (2 * r).toFixed(2)
        };
      }
      case 'tetrahedron': {
        const s = solidA;
        return {
          name: 'Regular Tetrahedron',
          volume: ((s ** 3) / (6 * Math.SQRT2)).toFixed(2),
          tsa: (Math.sqrt(3) * s * s).toFixed(2),
          lsa: ((3 * Math.sqrt(3) * s * s) / 4).toFixed(2),
          vertices: 4,
          edges: 6,
          faces: 4,
          spaceDiag: `Altitude: ${(s * Math.sqrt(2 / 3)).toFixed(2)}`
        };
      }
      default:
        return { name: '', volume: '', tsa: '', lsa: '', vertices: 0, edges: 0, faces: 0, spaceDiag: '' };
    }
  };

  // ─── 2D CANVAS DRAWING ───
  useEffect(() => {
    if (activeTab !== '2d_shapes') return;
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 22;

    ctx.strokeStyle = '#6366f1';
    ctx.fillStyle = 'rgba(99, 102, 241, 0.18)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    switch (selected2DShape) {
      case 'circle': {
        ctx.arc(cx, cy, dimA * scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        // Radius line
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + dimA * scale, cy);
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`r = ${dimA}`, cx + (dimA * scale) / 2, cy - 8);
        break;
      }
      case 'square': {
        const s = dimA * scale;
        ctx.rect(cx - s / 2, cy - s / 2, s, s);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(`s = ${dimA}`, cx, cy + s / 2 + 16);
        break;
      }
      case 'rectangle': {
        const l = dimA * scale;
        const w = dimB * scale;
        ctx.rect(cx - l / 2, cy - w / 2, l, w);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(`length = ${dimA}`, cx, cy + w / 2 + 16);
        ctx.fillText(`width = ${dimB}`, cx + l / 2 + 8, cy);
        break;
      }
      case 'triangle':
      case 'right_triangle': {
        const b = dimA * scale;
        const h = dimB * scale;
        ctx.moveTo(cx - b / 2, cy + h / 2);
        if (selected2DShape === 'right_triangle') {
          ctx.lineTo(cx - b / 2, cy - h / 2);
          ctx.lineTo(cx + b / 2, cy + h / 2);
        } else {
          ctx.lineTo(cx, cy - h / 2);
          ctx.lineTo(cx + b / 2, cy + h / 2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'regular_polygon': {
        const n = polySides;
        const r = dimA * scale;
        for (let i = 0; i < n; i++) {
          const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'ellipse': {
        ctx.ellipse(cx, cy, dimA * scale, dimB * scale, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'trapezoid':
      case 'parallelogram':
      case 'rhombus':
      case 'kite': {
        const s1 = dimA * scale;
        const s2 = dimB * scale;
        ctx.moveTo(cx - s1 / 2, cy + s2 / 2);
        ctx.lineTo(cx - s1 / 4, cy - s2 / 2);
        ctx.lineTo(cx + s1 / 4, cy - s2 / 2);
        ctx.lineTo(cx + s1 / 2, cy + s2 / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
    }
  }, [selected2DShape, dimA, dimB, dimC, polySides, activeTab]);

  // ─── THREE.JS 3D CANVAS RENDERING ───
  useEffect(() => {
    if (activeTab !== '3d_solids') return;
    const container = threeMountRef.current;
    if (!container) return;

    // Clear previous elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 500;
    const height = 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6366f1, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.8);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Grid helper
    const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
    grid.position.y = -4;
    scene.add(grid);

    // Create 3D Mesh according to selected3DSolid
    let geometry: THREE.BufferGeometry;
    const sA = solidA;
    const sB = solidB;
    const sC = solidC;

    switch (selected3DSolid) {
      case 'cube':
        geometry = new THREE.BoxGeometry(sA, sA, sA);
        break;
      case 'cuboid':
        geometry = new THREE.BoxGeometry(sA, sB, sC);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(sA, 32, 32);
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(sA, sA, sB, 32);
        break;
      case 'cone':
        geometry = new THREE.ConeGeometry(sA, sB, 32);
        break;
      case 'pyramid':
        geometry = new THREE.ConeGeometry(sA, sB, 4);
        break;
      case 'prism':
        geometry = new THREE.CylinderGeometry(sA, sA, sB, 3);
        break;
      case 'hemisphere':
        geometry = new THREE.SphereGeometry(sA, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(sA);
        break;
      default:
        geometry = new THREE.BoxGeometry(4, 4, 4);
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.25,
      metalness: 0.4,
      wireframe: wireframe,
      transparent: true,
      opacity: 0.9
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe edges overlay
    if (!wireframe) {
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xc7d2fe }));
      mesh.add(line);
    }

    // Animation loop & interactive rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [selected3DSolid, solidA, solidB, solidC, wireframe, activeTab]);

  // ─── THEOREMS CANVAS ───
  useEffect(() => {
    if (activeTab !== 'theorems') return;
    const canvas = theoremCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    if (activeTheorem === 'pythagorean') {
      // Draw right triangle with squares attached to sides
      const scale = 20;
      const a = pythA * scale;
      const b = pythB * scale;

      const ox = cx - 50;
      const oy = cy + 50;

      // Triangle
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + b, oy);
      ctx.lineTo(ox, oy - a);
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.fill();
      ctx.stroke();

      // Square on leg a
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.strokeStyle = '#ef4444';
      ctx.fillRect(ox - a, oy - a, a, a);
      ctx.strokeRect(ox - a, oy - a, a, a);
      ctx.fillStyle = '#fca5a5';
      ctx.font = '12px sans-serif';
      ctx.fillText(`a² = ${pythA * pythA}`, ox - a / 2 - 15, oy - a / 2);

      // Square on leg b
      ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.strokeStyle = '#22c55e';
      ctx.fillRect(ox, oy, b, b);
      ctx.strokeRect(ox, oy, b, b);
      ctx.fillStyle = '#86efac';
      ctx.fillText(`b² = ${pythB * pythB}`, ox + b / 2 - 15, oy + b / 2);

      // Label c^2
      const cSq = pythA * pythA + pythB * pythB;
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`c² = a² + b² = ${cSq}`, ox + b / 2 + 10, oy - a / 2);
    } else if (activeTheorem === 'inscribed_angle') {
      // Circle with central angle and inscribed angle
      const r = 120;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      const theta = (inscribedAngleDeg * 2 * Math.PI) / 180;
      const pA = { x: cx - r * Math.cos(theta / 2), y: cy + r * Math.sin(theta / 2) };
      const pB = { x: cx + r * Math.cos(theta / 2), y: cy + r * Math.sin(theta / 2) };
      const pTop = { x: cx, y: cy - r }; // Inscribed vertex

      // Central rays to center
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(cx, cy);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();

      // Inscribed rays to top
      ctx.beginPath();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pTop.x, pTop.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();

      // Text labels
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`Central Angle = 2θ = ${(inscribedAngleDeg * 2).toFixed(1)}°`, cx - 80, cy + 25);

      ctx.fillStyle = '#c084fc';
      ctx.fillText(`Inscribed Angle = θ = ${inscribedAngleDeg.toFixed(1)}°`, cx - 75, pTop.y - 12);
    } else {
      // Triangle Centers visualizer
      const pA = { x: cx, y: cy - 110 };
      const pB = { x: cx - 140, y: cy + 90 };
      const pC = { x: cx + 140, y: cy + 90 };

      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.lineTo(pC.x, pC.y);
      ctx.closePath();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Centroid G = (A+B+C)/3
      const gx = (pA.x + pB.x + pC.x) / 3;
      const gy = (pA.y + pB.y + pC.y) / 3;

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(gx, gy, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('Centroid G (Medians)', gx + 10, gy + 4);

      // Incenter approx
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(cx, cy + 15, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('Incenter I (Angle Bisectors)', cx + 10, cy + 20);
    }
  }, [activeTheorem, pythA, pythB, inscribedAngleDeg, activeTab]);

  // ─── COORDINATE PLANE CANVAS ───
  useEffect(() => {
    if (activeTab !== 'coordinate_plane') return;
    const canvas = coordCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const unit = 28;

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = -10; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(cx + x * unit, 0);
      ctx.lineTo(cx + x * unit, canvas.height);
      ctx.stroke();
    }
    for (let y = -10; y <= 10; y++) {
      ctx.beginPath();
      ctx.moveTo(0, cy - y * unit);
      ctx.lineTo(canvas.width, cy - y * unit);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(canvas.width, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, canvas.height);
    ctx.stroke();

    // Line segment between Pt1 and Pt2
    const p1x = cx + pt1.x * unit;
    const p1y = cy - pt1.y * unit;
    const p2x = cx + pt2.x * unit;
    const p2y = cy - pt2.y * unit;

    ctx.beginPath();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();

    // Points
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(p1x, p1y, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px sans-serif';
    ctx.fillText(`P1(${pt1.x}, ${pt1.y})`, p1x + 10, p1y - 10);

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(p2x, p2y, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(`P2(${pt2.x}, ${pt2.y})`, p2x + 10, p2y - 10);

    // Midpoint
    const mx = (pt1.x + pt2.x) / 2;
    const my = (pt1.y + pt2.y) / 2;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx + mx * unit, cy - my * unit, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(`Mid(${mx.toFixed(1)}, ${my.toFixed(1)})`, cx + mx * unit + 10, cy - my * unit + 15);
  }, [pt1, pt2, activeTab]);

  const coordStats = () => {
    const dx = pt2.x - pt1.x;
    const dy = pt2.y - pt1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const slope = dx !== 0 ? (dy / dx).toFixed(2) : 'Undefined (Vertical)';
    const midX = ((pt1.x + pt2.x) / 2).toFixed(1);
    const midY = ((pt1.y + pt2.y) / 2).toFixed(1);
    return { dist: dist.toFixed(2), slope, midX, midY };
  };

  const stat2D = calc2D();
  const stat3D = calc3D();
  const cStats = coordStats();

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Top Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#070514] via-[#140a30]/70 to-[#070514] border border-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              <Compass size={14} className="text-violet-400" /> Interactive Geometry Universe
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
              Real-time Manipulations & Theorems
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-cinzel">
            2D Shapes, 3D Solids & Coordinate Studio
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Inspect, rotate, scale, and manipulate 2D shapes and 3D polyhedra with live calculations of area, perimeter, surface area, and volume. Explore theorems and coordinate planes interactively.
          </p>
        </div>

        {/* Studio Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: '2d_shapes', label: '2D Shapes Studio', icon: Circle },
            { id: '3d_solids', label: '3D Solids (WebGL)', icon: Box },
            { id: 'coordinate_plane', label: 'Coordinate Plane', icon: Compass },
            { id: 'theorems', label: 'Theorem Proofs', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: 2D SHAPES */}
      {activeTab === '2d_shapes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls & Shape Selectors */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Select 2D Geometry
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'circle', label: 'Circle' },
                  { id: 'square', label: 'Square' },
                  { id: 'rectangle', label: 'Rectangle' },
                  { id: 'triangle', label: 'Triangle' },
                  { id: 'right_triangle', label: 'Right Triangle' },
                  { id: 'trapezoid', label: 'Trapezoid' },
                  { id: 'parallelogram', label: 'Parallelogram' },
                  { id: 'rhombus', label: 'Rhombus' },
                  { id: 'regular_polygon', label: 'Regular Polygon' },
                  { id: 'ellipse', label: 'Ellipse' },
                  { id: 'kite', label: 'Kite' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playClick();
                      setSelected2DShape(s.id as any);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                      selected2DShape === s.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-950 border border-slate-850 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Sliders */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                Dynamic Measurement Sliders
              </span>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Dimension A (Radius / Base / Length):</span>
                  <strong className="text-white font-mono">{dimA}</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={dimA}
                  onChange={(e) => setDimA(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {(selected2DShape === 'rectangle' || selected2DShape === 'triangle' || selected2DShape === 'right_triangle' || selected2DShape === 'trapezoid' || selected2DShape === 'parallelogram' || selected2DShape === 'rhombus' || selected2DShape === 'ellipse' || selected2DShape === 'kite') && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Dimension B (Height / Width / Minor Axis):</span>
                    <strong className="text-white font-mono">{dimB}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={dimB}
                    onChange={(e) => setDimB(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              )}

              {selected2DShape === 'regular_polygon' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Number of Sides (n):</span>
                    <strong className="text-white font-mono">{polySides}</strong>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="1"
                    value={polySides}
                    onChange={(e) => setPolySides(parseInt(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Interactive 2D Canvas & Measurements */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                2D Interactive Canvas ({stat2D.name})
              </span>
              <canvas
                ref={canvas2DRef}
                width={500}
                height={320}
                className="rounded-2xl bg-slate-950 border border-slate-850 shadow-inner max-w-full"
              />
            </div>

            {/* Realtime Measurements Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400">Calculated Area</span>
                <div className="text-2xl font-black text-white">{stat2D.area}</div>
                <span className="text-[10px] text-slate-400">Square Units</span>
              </div>
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-400">Calculated Perimeter</span>
                <div className="text-2xl font-black text-white">{stat2D.perimeter}</div>
                <span className="text-[10px] text-slate-400">Linear Units</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Geometry Details</span>
                <div className="text-sm font-bold text-white mt-1">{stat2D.extra}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 3D SOLIDS */}
      {activeTab === '3d_solids' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Select 3D Polyhedron / Solid
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'cube', label: 'Cube' },
                  { id: 'cuboid', label: 'Cuboid' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'cylinder', label: 'Cylinder' },
                  { id: 'cone', label: 'Cone' },
                  { id: 'pyramid', label: 'Square Pyramid' },
                  { id: 'prism', label: 'Triangular Prism' },
                  { id: 'hemisphere', label: 'Hemisphere' },
                  { id: 'tetrahedron', label: 'Tetrahedron' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playClick();
                      setSelected3DSolid(s.id as any);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                      selected3DSolid === s.id
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-slate-950 border border-slate-850 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Solid Scaling
                </span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                    wireframe
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Wireframe: {wireframe ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Dimension A (Side / Radius):</span>
                  <strong className="text-white font-mono">{solidA}</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="7"
                  step="0.5"
                  value={solidA}
                  onChange={(e) => setSolidA(parseFloat(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              {(selected3DSolid === 'cuboid' || selected3DSolid === 'cylinder' || selected3DSolid === 'cone' || selected3DSolid === 'pyramid' || selected3DSolid === 'prism') && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Dimension B (Height):</span>
                    <strong className="text-white font-mono">{solidB}</strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.5"
                    value={solidB}
                    onChange={(e) => setSolidB(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* WebGL 3D Canvas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold text-white">3D WebGL Canvas ({stat3D.name})</span>
                <span className="text-[11px] text-indigo-400">Drag to rotate in 3D</span>
              </div>
              <div
                ref={threeMountRef}
                className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-850 shadow-2xl cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Realtime 3D Measurements Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400">Volume</span>
                <div className="text-xl font-black text-white">{stat3D.volume}</div>
                <span className="text-[10px] text-slate-400">Cubic Units</span>
              </div>
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-400">Total Surface Area</span>
                <div className="text-xl font-black text-white">{stat3D.tsa}</div>
                <span className="text-[10px] text-slate-400">Square Units</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Euler Polyhedral</span>
                <div className="text-xs font-bold text-slate-200 mt-1">
                  V: {stat3D.vertices} | E: {stat3D.edges} | F: {stat3D.faces}
                </div>
                <span className="text-[9px] text-emerald-400/80">V - E + F = 2</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400">Space Diagonal</span>
                <div className="text-sm font-bold text-white mt-1">{stat3D.spaceDiag}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COORDINATE PLANE */}
      {activeTab === 'coordinate_plane' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass size={16} className="text-indigo-400" />
              Point Coordinates & Vector Segment
            </h3>

            {/* Point 1 controls */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-3">
              <span className="text-xs font-bold text-rose-400">Point 1 (x₁, y₁)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">x₁ = {pt1.x}</label>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    step="1"
                    value={pt1.x}
                    onChange={(e) => setPt1(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                    className="w-full accent-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">y₁ = {pt1.y}</label>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    step="1"
                    value={pt1.y}
                    onChange={(e) => setPt1(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Point 2 controls */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-3">
              <span className="text-xs font-bold text-emerald-400">Point 2 (x₂, y₂)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">x₂ = {pt2.x}</label>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    step="1"
                    value={pt2.x}
                    onChange={(e) => setPt2(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">y₂ = {pt2.y}</label>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    step="1"
                    value={pt2.y}
                    onChange={(e) => setPt2(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Interactive Cartesian Plane
              </span>
              <canvas
                ref={coordCanvasRef}
                width={500}
                height={350}
                className="rounded-2xl bg-slate-950 border border-slate-850 shadow-inner max-w-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-center">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block">Distance d</span>
                <span className="text-2xl font-black text-white">{cStats.dist}</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-center">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">Slope m</span>
                <span className="text-2xl font-black text-white">{cStats.slope}</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-center">
                <span className="text-[10px] font-bold text-amber-400 uppercase block">Midpoint</span>
                <span className="text-xl font-black text-white">({cStats.midX}, {cStats.midY})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: THEOREM PROOFS */}
      {activeTab === 'theorems' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Theorem Demonstrations
            </span>
            <div className="space-y-2">
              {[
                { id: 'pythagorean', label: 'Pythagorean Theorem Proof' },
                { id: 'inscribed_angle', label: 'Inscribed Angle Theorem' },
                { id: 'triangle_centers', label: 'Triangle Centers & Euler Line' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTheorem(t.id as any);
                  }}
                  className={`w-full p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeTheorem === t.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Parameters for theorem */}
            {activeTheorem === 'pythagorean' && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="space-y-1">
                  <span className="text-xs text-slate-300">Leg a = {pythA}</span>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    step="1"
                    value={pythA}
                    onChange={(e) => setPythA(parseInt(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-300">Leg b = {pythB}</span>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    step="1"
                    value={pythB}
                    onChange={(e) => setPythB(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            )}

            {activeTheorem === 'inscribed_angle' && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-300">Inscribed Angle θ = {inscribedAngleDeg}°</span>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="1"
                  value={inscribedAngleDeg}
                  onChange={(e) => setInscribedAngleDeg(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center">
            <canvas
              ref={theoremCanvasRef}
              width={520}
              height={380}
              className="rounded-2xl bg-slate-950 border border-slate-850 shadow-inner max-w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
