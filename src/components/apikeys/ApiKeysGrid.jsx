import React, { useState } from 'react';
import ApiKeyItem from '../../components/dashboard/ApiKeyItem';
import { initialApiKeys } from '../../api/mockData';
import { Plus, RefreshCw } from 'lucide-react';
import { confirmAction } from '../shared/ConfirmationDialog';
import { toast } from 'react-hot-toast';

const ApiKeysGrid = () => {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    permissions: 'read'
  });

  const handleRevokeKey = async (keyId) => {
    const keyToRevoke = apiKeys.find(key => key.id === keyId);
    if (keyToRevoke) {
      const shouldRevoke = await confirmAction({
        title: "Revoke API Key",
        message: `Are you sure you want to revoke the API key "${keyToRevoke.name}"? This action cannot be undone.`,
        confirmText: "Revoke",
        confirmButtonClass: "bg-red-600 hover:bg-red-700"
      });
      
      if (shouldRevoke) {
        setApiKeys(prev => prev.map(key => 
          key.id === keyId ? { ...key, status: 'Revoked' } : key
        ));
        toast.success(`API key "${keyToRevoke.name}" has been revoked`);
      }
    }
  };

  const handleCopyKey = (keyId) => {
    toast.success("API key copied to clipboard");
  };

  const handleCreateKey = () => {
    if (!newKeyData.name.trim()) {
      toast.error("Please enter a key name");
      return;
    }
    
    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyData.name,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}`,
      status: 'Active',
      created: new Date().toISOString().split('T')[0],
      lastUsed: null
    };
    
    setApiKeys(prev => [...prev, newKey]);
    setNewKeyData({ name: '', permissions: 'read' });
    setShowCreateModal(false);
    toast.success("New API key created successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">API Keys</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your API keys for accessing our services
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            Create Key
          </button>
        </div>
      </div>
      
      {/* API Keys Grid */}
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6">
        {apiKeys.map(apiKey => (
          <ApiKeyItem
            key={apiKey.id}
            apiKey={apiKey}
            onRevoke={handleRevokeKey}
            onCopy={handleCopyKey}
          />
        ))}
      </div>
      
      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-lg  flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New API Key</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyData.name}
                    onChange={(e) => setNewKeyData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Mobile App, Web Dashboard"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Permissions
                  </label>
                  <select
                    value={newKeyData.permissions}
                    onChange={(e) => setNewKeyData(prev => ({ ...prev, permissions: e.target.value }))}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="read">Read Only</option>
                    <option value="write">Read & Write</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeysGrid;