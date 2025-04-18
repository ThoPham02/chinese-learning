import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/hero/Hero';
import FlashcardContainer from './components/flashcards/FlashcardContainer';
import ReviewContainer from './components/review/ReviewContainer';
import ProgressDashboard from './components/progress/ProgressDashboard';
import QuizContainer from './components/quiz/QuizContainer';

function App() {
  return (
    <Router>
      <Layout>
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/flashcards" element={<FlashcardContainer />} />
            <Route path="/review" element={<ReviewContainer />} />
            <Route path="/quiz" element={<QuizContainer />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;