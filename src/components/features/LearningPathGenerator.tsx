import React, { useState } from 'react';
import { getStoredProgress } from '../../services/storage';
import { Compass, CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../services/audio';

export const LearningPathGenerator: React.FC = () => {
  const progress = getStoredProgress();

  const pathwaySteps = [
    { id: 'step_1', title: '1. Infinitesimal Foundations & Epsilon-Delta Limits', topic: 'Limits & Continuity', completed: true, status: 'Mastered' },
    { id: 'step_2', title: '2. Differentiation Rules: Product, Quotient & Chain', topic: 'Differentiation Fundamentals', completed: true, status: 'Mastered' },
    { id: 'step_3', title: '3. Implicit Rates & Global Curve Optimization', topic: 'Applications of Derivatives', completed: false, status: 'Recommended Focus' },
    { id: 'step_4', title: '4. Indefinite Antiderivatives & U-Substitution', topic: 'Integration Fundamentals', completed: false, status: 'Upcoming' },
    { id: 'step_5', title: '5. Riemann Partitions & Fundamental Theorem of Calculus', topic: 'Definite Integrals', completed: false, status: 'Upcoming' },
    { id: 'step_6', title: '6. Volumes of Revolution & Improper Convergences', topic: 'Applications of Integration', completed: false, status: 'Upcoming' },
    { id: 'step_7', title: '7. Olympiad Analytical Enigmas & Putnam Proofs', topic: 'Olympiad Mastery', completed: false, status: 'Locked' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Compass size={16} /> Autonomous Curriculum Synthesis
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Personalized Learning Pathway
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Constructed dynamically from your real-time diagnostic error patterns and radar metrics to optimize retention and exam readiness.
          </p>
        </div>
      </div>

      {/* Pathway Roadmap Steps */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
        {pathwaySteps.map((step, idx) => (
          <div
            key={step.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
              step.completed
                ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                : step.status === 'Recommended Focus'
                ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                : 'bg-slate-950/30 border-slate-850 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-3">
              {step.completed ? (
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
              ) : step.status === 'Recommended Focus' ? (
                <Sparkles size={20} className="text-amber-400 shrink-0 animate-pulse" />
              ) : (
                <Circle size={20} className="text-slate-600 shrink-0" />
              )}
              <div>
                <h4 className="text-sm font-bold text-slate-200">{step.title}</h4>
                <span className="text-xs text-slate-400">{step.topic}</span>
              </div>
            </div>

            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              step.completed
                ? 'bg-emerald-950/50 text-emerald-400'
                : step.status === 'Recommended Focus'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800 text-slate-500'
            }`}>
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
