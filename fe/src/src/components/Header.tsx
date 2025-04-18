import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-blue-600" size={28} />
          <h1 className="text-xl font-bold text-gray-800">
            中文<span className="text-blue-600">学习</span>
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <a href="#" className="py-2">Lessons</a>
            </li>
            <li className="text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              <a href="#" className="py-2">Quizzes</a>
            </li>
            <li className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <a href="#" className="py-2">Dictionary</a>
            </li>
            <li className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <a href="#" className="py-2">Profile</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;