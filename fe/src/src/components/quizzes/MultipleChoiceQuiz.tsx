import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { MultipleChoiceQuestion } from '../../types/quiz';

const sampleQuestions: MultipleChoiceQuestion[] = [
  {
    id: '1',
    question: '你好 (nǐ hǎo) có nghĩa là gì?',
    options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'],
    correctAnswer: 'Xin chào'
  },
  {
    id: '2',
    question: '再见 (zài jiàn) có nghĩa là gì?',
    options: ['Hẹn gặp lại', 'Xin chào', 'Tạm biệt', 'Chúc ngủ ngon'],
    correctAnswer: 'Tạm biệt'
  }
];

const MultipleChoiceQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="container mx-auto max-w-2xl py-10 px-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
          <p className="text-xl mb-6">
            Bạn đã trả lời đúng {score} / {sampleQuestions.length} câu hỏi
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="container mx-auto max-w-2xl py-10 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <div className="text-gray-600">
            Câu hỏi {currentQuestion + 1}/{sampleQuestions.length}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  selectedAnswer === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium
              transition-all
              ${
                selectedAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentQuestion === sampleQuestions.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;