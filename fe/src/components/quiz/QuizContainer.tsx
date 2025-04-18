import React, { useState } from 'react';
import { Brain, Volume2, PenLine, ArrowLeftRight } from 'lucide-react';
import { topics } from '../../data/mockData';

type QuizType = 'multiple-choice' | 'matching' | 'listening' | 'fill-blank';

interface QuizTypeOption {
  id: QuizType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const QuizContainer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedQuizType, setSelectedQuizType] = useState<QuizType | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  const quizTypes: QuizTypeOption[] = [
    {
      id: 'multiple-choice',
      name: 'Trắc nghiệm',
      description: 'Chọn đáp án đúng từ 4 lựa chọn',
      icon: <Brain className="w-6 h-6" />,
    },
    {
      id: 'listening',
      name: 'Nghe và chọn',
      description: 'Nghe từ và chọn nghĩa đúng',
      icon: <Volume2 className="w-6 h-6" />,
    },
    {
      id: 'fill-blank',
      name: 'Điền từ',
      description: 'Điền từ tiếng Trung vào chỗ trống',
      icon: <PenLine className="w-6 h-6" />,
    },
    {
      id: 'matching',
      name: 'Nối từ',
      description: 'Nối từ tiếng Trung với nghĩa tiếng Việt',
      icon: <ArrowLeftRight className="w-6 h-6" />,
    },
  ];

  const handleStart = () => {
    if (selectedTopic && selectedQuizType) {
      setIsStarted(true);
    }
  };

  if (!isStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kiểm tra từ vựng</h1>
          <p className="text-gray-600">
            Chọn chủ đề và loại bài kiểm tra bạn muốn thực hiện
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Chọn chủ đề</h2>
            <div className="space-y-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedTopic === topic.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      selectedTopic === topic.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {/* {topic.iconName && React.createElement(
                        require('lucide-react')[topic.iconName],
                        { className: `w-5 h-5 ${selectedTopic === topic.id ? 'text-blue-600' : 'text-gray-600'}` }
                      )} */}
                    </div>
                    <div className="ml-3 text-left">
                      <p className="font-medium">{topic.name}</p>
                      <p className="text-sm text-gray-500">{topic.totalWords} từ</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Chọn loại bài kiểm tra</h2>
            <div className="space-y-2">
              {quizTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedQuizType(type.id)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedQuizType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      selectedQuizType === type.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {React.cloneElement(type.icon as React.ReactElement, {
                        className: selectedQuizType === type.id ? 'text-blue-600' : 'text-gray-600'
                      })}
                    </div>
                    <div className="ml-3 text-left">
                      <p className="font-medium">{type.name}</p>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStart}
            disabled={!selectedTopic || !selectedQuizType}
            className={`px-8 py-3 rounded-lg font-medium ${
              selectedTopic && selectedQuizType
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Bắt đầu kiểm tra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quiz content will be implemented in the next step */}
      <div className="text-center">
        <p className="text-xl">Bài kiểm tra đang được tải...</p>
      </div>
    </div>
  );
};

export default QuizContainer;