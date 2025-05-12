import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateEmail, validatePassword, validateFullName } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../common/path';

type RegisterFormProps = {
};

const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
    });
    
    return !fullNameError && !emailError && !passwordError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Register:', { fullName, email, password });
      setIsSubmitting(false);
      alert('Đăng ký thành công!');
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản mới</h2>
        <p className="text-gray-600 mt-1">Bắt đầu hành trình học tiếng Trung của bạn</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Input
          id="fullName"
          label="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          required
          autoComplete="name"
        />
        
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />
        
        <Input
          id="password"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
          autoComplete="new-password"
        />
        
        <div className="mt-6 mb-6">
          <p className="text-xs text-gray-500">
            Bằng cách đăng ký, bạn đồng ý với{' '}
            <a href="#" className="text-red-700 hover:text-red-800">
              Điều khoản dịch vụ
            </a>{' '}
            và{' '}
            <a href="#" className="text-red-700 hover:text-red-800">
              Chính sách bảo mật
            </a>{' '}
            của chúng tôi.
          </p>
        </div>
        
        <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
          Đăng ký
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Đã có tài khoản?{' '}
          <button
            type="button"
            onClick={() => navigate(ROUTE_PATHS.LOGIN)}
            className="text-red-700 hover:text-red-800 font-medium"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;