import React, { useState } from 'react';
import { ExamConfig, DifficultyLevel } from '../../types';
import { getQuestionsForCategory } from '../../data/exams/calculusExamBank';
import { CalculusExamSimulator } from './CalculusExamSimulator';
import { sound } from '../../services/audio';
import { GraduationCap, Award, Clock, FileText, ChevronRight, Play, Sliders } from 'lucide-react';

interface CategoryCard {
  id: ExamConfig['category'];
  title: string;
  description: string;
  icon: string;
  badge: string;
}

const EXAM_CATEGORIES: CategoryCard[] = [
  {
    id: 'diff_mock',
    title: '1. Differential Calculus Mock Exams',
    description: 'Comprehensive examinations covering limits, derivatives, rates of change, tangents, and optimization.',
    icon: 'Percent',
    badge: 'Core Division'
  },
  {
    id: 'integ_mock',
    title: '2. Integral Calculus Mock Exams',
    description: 'Full-scale testing on antiderivatives, U-substitutions, Riemann sums, FTC, and volume integrals.',
    icon: 'Maximize',
    badge: 'Core Division'
  },
  {
    id: 'limits_continuity',
    title: '3. Limits and Continuity Exams',
    description: 'Focus strictly on epsilon-delta limits, algebraic/trig evaluation, asymptotes, and IVT.',
    icon: 'Maximize2',
    badge: 'Foundations'
  },
  {
    id: 'diff_rules',
    title: '4. Differentiation Rules Exams',
    description: 'Product, Quotient, Chain, Implicit, and Logarithmic differentiation under timed pressure.',
    icon: 'Layers',
    badge: 'Technique'
  },
  {
    id: 'diff_applications',
    title: '5. Derivative Applications Exams',
    description: 'Real-world optimization, related rates, curve sketching, concavity, and Mean Value Theorem.',
    icon: 'TrendingUp',
    badge: 'Applied'
  },
  {
    id: 'integ_techniques',
    title: '6. Integration Techniques Exams',
    description: 'U-substitution, integration by parts, partial fractions, and improper integrals.',
    icon: 'Shuffle',
    badge: 'Technique'
  },
  {
    id: 'def_indef_integrals',
    title: '7. Definite and Indefinite Integral Exams',
    description: 'Evaluation of antiderivative families + C and bounded definite area integrals via FTC.',
    icon: 'Compass',
    badge: 'Evaluation'
  },
  {
    id: 'advanced_calculus',
    title: '8. Advanced Calculus Exams',
    description: 'Multi-variable concepts, power series representations, Taylor polynomials, and differential forms.',
    icon: 'Cpu',
    badge: 'University Level'
  },
  {
    id: 'mixed_calculus',
    title: '9. Mixed Differential & Integral Exams',
    description: 'Interleaved problems requiring rapid shifting between rates of change and cumulative area.',
    icon: 'Zap',
    badge: 'Mastery'
  },
  {
    id: 'elite_challenge',
    title: '10. Elite Calculus Challenge Exams',
    description: 'Putnam and Olympiad-level analytical challenges for mathematical contenders.',
    icon: 'Award',
    badge: 'Olympiad Grade'
  }
];

const DIFFICULTIES: DifficultyLevel[] = [
  'FOUNDATION',
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'OLYMPIAD',
  'ELITE'
];

export const CalculusExamCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ExamConfig['category']>('diff_mock');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('INTERMEDIATE');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timed, setTimed] = useState<boolean>(true);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(20);
  const [activeExam, setActiveExam] = useState<{ config: ExamConfig; questions: any[] } | null>(null);

  const startExam = () => {
    sound.playClick();
    const currentCatObj = EXAM_CATEGORIES.find(c => c.id === activeCategory);
    const title = currentCatObj ? currentCatObj.title : 'Calculus Examination';
    
    const config: ExamConfig = {
      id: `exam_${activeCategory}_${Date.now()}`,
      title,
      category: activeCategory,
      difficulty: selectedDifficulty,
      questionCount,
      timed,
      timeLimitMinutes
    };

    const questions = getQuestionsForCategory(activeCategory, selectedDifficulty, questionCount);
    setActiveExam({ config, questions });
  };

  if (activeExam) {
    return (
      <CalculusExamSimulator
        config={activeExam.config}
        questions={activeExam.questions}
        onExit={() => setActiveExam(null)}
      />
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <GraduationCap size={16} /> Official Testing Arena
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Calculus Mock Examination Center
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Test your differentiation and integration prowess across 10 specialized categories and 6 difficulty tiers with the mathematically verified Calculus Solution Engine.
          </p>
        </div>
      </div>

      {/* Main Grid: Category Selection & Exam Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: 10 Categories List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Examination Division
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {EXAM_CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-indigo-500/30 text-indigo-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {cat.badge}
                      </span>
                      <ChevronRight size={16} className={`transition-transform ${isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600 group-hover:translate-x-1'}`} />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 1 Column: Configurator Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sliders size={18} className="text-indigo-400" />
              Examination Parameters
            </h3>

            {/* Difficulty Tier */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDifficulty(d);
                    }}
                    className={`py-2 px-2.5 rounded-xl font-medium transition-all text-center ${
                      selectedDifficulty === d
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Format */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Examination Format (Items)
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[10, 20, 30, 50].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => {
                      sound.playClick();
                      setQuestionCount(cnt);
                      setTimeLimitMinutes(Math.round(cnt * 2));
                    }}
                    className={`py-2 rounded-xl font-mono font-bold transition-all ${
                      questionCount === cnt
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {cnt}Q
                  </button>
                ))}
              </div>
            </div>

            {/* Timed vs Untimed */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={14} /> Countdown Timer
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTimed(!timed);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${timed ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${timed ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {timed && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Time Limit:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="5"
                      max="180"
                      value={timeLimitMinutes}
                      onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value) || 20)}
                      className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs text-center"
                    />
                    <span className="text-xs text-slate-400">minutes</span>
                  </div>
                </div>
              )}
            </div>

            {/* Launch Action */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={startExam}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Play size={16} className="fill-white" /> Launch Exam Simulator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
