import React, { useState } from 'react';
import SecuritySessionItem from '../../components/dashboard/SecuritySessionItem';
import { securityData } from '../../api/mockData';
import { Shield, Key, Smartphone, Monitor, Lock, Mail, Bell } from 'lucide-react';
import { confirmAction } from '../shared/ConfirmationDialog';
import { toast } from 'react-hot-toast';

const SecuritySettingsGrid = () => {
  const [mfaEnabled, setMfaEnabled] = useState(securityData.mfaEnabled);
  const [activeSessions, setActiveSessions] = useState(securityData.activeSessions);
  const [securityLogs] = useState(securityData.securityLogs);

  const handleRevokeSession = async (sessionId) => {
    const sessionToRevoke = activeSessions.find(session => session.id === sessionId);
    if (sessionToRevoke && !sessionToRevoke.isCurrent) {
      const shouldRevoke = await confirmAction({
        title: "Revoke Session",
        message: `Are you sure you want to revoke the session from ${sessionToRevoke.device}? You'll need to log in again from that device.`,
        confirmText: "Revoke",
        confirmButtonClass: "bg-red-600 hover:bg-red-700"
      });
      
      if (shouldRevoke) {
        setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
        toast.success(`Session from ${sessionToRevoke.device} has been revoked`);
      }
    }
  };

  const handleEnableMFA = () => {
    setMfaEnabled(!mfaEnabled);
    toast.success(`Two-factor authentication ${mfaEnabled ? 'disabled' : 'enabled'}`);
  };

  const handleLogoutAllSessions = async () => {
    const shouldLogout = await confirmAction({
      title: "Logout All Sessions",
      message: "Are you sure you want to logout from all other sessions? You'll need to log in again on those devices.",
      confirmText: "Logout All",
      confirmButtonClass: "bg-red-600 hover:bg-red-700"
    });
    
    if (shouldLogout) {
      setActiveSessions(prev => prev.filter(session => session.isCurrent));
      toast.success("All other sessions have been logged out");
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeSessions.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Security Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Key className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={handleEnableMFA}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              mfaEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                mfaEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex-shrink-0">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {mfaEnabled ? 'Two-Factor Authentication is Enabled' : 'Enable Two-Factor Authentication'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mfaEnabled 
                ? 'Your account is protected with an additional security layer.' 
                : 'Protect your account with an additional security layer.'}
            </p>
          </div>
        </div>
        
        {mfaEnabled && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <Smartphone className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-white">Authenticator App</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Use an authenticator app like Google Authenticator or Authy
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-white">SMS</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Receive codes via text message
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-purple-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-white">Email</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Receive codes via email
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Active Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Active Sessions</h2>
        <div className="space-y-4">
          {activeSessions.map(session => (
            <SecuritySessionItem 
              key={session.id} 
              session={session} 
              onRevoke={handleRevokeSession}
            />
          ))}
        </div>
        
        <div className="mt-6">
          <button 
            onClick={handleLogoutAllSessions}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50"
          >
            Log Out All Other Sessions
          </button>
        </div>
      </div>
      
      {/* Security Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Event</th>
                <th className="py-3 px-4 font-semibold">IP Address</th>
                <th className="py-3 px-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {securityLogs.map((log, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4">{log.event}</td>
                  <td className="py-3 px-4 font-mono">{log.ip}</td>
                  <td className="py-3 px-4">
                    {new Date(log.time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsGrid;