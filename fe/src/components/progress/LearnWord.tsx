import React, { useState, useEffect } from "react";
import { QuizQuestion, Word } from "../../types";
import { apiGetLearnWords, apiUpdateWord } from "../../store/service";
import Flashcard from "../flashcards/Flashcard";
import QuizCard from "../review/QuizCard";
import { Award, ChevronLeft } from "lucide-react"; // icon nếu bạn dùng

const LearnWord: React.FC = () => {
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [learnStage, setLearnStage] = useState(true);
  const [quizStage, setQuizStage] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0); // dùng cho flashcard
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [level, setLevel] = useState(1); // Mặc định là HSK Level 1

  useEffect(() => {
    const fetchWords = async () => {
      const resp = await apiGetLearnWords();
      setFilteredWords(resp.data);

      // Tạo danh sách câu hỏi cho quiz
      const questions = resp.data.map((word: Word) => ({
        type: Math.floor(Math.random() * 7) + 1, // random 1 - 7
        word,
        options: word.meaningOption,
        correctAnswer: word.meaning,
      }));

      setQuizQuestions(questions);
      setLevel(resp.data[0]?.level || 1); // Lấy level từ từ đầu tiên
    };

    fetchWords();
  }, []);

  const handleNextCard = () => {
    setLearnStage(true);
    setCurrentIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
  };

  const handlePreviousCard = () => {
    setLearnStage(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
  };

  const handleAnswer =async (isCorrect: boolean) => {
    const resp = await apiUpdateWord(
      quizQuestions[currentQuestionIndex].word.id,
      isCorrect
    );
    console.log("Update word response:", resp.data);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIsQuizComplete(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        {filteredWords.length > 0 ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                HSK Level {level} 
              </h1>
              <div>
                <button
                  onClick={() => {
                    setQuizStage(true);
                    setLearnStage(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
                >
                  Kiểm tra
                </button>
              </div>
            </div>

            {quizStage ? (
              !isQuizComplete ? (
                <div className="mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">
                      Câu hỏi {currentQuestionIndex + 1}/{quizQuestions.length}
                    </p>
                    <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                      Đúng: {correctAnswers}/{currentQuestionIndex+1}
                    </div>
                  </div>

                  <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
                    <div
                      className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) / quizQuestions.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <QuizCard
                    question={quizQuestions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-yellow-100">
                      <Award className="w-16 h-16 text-yellow-600" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Bài tập hoàn thành!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Bạn đã trả lời đúng {correctAnswers} trong tổng số{" "}
                    {quizQuestions.length} câu hỏi.
                  </p>

                  <div className="w-full max-w-xs mx-auto mb-6 bg-gray-100 rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          (correctAnswers / quizQuestions.length) * 100
                        }%`,
                        backgroundColor:
                          correctAnswers / quizQuestions.length >= 0.8
                            ? "#10B981"
                            : correctAnswers / quizQuestions.length >= 0.5
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    ></div>
                  </div>

                  <div className="text-lg mb-8">
                    Kết quả:
                    <span
                      className={`font-bold ml-2 ${
                        correctAnswers / quizQuestions.length >= 0.8
                          ? "text-green-600"
                          : correctAnswers / quizQuestions.length >= 0.5
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {(correctAnswers / quizQuestions.length) * 100}%
                    </span>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Thử lại
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Bài tập mới
                    </button>
                  </div>
                </div>
              )
            ) : (
              <Flashcard
                word={filteredWords[currentIndex]}
                onNext={handleNextCard}
                onPrevious={handlePreviousCard}
                learnStage={learnStage}
              />
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600">
              Không có từ vựng cho chủ đề này. Vui lòng chọn chủ đề khác.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnWord;
