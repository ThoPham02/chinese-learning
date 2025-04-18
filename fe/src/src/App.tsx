import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import QuizSelection from './components/QuizSelection';
import MultipleChoiceQuiz from './components/quizzes/MultipleChoiceQuiz';
import MatchingQuiz from './components/quizzes/MatchingQuiz';
import ListeningQuiz from './components/quizzes/ListeningQuiz';
import FillBlankQuiz from './components/quizzes/FillBlankQuiz';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<QuizSelection />} />
            <Route path="/quiz/multiple-choice" element={<MultipleChoiceQuiz />} />
            <Route path="/quiz/word-meaning" element={<MatchingQuiz />} />
            <Route path="/quiz/listening" element={<ListeningQuiz />} />
            <Route path="/quiz/fill-blank" element={<FillBlankQuiz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;