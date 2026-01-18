import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  MoreVertical, 
  Edit, 
  Copy, 
  Trash2, 
  Play, 
  Pause, 
  Settings,
  RefreshCw
} from "lucide-react";
import DashboardPage from "../../components/dashboard/DashboardPage";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardActionBar from "../../components/dashboard/DashboardActionBar";
import FilterDropdown from "../../components/shared/FilterDropdown";
import FilterOption from "../../components/shared/FilterOption";
import Modal from "../../components/shared/Modal";
import FormInput from "../../components/shared/FormInput";
import FormTextarea from "../../components/shared/FormTextarea";
import FormSelect from "../../components/shared/FormSelect";
import FormButton from "../../components/shared/FormButton";
import { confirmAction } from "../../components/shared/ConfirmationDialog";
import { toast } from "react-hot-toast";
import { agentAPI } from "../../services/api";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    modelType: ""
  });
  const [bulkAction, setBulkAction] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAgentData, setNewAgentData] = useState({
    name: "",
    description: "",
    modelType: "gpt-4",
    personality: "Professional",
    tone: "Friendly",
    language: "English",
    maxTokens: 1000,
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    customInstructions: "",
    callObjective: "General Support",
    callStrategy: "Problem Resolution",
    escalationThreshold: 80,
    useKnowledgeBase: true,
    callScript: ""
  });

  // Fetch agents from backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await agentAPI.getAll();
        // Handle both direct data and data.data structures
        const agentsData = response.data.data || response.data || [];
        setAgents(Array.isArray(agentsData) ? agentsData : []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
        toast.error("Failed to load agents");
        setAgents([]); // Set to empty array on error
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Filter agents based on search and filters
  const filteredAgents = agents.filter(agent =>
    (agent.name && agent.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (agent.status && agent.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (agent.description && agent.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(agent => {
    if (filters.status && agent.status !== filters.status) return false;
    if (filters.modelType && agent.modelType !== filters.modelType) return false;
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
      status: "",
      modelType: ""
    });
  };

  const handleBulkAction = async () => {
    if (bulkAction) {
      if (bulkAction === "activate") {
        // In a real app, this would make API calls to update agent statuses
        setAgents(prevAgents => 
          prevAgents.map(agent => 
            agent.status === "Offline" ? {...agent, status: "Online"} : agent
          )
        );
        toast.success("All offline agents activated successfully!");
      } else if (bulkAction === "deactivate") {
        // In a real app, this would make API calls to update agent statuses
        setAgents(prevAgents => 
          prevAgents.map(agent => 
            agent.status === "Online" || agent.status === "In a Call" ? {...agent, status: "Offline"} : agent
          )
        );
        toast.success("All online agents deactivated successfully!");
      }
      setBulkAction("");
    }
  };

  const exportAgents = () => {
    const dataStr = JSON.stringify(agents, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'agents.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Agents exported successfully!");
  };

  const importAgents = () => {
    toast.success("Import functionality would open a file dialog");
  };

  const handleCreateAgent = async () => {
    try {
      const response = await agentAPI.create(newAgentData);
      // Handle both direct data and data.data structures
      const newAgent = response.data.data || response.data;
      setAgents(prevAgents => [...prevAgents, newAgent]);
      setShowCreateModal(false);
      setNewAgentData({
        name: "",
        description: "",
        modelType: "gpt-4",
        personality: "Professional",
        tone: "Friendly",
        language: "English",
        maxTokens: 1000,
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0,
        presencePenalty: 0,
        customInstructions: "",
        callObjective: "General Support",
        callStrategy: "Problem Resolution",
        escalationThreshold: 80,
        useKnowledgeBase: true,
        callScript: ""
      });
      toast.success("Agent created successfully!");
    } catch (error) {
      console.error("Failed to create agent:", error);
      toast.error("Failed to create agent");
    }
  };

  const handleInputChange = (field, value) => {
    setNewAgentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const duplicateAgent = async (agentId) => {
    try {
      const response = await agentAPI.duplicate(agentId);
      // Handle both direct data and data.data structures
      const duplicatedAgent = response.data.data || response.data;
      setAgents(prevAgents => [...prevAgents, duplicatedAgent]);
      toast.success("Agent duplicated successfully!");
    } catch (error) {
      console.error("Failed to duplicate agent:", error);
      toast.error("Failed to duplicate agent");
    }
  };

  const deleteAgent = async (agentId) => {
    const agentToDelete = agents.find(agent => agent.id === agentId);
    if (agentToDelete) {
      const shouldDelete = await confirmAction({
        title: "Delete Agent",
        message: `Are you sure you want to delete agent "${agentToDelete.name}"?`,
        confirmText: "Delete",
        confirmButtonClass: "bg-red-600 hover:bg-red-700"
      });
      
      if (shouldDelete) {
        try {
          await agentAPI.delete(agentId);
          setAgents(prevAgents => prevAgents.filter(agent => agent.id !== agentId));
          toast.success(`Agent "${agentToDelete.name}" deleted successfully!`);
        } catch (error) {
          console.error("Failed to delete agent:", error);
          toast.error("Failed to delete agent");
        }
      }
    }
  };

  // Calculate summary statistics
  const totalAgents = agents.length;
  const onlineAgents = agents.filter(agent => agent.status === "Online" || agent.status === "In a Call").length;
  const offlineAgents = totalAgents - onlineAgents;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading agents...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardPage>
      <DashboardHeader
        title="Agent Models"
        subtitle="Manage your AI calling agents"
        stats={[
          { label: "Total Agents", value: totalAgents },
          { label: "Online", value: onlineAgents },
          { label: "Offline", value: offlineAgents }
        ]}
      />
      
      <DashboardActionBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search agents..."
        actions={
          <>
            <FilterDropdown
              onApply={() => {}}
              onClearFilters={clearFilters}
            >
              <FilterOption
                label="Status"
                type="select"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                options={["", "Online", "Offline", "In a Call", "Training"]}
              />
              <FilterOption
                label="Model Type"
                type="select"
                value={filters.modelType}
                onChange={(value) => handleFilterChange('modelType', value)}
                options={["", "gpt-4", "gpt-3.5", "claude", "llama"]}
              />
            </FilterDropdown>
            <button 
              onClick={exportAgents}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Download size={16} />
              Export
            </button>
            <button 
              onClick={importAgents}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Upload size={16} />
              Import
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} />
              Create Agent
            </button>
          </>
        }
      />
      
      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <img 
                    src={agent.avatar || 'https://placehold.co/64x64/A0AEC0/4A5568?text=AG'} 
                    alt={agent.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">{agent.name || 'Unnamed Agent'}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{agent.modelType || 'Unknown Model'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.status === "Online" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                      : agent.status === "In a Call" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                        : agent.status === "Training" 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" 
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}>
                    {agent.status || 'Unknown'}
                  </span>
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {agent.description || "No description provided"}
              </p>
              
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Calls</p>
                  <p className="font-medium text-gray-900 dark:text-white">{agent.total_calls || agent.totalCalls || 0}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Avg. Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{agent.avg_handle_time || agent.avgHandleTime || '0m 0s'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Success</p>
                  <p className="font-medium text-gray-900 dark:text-white">{agent.success_rate || agent.successRate || '0%'}</p>
                </div>
              </div>
            </div>
            
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <div className="flex space-x-2">
                <button 
                  onClick={() => duplicateAgent(agent.id)}
                  className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  title="Duplicate"
                >
                  <Copy size={16} />
                </button>
                <button 
                  className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  title={agent.status === "Online" || agent.status === "In a Call" ? "Pause" : "Activate"}
                >
                  {agent.status === "Online" || agent.status === "In a Call" ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </button>
                <button 
                  onClick={() => deleteAgent(agent.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No agents found matching your criteria.</p>
        </div>
      )}
      
      {/* Create Agent Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Agent"
        size="lg"
        actions={
          <>
            <FormButton
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </FormButton>
            <FormButton
              onClick={handleCreateAgent}
            >
              <Plus size={16} className="mr-1" />
              Create Agent
            </FormButton>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
              <Settings className="mr-2" size={18} />
              Basic Configuration
            </h4>
            
            <div className="space-y-4">
              <FormInput
                label="Agent Name"
                type="text"
                value={newAgentData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="e.g., Sales Support Agent"
              />
              
              <FormTextarea
                label="Description"
                value={newAgentData.description}
                onChange={(value) => handleInputChange('description', value)}
                placeholder="Describe what this agent does..."
                rows={3}
              />
              
              <FormSelect
                label="Model Type"
                value={newAgentData.modelType}
                onChange={(value) => handleInputChange('modelType', value)}
                options={[
                  { value: "gpt-4", label: "GPT-4" },
                  { value: "gpt-3.5", label: "GPT-3.5" },
                  { value: "claude", label: "Claude" },
                  { value: "llama", label: "Llama" }
                ]}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormSelect
                  label="Personality"
                  value={newAgentData.personality}
                  onChange={(value) => handleInputChange('personality', value)}
                  options={[
                    { value: "Professional", label: "Professional" },
                    { value: "Friendly", label: "Friendly" },
                    { value: "Casual", label: "Casual" },
                    { value: "Formal", label: "Formal" }
                  ]}
                />
                
                <FormSelect
                  label="Tone"
                  value={newAgentData.tone}
                  onChange={(value) => handleInputChange('tone', value)}
                  options={[
                    { value: "Friendly", label: "Friendly" },
                    { value: "Authoritative", label: "Authoritative" },
                    { value: "Empathetic", label: "Empathetic" },
                    { value: "Neutral", label: "Neutral" }
                  ]}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
              <Settings className="mr-2" size={18} />
              Advanced Settings
            </h4>
            
            <div className="space-y-4">
              <FormInput
                label="Language"
                type="text"
                value={newAgentData.language}
                onChange={(value) => handleInputChange('language', value)}
                placeholder="English"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Max Tokens"
                  type="number"
                  value={newAgentData.maxTokens}
                  onChange={(value) => handleInputChange('maxTokens', parseInt(value) || 0)}
                  min="100"
                  max="4000"
                />
                
                <FormInput
                  label="Temperature"
                  type="number"
                  value={newAgentData.temperature}
                  onChange={(value) => handleInputChange('temperature', parseFloat(value) || 0)}
                  min="0"
                  max="1"
                  step="0.1"
                />
              </div>
              
              <FormTextarea
                label="Custom Instructions"
                value={newAgentData.customInstructions}
                onChange={(value) => handleInputChange('customInstructions', value)}
                placeholder="Provide specific instructions for this agent..."
                rows={3}
              />
            </div>
          </div>
        </div>
      </Modal>
    </DashboardPage>
  );
};

export default Agents;