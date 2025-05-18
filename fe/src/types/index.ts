export interface Word {
  id: number;
  level: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  exampleVn: string;
  exampleCn: string;
  examplePinyin: string;
  meaningOption: string[];
  hanziOption: string[];
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
