import React, { useState, useMemo } from 'react';
import { parseMathFunction, computeNumericalDerivative, computeRiemannSums } from '../../services/evaluator';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { Terminal, Play, RotateCcw, Sparkles, TrendingUp, Maximize2 } from 'lucide-react';

export const Sandbox: React.FC = () => {
  const [expression, setExpression] = useState('x^3 - 3*x + 1');
  const [evalPoint, setEvalPoint] = useState(2.0);
  const [lowerBound, setLowerBound] = useState(0.0);
  const [upperBound, setUpperBound] = useState(2.0);

  const fn = useMemo(() => parseMathFunction(expression), [expression]);
  const valueAtPoint = useMemo(() => Math.round(fn(evalPoint) * 10000) / 10000, [fn, evalPoint]);
  const derivativeAtPoint = useMemo(() => computeNumericalDerivative(fn, evalPoint), [fn, evalPoint]);
  const integralValue = useMemo(() => {
    return computeRiemannSums(fn, lowerBound, upperBound, 200, 'midpoint').midpointSum;
  }, [fn, lowerBound, upperBound]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Terminal size={16} /> Open Analytical Playground
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Mathematical Sandbox</h2>
          <p className="text-slate-400 text-sm mt-1">
            Test arbitrary mathematical functions, calculate instant high-precision derivatives, evaluate definite integrals, and inspect numerical behavior.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input & Parameters */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Function Expression f(x)
            </label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g. sin(x) * x^2"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Evaluation Point x₀:
            </label>
            <input
              type="number"
              step="0.1"
              value={evalPoint}
              onChange={(e) => setEvalPoint(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white font-mono text-sm"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Integration Interval [a, b]:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Lower (a)</span>
                <input
                  type="number"
                  step="0.5"
                  value={lowerBound}
                  onChange={(e) => setLowerBound(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Upper (b)</span>
                <input
                  type="number"
                  step="0.5"
                  value={upperBound}
                  onChange={(e) => setUpperBound(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Evaluation Telemetry */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Live Analytical Output
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold block">Value f(x₀)</span>
                <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                  {valueAtPoint}
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">at x = {evalPoint}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold block">Derivative f'(x₀)</span>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {derivativeAtPoint}
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Instantaneous slope</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold block">Definite Integral</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                  {integralValue}
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">from {lowerBound} to {upperBound}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider block">
                Calculus Invariants:
              </span>
              <div className="text-xs text-slate-300">
                Tangent equation at ({evalPoint}, {valueAtPoint}):
                <div className="my-1">
                  <MathView math={`y - (${valueAtPoint}) = ${derivativeAtPoint}(x - (${evalPoint}))`} block />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
