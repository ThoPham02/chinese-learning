
import { apiLogin, apiRegister, ApiResponse, AuthPayload } from "./service";
import { Dispatch } from "redux";

const actionTypes = {
    LOGIN: "LOGIN",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT: "LOGOUT",
    GET_CURRENT_USER: "GET_CURRENT_USER",
    UPDATE_CURRENT_USER: "UPDATE_CURRENT_USER",
    UPDATE_CURRENT_USER_SUCCESS: "UPDATE_CURRENT_USER_SUCCESS",
    UPDATE_CURRENT_USER_FAIL: "UPDATE_CURRENT_USER_FAIL",
    SET_CURRENTPAGE: "SET_CURRENTPAGE",
};

export default actionTypes;

// Đăng ký
export const register = (payload: AuthPayload) => async (dispatch: Dispatch) => {
  try {
    const data: ApiResponse = await apiRegister(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

// Đăng nhập
export const login = (payload: AuthPayload) => async (dispatch: Dispatch) => {
  try {
    const data: ApiResponse = await apiLogin(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

// Đăng xuất
export const logout = () => ({
  type: actionTypes.LOGOUT,
});

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = () => ({
  type: actionTypes.GET_CURRENT_USER,
});


