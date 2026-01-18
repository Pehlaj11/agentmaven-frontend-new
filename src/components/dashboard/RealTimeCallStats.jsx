import React from 'react';

const RealTimeCallStats = ({ 
  title, 
  count, 
  icon: Icon, 
  color = "text-gray-500", 
  bgColor = "bg-gray-100 dark:bg-gray-700" 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors duration-300 hover:shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {Icon && <Icon className={`h-6 w-6 ${color}`} />}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCallStats;