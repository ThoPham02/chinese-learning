import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  
  // Always show first page
  if (totalPages > 0) {
    pageNumbers.push(1);
  }
  
  // Add ellipsis if needed
  if (currentPage > 3) {
    pageNumbers.push('...');
  }
  
  // Add pages around current page
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (pageNumbers[pageNumbers.length - 1] !== i - 1 && pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...');
    }
    pageNumbers.push(i);
  }
  
  // Add ellipsis if needed
  if (currentPage < totalPages - 2) {
    if (pageNumbers[pageNumbers.length - 1] !== totalPages - 1 && pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...');
    }
  }
  
  // Always show last page if we have more than 1 page
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }
  
  return (
    <nav className="flex items-center justify-between py-3" aria-label="Pagination">
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white mr-3
            ${currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            }`}
        >
          <ChevronLeft size={16} className="mr-1" />
          Trước
        </button>
        
        <div className="hidden md:flex">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md
                    ${currentPage === page
                      ? 'z-10 bg-red-50 border-red-500 text-red-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ml-3
            ${currentPage === totalPages 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            }`}
        >
          Tiếp
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;