import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import {
  Activity, Sliders, Box, Layers, Maximize2, RotateCcw,
  Sparkles, Compass, Eye, TrendingUp, Zap
} from 'lucide-react';

export const GraphingStudio: React.FC = () => {
  const [dimensionMode, setDimensionMode] = useState<'2d' | '3d'>('2d');

  // ─── 2D GRAPHING STATE ───
  const [graphMode2D, setGraphMode2D] = useState<'cartesian' | 'polar' | 'parametric'>('cartesian');
  const [selectedFunc2D, setSelectedFunc2D] = useState<'sine' | 'polynomial' | 'gaussian' | 'rational' | 'damped_wave'>('sine');
  const [paramA, setParamA] = useState(1);
  const [paramB, setParamB] = useState(1);
  const [paramC, setParamC] = useState(0);
  const [showTangent, setShowTangent] = useState(true);
  const [probeX, setProbeX] = useState(1.5);
  const [showRiemann, setShowRiemann] = useState(false);
  const [riemannN, setRiemannN] = useState(8);
  const [riemannType, setRiemannType] = useState<'midpoint' | 'left' | 'right'>('midpoint');

  // ─── 3D GRAPHING STATE ───
  const [selectedSurface3D, setSelectedSurface3D] = useState<'saddle' | 'paraboloid' | 'ripple' | 'monkey_saddle' | 'torus'>('saddle');
  const [param3DA, setParam3DA] = useState(1);
  const [param3DB, setParam3DB] = useState(1);
  const [wireframe3D, setWireframe3D] = useState(false);

  // Canvas & Three.js Refs
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const threeMountRef = useRef<HTMLDivElement | null>(null);

  // ─── 2D FUNCTION EVALUATOR ───
  const eval2D = (x: number) => {
    const a = paramA;
    const b = paramB;
    const c = paramC;
    switch (selectedFunc2D) {
      case 'sine':
        return a * Math.sin(b * x) + c;
      case 'polynomial':
        return a * (x ** 3) - b * x + c;
      case 'gaussian':
        return a * Math.exp(-b * (x ** 2)) + c;
      case 'rational':
        return a / (1 + b * (x ** 2)) + c;
      case 'damped_wave':
        return a * Math.exp(-0.3 * Math.abs(x)) * Math.cos(b * x) + c;
      default:
        return x;
    }
  };

  // Numerical Derivative of 2D Function
  const deriv2D = (x: number) => {
    const h = 0.0001;
    return (eval2D(x + h) - eval2D(x - h)) / (2 * h);
  };

  // Formula LaTeX Strings for 2D Functions
  const get2DFormulaLatex = () => {
    switch (selectedFunc2D) {
      case 'sine':
        return `f(x) = ${paramA}\\sin(${paramB}x) ${paramC >= 0 ? '+' : ''} ${paramC}`;
      case 'polynomial':
        return `f(x) = ${paramA}x^3 - ${paramB}x ${paramC >= 0 ? '+' : ''} ${paramC}`;
      case 'gaussian':
        return `f(x) = ${paramA}e^{-${paramB}x^2} ${paramC >= 0 ? '+' : ''} ${paramC}`;
      case 'rational':
        return `f(x) = \\frac{${paramA}}{1 + ${paramB}x^2} ${paramC >= 0 ? '+' : ''} ${paramC}`;
      case 'damped_wave':
        return `f(x) = ${paramA}e^{-0.3|x|}\\cos(${paramB}x)`;
      default:
        return 'f(x) = x';
    }
  };

  // ─── 2D CANVAS DRAWING ───
  useEffect(() => {
    if (dimensionMode !== '2d') return;
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scaleX = 40;
    const scaleY = 40;

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = -10; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(cx + x * scaleX, 0);
      ctx.lineTo(cx + x * scaleX, h);
      ctx.stroke();
    }
    for (let y = -8; y <= 8; y++) {
      ctx.beginPath();
      ctx.moveTo(0, cy - y * scaleY);
      ctx.lineTo(w, cy - y * scaleY);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    // Riemann Sum Rectangles if active
    if (showRiemann && graphMode2D === 'cartesian') {
      const a = -2;
      const b = 2;
      const dx = (b - a) / riemannN;
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < riemannN; i++) {
        const xLeft = a + i * dx;
        const xRight = xLeft + dx;
        let xEval = (xLeft + xRight) / 2;
        if (riemannType === 'left') xEval = xLeft;
        else if (riemannType === 'right') xEval = xRight;

        const yVal = eval2D(xEval);
        const rectPxX = cx + xLeft * scaleX;
        const rectPxW = dx * scaleX;
        const rectPxH = yVal * scaleY;
        const rectPxY = cy - rectPxH;

        ctx.fillRect(rectPxX, yVal >= 0 ? rectPxY : cy, rectPxW, Math.abs(rectPxH));
        ctx.strokeRect(rectPxX, yVal >= 0 ? rectPxY : cy, rectPxW, Math.abs(rectPxH));
      }
    }

    // Draw Main Function Curve
    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;

    if (graphMode2D === 'cartesian') {
      let first = true;
      for (let px = 0; px < w; px++) {
        const x = (px - cx) / scaleX;
        const y = eval2D(x);
        const py = cy - y * scaleY;
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // Tangent Line at probeX
      if (showTangent) {
        const yProbe = eval2D(probeX);
        const slope = deriv2D(probeX);
        const pxProbe = cx + probeX * scaleX;
        const pyProbe = cy - yProbe * scaleY;

        // Tangent segment
        const tLen = 2.5;
        const x1 = probeX - tLen;
        const y1 = yProbe - slope * tLen;
        const x2 = probeX + tLen;
        const y2 = yProbe + slope * tLen;

        ctx.beginPath();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.moveTo(cx + x1 * scaleX, cy - y1 * scaleY);
        ctx.lineTo(cx + x2 * scaleX, cy - y2 * scaleY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Probe Point
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(pxProbe, pyProbe, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`Slope f'(${probeX}) = ${slope.toFixed(2)}`, pxProbe + 10, pyProbe - 10);
      }
    } else if (graphMode2D === 'polar') {
      // Polar: r = a(1 - cos(theta)) or rose r = a cos(k theta)
      ctx.beginPath();
      ctx.strokeStyle = '#ec4899';
      for (let t = 0; t <= 2 * Math.PI; t += 0.02) {
        const r = paramA * (1 - Math.cos(t)); // Cardioid
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        const px = cx + x * scaleX;
        const py = cy - y * scaleY;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    } else if (graphMode2D === 'parametric') {
      // Parametric: Lissajous curve x = a sin(b t), y = a cos(c t)
      ctx.beginPath();
      ctx.strokeStyle = '#a855f7';
      for (let t = 0; t <= 2 * Math.PI; t += 0.02) {
        const x = paramA * Math.sin(paramB * t);
        const y = paramA * Math.cos(3 * t);
        const px = cx + x * scaleX;
        const py = cy - y * scaleY;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }, [
    dimensionMode, graphMode2D, selectedFunc2D, paramA, paramB, paramC,
    showTangent, probeX, showRiemann, riemannN, riemannType
  ]);

  // ─── 3D THREE.JS SURFACE PLOTTER ───
  useEffect(() => {
    if (dimensionMode !== '3d') return;
    const container = threeMountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 600;
    const height = 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(16, 14, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const light1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    light1.position.set(15, 20, 15);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xa855f7, 2.0);
    light2.position.set(-15, -10, -15);
    scene.add(light2);

    // Grid Floor
    const grid = new THREE.GridHelper(24, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -6;
    scene.add(grid);

    // Generate 3D Parametric Surface
    const size = 10;
    const segments = 48;
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const a = param3DA;
    const b = param3DB;

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * 2 - 1; // [-1, 1]
      const x = u * size;

      for (let j = 0; j <= segments; j++) {
        const v = (j / segments) * 2 - 1; // [-1, 1]
        const y = v * size;

        let z = 0;
        if (selectedSurface3D === 'saddle') {
          // Hyperbolic Paraboloid: z = (x^2 - y^2) / a
          z = ((x ** 2) - (y ** 2)) / (a * 5);
        } else if (selectedSurface3D === 'paraboloid') {
          // Elliptic Paraboloid: z = (x^2 + y^2) / a
          z = ((x ** 2) + (y ** 2)) / (a * 6) - 4;
        } else if (selectedSurface3D === 'ripple') {
          // 2D Bessel Wave: z = sin(r) / r
          const r = Math.sqrt(x * x + y * y) + 0.001;
          z = (Math.sin(b * r) / r) * (a * 6);
        } else if (selectedSurface3D === 'monkey_saddle') {
          // Monkey Saddle: z = x^3 - 3xy^2
          z = (x ** 3 - 3 * x * y ** 2) / (a * 30);
        } else if (selectedSurface3D === 'torus') {
          z = Math.cos(x) * Math.sin(y) * a * 2;
        }

        vertices.push(x, z, y);

        // Height color gradient (Viridis style: purple -> cyan -> yellow)
        const normZ = Math.max(0, Math.min(1, (z + 5) / 10));
        const color = new THREE.Color().setHSL(0.6 - normZ * 0.5, 0.9, 0.55);
        colors.push(color.r, color.g, color.b);
      }
    }

    // Generate Triangles
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const p1 = i * (segments + 1) + j;
        const p2 = p1 + 1;
        const p3 = (i + 1) * (segments + 1) + j;
        const p4 = p3 + 1;

        indices.push(p1, p3, p2);
        indices.push(p2, p3, p4);
      }
    }

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.2,
      wireframe: wireframe3D
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Interactive Drag Rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      mesh.rotation.y += dx * 0.01;
      mesh.rotation.x += dy * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
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
        mesh.rotation.y += 0.004;
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
  }, [dimensionMode, selectedSurface3D, param3DA, param3DB, wireframe3D]);

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Activity size={14} /> Advanced Graphing Studio
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Interactive 2D & 3D WebGL Surface Visualizer
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Function & Surface Laboratory
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Plot Cartesian, polar, and parametric curves. Inspect instantaneous tangents, evaluate Riemann sums, and explore 3D mathematical surfaces with real-time parameter manipulation.
          </p>
        </div>

        {/* 2D vs 3D Dimension Toggle */}
        <div className="flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setDimensionMode('2d');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              dimensionMode === '2d'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp size={14} />
            <span>2D Graphing</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setDimensionMode('3d');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              dimensionMode === '3d'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box size={14} />
            <span>3D Surfaces</span>
          </button>
        </div>
      </div>

      {/* 2D MODE */}
      {dimensionMode === '2d' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Coordinate Framework
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-850">
                {(['cartesian', 'polar', 'parametric'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick();
                      setGraphMode2D(m);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      graphMode2D === m
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            {graphMode2D === 'cartesian' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Function Preset
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sine', label: 'Sinusoid' },
                    { id: 'polynomial', label: 'Cubic Poly' },
                    { id: 'gaussian', label: 'Gaussian Bell' },
                    { id: 'rational', label: 'Agnesi Witch' },
                    { id: 'damped_wave', label: 'Damped Wave' }
                  ].map(fn => (
                    <button
                      key={fn.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedFunc2D(fn.id as any);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        selectedFunc2D === fn.id
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-slate-950 border border-slate-850 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {fn.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Parameter Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                Dynamic Parameter Sliders
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Amplitude / Scale a:</span>
                  <strong className="text-white font-mono">{paramA}</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={paramA}
                  onChange={(e) => setParamA(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Frequency / Coefficient b:</span>
                  <strong className="text-white font-mono">{paramB}</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={paramB}
                  onChange={(e) => setParamB(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Vertical Shift c:</span>
                  <strong className="text-white font-mono">{paramC}</strong>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={paramC}
                  onChange={(e) => setParamC(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            {/* Calculus Visualizer Controls */}
            {graphMode2D === 'cartesian' && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Tangent & Derivative Probe</span>
                  <button
                    onClick={() => setShowTangent(!showTangent)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                      showTangent
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    {showTangent ? 'ON' : 'OFF'}
                  </button>
                </div>
                {showTangent && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Probe Point x₀:</span>
                      <span className="text-amber-400 font-mono">{probeX.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-4"
                      max="4"
                      step="0.1"
                      value={probeX}
                      onChange={(e) => setProbeX(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <span className="text-xs font-bold text-slate-300">Riemann Integral Sum</span>
                  <button
                    onClick={() => setShowRiemann(!showRiemann)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                      showRiemann
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    {showRiemann ? 'ON' : 'OFF'}
                  </button>
                </div>
                {showRiemann && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Subintervals n:</span>
                      <span className="text-indigo-400 font-mono">{riemannN}</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="32"
                      step="2"
                      value={riemannN}
                      onChange={(e) => setRiemannN(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      {(['left', 'midpoint', 'right'] as const).map(rt => (
                        <button
                          key={rt}
                          onClick={() => setRiemannType(rt)}
                          className={`py-1 rounded border capitalize ${
                            riemannType === rt
                              ? 'bg-indigo-600 text-white border-indigo-500'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {rt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2D Canvas Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-300">
                  {graphMode2D === 'cartesian' ? 'Cartesian Plane y = f(x)' : graphMode2D === 'polar' ? 'Polar Curve r = f(θ)' : 'Parametric Curve (x(t), y(t))'}
                </span>
                <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-indigo-300">
                  <MathView math={get2DFormulaLatex()} />
                </div>
              </div>

              <canvas
                ref={canvas2DRef}
                width={560}
                height={380}
                className="w-full h-[380px] rounded-2xl bg-slate-950 border border-slate-850 shadow-inner max-w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        /* 3D MODE */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                Mathematical Surface Preset
              </span>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'saddle', label: 'Hyperbolic Paraboloid (Saddle)' },
                  { id: 'paraboloid', label: 'Elliptic Paraboloid' },
                  { id: 'ripple', label: 'Bessel Wave Surface' },
                  { id: 'monkey_saddle', label: 'Monkey Saddle (z = x³ - 3xy²)' },
                  { id: 'torus', label: 'Wave Torus' }
                ].map(surf => (
                  <button
                    key={surf.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedSurface3D(surf.id as any);
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                      selectedSurface3D === surf.id
                        ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                        : 'bg-slate-950 border border-slate-850 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {surf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Controls */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Wireframe Mesh</span>
                <button
                  onClick={() => setWireframe3D(!wireframe3D)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    wireframe3D
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}
                >
                  {wireframe3D ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Surface Curvature Scale a:</span>
                  <strong className="text-white font-mono">{param3DA}</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={param3DA}
                  onChange={(e) => setParam3DA(parseFloat(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-bold text-white">3D Surface Render</span>
                <span className="text-purple-400">Click & Drag with mouse to orbit</span>
              </div>
              <div
                ref={threeMountRef}
                className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-850 shadow-2xl cursor-grab active:cursor-grabbing"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
