import React, { useState, useEffect } from 'react';
import { initialFlashcards } from '../../data/flashcards';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { addXp } from '../../services/storage';
import { Zap, Clock, Trophy, Play, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FormulaBattle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const formulas = initialFlashcards;
  const currentCard = formulas[currentIdx % formulas.length];

  // Generate 4 multiple choice options for current card
  const options = React.useMemo(() => {
    if (!currentCard) return [];
    const correct = currentCard.backResponse;
    const distractors = formulas
      .filter(f => f.id !== currentCard.id)
      .map(f => f.backResponse)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  }, [currentCard, formulas]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          sound.playFanfare();
          try {
            confetti({ particleCount: 100, spread: 70 });
          } catch {}
          addXp(score * 15);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, score]);

  const handleStart = () => {
    sound.playClick();
    setTimeLeft(45);
    setScore(0);
    setStreak(0);
    setCurrentIdx(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleSelectOption = (chosen: string) => {
    if (!isPlaying) return;
    const isCorrect = chosen === currentCard.backResponse;

    if (isCorrect) {
      sound.playSuccess();
      setScore(s => s + 10 + streak * 2);
      setStreak(st => st + 1);
    } else {
      sound.playError();
      setStreak(0);
    }

    setCurrentIdx(i => i + 1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Zap size={16} /> Rapid-Fire Active Recall Arena
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Formula Battle</h2>
          <p className="text-slate-400 text-sm mt-1">
            Race against the 45-second clock. Match mathematical formula prompts as quickly and accurately as possible!
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <Clock size={28} className={timeLeft <= 10 && isPlaying ? 'text-rose-400 animate-pulse' : 'text-amber-400'} />
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Clock</div>
            <div className="text-2xl font-black text-white font-mono">{timeLeft}s</div>
          </div>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mx-auto flex items-center justify-center text-3xl">
            ⚡
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Ready for the Sprint?</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              45 seconds. Derivative & integral formulas. Consecutive correct answers multiply your streak bonus.
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 mx-auto"
          >
            <Play size={16} className="fill-white" /> Start Formula Battle
          </button>
        </div>
      ) : gameOver ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-10 text-center space-y-6 shadow-2xl animate-fadeIn">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Time's Up!</h3>
          <div className="text-4xl font-black font-mono text-amber-400">
            {score} Points
          </div>
          <p className="text-xs text-slate-400">
            Awarded: <strong className="text-indigo-400">+{Math.round(score * 1.5)} XP</strong> for active formula retention!
          </p>
          <div className="pt-2">
            <button
              onClick={handleStart}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              Play Again
            </button>
          </div>
        </div>
      ) : (
        /* Active Game Arena */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score:</span>
              <span className="font-mono text-lg font-bold text-indigo-400">{score}</span>
            </div>
            {streak > 1 && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 animate-pulse">
                🔥 {streak}x Streak Combo!
              </span>
            )}
          </div>

          <div className="text-center py-4 space-y-3">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Formula Prompt</span>
            <h4 className="text-2xl font-bold text-white">{currentCard.frontPrompt}</h4>
            {currentCard.frontLatex && (
              <div className="my-2">
                <MathView math={currentCard.frontLatex} block />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 text-white text-xs font-mono font-medium transition-all text-center"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
