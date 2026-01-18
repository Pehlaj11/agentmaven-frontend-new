import React from 'react';
import { TrendingUp, User, CheckCircle, Clock, Phone } from 'lucide-react';

const AgentPerformanceCard = ({ 
  rank, 
  name, 
  successRate, 
  change, 
  calls, 
  avgHandleTime,
  avatar = 'https://placehold.co/64x64/A0AEC0/4A5568?text=AG',
  status = 'Online'
}) => {
  // Handle the case where individual props are passed instead of an agent object
  const agentData = {
    name: name || 'Agent',
    successRate: successRate || '0%',
    avgHandleTime: avgHandleTime || '0m 0s',
    totalCalls: calls || 0,
    avatar: avatar,
    status: status
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center mb-3">
        <img 
          src={agentData.avatar} 
          alt={agentData.name} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{agentData.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{agentData.status}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Success Rate</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{agentData.successRate}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Avg Handle Time</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{agentData.avgHandleTime}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-purple-500 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Total Calls</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{agentData.totalCalls}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Performance</span>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-green-500 h-1.5 rounded-full" 
            style={{ width: `${parseFloat(agentData.successRate) > 100 ? 100 : parseFloat(agentData.successRate)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AgentPerformanceCard;