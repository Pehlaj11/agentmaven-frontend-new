import React from 'react';
import { Phone, ArrowRight, ArrowLeft, CheckCircle, XCircle, Voicemail } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import { formatDuration } from '../../lib/utils';

const CompactCallLogItem = ({ call, onClick }) => {
  const getDirectionIcon = (direction) => {
    if (direction === "Inbound") {
      return <ArrowRight size={14} className="text-green-500" />;
    } else if (direction === "Outbound") {
      return <ArrowLeft size={14} className="text-blue-500" />;
    } else {
      return <Phone size={14} className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={14} className="text-green-500" />;
      case "Missed":
        return <XCircle size={14} className="text-red-500" />;
      case "Voicemail":
        return <Voicemail size={14} className="text-yellow-500" />;
      default:
        return <Phone size={14} className="text-gray-500" />;
    }
  };

  // Safe access to call properties with fallbacks
  const direction = call?.direction || 'Unknown';
  const status = call?.status || 'Unknown';
  const number = call?.number || 'Unknown Number';
  const agent = call?.agent || 'Unknown Agent';
  const duration = call?.duration || 0;
  const date = call?.date || call?.createdAt || new Date();

  return (
    <div 
      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onClick && onClick(call)}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-3">
          {getDirectionIcon(direction)}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white text-sm">{number}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{agent}</span>
            <StatusBadge status={status} size="sm" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="flex items-center">
          {getStatusIcon(status)}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            {formatDuration(duration)}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default CompactCallLogItem;