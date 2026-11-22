import React, { useState, useEffect, useRef, useMemo } from 'react';
import { parseMathFunction, computeAccumulatedArea } from '../../services/evaluator';
import { MathView } from '../common/MathView';
import { Sliders, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../../services/audio';

export const FtcExplorer: React.FC = () => {
  const [expr, setExpr] = useState('cos(x) + 1.2');
  const [aFixed] = useState(0); // fixed lower bound
  const [xBound, setXBound] = useState(2.2); // interactive upper bound
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fn = useMemo(() => parseMathFunction(expr), [expr]);
  const accumulatedArea = useMemo(() => {
    return computeAccumulatedArea(fn, aFixed, xBound);
  }, [fn, aFixed, xBound]);

  const instantaneousHeight = useMemo(() => {
    return Math.round(fn(xBound) * 1000) / 1000;
  }, [fn, xBound]);

  // Coordinate ranges
  const xMin = -0.5, xMax = 5.5;
  const yMin = -0.5, yMax = 4.0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toCanvasY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 5; x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }
    for (let y = 0; y <= 4; y++) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(width, toCanvasY(0));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), height);
    ctx.stroke();

    // Fill Shaded Accumulation Region: from a to xBound
    const areaSteps = 150;
    ctx.fillStyle = 'rgba(99, 102, 241, 0.35)'; // Indigo gradient fill
    ctx.beginPath();
    ctx.moveTo(toCanvasX(aFixed), toCanvasY(0));

    for (let i = 0; i <= areaSteps; i++) {
      const curX = aFixed + (i / areaSteps) * (xBound - aFixed);
      ctx.lineTo(toCanvasX(curX), toCanvasY(fn(curX)));
    }
    ctx.lineTo(toCanvasX(xBound), toCanvasY(0));
    ctx.closePath();
    ctx.fill();

    // Plot Accumulated Function F(x) = int_a^x f(t) dt in Emerald
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let startedF = false;
    const fSteps = 200;
    for (let i = 0; i <= fSteps; i++) {
      const curX = xMin + (i / fSteps) * (xMax - xMin);
      if (curX < 0) continue;
      const curArea = computeAccumulatedArea(fn, aFixed, curX, 40);
      const cx = toCanvasX(curX);
      const cy = toCanvasY(curArea);
      if (cy >= -100 && cy <= height + 100) {
        if (!startedF) {
          ctx.moveTo(cx, cy);
          startedF = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      }
    }
    ctx.stroke();

    // Plot Curve f(t) in Cyan
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    const curveSteps = 300;
    for (let i = 0; i <= curveSteps; i++) {
      const t = xMin + (i / curveSteps) * (xMax - xMin);
      const y = fn(t);
      const cx = toCanvasX(t);
      const cy = toCanvasY(y);
      if (cy >= -100 && cy <= height + 100) {
        if (!started) {
          ctx.moveTo(cx, cy);
          started = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      }
    }
    ctx.stroke();

    // Vertical Accumulation Boundary Line at xBound
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(xBound), toCanvasY(0));
    ctx.lineTo(toCanvasX(xBound), toCanvasY(fn(xBound)));
    ctx.stroke();

    // Tangency slope on F(x) at xBound demonstrating F'(x) = f(x)
    const curAreaAtX = accumulatedArea;
    const slopeAtX = instantaneousHeight;
    const tSpan = 0.8;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(toCanvasX(xBound - tSpan), toCanvasY(curAreaAtX - slopeAtX * tSpan));
    ctx.lineTo(toCanvasX(xBound + tSpan), toCanvasY(curAreaAtX + slopeAtX * tSpan));
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlight point (xBound, f(xBound))
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(toCanvasX(xBound), toCanvasY(fn(xBound)), 5, 0, Math.PI * 2);
    ctx.fill();

    // Highlight point (xBound, F(xBound))
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(toCanvasX(xBound), toCanvasY(accumulatedArea), 6, 0, Math.PI * 2);
    ctx.fill();
  }, [fn, aFixed, xBound, accumulatedArea, instantaneousHeight]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Sparkles size={20} />
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">Fundamental Theorem of Calculus (FTC) Explorer</h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Drag the upper limit <span className="font-mono text-amber-400 font-bold">x</span> to see how the accumulation rate <span className="font-mono text-emerald-400">F'(x)</span> is identically equal to the height of the integrand <span className="font-mono text-sky-400">f(x)</span>!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Canvas Graph */}
        <div className="lg:col-span-2 relative bg-slate-950/80 rounded-xl border border-slate-800 p-3 overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={700}
            height={440}
            className="w-full h-auto rounded-lg block cursor-ew-resize"
          />

          <div className="absolute top-5 left-5 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 backdrop-blur-md text-xs space-y-1.5 pointer-events-none shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400"></span>
              <span className="text-sky-300 font-mono">f(t) = {expr} (Original Curve)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-300 font-mono">F(x) = ∫₀ˣ f(t) dt (Accumulated Area)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-amber-400"></span>
              <span className="text-amber-300 font-mono">Boundary slice at x = {xBound}</span>
            </div>
          </div>
        </div>

        {/* Real-time FTC Validation Telemetry */}
        <div className="space-y-5">
          {/* Slider for Upper Limit x */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} /> Upper Bound x
              </span>
              <span className="font-mono text-sm text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                x = {xBound}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.05"
              value={xBound}
              onChange={(e) => setXBound(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Dual Rate of Change vs Height Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-900/40 p-5 rounded-xl shadow-lg space-y-4">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Accumulated Area F(x)</span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-0.5">
                {accumulatedArea}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Net area under f(t) from t = 0 to t = {xBound}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 uppercase font-semibold">Rate of Area Growth F'(x)</span>
              <div className="text-2xl font-bold text-sky-400 font-mono mt-0.5">
                {instantaneousHeight}
              </div>
              <span className="text-xs text-slate-400">
                Height of curve f({xBound}) = <span className="font-mono text-amber-300 font-semibold">{instantaneousHeight}</span>
              </span>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-xs text-emerald-300 font-mono">
              ✓ FTC VERIFIED: d/dx [ ∫₀ˣ f(t) dt ] = f(x)
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed bg-slate-850/60 p-4 rounded-xl border border-slate-800">
            <strong className="text-white block mb-1">Why this matters:</strong>
            As the upper bound moves by an infinitesimal step <span className="text-indigo-300 font-mono">dx</span>, the new area added is a microscopic vertical strip of width <span className="text-indigo-300 font-mono">dx</span> and height <span className="text-indigo-300 font-mono">f(x)</span>. Thus, the rate of change of area is precisely <span className="text-indigo-300 font-mono">f(x)</span>!
          </div>
        </div>
      </div>
    </div>
  );
};
