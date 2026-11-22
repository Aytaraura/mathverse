import React, { useState, useEffect } from 'react';
import { QuizTopicDefinition, quizTopicsList, masterQuizBank, QuizQuestionItem } from '../../data/quizBank';
import { MathView } from '../common/MathView';
import { sound } from '../../services/audio';
import {
  GraduationCap, Clock, Award, CheckCircle2, XCircle, ArrowRight,
  RotateCcw, Sparkles, Brain, Filter, BarChart2, BookOpen, AlertCircle
} from 'lucide-react';

interface TopicQuizCenterProps {
  initialTopicId?: string;
  onNavigateTopic?: (subject: string) => void;
  onAskAI?: (prompt: string) => void;
}

export const TopicQuizCenter: React.FC<TopicQuizCenterProps> = ({
  initialTopicId,
  onNavigateTopic,
  onAskAI
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'>('all');
  const [quizActive, setQuizActive] = useState(false);
  const [quizTimed, setQuizTimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Active Quiz State
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Mastery scores stored in localStorage: { [topicId]: { correct: number, total: number, scorePct: number } }
  const [masteryScores, setMasteryScores] = useState<Record<string, { correct: number; total: number; scorePct: number }>>(() => {
    try {
      const saved = localStorage.getItem('mathverse_topic_mastery');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mathverse_topic_mastery', JSON.stringify(masteryScores));
    } catch (e) {
      console.error(e);
    }
  }, [masteryScores]);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizActive && quizTimed && timeLeft > 0 && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (quizActive && quizTimed && timeLeft === 0 && !quizFinished) {
      handleFinishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizActive, quizTimed, timeLeft, quizFinished]);

  // Start Quiz
  const handleStartQuiz = (topicId: string, timed: boolean) => {
    let pool = masterQuizBank;
    if (topicId !== 'all') {
      pool = pool.filter(q => q.topicId === topicId);
    }
    if (difficultyFilter !== 'all') {
      const filtered = pool.filter(q => q.difficulty === difficultyFilter);
      if (filtered.length > 0) pool = filtered;
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

    setCurrentQuestions(shuffled);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setQuizFinished(false);
    setQuizTimed(timed);
    setTimeLeft(timed ? 180 : 0); // 3 minutes for 5 questions
    setQuizActive(true);
    sound.playClick();
  };

  const handleSelectOption = (optIdx: number) => {
    if (submittedAnswers[currentQIndex]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
  };

  const handleSubmitCurrent = () => {
    const q = currentQuestions[currentQIndex];
    const isCorrect = selectedAnswers[currentQIndex] === q.correctIndex;
    setSubmittedAnswers(prev => ({ ...prev, [currentQIndex]: true }));
    if (isCorrect) sound.playSuccess();
    else sound.playError();
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    sound.playComplete();

    // Calculate score
    let correct = 0;
    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct++;
    });

    const total = currentQuestions.length;
    const pct = Math.round((correct / total) * 100);

    // Update mastery score for current topic
    const topicKey = selectedTopicId === 'all' ? 'mixed' : selectedTopicId;
    setMasteryScores(prev => {
      const existing = prev[topicKey] || { correct: 0, total: 0, scorePct: 0 };
      const newCorrect = existing.correct + correct;
      const newTotal = existing.total + total;
      return {
        ...prev,
        [topicKey]: {
          correct: newCorrect,
          total: newTotal,
          scorePct: Math.round((newCorrect / newTotal) * 100)
        }
      };
    });
  };

  const activeQ = currentQuestions[currentQIndex];
  const isAnswered = selectedAnswers[currentQIndex] !== undefined;
  const isSubmitted = submittedAnswers[currentQIndex];
  const isCurrentCorrect = isAnswered && selectedAnswers[currentQIndex] === activeQ?.correctIndex;

  // Calculate score summary
  const totalCorrect = currentQuestions.filter((q, idx) => selectedAnswers[idx] === q.correctIndex).length;

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <GraduationCap size={14} /> Topic Assessment & Mastery Center
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Adaptive Practice for Every Subject
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Comprehensive Mathematical Quizzes
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Test and verify your understanding across all subjects: arithmetic, algebra, geometry, trigonometry, calculus, probability, and Olympiad mathematics.
          </p>
        </div>

        {/* Global Mastery Radar Stats */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4 text-xs shrink-0">
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Topics Tested</span>
            <span className="text-xl font-black text-white">{Object.keys(masteryScores).length}</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Average Accuracy</span>
            <span className="text-xl font-black text-emerald-400">
              {Object.values(masteryScores).length > 0
                ? Math.round(
                    Object.values(masteryScores).reduce((acc, cur) => acc + cur.scorePct, 0) /
                      Object.values(masteryScores).length
                  ) + '%'
                : '100%'}
            </span>
          </div>
        </div>
      </div>

      {!quizActive ? (
        /* QUIZ SELECTION HUB */
        <div className="space-y-6">
          {/* Difficulty & Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty:</span>
              {(['all', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => {
                    sound.playClick();
                    setDifficultyFilter(d);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    difficultyFilter === d
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {d === 'all' ? 'All Difficulties' : d}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleStartQuiz('all', false)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
            >
              <Sparkles size={14} />
              <span>Mixed Subject Blitz</span>
            </button>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizTopicsList.map(topic => {
              const score = masteryScores[topic.id];
              return (
                <div
                  key={topic.id}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 group backdrop-blur-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        {topic.category}
                      </span>
                      {score && (
                        <span className={`text-xs font-bold ${
                          score.scorePct >= 80 ? 'text-emerald-400' :
                          score.scorePct >= 50 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          Mastery: {score.scorePct}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {/* Actions: Untimed vs Timed */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        handleStartQuiz(topic.id, false);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all text-center"
                    >
                      Practice (Untimed)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        handleStartQuiz(topic.id, true);
                      }}
                      className="py-2 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-all flex items-center gap-1"
                      title="Timed 3-Minute Assessment"
                    >
                      <Clock size={13} />
                      <span>Timed</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : !quizFinished ? (
        /* ACTIVE QUIZ QUESTION INTERFACE */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Quiz Top Status */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Question <strong className="text-white">{currentQIndex + 1}</strong> of <strong>{currentQuestions.length}</strong>
            </div>

            {quizTimed && (
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                <Clock size={15} className="animate-pulse" />
                <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
              </div>
            )}

            <button
              onClick={() => {
                sound.playClick();
                setQuizActive(false);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Quit Quiz
            </button>
          </div>

          {/* Question Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {activeQ.difficulty} Difficulty
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {activeQ.prompt}
              </h2>
              {activeQ.latexPrompt && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 text-center my-3">
                  <MathView math={activeQ.latexPrompt} block />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === idx;
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850';

                if (isSubmitted) {
                  if (idx === activeQ.correctIndex) {
                    btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCurrentCorrect) {
                    btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-200';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-600/20 border-indigo-500 text-indigo-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => {
                      sound.playClick();
                      handleSelectOption(idx);
                    }}
                    className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${btnStyle}`}
                  >
                    <span className="text-slate-500 font-bold mr-2">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Submit or Next Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {!isSubmitted ? (
                <button
                  disabled={!isAnswered}
                  onClick={handleSubmitCurrent}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 ml-auto"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="w-full space-y-4">
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    isCurrentCorrect
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-900/40 text-rose-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      {isCurrentCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span>{isCurrentCorrect ? 'Correct!' : 'Incorrect'}</span>
                    </div>
                    <p>{activeQ.explanation}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {onAskAI && (
                      <button
                        onClick={() => onAskAI(`I was doing a quiz question: "${activeQ.prompt}". The explanation is "${activeQ.explanation}". Can you explain why the answer is ${activeQ.correctAnswer} in simple terms?`)}
                        className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                      >
                        <Sparkles size={13} /> Ask AI to clarify this step
                      </button>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <span>{currentQIndex < currentQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ REPORT & RESULTS */
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl animate-fadeIn">
          <Award size={56} className="mx-auto text-amber-400" />
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white">Assessment Complete!</h2>
            <p className="text-xs text-slate-400">
              Here is your verified performance report and mastery score:
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Score</span>
              <span className="text-3xl font-black text-white font-mono">{totalCorrect} / {currentQuestions.length}</span>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Percentage</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">
                {Math.round((totalCorrect / currentQuestions.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartQuiz(selectedTopicId, quizTimed)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <RotateCcw size={14} />
              <span>Retry This Quiz</span>
            </button>
            <button
              onClick={() => setQuizActive(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              Back to Quiz Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
