import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'positive', 
  className = '' 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${
              changeType === 'positive' 
                ? 'text-green-500' 
                : changeType === 'negative' 
                  ? 'text-red-500' 
                  : 'text-gray-500'
            }`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Icon className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;