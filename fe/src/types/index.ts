export interface Word {
  id: number;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  example: {
    chinese: string;
    pinyin: string;
    vietnamese: string;
  };
  imageUrl?: string;
  topicId: number;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  stage: number; // 0-3 indicating mastery level
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  iconName: string;
  totalWords: number;
}

export interface UserProgress {
  wordsLearned: number;
  wordsMastered: number;
  wordsToReview: number;
  streakDays: number;
  lastStudyDate?: Date;
}

export interface QuizQuestion {
  type: 'multiple-choice' | 'matching' | 'listening' | 'fill-blank';
  word: Word;
  options?: string[];
  correctAnswer: string;
}

export type TaskStatus = 'completed' | 'incomplete';

export interface DailyTask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  actionLabel: string;
  actionLink: string;
}
