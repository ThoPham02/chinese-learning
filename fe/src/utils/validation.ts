export const validateEmail = (email: string): string => {
  if (!email) return 'Vui lòng nhập email';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Vui lòng nhập email hợp lệ';
  
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Vui lòng nhập mật khẩu';
  
  if (password.length < 8) {
    return 'Mật khẩu phải có ít nhất 8 ký tự';
  }
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!(hasUppercase && hasLowercase && hasNumber)) {
    return 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
  }
  
  return '';
};

export const validateFullName = (name: string): string => {
  if (!name) return 'Vui lòng nhập họ và tên';
  
  if (name.length < 2) {
    return 'Tên quá ngắn';
  }
  
  return '';
};