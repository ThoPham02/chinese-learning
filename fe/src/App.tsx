import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/hero/Hero';
import FlashcardContainer from './components/flashcards/FlashcardContainer';
import ReviewContainer from './components/review/ReviewContainer';
import ProgressDashboard from './components/progress/ProgressDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'flashcards' | 'review' | 'progress'>('home');
  
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Hero />;
      case 'flashcards':
        return <FlashcardContainer />;
      case 'review':
        return <ReviewContainer />;
      case 'progress':
        return <ProgressDashboard />;
      default:
        return <Hero />;
    }
  };

  return (
    <Layout>
      <div className="pt-16">
        {renderContent()}
      </div>
      
      {/* Navigation bar for demo purposes - would be replaced by proper router in a real app */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-40">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`p-2 flex flex-col items-center ${
                currentPage === 'home' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <span className="text-sm">Trang chủ</span>
            </button>
            <button 
              onClick={() => setCurrentPage('flashcards')}
              className={`p-2 flex flex-col items-center ${
                currentPage === 'flashcards' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <span className="text-sm">Học từ</span>
            </button>
            <button 
              onClick={() => setCurrentPage('review')}
              className={`p-2 flex flex-col items-center ${
                currentPage === 'review' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <span className="text-sm">Ôn tập</span>
            </button>
            <button 
              onClick={() => setCurrentPage('progress')}
              className={`p-2 flex flex-col items-center ${
                currentPage === 'progress' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <span className="text-sm">Tiến trình</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;