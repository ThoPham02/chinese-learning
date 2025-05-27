import React, { useState } from 'react';
import { useTests } from '../../context/TestContext';
import { Clock, BookOpen, GraduationCap, Filter, Plus, Trash2, Eye } from 'lucide-react';
import { hskLevels } from '../../types';
import { TestDetailsModal } from './TestDetailsModal';

interface TestListProps {
  onCreateTest: () => void;
}

export const TestList: React.FC<TestListProps> = ({ onCreateTest }) => {
  const { tests, deleteTest } = useTests();
  const [filterLevel, setFilterLevel] = useState<number | null>(null);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const filteredTests = filterLevel 
    ? tests.filter(test => test.hskLevel === filterLevel) 
    : tests;

  const handleViewTest = (testId: string) => {
    setSelectedTest(testId);
  };

  const handleCloseDetails = () => {
    setSelectedTest(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Danh sách bài kiểm tra</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={filterLevel || ''}
              onChange={(e) => setFilterLevel(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Tất cả HSK</option>
              {hskLevels.map(level => (
                <option key={level} value={level}>HSK {level}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
          
          <button
            onClick={onCreateTest}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            <Plus size={18} />
            <span>Tạo mới</span>
          </button>
        </div>
      </div>

      {filteredTests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <BookOpen className="mx-auto text-red-600 mb-3" size={48} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài kiểm tra</h3>
          <p className="text-gray-600 mb-4">Hãy tạo bài kiểm tra đầu tiên của bạn</p>
          <button
            onClick={onCreateTest}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            <Plus size={18} />
            <span>Tạo bài kiểm tra</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div 
              key={test.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{test.title}</h3>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded">
                    HSK {test.hskLevel}
                  </span>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-gray-600">
                    <BookOpen size={18} className="mr-2" />
                    <span>{test.questionCount} câu hỏi</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2" />
                    <span>{test.timeLimit} phút</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap size={18} className="mr-2" />
                    <span>{test.questions.length} câu đã tạo</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <button 
                  onClick={() => handleViewTest(test.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Eye size={16} />
                  <span>Chi tiết</span>
                </button>
                <button 
                  onClick={() => deleteTest(test.id)}
                  className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTest && (
        <TestDetailsModal
          testId={selectedTest}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};