import React, { useState } from 'react';
import { MathView } from '../common/MathView';
import { Eye, Sparkles, Sliders } from 'lucide-react';
import { sound } from '../../services/audio';

export const VisualMathLibrary: React.FC = () => {
  const [activeProof, setActiveProof] = useState<'geometric_series' | 'sum_odds' | 'pythagoras'>('geometric_series');
  const [seriesN, setSeriesN] = useState<number>(5);
  const [oddN, setOddN] = useState<number>(4);

  // Geometric series calculation: sum_{k=1}^N (1/2)^k = 1 - (1/2)^N
  const seriesSum = 1 - Math.pow(0.5, seriesN);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Eye size={16} /> Geometric Intuition & Visual Proofs
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Visual Mathematics Library
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            "Proof without Words" interactive visual demonstrations illustrating why mathematical identities hold geometrically.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { id: 'geometric_series', label: 'Geometric Series (½ + ¼ + ... = 1)' },
              { id: 'sum_odds', label: 'Sum of Odd Numbers = n²' },
              { id: 'pythagoras', label: 'Pythagorean Rearrangement' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick();
                  setActiveProof(p.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeProof === p.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Visual Proof Canvas / Diagram */}
      {activeProof === 'geometric_series' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Convergence of Infinite Geometric Series</h3>
              <p className="text-xs text-slate-400 mt-1">Each subdivision cuts the remaining unit square in half.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Iterations: {seriesN}</span>
              <input
                type="range"
                min="1"
                max="8"
                value={seriesN}
                onChange={(e) => setSeriesN(parseInt(e.target.value))}
                className="w-28 accent-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Box Subdividing Unit Square */}
            <div className="aspect-square bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden shadow-inner flex flex-wrap">
              <div
                className="w-1/2 h-full bg-indigo-600/60 border-r border-indigo-400/50 flex items-center justify-center font-mono text-xs font-bold text-white"
              >
                1/2
              </div>
              <div className="w-1/2 h-full flex flex-col">
                <div className="w-full h-1/2 bg-sky-600/60 border-b border-sky-400/50 flex items-center justify-center font-mono text-xs font-bold text-white">
                  1/4
                </div>
                <div className="w-full h-1/2 flex">
                  <div className="w-1/2 h-full bg-emerald-600/60 border-r border-emerald-400/50 flex items-center justify-center font-mono text-[10px] font-bold text-white">
                    1/8
                  </div>
                  <div className="w-1/2 h-full flex flex-col">
                    <div className="w-full h-1/2 bg-amber-600/60 border-b border-amber-400/50 flex items-center justify-center font-mono text-[9px] font-bold text-white">
                      1/16
                    </div>
                    <div className="w-full h-1/2 bg-rose-600/60 flex items-center justify-center font-mono text-[8px] text-white">
                      ...
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <MathView math="\\sum_{k=1}^\\infty \\left(\\frac{1}{2}\\right)^k = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots = 1" block />
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Current Finite Sum ({seriesN} terms):</span>
                  <strong className="text-emerald-400 font-mono">{seriesSum.toFixed(6)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Unfilled Gap (1 - Sum):</span>
                  <strong className="text-amber-400 font-mono">{(1 - seriesSum).toFixed(6)}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                As the exponent approaches infinity, the remaining unfilled corner shrinks to measure zero, filling the entire 1×1 square area of exactly 1!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeProof === 'sum_odds' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Sum of Consecutive Odds Equals Perfect Square</h3>
              <p className="text-xs text-slate-400 mt-1">1 + 3 + 5 + ... + (2n - 1) = n²</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">n = {oddN} (Square size: {oddN}×{oddN})</span>
              <input
                type="range"
                min="1"
                max="6"
                value={oddN}
                onChange={(e) => setOddN(parseInt(e.target.value))}
                className="w-28 accent-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Nested L-shaped Gnomons */}
            <div className="aspect-square bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center">
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${oddN}, minmax(0, 1fr))`,
                  width: `${oddN * 38}px`
                }}
              >
                {Array.from({ length: oddN * oddN }).map((_, idx) => {
                  const row = Math.floor(idx / oddN);
                  const col = idx % oddN;
                  const layer = Math.max(row, col); // 0, 1, 2, ...
                  const colors = ['#6366f1', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
                  return (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-white"
                      style={{ backgroundColor: colors[layer % colors.length] }}
                    >
                      {layer + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <MathView math={`\\sum_{k=1}^{${oddN}} (2k - 1) = ${oddN}^2 = ${oddN * oddN}`} block />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Each successive odd integer forms an L-shaped "gnomon" that wraps around the previous square. Adding <span className="font-mono text-amber-400">2n - 1</span> blocks to an <span className="font-mono text-indigo-300">(n - 1)×(n - 1)</span> square expands it smoothly into an <span className="font-mono text-emerald-400">n×n</span> square!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeProof === 'pythagoras' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <h3 className="text-xl font-bold text-white">Pythagorean Theorem by Area Rearrangement</h3>
          <p className="text-xs text-slate-400">
            For any right triangle with legs a, b and hypotenuse c: a² + b² = c².
          </p>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <MathView math="(a + b)^2 = 4 \\cdot \\left(\\frac{1}{2}ab\\right) + c^2 \\implies a^2 + 2ab + b^2 = 2ab + c^2 \\implies a^2 + b^2 = c^2" block />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            By embedding four identical right triangles inside a square of side length (a + b), the remaining uncovered central region is a tilted square of area c². Expanding algebraically or physically rearranging triangles proves that a² + b² = c² identically.
          </p>
        </div>
      )}
    </div>
  );
};
