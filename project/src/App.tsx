import React from 'react';
import AuthContainer from './components/auth/AuthContainer';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-amber-50">
      <div className="w-full max-w-6xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-center md:text-left order-2 md:order-1 mt-8 md:mt-0">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-4">学习汉语</h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-2">Học Tiếng Trung</p>
              <p className="text-gray-600 max-w-md mx-auto md:mx-0">
                Bắt đầu hành trình chinh phục tiếng Trung với các khóa học toàn diện, 
                được thiết kế cho mọi trình độ.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-100 inline-block">
              <div className="flex space-x-6 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-700">50+</p>
                  <p className="text-sm text-gray-600">Bài học</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-700">10K+</p>
                  <p className="text-sm text-gray-600">Từ vựng</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-700">24/7</p>
                  <p className="text-sm text-gray-600">Hỗ trợ</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 hidden md:block">
              <div className="inline-flex space-x-1">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse delay-100"></span>
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse delay-200"></span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Auth Form */}
          <div className="order-1 md:order-2 flex justify-center">
            <AuthContainer />
          </div>
        </div>
      </div>
      
      {/* Chinese characters background decoration */}
      <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 text-9xl text-red-800/5 font-bold">中</div>
        <div className="absolute bottom-20 right-10 text-9xl text-red-800/5 font-bold">文</div>
        <div className="absolute top-1/3 right-1/4 text-9xl text-amber-500/5 font-bold">汉</div>
        <div className="absolute bottom-1/4 left-1/5 text-9xl text-amber-500/5 font-bold">语</div>
      </div>
    </div>
  );
}

export default App;