import { UserProgress, ExamResult } from '../types';

const STORAGE_KEY = 'mathverse_user_progress_v2';

const defaultProgress: UserProgress = {
  xp: 1250,
  level: 4,
  streakDays: 3,
  lastActiveTimestamp: Date.now(),
  completedLessons: ['limits_intro', 'power_rule', 'antiderivatives_intro'],
  completedExams: [],
  unlockedAchievements: ['first_spark', 'limit_explorer'],
  flashcardReviews: {},
  radarMetrics: {
    algebra: 78,
    geometry: 65,
    numberTheory: 70,
    combinatorics: 60,
    differentialCalculus: 82,
    integralCalculus: 74,
    proofRigor: 68,
    speed: 72
  },
  errorHistory: [],
  bossDefeats: [],
  duelsWon: 5,
  duelsLost: 2,
  eloRating: 1420,
  soundEnabled: true
};

export const getStoredProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(defaultProgress);
      return defaultProgress;
    }
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
};

export const addXp = (amount: number): UserProgress => {
  const current = getStoredProgress();
  const newXp = current.xp + amount;
  // Level formula: Level = Math.floor(Math.sqrt(xp / 100)) + 1
  const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 100)) + 1);
  const updated = {
    ...current,
    xp: newXp,
    level: newLevel,
    lastActiveTimestamp: Date.now()
  };
  saveProgress(updated);
  return updated;
};

export const recordExamResult = (result: ExamResult): UserProgress => {
  const current = getStoredProgress();
  const updatedExams = [result, ...current.completedExams];
  
  // Update radar metrics based on performance
  const newRadar = { ...current.radarMetrics };
  const delta = (result.percentage - 70) * 0.1;
  
  if (result.category.includes('diff')) {
    newRadar.differentialCalculus = Math.min(100, Math.max(20, Math.round(newRadar.differentialCalculus + delta)));
  }
  if (result.category.includes('integ')) {
    newRadar.integralCalculus = Math.min(100, Math.max(20, Math.round(newRadar.integralCalculus + delta)));
  }
  
  // Award XP based on score and question count
  const earnedXp = Math.round(result.score * 25 + (result.percentage >= 80 ? 100 : 30));
  
  const updated: UserProgress = {
    ...current,
    xp: current.xp + earnedXp,
    level: Math.max(1, Math.floor(Math.sqrt((current.xp + earnedXp) / 100)) + 1),
    completedExams: updatedExams,
    radarMetrics: newRadar
  };
  
  saveProgress(updated);
  return updated;
};

export const recordError = (
  questionId: string, 
  errorType: 'conceptual' | 'algebraic' | 'calculation' | 'theorem_application' | 'incomplete_reasoning',
  topic: string
): void => {
  const current = getStoredProgress();
  const updatedHistory = [
    { questionId, errorType, topic, timestamp: Date.now() },
    ...current.errorHistory.slice(0, 99)
  ];
  saveProgress({ ...current, errorHistory: updatedHistory });
};
