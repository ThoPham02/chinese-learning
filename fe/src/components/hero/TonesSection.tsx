import React from 'react';
import ToneCard from './ToneCard';

const TonesSection: React.FC = () => {
  const tones = [
    {
      number: 1,
      name: 'Thanh bình (第一声)',
      pinyin: 'mā',
      chinese: '妈',
      meaning: 'mẹ',
      description: 'Âm cao và đều, giống như thanh ngang trong tiếng Việt',
      pattern: 'Cao và ngang, không thay đổi độ cao',
      color: 'blue',
    },
    {
      number: 2,
      name: 'Thanh thượng (第二声)',
      pinyin: 'má',
      chinese: '麻',
      meaning: 'vừng, mè',
      description: 'Âm đi từ trung bình lên cao, giống như thanh sắc trong tiếng Việt',
      pattern: 'Đi lên từ trung bình đến cao',
      color: 'green',
    },
    {
      number: 3,
      name: 'Thanh hạ khứ (第三声)',
      pinyin: 'mǎ',
      chinese: '马',
      meaning: 'ngựa',
      description: 'Âm đi xuống rồi lên, đầu tiên xuống thấp rồi lên cao, không có trong tiếng Việt',
      pattern: 'Đi xuống rồi đi lên (dạng V)',
      color: 'purple',
    },
    {
      number: 4,
      name: 'Thanh khứ (第四声)',
      pinyin: 'mà',
      chinese: '骂',
      meaning: 'mắng, chửi',
      description: 'Âm đi từ cao xuống thấp, giống như thanh huyền trong tiếng Việt nhưng mạnh hơn',
      pattern: 'Đi xuống từ cao đến thấp, dứt khoát',
      color: 'red',
    },
    {
      number: 5,
      name: 'Thanh nhẹ (轻声)',
      pinyin: 'ma',
      chinese: '吗',
      meaning: 'từ nghi vấn',
      description: 'Âm nhẹ, ngắn, không nhấn, giống như âm không dấu trong tiếng Việt',
      pattern: 'Nhẹ và ngắn, không nhấn mạnh',
      color: 'gray',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thanh điệu (声调 - shēngdiào)</h2>
        <p className="text-gray-600 mb-4">
          Tiếng Trung Quốc có 4 thanh điệu chính và 1 thanh nhẹ. Thanh điệu là rất quan trọng vì nó thay đổi ý nghĩa của từ.
        </p>
        <div className="bg-amber-100 p-4 rounded-md border-l-4 border-amber-500">
          <h3 className="font-semibold text-amber-800 mb-2">Mẹo học thanh điệu</h3>
          <p className="text-amber-700">
            Hãy tưởng tượng thang điểm từ 1 đến 5, trong đó 1 là âm thấp nhất và 5 là âm cao nhất:
          </p>
          <ul className="list-disc list-inside text-amber-700 mt-2">
            <li>Thanh 1 (ˉ): Giữ ở mức 5 (cao và phẳng)</li>
            <li>Thanh 2 (ˊ): Đi từ mức 3 lên mức 5 (đi lên)</li>
            <li>Thanh 3 (ˇ): Đi từ mức 3 xuống mức 1 rồi lên mức 2 (đi xuống rồi lên)</li>
            <li>Thanh 4 (ˋ): Đi từ mức 5 xuống mức 1 (đi xuống mạnh)</li>
            <li>Thanh nhẹ: Nhẹ và ngắn, không nhấn mạnh</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {tones.map((tone) => (
          <ToneCard key={tone.number} tone={tone} />
        ))}
      </div>
    </div>
  );
};

export default TonesSection;