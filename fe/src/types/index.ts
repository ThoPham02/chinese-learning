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
  level: number;
  learnedWords: number;
  reviewedWords: number;
  masteredWords: number;
  currentStreak: number;
  lastActiveDate: number;
}

export interface QuizQuestion {
  type: number;
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
