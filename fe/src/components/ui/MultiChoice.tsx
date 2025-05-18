import React, { useState } from 'react';
import { Check, Volume2, X } from 'lucide-react';
import { Word } from '../../types';
import { QUIZ_TYPE } from '../../common/const';
import { speakWord } from '../../utils/speak';

type MultiChoiceProps = {
    type: number;
    word: Word;
    onAnswer: (isCorrect: boolean) => void;
    onNext: () => void;
};
// trong mutil choice các thể loại: chọn nghĩa, chọn từ cần điền, chọn từ có nghĩa, pinyin, nghe và chọn từ
const MultiChoice: React.FC<MultiChoiceProps> = ({type, word, onAnswer, onNext}) => {
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const answer =  type === QUIZ_TYPE.MultiChoice_Listen ? word.meaningOption : word.hanziOption;
    const correctAnswer = type === QUIZ_TYPE.MultiChoice_Listen ? word.meaning : word.hanzi;

    const handleAnswerSelect = (answer: string) => {
        if (showFeedback) return;
        
        setSelectedAnswer(answer);
        setShowFeedback(true);
        
        const isCorrect = answer === correctAnswer;
        onAnswer(isCorrect);
        
        setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        onNext();
        }, 1500);
    };

    const handleSpeakWord = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        speakWord(word.hanzi);
    };

    const renderOption = () => {
        switch (type) {
            case QUIZ_TYPE.MultiChoice_FillBlank:
                return <>
                    <div className="text-2xl mb-4">Điền từ còn thiếu vào chỗ trống:</div>
                    <div className="text-3xl font-bold mb-4 w-full text-center">{word.exampleCn.replace(word.hanzi, "____")}</div>
                </>;
            case QUIZ_TYPE.MultiChoice_Hanzi:
                return <>
                    <div className="text-2xl mb-4">Chọn từ có phiên âm:</div>
                    <div className="text-3xl text-blue-600 font-bold mb-4 w-full text-center">{word.pinyin}</div>
                </>;
            case QUIZ_TYPE.MultiChoice_Mean:
                return <>
                    <div className="text-2xl mb-4">Chọn từ có nghĩa:</div>
                    <div className="text-3xl font-bold mb-4 w-full text-center">{word.meaning}</div>
                </>;
            case QUIZ_TYPE.MultiChoice_Listen:
                return <>
                    <div className="text-2xl mb-4">Hãy nghe và chọn từ đúng:</div>
                    <div className="text-3xl font-bold mb-4 w-full text-center">
                        <button 
                            onClick={handleSpeakWord} 
                            className="p-6 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                        >
                            <Volume2 className="w-10 h-10 text-blue-600" />
                        </button>
                    </div>
                </>;
            default:
                return <div>Lỗi câu hỏi</div>;
        }
    }
    return (
        <div className="">
            {renderOption()}
            <div className="space-y-2">
              {answer.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    showFeedback && option === correctAnswer
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
                    {showFeedback && option === correctAnswer && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {showFeedback && option === selectedAnswer && option !== correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
        </div>
    )
};

export default MultiChoice;