import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, User, Bell, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-red-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">ChineseViet</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Trang chủ</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Học từ mới</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Ôn tập</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Bài kiểm tra</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Tiến trình</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
              <User className="w-5 h-5 text-red-600" />
            </button>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0 border-t border-gray-100">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Trang chủ</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Học từ mới</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Ôn tập</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Bài kiểm tra</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Tiến trình</a>
          </nav>
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
              <User className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;