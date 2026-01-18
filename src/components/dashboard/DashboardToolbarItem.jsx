import React from 'react';

const DashboardToolbarItem = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default DashboardToolbarItem;