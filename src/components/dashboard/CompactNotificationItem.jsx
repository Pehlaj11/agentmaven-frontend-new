import React from 'react';

const CompactNotificationItem = ({ notification, onClick }) => {
  const IconComponent = notification.icon;
  
  return (
    <div 
      className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
      onClick={onClick}
    >
      <div className={`flex-shrink-0 mt-0.5 ${notification.color}`}>
        <IconComponent className="h-5 w-5" />
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
      </div>
    </div>
  );
};

export default CompactNotificationItem;