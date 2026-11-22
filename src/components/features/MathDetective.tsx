import React, { useState } from 'react';
import { detectiveCases } from '../../data/detectiveCases';
import { DetectiveCase } from '../../types';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { addXp } from '../../services/storage';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MathDetective: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<DetectiveCase>(detectiveCases[0]);
  const [selectedStepIdx, setSelectedStepIdx] = useState<number | null>(null);
  const [caseSolved, setCaseSolved] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleSelectStep = (stepNumber: number) => {
    sound.playClick();
    setSelectedStepIdx(stepNumber);
    setShowExplanation(false);
  };

  const handleAccuse = () => {
    if (selectedStepIdx === null) return;
    const targetStep = selectedCase.steps.find(s => s.stepNumber === selectedStepIdx);
    if (!targetStep) return;

    if (targetStep.isFlawed) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 120, spread: 80 });
      } catch {}
      setCaseSolved(true);
      setShowExplanation(true);
      addXp(150);
    } else {
      sound.playError();
      setCaseSolved(false);
      setShowExplanation(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold mb-3 border border-rose-500/30">
            <Search size={16} /> Forensic Mathematics Division
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            The Mathematical Detective
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Investigate fraudulent mathematical proofs and derivations. Identify the exact illegitimate step that hides division by zero, improper branch cuts, or divergent series.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {detectiveCases.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCase(c);
                  setSelectedStepIdx(null);
                  setCaseSolved(false);
                  setShowExplanation(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCase.id === c.id
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Crime Scene Dossier */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-400 uppercase font-bold tracking-wider">
              Fraudulent Claimed Theorem: {selectedCase.claimedTheorem}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{selectedCase.title}</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono">
            {selectedCase.crimeCategory}
          </span>
        </div>

        <p className="text-xs text-slate-300 italic bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          "{selectedCase.mysterySetting}"
        </p>

        {/* Steps to Inspect */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Examine Derivation Steps (Click the suspect step to accuse):
          </span>

          {selectedCase.steps.map(step => {
            const isSelected = selectedStepIdx === step.stepNumber;
            return (
              <div
                key={step.stepNumber}
                onClick={() => handleSelectStep(step.stepNumber)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-rose-600/20 border-rose-500 text-white ring-1 ring-rose-500/50 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <div>
                    <span className="text-xs font-medium">{step.statement}</span>
                    <div className="mt-1">
                      <MathView math={step.mathLatex} />
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                    Suspect Marked
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Selected Suspect: {selectedStepIdx ? `Step ${selectedStepIdx}` : 'None'}
          </span>

          <button
            onClick={handleAccuse}
            disabled={selectedStepIdx === null}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-600/30"
          >
            Accuse Suspect Step
          </button>
        </div>

        {/* Verdict Feedback */}
        {showExplanation && (
          <div className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
            caseSolved 
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
              : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
          }`}>
            {caseSolved ? (
              <div>
                <strong className="block text-emerald-400 text-sm mb-1">✓ Case Solved! Flaw Apprehended!</strong>
                <p>{selectedCase.steps.find(s => s.stepNumber === selectedStepIdx)?.flawExplanation}</p>
                <p className="mt-2 text-slate-300">{selectedCase.verdictExplanation}</p>
              </div>
            ) : (
              <div>
                <strong className="block text-rose-400 text-sm mb-1">❌ False Accusation</strong>
                This step is mathematically legitimate under standard algebraic and calculus axioms. Look closely for hidden divisions by zero, improper square root combinations, or invalid limit assumptions!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
