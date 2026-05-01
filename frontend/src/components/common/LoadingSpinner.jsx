import React from 'react';

const LoadingSpinner = ({ fullScreen = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  const spinner = (
    <div className={`${sizeClasses[size]} border-primary-gold/20 border-t-primary-gold rounded-full animate-spin`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
