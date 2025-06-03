import React, { useEffect, useState } from "react";
import MultiChoice from "../ui/MultiChoice";
import FillBlank from "../ui/FillBlank";
import ListenRepeat from "../ui/ListenRepeat";
import { QUIZ_TYPE } from "../../common/const";
import { Vocabulary } from "../../types";

type PracticeProps = {
  word: Vocabulary;
  setLearnStage?: (stage: boolean) => void;
};

const Practice: React.FC<PracticeProps> = ({ word, setLearnStage }) => {
  const [selectedMode, setSelectedMode] = useState<"multi_fill" | "multi" | "fill" | "listen" | null>(null);

  const handleAnswer = (isCorrect: boolean) => {
    console.log(isCorrect ? "Correct!" : "Incorrect!");
  };

  const handleNext = () => {
    // Sau khi làm bài xong → tự động quay lại chọn mode
    setSelectedMode(null);
  };

  const renderPracticeComponent = () => {
    switch (selectedMode) {
      case "multi_fill":
        return (
          <MultiChoice
            type={QUIZ_TYPE.MultiChoice_FillBlank}
            word={word}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        );
      case "multi":
        return (
          <MultiChoice
            type={QUIZ_TYPE.MultiChoice_Mean}
            word={word}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        );
      case "fill":
        return (
          <FillBlank
            type={QUIZ_TYPE.FillBlank_Listen}
            word={word}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        );
      case "listen":
        return (
          <ListenRepeat
            type={QUIZ_TYPE.ListenRepeat}
            word={word}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Chọn dạng bài luyện tập</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedMode("multi")}
                className="w-full px-8 py-6 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
              >
                🧠 Chọn đáp án đúng
              </button>
              <button
                onClick={() => setSelectedMode("fill")}
                className="w-full px-8 py-6 bg-purple-600 text-white text-xl rounded-lg hover:bg-purple-700 transition"
              >
                🎧 Nghe và điền từ
              </button>
              <button
                onClick={() => setSelectedMode("listen")}
                className="w-full px-8 py-6 bg-orange-500 text-white text-xl rounded-lg hover:bg-orange-600 transition"
              >
                🗣️ Nghe và nhắc lại
              </button>
              <button
                onClick={() => setSelectedMode("multi_fill")}
                className="w-full px-8 py-6 bg-green-600 text-white text-xl rounded-lg hover:bg-green-700 transition"
              >
                📝 Trắc nghiệm điền từ
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setLearnStage?.(true)}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md text-lg font-semibold hover:bg-gray-400 transition"
              >
                ⬅️ Quay lại màn học từ
              </button>
            </div>
          </div>
        );
    }
  };

  return <div>{renderPracticeComponent()}</div>;
};

export default Practice;
