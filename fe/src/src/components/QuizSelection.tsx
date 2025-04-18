import React, { useState } from 'react';
import { 
  ListChecks, 
  Link, 
  Headphones, 
  Pencil,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuizTypeCard from './QuizTypeCard';
import { QuizType } from '../types/quiz';

const quizTypes: QuizType[] = [
  {
    id: 'multiple-choice',
    title: 'Trắc nghiệm',
    description: 'Chọn một trong bốn đáp án cho mỗi câu hỏi',
    icon: 'ListChecks',
    backgroundColor: '#4361EE',
    textColor: 'white',
  },
  {
    id: 'word-meaning',
    title: 'Nối từ – nghĩa',
    description: 'Kết nối các từ tiếng Trung với nghĩa tiếng Việt tương ứng',
    icon: 'Link',
    backgroundColor: '#2EC4B6',
    textColor: 'white',
  },
  {
    id: 'listening',
    title: 'Nghe và chọn từ đúng',
    description: 'Nghe đoạn âm thanh và chọn từ tiếng Trung chính xác',
    icon: 'Headphones',
    backgroundColor: '#E63946',
    textColor: 'white',
  },
  {
    id: 'fill-blank',
    title: 'Điền từ còn thiếu',
    description: 'Điền từ thích hợp vào chỗ trống trong các câu',
    icon: 'Pencil',
    backgroundColor: '#F77F00',
    textColor: 'white',
  },
];

const iconComponents = {
  ListChecks,
  Link,
  Headphones,
  Pencil,
};

const QuizSelection: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleQuizSelect = (id: string) => {
    setSelectedQuiz(id);
  };

  const getIconComponent = (iconName: string) => {
    return iconComponents[iconName as keyof typeof iconComponents];
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      navigate(`/quiz/${selectedQuiz}`);
    }
  };

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Chọn Bài Kiểm Tra
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hãy chọn loại bài kiểm tra phù hợp với mục tiêu học tập của bạn. Mỗi loại bài tập sẽ giúp bạn rèn luyện những kỹ năng khác nhau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {quizTypes.map((quiz) => (
            <QuizTypeCard
              key={quiz.id}
              quiz={quiz}
              icon={getIconComponent(quiz.icon)}
              onClick={handleQuizSelect}
              isSelected={selectedQuiz === quiz.id}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartQuiz}
            disabled={!selectedQuiz}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium
              transition-all duration-300 transform
              ${
                selectedQuiz
                  ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            Bắt đầu làm bài
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;