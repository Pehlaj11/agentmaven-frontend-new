import { NavLink } from "react-router-dom";
import { BarChart2, Users, TrendingUp, ClipboardList, Phone, MessageSquare, BookOpen, CreditCard, Key, Shield, Settings, PieChart } from "lucide-react";

const navItemClass = ({ isActive }) =>
  `flex items-center px-4 py-2 rounded-lg ${
    isActive
      ? "text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
  }`;

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col">
      <div className="p-6 text-2xl font-bold text-gray-800 dark:text-white flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500 mr-2"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
        AI Caller
      </div>

      <nav className="mt-6 flex-1 px-4 space-y-4">
        {/* Main */}
        <div>
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</h3>
          <div className="space-y-1">
            <NavLink to="/dashboard" className={navItemClass}><BarChart2 className="h-5 w-5" /><span className="ml-4">Dashboard</span></NavLink>
            <NavLink to="/agents" className={navItemClass}><Users className="h-5 w-5" /><span className="ml-4">Agent Models</span></NavLink>
            <NavLink to="/analytics" className={navItemClass}><TrendingUp className="h-5 w-5" /><span className="ml-4">Analytics</span></NavLink>
            <NavLink to="/advanced-reporting" className={navItemClass}><PieChart className="h-5 w-5" /><span className="ml-4">Advanced Reporting</span></NavLink>
            <NavLink to="/call-logs" className={navItemClass}><ClipboardList className="h-5 w-5" /><span className="ml-4">Call Logs</span></NavLink>
          </div>
        </div>

        {/* Management */}
        <div>
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Management</h3>
          <div className="space-y-1">
            <NavLink to="/live-calls" className={navItemClass}><Phone className="h-5 w-5" /><span className="ml-4">Live Calls</span></NavLink>
            <NavLink to="/conversations" className={navItemClass}><MessageSquare className="h-5 w-5" /><span className="ml-4">Conversations</span></NavLink>
            <NavLink to="/knowledgebase" className={navItemClass}><BookOpen className="h-5 w-5" /><span className="ml-4">Knowledgebase</span></NavLink>
          </div>
        </div>

        {/* System */}
        <div>
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</h3>
          <div className="space-y-1">
            <NavLink to="/usage-billing" className={navItemClass}><CreditCard className="h-5 w-5" /><span className="ml-4">Usage & Billing</span></NavLink>
            <NavLink to="/api-keys" className={navItemClass}><Key className="h-5 w-5" /><span className="ml-4">API Keys</span></NavLink>
            <NavLink to="/security" className={navItemClass}><Shield className="h-5 w-5" /><span className="ml-4">Security</span></NavLink>
            <NavLink to="/settings" className={navItemClass}><Settings className="h-5 w-5" /><span className="ml-4">Settings</span></NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
}