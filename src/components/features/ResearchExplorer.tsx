import React, { useState } from 'react';
import { researchTopics } from '../../data/researchTopics';
import { MathView } from '../common/MathView';
import { Compass, Sparkles, ExternalLink, Award } from 'lucide-react';
import { sound } from '../../services/audio';

export const ResearchExplorer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(researchTopics[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Compass size={16} /> Frontier Discoveries & Open Enigmas
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Research Explorer
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
            Journey beyond textbooks into Millennium Prize problems, Ricci flow geometry, and non-linear partial differential equations.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {researchTopics.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedTopic(t);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTopic.id === t.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Research Topic View */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {selectedTopic.field}
            </span>
            <h3 className="text-2xl font-black text-white mt-1">{selectedTopic.title}</h3>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              selectedTopic.status === 'Open Problem'
                ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
            }`}>
              {selectedTopic.status}
            </span>
            {selectedTopic.prizeOrYear && (
              <div className="text-[11px] text-amber-400 font-mono mt-1 font-semibold">
                {selectedTopic.prizeOrYear}
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {selectedTopic.summary}
        </p>

        {selectedTopic.latex && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <MathView math={selectedTopic.latex} block />
          </div>
        )}

        <div className="space-y-4 pt-4 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
          <div>
            <strong className="text-indigo-400 block text-sm mb-1">Theoretical Deep Dive:</strong>
            <p>{selectedTopic.deepDive}</p>
          </div>

          <div>
            <strong className="text-amber-400 block text-sm mb-1">Impact & Modern Applications:</strong>
            <p>{selectedTopic.implications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
