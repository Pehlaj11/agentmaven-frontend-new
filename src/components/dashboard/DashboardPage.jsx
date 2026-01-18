import React from 'react';

const DashboardPage = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <main className={`bg-gray-100 dark:bg-gray-900 p-6 ${className}`} {...props}>
      {children}
    </main>
  );
};

export default DashboardPage;