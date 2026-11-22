import React from 'react';
import { getStoredProgress } from '../../services/storage';
import { AlertTriangle, PieChart, CheckCircle2, BookOpen } from 'lucide-react';

export const ErrorAnalysisCenter: React.FC = () => {
  const progress = getStoredProgress();
  const history = progress.errorHistory;

  const errorCategories = {
    conceptual: { label: 'Conceptual Errors', count: 0, desc: 'Misunderstanding definitions, limit criteria, or fundamental theorems.' },
    algebraic: { label: 'Algebraic Errors', count: 0, desc: 'Sign errors, illegal cancellations, difference of squares blunders.' },
    calculation: { label: 'Calculation Errors', count: 0, desc: 'Arithmetic slips, incorrect fraction arithmetic, multiplication errors.' },
    theorem_application: { label: 'Incorrect Theorem Application', count: 0, desc: 'Applying L\'Hôpital without indeterminate form, applying IVT to discontinuous function.' },
    incomplete_reasoning: { label: 'Incomplete Reasoning', count: 0, desc: 'Omitting base cases, ignoring integration constants (+ C), skipping boundary points.' }
  };

  history.forEach(h => {
    if (errorCategories[h.errorType]) {
      errorCategories[h.errorType].count++;
    }
  });

  const totalErrors = history.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold mb-3 border border-rose-500/30">
            <AlertTriangle size={16} /> Error Forensics & Mistake Taxonomy
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Error Analysis Center
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Uncover the root causes behind incorrect quiz and examination solutions. Categorized across 5 rigorous cognitive dimensions to prevent recurring analytical pitfalls.
          </p>
        </div>
      </div>

      {/* Error Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(errorCategories).map(([key, item]) => {
          const pct = totalErrors > 0 ? Math.round((item.count / totalErrors) * 100) : 0;
          return (
            <div key={key} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{item.label}</h4>
                <span className="font-mono text-sm font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800">
                  {item.count} Incidents ({pct}%)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Mistake Timeline */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
          Chronological Error Incident Log
        </h3>

        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            No errors recorded yet. Practice problems and mock exams to track diagnostic tendencies!
          </div>
        ) : (
          <div className="space-y-2">
            {history.slice(0, 10).map((err, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-white font-medium">{err.topic}</span>
                  <span className="text-slate-400 block text-[11px] mt-0.5">
                    Category: <strong className="text-rose-400 capitalize">{err.errorType.replace('_', ' ')}</strong>
                  </span>
                </div>
                <span className="text-slate-500 font-mono text-[10px]">
                  {new Date(err.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
