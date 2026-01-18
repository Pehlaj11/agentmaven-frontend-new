import React from 'react';

const DashboardSection = ({ 
  title,
  subtitle,
  actions,
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`} {...props}>
      {(title || subtitle || actions) && (
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardSection;