import { useEffect, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  Radar, RadarChart, ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis,
  Line, LineChart, Area, AreaChart, Pie, PieChart, Cell
} from "recharts";
import {
  agentPerformanceData, keywordData, purposeSentimentData, analyticsData,
  agentLeaderboardData, dailyCallData, callPurposeData
} from "../../api/mockData";
import { SENTIMENT_COLORS } from "../../lib/constants";
import { TrendingUp, Users, DollarSign, BarChart3, PieChartIcon } from 'lucide-react';
import { useUI } from "../../context/UIContext"; // dark mode context

export const Analytics = () => {
  const { isDarkMode } = useUI();
  const [activeTab, setActiveTab] = useState('overview');

  // ✅ Sync Tailwind’s dark mode with your context
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // ✅ Treemap custom node
  const CustomizedTreemapContent = (props) => {
    const { depth, x, y, width, height, index, name, size } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: keywordData[index].color,
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={12} fillOpacity={0.9}>
          {size}
        </text>
      </g>
    );
  };

  // ✅ Summary calculations
  const totalCalls = dailyCallData.reduce((sum, day) => sum + day.calls, 0);
  const avgDailyCalls = Math.round(totalCalls / dailyCallData.length);
  const totalCost = analyticsData.costVsConversion.reduce((sum, item) => sum + item.cost, 0);
  const avgConversionRate = (
    analyticsData.costVsConversion.reduce((sum, item) => sum + item.conversion, 0) /
    analyticsData.costVsConversion.length
  ).toFixed(1);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* ===== Summary Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Calls */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Users className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Calls</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{totalCalls.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Avg Daily Calls */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
              <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Daily Calls</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{avgDailyCalls}</p>
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
              <DollarSign className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">${totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Avg Conversion */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/50">
              <BarChart3 className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Conversion</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{avgConversionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {['overview', 'performance', 'sentiment', 'keywords'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ===== Tab Content ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        {(activeTab === 'overview' || activeTab === 'performance') && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Agent Performance Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={agentPerformanceData}>
                <PolarGrid stroke={isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "transparent" }} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }} />
                <Legend />
                <Radar name="Agent Alpha" dataKey="Agent Alpha" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
                <Radar name="Agent Gamma" dataKey="Agent Gamma" stroke="#34D399" fill="#34D399" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Sentiment Breakdown */}
        {(activeTab === 'overview' || activeTab === 'sentiment') && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <PieChartIcon className="mr-2" size={20} />
              Call Purpose Sentiment
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={purposeSentimentData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <XAxis type="number" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155" }} />
                <YAxis type="category" dataKey="purpose" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155", fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }} />
                <Legend />
                <Bar dataKey="positive" stackId="a" fill={SENTIMENT_COLORS.Positive} name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill={SENTIMENT_COLORS.Neutral} name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill={SENTIMENT_COLORS.Negative} name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Keywords Treemap */}
        {(activeTab === 'overview' || activeTab === 'keywords') && (
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Top Keyword Mentions
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={keywordData}
                dataKey="size"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedTreemapContent />}
              />
            </ResponsiveContainer>
          </div>
        )}

        {/* Daily Calls Chart */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Daily Call Volume
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyCallData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <XAxis dataKey="name" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155" }} />
                <YAxis tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155" }} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }} />
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="calls" stroke="#4F46E5" fill="url(#colorCalls)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Cost vs Conversion */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="mr-2" size={20} />
              Cost vs Conversion Rate
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.costVsConversion}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <XAxis dataKey="month" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155" }} />
                <YAxis yAxisId="left" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155" }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: isDarkMode ? "#CBD5E1" : "#334155" }} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="cost" stroke="#F59E0B" name="Cost ($)" />
                <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#10B981" name="Conversion (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Call Purpose Distribution */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <PieChartIcon className="mr-2" size={20} />
              Call Purpose Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={callPurposeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {callPurposeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#4F46E5', '#34D399', '#FBBF24', '#F87171'][index % 4]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </main>
  );
};
