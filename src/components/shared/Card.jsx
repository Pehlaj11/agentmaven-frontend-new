import React from 'react';

const Card = ({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className = '', 
  headerClassName = '',
  bodyClassName = '',
  footer,
  ...props 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`} {...props}>
      {(title || subtitle || actions) && (
        <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
        </div>
      )}
      
      <div className={`p-6 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;