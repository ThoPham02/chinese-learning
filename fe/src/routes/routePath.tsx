import { RouteObject } from "react-router-dom";

import { ROUTE_PATHS } from "../common/path";
import Hero from "../components/hero/Hero";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import FlashcardContainer from "../components/flashcards/FlashcardContainer";
import ReviewContainer from "../components/review/ReviewContainer";
import QuizContainer from "../components/quiz/QuizContainer";
import ProgressDashboard from "../components/progress/ProgressDashboard";
import LearnWord from "../components/progress/LearnWord";
import AdminQuiz from "../components/admin/quiz/AdminQuiz";
import AdminWord from "../components/admin/words/AdminWord";
import AdminDashBoard from "../components/admin/AdminDashBoard";

export const AppRoute: RouteObject[] = [
  {
    id: "homeRoot",
    path: ROUTE_PATHS.ROOT,
    element: <Hero />,
  },
  {
    id: "home",
    path: ROUTE_PATHS.HOME,
    element: <Hero />,
  },
  {
    id: "FLASHCARD",
    path: ROUTE_PATHS.FLASHCARD,
    element: <FlashcardContainer />,
  },
  {
    id: "REVIEW",
    path: ROUTE_PATHS.REVIEW,
    element: <ReviewContainer />,
  },
  {
    id: "QUIZ",
    path: ROUTE_PATHS.QUIZ,
    element: <QuizContainer />,
  },
  {
    id: "PROGRESS",
    path: ROUTE_PATHS.PROGRESS,
    element: <ProgressDashboard />,
  },
  {
    id: "learnWord",
    path: ROUTE_PATHS.LEARN_WORD,
    element: <LearnWord />,
  },
  {
    id: "admin-words",
    path: ROUTE_PATHS.ADMIN_WORDS,
    element: < AdminWord/>,
  },
  {
    id: "admin-quiz",
    path: ROUTE_PATHS.ADMIN_QUIZ,
    element: <AdminQuiz />,
  },
  {
    id: "admin",
    path: ROUTE_PATHS.ADMIN_DASHBOARD,
    element: <AdminDashBoard />,
  },
  {
    id: "error",
    path: ROUTE_PATHS.ERROR,
    element: <div>Error Page</div>,
  },
];


export const AuthRoute: RouteObject[] = [
  {
    id: "login",
    path: ROUTE_PATHS.LOGIN,
    element: <LoginForm />,
  },
  {
    id: "register",
    path: ROUTE_PATHS.REGISTER,
    element: <RegisterForm />,
  }
]