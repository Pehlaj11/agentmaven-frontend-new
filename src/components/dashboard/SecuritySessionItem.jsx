import React from 'react';
import { Monitor, Smartphone, Tablet, Laptop, CheckCircle, XCircle } from 'lucide-react';

const SecuritySessionItem = ({ session, onRevoke }) => {
  const getDeviceIcon = (device) => {
    if (device.includes("iPhone") || device.includes("Android")) {
      return <Smartphone className="h-5 w-5 text-blue-500" />;
    } else if (device.includes("iPad") || device.includes("Tablet")) {
      return <Tablet className="h-5 w-5 text-purple-500" />;
    } else if (device.includes("Mac") || device.includes("Windows")) {
      return <Laptop className="h-5 w-5 text-green-500" />;
    } else {
      return <Monitor className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center">
        {getDeviceIcon(session.device)}
        <div className="ml-4">
          <h3 className="font-medium text-gray-900 dark:text-white">{session.device}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{session.location}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{session.ip}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        {session.isCurrent ? (
          <div className="flex items-center mr-4">
            <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">Current</span>
          </div>
        ) : (
          <button
            onClick={() => onRevoke(session.id)}
            className="mr-4 px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm hover:bg-red-200 dark:hover:bg-red-800/50"
          >
            Revoke
          </button>
        )}
        <div className="text-right">
          <p className="text-sm text-gray-900 dark:text-white">{session.lastSeen}</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySessionItem;