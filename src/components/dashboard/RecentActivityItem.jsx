import React from 'react';

const RecentActivityItem = ({ 
  icon: Icon, 
  title, 
  description, 
  time, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg ${className}`} {...props}>
      {Icon && (
        <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
          <Icon className="text-blue-600 dark:text-blue-400" size={16} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500 ml-2">
        {time}
      </div>
    </div>
  );
};

export default RecentActivityItem;