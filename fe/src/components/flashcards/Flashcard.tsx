import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Word } from '../../types';

interface FlashcardProps {
  word: Word;
  onNext: () => void;
  onPrevious: () => void;
  currentStage: number;
  onChangeStage: (stage: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ 
  word, 
  onNext, 
  onPrevious, 
  currentStage, 
  onChangeStage 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleFlip = () => {
    if (!isRotating) {
      setIsRotating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  const handleSpeakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real implementation, this would use the Web Speech API
    // or another TTS service to speak the Chinese word
    console.log('Speaking:', word.chinese);
    
    // Placeholder for Text-to-Speech functionality
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.chinese);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderFront = () => {
    switch (currentStage) {
      case 0: // Show both word and meaning
        return (
          <>
            <div className="mb-3">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{word.chinese}</h2>
              <p className="text-xl text-blue-600 mb-4">{word.pinyin}</p>
              <p className="text-xl text-gray-700">{word.vietnamese}</p>
            </div>
            <button 
              onClick={handleSpeakWord} 
              className="absolute top-4 right-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
            </button>
            {word.imageUrl && (
              <div className="mt-4 w-full h-48 rounded-lg overflow-hidden">
                <img 
                  src={word.imageUrl} 
                  alt={word.vietnamese} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </>
        );
      case 1: // Show word, hide meaning
        return (
          <>
            <div className="mb-3">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{word.chinese}</h2>
              <p className="text-xl text-blue-600 mb-4">{word.pinyin}</p>
              <p className="text-xl text-gray-500 italic">Đoán nghĩa của từ</p>
            </div>
            <button 
              onClick={handleSpeakWord} 
              className="absolute top-4 right-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
            </button>
            {word.imageUrl && (
              <div className="mt-4 w-full h-48 rounded-lg overflow-hidden">
                <img 
                  src={word.imageUrl} 
                  alt={word.vietnamese} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </>
        );
      case 2: // Show meaning, hide word
        return (
          <>
            <div className="mb-3">
              <h2 className="text-2xl font-medium text-gray-700 mb-2">{word.vietnamese}</h2>
              <p className="text-xl text-gray-500 italic">Nhập từ tiếng Trung</p>
            </div>
            {word.imageUrl && (
              <div className="mt-4 w-full h-48 rounded-lg overflow-hidden">
                <img 
                  src={word.imageUrl} 
                  alt={word.vietnamese} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const renderBack = () => (
    <>
      <div className="mb-3">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ví dụ:</h3>
        <p className="text-xl text-gray-900 mb-1">{word.example.chinese}</p>
        <p className="text-lg text-blue-600 mb-2">{word.example.pinyin}</p>
        <p className="text-lg text-gray-700">{word.example.vietnamese}</p>
      </div>
      <div className="mt-auto">
        <p className="text-sm text-gray-500">Độ khó: 
          <span className={`ml-1 ${
            word.difficulty === 'easy' ? 'text-green-600' : 
            word.difficulty === 'medium' ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {word.difficulty === 'easy' ? 'Dễ' : 
             word.difficulty === 'medium' ? 'Trung bình' : 
             'Khó'}
          </span>
        </p>
      </div>
    </>
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Chế độ học:</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onChangeStage(0)} 
            className={`px-3 py-1 rounded-full text-sm ${
              currentStage === 0 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            Bước 1
          </button>
          <button 
            onClick={() => onChangeStage(1)} 
            className={`px-3 py-1 rounded-full text-sm ${
              currentStage === 1 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            Bước 2
          </button>
          <button 
            onClick={() => onChangeStage(2)} 
            className={`px-3 py-1 rounded-full text-sm ${
              currentStage === 2 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            Bước 3
          </button>
        </div>
      </div>
      
      <div 
        className={`relative w-full bg-white rounded-xl shadow-lg p-6 cursor-pointer select-none
          ${isRotating ? 'pointer-events-none' : ''}
          transform transition-all duration-300 perspective-1000
          ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ height: '400px' }}
        onClick={handleFlip}
      >
        <div className={`absolute inset-0 backface-hidden p-6 flex flex-col transform transition-all duration-300 ${
          isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'
        }`}>
          {renderFront()}
          <p className="text-sm text-gray-400 mt-auto text-center">Nhấn để xem thêm chi tiết</p>
        </div>
        
        <div className={`absolute inset-0 backface-hidden p-6 flex flex-col transform transition-all duration-300 ${
          isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'
        }`}>
          {renderBack()}
          <p className="text-sm text-gray-400 mt-4 text-center">Nhấn để quay lại</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={onPrevious}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Trước
        </button>
        <button 
          onClick={onNext}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Tiếp theo
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;