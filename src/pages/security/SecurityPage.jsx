import { useState } from "react";
import DashboardPage from '../../components/dashboard/DashboardPage';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SecuritySettingsGrid from '../../components/security/SecuritySettingsGrid';
import { toast } from "react-hot-toast";

export const SecurityPage = () => {
    const [mfa, setMfa] = useState(true);
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            toast.error("New passwords don't match!");
            return;
        }
        toast.success("Password updated successfully!");
        // Reset fields after submission
        setPassword({ current: '', new: '', confirm: '' });
    };

    return (
        <DashboardPage>
            <DashboardHeader
                title="Security Settings"
                actions={
                    <button 
                        onClick={() => setMfa(!mfa)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            mfa ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                mfa ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                }
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Password */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Password</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-4">It's a good idea to use a strong password that you're not using elsewhere.</p>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                            <input 
                                type="password" 
                                name="current" 
                                value={password.current} 
                                onChange={handlePasswordChange} 
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                            <input 
                                type="password" 
                                name="new" 
                                value={password.new} 
                                onChange={handlePasswordChange} 
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                            <input 
                                type="password" 
                                name="confirm" 
                                value={password.confirm} 
                                onChange={handlePasswordChange} 
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div className="text-right">
                            <button 
                                type="submit" 
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* MFA Status */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Multi-Factor Authentication</h3>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Protect your account with an extra layer of security.</p>
                            <span className={`text-sm font-medium ${mfa ? 'text-green-600' : 'text-gray-500'}`}>
                                {mfa ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>
                        <button 
                            onClick={() => setMfa(!mfa)} 
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mfa ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                        >
                            <span 
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mfa ? 'translate-x-6' : 'translate-x-1'}`} 
                            />
                        </button>
                    </div>
                    
                    {mfa && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                Two-factor authentication is currently enabled on your account. 
                                You'll be prompted for a code when signing in from a new device.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <SecuritySettingsGrid />
        </DashboardPage>
    );
};