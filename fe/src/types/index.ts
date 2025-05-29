import { QUIZ_TYPE } from "../common/const";

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

export interface Question {
  id: number;
  order: number;
  vocabulary_id: number;
  type: number;
}

export interface Test {
  id: string;
  title: string;
  questionCount: number;
  timeLimit: number;
  hskLevel: number;
  questions: Question[];
}

export const vocabularyOptions = [
  '你好', '谢谢', '再见', '早上好', '晚上好', 
  '朋友', '学生', '老师', '医生', '工程师',
  '家', '学校', '医院', '公司', '餐厅',
  '书', '笔', '电脑', '手机', '桌子',
  '吃', '喝', '看', '说', '听',
  '好', '大', '小', '多', '少',
  '可能', '因为', '所以', '但是', '如果'
];

export const questionTypes = {
  [QUIZ_TYPE.FillBlank_Word]: "Điền vào chỗ trống (Từ vựng)",
  [QUIZ_TYPE.FillBlank_Listen]: "Điền vào chỗ trống (Nghe)",
  [QUIZ_TYPE.ListenRepeat]: "Nghe và lặp lại",
  [QUIZ_TYPE.MultiChoice_Mean]: "Trắc nghiệm (Nghĩa)",
  [QUIZ_TYPE.MultiChoice_Listen]: "Trắc nghiệm (Nghe)",
  [QUIZ_TYPE.MultiChoice_Hanzi]: "Trắc nghiệm (Hán tự)",
  [QUIZ_TYPE.MultiChoice_FillBlank]: "Trắc nghiệm (Điền vào chỗ trống)",
};


export const hskLevels = [1, 2, 3, 4, 5, 6];

export interface Vocabulary {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: number;
  exampleVn: string;
  exampleCn: string;
  examplePinyin: string;
  explain: string;
}

export const sampleVocabulary: Vocabulary[] = [
];

export type HSKLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Quiz {
  id: number;
  title: string;
  num: number;
  time: number;
  level: number;
  questions: Question[];
}