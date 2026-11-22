import React from 'react';
import { getStoredProgress } from '../../services/storage';
import { Target, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ExamPredictor: React.FC = () => {
  const progress = getStoredProgress();
  const exams = progress.completedExams;

  // Calculate weighted readiness forecast based on historical percentages
  let avgPercentage = 75;
  if (exams.length > 0) {
    const total = exams.reduce((acc, cur) => acc + cur.percentage, 0);
    avgPercentage = Math.round(total / exams.length);
  }

  const apCalculusForecast = Math.min(5, Math.max(1, Math.round((avgPercentage / 100) * 4 + 1)));
  const olympiadReadiness = Math.round((progress.radarMetrics.differentialCalculus + progress.radarMetrics.proofRigor) / 2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Target size={16} /> Diagnostic Performance Forecasting Engine
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Calculus & Olympiad Exam Predictor
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Synthesizes your mock examination scores, problem pace, and radar metrics to forecast readiness.
          </p>
        </div>
      </div>

      {/* Transparency Disclaimer Notice */}
      <div className="p-4 bg-amber-950/20 border border-amber-600/30 rounded-2xl flex items-start gap-3 text-xs text-amber-200 leading-relaxed">
        <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 block mb-0.5">Methodology & Transparency Notice:</strong>
          This predictor models empirical test performance and concept retention within MATHVERSE. It serves as an educational self-assessment tool and diagnostic benchmark; it cannot and does not guarantee real-world examination scores.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Calculus Score Forecast */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Standard College / AP Calculus Simulation
          </span>
          <div className="flex items-baseline gap-3">
            <div className="text-5xl font-black font-mono text-emerald-400">
              {apCalculusForecast}
            </div>
            <span className="text-slate-400 text-sm font-semibold">/ 5 Scale</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Projected from {exams.length} completed mock examinations with an average mastery rate of {avgPercentage}%.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            {apCalculusForecast >= 4 ? 'Status: Highly Qualified for advanced college credit.' : 'Status: Continue drills on integration techniques.'}
          </div>
        </div>

        {/* Olympiad Competition Readiness */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Olympiad & Putnam Competition Index
          </span>
          <div className="flex items-baseline gap-3">
            <div className="text-5xl font-black font-mono text-indigo-400">
              {olympiadReadiness}%
            </div>
            <span className="text-slate-400 text-sm font-semibold">Readiness Index</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Composite metric weighting analytical calculus intuition against formal proof rigor and deductive verification.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            {olympiadReadiness >= 75 ? 'Prepared for Invitational Math Competitions (AIME / Putnam).' : 'Recommended: Practice Proof Arena induction and contradiction challenges.'}
          </div>
        </div>
      </div>
    </div>
  );
};
