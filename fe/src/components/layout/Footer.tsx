import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-red-400 mr-2" />
              <span className="text-xl font-bold">ChineseViet</span>
            </div>
            <p className="text-gray-300 mb-4">
              Nền tảng học tiếng Trung hiệu quả nhất dành cho người Việt Nam
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tính năng</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Học từ mới</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ôn tập từ vựng</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bài kiểm tra</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Theo dõi tiến trình</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Trợ giúp</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Liên hệ hỗ trợ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <address className="not-italic text-gray-300">
              <p>Email: hello@chineseviet.com</p>
              <p>Điện thoại: (84) 123-456-789</p>
              <p>Địa chỉ: Hà Nội, Việt Nam</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ChineseViet. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;