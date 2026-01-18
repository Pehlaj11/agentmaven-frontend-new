import React from 'react';
import { ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer';

const DashboardChart = ({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className = '',
  height = 'h-64',
  ...props 
}) => {
  return (
    <ChartContainer 
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={className}
      height={height}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DashboardChart;