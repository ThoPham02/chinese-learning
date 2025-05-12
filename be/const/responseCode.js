module.exports = {
  SUCCESS: { code: 0, mess: "Thành công" },
  UNAUTHORIZED: { code: 401, mess: "Không có quyền" },
  NOT_FOUND: { code: 404, mess: "Không tìm thấy" },
  SERVER_ERROR: { code: 500, mess: "Lỗi hệ thống" },
  INVALID_INPUT: { code: 400, mess: "Dữ liệu không hợp lệ" },
  USER_NOT_FOUND: { code: 1, mess: "Người dùng không tồn tại" },
  INVALID_CREDENTIALS: { code: 2, mess: "Thông tin đăng nhập không hợp lệ" },
  USER_ALREADY_EXISTS: { code: 3, mess: "Người dùng đã tồn tại" },
  PASSWORD_MISMATCH: { code: 4, mess: "Mật khẩu không khớp" },
  TOKEN_EXPIRED: { code: 5, mess: "Token đã hết hạn" },
  TOKEN_INVALID: { code: 6, mess: "Token không hợp lệ" },
};
