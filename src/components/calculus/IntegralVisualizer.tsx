import React, { useState, useEffect, useRef, useMemo } from 'react';
import { parseMathFunction, computeRiemannSums } from '../../services/evaluator';
import { MathView } from '../common/MathView';
import { Maximize, Sliders, Layers, CheckCircle2, TrendingUp } from 'lucide-react';
import { sound } from '../../services/audio';

const PRESET_INTEGRALS = [
  { label: 'Parabola (x²)', expr: 'x^2', a: 0, b: 2, desc: 'Classic Archimedean quadrature: exact value = 8/3 ≈ 2.6667' },
  { label: 'Sinusoid (sin x)', expr: 'sin(x)', a: 0, b: 3.14, desc: 'Half-period of sine: exact value = 2.0000' },
  { label: 'Signed Cubic (x³ - 2x)', expr: 'x^3 - 2*x', a: -1, b: 2, desc: 'Features both negative signed area and positive area' },
  { label: 'Exponential (e^x)', expr: 'exp(x)', a: 0, b: 1, desc: 'Euler constant: e - 1 ≈ 1.7183' }
];

export const IntegralVisualizer: React.FC = () => {
  const [expr, setExpr] = useState('x^2');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [n, setN] = useState(12);
  const [method, setMethod] = useState<'left' | 'right' | 'midpoint' | 'trapezoid'>('midpoint');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fn = useMemo(() => parseMathFunction(expr), [expr]);
  const riemann = useMemo(() => computeRiemannSums(fn, a, b, n, method), [fn, a, b, n, method]);

  // High-precision benchmark using 500-step Simpson's rule
  const exactBenchmark = useMemo(() => {
    return computeRiemannSums(fn, a, b, 500, 'midpoint').simpsonSum;
  }, [fn, a, b]);

  const currentSum = useMemo(() => {
    switch (method) {
      case 'left': return riemann.leftSum;
      case 'right': return riemann.rightSum;
      case 'midpoint': return riemann.midpointSum;
      case 'trapezoid': return riemann.trapezoidSum;
    }
  }, [method, riemann]);

  const errorDelta = useMemo(() => {
    return Math.abs(currentSum - exactBenchmark);
  }, [currentSum, exactBenchmark]);

  // Coordinate system mapping
  const xMin = Math.min(-1, a - 1), xMax = Math.max(3, b + 1);
  const yMin = -2, yMax = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toCanvasY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Subtle Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(width, toCanvasY(0));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), height);
    ctx.stroke();

    // Draw Riemann Rectangles
    riemann.rectangles.forEach(rect => {
      const rx = toCanvasX(rect.x);
      const rw = toCanvasX(rect.x + rect.width) - rx;
      const ryZero = toCanvasY(0);
      const ryTop = toCanvasY(rect.height);

      const isPositive = rect.height >= 0;
      ctx.fillStyle = isPositive 
        ? 'rgba(56, 189, 248, 0.28)' // Cyan/Blue
        : 'rgba(244, 63, 94, 0.28)';  // Rose/Red

      ctx.strokeStyle = isPositive
        ? 'rgba(56, 189, 248, 0.8)'
        : 'rgba(244, 63, 94, 0.8)';
      ctx.lineWidth = 1.5;

      const top = Math.min(ryZero, ryTop);
      const h = Math.abs(ryTop - ryZero);

      ctx.fillRect(rx, top, rw, h);
      ctx.strokeRect(rx, top, rw, h);

      // Draw sample height point
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(toCanvasX(rect.sampleX), toCanvasY(rect.height), 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Smooth Function Curve f(x)
    ctx.strokeStyle = '#a855f7'; // Purple neon
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    const steps = 400;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = fn(x);
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      if (cy >= -100 && cy <= height + 100) {
        if (!started) {
          ctx.moveTo(cx, cy);
          started = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();

    // Highlight Integration Bounds a and b
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    // Bound a
    ctx.beginPath();
    ctx.moveTo(toCanvasX(a), 0);
    ctx.lineTo(toCanvasX(a), height);
    ctx.stroke();

    // Bound b
    ctx.beginPath();
    ctx.moveTo(toCanvasX(b), 0);
    ctx.lineTo(toCanvasX(b), height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Bound text tags
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`a = ${a}`, toCanvasX(a) + 5, toCanvasY(0) + 16);
    ctx.fillText(`b = ${b}`, toCanvasX(b) + 5, toCanvasY(0) + 16);
  }, [fn, a, b, n, method, riemann]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
              <Maximize size={20} />
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">Interactive Definite Integral & Riemann Visualizer</h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manipulate bounds, increase subdivision rectangles (n → ∞), and watch discrete Riemann sums converge to exact continuous area.
          </p>
        </div>

        {/* Integral Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESET_INTEGRALS.map(p => (
            <button
              key={p.label}
              onClick={() => {
                sound.playClick();
                setExpr(p.expr);
                setA(p.a);
                setB(p.b);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                expr === p.expr 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 ring-1 ring-purple-400' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Canvas Graph */}
        <div className="lg:col-span-2 relative bg-slate-950/80 rounded-xl border border-slate-800 p-3 overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={700}
            height={440}
            className="w-full h-auto rounded-lg block"
          />

          <div className="absolute top-5 left-5 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 backdrop-blur-md text-xs space-y-1.5 pointer-events-none shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400"></span>
              <span className="text-purple-300 font-mono">f(x) = {expr}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-sky-400/40 border border-sky-400"></span>
              <span className="text-sky-300">Positive Signed Area</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-500/40 border border-rose-500"></span>
              <span className="text-rose-300">Negative Signed Area</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 border-t-2 border-dashed border-emerald-400"></span>
              <span className="text-emerald-400 font-mono">Bounds [{a}, {b}]</span>
            </div>
          </div>
        </div>

        {/* Controls & Numerical Convergence Telemetry */}
        <div className="space-y-5">
          {/* Function & Bounds Inputs */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Integrand f(x)
              </label>
              <input
                type="text"
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Lower Bound (a)</label>
                <input
                  type="number"
                  step="0.5"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Upper Bound (b)</label>
                <input
                  type="number"
                  step="0.5"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Subdivisions (n) Slider */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} /> Partitions n = {n}
              </span>
              <span className="text-xs font-mono text-purple-400">
                Δx = {riemann.deltaX}
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="80"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Riemann Sampling Rule Selector */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Summation Rule
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['left', 'right', 'midpoint', 'trapezoid'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    sound.playClick();
                    setMethod(m);
                  }}
                  className={`py-2 px-2.5 rounded-lg capitalize font-medium transition-all ${
                    method === m 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {m} Rule
                </button>
              ))}
            </div>
          </div>

          {/* Convergence Metrics Card */}
          <div className="bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-900/40 p-4 rounded-xl shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase font-semibold">Riemann Approximation</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                n = {n}
              </span>
            </div>
            <div className="text-3xl font-black text-sky-400 font-mono">
              ≈ {currentSum}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Exact Integral Benchmark:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {exactBenchmark}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Absolute Error |Δ|:</span>
              <span className={`font-mono font-bold ${errorDelta < 0.05 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {errorDelta.toFixed(5)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
