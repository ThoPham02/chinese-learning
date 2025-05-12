import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  API_METHOD,
  DEFAULT_MESSAGE,
  HANDLE_ERROR_CODE,
  HANDLE_ERROR_MESSAGE,
} from "../common/const";

import { ROUTE_PATHS } from "../common/path";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

// Intercept request to attach token
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = window.localStorage.getItem("persist:auth");
    const token = authData ? JSON.parse(authData)?.token?.slice(1, -1) : null;

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const NO_TOAST_API_LIST = [
  "aa/login",
  "aa/register",
];

// Intercept response to show toast or handle error codes
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const config = response.config;
    const errorCode = response.data?.result?.code;

    const isNoToastApi = NO_TOAST_API_LIST.some((api) =>
      config.url?.includes(api)
    );

    if (config.method !== API_METHOD.GET) {
      if (errorCode === 0) {
        if (!isNoToastApi) {
          toast.success(DEFAULT_MESSAGE.SUCCESS);
        }
      } else if (
        Object.values(HANDLE_ERROR_CODE).includes(errorCode)
      ) {
        toast.error(
          HANDLE_ERROR_MESSAGE[errorCode] || DEFAULT_MESSAGE.ERROR
        );
      } else {
        toast.error(DEFAULT_MESSAGE.ERROR);
      }
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("persist:auth");
      window.location.assign(ROUTE_PATHS.LOGIN);
      toast.error(DEFAULT_MESSAGE.SESSION_EXPIRED);
    }
    return Promise.reject(error);
  }
);

export default instance;
