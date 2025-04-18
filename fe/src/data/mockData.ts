import { Topic, Word, UserProgress } from '../types';
import { CalendarClock, School, Home, Briefcase, Plane, Utensils, ShoppingCart, Users, Music, BookOpen } from 'lucide-react';

export const topics: Topic[] = [
  {
    id: 'family',
    name: 'Gia đình',
    description: 'Từ vựng về gia đình và các mối quan hệ',
    iconName: 'Users',
    totalWords: 32,
  },
  {
    id: 'school',
    name: 'Trường học',
    description: 'Từ vựng liên quan đến trường học và học tập',
    iconName: 'School',
    totalWords: 45,
  },
  {
    id: 'travel',
    name: 'Du lịch',
    description: 'Từ vựng cần thiết khi đi du lịch',
    iconName: 'Plane',
    totalWords: 38,
  },
  {
    id: 'work',
    name: 'Công việc',
    description: 'Từ vựng liên quan đến công việc và nơi làm việc',
    iconName: 'Briefcase',
    totalWords: 41,
  },
  {
    id: 'food',
    name: 'Ẩm thực',
    description: 'Từ vựng về thực phẩm và ăn uống',
    iconName: 'Utensils',
    totalWords: 50,
  },
  {
    id: 'shopping',
    name: 'Mua sắm',
    description: 'Từ vựng liên quan đến mua sắm',
    iconName: 'ShoppingCart',
    totalWords: 28,
  },
  {
    id: 'entertainment',
    name: 'Giải trí',
    description: 'Từ vựng về giải trí và thời gian rảnh',
    iconName: 'Music',
    totalWords: 35,
  },
  {
    id: 'reading',
    name: 'Đọc hiểu',
    description: 'Từ vựng nâng cao cho đọc hiểu',
    iconName: 'BookOpen',
    totalWords: 40,
  },
];

export const iconMap: Record<string, React.ElementType> = {
  Users,
  School,
  Plane,
  Briefcase,
  Utensils,
  ShoppingCart,
  Music,
  BookOpen,
  CalendarClock,
  Home,
};

export const sampleWords: Word[] = [
  {
    id: '1',
    chinese: '你好',
    pinyin: 'nǐ hǎo',
    vietnamese: 'Xin chào',
    example: {
      chinese: '你好，认识你很高兴。',
      pinyin: 'nǐ hǎo, rèn shi nǐ hěn gāo xìng.',
      vietnamese: 'Xin chào, rất vui được gặp bạn.',
    },
    imageUrl: 'https://images.pexels.com/photos/7096339/pexels-photo-7096339.jpeg',
    topicId: 'family',
    difficulty: 'easy',
    stage: 2,
  },
  {
    id: '2',
    chinese: '谢谢',
    pinyin: 'xiè xiè',
    vietnamese: 'Cảm ơn',
    example: {
      chinese: '谢谢你的帮助。',
      pinyin: 'xiè xiè nǐ de bāng zhù.',
      vietnamese: 'Cảm ơn bạn đã giúp đỡ.',
    },
    imageUrl: 'https://images.pexels.com/photos/3807742/pexels-photo-3807742.jpeg',
    topicId: 'family',
    difficulty: 'easy',
    stage: 1,
  },
  {
    id: '3',
    chinese: '学生',
    pinyin: 'xué shēng',
    vietnamese: 'Học sinh',
    example: {
      chinese: '我是一名学生。',
      pinyin: 'wǒ shì yī míng xué shēng.',
      vietnamese: 'Tôi là một học sinh.',
    },
    imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
    topicId: 'school',
    difficulty: 'easy',
    stage: 3,
  },
  {
    id: '4',
    chinese: '老师',
    pinyin: 'lǎo shī',
    vietnamese: 'Giáo viên',
    example: {
      chinese: '这是我的老师。',
      pinyin: 'zhè shì wǒ de lǎo shī.',
      vietnamese: 'Đây là giáo viên của tôi.',
    },
    imageUrl: 'https://images.pexels.com/photos/8617837/pexels-photo-8617837.jpeg',
    topicId: 'school',
    difficulty: 'easy',
    stage: 2,
  },
  {
    id: '5',
    chinese: '工作',
    pinyin: 'gōng zuò',
    vietnamese: 'Công việc',
    example: {
      chinese: '我的工作很有趣。',
      pinyin: 'wǒ de gōng zuò hěn yǒu qù.',
      vietnamese: 'Công việc của tôi rất thú vị.',
    },
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    topicId: 'work',
    difficulty: 'medium',
    stage: 1,
  },
];

export const userProgressMock: UserProgress = {
  wordsLearned: 145,
  wordsMastered: 78,
  wordsToReview: 24,
  streakDays: 12,
  lastStudyDate: new Date(),
};

export const sampleQuestions: QuizQuestion[] = [
  {
    type: 'multiple-choice',
    word: sampleWords[0],
    options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'],
    correctAnswer: 'Xin chào',
  },
  {
    type: 'multiple-choice',
    word: sampleWords[1],
    options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'],
    correctAnswer: 'Cảm ơn',
  },
  {
    type: 'fill-blank',
    word: sampleWords[2],
    correctAnswer: '学生',
  },
  {
    type: 'listening',
    word: sampleWords[3],
    options: ['学生', '老师', '朋友', '家人'],
    correctAnswer: '老师',
  },
  {
    type: 'matching',
    word: sampleWords[4],
    correctAnswer: 'Công việc',
  },
];