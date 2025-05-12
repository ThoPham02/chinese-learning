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
    FLASHCARD: "/flashcard",
    REVIEW : "/review",
    QUIZ: "/quiz",
    PROGRESS: "/progress",

    ERROR: "/error",
  } as const;
  
  export const BREADCRUMB_DETAIL: Record<string, string> = {
    [ROUTE_PATHS.HOME]: "Trang chủ",
    [ROUTE_PATHS.ERROR]: "Lỗi",
  };
  