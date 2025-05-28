import React, { useState, useEffect } from 'react';
import { Vocabulary, HSKLevel } from '../../../types';
import { X } from 'lucide-react';

interface AddVocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vocabulary: Vocabulary) => void;
  editingVocabulary: Vocabulary | null;
}

const AddVocabularyModal: React.FC<AddVocabularyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingVocabulary,
}) => {
  const initialFormState: Vocabulary = {
    id: 0,
    hanzi: '',
    pinyin: '',
    meaning: '',
    level: 1,
    exampleVn: '',
    exampleCn: '',
    examplePinyin: '',
    explain: '',
  };

  const [formData, setFormData] = useState<Vocabulary>(initialFormState);
  const hskLevels: HSKLevel[] = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (editingVocabulary) {
      setFormData(editingVocabulary);
    } else {
      setFormData({ ...initialFormState, id: Date.now() });
    }
  }, [editingVocabulary, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'level') {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span 
          className="hidden sm:inline-block sm:align-middle sm:h-screen" 
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div 
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {editingVocabulary ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng mới'}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hanzi" className="block text-sm font-medium text-gray-700 mb-1">
                    Hanzi
                  </label>
                  <input
                    type="text"
                    name="hanzi"
                    id="hanzi"
                    value={formData.hanzi}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="pinyin" className="block text-sm font-medium text-gray-700 mb-1">
                    Pinyin
                  </label>
                  <input
                    type="text"
                    name="pinyin"
                    id="pinyin"
                    value={formData.pinyin}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 mb-1">
                  Nghĩa tiếng Việt
                </label>
                <input
                  type="text"
                  name="meaning"
                  id="meaning"
                  value={formData.meaning}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Level HSK
                </label>
                <select
                  name="level"
                  id="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  {hskLevels.map((level) => (
                    <option key={level} value={level}>
                      HSK {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="exampleVn" className="block text-sm font-medium text-gray-700 mb-1">
                  Ví dụ tiếng Việt
                </label>
                <textarea
                  name="exampleVn"
                  id="exampleVn"
                  rows={2}
                  value={formData.exampleVn}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="exampleCn" className="block text-sm font-medium text-gray-700 mb-1">
                    Ví dụ tiếng Trung
                  </label>
                  <textarea
                    name="exampleCn"
                    id="exampleCn"
                    rows={2}
                    value={formData.exampleCn}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="examplePinyin" className="block text-sm font-medium text-gray-700 mb-1">
                    Pinyin của ví dụ
                  </label>
                  <textarea
                    name="examplePinyin"
                    id="examplePinyin"
                    rows={2}
                    value={formData.examplePinyin}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="explain" className="block text-sm font-medium text-gray-700 mb-1">
                  Giải thích
                </label>
                <textarea
                  name="explain"
                  id="explain"
                  rows={3}
                  value={formData.explain}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm transition-colors duration-200"
              >
                {editingVocabulary ? 'Cập nhật' : 'Thêm mới'}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm transition-colors duration-200"
                onClick={onClose}
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVocabularyModal;