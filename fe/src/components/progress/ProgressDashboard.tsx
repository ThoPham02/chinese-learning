import React, { useEffect, useState } from "react";
import { todayTasks } from "../../data/mockData";
import {
  Trophy,
  BookOpen,
  Brain,
  Clock,
  StretchHorizontal,
} from "lucide-react";
import { apiGetUserProgress } from "../../store/service";
import { UserProgress } from "../../types";
import { convertTimestampToDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import UserVocaList from "./UserVocaList";
import UserQuizList from "./UserQuizList";

const ProgressDashboard: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({} as UserProgress);
  const [activeTab, setActiveTab] = useState<"words" | "quizzes">("words");

  useEffect(() => {
    const fetchProcess = async () => {
      const resp = await apiGetUserProgress();

      setProgress(resp.data);
    };

    fetchProcess();
  }, []);

  // Calculate completion percentage
  const totalWords = progress.learnedWords;
  const completionPercentage =
    totalWords > 0
      ? Math.round((progress.masteredWords / totalWords) * 100)
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tiến trình học tập
        </h1>
        <p className="text-gray-600">
          Theo dõi và phân tích quá trình học của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Level hiện tại</p>
              <p className="text-3xl font-bold mt-1">{progress.level} / 6</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <StretchHorizontal className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-red-600"
                style={{ width: `${(progress.level / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng số từ đã học</p>
              <p className="text-3xl font-bold mt-1">{progress.learnedWords}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-purple-600"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Từ đã thành thạo</p>
              <p className="text-3xl font-bold mt-1">
                {progress.masteredWords}
              </p>
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
            <p className="text-xs text-gray-500 mt-1">
              {completionPercentage}% hoàn thành
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Từ cần ôn tập</p>
              <p className="text-3xl font-bold mt-1">
                {progress.reviewedWords}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-yellow-600"
                style={{
                  width: `${
                    (progress.reviewedWords / progress.learnedWords) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {100 - completionPercentage}% cần ôn tập
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Chuỗi ngày học</p>
              <p className="text-3xl font-bold mt-1">
                {progress.currentStreak}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <Trophy className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Lần học gần nhất:{" "}
              {progress.lastActiveDate != 0 ||
                convertTimestampToDate(progress.lastActiveDate)}
            </p>
            <p className="text-sm text-red-600 font-medium mt-1">
              {progress.currentStreak == 0
                ? "Bắt đầu chuỗi ngày học của bạn nào!"
                : "🔥 Hãy giữ chuỗi ngày học của bạn!"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("words")}
                className={`whitespace-nowrap pb-2 border-b-2 font-medium text-sm ${
                  activeTab === "words"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Các từ đã học
              </button>
              <button
                onClick={() => setActiveTab("quizzes")}
                className={`whitespace-nowrap pb-2 border-b-2 font-medium text-sm ${
                  activeTab === "quizzes"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Bài Quiz đã làm
              </button>
            </nav>
          </div>

          <div>
            {activeTab === "words" && (
              <div>
                  <UserVocaList />
              </div>
            )}
            {activeTab === "quizzes" && (
              <div>
                <UserQuizList />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Làm bài tập để giữ tiến độ nào!!!
          </h2>

          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 mb-4 rounded-xl shadow-md ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>

                {task.status === "incomplete" && (
                  <Link
                    to={task.actionLink}
                    className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {task.actionLabel}
                  </Link>
                )}

                {task.status === "completed" && (
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
