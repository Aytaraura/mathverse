import React, { useState } from 'react';
import { calculusBosses } from '../../data/bosses';
import { BossChallenge, BossStage } from '../../types';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { addXp, saveProgress, getStoredProgress } from '../../services/storage';
import { Swords, Shield, Heart, Zap, Award, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BossBattle: React.FC = () => {
  const [selectedBoss, setSelectedBoss] = useState<BossChallenge>(calculusBosses[0]);
  const [inBattle, setInBattle] = useState<boolean>(false);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [bossHp, setBossHp] = useState<number>(100);
  const [maxBossHp, setMaxBossHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [playerMana, setPlayerMana] = useState<number>(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [battleWon, setBattleWon] = useState<boolean>(false);
  const [battleLost, setBattleLost] = useState<boolean>(false);

  const stage = selectedBoss.stages[currentStageIdx] || selectedBoss.stages[0];

  const startBossEncounter = (boss: BossChallenge) => {
    sound.playClick();
    setSelectedBoss(boss);
    setCurrentStageIdx(0);
    setBossHp(boss.stages[0].bossHp);
    setMaxBossHp(boss.stages[0].bossHp);
    setPlayerHp(100);
    setPlayerMana(100);
    setBattleWon(false);
    setBattleLost(false);
    setBattleLog([
      `⚔️ Encounter commenced! ${boss.name} (${boss.title}) appears!`,
      `"${boss.stages[0].dialogue}"`
    ]);
    setInBattle(true);
  };

  const handleCastSpell = (answerId: string) => {
    const isCorrect = answerId.toLowerCase() === stage.question.correctAnswer.toLowerCase();

    if (isCorrect) {
      sound.playSuccess();
      const damage = Math.round(maxBossHp * 0.6 + 20);
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);
      setBattleLog(prev => [
        `✨ Mathematical Spell Cast! You solved the problem correctly! Inflicted ${damage} damage to ${selectedBoss.name}!`,
        ...prev
      ]);

      if (newBossHp === 0) {
        // Stage defeated
        if (currentStageIdx < selectedBoss.stages.length - 1) {
          // Next stage
          const nextIdx = currentStageIdx + 1;
          const nextStage = selectedBoss.stages[nextIdx];
          setCurrentStageIdx(nextIdx);
          setBossHp(nextStage.bossHp);
          setMaxBossHp(nextStage.bossHp);
          setBattleLog(prev => [
            `💥 Stage ${currentStageIdx + 1} Cleared! ${selectedBoss.name} shifts into Stage ${nextIdx + 1}!`,
            `"${nextStage.dialogue}"`,
            ...prev
          ]);
        } else {
          // Complete Boss Defeated!
          setBattleWon(true);
          sound.playFanfare();
          try {
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
          } catch {}
          addXp(selectedBoss.rewardXp);
          const p = getStoredProgress();
          if (!p.bossDefeats.includes(selectedBoss.id)) {
            p.bossDefeats.push(selectedBoss.id);
            saveProgress(p);
          }
        }
      }
    } else {
      sound.playError();
      const bossAttackDmg = 35;
      const newPlayerHp = Math.max(0, playerHp - bossAttackDmg);
      setPlayerHp(newPlayerHp);
      setBattleLog(prev => [
        `❌ Analytical Error! The spell fizzled. ${selectedBoss.name} countered with ${stage.bossAttackName} dealing ${bossAttackDmg} damage!`,
        ...prev
      ]);

      if (newPlayerHp === 0) {
        setBattleLost(true);
      }
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold mb-3 border border-rose-500/30">
            <Swords size={16} /> Legendary Calculus Boss Battles
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Defeat the Keepers of the Infinitesimal
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Engage in turn-based mathematical combat against ancient calculus titans. Cast spells by solving rigorous multi-step differentiation and integration problems.
          </p>
        </div>
      </div>

      {!inBattle ? (
        /* Boss Select Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculusBosses.map(boss => (
            <div
              key={boss.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-3xl">{boss.avatar}</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 font-mono text-xs font-bold">
                    {boss.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-4 group-hover:text-indigo-400 transition-colors">
                  {boss.name}
                </h3>
                <span className="text-xs text-slate-400 block font-medium mt-0.5">
                  {boss.title}
                </span>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {boss.lore}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Stages: <strong className="text-white">{boss.stages.length}</strong></span>
                  <span>Bounty: <strong className="text-amber-400">+{boss.rewardXp} XP</strong></span>
                </div>

                <button
                  onClick={() => startBossEncounter(boss)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Swords size={14} /> Enter Arena
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Active Battle Screen */
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Battle Arena Header: Boss & Player Status Bars */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
            {/* Boss Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedBoss.avatar}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedBoss.name}</h3>
                    <span className="text-xs text-rose-400 font-medium">Stage {currentStageIdx + 1} of {selectedBoss.stages.length}</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-rose-400">
                  {bossHp} / {maxBossHp} HP
                </span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-500"
                  style={{ width: `${(bossHp / maxBossHp) * 100}%` }}
                />
              </div>
            </div>

            {/* Player Bar */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Heart size={14} /> Vitality
                  </span>
                  <span className="font-mono text-emerald-300">{playerHp} / 100 HP</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${playerHp}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sky-400 font-bold flex items-center gap-1">
                    <Zap size={14} /> Intellect Mana
                  </span>
                  <span className="font-mono text-sky-300">{playerMana} / 100 MP</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${playerMana}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Problem Card / Victory / Defeat */}
          {battleWon ? (
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl">
                🏆
              </div>
              <h3 className="text-2xl font-black text-white">Boss Vanquished!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                You have proven your mathematical supremacy over {selectedBoss.name} and conquered all infinitesimal challenges!
              </p>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700/50 inline-block font-mono text-sm text-emerald-300 font-bold">
                Reward: +{selectedBoss.rewardXp} XP • Badge: "{selectedBoss.rewardBadge}" Unlocked!
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setInBattle(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Return to Boss Hall
                </button>
              </div>
            </div>
          ) : battleLost ? (
            <div className="bg-gradient-to-br from-slate-900 to-rose-950/40 border border-rose-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center text-3xl">
                💀
              </div>
              <h3 className="text-2xl font-black text-white">Defeat</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {selectedBoss.name}'s mathematical strike shattered your calculations. Regroup and study the concepts before re-challenging.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => startBossEncounter(selectedBoss)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Retry Encounter
                </button>
                <button
                  onClick={() => setInBattle(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider"
                >
                  Flee Arena
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Cast Spell: Solve Problem to Attack</span>
                <span className="font-mono text-amber-400">Stage {currentStageIdx + 1}</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-medium text-white">{stage.question.prompt}</h4>
                {stage.question.latexPrompt && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                    <MathView math={stage.question.latexPrompt} block />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {stage.question.options?.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleCastSpell(opt.id)}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-200 hover:bg-indigo-600/20 hover:border-indigo-500 transition-all flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-bold flex items-center justify-center shrink-0">
                      {opt.id.toUpperCase()}
                    </span>
                    <span>{opt.latex ? <MathView math={opt.latex} /> : opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Combat Log */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-400 max-h-40 overflow-y-auto space-y-1 shadow-inner">
            <span className="text-slate-500 uppercase tracking-wider font-sans text-[10px] block mb-1">Combat Chronicle:</span>
            {battleLog.map((log, idx) => (
              <div key={idx} className="leading-relaxed">{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
