import React, { useState, useEffect } from "react";
import { Quiz, HSKLevel, Vocabulary, questionTypes } from "../../../types";
import { PlusCircle, X } from "lucide-react";
import { QuestionForm } from "./QuestionForm";
import { filterWords } from "../../../store/service";

interface AddQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vocabulary: Quiz) => void;
  editingQuiz: Quiz | null;
}

const AddQuizModal: React.FC<AddQuizModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingQuiz,
}) => {
  const initialFormState: Quiz = {
    id: 0,
    title: "",
    num: 1,
    time: 10,
    level: 1, // Default level
    questions: [],
  } as Quiz; // Define the initial state for Quiz

  const [formData, setFormData] = useState<Quiz>(initialFormState);
  const [words, setWords] = useState<Vocabulary[]>([]); // Assuming words are managed here
  const hskLevels: HSKLevel[] = [1, 2, 3, 4, 5, 6];

  const fetchWords = async (level: number) => {
    const result = await filterWords(level, "", "id", "ASC");

    setWords(result.data);
  }

  useEffect(() => {
    fetchWords(formData.level);
  }
, []);

  useEffect(() => {
    if (editingQuiz) {
      setFormData(editingQuiz);
    } else {
      setFormData({ ...initialFormState, id: Date.now() });
    }
  }, [editingQuiz, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "level") {
      setFormData({ ...formData, [name]: Number(value) as HSKLevel });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      order: (formData.questions?.length || 0) + 1,
      vocabulary_id: 0, // Default or placeholder value
      type: 1, // Default question type
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion],
      num: (prev.questions?.length || 0) + 1,
    } as Quiz));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Tạo bài kiểm tra mới
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tiêu đề bài kiểm tra
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Nhập tiêu đề bài kiểm tra"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="num"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số câu hỏi
                  </label>
                  <input
                    type="number"
                    id="num"
                    name="num"
                    value={formData.num}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Thời gian làm bài (phút)
                  </label>
                  <input
                    type="number"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cấp độ HSK
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {hskLevels.map((level) => (
                      <option key={level} value={level}>
                        HSK {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Danh sách câu hỏi ({formData.questions?.length})
                </h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
                >
                  <PlusCircle size={18} />
                  <span>Thêm câu hỏi</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.questions?.map((question) => (
                    <QuestionForm
                    key={question.id}
                    question={question}
                    words={words}
                    questionTypes={questionTypes}
                    canRemove={formData.questions.length > 1}
                    onRemove={() => {
                        setFormData((prev) => ({
                        ...prev,
                        questions: prev.questions?.filter((q) => q.id !== question.id),
                        num: (prev.questions?.length || 1) - 1,
                        }));
                    }}
                    onUpdate={(data) => {
                        setFormData((prev) => ({
                        ...prev,
                        questions: prev.questions?.map((q) =>
                            q.id === question.id ? { ...q, ...data } : q
                        ),
                        }));
                    }}
                    />
                ))}
                </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Lưu bài kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizModal;
