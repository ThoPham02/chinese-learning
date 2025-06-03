import React, { useState } from 'react';
import { Vocabulary } from '../../types';
import { QUIZ_TYPE } from '../../common/const';
import { Check, Volume2, X } from 'lucide-react';

type FillBlankProps = {
    type: number;
    word: Vocabulary;
    onAnswer: (isCorrect: boolean) => void;
    onNext: () => void;
    showResult?: boolean;
};

// điền từ theo nghĩa, nghe và điền từ
const FillBlank: React.FC<FillBlankProps> = ({type, word, onAnswer, onNext, showResult = true}) => {
    const correctAnswer = word.hanzi;

    const [showFeedback, setShowFeedback] = useState(false);
    const [inputAnswer, setInputAnswer] = useState<string>("");

    const handleSubmitFillBlank = () => {
        if (showFeedback) return;

        setShowFeedback(true);
        const isCorrect = inputAnswer.trim() === correctAnswer;
        onAnswer(isCorrect);

        setTimeout(() => {
            setShowFeedback(false);
            setInputAnswer("");
            onNext();
        }, 1500);
    };

    const handleSpeakWord = (e: React.MouseEvent) => {
        e.stopPropagation();
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(word.hanzi);
            utterance.lang = "zh-CN";
            window.speechSynthesis.speak(utterance);
        }
    };

    const renderOption = () => {
        switch (type) {
            case QUIZ_TYPE.FillBlank_Listen:
                return <>
                    <div className="text-2xl mb-4">Hãy nghe và điền từ:</div>
                    <div className="text-3xl font-bold mb-4 w-full text-center">
                        <button 
                            onClick={handleSpeakWord} 
                            className="p-6 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                        >
                            <Volume2 className="w-10 h-10 text-blue-600" />
                        </button>
                    </div>
                </>;
            case QUIZ_TYPE.FillBlank_Word:
                return <>
                    <div className="text-2xl mb-4">Điền từ có nghĩa:</div>
                    <div className="text-3xl text-blue-600 font-bold mb-4 w-full text-center">{word.meaning}</div>
                </>;
            default:
                return <div>Lỗi câu hỏi</div>;
        }
    }

    return (
        <div>
            {renderOption()}
            <div className="mb-4">
              <input
                type="text"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ${
                  showResult && showFeedback
                    ? inputAnswer.trim() === correctAnswer
                      ? 'border-green-500 focus:ring-green-200 bg-green-50'
                      : 'border-red-500 focus:ring-red-200 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Nhập từ tiếng Trung..."
                disabled={showFeedback}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Gợi ý: {word.pinyin}</p>
              <button
                onClick={handleSubmitFillBlank}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={showFeedback || !inputAnswer.trim()}
              >
                Xác nhận
              </button>
            </div>
            {showResult && showFeedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                inputAnswer.trim() === correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className="flex items-start">
                  {inputAnswer.trim() === correctAnswer ? (
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">
                      {inputAnswer.trim() === correctAnswer
                        ? 'Chính xác!'
                        : 'Không chính xác!'}
                    </p>
                    {inputAnswer.trim() !== correctAnswer && (
                      <p>Đáp án đúng: <span className="font-semibold">{correctAnswer}</span></p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
    )
};

export default FillBlank;