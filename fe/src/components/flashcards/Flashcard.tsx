import React, { useEffect, useState } from "react";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { Vocabulary } from "../../types";
import Practice from "./Practice";

interface FlashcardProps {
  word: Vocabulary;
  onNext: () => void;
  onPrevious: () => void;
  learnStage: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  word,
  onNext,
  onPrevious,
  learnStage,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  const handleFlip = () => {
    if (!isRotating) {
      setIsRotating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  const handleSpeakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(isFlipped ? word.exampleCn : word.hanzi);
      utterance.lang = "zh-CN";
      window.speechSynthesis.speak(utterance);
    }
  };
  return (
    <div className="mb-8 relative">
      {
        learnStage ? (
          <>
          <div
            className={`relative w-full bg-white rounded-xl shadow-lg p-6 cursor-pointer select-none
              ${isRotating ? "pointer-events-none" : ""}
              transform transition-all duration-300 perspective-1000
              ${isFlipped ? "rotate-y-180" : ""}`}
            style={{ height: "400px" }}
            onClick={handleFlip}
          >
            <div
              className={`absolute inset-0 backface-hidden p-6 flex flex-col transform transition-all duration-300 ${
                isFlipped ? "opacity-0 rotate-y-180" : "opacity-100"
              }`}
            >
              <div className="mb-3 h-full w-full flex flex-col justify-center items-center">
                <h2 className="text-8xl font-bold text-gray-900 mb-2">
                  {word.hanzi}
                </h2>
                <div className="flex flex-row items-center">
                  <p className="text-xl text-blue-600 mb-4">{word.pinyin}</p>
                  <p className="text-xl text-blue-600 mb-4 mx-4">-</p>
                  <p className="text-xl text-blue-600 mb-4">{word.meaning}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-auto text-center">
                Nhấn để xem thêm chi tiết
              </p>
            </div>

            <div
              className={`absolute inset-0 backface-hidden p-6 flex flex-col transform transition-all duration-300 ${
                isFlipped ? "opacity-100 rotate-y-0" : "opacity-0 rotate-y-180"
              }`}
            >
              <div className="mb-3 h-full w-full">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Ví dụ:
                </h3>
                <p className="text-xl text-gray-900 ml-4 mb-1">{word.exampleCn}</p>
                <p className="text-lg text-blue-600 ml-4 mb-2">{word.examplePinyin}</p>
                <p className="text-lg text-gray-700 ml-4">{word.exampleVn}</p>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Nhấn để quay lại
              </p>
            </div>
          </div>

          <button
            onClick={handleSpeakWord}
            className="absolute top-8 right-8 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors p-2"
          >
            <Volume2 className="w-8 h-8 text-blue-600" />
          </button>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setIsFlipped(false);
                onPrevious();
              }}
              className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Trước
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                onNext();
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tiếp theo
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
          </>
        ) : (
          <div className="relative w-full bg-white rounded-xl shadow-lg p-6" 
            style={{ height: "465px" }}
          >
            <Practice word={word} onNextWord={() => {
                setIsFlipped(false);
                onNext();
              }}/>
          </div>
        )
      }
    </div>
  );
};

export default Flashcard;