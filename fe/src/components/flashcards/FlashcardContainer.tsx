import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import TopicSelector from './TopicSelector';
import { Word, Topic } from '../../types';
import { sampleWords, topics } from '../../data/mockData';

const FlashcardContainer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(topics[0]);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    // In a real implementation, this would fetch words from an API or database
    if (selectedTopic) {
      const filteredWords = sampleWords.filter(word => word.topicId === selectedTopic.id);
      setCurrentWords(filteredWords.length > 0 ? filteredWords : sampleWords);
      setCurrentIndex(0);
    }
  }, [selectedTopic]);

  const handleNextCard = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to the beginning
      setCurrentIndex(0);
    }
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to the end
      setCurrentIndex(currentWords.length - 1);
    }
  };

  const handleTopicChange = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Học từ mới</h1>
        <p className="text-gray-600">
          Chọn chủ đề bạn muốn học và luyện tập với thẻ từ vựng
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TopicSelector 
            topics={topics} 
            selectedTopic={selectedTopic} 
            onSelectTopic={handleTopicChange} 
          />
        </div>
        
        <div className="lg:col-span-3">
          {currentWords.length > 0 ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedTopic?.name} - {currentIndex + 1}/{currentWords.length}
                </h2>
                <div className="text-sm text-gray-500">
                  Đã học {currentIndex + 1} trong tổng số {currentWords.length} từ
                </div>
              </div>
              
              <Flashcard 
                word={currentWords[currentIndex]}
                onNext={handleNextCard}
                onPrevious={handlePreviousCard}
                currentStage={currentStage}
                onChangeStage={setCurrentStage}
              />
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-xl text-gray-600">
                Không có từ vựng cho chủ đề này. Vui lòng chọn chủ đề khác.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardContainer;