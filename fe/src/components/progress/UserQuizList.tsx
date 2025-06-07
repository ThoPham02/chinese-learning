import React, { useEffect, useState } from "react";
import { UserQuiz } from "../../types";
import { convertTimestampToDate } from "../../utils/utils";
import { apiGetUserQuiz } from "../../store/service";

interface Props {
  data?: UserQuiz[];
}

const itemsPerPage = 10;

const UserQuizList: React.FC<Props> = ({ data }) => {
  const [quizzes, setQuizzes] = useState<UserQuiz[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const resp = await apiGetUserQuiz();

      console.log(resp.data);

      setQuizzes(resp.data || []);
    };

    fetchQuizzes();
  }, [data]);

  const totalPages = Math.ceil(quizzes.length / itemsPerPage);
  const paginatedQuizzes = quizzes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Tên bài Quiz</th>
            <th className="px-4 py-2 text-center">Level</th>
            <th className="px-4 py-2 text-center">Thời gian (phút)</th>
            <th className="px-4 py-2">Kết quả</th>
            <th className="px-4 py-2">Ngày làm</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedQuizzes.map((quiz, index) => (
            <tr key={quiz.userQuizId} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-4 py-2 font-medium">{quiz.title}</td>
              <td className="px-4 py-2 text-center">{quiz.level}</td>
              <td className="px-4 py-2 text-center">{quiz.time}'</td>
              <td style={{color:
                      quiz.score / quiz.num >= 0.8
                        ? "#10B981"
                        : quiz.score / quiz.num >= 0.5
                        ? "#F59E0B"
                        : "#EF4444",}}
                        className="px-4 py-2 text-center">
                {quiz.score} / {quiz.num}
              </td>
              <td className="px-4 py-2">
                {convertTimestampToDate(quiz.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {paginatedQuizzes?.length == 0 ? (
          <div className="mt-8">
            <p>Không có bài Quiz nào</p>
          </div>
        ) : (
          <>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              ← Trước
            </button>
            <span className="px-3 py-1 text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Tiếp →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserQuizList;
