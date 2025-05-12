import { RouteObject } from "react-router-dom";

import { ROUTE_PATHS } from "../common/path";
import Hero from "../components/hero/Hero";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import FlashcardContainer from "../components/flashcards/FlashcardContainer";
import ReviewContainer from "../components/review/ReviewContainer";
import QuizContainer from "../components/quiz/QuizContainer";
import ProgressDashboard from "../components/progress/ProgressDashboard";

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