import React, { useState } from 'react';
import { mathSubjects, SubjectInfo } from '../../data/curriculum/allSubjects';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { 
  BookOpen, CheckCircle2, ChevronRight, HelpCircle, Layers, 
  Sparkles, GraduationCap, Award, Compass, ArrowRight, Bot, Target 
} from 'lucide-react';

export const AllSubjectsAtlas: React.FC<{ 
  onSelectSubject?: (subjectId: string) => void;
  onAskAI?: (prompt: string) => void;
  onLaunchQuiz?: (subjectId: string) => void;
}> = ({ onSelectSubject, onAskAI, onLaunchQuiz }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo>(mathSubjects[0]);
  const [levelFilter, setLevelFilter] = useState<'All' | 'High School' | 'Undergraduate' | 'Research & Olympiad'>('All');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [selectedTheorem, setSelectedTheorem] = useState<string | null>(null);

  const filteredSubjects = mathSubjects.filter(sub => {
    if (levelFilter === 'All') return true;
    return sub.level === levelFilter;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <BookOpen size={16} /> Complete Mathematical Atlas & Curriculum
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-cinzel">
            The Universal Mathematics Atlas
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            From High School Foundations and Calculus to Harvard/MIT Undergraduate Rigor (Real & Complex Analysis, Abstract Algebra) and Elite Olympiad Frontiers.
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {(['All', 'High School', 'Undergraduate', 'Research & Olympiad'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                sound.playClick();
                setLevelFilter(lvl);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                levelFilter === lvl
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {lvl === 'All' ? 'All 12 Disciplines' : lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Subject Cards List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Curriculum Disciplines ({filteredSubjects.length})
            </span>
            <span className="text-[10px] text-slate-500">Click to explore</span>
          </div>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredSubjects.map(sub => {
              const isSelected = selectedSubject.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSubject(sub);
                    setShowExplanation(false);
                    setSelectedTheorem(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-400">
                        {sub.category}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {sub.level}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {sub.name}
                    </h4>
                    <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {sub.tagline}
                    </span>
                  </div>
                  <ChevronRight size={16} className={isSelected ? 'text-indigo-400 shrink-0' : 'text-slate-600 shrink-0'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Subject Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {selectedSubject.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedSubject.level} Tier
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1.5">{selectedSubject.name}</h3>
                <p className="text-xs text-amber-300 italic mt-0.5">{selectedSubject.tagline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {onAskAI && (
                  <button
                    onClick={() => onAskAI(`Explain key concepts, theorems, and core proof techniques in ${selectedSubject.name}`)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                  >
                    <Bot size={14} />
                    <span>Ask Hypatia AI</span>
                  </button>
                )}
                {onLaunchQuiz && (
                  <button
                    onClick={() => onLaunchQuiz(selectedSubject.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
                  >
                    <Target size={14} />
                    <span>Practice Quiz</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {selectedSubject.description}
            </p>

            {/* Prerequisites */}
            {selectedSubject.prerequisites && selectedSubject.prerequisites.length > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider">Prerequisites:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSubject.prerequisites.map((req, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-indigo-300 text-[11px]">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Core Theorems & Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Award size={14} /> Pinnacle Theorems
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {selectedSubject.theorems.map((thm, i) => (
                    <li 
                      key={i}
                      onClick={() => {
                        sound.playClick();
                        setSelectedTheorem(thm === selectedTheorem ? null : thm);
                      }}
                      className="cursor-pointer hover:text-indigo-300 flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                    >
                      <span>• {thm}</span>
                      <span className="text-[10px] text-indigo-400 font-mono">Proof Info →</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Layers size={14} /> Curriculum Modules
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 pl-2">
                  {selectedSubject.coreTopics.map((top, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Theorem Mini-Viewer (if clicked) */}
            {selectedTheorem && (
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between font-bold text-indigo-300">
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} /> Theorem Focus: {selectedTheorem}
                  </span>
                  <button onClick={() => setSelectedTheorem(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Governing theoretical result in <strong>{selectedSubject.name}</strong>. Used extensively in Olympiad proofs and modern higher mathematics. 
                  You can explore full interactive proofs in the Proof Arena or consult Hypatia AI for step-by-step derivations.
                </p>
              </div>
            )}

            {/* Exemplar Diagnostic Problem */}
            <div className="mt-4 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} /> Diagnostic Exemplar Challenge
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowExplanation(!showExplanation);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  {showExplanation ? 'Hide Solution' : 'View Verified Solution'}
                </button>
              </div>

              <div className="text-xs text-white font-medium">
                {selectedSubject.sampleQuestion.prompt}
              </div>

              <div className="my-2 p-2 bg-slate-900 rounded-xl text-center border border-slate-800">
                <MathView math={selectedSubject.sampleQuestion.latex} block />
              </div>

              {showExplanation && (
                <div className="mt-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1.5 animate-fadeIn">
                  <div className="font-mono text-emerald-400 font-bold">
                    Key Answer: {selectedSubject.sampleQuestion.answer}
                  </div>
                  <div className="text-slate-300">
                    {selectedSubject.sampleQuestion.explanation}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
