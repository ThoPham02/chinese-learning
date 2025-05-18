import React from "react";
import MultiChoice from "../ui/MultiChoice";
import { QUIZ_TYPE } from "../../common/const";
import { Word } from "../../types";
import FillBlank from "../ui/FillBlank";
import ListenRepeat from "../ui/ListenRepeat";

type PracticeProps = {
  word: Word;
  onNextWord?: () => void; // thêm hàm học từ tiếp theo (nếu có)
};

const Practice: React.FC<PracticeProps> = ({ word, onNextWord }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    console.log(isCorrect ? "Correct!" : "Incorrect!");
    // có thể xử lý điểm, âm thanh phản hồi, v.v.
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  const PracticeStep = [
    <MultiChoice
      type={QUIZ_TYPE.MultiChoice_FillBlank}
      word={word}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />,
    <FillBlank
      type={QUIZ_TYPE.FillBlank_Listen}
      word={word}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />,
    <ListenRepeat
      type={QUIZ_TYPE.ListenRepeat}
      word={word}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />,
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Luyện tập từ vựng:</h2>
      {currentStep === PracticeStep.length ? (
        <div className="flex flex-col items-center justify-center mt-10 space-y-6">
          <div className="text-2xl font-bold text-center">
            🎉 Bạn đã hoàn thành bài luyện tập!
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Làm lại
            </button>
            <button
              onClick={onNextWord}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Học từ tiếp theo
            </button>
          </div>
        </div>
      ) : (
        PracticeStep[currentStep]
      )}
    </div>
  );
};

export default Practice;
