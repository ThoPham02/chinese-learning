import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import type { ListeningQuestion } from '../../types/quiz';

const sampleQuestions: ListeningQuestion[] = [
  {
    id: '1',
    question: 'Nghe và chọn từ đúng:',
    options: ['你好', '再见', '谢谢', '对不起'],
    correctAnswer: '你好',
    audio: 'https://example.com/audio/nihao.mp3'
  },
  {
    id: '2',
    question: 'Nghe và chọn từ đúng:',
    options: ['早上好', '晚上好', '下午好', '中午好'],
    correctAnswer: '早上好',
    audio: 'https://example.com/audio/zaoshang.mp3'
  }
];

const ListeningQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const playAudio = () => {
    // In a real implementation, this would play the audio file
    console.log('Playing audio:', sampleQuestions[currentQuestion].audio);
  };

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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{question.question}</h2>
            <button
              onClick={playAudio}
              className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <Volume2 size={24} />
            </button>
          </div>
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

export default ListeningQuiz;