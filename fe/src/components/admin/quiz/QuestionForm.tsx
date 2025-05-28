import React from 'react';
import { Trash2 } from 'lucide-react';
import { Question, vocabularyOptions, questionTypes } from '../../../types';

interface QuestionFormProps {
  question: Question;
  onUpdate: (data: Partial<Question>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ 
  question, 
  onUpdate, 
  onRemove,
  canRemove
}) => {
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Từ vựng
          </label>
          <select
            value={question.vocabulary}
            onChange={(e) => onUpdate({ vocabulary: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {vocabularyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dạng câu hỏi
          </label>
          <select
            value={question.questionType}
            onChange={(e) => onUpdate({ questionType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {questionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};