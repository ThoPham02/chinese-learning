import React from "react";
import {
  Clock,
  BookOpen,
  GraduationCap,
  Trash2,
  Eye,
} from "lucide-react";
import { Quiz } from "../../../types";

interface QuizListProps {
  quizList: Quiz[];
  onEdit: (quiz: Quiz) => void;
  onDelete: (id: number) => void;
  startIndex: number;
}

const QuizList: React.FC<QuizListProps> = ({ quizList, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizList.map((quiz) => (
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

          <div className="bg-gray-50 px-6 py-3 flex justify-between">
            <button
              onClick={()  => onEdit(quiz)}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Eye size={16} />
              <span>Chi tiết</span>
            </button>
            <button
              onClick={() => onDelete(quiz.id)}
              className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
            >
              <Trash2 size={16} />
              <span>Xóa</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
