import React from 'react';
import { Play, Pause, Phone, Clock } from 'lucide-react';

const AgentStatusCard = ({ agent, onToggleStatus, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-500";
      case "In a Call":
        return "bg-blue-500";
      case "Offline":
        return "bg-gray-500";
      case "Training":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Online":
        return <Play size={16} />;
      case "In a Call":
        return <Phone size={16} />;
      case "Offline":
        return <Pause size={16} />;
      case "Training":
        return <Clock size={16} />;
      default:
        return <Pause size={16} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{agent.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{agent.modelType || "gpt-4"}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} mr-2`}></div>
          <span className="text-sm text-gray-700 dark:text-gray-300">{agent.status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Calls</p>
          <p className="font-medium text-gray-900 dark:text-white">{agent.totalCalls}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
          <p className="font-medium text-gray-900 dark:text-white">{agent.successRate}</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onToggleStatus(agent.id)}
          className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium ${
            agent.status === "Online" || agent.status === "In a Call"
              ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50"
              : "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50"
          }`}
        >
          {agent.status === "Online" || agent.status === "In a Call" ? (
            <>
              <Pause size={14} className="mr-1" />
              Deactivate
            </>
          ) : (
            <>
              <Play size={14} className="mr-1" />
              Activate
            </>
          )}
        </button>
        
        <button
          onClick={() => onViewDetails(agent.id)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Play size={16} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default AgentStatusCard;