import React, { useState, useEffect } from "react";
import { Phone, PhoneOff, Mic, MicOff, Volume2, User, Clock, Search, Filter, Plus, Play, Pause, Square, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import DashboardPage from "../../components/dashboard/DashboardPage";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardActionBar from "../../components/dashboard/DashboardActionBar";
import FilterDropdown from "../../components/shared/FilterDropdown";
import FilterOption from "../../components/shared/FilterOption";
import Modal from "../../components/shared/Modal";
import FormInput from "../../components/shared/FormInput";
import FormSelect from "../../components/shared/FormSelect";
import FormButton from "../../components/shared/FormButton";
import CompactCallLogItem from "../../components/dashboard/CompactCallLogItem";
import { toast } from "react-hot-toast";
import { callAPI } from "../../services/api";
import socketService from "../../services/socket";
import { useInteractions } from "./useInteractions.js";

const LiveCalls = () => {
  const [ongoingCalls, setOngoingCalls] = useState([]);
  const [queuedCalls, setQueuedCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    agent: "",
    purpose: ""
  });
  const [showNewCallModal, setShowNewCallModal] = useState(false);
  const [newCallData, setNewCallData] = useState({
    number: "",
    purpose: "Support",
    agent: "Agent Alpha"
  });
  const { activeInteraction, handleInteraction, endInteraction } = useInteractions();

  // Fetch live calls from backend
  useEffect(() => {
    const fetchLiveCalls = async () => {
      try {
        setLoading(true);
        const response = await callAPI.getLiveCalls();
        // Handle both direct data and data.data structures
        const callsData = response.data.data || response.data || {};
        const { ongoing = [], queued = [] } = callsData;
        setOngoingCalls(Array.isArray(ongoing) ? ongoing : []);
        setQueuedCalls(Array.isArray(queued) ? queued : []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch live calls:", error);
        toast.error("Failed to load live calls");
        setOngoingCalls([]);
        setQueuedCalls([]);
        setLoading(false);
      }
    };

    fetchLiveCalls();

    // Set up Socket.io real-time listeners
    socketService.on('call:started', (call) => {
      console.log('Call started:', call);
      if (call.status === 'Ongoing') {
        setOngoingCalls(prev => {
          // Avoid duplicates
          if (prev.find(c => c.id === call.id)) return prev;
          return [...prev, call];
        });
      } else if (call.status === 'Queued') {
        setQueuedCalls(prev => {
          if (prev.find(c => c.id === call.id)) return prev;
          return [...prev, call];
        });
      }
      toast.success(`New call from ${call.number || 'Unknown'}`);
    });

    socketService.on('call:ended', (call) => {
      console.log('Call ended:', call);
      setOngoingCalls(prev => prev.filter(c => c.id !== call.id));
      setQueuedCalls(prev => prev.filter(c => c.id !== call.id));
      toast.info(`Call with ${call.number || 'Unknown'} ended`);
    });

    socketService.on('agent:statusUpdate', (data) => {
      console.log('Agent status updated:', data);
      // Refresh calls to get updated agent statuses
      fetchLiveCalls();
    });

    // Cleanup listeners on unmount
    return () => {
      socketService.off('call:started');
      socketService.off('call:ended');
      socketService.off('agent:statusUpdate');
    };
  }, []);

  // Filter calls based on search and filters
  const filteredOngoingCalls = ongoingCalls.filter(call =>
    (call.number && call.number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (call.agent && call.agent.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (call.purpose && call.purpose.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(call => {
    if (filters.agent && call.agent !== filters.agent) return false;
    if (filters.purpose && call.purpose !== filters.purpose) return false;
    return true;
  });

  const filteredQueuedCalls = queuedCalls.filter(call =>
    (call.number && call.number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (call.purpose && call.purpose.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(call => {
    if (filters.purpose && call.purpose !== filters.purpose) return false;
    return true;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      agent: "",
      purpose: ""
    });
  };

  // Handle new call creation
  const handleStartNewCall = async () => {
    if (!newCallData.number.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    try {
      const response = await callAPI.startCall(newCallData);
      // Handle both direct data and data.data structures
      const newCall = response.data.data || response.data;
      setOngoingCalls(prev => [...prev, newCall]);
      setNewCallData({ number: '', agent: 'Agent Alpha', purpose: 'General Inquiry' });
      setShowNewCallModal(false);
      toast.success("New call started successfully");
    } catch (error) {
      console.error("Failed to start new call:", error);
      toast.error("Failed to start new call");
    }
  };

  const handleNewCallChange = (field, value) => {
    setNewCallData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const endCall = async (callId) => {
    try {
      await callAPI.endCall(callId);
      setOngoingCalls(prev => prev.filter(call => call.id !== callId));
      toast.success("Call ended successfully");
    } catch (error) {
      console.error("Failed to end call:", error);
      toast.error("Failed to end call");
    }
  };

  // Get unique agents and purposes for filter dropdowns
  const uniqueAgents = [...new Set(ongoingCalls.map(call => call.agent).filter(Boolean))];
  const uniquePurposes = [...new Set([...ongoingCalls, ...queuedCalls].map(call => call.purpose).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading live calls...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardPage>
      <DashboardHeader
        title="Live Calls"
        subtitle="Monitor and manage ongoing calls in real-time"
        stats={[
          { label: "Ongoing Calls", value: ongoingCalls.length, icon: Phone, color: "text-blue-500" },
          { label: "Queued Calls", value: queuedCalls.length, icon: Clock, color: "text-yellow-500" },
          { label: "Active Agents", value: uniqueAgents.length, icon: User, color: "text-green-500" }
        ]}
      />

      <DashboardActionBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search calls..."
        actions={
          <>
            <FilterDropdown
              onApply={() => { }}
              onClearFilters={clearFilters}
            >
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
            </FilterDropdown>
            <button
              onClick={() => setShowNewCallModal(true)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} />
              New Call
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Ongoing Calls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Phone className="mr-2 text-blue-500" size={20} />
              Ongoing Calls ({filteredOngoingCalls.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-280px)] overflow-y-auto">
            {filteredOngoingCalls.length > 0 ? (
              filteredOngoingCalls.map((call) => (
                <div key={call.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{call.number || 'Unknown Number'}</span>
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {call.status || 'Unknown'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {call.agent || 'Unknown Agent'} • {call.purpose || 'Unknown Purpose'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {call.startTime ? Math.floor((Date.now() - new Date(call.startTime).getTime()) / 1000) : 0}s
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Started now
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleInteraction(call.id, 'listen', call.number)}
                        className={`p-2 rounded-lg ${activeInteraction.callId === call.id && activeInteraction.type === 'listen'
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        title="Listen"
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        onClick={() => handleInteraction(call.id, 'whisper', call.number)}
                        className={`p-2 rounded-lg ${activeInteraction.callId === call.id && activeInteraction.type === 'whisper'
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        title="Whisper"
                      >
                        <Mic size={16} />
                      </button>
                      <button
                        onClick={() => handleInteraction(call.id, 'barge', call.number)}
                        className={`p-2 rounded-lg ${activeInteraction.callId === call.id && activeInteraction.type === 'barge'
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        title="Barge In"
                      >
                        <User size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => endCall(call.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/30"
                      title="End Call"
                    >
                      <PhoneOff size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Phone className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No ongoing calls</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  There are currently no active calls.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Queued Calls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Clock className="mr-2 text-yellow-500" size={20} />
              Queued Calls ({filteredQueuedCalls.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-280px)] overflow-y-auto">
            {filteredQueuedCalls.length > 0 ? (
              filteredQueuedCalls.map((call) => (
                <div key={call.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{call.number || 'Unknown Number'}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {call.purpose || 'Unknown Purpose'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {call.queueTime ? Math.floor((Date.now() - new Date(call.queueTime).getTime()) / 1000) : 0}s wait
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-3">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        // In a real app, this would assign the call to an agent
                        toast.success(`Call assigned to Agent Alpha`);
                        setQueuedCalls(prev => prev.filter(c => c.id !== call.id));
                      }}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No queued calls</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  There are currently no calls in the queue.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Call Modal */}
      <Modal
        isOpen={showNewCallModal}
        onClose={() => setShowNewCallModal(false)}
        title="Start New Call"
        actions={
          <>
            <FormButton
              variant="outline"
              onClick={() => setShowNewCallModal(false)}
            >
              Cancel
            </FormButton>
            <FormButton
              onClick={handleStartNewCall}
            >
              <Phone size={16} className="mr-1" />
              Start Call
            </FormButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Phone Number"
            type="tel"
            value={newCallData.number}
            onChange={(value) => handleNewCallChange('number', value)}
            placeholder="+1 (555) 123-4567"
          />

          <FormSelect
            label="Purpose"
            value={newCallData.purpose}
            onChange={(value) => handleNewCallChange('purpose', value)}
            options={[
              { value: "Support", label: "Support" },
              { value: "Sales", label: "Sales" },
              { value: "Follow-up", label: "Follow-up" },
              { value: "General Inquiry", label: "General Inquiry" }
            ]}
          />

          <FormSelect
            label="Assign to Agent"
            value={newCallData.agent}
            onChange={(value) => handleNewCallChange('agent', value)}
            options={[
              { value: "Agent Alpha", label: "Agent Alpha" },
              { value: "Agent Beta", label: "Agent Beta" },
              { value: "Agent Gamma", label: "Agent Gamma" }
            ]}
          />
        </div>
      </Modal>
    </DashboardPage>
  );
};

export default LiveCalls;