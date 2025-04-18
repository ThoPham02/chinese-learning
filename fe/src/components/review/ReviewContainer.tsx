import React, { useState } from 'react';
import QuizCard from './QuizCard';
import { sampleQuestions } from '../../data/mockData';
import { ChevronLeft, Award } from 'lucide-react';

const ReviewContainer: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    setTotalAnswered(prev => prev + 1);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setTotalAnswered(0);
    setIsQuizComplete(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ôn tập từ vựng</h1>
        <p className="text-gray-600">
          Kiểm tra và củng cố kiến thức với các bài tập đa dạng
        </p>
      </div>
      
      {!isQuizComplete ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Câu hỏi {currentQuestionIndex + 1}/{sampleQuestions.length}
            </p>
            <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
              Đúng: {correctAnswers}/{totalAnswered}
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
            <div 
              className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / sampleQuestions.length) * 100}%` }}
            ></div>
          </div>
          
          <QuizCard
            question={sampleQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-yellow-100">
              <Award className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bài tập hoàn thành!</h2>
          <p className="text-gray-600 mb-6">
            Bạn đã trả lời đúng {correctAnswers} trong tổng số {sampleQuestions.length} câu hỏi.
          </p>
          
          <div className="w-full max-w-xs mx-auto mb-6 bg-gray-100 rounded-full h-4">
            <div 
              className="h-4 rounded-full transition-all duration-1000"
              style={{ 
                width: `${(correctAnswers / sampleQuestions.length) * 100}%`,
                backgroundColor: 
                  (correctAnswers / sampleQuestions.length) >= 0.8 ? '#10B981' : 
                  (correctAnswers / sampleQuestions.length) >= 0.5 ? '#F59E0B' : 
                  '#EF4444'
              }}
            ></div>
          </div>
          
          <div className="text-lg mb-8">
            Kết quả: 
            <span className={`font-bold ml-2 ${
              (correctAnswers / sampleQuestions.length) >= 0.8 ? 'text-green-600' : 
              (correctAnswers / sampleQuestions.length) >= 0.5 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {(correctAnswers / sampleQuestions.length) * 100}%
            </span>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Thử lại
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bài tập mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewContainer;