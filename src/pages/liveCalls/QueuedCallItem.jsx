import React, { useEffect, useState } from 'react'
import { User, Zap, Clock, Flag, PhoneIncoming } from 'lucide-react'
import PriorityBadge from '../../components/shared/PriorityBadge'

const QueuedCallItem = ({ call, index }) => {
     const [currentTime, setCurrentTime] = useState(Date.now());
      useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(timer);
      }, []);
    
      const formatTimer = (startTime) => {
        const seconds = Math.floor((currentTime - startTime) / 1000);
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      };
      
      // Determine priority level
      const getPriorityLevel = () => {
        const waitTime = Math.floor((currentTime - call.queueTime) / 1000);
        if (waitTime > 300) return 'high';
        if (waitTime > 120) return 'medium';
        return 'low';
      };
      
      const priority = getPriorityLevel();

  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition">
        <div className="flex items-center">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-3">{index + 1}</span>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <PhoneIncoming size={14} className="text-blue-500" />
                    <p className="font-medium text-gray-800 dark:text-gray-200 font-mono">{call.number}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <User size={12} className="mr-1" />
                        <span>{call.agent || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Zap size={12} className="mr-1" />
                        <span>{call.purpose}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-sm text-red-500 font-semibold flex items-center">
                <Clock size={14} className="mr-1" />
                {formatTimer(call.queueTime)}
            </span>
            <PriorityBadge priority={priority} />
        </div>
    </li>
  )
}

export default QueuedCallItem