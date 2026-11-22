import React from 'react';
import { getStoredProgress } from '../../services/storage';
import { WeaknessRadar } from './WeaknessRadar';
import { Award, Zap, Flame, Target, BookOpen, Clock, CheckCircle2, TrendingUp, BarChart2 } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 'first_spark', name: 'First Spark', desc: 'Solved your first calculus or Olympiad problem.', icon: '⚡' },
  { id: 'limit_explorer', name: 'Limits Luminary', desc: 'Resolved an indeterminate form with epsilon-delta rigor.', icon: '🛡️' },
  { id: 'chain_architect', name: 'Chain Architect', desc: 'Conquered a triple-nested composite derivative.', icon: '⛓️' },
  { id: 'riemann_master', name: 'Integral Alchemist', desc: 'Demonstrated Riemann sum convergence as n → ∞.', icon: '⚗️' },
  { id: 'duel_champion', name: 'Duel Champion', desc: 'Out-calculated an AI grandmaster bot in 1v1 combat.', icon: '👑' },
  { id: 'olympiad_titan', name: 'Olympiad Titan', desc: 'Constructed a full formal proof with zero logical fallacies.', icon: '🏆' }
];

export const StudentDashboard: React.FC<{ onNavigateTab?: (tab: string) => void }> = ({ onNavigateTab }) => {
  const progress = getStoredProgress();

  // Find lowest radar metric for smart recommendation
  const radarEntries = Object.entries(progress.radarMetrics);
  radarEntries.sort((a, b) => a[1] - b[1]);
  const lowestMetric = radarEntries[0];

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner & Stats Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
              <BarChart2 size={16} /> Student Analytics & Mastery Dossier
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Level {progress.level} Analytical Scholar
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Active Study Streak: <strong className="text-amber-400">{progress.streakDays} Days</strong> • Total Mastery XP: <strong className="text-indigo-300">{progress.xp} XP</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame size={24} />
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block">Streak</span>
                <span className="text-lg font-black text-white">{progress.streakDays} Days</span>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="flex items-center gap-2 text-indigo-400">
              <Zap size={24} />
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block">Total XP</span>
                <span className="text-lg font-black text-white font-mono">{progress.xp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Weakness Radar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Target size={16} className="text-indigo-400" /> Personal Weakness Radar
              </h3>
              <span className="text-xs text-slate-400 font-mono">8 Dimensions</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Dynamically derived from diagnostic quizzes, exams, and boss battle calculations.
            </p>

            <div className="py-4">
              <WeaknessRadar metrics={progress.radarMetrics} size={300} />
            </div>
          </div>

          {/* Smart Recommendation */}
          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-2xl space-y-1.5">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={13} /> Recommended Focus Area
            </div>
            <div className="text-xs text-slate-200">
              Your lowest proficiency metric is currently{' '}
              <strong className="text-amber-300 capitalize">{lowestMetric[0]} ({lowestMetric[1]}%)</strong>.
              Review targeted lessons in this subject to strengthen overall analysis.
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Completed Exams & Achievements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Examinations Log */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center gap-2">
              <Clock size={16} className="text-sky-400" /> Recent Mock Examination Record
            </h3>

            {progress.completedExams.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                No mock examinations completed yet. Launch a test from the Calculus Mock Examination Center to build your dossier!
              </div>
            ) : (
              <div className="space-y-3">
                {progress.completedExams.slice(0, 4).map(exam => (
                  <div
                    key={exam.id}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{exam.examTitle}</h4>
                      <span className="text-xs text-slate-400">
                        {exam.difficulty} • {exam.totalQuestions} questions • Time: {Math.round(exam.timeSpentSeconds / 60)} min
                      </span>
                    </div>

                    <div className="text-right">
                      <div className={`text-xl font-black font-mono ${
                        exam.percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {exam.percentage}%
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {exam.score} / {exam.totalQuestions} Correct
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Achievement Trophy Collection */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> Unlocked Mathematical Trophies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map(ach => {
                const isUnlocked = progress.unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                      isUnlocked 
                        ? 'bg-slate-950 border-slate-800' 
                        : 'bg-slate-950/40 border-slate-900 opacity-40'
                    }`}
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <div>
                      <h5 className="text-xs font-bold text-white">{ach.name}</h5>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
