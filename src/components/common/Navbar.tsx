import React, { useState } from 'react';
import { getStoredProgress, saveProgress } from '../../services/storage';
import { sound } from '../../services/audio';
import { Flame, Zap, Volume2, VolumeX, Sparkles, Orbit, Compass, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  cosmicBgEnabled?: boolean;
  onToggleCosmicBg?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onSelectTab, 
  cosmicBgEnabled = true, 
  onToggleCosmicBg 
}) => {
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
    <header className="h-16 border-b border-violet-500/20 bg-[#04030a]/85 backdrop-blur-2xl sticky top-0 z-50 px-4 md:px-6 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
      {/* Brand Logo with Cosmic Aura */}
      <div 
        onClick={() => {
          sound.playClick();
          onSelectTab('universe');
        }}
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 p-[1.5px] shadow-[0_0_20px_rgba(217,70,239,0.35)] group-hover:scale-105 transition-all">
          <div className="w-full h-full bg-[#070514] rounded-2xl flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-300">
            ∫
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-white tracking-wider font-cinzel">
              MATHVERSE
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
              COSMIC 3D
            </span>
          </div>
          <span className="text-[10px] text-slate-400 tracking-tight block -mt-1 hidden sm:block">
            The Universal Mathematical Universe & Research Academy
          </span>
        </div>
      </div>

      {/* Center Navigation Shortcuts */}
      <div className="hidden xl:flex items-center gap-1 bg-[#09071c]/90 border border-violet-500/20 p-1 rounded-2xl backdrop-blur-xl">
        {[
          { id: 'universe', label: '3D Cosmos', icon: Orbit, isGlow: true },
          { id: 'formula_library', label: 'Formulas' },
          { id: 'mathverse_ai', label: 'Hypatia AI' },
          { id: 'geometry_universe', label: 'Geometry 3D' },
          { id: 'graphing_studio', label: 'Graphing 3D' },
          { id: 'discovery_lab', label: 'Discovery Lab' },
          { id: 'personal_notebook', label: 'Notebook' },
          { id: 'topic_quizzes', label: 'Quizzes' },
          { id: 'calculus_academy', label: 'Calculus' },
          { id: 'olympiad', label: 'Olympiad' }
        ].map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(item.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-white shadow-lg shadow-fuchsia-600/30 border border-fuchsia-400/60'
                  : item.isGlow
                  ? 'text-fuchsia-300 hover:text-white hover:bg-violet-950/40 border border-violet-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {Icon && <Icon size={13} className={isActive ? 'text-white' : 'text-fuchsia-400'} />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Stats & Audio & Ambient Controls */}
      <div className="flex items-center gap-2.5">
        {/* Ambient 3D Starfield Toggle */}
        {onToggleCosmicBg && (
          <button
            onClick={() => {
              sound.playClick();
              onToggleCosmicBg();
            }}
            className={`p-2 rounded-xl border transition-all ${
              cosmicBgEnabled
                ? 'bg-violet-950/40 border-violet-500/40 text-fuchsia-300 hover:text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
            title={cosmicBgEnabled ? '3D Cosmic Atmosphere: ON' : '3D Cosmic Atmosphere: OFF'}
          >
            <Sparkles size={15} className={cosmicBgEnabled ? 'text-fuchsia-400 animate-pulse' : ''} />
          </button>
        )}

        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#09071c] border border-amber-500/30 text-xs font-bold text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
          <Flame size={14} className="fill-amber-400 text-amber-400" />
          <span>{progress.streakDays}d Streak</span>
        </div>

        {/* XP & Level */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#09071c] border border-violet-500/30 text-xs font-bold text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.15)]">
          <Zap size={14} className="text-fuchsia-400 fill-fuchsia-400" />
          <span className="font-mono">{progress.xp} XP</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300">Lvl {progress.level}</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-xl border transition-all ${
            soundOn 
              ? 'bg-violet-950/40 border-violet-500/40 text-violet-300 hover:text-white shadow-[0_0_12px_rgba(139,92,246,0.2)]' 
              : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
          title={soundOn ? 'Cosmic Sound Effects: ON' : 'Sound Muted'}
        >
          {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </div>
    </header>
  );
};
