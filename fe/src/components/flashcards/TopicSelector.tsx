import React from 'react';
import { Topic } from '../../types';

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    // convert selectedId to number if necessary
    const id = parseInt(selectedId, 10);

    const topic = topics.find((t) => t.id === id);
    if (topic) {
      onSelectTopic(topic);
    }
  };

  return (
    <div>
      <label htmlFor="topic-select" className="block text-sm font-medium text-gray-700 mb-2">
        Chọn cấp độ
      </label>
      <select
        id="topic-select"
        value={selectedTopic?.id || ''}
        onChange={handleChange}
        className="block w-full p-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector;
