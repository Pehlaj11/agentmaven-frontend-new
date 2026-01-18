import React from 'react';

const DashboardToolbarActions = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default DashboardToolbarActions;