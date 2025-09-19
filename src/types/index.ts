export interface UserProfile {
  name: string;
  gradeLevel: string;
  section: string;
  createdAt: string;
}

export interface GameProgress {
  levels: { [key: string]: LevelProgress };
  preTestCompleted: boolean;
  postTestCompleted: boolean;
  preTestScore: number;
  postTestScore: number;
  preTestTrials: number;
  postTestTrials: number;
  totalStars: number;
}

export interface LevelProgress {
  completed: boolean;
  bestScore: number;
  trials: number;
  stars: number;
  unlockedAt?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  visualFraction?: {
    numerator: number;
    denominator: number;
  };
}

export interface GameLevel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
  category: string;
  unlocked: boolean;
  questions: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  operation: string;
  content: {
    introduction: string;
    steps: string[];
    examples: {
      problem: string;
      solution: string;
      explanation: string;
    }[];
    tips: string[];
  };
}