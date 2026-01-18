// Reusable card for key metrics
import React from 'react';

export default function StatCard({ title, value, icon: Icon, change, changeType }) {
  const isPositive = changeType === 'positive';
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>{isPositive ? '▲' : '▼'} {change}</span>
          <span> vs last period</span>
        </div>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
        <Icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
      </div>
    </div>
  );
}