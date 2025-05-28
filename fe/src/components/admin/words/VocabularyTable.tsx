import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash } from 'lucide-react';
import { Vocabulary } from '../../../types';

interface VocabularyTableProps {
  vocabularyList: Vocabulary[];
  onEdit: (vocabulary: Vocabulary) => void;
  onDelete: (id: number) => void;
  startIndex: number;
}

const VocabularyTable: React.FC<VocabularyTableProps> = ({
  vocabularyList,
  onEdit,
  onDelete,
  startIndex,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-red-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-16"
            >
              STT
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Hanzi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Pinyin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Nghĩa Tiếng Việt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Thao Tác
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Chi Tiết
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vocabularyList.map((vocabulary, index) => (
            <React.Fragment key={vocabulary.id}>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {startIndex + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                  {vocabulary.hanzi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vocabulary.pinyin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vocabulary.meaning}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(vocabulary)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(vocabulary.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-150"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleRow(vocabulary.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                  >
                    {expandedRow === vocabulary.id ? (
                      <>
                        <span>Ẩn</span>
                        <ChevronUp size={16} className="ml-1" />
                      </>
                    ) : (
                      <>
                        <span>Xem</span>
                        <ChevronDown size={16} className="ml-1" />
                      </>
                    )}
                  </button>
                </td>
              </tr>
              {expandedRow === vocabulary.id && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Ví dụ Tiếng Việt:</h4>
                        <p className="text-sm text-gray-600">{vocabulary.exampleVn}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Ví dụ Tiếng Trung:</h4>
                        <p className="text-sm text-gray-600">{vocabulary.exampleCn}</p>
                        <p className="text-sm text-gray-500 mt-1">{vocabulary.examplePinyin}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Giải thích:</h4>
                        <p className="text-sm text-gray-600">{vocabulary.explain}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VocabularyTable;