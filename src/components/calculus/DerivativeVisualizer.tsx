import React, { useState, useEffect, useRef, useMemo } from 'react';
import { parseMathFunction, computeNumericalDerivative } from '../../services/evaluator';
import { MathView } from '../common/MathView';
import { Play, Pause, RotateCcw, Info, Sliders, Zap } from 'lucide-react';
import { sound } from '../../services/audio';

const PRESET_FUNCTIONS = [
  { label: 'Cubic (x³ - 3x)', expr: 'x^3 - 3*x', desc: 'Notice extrema where derivative is zero' },
  { label: 'Sine Wave (sin x)', expr: 'sin(x)', desc: 'Derivative is cosine, shifted by π/2' },
  { label: 'Gaussian (3e^(-x²))', expr: '3*exp(-x^2)', desc: 'Bell curve derivative has two critical inflection points' },
  { label: 'Damped Oscillation (x·sin(2x))', expr: 'x*sin(2*x)', desc: 'Growing wave demonstrates product rule' },
  { label: 'Rational (4 / (1 + x²))', expr: '4/(1 + x^2)', desc: 'Witch of Agnesi with max at origin' }
];

export const DerivativeVisualizer: React.FC = () => {
  const [expr, setExpr] = useState('x^3 - 3*x');
  const [x0, setX0] = useState(1.0);
  const [showDerivativeCurve, setShowDerivativeCurve] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fn = useMemo(() => parseMathFunction(expr), [expr]);
  const slope = useMemo(() => computeNumericalDerivative(fn, x0), [fn, x0]);
  const y0 = useMemo(() => Math.round(fn(x0) * 1000) / 1000, [fn, x0]);

  // Coordinate mapping
  const xMin = -4, xMax = 4;
  const yMin = -4, yMax = 4;

  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const step = () => {
        setX0(prev => {
          let next = prev + 0.02;
          if (next > 3.5) next = -3.5;
          return Math.round(next * 100) / 100;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toCanvasY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
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

    // Axis Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '11px sans-serif';
    ctx.fillText('x', width - 15, toCanvasY(0) - 8);
    ctx.fillText('y', toCanvasX(0) + 8, 15);

    // Plot Derivative Curve f'(x) in translucent violet if enabled
    if (showDerivativeCurve) {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      let started = false;
      const numPts = 300;
      for (let i = 0; i <= numPts; i++) {
        const x = xMin + (i / numPts) * (xMax - xMin);
        const yDeriv = computeNumericalDerivative(fn, x);
        const cx = toCanvasX(x);
        const cy = toCanvasY(yDeriv);
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
      ctx.setLineDash([]);
    }

    // Plot Original Function f(x) in bright cyan
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    const numPts = 400;
    for (let i = 0; i <= numPts; i++) {
      const x = xMin + (i / numPts) * (xMax - xMin);
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

    // Tangent Line at x0 in gold/amber
    const cx0 = toCanvasX(x0);
    const cy0 = toCanvasY(y0);
    const tSpan = 2.5;
    const xT1 = x0 - tSpan;
    const yT1 = y0 - slope * tSpan;
    const xT2 = x0 + tSpan;
    const yT2 = y0 + slope * tSpan;

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(xT1), toCanvasY(yT1));
    ctx.lineTo(toCanvasX(xT2), toCanvasY(yT2));
    ctx.stroke();

    // Point of tangency (x0, y0)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx0, cy0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Normal line projection or slope triangle indicator
    const triangleDx = 0.6;
    const triangleDy = slope * triangleDx;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(toCanvasX(x0), toCanvasY(y0));
    ctx.lineTo(toCanvasX(x0 + triangleDx), toCanvasY(y0));
    ctx.lineTo(toCanvasX(x0 + triangleDx), toCanvasY(y0 + triangleDy));
    ctx.stroke();
    ctx.setLineDash([]);
  }, [fn, x0, slope, y0, showDerivativeCurve]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Zap size={20} />
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">Interactive Derivative Visualizer</h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Observe the instantaneous rate of change and tangent line glide along the curve in real time.
          </p>
        </div>

        {/* Function Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESET_FUNCTIONS.map(p => (
            <button
              key={p.expr}
              onClick={() => {
                sound.playClick();
                setExpr(p.expr);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                expr === p.expr 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-indigo-400' 
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
            className="w-full h-auto cursor-crosshair rounded-lg block"
            onClick={(e) => {
              sound.playClick();
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              const targetX = xMin + ratio * (xMax - xMin);
              setX0(Math.round(targetX * 100) / 100);
            }}
          />

          <div className="absolute top-5 left-5 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 backdrop-blur-md text-xs space-y-1.5 pointer-events-none shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400"></span>
              <span className="text-slate-300 font-mono">f(x) = {expr}</span>
            </div>
            {showDerivativeCurve && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 border-t-2 border-dashed border-purple-400"></span>
                <span className="text-purple-300 font-mono">f'(x) (Derivative Curve)</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="text-amber-300 font-mono">Tangent at x = {x0}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry & Controls */}
        <div className="space-y-5">
          {/* Custom Equation Input */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Custom Function f(x)
            </label>
            <div className="relative">
              <input
                type="text"
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                placeholder="e.g. x^3 - 3*x"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Point Slider Control */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} /> Tangency Point x₀
              </span>
              <span className="font-mono text-sm text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                x₀ = {x0}
              </span>
            </div>
            <input
              type="range"
              min="-3.5"
              max="3.5"
              step="0.05"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/30 transition-all"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? 'Pause Animation' : 'Auto-Glide Tangent'}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setX0(0);
                }}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw size={12} /> Reset to x=0
              </button>
            </div>
          </div>

          {/* Calculus Telemetry Cards */}
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-900/40 p-4 rounded-xl shadow-lg">
              <div className="text-xs text-slate-400 uppercase font-semibold">Instantaneous Rate of Change</div>
              <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                f'({x0}) = {slope > 0 ? `+${slope}` : slope}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Point on curve: <span className="font-mono text-sky-300">({x0}, {y0})</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="text-xs text-slate-400 uppercase font-semibold">Tangent Line Equation</div>
              <div className="mt-2 text-indigo-200">
                <MathView
                  math={`y - (${y0}) = ${slope}(x - (${x0}))`}
                  block
                />
              </div>
            </div>
          </div>

          {/* Toggle Derivative Curve */}
          <label className="flex items-center gap-3 p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors">
            <input
              type="checkbox"
              checked={showDerivativeCurve}
              onChange={(e) => {
                sound.playClick();
                setShowDerivativeCurve(e.target.checked);
              }}
              className="accent-indigo-500 w-4 h-4 rounded"
            />
            <span className="text-xs text-slate-300">
              Overlay Global Derivative Function <span className="text-purple-400 font-mono">f'(x)</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
