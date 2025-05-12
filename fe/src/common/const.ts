export const USER_ROLES = {
    GUEST: 0,
    ADMIN: 1,
    USER: 2,
}

export const API_METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
};

export const DEFAULT_MESSAGE = {
    PENDING: "Đang xử lý...",
    SUCCESS: "Xử lý thành công!",
    ERROR: "Lỗi hệ thống! Xin vui lòng thử lại!",
    SESSION_EXPIRED: "Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại!",
};

export const HANDLE_ERROR_CODE = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
  
    TAI_KHOAN_TON_TAI: 10000,
    SAI_MAT_KHAU: 10001,
    SAI_TAI_KHOAN: 10002,
  };
  
  export const HANDLE_ERROR_MESSAGE = {
    [HANDLE_ERROR_CODE.UNAUTHORIZED]: "Không có quyền truy cập",
    [HANDLE_ERROR_CODE.FORBIDDEN]: "Không có quyền truy cập",
    [HANDLE_ERROR_CODE.NOT_FOUND]: "Không tìm thấy trang",
    [HANDLE_ERROR_CODE.INTERNAL_SERVER]: "Lỗi server",
  
    [HANDLE_ERROR_CODE.TAI_KHOAN_TON_TAI]: "Email đã tồn tại!",
    [HANDLE_ERROR_CODE.SAI_TAI_KHOAN]:
      "Thông tin tài khoản hoặc mật khẩu không chính xác!",
    [HANDLE_ERROR_CODE.SAI_MAT_KHAU]:
      "Thông tin tài khoản hoặc mật khẩu không chính xác!",
  };