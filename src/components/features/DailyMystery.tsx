import React, { useState } from 'react';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { addXp, getStoredProgress } from '../../services/storage';
import { Calendar, HelpCircle, CheckCircle2, Sparkles, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DailyMystery: React.FC = () => {
  const [userGuess, setUserGuess] = useState<string>('');
  const [hintsRevealed, setHintsRevealed] = useState<number>(1);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  const progress = getStoredProgress();

  const mystery = {
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    caseCode: 'MYSTERY-2849',
    title: 'The Enigma of the Curvature Singularity',
    narrative: 'A mysterious curve y = x³ - k·x was observed in the observatory. The curve is known to have a local maximum at x = -2. The archivists need to deduce the exact value of the parameter k before midnight.',
    latex: 'y = x^3 - kx \\quad \\text{has a local extremum at } x = -2 \\implies k = ?',
    correctAnswer: '12',
    hints: [
      'Clue 1: A local extremum occurs where the first derivative dy/dx equals zero.',
      'Clue 2: Differentiate y with respect to x: dy/dx = 3x² - k.',
      'Clue 3: Set dy/dx = 0 at x = -2: 3(-2)² - k = 0 -> 3(4) - k = 0 -> k = 12.'
    ],
    explanation: 'By the First Derivative Test, critical points satisfy dy/dx = 0. Since dy/dx = 3x² - k, substituting x = -2 yields 3(-2)² - k = 12 - k = 0, which uniquely determines k = 12.'
  };

  const handleVerify = () => {
    sound.playClick();
    if (userGuess.trim() === mystery.correctAnswer) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 120, spread: 80 });
      } catch {}
      setIsSolved(true);
      setFeedback('✓ Case Solved! Parameter k = 12 confirmed.');
      addXp(120);
    } else {
      sound.playError();
      setFeedback('❌ The calculations do not match the observed extremum. Check dy/dx = 0.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Calendar size={16} /> Daily Mathematical Investigation
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Daily Mystery</h2>
            <p className="text-slate-400 text-sm mt-1">
              Case File {mystery.caseCode} • {mystery.date}
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono text-xs">
            <span className="text-slate-500 uppercase block">Detective Streak</span>
            <span className="text-xl font-bold text-amber-400">{progress.streakDays} Days</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <h3 className="text-xl font-bold text-white">{mystery.title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          "{mystery.narrative}"
        </p>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
          <MathView math={mystery.latex} block />
        </div>

        {/* Hints */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Investigative Clues ({hintsRevealed} of {mystery.hints.length})
            </span>
            {hintsRevealed < mystery.hints.length && (
              <button
                onClick={() => {
                  sound.playClick();
                  setHintsRevealed(h => h + 1);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <Sparkles size={12} /> Unlock Clue {hintsRevealed + 1}
              </button>
            )}
          </div>

          {mystery.hints.slice(0, hintsRevealed).map((h, i) => (
            <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              {h}
            </div>
          ))}
        </div>

        {/* Input & Verification */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Deduce the Value of Parameter k:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter numerical value..."
              disabled={isSolved}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleVerify}
              disabled={isSolved || !userGuess}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30"
            >
              Verify Deduction
            </button>
          </div>

          {feedback && (
            <div className={`p-3.5 rounded-xl border text-xs font-medium animate-fadeIn ${
              isSolved 
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500 text-rose-200'
            }`}>
              {feedback}
            </div>
          )}

          {isSolved && (
            <div className="mt-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed animate-fadeIn">
              <strong className="text-emerald-400 block mb-1">Archival Resolution:</strong>
              {mystery.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
