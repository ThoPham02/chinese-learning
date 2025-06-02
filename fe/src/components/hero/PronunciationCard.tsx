import React from 'react';
import { Volume2 } from 'lucide-react';

interface PronunciationCardProps {
  pinyin: string;
  chinese: string;
  pronunciation: string;
  example: string;
  vietnameseEquivalent: string;
}

const PronunciationCard: React.FC<PronunciationCardProps> = ({
  pinyin,
  chinese,
  pronunciation,
  example,
  vietnameseEquivalent,
}) => {
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-red-700 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">{pinyin}</h3>
          <span className="text-amber-200 text-sm">{chinese}</span>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            onClick={() => handleSpeak(chinese)}
            aria-label="Nghe phát âm chữ"
          >
            <Volume2 className="h-5 w-5" />
          </button>
          <button 
            className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            onClick={() => handleSpeak(example.split(' ')[0])}
            aria-label="Nghe phát âm ví dụ"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700 mb-1">Cách phát âm:</h4>
          <p className="text-gray-600">{pronunciation}</p>
        </div>
        
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700 mb-1">Ví dụ:</h4>
          <p className="text-gray-600">{example}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Tương đương tiếng Việt:</h4>
          <p className="text-gray-600">{vietnameseEquivalent}</p>
        </div>
      </div>
    </div>
  );
};

export default PronunciationCard;