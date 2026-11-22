import React, { useState } from 'react';
import { encyclopediaEntries } from '../../data/encyclopedia';
import { MathView } from '../common/MathView';
import { BookOpen, Search, Bookmark, History, Lightbulb } from 'lucide-react';
import { sound } from '../../services/audio';

export const MathEncyclopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Calculus', 'Algebra', 'Number Theory', 'Analysis'];

  const filteredEntries = encyclopediaEntries.filter(entry => {
    const matchesCat = selectedCat === 'All' || entry.category === selectedCat;
    const matchesQuery = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <BookOpen size={16} /> Definitive Mathematical Lexicon
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Mathematics Encyclopedia
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Searchable repository of classical theorems, definitions, governing identities, and practical applications across analysis and higher mathematics.
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search theorems, identities, definitions..."
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto py-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCat(cat);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
                    selectedCat === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-850 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Entry Cards List */}
      <div className="space-y-6">
        {filteredEntries.map(entry => (
          <div
            key={entry.id}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {entry.category}
              </span>
              <span className="text-xs text-slate-500">
                Verified Identity
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">{entry.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{entry.definition}</p>

            {/* LaTeX Math Block */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
              <MathView math={entry.latex} block />
            </div>

            {entry.theoremStatement && (
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400 block mb-0.5">Formal Theorem Statement:</strong>
                {entry.theoremStatement}
              </div>
            )}

            {/* Applications & Historical Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Lightbulb size={13} className="text-amber-400" /> Practical Applications:
                </span>
                <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                  {entry.applications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </div>

              {entry.historicalNote && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <History size={13} className="text-sky-400" /> Historical Origins:
                  </span>
                  <p className="text-slate-300 italic">{entry.historicalNote}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
