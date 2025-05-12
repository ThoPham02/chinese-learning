import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full max-w-md">
      <div 
        className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300"
      >
        <div className="px-8 py-8">
          {isLogin ? (
            <LoginForm onSwitch={toggleAuthMode} />
          ) : (
            <RegisterForm onSwitch={toggleAuthMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;