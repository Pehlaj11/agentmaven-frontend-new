import React from 'react';
import { TrendingUp, CreditCard, Calendar, Phone, User, AlertTriangle } from 'lucide-react';

const UsageCard = ({ usageItem }) => {
  const percentage = (usageItem.used / usageItem.total) * 100;
  
  let barColor = "bg-green-500";
  if (percentage > 80) barColor = "bg-red-500";
  else if (percentage > 60) barColor = "bg-yellow-500";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 dark:text-white">{usageItem.name}</h3>
        <div className="flex items-center">
          {usageItem.name.includes("Call") ? (
            <Phone className="h-5 w-5 text-blue-500" />
          ) : usageItem.name.includes("Agent") ? (
            <User className="h-5 w-5 text-purple-500" />
          ) : (
            <CreditCard className="h-5 w-5 text-green-500" />
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {usageItem.used.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          of {usageItem.total.toLocaleString()} {usageItem.unit}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className={`h-2.5 rounded-full ${barColor}`} 
          style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {percentage.toFixed(1)}% used
        </span>
        {percentage > 80 && (
          <span className="text-xs text-red-500 dark:text-red-400 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Approaching limit
          </span>
        )}
      </div>
    </div>
  );
};

export default UsageCard;