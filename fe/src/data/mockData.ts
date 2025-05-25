import { Topic, Word, UserProgress, QuizQuestion, DailyTask } from '../types';
import { CalendarClock, School, Home, Briefcase, Plane, Utensils, ShoppingCart, Users, Music, BookOpen, Smile, Map, Library, Globe } from 'lucide-react';

export const topics: Topic[] = [
  {
    id: 1,
    name: 'HSK Level 1',
    description: 'Từ vựng cơ bản dành cho người mới bắt đầu (chào hỏi, gia đình, số đếm)',
    iconName: 'Smile',
    totalWords: 150,
  },
  {
    id: 2,
    name: 'HSK Level 2',
    description: 'Từ vựng mở rộng về sinh hoạt, trường học và cuộc sống hàng ngày',
    iconName: 'BookOpen',
    totalWords: 150,
  },
  {
    id: 3,
    name: 'HSK Level 3',
    description: 'Từ vựng dùng trong du lịch, công việc, giao tiếp xã hội cơ bản',
    iconName: 'Map',
    totalWords: 300,
  },
  {
    id: 4,
    name: 'HSK Level 4',
    description: 'Từ vựng nâng cao về công việc, quan điểm cá nhân, tin tức xã hội',
    iconName: 'Briefcase',
    totalWords: 600,
  },
  {
    id: 5,
    name: 'HSK Level 5',
    description: 'Từ vựng học thuật và chuyên sâu trong các chủ đề phức tạp',
    iconName: 'Library',
    totalWords: 1300,
  },
  {
    id: 6,
    name: 'HSK Level 6',
    description: 'Từ vựng cao cấp để đọc báo, hiểu phim ảnh và giao tiếp tự nhiên',
    iconName: 'Globe',
    totalWords: 2500,
  }
];

export const todayTasks: DailyTask[] = [
  {
    id: 1,
    title: 'Học từ mới',
    description: 'Học 10 từ mới theo trình độ hiện tại',
    status: 'incomplete', // hoặc 'completed'
    actionLabel: 'Bắt đầu học',
    actionLink: '/learn',
  },
  {
    id: 2,
    title: 'Ôn từ vựng',
    description: 'Ôn lại các từ đã học theo thuật toán SRS',
    status: 'incomplete',
    actionLabel: 'Bắt đầu ôn',
    actionLink: '/review',
  },
  {
    id: 3,
    title: 'Làm bài Quiz',
    description: 'Kiểm tra nhanh 10 từ vựng ngẫu nhiên',
    status: 'incomplete',
    actionLabel: 'Làm Quiz',
    actionLink: '/quiz',
  }
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
  Smile,
  Map,
  Library,
  Globe,
};

// export const sampleWords: Word[] = [
//   {
//     id: 1,
//     hanzi: '你好',
//     pinyin: 'nǐ hǎo',
//     meaning: 'Xin chào',
//     exampleVn: 'Xin chào, bạn khỏe không?',
//     exampleCn: '你好，你好吗？',
//     level: 1,
//   },
//   {
//     id: 2,
//     hanzi: '谢谢',
//     pinyin: 'xiè xiè',
//     meaning: 'Cảm ơn',
//     exampleVn: 'Cảm ơn bạn đã giúp tôi.',
//     exampleCn: '谢谢你帮我。',
//     level: 1,
//   },
//   {
//     id: 3,
//     hanzi: '学生',
//     pinyin: 'xué shēng',
//     meaning: 'Học sinh',
//     exampleVn: 'Tôi là một học sinh.',
//     exampleCn: '我是一名学生。',
//     level: 2,
//   },
//   {
//     id: 4,
//     hanzi: '老师',
//     pinyin: 'lǎo shī',
//     meaning: 'Giáo viên',
//     exampleVn: 'Cô ấy là giáo viên dạy tiếng Trung.',
//     exampleCn: '她是中文老师。',
//     level: 2,
//   },
//   {
//     id: 5,
//     hanzi: '工作',
//     pinyin: 'gōng zuò',
//     meaning: 'Công việc',
//     exampleVn: 'Công việc của tôi rất thú vị.',
//     exampleCn: '我的工作很有趣。',
//     level: 3,
//   },
// ];

// export const userProgressMock: UserProgress = {
//   level: 3,
//   wordsLearned: 145,
//   wordsMastered: 78,
//   wordsToReview: 24,
//   streakDays: 12,
//   lastStudyDate: new Date(),
// };

export const sampleQuestions: QuizQuestion[] = [
  // {
  //   type: 'multiple-choice',
  //   word: sampleWords[0],
  //   options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'],
  //   correctAnswer: 'Xin chào',
  // },
  // {
  //   type: 'multiple-choice',
  //   word: sampleWords[1],
  //   options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'],
  //   correctAnswer: 'Cảm ơn',
  // },
  // {
  //   type: 'fill-blank',
  //   word: sampleWords[2],
  //   correctAnswer: '学生',
  // },
  // {
  //   type: 'listening',
  //   word: sampleWords[3],
  //   options: ['学生', '老师', '朋友', '家人'],
  //   correctAnswer: '老师',
  // },
  // {
  //   type: 'matching',
  //   word: sampleWords[4],
  //   correctAnswer: 'Công việc',
  // },
];