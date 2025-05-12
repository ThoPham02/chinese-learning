import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
}) => {
  const baseStyles = 'font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-red-700 hover:bg-red-800 text-white border border-transparent',
    secondary: 'bg-amber-500 hover:bg-amber-600 text-white border border-transparent',
    outline: 'bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3 rounded-md',
    md: 'text-base py-2 px-4 rounded-md',
    lg: 'text-lg py-2.5 px-5 rounded-lg',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} 
        ${disabled || loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;