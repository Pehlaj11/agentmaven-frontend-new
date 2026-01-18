import React from 'react';
import { Search, X } from 'lucide-react';

const DashboardActionBar = ({ 
  selectedCount = 0,
  searchTerm = '',
  onSearchChange,
  placeholder = 'Search...',
  actions,
  onClearSelection,
  className = ''
}) => {
  // If there are selected items, show selection toolbar
  if (selectedCount > 0) {
    return (
      <div className={`mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex flex-wrap items-center justify-between ${className}`}>
        <div className="text-sm text-blue-800 dark:text-blue-200">
          {selectedCount} item(s) selected
        </div>
        <div className="flex flex-wrap gap-2">
          {actions}
          <button
            onClick={onClearSelection}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
  
  // Otherwise, show search bar and actions
  return (
    <div className={`mb-4 flex flex-wrap items-center justify-between gap-4 ${className}`}>
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {actions}
      </div>
    </div>
  );
};

export default DashboardActionBar;