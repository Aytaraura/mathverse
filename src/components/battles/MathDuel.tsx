import React, { useState, useEffect } from 'react';
import { generateProceduralProblem } from '../../services/problemGenerator';
import { Question } from '../../types';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { getStoredProgress, saveProgress, addXp } from '../../services/storage';
import { Zap, Trophy, User, Bot, Clock, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RivalBot {
  id: string;
  name: string;
  title: string;
  avatar: string;
  elo: number;
  speedSec: number;
  accuracy: number;
}

const RIVALS: RivalBot[] = [
  { id: 'gauss', name: 'Gauss Bot', title: 'Princeps Mathematicorum', avatar: '🎩', elo: 1450, speedSec: 8, accuracy: 0.9 },
  { id: 'euler', name: 'Euler Bot', title: 'Omnipresent Analyst', avatar: '📜', elo: 1600, speedSec: 6, accuracy: 0.95 },
  { id: 'noether', name: 'Noether Bot', title: 'Symmetry Architect', avatar: '🔮', elo: 1720, speedSec: 5, accuracy: 0.96 },
  { id: 'ramanujan', name: 'Ramanujan Bot', title: 'Master of Mock Theta', avatar: '⚡', elo: 1850, speedSec: 4, accuracy: 0.98 }
];

export const MathDuel: React.FC = () => {
  const [selectedRival, setSelectedRival] = useState<RivalBot>(RIVALS[0]);
  const [inDuel, setInDuel] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [rivalScore, setRivalScore] = useState<number>(0);
  const [currentProblem, setCurrentProblem] = useState<Question | null>(null);
  const [roundTimer, setRoundTimer] = useState<number>(15);
  const [roundEnded, setRoundEnded] = useState<boolean>(false);
  const [duelWinner, setDuelWinner] = useState<'player' | 'rival' | 'draw' | null>(null);

  const startDuel = (rival: RivalBot) => {
    sound.playClick();
    setSelectedRival(rival);
    setCurrentRound(1);
    setPlayerScore(0);
    setRivalScore(0);
    setDuelWinner(null);
    setRoundEnded(false);
    setInDuel(true);
    nextProblem();
  };

  const nextProblem = () => {
    const q = generateProceduralProblem('power_rule', 'INTERMEDIATE');
    setCurrentProblem(q);
    setRoundTimer(15);
    setRoundEnded(false);
  };

  useEffect(() => {
    if (!inDuel || roundEnded || duelWinner || !currentProblem) return;

    const interval = setInterval(() => {
      setRoundTimer(prev => {
        if (prev <= 1) {
          // Timer expired: rival may score
          handleRoundTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [inDuel, roundEnded, duelWinner, currentProblem]);

  const handleRoundTimeout = () => {
    sound.playError();
    setRoundEnded(true);
    // Rival chance to score
    const rivalScores = Math.random() < selectedRival.accuracy;
    if (rivalScores) {
      setRivalScore(s => s + 1);
    }
    checkAdvance(playerScore, rivalScore + (rivalScores ? 1 : 0));
  };

  const handlePlayerAnswer = (ans: string) => {
    if (roundEnded || !currentProblem) return;
    setRoundEnded(true);

    const isCorrect = ans.trim().toLowerCase() === currentProblem.correctAnswer.trim().toLowerCase();
    const rivalScores = Math.random() < selectedRival.accuracy;

    if (isCorrect) {
      sound.playSuccess();
      setPlayerScore(s => s + 1);
    } else {
      sound.playError();
    }

    if (rivalScores) {
      setRivalScore(s => s + 1);
    }

    checkAdvance(playerScore + (isCorrect ? 1 : 0), rivalScore + (rivalScores ? 1 : 0));
  };

  const checkAdvance = (pScore: number, rScore: number) => {
    if (currentRound >= 5) {
      // Duel over
      setTimeout(() => {
        if (pScore > rScore) {
          setDuelWinner('player');
          sound.playFanfare();
          try {
            confetti({ particleCount: 120, spread: 80 });
          } catch {}
          addXp(200);
          const p = getStoredProgress();
          p.duelsWon++;
          p.eloRating += 25;
          saveProgress(p);
        } else if (rScore > pScore) {
          setDuelWinner('rival');
          sound.playError();
          const p = getStoredProgress();
          p.duelsLost++;
          p.eloRating = Math.max(1000, p.eloRating - 15);
          saveProgress(p);
        } else {
          setDuelWinner('draw');
        }
      }, 1000);
    } else {
      setTimeout(() => {
        setCurrentRound(r => r + 1);
        nextProblem();
      }, 1500);
    }
  };

  const stored = getStoredProgress();

  return (
    <div className="space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
            <Zap size={16} /> Real-Time 1v1 Mathematical Duel Arena
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Mathematical Duels</h2>
          <p className="text-slate-400 text-sm mt-1">
            Duel simulated grandmaster AI mathematicians. Rapid speed and exact calculation earn ELO rating points.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <Trophy size={28} className="text-amber-400" />
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Your ELO Rating</div>
            <div className="text-2xl font-black text-white font-mono">{stored.eloRating} ELO</div>
            <div className="text-[11px] text-slate-500">Won: {stored.duelsWon} • Lost: {stored.duelsLost}</div>
          </div>
        </div>
      </div>

      {!inDuel ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RIVALS.map(rival => (
            <div
              key={rival.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all group"
            >
              <div>
                <div className="text-4xl mb-3">{rival.avatar}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {rival.name}
                </h3>
                <span className="text-xs text-slate-400 block mt-0.5">{rival.title}</span>
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <strong className="text-amber-400 font-mono">{rival.elo} ELO</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Speed:</span>
                    <strong className="text-white font-mono">{rival.speedSec}s</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <strong className="text-emerald-400 font-mono">{Math.round(rival.accuracy * 100)}%</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => startDuel(rival)}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/20 transition-all"
              >
                Challenge in Duel
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Duel Interface */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Duel Scoreboard */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            {/* Player */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
                <User size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-400">You ({stored.eloRating} ELO)</span>
                <div className="text-2xl font-black text-indigo-400 font-mono">{playerScore}</div>
              </div>
            </div>

            {/* Round & Timer */}
            <div className="text-center">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Round {currentRound} of 5</span>
              <div className={`text-2xl font-black font-mono mt-0.5 ${roundTimer <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                {roundTimer}s
              </div>
            </div>

            {/* Rival */}
            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-xs text-slate-400">{selectedRival.name}</span>
                <div className="text-2xl font-black text-rose-400 font-mono">{rivalScore}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-2xl">
                {selectedRival.avatar}
              </div>
            </div>
          </div>

          {/* Duel Result or Problem */}
          {duelWinner ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
              <div className="text-4xl">
                {duelWinner === 'player' ? '👑' : (duelWinner === 'rival' ? '💀' : '🤝')}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {duelWinner === 'player' ? 'Victory! You Won the Duel!' : (duelWinner === 'rival' ? `${selectedRival.name} Won the Duel` : 'Duel Ended in a Draw')}
              </h3>
              <p className="text-xs text-slate-400">
                Final Score: You {playerScore} - {rivalScore} {selectedRival.name}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setInDuel(false)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase"
                >
                  Return to Duel Lobby
                </button>
              </div>
            </div>
          ) : currentProblem ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <h4 className="text-base font-semibold text-white">{currentProblem.prompt}</h4>
              {currentProblem.latexPrompt && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                  <MathView math={currentProblem.latexPrompt} block />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {currentProblem.options?.map(opt => (
                  <button
                    key={opt.id}
                    disabled={roundEnded}
                    onClick={() => handlePlayerAnswer(opt.text)}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-200 hover:bg-amber-600/20 hover:border-amber-500 transition-all disabled:opacity-50"
                  >
                    {opt.latex ? <MathView math={opt.latex} /> : opt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
