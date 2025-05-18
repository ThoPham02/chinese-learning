import React, { useState } from 'react';
import { Check, X, Volume2 } from 'lucide-react';
import { QuizQuestion } from '../../types';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [inputAnswer, setInputAnswer] = useState('');
  
  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === question.correctAnswer;
    onAnswer(isCorrect);
    
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setInputAnswer('');
      onNext();
    }, 1500);
  };
  
  const handleSubmitFillBlank = () => {
    if (showFeedback) return;
    
    setShowFeedback(true);
    const isCorrect = inputAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    onAnswer(isCorrect);
    
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setInputAnswer('');
      onNext();
    }, 1500);
  };
  
  const handleSpeakWord = () => {
    // In a real implementation, this would use the Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question.word.hanzi);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Đâu là nghĩa của từ này?
            </h3>
            <div className="flex justify-center mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">{question.word.hanzi}</p>
                <p className="text-blue-600">{question.word.pinyin}</p>
                <button onClick={handleSpeakWord} className="mt-2 flex items-center justify-center mx-auto text-blue-600 hover:text-blue-800">
                  <Volume2 className="w-5 h-5 mr-1" />
                  <span>Nghe</span>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    showFeedback && option === question.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : showFeedback && option === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : selectedAnswer === option
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {showFeedback && option === question.correctAnswer && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {showFeedback && option === selectedAnswer && option !== question.correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'fill-blank':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Viết từ tiếng Trung cho từ:
            </h3>
            <div className="text-center mb-6">
              <p className="text-xl font-medium">{question.word.meaning}</p>
              {/* {question.word.imageUrl && (
                <div className="mt-4 max-w-xs mx-auto h-40 rounded-lg overflow-hidden">
                  <img 
                    src={question.word.imageUrl} 
                    alt={question.word.vietnamese} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )} */}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ${
                  showFeedback
                    ? inputAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                      ? 'border-green-500 focus:ring-green-200 bg-green-50'
                      : 'border-red-500 focus:ring-red-200 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Nhập từ tiếng Trung..."
                disabled={showFeedback}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Gợi ý: {question.word.pinyin}</p>
              <button
                onClick={handleSubmitFillBlank}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={showFeedback || !inputAnswer.trim()}
              >
                Kiểm tra
              </button>
            </div>
            {showFeedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                inputAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className="flex items-start">
                  {inputAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? (
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">
                      {inputAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                        ? 'Chính xác!'
                        : 'Không chính xác!'}
                    </p>
                    {inputAnswer.trim().toLowerCase() !== question.correctAnswer.toLowerCase() && (
                      <p>Đáp án đúng: <span className="font-semibold">{question.correctAnswer}</span></p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'listening':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Hãy nghe và chọn từ đúng:
            </h3>
            <div className="flex justify-center mb-6">
              <button 
                onClick={handleSpeakWord} 
                className="p-6 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <Volume2 className="w-10 h-10 text-blue-600" />
              </button>
            </div>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    showFeedback && option === question.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : showFeedback && option === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : selectedAnswer === option
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {showFeedback && option === question.correctAnswer && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {showFeedback && option === selectedAnswer && option !== question.correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'matching':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Nối từ với nghĩa đúng:
            </h3>
            <div className="flex justify-center mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">{question.word.hanzi}</p>
                <p className="text-blue-600">{question.word.pinyin}</p>
              </div>
            </div>
            <div className="space-y-2">
              {['Công việc', 'Trường học', 'Gia đình', 'Du lịch'].map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    showFeedback && option === question.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : showFeedback && option === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : selectedAnswer === option
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {showFeedback && option === question.correctAnswer && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {showFeedback && option === selectedAnswer && option !== question.correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {renderQuestion()}
    </div>
  );
};

export default QuizCard;