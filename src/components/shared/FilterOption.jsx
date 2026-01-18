import React from 'react';

const FilterOption = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  options = [],
  placeholder = '',
  min,
  max,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      
      {type === 'select' ? (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : type === 'number' ? (
        <div className="flex gap-2">
          <input
            type="number"
            min={min}
            max={max}
            placeholder={`Min ${label}`}
            value={value?.min || ''}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min={min}
            max={max}
            placeholder={`Max ${label}`}
            value={value?.max || ''}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default FilterOption;