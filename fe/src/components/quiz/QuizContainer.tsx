import { useEffect, useState } from "react";
import QuizFilter from "../admin/quizs/QuizFilter";
import { HSKLevel } from "../../types";
import { filterQuizs } from "../../store/service";
import ListQuiz from "./ListQuiz";

const QuizContainer = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<HSKLevel>(1);
  const [quizs, setQuizs] = useState([]);

  const fetchQuiz = async () => {
    const resp = await filterQuizs(search, level);

    setQuizs(resp.data);
  };

  useEffect(() => {
    fetchQuiz();
  }, [search, level]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Danh sách bài kiểm tra
            </h2>
          </div>
        </div>

        <QuizFilter
          searchTerm={search}
          setSearchTerm={setSearch}
          selectedLevel={level}
          setSelectedLevel={setLevel}
        />
        <ListQuiz listQuiz={quizs} />
      </div>
    </div>
  );
};

export default QuizContainer;
