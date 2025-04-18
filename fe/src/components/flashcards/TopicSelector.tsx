import React from 'react';
import { Topic } from '../../types';
import { iconMap } from '../../data/mockData';

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  topics, 
  selectedTopic, 
  onSelectTopic 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chủ đề</h2>
      
      <div className="space-y-2">
        {topics.map((topic) => {
          const IconComponent = iconMap[topic.iconName];
          
          return (
            <button
              key={topic.id}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                selectedTopic?.id === topic.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onSelectTopic(topic)}
            >
              <div className={`p-2 rounded-full mr-3 ${
                selectedTopic?.id === topic.id
                  ? 'bg-blue-200'
                  : 'bg-gray-200'
              }`}>
                {IconComponent && <IconComponent className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{topic.name}</p>
                <p className="text-xs text-gray-500">{topic.totalWords} từ</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicSelector;