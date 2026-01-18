import React from 'react';

const DashboardToolbarSection = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default DashboardToolbarSection;