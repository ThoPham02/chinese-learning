import { BookOpen, Clock, FileCheck, GraduationCap } from "lucide-react";
import { Quiz } from "../../types";
import { Link } from "react-router-dom";

interface ListQuizProps {
  listQuiz: Quiz[];
}

const ListQuiz: React.FC<ListQuizProps> = ({ listQuiz }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listQuiz.map((quiz) => (
        <div
          key={quiz.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {quiz.title}
              </h3>
              <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded">
                HSK {quiz.level}
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center text-gray-600">
                <BookOpen size={18} className="mr-2" />
                <span>{quiz.num} câu hỏi</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={18} className="mr-2" />
                <span>{quiz.time} phút</span>
              </div>
              <div className="flex items-center text-gray-600">
                <GraduationCap size={18} className="mr-2" />
                <span>{quiz.questions?.length || 0} từ đã tạo</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3 flex justify-center">
            <Link to={`${quiz.id}`}>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                <FileCheck size={16} />
                <span>Làm bài</span>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListQuiz;
