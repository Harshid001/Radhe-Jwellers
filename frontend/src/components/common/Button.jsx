import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  disabled = false, 
  className = '', 
  type = 'button',
  icon: Icon,
  ...props 
}) => {
  const baseClasses = "flex items-center justify-center font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-gold hover:bg-primary-darkGold text-white shadow-md hover:shadow-lg",
    secondary: "bg-white border border-border text-secondary-darkText hover:bg-gray-50 shadow-sm hover:shadow-md",
    danger: "bg-danger hover:bg-red-700 text-white shadow-md hover:shadow-lg",
    success: "bg-success hover:bg-green-700 text-white shadow-md hover:shadow-lg",
    ghost: "bg-transparent hover:bg-gray-100 text-secondary-darkText",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[props.size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
          Processing...
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
