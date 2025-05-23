import { Word } from "../types";
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
export const filterWords = (levels: number): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/word/filter",
        params: {
          levels,
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
