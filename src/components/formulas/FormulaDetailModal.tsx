import React, { useState } from 'react';
import { FormulaItem } from '../../types/formulas';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import {
  X, Copy, Check, Bookmark, BookmarkCheck, ArrowRight,
  AlertTriangle, HelpCircle, CheckCircle2, XCircle, Sparkles,
  BookOpen, Brain, ExternalLink
} from 'lucide-react';

interface FormulaDetailModalProps {
  formula: FormulaItem;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectRelated: (id: string) => void;
  onLaunchPractice?: (subjectId: string) => void;
  onAskAI?: (formulaName: string, latex: string) => void;
}

export const FormulaDetailModal: React.FC<FormulaDetailModalProps> = ({
  formula,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectRelated,
  onLaunchPractice,
  onAskAI
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'example' | 'practice'>('overview');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(formula.latex);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnswerSelect = (qId: string, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckAnswer = (qId: string, correctIdx: number) => {
    const isCorrect = selectedAnswers[qId] === correctIdx;
    setCheckedAnswers(prev => ({ ...prev, [qId]: true }));
    if (isCorrect) sound.playSuccess();
    else sound.playError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {formula.subject.replace('_', ' ')}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                formula.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                formula.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                formula.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {formula.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">| {formula.topic}</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">{formula.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Button */}
            <button
              onClick={handleCopyLatex}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Copy LaTeX formula to clipboard"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy LaTeX'}</span>
            </button>

            {/* Favorite / Bookmark Button */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleFavorite(formula.id);
              }}
              className={`p-2.5 rounded-xl transition-all ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 shrink-0">
          {[
            { id: 'overview', label: 'Formula & Variables', icon: BookOpen },
            { id: 'example', label: 'Step-by-Step Example', icon: Sparkles },
            { id: 'practice', label: `Practice (${formula.practiceQuestions.length})`, icon: Brain }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`py-3 px-4 font-semibold text-xs border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Main Formula KaTeX Render Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/20 shadow-inner flex flex-col items-center justify-center text-center relative group">
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2">
              Mathematical Notation
            </span>
            <div className="text-xl md:text-2xl text-white font-medium py-2 overflow-x-auto max-w-full">
              <MathView math={formula.latex} block />
            </div>
            {formula.altLatex && (
              <div className="mt-2 text-sm text-slate-400 border-t border-slate-800/80 pt-2 w-full">
                <span className="text-xs text-slate-500 mr-2">Alternative Form:</span>
                <MathView math={formula.altLatex} />
              </div>
            )}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Definition of Variables */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={14} className="text-indigo-400" />
                  Definition of Every Variable
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formula.variables.map((v, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                      <div className="px-2 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-mono text-sm shrink-0">
                        <MathView math={v.symbol} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{v.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{v.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions and Restrictions */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-400" />
                  Conditions, Domain & Restrictions
                </h3>
                <ul className="space-y-2">
                  {formula.conditions.map((cond, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-amber-950/10 border border-amber-900/30 rounded-xl p-3">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span><MathView math={cond} /></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explanation of When to Use It */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-emerald-400" />
                  When to Use This Formula
                </h3>
                <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-900/30 text-xs text-slate-200 leading-relaxed">
                  {formula.whenToUse}
                </div>
              </div>

              {/* Derivation if educationally valuable */}
              {formula.derivation && (
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-purple-400" />
                    Mathematical Derivation
                  </h3>
                  <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-900/30 text-xs text-slate-300 leading-relaxed font-sans">
                    <MathView math={formula.derivation} />
                  </div>
                </div>
              )}

              {/* Common Mistakes */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle size={14} className="text-rose-400" />
                  Common Mistakes & Traps to Avoid
                </h3>
                <div className="space-y-2">
                  {formula.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-rose-950/10 border border-rose-900/30 text-xs text-rose-200/90 flex items-start gap-2.5">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Formulas */}
              {formula.relatedFormulaIds.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Related Formulas & Connections
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formula.relatedFormulaIds.map(relId => (
                      <button
                        key={relId}
                        onClick={() => {
                          sound.playClick();
                          onSelectRelated(relId);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5"
                      >
                        <span>{relId.replace(/^(arith|alg|geom|trig|diff|integ|adv|olympiad)_/, '').replace(/_/g, ' ')}</span>
                        <ArrowRight size={12} className="text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'example' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Worked Problem Statement
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {formula.workedExample.problem}
                </p>
                {formula.workedExample.problemLatex && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <MathView math={formula.workedExample.problemLatex} block />
                  </div>
                )}
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Step-by-Step Solution Breakdown
                </h4>
                <div className="space-y-3">
                  {formula.workedExample.steps.map(step => (
                    <div key={step.stepNum} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                        {step.stepNum}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="text-xs font-medium text-slate-300">{step.instruction}</div>
                        {step.mathLatex && (
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 font-mono text-sm text-indigo-200">
                            <MathView math={step.mathLatex} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Answer */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Final Verified Result
                  </span>
                  <span className="text-sm font-bold text-white mt-1 block">
                    {formula.workedExample.finalAnswer}
                  </span>
                </div>
                {formula.workedExample.finalAnswerLatex && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-sm font-bold">
                    <MathView math={formula.workedExample.finalAnswerLatex} />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6 animate-fadeIn">
              {formula.practiceQuestions.map((q, qIdx) => {
                const selectedOpt = selectedAnswers[q.id];
                const isChecked = checkedAnswers[q.id];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div key={q.id} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400">
                        Practice Question {qIdx + 1}
                      </span>
                      {isChecked && (
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          <span>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-slate-200 font-medium">
                      {q.question}
                    </div>
                    {q.questionLatex && (
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-center">
                        <MathView math={q.questionLatex} block />
                      </div>
                    )}

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';
                        if (isChosen && !isChecked) {
                          btnStyle = 'bg-indigo-600/20 border-indigo-500 text-indigo-200';
                        } else if (isChecked) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isChecked}
                            onClick={() => {
                              sound.playClick();
                              handleAnswerSelect(q.id, optIdx);
                            }}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${btnStyle}`}
                          >
                            <span className="font-bold text-slate-500 mr-2">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Actions & Explanation */}
                    <div className="pt-2 flex items-center justify-between">
                      {!isChecked ? (
                        <button
                          disabled={selectedOpt === undefined}
                          onClick={() => handleCheckAnswer(q.id, q.correctIndex)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                        >
                          Check Answer
                        </button>
                      ) : (
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 w-full space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            Explanation
                          </span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {onAskAI && (
              <button
                onClick={() => {
                  sound.playClick();
                  onAskAI(formula.name, formula.latex);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <Sparkles size={14} />
                <span>Ask AI About This Formula</span>
              </button>
            )}

            {onLaunchPractice && (
              <button
                onClick={() => {
                  sound.playClick();
                  onLaunchPractice(formula.subject);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Brain size={14} />
                <span>Launch Topic Quiz</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
