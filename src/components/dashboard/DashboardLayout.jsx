import React from 'react';
import Card from '../shared/Card';

const DashboardLayout = ({ 
  stats, 
  charts, 
  recentActivity, 
  quickActions,
  className = '' 
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats}
        </div>
      )}
      
      {/* Charts Section */}
      {charts && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {charts}
        </div>
      )}
      
      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        {recentActivity && (
          <div className="lg:col-span-2">
            <Card title="Recent Activity">
              <div className="space-y-4">
                {recentActivity}
              </div>
            </Card>
          </div>
        )}
        
        {/* Quick Actions */}
        {quickActions && (
          <div>
            <Card title="Quick Actions">
              <div className="grid grid-cols-2 gap-3">
                {quickActions}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;