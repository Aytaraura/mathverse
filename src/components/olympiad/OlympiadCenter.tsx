import React, { useState } from 'react';
import { olympiadQuestions, weeklyChallenge } from '../../data/exams/olympiadExamBank';
import { Question } from '../../types';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { addXp } from '../../services/storage';
import { Award, Sparkles, ChevronRight, HelpCircle, CheckCircle2, BookOpen, Clock, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OlympiadCenter: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(olympiadQuestions[0]);
  const [hintTierRevealed, setHintTierRevealed] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showFullProof, setShowFullProof] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'practice' | 'weekly'>('practice');

  const handleSelectOption = (optId: string) => {
    sound.playClick();
    setUserSelectedOption(optId);
  };

  const handleSubmit = () => {
    if (!userSelectedOption) return;
    setIsSubmitted(true);
    const isCorrect = userSelectedOption === selectedQuestion.correctAnswer;
    if (isCorrect) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 100, spread: 70 });
      } catch {}
      addXp(150);
    } else {
      sound.playError();
    }
  };

  const handleRevealNextHint = () => {
    sound.playClick();
    if (hintTierRevealed < selectedQuestion.hints.length) {
      setHintTierRevealed(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
            <Award size={16} /> International Olympiad & Putnam Academy
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Olympiad Training Center
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Competition-grade problems across Number Theory, Combinatorics, Advanced Inequalities, and Analysis with the 4-Tier Progressive Hint System.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('practice');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'practice'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Problem Archive
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('weekly');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'weekly'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Zap size={14} /> Challenge of the Week (Week #{weeklyChallenge.weekNumber})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'practice' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Problem Selector Sidebar */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Olympiad Problem Bank
            </h3>
            <div className="space-y-2">
              {olympiadQuestions.map((q, idx) => {
                const isSelected = selectedQuestion.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedQuestion(q);
                      setHintTierRevealed(0);
                      setUserSelectedOption(null);
                      setIsSubmitted(false);
                      setShowFullProof(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-amber-600/15 border-amber-500/60 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-amber-400 mb-1">
                      {q.subtopic} • {q.difficulty}
                    </div>
                    <div className="text-xs font-medium text-slate-200 line-clamp-2">
                      {q.prompt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Problem & 4-Tier Hint System */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  {selectedQuestion.subtopic}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  {selectedQuestion.difficulty}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-medium text-white leading-relaxed">
                {selectedQuestion.prompt}
              </h3>

              {selectedQuestion.latexPrompt && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                  <MathView math={selectedQuestion.latexPrompt} block />
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {selectedQuestion.options?.map(opt => {
                  const isSelected = userSelectedOption === opt.id;
                  const isCorrect = opt.id === selectedQuestion.correctAnswer;

                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850';
                  if (isSubmitted) {
                    if (isCorrect) style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                    else if (isSelected) style = 'bg-rose-950/40 border-rose-500 text-rose-300';
                  } else if (isSelected) {
                    style = 'bg-amber-600/20 border-amber-500 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt.latex ? <MathView math={opt.latex} /> : opt.text}</span>
                      {isSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Submit & Hint Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handleRevealNextHint}
                  disabled={hintTierRevealed >= selectedQuestion.hints.length}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-300 text-xs font-semibold transition-all"
                >
                  <Sparkles size={14} />
                  {hintTierRevealed >= selectedQuestion.hints.length
                    ? 'All Hints Revealed'
                    : `Reveal Hint Tier ${hintTierRevealed + 1} of ${selectedQuestion.hints.length}`}
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!userSelectedOption || isSubmitted}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/30"
                >
                  Submit Olympiad Answer
                </button>
              </div>

              {/* Revealed Hints Accordion */}
              {hintTierRevealed > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Progressive Mathematical Scaffolding
                  </span>
                  {selectedQuestion.hints.slice(0, hintTierRevealed).map((hint, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-3.5 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-200 leading-relaxed animate-fadeIn"
                    >
                      {hint}
                    </div>
                  ))}
                </div>
              )}

              {/* Full Solution Breakdown if Submitted */}
              {isSubmitted && (
                <div className="pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Verified Analytical Proof & Solution</h4>
                    <span className="text-xs text-indigo-400 font-mono">
                      Technique: {selectedQuestion.solution.ruleOrTechnique}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedQuestion.solution.steps.map(s => (
                      <div key={s.stepNumber} className="text-xs text-slate-300">
                        <strong className="text-amber-300">Step {s.stepNumber}: </strong>
                        {s.explanation}
                        {s.mathExpression && (
                          <div className="my-1.5 text-center">
                            <MathView math={s.mathExpression} block />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Challenge of the Week */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {weeklyChallenge.category}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">{weeklyChallenge.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Week #{weeklyChallenge.weekNumber}
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed">
            {weeklyChallenge.problemStatement}
          </p>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <MathView math={weeklyChallenge.latex} block />
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Progressive Solution Clues</h4>
            {weeklyChallenge.hints.map((h, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                {h}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setShowFullProof(!showFullProof);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              {showFullProof ? 'Hide Formal Proof' : 'Reveal Complete Analytic Proof'}
            </button>

            {showFullProof && (
              <div className="mt-4 p-5 bg-slate-950 rounded-2xl border border-amber-800/40 text-xs text-slate-300 leading-relaxed space-y-3 animate-fadeIn">
                <div className="text-amber-400 font-bold">Asymptotic Limit Evaluation:</div>
                <MathView math={weeklyChallenge.solutionLatex} block />
                <p>{weeklyChallenge.fullProof}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
