import React, { useState } from 'react';
import { proofChallenges } from '../../data/proofs';
import { ProofChallenge } from '../../types';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { addXp } from '../../services/storage';
import { ShieldCheck, Plus, Trash2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProofArena: React.FC = () => {
  const [selectedProof, setSelectedProof] = useState<ProofChallenge>(proofChallenges[0]);
  const [constructedSequence, setConstructedSequence] = useState<string[]>([]);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleAddStep = (stepId: string) => {
    sound.playClick();
    if (!constructedSequence.includes(stepId)) {
      setConstructedSequence(prev => [...prev, stepId]);
      setIsEvaluated(false);
    }
  };

  const handleRemoveStep = (idx: number) => {
    sound.playClick();
    setConstructedSequence(prev => prev.filter((_, i) => i !== idx));
    setIsEvaluated(false);
  };

  const handleValidateProof = () => {
    sound.playClick();
    setIsEvaluated(true);
    const correct = 
      constructedSequence.length === selectedProof.correctSequence.length &&
      constructedSequence.every((val, idx) => val === selectedProof.correctSequence[idx]);

    setIsCorrect(correct);
    if (correct) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 120, spread: 80 });
      } catch {}
      addXp(180);
    } else {
      sound.playError();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setConstructedSequence([]);
    setIsEvaluated(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <ShieldCheck size={16} /> Formal Logic & Theorem Construction
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Proof Arena & Studio
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Construct mathematically sound formal proofs step by step using Proof by Contradiction, Mathematical Induction, and Cauchy-Weierstrass Epsilon-Delta bounds.
          </p>

          {/* Theorem Selector Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {proofChallenges.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedProof(p);
                  setConstructedSequence([]);
                  setIsEvaluated(false);
                  setIsCorrect(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedProof.id === p.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Available Proof Premises & Lemmas */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Available Logical Lemmas & Deductions
            </h3>
            <span className="text-xs text-indigo-400 font-mono">
              Method: {selectedProof.method}
            </span>
          </div>

          <div className="space-y-2.5">
            {selectedProof.availableSteps.map(step => {
              const isUsed = constructedSequence.includes(step.id);
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUsed 
                      ? 'bg-slate-950/40 border-slate-850 opacity-40' 
                      : 'bg-slate-950 border-slate-800 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.content}
                    </p>
                    <button
                      disabled={isUsed}
                      onClick={() => handleAddStep(step.id)}
                      className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white disabled:opacity-0 transition-all shrink-0"
                      title="Append to Proof Chain"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {step.latex && (
                    <div className="my-1.5 text-center">
                      <MathView math={step.latex} block />
                    </div>
                  )}
                  <span className="text-[10px] text-slate-500 block font-mono">
                    Justification: {step.justification}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Proof Workspace */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Proof Chain Workspace
              </h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <RotateCcw size={12} /> Clear Chain
              </button>
            </div>

            <div className="my-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-0.5">
                Target Theorem to Prove:
              </span>
              <div className="text-sm font-semibold text-white">
                {selectedProof.theorem}
              </div>
              <div className="my-1 text-center">
                <MathView math={selectedProof.theoremLatex} block />
              </div>
            </div>

            {/* Sequence Drop / Chain List */}
            {constructedSequence.length === 0 ? (
              <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-500">
                Click "+" on logical steps on the left to arrange them in strict deductive sequence.
              </div>
            ) : (
              <div className="space-y-2">
                {constructedSequence.map((stepId, idx) => {
                  const stepObj = selectedProof.availableSteps.find(s => s.id === stepId);
                  if (!stepObj) return null;
                  return (
                    <div
                      key={stepId}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="text-xs text-slate-200">
                          {stepObj.content}
                          {stepObj.latex && (
                            <div className="my-1 text-center">
                              <MathView math={stepObj.latex} block />
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveStep(idx)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove step"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={handleValidateProof}
              disabled={constructedSequence.length === 0}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} /> Validate Deductive Sequence
            </button>

            {isEvaluated && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                isCorrect 
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                {isCorrect ? (
                  <div>
                    <strong className="block text-emerald-400 text-sm mb-1">✓ Q.E.D. Proof Validated!</strong>
                    {selectedProof.explanation}
                  </div>
                ) : (
                  <div>
                    <strong className="block text-rose-400 text-sm mb-1">❌ Deductive Gap Detected</strong>
                    The proof steps are incomplete, out of order, or missing prerequisite lemmas. Re-evaluate the causal dependencies.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
