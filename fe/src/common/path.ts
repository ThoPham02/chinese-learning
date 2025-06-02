// api.ts
export const API_URL = {
    LOGIN: "auth/login",
  } as const;
  
  // route-paths.ts
  export const ROUTE_PATHS = {
    // public routes
    ROOT: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    HOME: "/home",
    FLASHCARD: "/flashcards",
    // private routes
    LEARN_WORD: "/learn",
    REVIEW : "/review",
    QUIZ: "/quiz",
    DO_QUIZ: "/quiz/:quizId",
    PROGRESS: "/progress",
    // admin routes
    ADMIN_DASHBOARD: "/admin",
    ADMIN_WORDS: "/admin-words",
    ADMIN_QUIZ: "/admin-quiz",

    ERROR: "/error",
  } as const;
  
  export const BREADCRUMB_DETAIL: Record<string, string> = {
    [ROUTE_PATHS.HOME]: "Trang chủ",
    [ROUTE_PATHS.ERROR]: "Lỗi",
  };
  