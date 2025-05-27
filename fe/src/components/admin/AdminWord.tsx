import { useEffect, useState } from "react";
import { Vocabulary, HSKLevel, sampleVocabulary } from "../../types";
import AddVocabularyModal from "./AddVocabularyModal";
import Pagination from "./Pagination";
import VocabularyTable from "./VocabularyTable";
import VocabularyFilter from "./VocabularyFilter";
import { Plus } from "lucide-react";

const AdminWord = () => {
  const [vocabularyList, setVocabularyList] =
    useState<Vocabulary[]>(sampleVocabulary);
  const [filteredList, setFilteredList] =
    useState<Vocabulary[]>(sampleVocabulary);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingVocabulary, setEditingVocabulary] = useState<Vocabulary | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 20;

  // Filter vocabulary when search term or level changes
  useEffect(() => {
    let result = [...vocabularyList];

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (vocab) =>
          vocab.hanzi.toLowerCase().includes(lowerCaseSearchTerm) ||
          vocab.pinyin.toLowerCase().includes(lowerCaseSearchTerm) ||
          vocab.meaning.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (selectedLevel) {
      result = result.filter((vocab) => vocab.level === selectedLevel);
    }

    setFilteredList(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedLevel, vocabularyList]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddVocabulary = () => {
    setEditingVocabulary(null);
    setIsModalOpen(true);
  };

  const handleEditVocabulary = (vocabulary: Vocabulary) => {
    setEditingVocabulary(vocabulary);
    setIsModalOpen(true);
  };

  const handleDeleteVocabulary = (id: number) => {
    const newList = vocabularyList.filter((vocab) => vocab.id !== id);
    setVocabularyList(newList);
  };

  const handleSaveVocabulary = (vocabulary: Vocabulary) => {
    if (editingVocabulary) {
      // Update existing vocabulary
      const newList = vocabularyList.map((vocab) =>
        vocab.id === vocabulary.id ? vocabulary : vocab
      );
      setVocabularyList(newList);
    } else {
      // Add new vocabulary
      setVocabularyList([...vocabularyList, vocabulary]);
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
                Danh sách từ vựng
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddVocabulary}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                <Plus size={18} />
                <span>Tạo mới</span>
              </button>
            </div>
          </div>

          <VocabularyFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />

          {filteredList.length > 0 ? (
            <>
              <VocabularyTable
                vocabularyList={paginatedList}
                onEdit={handleEditVocabulary}
                onDelete={handleDeleteVocabulary}
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
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                Không tìm thấy từ vựng nào phù hợp.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel(1);
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      <AddVocabularyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVocabulary}
        editingVocabulary={editingVocabulary}
      />
    </div>
  );
};

export default AdminWord;
