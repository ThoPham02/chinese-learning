import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { QuizType } from '../types/quiz';

interface QuizTypeCardProps {
  quiz: QuizType;
  icon: LucideIcon;
  onClick: (id: string) => void;
  isSelected: boolean;
}

const QuizTypeCard: React.FC<QuizTypeCardProps> = ({
  quiz,
  icon: Icon,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
        isSelected 
          ? 'ring-4 ring-blue-500 scale-105 shadow-lg' 
          : 'hover:scale-102 hover:shadow-md'
      } cursor-pointer group`}
      style={{ backgroundColor: quiz.backgroundColor }}
      onClick={() => onClick(quiz.id)}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${quiz.backgroundColor}30` }}
          >
            <Icon
              size={24}
              className="transition-all duration-300 group-hover:scale-110"
              color={quiz.textColor}
            />
          </div>
          {isSelected && (
            <div className="bg-white bg-opacity-30 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={quiz.textColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          )}
        </div>

        <h3
          className="text-xl font-bold mb-2"
          style={{ color: quiz.textColor }}
        >
          {quiz.title}
        </h3>
        <p
          className="text-sm opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: quiz.textColor }}
        >
          {quiz.description}
        </p>
        
        <div className="mt-auto pt-4">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
              isSelected 
                ? 'bg-white bg-opacity-25 text-white'
                : 'bg-white bg-opacity-15 hover:bg-opacity-25'
            }`}
            style={{ color: quiz.textColor }}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizTypeCard;