import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { MatchingQuestion } from '../../types/quiz';

const sampleQuestions: MatchingQuestion[] = [
  { id: '1', chinese: '你好', vietnamese: 'Xin chào' },
  { id: '2', chinese: '再见', vietnamese: 'Tạm biệt' },
  { id: '3', chinese: '谢谢', vietnamese: 'Cảm ơn' },
  { id: '4', chinese: '对不起', vietnamese: 'Xin lỗi' }
];

const MatchingQuiz: React.FC = () => {
  const [selectedChinese, setSelectedChinese] = useState<string | null>(null);
  const [selectedVietnamese, setSelectedVietnamese] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [shuffledVietnamese, setShuffledVietnamese] = useState<string[]>([]);

  useEffect(() => {
    setShuffledVietnamese(
      [...sampleQuestions].sort(() => Math.random() - 0.5).map(q => q.vietnamese)
    );
  }, []);

  const handleChineseClick = (chinese: string) => {
    if (!matchedPairs.has(chinese)) {
      setSelectedChinese(chinese);
    }
  };

  const handleVietnameseClick = (vietnamese: string) => {
    if (selectedChinese) {
      const correctPair = sampleQuestions.find(q => q.chinese === selectedChinese);
      if (correctPair && correctPair.vietnamese === vietnamese) {
        setMatchedPairs(new Set([...matchedPairs, selectedChinese]));
      }
      setSelectedChinese(null);
    }
    setSelectedVietnamese(vietnamese);
  };

  const isComplete = matchedPairs.size === sampleQuestions.length;

  return (
    <div className="container mx-auto max-w-4xl py-10 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <div className="text-gray-600">
            Đã ghép đúng: {matchedPairs.size}/{sampleQuestions.length}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Tiếng Trung</h3>
            {sampleQuestions.map((question) => (
              <button
                key={question.chinese}
                onClick={() => handleChineseClick(question.chinese)}
                disabled={matchedPairs.has(question.chinese)}
                className={`
                  w-full p-4 rounded-lg border text-left transition-all
                  ${matchedPairs.has(question.chinese)
                    ? 'bg-green-50 border-green-500 opacity-50'
                    : selectedChinese === question.chinese
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                {question.chinese}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Tiếng Việt</h3>
            {shuffledVietnamese.map((vietnamese) => (
              <button
                key={vietnamese}
                onClick={() => handleVietnameseClick(vietnamese)}
                disabled={sampleQuestions.some(q => 
                  matchedPairs.has(q.chinese) && q.vietnamese === vietnamese
                )}
                className={`
                  w-full p-4 rounded-lg border text-left transition-all
                  ${sampleQuestions.some(q => 
                    matchedPairs.has(q.chinese) && q.vietnamese === vietnamese
                  )
                    ? 'bg-green-50 border-green-500 opacity-50'
                    : selectedVietnamese === vietnamese
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                {vietnamese}
              </button>
            ))}
          </div>
        </div>

        {isComplete && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Chúc mừng! Bạn đã hoàn thành bài tập!
            </h2>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingQuiz;