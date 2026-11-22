import React, { useState } from 'react';
import { sound } from '../../services/audio';
import { Wrench, Hash, Grid, Binary, Layers } from 'lucide-react';

export const MathToolbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prime' | 'matrix' | 'combinatorics'>('prime');

  // Prime State
  const [primeInput, setPrimeInput] = useState<number>(360);
  const [primeFactors, setPrimeFactors] = useState<string>('2³ × 3² × 5');
  const [isPrime, setIsPrime] = useState<boolean>(false);

  // Matrix State (2x2 and 3x3)
  const [m11, setM11] = useState<number>(4);
  const [m12, setM12] = useState<number>(2);
  const [m21, setM21] = useState<number>(3);
  const [m22, setM22] = useState<number>(5);

  // Combinatorics State
  const [nVal, setNVal] = useState<number>(10);
  const [rVal, setRVal] = useState<number>(3);

  // Prime Factorization Engine
  const calculatePrime = (num: number) => {
    sound.playClick();
    if (num <= 1) {
      setPrimeFactors('No prime factors for <= 1');
      setIsPrime(false);
      return;
    }
    let n = num;
    const factors: Record<number, number> = {};
    for (let d = 2; d * d <= n; d++) {
      while (n % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        n /= d;
      }
    }
    if (n > 1) {
      factors[n] = (factors[n] || 0) + 1;
    }

    const keys = Object.keys(factors).map(Number);
    if (keys.length === 1 && factors[keys[0]] === 1) {
      setIsPrime(true);
      setPrimeFactors(`${num} is a PRIME NUMBER!`);
    } else {
      setIsPrime(false);
      const str = keys.map(k => (factors[k] > 1 ? `${k}^${factors[k]}` : `${k}`)).join(' × ');
      setPrimeFactors(str);
    }
  };

  // Matrix Determinant
  const det2x2 = m11 * m22 - m12 * m21;

  // Combinatorics
  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
  const nCr = nVal >= rVal && rVal >= 0 && nVal <= 15 ? Math.round(factorial(nVal) / (factorial(rVal) * factorial(nVal - rVal))) : 0;
  const nPr = nVal >= rVal && rVal >= 0 && nVal <= 15 ? Math.round(factorial(nVal) / factorial(nVal - rVal)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Wrench size={16} /> Computational Mathematics Toolkit
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Interactive Mathematical Toolbox</h2>
          <p className="text-slate-400 text-sm mt-1">
            Instant utilities for prime factorization, matrix determinants, and combinatorial enumerations.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'prime', label: 'Prime Factorizer', icon: Hash },
            { id: 'matrix', label: 'Matrix Determinant', icon: Grid },
            { id: 'combinatorics', label: 'Combinatorics', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'prime' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Hash size={18} className="text-indigo-400" /> Prime Factorizer & Primality Verification
          </h3>

          <div className="flex items-center gap-4">
            <input
              type="number"
              min="2"
              value={primeInput}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 2;
                setPrimeInput(val);
                calculatePrime(val);
              }}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg w-48"
            />
            <button
              onClick={() => calculatePrime(primeInput)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Factorize
            </button>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Canonical Prime Factorization:</span>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {primeFactors}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Grid size={18} className="text-sky-400" /> 2×2 Matrix Determinant Solver
          </h3>

          <div className="max-w-xs p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={m11}
                onChange={(e) => setM11(parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono text-center text-sm"
              />
              <input
                type="number"
                value={m12}
                onChange={(e) => setM12(parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono text-center text-sm"
              />
              <input
                type="number"
                value={m21}
                onChange={(e) => setM21(parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono text-center text-sm"
              />
              <input
                type="number"
                value={m22}
                onChange={(e) => setM22(parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono text-center text-sm"
              />
            </div>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Determinant |A| = ad - bc:</span>
            <div className="text-3xl font-black font-mono text-sky-400">
              {det2x2}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              ({m11} × {m22}) - ({m12} × {m21}) = {m11 * m22} - {m12 * m21} = {det2x2}
            </span>
          </div>
        </div>
      )}

      {activeTab === 'combinatorics' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-purple-400" /> Permutations & Combinations (nPr, nCr)
          </h3>

          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Total Set Size (n):</label>
              <input
                type="number"
                min="0"
                max="15"
                value={nVal}
                onChange={(e) => setNVal(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono text-base text-center"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subset Size (r):</label>
              <input
                type="number"
                min="0"
                max="15"
                value={rVal}
                onChange={(e) => setRVal(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono text-base text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Combinations C(n, r):</span>
              <div className="text-3xl font-black font-mono text-purple-400 mt-1">
                {nCr}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Unordered selections</span>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Permutations P(n, r):</span>
              <div className="text-3xl font-black font-mono text-indigo-400 mt-1">
                {nPr}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Ordered arrangements</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
