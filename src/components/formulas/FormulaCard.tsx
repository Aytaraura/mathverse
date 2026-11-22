import React, { useState } from 'react';
import { FormulaItem } from '../../types/formulas';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { Bookmark, BookmarkCheck, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';

interface FormulaCardProps {
  formula: FormulaItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (formula: FormulaItem) => void;
  onQuickAskAI?: (name: string, latex: string) => void;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  formula,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onQuickAskAI
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(formula.latex);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 1800);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    onToggleFavorite(formula.id);
  };

  const handleAIClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (onQuickAskAI) {
      onQuickAskAI(formula.name, formula.latex);
    }
  };

  return (
    <div
      onClick={() => {
        sound.playClick();
        onOpenDetail(formula);
      }}
      className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-5 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-md"
    >
      <div className="space-y-3">
        {/* Top Badges & Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
              {formula.category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
              formula.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
              formula.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
              formula.difficulty === 'Advanced' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' :
              'bg-purple-500/10 text-purple-400 border border-purple-500/30'
            }`}>
              {formula.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onQuickAskAI && (
              <button
                onClick={handleAIClick}
                className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors"
                title="Ask AI about this formula"
              >
                <Sparkles size={14} />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copy LaTeX"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-400 hover:bg-amber-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Bookmarked' : 'Add bookmark'}
            >
              {isFavorite ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
          {formula.name}
        </h3>

        {/* KaTeX Math Display */}
        <div className="py-3 px-3 rounded-xl bg-slate-950/80 border border-slate-850 flex items-center justify-center min-h-[64px] text-center overflow-x-auto">
          <MathView math={formula.latex} block />
        </div>

        {/* When to use preview */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {formula.whenToUse}
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span className="truncate">{formula.topic}</span>
        <span className="text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
          Details <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  );
};
