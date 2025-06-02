import React from 'react';
import { Award, Clock, CheckCircle } from 'lucide-react';
import { Volume2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pronoun from './Pronoun';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Học tiếng Trung hiệu quả với <span className="text-red-600">ChineseViet</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Phương pháp học khoa học với thẻ từ vựng thông minh và hệ thống lặp lại ngắt quãng, giúp bạn ghi nhớ từ vựng tiếng Trung lâu dài.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-gray-700">Học từng bước dễ hiểu với phương pháp thẻ thông minh</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-700">Hệ thống ôn tập theo lịch trình khoa học giúp ghi nhớ lâu</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-full mr-3">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-gray-700">Theo dõi tiến trình học tập và thành tích cá nhân</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                onClick={() => {window.scrollTo({ top: window.innerHeight, behavior: "smooth" });}}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                  Làm quen với cách phát âm
                </button>
              <Link to="/flashcards">
                <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                  Bắt đầu học ngay
                </button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg p-6 z-10 relative transform transition-transform hover:scale-105">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg"
                  alt="Chinese language learning"
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">你好 (nǐ hǎo)</h3>
              <p className="text-gray-600 mb-4">Xin chào</p>
              
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">Ví dụ:</span> 你好，认识你很高兴。
                </p>
                <p className="text-blue-600 text-sm">nǐ hǎo, rèn shi nǐ hěn gāo xìng.</p>
                <p className="text-gray-600 text-sm">Xin chào, rất vui được gặp bạn.</p>
              </div>
              
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Học tiếp
                </button>
              </div>
            </div>
            
            <div className="absolute top-8 -right-8 w-32 h-32 bg-yellow-200 rounded-full -z-10 opacity-70"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-200 rounded-full -z-10 opacity-70"></div>
          </div>
        </div>

        <div className='mt-48 text-center'>
          <Pronoun />
        </div>
        
        {/* <div className="">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cấp độ từ vựng</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Học từ vựng theo cấp độ giúp bạn tiếp thu kiến thức có hệ thống và ứng dụng thực tế hiệu quả
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const IconComponent = iconMap[topic.iconName];

              return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow 
                          flex flex-col items-center text-center"
              >
                <div className="p-3 rounded-full w-fit mb-4 bg-gray-100">
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                  <p className="text-gray-500 mb-4">{topic.totalWords} từ vựng</p>
                </div>
                <Link to="/flashcards">
                  <button className="text-blue-600 font-medium hover:underline">
                    Bắt đầu học →
                  </button>
                </Link>
              </div>
            )
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;