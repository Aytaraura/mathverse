export type FormulaSubject = 
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'trigonometry'
  | 'differential_calculus'
  | 'integral_calculus'
  | 'advanced_math'
  | 'olympiad';

export type FormulaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface FormulaVariable {
  symbol: string;
  name: string;
  meaning: string;
}

export interface FormulaStep {
  stepNum: number;
  instruction: string;
  mathLatex?: string;
}

export interface FormulaWorkedExample {
  problem: string;
  problemLatex?: string;
  steps: FormulaStep[];
  finalAnswer: string;
  finalAnswerLatex?: string;
}

export interface FormulaPracticeQuestion {
  id: string;
  question: string;
  questionLatex?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FormulaMemoryCard {
  clozeLatex: string;
  missingPart: string;
  missingOptions: string[];
  recallPrompt: string;
  identificationPrompt: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  subject: FormulaSubject;
  category: string;
  topic: string;
  difficulty: FormulaDifficulty;
  latex: string;
  altLatex?: string;
  variables: FormulaVariable[];
  conditions: string[];
  whenToUse: string;
  derivation?: string;
  workedExample: FormulaWorkedExample;
  commonMistakes: string[];
  relatedFormulaIds: string[];
  practiceQuestions: FormulaPracticeQuestion[];
  searchKeywords: string[];
  memoryCard?: FormulaMemoryCard;
}

export interface MemoryTrainerProgress {
  formulaId: string;
  reps: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: number;
  lastStudied: number;
  correctCount: number;
  incorrectCount: number;
  isWeak: boolean;
}
