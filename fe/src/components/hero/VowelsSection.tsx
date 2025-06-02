import React from 'react';
import PronunciationCard from './PronunciationCard';

interface VowelsSectionProps {
  searchTerm: string;
}

const VowelsSection: React.FC<VowelsSectionProps> = ({ searchTerm }) => {
  const vowels = [
    {
      pinyin: 'a',
      chinese: '阿',
      pronunciation: 'Phát âm giống như "a" trong tiếng Việt',
      example: 'māma (妈妈) - mẹ',
      vietnameseEquivalent: 'Giống âm "a" trong "ba"',
    },
    {
      pinyin: 'o',
      chinese: '喔',
      pronunciation: 'Phát âm giống như "o" trong tiếng Việt, môi tròn',
      example: 'wǒ (我) - tôi',
      vietnameseEquivalent: 'Giống âm "o" trong "to"',
    },
    {
      pinyin: 'e',
      chinese: '鹅',
      pronunciation: 'Phát âm gần với "ơ" trong tiếng Việt',
      example: 'gēge (哥哥) - anh trai',
      vietnameseEquivalent: 'Gần với âm "ơ" trong "tơ"',
    },
    {
      pinyin: 'i',
      chinese: '衣',
      pronunciation: 'Phát âm giống như "i" trong tiếng Việt',
      example: 'lì (李) - quả mận',
      vietnameseEquivalent: 'Giống âm "i" trong "mì"',
    },
    {
      pinyin: 'u',
      chinese: '乌',
      pronunciation: 'Phát âm giống như "u" trong tiếng Việt, môi tròn',
      example: 'wǔ (五) - năm',
      vietnameseEquivalent: 'Giống âm "u" trong "thu"',
    },
    {
      pinyin: 'ü',
      chinese: '鱼',
      pronunciation: 'Phát âm như "u" nhưng với môi tròn và kéo sang hai bên',
      example: 'nǚ (女) - nữ, phụ nữ',
      vietnameseEquivalent: 'Không có trong tiếng Việt, gần với "i" nhưng môi tròn',
    },
    {
      pinyin: 'ai',
      chinese: '爱',
      pronunciation: 'Phát âm giống như "ai" trong tiếng Việt',
      example: 'lái (来) - đến',
      vietnameseEquivalent: 'Giống âm "ai" trong "hai"',
    },
    {
      pinyin: 'ei',
      chinese: '诶',
      pronunciation: 'Phát âm giống như "ây" trong tiếng Việt',
      example: 'měi (美) - đẹp',
      vietnameseEquivalent: 'Giống âm "ây" trong "này"',
    },
  ];

  const filteredVowels = vowels.filter(
    (vowel) =>
      vowel.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vowel.chinese.includes(searchTerm) ||
      vowel.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nguyên âm (韵母 - yùnmǔ)</h2>
        <p className="text-gray-600">
          Nguyên âm trong tiếng Trung Quốc là phần chính của âm tiết, xuất hiện sau phụ âm. Dưới đây là hướng dẫn cách phát âm các
          nguyên âm tiếng Trung Quốc cho người Việt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {filteredVowels.map((vowel) => (
          <PronunciationCard
            key={vowel.pinyin}
            pinyin={vowel.pinyin}
            chinese={vowel.chinese}
            pronunciation={vowel.pronunciation}
            example={vowel.example}
            vietnameseEquivalent={vowel.vietnameseEquivalent}
          />
        ))}
      </div>
    </div>
  );
};

export default VowelsSection;