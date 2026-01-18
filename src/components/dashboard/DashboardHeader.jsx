import React from 'react';

const DashboardHeader = ({ 
  title, 
  subtitle, 
  actions, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 ${className}`} {...props}>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className="flex flex-wrap gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;