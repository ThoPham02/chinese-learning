import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'consonants', label: 'Phụ âm (声母)', chinese: 'shēngmǔ' },
    { id: 'vowels', label: 'Nguyên âm (韵母)', chinese: 'yùnmǔ' },
    { id: 'tones', label: 'Thanh điệu', chinese: 'shēngdiào' },
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="space-x-2 md:space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm md:text-base
                      ${
                        activeTab === tab.id
                          ? 'border-red-700 text-red-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
          >
            {tab.label}
            <span className="block text-xs text-gray-500">{tab.chinese}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;