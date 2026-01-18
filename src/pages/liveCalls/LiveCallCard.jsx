import { Ear, Mic, Zap, User, PhoneCall, Volume2, Pause, Play, Square, MoreVertical, Signal, Wifi, Battery, PhoneOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInteractions } from "./useInteractions";
import CallQualityIndicator from "../../components/shared/CallQualityIndicator";
import CallActionButton from "../../components/shared/CallActionButton";
import { toast } from "react-toastify";

const LiveCallCard = ({ call }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { activeInteraction, handleInteraction, endInteraction } = useInteractions();
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [callQuality, setCallQuality] = useState(4); // 1-5 scale

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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // console.log(`${isMuted ? "Unmuted" : "Muted"} call ${call.number}`);
    toast.info(`Call ${isMuted ? "unmuted" : "muted"}`);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    // console.log(`${isPaused ? "Resumed" : "Paused"} call ${call.number}`);
    toast.info(`Call ${isPaused ? "resumed" : "paused"}`);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <PhoneCall size={16} className="text-blue-600" />
              {call.number}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-md">
                Live {formatTimer(call.startTime)}
              </span>
              <CallQualityIndicator quality={callQuality >= 4 ? 'excellent' : callQuality >= 3 ? 'good' : callQuality >= 2 ? 'fair' : 'poor'} />
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p className="flex items-center gap-2">
          <User size={14} className="text-gray-500 dark:text-gray-400" />
          <span className="font-medium">{call.agent}</span>
        </p>
        <p className="flex items-center gap-2">
          <Zap size={14} className="text-gray-500 dark:text-gray-400" />
          <span>{call.purpose}</span>
        </p>
        
        {/* Call Quality Indicators */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Signal size={14} className={callQuality >= 3 ? "text-green-500" : "text-gray-400"} />
            <Wifi size={14} className={callQuality >= 2 ? "text-green-500" : "text-gray-400"} />
            <Battery size={14} className={callQuality >= 4 ? "text-green-500" : "text-gray-400"} />
          </div>
          <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ml-2">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${Math.min(100, (Math.floor((currentTime - call.startTime) / 1000) / 300) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
        <CallActionButton 
          icon={<Ear size={16} />} 
          label="Listen" 
          active={activeInteraction.callId === call.id && activeInteraction.type === 'listen'}
          onClick={() => activeInteraction.callId === call.id && activeInteraction.type === 'listen' 
            ? endInteraction() 
            : handleInteraction(call.id, 'listen', call.number)}
        />
        <CallActionButton 
          icon={<Mic size={16} />} 
          label="Whisper" 
          active={activeInteraction.callId === call.id && activeInteraction.type === 'whisper'}
          onClick={() => activeInteraction.callId === call.id && activeInteraction.type === 'whisper' 
            ? endInteraction() 
            : handleInteraction(call.id, 'whisper', call.number)}
        />
        <CallActionButton 
          icon={<Zap size={16} />} 
          label="Barge" 
          primary 
          active={activeInteraction.callId === call.id && activeInteraction.type === 'barge'}
          onClick={() => activeInteraction.callId === call.id && activeInteraction.type === 'barge' 
            ? endInteraction() 
            : handleInteraction(call.id, 'barge', call.number)}
        />
      </div>
      
      {/* Advanced Controls */}
      <div className="flex flex-wrap gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
        <CallActionButton 
          icon={isMuted ? <Volume2 size={16} /> : <Volume2 size={16} />} 
          label={isMuted ? "Unmute" : "Mute"} 
          onClick={toggleMute}
        />
        <CallActionButton 
          icon={isPaused ? <Play size={16} /> : <Pause size={16} />} 
          label={isPaused ? "Resume" : "Hold"} 
          onClick={togglePause}
        />
        <button
          onClick={() => {
            // console.log(`Ended call with ${call.number}`)
            toast.success(`Call with ${call.number} ended successfully`);
          }}
          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
        >
          <PhoneOff size={16} />
        </button>
      </div>
    </div>
  );
};



export default LiveCallCard;