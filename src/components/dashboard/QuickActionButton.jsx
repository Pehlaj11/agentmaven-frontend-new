import React from 'react';

const QuickActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-gray-600 dark:text-gray-300 mb-1" size={20} />}
      <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  );
};

export default QuickActionButton;