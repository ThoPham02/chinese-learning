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
  id: string;
  order: number;
  vocabulary: string;
  questionType: string;
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

export const questionTypes = [
  'Trắc nghiệm',
  'Điền từ',
  'Ghép cặp',
  'Đúng/Sai',
  'Sắp xếp câu'
];

export const hskLevels = [1, 2, 3, 4, 5, 6];

export interface Vocabulary {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: number;
  vietnameseExample: string;
  chineseExample: string;
  chineseExamplePinyin: string;
  explanation: string;
}

export const sampleVocabulary: Vocabulary[] = [
  {
    id: 1,
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    meaning: 'Xin chào',
    level: 1,
    vietnameseExample: 'Xin chào, bạn khỏe không?',
    chineseExample: '你好，你好吗？',
    chineseExamplePinyin: 'nǐ hǎo, nǐ hǎo ma?',
    explanation: 'Đây là cách chào hỏi thông thường trong tiếng Trung.'
  },
  {
    id: 2,
    hanzi: '谢谢',
    pinyin: 'xiè xiè',
    meaning: 'Cảm ơn',
    level: 1,
    vietnameseExample: 'Cảm ơn bạn rất nhiều!',
    chineseExample: '非常谢谢你！',
    chineseExamplePinyin: 'fēi cháng xiè xiè nǐ!',
    explanation: 'Dùng để bày tỏ lòng biết ơn.'
  },
  {
    id: 3,
    hanzi: '学习',
    pinyin: 'xué xí',
    meaning: 'Học tập',
    level: 2,
    vietnameseExample: 'Tôi đang học tiếng Trung.',
    chineseExample: '我在学习中文。',
    chineseExamplePinyin: 'wǒ zài xué xí zhōng wén.',
    explanation: 'Từ này dùng để chỉ việc học tập, nghiên cứu.'
  },
  {
    id: 4,
    hanzi: '工作',
    pinyin: 'gōng zuò',
    meaning: 'Công việc, làm việc',
    level: 2,
    vietnameseExample: 'Công việc của tôi rất thú vị.',
    chineseExample: '我的工作很有趣。',
    chineseExamplePinyin: 'wǒ de gōng zuò hěn yǒu qù.',
    explanation: 'Dùng để chỉ việc làm hoặc nhiệm vụ được giao.'
  },
  {
    id: 5,
    hanzi: '经济',
    pinyin: 'jīng jì',
    meaning: 'Kinh tế',
    level: 4,
    vietnameseExample: 'Nền kinh tế Trung Quốc đang phát triển nhanh chóng.',
    chineseExample: '中国经济正在快速发展。',
    chineseExamplePinyin: 'zhōng guó jīng jì zhèng zài kuài sù fā zhǎn.',
    explanation: 'Từ chuyên ngành dùng để nói về các hoạt động kinh tế.'
  },
  {
    id:6,
    hanzi: '发展',
    pinyin: 'fā zhǎn',
    meaning: 'Phát triển',
    level: 4,
    vietnameseExample: 'Sự phát triển của công nghệ rất nhanh.',
    chineseExample: '科技的发展非常快。',
    chineseExamplePinyin: 'kē jì de fā zhǎn fēi cháng kuài.',
    explanation: 'Dùng để chỉ sự tiến bộ, phát triển của một đối tượng.'
  },
  {
    id: 7,
    hanzi: '环境',
    pinyin: 'huán jìng',
    meaning: 'Môi trường',
    level: 3,
    vietnameseExample: 'Chúng ta cần bảo vệ môi trường.',
    chineseExample: '我们需要保护环境。',
    chineseExamplePinyin: 'wǒ men xū yào bǎo hù huán jìng.',
    explanation: 'Từ này dùng để chỉ môi trường xung quanh, có thể là môi trường tự nhiên hoặc môi trường xã hội.'
  },
  {
    id: 8,
    hanzi: '思考',
    pinyin: 'sī kǎo',
    meaning: 'Suy nghĩ, tư duy',
    level: 5,
    vietnameseExample: 'Chúng ta cần suy nghĩ kỹ trước khi quyết định.',
    chineseExample: '我们需要在决定之前仔细思考。',
    chineseExamplePinyin: 'wǒ men xū yào zài jué dìng zhī qián zǐ xì sī kǎo.',
    explanation: 'Từ này chỉ quá trình suy nghĩ, phân tích một vấn đề.'
  },
  {
    id: 9,
    hanzi: '成功',
    pinyin: 'chéng gōng',
    meaning: 'Thành công',
    level: 3,
    vietnameseExample: 'Chúc bạn thành công!',
    chineseExample: '祝你成功！',
    chineseExamplePinyin: 'zhù nǐ chéng gōng!',
    explanation: 'Từ này dùng để chỉ sự thành công, đạt được mục tiêu.'
  },
  {
    id: 10,
    hanzi: '认为',
    pinyin: 'rèn wéi',
    meaning: 'Cho rằng, nghĩ rằng',
    level: 3,
    vietnameseExample: 'Tôi nghĩ rằng ý kiến của bạn rất hay.',
    chineseExample: '我认为你的想法很好。',
    chineseExamplePinyin: 'wǒ rèn wéi nǐ de xiǎng fǎ hěn hǎo.',
    explanation: 'Từ này dùng để thể hiện quan điểm, ý kiến cá nhân.'
  }
];

export type HSKLevel = 1 | 2 | 3 | 4 | 5 | 6;