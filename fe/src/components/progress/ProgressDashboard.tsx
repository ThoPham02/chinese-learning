import React from 'react';
import { todayTasks, userProgressMock } from '../../data/mockData';
import { Trophy, BookOpen, Brain, Clock } from 'lucide-react';

const ProgressDashboard: React.FC = () => {
  // For a real implementation, this would come from a server or state management
  const progress = userProgressMock;
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Chưa có dữ liệu';
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };
  
  // Calculate completion percentage
  const totalWords = progress.wordsLearned;
  const completionPercentage = totalWords > 0 
    ? Math.round((progress.wordsMastered / totalWords) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tiến trình học tập</h1>
        <p className="text-gray-600">
          Theo dõi và phân tích quá trình học của bạn
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng số từ đã học</p>
              <p className="text-3xl font-bold mt-1">{progress.wordsLearned}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-purple-600"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Từ đã thành thạo</p>
              <p className="text-3xl font-bold mt-1">{progress.wordsMastered}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-600"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{completionPercentage}% hoàn thành</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Từ cần ôn tập</p>
              <p className="text-3xl font-bold mt-1">{progress.wordsToReview}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-yellow-600"
                style={{ width: `${(progress.wordsToReview / progress.wordsLearned) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((progress.wordsToReview / progress.wordsLearned) * 100)}% cần ôn tập
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Chuỗi ngày học</p>
              <p className="text-3xl font-bold mt-1">{progress.streakDays}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <Trophy className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Lần học gần nhất: {formatDate(progress.lastStudyDate)}
            </p>
            <p className="text-sm text-red-600 font-medium mt-1">
              🔥 Hãy giữ chuỗi ngày học của bạn!
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Tiến độ học tập</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">Tuần</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">Tháng</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">Năm</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {/* This would be a chart in a real implementation */}
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, _) => {
              const height = Math.floor(Math.random() * 60) + 20;
              return (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-200 rounded-t-md transition-all duration-1000"
                    style={{ height: `${height}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">{day}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Nhiệm vụ hôm nay</h2>
          
          <div className="space-y-4">
            {todayTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 mb-4 rounded-xl shadow-md ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>

                {task.status === 'incomplete' && (
                  <a
                    href={task.actionLink}
                    className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {task.actionLabel}
                  </a>
                )}

                {task.status === 'completed' && (
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-green-200 rounded">
                    ✅ Đã hoàn thành
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;