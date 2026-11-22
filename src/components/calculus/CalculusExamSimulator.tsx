import React, { useState, useEffect, useRef } from 'react';
import { Question, ExamConfig, ExamResult, DifficultyLevel } from '../../types';
import { MathView } from '../common/MathView';
import { CalculusExamReport } from './CalculusExamReport';
import { recordExamResult, recordError } from '../../services/storage';
import { sound } from '../../services/audio';
import { Clock, Bookmark, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, HelpCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CalculusExamSimulatorProps {
  config: ExamConfig;
  questions: Question[];
  onExit: () => void;
}

export const CalculusExamSimulator: React.FC<CalculusExamSimulatorProps> = ({
  config,
  questions,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(config.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const questionTimesRef = useRef<Record<string, number>>({});
  const currentQStartTimeRef = useRef<number>(Date.now());

  // Current question
  const currentQ = questions[currentIndex];

  // Track time spent per question on index switch
  useEffect(() => {
    const elapsed = Math.round((Date.now() - currentQStartTimeRef.current) / 1000);
    if (questions[currentIndex]) {
      const qId = questions[currentIndex].id;
      questionTimesRef.current[qId] = (questionTimesRef.current[qId] || 0) + elapsed;
    }
    currentQStartTimeRef.current = Date.now();
  }, [currentIndex, questions]);

  // Timer countdown
  useEffect(() => {
    if (!config.timed || isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 60 && prev > 0 && prev % 15 === 0) {
          sound.playTimerWarning();
        }
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [config.timed, isSubmitted]);

  const handleSelectAnswer = (ans: string) => {
    sound.playClick();
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
  };

  const toggleMarkReview = () => {
    sound.playClick();
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitExam = () => {
    if (isSubmitted) return;

    const totalSecondsSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    let correctCount = 0;
    const answersRecord: ExamResult['answers'] = [];
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};
    const diffBreakdown: Record<DifficultyLevel, { correct: number; total: number }> = {
      FOUNDATION: { correct: 0, total: 0 },
      BEGINNER: { correct: 0, total: 0 },
      INTERMEDIATE: { correct: 0, total: 0 },
      ADVANCED: { correct: 0, total: 0 },
      OLYMPIAD: { correct: 0, total: 0 },
      ELITE: { correct: 0, total: 0 }
    };
    const weakConcepts: string[] = [];

    questions.forEach(q => {
      const given = (userAnswers[q.id] || '').trim().toLowerCase();
      const expected = q.correctAnswer.trim().toLowerCase();
      const acceptable = (q.acceptableAnswers || []).map(a => a.trim().toLowerCase());

      let isCorrect = false;
      if (given === expected || acceptable.includes(given)) {
        isCorrect = true;
      } else if (q.tolerance && !isNaN(parseFloat(given))) {
        const numGiven = parseFloat(given);
        const numExpected = parseFloat(expected);
        if (Math.abs(numGiven - numExpected) <= q.tolerance) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        correctCount++;
      } else {
        if (!weakConcepts.includes(q.subtopic)) {
          weakConcepts.push(q.subtopic);
        }
        recordError(q.id, q.errorCategoryIfWrong || 'conceptual', q.subtopic);
      }

      answersRecord.push({
        questionId: q.id,
        userAnswer: userAnswers[q.id] || '',
        isCorrect,
        timeSpentSeconds: questionTimesRef.current[q.id] || 30
      });

      // Topic stats
      if (!topicBreakdown[q.subtopic]) {
        topicBreakdown[q.subtopic] = { correct: 0, total: 0 };
      }
      topicBreakdown[q.subtopic].total++;
      if (isCorrect) topicBreakdown[q.subtopic].correct++;

      // Difficulty stats
      diffBreakdown[q.difficulty].total++;
      if (isCorrect) diffBreakdown[q.difficulty].correct++;
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    const result: ExamResult = {
      id: `exam_res_${Date.now()}`,
      examTitle: config.title,
      timestamp: Date.now(),
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      timeSpentSeconds: totalSecondsSpent,
      category: config.category,
      difficulty: config.difficulty,
      answers: answersRecord,
      topicBreakdown,
      difficultyBreakdown: diffBreakdown,
      weakConcepts,
      recommendedLessons: weakConcepts.map(w => `Lesson: ${w}`)
    };

    recordExamResult(result);
    setExamResult(result);
    setIsSubmitted(true);
    setShowConfirmModal(false);

    if (percentage >= 70) {
      sound.playFanfare();
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      sound.playError();
    }
  };

  if (isSubmitted && examResult) {
    return (
      <CalculusExamReport
        result={examResult}
        questions={questions}
        onRestart={() => {
          setIsSubmitted(false);
          setExamResult(null);
          setUserAnswers({});
          setMarkedForReview({});
          setCurrentIndex(0);
          setTimeLeft(config.timeLimitMinutes * 60);
          startTimeRef.current = Date.now();
        }}
        onExit={onExit}
      />
    );
  }

  const answeredCount = Object.keys(userAnswers).length;
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      {/* Top Header & Simulation Telemetry */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">{config.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Tier: <strong className="text-amber-400">{config.difficulty}</strong></span>
              <span>•</span>
              <span>{questions.length} Items</span>
            </div>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="flex items-center gap-6">
          {config.timed && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-base font-bold border ${
              timeLeft < 180 
                ? 'bg-rose-950/60 border-rose-600/50 text-rose-400 animate-pulse' 
                : 'bg-slate-950 border-slate-800 text-indigo-300'
            }`}>
              <Clock size={16} />
              <span>
                {String(minutesLeft).padStart(2, '0')}:{String(secondsLeft).padStart(2, '0')}
              </span>
            </div>
          )}

          <button
            onClick={() => {
              sound.playClick();
              setShowInstructions(true);
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Instructions"
          >
            <HelpCircle size={18} />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowConfirmModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Send size={14} /> Submit Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Columns: Active Question Card */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentQ.subtopic}
                </span>
              </div>

              <button
                onClick={toggleMarkReview}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Bookmark size={14} className={markedForReview[currentQ.id] ? 'fill-amber-400' : ''} />
                {markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
              </button>
            </div>

            {/* Prompt */}
            <div className="py-6 space-y-4">
              <h3 className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed">
                {currentQ.prompt}
              </h3>

              {currentQ.latexPrompt && (
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 my-4 shadow-inner">
                  <MathView math={currentQ.latexPrompt} block />
                </div>
              )}
            </div>

            {/* Answer Input Area */}
            {currentQ.options && currentQ.options.length > 0 ? (
              <div className="space-y-3 pt-2">
                {currentQ.options.map(opt => {
                  const isSelected = userAnswers[currentQ.id] === opt.id || userAnswers[currentQ.id] === opt.text;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAnswer(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono uppercase ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="text-sm">
                          {opt.latex ? <MathView math={opt.latex} /> : opt.text}
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 size={18} className="text-indigo-400" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="pt-4 space-y-3">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Numerical / Algebraic Response:
                </label>
                <input
                  type="text"
                  value={userAnswers[currentQ.id] || ''}
                  onChange={(e) => handleSelectAnswer(e.target.value)}
                  placeholder="Enter exact simplified value or expression..."
                  className="w-full max-w-md bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-8">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-sm font-medium transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <span className="text-xs text-slate-500">
              {answeredCount} of {questions.length} Answered
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
              }}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-sm font-medium transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right 1 Column: Question Navigator Palette */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Item Navigator</h4>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!userAnswers[q.id];
                const isMarked = !!markedForReview[q.id];

                let btnClass = 'bg-slate-950 border-slate-800 text-slate-400';
                if (isAnswered) btnClass = 'bg-indigo-600/30 border-indigo-500/60 text-indigo-200';
                if (isMarked) btnClass = 'bg-amber-500/30 border-amber-500/60 text-amber-300';
                if (isCurrent) btnClass += ' ring-2 ring-indigo-400 font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setCurrentIndex(idx);
                    }}
                    className={`aspect-square rounded-xl border flex items-center justify-center text-xs font-mono transition-all hover:scale-105 ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-indigo-600/50 border border-indigo-500"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-500"></span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800"></span>
                <span>Unanswered</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                sound.playClick();
                setShowConfirmModal(true);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all"
            >
              Finish & Grade Exam
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle size={24} />
              <h3 className="text-lg font-bold text-white">Confirm Exam Submission?</h3>
            </div>
            <p className="text-sm text-slate-300">
              You have answered <span className="font-bold text-white">{answeredCount}</span> of{' '}
              <span className="font-bold text-white">{questions.length}</span> questions.
              {answeredCount < questions.length && (
                <span className="text-rose-400 block mt-1">
                  Warning: You have {questions.length - answeredCount} unanswered items!
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-800 text-xs font-semibold uppercase"
              >
                Keep Reviewing
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/40"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle size={20} className="text-indigo-400" />
              Calculus Examination Chamber Instructions
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5">
              <li>Navigate between items using the bottom arrows or the question grid palette.</li>
              <li>You may mark items for review and revisit them before final submission.</li>
              <li>Numerical inputs accept exact decimals or fractions (e.g. 0.5 or 1/2).</li>
              <li>When the timer expires, the simulator will automatically submit and grade your responses.</li>
              <li>Detailed solutions with step-by-step calculus engine checks will be presented upon grading.</li>
            </ul>
            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
