import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  X,
  Download,
  Calendar,
  Phone,
  User,
  TrendingUp,
  BarChart2,
  Eye,
  Play,
  Pause,
  Mic,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Voicemail,
  MoreVertical,
  Copy,
  Flag,
  Star,
  RefreshCw
} from "lucide-react";
import StatusBadge from "../../components/shared/StatusBadge";
import { formatDuration as formatDurationSeconds } from "../../lib/utils";
import { useUI } from "../../context/UIContext";
import { confirmAction } from "../../components/shared/ConfirmationDialog";
import DashboardPage from "../../components/dashboard/DashboardPage";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/DashboardTable";
import DashboardActionBar from "../../components/dashboard/DashboardActionBar";
import SearchInput from "../../components/shared/SearchInput";
import FilterDropdown from "../../components/shared/FilterDropdown";
import FilterOption from "../../components/shared/FilterOption";
import CompactCallLogItem from "../../components/dashboard/CompactCallLogItem";
import { callLogAPI } from "../../services/api";
import { toast } from "react-hot-toast";

const CallLogs = () => {
  const { handleCallClick, selectedCall, handleCloseModal, expandedLog, toggleLogExpansion, showToast } = useUI();
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [filters, setFilters] = useState({
    status: "",
    direction: "",
    agent: "",
    purpose: "",
    sentiment: "",
    startDate: "",
    endDate: "",
    minDuration: "",
    maxDuration: "",
    minCost: "",
    maxCost: ""
  });

  const [selectedLogs, setSelectedLogs] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [summaryStats, setSummaryStats] = useState({
    totalCalls: 0,
    completionRate: 0,
    totalDuration: "0s",
    totalCost: "0.00"
  });

  // Fetch call logs from backend
  const fetchCallLogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder,
        ...filters
      };

      // Add search to agent filter if searching
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await callLogAPI.getAll(params);
      const data = response.data.data || response.data;

      setCallLogs(data.calls || []);
      setPagination(prev => ({
        ...prev,
        total: data.pagination?.total || 0,
        pages: data.pagination?.pages || 0
      }));

      // Fetch stats for summary
      const statsResponse = await callLogAPI.getStats(filters);
      const statsData = statsResponse.data.data || statsResponse.data;
      setSummaryStats({
        totalCalls: statsData.totalCalls || 0,
        completionRate: statsData.completionRate || 0,
        totalDuration: formatDurationSeconds(statsData.totalDuration || 0),
        totalCost: (statsData.totalCost || 0).toFixed(2)
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch call logs:", error);
      toast.error("Failed to load call logs");
      setCallLogs([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
  }, [pagination.page, pagination.limit, sortConfig, filters, searchTerm]);

  const requestSort = (key) => {
    const newOrder = sortConfig.sortBy === key && sortConfig.sortOrder === "ASC" ? "DESC" : "ASC";
    setSortConfig({ sortBy: key, sortOrder: newOrder });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      direction: "",
      agent: "",
      purpose: "",
      sentiment: "",
      startDate: "",
      endDate: "",
      minDuration: "",
      maxDuration: "",
      minCost: "",
      maxCost: ""
    });
    setSearchTerm("");
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const exportData = () => {
    // In a real app, this would call an export API endpoint
    const dataStr = JSON.stringify(callLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'call-logs-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showToast("Current page exported successfully!");
  };

  const handleSelectLog = (logId) => {
    setSelectedLogs(prev => {
      if (prev.includes(logId)) {
        return prev.filter(id => id !== logId);
      } else {
        return [...prev, logId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedLogs.length === callLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(callLogs.map(log => log.id));
    }
  };

  const handleBulkAction = async () => {
    if (bulkAction && selectedLogs.length > 0) {
      switch (bulkAction) {
        case "export":
          const selectedData = callLogs.filter(log => selectedLogs.includes(log.id));
          const dataStr = JSON.stringify(selectedData, null, 2);
          const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
          const exportFileDefaultName = 'selected-call-logs.json';
          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', dataUri);
          linkElement.setAttribute('download', exportFileDefaultName);
          linkElement.click();
          showToast(`${selectedLogs.length} call logs exported successfully!`);
          break;
        case "flag":
          showToast(`${selectedLogs.length} call logs flagged for review!`);
          break;
        case "delete":
          const shouldDelete = await confirmAction({
            title: "Delete Call Logs",
            message: `Are you sure you want to delete ${selectedLogs.length} call logs?`,
            confirmText: "Delete",
            confirmButtonClass: "bg-red-600 hover:bg-red-700"
          });

          if (shouldDelete) {
            try {
              // Call delete API for each selected log
              await Promise.all(selectedLogs.map(id => callLogAPI.delete(id)));
              showToast(`${selectedLogs.length} call logs deleted successfully!`);
              setSelectedLogs([]);
              fetchCallLogs(); // Refresh list
            } catch (error) {
              console.error("Failed to delete logs:", error);
              toast.error("Failed to delete some logs");
            }
          }
          break;
        default:
          showToast(`Bulk action "${bulkAction}" performed on ${selectedLogs.length} call logs!`);
      }
      setBulkAction("");
    }
  };

  const toggleLogDetails = (log) => {
    // This functionality seems to rely on UIContext or local state not fully visible in snippet
    // Assuming handleCallClick opens details or similar
    handleCallClick(log);
  };

  // Get unique agents and purposes for filter dropdowns - in real app these should come from API
  // For now we'll use what we have in the current page or empty defaults
  const uniqueAgents = useMemo(() => {
    return [...new Set(callLogs.map(log => log.agent))];
  }, [callLogs]);

  const uniquePurposes = useMemo(() => {
    const purposes = callLogs.map(log => log.purpose).filter(Boolean);
    return [...new Set(purposes)];
  }, [callLogs]);

  return (
    <DashboardPage>
      <DashboardStats
        stats={[
          {
            title: "Total Calls",
            value: summaryStats.totalCalls,
            icon: Phone,
            change: "+12%",
            changeType: "positive"
          },
          {
            title: "Completion Rate",
            value: `${summaryStats.completionRate}%`,
            icon: TrendingUp,
            change: "+3%",
            changeType: "positive"
          },
          {
            title: "Total Duration",
            value: summaryStats.totalDuration,
            icon: Calendar,
            change: "-5m",
            changeType: "negative"
          },
          {
            title: "Total Cost",
            value: `$${summaryStats.totalCost}`,
            icon: User,
            change: "+$120",
            changeType: "negative"
          }
        ]}
      />

      <DashboardHeader
        title="Call Log History"
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by number, agent, or purpose..."
              className="w-64 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg"
            />
            <FilterDropdown
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            >
              <FilterOption
                label="Status"
                type="select"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                options={["", "Completed", "Missed", "Voicemail"]}
              />
              <FilterOption
                label="Direction"
                type="select"
                value={filters.direction}
                onChange={(value) => handleFilterChange('direction', value)}
                options={["", "Inbound", "Outbound"]}
              />
              <FilterOption
                label="Agent"
                type="select"
                value={filters.agent}
                onChange={(value) => handleFilterChange('agent', value)}
                options={["", ...uniqueAgents]}
              />
              <FilterOption
                label="Purpose"
                type="select"
                value={filters.purpose}
                onChange={(value) => handleFilterChange('purpose', value)}
                options={["", ...uniquePurposes]}
              />
              <FilterOption
                label="Duration (seconds)"
                type="number"
                value={{ min: filters.minDuration, max: filters.maxDuration }}
                onChange={(value) => {
                  handleFilterChange('minDuration', value.min);
                  handleFilterChange('maxDuration', value.max);
                }}
                min="0"
                max="3600"
              />
              <FilterOption
                label="Cost ($)"
                type="number"
                value={{ min: filters.minCost, max: filters.maxCost }}
                onChange={(value) => {
                  handleFilterChange('minCost', value.min);
                  handleFilterChange('maxCost', value.max);
                }}
                min="0"
                max="100"
              />
              <FilterOption
                label="Date Range"
                type="select"
                value={filters.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                options={["", "today", "week", "month"]}
              />
            </FilterDropdown>
            <button
              onClick={exportData}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download size={16} />
              Export Page
            </button>
            <button
              onClick={() => {
                fetchCallLogs();
                showToast.success('Data refreshed successfully!');
              }}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </>
        }
      />

      {/* Compact View Toggle */}
      <div className="mb-4 flex justify-end">
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1 text-sm rounded-md ${viewMode === "table"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
              : "text-gray-600 dark:text-gray-300"
              }`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-sm rounded-md ${viewMode === "grid"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
              : "text-gray-600 dark:text-gray-300"
              }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : viewMode === "table" ? (
        <DashboardTable
          data={callLogs}
          columns={[
            {
              key: 'selection',
              label: (
                <input
                  type="checkbox"
                  checked={selectedLogs.length === callLogs.length && callLogs.length > 0}
                  onChange={handleSelectAll}
                  className="rounded"
                />
              ),
              render: (value, row) => (
                <input
                  type="checkbox"
                  checked={selectedLogs.includes(row.id)}
                  onChange={() => handleSelectLog(row.id)}
                  className="rounded"
                />
              )
            },
            {
              key: 'date',
              label: 'Date',
              render: (value) => new Date(value).toLocaleString()
            },
            {
              key: 'direction',
              label: 'Direction',
              render: (value) => (
                value === "Inbound" ? (
                  <ArrowRight size={16} className="text-green-500" />
                ) : (
                  <ArrowLeft size={16} className="text-blue-500" />
                )
              )
            },
            {
              key: 'number',
              label: 'Number',
              cellClassName: 'font-mono'
            },
            {
              key: 'agent',
              label: 'Agent'
            },
            {
              key: 'purpose',
              label: 'Purpose',
              render: (value) => value || "N/A"
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />
            },
            {
              key: 'duration',
              label: 'Duration',
              render: (value) => formatDurationSeconds(value)
            },
            {
              key: 'cost',
              label: 'Cost',
              render: (value) => `$${value}`,
              cellClassName: 'text-right'
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (value, row) => (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCallClick(row)}
                    className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => toggleLogDetails(row)}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="More Actions"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              )
            }
          ]}
          pagination={true}
          itemsPerPage={pagination.limit}
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
          totalRecords={pagination.total}
        >
          <DashboardActionBar
            selectedCount={selectedLogs.length}
            onClearSelection={() => setSelectedLogs([])}
            actions={
              <>
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
                >
                  <option value="">Select Action</option>
                  <option value="export">Export Selected</option>
                  <option value="flag">Flag for Review</option>
                  <option value="delete">Delete</option>
                </select>
                <button
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
                >
                  Apply
                </button>
              </>
            }
          />
        </DashboardTable>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {callLogs.map((log) => (
            <CompactCallLogItem
              key={log.id}
              call={log}
              onClick={handleCallClick}
            />
          ))}
        </div>
      )}
    </DashboardPage>
  );
};

export default CallLogs;