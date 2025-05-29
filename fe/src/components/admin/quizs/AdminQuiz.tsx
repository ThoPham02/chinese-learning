import { useEffect, useState } from "react";
import { HSKLevel, Quiz } from "../../../types";
import Pagination from "../../ui/Pagination";
import { BookOpen, Plus } from "lucide-react";
import { apiAdminCreateQuiz, apiAdminDeleteQuiz, apiAdminDeleteWord, apiAdminUpdateQuiz, filterQuizs } from "../../../store/service";
import QuizFilter from "./QuizFilter";
import QuizList from "./QuizList";
import AddQuizModal from "./AddQuizModal";

const AdminQuiz = () => {
  const [filteredList, setFilteredList] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 3;

  // Filter vocabulary when search term or level changes
  const fetchQuiz = async () => {
    const result = await filterQuizs(searchTerm, selectedLevel);

    setFilteredList(result.data);
    setCurrentPage(1);
  };
  useEffect(() => {

    fetchQuiz();
  }, [searchTerm, selectedLevel]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddQuiz = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  };

  const handleEditVocabulary = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleDeleteQuiz = async (id: number) => {
    const resp = await apiAdminDeleteQuiz(id);
    console.log(resp);

    fetchQuiz();
  };

  const handleSaveVocabulary = async (quiz: Quiz) => {
    if (editingQuiz) {
      console.log("Updating quiz:", quiz);
      const resp = await apiAdminUpdateQuiz(quiz);

      console.log(resp);
      fetchQuiz();
    } else {
      const resp = await apiAdminCreateQuiz(quiz);

      console.log(resp);
      fetchQuiz();
    }

    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the vocabulary table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Danh sách bài kiểm tra
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddQuiz}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                <Plus size={18} />
                <span>Tạo mới</span>
              </button>
            </div>
          </div>

          <QuizFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />

          {filteredList.length > 0 ? (
            <>
              <QuizList
                quizList={paginatedList}
                onEdit={handleEditVocabulary}
                onDelete={handleDeleteQuiz}
                startIndex={startIndex}
              />

              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <BookOpen className="mx-auto text-red-600 mb-3" size={48} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài kiểm tra</h3>
                <p className="text-gray-600 mb-4">Hãy tạo bài kiểm tra đầu tiên của bạn</p>
                <button
                    onClick={handleAddQuiz}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                    <Plus size={18} />
                    <span>Tạo bài kiểm tra</span>
                </button>
                </div>
          )}
        </div>
      </div>

      <AddQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVocabulary}
        editingQuiz={editingQuiz}
      />
    </div>
  );
};

export default AdminQuiz;
