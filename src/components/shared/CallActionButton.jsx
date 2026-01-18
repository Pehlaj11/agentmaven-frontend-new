import React from 'react';

const CallActionButton = ({ 
  icon, 
  label, 
  primary = false, 
  danger = false, 
  active = false, 
  disabled = false,
  onClick,
  className = ''
}) => {
  const baseClasses = "flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
  
  const styleClasses = active
    ? "bg-blue-600 text-white focus:ring-blue-500"
    : danger
    ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    : primary
    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500";
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer";
  
  const combinedClasses = `${baseClasses} ${styleClasses} ${disabledClasses} ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default CallActionButton;