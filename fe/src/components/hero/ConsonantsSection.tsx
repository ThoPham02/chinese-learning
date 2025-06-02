import React from 'react';
import PronunciationCard from './PronunciationCard';

interface ConsonantsSectionProps {
  searchTerm: string;
}

const ConsonantsSection: React.FC<ConsonantsSectionProps> = ({ searchTerm }) => {
  const consonants = [
    {
      pinyin: 'b',
      chinese: '玻',
      pronunciation: 'Phát âm giống như "b" trong tiếng Việt nhưng không bật hơi',
      example: 'bàba (爸爸) - ba, bố',
      vietnameseEquivalent: 'Gần với âm "b" trong "ba"',
    },
    {
      pinyin: 'p',
      chinese: '坡',
      pronunciation: 'Phát âm giống "p" trong tiếng Việt nhưng phải bật hơi mạnh',
      example: 'péngyǒu (朋友) - bạn bè',
      vietnameseEquivalent: 'Gần với âm "ph" trong "pho"',
    },
    {
      pinyin: 'm',
      chinese: '摸',
      pronunciation: 'Phát âm giống như "m" trong tiếng Việt',
      example: 'māma (妈妈) - mẹ',
      vietnameseEquivalent: 'Giống âm "m" trong "mẹ"',
    },
    {
      pinyin: 'f',
      chinese: '佛',
      pronunciation: 'Phát âm giống như "ph" trong tiếng Việt',
      example: 'fàn (饭) - cơm',
      vietnameseEquivalent: 'Giống âm "ph" trong "phở"',
    },
    {
      pinyin: 'd',
      chinese: '得',
      pronunciation: 'Phát âm giống "đ" trong tiếng Việt nhưng không bật hơi',
      example: 'dōngxi (东西) - đồ vật',
      vietnameseEquivalent: 'Gần với âm "đ" trong "đồ"',
    },
    {
      pinyin: 't',
      chinese: '特',
      pronunciation: 'Phát âm giống "t" trong tiếng Việt nhưng phải bật hơi mạnh',
      example: 'tā (他) - anh ấy',
      vietnameseEquivalent: 'Gần với âm "th" trong "thế"',
    },
    {
      pinyin: 'n',
      chinese: '讷',
      pronunciation: 'Phát âm giống như "n" trong tiếng Việt',
      example: 'nǐ (你) - bạn',
      vietnameseEquivalent: 'Giống âm "n" trong "năm"',
    },
    {
      pinyin: 'l',
      chinese: '勒',
      pronunciation: 'Phát âm giống như "l" trong tiếng Việt',
      example: 'lǎoshī (老师) - giáo viên',
      vietnameseEquivalent: 'Giống âm "l" trong "làm"',
    },
  ];

  const filteredConsonants = consonants.filter(
    (consonant) =>
      consonant.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consonant.chinese.includes(searchTerm) ||
      consonant.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Phụ âm (声母 - shēngmǔ)</h2>
        <p className="text-gray-600">
          Phụ âm trong tiếng Trung Quốc là âm đầu của một âm tiết. Dưới đây là hướng dẫn cách phát âm các phụ âm tiếng Trung
          Quốc cho người Việt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {filteredConsonants.map((consonant) => (
          <PronunciationCard
            key={consonant.pinyin}
            pinyin={consonant.pinyin}
            chinese={consonant.chinese}
            pronunciation={consonant.pronunciation}
            example={consonant.example}
            vietnameseEquivalent={consonant.vietnameseEquivalent}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsonantsSection;