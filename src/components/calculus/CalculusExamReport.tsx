import React from 'react';
import { ExamResult, Question } from '../../types';
import { MathView } from '../common/MathView';
import { CheckCircle2, XCircle, Clock, Award, Target, BookOpen, ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react';
import { sound } from '../../services/audio';

interface CalculusExamReportProps {
  result: ExamResult;
  questions: Question[];
  onRestart: () => void;
  onExit: () => void;
  onNavigateLesson?: (lessonId: string) => void;
}

export const CalculusExamReport: React.FC<CalculusExamReportProps> = ({
  result,
  questions,
  onRestart,
  onExit,
  onNavigateLesson
}) => {
  const avgTimePerQuestion = Math.round(result.timeSpentSeconds / result.totalQuestions);
  const minutes = Math.floor(result.timeSpentSeconds / 60);
  const seconds = result.timeSpentSeconds % 60;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Top Banner & Grade Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Award size={14} /> Official Examination Performance Dossier
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">{result.examTitle}</h2>
            <p className="text-slate-400 text-sm mt-1">
              Difficulty Tier: <span className="font-semibold text-amber-400">{result.difficulty}</span> • Category: <span className="text-indigo-300 capitalize">{result.category.replace(/_/g, ' ')}</span>
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-inner">
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                {result.percentage}%
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Overall Score</div>
            </div>
            <div className="w-px h-12 bg-slate-800"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {result.score} / {result.totalQuestions}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Correct Items</div>
            </div>
          </div>
        </div>

        {/* Telemetry Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock size={14} className="text-sky-400" /> Total Time
            </div>
            <div className="text-lg font-bold text-white font-mono mt-1">
              {minutes}m {seconds}s
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Target size={14} className="text-indigo-400" /> Pace per Question
            </div>
            <div className="text-lg font-bold text-white font-mono mt-1">
              {avgTimePerQuestion}s / item
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" /> Accuracy Rate
            </div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
              {((result.score / result.totalQuestions) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-amber-400" /> Incorrect Items
            </div>
            <div className="text-lg font-bold text-rose-400 font-mono mt-1">
              {result.totalQuestions - result.score}
            </div>
          </div>
        </div>
      </div>

      {/* Weak Concepts & Lesson Recommendations */}
      {result.weakConcepts.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-600/30 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-3">
            <BookOpen size={18} />
            <h4>Targeted Remediation & Recommended Study Lessons</h4>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Based on error analysis of your examination, the solution engine recommends reinforcing the following concepts:
          </p>
          <div className="flex flex-wrap gap-2">
            {result.weakConcepts.map(c => (
              <span key={c} className="px-3 py-1.5 rounded-lg bg-amber-900/40 text-amber-300 border border-amber-700/40 text-xs font-medium">
                ⚠️ {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Complete Step-by-Step Mathematical Solution Engine */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Calculus Solution Engine — Mathematical Verifications</span>
        </h3>

        {questions.map((q, idx) => {
          const userRecord = result.answers.find(a => a.questionId === q.id);
          const isCorrect = userRecord ? userRecord.isCorrect : false;

          return (
            <div
              key={q.id}
              className={`border rounded-2xl p-6 transition-all ${
                isCorrect 
                  ? 'bg-slate-900/60 border-slate-800' 
                  : 'bg-rose-950/10 border-rose-900/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {q.subtopic} • {q.difficulty}
                    </span>
                    <h4 className="text-base font-medium text-white mt-0.5">{q.prompt}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 size={14} /> Correct (+1)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                      <XCircle size={14} /> Incorrect (0)
                    </span>
                  )}
                </div>
              </div>

              {q.latexPrompt && (
                <div className="py-4">
                  <MathView math={q.latexPrompt} block />
                </div>
              )}

              {/* User Answer vs Key Answer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Your Submission:</span>
                  <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {userRecord?.userAnswer || '(Unanswered)'}
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Mathematically Verified Key:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {q.correctAnswer}
                  </span>
                </div>
              </div>

              {/* Solution Engine Transformations */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-indigo-900/30 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-indigo-400 font-semibold uppercase tracking-wider">
                    Technique / Rule: {q.solution.ruleOrTechnique}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Applicability: {q.solution.whyItApplies}
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {q.solution.steps.map(step => (
                    <div key={step.stepNumber} className="text-xs text-slate-300">
                      <span className="text-indigo-300 font-semibold mr-1.5">Step {step.stepNumber} ({step.title}):</span>
                      {step.explanation}
                      {step.mathExpression && (
                        <div className="my-1.5 text-center">
                          <MathView math={step.mathExpression} block />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {q.solution.verification && (
                  <div className="mt-3 p-2.5 bg-indigo-950/30 border border-indigo-800/30 rounded-lg text-xs text-indigo-200">
                    <strong className="text-indigo-400">Equivalence / Derivative Verification: </strong>
                    {q.solution.verification}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={() => {
            sound.playClick();
            onExit();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium text-sm transition-all"
        >
          <ArrowLeft size={16} /> Return to Exam Center
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all"
        >
          <RotateCcw size={16} /> Retake / Generate New Variant
        </button>
      </div>
    </div>
  );
};
