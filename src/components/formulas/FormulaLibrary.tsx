import React, { useState, useEffect, useMemo } from 'react';
import { FormulaItem, FormulaSubject, FormulaDifficulty } from '../../types/formulas';
import { allFormulas, formulaSubjects, formulaDifficulties, searchFormulas } from '../../data/formulas';
import { FormulaCard } from './FormulaCard';
import { FormulaDetailModal } from './FormulaDetailModal';
import { FormulaMemoryTrainer } from './FormulaMemoryTrainer';
import { sound } from '../../services/audio';
import {
  Search, Bookmark, Sparkles, BookOpen, Brain, Filter,
  History, RotateCcw, X, GraduationCap, Compass, Layers, CheckCircle
} from 'lucide-react';

interface FormulaLibraryProps {
  onNavigateAI?: (prompt: string) => void;
  onNavigateQuiz?: (subject: string) => void;
}

export const FormulaLibrary: React.FC<FormulaLibraryProps> = ({ onNavigateAI, onNavigateQuiz }) => {
  const [activeView, setActiveView] = useState<'library' | 'trainer'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<FormulaSubject | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<FormulaDifficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyRecent, setOnlyRecent] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState<FormulaItem | null>(null);

  // LocalStorage state for Favorites & Recently Viewed
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mathverse_formula_favorites');
      return saved ? JSON.parse(saved) : ['alg_quadratic_formula', 'diff_power_constant_multiple', 'integ_by_parts'];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mathverse_formula_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mathverse_formula_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('mathverse_formula_recent', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleOpenDetail = (formula: FormulaItem) => {
    setSelectedFormula(formula);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== formula.id);
      return [formula.id, ...filtered].slice(0, 20);
    });
  };

  // Available categories based on selected subject
  const availableCategories = useMemo(() => {
    const formulasToScan = selectedSubject === 'all'
      ? allFormulas
      : allFormulas.filter(f => f.subject === selectedSubject);
    const cats = Array.from(new Set(formulasToScan.map(f => f.category)));
    return ['all', ...cats];
  }, [selectedSubject]);

  // Filtered formulas
  const filteredFormulas = useMemo(() => {
    return searchFormulas(searchQuery, {
      subject: selectedSubject,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      favorites,
      onlyFavorites,
      recentlyViewed,
      onlyRecent
    });
  }, [
    searchQuery,
    selectedSubject,
    selectedDifficulty,
    selectedCategory,
    favorites,
    onlyFavorites,
    recentlyViewed,
    onlyRecent
  ]);

  const naturalSearchExamples = [
    'Derivative of sin x',
    'Integration by parts',
    'Area of a trapezoid',
    'Quadratic formula',
    'Cauchy Schwarz',
    'Volume of a sphere',
    'Euler formula',
    'AM-GM'
  ];

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-slate-800 p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <BookOpen size={14} /> Complete Mathematical Reference
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle size={14} /> 100% Mathematically Rigorous & Verified
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Formula Encyclopedia & Memory Trainer
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            The definitive mathematical reference: search, understand, memorize with active recall flashcards, and master formulas across basic arithmetic, algebra, geometry, trigonometry, calculus, and international Olympiad theorems.
          </p>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveView('library');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeView === 'library'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={15} />
              <span>Encyclopedia ({allFormulas.length} Formulas)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveView('trainer');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeView === 'trainer'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Brain size={15} />
              <span>Formula Memory Trainer (Spaced Repetition)</span>
            </button>
          </div>
        </div>
      </div>

      {activeView === 'library' ? (
        <div className="space-y-6">
          {/* Search & Filters Bar */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 backdrop-blur-xl">
            {/* Search Input */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search natural terms: "derivative of sin x", "quadratic formula", "area of a trapezoid", "Cauchy Schwarz"...'
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-12 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick Natural Search Suggestions */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" /> Popular Searches:
              </span>
              {naturalSearchExamples.map(item => (
                <button
                  key={item}
                  onClick={() => {
                    sound.playClick();
                    setSearchQuery(item);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Subject Tabs */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Subject Category
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                {formulaSubjects.map(sub => {
                  const isSelected = selectedSubject === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedSubject(sub.id as any);
                        setSelectedCategory('all');
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Filters: Difficulty, Category, Bookmarks & Recent */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2">
                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">All Difficulties</option>
                  {formulaDifficulties.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Topic / Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[180px]"
                >
                  <option value="all">All Sub-Categories</option>
                  {availableCategories.filter(c => c !== 'all').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Reset Filters */}
                {(selectedSubject !== 'all' || selectedDifficulty !== 'all' || selectedCategory !== 'all' || searchQuery || onlyFavorites || onlyRecent) && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedSubject('all');
                      setSelectedDifficulty('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setOnlyFavorites(false);
                      setOnlyRecent(false);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1"
                    title="Reset all filters"
                  >
                    <RotateCcw size={12} />
                    <span className="text-[11px]">Reset</span>
                  </button>
                )}
              </div>

              {/* Favorites & Recent Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setOnlyFavorites(!onlyFavorites);
                    if (!onlyFavorites) setOnlyRecent(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    onlyFavorites
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Bookmark size={13} />
                  <span>Bookmarks ({favorites.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setOnlyRecent(!onlyRecent);
                    if (!onlyRecent) setOnlyFavorites(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    onlyRecent
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <History size={13} />
                  <span>Recently Studied</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary & Formula Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                Showing <strong className="text-white">{filteredFormulas.length}</strong> matching formulas
              </span>
              {onlyFavorites && <span className="text-amber-400 font-semibold">• Filtered by bookmarks</span>}
              {onlyRecent && <span className="text-indigo-400 font-semibold">• Showing recently studied</span>}
            </div>

            {filteredFormulas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFormulas.map(formula => (
                  <FormulaCard
                    key={formula.id}
                    formula={formula}
                    isFavorite={favorites.includes(formula.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetail={handleOpenDetail}
                    onQuickAskAI={onNavigateAI ? (name, latex) => onNavigateAI(`Can you explain the formula "${name}": ${latex} and show step-by-step how to apply it?`) : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <Search size={36} className="mx-auto text-slate-600" />
                <h3 className="text-lg font-bold text-white">No formulas match your filters</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Try broadening your search term or clearing subject and difficulty filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setOnlyFavorites(false);
                    setOnlyRecent(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <FormulaMemoryTrainer
          onSelectFormula={handleOpenDetail}
        />
      )}

      {/* Formula Detail Modal */}
      {selectedFormula && (
        <FormulaDetailModal
          formula={selectedFormula}
          isOpen={!!selectedFormula}
          onClose={() => setSelectedFormula(null)}
          isFavorite={favorites.includes(selectedFormula.id)}
          onToggleFavorite={toggleFavorite}
          onSelectRelated={(relId) => {
            const rel = allFormulas.find(f => f.id === relId);
            if (rel) setSelectedFormula(rel);
          }}
          onLaunchPractice={(subj) => onNavigateQuiz && onNavigateQuiz(subj)}
          onAskAI={(name, latex) => onNavigateAI && onNavigateAI(`Can you explain the formula "${name}": ${latex} and show step-by-step how to apply it?`)}
        />
      )}
    </div>
  );
};
