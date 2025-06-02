import { Award, Clock } from "lucide-react";
import { Quiz, QuizQuestion } from "../../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetQuizById } from "../../store/service";
import QuizCard from "../review/QuizCard";

interface DoQuizProps {}

const DoQuiz: React.FC<DoQuizProps> = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.time * 60 : 0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

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
    const len = quiz?.questions.length || 0;
    if (currentQuestionIndex < len  - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };
  const { quizId } = useParams<{ quizId: string }>();

  useEffect(() => {
    const fetchQuiz = async () => {
      // convert quizId to number if necessary
      const id = parseInt(quizId || "0", 10);
      const resp = await apiGetQuizById(id);

      if (resp && resp.data) {
        setQuiz(resp.data);
        setTimeLeft(resp.data.time * 60); // convert minutes to seconds
      }

      console.log("Quiz data fetched:", quiz);
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
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
  }, []);

  if (!quiz) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    // Logic to handle quiz submission
    console.log("Quiz submitted");
  };
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
                <span className="font-mono text-lg">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {!isQuizComplete ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Câu hỏi {currentQuestionIndex + 1}/{quiz.num}
            </p>
            <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
              Đúng: {correctAnswers}/{totalAnswered}
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
            <div 
              className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.num) * 100}%` }}
            ></div>
          </div>
          
          <QuizCard
            question={{
                
            } as QuizQuestion}
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
            {/* Bạn đã trả lời đúng {correctAnswers} trong tổng số {sampleQuestions.length} câu hỏi. */}
          </p>
          
          <div className="w-full max-w-xs mx-auto mb-6 bg-gray-100 rounded-full h-4">
            <div 
              className="h-4 rounded-full transition-all duration-1000"
            //   style={{ 
            //     width: `${(correctAnswers / sampleQuestions.length) * 100}%`,
            //     backgroundColor: 
            //       (correctAnswers / sampleQuestions.length) >= 0.8 ? '#10B981' : 
            //       (correctAnswers / sampleQuestions.length) >= 0.5 ? '#F59E0B' : 
            //       '#EF4444'
            //   }}
            ></div>
          </div>
          
          <div className="text-lg mb-8">
            Kết quả: 
            {/* <span className={`font-bold ml-2 ${
              (correctAnswers / sampleQuestions.length) >= 0.8 ? 'text-green-600' : 
              (correctAnswers / sampleQuestions.length) >= 0.5 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {(correctAnswers / sampleQuestions.length) * 100}%
            </span> */}
          </div>
          
          <div className="flex justify-center space-x-4">
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
      </div>
    </div>
  );
};

export default DoQuiz;
