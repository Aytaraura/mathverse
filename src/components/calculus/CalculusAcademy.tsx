import React, { useState } from 'react';
import { differentialCurriculum } from '../../data/curriculum/differentialCalculus';
import { integralCurriculum } from '../../data/curriculum/integralCalculus';
import { CurriculumModule, LessonSection } from '../../types';
import { MathView } from '../common/MathView';
import { DerivativeVisualizer } from './DerivativeVisualizer';
import { IntegralVisualizer } from './IntegralVisualizer';
import { FtcExplorer } from './FtcExplorer';
import { sound } from '../../services/audio';
import { addXp } from '../../services/storage';
import { 
  BookOpen, CheckCircle2, ChevronRight, HelpCircle, Layers, 
  Maximize2, Activity, Percent, TrendingUp, Compass, Shuffle, Maximize, Box, Sparkles 
} from 'lucide-react';

interface CalculusAcademyProps {
  onLaunchExam?: () => void;
}

export const CalculusAcademy: React.FC<CalculusAcademyProps> = ({ onLaunchExam }) => {
  const [activeDivision, setActiveDivision] = useState<'differential' | 'integral'>('differential');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('diff_limits');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('limits_intro');
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<number | null>(null);
  const [quickCheckSubmitted, setQuickCheckSubmitted] = useState<boolean>(false);

  const modules = activeDivision === 'differential' ? differentialCurriculum : integralCurriculum;
  const currentModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const currentLesson = currentModule.lessons.find(l => l.id === selectedLessonId) || currentModule.lessons[0];

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    sound.playClick();
    setSelectedModuleId(moduleId);
    setSelectedLessonId(lessonId);
    setQuickCheckAnswer(null);
    setQuickCheckSubmitted(false);
  };

  const handleQuickCheck = (idx: number) => {
    sound.playClick();
    setQuickCheckAnswer(idx);
    setQuickCheckSubmitted(true);
    if (idx === currentLesson.quickCheck.correctIndex) {
      sound.playSuccess();
      addXp(25);
    } else {
      sound.playError();
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Academy Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <BookOpen size={16} /> The Sovereign Calculus Academy
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Curriculum of Infinitesimals & Accumulation
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Master rigorous mathematical analysis from epsilon-delta limits to multivariable solids of revolution with step-by-step interactive proofs and laboratory models.
          </p>

          {/* Division Switcher */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => {
                sound.playClick();
                setActiveDivision('differential');
                setSelectedModuleId('diff_limits');
                setSelectedLessonId('limits_intro');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeDivision === 'differential'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Percent size={16} /> Division A: Differential Calculus
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveDivision('integral');
                setSelectedModuleId('integ_fundamentals');
                setSelectedLessonId('antiderivatives_intro');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeDivision === 'integral'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Maximize size={16} /> Division B: Integral Calculus
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left 1 Column: Module & Lesson Tree Navigation */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {activeDivision === 'differential' ? 'Differential Modules' : 'Integral Modules'}
          </h3>

          <div className="space-y-2">
            {modules.map(mod => {
              const isModActive = mod.id === selectedModuleId;
              return (
                <div key={mod.id} className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
                  <div
                    onClick={() => {
                      sound.playClick();
                      setSelectedModuleId(mod.id);
                      setSelectedLessonId(mod.lessons[0].id);
                    }}
                    className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                      isModActive ? 'bg-slate-850 text-white border-b border-slate-800' : 'hover:bg-slate-850/50 text-slate-300'
                    }`}
                  >
                    <span className="font-semibold text-xs">{mod.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{mod.lessons.length} lessons</span>
                  </div>

                  {/* Lesson List */}
                  {isModActive && (
                    <div className="p-2 space-y-1 bg-slate-950/40">
                      {mod.lessons.map(lesson => {
                        const isLessonActive = lesson.id === selectedLessonId;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(mod.id, lesson.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                              isLessonActive
                                ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                            }`}
                          >
                            <span className="truncate">{lesson.title}</span>
                            <ChevronRight size={12} className={isLessonActive ? 'text-indigo-400' : 'text-slate-600'} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 3 Columns: Active Lesson Content & Interactive Laboratory */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            {/* Lesson Title Header */}
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">
                  {currentModule.title}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {currentLesson.title}
                </h3>
              </div>
            </div>

            {/* Exposition Theory */}
            <div className="text-sm text-slate-300 leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{currentLesson.content}</p>

              {currentLesson.latexFormulas && currentLesson.latexFormulas.length > 0 && (
                <div className="my-6 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-inner space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Fundamental Mathematical Theorem & Equations:
                  </span>
                  {currentLesson.latexFormulas.map((formula, idx) => (
                    <MathView key={idx} math={formula} block />
                  ))}
                </div>
              )}
            </div>

            {/* Embedded Interactive Laboratory if applicable */}
            {currentLesson.interactiveDemoType === 'tangent' && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <DerivativeVisualizer />
              </div>
            )}

            {currentLesson.interactiveDemoType === 'riemann' && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <IntegralVisualizer />
              </div>
            )}

            {currentLesson.interactiveDemoType === 'ftc' && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <FtcExplorer />
              </div>
            )}

            {/* Worked Step-by-Step Examples */}
            {currentLesson.workedExamples && currentLesson.workedExamples.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  Step-by-Step Worked Mathematical Exemplar
                </h4>

                {currentLesson.workedExamples.map((ex, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/70 border border-slate-800/80 rounded-2xl space-y-3">
                    <div className="text-sm font-semibold text-white">
                      {ex.problem}
                    </div>
                    {ex.latex && (
                      <div className="my-2">
                        <MathView math={ex.latex} block />
                      </div>
                    )}
                    <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-850">
                      {ex.steps.map((st, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                            {sIdx + 1}
                          </span>
                          <span className="mt-0.5">{st}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-emerald-950/30 border border-emerald-800/30 rounded-xl text-xs text-emerald-300 font-mono">
                      <strong>Final Analytical Result: </strong> {ex.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Concept Quick Check */}
            {currentLesson.quickCheck && (
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <HelpCircle size={16} /> Instant Concept Mastery Check
                </div>

                <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4">
                  <p className="text-sm text-slate-200 font-medium">
                    {currentLesson.quickCheck.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentLesson.quickCheck.options.map((opt, oIdx) => {
                      const isSelected = quickCheckAnswer === oIdx;
                      const isCorrect = oIdx === currentLesson.quickCheck.correctIndex;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                      if (quickCheckSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                        else if (isSelected) btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleQuickCheck(oIdx)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quickCheckSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 animate-fadeIn">
                      <strong className="text-indigo-400">Explanation: </strong>
                      {currentLesson.quickCheck.explanation}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
