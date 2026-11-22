import React, { useState } from 'react';
import { initialFlashcards } from '../../data/flashcards';
import { Flashcard } from '../../types';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import { Brain, RotateCw, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react';

export const CalculusActiveRecall: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(initialFlashcards);
  const [selectedDeck, setSelectedDeck] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = selectedDeck === 'all' 
    ? cards 
    : cards.filter(c => c.deck === selectedDeck);

  const activeCard = filteredCards[currentIdx] || filteredCards[0];

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleSM2Rating = (confidence: number) => {
    sound.playSuccess();
    // Simplified SM-2 update
    const updated = cards.map(c => {
      if (c.id === activeCard.id) {
        const newReps = confidence >= 3 ? c.repetitions + 1 : 0;
        const newInterval = newReps === 0 ? 1 : (newReps === 1 ? 1 : Math.round(c.intervalDays * c.easeFactor));
        return {
          ...c,
          repetitions: newReps,
          intervalDays: newInterval,
          nextReviewDate: Date.now() + newInterval * 86400000
        };
      }
      return c;
    });

    setCards(updated);
    setIsFlipped(false);
    if (currentIdx < filteredCards.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Brain size={16} /> Spaced Repetition Mastery Engine
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Calculus Active Recall</h2>
          <p className="text-slate-400 text-sm mt-1">
            Strengthen neural pathways for derivative formulas, integration techniques, and common analytical fallacies.
          </p>
        </div>

        {/* Deck Selectors */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Decks' },
            { id: 'derivative_formulas', label: 'Derivatives' },
            { id: 'integral_formulas', label: 'Integrals' },
            { id: 'common_mistakes', label: 'Fallacies & Traps' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => {
                sound.playClick();
                setSelectedDeck(d.id);
                setCurrentIdx(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedDeck === d.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard 3D Perspective Card */}
      {activeCard ? (
        <div className="flex flex-col items-center space-y-6">
          <div
            onClick={handleFlip}
            className="w-full max-w-xl aspect-[16/10] bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-indigo-500/50 transition-all transform flex flex-col justify-between relative overflow-hidden group select-none"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-semibold uppercase tracking-wider">
                {activeCard.category}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-500" /> Click anywhere to flip
              </span>
            </div>

            {/* Front / Back View */}
            <div className="text-center py-6">
              {!isFlipped ? (
                <div className="space-y-4">
                  <div className="text-sm text-indigo-400 uppercase tracking-widest font-bold">Prompt</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{activeCard.frontPrompt}</h3>
                  {activeCard.frontLatex && (
                    <div className="py-2">
                      <MathView math={activeCard.frontLatex} block />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-sm text-emerald-400 uppercase tracking-widest font-bold">Verified Recall</div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-300">{activeCard.backResponse}</h3>
                  {activeCard.backLatex && (
                    <div className="py-2">
                      <MathView math={activeCard.backLatex} block />
                    </div>
                  )}
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    {activeCard.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Footer indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80">
              <span>Card {currentIdx + 1} of {filteredCards.length}</span>
              <span className="font-mono text-indigo-400 font-medium">Repetitions: {activeCard.repetitions}</span>
            </div>
          </div>

          {/* SM-2 Recall Feedback Buttons */}
          {isFlipped && (
            <div className="flex items-center gap-3 animate-fadeIn">
              <button
                onClick={() => handleSM2Rating(1)}
                className="px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition-all"
              >
                1 • Again (Blackout)
              </button>
              <button
                onClick={() => handleSM2Rating(2)}
                className="px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-800 text-amber-300 hover:bg-amber-900/40 text-xs font-semibold transition-all"
              >
                2 • Hard
              </button>
              <button
                onClick={() => handleSM2Rating(3)}
                className="px-4 py-2 rounded-xl bg-indigo-950/40 border border-indigo-800 text-indigo-300 hover:bg-indigo-900/40 text-xs font-semibold transition-all"
              >
                3 • Good
              </button>
              <button
                onClick={() => handleSM2Rating(4)}
                className="px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 hover:bg-emerald-900/40 text-xs font-semibold transition-all"
              >
                4 • Easy (+4d)
              </button>
            </div>
          )}

          {/* Card Carousel Navigation */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIdx(prev => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={currentIdx === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Navigate Decks</span>
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIdx(prev => Math.min(filteredCards.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={currentIdx === filteredCards.length - 1}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">
          No flashcards in this deck.
        </div>
      )}
    </div>
  );
};
