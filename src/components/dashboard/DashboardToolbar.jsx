import React from 'react';

const DashboardToolbar = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default DashboardToolbar;