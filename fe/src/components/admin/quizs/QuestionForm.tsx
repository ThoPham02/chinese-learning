import React from "react";
import { Trash2 } from "lucide-react";
import { Question, Vocabulary } from "../../../types";

interface QuestionFormProps {
  question: Question;
  words: Vocabulary[];
  questionTypes: { [key: number]: string };
  onUpdate: (updated: Partial<Question>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  words,
  questionTypes,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  // Update vocabulary_id
  const onVocabularyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    onUpdate({ vocabulary_id: value });
  };

  // Update type
  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    onUpdate({ type: value });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-800">Câu hỏi #{question.order}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select từ vựng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Từ vựng
          </label>
          <select
            value={question.vocabulary_id || ""}
            onChange={onVocabularyChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled>
              Chọn từ vựng
            </option>
            {words?.map((word) => (
              <option key={word.id} value={word.id}>
                {word.hanzi} - {word.meaning}
              </option>
            ))}
          </select>
        </div>

        {/* Select kiểu câu hỏi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dạng câu hỏi
          </label>
          <select
            value={question.type || ""}
            onChange={onTypeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled>
              Chọn dạng câu hỏi
            </option>
            {Object.entries(questionTypes).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;