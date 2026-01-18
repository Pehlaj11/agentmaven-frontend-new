import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import {
  Phone,
  CheckCircle,
  DollarSign,
  Clock,
  Users,
  Trophy,
  ThumbsUp,
  Star,
  TrendingUp,
  AlertCircle,
  PhoneOff,
  UserCheck
} from 'lucide-react';
import DashboardStats from '../../components/dashboard/DashboardStats';
import StatCard from '../../components/dashboard/StatCard';
import RealTimeCallStats from '../../components/dashboard/RealTimeCallStats';
import AgentPerformanceCard from '../../components/dashboard/AgentPerformanceCard';
import RecentActivityItem from '../../components/dashboard/RecentActivityItem';
import CompactCallLogItem from '../../components/dashboard/CompactCallLogItem';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { analyticsAPI } from '../../services/api';

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <p className="font-bold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { isDarkMode, handleCallClick } = useUI();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await analyticsAPI.getDashboard();
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Process data for charts from backend response
  const callsByStatus = dashboardData?.data?.callsByStatus || {};
  const callsByPurpose = dashboardData?.data?.callsByPurpose || {};
  const sentimentData = dashboardData?.data?.sentimentData || {};
  const dailyCalls = dashboardData?.data?.dailyCalls || [];

  // Convert sentiment data for chart
  const sentimentChartData = Object.entries(sentimentData).map(([sentiment, count]) => ({
    name: sentiment,
    value: parseInt(count) || 0,
    color: sentiment === 'Positive' ? '#10B981' :
      sentiment === 'Neutral' ? '#F59E0B' :
        sentiment === 'Negative' ? '#EF4444' : '#9CA3AF'
  }));

  // Peak hours data from API
  const peakHoursData = dailyCalls.map(item => ({
    time: item.date || 'Unknown',
    calls: parseInt(item.calls) || 0
  }));

  // Enhanced metrics with real data
  const enhancedMetrics = [
    {
      title: "Total Calls Today",
      value: dashboardData?.data?.totalCallsToday?.toString() || "0",
      icon: Phone,
      change: "+0%",
      changeType: "positive",
      subtitle: "Today's calls"
    },
    {
      title: "Answered",
      value: dashboardData?.data?.callsByStatus?.Completed?.toString() || "0",
      icon: CheckCircle,
      change: "+0%",
      changeType: "positive",
      subtitle: "Completed calls"
    },
    {
      title: "Total Cost",
      value: `$${dashboardData?.data?.totalCost || "0.00"}`,
      icon: DollarSign,
      change: "+0%",
      changeType: "positive",
      subtitle: "Estimated cost"
    },
    {
      title: "Avg. Duration",
      value: dashboardData?.data?.avgDuration ?
        `${Math.floor(dashboardData.data.avgDuration / 60)}m ${dashboardData.data.avgDuration % 60}s` :
        "0m 0s",
      icon: Clock,
      change: "+0%",
      changeType: "positive",
      subtitle: "Average call time"
    },
    {
      title: "Active Agents",
      value: dashboardData?.data?.activeAgents?.toString() || "0",
      icon: Users,
      change: "+0",
      changeType: "positive",
      subtitle: "Currently online"
    },
    {
      title: "Success Rate",
      value: `${dashboardData?.data?.successRate || "0"}%`,
      icon: Trophy,
      change: "+0%",
      changeType: "positive",
      subtitle: "Call success rate"
    },
    {
      title: "Ongoing Calls",
      value: dashboardData?.data?.ongoingCalls?.toString() || "0",
      icon: TrendingUp,
      change: "+0",
      changeType: "positive",
      subtitle: "Currently in progress"
    },
    {
      title: "Queued Calls",
      value: dashboardData?.data?.queuedCalls?.toString() || "0",
      icon: UserCheck,
      change: "+0%",
      changeType: "positive",
      subtitle: "Waiting to connect"
    }
  ];

  // Sample recent call logs (would come from API in a real implementation)
  const recentCallLogs = [
    {
      id: "1",
      number: "+1 (555) 123-4567",
      duration: "2m 15s",
      status: "Completed",
      agent: "Agent Alpha",
      time: "2 mins ago",
      sentiment: "Positive",
      summary: "Customer was happy with the resolution.",
    },
    {
      id: "2",
      number: "+1 (555) 987-6543",
      duration: "4m 30s",
      status: "Completed",
      agent: "Agent Beta",
      time: "5 mins ago",
      sentiment: "Neutral",
      summary: "Routine inquiry about account settings.",
    },
    {
      id: "3",
      number: "+1 (555) 234-5678",
      duration: "5m 30s",
      status: "Completed",
      agent: "Agent Gamma",
      time: "10 mins ago",
      sentiment: "Neutral",
      summary: "Standard inquiry about product features.",
    },
    {
      id: "4",
      number: "+1 (555) 876-5432",
      duration: "1m 45s",
      status: "Missed",
      agent: "Agent Delta",
      time: "12 mins ago",
      sentiment: "N/A",
      summary: "Customer hung up before connection.",
    },
    {
      id: "5",
      number: "+1 (555) 345-6789",
      duration: "3m 20s",
      status: "Completed",
      agent: "Agent Epsilon",
      time: "15 mins ago",
      sentiment: "Positive",
      summary: "Successfully upgraded to premium plan.",
    }
  ];

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
      {/* ===== Enhanced Summary Stats ===== */}
      <DashboardStats stats={enhancedMetrics} />

      {/* ===== Real-time Call Stats ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RealTimeCallStats
          title="Ongoing Calls"
          count="0"
          icon={Phone}
          color="text-blue-500"
          bgColor="bg-blue-100 dark:bg-blue-900/30"
        />
        <RealTimeCallStats
          title="Queued Calls"
          count="0"
          icon={Clock}
          color="text-yellow-500"
          bgColor="bg-yellow-100 dark:bg-yellow-900/30"
        />
        <RealTimeCallStats
          title="Active Agents"
          count="0"
          icon={UserCheck}
          color="text-green-500"
          bgColor="bg-green-100 dark:bg-green-900/30"
        />
      </div>

      {/* ===== Charts and Agent Performance ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Call Volume by Hour */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Call Volume by Hour (Business Hours)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="time" stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Bar dataKey="calls" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ThumbsUp className="mr-2" size={20} />
            Sentiment Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sentimentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Agent Performance and Recent Activity ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Performance Leaderboard */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Trophy className="mr-2" size={20} />
            Agent Performance Leaderboard
          </h3>
          <div className="space-y-4">
            <AgentPerformanceCard
              rank={1}
              name="Agent Gamma"
              successRate="95.7%"
              change="up"
              calls={289}
              avgHandleTime="2m 50s"
            />
            <AgentPerformanceCard
              rank={2}
              name="Agent Alpha"
              successRate="89.1%"
              change="down"
              calls={235}
              avgHandleTime="3m 15s"
            />
            <AgentPerformanceCard
              rank={3}
              name="Agent Beta"
              successRate="87.3%"
              change="up"
              calls={198}
              avgHandleTime="3m 45s"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <RecentActivityItem
              icon={Phone}
              title="New call started"
              description="Agent Alpha initiated a call to +1 (555) 123-4567"
              time="2 mins ago"
              type="success"
            />
            <RecentActivityItem
              icon={CheckCircle}
              title="Call completed"
              description="Agent Gamma finished a 5m 30s call with positive sentiment"
              time="10 mins ago"
              type="info"
            />
            <RecentActivityItem
              icon={PhoneOff}
              title="Call missed"
              description="Agent Delta missed a call from +1 (555) 876-5432"
              time="12 mins ago"
              type="warning"
            />
            <RecentActivityItem
              icon={UserCheck}
              title="Agent status updated"
              description="Agent Epsilon changed status to 'Online'"
              time="15 mins ago"
              type="info"
            />
          </div>
        </div>
      </div>

      {/* ===== Recent Call Logs ===== */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Call Logs
        </h3>
        <div className="space-y-3">
          {recentCallLogs.map((log) => (
            <CompactCallLogItem
              key={log.id}
              call={log}
              onClick={() => handleCallClick(log)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;