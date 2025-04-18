export interface QuizType {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  audio?: string;
}

export interface MultipleChoiceQuestion extends Question {
  options: string[];
}

export interface MatchingQuestion {
  id: string;
  chinese: string;
  vietnamese: string;
}

export interface ListeningQuestion extends Question {
  options: string[];
  audio: string;
}

export interface FillBlankQuestion extends Question {
  context: string;
  blankPosition: number;
}