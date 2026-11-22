import React, { useState, useEffect } from 'react';
import { FormulaItem, MemoryTrainerProgress } from '../../types/formulas';
import { allFormulas } from '../../data/formulas';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import {
  Brain, RotateCw, CheckCircle2, XCircle, Zap, Clock,
  Sparkles, Award, ArrowRight, Eye, RefreshCw, AlertCircle, Play
} from 'lucide-react';

interface FormulaMemoryTrainerProps {
  onSelectFormula: (formula: FormulaItem) => void;
}

export const FormulaMemoryTrainer: React.FC<FormulaMemoryTrainerProps> = ({ onSelectFormula }) => {
  const [mode, setMode] = useState<'flashcards' | 'cloze' | 'timed_sprint' | 'weak_review'>('flashcards');

  // SM-2 Spaced Repetition Progress State stored in localStorage
  const [smProgress, setSmProgress] = useState<Record<string, MemoryTrainerProgress>>(() => {
    try {
      const saved = localStorage.getItem('mathverse_sm2_trainer');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mathverse_sm2_trainer', JSON.stringify(smProgress));
    } catch (e) {
      console.error(e);
    }
  }, [smProgress]);

  // Flashcards state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Cloze / Missing-symbol state
  const [clozeAnswerSelected, setClozeAnswerSelected] = useState<string | null>(null);
  const [clozeSubmitted, setClozeSubmitted] = useState(false);

  // Timed Sprint State
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintTimeLeft, setSprintTimeLeft] = useState(60);
  const [sprintScore, setSprintScore] = useState(0);
  const [sprintTotal, setSprintTotal] = useState(0);
  const [sprintQuestionIdx, setSprintQuestionIdx] = useState(0);

  // Formulas eligible for weak review
  const weakFormulas = allFormulas.filter(f => smProgress[f.id]?.isWeak);

  // Active pool of formulas for current mode
  const activePool = mode === 'weak_review' && weakFormulas.length > 0 ? weakFormulas : allFormulas;
  const currentFormula = activePool[currentIndex % activePool.length] || allFormulas[0];

  // SM-2 Algorithm update function
  const handleRateSM2 = (quality: number) => { // quality: 0 (blackout) to 5 (perfect)
    const now = Date.now();
    const id = currentFormula.id;
    const current = smProgress[id] || {
      formulaId: id,
      reps: 0,
      intervalDays: 1,
      easeFactor: 2.5,
      nextReviewDate: now,
      lastStudied: now,
      correctCount: 0,
      incorrectCount: 0,
      isWeak: false
    };

    let reps = current.reps;
    let interval = current.intervalDays;
    let ease = current.easeFactor;

    if (quality >= 3) {
      if (reps === 0) interval = 1;
      else if (reps === 1) interval = 6;
      else interval = Math.round(interval * ease);
      reps += 1;
      current.correctCount += 1;
      sound.playSuccess();
    } else {
      reps = 0;
      interval = 1;
      current.incorrectCount += 1;
      sound.playError();
    }

    ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    const isWeak = quality < 3 || current.incorrectCount > current.correctCount;
    const nextReview = now + interval * 24 * 60 * 60 * 1000;

    setSmProgress(prev => ({
      ...prev,
      [id]: {
        ...current,
        reps,
        intervalDays: interval,
        easeFactor: ease,
        nextReviewDate: nextReview,
        lastStudied: now,
        isWeak
      }
    }));

    // Advance to next card
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % activePool.length);
  };

  // Timed Sprint Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sprintActive && sprintTimeLeft > 0) {
      timer = setInterval(() => {
        setSprintTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (sprintActive && sprintTimeLeft === 0) {
      setSprintActive(false);
      sound.playComplete();
    }
    return () => clearInterval(timer);
  }, [sprintActive, sprintTimeLeft]);

  const startSprint = () => {
    setSprintScore(0);
    setSprintTotal(0);
    setSprintTimeLeft(60);
    setSprintQuestionIdx(0);
    setSprintActive(true);
    sound.playClick();
  };

  const handleSprintAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setSprintScore(prev => prev + 1);
      sound.playSuccess();
    } else {
      sound.playError();
    }
    setSprintTotal(prev => prev + 1);
    setSprintQuestionIdx(prev => (prev + 1) % allFormulas.length);
  };

  const sprintFormula = allFormulas[sprintQuestionIdx % allFormulas.length];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-Navigation between Memory Trainer Sub-Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2">
          {[
            { id: 'flashcards', label: 'Flashcards', icon: Brain },
            { id: 'cloze', label: 'Missing-Symbol Fill', icon: Sparkles },
            { id: 'timed_sprint', label: '60s Timed Sprint', icon: Clock },
            { id: 'weak_review', label: `Weak Formulas (${weakFormulas.length})`, icon: AlertCircle }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setMode(tab.id as any);
                  setIsFlipped(false);
                  setClozeAnswerSelected(null);
                  setClozeSubmitted(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSel
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spaced Repetition Stats Badge */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Mastered: <strong className="text-emerald-400">{Object.values(smProgress).filter(p => p.reps >= 3).length}</strong></span>
          <span>In Progress: <strong className="text-amber-400">{Object.values(smProgress).filter(p => p.reps < 3 && p.reps > 0).length}</strong></span>
          <span>Weak: <strong className="text-rose-400">{weakFormulas.length}</strong></span>
        </div>
      </div>

      {/* MODE 1: FLASHCARDS */}
      {mode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card {currentIndex + 1} of {activePool.length}</span>
            <span className="font-bold uppercase text-purple-400">{currentFormula.category}</span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => {
              sound.playClick();
              setIsFlipped(!isFlipped);
            }}
            className={`min-h-[300px] p-8 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center shadow-2xl relative select-none ${
              isFlipped
                ? 'bg-slate-900 border-purple-500/50 shadow-purple-500/10'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {isFlipped ? 'Answer & Explanation' : 'Prompt / Recall'}
            </span>
            <span className="absolute top-4 right-4 text-xs text-slate-500 flex items-center gap-1">
              <RotateCw size={12} /> Click to flip
            </span>

            {!isFlipped ? (
              <div className="space-y-4 my-auto">
                <div className="text-lg md:text-xl font-bold text-white">
                  {currentFormula.memoryCard?.recallPrompt || `State the formula for: ${currentFormula.name}`}
                </div>
                <div className="text-xs text-slate-400 max-w-md mx-auto">
                  {currentFormula.whenToUse}
                </div>
                <div className="pt-4 text-xs font-semibold text-purple-400 flex items-center justify-center gap-1">
                  <span>Reveal Formula</span> <ArrowRight size={14} />
                </div>
              </div>
            ) : (
              <div className="space-y-4 my-auto animate-fadeIn">
                <h3 className="text-sm font-bold text-slate-300">{currentFormula.name}</h3>
                <div className="text-2xl text-white font-medium py-2">
                  <MathView math={currentFormula.latex} block />
                </div>
                <div className="text-xs text-slate-400 max-w-md mx-auto line-clamp-2">
                  {currentFormula.conditions.join(' • ')}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFormula(currentFormula);
                  }}
                  className="text-xs text-indigo-400 hover:underline pt-2 inline-block"
                >
                  View full breakdown & worked example →
                </button>
              </div>
            )}
          </div>

          {/* SM-2 Rating Buttons (Active when flipped) */}
          {isFlipped ? (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center animate-fadeIn">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Rate Your Recall (SM-2 Spaced Repetition)
              </span>
              <div className="grid grid-cols-4 gap-2 pt-1">
                <button
                  onClick={() => handleRateSM2(1)}
                  className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 hover:bg-rose-900/40 text-rose-300 text-xs font-bold transition-all"
                >
                  <div>Again</div>
                  <div className="text-[9px] text-rose-400/80 mt-0.5">&lt; 10 min</div>
                </button>
                <button
                  onClick={() => handleRateSM2(2)}
                  className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 hover:bg-amber-900/40 text-amber-300 text-xs font-bold transition-all"
                >
                  <div>Hard</div>
                  <div className="text-[9px] text-amber-400/80 mt-0.5">1 day</div>
                </button>
                <button
                  onClick={() => handleRateSM2(4)}
                  className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800 hover:bg-indigo-900/40 text-indigo-300 text-xs font-bold transition-all"
                >
                  <div>Good</div>
                  <div className="text-[9px] text-indigo-400/80 mt-0.5">3 days</div>
                </button>
                <button
                  onClick={() => handleRateSM2(5)}
                  className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 hover:bg-emerald-900/40 text-emerald-300 text-xs font-bold transition-all"
                >
                  <div>Easy</div>
                  <div className="text-[9px] text-emerald-400/80 mt-0.5">7 days</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-500">
              Try to recall the formula in your mind, then click the card to check yourself.
            </div>
          )}
        </div>
      )}

      {/* MODE 2: CLOZE / MISSING-SYMBOL CHALLENGE */}
      {mode === 'cloze' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Missing-Symbol Challenge
              </span>
              <h3 className="text-xl font-bold text-white">{currentFormula.name}</h3>
            </div>

            {/* Incomplete KaTeX Formula */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xl md:text-2xl text-purple-200">
              <MathView
                math={currentFormula.memoryCard?.clozeLatex || currentFormula.latex.replace(/(=|\+|-|\times)/, '???')}
                block
              />
            </div>

            <p className="text-xs text-slate-400">
              Select the correct mathematical expression or symbol that replaces <strong>???</strong>:
            </p>

            {/* Cloze Options */}
            <div className="grid grid-cols-2 gap-3">
              {(currentFormula.memoryCard?.missingOptions || ['Option A', 'Option B', 'Option C', 'Option D']).map((opt, idx) => {
                const isSelected = clozeAnswerSelected === opt;
                const isCorrect = opt === currentFormula.memoryCard?.missingPart;

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850';
                if (clozeSubmitted) {
                  if (isCorrect) btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-300';
                } else if (isSelected) {
                  btnStyle = 'bg-purple-600/20 border-purple-500 text-purple-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={clozeSubmitted}
                    onClick={() => {
                      sound.playClick();
                      setClozeAnswerSelected(opt);
                    }}
                    className={`p-4 rounded-xl border text-sm font-semibold transition-all ${btnStyle}`}
                  >
                    <MathView math={opt} />
                  </button>
                );
              })}
            </div>

            {/* Check / Next Button */}
            {!clozeSubmitted ? (
              <button
                disabled={!clozeAnswerSelected}
                onClick={() => {
                  setClozeSubmitted(true);
                  const isCorrect = clozeAnswerSelected === currentFormula.memoryCard?.missingPart;
                  if (isCorrect) sound.playSuccess();
                  else sound.playError();
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setClozeAnswerSelected(null);
                  setClozeSubmitted(false);
                  setCurrentIndex(prev => (prev + 1) % activePool.length);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 mx-auto"
              >
                <span>Next Formula</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: TIMED SPRINT */}
      {mode === 'timed_sprint' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {!sprintActive ? (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <Clock size={48} className="mx-auto text-purple-400" />
              <h3 className="text-2xl font-black text-white">60-Second Formula Sprint</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Test your rapid formula recognition speed! Answer as many formula identification questions as possible in 60 seconds.
              </p>
              {sprintTotal > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400 font-semibold">Previous Sprint Result:</div>
                  <div className="text-2xl font-black text-amber-400">{sprintScore} / {sprintTotal} Correct</div>
                </div>
              )}
              <button
                onClick={startSprint}
                className="px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-xl shadow-purple-600/30 flex items-center gap-2 mx-auto"
              >
                <Play size={16} />
                <span>Start 60s Sprint</span>
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              {/* Sprint Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-400 animate-pulse" />
                  <span className="text-lg font-black text-amber-400 font-mono">{sprintTimeLeft}s</span>
                </div>
                <div className="text-xs font-bold text-slate-300">
                  Score: <span className="text-emerald-400 font-mono text-base">{sprintScore}</span>
                </div>
              </div>

              {/* Sprint Question */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 text-center space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Identify This Formula
                </span>
                <div className="text-xl md:text-2xl text-white font-medium py-2">
                  <MathView math={sprintFormula.latex} block />
                </div>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  sprintFormula.name,
                  allFormulas[(sprintQuestionIdx + 3) % allFormulas.length].name,
                  allFormulas[(sprintQuestionIdx + 7) % allFormulas.length].name,
                  allFormulas[(sprintQuestionIdx + 11) % allFormulas.length].name
                ].sort().map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSprintAnswer(choice === sprintFormula.name)}
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 transition-all text-left"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: WEAK FORMULAS REVIEW */}
      {mode === 'weak_review' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400" />
              Weak Formulas Needing Spaced Revision
            </h3>
            <span className="text-xs text-slate-400">
              Formulas with low ease factor or errors in memory reviews
            </span>
          </div>

          {weakFormulas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weakFormulas.map(wf => (
                <div
                  key={wf.id}
                  onClick={() => onSelectFormula(wf)}
                  className="p-4 rounded-2xl bg-slate-900 border border-rose-900/40 hover:border-rose-500/60 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-rose-400">
                    <span>{wf.category}</span>
                    <span>Needs Review</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{wf.name}</h4>
                  <div className="py-2 text-center text-sm">
                    <MathView math={wf.latex} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-2">
              <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
              <h4 className="text-sm font-bold text-white">No Weak Formulas Recorded!</h4>
              <p className="text-xs text-slate-400">
                Practice more flashcards or timed sprints, and any difficult formulas will be tracked here for automatic revision.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
