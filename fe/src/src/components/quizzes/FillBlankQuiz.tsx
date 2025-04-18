import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { FillBlankQuestion } from '../../types/quiz';

const sampleQuestions: FillBlankQuestion[] = [
  {
    id: '1',
    question: 'Điền từ còn thiếu vào chỗ trống:',
    context: '我 ___ 学生。',
    blankPosition: 1,
    correctAnswer: '是'
  },
  {
    id: '2',
    question: 'Điền từ còn thiếu vào chỗ trống:',
    context: '他 ___ 看书。',
    blankPosition: 1,
    correctAnswer: '在'
  }
];

const FillBlankQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (answer.trim() === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer('');
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
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-2xl text-center font-medium">
              {question.context.split('_').map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-20 mx-2 p-1 text-center border-b-2 border-blue-600 bg-transparent focus:outline-none"
                      placeholder="..."
                    />
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!answer.trim()}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium
              transition-all
              ${
                answer.trim()
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

export default FillBlankQuiz;