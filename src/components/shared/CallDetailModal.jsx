import React from "react";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDuration } from "../../lib/utils";
import { useUI } from "../../context/UIContext";

const CallDetailModal = ({ call, onClose }) => {
  const { isDarkMode } = useUI();
  
  if (!call) return null;
  
  // Format duration for display
  const displayDuration = typeof call.duration === 'number' 
    ? formatDuration(call.duration) 
    : call.duration || 'N/A';
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl transform transition-all ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Call Details - {call.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>
                <strong className="text-gray-500 dark:text-gray-400">
                  Phone Number:
                </strong>{" "}
                <span className="font-mono text-gray-800 dark:text-gray-200">
                  {call.number || 'N/A'}
                </span>
              </p>
              <p>
                <strong className="text-gray-500 dark:text-gray-400">
                  Agent:
                </strong>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {call.agent || 'N/A'}
                </span>
              </p>
              <p>
                <strong className="text-gray-500 dark:text-gray-400">
                  Purpose:
                </strong>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {call.purpose || 'N/A'}
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-500 dark:text-gray-400">
                  Status:
                </strong>{" "}
                <span>
                  {call.status ? <StatusBadge status={call.status} /> : 'N/A'}
                </span>
              </p>
              <p>
                <strong className="text-gray-500 dark:text-gray-400">
                  Duration:
                </strong>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {displayDuration}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
              Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {call.summary || 'No summary available.'}
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
              Transcript
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-md max-h-48 overflow-y-auto">
              <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-sans">
                {call.transcript || "No transcript available."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallDetailModal;