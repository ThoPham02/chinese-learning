import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle } from 'lucide-react';
import { useTests } from '../../context/TestContext';
import { Test, Question, vocabularyOptions, questionTypes, hskLevels } from '../../types';
import { QuestionForm } from './QuestionForm';

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTestModal: React.FC<CreateTestModalProps> = ({ isOpen, onClose }) => {
  const { addTest } = useTests();
  
  const [title, setTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);
  const [hskLevel, setHskLevel] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', order: 1, vocabulary: vocabularyOptions[0], questionType: questionTypes[0] }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addQuestion = () => {
    const newOrder = questions.length + 1;
    setQuestions([
      ...questions, 
      { 
        id: Date.now().toString(), 
        order: newOrder, 
        vocabulary: vocabularyOptions[0], 
        questionType: questionTypes[0] 
      }
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      const updatedQuestions = questions
        .filter(q => q.id !== id)
        .map((q, index) => ({ ...q, order: index + 1 }));
      setQuestions(updatedQuestions);
    }
  };

  const updateQuestion = (id: string, data: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...data } : q));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề bài kiểm tra';
    }

    if (questionCount <= 0) {
      newErrors.questionCount = 'Số câu hỏi phải lớn hơn 0';
    }

    if (timeLimit <= 0) {
      newErrors.timeLimit = 'Thời gian làm bài phải lớn hơn 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newTest: Test = {
      id: Date.now().toString(),
      title,
      questionCount,
      timeLimit,
      hskLevel,
      questions
    };
    
    addTest(newTest);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setQuestionCount(10);
    setTimeLimit(15);
    setHskLevel(1);
    setQuestions([
      { id: '1', order: 1, vocabulary: vocabularyOptions[0], questionType: questionTypes[0] }
    ]);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Tạo bài kiểm tra mới</h2>
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề bài kiểm tra
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Nhập tiêu đề bài kiểm tra"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Số câu hỏi
                  </label>
                  <input
                    type="number"
                    id="questionCount"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    min="1"
                    className={`w-full px-3 py-2 border ${errors.questionCount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  />
                  {errors.questionCount && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.questionCount}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian làm bài (phút)
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    min="1"
                    className={`w-full px-3 py-2 border ${errors.timeLimit ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  />
                  {errors.timeLimit && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.timeLimit}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="hskLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Cấp độ HSK
                  </label>
                  <select
                    id="hskLevel"
                    value={hskLevel}
                    onChange={(e) => setHskLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {hskLevels.map(level => (
                      <option key={level} value={level}>HSK {level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Danh sách câu hỏi ({questions.length})</h3>
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
                {questions.map((question) => (
                  <QuestionForm
                    key={question.id}
                    question={question}
                    onUpdate={(data) => updateQuestion(question.id, data)}
                    onRemove={() => removeQuestion(question.id)}
                    canRemove={questions.length > 1}
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