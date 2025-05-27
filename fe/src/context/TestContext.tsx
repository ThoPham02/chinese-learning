import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Test } from '../types';

interface TestContextType {
  tests: Test[];
  addTest: (test: Test) => void;
  updateTest: (test: Test) => void;
  deleteTest: (id: string) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

const initialTests: Test[] = [
  {
    id: '1',
    title: 'HSK 1 - Bài kiểm tra cơ bản',
    questionCount: 10,
    timeLimit: 15,
    hskLevel: 1,
    questions: [
      { id: '1', order: 1, vocabulary: '你好', questionType: 'Trắc nghiệm' },
      { id: '2', order: 2, vocabulary: '谢谢', questionType: 'Điền từ' },
    ]
  },
  {
    id: '2',
    title: 'HSK 2 - Từ vựng hàng ngày',
    questionCount: 15,
    timeLimit: 20,
    hskLevel: 2,
    questions: [
      { id: '1', order: 1, vocabulary: '朋友', questionType: 'Trắc nghiệm' },
      { id: '2', order: 2, vocabulary: '学生', questionType: 'Trắc nghiệm' },
      { id: '3', order: 3, vocabulary: '老师', questionType: 'Điền từ' },
    ]
  },
  {
    id: '3',
    title: 'HSK 3 - Ngữ pháp nâng cao',
    questionCount: 20,
    timeLimit: 30,
    hskLevel: 3,
    questions: [
      { id: '1', order: 1, vocabulary: '可能', questionType: 'Trắc nghiệm' },
      { id: '2', order: 2, vocabulary: '因为', questionType: 'Ghép cặp' },
    ]
  }
];

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tests, setTests] = useState<Test[]>(initialTests);

  const addTest = (test: Test) => {
    setTests([...tests, { ...test, id: Date.now().toString() }]);
  };

  const updateTest = (updatedTest: Test) => {
    setTests(tests.map(test => test.id === updatedTest.id ? updatedTest : test));
  };

  const deleteTest = (id: string) => {
    setTests(tests.filter(test => test.id !== id));
  };

  return (
    <TestContext.Provider value={{ tests, addTest, updateTest, deleteTest }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTests = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTests must be used within a TestProvider');
  }
  return context;
};