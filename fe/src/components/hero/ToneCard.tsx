import React from 'react';
import { Volume2 } from 'lucide-react';

interface ToneProps {
  number: number;
  name: string;
  pinyin: string;
  chinese: string;
  meaning: string;
  description: string;
  pattern: string;
  color: string;
}

interface ToneCardProps {
  tone: ToneProps;
}

const ToneCard: React.FC<ToneCardProps> = ({ tone }) => {
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500 text-white';
      case 'green':
        return 'bg-green-500 text-white';
      case 'purple':
        return 'bg-purple-500 text-white';
      case 'red':
        return 'bg-red-600 text-white';
      case 'gray':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className={`p-4 flex justify-between items-center ${getColorClasses(tone.color)}`}>
        <div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white bg-opacity-30">
            Thanh {tone.number}
          </span>
          <h3 className="text-xl font-bold mt-2">{tone.name}</h3>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{tone.pinyin}</span>
          <span className="text-lg">{tone.chinese}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">
            Ý nghĩa: <span className="font-normal">{tone.meaning}</span>
          </span>
          <div className="flex gap-2">
            <button 
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => handleSpeak(tone.chinese)}
              aria-label="Nghe phát âm"
            >
              <Volume2 className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => handleSpeak(tone.pinyin)}
              aria-label="Nghe phát âm pinyin"
            >
              <Volume2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className={`p-3 rounded-md text-center ${getColorClasses(tone.color)}`}>
            <div className="h-12 flex items-center justify-center">
              <span className="text-2xl font-bold">{tone.pinyin}</span>
            </div>
          </div>
          <p className="text-sm text-center text-gray-500 mt-1">{tone.pattern}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Mô tả:</h4>
          <p className="text-gray-600">{tone.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ToneCard;