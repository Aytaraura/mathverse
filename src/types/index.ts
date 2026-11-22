export type SubjectId = 
  | 'differential_calculus'
  | 'integral_calculus'
  | 'limits_continuity'
  | 'algebra'
  | 'geometry'
  | 'number_theory'
  | 'combinatorics'
  | 'trigonometry'
  | 'precalculus'
  | 'linear_algebra'
  | 'probability_statistics'
  | 'advanced_math';

export type DifficultyLevel = 
  | 'FOUNDATION'
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'OLYMPIAD'
  | 'ELITE';

export type QuestionType = 
  | 'multiple_choice'
  | 'numerical'
  | 'expression'
  | 'multi_step';

export interface QuestionOption {
  id: string;
  text: string;
  latex?: string;
}

export interface StepExplanation {
  stepNumber: number;
  title: string;
  explanation: string;
  ruleUsed?: string;
  mathExpression?: string;
  algebraicCheck?: string;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  subtopic: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  prompt: string;
  latexPrompt?: string;
  options?: QuestionOption[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  tolerance?: number;
  hints: string[];
  solution: {
    ruleOrTechnique: string;
    whyItApplies: string;
    steps: StepExplanation[];
    finalAnswerLatex: string;
    verification?: string;
  };
  errorCategoryIfWrong?: 'conceptual' | 'algebraic' | 'calculation' | 'theorem_application' | 'incomplete_reasoning';
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  latexFormulas?: string[];
  interactiveDemoType?: 'tangent' | 'riemann' | 'ftc' | 'continuity' | 'graph';
  workedExamples: {
    problem: string;
    latex: string;
    steps: string[];
    answer: string;
  }[];
  quickCheck: {
    question: string;
    latex?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CurriculumModule {
  id: string;
  division: 'differential' | 'integral';
  title: string;
  description: string;
  icon: string;
  lessons: LessonSection[];
}

export interface ExamConfig {
  id: string;
  title: string;
  category: 
    | 'diff_mock'
    | 'integ_mock'
    | 'limits_continuity'
    | 'diff_rules'
    | 'diff_applications'
    | 'integ_techniques'
    | 'def_indef_integrals'
    | 'advanced_calculus'
    | 'mixed_calculus'
    | 'elite_challenge';
  difficulty: DifficultyLevel;
  questionCount: number;
  timed: boolean;
  timeLimitMinutes: number;
}

export interface ExamResult {
  id: string;
  examTitle: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  category: string;
  difficulty: DifficultyLevel;
  answers: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeSpentSeconds: number;
  }[];
  topicBreakdown: Record<string, { correct: number; total: number }>;
  difficultyBreakdown: Record<DifficultyLevel, { correct: number; total: number }>;
  weakConcepts: string[];
  recommendedLessons: string[];
}

export interface BossStage {
  stageNumber: number;
  bossHp: number;
  question: Question;
  bossAttackName: string;
  dialogue: string;
}

export interface BossChallenge {
  id: string;
  name: string;
  title: string;
  lore: string;
  avatar: string;
  themeColor: string;
  difficulty: DifficultyLevel;
  stages: BossStage[];
  rewardXp: number;
  rewardBadge: string;
}

export interface Flashcard {
  id: string;
  deck: 'derivative_formulas' | 'integral_formulas' | 'differentiation_rules' | 'integration_techniques' | 'limit_laws' | 'common_mistakes' | 'olympiad_theorems';
  category: string;
  frontPrompt: string;
  frontLatex?: string;
  backResponse: string;
  backLatex?: string;
  explanation: string;
  // SM-2 Spaced Repetition fields
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: number;
}

export interface DetectiveCase {
  id: string;
  title: string;
  mysterySetting: string;
  claimedTheorem: string;
  steps: {
    stepNumber: number;
    statement: string;
    mathLatex: string;
    isFlawed: boolean;
    flawExplanation?: string;
  }[];
  verdictExplanation: string;
  crimeCategory: 'Division by Zero' | 'Non-Invertible Operation' | 'Divergent Series Interchange' | 'Invalid Limit Law' | 'Ignoring Branch Cuts';
}

export interface ProofChallenge {
  id: string;
  title: string;
  theorem: string;
  theoremLatex: string;
  method: 'Direct Proof' | 'Proof by Contradiction' | 'Mathematical Induction' | 'Delta-Epsilon' | 'Pigeonhole Principle' | 'Invariant Method';
  initialState: string[];
  availableSteps: {
    id: string;
    content: string;
    latex?: string;
    justification: string;
  }[];
  correctSequence: string[];
  explanation: string;
}

export interface EncyclopediaEntry {
  id: string;
  title: string;
  category: 'Calculus' | 'Algebra' | 'Number Theory' | 'Geometry' | 'Analysis';
  definition: string;
  latex: string;
  theoremStatement?: string;
  applications: string[];
  historicalNote?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveTimestamp: number;
  completedLessons: string[];
  completedExams: ExamResult[];
  unlockedAchievements: string[];
  flashcardReviews: Record<string, { repetitions: number; intervalDays: number; easeFactor: number; nextReviewDate: number }>;
  radarMetrics: {
    algebra: number;
    geometry: number;
    numberTheory: number;
    combinatorics: number;
    differentialCalculus: number;
    integralCalculus: number;
    proofRigor: number;
    speed: number;
  };
  errorHistory: {
    questionId: string;
    errorType: 'conceptual' | 'algebraic' | 'calculation' | 'theorem_application' | 'incomplete_reasoning';
    topic: string;
    timestamp: number;
  }[];
  bossDefeats: string[];
  duelsWon: number;
  duelsLost: number;
  eloRating: number;
  soundEnabled: boolean;
}
