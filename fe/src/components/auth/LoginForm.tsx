import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { validateEmail, validatePassword } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../common/path';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/redux';
import * as actions from "../../store/action";

type LoginFormProps = {
};

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLogined } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    isLogined && navigate(ROUTE_PATHS.ROOT);
  }, [isLogined, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError,
    });
    
    return !emailError && !passwordError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    dispatch(actions.login( {
      email,
      password,
    }));

    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Chào mừng trở lại</h2>
        <p className="text-gray-600 mt-1">Tiếp tục hành trình học tập của bạn</p>
      </div>
      
      <form onSubmit={handleSubmit}>
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
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between mb-6 mt-4">
          <Checkbox
            id="remember-me"
            label="Ghi nhớ đăng nhập"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          
          <button type="button" className="text-sm text-red-700 hover:text-red-800">
            Quên mật khẩu?
          </button>
        </div>
        
        <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
          Đăng nhập
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Chưa có tài khoản?{' '}
          <button
            type="button"
            onClick={() => navigate(`${ROUTE_PATHS.REGISTER}`)}
            className="text-red-700 hover:text-red-800 font-medium"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;