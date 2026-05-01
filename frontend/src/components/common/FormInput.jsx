import React from 'react';

const FormInput = ({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  id,
  required = false,
  ...props 
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-secondary-darkText">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`
            w-full px-4 py-2.5 bg-white border rounded-xl text-sm transition-all duration-200 outline-none
            ${error 
              ? 'border-danger focus:ring-danger/20' 
              : 'border-border focus:ring-primary-gold/20 focus:border-primary-gold'}
            focus:ring-4
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-medium text-danger mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
