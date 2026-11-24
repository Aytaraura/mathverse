import React from 'react';
import { sound } from '../../services/audio';
import { 
  Orbit, Box, BookOpen, GraduationCap, Zap, Maximize2, Layers, 
  Brain, Swords, Trophy, Bot, Search, ShieldCheck, Calendar, 
  Terminal, Wrench, BarChart2, AlertTriangle, Target, Compass, Eye,
  Activity, Sparkles, BookMarked
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

interface NavSection {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Cosmic 3D Continuum',
    items: [
      { id: 'universe', label: '3D Cosmic Continuum', icon: Orbit, badge: 'Flagship 3D', badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' },
      { id: 'visual_3d', label: '3D Manifolds & Calabi-Yau', icon: Box, badge: 'WebGL', badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
      { id: 'graphing_studio', label: 'Graphing & 3D Surfaces', icon: Activity, badge: 'Surfaces', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { id: 'all_subjects', label: 'All Mathematical Atlas', icon: BookOpen }
    ]
  },
  {
    title: 'Formula & AI Intelligence',
    items: [
      { id: 'formula_library', label: 'Formula Encyclopedia', icon: BookOpen, badge: 'SM-2 Memory', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { id: 'mathverse_ai', label: 'Hypatia AI Assistant', icon: Bot, badge: 'Free Solver', badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
      { id: 'geometry_universe', label: '3D Geometry Universe', icon: Compass, badge: 'Solids' },
      { id: 'topic_quizzes', label: 'Complete Topic Quizzes', icon: GraduationCap, badge: 'Quizzes' }
    ]
  },
  {
    title: 'Discovery & Research Labs',
    items: [
      { id: 'discovery_lab', label: 'Computational Discovery Lab', icon: Sparkles, badge: 'Fractals' },
      { id: 'personal_notebook', label: 'Personal Math Notebook', icon: BookMarked, badge: 'LaTeX' },
      { id: 'proof_arena', label: 'Proof Arena & Studio', icon: ShieldCheck },
      { id: 'daily_mystery', label: 'Daily Mystery Challenge', icon: Calendar }
    ]
  },
  {
    title: 'Calculus Academy (Master Update)',
    items: [
      { id: 'calculus_academy', label: 'Calculus Curriculum', icon: BookOpen, badge: 'Core' },
      { id: 'calculus_exams', label: 'Calculus Mock Exams', icon: GraduationCap, badge: 'Priority' },
      { id: 'derivative_lab', label: 'Derivative Visualizer', icon: Zap },
      { id: 'integral_lab', label: 'Riemann Integral Lab', icon: Maximize2 },
      { id: 'ftc_lab', label: 'FTC Interactive Explorer', icon: Layers },
      { id: 'active_recall', label: 'Calculus Active Recall', icon: Brain }
    ]
  },
  {
    title: 'Competitions & Battles',
    items: [
      { id: 'bosses', label: 'Calculus Boss Battles', icon: Swords, badge: 'RPG' },
      { id: 'duels', label: '1v1 Mathematical Duels', icon: Trophy },
      { id: 'olympiad', label: 'Olympiad Training Center', icon: GraduationCap },
      { id: 'formula_battle', label: 'Formula Sprint Battle', icon: Zap }
    ]
  },
  {
    title: 'Deduction & Tools',
    items: [
      { id: 'tutor', label: 'Socratic Tutor (Hypatia)', icon: Bot },
      { id: 'detective', label: 'Mathematical Detective', icon: Search },
      { id: 'sandbox', label: 'Mathematical Sandbox', icon: Terminal },
      { id: 'toolbox', label: 'Interactive Toolbox', icon: Wrench },
      { id: 'visual_library', label: 'Visual Math Library', icon: Eye }
    ]
  },
  {
    title: 'Analytics & Dossier',
    items: [
      { id: 'dashboard', label: 'Student Dossier & Radar', icon: BarChart2 },
      { id: 'error_analysis', label: 'Error Analysis Center', icon: AlertTriangle },
      { id: 'predictor', label: 'Exam Readiness Predictor', icon: Target },
      { id: 'pathway', label: 'Personalized Pathway', icon: Compass },
      { id: 'encyclopedia', label: 'Mathematics Encyclopedia', icon: BookOpen },
      { id: 'research', label: 'Research Explorer', icon: Compass }
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <aside className="w-64 border-r border-violet-500/20 bg-[#04030a]/90 backdrop-blur-2xl h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 space-y-6 custom-scrollbar shrink-0 hidden md:block shadow-[4px_0_30px_rgba(0,0,0,0.5)]">
      {NAV_SECTIONS.map((section, sIdx) => (
        <div key={sIdx} className="space-y-1.5">
          <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest px-3 block mb-1">
            {section.title}
          </span>

          <div className="space-y-0.5">
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTab(item.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-transparent text-white font-semibold border-l-2 border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-violet-950/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={15} className={isActive ? 'text-fuchsia-400' : 'text-slate-500 group-hover:text-violet-300'} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                      item.badgeColor || 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};
