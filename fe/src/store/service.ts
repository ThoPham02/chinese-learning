import { Vocabulary } from "../types";
import axios from "./axios";

// Kiểu dữ liệu chung
export interface AuthPayload {
  email: string;
  password: string;
  fullname?: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  result: {
    code: number;
    message?: string;
  };
  data?: T;
  [key: string]: any;
}

// Register
export const apiRegister = (payload: AuthPayload): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/auth/register",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Login
export const apiLogin = (payload: AuthPayload): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/auth/login",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Get current user info
export const apiGetCurrent = (): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/auth/info"
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// filter words
export const filterWords = (levels: number, search: string, orderBy: string, orderDes: string): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/word/filter",
        params: {
          levels,
          search,
          orderBy,
          orderDes,
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// checkSpeaking.ts
export const checkSpeaking = async (data: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch("http://localhost:5000/practice/pronunciation", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Request failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

// Get user progress
export const apiGetUserProgress = (): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/user/progress",
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// get daily words to learn
export const apiGetLearnWords = (): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/word/learn",
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// update word status
export const apiUpdateWord = (wordId: number, isCorrect: boolean): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `/word/update`,
        data: {
          wordId,
          isCorrect,
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}


// ADMIN API
// create new word
export const apiAdminCreateWord = (word: Vocabulary): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/word",
        data: word,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
// update existing word
export const apiAdminUpdateWord = (word: Vocabulary): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: `/word/${word.id}`,
        data: word,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
// delete word
export const apiAdminDeleteWord = (wordId: number): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/word/${wordId}`,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}


// filter quizs
export const filterQuizs = (search: string, level: number): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/quiz/filter",
        params: {
          search,
          level,
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// create new quiz
export const apiAdminCreateQuiz = (quiz: any): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/quiz",
        data: quiz,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// update existing quiz
export const apiAdminUpdateQuiz = (quiz: any): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: `/quiz/${quiz.id}`,
        data: quiz,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// delete quiz
export const apiAdminDeleteQuiz = (quizId: number): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/quiz/${quizId}`,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// get quiz by id
export const apiGetQuizById = (quizId: number): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `/quiz/${quizId}`,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}



// submit quiz answers
export const apiSubmitQuiz = (data: any): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/quiz/submit",
        data,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// get word by id
export const apiGetWordById = (wordId: number): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `/word/${wordId}`,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// get user quiz history
export const apiGetUserQuiz = (): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/quiz/user",
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// get user vocabulary list
export const apiGetUserVoca = (): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/word/user",
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// get word to review
export const apiGetReviewWords = (): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/word/review",
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}