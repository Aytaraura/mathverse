import React, { useState } from 'react';
import { getStoredProgress, saveProgress } from '../../services/storage';
import { sound } from '../../services/audio';
import { Flame, Zap, Volume2, VolumeX, Award, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const [progress, setProgress] = useState(getStoredProgress());
  const [soundOn, setSoundOn] = useState(sound.enabled);

  const toggleSound = () => {
    const next = !soundOn;
    sound.enabled = next;
    setSoundOn(next);
    const p = getStoredProgress();
    p.soundEnabled = next;
    saveProgress(p);
    setProgress({ ...p });
    if (next) sound.playClick();
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-[#090b10]/90 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div 
        onClick={() => {
          sound.playClick();
          onSelectTab('universe');
        }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          ∫
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-lg text-white tracking-wider font-cinzel">
              MATHVERSE
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              INFINITY
            </span>
          </div>
          <span className="text-[10px] text-slate-400 tracking-tight block -mt-1">
            Universal Mathematical Ecosystem & Research Academy
          </span>
        </div>
      </div>

      {/* Center Navigation Shortcuts */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-2xl">
        {[
          { id: 'formula_library', label: 'Formulas' },
          { id: 'mathverse_ai', label: 'Hypatia AI' },
          { id: 'geometry_universe', label: 'Geometry 3D' },
          { id: 'graphing_studio', label: 'Graphing 3D' },
          { id: 'discovery_lab', label: 'Discovery Lab' },
          { id: 'personal_notebook', label: 'Notebook' },
          { id: 'topic_quizzes', label: 'Quizzes' },
          { id: 'calculus_academy', label: 'Calculus' },
          { id: 'olympiad', label: 'Olympiad' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              sound.playClick();
              onSelectTab(item.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Stats & Audio Controls */}
      <div className="flex items-center gap-3">
        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400">
          <Flame size={14} className="fill-amber-400" />
          <span>{progress.streakDays}d Streak</span>
        </div>

        {/* XP & Level */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-indigo-300">
          <Zap size={14} className="text-indigo-400 fill-indigo-400" />
          <span className="font-mono">{progress.xp} XP</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400">Lvl {progress.level}</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-xl border transition-all ${
            soundOn 
              ? 'bg-slate-900 border-slate-800 text-indigo-400 hover:text-indigo-300' 
              : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
          title={soundOn ? 'Sound On' : 'Sound Muted'}
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </header>
  );
};
