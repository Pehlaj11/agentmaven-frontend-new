import React from 'react';
import Card from '../shared/Card';

const ChartContainer = ({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className = '',
  height = 'h-64',
  ...props 
}) => {
  return (
    <Card 
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={className}
      bodyClassName="p-0"
      {...props}
    >
      <div className={height}>
        {children}
      </div>
    </Card>
  );
};

export default ChartContainer;