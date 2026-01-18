import React from 'react';
import SearchInput from '../shared/SearchInput';

const DashboardSearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = '',
  ...props 
}) => {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
};

export default DashboardSearchBar;