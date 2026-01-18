import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react';

const ApiKeyItem = ({ apiKey, onRevoke, onCopy }) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.(apiKey.id);
  };

  const handleRevoke = () => {
    setShowConfirm(true);
  };

  const confirmRevoke = () => {
    setShowConfirm(false);
    onRevoke?.(apiKey.id);
  };

  const maskedKey = `${apiKey.key.slice(0, 12)}****${apiKey.key.slice(-4)}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{apiKey.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Created: {new Date(apiKey.created).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            apiKey.status === 'Active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {apiKey.status}
        </span>
      </div>

      <div className="mt-4 flex items-center">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-mono text-sm overflow-x-auto">
          {showKey ? apiKey.key : maskedKey}
        </div>
        <div className="flex space-x-2 ml-3">
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {showKey ? (
              <EyeOff className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={handleCopy}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last used: {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
        </p>
        {apiKey.status === 'Active' && (
          <button
            onClick={handleRevoke}
            className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800/50"
          >
            <X className="h-4 w-4 mr-1" />
            Revoke
          </button>
        )}
      </div>

      {/* 🔹 Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
          <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 rounded-2xl p-6 w-[90%] max-w-sm shadow-lg text-center">
            <AlertTriangle className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Revoke API Key?
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
              Are you sure you want to revoke <span className="font-semibold">{apiKey.name}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRevoke}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyItem;
