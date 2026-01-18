import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { Download, Filter, Calendar, TrendingUp, BarChart3, PieChartIcon } from "lucide-react";
import DashboardPage from "../../components/dashboard/DashboardPage";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SearchInput from "../../components/shared/SearchInput";
import FilterDropdown from "../../components/shared/FilterDropdown";
import FilterOption from "../../components/shared/FilterOption";
import { analyticsData, purposeSentimentData } from "../../api/mockData";
import { SENTIMENT_COLORS, PURPOSE_COLORS } from "../../lib/constants";
import { toast } from "react-hot-toast";

export const AdvancedReporting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dateRange: "last30days",
    agent: "all",
    callType: "all"
  });

  const handleExport = () => {
    // console.log("Exporting advanced report...");
    toast.success("Advanced report exported successfully");
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "last30days",
      agent: "all",
      callType: "all"
    });
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardPage>
      <DashboardHeader
        title="Advanced Reporting"
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search reports..."
              className="w-64"
            />
            <FilterDropdown
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            >
              <FilterOption
                label="Date Range"
                type="select"
                value={filters.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                options={["last7days", "last30days", "last90days"]}
                optionLabels={["Last 7 Days", "Last 30 Days", "Last 90 Days"]}
              />
              <FilterOption
                label="Agent"
                type="select"
                value={filters.agent}
                onChange={(value) => handleFilterChange('agent', value)}
                options={["all", "Agent Alpha", "Agent Beta", "Agent Gamma"]}
              />
              <FilterOption
                label="Call Type"
                type="select"
                value={filters.callType}
                onChange={(value) => handleFilterChange('callType', value)}
                options={["all", "Inbound", "Outbound"]}
              />
            </FilterDropdown>
            <button 
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download size={16} />
              Export Report
            </button>
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cost vs Conversion Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Cost vs Conversion Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.costVsConversion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="cost" 
                stroke="#4F46E5" 
                name="Cost ($)" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="conversion" 
                stroke="#10B981" 
                name="Conversion Rate (%)" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Sentiment Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Sentiment Trend Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.sentimentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="positive" fill={SENTIMENT_COLORS.Positive} name="Positive" />
              <Bar dataKey="neutral" fill={SENTIMENT_COLORS.Neutral} name="Neutral" />
              <Bar dataKey="negative" fill={SENTIMENT_COLORS.Negative} name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Peak Hours Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calendar className="mr-2" size={20} />
            Peak Call Hours
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.peakTimes[0].hours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="volume" fill="#4F46E5" name="Call Volume" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Call Purpose Sentiment */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <PieChartIcon className="mr-2" size={20} />
            Call Purpose Sentiment Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={purposeSentimentData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="positive"
                nameKey="purpose"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {purposeSentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PURPOSE_COLORS[index % PURPOSE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardPage>
  );
};

export default AdvancedReporting;