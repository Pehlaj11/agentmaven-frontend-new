import React from 'react';
import Card from '../shared/Card';

const DashboardWidget = ({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <Card 
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={className}
      {...props}
    >
      {children}
    </Card>
  );
};

export default DashboardWidget;