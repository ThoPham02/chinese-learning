import { Award, Clock } from "lucide-react";
import { Answer, Quiz } from "../../types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGetQuizById, apiSubmitQuiz } from "../../store/service";
import QuizCard from "./QuizCard";

const DoQuiz: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const { quizId } = useParams<{ quizId: string }>();

  useEffect(() => {
    const fetchQuiz = async () => {
      const id = parseInt(quizId || "0", 10);
      const resp = await apiGetQuizById(id);
      if (resp && resp.data) {
        setQuiz(resp.data);
        setTimeLeft(resp.data.time * 60);
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (!quiz || isQuizComplete) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz, isQuizComplete]);

  const handleAnswer = (questionId: number, isCorrect: boolean) => {
    const answer = { questionId, isCorrect: isCorrect };
    setUserAnswers((prev) => [...prev, answer]);
  };

  const handleNextQuestion = () => {
    if (!quiz) return;
    if (currentQuestionIndex <= quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!quiz) return;
    if (currentQuestionIndex >= quiz.questions.length) {
      handleSubmit();
    }
  }, [currentQuestionIndex, quiz]);

  const handleSubmit = async () => {
    setIsQuizComplete(true);
    const totalCorrect = userAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    setScore(totalCorrect);

    await apiSubmitQuiz({ quizId: quiz?.id, answers: userAnswers });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!quiz) return null;

  return (
    <div className="flex flex-col items-center h-screen mt-8">
      <div className="container mx-auto px-4">
        <div className="py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{quiz.title}</h1>
            <p className="text-gray-600">HSK {quiz.level}</p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                timeLeft < 300 ? "text-red-600" : "text-gray-600"
              }`}
            >
              <Clock size={20} />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            {!isQuizComplete && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {!isQuizComplete ? (
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 mb-2">
                Câu hỏi {currentQuestionIndex + 1}/{quiz.questions.length}
              </p>
              <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
                <div
                  className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / quiz.questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <QuizCard
                question={quiz.questions[currentQuestionIndex]}
                onAnswer={(isCorrect) => {
                  handleAnswer(
                    quiz.questions[currentQuestionIndex].id,
                    isCorrect
                  );
                }}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Bài tập hoàn thành!
              </h2>
              <p className="text-gray-600 mb-4">
                Bạn đã trả lời đúng {score} / {quiz.questions.length} câu hỏi.
              </p>
              <div className="w-full max-w-xs mx-auto mb-6 bg-gray-100 rounded-full h-4">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${(score / quiz.questions.length) * 100}%`,
                    backgroundColor:
                      score / quiz.questions.length >= 0.8
                        ? "#10B981"
                        : score / quiz.questions.length >= 0.5
                        ? "#F59E0B"
                        : "#EF4444",
                  }}
                ></div>
              </div>
              <div className="text-lg mb-8 font-semibold">
                Kết quả: {((score / quiz.questions.length) * 100).toFixed(0)}%
              </div>
              <Link to="/quiz">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Trở về
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoQuiz;
