import React, { useEffect, useState } from "react";
import { UserVoca } from "../../types"; // Điều chỉnh path nếu khác
import { convertTimestampToDate } from "../../utils/utils";
import { apiGetUserVoca } from "../../store/service";

interface Props {
  data?: UserVoca[]; // Nếu bạn muốn truyền data từ props (option)
}

const itemsPerPage = 10;

const UserVocaList: React.FC<Props> = ({ data }) => {
  const [words, setWords] = useState<UserVoca[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWords = async () => {
      const resp = await apiGetUserVoca();

      setWords(resp.data || []);
    };

    fetchWords();
  }, [data]);

  const totalPages = Math.ceil(words.length / itemsPerPage);
  const paginatedWords = words.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Hán tự</th>
            <th className="px-4 py-2">Pinyin</th>
            <th className="px-4 py-2">Nghĩa</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Lần cuối học</th>
            <th className="px-4 py-2">Ngày ôn lại</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedWords.map((word, index) => (
            <tr key={word.userVocabId} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-4 py-2 font-bold text-lg">{word.hanzi}</td>
              <td className="px-4 py-2">{word.pinyin}</td>
              <td className="px-4 py-2">{word.meaning}</td>
              <td className="px-4 py-2">
                {word.status === 2 && (
                  <span className="text-green-600">✅ Thành thạo</span>
                )}
                {word.status === 1 && (
                  <span className="text-blue-600">📝 Đã học</span>
                )}
                {word.status === 0 && (
                  <span className="text-red-600">⏰ Cần ôn</span>
                )}
              </td>
              <td className="px-4 py-2">
                {convertTimestampToDate(word.lastReview)}
              </td>
              <td className="px-4 py-2">
                {convertTimestampToDate(word.nextReview)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {paginatedWords?.length == 0 ? (
          <div className="mt-8">
            <p>Không có từ vựng nào!</p>
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

export default UserVocaList;
