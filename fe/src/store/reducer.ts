import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import persistReducer from "redux-persist/es/persistReducer";
import type { PersistConfig } from "redux-persist";
import actionTypes from "./action";

// Type gợi ý: nếu có kiểu cụ thể cho state auth, bạn có thể thay `any` thành `AuthState`
const authConfig: PersistConfig<any> = {
  key: "auth",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["isLogined", "token", "user"],
};


export interface AppState {
    currentPage?: number | string;
    isLogined?: boolean;
    token?: string | null;
    user?: any | null;
}

// Khởi tạo state ban đầu
const initState: AppState = {};

// Kiểu cho action
interface AppAction {
  type: string;
  data?: any;
}

const appReducer = (state = initState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.data,
      };
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLogined: true,
        token: action.data?.token || null,
        user: action.data?.user || null,
      };

    case actionTypes.LOGIN_FAIL:
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogined: false,
        token: null,
        user: null,
      };

    case actionTypes.UPDATE_CURRENT_USER:
    case actionTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.data?.user || state.user,
      };

    case actionTypes.UPDATE_CURRENT_USER_FAIL:
      return state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, appReducer),
  app:  appReducer,
});

export default rootReducer;
