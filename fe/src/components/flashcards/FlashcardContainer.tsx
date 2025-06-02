import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import TopicSelector from "./TopicSelector";
import { Vocabulary, Topic } from "../../types";
import { filterWords } from "../../store/service";
import { topics } from "../../data/mockData";

const FlashcardContainer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(topics[0]);
  const [filteredWords, setFilteredWords] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnStage, setLearnStage] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      if (selectedTopic) {
        const words = await filterWords(selectedTopic.id, "", "id", "ASC");
        setFilteredWords(words.data);
        setCurrentIndex(0);
      }
    };

    fetchWords();
  }, [selectedTopic]);

  const handleNextCard = () => {
    setLearnStage(true);
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to the beginning
      setCurrentIndex(0);
    }
  };

  const handlePreviousCard = () => {
    setLearnStage(true);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to the end
      setCurrentIndex(filteredWords.length - 1);
    }
  };

  const handleTopicChange = (topic: Topic) => {
    setLearnStage(true);
    setSelectedTopic(topic);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Học từ mới</h1>
          <p className="text-gray-600">
            Chọn level bạn muốn học và luyện tập với thẻ từ vựng
          </p>
        </div>

        <div className="w-full lg:w-1/3">
          <TopicSelector
            topics={topics}
            selectedTopic={selectedTopic}
            onSelectTopic={handleTopicChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-4 px-8">
          {filteredWords.length > 0 ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedTopic?.name} - {currentIndex + 1}/
                  {filteredWords.length} từ
                </h2>

                {/* <button
                  onClick={() => setLearnStage(!learnStage)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  {learnStage ? "Học từ" : "Xem nghĩa"}
                </button> */}
              </div>

              <Flashcard
                word={filteredWords[currentIndex]}
                onNext={handleNextCard}
                onPrevious={handlePreviousCard}
                learnStage={learnStage}
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
