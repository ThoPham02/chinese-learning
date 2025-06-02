import React from "react";
import { HSKLevel } from "../../../types";

interface QuizFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: HSKLevel | null;
  setSelectedLevel: any;
}

const QuizFilter: React.FC<QuizFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
}) => {
  const hskLevels: HSKLevel[] = [1, 2, 3, 4, 5, 6];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="search\"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tìm kiếm theo tên
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Nhập từ khóa để tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <label
            htmlFor="hskLevel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Level HSK
          </label>
          <select
            id="hskLevel"
            value={selectedLevel || ""}
            onChange={(e) =>
              setSelectedLevel(
                e.target.value ? (Number(e.target.value) as HSKLevel) : null
              )
            }
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          >
            <option value="">Tất cả các level</option>
            {hskLevels.map((level) => (
              <option key={level} value={level}>
                HSK {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuizFilter;
