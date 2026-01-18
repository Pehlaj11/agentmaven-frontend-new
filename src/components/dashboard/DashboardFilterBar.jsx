import React from 'react';

const DashboardFilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ${className}`} {...props}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">Filters</h3>
        <button 
          onClick={onClearFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
};

export default DashboardFilterBar;